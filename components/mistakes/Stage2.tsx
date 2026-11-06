"use client";

import { ReactNode } from "react";
import { MistakeExplainer, MistakeManifest, ramp } from "@/lib/mistakeExplainers";
import { getTigerAsset, TigerExpression } from "@/lib/tigerAssets";
import { SceneProps, speaking } from "./Stage";

/**
 * Explainer frame, second design: drafting paper, real sign art, one idea on
 * screen at a time (each beat's scene fades in over the last), the tiger as a
 * large presenter, and big two-line captions.
 */

export const W = 720;
export const H = 1280;
/** The scene box: scenes draw in 0..720 x 0..680. */
export const SCENE_Y = 250;
export const SCENE_H = 680;

export const PAPER = "#f7f4ec";
export const INK = "#1b2a41";
export const SOFT = "#6b7a90";
export const BLUE = "#2563eb";
export const ORANGE = "#ea580c";
export const GREEN = "#15803d";
export const RED = "#dc2626";
export const MONO_FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/** Scene opacity for a beat range: fades in at `from`, out when `until` starts. */
export function window2(t: number, at: SceneProps["at"], from: string, until?: string) {
  const a = ramp(t, at(from).start - 0.15, 0.45);
  const b = until ? 1 - ramp(t, at(until).start - 0.3, 0.35) : 1;
  return Math.min(a, b);
}

function wrap(text: string, max: number) {
  const out: string[] = [""];
  for (const w of text.split(" ")) {
    if ((out[out.length - 1] + " " + w).trim().length > max) out.push(w);
    else out[out.length - 1] = (out[out.length - 1] + " " + w).trim();
  }
  return out;
}

export function Stage2({ ex, m, t, Scene, question }: { ex: MistakeExplainer; m: MistakeManifest; t: number; Scene: (p: SceneProps) => ReactNode; question: string }) {
  const at = (id: string) => m.beats.find((b) => b.id === id) ?? m.beats[0];
  const { bi, wi, talking } = speaking(m, t);
  const beat = ex.beats[bi];
  const words = m.beats[bi].words;
  let face: TigerExpression = beat.face;
  if (talking && (beat.face === 3 || beat.face === 4 || beat.face === 5)) face = wi % 2 === 0 ? 3 : 5;

  // Captions: lines of ~24 characters; show the two that hold the spoken word.
  const lines: number[][] = [[]];
  let len = 0;
  words.forEach((w, i) => {
    if (len + w.w.length > 21 && lines[lines.length - 1].length) { lines.push([]); len = 0; }
    lines[lines.length - 1].push(i);
    len += w.w.length + 1;
  });
  const upTo = wi >= 0 ? wi : words.filter((w) => t >= w.end).length - 1;
  const cur = Math.max(0, lines.findIndex((ln) => ln.includes(upTo)));
  const first = Math.min(Math.floor(cur / 2) * 2, Math.max(0, lines.length - 2));
  const qLines = wrap(question, 30);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-full" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }} role="img" aria-label={`${ex.title}: ${ex.beats.map((b) => b.say).join(" ")}`}>
      <defs>
        <pattern id="mx2-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24,0 H0 V24" fill="none" stroke="#b9c6dc" strokeWidth="0.7" />
        </pattern>
        <pattern id="mx2-grid5" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M120,0 H0 V120" fill="none" stroke="#9fb0cc" strokeWidth="1.2" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={PAPER} />
      <rect width={W} height={H} fill="url(#mx2-grid)" opacity={0.55} />
      <rect width={W} height={H} fill="url(#mx2-grid5)" opacity={0.45} />

      {/* header: the test, then the question itself */}
      <text x={40} y={70} fontSize={20} fontWeight={800} fill={ORANGE} letterSpacing={1.5}>{"MOST MISSED · " + ex.testName.toUpperCase()}</text>
      {qLines.map((l, i) => (
        <text key={i} x={40} y={122 + i * 46} fontSize={38} fontWeight={800} fill={INK}>{l}</text>
      ))}
      <line x1={40} y1={SCENE_Y - 18} x2={W - 40} y2={SCENE_Y - 18} stroke={INK} strokeWidth={2} opacity={0.15} />

      <g transform={`translate(0,${SCENE_Y})`}>{Scene({ t, at })}</g>

      {/* the tiger, presenting */}
      <image href={getTigerAsset(ex.examId, face)} x={6} y={960} width={270} height={270} preserveAspectRatio="xMidYMax meet" />

      {/* captions */}
      <rect x={270} y={985} width={420} height={170} rx={24} fill="#ffffff" stroke={INK} strokeOpacity={0.12} strokeWidth={2} />
      <path d="M270,1080 l-20,12 l20,10 z" fill="#ffffff" />
      {lines.slice(first, first + 2).map((ln, li) => (
        <text key={first + li} x={294} y={1056 + li * 48} fontSize={33} fontWeight={800}>
          {ln.map((i) => (
            <tspan key={i} fill={i === wi ? ORANGE : i <= upTo ? INK : "#a3acb9"}>{words[i].w + " "}</tspan>
          ))}
        </text>
      ))}

      <text x={W / 2} y={H - 40} fontSize={22} fontWeight={800} fill={INK} opacity={0.55} textAnchor="middle">tigertest.io</text>
      <rect x={40} y={H - 24} width={W - 80} height={6} rx={3} fill="#d9dee7" />
      <rect x={40} y={H - 24} width={(W - 80) * Math.min(1, t / m.duration)} height={6} rx={3} fill={ORANGE} />
    </svg>
  );
}

/** A real sign image (public/signs), centred on (x,y), `size` wide. */
export function Sign({ name, x, y, size, k = 1, rotate = 0 }: { name: string; x: number; y: number; size: number; k?: number; rotate?: number }) {
  if (k <= 0) return null;
  const s = 0.85 + 0.15 * k;
  return (
    <g opacity={k} transform={`translate(${x},${y}) rotate(${rotate}) scale(${s})`}>
      <image href={`/signs/${name}.svg`} x={-size / 2} y={-size / 2} width={size} height={size} preserveAspectRatio="xMidYMid meet" />
    </g>
  );
}

/** A thick hand-drawn style arrow along a quadratic curve, drawn in by k. */
export function CurveArrow({ d, k, color, w = 12, head }: { d: string; k: number; color: string; w?: number; head: [number, number, number] }) {
  if (k <= 0) return null;
  const [hx, hy, ang] = head;
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" pathLength={1} strokeDasharray={`${k} 1`} />
      {k > 0.92 && <path d="M0,0 L-30,-17 L-30,17 Z" fill={color} transform={`translate(${hx},${hy}) rotate(${ang})`} />}
    </g>
  );
}

/** Note text in the scene. */
export function Note({ x, y, k, children, size = 30, color = INK, anchor = "middle", weight = 800 }: { x: number; y: number; k: number; children: ReactNode; size?: number; color?: string; anchor?: "start" | "middle" | "end"; weight?: number }) {
  if (k <= 0) return null;
  return <text x={x} y={y + (1 - k) * 12} fontSize={size} fontWeight={weight} fill={color} opacity={k} textAnchor={anchor}>{children}</text>;
}
