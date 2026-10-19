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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to submit enquiry");
      }

      setSubmitStatus("success");
      reset();

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error: unknown) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      const message =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again or contact us on WhatsApp.";
      setErrorMessage(message);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-page px-4 py-3 text-sm text-heading placeholder:text-muted shadow-sm transition-colors focus:outline-none ${
      hasError
        ? "border-error focus:border-error focus:ring-2 focus:ring-error/20"
        : "border-border focus:border-brand focus:ring-2 focus:ring-brand/10"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="mb-2 block font-sans text-xs font-semibold uppercase tracking-wider text-heading">
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
          <p className="mt-2 text-xs text-error font-medium" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact" className="mb-2 block font-sans text-xs font-semibold uppercase tracking-wider text-heading">
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
          <p className="mt-2 text-xs text-error font-medium" role="alert">
            {errors.contact.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block font-sans text-xs font-semibold uppercase tracking-wider text-heading">
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
          <p className="mt-2 text-xs text-error font-medium" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-sans text-xs font-semibold uppercase tracking-wider text-heading">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          className={`${inputClass(!!errors.message)} resize-none`}
          placeholder="Tell us about the strains, plants or aquarium setup you have in mind…"
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="mt-2 text-xs text-error font-medium" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitStatus === "loading"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 px-6 text-sm font-semibold uppercase tracking-wider text-white hover:bg-brand-hover shadow-md transition-all duration-200"
      >
        {submitStatus === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {submitStatus === "loading" ? "Sending…" : "Send message"}
      </button>

      <p className="text-center text-xs text-muted">
        For immediate tank video previews and reserved batches, we recommend messaging us on WhatsApp.
      </p>

      {submitStatus === "success" && (
        <div className="flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 p-4" role="alert">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-heading font-medium">
            Thank you for your message. We will review your inquiry and reply promptly.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="rounded-xl border border-error/30 bg-error/10 p-4" role="alert">
          <p className="text-sm leading-relaxed text-error font-medium">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
