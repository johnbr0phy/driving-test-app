"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CARD, TabError, TabHeader, TabLoading, fmtUpdated, useAdminFetch } from "@/components/admin/AdminTabParts";
import type { QuestionHealthPayload } from "@/lib/server/questionHealth";
import { REPORT_REASONS } from "@/lib/questionQuality";

// Question quality on one page: what the weekly Claude audit found, what
// people reported, what the nightly pick statistics flag, which official
// pages changed and which dated exam changes are due. Data from
// /api/admin/questions (lib/server/questionHealth.ts).

type Text = { question: string; options: string[]; answer: string; explanation: string } | undefined;

const REASON_LABEL: Record<string, string> = Object.fromEntries(REPORT_REASONS.map((r) => [r.value, r.label]));
const KIND_LABEL: Record<string, string> = {
  keySuspect: "Key suspect",
  splitAnswer: "Split answer",
  reported: "Reported",
};
const KIND_STYLE: Record<string, string> = {
  keySuspect: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  splitAnswer: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  reported: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
};
const VERDICT_STYLE: Record<string, string> = {
  wrong_key: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  ambiguous: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  outdated: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
  unclear: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  typo: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

function Pill({ className, children }: { className: string; children: React.ReactNode }) {
  return <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${className}`}>{children}</span>;
}

const VERDICT_LABEL: Record<string, string> = {
  ok: "key is right",
  wrong_key: "wrong key",
  ambiguous: "two defensible answers",
  outdated: "out of date",
  unclear: "unclear wording",
  typo: "typo",
};

/** What the audit decided about a flagged or reported question. */
function ReviewLine({ review }: { review?: { at: string; verdict: string; confidence: string; reason: string } }) {
  if (!review) return <p className="mt-2 text-xs text-gray-400">Not checked yet: the audit reads it tomorrow morning.</p>;
  const ok = review.verdict === "ok";
  return (
    <p className={`mt-2 text-sm ${ok ? "text-gray-700 dark:text-gray-200" : "text-red-700 dark:text-red-300"}`}>
      <span className="font-semibold">
        Audit {fmtUpdated(review.at)}: {VERDICT_LABEL[review.verdict] ?? review.verdict} ({review.confidence} confidence).{" "}
      </span>
      {review.reason}
    </p>
  );
}

function QuestionText({ text, highlight, highlightLabel = "most picked wrong" }: { text: Text; highlight?: number | null; highlightLabel?: string }) {
  if (!text) return <p className="text-xs text-gray-400">Question text not found (retired id or a bank this page does not load).</p>;
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
                  : highlight === i
                    ? "text-red-700 dark:text-red-300"
                    : "text-gray-600 dark:text-gray-300"
              }
            >
              {"ABCDEF"[i]}) {o}
              {o === text.answer && " ✓ key"}
              {highlight === i && o !== text.answer && ` ← ${highlightLabel}`}
            </li>
          ))}
        </ol>
      )}
      {!text.options.length && text.answer && <p className="mt-1 text-green-700 dark:text-green-300">Answer: {text.answer}</p>}
      {text.explanation && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{text.explanation}</p>}
    </div>
  );
}

function Tile({ label, value, tone }: { label: string; value: number | string; tone?: "bad" | "warn" }) {
  const color = tone === "bad" ? "text-red-600 dark:text-red-400" : tone === "warn" ? "text-amber-600 dark:text-amber-400" : "text-gray-900 dark:text-gray-50";
  return (
    <div className={CARD}>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
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
  const [showAllFlags, setShowAllFlags] = useState(false);

  if (loading) return <TabLoading />;
  if (error || !data) return <TabError message={error || "Failed to load"} />;

  const act = async (kind: "report" | "finding" | "source" | "flag", ids: string[], status?: string, n?: number) => {
    setBusy(ids[0]);
    try {
      const token = await user?.getIdToken();
      const res = await fetch("/api/admin/questions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ kind, ids, status, n }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setData((d) => {
        if (!d) return d;
        const gone = new Set(ids);
        if (kind === "report") return { ...d, reports: d.reports.filter((r) => !gone.has(r.id)) };
        if (kind === "finding") return { ...d, findings: d.findings.filter((f) => !gone.has(f.id)) };
        if (kind === "flag") {
          const hit = d.flags.filter((f) => gone.has(`${f.examId}|${f.questionId}`) && !f.cleared).length;
          return { ...d, totalFlags: d.totalFlags - hit, clearedFlags: d.clearedFlags + hit, flags: d.flags.map((f) => (gone.has(`${f.examId}|${f.questionId}`) ? { ...f, cleared: true } : f)) };
        }
        return { ...d, sources: d.sources.filter((s) => !gone.has(s.id)) };
      });
    } catch {
      alert("Could not save. Try again.");
    } finally {
      setBusy(null);
    }
  };

  const changedSources = data.sources.filter((s) => s.changed);
  const brokenSources = data.sources.filter((s) => !s.changed && s.failures >= 2);
  const due = data.freshness.filter((f) => f.state === "due");
  const soon = data.freshness.filter((f) => f.state === "soon");
  const openFlags = data.flags.filter((f) => !f.cleared);
  const clearedFlags = data.flags.filter((f) => f.cleared);
  const flags = showAllFlags ? openFlags : openFlags.slice(0, 40);
  const flagRow = (f: (typeof data.flags)[number]) => (
    <li key={`${f.examId}|${f.questionId}`} className="py-3">
      <div className="flex flex-wrap items-center gap-2">
        {f.kinds.map((k) => (
          <Pill key={k} className={f.cleared ? VERDICT_STYLE.typo : KIND_STYLE[k]}>{KIND_LABEL[k] ?? k}</Pill>
        ))}
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {f.examId} · {f.questionId} · {f.n} answers, {f.correctPct}% right
          {f.strongCorrectPct !== null && ` · strong ${f.strongCorrectPct}% of ${f.strongN}`}
          {f.topWrong !== null && ` · top wrong ${"ABCDEF"[f.topWrong]} ${f.topWrongPct}%`}
          {f.reports > 0 && ` · ${f.reports} reports`}
        </span>
        {!f.cleared && !f.kinds.includes("reported") && (
          <span className="ml-auto">
            <ActionButton busy={busy === `${f.examId}|${f.questionId}`} onClick={() => act("flag", [`${f.examId}|${f.questionId}`], undefined, f.n)}>Key is right</ActionButton>
          </span>
        )}
      </div>
      <QuestionText text={f.text} highlight={f.topWrong} />
      <ReviewLine review={f.review} />
    </li>
  );
  const totalAnswers = Object.values(data.answeredByExam).reduce((s, e) => s + e.answers, 0);

  return (
    <div className="space-y-6">
      <TabHeader
        subtitle={
          <>
            Flags {data.flagsUpdatedAt ? fmtUpdated(data.flagsUpdatedAt) : "not built yet (runs nightly at 03:40 UTC)"} · {totalAnswers.toLocaleString()} answers with picks recorded
          </>
        }
        onRefresh={() => reload(true)}
        refreshing={refreshing}
        updating={updating}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Tile label="Audit findings open" value={data.findings.length} tone={data.findings.length ? "bad" : undefined} />
        <Tile label="Reports open" value={data.reports.length} tone={data.reports.length ? "warn" : undefined} />
        <Tile label="Flags not cleared" value={data.totalFlags} tone={data.byKind.keySuspect ? "bad" : undefined} />
        <Tile label="Source pages changed" value={changedSources.length} tone={changedSources.length ? "warn" : undefined} />
        <Tile label="Exam changes due / in 60 days" value={`${due.length} / ${soon.length}`} tone={due.length ? "bad" : soon.length ? "warn" : undefined} />
        <Tile label="Exams due a yearly review" value={data.reviewDue.length} tone={data.reviewDue.length ? "warn" : undefined} />
      </div>

      <section className={CARD}>
        <h2 className="font-semibold">Audit findings</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          {data.lastAudit
            ? `Last audit ${fmtUpdated(data.lastAudit.at)}: ${data.lastAudit.checked} questions checked blind, ${data.lastAudit.disagreements} disagreed with the key, ${data.lastAudit.findings} confirmed. The GitHub Action opens a PR with fixes for these; merging it closes them here.`
            : "No audit has run yet. It runs from GitHub Actions (scripts/question-audit.ts): flags and reports daily, the full sweep on Mondays."}
        </p>
        {data.findings.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">Nothing open.</p>}
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.findings.map((f) => (
            <li key={f.id} className="py-3">
              <div className="flex flex-wrap items-center gap-2">
                <Pill className={VERDICT_STYLE[f.verdict] ?? VERDICT_STYLE.typo}>{f.verdict.replace("_", " ")}</Pill>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {f.examId} · {f.questionId} · {f.confidence} confidence · from {f.trigger.join(", ")}
                </span>
                <span className="ml-auto flex gap-2">
                  <ActionButton busy={busy === f.id} onClick={() => act("finding", [f.id], "fixed")}>Fixed</ActionButton>
                  <ActionButton busy={busy === f.id} onClick={() => act("finding", [f.id], "dismissed")}>Not a problem</ActionButton>
                </span>
              </div>
              <QuestionText text={f.text} />
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-200"><span className="font-semibold">Why: </span>{f.reason}</p>
              {f.fix && <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><span className="font-semibold">Fix: </span>{f.fix}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className={CARD}>
        <h2 className="font-semibold">Reports from students</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          {data.reportTotals.total} all time. Each is read by the audit the next morning and its verdict shown here; a confirmed problem also becomes a finding with a fix PR. Close them here once handled.
        </p>
        {data.reports.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">Nothing open.</p>}
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.reports.map((r) => (
            <li key={r.id} className="py-3">
              <div className="flex flex-wrap items-center gap-2">
                <Pill className={KIND_STYLE.reported}>{REASON_LABEL[r.reason] ?? r.reason}</Pill>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {r.examId} · {r.questionId} · {r.lang} · {fmtUpdated(r.createdAt)}
                </span>
                <span className="ml-auto flex gap-2">
                  <ActionButton busy={busy === r.id} onClick={() => act("report", [r.id], "fixed")}>Fixed</ActionButton>
                  <ActionButton busy={busy === r.id} onClick={() => act("report", [r.id], "dismissed")}>Dismiss</ActionButton>
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {r.email ? (
                  <>
                    From{" "}
                    <a href={`mailto:${r.email}?subject=${encodeURIComponent(`Your report on ${r.questionId}`)}`} className="underline">
                      {r.email}
                    </a>{" "}
                    ({r.uid ? "account" : "typed by a guest"})
                  </>
                ) : (
                  "Anonymous"
                )}
              </p>
              {r.note && <p className="mt-1 text-sm italic text-gray-700 dark:text-gray-200">&ldquo;{r.note}&rdquo;</p>}
              <QuestionText text={r.text} highlight={r.picked} highlightLabel="picked by reporter" />
              <ReviewLine review={r.review} />
            </li>
          ))}
        </ul>
      </section>

      <section className={CARD}>
        <h2 className="font-semibold">Flagged by answer statistics</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Key suspect: people who get most questions right pick one wrong option about as often as the key. Split answer: one wrong option draws nearly as many as the key. Needs 40 answers (12 from strong students for key suspect). A hard question can look the same, so the audit reads every new flag the next morning: a wrong key becomes a finding above with a fix PR, and a key it finds right is cleared below until the question&apos;s answers double.
          {" "}
          {Object.entries(data.byKind).map(([k, n]) => `${KIND_LABEL[k] ?? k} ${n}`).join(" · ")}
        </p>
        {openFlags.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">Nothing waiting. Flags appear as questions reach 40 answers.</p>}
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">{flags.map(flagRow)}</ul>
        {openFlags.length > 40 && (
          <button type="button" className="mt-2 text-xs underline text-gray-500" onClick={() => setShowAllFlags((v) => !v)}>
            {showAllFlags ? "Show fewer" : `Show all ${openFlags.length}`}
          </button>
        )}
        {data.clearedFlags > 0 && (
          <details className="mt-3">
            <summary className="text-xs text-gray-500 cursor-pointer">{data.clearedFlags} checked by the audit and found right (hard questions, not wrong keys)</summary>
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">{clearedFlags.map(flagRow)}</ul>
          </details>
        )}
      </section>

      <section className={CARD}>
        <h2 className="font-semibold">Official pages that changed</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          {data.sourcesWatched} pages from the banks&apos; sources.md files, each read weekly. A page shows here when 5% or more of its sentences changed. Read it, update the bank if the rule moved, then mark it reviewed.
        </p>
        {changedSources.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">No changes.</p>}
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          {changedSources.map((s) => (
            <li key={s.id} className="py-2 flex flex-wrap items-center gap-2 text-sm">
              <a href={s.url} target="_blank" rel="noreferrer" className="underline break-all text-gray-900 dark:text-gray-50">{s.url}</a>
              <span className="text-xs text-gray-500 dark:text-gray-400">{s.exams.join(", ")} · {Math.round(s.ratio * 100)}% changed · {s.changedAt ? fmtUpdated(s.changedAt) : ""}</span>
              <span className="ml-auto"><ActionButton busy={busy === s.id} onClick={() => act("source", [s.id])}>Reviewed</ActionButton></span>
            </li>
          ))}
        </ul>
        {brokenSources.length > 0 && (
          <details className="mt-3">
            <summary className="text-xs text-gray-500 cursor-pointer">{brokenSources.length} pages failed twice or more (moved, blocked or down): fix the URL in sources.md</summary>
            <ul className="mt-2 space-y-1 text-xs">
              {brokenSources.map((s) => (
                <li key={s.id} className="break-all">{s.url} <span className="text-gray-500">({s.exams.join(", ")}: {s.error})</span></li>
              ))}
            </ul>
          </details>
        )}
      </section>

      <section className={CARD}>
        <h2 className="font-semibold">Dated exam changes</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">From lib/examFreshness.json. Set <code>done</code> on an event once the bank is updated.</p>
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.freshness.filter((f) => f.state !== "done").map((f, i) => (
            <li key={i} className="py-2 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Pill className={f.state === "due" ? VERDICT_STYLE.wrong_key : f.state === "soon" ? VERDICT_STYLE.ambiguous : VERDICT_STYLE.typo}>
                  {f.state === "due" ? "Due" : f.state === "soon" ? "Soon" : "Later"}
                </Pill>
                <span className="font-medium">{f.exam}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{f.date} · {f.kind}</span>
              </div>
              <p className="mt-1 text-gray-700 dark:text-gray-200">{f.what}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{f.action} <a href={f.source} target="_blank" rel="noreferrer" className="underline">source</a></p>
            </li>
          ))}
        </ul>
        {data.reviewDue.length > 0 && (
          <details className="mt-3">
            <summary className="text-xs text-gray-500 cursor-pointer">{data.reviewDue.length} exams unchanged for over a year: due a full review</summary>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">{data.reviewDue.map((r) => `${r.exam} (${r.lastChanged})`).join(", ")}</p>
          </details>
        )}
      </section>
    </div>
  );
}
