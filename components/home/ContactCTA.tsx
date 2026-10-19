import { MessageCircle, Phone } from "lucide-react";

export default function ContactCTA() {
  const whatsappUrl = `https://wa.me/919489184047?text=${encodeURIComponent(
    "Hi Sheferoy Guppy, I am enquiring about availability and breeding pairs for a particular strain."
  )}`;

  return (
    <section
      className="relative bg-secondary/60 py-12 sm:py-16 border-b border-border"
      aria-labelledby="contact-strip-heading"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-10 shadow-card text-center max-w-3xl mx-auto">
          <h2
            id="contact-strip-heading"
            className="font-display text-2xl font-extrabold tracking-tight text-heading sm:text-3xl"
          >
            Looking for a Particular Strain?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-body">
            Contact us for availability and breeding pair enquiries.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs sm:text-sm px-6 py-2.5 shadow-teal"
              aria-label="WhatsApp Sheferoy Guppy"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Us
            </a>

            <a
              href="tel:7358612156"
              className="btn-secondary text-xs sm:text-sm px-6 py-2.5 shadow-subtle hover:border-brand hover:text-brand"
              aria-label="Call Sheferoy Guppy at 7358612156"
            >
              <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
