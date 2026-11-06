"use client";

import { ReactNode } from "react";
import { MistakeExplainer, MistakeManifest } from "@/lib/mistakeExplainers";
import { getTigerAsset, TigerExpression } from "@/lib/tigerAssets";
import { SceneProps, speaking } from "./Stage";
import { H, INK, ORANGE, PAPER, SCENE_Y, W } from "./Stage2";

/**
 * Explainer frame, third design (the "premium" pass): Stage2's layout with
 * paper grain, soft card shadows, eased camera shots that push in while a
 * beat plays and hand over to the next. No captions: the drawing and the
 * voice carry the explanation (captions pulled the eye off the drawing).
 */

/** Each test's brand colour (globals.css --brand). */
const BRAND: Record<string, string> = {
  dmv: "#c25105",
  crcst: "hsl(195, 85%, 34.3%)",
  ccma: "hsl(188, 70%, 32.8%)",
  ptcb: "hsl(292, 60%, 42%)",
};
export const brandFor = (examId: string) => BRAND[examId] ?? ORANGE;

/** Scene props plus the video length, for the last shot. */
export type SceneProps3 = SceneProps & { duration: number };

const clamp = (x: number) => Math.min(1, Math.max(0, x));
export const easeOut = (x: number) => 1 - Math.pow(1 - clamp(x), 3);
export const easeIn = (x: number) => Math.pow(clamp(x), 3);
export const easeInOut = (x: number) => { const c = clamp(x); return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2; };
/** Ease out with a small overshoot, for things that pop into place. */
export const easeBack = (x: number) => { const c = clamp(x); const s = 1.4; return 1 + (s + 1) * Math.pow(c - 1, 3) + s * Math.pow(c - 1, 2); };

