"use client";

import { runQuestionsBackfill } from "@/lib/questionsBackfillClient";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LabelList,
} from "recharts";
import { TabError, TabHeader, TabLoading, fmtUpdated, useAdminFetch } from "@/components/admin/AdminTabParts";

// ─── Palette (validated: dataviz reference palette, light mode) ─────────────
const COLORS = {
  users: "#2a78d6",      // blue — anything user-count shaped
  revenue: "#008300",    // green — money
  engagement: "#eb6834", // orange — activity depth
  inkMuted: "#898781",
  grid: "#ececea",
  axis: "#d6d4cd",
  sparkline: "#c3c2b7",
  deltaUp: "#006300",
  deltaDown: "#d03b3b",
  funnelRamp: ["#a9cdf5", "#86b6ef", "#5598e7", "#2a78d6", "#2068c0", "#1c5cab", "#154a8c"],
};

// ─── API payload ────────────────────────────────────────────────────────────
interface Metrics {
  generatedAt: string;
  kpis: {
    revenueAllTimeCents: number;
    revenueThisMonthCents: number;
    revenuePrevMonthCents: number;
    estimatedPurchases: number;
    payingUsers: number;
    purchasesThisMonth: number;
    conversionRate: number;
    medianDaysToPurchase: number | null;
    totalUsers: number;
    newUsers7d: number;
    newUsersPrev7d: number;
    wau: number;
    wauPrev: number;
    totalQuestions: number;
    questions7d: number;
  };
  daily: {
    signups: Record<string, number>;
    revenueCents: Record<string, number>;
    purchases: Record<string, number>;
    active: Record<string, number>;
    questions: Record<string, number>;
  };
  activeWeekly: { date: string; count: number }[];
  activeMonthly: { date: string; count: number }[];
  // Optional: older cached payloads predate the per-exam split.
  questionsByExam?: { id: string; label: string; total: number; last7d: number; prev7d: number; today: number; enrolled?: number }[];
  launchTest?: { id: string; name: string; subject: string; sent: number; clicked: number; bought: number }[];
  studyTimes?: {
    grid: Record<string, number[]>;
    answers: number;
    users: number;
    sampledUsers: number;
    days: number;
    updatedAt: string;
  } | null;
  testRequests?: {
    total: number;
    byPick: { id: string; label: string; clicks: number; withDetails: number }[];
    details: { pick: string; details: string; examId: string | null; source: string; at: string }[];
  };
  questionsByExamBackfillPending?: boolean;
  // Optional on purpose: a response predating this field (a stale cached
  // payload, or a tab whose JS is newer than the API it's talking to) must
  // degrade to a notice, not throw and white-screen the whole dashboard.
  today?: {
    date: string;
    hours: { signups: number[]; revenueCents: number[]; purchases: number[] };
    activeUsers: number;
    questions: number;
  };
  funnel: { signups: number; engaged: number; hitPaywall: number; purchased: number };
  // Optional: absent from payloads that predate visitor tracking.
  visitorFunnel?: {
    startedAt: string | null;
    daily: Record<string, Record<string, number>>;
    origins: {
      tried: { accounts: number; purchased: number };
      cold: { accounts: number; purchased: number };
    };
    // Optional: absent from payloads that predate the combined funnel.
    cohort?: Record<"tried" | "cold", Record<CohortStage, Record<string, number>>>;
  };
}

type CohortStage = "accounts" | "answered" | "paywall" | "purchased";

type Range = "today" | "30d" | "90d" | "all";
type Pt = { key: string; label: string; value: number };

// ─── Formatting ─────────────────────────────────────────────────────────────
const fmtInt = (n: number) => n.toLocaleString("en-US");
const fmtCompact = (n: number) =>
  n >= 10000 ? `${(n / 1000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, "")}k` : fmtInt(n);
const fmtDollars = (cents: number) =>
  `$${Math.round(cents / 100).toLocaleString("en-US")}`;
const fmtDollarsExact = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });

const fmtDayLabel = (key: string) =>
  new Date(key + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
const fmtMonthLabel = (key: string) =>
  new Date(key + "-15T12:00:00").toLocaleDateString("en-US", { month: "short", year: "2-digit" });

// ─── Client-side bucketing (sums only; unique-active comes pre-bucketed) ────
function dateKeyDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
}

function bucketize(map: Record<string, number>, range: Range): Pt[] {
  if (range === "30d") {
    return Array.from({ length: 30 }, (_, i) => {
      const key = dateKeyDaysAgo(29 - i);
      return { key, label: fmtDayLabel(key), value: map[key] || 0 };
    });
  }
  if (range === "90d") {
    // 13 rolling 7-day buckets ending today (matches the server's activeWeekly)
    return Array.from({ length: 13 }, (_, i) => {
      const startOffset = (12 - i) * 7 + 6;
      let value = 0;
      for (let d = 0; d < 7; d++) value += map[dateKeyDaysAgo(startOffset - d)] || 0;
      const key = dateKeyDaysAgo(startOffset);
      return { key, label: fmtDayLabel(key), value };
    });
  }
  // all time → calendar months from first month with data
  const keys = Object.keys(map).filter((k) => map[k] > 0).sort();
  const thisMonth = new Date().toISOString().slice(0, 7);
  const firstMonth = keys.length > 0 ? keys[0].slice(0, 7) : thisMonth;
  const months: Pt[] = [];
  const cursor = new Date(firstMonth + "-01T12:00:00Z");
  while (cursor.toISOString().slice(0, 7) <= thisMonth) {
    const prefix = cursor.toISOString().slice(0, 7);
    const value = Object.entries(map).reduce((n, [d, c]) => (d.startsWith(prefix) ? n + c : n), 0);
    months.push({ key: prefix, label: fmtMonthLabel(prefix), value });
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  // Drop the in-progress month. Five days of a month plotted next to full ones
  // flattens the cumulative curve and craters the per-month bars, both of which
  // read as a stall that isn't there. Same reasoning as the activeMonthly
  // filter below. Keep it if it's the only bucket we have.
  if (months.length > 1 && months[months.length - 1].key === thisMonth) months.pop();
  return months;
}

// Hours elapsed so far today in Eastern — the "today" charts stop here rather
// than trailing a flat line across hours that haven't happened yet.
function etHourNow(): number {
  try {
    const h = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York", hour: "2-digit", hour12: false,
    }).format(new Date());
    const n = parseInt(h, 10);
    return Number.isFinite(n) ? n % 24 : 23;
  } catch {
    // A runtime without full ICU throws RangeError on the timezone. Show the
    // whole day rather than taking the page down over an axis label.
    return 23;
  }
}

