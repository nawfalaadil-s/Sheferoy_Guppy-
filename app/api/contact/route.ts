import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { rateLimiter, getClientIp } from "@/lib/rate-limiter";
import { sanitizeText, isBotSubmission } from "@/lib/security";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  contact: z.string().min(8, "Please provide a valid email or phone number").max(120),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(1500),
  botField: z.string().optional(),
});

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimitKey = `contact-form:${clientIp}`;

  // 1. Enforce submission rate limiting (max 20 per 10 minutes)
  const limitStatus = rateLimiter.checkLimit(rateLimitKey, 20, 10 * 60 * 1000, 10 * 60 * 1000);
  if (!limitStatus.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Submission limit reached. Please wait ${limitStatus.retryAfterSeconds} seconds before sending another enquiry.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(limitStatus.retryAfterSeconds || 600) },
      }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));

    // 2. Anti-bot honeypot trap validation
    if (isBotSubmission(body.botField || body.website)) {
      // Silently accept bot submission without writing to database to waste bot resources
      return NextResponse.json(
        {
          success: true,
          message: "Enquiry received successfully.",
        },
        { status: 201 }
      );
    }

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }

    // 3. Sanitize inputs to prevent XSS in CRM inbox
    const name = sanitizeText(result.data.name);
    const contact = sanitizeText(result.data.contact);
    const subject = sanitizeText(result.data.subject);
    const message = sanitizeText(result.data.message);

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

    // Record submission against rate limiter
    rateLimiter.recordSubmission(rateLimitKey, 20, 10 * 60 * 1000);

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
