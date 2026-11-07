import { MistakeManifest } from "@/lib/mistakeExplainers";

/**
 * Shared pieces for the hand-made explainer styles (Khan-style board,
 * Osmosis-style whiteboard, cartoon): fonts, a write-on text effect, a
 * draw-on path, wobbly hand-drawn shapes and word timing. Everything is a
 * pure function of the clock t so frames film exactly.
 */

export const W = 720;
export const H = 1280;
export const clamp = (x: number) => Math.min(1, Math.max(0, x));
export const easeOut = (x: number) => 1 - Math.pow(1 - clamp(x), 3);
export const easeInOut = (x: number) => { const c = clamp(x); return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2; };
export const easeBack = (x: number) => { const c = clamp(x); const s = 1.5; return 1 + (s + 1) * Math.pow(c - 1, 3) + s * Math.pow(c - 1, 2); };
/** Deterministic pseudo-random 0..1. */
export const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

export const FONTS = `
@font-face { font-family: 'TT Caveat'; src: url('/fonts/mistakes/caveat.woff2') format('woff2'); font-weight: 400 700; font-display: block; }
@font-face { font-family: 'TT Patrick'; src: url('/fonts/mistakes/patrick-hand-sc.woff2') format('woff2'); font-display: block; }
@font-face { font-family: 'TT Fredoka'; src: url('/fonts/mistakes/fredoka.woff2') format('woff2'); font-weight: 300 700; font-display: block; }
`;

/** Word timing from the voice manifest. */
export function timing(m: MistakeManifest) {
  const beat = (id: string) => m.beats.find((b) => b.id === id) ?? m.beats[0];
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9'-]/g, "");
  /** When `word` (or its nth occurrence) is spoken in beat `id`; the beat start if not found. */
  const at = (id: string, word?: string, nth = 0) => {
    const b = beat(id);
    if (!word) return b.start;
    const hits = b.words.filter((w) => norm(w.w) === word);
    return hits[nth] ? hits[nth].start : b.start;
  };
  const last = m.beats[m.beats.length - 1];
  const spokenEnd = last.words.length ? last.words[last.words.length - 1].end : last.end;
  return { at, spokenEnd };
}

/** Rough per-character width as a share of font size, by font. */
const CHAR_W: Record<string, number> = { caveat: 0.44, patrick: 0.5, fredoka: 0.56 };

/**
 * Text that writes itself on, left to right, starting at `start` and taking
 * about `perChar` seconds a character. `id` must be unique in the frame.
 */
export function Write({ id, t, start, x, y, text, size, color, font = "caveat", weight = 700, perChar = 0.045, anchor = "start", opacity = 1, italic = false }: {
  id: string; t: number; start: number; x: number; y: number; text: string; size: number; color: string;
  font?: "caveat" | "patrick" | "fredoka"; weight?: number; perChar?: number; anchor?: "start" | "middle" | "end"; opacity?: number; italic?: boolean;
}) {
  const dur = Math.max(0.25, text.length * perChar);
  const k = clamp((t - start) / dur);
  if (k <= 0) return null;
  const width = text.length * size * CHAR_W[font] * 1.15 + size;
  const x0 = anchor === "start" ? x : anchor === "middle" ? x - width / 2 : x - width;
  const family = font === "caveat" ? "TT Caveat" : font === "patrick" ? "TT Patrick" : "TT Fredoka";
  return (
    <g opacity={opacity}>
      <clipPath id={`wr-${id}`}><rect x={x0 - 4} y={y - size * 1.2} width={k >= 1 ? width + 2000 : width * k} height={size * 1.7} /></clipPath>
      <text x={x} y={y} fontSize={size} fontWeight={weight} fill={color} textAnchor={anchor} fontFamily={family} fontStyle={italic ? "italic" : undefined} clipPath={`url(#wr-${id})`}>{text}</text>
    </g>
  );
}

