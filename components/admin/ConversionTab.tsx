"use client";

import { useMemo, useState } from "react";
import { CARD, ROW, STICKY_COL, TabError, TabHeader, TabLoading, TableScroll, fmtUpdated, useAdminFetch } from "@/components/admin/AdminTabParts";
import { PeriodBarsCard, signupBars, type SignupUnit } from "@/components/admin/PeriodBars";
import {
  DIMENSIONS, GRID_ANSWERS, GRID_VIEWS, MIN_CELL, bucketLabel, distribution, grid, insights, ladder, quantile, summarize,
  timeToBuy, unpack, type Dimension,
} from "@/lib/conversion";
import type { ConversionPayload } from "@/lib/server/conversion";

// The Conversion tab on /admin, from /api/admin/conversion: the paywall chart,
// then who pays and how far in they were when they did. Every card but the
// chart, the paywall table and the leads follows the two filters at the top;
// the maths is lib/conversion.ts.

const PAYWALL = "#eb6834";
const PAID = "#008300";

const fmtInt = (n: number) => n.toLocaleString("en-US");
const fmtPct = (n: number) => `${(n * 100).toFixed(n > 0 && n < 0.1 ? 1 : 0)}%`;
const fmtDay = (iso: string | null) =>
  iso ? new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";

type Period = "all" | "90" | "30";

function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: readonly (readonly [T, string])[] }) {
  return (
    <div className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
      {options.map(([id, label]) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`text-xs font-medium rounded-md px-3 py-1.5 whitespace-nowrap transition-colors ${
            value === id ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className={`${CARD} flex flex-col gap-1.5`}>
      <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl sm:text-[32px] leading-none font-semibold text-gray-900 dark:text-gray-50 tracking-tight">{value}</p>
      {sub && <p className="text-xs text-gray-500 dark:text-gray-400">{sub}</p>}
    </div>
  );
}

function BarCell({ share, color, label }: { share: number; color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="h-2 flex-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(share > 0 ? 2 : 0, share * 100))}%`, background: color }} />
      </div>
      <span className="w-12 text-right tabular-nums text-gray-900 dark:text-gray-50">{label}</span>
    </div>
  );
}

const H2 = "text-sm font-semibold text-gray-900 dark:text-gray-50";
const NOTE = "text-[11px] text-gray-500 dark:text-gray-400";
const TH = "text-right font-medium pb-2 pl-4 whitespace-nowrap";
const TD = "py-2 pl-4 text-right tabular-nums whitespace-nowrap";

export function ConversionTab() {
  const { data, error, loading, refreshing, updating, reload } = useAdminFetch<ConversionPayload>("/api/admin/conversion");
  if (loading) return <TabLoading />;
  if (error || !data) return <TabError message={error || "Failed to load"} />;
  return <ConversionView data={data} onRefresh={() => reload(true)} refreshing={refreshing} updating={updating} />;
}

