"use client";

import Link from "next/link";
import {
  CARD, ShowAllButton, TabError, TabHeader, TabLoading, fmtUpdated, useAdminFetch, useTopN,
} from "@/components/admin/AdminTabParts";
import type { NewTestsPayload } from "@/lib/server/newTestsAdmin";
import { JUDGE_AFTER_DAYS, STEADY_PER_DAY, type Traffic } from "@/lib/newTests";

// The New tests tab on /admin, from /api/admin/new-tests
// (lib/server/newTestsAdmin.ts). Four questions, top down: are the new tests
// bringing people in, how many are getting traffic, what kind works best and
// where the visitors come from, then the best tests themselves.

const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");
const fmtRate = (n: number) => (n >= 10 ? fmtInt(n) : n.toFixed(1));
const fmtPct = (n: number) => `${Math.round(n * 100)}%`;
const fmtUsd = (cents: number) => `$${Math.round(cents / 100).toLocaleString("en-US")}`;
const fmtDay = (day: string) => new Date(`${day}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const H2 = "text-base font-semibold text-gray-900 dark:text-gray-50";
const SUB = "mt-1 text-sm text-gray-500 dark:text-gray-400";

const SOURCE_NAMES: Record<string, string> = {
  search: "Google & search", chatgpt: "ChatGPT", perplexity: "Perplexity", gemini: "Gemini", copilot: "Copilot",
  claude: "Claude", ai_other: "Other AI", friend: "Friend's link", direct: "Direct", other: "Other sites", unknown: "Unknown",
};
const REGION_NAMES = (() => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" });
  } catch {
    return null;
  }
})();
const countryName = (iso: string) => REGION_NAMES?.of(iso) ?? iso;

const TRAFFIC: { key: Traffic; label: string; color: string }[] = [
  { key: "steady", label: `${STEADY_PER_DAY}+ visitor a day`, color: "#16a34a" },
  { key: "trickle", label: "A trickle", color: "#f59e0b" },
  { key: "none", label: "No visitors yet", color: "#dc2626" },
  { key: "tooNew", label: `Under ${JUDGE_AFTER_DAYS} days old`, color: "#9ca3af" },
];

function Tile({ label, value, sub }: { label: string; value: string; sub: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-gray-900 p-4 shadow-sm">
      <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1.5 text-3xl leading-none font-semibold text-gray-900 dark:text-gray-50 tracking-tight tabular-nums">{value}</p>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{sub}</p>
    </div>
  );
}

/** A labelled bar list: one row per item, the bar scaled to the biggest. */
function Bars({ rows }: { rows: { label: string; value: string; size: number; note?: string }[] }) {
  const max = Math.max(...rows.map((r) => r.size), 0.0001);
  return (
    <ul className="mt-4 space-y-2.5">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 truncate text-gray-900 dark:text-gray-50" title={r.label}>{r.label}</span>
            <span className="shrink-0 tabular-nums text-gray-600 dark:text-gray-300">{r.value}</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
            <div className="h-2 rounded-full bg-brand" style={{ width: `${Math.max(2, (r.size / max) * 100)}%` }} />
          </div>
          {r.note && <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400 truncate">{r.note}</p>}
        </li>
      ))}
    </ul>
  );
}

function TrafficCard({ data }: { data: NewTestsPayload }) {
  const total = TRAFFIC.reduce((s, t) => s + data.traffic[t.key], 0) || 1;
  return (
    <div className={CARD}>
      <h2 className={H2}>Are they getting traffic?</h2>
      <p className={SUB}>Every test launched in the last {data.windowDays} days, by new visitors a day since launch.</p>
      <div className="mt-4 flex h-4 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        {TRAFFIC.map((t) => (
          <div key={t.key} style={{ width: `${(data.traffic[t.key] / total) * 100}%`, background: t.color }} title={`${t.label}: ${data.traffic[t.key]}`} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
        {TRAFFIC.map((t) => (
          <span key={t.key} className="inline-flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
            <span className="font-semibold tabular-nums text-gray-900 dark:text-gray-50">{data.traffic[t.key]}</span> {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function GroupsCard({ data }: { data: NewTestsPayload }) {
  const top = useTopN(data.groups, 8);
  return (
    <div className={CARD}>
      <h2 className={H2}>What kind works best</h2>
      <p className={SUB}>New visitors a test a day, by catalog group. Build more of what is at the top.</p>
      <Bars
        rows={top.shown.map((g) => ({
          label: g.group,
          value: `${fmtRate(g.perTestDay)} a day · ${g.tests} ${g.tests === 1 ? "test" : "tests"}`,
          size: g.perTestDay,
          note: g.best ? `Best: ${g.best}` : undefined,
        }))}
      />
      <ShowAllButton hidden={top.hidden} all={top.all} onToggle={top.toggle} noun="more groups" />
    </div>
  );
}

function SourcesCard({ data }: { data: NewTestsPayload }) {
  const visitors = data.sources.length > 0;
  const list = visitors ? data.sources : data.signupSources;
  return (
    <div className={CARD}>
      <h2 className={H2}>Where the visitors come from</h2>
      <p className={SUB}>
        {visitors
          ? "First visits to new tests, last 30 days."
          : `Signups from new tests, last 30 days. Visitors by source are counted from ${fmtDay(data.sourcesSince)}.`}
      </p>
      {list.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Nothing yet.</p>
      ) : (
        <Bars rows={list.slice(0, 6).map((s) => ({ label: SOURCE_NAMES[s.key] ?? s.key, value: `${fmtInt(s.n)} · ${fmtPct(s.share)}`, size: s.n }))} />
      )}
      {data.countries.length > 0 && (
        <>
          <h3 className="mt-6 text-sm font-semibold text-gray-900 dark:text-gray-50">Top countries</h3>
          <Bars rows={data.countries.slice(0, 5).map((c) => ({ label: countryName(c.key), value: `${fmtInt(c.n)} · ${fmtPct(c.share)}`, size: c.n }))} />
        </>
      )}
    </div>
  );
}

function TopTestsCard({ data }: { data: NewTestsPayload }) {
  const top = useTopN(data.tests, 10);
  return (
    <div className={CARD}>
      <h2 className={H2}>Best new tests</h2>
      <p className={SUB}>By new visitors a day since launch, so a test from Monday and one from last month compare fairly.</p>
      <ol className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
        {top.shown.map((t, i) => (
          <li key={t.id} className="flex items-center gap-3 py-2.5">
            <span className="w-6 shrink-0 text-right text-xs tabular-nums text-gray-400">{i + 1}</span>
            <div className="min-w-0 flex-1">
              <Link href={t.href} className="block truncate text-sm font-medium text-gray-900 dark:text-gray-50 hover:underline">{t.name}</Link>
              <p className="truncate text-[11px] text-gray-500 dark:text-gray-400">
                {fmtDay(t.launched)} · {t.group}
                {t.topSource ? ` · mostly ${SOURCE_NAMES[t.topSource] ?? t.topSource}` : ""}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold tabular-nums text-gray-900 dark:text-gray-50">{t.visitors ? `${fmtRate(t.perDay)}/day` : "–"}</p>
              <p className="text-[11px] tabular-nums text-gray-500 dark:text-gray-400">
                {t.signups} signups{t.revenueUsdCents ? ` · ${fmtUsd(t.revenueUsdCents)}` : ""}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <ShowAllButton hidden={top.hidden} all={top.all} onToggle={top.toggle} noun="more tests" />
    </div>
  );
}

export function NewTestsTab() {
  const { data, error, loading, refreshing, updating, reload } = useAdminFetch<NewTestsPayload>("/api/admin/new-tests");
  if (loading) return <TabLoading />;
  if (error || !data) return <TabError message={error || "Failed to load"} />;
  const share = (a: number, b: number) => (b > 0 ? `${fmtPct(a / b)} of all` : "");
  return (
    <div className="space-y-4 sm:space-y-6">
      <TabHeader
        subtitle={<>Tests launched in the last {data.windowDays} days · updated {fmtUpdated(data.generatedAt)}</>}
        onRefresh={() => reload(true)}
        refreshing={refreshing}
        updating={updating}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Tile label="New visitors this week" value={fmtInt(data.visitors7d)} sub={<>{share(data.visitors7d, data.allVisitors7d)} first visits to Tigertest</>} />
        <Tile label="Signups, last 30 days" value={fmtInt(data.signups30d)} sub={<>{share(data.signups30d, data.allSignups30d)} signups · {fmtUsd(data.revenueUsdCents)} revenue</>} />
        <Tile label="Tests launched" value={fmtInt(data.launched30d)} sub={<>in 30 days · {fmtInt(data.launched7d)} this week</>} />
      </div>
      <TrafficCard data={data} />
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <GroupsCard data={data} />
        <SourcesCard data={data} />
      </div>
      <TopTestsCard data={data} />
    </div>
  );
}
