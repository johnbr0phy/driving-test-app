"use client";

// A teacher's class: the link to post, class totals, the topics the class
// misses most, the most-missed questions and one row per student; a row
// opens what that student needs help with.

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Check, ChevronRight, Copy, QrCode, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { classLink, classUrl, teachFetch } from "@/lib/teachClient";
import { normalizeClassCode, type ClassReport, type ClassStudentRow } from "@/lib/classes";
import { ClassQuestions } from "@/components/teach/ClassQuestions";
import { StudentDetail } from "@/components/teach/StudentDetail";
import { scoreBar, scoreChip, scoreLevel, scoreTrack } from "@/components/teach/scoreColors";

function pct(correct: number, answered: number): number {
  return answered ? Math.round((correct / answered) * 100) : 0;
}

function ago(iso: string | null): string {
  if (!iso) return "Not started";
  const days = Math.floor((Date.now() - Date.parse(iso)) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

const studentKey = (s: ClassStudentRow) => `${s.name}|${s.joinedAt}`;

export default function ClassPage() {
  const params = useParams();
  const router = useRouter();
  const code = normalizeClassCode(String(params.code ?? ""));
  const { user, loading } = useAuth();
  const [report, setReport] = useState<ClassReport | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // By name and join time, so Refresh shows the open student's new numbers.
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setRefreshing(true);
    try {
      setReport(await teachFetch<ClassReport>(user, `/api/classes/${code}/report`));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't load the class");
    } finally {
      setRefreshing(false);
    }
  }, [user, code]);

  useEffect(() => {
    if (!loading && !user) router.replace(`/login?redirect=/teach/classes/${code}`);
    else void load();
  }, [loading, user, router, code, load]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(classUrl(code));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the link is on screen to copy by hand.
    }
  };

  if (error && !report) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-950 px-4 py-12 text-center">
        <p className="text-gray-900 dark:text-gray-50 font-semibold mb-2">{error}</p>
        <Link href="/teach" className="text-sm underline text-gray-700 dark:text-gray-200">Your classes</Link>
      </div>
    );
  }
  if (!report) return <div className="flex-1 flex items-center justify-center py-24 bg-gray-50 dark:bg-gray-950"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" /></div>;

  const accuracy = pct(report.correct, report.answered);
  const card = "rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5";
  const stat = "rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-3";

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <Link href="/teach" className="text-sm text-gray-600 dark:text-gray-300 underline">Your classes</Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mt-2">{report.name}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {report.examName} · {report.memberCount} {report.memberCount === 1 ? "student" : "students"}
            </p>
          </div>
          <div className={`${card} w-full sm:w-auto`}>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Class link: post it in Canvas, Blackboard or an email</p>
            <p className="font-mono text-sm text-gray-900 dark:text-gray-50 mb-3 break-all">{classLink(code)}</p>
            <div className="flex gap-2">
              <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-sm text-gray-800 dark:text-gray-100">
                {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />} <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
              </button>
              <button type="button" onClick={() => setShowQr((s) => !s)} className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-sm text-gray-800 dark:text-gray-100">
                <QrCode className="w-4 h-4" aria-hidden="true" /> QR code
              </button>
            </div>
            {showQr && (
              <div className="mt-3 inline-block rounded-lg bg-white p-3">
                <QRCodeSVG value={classUrl(code)} size={160} title={`QR code for ${classLink(code)}`} />
              </div>
            )}
          </div>
        </div>

        {report.memberCount === 0 ? (
          <div className={card}>
            <p className="font-semibold text-gray-900 dark:text-gray-50 mb-1">No students yet</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Post the class link where your students will see it. They type their name and start practicing; nothing to install, no account. Each one shows up here as soon as they join.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className={stat}><p className="text-xs text-gray-600 dark:text-gray-300">Active this week</p><p className="text-xl font-bold text-gray-900 dark:text-gray-50">{report.activeThisWeek} of {report.memberCount}</p></div>
              <div className={stat}><p className="text-xs text-gray-600 dark:text-gray-300">Questions answered</p><p className="text-xl font-bold text-gray-900 dark:text-gray-50">{report.answered.toLocaleString("en-US")}</p></div>
              <div className={stat}><p className="text-xs text-gray-600 dark:text-gray-300">Class accuracy</p><p className="text-xl font-bold text-gray-900 dark:text-gray-50">{report.answered ? `${accuracy}%` : "-"}</p></div>
              <div className={stat}><p className="text-xs text-gray-600 dark:text-gray-300">Passed a practice test ({report.passPct}%+)</p><p className="text-xl font-bold text-gray-900 dark:text-gray-50">{report.passedATest} of {report.memberCount}</p></div>
            </div>

            {report.topics.length > 0 && (
              <div className={card}>
                <h2 className="font-semibold text-gray-900 dark:text-gray-50 mb-1">Where your class struggles</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Accuracy by topic, weakest first. Green is at or above the {report.passPct}% pass mark.</p>
                <div className="space-y-2.5">
                  {report.topics.map((t) => {
                    const p = pct(t.correct, t.answered);
                    return (
                      <div key={t.key} className="grid grid-cols-[minmax(0,10rem)_1fr_3rem] sm:grid-cols-[minmax(0,14rem)_1fr_3rem] items-center gap-3 text-sm">
                        <span className="truncate text-gray-800 dark:text-gray-100" title={t.label}>{t.label}</span>
                        <div className={`h-2.5 rounded-sm ${scoreTrack}`} title={`${t.correct} of ${t.answered} right`}>
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
                  <h2 className="font-semibold text-gray-900 dark:text-gray-50">Students</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Click a student to see what they need help with.</p>
                </div>
                <button type="button" onClick={() => void load()} className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300" disabled={refreshing}>
                  <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" /> Refresh
                </button>
              </div>
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400">
                    <th scope="col" className="font-normal py-2">Name</th>
                    <th scope="col" className="font-normal">Last active</th>
                    <th scope="col" className="font-normal">Answered</th>
                    <th scope="col" className="font-normal">Accuracy</th>
                    <th scope="col" className="font-normal">Best practice test</th>
                    <th scope="col" className="w-6"><span className="sr-only">Open</span></th>
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
                      <td className="pr-3">{ago(s.lastActive)}</td>
                      <td className="pr-3 tabular-nums">{s.answered}</td>
                      <td className="pr-3 tabular-nums">{s.answered ? `${pct(s.correct, s.answered)}%` : "-"}</td>
                      <td>
                        {s.bestTest ? (
                          <span className={`rounded-sm px-2 py-0.5 text-xs font-medium ${scoreChip(s.bestTest.pct >= report.passPct ? "good" : "near")}`}>
                            Test {s.bestTest.testNumber} · {s.bestTest.pct}%
                          </span>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">No test yet</span>
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
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Students join with a name only. Practice counts from the device they joined on. Class code {code}.
        </p>
      </div>
    </div>
  );
}

