"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { MapPin, Users } from "lucide-react";
import GuppyArt from "@/components/art/GuppyArt";
import { heroColorway } from "@/lib/varieties-data";

const AquariumCanvas = dynamic(() => import("@/components/art/AquariumCanvas"), {
  ssr: false,
});

/**
 * Decorative hero scene: canvas aquarium + animated guppy specimen,
 * with restrained pointer parallax on fine-pointer devices.
 */
export default function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !finePointer) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      ty = ((e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={sceneRef} className="absolute inset-0" style={{ "--px": 0, "--py": 0 } as React.CSSProperties}>
      {/* Canvas depth layer */}
      <div className="absolute inset-0">
        <AquariumCanvas />
      </div>

      {/* Legibility vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_38%,rgba(9,11,13,0.88)_0%,rgba(9,11,13,0.55)_42%,rgba(9,11,13,0.08)_72%)] lg:bg-[radial-gradient(90%_100%_at_16%_46%,rgba(9,11,13,0.92)_0%,rgba(9,11,13,0.62)_38%,rgba(9,11,13,0.05)_70%)]"
        aria-hidden="true"
      />

      {/* Guppy specimen */}
      <div
        className="absolute bottom-[-4%] right-[-16%] w-[96vw] max-w-[620px] sm:max-w-[700px] lg:bottom-auto lg:right-[-2%] lg:top-1/2 lg:w-[52vw] lg:max-w-[880px] lg:-translate-y-1/2"
        style={{
          transform: "translate3d(calc(var(--px, 0) * 16px), calc(var(--py, 0) * 10px), 0)",
        }}
        aria-hidden="true"
      >
        <div className="anim-fade-slow" style={{ animationDelay: "0.35s" }}>
          <GuppyArt colorway={heroColorway} animated className="h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]" />
        </div>

        {/* Floating editorial labels (desktop) */}
        <div
          className="anim-float absolute hidden lg:block"
          style={{ top: "4%", left: "2%", transform: "translate3d(calc(var(--px, 0) * -26px), calc(var(--py, 0) * -14px), 0)" }}
        >
          <span className="chip">
            <Users className="h-3 w-3" aria-hidden="true" />
            1,700+ hobbyists
          </span>
        </div>
        <div
          className="anim-float-late absolute hidden lg:block"
          style={{ bottom: "6%", right: "4%", transform: "translate3d(calc(var(--px, 0) * -22px), calc(var(--py, 0) * -12px), 0)" }}
        >
          <span className="chip">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            Kanyakumari · Tamil Nadu
          </span>
        </div>
      </div>

      {/* Vertical specimen caption (desktop) */}
      <div
        className="anim-fade absolute right-6 top-1/2 hidden -translate-y-1/2 xl:block"
        style={{ animationDelay: "1.1s" }}
        aria-hidden="true"
      >
        <p className="rotate-90 font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-ivory/35">
          Specimen 01 — Poecilia reticulata
        </p>
      </div>
    </div>
  );
}
