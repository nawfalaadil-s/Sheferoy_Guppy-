import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy | Sheferoy Guppy",
  description: "Privacy Policy for Sheferoy Guppy. Learn how we collect, use, and protect your information.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    heading: "Information We Collect",
    intro: "When you contact us through our website, WhatsApp, phone, or email, we may collect:",
    items: [
      "Your name and contact information (email, phone number)",
      "Enquiry details, preferred fish varieties, and communication preferences",
      "Information you voluntarily provide in messages and setup descriptions",
    ],
  },
  {
    heading: "How We Use Your Information",
    intro: "We use the information we collect to:",
    items: [
      "Respond directly to your strain enquiries and share live tank media",
      "Provide accurate husbandry guidance for your specific water parameters",
      "Process and coordinate secure pan-India live fish dispatch",
      "Improve our website experience and breeder advisory services",
    ],
  },
  {
    heading: "Information Sharing",
    intro:
      "We do not sell, trade, or rent your personal information to third parties. We may share essential details with:",
    items: [
      "Authorized express shipping and courier partners for live delivery coordination",
      "Infrastructure providers who assist in operating our website",
      "Legal authorities when required by applicable law",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Sheferoy Guppy collects, uses and protects the information you share when you contact our hatchery."
      />

      <section className="bg-page pb-24 pt-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-muted">
            Last updated: October 2026
          </p>

          <div className="mt-10 space-y-12">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-2xl font-bold text-heading">{section.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-body">{section.intro}</p>
                <ul className="mt-3 space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="ml-5 list-disc text-sm leading-relaxed text-body marker:text-brand">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className="font-display text-2xl font-bold text-heading">Data Security</h2>
              <p className="mt-3 text-base leading-relaxed text-body">
                We implement industry-standard security measures to safeguard your personal contact details from
                unauthorized access or disclosure.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold text-heading">Contact Us</h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                If you have questions about this Privacy Policy, please contact our hatchery directly through our contact page
                or on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
