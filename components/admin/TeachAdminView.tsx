"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { CARD, ROW, STICKY_COL, TabHeader, TableScroll, fmtUpdated } from "@/components/admin/AdminTabParts";
import { ExternalLink, ChevronDown } from "lucide-react";
import type { TeachAdminPayload, TeachAdminClass } from "@/lib/server/teachAdmin";

// The Teachers tab body on /admin, given the API payload. Kept apart from the
// page so it renders without an admin session.

// Same validated palette as the Growth tab: blue for people.
const BLUE = "#2a78d6";
const BLUE_LIGHT = "#a9cdf5";

const fmtInt = (n: number) => n.toLocaleString("en-US");
const fmtPct = (num: number, den: number) => (den ? `${Math.round((num / den) * 100)}%` : "n/a");
const fmtDay = (iso: string) => new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

function ago(iso: string | null): string {
  if (!iso) return "never";
  const days = Math.floor((Date.now() - Date.parse(iso)) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  return fmtDay(iso);
}

const SOURCE_LABELS: Record<string, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  gemini: "Gemini",
  copilot: "Copilot",
  claude: "Claude",
  ai_other: "Other AI",
  search: "Search",
  direct: "Direct / email / app",
  other: "Other sites",
};

function Card({ title, subtitle, children }: { title: string; subtitle?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className={`text-gray-900 dark:text-gray-50 ${CARD} mb-4 sm:mb-6`}>
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
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-3 sm:p-4">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-50 tabular-nums mt-1">{value}</p>
      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{sub}</p>
    </div>
  );
}

