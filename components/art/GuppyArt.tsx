"use client";

import { useId } from "react";
import type { GuppyColorway } from "@/lib/varieties-data";

interface GuppyArtProps {
  colorway: GuppyColorway;
  animated?: boolean;
  className?: string;
}

/**
 * Art-directed guppy specimen illustration.
 * Not a photograph — an original vector artwork per variety colorway.
 * Designed to be replaced by real specimen photography when supplied.
 */
export default function GuppyArt({ colorway, animated = false, className = "" }: GuppyArtProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ids = {
    body: `gb-${uid}`,
    tail: `gt-${uid}`,
    fin: `gf-${uid}`,
    belly: `gbe-${uid}`,
    glow: `gg-${uid}`,
    iris: `gi-${uid}`,
    clip: `gc-${uid}`,
    sheen: `gs-${uid}`,
  };

  const {
    bodyFrom,
    bodyTo,
    tailFrom,
    tailTo,
    accent,
    belly,
    glow,
    pattern = "solid",
    patternColor = "#0b0d10",
  } = colorway;

  const rayAngles = [
    [952, 140],
    [976, 250],
    [968, 325],
    [948, 442],
    [916, 514],
  ];

  return (
    <svg
      viewBox="0 0 1000 640"
      className={className}
      role="img"
      aria-label="Illustrated guppy specimen"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={ids.body} x1="228" y1="290" x2="706" y2="330" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={bodyFrom} />
          <stop offset="55%" stopColor={bodyTo} />
          <stop offset="100%" stopColor={tailFrom} />
        </linearGradient>
        <linearGradient id={ids.tail} x1="700" y1="302" x2="986" y2="302" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tailFrom} stopOpacity="0.95" />
          <stop offset="55%" stopColor={tailTo} stopOpacity="0.6" />
          <stop offset="100%" stopColor={tailTo} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={ids.fin} x1="470" y1="250" x2="660" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={tailTo} stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={ids.belly} x1="400" y1="336" x2="560" y2="392" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={belly} stopOpacity="0.7" />
          <stop offset="100%" stopColor={belly} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={ids.glow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glow} stopOpacity="0.4" />
          <stop offset="60%" stopColor={glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={ids.iris} cx="38%" cy="35%" r="70%">
          <stop offset="0%" stopColor={accent} />
          <stop offset="70%" stopColor={bodyFrom} />
          <stop offset="100%" stopColor="#0a0c0f" />
        </radialGradient>
        <linearGradient id={ids.sheen} x1="300" y1="220" x2="640" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={ids.clip}>
          <path d="M 228 332 C 236 284 296 250 380 240 C 476 228 580 236 660 268 C 682 278 696 290 702 302 C 696 314 682 326 660 336 C 580 366 476 380 380 376 C 296 372 238 364 228 332 Z" />
        </clipPath>
      </defs>

      {/* Ambient glow */}
      <ellipse className={animated ? "gf-glow" : undefined} cx="520" cy="310" rx="400" ry="250" fill={`url(#${ids.glow})`} />

      <g className={animated ? "gf-body" : undefined}>
        {/* ---------- Caudal (tail) veil ribbons ---------- */}
        <g className={animated ? "gf-tail" : undefined}>
          <path d="M 698 292 C 786 214 884 152 952 128 C 976 120 984 148 962 180 C 902 250 810 288 704 304 Z" fill={`url(#${ids.tail})`} />
          <path d="M 700 296 C 800 258 906 240 968 248 C 994 251 992 282 964 290 C 886 312 800 314 704 304 Z" fill={`url(#${ids.tail})`} />
          <path d="M 702 302 C 804 298 908 302 972 314 C 996 319 992 344 962 342 C 884 344 800 330 704 308 Z" fill={`url(#${ids.tail})`} />
          <path d="M 702 306 C 802 352 892 394 954 428 C 978 441 968 470 940 460 C 864 432 792 386 704 312 Z" fill={`url(#${ids.tail})`} />
          <path d="M 700 312 C 782 384 862 452 920 504 C 940 524 920 548 896 530 C 828 474 766 406 700 318 Z" fill={`url(#${ids.tail})`} />
          {rayAngles.map(([x, y], i) => (
            <path
              key={i}
              d={`M 702 302 Q ${(x + 702) / 2} ${(y + 302) / 2 - 14} ${x} ${y}`}
              fill="none"
              stroke={tailFrom}
              strokeOpacity="0.28"
              strokeWidth="1.3"
            />
          ))}
        </g>

        {/* ---------- Dorsal fin ---------- */}
        <g className={animated ? "gf-dorsal" : undefined}>
          <path
            d="M 470 240 C 512 168 586 132 656 152 C 690 162 700 208 668 244 C 610 226 528 230 470 240 Z"
            fill={`url(#${ids.fin})`}
            stroke={accent}
            strokeOpacity="0.25"
            strokeWidth="1"
          />
          <path
            d="M 488 238 C 530 182 590 156 644 170 C 664 176 668 206 646 226 C 596 214 534 224 488 238 Z"
            fill={`url(#${ids.fin})`}
            opacity="0.65"
          />
          <path d="M 500 236 Q 560 178 640 168" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="1" />
          <path d="M 520 240 Q 580 190 648 186" fill="none" stroke={accent} strokeOpacity="0.28" strokeWidth="1" />
        </g>

        {/* ---------- Body ---------- */}
        <path
          d="M 228 332 C 236 284 296 250 380 240 C 476 228 580 236 660 268 C 682 278 696 290 702 302 C 696 314 682 326 660 336 C 580 366 476 380 380 376 C 296 372 238 364 228 332 Z"
          fill={`url(#${ids.body})`}
          stroke="#05070a"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />

        <g clipPath={`url(#${ids.clip})`}>
          {/* Belly sheen */}
          <path d="M 250 344 C 300 372 420 384 540 372 C 600 366 650 350 680 336 C 620 362 520 376 420 376 C 340 376 280 366 250 344 Z" fill={`url(#${ids.belly})`} />

          {/* Pattern overlays per colorway */}
          {pattern === "twotone" && (
            <path
              d="M 512 234 C 600 240 664 262 706 302 C 688 330 606 368 512 378 C 490 330 490 280 512 234 Z"
              fill={patternColor}
              opacity="0.88"
            />
          )}
          {pattern === "spots" && (
            <>
              {[
                [400, 286, 9], [448, 306, 11], [500, 282, 8], [548, 314, 12], [596, 292, 9],
                [430, 342, 10], [486, 348, 8], [552, 346, 9], [614, 322, 8], [368, 320, 7],
              ].map(([cx, cy, r], i) => (
                <circle key={i} cx={cx} cy={cy} r={r} fill={patternColor} opacity="0.55" />
              ))}
            </>
          )}
          {pattern === "rosette" && (
            <>
              {[
                [392, 288], [446, 312], [502, 284], [556, 314], [610, 294], [472, 344], [538, 344],
              ].map(([cx, cy], i) => (
                <g key={i} stroke={patternColor} fill="none" opacity="0.5">
                  <path d={`M ${cx - 10} ${cy + 6} A 12 12 0 1 1 ${cx + 10} ${cy + 6}`} strokeWidth="2" />
                  <path d={`M ${cx - 6} ${cy + 8} A 7 7 0 1 1 ${cx + 6} ${cy + 8}`} strokeWidth="1.5" />
                </g>
              ))}
            </>
          )}
          {pattern === "sheen" && (
            <rect x="280" y="200" width="360" height="200" fill={`url(#${ids.sheen})`} transform="rotate(-14 460 300)" />
          )}

          {/* Scale arcs */}
          {[
            [380, 278], [430, 270], [480, 266], [530, 268], [580, 274],
            [400, 310], [450, 304], [500, 302], [550, 306],
            [420, 338], [470, 334], [520, 336], [570, 340],
          ].map(([x, y], i) => (
            <path
              key={i}
              d={`M ${x - 12} ${y} A 13 13 0 0 0 ${x + 12} ${y}`}
              fill="none"
              stroke={patternColor}
              strokeOpacity="0.14"
              strokeWidth="1.2"
            />
          ))}

          {/* Back highlight */}
          <path d="M 250 300 C 320 252 430 240 560 246" fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="2.4" />
        </g>

        {/* Gill + mouth */}
        <path d="M 344 266 C 358 300 358 342 346 374" fill="none" stroke="#05070a" strokeOpacity="0.22" strokeWidth="2.4" />
        <path d="M 228 332 C 240 338 250 342 262 344" fill="none" stroke="#05070a" strokeOpacity="0.32" strokeWidth="2" />

        {/* Eye */}
        <circle cx="296" cy="312" r="16" fill="#0b0d10" />
        <circle cx="296" cy="312" r="11" fill={`url(#${ids.iris})`} />
        <circle cx="296" cy="312" r="5.5" fill="#050608" />
        <circle cx="291" cy="307" r="3.4" fill="#ffffff" opacity="0.92" />
        <circle cx="301" cy="318" r="1.4" fill="#ffffff" opacity="0.6" />

        {/* Anal fin */}
        <path
          d="M 552 372 C 572 412 612 436 652 434 C 646 456 600 462 564 440 C 540 424 536 394 552 372 Z"
          fill={`url(#${ids.fin})`}
          opacity="0.9"
        />

        {/* Pectoral fin */}
        <g className={animated ? "gf-pectoral" : undefined}>
          <path
            d="M 336 356 C 306 396 300 444 322 470 C 344 492 372 462 372 424 C 372 392 356 368 336 356 Z"
            fill={`url(#${ids.fin})`}
            stroke={accent}
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <path d="M 340 366 Q 330 416 344 452" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
}
