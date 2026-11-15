"use client";

import { useEffect, useRef, useState } from "react";
import {
  CARD, ROW, STICKY_COL, ShowAllButton, TabError, TabHeader, TabLoading, TableScroll, fmtUpdated, useAdminFetch, useTopN,
} from "@/components/admin/AdminTabParts";
import { PeriodBarsCard, signupBars, type SignupUnit } from "@/components/admin/PeriodBars";
import type { ConversionPayload } from "@/lib/server/conversion";

// The Conversion tab on /admin, from /api/admin/conversion
// (lib/server/conversion.ts): the headline rates, pay rate by country, the
// latest payers and where they came from, paywall hits over time, and the
// unpaid accounts closest to paying with the email each will get next.

const PAYWALL = "#eb6834";
const LOGGED_IN = "#2563eb";
const PAID = "#008300";
const DOWN = "#d03b3b";

const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");
const fmtPct = (n: number) => `${(n * 100).toFixed(n > 0 && n < 0.1 ? 1 : 0)}%`;
const fmtUsd = (cents: number) => `$${Math.round(cents / 100).toLocaleString("en-US")}`;
const fmtDay = (iso: string | null) =>
  iso ? new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";
const fmtWhen = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "";

const H2 = "text-base font-semibold text-gray-900 dark:text-gray-50";
const SUB = "mt-1 text-sm text-gray-500 dark:text-gray-400";
const NOTE = "text-[11px] text-gray-500 dark:text-gray-400";
const TH = "text-right font-medium pb-2 pl-4 whitespace-nowrap";
const THL = "text-left font-medium pb-2 pl-4 whitespace-nowrap";
const TD = "py-2 pl-4 text-right tabular-nums whitespace-nowrap";
const TDL = "py-2 pl-4 whitespace-nowrap";
/** A left column whose text wraps: the width is fixed on the cell so the table cannot squeeze it into the next column. */
const TDW = "py-2 pl-4 whitespace-normal break-words";
const DOT = <span className="text-gray-400">·</span>;

const SOURCE_NAMES: Record<string, string> = {
  chatgpt: "ChatGPT", perplexity: "Perplexity", gemini: "Gemini", copilot: "Copilot", claude: "Claude", ai_other: "Other AI",
  search: "Search", friend: "Friend's link", direct: "Direct", other: "Other site",
};
const STATUS_NOTE: Record<string, string> = { refunded: "refunded", partially_refunded: "part refunded" };

function Change({ now, before }: { now: number; before: number }) {
  if (before <= 0) return <span className="text-gray-500 dark:text-gray-400">{now > 0 ? "none before" : ""}</span>;
  const change = now / before - 1;
  return (
    <span className="font-semibold tabular-nums" style={{ color: change >= 0 ? PAID : DOWN }}>
      {change >= 0 ? "▲" : "▼"} {Math.abs(Math.round(change * 100))}%
    </span>
  );
}

function Tile({ label, value, sub }: { label: string; value: string; sub: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-gray-900 p-4 shadow-sm">
      <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1.5 text-2xl leading-none font-semibold text-gray-900 dark:text-gray-50 tracking-tight tabular-nums">{value}</p>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{sub}</p>
    </div>
  );
}

