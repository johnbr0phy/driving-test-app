"use client";

import { useMemo, useRef, useState } from "react";
import { CARD, ROW, STICKY_COL, TableScroll, useAdminFetch } from "@/components/admin/AdminTabParts";
import { GUEST_PROMPT_DESIGNS } from "@/components/guestPrompt/designs";
import {
  GUEST_PROMPT_TEST_ID,
  GUEST_PROMPT_VARIANTS,
  GUEST_PROMPT_VARIANT_NAMES,
  twoProportionP,
  type GuestPromptCounts,
  type GuestPromptVariant,
} from "@/lib/guestPromptTest";

// Which design of the in-training sign-up step gets the most accounts made
// (lib/guestPromptTest.ts). The measure is sign-ups per showing; taps are the
// early signal while sign-ups are still few. "First showing only" is the clean
// split between browsers; "every showing" has more data but the same people
// see several designs.

type Payload = {
  test: string | null;
  since: string | null;
  variants: Partial<Record<GuestPromptVariant, GuestPromptCounts & { first?: GuestPromptCounts }>>;
};

const H2 = "text-base font-semibold text-gray-900 dark:text-gray-50";
const SUB = "mt-1 text-sm text-gray-600 dark:text-gray-300";
const TH = "text-right font-medium pb-2 px-2 whitespace-nowrap";
const TD = "py-2 px-2 text-right tabular-nums whitespace-nowrap";
const fmtPct = (x: number, n: number) => (n > 0 ? `${((x / n) * 100).toFixed(1)}%` : "n/a");

export function GuestPromptTestCard() {
  const { data, error, loading } = useAdminFetch<Payload>("/api/admin/guest-prompt-test");
  const [scope, setScope] = useState<"first" | "all">("all");

  const rows = useMemo(() => {
    if (!data || data.test !== GUEST_PROMPT_TEST_ID) return [];
    const pick = (v: GuestPromptVariant) => {
      const raw = data.variants[v] ?? {};
      const c = scope === "first" ? raw.first ?? {} : raw;
      return { shown: c.shown ?? 0, taps: (c.google ?? 0) + (c.email ?? 0), signup: c.signup ?? 0, skipped: c.skipped ?? 0 };
    };
    const control = pick("v01");
    return GUEST_PROMPT_VARIANTS.map((v) => {
      const r = pick(v);
      return { v, ...r, p: v === "v01" ? null : twoProportionP(r.signup, r.shown, control.signup, control.shown) };
    }).sort((a, b) => (b.shown ? b.signup / b.shown : -1) - (a.shown ? a.signup / a.shown : -1));
  }, [data, scope]);

  if (loading) return <div className={`${CARD} mb-3 sm:mb-4 text-sm text-gray-500`}>Loading the sign-up step test...</div>;
  if (error || !data) return null;
  const shown = rows.reduce((n, r) => n + r.shown, 0);

  return (
    <div className={`${CARD} mb-3 sm:mb-4`}>
      <h2 className={H2}>Which sign-up message works best?</h2>
      <p className={SUB}>
        After two right answers in a row, signed-out English readers get a sign-up step in place of the next question, a different one of ten designs each time,
        in an order shuffled per browser. A sign-up counts for a design when the account is made within an hour of tapping its button.
        {data.since && ` Counting since ${data.since.slice(0, 10)}.`}
      </p>
      <div className="mt-3 inline-flex rounded-lg border border-gray-200 dark:border-gray-800 p-0.5 text-xs">
        {(["all", "first"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScope(s)}
            className={`px-3 py-1 rounded-md font-medium ${scope === s ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "text-gray-600 dark:text-gray-300"}`}
          >
            {s === "all" ? "Every showing" : "First showing only"}
          </button>
        ))}
      </div>
      {shown === 0 ? (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">No showings yet.</p>
      ) : (
        <TableScroll className="mt-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400">
                <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Design</th>
                <th className={TH}>Shown</th>
                <th className={TH}>Tapped sign-up</th>
                <th className={TH}>Signed up</th>
                <th className={TH}>Sign-ups per 100</th>
                <th className={TH}>Skipped</th>
                <th className={TH}>vs control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {rows.map((r) => (
                <tr key={r.v} className={`${ROW} text-gray-900 dark:text-gray-50`}>
                  <td className={`py-2 pr-2 ${STICKY_COL} max-w-[14rem]`}>
                    <span className="font-mono text-xs text-gray-500 dark:text-gray-400 mr-1">{r.v}</span>
                    {GUEST_PROMPT_VARIANT_NAMES[r.v]}
                  </td>
                  <td className={TD}>{r.shown}</td>
                  <td className={TD}>{r.taps} <span className="text-gray-500 dark:text-gray-400">({fmtPct(r.taps, r.shown)})</span></td>
                  <td className={TD}>{r.signup}</td>
                  <td className={`${TD} font-semibold`}>{fmtPct(r.signup, r.shown)}</td>
                  <td className={TD}>{fmtPct(r.skipped, r.shown)}</td>
                  <td className={TD}>{r.p === null ? "control" : r.p < 0.05 ? <span className="font-semibold text-green-700 dark:text-green-300">p {r.p.toFixed(3)}</span> : `p ${r.p.toFixed(2)}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      )}
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Ten designs split the traffic, so give it at least a few hundred showings each before calling a winner, and with ten comparisons expect one
        to look &quot;significant&quot; by chance about two times in five: a winner should beat the control at p under 0.005, or hold its lead for another two weeks.
      </p>
      <DesignPreviews />
    </div>
  );
}

/** Every design, inert, so the table's names have a picture. */
function DesignPreviews() {
  const heading = useRef<HTMLHeadingElement>(null);
  const noop = () => {};
  return (
    <details className="mt-3">
      <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-gray-50">See the ten designs</summary>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {GUEST_PROMPT_VARIANTS.map((v) => {
          const Design = GUEST_PROMPT_DESIGNS[v];
          return (
            <div key={v} className="pointer-events-none">
              <p className="mb-1 text-xs font-mono text-gray-500 dark:text-gray-400">{v}</p>
              <Design n={14} headingRef={heading} isNative={false} busy={false} onGoogle={noop} signupHref="/signup" onEmail={noop} onLater={noop} />
            </div>
          );
        })}
      </div>
    </details>
  );
}
