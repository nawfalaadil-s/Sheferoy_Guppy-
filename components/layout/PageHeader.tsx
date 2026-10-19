import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  tone?: "cyan" | "emerald" | "gold";
}

export default function PageHeader({ eyebrow, title, description, children, tone = "cyan" }: PageHeaderProps) {
  const accent =
    tone === "emerald"
      ? "text-success"
      : tone === "gold"
      ? "text-gold"
      : "text-brand";

  const dotBg =
    tone === "emerald"
      ? "bg-success"
      : tone === "gold"
      ? "bg-gold"
      : "bg-brand";

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/70 via-secondary/30 to-page pb-12 pt-14 lg:pb-16 lg:pt-16">
      <div
        className="pointer-events-none absolute right-10 top-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-10 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand/5 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <p className={`flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-wider ${accent}`}>
          <span className={`inline-block h-2 w-2 rounded-full ${dotBg} animate-pulse`} aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
