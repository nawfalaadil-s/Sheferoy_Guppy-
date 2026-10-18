import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import GuppyArt from "@/components/art/GuppyArt";
import { heroColorway } from "@/lib/varieties-data";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-obsidian px-4 py-24 sm:px-6">
      <div
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgba(199,164,90,0.09)_0%,rgba(9,11,13,0)_70%)]"
        aria-hidden="true"
      />
      <GuppyArt
        colorway={heroColorway}
        animated
        className="pointer-events-none absolute left-1/2 top-1/2 w-[720px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-15"
      />

      <div className="relative text-center">
        <p className="font-display text-8xl text-gold/70 sm:text-9xl">404</p>
        <h1 className="display-3 mt-4 text-ivory">This current drifted somewhere else.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-mist">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s guide you back to
          calm water.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-gold">
            Back to home
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/varieties" className="btn-ghost">
            <Compass className="h-4 w-4" aria-hidden="true" />
            Browse varieties
          </Link>
        </div>
      </div>
    </div>
  );
}
