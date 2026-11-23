"use client";

// A teacher's class: the link to post, class totals, the topics the class
// misses most, the most-missed questions and one row per student; a row
// opens what that student needs help with.

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Loader2, Pencil, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTeachCopy } from "@/components/teach/useTeachCopy";
import type { TeachCopy } from "@/components/teach/teachCopy";
import { classLink, teachFetch } from "@/lib/teachClient";
import { normalizeClassCode, type ClassReport, type ClassStudentRow } from "@/lib/classes";
import { ClassShare } from "@/components/teach/ClassShare";
import { ClassQuestions } from "@/components/teach/ClassQuestions";
import { StudentDetail } from "@/components/teach/StudentDetail";
import { ClassDetailsForm } from "@/components/teach/ClassDetailsForm";
import { DeleteClassButton } from "@/components/teach/DeleteClassButton";
import { scoreBar, scoreChip, scoreLevel, scoreTrack } from "@/components/teach/scoreColors";

function pct(correct: number, answered: number): number {
  return answered ? Math.round((correct / answered) * 100) : 0;
}

function ago(iso: string | null, c: TeachCopy): string {
  if (!iso) return c.notStarted;
  const days = Math.floor((Date.now() - Date.parse(iso)) / 86_400_000);
  if (days <= 0) return c.today;
  if (days === 1) return c.yesterday;
  return c.daysAgo(days);
}

const studentKey = (s: ClassStudentRow) => `${s.name}|${s.joinedAt}`;

