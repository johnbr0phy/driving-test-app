"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QuizRow } from "@/components/QuizRow";
import {
  STUDENT_MIN_ANSWERS,
  STUDENT_TOPIC_MIN_ANSWERS,
  type ClassQuestionRow,
  type ClassReport,
  type ClassStudentRow,
} from "@/lib/classes";
import { scoreBar, scoreChip, scoreLevel, scoreText, scoreTrack } from "@/components/teach/scoreColors";
import { topWrongPick, untrackedNote } from "@/components/teach/ClassQuestions";

// One student, opened from the class page's Students table: what they need
// help with (only judged once they've answered enough), every topic against
// the class, the questions they keep missing, and their practice tests.

function pct(correct: number, answered: number): number {
  return answered ? Math.round((correct / answered) * 100) : 0;
}

const MISSED_SHOWN = 8;

export function StudentDetail({
  student,
  report,
  onClose,
  groupName = "Class",
}: {
  student: ClassStudentRow | null;
  report: ClassReport;
  onClose: () => void;
  /** The rest of the group in the per-question line: "Class" on the teacher page, "Players" on a quiz's report. */
  groupName?: string;
}) {
  return (
    <Dialog open={!!student} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
        {student && <Body key={student.name + student.joinedAt} student={student} report={report} groupName={groupName} />}
      </DialogContent>
    </Dialog>
  );
}