function Funnel({ data }: { data: TeachAdminPayload }) {
  const [range, setRange] = useState<"total" | "last30">("total");
  const max = Math.max(1, ...data.funnel.map((s) => s[range]));
  return (
    <Card
      title="Teacher funnel"
      subtitle={
        <div className="flex items-center gap-1">
          {(["total", "last30"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`px-2 py-0.5 rounded-md ${range === r ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              {r === "total" ? "All time" : "Last 30 days"}
            </button>
          ))}
        </div>
      }
    >
      <div className="space-y-2.5">
        {data.funnel.map((s, i) => {
          const v = s[range];
          const prev = i > 0 ? data.funnel[i - 1][range] : null;
          // Teacher steps (0-3) and student steps (4-7) are two funnels; the
          // class link is where the second starts, so no rate into it.
          const showRate = prev !== null && i !== 4;
          return (
            <Fragment key={s.key}>
              {i === 4 && <p className="text-[11px] uppercase tracking-wide text-gray-400 pt-2">Students</p>}
              {i === 0 && <p className="text-[11px] uppercase tracking-wide text-gray-400">Teachers</p>}
              <div className="grid grid-cols-[minmax(0,11rem)_1fr_auto] sm:grid-cols-[14rem_1fr_7rem] items-center gap-3">
                <div className="min-w-0">
                  <p className="text-sm truncate">
                    {s.label}
                    {s.tracked && <span className="text-gray-400" title={`Counted since ${fmtDay(data.trackingSince)}`}> *</span>}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{s.detail}</p>
                </div>
                <div className="h-5 rounded bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div className="h-full rounded" style={{ width: `${(v / max) * 100}%`, background: s.tracked ? BLUE_LIGHT : BLUE }} />
                </div>
                <p className="text-sm tabular-nums text-right">
                  {fmtInt(v)}
                  {showRate && <span className="text-[11px] text-gray-500 dark:text-gray-400"> · {fmtPct(v, prev!)}</span>}
                </p>
              </div>
            </Fragment>
          );
        })}
      </div>
      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-4">
        * Counted by the browser since {fmtDay(data.trackingSince)}, once per browser, internal browsers excluded. The other steps come from the classes themselves, so they
        cover every class ever made. Rates compare each step with the one above it.
      </p>
    </Card>
  );
}

function Nudge({ nudge }: { nudge: TeachAdminPayload["nudge"] }) {
  const [range, setRange] = useState<"total" | "last30">("total");
  const n = range === "total" ? nudge : nudge.last30;
  return (
    <Card
      title="Dashboard nudge"
      subtitle={
        <div className="flex items-center gap-1">
          {(["total", "last30"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`px-2 py-0.5 rounded-md ${range === r ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              {r === "total" ? "All time" : "Last 30 days"}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Tile label="Saw it" value={fmtInt(n.shown)} sub="browsers shown the row" />
        <Tile label="Copied the link" value={fmtInt(n.copied)} sub={`${fmtPct(n.copied, n.shown)} of those shown`} />
        <Tile label="Tapped the link" value={fmtInt(n.tapped)} sub={`${fmtPct(n.tapped, n.shown)} of those shown`} />
      </div>
      {nudge.byExam.length > 0 && (
        <TableScroll className="mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className={`${ROW} text-left text-xs text-gray-500 dark:text-gray-400`}>
                <th className={`font-normal py-1.5 pr-3 ${STICKY_COL}`}>Test</th>
                <th className="font-normal py-1.5 px-3 text-right">Saw it</th>
                <th className="font-normal py-1.5 px-3 text-right">Copied</th>
                <th className="font-normal py-1.5 pl-3 text-right">Tapped</th>
              </tr>
            </thead>
            <tbody>
              {nudge.byExam.map((e) => (
                <tr key={e.examId} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                  <td className={`py-1.5 pr-3 ${STICKY_COL}`}>{e.examName}</td>
                  <td className="py-1.5 px-3 text-right tabular-nums">{fmtInt(e.shown)}</td>
                  <td className="py-1.5 px-3 text-right tabular-nums">{fmtInt(e.copied)}</td>
                  <td className="py-1.5 pl-3 text-right tabular-nums">{fmtInt(e.tapped)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      )}
      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-4">
        The &ldquo;Teachers can use it free&rdquo; row at the top of exam dashboards, after a step turns green. Counted since {fmtDay(nudge.since)}, once per browser
        per action, internal browsers excluded; by test is the dashboard it happened on (all time).
      </p>
    </Card>
  );
}

function Weeks({ weeks }: { weeks: TeachAdminPayload["weeks"] }) {
  const max = Math.max(1, ...weeks.map((w) => w.joins));
  return (
    <Card title="By week" subtitle="Weeks start Monday (UTC)">
      <TableScroll>
        <table className="w-full text-sm">
          <thead>
            <tr className={`${ROW} text-left text-xs text-gray-500 dark:text-gray-400`}>
              <th className={`font-normal py-1.5 pr-3 ${STICKY_COL}`}>Week of</th>
              <th className="font-normal py-1.5 px-3 text-right">Landing views</th>
              <th className="font-normal py-1.5 px-3 text-right">Classes made</th>
              <th className="font-normal py-1.5 px-3">Students joined</th>
              <th className="font-normal py-1.5 pl-3 text-right" title="Students whose last practice fell in that week">Last practiced</th>
            </tr>
          </thead>
          <tbody>
            {[...weeks].reverse().map((w) => (
              <tr key={w.start} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                <td className={`py-1.5 pr-3 whitespace-nowrap ${STICKY_COL}`}>{fmtDay(w.start)}</td>
                <td className="py-1.5 px-3 text-right tabular-nums">{fmtInt(w.landingViews)}</td>
                <td className="py-1.5 px-3 text-right tabular-nums">{fmtInt(w.classes)}</td>
                <td className="py-1.5 px-3 min-w-[10rem]">
                  <div className="flex items-center gap-2">
                    <div className="h-3 rounded" style={{ width: `${(w.joins / max) * 100}%`, minWidth: w.joins ? 3 : 0, background: BLUE }} />
                    <span className="tabular-nums text-xs">{fmtInt(w.joins)}</span>
                  </div>
                </td>
                <td className="py-1.5 pl-3 text-right tabular-nums">{fmtInt(w.answeringStudents)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
    </Card>
  );
}

function CountList({ rows, label, empty }: { rows: { key: string; count: number }[]; label: (k: string) => string; empty: string }) {
  if (!rows.length) return <p className="text-sm text-gray-500 dark:text-gray-400">{empty}</p>;
  const total = rows.reduce((n, r) => n + r.count, 0);
  return (
    <ul className="space-y-1.5">
      {rows.map((r) => (
        <li key={r.key} className="flex items-center justify-between gap-3 text-sm">
          <span className="truncate">{label(r.key)}</span>
          <span className="tabular-nums text-gray-600 dark:text-gray-300">
            {fmtInt(r.count)} <span className="text-[11px] text-gray-400">{fmtPct(r.count, total)}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function ClassRow({ c }: { c: TeachAdminClass }) {
  const [open, setOpen] = useState(false);
  const dormant = c.students === 0;
  return (
    <>
      <tr className={`${ROW} border-t border-gray-100 dark:border-gray-800 align-top`}>
        <td className={`py-2 pr-3 ${STICKY_COL}`}>
          <button type="button" onClick={() => setOpen((o) => !o)} className="flex items-start gap-1 text-left">
            <ChevronDown className={`h-4 w-4 mt-0.5 flex-shrink-0 text-gray-400 transition-transform ${open ? "" : "-rotate-90"}`} />
            <span>
              <span className="font-medium">{c.name}</span>
              <span className="block text-[11px] text-gray-500 dark:text-gray-400">
                {c.examName} · {c.code}
              </span>
            </span>
          </button>
        </td>
        <td className="py-2 px-3">
          <span className="block">{c.teacherName}</span>
          <span className="block text-[11px] text-gray-500 dark:text-gray-400">{c.school || "no school given"}</span>
        </td>
        <td className="py-2 px-3 whitespace-nowrap">{fmtDay(c.createdAt)}</td>
        <td className="py-2 px-3 text-right tabular-nums" title="Class link views (once per browser) → students joined">
          {fmtInt(c.joinViews)} → <span className={dormant ? "text-gray-400" : "font-medium"}>{fmtInt(c.students)}</span>
        </td>
        <td className="py-2 px-3 text-right tabular-nums">
          {fmtInt(c.practiced)}
          <span className="text-[11px] text-gray-400"> / {fmtInt(c.activeThisWeek)} wk</span>
        </td>
        <td className="py-2 px-3 text-right tabular-nums">
          {fmtInt(c.answered)}
          {c.answered > 0 && <span className="text-[11px] text-gray-400"> · {fmtPct(c.correct, c.answered)}</span>}
        </td>
        <td className="py-2 px-3 text-right tabular-nums">{fmtInt(c.testsTaken)}</td>
        <td className="py-2 px-3 whitespace-nowrap">{ago(c.lastStudentActiveAt)}</td>
        <td className="py-2 pl-3 whitespace-nowrap" title={`${c.teacherViews} views of the class page`}>
          {ago(c.teacherLastViewedAt)}
          {c.teacherViews > 0 && <span className="text-[11px] text-gray-400"> · {c.teacherViews}×</span>}
        </td>
      </tr>
      {open && (
        <tr className="bg-gray-50 dark:bg-gray-950">
          <td colSpan={9} className="px-6 py-3 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <span>
                Teacher email:{" "}
                {c.teacherEmail ? (
                  <a className="underline" href={`mailto:${c.teacherEmail}`}>
                    {c.teacherEmail}
                  </a>
                ) : (
                  "not recorded"
                )}
              </span>
              <span>
                Link opened from:{" "}
                {c.joinReferrers.length ? c.joinReferrers.map((r) => `${r.host} (${r.count})`).join(", ") : "no referrer recorded"}
              </span>
              <Link className="underline inline-flex items-center gap-1" href={`/teach/classes/${c.code}`}>
                Open the teacher&apos;s class page <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export function TeachAdminView({ data, onRefresh, refreshing, updating = false }: {
  data: TeachAdminPayload;
  onRefresh: () => void;
  refreshing: boolean;
  updating?: boolean;
}) {
  const t = data.totals;
  return (
    <>
      <TabHeader
        subtitle={<>
          The /teach channel · updated {fmtUpdated(data.generatedAt)}
          {t.internalClassesHidden > 0 && ` · ${t.internalClassesHidden} internal ${t.internalClassesHidden === 1 ? "class" : "classes"} hidden`}
        </>}
        onRefresh={onRefresh}
        refreshing={refreshing}
        updating={updating}
      >
        <Link href="/teach" className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 px-2 py-1.5">
          /teach <ExternalLink className="h-3 w-3" />
        </Link>
      </TabHeader>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Tile label="Teachers" value={fmtInt(t.teachers)} sub={`${fmtInt(t.classes)} classes, ${fmtInt(t.classesWithStudents)} with students`} />
          <Tile label="Students joined" value={fmtInt(t.students)} sub={`${fmtInt(t.practiced)} answered at least one question`} />
          <Tile label="Active this week" value={fmtInt(t.activeThisWeek)} sub={`students, in ${fmtInt(t.classesActiveThisWeek)} ${t.classesActiveThisWeek === 1 ? "class" : "classes"}`} />
          <Tile label="Questions answered" value={fmtInt(t.answered)} sub={`${fmtInt(t.testsTaken)} practice tests finished`} />
        </div>

        <Funnel data={data} />

        <Nudge nudge={data.nudge} />

        <Card title="Classes" subtitle="Most recent student activity first · click a class for details">
          {data.classes.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No classes yet.</p>
          ) : (
            <TableScroll>
              <table className="w-full text-sm min-w-[56rem]">
                <thead>
                  <tr className={`${ROW} text-left text-xs text-gray-500 dark:text-gray-400`}>
                    <th className={`font-normal py-1.5 pr-3 ${STICKY_COL}`}>Class</th>
                    <th className="font-normal py-1.5 px-3">Teacher</th>
                    <th className="font-normal py-1.5 px-3">Made</th>
                    <th className="font-normal py-1.5 px-3 text-right whitespace-nowrap">Link views → joined</th>
                    <th className="font-normal py-1.5 px-3 text-right">Practiced</th>
                    <th className="font-normal py-1.5 px-3 text-right">Answers</th>
                    <th className="font-normal py-1.5 px-3 text-right">Tests</th>
                    <th className="font-normal py-1.5 px-3 whitespace-nowrap">Last student</th>
                    <th className="font-normal py-1.5 pl-3 whitespace-nowrap">Teacher looked</th>
                  </tr>
                </thead>
                <tbody>
                  {data.classes.map((c) => (
                    <ClassRow key={c.code} c={c} />
                  ))}
                </tbody>
              </table>
            </TableScroll>
          )}
        </Card>

        <Card title="Links posted in a school LMS" subtitle="Visits referred by Canvas, Blackboard, .edu and other school sites, once per browser">
          {data.schoolReferrals.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No school referrals yet.</p>
          ) : (
            <TableScroll>
              <table className="w-full text-sm min-w-[40rem]">
                <thead>
                  <tr className={`${ROW} text-left text-xs text-gray-500 dark:text-gray-400`}>
                    <th className={`font-normal py-1.5 pr-3 ${STICKY_COL}`}>School site</th>
                    <th className="font-normal py-1.5 px-3 text-right">Visits</th>
                    <th className="font-normal py-1.5 px-3 text-right">Courses</th>
                    <th className="font-normal py-1.5 px-3">Mostly landed on</th>
                    <th className="font-normal py-1.5 px-3">First</th>
                    <th className="font-normal py-1.5 pl-3">Last</th>
                  </tr>
                </thead>
                <tbody>
                  {data.schoolReferrals.map((r) => (
                    <tr key={r.host} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                      <td className={`py-1.5 pr-3 ${STICKY_COL}`}>
                        {r.host}
                        <span className="block text-[11px] text-gray-500 dark:text-gray-400">{r.kind}</span>
                      </td>
                      <td className="py-1.5 px-3 text-right tabular-nums">{fmtInt(r.visits)}</td>
                      <td className="py-1.5 px-3 text-right tabular-nums">{r.courses ? fmtInt(r.courses) : "–"}</td>
                      <td className="py-1.5 px-3 truncate max-w-[16rem]">{r.topLanding ?? "–"}</td>
                      <td className="py-1.5 px-3 whitespace-nowrap">{r.firstSeen ? fmtDay(r.firstSeen) : "–"}</td>
                      <td className="py-1.5 pl-3 whitespace-nowrap">{ago(r.lastSeen || null)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScroll>
          )}
        </Card>

        <Weeks weeks={data.weeks} />

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          <Card title="Classes by test">
            <CountList
              rows={data.exams.map((e) => ({ key: e.examName, count: e.students }))}
              label={(k) => {
                const e = data.exams.find((x) => x.examName === k)!;
                return `${k} (${e.classes} ${e.classes === 1 ? "class" : "classes"})`;
              }}
              empty="No classes yet."
            />
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3">Counts are students joined.</p>
          </Card>
          <Card title="Where /teach visitors come from">
            <CountList rows={data.landingSources} label={(k) => SOURCE_LABELS[k] ?? k} empty={`Nothing counted since ${fmtDay(data.trackingSince)} yet.`} />
          </Card>
          <Card title="Referring sites">
            <CountList rows={data.landingReferrers} label={(k) => k} empty="No referring sites yet." />
          </Card>
        </div>
    </>
  );
}
