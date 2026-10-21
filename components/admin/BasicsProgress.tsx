"use client";

import { useState } from "react";
import { ChevronDown, Lock } from "lucide-react";
import { CARD, ROW, STICKY_COL, TableScroll, useAdminFetch } from "@/components/admin/AdminTabParts";
import type { V2ProgressExam, V2ProgressPayload } from "@/lib/server/v2Progress";

// "Basics" card on the /admin Growth tab (/api/admin/v2-progress): how far
// SAT, ACT and the other v2 students get through their dashboard steps, and
// whether Basics is pulling its weight. Accounts give the full picture from
// users/{uid}.v2; the all-browsers rows add guests from analytics/v2Basics.

const fmt = (n: number) => n.toLocaleString("en-US");
const pctOf = (n: number, d: number) => (d > 0 ? `${Math.round((n / d) * 100)}%` : "—");
const fmtDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2.5">
      <div className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</div>
      <div className="mt-0.5 text-lg font-semibold tabular-nums text-gray-900 dark:text-gray-50">{value}</div>
      {sub && <div className="text-[11px] text-gray-500 dark:text-gray-400">{sub}</div>}
    </div>
  );
}

function Ratio({ label, num, den, numLabel, denLabel }: { label: string; num: number; den: number; numLabel: string; denLabel: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5 border-t border-gray-100 dark:border-gray-800 text-sm">
      <span className="text-gray-600 dark:text-gray-300">{label}</span>
      <span className="tabular-nums text-gray-900 dark:text-gray-50">
        <span className="font-semibold">{pctOf(num, den)}</span>
        <span className="ml-2 text-[11px] text-gray-500 dark:text-gray-400">{fmt(num)} {numLabel} of {fmt(den)} {denLabel}</span>
      </span>
    </div>
  );
}

