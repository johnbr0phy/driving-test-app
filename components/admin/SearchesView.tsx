"use client";

import Link from "next/link";
import { CARD, TabError, TabLoading, useAdminFetch } from "@/components/admin/AdminTabParts";

interface Row {
  q: string;
  count: number;
  misses: number;
  lastResults: number;
  lastAt: string;
  picks: Record<string, number>;
  byRegion: Record<string, number>;
}
interface Payload {
  totals: { total: number; misses: number; picks: number };
  misses: Row[];
  top: Row[];
  recent: Row[];
}

const when = (iso: string) => (iso ? new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "");
const regions = (r: Record<string, number>) =>
  Object.entries(r)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `${k} ${v}`)
    .join(", ");
const picks = (p: Record<string, number>) =>
  Object.entries(p)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `${k} ${v}`)
    .join(", ");

function Table({ title, note, rows, showPicks }: { title: string; note: string; rows: Row[]; showPicks: boolean }) {
  return (
    <section className={CARD}>
      <h2 className="font-bold text-gray-900 dark:text-gray-50">{title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{note}</p>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Nothing yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400">
                <th className="py-1 pr-3">Search</th>
                <th className="py-1 pr-3 text-right">Times</th>
                <th className="py-1 pr-3 text-right">Results</th>
                {showPicks && <th className="py-1 pr-3">Picked</th>}
                <th className="py-1 pr-3">Countries</th>
                <th className="py-1">Last</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.q} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="py-1.5 pr-3 font-medium text-gray-900 dark:text-gray-50">{r.q}</td>
                  <td className="py-1.5 pr-3 text-right tabular-nums">{r.count}</td>
                  <td className={`py-1.5 pr-3 text-right tabular-nums ${r.lastResults === 0 ? "text-red-600 dark:text-red-400" : ""}`}>{r.lastResults}</td>
                  {showPicks && <td className="py-1.5 pr-3 text-gray-600 dark:text-gray-300">{picks(r.picks)}</td>}
                  <td className="py-1.5 pr-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{regions(r.byRegion)}</td>
                  <td className="py-1.5 text-gray-500 dark:text-gray-400 whitespace-nowrap">{when(r.lastAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

// The Searches tab on /admin: what people type into the test search (the
// homepage box and the header's test search). API: /api/admin/searches.
export function SearchesView() {
  const { data, error, loading } = useAdminFetch<Payload>("/api/admin/searches");
  if (loading) return <TabLoading />;
  if (error || !data) return <TabError message={error || "Failed to load"} />;
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        What people type into the search on the <Link href="/" className="underline">homepage</Link> and in the header. Searches that find nothing are the tests to build next.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Searches", data.totals.total],
          ["Found nothing", data.totals.misses],
          ["Tests opened", data.totals.picks],
        ].map(([label, n]) => (
          <div key={label} className={CARD}>
            <div className="text-2xl font-bold tabular-nums text-gray-900 dark:text-gray-50">{n}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
          </div>
        ))}
      </div>
      <Table title="Found nothing: build these" note="Most searched first, where the last search returned no test." rows={data.misses} showPicks={false} />
      <Table title="Most searched" note="Every query, with the tests people opened from it." rows={data.top} showPicks />
      <Table title="Latest" note="The 50 most recent searches." rows={data.recent} showPicks />
    </div>
  );
}
