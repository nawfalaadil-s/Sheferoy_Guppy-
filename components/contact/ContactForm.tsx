"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  contact: z.string().min(10, "Please provide a valid email or phone number"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200, "Subject is too long"),
  message: z.string().min(20, "Message must be at least 20 characters").max(1000, "Message is too long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Form data:", data);

      setSubmitStatus("success");
      reset();

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setErrorMessage("Failed to send message. Please try again or contact us on WhatsApp.");
    }
  };

  const inputClass = (hasError: boolean) =>
    `field ${hasError ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/20" : ""}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/70">
          Name <span className="text-gold">*</span>
        </label>
        <input
          type="text"
          id="name"
          autoComplete="name"
          {...register("name")}
          className={inputClass(!!errors.name)}
          placeholder="Your full name"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="mt-2 text-xs text-red-400" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact" className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/70">
          Email or Phone <span className="text-gold">*</span>
        </label>
        <input
          type="text"
          id="contact"
          autoComplete="email"
          {...register("contact")}
          className={inputClass(!!errors.contact)}
          placeholder="your.email@example.com or +91 XXXXX XXXXX"
          aria-invalid={!!errors.contact}
        />
        {errors.contact && (
          <p className="mt-2 text-xs text-red-400" role="alert">
            {errors.contact.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/70">
          Subject <span className="text-gold">*</span>
        </label>
        <input
          type="text"
          id="subject"
          {...register("subject")}
          className={inputClass(!!errors.subject)}
          placeholder="What is your enquiry about?"
          aria-invalid={!!errors.subject}
        />
        {errors.subject && (
          <p className="mt-2 text-xs text-red-400" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/70">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          className={`${inputClass(!!errors.message)} resize-none`}
          placeholder="Tell us about the strains, plants or tank you have in mind…"
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="mt-2 text-xs text-red-400" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={submitStatus === "loading"} className="btn-gold w-full justify-center py-4">
        {submitStatus === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {submitStatus === "loading" ? "Sending…" : "Send message"}
      </button>

      <p className="text-center text-[11px] leading-relaxed text-ivory/40">
        This form is a demonstration enquirer — the fastest response is always WhatsApp.
      </p>

      {submitStatus === "success" && (
        <div className="flex items-start gap-3 rounded-xl border border-moss-light/30 bg-moss/15 p-4" role="alert">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-moss-light" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-ivory/90">
            Thank you for your message. We&apos;ll get back to you soon — for anything urgent, ping us on
            WhatsApp.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4" role="alert">
          <p className="text-sm leading-relaxed text-red-300">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
