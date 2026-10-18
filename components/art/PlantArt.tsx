"use client";

import { useId } from "react";
import type { PlantArtType } from "@/lib/plants-data";

interface PlantArtProps {
  type: PlantArtType;
  animated?: boolean;
  className?: string;
}

/**
 * Original botanical vector artwork for each plant entry.
 * Replaced by real photography when supplied by the business.
 */
export default function PlantArt({ type, animated = false, className = "" }: PlantArtProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const leaf = `pl-${uid}`;
  const leafLight = `pll-${uid}`;
  const stem = `ps-${uid}`;

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="Illustrated aquatic plant"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={leaf} x1="120" y1="360" x2="280" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1d4a30" />
          <stop offset="55%" stopColor="#2f6b45" />
          <stop offset="100%" stopColor="#5f9e6e" />
        </linearGradient>
        <linearGradient id={leafLight} x1="160" y1="340" x2="300" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#78b878" />
          <stop offset="100%" stopColor="#a8d8a0" />
        </linearGradient>
        <linearGradient id={stem} x1="200" y1="380" x2="200" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1d4a30" />
          <stop offset="100%" stopColor="#3d7a52" />
        </linearGradient>
      </defs>

      <g className={animated ? "gf-plant" : undefined}>
        {type === "pennywort" && <Pennywort leaf={leaf} leafLight={leafLight} stem={stem} />}
        {type === "vallisneria" && <Vallisneria leaf={leaf} leafLight={leafLight} />}
        {type === "foxtail" && <Foxtail leaf={leaf} leafLight={leafLight} stem={stem} />}
        {type === "guppy-grass" && <GuppyGrass leaf={leaf} leafLight={leafLight} />}
        {type === "water-lettuce" && <WaterLettuce leaf={leaf} leafLight={leafLight} />}
        {type === "duckweed" && <Duckweed leaf={leaf} leafLight={leafLight} />}
      </g>
    </svg>
  );
}

function Pennywort({ leaf, leafLight, stem }: { leaf: string; leafLight: string; stem: string }) {
  const leaves = [
    [148, 120, 24], [190, 92, 20], [238, 118, 26], [176, 168, 22], [236, 172, 19],
    [118, 196, 21], [268, 210, 24], [152, 244, 20], [222, 258, 23], [186, 306, 18],
  ];
  return (
    <>
      <path d="M 190 380 C 182 300 176 220 168 140" fill="none" stroke={`url(#${stem})`} strokeWidth="6" strokeLinecap="round" />
      <path d="M 200 380 C 210 290 232 210 244 130" fill="none" stroke={`url(#${stem})`} strokeWidth="5" strokeLinecap="round" />
      <path d="M 196 300 C 150 280 120 250 112 210" fill="none" stroke={`url(#${stem})`} strokeWidth="4" strokeLinecap="round" />
      <path d="M 202 320 C 250 300 276 272 286 232" fill="none" stroke={`url(#${stem})`} strokeWidth="4" strokeLinecap="round" />
      {leaves.map(([cx, cy, r], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r} fill={i % 2 ? `url(#${leafLight})` : `url(#${leaf})`} opacity="0.95" />
          <circle cx={cx} cy={cy} r={r * 0.62} fill="none" stroke="#0e2417" strokeOpacity="0.35" strokeWidth="1.2" />
          <path d={`M ${cx - r * 0.7} ${cy + r * 0.2} Q ${cx} ${cy + r * 0.9} ${cx + r * 0.7} ${cy + r * 0.2}`} fill="none" stroke="#0e2417" strokeOpacity="0.3" strokeWidth="1.4" />
        </g>
      ))}
    </>
  );
}

function Vallisneria({ leaf, leafLight }: { leaf: string; leafLight: string }) {
  const blades = [
    { d: "M 200 384 C 178 300 150 220 118 118 C 148 208 178 288 208 384 Z", light: false },
    { d: "M 202 384 C 190 290 186 200 176 84 C 202 196 214 290 218 384 Z", light: true },
    { d: "M 208 384 C 216 296 238 208 272 104 C 246 208 228 296 224 384 Z", light: false },
    { d: "M 196 384 C 160 306 118 244 74 176 C 122 240 166 304 206 384 Z", light: true },
    { d: "M 210 384 C 248 312 294 258 340 200 C 296 258 252 316 222 384 Z", light: false },
    { d: "M 204 384 C 194 300 196 236 210 150 C 208 240 214 306 216 384 Z", light: false },
    { d: "M 198 384 C 172 330 136 292 94 258 C 138 290 174 330 204 384 Z", light: false },
    { d: "M 212 384 C 244 336 282 302 326 272 C 284 304 248 340 220 384 Z", light: true },
    { d: "M 205 384 C 200 320 206 260 226 196 C 214 262 214 322 216 384 Z", light: true },
  ];
  return (
    <>
      {blades.map((b, i) => (
        <path key={i} d={b.d} fill={b.light ? `url(#${leafLight})` : `url(#${leaf})`} opacity="0.95" />
      ))}
      <path d="M 178 386 Q 200 392 226 386" fill="none" stroke="#123c24" strokeOpacity="0.6" strokeWidth="4" />
    </>
  );
}

