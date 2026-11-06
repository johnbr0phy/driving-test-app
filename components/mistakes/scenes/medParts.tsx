import { INK, SOFT } from "../Stage2";
import { Card, easeBack, easeOut } from "../Stage3";

/**
 * Pieces for the healthcare explainers, which teach from the source's own
 * words: a quote card that shows the official sentence on screen with its
 * source named, the exam's four options, and the answer card. Every label
 * drawn here must be in that explainer's claim ledger (tools/mistakes/claims).
 */

export const GOOD = "#15803d";

/** Breaks text into lines of at most `max` characters. */
export function wrap(text: string, max: number) {
  const out: string[] = [""];
  for (const w of text.split(" ")) {
    if ((out[out.length - 1] + " " + w).trim().length > max) out.push(w);
    else out[out.length - 1] = (out[out.length - 1] + " " + w).trim();
  }
  return out;
}

/**
 * An official sentence on a card: the source above, the quote in quote
 * marks, the words in `mark` underlined in the brand colour as `k` runs.
 */
export function QuoteCard({ x = 40, y, w = 640, source, quote, k, brand, size = 27, mark }: {
  x?: number; y: number; w?: number; source: string; quote: string; k: number; brand: string; size?: number; mark?: string;
}) {
  if (k <= 0) return null;
  const per = Math.floor((w - 70) / (size * 0.52));
  const lines = wrap(`“${quote}”`, per);
  const lh = size * 1.32;
  const h = 78 + lines.length * lh;
  const markLc = mark?.toLowerCase();
  const s = 0.94 + 0.06 * easeBack(k);
  return (
    <g opacity={Math.min(1, k * 1.6)} transform={`translate(${x + w / 2},${y + h / 2}) scale(${s}) translate(${-(x + w / 2)},${-(y + h / 2)})`}>
      <Card x={x} y={y} w={w} h={h} />
      <rect x={x} y={y + 18} width={6} height={h - 36} rx={3} fill={brand} />
      <text x={x + 32} y={y + 40} fontSize={17} fontWeight={800} fill={brand} letterSpacing={1.4}>{source.toUpperCase()}</text>
      {lines.map((ln, i) => {
        const hit = markLc && ln.toLowerCase().includes(markLc);
        return (
          <text key={i} x={x + 32} y={y + 76 + i * lh} fontSize={size} fontWeight={700} fill={INK}>
            {hit ? splitMark(ln, mark!, brand, easeOut(k * 1.4 - 0.4)) : ln}
          </text>
        );
      })}
    </g>
  );
}

function splitMark(line: string, mark: string, brand: string, k: number) {
  const i = line.toLowerCase().indexOf(mark.toLowerCase());
  return (
    <>
      {line.slice(0, i)}
      <tspan fill={brand} textDecoration={k > 0.5 ? "underline" : undefined}>{line.slice(i, i + mark.length)}</tspan>
      {line.slice(i + mark.length)}
    </>
  );
}

/** The exam's four options in a 2 x 2 grid; the key turns green as `reveal` runs. */
export function OptionGrid({ options, keyIndex, k, reveal, y = 60 }: { options: string[]; keyIndex: number; k: number; reveal: number; y?: number }) {
  if (k <= 0) return null;
  return (
    <g>
      {options.map((o, i) => {
        const cx = i % 2 === 0 ? 40 : 370;
        const cy = y + Math.floor(i / 2) * 250;
        const right = i === keyIndex;
        const kk = Math.max(0, Math.min(1, (k - i * 0.12) * 1.6));
        const dim = reveal > 0 && !right ? 1 - 0.65 * reveal : 1;
        const lines = wrap(o, 17);
        return (
          <g key={i} opacity={kk * dim} transform={`translate(${cx + 155},${cy + 105}) scale(${0.9 + 0.1 * easeBack(kk)}) translate(${-(cx + 155)},${-(cy + 105)})`}>
            <Card x={cx} y={cy} w={310} h={210} />
            {right && reveal > 0 && <rect x={cx} y={cy} width={310} height={210} rx={24} fill="none" stroke={GOOD} strokeWidth={6} opacity={reveal} />}
            <circle cx={cx + 40} cy={cy + 42} r={22} fill={right && reveal > 0.5 ? GOOD : "#e5e7eb"} />
            <text x={cx + 40} y={cy + 51} fontSize={24} fontWeight={800} fill={right && reveal > 0.5 ? "#fff" : SOFT} textAnchor="middle">{"ABCD"[i]}</text>
            {lines.map((ln, j) => (
              <text key={j} x={cx + 26} y={cy + 112 + j * 34 - (lines.length - 1) * 8} fontSize={28} fontWeight={800} fill={INK}>{ln}</text>
            ))}
          </g>
        );
      })}
    </g>
  );
}

/** The green answer card that closes every explainer. */
export function AnswerCard({ k, text, y = 520 }: { k: number; text: string; y?: number }) {
  if (k <= 0) return null;
  const lines = wrap(text, 32);
  const h = 70 + lines.length * 40;
  return (
    <g opacity={Math.min(1, k * 2)} transform={`translate(360,${y + h / 2}) scale(${0.8 + 0.2 * easeBack(k)}) translate(-360,${-(y + h / 2)})`}>
      <rect x={30} y={y} width={660} height={h} rx={22} fill={GOOD} filter="url(#mx3-sign-shadow)" />
      <text x={360} y={y + 42} fontSize={22} fontWeight={800} fill="#dcfce7" textAnchor="middle" letterSpacing={1.5}>THE ANSWER</text>
      {lines.map((ln, i) => (
        <text key={i} x={360} y={y + 84 + i * 40} fontSize={31} fontWeight={800} fill="#fff" textAnchor="middle">{ln}</text>
      ))}
    </g>
  );
}
