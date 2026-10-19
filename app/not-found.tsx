import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-page px-4 py-24 sm:px-6">
      <div className="relative text-center max-w-xl mx-auto">
        <p className="font-display font-bold text-8xl text-brand/20 sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
          This current drifted somewhere else.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-body">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s guide you back to
          our breeding rooms.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to home
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/varieties" className="btn-secondary">
            <Compass className="h-4 w-4" aria-hidden="true" />
            Browse varieties
          </Link>
        </div>
      </div>
    </div>
  );
}
