"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  phase: number;
  alpha: number;
}

interface Silhouette {
  x: number;
  y: number;
  size: number;
  speed: number;
  dir: 1 | -1;
  alpha: number;
  phase: number;
}

/**
 * Layered underwater scene rendered on Canvas 2D:
 * depth gradient, volumetric light shafts, drifting caustic shimmer,
 * rising particles and distant fish silhouettes.
 * Pauses off-screen / hidden tab; renders a single static frame for reduced motion.
 */
export default function AquariumCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let bg: CanvasGradient | null = null;
    let particles: Particle[] = [];
    let silhouettes: Silhouette[] = [];
    let raf = 0;
    let running = false;
    let inView = true;
    let last = performance.now();

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 320);
      height = Math.max(rect.height, 320);
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#0d181b");
      bg.addColorStop(0.42, "#0c1214");
      bg.addColorStop(1, "#090b0d");

      const count = isMobile ? 20 : 42;
      particles = Array.from({ length: count }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        r: rand(0.7, 2.4),
        speed: rand(6, 18),
        drift: rand(6, 22),
        phase: rand(0, Math.PI * 2),
        alpha: rand(0.08, 0.34),
      }));

      silhouettes = Array.from({ length: isMobile ? 2 : 4 }, (_, i) => ({
        x: rand(0, width),
        y: rand(height * 0.24, height * 0.78),
        size: rand(26, 58),
        speed: rand(5, 13) * (i % 2 ? 1 : -1),
        dir: (i % 2 ? 1 : -1) as 1 | -1,
        alpha: rand(0.05, 0.1),
        phase: rand(0, Math.PI * 2),
      }));

      drawFrame(0, false);
      setReady(true);
    };

    const drawParticles = (t: number) => {
      for (const p of particles) {
        p.y -= p.speed * 0.016;
        const x = p.x + Math.sin(t * 0.0004 + p.phase) * p.drift;
        if (p.y < -8) {
          p.y = height + 8;
          p.x = rand(0, width);
        }
        ctx.beginPath();
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214, 226, 219, ${p.alpha})`;
        ctx.fill();
      }
    };

    const drawFish = (s: Silhouette, t: number) => {
      s.x += s.speed * 0.016 * 4;
      const y = s.y + Math.sin(t * 0.0003 + s.phase) * 10;
      if (s.dir === 1 && s.x > width + 80) s.x = -80;
      if (s.dir === -1 && s.x < -80) s.x = width + 80;

      ctx.save();
      ctx.translate(s.x, y);
      ctx.scale(s.dir, 1);
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = "#9fd0c8";
      const l = s.size;
      const h = s.size * 0.34;
      ctx.beginPath();
      ctx.moveTo(-l / 2, 0);
      ctx.quadraticCurveTo(0, -h, l / 2, 0);
      ctx.quadraticCurveTo(0, h, -l / 2, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(l / 2 - 2, 0);
      ctx.lineTo(l / 2 + l * 0.34, -h * 1.5);
      ctx.lineTo(l / 2 + l * 0.34, h * 1.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawRays = (t: number) => {
      const count = isMobile ? 3 : 5;
      ctx.save();
      for (let i = 0; i < count; i++) {
        const baseX = width * (0.12 + i * 0.19);
        const sway = Math.sin(t * 0.00018 + i * 1.7) * width * 0.02;
        const topX = baseX + sway;
        const rayW = width * (0.05 + (i % 3) * 0.025);
        const bottomX = topX + width * (0.16 + (i % 2) * 0.08);
        const grad = ctx.createLinearGradient(topX, 0, bottomX, height);
        const a = 0.05 + (i % 2) * 0.028;
        grad.addColorStop(0, `rgba(226, 210, 160, ${a})`);
        grad.addColorStop(0.55, `rgba(180, 210, 200, ${a * 0.5})`);
        grad.addColorStop(1, "rgba(180, 210, 200, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(topX - rayW / 2, -20);
        ctx.lineTo(topX + rayW / 2, -20);
        ctx.lineTo(bottomX + rayW * 1.6, height + 20);
        ctx.lineTo(bottomX - rayW * 1.6, height + 20);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };

    const drawCaustics = (t: number) => {
      const spots = isMobile ? 3 : 5;
      ctx.save();
      for (let i = 0; i < spots; i++) {
        const x = width * (0.15 + i * 0.2) + Math.sin(t * 0.00022 + i * 2.4) * width * 0.05;
        const y = height * (0.04 + (i % 3) * 0.05);
        const r = width * (0.12 + (i % 2) * 0.06);
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, "rgba(212, 232, 220, 0.05)");
        grad.addColorStop(1, "rgba(212, 232, 220, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawFrame = (t: number, animate: boolean) => {
      if (bg) {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);
      }
      drawRays(t);
      drawCaustics(t);
      silhouettes.forEach((s) => drawFish(s, animate ? t : 0));
      drawParticles(animate ? t : 0);
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(now - last, 48);
      last = now;
      drawFrame(now + dt, true);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    setup();

    if (reduced) {
      return () => {};
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !document.hidden) start();
        else stop();
      },
      { threshold: 0.02 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (!document.hidden && inView) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        stop();
        setup();
        if (inView && !document.hidden) start();
      }, 180);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`h-full w-full transition-opacity duration-[1400ms] ${ready ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
}
