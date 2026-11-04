"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CARD, ROW, STICKY_COL, TableScroll, useAdminFetch } from "@/components/admin/AdminTabParts";
import type { ExitExamPayload, ExitQuestionDetail, ExitQuestionsPayload } from "@/lib/exitQuestions";

// "Exit questions" card on the /admin Growth tab (/api/admin/exit-questions,
// built nightly by lib/exitQuestions.ts): the last question accounts answered
// before going quiet, ranked by exits above what the question's traffic
// predicts. A high lift after wrong answers is the cue to reread the question.

const fmt = (n: number) => n.toLocaleString("en-US");
const pctOf = (n: number, d: number) => (d > 0 ? `${Math.round((n / d) * 100)}%` : "—");
const LETTERS = ["A", "B", "C", "D", "E", "F"];

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2.5">
      <div className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</div>
      <div className="mt-0.5 text-lg font-semibold tabular-nums text-gray-900 dark:text-gray-50">{value}</div>
      {sub && <div className="text-[11px] text-gray-500 dark:text-gray-400">{sub}</div>}
    </div>
  );
}

function QuestionRow({ q, examErrorRate }: { q: ExitQuestionDetail; examErrorRate: number }) {
  const [open, setOpen] = useState(false);
  const hot = q.lift >= 2;
  return (
    <>
      <tr className={`${ROW} border-t border-gray-100 dark:border-gray-800 align-top cursor-pointer`} onClick={() => setOpen(!open)}>
        <td className={`py-1.5 pr-3 ${STICKY_COL} max-w-[18rem] sm:max-w-[28rem]`}>
          <div className="flex gap-1.5">
            <ChevronDown className={`mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
            <div>
              <div className="text-gray-900 dark:text-gray-50 line-clamp-2">{q.question || q.questionId}</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400">
                {q.questionId}
                {q.topic && ` · ${q.topic}`}
              </div>
            </div>
          </div>
        </td>
        <td className="py-1.5 pl-3 text-right tabular-nums font-semibold text-gray-900 dark:text-gray-50">{fmt(q.exits)}</td>
        <td className="py-1.5 pl-3 text-right tabular-nums text-gray-600 dark:text-gray-300">{q.expected}</td>
        <td className={`py-1.5 pl-3 text-right tabular-nums font-semibold ${hot ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-gray-50"}`}>
          {q.lift}×
        </td>
        <td className="py-1.5 pl-3 text-right tabular-nums">{pctOf(q.exitsWrong, q.exits)}</td>
        <td
          className={`py-1.5 pl-3 text-right tabular-nums ${q.errorRate >= examErrorRate * 2 && q.errorRate >= 40 ? "text-amber-600 dark:text-amber-400 font-semibold" : ""}`}
        >
          {q.errorRate}%
        </td>
        <td className="py-1.5 pl-3 text-right tabular-nums text-gray-600 dark:text-gray-300">{fmt(q.seenBy)}</td>
        <td className="py-1.5 pl-3 text-right tabular-nums text-gray-600 dark:text-gray-300">{q.medianSession}</td>
        <td className="py-1.5 pl-3 text-right tabular-nums text-gray-600 dark:text-gray-300">{q.avgWrongStreak}</td>
      </tr>
      {open && (
        <tr className={ROW}>
          <td colSpan={9} className="pb-3 pt-1 pl-6 text-sm">
            {q.options.length > 0 && (
              <ul className="space-y-0.5">
                {q.options.map((o, i) => (
                  <li
                    key={i}
                    className={o === q.answer ? "font-semibold text-green-700 dark:text-green-300" : "text-gray-700 dark:text-gray-300"}
                  >
                    {LETTERS[i]}. {o}
                  </li>
                ))}
              </ul>
            )}
            {q.explanation && <p className="mt-2 text-gray-600 dark:text-gray-300">{q.explanation}</p>}
          </td>
        </tr>
      )}
    </>
  );
}

function ExamView({ exam, quietDays }: { exam: ExitExamPayload; quietDays: number }) {
  const k = exam.kinds;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <Tile label="Accounts" value={fmt(exam.users)} sub={`${fmt(exam.quiet)} quiet ${quietDays}+ days`} />
        <Tile label="Left mid-practice" value={pctOf(k.question, exam.quiet)} sub={`${fmt(k.question)} · ${pctOf(exam.questionExitsWrong, k.question)} after a miss`} />
        <Tile label="Left after a test" value={pctOf(k.test, exam.quiet)} sub={fmt(k.test)} />
        <Tile label="Passed a test" value={pctOf(k.passed, exam.quiet)} sub={`${fmt(k.passed)} (done, not churn)`} />
        <Tile label="Bounced" value={pctOf(k.bounce, exam.quiet)} sub={`${fmt(k.bounce)} answered under 3`} />
      </div>

      {exam.questions.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No question has enough exits yet.</p>
      ) : (
        <TableScroll>
          <table className="w-full text-sm">
            <thead>
              <tr className={`${ROW} text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400`}>
                <th className={`text-left font-medium py-1 ${STICKY_COL}`}>Last question before leaving</th>
                <th className="text-right font-medium py-1 pl-3" title="Quiet accounts whose last answer was this question">Exits</th>
                <th className="text-right font-medium py-1 pl-3" title="Accounts that saw it × this exam's exit rate per question seen">Expected</th>
                <th className="text-right font-medium py-1 pl-3" title="Exits / expected. 2× or more is red">Lift</th>
                <th className="text-right font-medium py-1 pl-3" title="Exits where the last answer was wrong">Missed</th>
                <th className="text-right font-medium py-1 pl-3" title={`Miss rate across all answers (exam: ${exam.errorRate}%)`}>Miss rate</th>
                <th className="text-right font-medium py-1 pl-3" title="Accounts that answered it">Seen by</th>
                <th className="text-right font-medium py-1 pl-3" title="Median answers in the last sitting">Sitting</th>
                <th className="text-right font-medium py-1 pl-3" title="Average wrong answers in a row at the end">Miss streak</th>
              </tr>
            </thead>
            <tbody>
              {exam.questions.map((q) => (
                <QuestionRow key={q.questionId} q={q} examErrorRate={exam.errorRate} />
              ))}
            </tbody>
          </table>
        </TableScroll>
      )}
    </div>
  );
}

