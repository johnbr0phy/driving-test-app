"use client";

import { ReactNode } from "react";
import { BeatTiming, MistakeExplainer, MistakeManifest, ramp } from "@/lib/mistakeExplainers";
import { getTigerAsset, TigerExpression } from "@/lib/tigerAssets";

/**
 * One frame of a mistake explainer at time `t`: a 720 x 1280 blueprint stage
 * (top bar, the scene's drawing, the tiger and the caption). Everything is a
 * pure function of `t`, so the app player and the frame-by-frame film render
 * the same picture.
 */

export const W = 720;
export const H = 1280;
/** The drawing area scenes draw into (their own 0..600 x 0..680 box). */
export const DRAW = { x: 60, y: 250, w: 600, h: 680 };

export const INK = "#e8f1ff";
export const CYAN = "#5fd3ff";
export const DIM = "#7f9cc7";
export const ACCENT = "#ffcf3f";
export const GOOD = "#5ee39a";
export const BAD = "#ff6b6b";
export const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export interface SceneProps {
  t: number;
  /** A beat's timing by id (start, end). */
  at: (id: string) => BeatTiming;
}

/** Timing helpers for scenes. */
export function sceneHelpers({ t, at }: SceneProps) {
  /** 0..1 as beat `id` starts (+ delay). */
  const p = (id: string, delay = 0, dur = 0.8) => ramp(t, at(id).start + delay, dur);
  /** 0..1 at the moment the word `word` (index in that beat, or first match) is spoken. */
  const onWord = (id: string, word: string | number, dur = 0.6) => {
    const b = at(id);
    const i = typeof word === "number" ? word : b.words.findIndex((w) => w.w.toLowerCase().replace(/[^a-z0-9']/g, "") === word);
    const start = i >= 0 && b.words[i] ? b.words[i].start : b.start;
    return ramp(t, start, dur);
  };
  return { p, onWord };
}

/** A line drawn in as `k` goes 0..1 (pathLength trick). */
export function Draw({ d, k, stroke = INK, w = 3, dash, fill = "none", opacity = 1 }: { d: string; k: number; stroke?: string; w?: number; dash?: string; fill?: string; opacity?: number }) {
  if (k <= 0) return null;
  return (
    <>
      {fill !== "none" && <path d={d} fill={fill} opacity={k * opacity} stroke="none" />}
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={w}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={dash ? undefined : 1}
        strokeDasharray={dash ? undefined : `${k} 1`}
        style={dash ? { strokeDasharray: dash } : undefined}
        opacity={dash ? k * opacity : opacity}
      />
    </>
  );
}

/** Label text that fades and rises in. */
export function Label({ x, y, k, children, size = 22, fill = INK, anchor = "middle", weight = 600, mono = false }: { x: number; y: number; k: number; children: ReactNode; size?: number; fill?: string; anchor?: "start" | "middle" | "end"; weight?: number; mono?: boolean }) {
  if (k <= 0) return null;
  return (
    <text x={x} y={y + (1 - k) * 10} fontSize={size} fill={fill} opacity={k} textAnchor={anchor} fontWeight={weight} fontFamily={mono ? MONO : "inherit"}>
      {children}
    </text>
  );
}

/** A dimension line with end ticks and a centred label, drawn in with k. */
export function Dimension({ x1, y1, x2, y2, k, label, side = -1 }: { x1: number; y1: number; x2: number; y2: number; k: number; label?: string; side?: 1 | -1 }) {
  if (k <= 0) return null;
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const nx = (-dy / len) * 8, ny = (dx / len) * 8;
  const mx = (x1 + x2) / 2 + nx * 2.4 * side, my = (y1 + y2) / 2 + ny * 2.4 * side;
  return (
    <g opacity={Math.min(1, k * 1.4)}>
      <Draw d={`M${x1},${y1} L${x2},${y2}`} k={k} stroke={CYAN} w={1.6} />
      <path d={`M${x1 - nx},${y1 - ny} L${x1 + nx},${y1 + ny} M${x2 - nx},${y2 - ny} L${x2 + nx},${y2 + ny}`} stroke={CYAN} strokeWidth={1.6} />
      {label && <Label x={mx} y={my + 7} k={k} size={18} fill={CYAN} mono>{label}</Label>}
    </g>
  );
}

function Grid() {
  const lines: ReactNode[] = [];
  for (let x = 0; x <= W; x += 24) lines.push(<line key={`x${x}`} x1={x} y1={0} x2={x} y2={H} stroke="#ffffff" strokeOpacity={x % 120 === 0 ? 0.09 : 0.035} />);
  for (let y = 0; y <= H; y += 24) lines.push(<line key={`y${y}`} x1={0} y1={y} x2={W} y2={y} stroke="#ffffff" strokeOpacity={y % 120 === 0 ? 0.09 : 0.035} />);
  return <g>{lines}</g>;
}

/** The speaking beat and word at t. */
export function speaking(m: MistakeManifest, t: number) {
  let bi = 0;
  for (let i = 0; i < m.beats.length; i++) if (t >= m.beats[i].start - 0.05) bi = i;
  const beat = m.beats[bi];
  const wi = beat.words.findIndex((w) => t >= w.start && t < w.end);
  return { bi, wi, talking: wi >= 0 };
}

export function Stage({ ex, m, t, Scene, silent }: { ex: MistakeExplainer; m: MistakeManifest; t: number; Scene: (p: SceneProps) => ReactNode; silent?: boolean }) {
  const at = (id: string) => m.beats.find((b) => b.id === id) ?? m.beats[0];
  const { bi, wi, talking } = speaking(m, t);
  const beat = ex.beats[bi];
  const timing = m.beats[bi];
  // Talk: faces 3 (open) and 5 (closed) alternate word by word; emotive faces hold.
  let face: TigerExpression = beat.face;
  if (talking && (beat.face === 3 || beat.face === 4 || beat.face === 5)) face = wi % 2 === 0 ? 3 : 5;
  const bob = talking ? Math.sin(t * 11) * 2.5 : 0;
  const pop = ramp(t, timing.start, 0.25);
  const progress = Math.min(1, t / m.duration);
  const words = timing.words;
  const fadeIn = ramp(t, 0, 0.5);

  // Caption: up to ~5 lines of 26 chars, current word highlighted.
  const lines: { w: string; i: number }[][] = [[]];
  let len = 0;
  words.forEach((w, i) => {
    if (len + w.w.length > 30 && lines[lines.length - 1].length) { lines.push([]); len = 0; }
    lines[lines.length - 1].push({ w: w.w, i });
    len += w.w.length + 1;
  });

  // Five lines show; a longer line scrolls so the spoken word stays in view.
  const spokenUpTo = wi >= 0 ? wi : words.filter((w) => t >= w.end).length - 1;
  const cur = Math.max(0, lines.findIndex((ln) => ln.some((x) => x.i === spokenUpTo)));
  const first = lines.length <= 5 ? 0 : Math.min(Math.max(0, cur - 3), lines.length - 5);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-full" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }} role="img" aria-label={`${ex.title}: ${ex.beats.map((b) => b.say).join(" ")}`}>
      <defs>
        <radialGradient id="mx-bg" cx="50%" cy="35%" r="80%">
          <stop offset="0%" stopColor="#123a73" />
          <stop offset="100%" stopColor="#07152e" />
        </radialGradient>
        <clipPath id="mx-tiger"><circle cx={120} cy={1105} r={92} /></clipPath>
      </defs>
      <rect width={W} height={H} fill="url(#mx-bg)" />
      <Grid />

      {/* top bar */}
      <g opacity={fadeIn}>
        <rect x={40} y={48} width={W - 80} height={150} rx={22} fill="#0b2247" stroke="#2a4f86" />
        <text x={70} y={92} fontSize={20} fill={ACCENT} fontWeight={700} letterSpacing={2}>{"MOST MISSED · " + ex.testName.toUpperCase()}</text>
        <text x={70} y={140} fontSize={38} fill={INK} fontWeight={800}>{ex.title}</text>
        <text x={70} y={176} fontSize={18} fill={DIM} fontFamily={MONO}>{"tigertest.io"}</text>
      </g>

      {/* drawing */}
      <g transform={`translate(${DRAW.x},${DRAW.y})`}>
        <rect x={0} y={0} width={DRAW.w} height={DRAW.h} rx={18} fill="none" stroke="#2a4f86" strokeDasharray="6 8" opacity={0.7 * fadeIn} />
        <text x={14} y={DRAW.h - 12} fontSize={13} fill={DIM} fontFamily={MONO} opacity={0.8 * fadeIn}>{`FIG. ${ex.questionId}`}</text>
        {Scene({ t, at })}
      </g>

      {/* tiger */}
      <g transform={`translate(0, ${bob - (1 - pop) * 6})`}>
        <circle cx={120} cy={1105} r={96} fill="#ffffff" stroke={ACCENT} strokeWidth={5} />
        <image href={getTigerAsset(ex.examId, face)} x={20} y={1005} width={200} height={200} clipPath="url(#mx-tiger)" preserveAspectRatio="xMidYMid slice" />
      </g>

      {/* caption bubble */}
      <g>
        <path d={`M236,990 h444 a18,18 0 0 1 18,18 v178 a18,18 0 0 1 -18,18 h-444 a18,18 0 0 1 -18,-18 v-88 l-16,-12 l16,-12 v-66 a18,18 0 0 1 18,-18 z`} fill="#ffffff" />
        {lines.slice(first, first + 5).map((ln, li) => (
          <text key={first + li} x={252} y={1028 + li * 36} fontSize={27} fontWeight={600}>
            {ln.map(({ w, i }) => (
              <tspan key={i} fill={i === wi ? "#c2410c" : i < wi || (wi < 0 && t > (words[i]?.end ?? 0)) ? "#0f172a" : "#94a3b8"}>{w + " "}</tspan>
            ))}
          </text>
        ))}
      </g>

      {/* progress */}
      <rect x={40} y={H - 34} width={W - 80} height={6} rx={3} fill="#1d3a66" />
      <rect x={40} y={H - 34} width={(W - 80) * progress} height={6} rx={3} fill={ACCENT} />
      {silent && <text x={W - 44} y={H - 46} fontSize={16} fill={DIM} textAnchor="end">no sound</text>}
    </svg>
  );
}

/** The green answer card scenes show on the last beat. */
export function AnswerCard({ k, text, y = 600 }: { k: number; text: string; y?: number }) {
  if (k <= 0) return null;
  return (
    <g opacity={k} transform={`translate(0, ${(1 - k) * 16})`}>
      <rect x={30} y={y} width={540} height={58} rx={14} fill={GOOD} />
      <text x={300} y={y + 38} fontSize={24} fontWeight={800} fill="#05301a" textAnchor="middle">{"\u2713 " + text}</text>
    </g>
  );
}

/** A red "not this" tag with a strike. */
export function Wrong({ x, y, k, text }: { x: number; y: number; k: number; text: string }) {
  if (k <= 0) return null;
  const w = text.length * 12 + 28;
  return (
    <g opacity={k}>
      <rect x={x - w / 2} y={y - 24} width={w} height={36} rx={8} fill="#3a1020" stroke={BAD} />
      <text x={x} y={y + 1} fontSize={19} fontWeight={700} fill={BAD} textAnchor="middle">{text}</text>
      <Draw d={`M${x - w / 2 + 6},${y - 6} L${x + w / 2 - 6},${y - 6}`} k={ramp(k, 0.5, 0.5)} stroke={BAD} w={3} />
    </g>
  );
}

/** Point on a cubic Bezier at u. */
export function cubic(p0: number[], p1: number[], p2: number[], p3: number[], u: number): [number, number] {
  const a = (1 - u) ** 3, b = 3 * (1 - u) ** 2 * u, c = 3 * (1 - u) * u * u, d = u ** 3;
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]];
}
