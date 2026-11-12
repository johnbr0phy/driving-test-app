"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GuestPromptTestCard } from "@/components/admin/GuestPromptTestCard";
import { CARD, ROW, STICKY_COL, TabError, TabHeader, TabLoading, TableScroll, fmtUpdated, useAdminFetch } from "@/components/admin/AdminTabParts";
import { PeriodBarsCard, signupBars, type SignupUnit } from "@/components/admin/PeriodBars";
import {
  DIMENSIONS, GRID_ANSWERS, GRID_VIEWS, MIN_CELL, byGroup, comparePeriods, grid, ladder, quantile, summarize, timeToBuy, unpack,
  type ConvRow, type Dimension,
} from "@/lib/conversion";
import type { ConversionPayload } from "@/lib/server/conversion";

// The Conversion tab on /admin, from /api/admin/conversion. Four questions,
// top to bottom: paywall traffic is up, so where is the money? Which markets
// pay? How close is someone to paying? Who is closest right now? The maths is
// lib/conversion.ts; the detail tables are folded away at the bottom.

const PAYWALL = "#eb6834";
const LOGGED_IN = "#2563eb";
const PAID = "#008300";
const MUTED = "#c3c2b7";

const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");
const fmtPct = (n: number) => `${(n * 100).toFixed(n > 0 && n < 0.1 ? 1 : 0)}%`;
const fmtUsd = (cents: number) => `$${Math.round(cents / 100).toLocaleString("en-US")}`;
const fmtTimes = (now: number, before: number) => (before > 0 ? `${(now / before).toFixed(now / before >= 10 ? 0 : 1)}x` : now > 0 ? "new" : "");
const fmtDay = (iso: string | null) =>
  iso ? new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";
const plural = (n: number, one: string, many = `${one}s`) => `${fmtInt(n)} ${n === 1 ? one : many}`;

const H2 = "text-base font-semibold text-gray-900 dark:text-gray-50";
const SUB = "mt-1 text-sm text-gray-500 dark:text-gray-400";
const NOTE = "text-[11px] text-gray-500 dark:text-gray-400";
const TH = "text-right font-medium pb-2 pl-4 whitespace-nowrap";
const TD = "py-2 pl-4 text-right tabular-nums whitespace-nowrap";
const SELECT = "text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 px-3 py-2 shadow-sm";

function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: readonly (readonly [T, string])[] }) {
  return (
    <div className="inline-flex gap-1 rounded-lg border border-gray-200/80 dark:border-gray-800/80 bg-gray-50 dark:bg-gray-950 p-1">
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

/** A number now, what it was before, and how it moved. */
function Compare({ label, now, before, change, good }: { label: string; now: string; before: string; change: string; good: boolean | null }) {
  return (
    <div className="rounded-xl border border-gray-200/80 dark:border-gray-800/80 p-4">
      <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1.5 text-2xl sm:text-[30px] leading-none font-semibold text-gray-900 dark:text-gray-50 tracking-tight">{now}</p>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        was {before}
        {change && (
          <span className="ml-1.5 font-semibold" style={{ color: good === null ? "#898781" : good ? PAID : "#d03b3b" }}>{change}</span>
        )}
      </p>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((n) => (
        <li key={n} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: PAYWALL }} aria-hidden />
          <span>{n}</span>
        </li>
      ))}
    </ul>
  );
}

export function ConversionTab() {
  const { data, error, loading, refreshing, updating, reload } = useAdminFetch<ConversionPayload>("/api/admin/conversion");
  // A copy cached before a deploy that changed the payload: rebuild it, once.
  const stale = !!data && (!data.markets || !data.sales);
  const rebuilt = useRef(false);
  useEffect(() => {
    if (!stale || rebuilt.current) return;
    rebuilt.current = true;
    void reload(true);
  }, [stale, reload]);
  if (loading) return <TabLoading />;
  if (error || !data) return <TabError message={error || "Failed to load"} />;
  if (stale) return <TabLoading />;
  return <ConversionView data={data} onRefresh={() => reload(true)} refreshing={refreshing} updating={updating} />;
}

