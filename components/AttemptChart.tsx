"use client";

// Score-over-attempts line chart shown in the dashboard's test drop-down.
// x = attempt (evenly spaced, labeled with the date where it changes),
// y = score %, dashed line at the 80% pass mark.

import { useState } from "react";
import { TestSession } from "@/types";
import { useTranslation } from "@/contexts/LanguageContext";

export interface AttemptPoint {
  n: number;
  date: string;
  score: number;
  total: number;
  pct: number;
  passed: boolean;
}

function formatDate(value: Date | string | undefined, locale: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(locale, { month: "short", day: "numeric" });
}

export function sessionsToAttemptPoints(
  sessions: TestSession[],
  locale: string = "en-US"
): AttemptPoint[] {
  return sessions.map((s, i) => {
    const total = s.totalQuestions || 50;
    const score = s.score ?? 0;
    const pct = Math.round((score / total) * 100);
    return {
      n: i + 1,
      date: formatDate(s.completedAt ?? s.startedAt, locale),
      score,
      total,
      pct,
      passed: pct >= 80,
    };
  });
}

export function AttemptChart({ attempts }: { attempts: AttemptPoint[] }) {
  const { t } = useTranslation();
  const [hover, setHover] = useState<number | null>(null);
  const W = 600;
  const H = 210;
  const PAD = { l: 38, r: 14, t: 26, b: 26 };
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;
  const x = (i: number) =>
    attempts.length === 1 ? PAD.l + iw / 2 : PAD.l + (i / (attempts.length - 1)) * iw;
  const y = (pct: number) => PAD.t + (1 - pct / 100) * ih;

  // Label the first attempt of each distinct date; thin out if crowded
  let labelIdx = attempts
    .map((a, i) => (i === 0 || a.date !== attempts[i - 1].date ? i : -1))
    .filter((i) => i >= 0);
  if (labelIdx.length > 5) {
    const stride = Math.ceil(labelIdx.length / 5);
    labelIdx = labelIdx.filter((_, k) => k % stride === 0 || k === labelIdx.length - 1);
  }

  const linePath = attempts.map((a, i) => `${i ? "L" : "M"}${x(i)},${y(a.pct)}`).join(" ");
  const last = attempts.length - 1;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label={attempts.map((a) => `${a.pct}%`).join(", ")}
      onMouseLeave={() => setHover(null)}
    >
      {/* Gridlines + y labels */}
      {[0, 50, 100].map((v) => (
        <g key={v}>
          <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} className="stroke-gray-100" strokeWidth="1" />
          <text x={PAD.l - 7} y={y(v) + 3} textAnchor="end" className="fill-gray-400" fontSize="10">
            {v}%
          </text>
        </g>
      ))}
      {/* Pass line */}
      <line
        x1={PAD.l}
        x2={W - PAD.r}
        y1={y(80)}
        y2={y(80)}
        className="stroke-green-500"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.6"
      />
      <text x={W - PAD.r} y={y(80) - 5} textAnchor="end" className="fill-green-600" fontSize="10">
        {t("dashboard.chartPassLine")}
      </text>

      {/* Date labels */}
      {labelIdx.map((i) => (
        <text
          key={i}
          x={x(i)}
          y={H - 8}
          textAnchor={i === 0 ? "start" : i === last ? "end" : "middle"}
          className="fill-gray-400"
          fontSize="10"
        >
          {attempts[i].date}
        </text>
      ))}

      {/* Score line + points */}
      <path d={linePath} fill="none" className="stroke-brand" strokeWidth="2" strokeLinejoin="round" />
      {attempts.map((a, i) => (
        <g key={i}>
          <circle
            cx={x(i)}
            cy={y(a.pct)}
            r={hover === i ? 5.5 : 4}
            className={`${a.passed ? "fill-green-500" : "fill-brand"} stroke-white`}
            strokeWidth="2"
          />
          {/* invisible hit target */}
          <rect
            x={x(i) - (attempts.length > 1 ? iw / (attempts.length - 1) / 2 : iw / 2)}
            y={PAD.t}
            width={attempts.length > 1 ? iw / (attempts.length - 1) : iw}
            height={ih}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
          />
        </g>
      ))}

      {/* Direct label on the latest attempt (hidden while hovering another) */}
      {(hover === null || hover === last) && (
        <text
          x={x(last)}
          y={y(attempts[last].pct) - 10}
          textAnchor={last === 0 ? "middle" : "end"}
          className="fill-gray-700"
          fontSize="11"
          fontWeight="bold"
        >
          {attempts[last].pct}%
        </text>
      )}

      {/* Hover tooltip */}
      {hover !== null && hover !== last && (
        <text
          x={Math.min(Math.max(x(hover), PAD.l + 40), W - PAD.r - 40)}
          y={Math.max(y(attempts[hover].pct) - 10, 12)}
          textAnchor="middle"
          className="fill-gray-700"
          fontSize="11"
          fontWeight="bold"
        >
          {attempts[hover].score}/{attempts[hover].total} · {attempts[hover].pct}% ·{" "}
          {attempts[hover].date}
        </text>
      )}
    </svg>
  );
}
