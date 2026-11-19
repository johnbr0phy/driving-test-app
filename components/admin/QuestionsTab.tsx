"use client";

import { CARD, ShowAllButton, TabError, TabHeader, TabLoading, fmtUpdated, useAdminFetch, useTopN } from "@/components/admin/AdminTabParts";
import type { QuestionHealthPayload } from "@/lib/server/questionHealth";
import { REPORT_REASONS } from "@/lib/questionQuality";

// Question quality, read only. Nothing here waits for a person (John, Nov 19
// 2026): the daily audit settles flags and student reports and fixes findings
// in PRs that merge themselves, the source triage settles changed pages, the
// weekly exam upkeep applies dated exam changes and yearly reviews, and every
// student who reported a question with an email is told how it ended. This tab
// only shows what those runs did. Data from /api/admin/questions
// (lib/server/questionHealth.ts).

const REASON_LABEL: Record<string, string> = Object.fromEntries(REPORT_REASONS.map((r) => [r.value, r.label]));

const FINDING_OUTCOME: Record<string, { label: string; style: string }> = {
  fixed: { label: "Fixed", style: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300" },
  kept: { label: "Checked, kept", style: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
  gave_up: { label: "Kept, unconfirmed", style: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
};
const REPORT_OUTCOME: Record<string, string> = {
  fixed: "Fixed",
  right: "Answer stands",
  closed: "Closed",
};

function Tile({ label, value }: { label: string; value: number | string }) {
  return (
    <div className={CARD}>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </div>
  );
}

export function QuestionsTab() {
  const { data, error, loading, refreshing, updating, reload } = useAdminFetch<QuestionHealthPayload>("/api/admin/questions");
  if (loading) return <TabLoading />;
  if (error || !data) return <TabError message={error || "Failed to load"} />;
  return <QuestionsView data={data} reload={reload} refreshing={refreshing} updating={updating} />;
}

function QuestionsView({ data, reload, refreshing, updating }: { data: QuestionHealthPayload; reload: () => void; refreshing: boolean; updating: boolean }) {
  const findings = useTopN(data.findings);
  const reports = useTopN(data.reports);
  const upcoming = useTopN(data.upcoming);
  const busy = data.inProgress;
  const inProgress = busy.findings + busy.reports + busy.flags + busy.sources;

  return (
    <div className="space-y-4 sm:space-y-6">
      <TabHeader
        subtitle={data.lastAudit ? `Last audit ${fmtUpdated(data.lastAudit.at)}: ${data.lastAudit.checked} questions checked` : "No audit has run yet"}
        onRefresh={reload}
        refreshing={refreshing}
        updating={updating}
      />

      <p className="text-sm text-gray-600 dark:text-gray-300">
        Nothing here needs you. Answer keys, student reports, changed official pages, dated exam changes and yearly reviews are all
        settled by automated runs that fix, double-check and merge their own changes. Students who left an email are told how their
        report ended.
        {inProgress > 0 && ` ${inProgress} items are being worked on now (${busy.findings} findings, ${busy.reports} reports, ${busy.flags} flags, ${busy.sources} pages).`}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Tile label="Questions fixed (7 days)" value={data.week.fixed} />
        <Tile label="Doubts checked, kept" value={data.week.kept} />
        <Tile label="Students replied to" value={data.week.replies} />
        <Tile label="Official pages handled" value={data.week.sources} />
        <Tile label="Exam updates merged" value={data.week.upkeep} />
      </div>

      <section className={CARD}>
        <h2 className="font-semibold">Findings settled in the last 14 days</h2>
        {findings.shown.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">None.</p>
        ) : (
          <ul className="mt-3 divide-y divide-gray-100 dark:divide-gray-800">
            {findings.shown.map((f) => {
              const o = FINDING_OUTCOME[f.outcome];
              return (
                <li key={`${f.examId}|${f.questionId}|${f.at}`} className="py-2 text-sm">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold mr-2 ${o.style}`}>{o.label}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {f.examId} · {f.questionId} · {fmtUpdated(f.at)}
                  </span>
                  {f.note && <p className="mt-1 text-gray-700 dark:text-gray-200">{f.note}</p>}
                </li>
              );
            })}
          </ul>
        )}
        <ShowAllButton hidden={findings.hidden} all={findings.all} onToggle={findings.toggle} />
      </section>

      <section className={CARD}>
        <h2 className="font-semibold">Student reports answered in the last 14 days</h2>
        {reports.shown.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">None.</p>
        ) : (
          <ul className="mt-3 divide-y divide-gray-100 dark:divide-gray-800">
            {reports.shown.map((r) => (
              <li key={`${r.examId}|${r.questionId}|${r.at}`} className="py-2 text-sm flex flex-wrap gap-x-2">
                <span className="font-medium text-gray-900 dark:text-gray-50">{REPORT_OUTCOME[r.outcome] ?? r.outcome}</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {r.examId} · {r.questionId} · {REASON_LABEL[r.reason] ?? r.reason} · {fmtUpdated(r.at)} · {r.emailed ? "student emailed" : "no email sent"}
                </span>
              </li>
            ))}
          </ul>
        )}
        <ShowAllButton hidden={reports.hidden} all={reports.all} onToggle={reports.toggle} />
      </section>

      <section className={CARD}>
        <h2 className="font-semibold">Exam changes the weekly upkeep will apply</h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Each one is taken within 7 days of its date, checked on the official source, and merged.</p>
        {upcoming.shown.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">None.</p>
        ) : (
          <ul className="mt-3 divide-y divide-gray-100 dark:divide-gray-800">
            {upcoming.shown.map((e) => (
              <li key={`${e.exam}|${e.date}`} className="py-2 text-sm">
                <span className="font-medium text-gray-900 dark:text-gray-50">
                  {e.exam}, {e.recheck ? `rechecking ${e.recheck}` : e.date}
                </span>
                <span className="text-gray-600 dark:text-gray-300">: {e.what}</span>
              </li>
            ))}
          </ul>
        )}
        <ShowAllButton hidden={upcoming.hidden} all={upcoming.all} onToggle={upcoming.toggle} />
      </section>
    </div>
  );
}