export function ConversionView({ data, onRefresh, refreshing, updating }: {
  data: ConversionPayload; onRefresh: () => void; refreshing: boolean; updating: boolean;
}) {
  const [exam, setExam] = useState("all");
  const [period, setPeriod] = useState<Period>("all");
  const [dim, setDim] = useState<Dimension>("answers");
  const [unit, setUnit] = useState<SignupUnit>("day");

  const all = useMemo(() => data.rows.map(unpack), [data]);
  const today = Math.floor(Date.now() / 86_400_000);

  const examOptions = useMemo(() => {
    const counts = new Map<number, number>();
    for (const r of all) counts.set(r.exam, (counts.get(r.exam) || 0) + 1);
    return data.exams.map((id, i) => ({ id, i, name: data.examNames[id] ?? id, n: counts.get(i) || 0 })).filter((e) => e.n >= 20 && e.id !== "dmv");
  }, [data, all]);

  const rows = useMemo(() => {
    const dmv = data.exams.indexOf("dmv");
    const one = data.exams.indexOf(exam);
    const since = period === "all" ? -1 : today - Number(period);
    return all.filter((r) => {
      if (exam === "dmv" && r.exam !== dmv) return false;
      if (exam === "other" && r.exam === dmv) return false;
      if (exam !== "all" && exam !== "dmv" && exam !== "other" && r.exam !== one) return false;
      return since < 0 || r.signupDay >= since;
    });
  }, [data, all, exam, period, today]);

  const view = useMemo(() => {
    const buyers = rows.filter((r) => r.paid);
    return {
      summary: summarize(rows, today),
      notes: insights(rows, today),
      steps: ladder(rows, dim),
      where: distribution(buyers, dim),
      quartiles: [0.25, 0.5, 0.75].map((q) => quantile(buyers.map((b) => b[dim]), q)),
      cells: grid(rows),
      time: timeToBuy(buyers),
      buyers,
    };
  }, [rows, dim, today]);

  const weeks = useMemo(() => {
    const hits = signupBars(data.daily.paywallHits, "week");
    const bought = signupBars(data.daily.purchases, "week");
    return hits.map((h, i) => ({ label: h.label, views: h.value, purchases: bought[i]?.value ?? 0 }));
  }, [data]);

  const s = view.summary;
  const d = DIMENSIONS[dim];
  const maxRate = Math.max(...view.steps.map((x) => x.rate), 0.0001);
  const maxCell = Math.max(...view.cells.flat().filter((c) => c.reached >= MIN_CELL).map((c) => c.rate), 0.0001);
  const maxWeek = Math.max(...weeks.map((w) => (w.views ? w.purchases / w.views : 0)), 0.0001);
  const sliced = exam !== "all" || period !== "all";

  return (
    <>
      <TabHeader
        subtitle={<>{fmtInt(data.totalAccounts)} accounts, {fmtInt(all.length)} with activity · updated {fmtUpdated(data.generatedAt)}</>}
        onRefresh={onRefresh}
        refreshing={refreshing}
        updating={updating}
      />

      {/* Filters: every card down to the paywall table follows them. */}
      <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
        <select
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          aria-label="Test"
          className="text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 px-3 py-2 shadow-sm"
        >
          <option value="all">All tests</option>
          <option value="dmv">DMV</option>
          <option value="other">Every other test</option>
          {examOptions.map((e) => (
            <option key={e.id} value={e.id}>{e.name} ({fmtInt(e.n)})</option>
          ))}
        </select>
        <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 rounded-lg p-1 shadow-sm">
          <Segmented value={period} onChange={setPeriod} options={[["all", "All signups"], ["90", "Signed up in 90 days"], ["30", "30 days"]] as const} />
        </div>
      </div>

      {/* What the numbers say */}
      <div className={`${CARD} mb-3 sm:mb-4`}>
        <h2 className={H2}>What this says{sliced ? " (this slice)" : ""}</h2>
        <ul className="mt-3 space-y-2">
          {view.notes.map((n) => (
            <li key={n} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: PAYWALL }} aria-hidden />
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <Tile label="Saw a paywall" value={fmtInt(s.sawPaywall)} sub={`${fmtPct(s.accounts ? s.sawPaywall / s.accounts : 0)} of ${fmtInt(s.accounts)} active accounts`} />
        <Tile label="Paid" value={fmtInt(s.buyers)} sub={`${fmtPct(s.baseRate)} of active accounts · ${fmtPct(s.paywallRate)} of those who saw a paywall`} />
        <Tile
          label="Typical buyer when paying"
          value={s.medianAnswers === null ? "n/a" : `${fmtInt(s.medianAnswers)} Qs`}
          sub={s.medianDaysToBuy === null ? undefined : `${s.medianTests ?? 0} tests finished · ${s.medianDaysToBuy === 0 ? "same day as signup" : `${s.medianDaysToBuy} days after signup`}`}
        />
        <Tile label="Warm right now" value={fmtInt(s.warm)} sub={`of ${fmtInt(s.live)} unpaid accounts that saw a paywall and were active in 14 days`} />
      </div>

      {/* The paywall chart, moved here from Growth */}
      <PeriodBarsCard title="Paywall hits" noun="paywall hits" color={PAYWALL}
        note="Every time a paywall opened, guests included; internal accounts and bots are not counted. All tests, whatever the filters say."
        data={signupBars(data.daily.paywallHits, unit)} unit={unit} onUnit={setUnit} />

      <div className={`${CARD} mb-3 sm:mb-4`}>
        <h2 className={H2}>Purchases per 100 paywall hits, by week</h2>
        <TableScroll className="mt-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400">
                <th className="text-left font-medium pb-2">Week of</th>
                <th className={TH}>Paywall hits</th>
                <th className={TH}>Purchases</th>
                <th className={`${TH} text-left`}>Per 100 hits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {weeks.map((w, i) => {
                const rate = w.views ? w.purchases / w.views : 0;
                return (
                  <tr key={w.label} className={i === weeks.length - 1 ? "text-gray-400" : "text-gray-900 dark:text-gray-50"}>
                    <td className="py-2 whitespace-nowrap">{w.label}{i === weeks.length - 1 ? " (so far)" : ""}</td>
                    <td className={TD}>{fmtInt(w.views)}</td>
                    <td className={TD}>{fmtInt(w.purchases)}</td>
                    <td className="py-2 pl-4"><BarCell share={rate / maxWeek} color={PAID} label={w.views ? (rate * 100).toFixed(1) : ""} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableScroll>
      </div>

      {/* How close are they? */}
      <div className={`${CARD} mb-3 sm:mb-4`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className={H2}>How close is someone to paying?</h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Of the accounts that got this far without paying, how many went on to pay.</p>
          </div>
          <Segmented
            value={dim}
            onChange={setDim}
            options={[["answers", "Questions"], ["tests", "Tests"], ["activeDays", "Days active"], ["paywallViews", "Paywall views"]] as const}
          />
        </div>
        <TableScroll className="mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400">
                <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Got to, unpaid</th>
                <th className={TH}>Accounts</th>
                <th className={TH}>Went on to pay</th>
                <th className={`${TH} text-left`}>Share who paid</th>
                <th className={TH}>vs everyone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {view.steps.map((x) => {
                const thin = x.reached < MIN_CELL;
                return (
                  <tr key={x.min} className={`${ROW} ${thin ? "text-gray-400" : "text-gray-900 dark:text-gray-50"}`}>
                    <td className={`py-2 whitespace-nowrap ${STICKY_COL}`}>{x.min}+ {d.unit}</td>
                    <td className={TD}>{fmtInt(x.reached)}</td>
                    <td className={TD}>{fmtInt(x.paid)}</td>
                    <td className="py-2 pl-4"><BarCell share={x.rate / maxRate} color={thin ? "#c3c2b7" : PAID} label={fmtPct(x.rate)} /></td>
                    <td className={TD}>{s.baseRate > 0 && !thin ? `${(x.rate / s.baseRate).toFixed(1)}x` : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableScroll>

        <h3 className="mt-6 text-xs font-semibold text-gray-900 dark:text-gray-50">Where buyers were when they paid</h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {view.quartiles[1] === null
            ? "No buyers in this slice."
            : `Half of buyers had between ${view.quartiles[0]} and ${view.quartiles[2]} ${d.unit}; the middle one had ${view.quartiles[1]}.`}
        </p>
        <div className="mt-3 space-y-1.5">
          {view.where.map((b) => (
            <div key={b.from} className="flex items-center gap-3 text-sm">
              <span className="w-24 shrink-0 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{bucketLabel(b)}</span>
              <div className="flex-1"><BarCell share={b.share} color={PAYWALL} label={fmtPct(b.share)} /></div>
              <span className="w-10 text-right text-xs tabular-nums text-gray-500 dark:text-gray-400">{fmtInt(b.count)}</span>
            </div>
          ))}
        </div>
        <p className={`mt-4 ${NOTE}`}>
          A buyer is counted where they were at the moment they paid, everyone else where they are now. Questions are the ones in training sets
          (each counted once) plus practice test answers, on the DMV and the registry exams; SAT-style exams keep no per-account count here.
          Grey rows have under {MIN_CELL} accounts. Recent signups may still pay, so the newest slices read a little low.
        </p>
      </div>

      {/* Questions x paywall views */}
      <div className={`${CARD} mb-3 sm:mb-4`}>
        <h2 className={H2}>Practice and paywall views together</h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Share who paid among accounts with at least this many questions and this many paywall views. Darker is better.</p>
        <TableScroll className="mt-4">
          <table className="w-full text-sm border-separate border-spacing-1">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400">
                <th className="text-left font-medium pb-1">Questions</th>
                {GRID_VIEWS.map((v) => (
                  <th key={v} className="font-medium pb-1 whitespace-nowrap">{v === 0 ? "Any views" : `${v}+ views`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRID_ANSWERS.map((a, ai) => (
                <tr key={a}>
                  <td className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap pr-2">{a === 0 ? "Any" : `${a}+`}</td>
                  {GRID_VIEWS.map((v, vi) => {
                    const c = view.cells[ai][vi];
                    const thin = c.reached < MIN_CELL;
                    const strength = thin ? 0 : c.rate / maxCell;
                    return (
                      <td
                        key={v}
                        className="rounded-md px-2 py-2 text-center min-w-[72px]"
                        style={{ background: thin ? "rgba(137,135,129,0.10)" : `rgba(0,131,0,${0.08 + strength * 0.72})` }}
                        title={`${c.paid} of ${c.reached} paid`}
                      >
                        <div className={`font-semibold tabular-nums ${thin ? "text-gray-400" : strength > 0.55 ? "text-white" : "text-gray-900 dark:text-gray-50"}`}>
                          {thin ? "few" : fmtPct(c.rate)}
                        </div>
                        <div className={`text-[10px] tabular-nums ${thin ? "text-gray-400" : strength > 0.55 ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}>
                          {c.paid} of {fmtInt(c.reached)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
        <p className={`mt-3 ${NOTE}`}>
          The warm list at the bottom scores each unpaid account by the box it has reached. Paywall views are counted for signed-in accounts only.
        </p>
      </div>

      {/* What buyers do */}
      <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className={CARD}>
          <h2 className={H2}>How long buyers take</h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">From creating the account to paying.</p>
          <div className="mt-4 space-y-1.5">
            {view.time.map((t) => (
              <div key={t.label} className="flex items-center gap-3 text-sm">
                <span className="w-24 shrink-0 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{t.label}</span>
                <div className="flex-1"><BarCell share={t.share} color={PAID} label={fmtPct(t.share)} /></div>
                <span className="w-10 text-right text-xs tabular-nums text-gray-500 dark:text-gray-400">{fmtInt(t.count)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={CARD}>
          <h2 className={H2}>The buyer, in numbers</h2>
          <dl className="mt-4 divide-y divide-gray-100 dark:divide-gray-800 text-sm">
            {(
              [
                ["Questions answered before paying (typical)", s.medianAnswers === null ? "n/a" : fmtInt(s.medianAnswers)],
                ["Practice tests finished before paying", s.medianTests === null ? "n/a" : fmtInt(s.medianTests)],
                ["Days active before paying", s.medianActiveDays === null ? "n/a" : fmtInt(s.medianActiveDays)],
                ["Paywall views (typical)", s.medianViews === null ? "n/a" : fmtInt(s.medianViews)],
                ["Paid on their first paywall view", s.buyers ? fmtPct(s.firstViewBuyers / s.buyers) : "n/a"],
                ["Answered more questions after paying", s.buyers ? fmtPct(s.keptGoing / s.buyers) : "n/a"],
                ["Questions answered after paying (typical)", s.medianAnswersAfter === null ? "n/a" : fmtInt(s.medianAnswersAfter)],
                ["Came back on a later day after paying", s.buyers ? fmtPct(view.buyers.filter((b) => b.activeDaysAfter > 0).length / s.buyers) : "n/a"],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 py-2">
                <dt className="text-gray-600 dark:text-gray-300">{k}</dt>
                <dd className="font-semibold tabular-nums text-gray-900 dark:text-gray-50">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Every paywall */}
      <div className={`${CARD} mb-3 sm:mb-4`}>
        <h2 className={H2}>Every paywall</h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">All tests and all time, whatever the filters say. A guest has to make an account before they can pay.</p>
        <TableScroll className="mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400">
                <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Paywall</th>
                <th className={TH}>Hits, 30 days</th>
                <th className={TH}>Hits, all time</th>
                <th className={TH}>By guests</th>
                <th className={TH}>Accounts that saw it</th>
                <th className={TH}>Of those, paid</th>
                <th className={TH}>Sold here</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {data.paywalls.filter((p) => p.viewsAll > 0 || p.sold > 0).slice(0, 40).map((p) => (
                <tr key={p.feature} className={`${ROW} text-gray-900 dark:text-gray-50`}>
                  <td className={`py-2 pr-2 ${STICKY_COL}`}>{p.label}</td>
                  <td className={TD}>{fmtInt(p.views30d)}</td>
                  <td className={TD}>{fmtInt(p.viewsAll)}</td>
                  <td className={TD}>{p.viewsAll > 0 ? fmtPct(Math.min(1, Math.max(0, 1 - p.signedInViews / p.viewsAll))) : ""}</td>
                  <td className={TD}>{fmtInt(p.accountsSaw)}</td>
                  <td className={TD}>{p.accountsSaw > 0 ? `${fmtInt(p.accountsPaid)} (${fmtPct(p.accountsPaid / p.accountsSaw)})` : ""}</td>
                  <td className={TD}>{fmtInt(p.sold)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
        <p className={`mt-3 ${NOTE}`}>
          Sold here is the paywall the checkout started from; for older payments, the last paywall the buyer saw before paying.
        </p>
      </div>

      {/* Warm leads */}
      <div className={CARD}>
        <h2 className={H2}>Closest to paying right now</h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Unpaid accounts that saw a paywall and were active in the last 14 days, ranked by how often accounts like them went on to pay.
        </p>
        {data.leads.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Nobody yet.</p>
        ) : (
          <TableScroll className="mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 dark:text-gray-400">
                  <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Account</th>
                  <th className={TH}>Chance</th>
                  <th className={`${TH} text-left`}>Test</th>
                  <th className={TH}>Questions</th>
                  <th className={TH}>Tests</th>
                  <th className={TH}>Days active</th>
                  <th className={TH}>Paywall views</th>
                  <th className={`${TH} text-left`}>Last paywall</th>
                  <th className={TH}>Last active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {data.leads.map((l) => (
                  <tr key={l.email + l.lastPaywallAt} className={`${ROW} text-gray-900 dark:text-gray-50`}>
                    <td className={`py-2 pr-2 max-w-[180px] truncate ${STICKY_COL}`}>{l.email}</td>
                    <td className={`${TD} font-semibold`} style={{ color: PAID }}>{fmtPct(l.chance)}</td>
                    <td className="py-2 pl-4 whitespace-nowrap">{l.exam}</td>
                    <td className={TD}>{fmtInt(l.answers)}</td>
                    <td className={TD}>{fmtInt(l.tests)}</td>
                    <td className={TD}>{fmtInt(l.activeDays)}</td>
                    <td className={TD}>{fmtInt(l.paywallViews)}</td>
                    <td className="py-2 pl-4 whitespace-nowrap">{l.lastPaywall}{l.lastPaywallAt ? `, ${fmtDay(l.lastPaywallAt)}` : ""}</td>
                    <td className={TD}>{fmtDay(l.lastActive)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
        )}
      </div>
    </>
  );
}
