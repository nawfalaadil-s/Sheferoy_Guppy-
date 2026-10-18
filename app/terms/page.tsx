import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Sheferoy Guppy. Read our terms and conditions for using our services.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    heading: "Agreement to Terms",
    body: "By accessing our website and services, you agree to these Terms of Service. If you disagree with any part of these terms, please do not use our services.",
  },
  {
    heading: "Services",
    body: "Sheferoy Guppy provides information about ornamental guppy varieties and facilitates enquiries for purchase. We do not operate an online shopping cart or payment processing system.",
  },
  {
    heading: "Shipping and Availability",
    body: "All guppy availability is subject to change. Shipping terms, delivery timelines, and packaging methods will be communicated directly during the enquiry process.",
  },
  {
    heading: "Live Fish Disclaimer",
    body: "We take great care in packaging and shipping live fish. However, we are not responsible for issues arising from delays, improper handling by courier services, or conditions beyond our control. Specific terms will be discussed for each order.",
  },
  {
    heading: "Intellectual Property",
    body: "All content on this website, including text, images, logos, and design, is the property of Sheferoy Guppy and is protected by copyright laws. Unauthorized use is prohibited.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="The basis on which Sheferoy Guppy shares information about its collection and handles enquiries."
      />

      <section className="bg-obsidian pb-24 pt-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/45">
            Last updated: October 18, 2026
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-2xl text-ivory">{section.heading}</h2>
                <p className="mt-4 text-base leading-relaxed text-mist">{section.body}</p>
              </div>
            ))}

            <div className="rounded-2xl border border-gold/15 bg-abyss p-6">
              <h2 className="font-display text-2xl text-ivory">Contact Information</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                For questions about these Terms of Service, please contact us through our contact page or
                WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
