import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle, Package, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Contact — Enquire About Guppies & Live Plants",
  description:
    "Contact Sheferoy Guppy in Kanyakumari, Tamil Nadu for enquiries about guppy varieties, live aquatic plants and safe pan-India shipping. The fastest response is on WhatsApp.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Sheferoy Guppy",
    description:
      "Enquire about guppy varieties, live plants and shipping — Kanyakumari, Tamil Nadu, India.",
    url: "/contact",
  },
};

const assurances = [
  {
    icon: Package,
    title: "Safe packing",
    text: "Oxygen-packed bags, insulated boxes and tracked dispatch across India.",
  },
  {
    icon: ShieldCheck,
    title: "Live arrival promise",
    text: "Every shipment is followed up personally until your fish settle in.",
  },
  {
    icon: MessageCircle,
    title: "Human replies",
    text: "No bots — a keeper answers, usually within a few hours.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tell Us What{" "}
            <span className="font-display italic text-gold-light">You&apos;re Dreaming Of</span>
          </>
        }
        description="Whether it's one male for a nano tank or a breeding trio for a new project — start the conversation and we'll guide you honestly."
      />

      <section className="bg-obsidian pb-24 pt-12 lg:pt-16">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Contact channels */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="display-3 text-ivory">Ways to reach us</h2>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  Choose whichever suits you — we reply to all of them, but WhatsApp is fastest.
                </p>
              </Reveal>

              <div className="mt-8 space-y-4">
                <Reveal delay={80}>
                  <div className="rounded-2xl border border-gold/15 bg-abyss p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
                        <MessageCircle className="h-5 w-5 text-gold" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl text-ivory">WhatsApp</h3>
                        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-ivory/45">
                          Fastest · replies within hours
                        </p>
                      </div>
                    </div>
                    <WhatsAppButton className="mt-5 w-full justify-center">
                      Start a chat
                    </WhatsAppButton>
                  </div>
                </Reveal>

                <Reveal delay={140}>
                  <div className="rounded-2xl border border-gold/15 bg-abyss p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
                        <Instagram className="h-5 w-5 text-gold" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl text-ivory">Instagram</h3>
                        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-ivory/45">
                          Daily tank updates & DMs
                        </p>
                      </div>
                    </div>
                    <Link
                      href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/sheferoyguppy/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost mt-5 w-full justify-center"
                    >
                      <Instagram className="h-4 w-4" aria-hidden="true" />
                      @sheferoyguppy
                    </Link>
                  </div>
                </Reveal>

                <Reveal delay={200}>
                  <div className="rounded-2xl border border-gold/15 bg-abyss p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
                        <MapPin className="h-5 w-5 text-gold" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl text-ivory">Studio</h3>
                        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-ivory/45">
                          Visits by appointment
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-mist">
                      Kanyakumari, Tamil Nadu, India — the southernmost tip of the country, where our
                      tanks and breeding rooms are kept.
                    </p>
                    {process.env.NEXT_PUBLIC_BUSINESS_EMAIL && (
                      <a
                        href={`mailto:${process.env.NEXT_PUBLIC_BUSINESS_EMAIL}`}
                        className="mt-4 inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-gold-light"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        {process.env.NEXT_PUBLIC_BUSINESS_EMAIL}
                      </a>
                    )}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={260} className="mt-8">
                <ul className="space-y-3">
                  {assurances.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      <p className="text-sm leading-relaxed text-ivory/75">
                        <span className="font-semibold text-ivory">{item.title}.</span> {item.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <div className="rounded-3xl border border-gold/15 bg-gradient-to-b from-abyss to-obsidian p-7 sm:p-10">
                  <h2 className="display-3 text-ivory">Send a message</h2>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    Share a little about your setup and what you&apos;re looking for — strain, plant, quantity
                    or shipping questions all welcome.
                  </p>
                  <div className="hairline my-8" aria-hidden="true" />
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
