"use client";

import { CARD, ROW, STICKY_COL, TableScroll } from "@/components/admin/AdminTabParts";
import type { ConversionPayload } from "@/lib/server/conversion";

// The top prepper email against its holdout (lib/topPrepper.ts), on the A/B
// tests tab from the Conversion tab's payload.

const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");
const fmtPct = (n: number) => `${(n * 100).toFixed(n > 0 && n < 0.1 ? 1 : 0)}%`;
const H2 = "text-base font-semibold text-gray-900 dark:text-gray-50";
const SUB = "mt-1 text-sm text-gray-500 dark:text-gray-400";
const NOTE = "text-[11px] text-gray-500 dark:text-gray-400";
const TH = "text-right font-medium pb-2 pl-4 whitespace-nowrap";
const TD = "py-2 pl-4 text-right tabular-nums whitespace-nowrap";

export function TopPrepperTestCard({ t }: { t: ConversionPayload["topPrepper"] }) {
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
              <th className={`text-left font-medium pb-2 ${STICKY_COL} ${ROW}`}>Group</th>
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
}
