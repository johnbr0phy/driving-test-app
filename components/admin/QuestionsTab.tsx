"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CARD, TabError, TabHeader, TabLoading, fmtUpdated, useAdminFetch } from "@/components/admin/AdminTabParts";
import type { QuestionHealthPayload } from "@/lib/server/questionHealth";
import { REPORT_REASONS } from "@/lib/questionQuality";

// "Report this question" reports from students, newest first, each with the
// question's text, the key marked and the option the reporter picked. Data
// from /api/admin/questions (lib/server/questionHealth.ts).

type Text = { question: string; options: string[]; answer: string; explanation: string } | undefined;

const REASON_LABEL: Record<string, string> = Object.fromEntries(REPORT_REASONS.map((r) => [r.value, r.label]));

function QuestionText({ text, picked }: { text: Text; picked?: number | null }) {
  if (!text) return <p className="mt-1 text-xs text-gray-400">Question text not found (retired id or a bank this page does not load).</p>;
  return (
    <div className="mt-2 text-sm">
      <p className="font-medium text-gray-900 dark:text-gray-50">{text.question}</p>
      {text.options.length > 0 && (
        <ol className="mt-1 space-y-0.5">
          {text.options.map((o, i) => (
            <li
              key={i}
              className={
                o === text.answer
                  ? "text-green-700 dark:text-green-300 font-semibold"
                  : picked === i
                    ? "text-red-700 dark:text-red-300"
                    : "text-gray-600 dark:text-gray-300"
              }
            >
              {"ABCDEF"[i]}) {o}
              {o === text.answer && " ✓ key"}
              {picked === i && o !== text.answer && " ← reporter picked"}
            </li>
          ))}
        </ol>
      )}
      {!text.options.length && text.answer && <p className="mt-1 text-green-700 dark:text-green-300">Answer: {text.answer}</p>}
      {text.explanation && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{text.explanation}</p>}
    </div>
  );
}

function ActionButton({ onClick, children, busy }: { onClick: () => void; children: React.ReactNode; busy?: boolean }) {
  return (
    <button
      type="button"
      disabled={busy}
      onClick={onClick}
      className="text-xs font-medium border border-gray-200 dark:border-gray-800 rounded-lg px-2.5 py-1 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function QuestionsTab() {
  const { user } = useAuth();
  const { data, setData, error, loading, refreshing, updating, reload } = useAdminFetch<QuestionHealthPayload>("/api/admin/questions");
  const [busy, setBusy] = useState<string | null>(null);

  if (loading) return <TabLoading />;
  if (error || !data) return <TabError message={error || "Failed to load"} />;

  const close = async (id: string, status: "fixed" | "dismissed") => {
    setBusy(id);
    try {
      const token = await user?.getIdToken();
      const res = await fetch("/api/admin/questions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ kind: "report", ids: [id], status }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setData((d) => (d ? { ...d, reports: d.reports.filter((r) => r.id !== id) } : d));
    } catch {
      alert("Could not save. Try again.");
    } finally {
      setBusy(null);
    }
  };

  const reasons = Object.entries(data.reportTotals.byReason)
    .map(([k, n]) => `${REASON_LABEL[k] ?? k} ${n}`)
    .join(" · ");

  return (
    <div className="space-y-6">
      <TabHeader
        subtitle={<>{data.reports.length} open · {data.reportTotals.total} reports all time{reasons ? ` · ${reasons}` : ""}</>}
        onRefresh={() => reload(true)}
        refreshing={refreshing}
        updating={updating}
      />
      <section className={CARD}>
        <h2 className="font-semibold">Reports from students</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          From &ldquo;Report this question&rdquo; under the explanation in training sets and drills. Students often report questions they simply got wrong, so check the rule before changing a key; fix the bank source (and any translated bank), then mark it fixed.
        </p>
        {data.reports.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">Nothing open.</p>}
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.reports.map((r) => (
            <li key={r.id} className="py-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {REASON_LABEL[r.reason] ?? r.reason}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {r.examId} · {r.questionId} · {r.lang} · {fmtUpdated(r.createdAt)}
                </span>
                <span className="ml-auto flex gap-2">
                  <ActionButton busy={busy === r.id} onClick={() => close(r.id, "fixed")}>Fixed</ActionButton>
                  <ActionButton busy={busy === r.id} onClick={() => close(r.id, "dismissed")}>Dismiss</ActionButton>
                </span>
              </div>
              {r.note && <p className="mt-1 text-sm italic text-gray-700 dark:text-gray-200">&ldquo;{r.note}&rdquo;</p>}
              <QuestionText text={r.text} picked={r.picked} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