const fmtHourLabel = (h: number) =>
  h === 0 ? "12a" : h < 12 ? `${h}a` : h === 12 ? "12p" : `${h - 12}p`;

// 24 hourly buckets from the server's today payload, truncated at the current hour
function hourly(values: number[]): Pt[] {
  const last = etHourNow();
  return Array.from({ length: last + 1 }, (_, h) => ({
    key: String(h),
    label: fmtHourLabel(h),
    value: values[h] || 0,
  }));
}

// Running total across buckets, seeded with everything before the window
function cumulative(map: Record<string, number>, buckets: Pt[]): Pt[] {
  if (buckets.length === 0) return [];
  const windowStart = buckets[0].key.length === 7 ? buckets[0].key + "-01" : buckets[0].key;
  let running = Object.entries(map).reduce((n, [d, c]) => (d < windowStart ? n + c : n), 0);
  return buckets.map((b) => {
    running += b.value;
    return { ...b, value: running };
  });
}

// Last-12-buckets sparkline data from a daily map (weekly or monthly)
function sparkSeries(map: Record<string, number>, unit: "week" | "month"): number[] {
  if (unit === "week") {
    return Array.from({ length: 12 }, (_, i) => {
      const startOffset = (11 - i) * 7 + 6;
      let v = 0;
      for (let d = 0; d < 7; d++) v += map[dateKeyDaysAgo(startOffset - d)] || 0;
      return v;
    });
  }
  const now = new Date();
  return Array.from({ length: 12 }, (_, i) => {
    const m = new Date(now.getFullYear(), now.getMonth() - (11 - i), 15);
    const prefix = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`;
    return Object.entries(map).reduce((n, [d, c]) => (d.startsWith(prefix) ? n + c : n), 0);
  });
}

// ─── Small components ───────────────────────────────────────────────────────
function Sparkline({ points, accent }: { points: number[]; accent: string }) {
  const w = 96, h = 30, pad = 6;
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const span = max - min || 1;
  const xy = points.map((v, i) => [
    pad + (i * (w - pad * 2)) / (points.length - 1),
    h - pad - ((v - min) / span) * (h - pad * 2),
  ]);
  const path = xy.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lx, ly] = xy[xy.length - 1];
  return (
    <svg width={w} height={h} className="shrink-0" aria-hidden="true">
      <polyline points={path} fill="none" stroke={COLORS.sparkline} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="4" fill={accent} stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
}

function Delta({ now, prev, suffix, format = fmtInt, upIsGood = true }: {
  now: number; prev: number; suffix: string;
  format?: (n: number) => string; upIsGood?: boolean;
}) {
  const diff = now - prev;
  if (prev === 0 && now === 0) return <p className="text-xs text-gray-500 dark:text-gray-400">no change {suffix}</p>;
  const up = diff > 0;
  const flat = diff === 0;
  const good = flat ? null : up === upIsGood;
  const color = flat ? "#898781" : good ? COLORS.deltaUp : COLORS.deltaDown;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  const pct = prev > 0 ? ` (${up ? "+" : ""}${Math.round((diff / prev) * 100)}%)` : "";
  return (
    <p className="text-xs flex items-center gap-0.5" style={{ color }}>
      {!flat && <Icon className="h-3.5 w-3.5" />}
      <span>
        {up ? "+" : ""}{format(diff)}{pct}
        <span className="text-gray-500 dark:text-gray-400 ml-1">{suffix}</span>
      </span>
    </p>
  );
}

function StatTile({ label, value, sub, spark, accent, delta }: {
  label: string; value: string; sub?: string;
  spark?: number[]; accent: string; delta?: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5 flex flex-col gap-1.5">
      <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <div className="flex items-end justify-between gap-3">
        <p className="text-[32px] leading-none font-semibold text-gray-900 dark:text-gray-50 tracking-tight">{value}</p>
        {spark && <Sparkline points={spark} accent={accent} />}
      </div>
      {delta}
      {sub && <p className="text-xs text-gray-500 dark:text-gray-400">{sub}</p>}
    </div>
  );
}

function ChartTooltip({ active, payload, label, format }: {
  active?: boolean; payload?: { value?: number | string }[]; label?: string;
  format: (n: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md px-3 py-2">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{format(Number(payload[0].value) || 0)}</p>
    </div>
  );
}

const axisTickStyle = { fontSize: 11, fill: COLORS.inkMuted };

function ChartCard({ title, subtitle, children, footnote }: {
  title: string; subtitle?: string; children: React.ReactNode; footnote?: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </div>
      <div className="h-56">{children}</div>
      {footnote && <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">{footnote}</p>}
    </div>
  );
}

// Endpoint dot + value on the final point of a single-series area
function makeEndDot(color: string) {
  return function EndDot(props: { cx?: number; cy?: number; index?: number; dataLength: number }) {
    const { cx, cy, index, dataLength } = props;
    if (index !== dataLength - 1 || cx == null || cy == null) return <g key={index} />;
    return (
      <circle key={index} cx={cx} cy={cy} r={4.5} fill={color} stroke="#ffffff" strokeWidth={2} />
    );
  };
}

type FunnelStage = { label: string; value: number; note?: string; section?: string };

function Funnel({ data }: { data: FunnelStage[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-3">
      {data.map((stage, i) => {
        const pctOfTop = (stage.value / max) * 100;
        const prev = i > 0 ? data[i - 1].value : null;
        const stepRate = prev ? Math.round((stage.value / prev) * 100) : null;
        return (
          <div key={stage.label}>
            {stage.section && (
              <p
                className={`mb-2 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400 ${
                  i > 0 ? "mt-4 border-t border-gray-100 dark:border-gray-800 pt-3" : ""
                }`}
              >
                {stage.section}
              </p>
            )}
            <div className="grid grid-cols-[150px_1fr_140px] items-center gap-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">{stage.label}</p>
              <div className="h-7 bg-gray-50 dark:bg-gray-950 rounded-md overflow-hidden relative">
                <div
                  className="h-full rounded-r-md flex items-center"
                  style={{ width: `${Math.max(pctOfTop, 2)}%`, backgroundColor: COLORS.funnelRamp[i] }}
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold"
                  style={{
                    left: pctOfTop > 18 ? undefined : `calc(${Math.max(pctOfTop, 2)}% + 8px)`,
                    right: pctOfTop > 18 ? `calc(${100 - pctOfTop}% + 8px)` : undefined,
                    // ink on the two light ramp steps, white on the dark ones
                    color: pctOfTop > 18 ? (i < 2 ? "#1f2937" : "#ffffff") : "#374151",
                  }}
                >
                  {fmtInt(stage.value)}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                {stage.note ?? (stepRate != null
                  ? `${stepRate}% of previous`
                  : `${Math.round((stage.value / max) * 100)}% baseline`)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// New visitors by where they came from (lib/funnel.ts visitSource), AI answer
// engines first. Counting started after the funnel did, so the shares are of
// tracked-source visits, not of all visits.
const SOURCE_LABELS: [string, string][] = [
  ["chatgpt", "ChatGPT"],
  ["perplexity", "Perplexity"],
  ["gemini", "Gemini"],
  ["copilot", "Copilot"],
  ["claude", "Claude"],
  ["ai_other", "Other AI"],
  ["search", "Search engines"],
  ["direct", "Direct"],
  ["other", "Other sites"],
];
const AI_SOURCE_KEYS = ["chatgpt", "perplexity", "gemini", "copilot", "claude", "ai_other"];

function VisitSources({ sum }: { sum: (step: string) => number }) {
  const counts = SOURCE_LABELS.map(([key, label]) => ({ key, label, n: sum(`visit_${key}`) }));
  const total = counts.reduce((n, c) => n + c.n, 0);
  if (total === 0) return null;
  const ai = counts.filter((c) => AI_SOURCE_KEYS.includes(c.key)).reduce((n, c) => n + c.n, 0);
  const deepDirect = sum("visit_direct_deep");
  const pct = (n: number) => `${((n / total) * 100).toFixed(1)}%`;
  return (
    <div className="mt-5 rounded-lg bg-gray-50 dark:bg-gray-950 p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">New visitors by source</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          AI answer engines: <span className="font-semibold text-gray-900 dark:text-gray-50">{fmtInt(ai)}</span> ({pct(ai)})
        </p>
      </div>
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 text-sm">
        {counts.map((c) => (
          <div key={c.key} className="flex justify-between gap-2">
            <span className="text-gray-600 dark:text-gray-300">{c.label}</span>
            <span className="font-medium text-gray-900 dark:text-gray-50">
              {fmtInt(c.n)} <span className="text-xs text-gray-500 dark:text-gray-400">{pct(c.n)}</span>
            </span>
          </div>
        ))}
      </div>
      {deepDirect > 0 && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Of Direct, {fmtInt(deepDirect)} ({pct(deepDirect)}) landed on a page other than the home page with no referrer:
          mostly links from AI apps that hide where they came from (Claude, Gemini), chats and bookmarks. Counted since Oct 18, 2026.
        </p>
      )}
    </div>
  );
}

// One funnel from first page view to purchase. Signed-out steps count browsers
// (lib/funnel.ts); after signup it follows the tracked accounts (signupOrigins)
// by signup day, so a purchase lands in the window the account was created in.
type FunnelRange = "7d" | "30d" | "all";

function VisitorFunnel({ data }: { data: NonNullable<Metrics["visitorFunnel"]> }) {
  const [range, setRange] = useState<FunnelRange>("30d");
  const since = range === "all" ? "" : dateKeyDaysAgo(range === "7d" ? 6 : 29);
  const sum = (step: string) =>
    Object.entries(data.daily[step] || {}).reduce((n, [d, c]) => (d >= since ? n + c : n), 0);
  const visits = sum("visit");
  const answered = sum("answered");
  const opened = sum("signup_view");
  const signups = sum("signup");
  const tried = sum("signup_tried");
  const cold = sum("signup_cold");
  const pct = (n: number, d: number) => (d > 0 ? `${Math.round((n / d) * 100)}%` : "0%");
  const rate = (n: number, d: number) => (d > 0 ? `${((n / d) * 100).toFixed(1)}%` : "n/a");
  const cohortSum = (origin: "tried" | "cold", stage: CohortStage) =>
    Object.entries(data.cohort?.[origin][stage] || {}).reduce((n, [d, c]) => (d >= since ? n + c : n), 0);
  const cohortRow = (origin: "tried" | "cold") => ({
    accounts: cohortSum(origin, "accounts"),
    answered: cohortSum(origin, "answered"),
    paywall: cohortSum(origin, "paywall"),
    purchased: cohortSum(origin, "purchased"),
  });
  const rows = { tried: cohortRow("tried"), cold: cohortRow("cold") };
  const accounts = rows.tried.accounts + rows.cold.accounts;
  const practiced = rows.tried.answered + rows.cold.answered;
  const paywall = rows.tried.paywall + rows.cold.paywall;
  const purchased = rows.tried.purchased + rows.cold.purchased;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">Funnel</h2>
        <div className="flex items-center gap-3">
          {data.startedAt && (
            <p className="text-xs text-gray-500 dark:text-gray-400">{rate(purchased, visits)} visitor to purchase</p>
          )}
            <div className="flex items-center gap-1">
            {(["7d", "30d", "all"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`text-xs px-2 py-1 rounded-md ${
                  range === r ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                }`}
              >
                {r === "all" ? "Since start" : r}
              </button>
            ))}
            </div>
        </div>
      </div>
      {!data.startedAt ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No visitors tracked yet. Counting starts with this deploy.</p>
      ) : (
        <>
          <Funnel
            data={[
              { section: "Signed out", label: "New visitors", value: visits, note: "baseline" },
              { label: "Tried a question", value: answered, note: `${pct(answered, visits)} of visitors` },
              { label: "Opened signup", value: opened, note: `${pct(opened, visits)} of visitors` },
              { label: "Created an account", value: signups, note: `${pct(signups, opened)} of signup opens` },
              {
                section: "After signup",
                label: "Answered a question",
                value: practiced,
                note: `${pct(practiced, accounts)} of accounts`,
              },
              { label: "Hit a paywall", value: paywall, note: `${pct(paywall, accounts)} of accounts` },
              { label: "Purchased", value: purchased, note: `${pct(purchased, paywall)} of paywall hits` },
            ]}
          />
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-gray-50 dark:bg-gray-950 p-3">
              <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Signup page drop-off</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50">
                {opened > 0 ? pct(Math.max(opened - signups, 0), opened) : "n/a"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">opened signup, left without an account</p>
            </div>
            <div className="rounded-lg bg-gray-50 dark:bg-gray-950 p-3">
              <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Tried, never signed up</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50">{fmtInt(Math.max(answered - tried, 0))}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">guests a signup wall would put at risk</p>
            </div>
            <div className="rounded-lg bg-gray-50 dark:bg-gray-950 p-3">
              <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">New accounts that tried first</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50">{pct(tried, tried + cold)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {fmtInt(tried)} tried first, {fmtInt(cold)} signed up cold
              </p>
            </div>
          </div>
          <VisitSources sum={sum} />
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  <th className="text-left font-medium pb-2">Accounts created in range</th>
                  <th className="text-right font-medium pb-2 pl-4">Accounts</th>
                  <th className="text-right font-medium pb-2 pl-4">Answered</th>
                  <th className="text-right font-medium pb-2 pl-4">Hit paywall</th>
                  <th className="text-right font-medium pb-2 pl-4">Purchased</th>
                  <th className="text-right font-medium pb-2 pl-4">Purchase rate</th>
                </tr>
              </thead>
              <tbody>
                {([
                  ["Tried before signing up", rows.tried],
                  ["Signed up cold", rows.cold],
                ] as const).map(([label, o]) => (
                  <tr key={label} className="border-t border-gray-100 dark:border-gray-800">
                    <td className="py-2 font-medium text-gray-900 dark:text-gray-50">{label}</td>
                    <td className="py-2 pl-4 text-right tabular-nums">{fmtInt(o.accounts)}</td>
                    <td className="py-2 pl-4 text-right tabular-nums">{fmtInt(o.answered)}</td>
                    <td className="py-2 pl-4 text-right tabular-nums">{fmtInt(o.paywall)}</td>
                    <td className="py-2 pl-4 text-right tabular-nums">{fmtInt(o.purchased)}</td>
                    <td className="py-2 pl-4 text-right tabular-nums">{rate(o.purchased, o.accounts)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[11px] text-gray-500 dark:text-gray-400">
            Counts browsers, not people: each step fires once per browser while signed out, from{" "}
            {fmtDayLabel(data.startedAt)}. A returning user on a new device counts as a visitor. After
            signup, stages follow the accounts tracked at signup, by the day they signed up, so a later
            purchase still counts toward its signup window. True site traffic (including people without
            JavaScript) is in Google Analytics.
          </p>
        </>
      )}
    </div>
  );
}

function QuestionsByExam({ rows, totalQuestions, backfillPending }: {
  rows: NonNullable<Metrics["questionsByExam"]>;
  totalQuestions: number;
  backfillPending: boolean;
}) {
  const attributed = rows.reduce((n, r) => n + r.total, 0);
  const max = rows.length > 0 ? rows[0].total : 0;
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">Questions by exam</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {fmtInt(attributed)} attributed of {fmtInt(totalQuestions)} all-time
        </p>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {backfillPending ? "Seeding history from user records…" : "No answers recorded yet."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <th className="text-left font-medium pb-2">Exam</th>
                <th className="text-right font-medium pb-2 pl-4">Today</th>
                <th className="text-right font-medium pb-2 pl-4">Last 7d</th>
                <th className="text-right font-medium pb-2 pl-4">All-time</th>
                <th className="text-right font-medium pb-2 pl-4" title="Distinct people who answered at least one question">Enrolled</th>
                <th className="text-right font-medium pb-2 pl-4 w-1/3">Share</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="py-2 font-medium text-gray-900 dark:text-gray-50">{r.label}</td>
                  <td className="py-2 pl-4 text-right tabular-nums text-gray-600 dark:text-gray-300">{fmtInt(r.today)}</td>
                  <td className="py-2 pl-4 text-right tabular-nums text-gray-600 dark:text-gray-300">
                    {fmtInt(r.last7d)}
                    <span className="ml-1.5 text-[11px]">
                      <Delta now={r.last7d} prev={r.prev7d} suffix="vs prior 7d" />
                    </span>
                  </td>
                  <td className="py-2 pl-4 text-right tabular-nums text-gray-900 dark:text-gray-50">{fmtInt(r.total)}</td>
                  <td className="py-2 pl-4 text-right tabular-nums text-gray-900 dark:text-gray-50">
                    {r.enrolled !== undefined ? fmtInt(r.enrolled) : "—"}
                  </td>
                  <td className="py-2 pl-4">
                    <div className="flex items-center gap-2 justify-end">
                      <div className="h-1.5 w-full max-w-[160px] bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                        <div
                          className="h-full rounded"
                          style={{ width: `${max > 0 ? (r.total / max) * 100 : 0}%`, background: COLORS.engagement }}
                        />
                      </div>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 tabular-nums w-10 text-right">
                        {attributed > 0 ? `${((r.total / attributed) * 100).toFixed(0)}%` : "—"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-4 text-[11px] text-gray-500 dark:text-gray-400">
        Every training and test answer, guests included, filed under the exam it belongs to.
        Signed-in history is seeded from user records; guest answers before the split shipped
        only count in the all-time total above. Enrolled counts distinct people with at least one
        answer in the exam, all-time: accounts plus guest browsers (a guest who signs up counts once).
        {backfillPending ? " History seed is running; refresh in a minute." : ""}
      </p>
    </div>
  );
}

function TestRequests({ data }: { data: NonNullable<Metrics["testRequests"]> }) {
  const max = data.byPick.reduce((m, r) => Math.max(m, r.clicks), 0);
  const pickLabel = (id: string) => data.byPick.find((p) => p.id === id)?.label ?? id;
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">What should we build next?</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">{fmtInt(data.total)} answers</p>
      </div>
      {data.total === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No answers yet. They arrive from the new-tests email and the unsubscribe page.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <table className="w-full text-sm self-start">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <th className="text-left font-medium pb-2">Category</th>
                <th className="text-right font-medium pb-2 pl-4">Clicks</th>
                <th className="text-right font-medium pb-2 pl-4">Named a test</th>
                <th className="pb-2 pl-4 w-1/3"></th>
              </tr>
            </thead>
            <tbody>
              {data.byPick.map((r) => (
                <tr key={r.id} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="py-2 font-medium text-gray-900 dark:text-gray-50">{r.label}</td>
                  <td className="py-2 pl-4 text-right tabular-nums text-gray-900 dark:text-gray-50">{fmtInt(r.clicks)}</td>
                  <td className="py-2 pl-4 text-right tabular-nums text-gray-600 dark:text-gray-300">{fmtInt(r.withDetails)}</td>
                  <td className="py-2 pl-4">
                    <div className="h-1.5 w-full max-w-[160px] bg-gray-100 dark:bg-gray-800 rounded overflow-hidden ml-auto">
                      <div
                        className="h-full rounded"
                        style={{ width: `${max > 0 ? (r.clicks / max) * 100 : 0}%`, background: COLORS.engagement }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Named tests, newest first</p>
            {data.details.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Nobody has named a specific test yet.</p>
            ) : (
              <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {data.details.map((d, i) => (
                  <li key={i} className="text-sm border-t border-gray-100 dark:border-gray-800 pt-2 first:border-0 first:pt-0">
                    <p className="text-gray-900 dark:text-gray-50">{d.details}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {pickLabel(d.pick)}
                      {d.examId ? ` · was studying ${d.examId}` : ""}
                      {` · via ${d.source}`}
                      {d.at ? ` · ${d.at.slice(0, 10)}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LaunchTest({ rows }: { rows: NonNullable<Metrics["launchTest"]> }) {
  const sent = rows.reduce((n, r) => n + r.sent, 0);
  const rate = (n: number, d: number) => (d > 0 ? `${((n / d) * 100).toFixed(1)}%` : "—");
  const bestCtr = Math.max(...rows.map((r) => (r.sent > 0 ? r.clicked / r.sent : 0)));
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">SAT/ACT launch email split test</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">{fmtInt(sent)} sent to DMV readers</p>
      </div>
      {sent === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Nothing sent yet. The email is paused until NEW_TESTS_CAMPAIGN=send is set in Vercel.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <th className="text-left font-medium pb-2">Variant</th>
                <th className="text-right font-medium pb-2 pl-4">Sent</th>
                <th className="text-right font-medium pb-2 pl-4">Clicked</th>
                <th className="text-right font-medium pb-2 pl-4">Click rate</th>
                <th className="text-right font-medium pb-2 pl-4">Bought</th>
                <th className="text-right font-medium pb-2 pl-4">Buy rate</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const lead = r.sent > 0 && r.clicked / r.sent === bestCtr && bestCtr > 0;
                return (
                  <tr key={r.id} className="border-t border-gray-100 dark:border-gray-800">
                    <td className="py-2">
                      <div className="font-medium text-gray-900 dark:text-gray-50">{r.id} · {r.name}{lead ? " ★" : ""}</div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{r.subject}</div>
                    </td>
                    <td className="py-2 pl-4 text-right tabular-nums text-gray-600 dark:text-gray-300">{fmtInt(r.sent)}</td>
                    <td className="py-2 pl-4 text-right tabular-nums text-gray-600 dark:text-gray-300">{fmtInt(r.clicked)}</td>
                    <td className="py-2 pl-4 text-right tabular-nums text-gray-900 dark:text-gray-50 font-medium">{rate(r.clicked, r.sent)}</td>
                    <td className="py-2 pl-4 text-right tabular-nums text-gray-600 dark:text-gray-300">{fmtInt(r.bought)}</td>
                    <td className="py-2 pl-4 text-right tabular-nums text-gray-900 dark:text-gray-50">{rate(r.bought, r.sent)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-4 text-[11px] text-gray-500 dark:text-gray-400">
        Each DMV reader gets one variant, fixed by their account. Clicked counts people, not clicks. Bought is Premium
        purchased after the email. Differences under a few points need a few hundred sends per variant before they mean much.
        Set NEW_TESTS_WINNER to a variant id in Vercel to send the rest of the list that one.
      </p>
    </div>
  );
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first
const hourLabel = (h: number) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? "am" : "pm"}`;

/** Answers by Eastern weekday x hour: one hue, light to dark, hover for counts. */
function StudyTimes({ data }: { data: NonNullable<Metrics["studyTimes"]> }) {
  const rows = DAY_ORDER.map((d) => ({ day: d, cells: data.grid[String(d)] ?? new Array(24).fill(0) }));
  const max = Math.max(1, ...rows.flatMap((r) => r.cells));
  const total = Math.max(1, data.answers);
  const byHour = Array.from({ length: 24 }, (_, h) => rows.reduce((n, r) => n + r.cells[h], 0));
  const byDay = rows.map((r) => ({ day: r.day, n: r.cells.reduce((a, b) => a + b, 0) }));
  const top = rows
    .flatMap((r) => r.cells.map((n, h) => ({ day: r.day, hour: h, n })))
    .sort((a, b) => b.n - a.n)
    .slice(0, 5);
  const peakHour = byHour.indexOf(Math.max(...byHour));
  const peakDay = [...byDay].sort((a, b) => b.n - a.n)[0];
  const pct = (n: number) => `${((n / total) * 100).toFixed(1)}%`;
  // Sequential: one hue, light to dark, on the white card.
  const fill = (n: number) => (n === 0 ? "#f6f5f2" : `color-mix(in srgb, ${COLORS.engagement} ${Math.round(12 + (n / max) * 88)}%, #ffffff)`);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">When people study</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {fmtInt(data.answers)} answers · last {data.days} days · Eastern time
        </p>
      </div>
      {data.answers === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No timestamped answers yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="border-separate" style={{ borderSpacing: 2 }}>
              <thead>
                <tr>
                  <th />
                  {byHour.map((_, h) => (
                    <th key={h} className="text-[10px] font-normal text-gray-500 dark:text-gray-400 text-left w-5 min-w-[18px]">
                      {h % 3 === 0 ? hourLabel(h) : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.day}>
                    <td className="pr-2 text-[11px] text-gray-500 dark:text-gray-400">{DAY_NAMES[r.day]}</td>
                    {r.cells.map((n, h) => (
                      <td
                        key={h}
                        title={`${DAY_NAMES[r.day]} ${hourLabel(h)} ET: ${fmtInt(n)} answers (${pct(n)})`}
                        className="h-5 w-5 min-w-[18px] rounded-[3px]"
                        style={{ background: fill(n) }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
            <span>Fewer</span>
            <span
              className="h-2 w-24 rounded"
              style={{ background: `linear-gradient(90deg, color-mix(in srgb, ${COLORS.engagement} 12%, #fff), ${COLORS.engagement})` }}
            />
            <span>More</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Busiest hour</p>
              <p className="font-medium text-gray-900 dark:text-gray-50">{hourLabel(peakHour)} ET · {pct(byHour[peakHour])}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Busiest day</p>
              <p className="font-medium text-gray-900 dark:text-gray-50">{DAY_NAMES[peakDay.day]} · {pct(peakDay.n)}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Top slots</p>
              <p className="text-gray-700 dark:text-gray-200">{top.map((t) => `${DAY_NAMES[t.day]} ${hourLabel(t.hour)}`).join(", ")}</p>
            </div>
          </div>
        </>
      )}
      <p className="mt-4 text-[11px] text-gray-500 dark:text-gray-400">
        Every timestamped training and practice-test answer from the last {data.days} days, by the hour it was
        answered in Eastern time (Pacific is 3 hours earlier). Covers {fmtInt(data.users)} people from a sample
        of {fmtInt(data.sampledUsers)} accounts. Rebuilt nightly at 03:00 UTC; updated {data.updatedAt.slice(0, 10)}.
      </p>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
// The Growth tab on /admin: the scoreboard over time, from /api/admin/metrics.
export function GrowthTab() {
  const { user } = useAuth();
  const { data: metrics, error, loading, refreshing, reload: fetchMetrics } = useAdminFetch<Metrics>("/api/admin/metrics");
  const [range, setRange] = useState<Range>("90d");
  const [engageMetric, setEngageMetric] = useState<"active" | "questions">("active");

  // One-time history seed for the per-exam split of the questions aggregate:
  // live counts only started when the split shipped, so until the backfill
  // has run the table under-reports every exam. Idempotent server-side.
  const backfillTriggered = useRef(false);
  useEffect(() => {
    if (!metrics?.questionsByExamBackfillPending || backfillTriggered.current || !user) return;
    backfillTriggered.current = true;
    (async () => {
      try {
        if (await runQuestionsBackfill(() => user.getIdToken())) fetchMetrics(true);
      } catch {
        // Best effort; the next page load retries.
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metrics?.questionsByExamBackfillPending, user]);

  // ── Derived chart series ──────────────────────────────────────────────────
  const series = useMemo(() => {
    if (!metrics) return null;
    if (range === "today") {
      const signupHours = hourly(metrics.today?.hours?.signups ?? []);
      // Cumulative within the day, not all-time — 27 accounts added onto 3,700
      // would render as a dead-flat line.
      let run = 0;
      return {
        usersCumulative: signupHours.map((p) => ({ ...p, value: (run += p.value) })),
        newSignups: signupHours,
        revenue: hourly(metrics.today?.hours?.revenueCents ?? []),
        active: [],      // day-resolution only; rendered as a tile instead
        questions: [],   // same
      };
    }
    const signupBuckets = bucketize(metrics.daily.signups, range);
    const active =
      range === "30d"
        ? bucketize(metrics.daily.active, "30d")
        : range === "90d"
          ? metrics.activeWeekly.map((p) => ({ key: p.date, label: fmtDayLabel(p.date), value: p.count }))
          : metrics.activeMonthly
              // A unique-user count for a 4-day-old month reads as a cliff — omit it
              .filter((p) => p.date !== new Date().toISOString().slice(0, 7))
              .map((p) => ({ key: p.date, label: fmtMonthLabel(p.date), value: p.count }));
    return {
      usersCumulative: cumulative(metrics.daily.signups, signupBuckets),
      newSignups: signupBuckets,
      revenue: bucketize(metrics.daily.revenueCents, range),
      active,
      questions: bucketize(metrics.daily.questions, range),
    };
  }, [metrics, range]);

  const sparks = useMemo(() => {
    if (!metrics) return null;
    return {
      revenue: sparkSeries(metrics.daily.revenueCents, "month"),
      signups: sparkSeries(metrics.daily.signups, "week"),
      wau: metrics.activeWeekly.slice(-12).map((p) => p.count),
      purchases: sparkSeries(metrics.daily.purchases, "month"),
    };
  }, [metrics]);

  if (loading) return <TabLoading />;
  if (error || !metrics || !series || !sparks) return <TabError message={error || "Failed to load metrics"} />;

  const { kpis } = metrics;
  const isToday = range === "today";
  const bucketNoun = isToday ? "hour" : range === "30d" ? "day" : range === "90d" ? "week" : "month";
  // All-time charts stop at the last complete month (see bucketize)
  const partialNote = range === "all" ? "Current month omitted (in progress)." : undefined;
  // Present only when the API actually returned the block (see Metrics.today)
  const todayData = Array.isArray(metrics.today?.hours?.signups) ? metrics.today : null;
  const todayNote = isToday && todayData
    ? `${fmtDayLabel(todayData.date)}, Eastern. Hours shown up to the current one.`
    : undefined;
  const chartNote = todayNote ?? partialNote;
  const labelEvery = range === "90d" ? 1 : isToday ? 2 : "preserveStartEnd" as const;
  const revenueBarLabels = series.revenue.length <= 13;

  return (
    <>
      <TabHeader
        subtitle={<>Live Firestore + Stripe data · updated {fmtUpdated(metrics.generatedAt)}</>}
        onRefresh={() => fetchMetrics(true)}
        refreshing={refreshing}
      />

        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatTile
            label="Revenue (all-time)"
            value={fmtDollarsExact(kpis.revenueAllTimeCents)}
            accent={COLORS.revenue}
            spark={sparks.revenue}
            delta={<Delta now={kpis.revenueThisMonthCents} prev={kpis.revenuePrevMonthCents}
              suffix="MTD vs same point last month" format={fmtDollars} />}
          />
          <StatTile
            label="Paying customers"
            value={fmtInt(kpis.payingUsers)}
            accent={COLORS.revenue}
            spark={sparks.purchases}
            sub={`${(kpis.conversionRate * 100).toFixed(1)}% of accounts${
              kpis.medianDaysToPurchase != null
                ? ` · ~${kpis.medianDaysToPurchase < 1 ? "<1" : Math.round(kpis.medianDaysToPurchase)}d to upgrade`
                : ""
            }`}
            delta={<Delta now={kpis.purchasesThisMonth} prev={0} suffix="purchases this month" />}
          />
          <StatTile
            label="Total accounts"
            value={fmtInt(kpis.totalUsers)}
            accent={COLORS.users}
            spark={sparks.signups}
            delta={<Delta now={kpis.newUsers7d} prev={kpis.newUsersPrev7d} suffix="new this week vs last" />}
          />
          <StatTile
            label="Weekly active users"
            value={fmtInt(kpis.wau)}
            accent={COLORS.engagement}
            spark={sparks.wau}
            delta={<Delta now={kpis.wau} prev={kpis.wauPrev} suffix="vs previous week" />}
          />
        </div>

        {/* Range filter — scopes every chart below */}
        <div className="flex items-center gap-1 mb-4 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 rounded-lg p-1 w-fit shadow-sm">
          {([["today", "Today"], ["30d", "Last 30 days"], ["90d", "Last 90 days"], ["all", "All time"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setRange(key)}
              className={`text-xs font-medium rounded-md px-3 py-1.5 transition-colors ${
                range === key ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Today selected but the response has no today block — say so rather
            than rendering a page full of confident zeros. */}
        {isToday && !todayData && (
          <div className="mb-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 p-4">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Today&apos;s data isn&apos;t in this response, most likely a cached payload from
              before this feature shipped. Hit Refresh; if it persists, the API is serving
              an older build.
            </p>
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <ChartCard
            title="User growth"
            subtitle={isToday
              ? "accounts added today, cumulative by hour"
              : `cumulative accounts, by ${bucketNoun}`}
            footnote={chartNote}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series.usersCumulative} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={COLORS.grid} />
                <XAxis dataKey="label" tick={axisTickStyle} tickLine={false}
                  axisLine={{ stroke: COLORS.axis }} interval={labelEvery} tickMargin={8} />
                <YAxis tick={axisTickStyle} tickLine={false} axisLine={false}
                  allowDecimals={false} width={44} tickFormatter={fmtCompact} />
                <Tooltip content={<ChartTooltip format={(n) => `${fmtInt(n)} accounts`} />} />
                <Area type="monotone" dataKey="value" stroke={COLORS.users} strokeWidth={2}
                  fill={COLORS.users} fillOpacity={0.1} isAnimationActive={false}
                  dot={(props) => makeEndDot(COLORS.users)({ ...props, dataLength: series.usersCumulative.length })}
                  activeDot={{ r: 4.5, strokeWidth: 2, stroke: "#ffffff" }} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Revenue"
            subtitle={`per ${bucketNoun}${!isToday && kpis.estimatedPurchases > 0
              ? ` · ${kpis.estimatedPurchases} pre-Stripe-log purchase${kpis.estimatedPurchases === 1 ? "" : "s"} at $9.99`
              : ""}`}
            footnote={chartNote}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={series.revenue} margin={{ top: 18, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={COLORS.grid} />
                <XAxis dataKey="label" tick={axisTickStyle} tickLine={false}
                  axisLine={{ stroke: COLORS.axis }} interval={labelEvery} tickMargin={8} />
                <YAxis tick={axisTickStyle} tickLine={false} axisLine={false} width={44}
                  tickFormatter={(v: number) => fmtDollars(v)} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }}
                  content={<ChartTooltip format={fmtDollarsExact} />} />
                <Bar dataKey="value" fill={COLORS.revenue} maxBarSize={24} radius={[4, 4, 0, 0]}
                  isAnimationActive={false}>
                  {revenueBarLabels && (
                    <LabelList dataKey="value" position="top"
                      formatter={(v: React.ReactNode) => (Number(v) > 0 ? fmtDollars(Number(v)) : "")}
                      style={{ fontSize: 10, fill: "#52514e" }} />
                  )}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="New signups" subtitle={`per ${bucketNoun}`}
            footnote={chartNote}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={series.newSignups} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={COLORS.grid} />
                <XAxis dataKey="label" tick={axisTickStyle} tickLine={false}
                  axisLine={{ stroke: COLORS.axis }} interval={labelEvery} tickMargin={8} />
                <YAxis tick={axisTickStyle} tickLine={false} axisLine={false}
                  allowDecimals={false} width={44} tickFormatter={fmtCompact} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }}
                  content={<ChartTooltip format={(n) => `${fmtInt(n)} signups`} />} />
                <Bar dataKey="value" fill={COLORS.users} maxBarSize={24} radius={[4, 4, 0, 0]}
                  isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title={engageMetric === "active" ? "Active users" : "Questions answered"}
            subtitle={isToday
              ? `today · ${fmtInt(kpis.totalQuestions)} questions all-time`
              : `per ${bucketNoun} · ${fmtInt(kpis.totalQuestions)} questions all-time`}
            footnote={isToday
              // Neither source records a clock time, so there is no hourly
              // version of these — and each is stamped in its own zone, so
              // saying "today" without qualification would be wrong.
              ? (engageMetric === "active"
                  ? "No hourly data: activity is recorded as a date only, stamped in each user's own timezone."
                  : `No hourly data: answer counts are tallied per UTC day, so this covers 8pm-8pm Eastern rather than midnight-to-now.`)
              : `${engageMetric === "active"
                  ? "Unique signed-in users with synced activity in each period."
                  : "Every training and test answer, guests included."}${partialNote ? ` ${partialNote}` : ""}`}
          >
            <div className="flex gap-1 -mt-1 mb-2">
              {([["active", "Active users"], ["questions", "Questions"]] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setEngageMetric(key)}
                  className={`text-[11px] font-medium rounded-md px-2 py-1 ${
                    engageMetric === key ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {isToday ? (
              <div className="flex flex-col items-center justify-center h-[88%] gap-1">
                <span
                  className="text-5xl font-semibold tabular-nums"
                  style={{ color: COLORS.engagement }}
                >
                  {todayData
                    ? fmtInt(engageMetric === "active" ? todayData.activeUsers : todayData.questions)
                    : "—"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {engageMetric === "active" ? "active users today" : "questions answered today"}
                </span>
              </div>
            ) : (
            <ResponsiveContainer width="100%" height="88%">
              {engageMetric === "active" ? (
                <AreaChart data={series.active} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke={COLORS.grid} />
                  <XAxis dataKey="label" tick={axisTickStyle} tickLine={false}
                    axisLine={{ stroke: COLORS.axis }} interval={labelEvery} tickMargin={8} />
                  <YAxis tick={axisTickStyle} tickLine={false} axisLine={false}
                    allowDecimals={false} width={44} tickFormatter={fmtCompact} />
                  <Tooltip content={<ChartTooltip format={(n) => `${fmtInt(n)} active`} />} />
                  <Area type="monotone" dataKey="value" stroke={COLORS.engagement} strokeWidth={2}
                    fill={COLORS.engagement} fillOpacity={0.1} isAnimationActive={false}
                    dot={(props) => makeEndDot(COLORS.engagement)({ ...props, dataLength: series.active.length })}
                    activeDot={{ r: 4.5, strokeWidth: 2, stroke: "#ffffff" }} />
                </AreaChart>
              ) : (
                <BarChart data={series.questions} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke={COLORS.grid} />
                  <XAxis dataKey="label" tick={axisTickStyle} tickLine={false}
                    axisLine={{ stroke: COLORS.axis }} interval={labelEvery} tickMargin={8} />
                  <YAxis tick={axisTickStyle} tickLine={false} axisLine={false}
                    allowDecimals={false} width={44} tickFormatter={fmtCompact} />
                  <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }}
                    content={<ChartTooltip format={(n) => `${fmtInt(n)} answered`} />} />
                  <Bar dataKey="value" fill={COLORS.engagement} maxBarSize={24} radius={[4, 4, 0, 0]}
                    isAnimationActive={false} />
                </BarChart>
              )}
            </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* Questions by exam */}
        <QuestionsByExam
          rows={metrics.questionsByExam ?? []}
          totalQuestions={kpis.totalQuestions}
          backfillPending={metrics.questionsByExamBackfillPending === true}
        />

        {/* Launch email split test */}
        {metrics.launchTest && <LaunchTest rows={metrics.launchTest} />}

        {/* When people study */}
        {metrics.studyTimes ? (
          <StudyTimes data={metrics.studyTimes} />
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5 text-sm text-gray-500 dark:text-gray-400">
            When people study: no data yet. It is built by the nightly stats job (03:00 UTC), or run
            aggregate-stats from Vercel → Settings → Cron Jobs.
          </div>
        )}

        {/* Test requests */}
        {metrics.testRequests && <TestRequests data={metrics.testRequests} />}

        {/* Funnel: first visit to purchase */}
        {metrics.visitorFunnel && <VisitorFunnel data={metrics.visitorFunnel} />}
    </>
  );
}
