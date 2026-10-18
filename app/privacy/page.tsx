import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Sheferoy Guppy. Learn how we collect, use, and protect your information.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    heading: "Information We Collect",
    intro: "When you contact us through our website, WhatsApp, or Instagram, we may collect:",
    items: [
      "Your name and contact information (email, phone number)",
      "Enquiry details and communication preferences",
      "Information you voluntarily provide in messages",
    ],
  },
  {
    heading: "How We Use Your Information",
    intro: "We use the information we collect to:",
    items: [
      "Respond to your enquiries",
      "Provide information about our guppy varieties and services",
      "Process and fulfil orders",
      "Improve our website and customer service",
    ],
  },
  {
    heading: "Information Sharing",
    intro:
      "We do not sell, trade, or rent your personal information to third parties. We may share information with:",
    items: [
      "Shipping partners for order fulfilment",
      "Service providers who assist in operating our website",
      "Legal authorities when required by law",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Sheferoy Guppy collects, uses and protects the information you share when you contact the studio."
      />

      <section className="bg-obsidian pb-24 pt-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/45">
            Last updated: October 18, 2026
          </p>

          <div className="mt-10 space-y-12">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-2xl text-ivory">{section.heading}</h2>
                <p className="mt-4 text-base leading-relaxed text-mist">{section.intro}</p>
                <ul className="mt-4 space-y-2.5">
                  {section.items.map((item) => (
                    <li key={item} className="ml-5 list-disc text-sm leading-relaxed text-mist marker:text-gold/60">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className="font-display text-2xl text-ivory">Data Security</h2>
              <p className="mt-4 text-base leading-relaxed text-mist">
                We implement reasonable security measures to protect your personal information from
                unauthorized access, alteration, or disclosure.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/15 bg-abyss p-6">
              <h2 className="font-display text-2xl text-ivory">Contact Us</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                If you have questions about this Privacy Policy, please contact us through our contact page
                or WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
