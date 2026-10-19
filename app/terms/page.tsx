import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service | Sheferoy Guppy",
  description: "Terms of Service for Sheferoy Guppy. Read our terms and conditions for using our services.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    heading: "Agreement to Terms",
    body: "By accessing our website and contacting our hatchery, you agree to these Terms of Service. If you disagree with any part of these terms, please do not use our services.",
  },
  {
    heading: "Services & Reservations",
    body: "Sheferoy Guppy provides information regarding our ornamental guppy bloodlines, bettas, and aquatic botanicals, facilitating direct customer consultations and enquiries. Reservations are confirmed individually with live video previews.",
  },
  {
    heading: "Shipping and Availability",
    body: "All fish and plant availability is subject to seasonal spawning and conditioning cycles. Shipping schedules, packaging methods, and transit timelines will be communicated directly during the reservation process.",
  },
  {
    heading: "100% Live Arrival Guarantee",
    body: "We pack all livestock in specialized breathable or oxygenated bags with thermal insulation. In the rare event of transit mortality, we provide full replacement or credit upon receiving clear unboxing photographs/video within 2 hours of delivery.",
  },
  {
    heading: "Intellectual Property",
    body: "All original content on this website, including photographs, videos, textual guides, and brand trademarks, is the intellectual property of Sheferoy Guppy. Unauthorized reproduction is strictly prohibited.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="The basis on which Sheferoy Guppy shares information about its collection and coordinates reservations."
      />

      <section className="bg-page pb-24 pt-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-muted">
            Last updated: October 2026
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-2xl font-bold text-heading">{section.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-body">{section.body}</p>
              </div>
            ))}

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold text-heading">Contact Information</h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                For questions about these Terms of Service, please reach out to our team through our contact page or directly
                via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
