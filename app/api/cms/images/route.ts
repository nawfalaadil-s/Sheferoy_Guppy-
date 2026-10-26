import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const images: { path: string; name: string; category: string }[] = [];
    const publicDir = path.join(process.cwd(), "public");

    const folders = [
      { dir: "images/varieties", category: "Varieties" },
      { dir: "images/gallery", category: "Farm Gallery" },
      { dir: "images/uploads", category: "Uploaded Images" },
    ];

    for (const folder of folders) {
      const fullPath = path.join(publicDir, folder.dir);
      if (fs.existsSync(fullPath)) {
        const files = fs.readdirSync(fullPath);
        for (const file of files) {
          if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) {
            images.push({
              path: `/${folder.dir}/${file}`,
              name: file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
              category: folder.category,
            });
          }
        }
      }
    }

    // Also fetch items uploaded to Supabase Storage cms-images bucket if available
    try {
      const { data: storageFiles } = await supabase.storage.from("cms-images").list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

      if (storageFiles && storageFiles.length > 0) {
        for (const sf of storageFiles) {
          if (sf.name && !sf.name.startsWith(".")) {
            const { data: pub } = supabase.storage.from("cms-images").getPublicUrl(sf.name);
            if (pub?.publicUrl) {
              images.unshift({
                path: pub.publicUrl,
                name: sf.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
                category: "Uploaded Images",
              });
            }
          }
        }
      }
    } catch {
      // Continue with local files
    }

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("GET /api/cms/images error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to list available images" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate mime type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "File must be a valid image" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "_")
      .slice(0, 50);
    const fileName = `${Date.now()}_${safeName}`;

    let publicUrl = "";

    // 1. Primary: Upload to Supabase Storage 'cms-images' bucket
    try {
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from("cms-images")
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (!uploadErr && uploadData) {
        const { data: pub } = supabase.storage.from("cms-images").getPublicUrl(fileName);
        if (pub?.publicUrl) {
          publicUrl = pub.publicUrl;
        }
      }
    } catch (e) {
      console.warn("Supabase storage upload error:", e);
    }

    // 2. Secondary: Local public folder write (for dev environment)
    try {
      const uploadDir = path.join(process.cwd(), "public", "images", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      if (!publicUrl) {
        publicUrl = `/images/uploads/${fileName}`;
      }
    } catch {
      // Ephemeral serverless container on Netlify/Vercel
    }

    // 3. Fallback: Base64 Data URL if storage was unreachable
    if (!publicUrl) {
      publicUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("POST /api/cms/images error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
