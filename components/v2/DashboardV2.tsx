"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Smartphone, Monitor, Play, RotateCcw } from "lucide-react";
import { ExamV2Config } from "@/lib/v2/types";
import { getBank } from "@/lib/v2/bank";
import { stagesOf, v2Routes } from "@/lib/v2/registry";
import { sessionKey } from "@/lib/v2/session";
import { drillKey, drillQuestions, EMPTY_DRILL } from "@/lib/v2/training";
import { useV2Store, resultsForExam } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";

export function DashboardV2({ exam }: { exam: ExamV2Config }) {
  const routes = v2Routes(exam);
  const hydrated = useHydration();
  const sessions = useV2Store((s) => s.sessions);
  const results = useV2Store((s) => s.results);
  const drills = useV2Store((s) => s.drills);
  const goal = useV2Store((s) => s.goals[exam.id]) ?? exam.defaultGoal;
  const setGoal = useV2Store((s) => s.setGoal);
  const removeSession = useV2Store((s) => s.removeSession);
  const bank = useMemo(() => getBank(exam.id).questions, [exam.id]);
  const stageDefs = stagesOf(exam);
  const history = useMemo(() => resultsForExam(results, exam.id), [results, exam.id]);
  const best = history.length ? Math.max(...history.map((r) => r.composite)) : null;
  const latest = history[0];

  const totalMinutes = Math.round(exam.sections.reduce((a, s) => a + s.modules.reduce((b, m) => b + m.timeLimit, 0), 0) / 60);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black md:text-3xl">{exam.name}</h1>
          <p className="mt-1 text-gray-600">{exam.tagline}</p>
        </div>
        <label className="text-sm">
          <span className="mr-2 font-semibold text-gray-700">Goal</span>
          <select value={goal} onChange={(e) => setGoal(exam.id, Number(e.target.value))} className="v2-tap rounded-lg border border-gray-300 bg-white px-3 font-bold">
            {exam.goalChoices.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </label>
      </div>

      {hydrated && latest && (
        <div className="mt-5 grid grid-cols-3 gap-2 md:max-w-md">
          <Stat label="Latest" value={latest.composite} />
          <Stat label="Best" value={best ?? latest.composite} />
          <Stat label="Goal" value={goal} tone={best !== null && best >= goal ? "good" : "plain"} />
        </div>
      )}

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div className="text-sm"><span className="font-bold">Train on your phone.</span> Drills are one question at a time with instant feedback. Misses come back until you master them.</div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <Monitor className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div className="text-sm"><span className="font-bold">Test on a desktop.</span> Full-length, timed, adaptive, with the calculator and reference sheet. About {totalMinutes} minutes.</div>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-bold">Full-length practice tests</h2>
      <div className="mt-3 space-y-3">
        {exam.tests.map((t) => {
          const session = hydrated ? sessions[sessionKey(exam.id, t.number)] : undefined;
          const attempts = history.filter((r) => r.testNumber === t.number);
          const def = session ? stageDefs[session.stage] : undefined;
          return (
            <div key={t.number} className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-gray-600">
                    {session && def
                      ? `In progress · ${def.section.name}, module ${def.module.module}`
                      : attempts.length
                      ? `${attempts.length} attempt${attempts.length > 1 ? "s" : ""} · best ${Math.max(...attempts.map((a) => a.composite))}`
                      : `${exam.sections.map((s) => s.name).join(" + ")} · ${totalMinutes} min`}
                  </div>
                </div>
                <div className="flex gap-2">
                  {session && (
                    <button type="button" onClick={() => { if (window.confirm("Discard this in-progress test and start over?")) removeSession(session.key); }} className="v2-tap flex items-center gap-1 rounded-xl border-2 border-gray-300 bg-white px-3 text-sm font-semibold" aria-label="Start over">
                      <RotateCcw className="h-4 w-4" /> Start over
                    </button>
                  )}
                  {attempts.length > 0 && !session && (
                    <Link href={routes.results(t.number)} className="v2-tap flex items-center rounded-xl border-2 border-gray-300 bg-white px-3 text-sm font-semibold">Results</Link>
                  )}
                  <Link href={routes.test(t.number)} className="v2-tap flex items-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-bold text-white">
                    <Play className="h-4 w-4" /> {session ? "Resume" : attempts.length ? "Retake" : "Start"}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mt-8 text-lg font-bold">Drills by skill area</h2>
      <p className="mt-1 text-sm text-gray-600">Each drill is every question in that area, mastery-style. Built for your phone.</p>
      {exam.sections.map((section) => (
        <div key={section.key} className="mt-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">{section.name}</div>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {exam.drills.filter((d) => d.section === section.key).map((d) => {
              const qs = drillQuestions(bank, d);
              const st = (hydrated ? drills[drillKey(exam.id, d.key)] : undefined) ?? EMPTY_DRILL;
              const mastered = st.masteredIds.filter((id) => qs.some((q) => q.id === id)).length;
              const pct = qs.length ? Math.round((mastered / qs.length) * 100) : 0;
              return (
                <Link key={d.key} href={routes.drill(d.key)} className="v2-tap block rounded-2xl border border-gray-200 bg-white p-4 transition-colors active:bg-brand-light [@media(hover:hover)]:hover:border-brand">
                  <div className="flex items-center justify-between">
                    <div className="font-bold">{d.name}</div>
                    <div className="text-xs font-semibold tabular-nums text-gray-500">{mastered}/{qs.length}</div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{d.blurb}</p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className={`h-full rounded-full ${pct === 100 ? "bg-green-500" : "bg-brand"}`} style={{ width: `${pct}%` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      <p className="mt-10 text-xs text-gray-500">
        Original practice questions written to the {exam.fullName} specifications. Not affiliated with or endorsed by the test maker. Score estimates use a typical conversion and are not official.
      </p>
    </div>
  );
}

function Stat({ label, value, tone = "plain" }: { label: string; value: number; tone?: "plain" | "good" }) {
  return (
    <div className={`rounded-xl border p-3 ${tone === "good" ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"}`}>
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</div>
      <div className="text-2xl font-black tabular-nums">{value}</div>
    </div>
  );
}