export default function ClassPage() {
  const params = useParams();
  const router = useRouter();
  const code = normalizeClassCode(String(params.code ?? ""));
  const { user, loading } = useAuth();
  const c = useTeachCopy();
  const [report, setReport] = useState<ClassReport | null>(null);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  // By name and join time, so Refresh shows the open student's new numbers.
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setRefreshing(true);
    try {
      setReport(await teachFetch<ClassReport>(user, `/api/classes/${code}/report`));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : c.errLoad);
    } finally {
      setRefreshing(false);
    }
  }, [user, code, c]);

  useEffect(() => {
    if (!loading && !user) router.replace(`/login?redirect=/teach/classes/${code}`);
    else void load();
  }, [loading, user, router, code, load]);

  if (error && !report) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-950 px-4 py-12 text-center">
        <p className="text-gray-900 dark:text-gray-50 font-semibold mb-2">{error}</p>
        <Link href="/teach" className="text-sm underline text-gray-700 dark:text-gray-200">{c.yourClasses}</Link>
      </div>
    );
  }
  if (!report) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-950 px-4 py-16 flex flex-col items-center gap-3 text-sm text-gray-500 dark:text-gray-400" role="status">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" aria-hidden="true" />
        {c.loadingClass}
      </div>
    );
  }

  const accuracy = pct(report.correct, report.answered);
  const card = "rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5";
  const stat = "rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-3";

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <Link href="/teach" className="text-sm text-gray-600 dark:text-gray-300 underline">{c.yourClasses}</Link>
            {editing && user ? (
              <ClassDetailsForm
                user={user}
                code={code}
                details={{ name: report.name, teacherName: report.teacherName, school: report.school }}
                onSaved={(d) => { setReport({ ...report, ...d }); setEditing(false); }}
                onCancel={() => setEditing(false)}
              />
            ) : (
              <div className="mt-2 flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{report.name}</h1>
                <button type="button" onClick={() => setEditing(true)} aria-label={c.editDetailsAria} title={c.editDetailsTitle} className="rounded-md p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <Pencil className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {report.examName} · {c.students(report.memberCount)}
            </p>
            {!editing && (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {[report.teacherName, report.school].filter(Boolean).join(" · ")}
                {" "}
                <button type="button" onClick={() => setEditing(true)} className="underline text-gray-500 dark:text-gray-400">{c.editDetails}</button>
              </p>
            )}
          </div>
          <div className={`${card} w-full sm:w-auto`}>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{c.classLinkHint}</p>
            <p className="font-mono text-sm text-gray-900 dark:text-gray-50 mb-3 break-all">{classLink(code)}</p>
            <ClassShare code={code} className={report.name} examName={report.examName} />
          </div>
        </div>

        {report.memberCount === 0 ? (
          <div className={card}>
            <p className="font-semibold text-gray-900 dark:text-gray-50 mb-1">{c.noStudentsYet}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {c.noStudentsBody}
            </p>
            <div className="mt-3">
              <ClassShare code={code} className={report.name} examName={report.examName} showMessage />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className={stat}><p className="text-xs text-gray-600 dark:text-gray-300">{c.activeThisWeek}</p><p className="text-xl font-bold text-gray-900 dark:text-gray-50">{c.xOfY(report.activeThisWeek, report.memberCount)}</p></div>
              <div className={stat}><p className="text-xs text-gray-600 dark:text-gray-300">{c.questionsAnswered}</p><p className="text-xl font-bold text-gray-900 dark:text-gray-50">{report.answered.toLocaleString(c.locale)}</p></div>
              <div className={stat}><p className="text-xs text-gray-600 dark:text-gray-300">{c.classAccuracy}</p><p className="text-xl font-bold text-gray-900 dark:text-gray-50">{report.answered ? `${accuracy}%` : "-"}</p></div>
              <div className={stat}><p className="text-xs text-gray-600 dark:text-gray-300">{c.passedATest(report.passPct)}</p><p className="text-xl font-bold text-gray-900 dark:text-gray-50">{c.xOfY(report.passedATest, report.memberCount)}</p></div>
            </div>

            {report.topics.length > 0 && (
              <div className={card}>
                <h2 className="font-semibold text-gray-900 dark:text-gray-50 mb-1">{c.struggleTitle}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{c.struggleBody(report.passPct)}</p>
                <div className="space-y-2.5">
                  {report.topics.map((t) => {
                    const p = pct(t.correct, t.answered);
                    return (
                      <div key={t.key} className="grid grid-cols-[minmax(0,10rem)_1fr_3rem] sm:grid-cols-[minmax(0,14rem)_1fr_3rem] items-center gap-3 text-sm">
                        <span className="truncate text-gray-800 dark:text-gray-100" title={t.label}>{t.label}</span>
                        <div className={`h-2.5 rounded-sm ${scoreTrack}`} title={c.rightOfAnswered(t.correct, t.answered)}>
                          <div className={`h-2.5 rounded-sm ${scoreBar(scoreLevel(p, report.passPct))}`} style={{ width: `${p}%` }} />
                        </div>
                        <span className="text-right tabular-nums text-gray-800 dark:text-gray-100">{p}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {report.questions.length > 0 && <ClassQuestions questions={report.questions} />}

            <div className={`${card} relative overflow-x-auto`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-gray-50">{c.studentsTitle}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{c.studentsHint}</p>
                </div>
                <button type="button" onClick={() => void load()} className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300" disabled={refreshing}>
                  <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" /> {c.refresh}
                </button>
              </div>
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400">
                    <th scope="col" className="font-normal py-2">{c.colName}</th>
                    <th scope="col" className="font-normal">{c.colLastActive}</th>
                    <th scope="col" className="font-normal">{c.colAnswered}</th>
                    <th scope="col" className="font-normal">{c.colAccuracy}</th>
                    <th scope="col" className="font-normal">{c.colBestTest}</th>
                    <th scope="col" className="w-6"><span className="sr-only">{c.open}</span></th>
                  </tr>
                </thead>
                <tbody>
                  {report.students.map((s, i) => (
                    <tr
                      key={`${s.name}-${i}`}
                      onClick={() => setSelectedKey(studentKey(s))}
                      className="border-t border-gray-100 dark:border-gray-800 text-gray-900 dark:text-gray-50 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/60"
                    >
                      <td className="py-2.5 pr-3">
                        <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedKey(studentKey(s)); }} className="text-left font-medium underline-offset-2 hover:underline">
                          {s.name}
                        </button>
                      </td>
                      <td className="pr-3">{ago(s.lastActive, c)}</td>
                      <td className="pr-3 tabular-nums">{s.answered}</td>
                      <td className="pr-3 tabular-nums">{s.answered ? `${pct(s.correct, s.answered)}%` : "-"}</td>
                      <td>
                        {s.bestTest ? (
                          <span className={`rounded-sm px-2 py-0.5 text-xs font-medium ${scoreChip(s.bestTest.pct >= report.passPct ? "good" : "near")}`}>
                            {c.testPct(s.bestTest.testNumber, s.bestTest.pct)}
                          </span>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">{c.noTestYet}</span>
                        )}
                      </td>
                      <td className="text-gray-400"><ChevronRight className="w-4 h-4" aria-hidden="true" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <StudentDetail
              student={report.students.find((s) => studentKey(s) === selectedKey) ?? null}
              report={report}
              onClose={() => setSelectedKey(null)}
            />
          </>
        )}
        {user && <DeleteClassButton user={user} code={code} className={report.name} memberCount={report.memberCount} />}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {c.classFooter(code)}
        </p>
      </div>
    </div>
  );
}