export function ConversionTab() {
  const { data, error, loading, refreshing, updating, reload } = useAdminFetch<ConversionPayload>("/api/admin/conversion");
  // A copy cached before a deploy that changed the payload: rebuild it, once.
  const stale = !!data && (!data.overview || !data.recentPayers);
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

export function ConversionView({ data, onRefresh, refreshing, updating }: {
  data: ConversionPayload; onRefresh: () => void; refreshing: boolean; updating: boolean;
}) {
  const [unit, setUnit] = useState<SignupUnit>("day");
  const countries = useTopN(data.countries);
  const leads = useTopN(data.leads);
  const o = data.overview;
  const next = data.nextEmails;

  return (
    <>
      <TabHeader
        subtitle={<>{fmtInt(data.totalAccounts)} accounts, {fmtInt(data.activeAccounts)} with activity · updated {fmtUpdated(data.generatedAt)}</>}
        onRefresh={onRefresh}
        refreshing={refreshing}
        updating={updating}
      />

      {/* Headline numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <Tile label="Revenue, 30 days" value={fmtUsd(o.revenue30dCents)} sub={<>was {fmtUsd(o.revenuePrev30dCents)} <Change now={o.revenue30dCents} before={o.revenuePrev30dCents} /></>} />
        <Tile label="Purchases, 7 days" value={fmtInt(o.purchases7d)} sub={<>was {fmtInt(o.purchasesPrev7d)} <Change now={o.purchases7d} before={o.purchasesPrev7d} /></>} />
        <Tile
          label="Pay when asked"
          value={o.asked > 0 ? fmtPct(o.buyers / o.asked) : "n/a"}
          sub={`${fmtInt(o.buyers)} of ${fmtInt(o.asked)} accounts that saw a paywall, all time`}
        />
        <Tile
          label="Purchases per 100 paywall hits"
          value={o.hits30d > 0 ? ((o.purchases30d / o.hits30d) * 100).toFixed(2) : "n/a"}
          sub={<>30 days; was {o.hitsPrev30d > 0 ? ((o.purchasesPrev30d / o.hitsPrev30d) * 100).toFixed(2) : "n/a"}</>}
        />
        <Tile
          label="Purchases per 1,000 visitors"
          value={o.visits30d ? ((o.purchases30d / o.visits30d) * 1000).toFixed(1) : "n/a"}
          sub={o.visits30d ? `${fmtInt(o.purchases30d)} purchases, ${fmtInt(o.visits30d)} first visits in 30 days` : "Visitor counts not tracked yet"}
        />
        <Tile label="Paywall hits, 30 days" value={fmtInt(o.hits30d)} sub={<>was {fmtInt(o.hitsPrev30d)} <Change now={o.hits30d} before={o.hitsPrev30d} /></>} />
      </div>

      {/* By country */}
      <div className={`${CARD} mb-3 sm:mb-4`}>
        <h2 className={H2}>Conversion by country</h2>
        <p className={SUB}>Most revenue first. Pay rate is buyers per account that saw a paywall.</p>
        <TableScroll className="mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400">
                <th className={`text-left font-medium pb-2 ${STICKY_COL} ${ROW}`}>Country</th>
                <th className={TH} title="First visits from the country, by IP, 30 days">Visitors, 30d</th>
                <th className={TH}>Accounts</th>
                <th className={TH} title="Saw a paywall, or paid">Asked to pay</th>
                <th className={TH}>Paid</th>
                <th className={TH}>Pay rate</th>
                <th className={TH} title="Purchases in 30 days per 1,000 first visits in 30 days">Per 1k visitors</th>
                <th className={TH}>Purchases, 30d</th>
                <th className={TH}>Revenue, 30d</th>
                <th className={TH}>Revenue, all</th>
                <th className={TH} title="Unpaid accounts that saw a paywall in the last 30 days">Open now</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {countries.shown.map((c) => (
                <tr key={c.code} className={`${ROW} text-gray-900 dark:text-gray-50`}>
                  <td className={`py-2 pr-2 ${STICKY_COL}`}>
                    <span className="font-medium whitespace-nowrap">{c.name}</span>
                    {c.price && <span className="ml-1.5 text-[11px] text-gray-500 dark:text-gray-400">{c.price}</span>}
                  </td>
                  <td className={TD}>{c.visitors30d === null ? DOT : fmtInt(c.visitors30d)}</td>
                  <td className={TD}>{fmtInt(c.accounts)}</td>
                  <td className={TD}>{fmtInt(c.asked)}</td>
                  <td className={TD}>{fmtInt(c.buyers)}</td>
                  <td className={`${TD} font-semibold`}>{c.asked > 0 ? fmtPct(c.buyers / c.asked) : DOT}</td>
                  <td className={TD}>{c.visitors30d ? ((c.purchases30d / c.visitors30d) * 1000).toFixed(1) : DOT}</td>
                  <td className={TD}>{c.purchases30d > 0 ? fmtInt(c.purchases30d) : DOT}</td>
                  <td className={TD}>{c.revenue30dCents > 0 ? fmtUsd(c.revenue30dCents) : DOT}</td>
                  <td className={TD}>{c.revenueAllCents > 0 ? fmtUsd(c.revenueAllCents) : DOT}</td>
                  <td className={TD}>{c.open > 0 ? fmtInt(c.open) : DOT}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
        <ShowAllButton hidden={countries.hidden} all={countries.all} onToggle={countries.toggle} noun="more countries" />
        <p className={`mt-3 ${NOTE}`}>
          An account&apos;s country is where it last saw a paywall, signed up or paid, else the country it picked, else its test&apos;s. Revenue is in US
          dollars, net of refunds. Visitors are counted by IP from Oct 31, 2026.
        </p>
      </div>

      {/* Latest payers */}
      <div className={`${CARD} mb-3 sm:mb-4`}>
        <h2 className={H2}>The last {data.recentPayers.length} payers</h2>
        <p className={SUB}>Newest first: what they paid, where they first came from, and what they had done before paying.</p>
        {data.recentPayers.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No purchases yet.</p>
        ) : (
          <TableScroll className="mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 dark:text-gray-400">
                  <th className={`text-left font-medium pb-2 ${STICKY_COL} ${ROW}`}>Buyer</th>
                  <th className={THL}>When</th>
                  <th className={TH}>Paid</th>
                  <th className={THL}>Country</th>
                  <th className={THL}>Test</th>
                  <th className={THL}>Paywall</th>
                  <th className={THL} title="The first visit's source and landing page">Came from</th>
                  <th className={TH} title="Days from signup to purchase">Days to buy</th>
                  <th className={TH} title="Questions answered before paying">Questions</th>
                  <th className={TH} title="Practice tests finished before paying">Tests</th>
                  <th className={TH} title="Different paywalls seen">Paywalls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {data.recentPayers.map((p) => (
                  <tr key={`${p.at}${p.email}`} className={`${ROW} text-gray-900 dark:text-gray-50 align-top`}>
                    <td className={`py-2 pr-2 max-w-[200px] truncate ${STICKY_COL}`} title={p.email}>{p.email}</td>
                    <td className={TDL}>{fmtWhen(p.at)}</td>
                    <td className={TD}>
                      {p.paid}
                      {p.paid && !p.paid.startsWith("$") && <span className="block text-[11px] text-gray-500 dark:text-gray-400">{fmtUsd(p.usdCents)}</span>}
                      {STATUS_NOTE[p.status] && <span className="block text-[11px]" style={{ color: DOWN }}>{STATUS_NOTE[p.status]}</span>}
                    </td>
                    <td className={TDL}>{p.market}{p.country && (p.market === "Other countries" || p.market === "Unknown") ? ` (${p.country})` : ""}</td>
                    <td className={TDL}>{p.exam || DOT}</td>
                    <td className={TDL}>
                      {p.paywall || DOT}
                      {(p.variant || p.paywallHit) && (
                        <span className="block text-[11px] text-gray-500 dark:text-gray-400">
                          {[p.variant && `${p.variant} paywall`, p.paywallHit && `visit ${p.paywallHit}`].filter(Boolean).join(", ")}
                        </span>
                      )}
                    </td>
                    <td className={`${TDL} max-w-[220px]`}>
                      {p.source ? SOURCE_NAMES[p.source] ?? p.source : DOT}
                      {p.landing && <span className="block text-[11px] font-mono text-gray-500 dark:text-gray-400 truncate" title={p.landing}>{p.landing}</span>}
                    </td>
                    <td className={TD}>{p.daysToBuy === null ? DOT : p.daysToBuy === 0 ? "same day" : fmtInt(p.daysToBuy)}</td>
                    <td className={TD}>{p.answersBefore === null ? DOT : fmtInt(p.answersBefore)}</td>
                    <td className={TD}>{p.testsBefore === null ? DOT : fmtInt(p.testsBefore)}</td>
                    <td className={TD}>{p.paywallsSeen === null ? DOT : fmtInt(p.paywallsSeen)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
        )}
        <p className={`mt-3 ${NOTE}`}>
          Came from is the buyer&apos;s first visit, sent with the checkout, else the one saved at signup. Paywall is where the checkout started; the
          variant is the English paywall test side and the visit is which time they hit a paywall.
        </p>
      </div>

      <PeriodBarsCard title="Paywall hits over time" noun="paywall hits" color={PAYWALL}
        note={`Every time a paywall opened; internal accounts and bots are not counted. Logged-in hits are exact from ${fmtDay(data.trackedSince)}. Before that they are an estimate: each account's hits are put on the day of its latest one, so an account that came back several times shows on one day, and one that has hit a paywall since is missing from the earlier bars.`}
        data={signupBars(data.daily.paywallHits, unit)} unit={unit} onUnit={setUnit}
        part={{ data: signupBars({ ...(data.daily.signedInEst ?? {}), ...(data.daily.signedIn ?? {}) }, unit), label: "Logged in", restLabel: "Guests", color: LOGGED_IN }} />

      {/* Closest to paying */}
      <div className={`${CARD} mb-3 sm:mb-4`}>
        <h2 className={H2}>Who is closest to paying right now?</h2>
        <p className={SUB}>
          Unpaid accounts that saw a paywall and were active in the last 14 days, ranked by how often accounts like them went on to pay, with the
          email each one gets next.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-gray-700 dark:text-gray-200">
            Top prepper email next: <span className="font-semibold">{fmtInt(next.topPrepper)}</span>
            {!next.topPrepperLive && " (campaign paused)"}
            {next.topPrepperHoldout > 0 && `, ${fmtInt(next.topPrepperHoldout)} held out`}
          </span>
          <span className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-gray-700 dark:text-gray-200">
            Paywall follow-up next: <span className="font-semibold">{fmtInt(next.paywallFollowUp)}</span>
          </span>
        </div>
        {data.leads.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Nobody yet.</p>
        ) : (
          <TableScroll className="mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 dark:text-gray-400">
                  <th className={`text-left font-medium pb-2 ${STICKY_COL} ${ROW}`}>Account</th>
                  <th className={TH}>Chance</th>
                  <th className={THL}>Next email</th>
                  <th className={THL}>Emails had</th>
                  <th className={THL}>Country</th>
                  <th className={THL}>Test</th>
                  <th className={TH}>Questions</th>
                  <th className={TH}>Tests</th>
                  <th className={TH}>Paywalls</th>
                  <th className={THL}>Last paywall</th>
                  <th className={TH}>Last active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {leads.shown.map((l) => (
                  <tr key={l.email + l.lastPaywallAt} className={`${ROW} text-gray-900 dark:text-gray-50 align-top`}>
                    <td className={`py-2 pr-2 max-w-[180px] truncate ${STICKY_COL}`} title={l.email}>{l.email}</td>
                    <td className={`${TD} font-semibold`} style={{ color: PAID }}>{fmtPct(l.chance)}</td>
                    <td className={`${TDW} min-w-[200px] max-w-[240px]`}>
                      <span className={l.emailStatus === "ok" ? "" : "text-gray-500 dark:text-gray-400"}>{l.nextEmail}</span>
                    </td>
                    <td className={`${TDW} min-w-[180px] max-w-[240px] text-gray-600 dark:text-gray-300`}>
                      {l.emailsHad.length > 0 ? l.emailsHad.join(", ") : DOT}
                      {l.lastEmailAt && <span className="block text-[11px] text-gray-500 dark:text-gray-400">last {fmtDay(l.lastEmailAt)}</span>}
                    </td>
                    <td className={TDL}>{l.market}</td>
                    <td className={TDL}>{l.exam}</td>
                    <td className={TD}>{fmtInt(l.answers)}</td>
                    <td className={TD}>{fmtInt(l.tests)}</td>
                    <td className={TD}>{fmtInt(l.paywallViews)}</td>
                    <td className={`${TDW} min-w-[160px] max-w-[220px]`}>{l.lastPaywall}{l.lastPaywallAt ? `, ${fmtDay(l.lastPaywallAt)}` : ""}</td>
                    <td className={TD}>{fmtDay(l.lastActive)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
        )}
        <ShowAllButton hidden={leads.hidden} all={leads.all} onToggle={leads.toggle} noun="more accounts" />
        <p className={`mt-3 ${NOTE}`}>
          Next email is a best guess from the same rules the email jobs use (paywall follow-up within 36 hours of a paywall with 10+ questions; top
          prepper from 36 hours to 14 days after, for the busiest English readers). The jobs also skip class students and tests they have no email for.
        </p>
      </div>

    </>
  );
}