function ExamView({ exam, since }: { exam: V2ProgressExam; since: string }) {
  const [showSkills, setShowSkills] = useState(false);
  const ev = (k: string) => exam.events[k] ?? 0;
  const { withBasics: wb, withoutBasics: wo } = exam.value;
  const b = exam.basics;

  if (exam.students === 0 && ev("skill_open") === 0 && ev("exam_start") === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">No {exam.name} students yet.</p>;
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <Tile label="Students" value={fmt(exam.students)} sub="accounts" />
        <Tile label="Learned a skill" value={pctOf(b.learnedAny, exam.students)} sub={`${fmt(b.learnedAny)} · median ${b.medianLearned ?? "—"} of ${b.totalSkills}`} />
        <Tile label="Skipped Basics" value={pctOf(b.skippedToExam, exam.students)} sub={`${fmt(b.skippedToExam)} went straight to questions`} />
        <Tile label="Steps done" value={exam.medianStepsDone !== null ? `${exam.medianStepsDone} / ${exam.totalSteps}` : "—"} sub="median" />
        <Tile label="Full test" value={pctOf(exam.tests.finished, exam.students)} sub={`${fmt(exam.tests.finished)} took one · ${fmt(exam.tests.reachedGoal)} hit goal`} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-50 mb-1">Does Basics help? (accounts)</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                <th className="text-left font-medium py-1">Exam-level drills</th>
                <th className="text-right font-medium py-1">Drills</th>
                <th className="text-right font-medium py-1" title="Correct answers / answers in the exam-level drill">Accuracy</th>
                <th className="text-right font-medium py-1">Mastered</th>
              </tr>
            </thead>
            <tbody>
              {([["Learned a skill of it", wb], ["No Basics", wo]] as const).map(([label, s]) => (
                <tr key={label} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="py-1.5 text-gray-600 dark:text-gray-300">{label}</td>
                  <td className="py-1.5 text-right tabular-nums">{fmt(s.drills)}</td>
                  <td className="py-1.5 text-right tabular-nums font-semibold text-gray-900 dark:text-gray-50">{pctOf(s.correct, s.seen)}</td>
                  <td className="py-1.5 text-right tabular-nums">{pctOf(s.mastered, s.drills)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-1.5 text-[11px] text-gray-500 dark:text-gray-400">
            One row per student per drill they started. Not a controlled test: students who choose Basics may differ from those who skip it.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-50 mb-1">All browsers, guests included (since {fmtDate(since)})</h3>
          <Ratio label="Finish a skill they open" num={ev("skill_learned")} den={ev("skill_open")} numLabel="learned" denLabel="opened" />
          <Ratio label="Tap Brush up after a miss" num={ev("brushup")} den={ev("brushup_shown")} numLabel="tapped" denLabel="offered" />
          <Ratio label="Start the questions after Basics" num={ev("exam_start_basics")} den={ev("exam_start")} numLabel="after Basics" denLabel="started" />
          <Ratio label="Master a drill, after Basics" num={ev("drill_mastered_basics")} den={ev("exam_start_basics")} numLabel="mastered" denLabel="started" />
          <Ratio label="Master a drill, no Basics" num={ev("drill_mastered_cold")} den={ev("exam_start_cold")} numLabel="mastered" denLabel="started" />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-50 mb-1">How far they get (accounts, dashboard order)</h3>
        <TableScroll>
          <table className="w-full text-sm">
            <thead>
              <tr className={`${ROW} text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400`}>
                <th className={`text-left font-medium py-1 ${STICKY_COL}`}>Step</th>
                <th className="text-right font-medium py-1 pl-3">Started</th>
                <th className="text-right font-medium py-1 pl-3">Done</th>
                <th className="text-right font-medium py-1 pl-3 w-1/3">Done, of students</th>
              </tr>
            </thead>
            <tbody>
              {exam.steps.map((s, i) => (
                <tr key={i} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                  <td className={`py-1.5 ${STICKY_COL} ${s.kind === "basics" ? "pl-3 text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-gray-50"}`}>
                    <span className="tabular-nums text-gray-400 mr-1.5">{i + 1}.</span>
                    {s.label}
                    {s.premium && <Lock className="inline ml-1 h-3 w-3 text-gray-400" aria-label="Premium" />}
                  </td>
                  <td className="py-1.5 pl-3 text-right tabular-nums text-gray-600 dark:text-gray-300">{fmt(s.started)}</td>
                  <td className="py-1.5 pl-3 text-right tabular-nums text-gray-900 dark:text-gray-50">{fmt(s.completed)}</td>
                  <td className="py-1.5 pl-3">
                    <div className="flex items-center gap-2 justify-end">
                      <div className="h-1.5 w-full max-w-[140px] bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                        <div className="h-full rounded" style={{ width: `${exam.students ? (s.completed / exam.students) * 100 : 0}%`, background: s.kind === "basics" ? "#2a78d6" : "#eb6834" }} />
                      </div>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 tabular-nums w-9 text-right">{pctOf(s.completed, exam.students)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
        <p className="mt-1.5 text-[11px] text-gray-500 dark:text-gray-400">
          Basics step: started = one skill learned, done = all of them. Test step: done = best score at or above the student&apos;s goal. <Lock className="inline h-3 w-3" /> needs Premium.
        </p>
      </div>

      <div>
        <button type="button" onClick={() => setShowSkills((v) => !v)} className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 dark:text-gray-200">
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showSkills ? "rotate-180" : ""}`} />
          Every skill ({exam.skills.length})
        </button>
        {showSkills && (
          <TableScroll className="mt-2">
            <table className="w-full text-sm">
              <thead>
                <tr className={`${ROW} text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400`}>
                  <th className={`text-left font-medium py-1 ${STICKY_COL}`}>Skill</th>
                  <th className="text-right font-medium py-1 pl-3" title="Accounts that learned it, all-time">Learned</th>
                  <th className="text-right font-medium py-1 pl-3" title="Questions right on the first try, accounts">1st try</th>
                  <th className="text-right font-medium py-1 pl-3" title="All browsers: opened / learned">Opened → learned</th>
                  <th className="text-right font-medium py-1 pl-3" title="All browsers: Brush up offered / tapped">Brush up</th>
                </tr>
              </thead>
              <tbody>
                {exam.skills.map((s) => {
                  const e = exam.skillEvents[s.id] ?? {};
                  return (
                    <tr key={s.id} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                      <td className={`py-1.5 text-gray-900 dark:text-gray-50 ${STICKY_COL}`}>
                        {s.name}
                        <span className="ml-1.5 text-[11px] text-gray-500 dark:text-gray-400">{s.drill}</span>
                      </td>
                      <td className="py-1.5 pl-3 text-right tabular-nums">{fmt(s.learned)}</td>
                      <td className="py-1.5 pl-3 text-right tabular-nums">{s.firstTryPct !== null ? `${s.firstTryPct}%` : "—"}</td>
                      <td className="py-1.5 pl-3 text-right tabular-nums text-gray-600 dark:text-gray-300">
                        {fmt(e.skill_open ?? 0)} → {fmt(e.skill_learned ?? 0)}
                      </td>
                      <td className="py-1.5 pl-3 text-right tabular-nums text-gray-600 dark:text-gray-300">
                        {fmt(e.brushup ?? 0)} / {fmt(e.brushup_shown ?? 0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableScroll>
        )}
      </div>
    </div>
  );
}

export function BasicsProgress() {
  const { data, error, loading } = useAdminFetch<V2ProgressPayload>("/api/admin/v2-progress");
  const [selected, setSelected] = useState<string | null>(null);
  const exam = data?.exams.find((e) => e.id === (selected ?? data.exams[0]?.id));

  return (
    <div className={CARD}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">Basics and course progress</h2>
        {data && (
          <div className="flex flex-wrap gap-1">
            {data.exams.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelected(e.id)}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                  e.id === exam?.id
                    ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-800"
                }`}
              >
                {e.name} <span className="tabular-nums opacity-70">{e.students}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {loading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      ) : error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : exam && data ? (
        <ExamView key={exam.id} exam={exam} since={data.trackingSince} />
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">No exams with Basics.</p>
      )}
    </div>
  );
}
