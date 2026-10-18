import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  tone?: "gold" | "moss";
}

export default function PageHeader({ eyebrow, title, description, children, tone = "gold" }: PageHeaderProps) {
  const accent = tone === "moss" ? "text-moss-light" : "text-gold";
  return (
    <section className="grain relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#0d1214] to-obsidian pb-14 pt-16 lg:pb-20 lg:pt-24">
      <div
        className={`absolute left-1/4 top-0 h-[380px] w-[640px] -translate-x-1/2 rounded-full ${
          tone === "moss"
            ? "bg-[radial-gradient(closest-side,rgba(95,158,110,0.12),transparent)]"
            : "bg-[radial-gradient(closest-side,rgba(199,164,90,0.12),transparent)]"
        }`}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <p className={`flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-editorial ${accent}`}>
          <span className={`inline-block h-px w-8 ${tone === "moss" ? "bg-moss-light/60" : "bg-gold/70"}`} aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="display-1 mt-5 max-w-3xl text-ivory">{title}</h1>
        {description && <p className="lede mt-5 max-w-2xl">{description}</p>}
        {children}
      </div>
    </section>
  );
}
