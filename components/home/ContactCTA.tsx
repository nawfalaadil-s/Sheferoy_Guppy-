import Link from "next/link";
import { Instagram } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function ContactCTA() {
  return (
    <section className="grain relative overflow-hidden bg-gradient-to-b from-abyss to-obsidian py-24 lg:py-32" aria-labelledby="contact-cta-heading">
      <div
        className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(199,164,90,0.14),transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="eyebrow justify-center">Begin Your Collection</p>
          <h2 id="contact-cta-heading" className="display-1 mt-5 text-ivory">
            Ready to Meet Your{" "}
            <span className="font-display italic gold-text">Next Line</span>?
          </h2>
          <p className="lede mx-auto mt-6 max-w-xl">
            Tell us which varieties or plants you are looking for and we will guide you from
            selection to safe delivery at your door.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton className="justify-center px-8 py-4">
              Enquire on WhatsApp
            </WhatsAppButton>
            <Link
              href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/sheferoyguppy/"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost justify-center px-8 py-4"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              Instagram DM
            </Link>
          </div>
          <p className="mt-6">
            <Link
              href="/contact"
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory/50 underline-offset-4 transition-colors hover:text-gold-light hover:underline"
            >
              Or send a detailed enquiry through the contact form
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