function Body({ student, report, groupName }: { student: ClassStudentRow; report: ClassReport; groupName: string }) {
  const [showAll, setShowAll] = useState(false);
  const { detail } = student;
  const pass = report.passPct;
  const byId = new Map<string, ClassQuestionRow>(report.questions.map((q) => [q.questionId, q]));
  // Misses the per-question counts don't hold (lost before the Oct 19 2026 fix).
  const unlisted = student.answered - student.correct - detail.missed.reduce((n, m) => n + m.missed, 0);
  const missed = detail.missed.flatMap((m) => {
    const q = byId.get(m.questionId);
    return q ? [{ ...m, q }] : [];
  });
  const repeat = missed.filter((m) => m.missed >= 2).length;
  const shown = showAll ? missed : missed.slice(0, MISSED_SHOWN);
  const enough = student.answered >= STUDENT_MIN_ANSWERS;
  const labelOf = (key: string) => detail.topics.find((t) => t.key === key)?.label ?? key;
  const section = "text-sm font-semibold text-gray-900 dark:text-gray-50 mb-2";

  return (
    <div className="space-y-6 min-w-0">
      <DialogHeader className="text-left">
        <DialogTitle className="text-xl text-gray-900 dark:text-gray-50">{student.name}</DialogTitle>
        <DialogDescription className="text-gray-600 dark:text-gray-300">
          {student.answered} answered · {student.answered ? `${pct(student.correct, student.answered)}% right` : "no answers yet"}
          {student.testsTaken > 0 && ` · ${student.testsTaken} practice ${student.testsTaken === 1 ? "test" : "tests"}`}
        </DialogDescription>
      </DialogHeader>

      <div className="rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-3">
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Needs help with</p>
        {!enough ? (
          <p className="text-sm text-gray-800 dark:text-gray-100">
            Not enough practice yet to tell. We call out weak topics after {STUDENT_MIN_ANSWERS} answers
            {student.answered > 0 ? ` (${student.name} has ${student.answered})` : ""}; the questions they missed are below.
          </p>
        ) : detail.focus.length ? (
          <div className="flex flex-wrap gap-2">
            {detail.focus.map((key) => {
              const t = detail.topics.find((x) => x.key === key)!;
              return (
                <span key={key} className={`rounded-sm px-2 py-1 text-sm font-medium ${scoreChip(scoreLevel(pct(t.correct, t.answered), pass))}`}>
                  {labelOf(key)} · {pct(t.correct, t.answered)}%
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-800 dark:text-gray-100">
            Nothing stands out: every topic with {STUDENT_TOPIC_MIN_ANSWERS}+ answers is at or above the {pass}% pass mark.
          </p>
        )}
        {repeat > 0 && (
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
            Missed {repeat} {repeat === 1 ? "question" : "questions"} more than once: the strongest sign of a real gap.
          </p>
        )}
      </div>

      {detail.topics.length > 0 && (
        <div>
          <h3 className={section}>By topic</h3>
          <div className="space-y-2.5">
            {detail.topics.map((t) => {
              const p = pct(t.correct, t.answered);
              return (
                <div key={t.key} className="grid grid-cols-[minmax(0,9rem)_1fr_5.5rem] sm:grid-cols-[minmax(0,13rem)_1fr_7rem] items-center gap-3 text-sm">
                  <span className="truncate text-gray-800 dark:text-gray-100" title={t.label}>{t.label}</span>
                  {t.judged ? (
                    <div className={`h-2.5 rounded-sm ${scoreTrack}`} title={`${t.correct} of ${t.answered} right`}>
                      <div className={`h-2.5 rounded-sm ${scoreBar(scoreLevel(p, pass))}`} style={{ width: `${p}%` }} />
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400">Too few to judge ({t.correct} of {t.answered})</span>
                  )}
                  <span className="text-right tabular-nums text-gray-800 dark:text-gray-100">
                    {t.judged ? `${p}%` : "-"}
                    {t.othersPct !== null && <span className="text-xs text-gray-500 dark:text-gray-400"> · class {t.othersPct}%</span>}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            A topic gets a score once {student.name} has answered {STUDENT_TOPIC_MIN_ANSWERS} questions in it.
          </p>
        </div>
      )}

      <div>
        <h3 className={section}>Questions {student.name} missed</h3>
        {missed.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-300">{!student.answered ? "No answers yet." : unlisted > 0 ? "None listed yet." : "None missed yet."}</p>
        ) : (
          <>
            <div className="space-y-2">
              {shown.map((m) => (
                <QuizRow
                  key={m.questionId}
                  chipValue={`${m.missed}×`}
                  chipLabel="missed"
                  chipColorClass={scoreText(m.missed >= 2 ? "low" : "near")}
                  question={m.q.question}
                  subtitle={[m.q.topic, topWrongPick(m.picks)].filter(Boolean).join(" · ")}
                  options={m.q.options}
                  correctAnswer={m.q.answer}
                  revealAnswer
                  optionPicks={m.picks}
                  renderFooter={() => (
                    <div className="pt-1 px-1 space-y-1.5">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {student.name}: missed {m.missed} of {m.answered} {m.answered === 1 ? "try" : "tries"}
. {groupName}: {m.q.answered - m.q.missed} of {m.q.answered} right.
                      </p>
                      {untrackedNote(m.picks, m.missed) && <p className="text-xs text-gray-500 dark:text-gray-400">{untrackedNote(m.picks, m.missed)}</p>}
                      {m.q.explanation && <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{m.q.explanation}</p>}
                    </div>
                  )}
                />
              ))}
            </div>
            {missed.length > MISSED_SHOWN && (
              <button type="button" onClick={() => setShowAll((s) => !s)} className="mt-3 text-sm underline text-gray-700 dark:text-gray-200">
                {showAll ? "Show fewer" : `Show all ${missed.length}`}
              </button>
            )}
          </>
        )}
        {unlisted > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {unlisted} {unlisted === 1 ? "miss isn't" : "misses aren't"} listed: a bug before Oct 19 dropped them. They come back the next time {student.name} opens
            this test on the device they joined on.
          </p>
        )}
      </div>

      {detail.tests.length > 0 && (
        <div>
          <h3 className={section}>Practice tests</h3>
          <div className="flex flex-wrap gap-2">
            {detail.tests.map((t) => (
              <span key={t.testNumber} className={`rounded-sm px-2 py-1 text-xs font-medium ${scoreChip(scoreLevel(t.best, pass))}`}>
                Test {t.testNumber} · best {t.best}%{t.attempts > 1 ? ` · ${t.attempts} tries` : ""}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
