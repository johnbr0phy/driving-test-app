"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell,
} from "recharts";
import { CARD } from "@/components/admin/AdminTabParts";

// A count per day, week or month as bars (new signups on the Growth tab,
// paywall hits on the Conversion tab), with the bucketing that feeds it.

const GRID = "#ececea";
const AXIS = "#d6d4cd";
const axisTickStyle = { fontSize: 11, fill: "#898781" };

export type Pt = { key: string; label: string; value: number };

const fmtInt = (n: number) => n.toLocaleString("en-US");
const fmtCompact = (n: number) =>
  n >= 10000 ? `${(n / 1000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, "")}k` : fmtInt(n);
const fmtDayLabel = (key: string) =>
  new Date(key + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
const fmtMonthLabel = (key: string) =>
  new Date(key + "-15T12:00:00").toLocaleDateString("en-US", { month: "short", year: "2-digit" });

function dateKeyDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
}

type Row = Pt & { part: number; rest: number };

function ChartTooltip({ active, payload, label, format, labelPrefix = "", part }: {
  active?: boolean; payload?: { payload?: Row }[]; label?: string;
  format: (n: number) => string; labelPrefix?: string; part?: BarPart;
}) {
  const row = payload?.[0]?.payload;
  if (!active || !row) return null;
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md px-3 py-2">
      <p className="text-xs text-gray-500 dark:text-gray-400">{labelPrefix}{label}</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{format(row.value)}</p>
      {part && (
        <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
          {fmtInt(row.part)} {part.label.toLowerCase()} · {fmtInt(row.rest)} {part.restLabel.toLowerCase()}
        </p>
      )}
    </div>
  );
}

// A slice of each bar drawn in its own colour at the bottom (paywall hits by
// logged-in accounts); the rest of the bar keeps the card's colour.
export type BarPart = { data: Pt[]; label: string; restLabel: string; color: string };

// New signups by calendar day (last 30), Monday-start week (last 12) or month
// (last 12), independent of the range filter. The last bucket is the current,
// unfinished one. Day keys are UTC, like the server's.
export type SignupUnit = "day" | "week" | "month";
export function signupBars(map: Record<string, number>, unit: SignupUnit): Pt[] {
  const sumRange = (from: string, to: string) =>
    Object.entries(map).reduce((n, [d, c]) => (d >= from && d <= to ? n + c : n), 0);
  const today = new Date();
  today.setUTCHours(12, 0, 0, 0);
  const iso = (d: Date) => d.toISOString().split("T")[0];
  if (unit === "day") {
    return Array.from({ length: 30 }, (_, i) => {
      const key = dateKeyDaysAgo(29 - i);
      return { key, label: fmtDayLabel(key), value: map[key] || 0 };
    });
  }
  if (unit === "week") {
    const monday = new Date(today);
    monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));
    return Array.from({ length: 12 }, (_, i) => {
      const start = new Date(monday);
      start.setUTCDate(start.getUTCDate() - (11 - i) * 7);
      const end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 6);
      const key = iso(start);
      return { key, label: fmtDayLabel(key), value: sumRange(key, iso(end)) };
    });
  }
  return Array.from({ length: 12 }, (_, i) => {
    const m = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - (11 - i), 15));
    const prefix = m.toISOString().slice(0, 7);
    return { key: prefix, label: fmtMonthLabel(prefix), value: sumRange(prefix + "-01", prefix + "-31") };
  });
}

// A count per day / week / month (new signups, paywall hits): the last bar is
// the current period so far, drawn lighter, with the previous full one beside it.
export function PeriodBarsCard({ title, noun: countNoun, color, note, data, unit, onUnit, part }: {
  title: string; noun: string; color: string; note?: string;
  data: Pt[]; unit: SignupUnit; onUnit: (u: SignupUnit) => void; part?: BarPart;
}) {
  const rows: Row[] = data.map((p, i) => {
    const inPart = Math.min(p.value, part?.data[i]?.value ?? 0);
    return { ...p, part: inPart, rest: p.value - inPart };
  });
  const cur = data[data.length - 1]?.value ?? 0;
  const prev = data[data.length - 2]?.value ?? 0;
  const noun = unit === "day" ? "Today" : `This ${unit}`;
  const prevNoun = unit === "day" ? "yesterday" : `last ${unit}`;
  return (
    <div className={`${CARD} mb-3 sm:mb-4`}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">{title}</h2>
          <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight">
            {fmtInt(cur)}
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              {noun.toLowerCase()} so far vs {fmtInt(prev)} {prevNoun}
            </span>
          </p>
        </div>
        <div className="flex gap-1">
          {(["day", "week", "month"] as const).map((u) => (
            <button
              key={u}
              onClick={() => onUnit(u)}
              className={`text-xs font-medium rounded-md px-3 py-1.5 transition-colors capitalize ${
                unit === u ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
      {part && (
        <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-300">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: part.color }} aria-hidden />{part.label}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: color }} aria-hidden />{part.restLabel}
          </span>
        </div>
      )}
      <div className="h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} margin={{ top: 18, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={GRID} />
            <XAxis dataKey="label" tick={axisTickStyle} tickLine={false}
              axisLine={{ stroke: AXIS }} interval={unit === "day" ? "preserveStartEnd" : 0} tickMargin={8} />
            <YAxis tick={axisTickStyle} tickLine={false} axisLine={false}
              allowDecimals={false} width={44} tickFormatter={fmtCompact} />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }}
              content={<ChartTooltip format={(n) => `${fmtInt(n)} ${countNoun}`}
                labelPrefix={unit === "week" ? "Week of " : ""} part={part} />} />
            {part && (
              <Bar dataKey="part" stackId="a" fill={part.color} maxBarSize={36} isAnimationActive={false}>
                {rows.map((p, i) => (
                  <Cell key={p.key} fillOpacity={i === rows.length - 1 ? 0.45 : 1}
                    {...(p.rest === 0 ? { radius: [4, 4, 0, 0] as unknown as number } : {})} />
                ))}
              </Bar>
            )}
            <Bar dataKey={part ? "rest" : "value"} stackId="a" fill={color} maxBarSize={36} radius={[4, 4, 0, 0]}
              isAnimationActive={false}>
              {rows.map((p, i) => (
                <Cell key={p.key} fillOpacity={i === rows.length - 1 ? 0.45 : 1} />
              ))}
              {unit !== "day" && (
                <LabelList dataKey="value" position="top"
                  formatter={(v: React.ReactNode) => (Number(v) > 0 ? fmtInt(Number(v)) : "")}
                  style={{ fontSize: 10, fill: "#52514e" }} />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
        Weeks start Monday (UTC). The lighter bar is the current {unit}, still in progress.
        {note ? ` ${note}` : ""}
      </p>
    </div>
  );
}