/** When `word` (text or index) of beat `id` is spoken. */
export function wordAt(m: MistakeManifest, id: string, word: string | number) {
  const b = m.beats.find((x) => x.id === id) ?? m.beats[0];
  const i = typeof word === "number" ? word : b.words.findIndex((w) => w.w.toLowerCase().replace(/[^a-z0-9'-]/g, "") === word);
  return i >= 0 && b.words[i] ? b.words[i].start : b.start;
}

export type SfxName = "pop" | "pencil" | "chime";
export interface SoundCue { t: number; s: SfxName; gain?: number }

/**
 * A camera shot: the group enters (fade, rise, settle from 96%), drifts
 * between `zoom[0]` and `zoom[1]` around `focus` for the shot's life, then
 * leaves (fade, lift, slight push) as the next shot arrives.
 */
export function Shot({ t, at, from, until, end, zoom = [1, 1.04], focus = [360, 340], children }: {
  t: number; at: SceneProps["at"]; from: string; until?: string; end?: number; zoom?: [number, number]; focus?: [number, number]; children: ReactNode;
}) {
  const s0 = at(from).start - 0.2;
  const s1 = until ? at(until).start - 0.35 : (end ?? s0 + 10);
  const enter = easeOut((t - s0) / 0.6);
  const exit = until ? easeIn((t - s1) / 0.4) : 0;
  const k = enter * (1 - exit);
  if (k <= 0.001) return null;
  const life = easeInOut((t - s0) / Math.max(1, s1 - s0 + 0.4));
  const scale = (zoom[0] + (zoom[1] - zoom[0]) * life) * (0.96 + 0.04 * enter) * (1 + 0.03 * exit);
  const dy = (1 - enter) * 26 - exit * 18;
  const [fx, fy] = focus;
  return (
    <g opacity={k} transform={`translate(0,${dy}) translate(${fx},${fy}) scale(${scale}) translate(${-fx},${-fy})`}>
      {children}
    </g>
  );
}

/** A real sign image that pops into place (k 0..1, eased with overshoot). */
export function Sign3({ name, x, y, size, k = 1, rotate = 0, shadow = true }: { name: string; x: number; y: number; size: number; k?: number; rotate?: number; shadow?: boolean }) {
  if (k <= 0) return null;
  const s = 0.75 + 0.25 * easeBack(k);
  return (
    <g opacity={clamp(k * 1.6)} transform={`translate(${x},${y}) rotate(${rotate}) scale(${s})`} filter={shadow ? "url(#mx3-sign-shadow)" : undefined}>
      <image href={`/signs/${name}.svg`} x={-size / 2} y={-size / 2} width={size} height={size} preserveAspectRatio="xMidYMid meet" />
    </g>
  );
}

/** A white card with a soft shadow. */
export function Card({ x, y, w, h, r = 24 }: { x: number; y: number; w: number; h: number; r?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill="#fff" filter="url(#mx3-shadow)" />;
}

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";

export function Stage3({ ex, m, t, Scene, question }: { ex: MistakeExplainer; m: MistakeManifest; t: number; Scene: (p: SceneProps3) => ReactNode; question: string }) {
  const at = (id: string) => m.beats.find((b) => b.id === id) ?? m.beats[0];
  const brand = brandFor(ex.examId);
  const { bi, wi, talking } = speaking(m, t);
  const beat = ex.beats[bi];
  let face: TigerExpression = beat.face;
  if (talking && (beat.face === 3 || beat.face === 4 || beat.face === 5)) face = wi % 2 === 0 ? 3 : 5;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-full" style={{ fontFamily: FONT }} role="img" aria-label={`${ex.title}: ${ex.beats.map((b) => b.say).join(" ")}`}>
      <defs>
        <pattern id="mx3-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24,0 H0 V24" fill="none" stroke="#b9c6dc" strokeWidth="0.7" />
        </pattern>
        <pattern id="mx3-grid5" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M120,0 H0 V120" fill="none" stroke="#9fb0cc" strokeWidth="1.2" />
        </pattern>
        <filter id="mx3-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0.55 0" />
        </filter>
        <radialGradient id="mx3-vignette" cx="50%" cy="45%" r="75%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#3b2f1a" stopOpacity="0.18" />
        </radialGradient>
        <filter id="mx3-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#1b2a41" floodOpacity="0.14" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1b2a41" floodOpacity="0.08" />
        </filter>
        <filter id="mx3-sign-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#1b2a41" floodOpacity="0.22" />
        </filter>
      </defs>
      <rect width={W} height={H} fill={PAPER} />
      <rect width={W} height={H} fill="url(#mx3-grid)" opacity={0.45} />
      <rect width={W} height={H} fill="url(#mx3-grid5)" opacity={0.35} />

      {/* header */}
      <g opacity={easeOut(t / 0.5)}>
        <rect x={40} y={46} width={8} height={30} rx={4} fill={brand} />
        <text x={58} y={70} fontSize={20} fontWeight={800} fill={brand} letterSpacing={1.8}>{"MOST MISSED · " + ex.testName.toUpperCase()}</text>
        {/* a healthcare explainer stays marked as a draft until a qualified person reviews it */}
        {ex.medical && (
          <g>
            <rect x={W - 40 - 214} y={47} width={214} height={30} rx={15} fill="none" stroke="#dc2626" strokeWidth={2} />
            <text x={W - 40 - 107} y={68} fontSize={15} fontWeight={800} fill="#dc2626" textAnchor="middle" letterSpacing={1.2}>DRAFT · NOT REVIEWED</text>
          </g>
        )}
        {wrapText(question, 30).map((l, i) => (
          <text key={i} x={40} y={124 + i * 46} fontSize={38} fontWeight={800} fill={INK} letterSpacing={-0.4}>{l}</text>
        ))}
      </g>
      <line x1={40} y1={SCENE_Y - 18} x2={W - 40} y2={SCENE_Y - 18} stroke={INK} strokeWidth={2} opacity={0.12} />

      <g transform={`translate(0,${SCENE_Y})`}>{Scene({ t, at, duration: m.duration })}</g>

      {/* the tiger, presenting (no captions: the drawing carries the words) */}
      <image href={getTigerAsset(ex.examId, face)} x={(W - 290) / 2} y={928} width={290} height={276} preserveAspectRatio="xMidYMax meet" />

      <text x={W / 2} y={H - 40} fontSize={22} fontWeight={800} fill={INK} opacity={0.5} textAnchor="middle" letterSpacing={0.5}>tigertest.io</text>
      <rect x={40} y={H - 24} width={W - 80} height={6} rx={3} fill="#d9dee7" />
      <rect x={40} y={H - 24} width={(W - 80) * Math.min(1, t / m.duration)} height={6} rx={3} fill={brand} />

      {/* paper grain and a soft vignette over everything */}
      <rect width={W} height={H} filter="url(#mx3-grain)" opacity={0.22} style={{ mixBlendMode: "multiply" }} pointerEvents="none" />
      <rect width={W} height={H} fill="url(#mx3-vignette)" pointerEvents="none" />
    </svg>
  );
}

function wrapText(text: string, max: number) {
  const out: string[] = [""];
  for (const w of text.split(" ")) {
    if ((out[out.length - 1] + " " + w).trim().length > max) out.push(w);
    else out[out.length - 1] = (out[out.length - 1] + " " + w).trim();
  }
  return out;
}
