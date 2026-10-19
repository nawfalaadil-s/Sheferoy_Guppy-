import { Truck } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";

const stats = [
  { value: 65, suffix: "+", label: "Pure Guppy Strains", note: "Carefully stabilized bloodlines" },
  { value: 1700, suffix: "+", label: "Active Hobbyists", note: "Supplied across all Indian states" },
];

export default function StatsStrip() {
  return (
    <section className="relative border-y border-border bg-white" aria-label="Collection statistics">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="px-4 py-8 sm:px-8 lg:py-10">
              <p className="font-display text-3xl font-extrabold text-brand sm:text-4xl">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-bold text-charcoal">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-muted">{stat.note}</p>
            </Reveal>
          ))}
          <Reveal delay={160} className="px-4 py-8 sm:px-8 lg:py-10">
            <div className="flex items-center gap-2">
              <Truck className="h-6 w-6 text-brand" aria-hidden="true" />
              <p className="font-display text-2xl font-extrabold text-charcoal sm:text-3xl">Pan-India</p>
            </div>
            <p className="mt-2 text-sm font-bold text-charcoal">
              Guaranteed Live Delivery
            </p>
            <p className="mt-1 text-xs text-muted">Oxygen-packed thermo boxes sent nationwide</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
