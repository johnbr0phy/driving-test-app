"use client";

import { useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { CARD, ROW, STICKY_COL, TabHeader, TableScroll, fmtUpdated } from "@/components/admin/AdminTabParts";
import type { QuizAdminPayload, QuizAdminQuiz } from "@/lib/server/quizAdmin";

// The Quizzes tab body on /admin, given the API payload: is Make a quiz
// working? Connector sign-ins, quizzes made, who plays them, and every quiz
// and creator. Kept apart from the page so it renders without an admin session.

// Same validated palette as the Growth and Teachers tabs.
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

const SOURCE_LABELS: Record<string, string> = { mcp: "Claude / ChatGPT", web: "Typed on /create", import: "Quizlet import" };
const VISIBILITY_LABELS: Record<string, string> = { link: "Everyone with the link", public: "Public (library)", private: "Only me", class: "My class" };

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

function Bars({ rows }: { rows: { label: string; value: number; light?: boolean; note?: string }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[minmax(0,10rem)_1fr_auto] sm:grid-cols-[12rem_1fr_7rem] items-center gap-3">
          <p className="text-sm truncate">{r.label}</p>
          <div className="h-5 rounded bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div className="h-full rounded" style={{ width: `${(r.value / max) * 100}%`, background: r.light ? BLUE_LIGHT : BLUE }} />
          </div>
          <p className="text-sm tabular-nums text-right">
            {fmtInt(r.value)}
            {r.note && <span className="text-[11px] text-gray-500 dark:text-gray-400"> · {r.note}</span>}
          </p>
        </div>
      ))}
    </div>
  );
}

