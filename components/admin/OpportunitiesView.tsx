"use client";

import { useState } from "react";
import Link from "next/link";
import { RefreshCw, ExternalLink, CheckCircle2, AlertTriangle, XCircle, DollarSign, TrendingUp, Repeat, Wrench } from "lucide-react";
import type { OpportunitiesPayload } from "@/lib/server/opportunities";

// The /admin/opportunities page body, given the API payload. Kept apart
// from the page so it renders without an admin session.

// Same validated palette as /admin/v2: blue for people, green for money.
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
    <section className="text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5 mb-6">
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
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-4">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50 tabular-nums mt-1">{value}</p>
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

function Th({ children, right, title }: { children: React.ReactNode; right?: boolean; title?: string }) {
  return (
    <th title={title} className={`font-medium pb-2 px-2 whitespace-nowrap ${right ? "text-right" : "text-left"}`}>
      {children}
    </th>
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

export function OpportunitiesView({ data, onRefresh, refreshing }: {
  data: OpportunitiesPayload;
  onRefresh: () => void;
  refreshing: boolean;
}) {
  const [showAllExams, setShowAllExams] = useState(false);
  const s = data.scoreboard;
  // Busiest first (the API's order); the long tail is one click away.
  const EXAMS_SHOWN = 12;
  const shownExams = showAllExams ? data.exams : data.exams.slice(0, EXAMS_SHOWN);
  const idleCount = data.exams.filter((e) => e.answers30d === 0 && e.purchasesAll === 0).length;
  const maxAnswers = Math.max(...data.exams.map((e) => e.answers30d), 1);
  const maxRevenue = Math.max(...data.exams.map((e) => e.revenueAllCents), 1);
  const visits7Total = data.sources.reduce((n, x) => n + x.visits7d, 0);
  const maxSource = Math.max(...data.sources.map((x) => x.visits7d), 1);
  const maxPaywallViews = Math.max(...data.paywalls.map((p) => p.hitsAll), 1);

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight">TigerTest Opportunities</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Where the next dollar and the next visitor come from · Firestore + Stripe · updated{" "}
              {new Date(data.generatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/v2" className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 px-2 py-1.5">
              Growth <ExternalLink className="h-3 w-3" />
            </Link>
            <Link href="/admin" className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 px-2 py-1.5">
              Classic admin <ExternalLink className="h-3 w-3" />
            </Link>
            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg px-3 py-1.5 shadow-sm"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* What to do next */}
        {data.insights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
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

        {/* Exams */}
        <Card
          title="Every exam: practice and money"
          subtitle={
            data.exams.length > EXAMS_SHOWN && (
              <button onClick={() => setShowAllExams((v) => !v)} className="underline underline-offset-2 hover:text-gray-800 dark:hover:text-gray-100">
                {showAllExams ? `Show the top ${EXAMS_SHOWN}` : `Show all ${data.exams.length} exams (${idleCount} with no practice in 30 days)`}
              </button>
            )
          }
        >
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 dark:text-gray-400">
                <tr>
                  <Th>Exam</Th>
                  <Th>Sells</Th>
                  <Th right title="Distinct people (accounts and guest browsers) with at least one answer, all time">People</Th>
                  <Th right>Answers, 30d</Th>
                  <Th right title="Answers in the 30 days before that">vs prior 30d</Th>
                  <Th right>Paywall views, 30d</Th>
                  <Th right>Purchases</Th>
                  <Th right>Revenue</Th>
                  <Th right title="What the last 30 days of answers would have earned at the DMV's revenue per answer. A ceiling on demand, not a forecast.">At DMV rate, /30d</Th>
                </tr>
              </thead>
              <tbody>
                {shownExams.map((e) => (
                  <tr key={e.id} className="border-t border-gray-100 dark:border-gray-800">
                    <td className="py-2 px-2">
                      <p className="font-medium text-gray-900 dark:text-gray-50">{e.label}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{e.group}</p>
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
                    <td className="py-2 px-2 text-right tabular-nums text-gray-600 dark:text-gray-300">
                      {e.potential30dCents === null ? <span className="text-gray-400">·</span> : fmtDollars(e.potential30dCents)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
            Revenue is net of refunds and lifetime. Older payments are placed by the paywall saved on their Stripe checkout. Answers per exam were split out
            in October 2026, so most exams have no prior 30 days.
          </p>
        </Card>

        {/* Paywalls */}
        <Card title="Which paywalls sell" subtitle="Views from analytics/paywalls, purchases from Stripe checkouts">
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 dark:text-gray-400">
                <tr>
                  <Th>Paywall</Th>
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
                  <tr key={p.feature} className="border-t border-gray-100 dark:border-gray-800">
                    <td className="py-2 px-2 font-medium text-gray-900 dark:text-gray-50">{p.label}</td>
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
          </div>
          <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
            Views are counted per open, including signed-out visitors, so per 100 views is a floor on the true rate. The dashboard sends one checkout name
            for both locked training sets (3 and 4) and both locked tests.
          </p>
        </Card>

        {/* Sources */}
        <Card
          title="Where new visitors come from"
          subtitle={data.sourcesSince ? `First visits by source, counted since ${fmtDay(data.sourcesSince)}` : "First visits by source"}
        >
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 dark:text-gray-400">
                <tr>
                  <Th>Source</Th>
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
                  <tr key={x.id} className="border-t border-gray-100 dark:border-gray-800">
                    <td className="py-2 px-2 font-medium text-gray-900 dark:text-gray-50">
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
          </div>
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
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 dark:text-gray-400">
                <tr>
                  <Th>Signed up</Th>
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
                  <tr key={c.start} className="border-t border-gray-100 dark:border-gray-800">
                    <td className="py-2 px-2 whitespace-nowrap">{fmtDay(c.start)} to {fmtDay(c.end)}</td>
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
          </div>
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
      </div>
    </div>
  );
}
