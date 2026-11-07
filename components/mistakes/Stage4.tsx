"use client";

import { ReactNode } from "react";
import { MistakeExplainer, MistakeManifest } from "@/lib/mistakeExplainers";
import { getTigerAsset, TigerExpression } from "@/lib/tigerAssets";
import { speaking } from "./Stage";
import { H, W } from "./Stage2";
import { brandFor, easeOut, SceneProps3 } from "./Stage3";

/**
 * Explainer frame, fourth design: dark and cinematic. A deep gradient with
 * slow drifting light, the scene full-bleed in the middle, the tiger host in
 * the corner, a quiet question line on top, and an end card that sells the
 * rest of the course. Scenes draw in a 720 x 760 box starting at y = 250.
 */

export const S4_Y = 250;
export const S4_H = 760;
export const WHITE = "#f8fafc";
export const DIM = "rgba(248,250,252,0.62)";
export const FAINT = "rgba(248,250,252,0.14)";

/** How long the end card holds after the last word. */
export const END_HOLD = 3.2;

function wrap(text: string, max: number) {
  const out: string[] = [""];
  for (const w of text.split(" ")) {
    if ((out[out.length - 1] + " " + w).trim().length > max) out.push(w);
    else out[out.length - 1] = (out[out.length - 1] + " " + w).trim();
  }
  return out;
}

/** Drifting out-of-focus specks of light; deterministic so every frame repeats exactly. */
function Bokeh({ t, tint }: { t: number; tint: string }) {
  const dots = Array.from({ length: 34 }, (_, i) => {
    const r = 3 + ((i * 37) % 11);
    const x = (i * 211 + 40) % W;
    const speed = 6 + ((i * 13) % 9);
    const y = (((i * 389) % H) - t * speed + H * 4) % H;
    const op = 0.05 + ((i * 7) % 10) / 70;
    return <circle key={i} cx={x + Math.sin(t * 0.3 + i) * 10} cy={y} r={r} fill={i % 3 === 0 ? tint : WHITE} opacity={op} />;
  });
  return <g filter="url(#mx4-soft)">{dots}</g>;
}

export function Stage4({ ex, m, t, Scene, testLabel, practiceLine }: {
  ex: MistakeExplainer; m: MistakeManifest; t: number; Scene: (p: SceneProps3) => ReactNode;
  /** e.g. "CRCST" */
  testLabel: string;
  /** End card second line, e.g. "4 full CRCST practice tests" */
  practiceLine: string;
}) {
  const at = (id: string) => m.beats.find((b) => b.id === id) ?? m.beats[0];
  const brand = brandFor(ex.examId);
  const { bi, wi, talking } = speaking(m, t);
  const beat = ex.beats[bi];
  let face: TigerExpression = beat.face;
  if (talking && (beat.face === 3 || beat.face === 4 || beat.face === 5)) face = wi % 2 === 0 ? 3 : 5;

  const last = m.beats[m.beats.length - 1];
  const spokenEnd = last.words.length ? last.words[last.words.length - 1].end : last.end;
  const endK = easeOut((t - spokenEnd - 0.5) / 0.7);
  const qLines = wrap(ex.question, 40).slice(0, 3);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-full" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }} role="img" aria-label={`${ex.title}: ${ex.beats.map((b) => b.say).join(" ")}`}>
      <defs>
        <radialGradient id="mx4-bg" cx="50%" cy="42%" r="80%">
          <stop offset="0%" stopColor="#0f3a4a" />
          <stop offset="45%" stopColor="#08202c" />
          <stop offset="100%" stopColor="#03080d" />
        </radialGradient>
        <radialGradient id="mx4-vig" cx="50%" cy="45%" r="75%">
          <stop offset="65%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
        <filter id="mx4-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="mx4-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="9" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="mx4-bigglow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="22" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="mx4-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#000" floodOpacity="0.45" />
        </filter>
        <filter id="mx4-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="11" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0" />
        </filter>
      </defs>

      <rect width={W} height={H} fill="url(#mx4-bg)" />
      <Bokeh t={t} tint={brand} />

      {/* top: the test chip, the draft mark, the question */}
      <g opacity={1 - endK}>
        <rect x={32} y={40} width={30 + testLabel.length * 13 + 168} height={38} rx={19} fill={FAINT} stroke="rgba(248,250,252,0.18)" />
        <circle cx={54} cy={59} r={6} fill={brand} filter="url(#mx4-glow)" />
        <text x={70} y={65} fontSize={17} fontWeight={800} fill={WHITE} letterSpacing={1.6}>{`${testLabel.toUpperCase()} · MOST MISSED`}</text>
        {ex.medical && (
          <g>
            <rect x={W - 32 - 176} y={42} width={176} height={34} rx={17} fill="none" stroke="#f87171" strokeOpacity={0.8} strokeWidth={1.5} />
            <text x={W - 32 - 88} y={64} fontSize={13} fontWeight={800} fill="#fca5a5" textAnchor="middle" letterSpacing={1.2}>DRAFT · NOT REVIEWED</text>
          </g>
        )}
        {qLines.map((l, i) => (
          <text key={i} x={34} y={130 + i * 34} fontSize={26} fontWeight={700} fill={DIM}>{l}</text>
        ))}
      </g>

      <g transform={`translate(0,${S4_Y})`} opacity={1 - endK}>{Scene({ t, at, duration: m.duration })}</g>

      {/* the host */}
      <g opacity={1 - endK}>
        <ellipse cx={128} cy={1238} rx={92} ry={14} fill="#000" opacity={0.45} filter="url(#mx4-soft)" />
        <image href={getTigerAsset(ex.examId, face)} x={18} y={1012} width={220} height={226} preserveAspectRatio="xMidYMax meet" />
      </g>

      {/* footer */}
      <g opacity={1 - endK}>
        <text x={W - 34} y={1226} fontSize={20} fontWeight={800} fill={DIM} textAnchor="end" letterSpacing={0.4}>tigertest.io</text>
        <rect x={262} y={1250} width={W - 262 - 34} height={4} rx={2} fill={FAINT} />
        <rect x={262} y={1250} width={(W - 262 - 34) * Math.min(1, t / spokenEnd)} height={4} rx={2} fill={brand} />
      </g>

      {/* end card */}
      {endK > 0 && (
        <g opacity={endK}>
          <g transform={`translate(360,470) scale(${0.92 + 0.08 * endK}) translate(-360,-470)`}>
            <circle cx={360} cy={420} r={150} fill={brand} opacity={0.22} filter="url(#mx4-bigglow)" />
            <image href={getTigerAsset(ex.examId, 2)} x={230} y={290} width={260} height={260} preserveAspectRatio="xMidYMid meet" />
            <text x={360} y={640} fontSize={64} fontWeight={800} fill={WHITE} textAnchor="middle" letterSpacing={-1}>Tigertest</text>
            <text x={360} y={700} fontSize={30} fontWeight={700} fill={WHITE} textAnchor="middle">{`Get ready for the ${testLabel}`}</text>
            <text x={360} y={744} fontSize={23} fontWeight={600} fill={DIM} textAnchor="middle">{practiceLine}</text>
            <rect x={210} y={790} width={300} height={70} rx={35} fill={brand} filter="url(#mx4-shadow)" />
            <text x={360} y={835} fontSize={27} fontWeight={800} fill={WHITE} textAnchor="middle">tigertest.io</text>
          </g>
        </g>
      )}

      <rect width={W} height={H} fill="url(#mx4-vig)" pointerEvents="none" />
      <rect width={W} height={H} filter="url(#mx4-grain)" opacity={0.06} pointerEvents="none" />
    </svg>
  );
}
