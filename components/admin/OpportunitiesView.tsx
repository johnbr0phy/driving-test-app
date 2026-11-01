"use client";

import { useMemo, useState } from "react";
import { Sparkles, ChevronDown, CheckCircle2, AlertTriangle, XCircle, DollarSign, TrendingUp, Repeat, Wrench } from "lucide-react";
import type { OpportunitiesPayload } from "@/lib/server/opportunities";
import type { DailyBrief } from "@/lib/server/dailyBrief";
import { CARD, ROW, STICKY_COL, TabHeader, TableScroll, fmtUpdated } from "@/components/admin/AdminTabParts";

// The Opportunities tab body on /admin, given the API payload. Kept apart
// from the fetch so it renders without an admin session.

// Same validated palette as the Growth tab: blue for people, green for money.
const COLORS = {
  users: "#2a78d6",
  revenue: "#008300",
  deltaUp: "#006300",
  deltaDown: "#d03b3b",
  ramp: ["#eef5fd", "#d4e6fa", "#a9cdf5", "#86b6ef", "#5598e7", "#2a78d6", "#1c5cab"],
};

const fmtInt = (n: number) => n.toLocaleString("en-US");
const fmtDollars = (cents: number) => `$${Math.round(cents / 100).toLocaleString("en-US")}`;
const fmtDollarsExact = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
const fmtPct = (x: number | null, digits = 0) => (x === null ? "n/a" : `${(x * 100).toFixed(digits)}%`);
const fmtDay = (key: string) =>
  new Date(key + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

function Delta({ now, prev, format = fmtInt }: { now: number; prev: number | null; format?: (n: number) => string }) {
  if (prev === null) return <span className="text-gray-400">no earlier data</span>;
  if (prev === 0) return <span className="text-gray-500 dark:text-gray-400">vs {format(0)}</span>;
  const change = now / prev - 1;
  const up = change >= 0;
  return (
    <span style={{ color: up ? COLORS.deltaUp : COLORS.deltaDown }} className="tabular-nums">
      {up ? "▲" : "▼"} {Math.abs(Math.round(change * 100))}%{" "}
      <span className="text-gray-500 dark:text-gray-400">vs {format(prev)}</span>
    </span>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className={`text-gray-900 dark:text-gray-50 ${CARD} mb-4 sm:mb-6`}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">{title}</h2>
        {subtitle && <div className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>}
      </div>
      {children}
    </section>
  );
}

function Tile({ label, value, sub }: { label: string; value: string; sub: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-3 sm:p-4">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-50 tabular-nums mt-1">{value}</p>
      <p className="text-[11px] mt-1">{sub}</p>
    </div>
  );
}

/** A thin single-hue bar behind a number, scaled to the column's max. */
function Bar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  const width = max > 0 ? Math.max(value > 0 ? 2 : 0, (value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-2 justify-end" title={label}>
      <span className="tabular-nums">{label}</span>
      <div className="w-20 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden hidden sm:block">
        <div className="h-full rounded-full" style={{ width: `${width}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function Th({ children, right, title, sticky }: { children: React.ReactNode; right?: boolean; title?: string; sticky?: boolean }) {
  return (
    <th title={title} className={`font-medium pb-2 px-2 whitespace-nowrap ${right ? "text-right" : "text-left"} ${sticky ? STICKY_COL : ""}`}>
      {children}
    </th>
  );
}

type CountryId = OpportunitiesPayload["countries"][number]["id"];
const COUNTRY_SHORT: Record<string, string> = { GLOBAL: "World" };

/** Practice, people, visitors and money per country; a row filters the exam table below. */
function CountriesCard({ data, selected, onSelect }: {
  data: OpportunitiesPayload;
  selected: CountryId | "all";
  onSelect: (id: CountryId | "all") => void;
}) {
  const rows = data.countries;
  const maxAnswers = Math.max(...rows.map((c) => c.answers30d), 1);
  const totalAnswers = rows.reduce((n, c) => n + c.answers30d, 0);
  const tracked = data.countriesSince !== null;
  return (
    <Card
      title="By country"
      subtitle={tracked ? `Visitors by their country since ${fmtDay(data.countriesSince!)}, practice by the exam's` : "Practice by the exam's country"}
    >
      <TableScroll className="-mx-2">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 dark:text-gray-400">
            <tr className={ROW}>
              <Th sticky>Country</Th>
              <Th right title="Exams with any practice in 30 days, of the exams listed">Exams in use</Th>
              <Th right>Answers, 30d</Th>
              <Th right title="Answers in the 30 days before that">vs prior 30d</Th>
              <Th right title="Share of all answers in 30 days">Share</Th>
              <Th right title="Distinct people per exam, summed: someone on two exams counts twice">Learners</Th>
              <Th right title="First visits from the country, by IP, 30 days">Visitors, 30d</Th>
              <Th right title="Accounts created from the country, by IP">Signups</Th>
              <Th right>Revenue, 30d</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => {
              const active = selected === c.id;
              return (
                <tr
                  key={c.id}
                  onClick={() => onSelect(active ? "all" : c.id)}
                  className={`${ROW} border-t border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 ${active ? "bg-blue-50 dark:bg-blue-950" : ""}`}
                  title={active ? "Show every exam" : `Show only ${c.label} exams below`}
                >
                  <td className={`py-2 px-2 ${STICKY_COL}`}>
                    <p className="font-medium text-gray-900 dark:text-gray-50 whitespace-nowrap">{c.label}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[9rem] sm:max-w-[16rem]">
                      {c.topExams.length > 0 ? c.topExams.join(", ") : "No practice in 30 days"}
                    </p>
                  </td>
                  <td className="py-2 px-2 text-right tabular-nums whitespace-nowrap">
                    {fmtInt(c.activeExams)} <span className="text-gray-400">of {fmtInt(c.exams)}</span>
                  </td>
                  <td className="py-2 px-2 text-right">
                    <Bar value={c.answers30d} max={maxAnswers} color={COLORS.users} label={fmtInt(c.answers30d)} />
                  </td>
                  <td className="py-2 px-2 text-right text-xs whitespace-nowrap">
                    {c.answersPrev30d > 0 ? <Delta now={c.answers30d} prev={c.answersPrev30d} /> : <span className="text-gray-400">new</span>}
                  </td>
                  <td className="py-2 px-2 text-right tabular-nums">{totalAnswers > 0 ? fmtPct(c.answers30d / totalAnswers) : "n/a"}</td>
                  <td className="py-2 px-2 text-right tabular-nums">{fmtInt(c.learners)}</td>
                  <td className="py-2 px-2 text-right tabular-nums">{c.visitors30d === null ? <span className="text-gray-400">·</span> : fmtInt(c.visitors30d)}</td>
                  <td className="py-2 px-2 text-right tabular-nums">{c.signups === null ? <span className="text-gray-400">·</span> : fmtInt(c.signups)}</td>
                  <td className="py-2 px-2 text-right tabular-nums">{c.revenue30dCents > 0 ? fmtDollars(c.revenue30dCents) : <span className="text-gray-400">·</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableScroll>
      <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
        Tap a country to filter the exam table. Answers and learners are filed by the exam&apos;s country (a Canadian on the DMV test counts under the US);
        visitors and signups by the visitor&apos;s.
        {data.otherCountryVisitors30d !== null && ` ${fmtInt(data.otherCountryVisitors30d)} first visits in 30 days came from countries with no tests of their own.`}
        {!tracked && " Visitors and signups by country fill in from this release on."} Only US exams sell: checkout is in US dollars.
      </p>
    </Card>
  );
}

const INSIGHT_ICON = { money: DollarSign, growth: TrendingUp, retention: Repeat, fix: Wrench } as const;
const HEALTH_ICON = {
  ok: { Icon: CheckCircle2, className: "text-green-700 dark:text-green-400", label: "OK" },
  warn: { Icon: AlertTriangle, className: "text-amber-600 dark:text-amber-400", label: "Partial" },
  bad: { Icon: XCircle, className: "text-red-600 dark:text-red-400", label: "Wrong" },
} as const;

function RateCell({ value }: { value: number | null }) {
  if (value === null) return <td className="py-2 px-2 text-center text-gray-400">·</td>;
  const step = Math.min(COLORS.ramp.length - 1, Math.floor(value * 2 * COLORS.ramp.length));
  return (
    <td className="py-1 px-1">
      <div
        className="rounded-md py-1.5 text-center tabular-nums text-xs"
        style={{ backgroundColor: COLORS.ramp[step], color: step >= 4 ? "#ffffff" : "#1f2937" }}
        title={`${(value * 100).toFixed(1)}%`}
      >
        {(value * 100).toFixed(0)}%
      </div>
    </td>
  );
}

/** Claude's daily update (lib/server/dailyBrief), or how to get the first one. */
function BriefCard({ brief, onWrite, writing, error }: {
  brief: DailyBrief | null;
  onWrite?: () => void;
  writing: boolean;
  error: string | null;
}) {
  const written = brief
    ? new Date(brief.generatedAt).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
    : null;
  return (
    <section className={`text-gray-900 dark:text-gray-50 ${CARD} mb-4 sm:mb-6`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          {written ? `Today's update · written by Claude ${written}` : "Today's update"}
        </p>
        {onWrite && (
          <button
            onClick={onWrite}
            disabled={writing}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 underline underline-offset-2 disabled:no-underline"
          >
            {writing ? "Writing, about 20 seconds..." : brief ? "Write a fresh one" : "Write one now"}
          </button>
        )}
      </div>
      {brief ? (
        <>
          <p className="text-lg font-semibold leading-snug">{brief.headline}</p>
          <ul className="mt-3 space-y-2">
            {brief.bullets.map((b) => (
              <li key={b} className="flex gap-2 text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                <span className="text-gray-400 select-none">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          No update yet. Claude writes one here every weekday morning once the Claude API key is set up in Vercel.
        </p>
      )}
      {error && <p className="mt-3 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </section>
  );
}

export function OpportunitiesView({ data, onRefresh, refreshing, updating = false, onWriteBrief, writingBrief = false, briefError = null }: {
  data: OpportunitiesPayload & { brief?: DailyBrief | null };
  onRefresh: () => void;
  refreshing: boolean;
  updating?: boolean;
  onWriteBrief?: () => void;
  writingBrief?: boolean;
  briefError?: string | null;
}) {
  const [showNotes, setShowNotes] = useState(false);
  const [showAllExams, setShowAllExams] = useState(false);
  const [country, setCountry] = useState<CountryId | "all">("all");
  const [query, setQuery] = useState("");
  const s = data.scoreboard;
  // A cached payload from before the By country card has no countries.
  const hasCountries = Array.isArray(data.countries) && data.countries.length > 0;
  // Busiest first (the API's order), narrowed by country and search; the
  // long tail is one click away.
  const EXAMS_SHOWN = 12;
  const filteredExams = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.exams.filter(
      (e) =>
        (country === "all" || (e.region ?? "US") === country) &&
        (!q || e.label.toLowerCase().includes(q) || e.id.includes(q) || e.group.toLowerCase().includes(q)),
    );
  }, [data.exams, country, query]);
  const narrowed = country !== "all" || query.trim() !== "";
  const shownExams = showAllExams || narrowed ? filteredExams : filteredExams.slice(0, EXAMS_SHOWN);
  const idleCount = filteredExams.filter((e) => e.answers30d === 0 && e.purchasesAll === 0).length;
  const maxAnswers = Math.max(...data.exams.map((e) => e.answers30d), 1);
  const maxRevenue = Math.max(...data.exams.map((e) => e.revenueAllCents), 1);
  const countryLabel = (id: string) => COUNTRY_SHORT[id] ?? id;
  const visits7Total = data.sources.reduce((n, x) => n + x.visits7d, 0);
  const maxSource = Math.max(...data.sources.map((x) => x.visits7d), 1);
  const maxPaywallViews = Math.max(...data.paywalls.map((p) => p.hitsAll), 1);

  return (
    <>
      <TabHeader
        subtitle={<>Where the next dollar and the next visitor come from · Firestore + Stripe · updated {fmtUpdated(data.generatedAt)}</>}
        onRefresh={onRefresh}
        refreshing={refreshing}
        updating={updating}
      />

        <BriefCard brief={data.brief ?? null} onWrite={onWriteBrief} writing={writingBrief} error={briefError} />

        {/* The fixed notes behind the update, folded away */}
        {data.insights.length > 0 && (
          <button
            onClick={() => setShowNotes((v) => !v)}
            className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 mb-4 -mt-2"
          >
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showNotes ? "rotate-180" : ""}`} aria-hidden />
            {showNotes ? "Hide" : "Show"} the {data.insights.length} notes behind it
          </button>
        )}
        {showNotes && data.insights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {data.insights.map((ins) => {
              const Icon = INSIGHT_ICON[ins.kind];
              return (
                <div key={ins.title} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-4 flex gap-3">
                  <Icon className="h-5 w-5 shrink-0 mt-0.5 text-gray-500 dark:text-gray-400" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">{ins.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">{ins.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Scoreboard, last 30 days */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Tile label="Revenue, 30 days" value={fmtDollars(s.revenue.cur30)} sub={<Delta now={s.revenue.cur30} prev={s.revenue.prev30} format={fmtDollars} />} />
          <Tile label="Purchases, 30 days" value={fmtInt(s.purchases.cur30)} sub={<Delta now={s.purchases.cur30} prev={s.purchases.prev30} />} />
          <Tile label="New accounts, 30 days" value={fmtInt(s.signups.cur30)} sub={<Delta now={s.signups.cur30} prev={s.signups.prev30} />} />
          <Tile
            label="Purchases per new account"
            value={fmtPct(s.signupToBuyer30d, 1)}
            sub={<span className="text-gray-500 dark:text-gray-400">30 days, any account may buy</span>}
          />
          <Tile
            label="Revenue per 1,000 answers"
            value={s.revenuePer1kAnswers30d === null ? "n/a" : fmtDollarsExact(s.revenuePer1kAnswers30d)}
            sub={<span className="text-gray-500 dark:text-gray-400">{fmtInt(s.answers.cur30)} answers in 30 days</span>}
          />
          <Tile
            label="Revenue per 1,000 visitors"
            value={s.revenuePer1kVisits30d === null ? "n/a" : fmtDollars(s.revenuePer1kVisits30d)}
            sub={
              <span className="text-gray-500 dark:text-gray-400">
                {fmtInt(s.visits.cur30)} new visitors{s.visits.since ? ` since ${fmtDay(s.visits.since)}` : ""}
              </span>
            }
          />
        </div>

        {/* Countries */}
        {hasCountries && <CountriesCard data={data} selected={country} onSelect={setCountry} />}

        {/* Exams */}
        <Card
          title={country === "all" ? "Every exam: practice and money" : `${data.countries.find((c) => c.id === country)?.label ?? country}: practice and money`}
          subtitle={
            !narrowed && filteredExams.length > EXAMS_SHOWN ? (
              <button onClick={() => setShowAllExams((v) => !v)} className="underline underline-offset-2 hover:text-gray-800 dark:hover:text-gray-100">
                {showAllExams ? `Show the top ${EXAMS_SHOWN}` : `Show all ${filteredExams.length} exams (${idleCount} with no practice in 30 days)`}
              </button>
            ) : (
              narrowed && `${filteredExams.length} exams, ${idleCount} with no practice in 30 days`
            )
          }
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {hasCountries && (
              <div className="flex flex-wrap gap-1">
                {(["all", ...data.countries.map((c) => c.id)] as const).map((id) => (
                  <button
                    key={id}
                    onClick={() => setCountry(id)}
                    className={`text-[11px] font-medium rounded-md px-2 py-1 ${
                      country === id
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50"
                    }`}
                  >
                    {id === "all" ? "All" : countryLabel(id)}
                  </button>
                ))}
              </div>
            )}
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find an exam or group"
              className="text-xs rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 px-2 py-1 w-full sm:w-48 sm:ml-auto"
            />
          </div>
          <TableScroll className="-mx-2">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 dark:text-gray-400">
                <tr className={ROW}>
                  <Th sticky>Exam</Th>
                  <Th>Sells</Th>
                  <Th right title="Distinct people (accounts and guest browsers) with at least one answer, all time">People</Th>
                  <Th right>Answers, 30d</Th>
                  <Th right title="Answers in the 30 days before that">vs prior 30d</Th>
                  <Th right title="Every answer filed under the exam since the per-exam split, history seeded from accounts">All time</Th>
                  <Th right>Paywall views, 30d</Th>
                  <Th right>Purchases</Th>
                  <Th right>Revenue</Th>
                </tr>
              </thead>
              <tbody>
                {shownExams.map((e) => (
                  <tr key={e.id} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                    <td className={`py-2 px-2 ${STICKY_COL}`}>
                      <p className="font-medium text-gray-900 dark:text-gray-50 whitespace-nowrap">{e.label}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[8.5rem] sm:max-w-none" title={e.group}>
                        {e.region && <span className="font-medium">{countryLabel(e.region)} · </span>}
                        {e.group}
                      </p>
                    </td>
                    <td className="py-2 px-2">
                      {e.monetized ? (
                        <span className="inline-flex whitespace-nowrap px-2 py-0.5 rounded text-[11px] font-medium bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300">Premium</span>
                      ) : (
                        <span className="inline-flex whitespace-nowrap px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">Free only</span>
                      )}
                    </td>
                    <td className="py-2 px-2 text-right tabular-nums">{fmtInt(e.enrolled)}</td>
                    <td className="py-2 px-2 text-right">
                      <Bar value={e.answers30d} max={maxAnswers} color={COLORS.users} label={fmtInt(e.answers30d)} />
                    </td>
                    <td className="py-2 px-2 text-right text-xs whitespace-nowrap">
                      {e.answersPrev30d > 0 ? <Delta now={e.answers30d} prev={e.answersPrev30d} /> : <span className="text-gray-400">new</span>}
                    </td>
                    <td className="py-2 px-2 text-right tabular-nums">{e.answersAll === undefined ? "·" : fmtInt(e.answersAll)}</td>
                    <td className="py-2 px-2 text-right tabular-nums">{e.monetized ? fmtInt(e.paywallHits30d) : <span className="text-gray-400">·</span>}</td>
                    <td className="py-2 px-2 text-right tabular-nums">
                      {fmtInt(e.purchasesAll)}
                      {e.purchases30d > 0 && <p className="text-[11px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{e.purchases30d} in 30 days</p>}
                    </td>
                    <td className="py-2 px-2 text-right">
                      {e.revenueAllCents > 0 ? (
                        <Bar value={e.revenueAllCents} max={maxRevenue} color={COLORS.revenue} label={fmtDollars(e.revenueAllCents)} />
                      ) : (
                        <span className="text-gray-400">·</span>
                      )}
                    </td>
                  </tr>
                ))}
                {shownExams.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-4 px-2 text-center text-xs text-gray-500 dark:text-gray-400">No exam matches.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </TableScroll>
          <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
            Revenue is net of refunds and lifetime. Older payments are placed by the paywall saved on their Stripe checkout. Answers per exam were split out
            in October 2026, so most exams have no prior 30 days.
          </p>
        </Card>

        {/* Paywalls */}
        <Card title="Which paywalls sell" subtitle="Views from analytics/paywalls, purchases from Stripe checkouts">
          <TableScroll className="-mx-2">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 dark:text-gray-400">
                <tr className={ROW}>
                  <Th sticky>Paywall</Th>
                  <Th right>Views, 30d</Th>
                  <Th right>Views, all time</Th>
                  <Th right title="Signed-in accounts that saw it at least once">Accounts</Th>
                  <Th right>Purchases, 30d</Th>
                  <Th right>Purchases, all</Th>
                  <Th right title="Purchases per 100 views, all time">Per 100 views</Th>
                  <Th right>Revenue</Th>
                </tr>
              </thead>
              <tbody>
                {data.paywalls.map((p) => (
                  <tr key={p.feature} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                    <td className={`py-2 px-2 font-medium text-gray-900 dark:text-gray-50 ${STICKY_COL}`}>{p.label}</td>
                    <td className="py-2 px-2 text-right tabular-nums">{fmtInt(p.hits30d)}</td>
                    <td className="py-2 px-2 text-right">
                      <Bar value={p.hitsAll} max={maxPaywallViews} color={COLORS.users} label={fmtInt(p.hitsAll)} />
                    </td>
                    <td className="py-2 px-2 text-right tabular-nums">{fmtInt(p.signedInHitters)}</td>
                    <td className="py-2 px-2 text-right tabular-nums">{fmtInt(p.purchases30d)}</td>
                    <td className="py-2 px-2 text-right tabular-nums">{fmtInt(p.purchasesAll)}</td>
                    <td className="py-2 px-2 text-right tabular-nums">
                      {p.hitsAll > 0 ? (p.purchasesAll / p.hitsAll * 100).toFixed(1) : <span className="text-gray-400">·</span>}
                    </td>
                    <td className="py-2 px-2 text-right tabular-nums">{p.revenueAllCents > 0 ? fmtDollars(p.revenueAllCents) : <span className="text-gray-400">·</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
          <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
            Views are counted per open, including signed-out visitors, so per 100 views is a floor on the true rate. The dashboard sends one checkout name
            for both locked training sets (3 and 4) and both locked tests.
          </p>
        </Card>

        {/* English paywall test */}
        {data.paywallTest && (
          <Card
            title="Paywall test, English readers"
            subtitle={`50/50 by browser${data.paywallTest.since ? `, since ${fmtDay(data.paywallTest.since.slice(0, 10))}` : ""}`}
          >
            <TableScroll className="-mx-2">
              <table className="w-full text-sm">
                <thead className="text-xs text-gray-500 dark:text-gray-400">
                  <tr className={ROW}>
                    <Th sticky>Paywall</Th>
                    <Th right title="Browsers that saw it at least once">Browsers</Th>
                    <Th right>Views</Th>
                    <Th right>Purchases</Th>
                    <Th right title="Purchases per 100 browsers that saw it">Per 100 browsers</Th>
                    <Th right>Revenue</Th>
                  </tr>
                </thead>
                <tbody>
                  {data.paywallTest.variants.map((v) => (
                    <tr key={v.id} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                      <td className={`py-2 px-2 font-medium text-gray-900 dark:text-gray-50 ${STICKY_COL}`}>{v.label}</td>
                      <td className="py-2 px-2 text-right tabular-nums">{fmtInt(v.browsers)}</td>
                      <td className="py-2 px-2 text-right tabular-nums">{fmtInt(v.views)}</td>
                      <td className="py-2 px-2 text-right tabular-nums">{fmtInt(v.purchases)}</td>
                      <td className="py-2 px-2 text-right tabular-nums">
                        {v.browsers > 0 ? ((v.purchases / v.browsers) * 100).toFixed(2) : <span className="text-gray-400">·</span>}
                      </td>
                      <td className="py-2 px-2 text-right tabular-nums">{v.revenueCents > 0 ? fmtDollars(v.revenueCents) : <span className="text-gray-400">·</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScroll>
            <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
              {data.paywallTest.pValue === null
                ? "No purchases from the test yet."
                : data.paywallTest.pValue < 0.05
                  ? `The difference is unlikely to be chance (p = ${data.paywallTest.pValue.toFixed(3)}).`
                  : `Too close to call so far (p = ${data.paywallTest.pValue.toFixed(2)}); keep it running.`}{" "}
              Each browser keeps its side. Spanish, Vietnamese, Korean and Chinese readers are not in the test. Preview a side with ?paywall=john or
              ?paywall=classic.
            </p>
          </Card>
        )}

        {/* Tell a friend prompt */}
        {data.sharePrompt && (() => {
          const sp = data.sharePrompt;
          const get = (id: string) => sp.actions.find((a) => a.id === id);
          const shown = get("shown");
          const sharedAll = (get("share")?.total || 0) + (get("copy")?.total || 0);
          const shared30 = (get("share")?.last30d || 0) + (get("copy")?.last30d || 0);
          const friend = data.sources.find((s) => s.id === "friend");
          const rate = (n: number, d: number) => (d > 0 ? `${((n / d) * 100).toFixed(1)}%` : "·");
          return (
            <Card
              title="Tell a friend prompt"
              subtitle={`John's ask to non-Premium learners on a roll${sp.since ? `, since ${fmtDay(sp.since.slice(0, 10))}` : ""}`}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <Tile label="Shown, 30 days" value={fmtInt(shown?.last30d || 0)} sub={`${fmtInt(shown?.total || 0)} all time`} />
                <Tile label="Shared, 30 days" value={fmtInt(shared30)} sub={`${rate(shared30, shown?.last30d || 0)} of shown`} />
                <Tile label="Friends who visited, 30 days" value={friend ? fmtInt(friend.visits30d) : "·"} sub="first visits from a shared link" />
                <Tile label="Friends who signed up" value={friend ? fmtInt(friend.signups) : "·"} sub={friend ? `${fmtInt(friend.buyers)} bought Premium` : ""} />
              </div>
              <TableScroll className="-mx-2">
                <table className="w-full text-sm">
                  <thead className="text-xs text-gray-500 dark:text-gray-400">
                    <tr className={ROW}>
                      <Th sticky>Action</Th>
                      <Th right>30 days</Th>
                      <Th right>All time</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {sp.actions.map((a) => (
                      <tr key={a.id} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                        <td className={`py-2 px-2 font-medium text-gray-900 dark:text-gray-50 ${STICKY_COL}`}>{a.label}</td>
                        <td className="py-2 px-2 text-right tabular-nums">{fmtInt(a.last30d)}</td>
                        <td className="py-2 px-2 text-right tabular-nums">{fmtInt(a.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableScroll>
              <TableScroll className="-mx-2 mt-3">
                <table className="w-full text-sm">
                  <thead className="text-xs text-gray-500 dark:text-gray-400">
                    <tr className={ROW}>
                      <Th sticky>Where</Th>
                      <Th right>Shown</Th>
                      <Th right>Shared</Th>
                      <Th right>Share rate</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {sp.byWhere.map((r) => (
                      <tr key={r.id} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                        <td className={`py-2 px-2 font-medium text-gray-900 dark:text-gray-50 ${STICKY_COL}`}>{r.label}</td>
                        <td className="py-2 px-2 text-right tabular-nums">{fmtInt(r.shown)}</td>
                        <td className="py-2 px-2 text-right tabular-nums">{fmtInt(r.shared)}</td>
                        <td className="py-2 px-2 text-right tabular-nums">{rate(r.shared, r.shown)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableScroll>
              <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
                Shared counts a completed share sheet or a copied link ({fmtInt(sharedAll)} all time); we can&apos;t see whether the message was sent.
                Friends are first visits whose link carried utm_source=friend; signups and buyers are all-time accounts whose first visit came that way.
              </p>
            </Card>
          );
        })()}

        {/* Sources */}
        <Card
          title="Where new visitors come from"
          subtitle={data.sourcesSince ? `First visits by source, counted since ${fmtDay(data.sourcesSince)}` : "First visits by source"}
        >
          <TableScroll className="-mx-2">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 dark:text-gray-400">
                <tr className={ROW}>
                  <Th sticky>Source</Th>
                  <Th right>Visitors, 7d</Th>
                  <Th right>vs prior 7d</Th>
                  <Th right>Share, 7d</Th>
                  <Th right>Visitors, 30d</Th>
                  <Th right title="Accounts whose first visit came from this source (from this release on)">Signups</Th>
                  <Th right>Buyers</Th>
                </tr>
              </thead>
              <tbody>
                {data.sources.map((x) => (
                  <tr key={x.id} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                    <td className={`py-2 px-2 font-medium text-gray-900 dark:text-gray-50 ${STICKY_COL}`}>
                      {x.label}
                      {x.ai && <span className="ml-2 text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">AI</span>}
                    </td>
                    <td className="py-2 px-2 text-right">
                      <Bar value={x.visits7d} max={maxSource} color={COLORS.users} label={fmtInt(x.visits7d)} />
                    </td>
                    <td className="py-2 px-2 text-right text-xs whitespace-nowrap">
                      <Delta now={x.visits7d} prev={x.visitsPrev7d} />
                    </td>
                    <td className="py-2 px-2 text-right tabular-nums">{visits7Total > 0 ? fmtPct(x.visits7d / visits7Total) : "n/a"}</td>
                    <td className="py-2 px-2 text-right tabular-nums">{fmtInt(x.visits30d)}</td>
                    <td className="py-2 px-2 text-right tabular-nums">{data.sourceSignupsTracked > 0 ? fmtInt(x.signups) : <span className="text-gray-400">·</span>}</td>
                    <td className="py-2 px-2 text-right tabular-nums">{data.sourceSignupsTracked > 0 ? fmtInt(x.buyers) : <span className="text-gray-400">·</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
          {data.landings.length > 0 ? (
            <div className="mt-5">
              <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2">Landing pages that make accounts</h3>
              <ul className="text-sm divide-y divide-gray-100 dark:divide-gray-800">
                {data.landings.map((l) => (
                  <li key={l.path} className="flex justify-between py-1.5">
                    <span className="font-mono text-xs text-gray-700 dark:text-gray-200 truncate">{l.path}</span>
                    <span className="tabular-nums text-xs text-gray-600 dark:text-gray-300 shrink-0 ml-3">
                      {fmtInt(l.signups)} signups · {fmtInt(l.buyers)} buyers
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
              Signups, buyers and landing pages by source fill in as new accounts are created: each one now carries its first visit&apos;s source and page.
            </p>
          )}
        </Card>

        {/* Retention */}
        <Card title="Do new accounts come back?" subtitle="Weekly signup cohorts, share active again">
          <TableScroll className="-mx-2">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 dark:text-gray-400">
                <tr className={ROW}>
                  <Th sticky>Signed up</Th>
                  <Th right>Accounts</Th>
                  <Th right title="Any active day from day 1 to day 29 after signup">Ever back</Th>
                  <Th right title="Active on day 7 to 13">Week 2</Th>
                  <Th right title="Active on day 14 to 20">Week 3</Th>
                  <Th right title="Active on day 28 to 34">Week 5</Th>
                  <Th right>Bought</Th>
                </tr>
              </thead>
              <tbody>
                {data.cohorts.map((c) => (
                  <tr key={c.start} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                    <td className={`py-2 px-2 whitespace-nowrap ${STICKY_COL}`}>{fmtDay(c.start)} to {fmtDay(c.end)}</td>
                    <td className="py-2 px-2 text-right tabular-nums">{fmtInt(c.size)}</td>
                    <RateCell value={c.cameBack} />
                    <RateCell value={c.week1} />
                    <RateCell value={c.week2} />
                    <RateCell value={c.week4} />
                    <td className="py-2 px-2 text-right tabular-nums">
                      {fmtInt(c.bought)} <span className="text-[11px] text-gray-500 dark:text-gray-400">({c.size > 0 ? fmtPct(c.bought / c.size, 1) : "n/a"})</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
          <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
            A dot means that week has not fully passed for everyone in the cohort. Accounts only: guests have no activity record.
          </p>
        </Card>

        {/* Data health */}
        <Card title="Can we trust these numbers?" subtitle="Tracking gaps found in the October 2026 audit">
          <ul className="space-y-3">
            {data.health.map((h) => {
              const { Icon, className, label } = HEALTH_ICON[h.status];
              return (
                <li key={h.id} className="flex gap-3">
                  <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${className}`} aria-hidden />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {h.title} <span className={`text-[11px] font-normal ${className}`}>{label}</span>
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">{h.detail}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
    </>
  );
}