export function ExitQuestions() {
  const { data, error, loading } = useAdminFetch<ExitQuestionsPayload>("/api/admin/exit-questions");
  const [selected, setSelected] = useState<string | null>(null);
  const exams = data?.exams.filter((e) => e.kinds.question > 0) ?? [];
  const exam = exams.find((e) => e.id === (selected ?? exams[0]?.id));

  return (
    <div className={CARD}>
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">Exit questions</h2>
        {exams.length > 1 && (
          <select
            value={exam?.id ?? ""}
            onChange={(e) => setSelected(e.target.value)}
            className="rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-2 py-1 text-xs"
          >
            {exams.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} ({fmt(e.kinds.question)})
              </option>
            ))}
          </select>
        )}
      </div>
      <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
        The last question accounts answered before going quiet, ranked by exits above what its traffic predicts. A high lift with
        most exits after a miss is the cue to reread the question, key and explanation. Accounts only; v2 exams not covered.
        {data?.updatedAt && ` Built ${new Date(data.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}.`}
      </p>
      {loading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>}
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      {data && !data.updatedAt && (
        <p className="text-sm text-gray-500 dark:text-gray-400">No data yet. Built by the nightly stats job (03:00 UTC), or run aggregate-stats from Vercel.</p>
      )}
      {data?.updatedAt && !exam && <p className="text-sm text-gray-500 dark:text-gray-400">No account has left mid-practice yet.</p>}
      {exam && data && <ExamView exam={exam} quietDays={data.quietDays} />}
    </div>
  );
}
