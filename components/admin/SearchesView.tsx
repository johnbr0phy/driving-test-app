"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { CARD, ROW, STICKY_COL, TabError, TabHeader, TabLoading, TableScroll, fmtUpdated, useAdminFetch } from "@/components/admin/AdminTabParts";

type Status = "planned" | "ignored";
interface Group {
  key: string;
  q: string;
  variants: { q: string; count: number }[];
  count: number;
  d7: number;
  d30: number;
  lastAt: string;
  picks: Record<string, number>;
  byRegion: Record<string, number>;
  missedThen: boolean;
  foundNow: boolean;
  topHit: string | null;
}
interface Row {
  q: string;
  count: number;
  lastResults: number;
  lastAt: string;
  picks: Record<string, number>;
  byRegion: Record<string, number>;
}
interface Payload {
  totals: { total: number; misses: number; picks: number };
  daily: { day: string; total: number; misses: number; picks: number }[];
  groups: Group[];
  recent: Row[];
  triage: Record<string, Status>;
  builtAt: string;
}

type Range = "7" | "30" | "all";
const RANGES: { id: Range; label: string }[] = [
  { id: "7", label: "7 days" },
  { id: "30", label: "30 days" },
  { id: "all", label: "All time" },
];
const PAGE = 15;

const when = (iso: string) => (iso ? new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "");
const list = (r: Record<string, number>, max = 3) => {
  const e = Object.entries(r).sort((a, b) => b[1] - a[1]);
  const shown = e.slice(0, max).map(([k, v]) => `${k} ${v}`).join(", ");
  return e.length > max ? `${shown} +${e.length - max}` : shown;
};

function Section({ title, note, count, children, collapsed = false }: { title: string; note: string; count: number; children: React.ReactNode; collapsed?: boolean }) {
  const [open, setOpen] = useState(!collapsed);
  return (
    <section className={CARD}>
      <button type="button" onClick={() => setOpen(!open)} className="w-full text-left flex items-baseline justify-between gap-3">
        <h2 className="font-bold text-gray-900 dark:text-gray-50">
          {title} <span className="font-normal text-gray-500 dark:text-gray-400 tabular-nums">{count}</span>
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">{open ? "Hide" : "Show"}</span>
      </button>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{note}</p>
      {open && (count === 0 ? <p className="text-sm text-gray-500 dark:text-gray-400">Nothing here.</p> : children)}
    </section>
  );
}

function More({ shown, total, onMore }: { shown: number; total: number; onMore: () => void }) {
  if (shown >= total) return null;
  return (
    <button type="button" onClick={onMore} className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50 underline">
      Show {Math.min(PAGE * 2, total - shown)} more of {total - shown}
    </button>
  );
}

const BTN = "text-xs font-medium border border-gray-200 dark:border-gray-800 rounded-md px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50";

