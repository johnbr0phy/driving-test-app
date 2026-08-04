"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { RefreshCw, ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LabelList, Cell,
} from "recharts";
import Link from "next/link";

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
  funnelRamp: ["#86b6ef", "#5598e7", "#2a78d6", "#1c5cab"],
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
  funnel: { signups: number; engaged: number; hitPaywall: number; purchased: number };
}

type Range = "30d" | "90d" | "all";
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
  return months;
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
  if (prev === 0 && now === 0) return <p className="text-xs text-gray-400">no change {suffix}</p>;
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
        <span className="text-gray-400 ml-1">{suffix}</span>
      </span>
    </p>
  );
}

function StatTile({ label, value, sub, spark, accent, delta }: {
  label: string; value: string; sub?: string;
  spark?: number[]; accent: string; delta?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-5 flex flex-col gap-1.5">
      <p className="text-[13px] font-medium text-gray-500">{label}</p>
      <div className="flex items-end justify-between gap-3">
        <p className="text-[32px] leading-none font-semibold text-gray-900 tracking-tight">{value}</p>
        {spark && <Sparkline points={spark} accent={accent} />}
      </div>
      {delta}
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

function ChartTooltip({ active, payload, label, format }: {
  active?: boolean; payload?: { value?: number | string }[]; label?: string;
  format: (n: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{format(Number(payload[0].value) || 0)}</p>
    </div>
  );
}

const axisTickStyle = { fontSize: 11, fill: COLORS.inkMuted };

function ChartCard({ title, subtitle, children, footnote }: {
  title: string; subtitle?: string; children: React.ReactNode; footnote?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-5">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>
      <div className="h-56">{children}</div>
      {footnote && <p className="mt-3 text-[11px] text-gray-400">{footnote}</p>}
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

function Funnel({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-3">
      {data.map((stage, i) => {
        const pctOfTop = (stage.value / max) * 100;
        const prev = i > 0 ? data[i - 1].value : null;
        const stepRate = prev ? Math.round((stage.value / prev) * 100) : null;
        return (
          <div key={stage.label} className="grid grid-cols-[150px_1fr_120px] items-center gap-3">
            <p className="text-sm text-gray-600">{stage.label}</p>
            <div className="h-7 bg-gray-50 rounded-md overflow-hidden relative">
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
            <p className="text-xs text-gray-400 text-right">
              {stepRate != null
                ? `${stepRate}% of previous`
                : `${Math.round((stage.value / max) * 100)}% baseline`}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function AdminV2Page() {
  const { user, loading: authLoading } = useAuth();
  const isAdmin = useAdmin();
  const router = useRouter();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState<Range>("90d");
  const [engageMetric, setEngageMetric] = useState<"active" | "questions">("active");

  const fetchMetrics = async (forceRefresh = false) => {
    forceRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const idToken = await user?.getIdToken();
      if (!idToken) { setError("Not authenticated"); return; }
      const res = await fetch(`/api/admin/metrics${forceRefresh ? "?refresh=true" : ""}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.details || `API error: ${res.status}`);
      }
      setMetrics(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load metrics");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) { router.push("/login"); return; }
    if (!authLoading && user && !isAdmin) { router.push("/dashboard"); return; }
    if (user && isAdmin) fetchMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, isAdmin, router]);

  // ── Derived chart series ──────────────────────────────────────────────────
  const series = useMemo(() => {
    if (!metrics) return null;
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

  if (authLoading || loading) {
    return (
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
      </div>
    );
  }

  if (error || !metrics || !series || !sparks) {
    return (
      <div className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-red-600 font-medium">{error || "Failed to load metrics"}</p>
          </div>
        </div>
      </div>
    );
  }

  const { kpis, funnel } = metrics;
  const bucketNoun = range === "30d" ? "day" : range === "90d" ? "week" : "month";
  const labelEvery = range === "90d" ? 1 : "preserveStartEnd" as const;
  const revenueBarLabels = series.revenue.length <= 13;

  return (
    <div className="flex-1 bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">TigerTest Growth</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Live Firestore + Stripe data · updated{" "}
              {new Date(metrics.generatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 px-2 py-1.5"
            >
              Classic admin <ExternalLink className="h-3 w-3" />
            </Link>
            <button
              onClick={() => fetchMetrics(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 bg-white rounded-lg px-3 py-1.5 shadow-sm"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

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
        <div className="flex items-center gap-1 mb-4 bg-white border border-gray-200/80 rounded-lg p-1 w-fit shadow-sm">
          {([["30d", "Last 30 days"], ["90d", "Last 90 days"], ["all", "All time"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setRange(key)}
              className={`text-xs font-medium rounded-md px-3 py-1.5 transition-colors ${
                range === key ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <ChartCard title="User growth" subtitle={`cumulative accounts, by ${bucketNoun}`}>
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
            subtitle={`per ${bucketNoun}${kpis.estimatedPurchases > 0
              ? ` · ${kpis.estimatedPurchases} pre-Stripe-log purchase${kpis.estimatedPurchases === 1 ? "" : "s"} at $9.99`
              : ""}`}
            footnote={range === "all" ? "Current month is still in progress (shown lighter)." : undefined}
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
                  {series.revenue.map((p, i) => (
                    <Cell key={p.key}
                      fillOpacity={range === "all" && i === series.revenue.length - 1 ? 0.45 : 1} />
                  ))}
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
            footnote={range === "all" ? "Current month is still in progress (shown lighter)." : undefined}>
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
                  isAnimationActive={false}>
                  {series.newSignups.map((p, i) => (
                    <Cell key={p.key}
                      fillOpacity={range === "all" && i === series.newSignups.length - 1 ? 0.45 : 1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title={engageMetric === "active" ? "Active users" : "Questions answered"}
            subtitle={`per ${bucketNoun} · ${fmtInt(kpis.totalQuestions)} questions all-time`}
            footnote={engageMetric === "active"
              ? `Unique signed-in users with synced activity in each period.${
                  range === "all" ? " Current month omitted (in progress)." : ""}`
              : `Every training and test answer, guests included.${
                  range === "all" ? " Current month is still in progress (shown lighter)." : ""}`}
          >
            <div className="flex gap-1 -mt-1 mb-2">
              {([["active", "Active users"], ["questions", "Questions"]] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setEngageMetric(key)}
                  className={`text-[11px] font-medium rounded-md px-2 py-1 ${
                    engageMetric === key ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
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
                    isAnimationActive={false}>
                    {series.questions.map((p, i) => (
                      <Cell key={p.key}
                        fillOpacity={range === "all" && i === series.questions.length - 1 ? 0.45 : 1} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Funnel */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-5">
          <div className="mb-4 flex items-baseline justify-between gap-2">
            <h2 className="text-sm font-semibold text-gray-900">Conversion funnel</h2>
            <p className="text-xs text-gray-400">
              all-time, signed-in accounts · {(kpis.conversionRate * 100).toFixed(1)}% end-to-end
            </p>
          </div>
          <Funnel
            data={[
              { label: "Created an account", value: funnel.signups },
              { label: "Answered a question", value: funnel.engaged },
              { label: "Hit a paywall", value: funnel.hitPaywall },
              { label: "Purchased", value: funnel.purchased },
            ]}
          />
          <p className="mt-4 text-[11px] text-gray-400">
            Guests practice without an account and only appear here after signing up. Paywall
            attribution accumulates from first deploy, so long-tenured accounts may under-report
            the middle stages.
          </p>
        </div>

      </div>
    </div>
  );
}
