import { MessageCircle, Phone } from "lucide-react";

export default function ContactCTA() {
  const whatsappUrl = `https://wa.me/919489184047?text=${encodeURIComponent(
    "Hi Sheferoy Guppy, I am enquiring about availability and breeding pairs for a particular strain."
  )}`;

  return (
    <section
      className="relative bg-page py-10 sm:py-12 border-b border-border"
      aria-labelledby="contact-strip-heading"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-card text-center max-w-2xl mx-auto">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand">
            Fast Response · Direct From Breeder
          </span>
          <h2
            id="contact-strip-heading"
            className="mt-1 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-heading"
          >
            Looking for a Particular Strain?
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-body">
            WhatsApp us for current tank videos, pricing, and live stock availability.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs px-5 py-2 shadow-teal"
              aria-label="WhatsApp Sheferoy Guppy"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              WhatsApp (94891 84047)
            </a>

            <a
              href="tel:7358612156"
              className="btn-secondary text-xs px-5 py-2 shadow-subtle hover:border-brand hover:text-brand"
              aria-label="Call Sheferoy Guppy at 7358612156"
            >
              <Phone className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              Call 7358612156
            </a>

            <a
              href="mailto:eliteguppyss@gmail.com"
              className="btn-secondary text-xs px-5 py-2 shadow-subtle hover:border-brand hover:text-brand"
              aria-label="Email Sheferoy Guppy at eliteguppyss@gmail.com"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
