import { Ship } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";

const stats = [
  { value: 65, suffix: "+", label: "Guppy Varieties", note: "Ornamental bloodlines in the collection" },
  { value: 1700, suffix: "+", label: "Hobbyists Served", note: "Aquarists across India" },
];

export default function StatsStrip() {
  return (
    <section className="relative border-y border-gold/10 bg-abyss" aria-label="Collection statistics">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 divide-y divide-gold/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 120} className="px-2 py-10 sm:px-8 lg:py-14">
              <p className="display-2 gold-text">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory">
                {stat.label}
              </p>
              <p className="mt-2 text-sm text-mist">{stat.note}</p>
            </Reveal>
          ))}
          <Reveal delay={240} className="px-2 py-10 sm:px-8 lg:py-14">
            <div className="flex items-center gap-4">
              <Ship className="h-9 w-9 text-gold" aria-hidden="true" />
              <p className="display-2 text-ivory">Pan-India</p>
            </div>
            <p className="mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory">
              Safe Shipping
            </p>
            <p className="mt-2 text-sm text-mist">Careful packing, delivered nationwide</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
