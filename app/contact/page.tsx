import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Package, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contact — Enquire About Ornamental Guppies & Bettas | Sheferoy Guppy",
  description:
    "Contact Sheferoy Guppy in Kanyakumari, Tamil Nadu for enquiries about guppy varieties, bettas, and breeding pairs. Phone: 7358612156, WhatsApp: 94891 84047, Email: eliteguppyss@gmail.com.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Sheferoy Guppy",
    description:
      "Enquire about guppy varieties, bettas and breeding pairs — Sheferoy Guppy, Kanyakumari, Tamil Nadu.",
    url: "/contact",
  },
};

const assurances = [
  {
    icon: Package,
    title: "Safe packing",
    text: "Oxygen-packed bags, insulated thermal boxes and tracked express dispatch across India.",
  },
  {
    icon: ShieldCheck,
    title: "Live arrival guarantee",
    text: "Every shipment is covered by our 100% live arrival replacement promise.",
  },
  {
    icon: MessageCircle,
    title: "Direct breeder replies",
    text: "No bots — experienced breeders answer directly, usually within a few hours.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact & Inquiries"
        title={
          <>
            Tell Us What{" "}
            <span className="font-display italic text-brand">You&apos;re Dreaming Of</span>
          </>
        }
        description="Whether it's a centerpiece trio for a planted nano tank or foundation stock for a breeding setup — reach out and we will guide you personally."
      />

      <section className="bg-page pb-24 pt-12 lg:pt-16">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Contact channels */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-display text-3xl font-bold tracking-tight text-heading">Ways to reach us</h2>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Choose whichever channel suits you best — we monitor all of them, but WhatsApp is by far the fastest for live videos.
                </p>
              </Reveal>

              <div className="mt-8 space-y-4">
                <Reveal delay={80}>
                  <div className="rounded-2xl border border-border bg-surface p-6 shadow-card hover:shadow-card-hover transition-all">
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-success/30 bg-success/15 text-success shadow-sm">
                        <MessageCircle className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-bold text-heading">WhatsApp</h3>
                        <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-muted">
                          Fastest · live tank videos & sizing
                        </p>
                      </div>
                    </div>
                    <WhatsAppButton className="mt-5 w-full justify-center bg-brand hover:bg-brand-hover text-white shadow-sm">
                      Start a chat on WhatsApp
                    </WhatsAppButton>
                  </div>
                </Reveal>

                <Reveal delay={140}>
                  <div className="rounded-2xl border border-border bg-surface p-6 shadow-card hover:shadow-card-hover transition-all">
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary text-brand shadow-sm">
                        <Mail className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-bold text-heading">Email Enquiries</h3>
                        <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-muted">
                          Official breeding communication
                        </p>
                      </div>
                    </div>
                    <a
                      href="mailto:eliteguppyss@gmail.com"
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-xs font-semibold text-heading hover:border-brand hover:text-brand transition-colors"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>eliteguppyss@gmail.com</span>
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={200}>
                  <div className="rounded-2xl border border-border bg-surface p-6 shadow-card hover:shadow-card-hover transition-all">
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/15 text-gold shadow-sm">
                        <MapPin className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-bold text-heading">Direct Contact</h3>
                        <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-muted">
                          Call, WhatsApp & Email
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-body">
                      <p>
                        <strong className="text-charcoal">Phone: </strong>
                        <a href="tel:7358612156" className="text-brand font-semibold hover:underline">
                          7358612156
                        </a>
                      </p>
                      <p>
                        <strong className="text-charcoal">WhatsApp: </strong>
                        <a href="https://wa.me/919489184047" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold hover:underline">
                          94891 84047
                        </a>
                      </p>
                      <p>
                        <strong className="text-charcoal">Email: </strong>
                        <a href="mailto:eliteguppyss@gmail.com" className="text-brand font-semibold hover:underline">
                          eliteguppyss@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={260} className="mt-8">
                <ul className="space-y-3">
                  {assurances.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      <p className="text-sm leading-relaxed text-body">
                        <span className="font-semibold text-heading">{item.title}.</span> {item.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <div className="rounded-3xl border border-border bg-surface p-7 sm:p-10 shadow-card">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">Send an enquiry</h2>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    Share a little about your aquarium setup and what you are looking for — strain, plant species, quantity,
                    or express shipping questions.
                  </p>
                  <div className="my-8 border-t border-border" aria-hidden="true" />
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