function GroupTable({ groups, range, showPicks, showHit, actions }: {
  groups: Group[];
  range: Range;
  showPicks?: boolean;
  showHit?: boolean;
  actions?: (g: Group) => React.ReactNode;
}) {
  const [limit, setLimit] = useState(PAGE);
  const [open, setOpen] = useState<string | null>(null);
  const n = (g: Group) => (range === "7" ? g.d7 : range === "30" ? g.d30 : g.count);
  return (
    <>
      <TableScroll>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <th className={`py-1 pr-3 ${STICKY_COL} ${ROW}`}>Search</th>
              <th className="py-1 pr-3 text-right">Times</th>
              {showHit && <th className="py-1 pr-3">Finds now</th>}
              {showPicks && <th className="py-1 pr-3">Opened</th>}
              <th className="py-1 pr-3">Countries</th>
              <th className="py-1 pr-3">Last</th>
              {actions && <th className="py-1" />}
            </tr>
          </thead>
          <tbody>
            {groups.slice(0, limit).map((g) => (
              <tr key={g.key} className={`${ROW} border-t border-gray-100 dark:border-gray-800 align-top`}>
                <td className={`py-1.5 pr-3 ${STICKY_COL} max-w-[14rem]`}>
                  <span className="font-medium text-gray-900 dark:text-gray-50 break-words">{g.q}</span>
                  {g.variants.length > 1 && (
                    <button type="button" onClick={() => setOpen(open === g.key ? null : g.key)} className="ml-1.5 text-xs text-gray-500 dark:text-gray-400 underline">
                      +{g.variants.length - 1} {g.variants.length === 2 ? "way" : "ways"}
                    </button>
                  )}
                  {open === g.key && (
                    <ul className="mt-1 text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
                      {g.variants.map((v) => (
                        <li key={v.q}>
                          {v.q} <span className="tabular-nums">· {v.count}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="py-1.5 pr-3 text-right tabular-nums">{n(g)}</td>
                {showHit && <td className="py-1.5 pr-3 text-gray-600 dark:text-gray-300 min-w-[10rem]">{g.topHit}</td>}
                {showPicks && <td className="py-1.5 pr-3 text-gray-600 dark:text-gray-300 min-w-[8rem]">{list(g.picks)}</td>}
                <td className="py-1.5 pr-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{list(g.byRegion)}</td>
                <td className="py-1.5 pr-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{when(g.lastAt)}</td>
                {actions && <td className="py-1.5 whitespace-nowrap text-right space-x-1">{actions(g)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
      <More shown={limit} total={groups.length} onMore={() => setLimit(limit + PAGE * 2)} />
    </>
  );
}

function Trend({ daily }: { daily: Payload["daily"] }) {
  const max = Math.max(1, ...daily.map((d) => d.total));
  return (
    <div className={CARD}>
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="font-bold text-gray-900 dark:text-gray-50 text-sm">Searches a day, last 30 days</h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          <span className="inline-block h-2 w-2 rounded-sm bg-gray-400 dark:bg-gray-500 mr-1" />found
          <span className="inline-block h-2 w-2 rounded-sm bg-red-500 ml-3 mr-1" />nothing
        </span>
      </div>
      <div className="flex items-end gap-[2px] h-16">
        {daily.map((d) => (
          <div key={d.day} title={`${d.day}: ${d.total} searches, ${d.misses} found nothing`} className="flex-1 flex flex-col justify-end h-full">
            <div className="bg-red-500" style={{ height: `${(d.misses / max) * 100}%` }} />
            <div className="bg-gray-400 dark:bg-gray-500" style={{ height: `${((d.total - d.misses) / max) * 100}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// The Searches tab on /admin: what people type into the test search (the
// homepage box and the header's test search). API: /api/admin/searches, which
// groups the ways of typing one search, re-checks misses against today's
// search, and stores Planned / Ignored marks so the build list stays short.
export function SearchesView() {
  const { user } = useAuth();
  const { data, setData, error, loading, refreshing, updating, reload } = useAdminFetch<Payload>("/api/admin/searches");
  const [range, setRange] = useState<Range>("30");
  const [filter, setFilter] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

  const view = useMemo(() => {
    if (!data) return null;
    const n = (g: Group) => (range === "7" ? g.d7 : range === "30" ? g.d30 : g.count);
    const f = filter.trim().toLowerCase();
    const groups = data.groups
      .filter((g) => n(g) > 0)
      .filter((g) => !f || g.variants.some((v) => v.q.includes(f)))
      .sort((a, b) => n(b) - n(a) || b.lastAt.localeCompare(a.lastAt));
    const status = (g: Group) => data.triage[g.key];
    const missing = groups.filter((g) => g.missedThen && !g.foundNow);
    return {
      build: missing.filter((g) => !status(g)),
      planned: missing.filter((g) => status(g) === "planned"),
      fixed: groups.filter((g) => g.missedThen && g.foundNow && status(g) !== "ignored"),
      ignored: groups.filter((g) => status(g) === "ignored"),
      top: groups.filter((g) => !g.missedThen),
      recent: data.recent.filter((r) => !f || r.q.includes(f)),
    };
  }, [data, range, filter]);

  if (loading) return <TabLoading />;
  if (error || !data || !view) return <TabError message={error || "Failed to load"} />;

  const mark = async (key: string, status: Status | null) => {
    setSaving(key);
    try {
      const token = await user?.getIdToken();
      const res = await fetch("/api/admin/searches", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ key, status }),
      });
      if (!res.ok) throw new Error();
      setData((d) => {
        if (!d) return d;
        const triage = { ...d.triage };
        if (status) triage[key] = status;
        else delete triage[key];
        return { ...d, triage };
      });
    } catch {
      alert("Could not save. Try again.");
    } finally {
      setSaving(null);
    }
  };
  const btn = (g: Group, status: Status | null, label: string) => (
    <button key={label} type="button" disabled={saving === g.key} onClick={() => mark(g.key, status)} className={BTN}>
      {label}
    </button>
  );

  const windowDays = range === "7" ? 7 : 30;
  const recentDays = data.daily.slice(-windowDays);
  const tiles =
    range === "all"
      ? data.totals
      : recentDays.reduce((s, d) => ({ total: s.total + d.total, misses: s.misses + d.misses, picks: s.picks + d.picks }), { total: 0, misses: 0, picks: 0 });

  return (
    <div className="space-y-4">
      <TabHeader subtitle={<>Updated {fmtUpdated(data.builtAt)}</>} onRefresh={() => reload(true)} refreshing={refreshing} updating={updating}>
        <div className="flex rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-0.5 shadow-sm">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              className={`text-xs font-medium rounded-md px-2.5 py-1 ${range === r.id ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900" : "text-gray-500 dark:text-gray-400"}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </TabHeader>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        What people type into the search on the <Link href="/" className="underline">homepage</Link> and in the header. Ways of typing the same thing are grouped (&ldquo;cna exam&rdquo;, &ldquo;CNA practice test&rdquo;), and every search that found nothing is tried again against today&rsquo;s search.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Searches", tiles.total],
          ["Found nothing", tiles.misses],
          ["Tests opened", tiles.picks],
        ].map(([label, v]) => (
          <div key={label} className={CARD}>
            <div className="text-2xl font-bold tabular-nums text-gray-900 dark:text-gray-50">{v}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
          </div>
        ))}
      </div>
      <Trend daily={data.daily} />
      <input
        type="search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter searches"
        className="w-full sm:w-72 text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2"
      />
      <Section
        title="Build these"
        count={view.build.length}
        note="Still finds nothing today, and nobody opened a test from it. Mark each one Planned or Ignore it (typos, junk, not a test), so this list only holds what is new."
      >
        <GroupTable groups={view.build} range={range} actions={(g) => [btn(g, "planned", "Planned"), btn(g, "ignored", "Ignore")]} />
      </Section>
      <Section title="Planned" count={view.planned.length} note="Marked to build. A search moves to Found now on its own once the test exists." collapsed>
        <GroupTable groups={view.planned} range={range} actions={(g) => btn(g, null, "Unmark")} />
      </Section>
      <Section title="Found now" count={view.fixed.length} note="Found nothing when it was typed, but today's search finds a test: built since, or a new alias. Check the match is right; Ignore once you have." collapsed>
        <GroupTable groups={view.fixed} range={range} showHit actions={(g) => btn(g, "ignored", "Done")} />
      </Section>
      <Section title="Most searched" count={view.top.length} note="Searches that found a test, with the tests people opened from them.">
        <GroupTable groups={view.top} range={range} showPicks />
      </Section>
      <Section title="Latest" count={view.recent.length} note="The most recent searches, as typed (any period)." collapsed>
        <RecentTable rows={view.recent} />
      </Section>
      <Section title="Ignored" count={view.ignored.length} note="Hidden from the lists above." collapsed>
        <GroupTable groups={view.ignored} range={range} actions={(g) => btn(g, null, "Undo")} />
      </Section>
    </div>
  );
}

function RecentTable({ rows }: { rows: Row[] }) {
  const [limit, setLimit] = useState(PAGE);
  return (
    <>
      <TableScroll>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <th className={`py-1 pr-3 ${STICKY_COL} ${ROW}`}>Search</th>
              <th className="py-1 pr-3 text-right">Results</th>
              <th className="py-1 pr-3">Opened</th>
              <th className="py-1 pr-3">Countries</th>
              <th className="py-1">Last</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, limit).map((r) => (
              <tr key={r.q} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                <td className={`py-1.5 pr-3 ${STICKY_COL} max-w-[14rem] font-medium text-gray-900 dark:text-gray-50 break-words`}>{r.q}</td>
                <td className={`py-1.5 pr-3 text-right tabular-nums ${r.lastResults === 0 ? "text-red-600 dark:text-red-400" : ""}`}>{r.lastResults}</td>
                <td className="py-1.5 pr-3 text-gray-600 dark:text-gray-300">{list(r.picks)}</td>
                <td className="py-1.5 pr-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">{list(r.byRegion)}</td>
                <td className="py-1.5 text-gray-500 dark:text-gray-400 whitespace-nowrap">{when(r.lastAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
      <More shown={limit} total={rows.length} onMore={() => setLimit(limit + PAGE * 2)} />
    </>
  );
}
