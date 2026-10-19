import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  contact: z.string().min(10, "Please provide a valid email or phone number").max(120),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(20, "Message must be at least 20 characters").max(1000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }

    const { name, contact, subject, message } = result.data;

    const { data, error } = await supabase.from("enquiries").insert([
      {
        name,
        contact,
        subject,
        message,
        status: "pending",
      },
    ]).select();

    if (error) {
      console.error("Supabase enquiry insert error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to save enquiry in database" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry received successfully. Our breeding team will respond promptly.",
        enquiryId: data?.[0]?.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