function Connector({ data }: { data: QuizAdminPayload }) {
  const c = data.connector;
  return (
    <Card title="Connector to quiz" subtitle="Accounts that connected Claude or ChatGPT to TigerTest">
      <Bars
        rows={[
          { label: "Connected an assistant", value: c.accounts, note: `${fmtInt(c.last30)} in 30 days` },
          { label: "Then made a quiz", value: c.madeQuiz, light: true, note: fmtPct(c.madeQuiz, c.accounts) },
        ]}
      />
      {c.byClient.length > 0 && (
        <TableScroll className="mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className={`${ROW} text-left text-xs text-gray-500 dark:text-gray-400`}>
                <th className={`font-normal py-1.5 pr-3 ${STICKY_COL}`}>Assistant</th>
                <th className="font-normal py-1.5 px-3 text-right">Connected</th>
                <th className="font-normal py-1.5 pl-3 text-right">Made a quiz</th>
              </tr>
            </thead>
            <tbody>
              {c.byClient.map((r) => (
                <tr key={r.client} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                  <td className={`py-1.5 pr-3 ${STICKY_COL}`}>{r.client}</td>
                  <td className="py-1.5 px-3 text-right tabular-nums">{fmtInt(r.accounts)}</td>
                  <td className="py-1.5 pl-3 text-right tabular-nums">
                    {fmtInt(r.madeQuiz)} <span className="text-[11px] text-gray-500 dark:text-gray-400">{fmtPct(r.madeQuiz, r.accounts)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      )}
      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-4">
        From the connector&apos;s sign-in tokens, first connection per account, internal accounts excluded. Connecting is also used to practice tests, so not every
        connected account came to make a quiz. Tokens last 30 days, so an account that connected long ago and never came back may have dropped out.
      </p>
    </Card>
  );
}

function Mix({ data }: { data: QuizAdminPayload }) {
  const n = data.totals.quizzes;
  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 mb-4 sm:mb-6">
      <section className={`text-gray-900 dark:text-gray-50 ${CARD}`}>
        <h2 className="text-sm font-semibold mb-4">How they were made</h2>
        <Bars rows={(["mcp", "web", "import"] as const).map((k) => ({ label: SOURCE_LABELS[k], value: data.bySource[k], note: fmtPct(data.bySource[k], n) }))} />
      </section>
      <section className={`text-gray-900 dark:text-gray-50 ${CARD}`}>
        <h2 className="text-sm font-semibold mb-4">Who can play</h2>
        <Bars rows={(["link", "public", "class", "private"] as const).map((k) => ({ label: VISIBILITY_LABELS[k], value: data.byVisibility[k], note: fmtPct(data.byVisibility[k], n) }))} />
      </section>
    </div>
  );
}

function Weeks({ weeks }: { weeks: QuizAdminPayload["weeks"] }) {
  return (
    <Card title="By week" subtitle="Weeks start Monday (UTC)">
      <TableScroll>
        <table className="w-full text-sm">
          <thead>
            <tr className={`${ROW} text-left text-xs text-gray-500 dark:text-gray-400`}>
              <th className={`font-normal py-1.5 pr-3 ${STICKY_COL}`}>Week of</th>
              <th className="font-normal py-1.5 px-3 text-right">Connected</th>
              <th className="font-normal py-1.5 px-3 text-right">Quizzes made</th>
              <th className="font-normal py-1.5 px-3 text-right">From an assistant</th>
              <th className="font-normal py-1.5 pl-3 text-right">New creators</th>
            </tr>
          </thead>
          <tbody>
            {[...weeks].reverse().map((w) => (
              <tr key={w.start} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                <td className={`py-1.5 pr-3 whitespace-nowrap ${STICKY_COL}`}>{fmtDay(w.start)}</td>
                <td className="py-1.5 px-3 text-right tabular-nums">{fmtInt(w.connections)}</td>
                <td className="py-1.5 px-3 text-right tabular-nums">{fmtInt(w.quizzes)}</td>
                <td className="py-1.5 px-3 text-right tabular-nums">{fmtInt(w.mcp)}</td>
                <td className="py-1.5 pl-3 text-right tabular-nums">{fmtInt(w.newCreators)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
    </Card>
  );
}

// A site admin can feature a public quiz so the library lists it before it
// has enough plays (PATCH /api/quizzes/[code] accepts `featured` from an admin).
function FeatureButton({ quiz, onChange }: { quiz: QuizAdminQuiz; onChange: (featured: boolean) => void }) {
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  if (quiz.visibility !== "public") return null;
  const toggle = async () => {
    setBusy(true);
    try {
      const token = await user?.getIdToken();
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`/api/quizzes/${quiz.code}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !quiz.featured }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || `API error ${res.status}`);
      onChange(!quiz.featured);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not update the quiz");
    } finally {
      setBusy(false);
    }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      title={quiz.featured ? "Featured in the library. Click to unfeature." : "Feature in the library"}
      className={`inline-flex items-center gap-1 text-[11px] rounded-md px-1.5 py-0.5 border disabled:opacity-50 ${
        quiz.featured
          ? "border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
          : "border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
      }`}
    >
      <Star className={`h-3 w-3 ${quiz.featured ? "fill-current" : ""}`} />
      {quiz.featured ? "Featured" : "Feature"}
    </button>
  );
}

type QuizFilter = "all" | "mcp" | "played" | "reported";

function Quizzes({ quizzes, onFeatured }: { quizzes: QuizAdminQuiz[]; onFeatured: (code: string, featured: boolean) => void }) {
  const [filter, setFilter] = useState<QuizFilter>("all");
  const shown = quizzes.filter((q) =>
    filter === "mcp" ? q.createdVia === "mcp" : filter === "played" ? q.plays > 0 : filter === "reported" ? q.reports > 0 : true,
  );
  const labels: Record<QuizFilter, string> = { all: "All", mcp: "From an assistant", played: "Played", reported: "Reported" };
  return (
    <Card
      title={`Every quiz (${fmtInt(shown.length)})`}
      subtitle={
        <div className="flex flex-wrap items-center gap-1">
          {(Object.keys(labels) as QuizFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-2 py-0.5 rounded-md ${filter === f ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              {labels[f]}
            </button>
          ))}
        </div>
      }
    >
      {shown.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No quizzes here yet.</p>
      ) : (
        <TableScroll>
          <table className="w-full text-sm">
            <thead>
              <tr className={`${ROW} text-left text-xs text-gray-500 dark:text-gray-400`}>
                <th className={`font-normal py-1.5 pr-3 ${STICKY_COL}`}>Quiz</th>
                <th className="font-normal py-1.5 px-3">Creator</th>
                <th className="font-normal py-1.5 px-3">Made with</th>
                <th className="font-normal py-1.5 px-3">Who can play</th>
                <th className="font-normal py-1.5 px-3 text-right">Questions</th>
                <th className="font-normal py-1.5 px-3 text-right" title="Browsers that answered at least one question">Plays</th>
                <th className="font-normal py-1.5 px-3 text-right" title="Players who gave a name">Players</th>
                <th className="font-normal py-1.5 px-3 text-right" title="Named players' answers and accuracy">Answers</th>
                <th className="font-normal py-1.5 px-3 text-right">Reports</th>
                <th className="font-normal py-1.5 pl-3 text-right">Made</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((q) => (
                <tr key={q.code} className={`${ROW} border-t border-gray-100 dark:border-gray-800 align-top`}>
                  <td className={`py-2 pr-3 ${STICKY_COL}`}>
                    <a href={`/q/${q.code}`} target="_blank" rel="noreferrer" title={q.title} className="font-medium hover:underline flex items-center gap-1 w-[13rem] sm:w-[20rem]">
                      <span className="truncate min-w-0">{q.title}</span>
                      <ExternalLink className="h-3 w-3 shrink-0 text-gray-400" />
                    </a>
                    <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                      <span className="font-mono">{q.code}</span>
                      <a href={`/q/${q.code}/report`} target="_blank" rel="noreferrer" className="hover:underline">report</a>
                      {q.listed && <span className="text-green-700 dark:text-green-300">in library</span>}
                      <FeatureButton quiz={q} onChange={(f) => onFeatured(q.code, f)} />
                    </div>
                    {q.topics.length > 0 && (
                      <p className="mt-0.5 text-[11px] text-gray-400 truncate w-[13rem] sm:w-[20rem]" title={q.topics.join(", ")}>{q.topics.join(", ")}</p>
                    )}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    <p>
                      {q.ownerName}
                      {q.ownerPremium && <span className="ml-1 text-[11px] text-amber-700 dark:text-amber-300">Premium</span>}
                    </p>
                    {q.ownerEmail && (
                      <a href={`mailto:${q.ownerEmail}`} className="text-[11px] text-gray-500 dark:text-gray-400 hover:underline">{q.ownerEmail}</a>
                    )}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap">{SOURCE_LABELS[q.createdVia] ?? q.createdVia}</td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    {VISIBILITY_LABELS[q.visibility] ?? q.visibility}
                    {q.className && <p className="text-[11px] text-gray-500 dark:text-gray-400">{q.className}</p>}
                  </td>
                  <td className="py-2 px-3 text-right tabular-nums">{fmtInt(q.questions)}</td>
                  <td className="py-2 px-3 text-right tabular-nums">{fmtInt(q.plays)}</td>
                  <td className="py-2 px-3 text-right tabular-nums whitespace-nowrap">
                    {fmtInt(q.members)}
                    {q.activeThisWeek > 0 && <p className="text-[11px] text-gray-500 dark:text-gray-400">{fmtInt(q.activeThisWeek)} this week</p>}
                  </td>
                  <td className="py-2 px-3 text-right tabular-nums whitespace-nowrap">
                    {fmtInt(q.answered)}
                    {q.answered > 0 && <p className="text-[11px] text-gray-500 dark:text-gray-400">{fmtPct(q.correct, q.answered)} right</p>}
                  </td>
                  <td className={`py-2 px-3 text-right tabular-nums ${q.reports > 0 ? "text-red-600 dark:text-red-400 font-medium" : ""}`}>{fmtInt(q.reports)}</td>
                  <td className="py-2 pl-3 text-right whitespace-nowrap">
                    {ago(q.createdAt)}
                    {q.lastPlayerActiveAt && <p className="text-[11px] text-gray-500 dark:text-gray-400">played {ago(q.lastPlayerActiveAt)}</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      )}
    </Card>
  );
}

function Creators({ creators }: { creators: QuizAdminPayload["creators"] }) {
  if (!creators.length) return null;
  return (
    <Card title={`Creators (${fmtInt(creators.length)})`} subtitle="Most quizzes first">
      <TableScroll>
        <table className="w-full text-sm">
          <thead>
            <tr className={`${ROW} text-left text-xs text-gray-500 dark:text-gray-400`}>
              <th className={`font-normal py-1.5 pr-3 ${STICKY_COL}`}>Creator</th>
              <th className="font-normal py-1.5 px-3">Connected</th>
              <th className="font-normal py-1.5 px-3 text-right">Quizzes</th>
              <th className="font-normal py-1.5 px-3 text-right">Questions</th>
              <th className="font-normal py-1.5 px-3 text-right">Plays</th>
              <th className="font-normal py-1.5 px-3 text-right">Players</th>
              <th className="font-normal py-1.5 pl-3 text-right">Last quiz</th>
            </tr>
          </thead>
          <tbody>
            {creators.map((c) => (
              <tr key={c.uid} className={`${ROW} border-t border-gray-100 dark:border-gray-800 align-top`}>
                <td className={`py-2 pr-3 whitespace-nowrap ${STICKY_COL}`}>
                  <p>
                    {c.name}
                    {c.premium && <span className="ml-1 text-[11px] text-amber-700 dark:text-amber-300">Premium</span>}
                  </p>
                  {c.email && <a href={`mailto:${c.email}`} className="text-[11px] text-gray-500 dark:text-gray-400 hover:underline">{c.email}</a>}
                </td>
                <td className="py-2 px-3 whitespace-nowrap">{c.connector ?? <span className="text-gray-400">no</span>}</td>
                <td className="py-2 px-3 text-right tabular-nums">{fmtInt(c.quizzes)}</td>
                <td className="py-2 px-3 text-right tabular-nums">{fmtInt(c.questions)}</td>
                <td className="py-2 px-3 text-right tabular-nums">{fmtInt(c.plays)}</td>
                <td className="py-2 px-3 text-right tabular-nums">{fmtInt(c.members)}</td>
                <td className="py-2 pl-3 text-right whitespace-nowrap">{ago(c.lastQuizAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
    </Card>
  );
}

export function QuizAdminView({ data, onRefresh, refreshing, updating }: {
  data: QuizAdminPayload;
  onRefresh: () => void;
  refreshing: boolean;
  updating: boolean;
}) {
  // Featuring a quiz updates the row here at once; the payload catches up on the next load.
  const [featured, setFeatured] = useState<Record<string, boolean>>({});
  const quizzes = data.quizzes.map((q) => (q.code in featured ? { ...q, featured: featured[q.code], listed: q.visibility === "public" && (featured[q.code] || q.listed) } : q));
  const t = data.totals;
  const c = data.counters;
  return (
    <div>
      <TabHeader
        subtitle={
          <>
            Updated {fmtUpdated(data.generatedAt)}
            {t.internalQuizzesHidden > 0 && <> · {fmtInt(t.internalQuizzesHidden)} internal {t.internalQuizzesHidden === 1 ? "quiz" : "quizzes"} hidden</>}
          </>
        }
        onRefresh={onRefresh}
        refreshing={refreshing}
        updating={updating}
      />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Tile label="Quizzes" value={fmtInt(t.quizzes)} sub={`${fmtInt(t.madeThisWeek)} this week`} />
        <Tile label="Creators" value={fmtInt(t.creators)} sub={`${fmtInt(t.repeatCreators)} made more than one`} />
        <Tile label="Questions" value={fmtInt(t.questions)} sub={t.quizzes ? `${Math.round(t.questions / t.quizzes)} per quiz` : "none yet"} />
        <Tile label="Plays" value={fmtInt(t.plays)} sub={`${fmtInt(t.playedQuizzes)} quizzes played`} />
        <Tile label="Named players" value={fmtInt(t.members)} sub={`${fmtInt(t.answered)} answers`} />
        <Tile label="In the library" value={fmtInt(t.listed)} sub={`${fmtInt(t.reports)} question reports`} />
      </div>

      <Connector data={data} />
      <Mix data={data} />
      <Weeks weeks={data.weeks} />
      <Quizzes quizzes={quizzes} onFeatured={(code, f) => setFeatured((s) => ({ ...s, [code]: f }))} />
      <Creators creators={data.creators} />

      <p className="text-[11px] text-gray-500 dark:text-gray-400">
        Everything above leaves out quizzes made by internal accounts. The site-wide counters, which include them and count deleted quizzes too: {fmtInt(c.createdMcp + c.createdWeb + c.createdImport)} quizzes
        made ({fmtInt(c.createdMcp)} from an assistant, {fmtInt(c.createdWeb)} typed, {fmtInt(c.createdImport)} imported), {fmtInt(c.plays)} plays, {fmtInt(c.questionReports)} question reports.
      </p>
    </div>
  );
}
