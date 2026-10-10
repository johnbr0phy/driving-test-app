import { ScaleSpec } from "./types";

/** Piecewise-linear raw-to-scaled curve through anchor points (raw, scaled), rounded to `step`. */
export function curve(maxRaw: number, anchors: [number, number][], band: number, step = 10): ScaleSpec {
  const table: number[] = [];
  for (let raw = 0; raw <= maxRaw; raw++) {
    let i = 0;
    while (i < anchors.length - 2 && raw > anchors[i + 1][0]) i++;
    const [r0, s0] = anchors[i];
    const [r1, s1] = anchors[i + 1];
    const t = r1 === r0 ? 0 : (raw - r0) / (r1 - r0);
    table.push(Math.round((s0 + t * (s1 - s0)) / step) * step);
  }
  return { min: anchors[0][1], max: anchors[anchors.length - 1][1], table, band };
}

/** Percent correct, 0 to 100, for exams that report sections as percentages. */
export function percentScale(total: number): ScaleSpec {
  const table: number[] = [];
  for (let raw = 0; raw <= total; raw++) table.push(Math.round((raw / total) * 100));
  return { min: 0, max: 100, table, band: 0 };
}

/** Overall percent correct across every section. */
export function overallPercent(sections: { raw: number; total: number }[]): number {
  const raw = sections.reduce((a, s) => a + s.raw, 0);
  const total = sections.reduce((a, s) => a + s.total, 0);
  return total ? Math.round((raw / total) * 100) : 0;
}
