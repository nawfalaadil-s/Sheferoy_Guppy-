import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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
    const uploadDir = path.join(process.cwd(), "public", "images", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/images/uploads/${fileName}`;

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