function Foxtail({ leaf, leafLight, stem }: { leaf: string; leafLight: string; stem: string }) {
  const stems = [
    { x: 160, lean: -28 }, { x: 200, lean: 6 }, { x: 244, lean: 30 },
  ];
  return (
    <>
      {stems.map((s, si) => (
        <g key={si}>
          <path
            d={`M ${s.x} 380 C ${s.x + s.lean * 0.4} 300 ${s.x + s.lean * 0.8} 220 ${s.x + s.lean} 128`}
            fill="none"
            stroke={`url(#${stem})`}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {[0, 1, 2, 3, 4, 5, 6].map((n) => {
            const t = 0.16 + n * 0.12;
            const y = 380 - t * 252;
            const x = s.x + s.lean * t;
            return (
              <g key={n} stroke={n % 2 ? `url(#${leafLight})` : `url(#${leaf})`} strokeWidth="3" strokeLinecap="round" fill="none">
                <path d={`M ${x} ${y} Q ${x - 22} ${y - 10} ${x - 36} ${y - 26}`} />
                <path d={`M ${x} ${y} Q ${x + 22} ${y - 10} ${x + 36} ${y - 26}`} />
                <path d={`M ${x} ${y} Q ${x - 10} ${y - 20} ${x - 14} ${y - 40}`} />
                <path d={`M ${x} ${y} Q ${x + 10} ${y - 20} ${x + 14} ${y - 40}`} />
              </g>
            );
          })}
        </g>
      ))}
    </>
  );
}

function GuppyGrass({ leaf, leafLight }: { leaf: string; leafLight: string }) {
  const strands = Array.from({ length: 26 }, (_, i) => {
    const angle = (i / 26) * Math.PI * 2;
    const len = 130 + (i % 5) * 34;
    const x2 = 200 + Math.cos(angle) * len;
    const y2 = 320 + Math.sin(angle) * len * 0.72;
    return { x2, y2, light: i % 3 === 0, w: 2 + (i % 3) };
  });
  return (
    <>
      {strands.map((s, i) => (
        <path
          key={i}
          d={`M 200 320 Q ${(200 + s.x2) / 2 + (i % 4 - 2) * 16} ${(320 + s.y2) / 2 - 24} ${s.x2} ${s.y2}`}
          fill="none"
          stroke={s.light ? `url(#${leafLight})` : `url(#${leaf})`}
          strokeWidth={s.w}
          strokeLinecap="round"
          opacity="0.92"
        />
      ))}
      {Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={200 + Math.cos(angle) * 54}
            cy={318 + Math.sin(angle) * 40}
            r={5 + (i % 3)}
            fill={i % 2 ? `url(#${leafLight})` : `url(#${leaf})`}
            opacity="0.9"
          />
        );
      })}
    </>
  );
}

function WaterLettuce({ leaf, leafLight }: { leaf: string; leafLight: string }) {
  const petals = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * 360 - 90;
    return { angle, light: i % 2 === 0, scale: 1 - (i % 3) * 0.08 };
  });
  const roots = Array.from({ length: 9 }, (_, i) => {
    const x = 156 + i * 11;
    const sway = i % 2 ? 16 : -12;
    return `M ${x} 238 C ${x + sway} 280 ${x - sway} 320 ${x + sway * 0.6} 360`;
  });
  return (
    <>
      {roots.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#3d7a52" strokeOpacity={0.65 - i * 0.04} strokeWidth="1.6" strokeLinecap="round" />
      ))}
      {petals.map((p, i) => (
        <g key={i} transform={`rotate(${p.angle} 200 168) translate(200 168) scale(${p.scale})`}>
          <path
            d="M 0 0 C -20 -8 -26 -38 -14 -62 C -6 -76 6 -76 14 -62 C 26 -38 20 -8 0 0 Z"
            fill={p.light ? `url(#${leafLight})` : `url(#${leaf})`}
            opacity="0.95"
          />
          <path d="M 0 -8 L 0 -58" stroke="#0e2417" strokeOpacity="0.35" strokeWidth="1.2" />
          <path d="M 0 -18 L -7 -34 M 0 -18 L 7 -34 M 0 -30 L -6 -46 M 0 -30 L 6 -46" stroke="#0e2417" strokeOpacity="0.25" strokeWidth="1" />
        </g>
      ))}
      <circle cx="200" cy="168" r="17" fill={`url(#${leaf})`} />
      <circle cx="200" cy="168" r="9" fill="#a8d8a0" opacity="0.7" />
    </>
  );
}

function Duckweed({ leaf, leafLight }: { leaf: string; leafLight: string }) {
  const fronds = [
    [110, 150, 1], [150, 120, 0.85], [200, 138, 1.1], [252, 122, 0.9], [300, 150, 1],
    [130, 196, 0.9], [184, 188, 1.05], [240, 196, 0.85], [292, 188, 0.95],
    [160, 246, 1], [222, 252, 0.9], [278, 244, 1.05], [196, 304, 0.95], [252, 306, 0.85],
  ];
  return (
    <>
      {fronds.map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <ellipse cx="-6" cy="0" rx="13" ry="9" fill={i % 2 ? `url(#${leafLight})` : `url(#${leaf})`} opacity="0.95" />
          <ellipse cx="8" cy="-2" rx="11" ry="8" fill={i % 3 ? `url(#${leaf})` : `url(#${leafLight})`} opacity="0.9" />
          <path d="M 1 8 C 2 20 -2 28 -6 36" stroke="#3d7a52" strokeOpacity="0.6" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>
      ))}
    </>
  );
}