/** A path drawn on over `dur` seconds from `start`. */
export function Draw({ t, start, dur = 0.6, d, stroke, width = 4, fill = "none", fillOpacity = 1, dash, opacity = 1 }: {
  t: number; start: number; dur?: number; d: string; stroke: string; width?: number; fill?: string; fillOpacity?: number; dash?: string; opacity?: number;
}) {
  const k = easeInOut((t - start) / dur);
  if (k <= 0) return null;
  return (
    <g opacity={opacity}>
      {fill !== "none" && <path d={d} fill={fill} opacity={fillOpacity * clamp((t - start - dur * 0.7) / 0.3)} stroke="none" />}
      <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" pathLength={dash ? undefined : 1} strokeDasharray={dash ?? `${k} 1`} />
    </g>
  );
}

/** A slightly wobbly ellipse as a closed path, like a quick pen circle. */
export function wobblyEllipse(cx: number, cy: number, rx: number, ry: number, seed = 1, wob = 0.05, turns = 1.06) {
  const n = 28;
  let d = "";
  for (let i = 0; i <= n * turns; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const j = 1 + (rnd(seed * 31 + i) - 0.5) * wob * 2;
    const x = cx + Math.cos(a) * rx * j;
    const y = cy + Math.sin(a) * ry * j;
    d += (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1) + " ";
  }
  return d;
}

/** A rod (capsule) outline from left to right, slightly wobbly. */
export function capsule(cx: number, cy: number, w: number, h: number, rot = 0, seed = 1) {
  const r = h / 2;
  const pts: [number, number][] = [];
  const L = w / 2 - r;
  for (let i = 0; i <= 12; i++) { const a = -Math.PI / 2 + (i / 12) * Math.PI; pts.push([L + Math.cos(a) * r, Math.sin(a) * r]); }
  for (let i = 0; i <= 12; i++) { const a = Math.PI / 2 + (i / 12) * Math.PI; pts.push([-L + Math.cos(a) * r, Math.sin(a) * r]); }
  pts.push(pts[0]);
  const c = Math.cos((rot * Math.PI) / 180), s = Math.sin((rot * Math.PI) / 180);
  return pts.map(([x, y], i) => {
    const j = 1 + (rnd(seed * 17 + i) - 0.5) * 0.03;
    const X = cx + (x * c - y * s) * j, Y = cy + (x * s + y * c) * j;
    return (i === 0 ? "M" : "L") + X.toFixed(1) + "," + Y.toFixed(1);
  }).join(" ");
}

/** A hand-drawn arrow from (x1,y1) to (x2,y2) with a slight bow. */
export function arrow(x1: number, y1: number, x2: number, y2: number, bow = 0.12) {
  const mx = (x1 + x2) / 2 - (y2 - y1) * bow, my = (y1 + y2) / 2 + (x2 - x1) * bow;
  const a = Math.atan2(y2 - my, x2 - mx);
  const h = 16;
  const l = [x2 - Math.cos(a - 0.45) * h, y2 - Math.sin(a - 0.45) * h];
  const r = [x2 - Math.cos(a + 0.45) * h, y2 - Math.sin(a + 0.45) * h];
  return `M${x1},${y1} Q${mx},${my} ${x2},${y2} M${l[0]},${l[1]} L${x2},${y2} L${r[0]},${r[1]}`;
}

/** A check mark centred on (x,y). */
export const check = (x: number, y: number, s = 1) => `M${x - 18 * s},${y} L${x - 4 * s},${y + 16 * s} L${x + 22 * s},${y - 20 * s}`;
/** A wobbly rectangle. */
export function box(x: number, y: number, w: number, h: number, seed = 1) {
  const j = (i: number) => (rnd(seed * 13 + i) - 0.5) * 6;
  return `M${x + j(1)},${y + j(2)} L${x + w + j(3)},${y + j(4)} L${x + w + j(5)},${y + h + j(6)} L${x + j(7)},${y + h + j(8)} Z`;
}