type Days = "7" | "14" | "30";
type GroupBy = "market" | "exam";

export function ConversionView({ data, onRefresh, refreshing, updating }: {
  data: ConversionPayload; onRefresh: () => void; refreshing: boolean; updating: boolean;
}) {
  const [days, setDays] = useState<Days>("7");
  const [groupBy, setGroupBy] = useState<GroupBy>("market");
  const [exam, setExam] = useState("all");
  const [market, setMarket] = useState("all");
  const [dim, setDim] = useState<Dimension>("answers");
  const [unit, setUnit] = useState<SignupUnit>("day");

  const all = useMemo(() => data.rows.map(unpack), [data]);
  const today = Math.floor(Date.now() / 86_400_000);
  const examName = (id: string) => data.examNames[id] ?? id;

  // ── 1. More traffic: where is the money? ─────────────────────────────────
  const money = useMemo(() => {
    const n = Number(days);
    const c = comparePeriods(data.paywalls.map((p) => p.daily ?? {}), data.daily.paywallHits, data.sales, today, n);
    const rateBefore = c.hitsBefore ? c.salesBefore / c.hitsBefore : 0;
    const rateNow = c.hitsNow ? c.salesNow / c.hitsNow : 0;
    const avgCents = c.salesNow + c.salesBefore > 0 ? (c.centsNow + c.centsBefore) / (c.salesNow + c.salesBefore) : 999;
    // What the period would have sold had the new traffic bought like the old.
    const missingSales = Math.max(0, c.hitsNow * rateBefore - c.salesNow);
    const split = (dmv: boolean) => {
      const walls = c.walls.filter((w) => w.index >= 0 && (data.paywalls[w.index].exam === "dmv") === dmv);
      return {
        before: walls.reduce((s, w) => s + w.before, 0), now: walls.reduce((s, w) => s + w.now, 0),
        soldBefore: walls.reduce((s, w) => s + w.soldBefore, 0), soldNow: walls.reduce((s, w) => s + w.soldNow, 0),
      };
    };
    const recent = all.filter((r) => r.lastPaywallDay >= today - n);
    // Guests and countries are only counted since the tracking started.
    const tracked = Object.keys(data.daily.signedIn ?? {}).length > 0 || Object.keys(data.daily.byMarket ?? {}).length > 0;
    let trackedHits = 0;
    let trackedSignedIn = 0;
    const marketHits: { name: string; hits: number }[] = [];
    if (tracked) {
      const from = Math.max(today - n, Math.floor(Date.parse(`${data.trackedSince}T00:00:00Z`) / 86_400_000));
      const keys: string[] = [];
      for (let d = from; d <= today; d++) keys.push(new Date(d * 86_400_000).toISOString().slice(0, 10));
      for (const k of keys) {
        trackedHits += data.daily.paywallHits[k] ?? 0;
        trackedSignedIn += data.daily.signedIn?.[k] ?? 0;
      }
      for (const [code, byDay] of Object.entries(data.daily.byMarket ?? {})) {
        const hits = keys.reduce((s, k) => s + (byDay[k] ?? 0), 0);
        if (hits > 0) marketHits.push({ name: data.markets.find((m) => m.code === code)?.name ?? code, hits });
      }
      marketHits.sort((a, b) => b.hits - a.hits);
    }
    return {
      c, rateBefore, rateNow, avgCents, missingSales, dmv: split(true), other: split(false),
      people: recent.length, peoplePaid: recent.filter((r) => r.paid).length, trackedHits, trackedSignedIn, marketHits,
    };
  }, [data, all, days, today]);

  const verdict = useMemo(() => {
    const { c, dmv, other } = money;
    const out: string[] = [];
    const extra = c.hitsNow - c.hitsBefore;
    if (c.hitsBefore === 0 && c.hitsNow === 0) return ["No paywall hits in either period."];
    out.push(
      `Paywall hits went from ${fmtInt(c.hitsBefore)} to ${fmtInt(c.hitsNow)}${c.hitsBefore ? ` (${fmtTimes(c.hitsNow, c.hitsBefore)})` : ""}. Purchases went from ${fmtInt(c.salesBefore)} to ${fmtInt(c.salesNow)}${
        c.salesBefore ? ` (${fmtTimes(c.salesNow, c.salesBefore)})` : ""
      }.`,
    );
    if (extra > 0) {
      const top = c.walls.filter((w) => w.index >= 0 && w.now - w.before > 0).slice(0, 2);
      if (top.length > 0) {
        const share = top.reduce((s, w) => s + (w.now - w.before), 0) / extra;
        out.push(
          `${fmtPct(Math.min(1, share))} of the extra hits came from ${top.map((w) => data.paywalls[w.index].label).join(" and ")}, which sold ${plural(top.reduce((s, w) => s + w.soldNow, 0), "purchase")} in this period.`,
        );
      }
      out.push(
        `Split by test: DMV paywalls went from ${fmtInt(dmv.before)} to ${fmtInt(dmv.now)} hits and sold ${fmtInt(dmv.soldNow)} (was ${fmtInt(dmv.soldBefore)}). Every other test went from ${fmtInt(other.before)} to ${fmtInt(other.now)} hits and sold ${fmtInt(other.soldNow)} (was ${fmtInt(other.soldBefore)}).`,
      );
    }
    if (c.hitsNow > 0) {
      out.push(
        `Only ${plural(money.people, "signed-in account")} hit a paywall in this period, about ${(c.hitsNow / Math.max(1, money.people)).toFixed(1)} hits each if every hit were theirs. The rest are guests, who have to make an account before they can pay, and repeat views.`,
      );
    }
    if (money.trackedHits > 0) {
      out.push(
        `Since ${fmtDay(data.trackedSince)}, when guests started being counted: ${fmtPct(1 - money.trackedSignedIn / money.trackedHits)} of hits were from guests${
          money.marketHits.length > 0 ? `; by market, ${money.marketHits.slice(0, 4).map((m) => `${m.name} ${fmtPct(m.hits / money.trackedHits)}`).join(", ")}` : ""
        }.`,
      );
    } else {
      out.push(`Guest hits and hits by country are counted from ${fmtDay(data.trackedSince)}; that split fills in over the next days.`);
    }
    if (money.missingSales >= 1) {
      out.push(
        `Had the new traffic bought at the old rate (${(money.rateBefore * 100).toFixed(1)} per 100 hits), this period would have had about ${plural(money.missingSales, "more purchase")}, roughly ${fmtUsd(money.missingSales * money.avgCents)}.`,
      );
    }
    return out;
  }, [money, data]);

  // ── 2. Who pays, by market or test ───────────────────────────────────────
  const groups = useMemo(() => {
    const list = byGroup(all, groupBy, today);
    const cents = new Map<number, { cents: number; n: number }>();
    for (const [, wall, m, c] of data.sales) {
      const index = groupBy === "market" ? m : wall >= 0 ? data.exams.indexOf(data.paywalls[wall].exam) : -1;
      if (index < 0) continue;
      const e = cents.get(index) ?? { cents: 0, n: 0 };
      e.cents += c;
      e.n++;
      cents.set(index, e);
    }
    const total = { cents: 0, n: 0 };
    for (const e of cents.values()) {
      total.cents += e.cents;
      total.n += e.n;
    }
    const avgAll = total.n ? total.cents / total.n : 999;
    const asked = list.reduce((s, g) => s + g.sawPaywall, 0);
    const overall = asked ? list.reduce((s, g) => s + g.paid, 0) / asked : 0;
    const rows = list
      .filter((g) => g.sawPaywall > 0)
      .map((g) => {
        const e = cents.get(g.index);
        const name = groupBy === "market" ? data.markets[g.index]?.name ?? "" : examName(data.exams[g.index]);
        // Unpaid accounts that saw a paywall lately, at this group's pay rate
        // (the overall rate when the group is too small to trust).
        const rate = g.sawPaywall >= MIN_CELL ? g.rate : overall;
        return { ...g, name, price: groupBy === "market" ? data.markets[g.index]?.price ?? "" : "", revenue: e?.cents ?? 0, worth: g.open * rate * (e && e.n >= 3 ? e.cents / e.n : avgAll) };
      });
    return { rows, overall, maxRate: Math.max(...rows.filter((r) => r.sawPaywall >= MIN_CELL).map((r) => r.rate), 0.0001) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all, data, groupBy, today]);

  const marketTakeaway = useMemo(() => {
    const solid = groups.rows.filter((r) => r.sawPaywall >= MIN_CELL && r.name !== "Unknown");
    if (solid.length < 2) return "Not enough paywall traffic outside one group to compare yet.";
    const best = [...solid].sort((a, b) => b.rate - a.rate)[0];
    const worst = [...solid].sort((a, b) => a.rate - b.rate)[0];
    const biggest = [...groups.rows].sort((a, b) => b.worth - a.worth)[0];
    return `${best.name} pays best: ${fmtPct(best.rate)} of people asked. ${worst.name} pays least: ${fmtPct(worst.rate)}. The most money still on the table is in ${biggest.name}: ${plural(biggest.open, "unpaid account")} saw a paywall in the last 30 days, worth about ${fmtUsd(biggest.worth)} at its pay rate.`;
  }, [groups]);

  // ── 3. How close is someone to paying ────────────────────────────────────
  const examOptions = useMemo(() => {
    const counts = new Map<number, number>();
    for (const r of all) counts.set(r.exam, (counts.get(r.exam) || 0) + 1);
    return data.exams.map((id, i) => ({ id, name: examName(id), n: counts.get(i) || 0 })).filter((e) => e.n >= 20 && e.id !== "dmv");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, all]);

  const rows = useMemo(() => {
    const dmv = data.exams.indexOf("dmv");
    const one = data.exams.indexOf(exam);
    const m = data.markets.findIndex((x) => x.code === market);
    return all.filter((r: ConvRow) => {
      if (exam === "dmv" && r.exam !== dmv) return false;
      if (exam === "other" && r.exam === dmv) return false;
      if (exam !== "all" && exam !== "dmv" && exam !== "other" && r.exam !== one) return false;
      return market === "all" || r.market === m;
    });
  }, [data, all, exam, market]);

  const view = useMemo(() => {
    const buyers = rows.filter((r) => r.paid);
    return {
      summary: summarize(rows, today),
      steps: ladder(rows, dim),
      quartiles: [0.25, 0.5, 0.75].map((q) => quantile(buyers.map((b) => b[dim]), q)),
      cells: grid(rows),
      time: timeToBuy(buyers),
      buyers,
    };
  }, [rows, dim, today]);

  const s = view.summary;
  const d = DIMENSIONS[dim];
  const maxRate = Math.max(...view.steps.map((x) => x.rate), 0.0001);
  const maxCell = Math.max(...view.cells.flat().filter((c) => c.reached >= MIN_CELL).map((c) => c.rate), 0.0001);
  const best = view.steps.filter((x) => x.reached >= MIN_CELL && x.min > d.steps[0]).sort((a, b) => b.rate - a.rate)[0];
  const fast = view.time[0].share + view.time[1].share;
  const { c } = money;
  const peopleIdx = days === "7" ? 0 : days === "14" ? 1 : 2;

  return (
    <>
      <TabHeader
        subtitle={<>{fmtInt(data.totalAccounts)} accounts, {fmtInt(all.length)} with activity · updated {fmtUpdated(data.generatedAt)}</>}
        onRefresh={onRefresh}
        refreshing={refreshing}
        updating={updating}
      />

      {/* 1. More traffic: where is the money? */}
      <div className={`${CARD} mb-3 sm:mb-4`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className={H2}>More people are hitting paywalls. Where is the money?</h2>
            <p className={SUB}>The last {days} days against the {days} days before. Today is left out, since it is not over.</p>
          </div>
          <Segmented value={days} onChange={setDays} options={[["7", "7 days"], ["14", "14 days"], ["30", "30 days"]] as const} />
        </div>

        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Compare label="Paywall hits" now={fmtInt(c.hitsNow)} before={fmtInt(c.hitsBefore)} change={fmtTimes(c.hitsNow, c.hitsBefore)} good={null} />
          <Compare label="Purchases" now={fmtInt(c.salesNow)} before={fmtInt(c.salesBefore)} change={fmtTimes(c.salesNow, c.salesBefore)} good={c.salesNow >= c.salesBefore} />
          <Compare label="Revenue" now={fmtUsd(c.centsNow)} before={fmtUsd(c.centsBefore)} change={fmtTimes(c.centsNow, c.centsBefore)} good={c.centsNow >= c.centsBefore} />
          <Compare
            label="Purchases per 100 hits"
            now={(money.rateNow * 100).toFixed(1)}
            before={(money.rateBefore * 100).toFixed(1)}
            change={fmtTimes(money.rateNow, money.rateBefore)}
            good={money.rateNow >= money.rateBefore}
          />
        </div>

        <div className="mt-5">
          <Bullets items={verdict} />
        </div>

        <h3 className="mt-6 text-sm font-semibold text-gray-900 dark:text-gray-50">Which paywalls the hits came from</h3>
        <TableScroll className="mt-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400">
                <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Paywall</th>
                <th className={`${TH} text-left`}>Test</th>
                <th className={TH}>Hits before</th>
                <th className={TH}>Hits now</th>
                <th className={TH}>Change</th>
                <th className={TH}>Sold before</th>
                <th className={TH}>Sold now</th>
                <th className={TH}>Signed-in people</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {c.walls.slice(0, 15).map((w) => {
                const p = w.index >= 0 ? data.paywalls[w.index] : null;
                const diff = w.now - w.before;
                return (
                  <tr key={w.index} className={`${ROW} text-gray-900 dark:text-gray-50`}>
                    <td className={`py-2 pr-2 ${STICKY_COL}`}>{p ? p.label : "No paywall recorded"}</td>
                    <td className="py-2 pl-4 whitespace-nowrap text-gray-500 dark:text-gray-400">{p ? examName(p.exam) : ""}</td>
                    <td className={TD}>{fmtInt(w.before)}</td>
                    <td className={TD}>{fmtInt(w.now)}</td>
                    <td className={`${TD} font-semibold`} style={{ color: diff > 0 ? PAYWALL : "#898781" }}>{diff > 0 ? "+" : ""}{fmtInt(diff)}</td>
                    <td className={TD}>{fmtInt(w.soldBefore)}</td>
                    <td className={`${TD} font-semibold`} style={{ color: w.soldNow > 0 ? PAID : undefined }}>{fmtInt(w.soldNow)}</td>
                    <td className={TD}>{p?.people ? fmtInt(p.people[peopleIdx]) : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableScroll>
        <p className={`mt-3 ${NOTE}`}>
          A hit is every time a paywall opens, guests included. Signed-in people are the accounts whose latest view of that paywall fell in the period;
          a paywall with many hits and few people is mostly guests or the same people coming back.
        </p>
      </div>

      <PeriodBarsCard title="Paywall hits over time" noun="paywall hits" color={PAYWALL}
        note={`Every time a paywall opened; internal accounts and bots are not counted. Logged-in hits are exact from ${fmtDay(data.trackedSince)}. Before that they are an estimate: each account's hits are put on the day of its latest one, so an account that came back several times shows on one day, and one that has hit a paywall since is missing from the earlier bars.`}
        data={signupBars(data.daily.paywallHits, unit)} unit={unit} onUnit={setUnit}
        part={{ data: signupBars({ ...(data.daily.signedInEst ?? {}), ...(data.daily.signedIn ?? {}) }, unit), label: "Logged in", restLabel: "Guests", color: LOGGED_IN }} />

      {/* 2. Who pays, by market or test */}
      <div className={`${CARD} mb-3 sm:mb-4`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className={H2}>Who pays when asked?</h2>
            <p className={SUB}>Of the accounts that saw a paywall, the share that paid. All time.</p>
          </div>
          <Segmented value={groupBy} onChange={setGroupBy} options={[["market", "By market"], ["exam", "By test"]] as const} />
        </div>
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">{marketTakeaway}</p>
        <TableScroll className="mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400">
                <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>{groupBy === "market" ? "Market" : "Test"}</th>
                {groupBy === "market" && <th className={TH}>Price</th>}
                <th className={TH}>Asked to pay</th>
                <th className={TH}>Paid</th>
                <th className={`${TH} text-left`}>Pay rate</th>
                <th className={TH}>vs average</th>
                <th className={TH}>Revenue</th>
                <th className={TH}>Still deciding</th>
                <th className={TH}>Worth about</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {groups.rows.slice(0, 30).map((g) => {
                const thin = g.sawPaywall < MIN_CELL;
                return (
                  <tr key={g.index} className={`${ROW} ${thin ? "text-gray-400" : "text-gray-900 dark:text-gray-50"}`}>
                    <td className={`py-2 pr-2 whitespace-nowrap ${STICKY_COL}`}>{g.name}</td>
                    {groupBy === "market" && <td className={TD}>{g.price}</td>}
                    <td className={TD}>{fmtInt(g.sawPaywall)}</td>
                    <td className={TD}>{fmtInt(g.paid)}</td>
                    <td className="py-2 pl-4"><BarCell share={thin ? 0 : g.rate / groups.maxRate} color={PAID} label={fmtPct(g.rate)} /></td>
                    <td className={TD}>{!thin && groups.overall > 0 ? `${(g.rate / groups.overall).toFixed(1)}x` : ""}</td>
                    <td className={TD}>{g.revenue > 0 ? fmtUsd(g.revenue) : ""}</td>
                    <td className={TD}>{fmtInt(g.open)}</td>
                    <td className={TD}>{g.open > 0 ? fmtUsd(g.worth) : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableScroll>
        <p className={`mt-3 ${NOTE}`}>
          Average pay rate {fmtPct(groups.overall)}. Still deciding: unpaid accounts that saw a paywall in the last 30 days. Worth about: those accounts
          times the pay rate times the average sale there, an estimate. Grey rows have under {MIN_CELL} accounts asked, too few to trust.
          {groupBy === "market"
            ? " A market is where the person was when they last saw a paywall, signed up or paid; for older accounts with no country on file, the country of their test."
            : " Most tests only got locked steps on Nov 10, so their numbers are young."}
        </p>
      </div>

      {/* 3. How close is someone to paying */}
      <div className={`${CARD} mb-3 sm:mb-4`}>
        <h2 className={H2}>How close is someone to paying?</h2>
        <p className={SUB}>Of the accounts that got this far without paying, the share that went on to pay.</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Segmented
            value={dim}
            onChange={setDim}
            options={[["answers", "Questions"], ["tests", "Tests"], ["activeDays", "Days active"], ["paywallViews", "Paywall views"]] as const}
          />
          <select value={exam} onChange={(e) => setExam(e.target.value)} aria-label="Test" className={SELECT}>
            <option value="all">All tests</option>
            <option value="dmv">DMV</option>
            <option value="other">Every other test</option>
            {examOptions.map((e) => (
              <option key={e.id} value={e.id}>{e.name} ({fmtInt(e.n)})</option>
            ))}
          </select>
          <select value={market} onChange={(e) => setMarket(e.target.value)} aria-label="Market" className={SELECT}>
            <option value="all">All markets</option>
            {data.markets.map((m) => (
              <option key={m.code} value={m.code}>{m.name}</option>
            ))}
          </select>
        </div>
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          {s.buyers < 5
            ? "Too few purchases in this slice to say anything yet."
            : `${best && s.baseRate > 0 && best.rate / s.baseRate >= 1.3
                ? `Yes, doing more makes paying more likely: at ${best.min}+ ${d.unit}, ${fmtPct(best.rate)} go on to pay, ${(best.rate / s.baseRate).toFixed(1)}x the ${fmtPct(s.baseRate)} of everyone.`
                : `Doing more does not clearly lift the odds here: no milestone beats the ${fmtPct(s.baseRate)} of everyone by much.`
              } The typical buyer had ${view.quartiles[1]} ${d.unit} when they paid (half were between ${view.quartiles[0]} and ${view.quartiles[2]}).`}
        </p>
        <TableScroll className="mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400">
                <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Got this far, unpaid</th>
                <th className={TH}>Accounts</th>
                <th className={TH}>Then paid</th>
                <th className={`${TH} text-left`}>Chance of paying</th>
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
                    <td className="py-2 pl-4"><BarCell share={x.rate / maxRate} color={thin ? MUTED : PAID} label={fmtPct(x.rate)} /></td>
                    <td className={TD}>{s.baseRate > 0 && !thin ? `${(x.rate / s.baseRate).toFixed(1)}x` : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableScroll>
        <p className={`mt-3 ${NOTE}`}>
          A buyer is counted where they were at the moment they paid, everyone else where they are now. Questions are DMV and registry-exam
          questions only. Recent signups may still pay, so young tests and markets read a little low.
        </p>
      </div>

      {/* 4. How fast, and what buyers look like */}
      <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className={CARD}>
          <h2 className={H2}>How fast do buyers buy?</h2>
          <p className={SUB}>
            {s.buyers === 0
              ? "No buyers in this slice."
              : fast >= 0.5
                ? `Fast: ${fmtPct(fast)} pay on the day they sign up or the day after.`
                : `Slowly: only ${fmtPct(fast)} pay on the day they sign up or the day after, so reminders have room to work.`}
          </p>
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
          <h2 className={H2}>The typical buyer</h2>
          <p className={SUB}>What they had done when they paid, and after.</p>
          <dl className="mt-4 divide-y divide-gray-100 dark:divide-gray-800 text-sm">
            {(
              [
                ["Questions answered before paying", s.medianAnswers === null ? "n/a" : fmtInt(s.medianAnswers)],
                ["Practice tests finished before paying", s.medianTests === null ? "n/a" : fmtInt(s.medianTests)],
                ["Days active before paying", s.medianActiveDays === null ? "n/a" : fmtInt(s.medianActiveDays)],
                ["Paid the first time they saw a paywall", s.buyers ? fmtPct(s.firstViewBuyers / s.buyers) : "n/a"],
                ["Kept practicing after paying", s.buyers ? fmtPct(s.keptGoing / s.buyers) : "n/a"],
                ["Came back on a later day", s.buyers ? fmtPct(view.buyers.filter((b) => b.activeDaysAfter > 0).length / s.buyers) : "n/a"],
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

      {/* 5. Closest to paying */}
      <div className={`${CARD} mb-3 sm:mb-4`}>
        <h2 className={H2}>Who is closest to paying right now?</h2>
        <p className={SUB}>
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
                  <th className={`${TH} text-left`}>Market</th>
                  <th className={`${TH} text-left`}>Test</th>
                  <th className={TH}>Questions</th>
                  <th className={TH}>Tests</th>
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
                    <td className="py-2 pl-4 whitespace-nowrap">{l.market}</td>
                    <td className="py-2 pl-4 whitespace-nowrap">{l.exam}</td>
                    <td className={TD}>{fmtInt(l.answers)}</td>
                    <td className={TD}>{fmtInt(l.tests)}</td>
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

      {/* The top prepper email against its holdout */}
      {data.topPrepper && (data.topPrepper.sent > 0 || data.topPrepper.holdout > 0) && (() => {
        const t = data.topPrepper;
        const rate = (paid: number, n: number) => (n > 0 ? fmtPct(paid / n) : "n/a");
        return (
          <div className={`${CARD} mb-3 sm:mb-4`}>
            <h2 className={H2}>Does the top prepper email work?</h2>
            <p className={SUB}>
              Unpaid people who out-practiced most of Tigertest get one email with their numbers. One in ten gets nothing instead, so the two groups can be compared.
              A purchase counts when it comes within 7 days.
            </p>
            <TableScroll className="mt-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 dark:text-gray-400">
                    <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Group</th>
                    <th className={TH}>People</th>
                    <th className={TH}>Bought in 7 days</th>
                    <th className={TH}>Rate</th>
                    <th className={TH}>Still in their 7 days</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr className={`${ROW} text-gray-900 dark:text-gray-50`}>
                    <td className={`py-2 pr-2 ${STICKY_COL}`}>Got the email</td>
                    <td className={TD}>{fmtInt(t.sent)}</td>
                    <td className={TD}>{fmtInt(t.sentPaid)}</td>
                    <td className={`${TD} font-semibold`}>{rate(t.sentPaid, t.sent)}</td>
                    <td className={TD}>{fmtInt(t.sentOpen)}</td>
                  </tr>
                  <tr className={`${ROW} text-gray-900 dark:text-gray-50`}>
                    <td className={`py-2 pr-2 ${STICKY_COL}`}>Held out, no email</td>
                    <td className={TD}>{fmtInt(t.holdout)}</td>
                    <td className={TD}>{fmtInt(t.holdoutPaid)}</td>
                    <td className={`${TD} font-semibold`}>{rate(t.holdoutPaid, t.holdout)}</td>
                    <td className={TD}>{fmtInt(t.holdoutOpen)}</td>
                  </tr>
                </tbody>
              </table>
            </TableScroll>
            <p className={`mt-3 ${NOTE}`}>
              {t.sent < 100 ? "Too few people yet to trust the difference: wait for about 100 emails before reading it." : "With a holdout this small, a gap of a point or two can still be chance."}
            </p>
          </div>
        );
      })()}

      {/* The sign-up step's ten-design message test */}
      <GuestPromptTestCard />

      {/* The detail, for when a number above needs checking */}
      <details className={CARD}>
        <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-gray-50">More detail</summary>

        <h3 className="mt-5 text-sm font-semibold text-gray-900 dark:text-gray-50">Practice and paywall views together</h3>
        <p className={SUB}>Share who paid among accounts with at least this many questions and this many paywall views. It follows the test and market picked above.</p>
        <TableScroll className="mt-3">
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
                    const cell = view.cells[ai][vi];
                    const thin = cell.reached < MIN_CELL;
                    const strength = thin ? 0 : cell.rate / maxCell;
                    return (
                      <td key={v} className="rounded-md px-2 py-2 text-center min-w-[72px]" style={{ background: thin ? "rgba(137,135,129,0.10)" : `rgba(0,131,0,${0.08 + strength * 0.72})` }}>
                        <div className={`font-semibold tabular-nums ${thin ? "text-gray-400" : strength > 0.55 ? "text-white" : "text-gray-900 dark:text-gray-50"}`}>
                          {thin ? "few" : fmtPct(cell.rate)}
                        </div>
                        <div className={`text-[10px] tabular-nums ${thin ? "text-gray-400" : strength > 0.55 ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}>
                          {cell.paid} of {fmtInt(cell.reached)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>

        <h3 className="mt-6 text-sm font-semibold text-gray-900 dark:text-gray-50">Every paywall, all time</h3>
        <TableScroll className="mt-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400">
                <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Paywall</th>
                <th className={TH}>Hits, 30 days</th>
                <th className={TH}>Hits, all time</th>
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
                  <td className={TD}>{fmtInt(p.accountsSaw)}</td>
                  <td className={TD}>{p.accountsSaw > 0 ? `${fmtInt(p.accountsPaid)} (${fmtPct(p.accountsPaid / p.accountsSaw)})` : ""}</td>
                  <td className={TD}>{fmtInt(p.sold)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
        <p className={`mt-3 ${NOTE}`}>Sold here is the paywall the checkout started from; for older payments, the last paywall the buyer saw before paying.</p>
      </details>
    </>
  );
}
