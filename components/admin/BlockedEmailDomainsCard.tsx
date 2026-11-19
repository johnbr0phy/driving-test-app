"use client";

import { useState } from "react";
import { MailX } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { CARD, ROW, STICKY_COL, ShowAllButton, TableScroll, useAdminFetch, useTopN } from "@/components/admin/AdminTabParts";
import { BLOCK_AFTER_BOUNCES } from "@/lib/emailDomainBlock";
import type { EmailDomainRow } from "@/lib/server/emailDomains";

// The Users tab's "Blocked email domains" card: domains that only bounce
// (school districts that refuse outside mail), which every send now skips.
// Rules in lib/emailDomainBlock.ts; data from /api/admin/email-domains.

interface Payload { generatedAt: string; domains: EmailDomainRow[] }

const fmt = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";

function why(r: EmailDomainRow): string {
  if (r.manual === "blocked") return "Blocked by hand";
  if (r.manual === "allowed") return "Allowed by hand";
  if (r.seeded) return "On the starting list";
  if (r.blocked) return `Auto: ${r.bouncedAddresses} addresses bounced, none delivered`;
  if (r.delivered > 0) return "Some mail delivered, so not blocked";
  return `${r.bouncedAddresses} of ${BLOCK_AFTER_BOUNCES} bounces to block`;
}

export function BlockedEmailDomainsCard() {
  const { user } = useAuth();
  const { data, error, loading, reload } = useAdminFetch<Payload>("/api/admin/email-domains");
  const [busy, setBusy] = useState<string | null>(null);
  const [newDomain, setNewDomain] = useState("");
  const rows = data?.domains ?? [];
  const top = useTopN(rows);

  const act = async (domain: string, action: "block" | "allow" | "auto") => {
    setBusy(domain);
    try {
      const token = await user?.getIdToken();
      const res = await fetch("/api/admin/email-domains", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ domain, action }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) alert(body.error || "Failed");
      await reload();
    } finally {
      setBusy(null);
    }
  };

  const blockedCount = rows.filter((r) => r.blocked).length;
  const btn = "text-xs font-medium underline underline-offset-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50 disabled:opacity-50";

  return (
    <div className={`${CARD} mt-4`}>
      <div className="flex items-center gap-2 mb-1">
        <MailX className="h-4 w-4 text-red-600 dark:text-red-400" />
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">Blocked email domains</h2>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        No email is sent to these domains. A domain is blocked once {BLOCK_AFTER_BOUNCES} different addresses on it
        hard-bounce and none is delivered to (usually a school district that refuses outside mail). Gmail, Outlook,
        Yahoo and the other big providers are never blocked.
      </p>
      {loading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : (
        <>
          <p className="text-sm text-gray-900 dark:text-gray-50 mb-2">
            <span className="font-semibold tabular-nums">{blockedCount}</span> blocked
            {rows.length > blockedCount ? `, ${rows.length - blockedCount} watched` : ""}
          </p>
          {rows.length > 0 && (
            <TableScroll>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 dark:text-gray-400">
                    <th className={`${STICKY_COL} py-1.5 pr-3 font-medium`}>Domain</th>
                    <th className="py-1.5 pr-3 font-medium">Status</th>
                    <th className="py-1.5 pr-3 font-medium text-right">Bounced</th>
                    <th className="py-1.5 pr-3 font-medium text-right">Delivered</th>
                    <th className="py-1.5 pr-3 font-medium">Last bounce</th>
                    <th className="py-1.5 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {top.shown.map((r) => (
                    <tr key={r.domain} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                      <td className={`${STICKY_COL} py-1.5 pr-3 font-mono text-xs text-gray-900 dark:text-gray-50`}>{r.domain}</td>
                      <td className="py-1.5 pr-3 text-xs">
                        <span className={r.blocked ? "text-red-700 dark:text-red-300 font-medium" : "text-gray-600 dark:text-gray-300"}>
                          {r.blocked ? "Blocked" : "Sending"}
                        </span>
                        <span className="block text-gray-500 dark:text-gray-400">{why(r)}</span>
                      </td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{r.bouncedAddresses}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{r.delivered}</td>
                      <td className="py-1.5 pr-3 text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap" title={r.lastBounceMessage ?? ""}>
                        {fmt(r.lastBounceAt)}
                      </td>
                      <td className="py-1.5 whitespace-nowrap space-x-3 text-right">
                        {r.blocked ? (
                          <button type="button" className={btn} disabled={busy === r.domain} onClick={() => act(r.domain, "allow")}>Allow</button>
                        ) : (
                          <button type="button" className={btn} disabled={busy === r.domain} onClick={() => act(r.domain, "block")}>Block</button>
                        )}
                        {r.manual && (
                          <button type="button" className={btn} disabled={busy === r.domain} onClick={() => act(r.domain, "auto")}>Reset</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScroll>
          )}
          <ShowAllButton hidden={top.hidden} all={top.all} onToggle={top.toggle} noun="more domains" />
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const d = newDomain.trim().toLowerCase().replace(/^.*@/, "");
              if (d) act(d, "block").then(() => setNewDomain(""));
            }}
          >
            <input
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="Block a domain, e.g. district.k12.oh.us"
              className="flex-1 min-w-0 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-2 py-1 text-sm"
            />
            <button type="submit" className="rounded-md bg-black text-white dark:bg-white dark:text-black px-3 py-1 text-sm font-medium">
              Block
            </button>
          </form>
        </>
      )}
    </div>
  );
}
