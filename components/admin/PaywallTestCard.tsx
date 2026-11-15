"use client";

import { CARD, ROW, STICKY_COL, TableScroll } from "@/components/admin/AdminTabParts";
import type { OpportunitiesPayload } from "@/lib/server/opportunities";

// The English paywall test (lib/paywallTest.ts): John's chip-in paywall
// against the classic one, and new or repeated messages on return visits.
// Shown on the A/B tests tab from the Today tab's payload.

type PaywallTest = NonNullable<OpportunitiesPayload["paywallTest"]>;

const fmtInt = (n: number) => n.toLocaleString("en-US");
const fmtDollars = (cents: number) => `$${Math.round(cents / 100).toLocaleString("en-US")}`;
const fmtDay = (key: string) =>
  new Date(key + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

function Card({ title, subtitle, children }: { title: string; subtitle?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className={`text-gray-900 dark:text-gray-50 ${CARD} mb-3 sm:mb-4`}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">{title}</h2>
        {subtitle && <div className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>}
      </div>
      {children}
    </section>
  );
}

function Th({ children, right, title, sticky }: { children: React.ReactNode; right?: boolean; title?: string; sticky?: boolean }) {
  return (
    <th title={title} className={`font-medium pb-2 px-2 whitespace-nowrap ${right ? "text-right" : "text-left"} ${sticky ? STICKY_COL : ""}`}>
      {children}
    </th>
  );
}

export function PaywallTestCard({ t }: { t: PaywallTest }) {
  return (
    <Card
          title="Paywall test, English readers"
          subtitle={`50/50 by browser${t.since ? `, since ${fmtDay(t.since.slice(0, 10))}` : ""}`}
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
                {t.variants.map((v) => (
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
          {t.hits.length > 0 && (
            <TableScroll className="-mx-2 mt-4">
              <table className="w-full text-sm">
                <thead className="text-xs text-gray-500 dark:text-gray-400">
                  <tr className={ROW}>
                    <Th sticky title="Half of browsers get a new message when they come back, half see the first one again">Visit and message</Th>
                    <Th right>Views</Th>
                    <Th right>Purchases</Th>
                    <Th right>Per 100 views</Th>
                    <Th right>Revenue</Th>
                  </tr>
                </thead>
                <tbody>
                  {t.hits.map((h) => (
                    <tr key={h.id} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                      <td className={`py-2 px-2 font-medium text-gray-900 dark:text-gray-50 ${STICKY_COL}`}>{h.label}</td>
                      <td className="py-2 px-2 text-right tabular-nums">{fmtInt(h.views)}</td>
                      <td className="py-2 px-2 text-right tabular-nums">{fmtInt(h.purchases)}</td>
                      <td className="py-2 px-2 text-right tabular-nums">
                        {h.views > 0 ? ((h.purchases / h.views) * 100).toFixed(2) : <span className="text-gray-400">·</span>}
                      </td>
                      <td className="py-2 px-2 text-right tabular-nums">{h.revenueCents > 0 ? fmtDollars(h.revenueCents) : <span className="text-gray-400">·</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScroll>
          )}
          <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
            {t.pValue === null
              ? "No purchases from the test yet."
              : t.pValue < 0.05
                ? `The difference is unlikely to be chance (p = ${t.pValue.toFixed(3)}).`
                : `Too close to call so far (p = ${t.pValue.toFixed(2)}); keep it running.`}{" "}
            Each browser keeps its side. Spanish, Vietnamese, Korean and Chinese readers are not in the test. Preview a side with ?paywall=john or
            ?paywall=classic, and the message of a visit with ?paywallHit=2 or 3. Return visits: half of browsers get the new message, half the
            first one again (counted since Nov 13 2026; a reopen within 10 minutes is the same visit).{" "}
            {t.returnPValue === null
              ? "No purchases on return visits yet."
              : t.returnPValue < 0.05
                ? `New against first again: unlikely to be chance (p = ${t.returnPValue.toFixed(3)}).`
                : `New against first again: too close to call (p = ${t.returnPValue.toFixed(2)}).`}
          </p>
        </Card>
  );
}
