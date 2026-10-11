"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { ExamV2Config } from "@/lib/v2/types";
import { getBank } from "@/lib/v2/bank";
import { getSectionV2, v2Routes } from "@/lib/v2/registry";
import { basicsFor, basicsKey } from "@/lib/v2/basics";
import { drillQuestions, drillStateFor, heldOutTests } from "@/lib/v2/training";
import { useV2Store } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { useIsPremium } from "@/hooks/useIsPremium";
import { hasDrillProgress, isDrillLocked } from "@/lib/v2/premium";
import { DrillLockScreen } from "./DrillLockScreen";

/**
 * Front door of a drill that has Basics: the skill list (level 1), then the
 * exam-level drill (level 2), which opens once every skill is learned or on
 * "skip ahead". Basics is free on every drill; only the exam level of a
 * Premium drill is gated, the same way DrillRunner gates it.
 */
export function DrillOverview({ exam, drillKeyParam }: { exam: ExamV2Config; drillKeyParam: string | null }) {
  const router = useRouter();
  const routes = v2Routes(exam);
  const hydrated = useHydration();
  const drill = exam.drills.find((d) => d.key === drillKeyParam);
  const skills = drill ? basicsFor(drill) : [];
  const basicsMap = useV2Store((s) => s.basics);
  const drillsMap = useV2Store((s) => s.drills);
  const { isPremium, ready: premiumReady } = useIsPremium();

  useEffect(() => {
    if (hydrated && !drill) router.replace(routes.dashboard);
  }, [hydrated, drill, router, routes.dashboard]);

  if (!hydrated || !drill) {
    return <div className="v2-focus items-center justify-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }

  const section = getSectionV2(exam, drill.section);
  const questions = drillQuestions(getBank(exam.id).questions, drill, heldOutTests(exam));
  const state = drillStateFor(drillsMap, exam.id, drill, questions);
  const mastered = state.masteredIds.filter((id) => questions.some((q) => q.id === id)).length;
  const learned = skills.filter((s) => basicsMap[basicsKey(exam.id, s.id)]?.done).length;
  const allLearned = learned === skills.length;
  const nextSkill = skills.find((s) => !basicsMap[basicsKey(exam.id, s.id)]?.done);
  const examHref = routes.drillQuestions(drill.key);
  // A Premium drill, Basics included, stays open only for anyone already in it.
  const premiumDrill = !!exam.premium?.lockedDrills.includes(drill.key);
  if (premiumDrill && !premiumReady) {
    return <div className="v2-focus items-center justify-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }
  if (isDrillLocked(exam, drill.key, isPremium) && !hasDrillProgress(drillsMap, basicsMap, exam, drill)) {
    return <DrillLockScreen exam={exam} drill={drill} detail={`${skills.length} Basics skills and ${questions.length} exam-level questions`} />;
  }

  const examButton = (label: string) => (
    <Link href={examHref} className="v2-tap flex items-center justify-center rounded-xl bg-brand text-base font-bold text-white">{label}</Link>
  );

  return (
    <div className="v2-focus">
      <div className="v2-safe-top shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pb-2">
        <div className="flex items-center gap-2">
          <Link href={routes.dashboard} className="v2-tap -ml-1 flex w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400" aria-label="Back to dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold">{drill.name}</div>
            <div className="truncate text-xs text-gray-500 dark:text-gray-400">{exam.shortName} · {section.name}</div>
          </div>
        </div>
      </div>

      <div className="v2-scroll">
        <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-5">
          <Stage number={1} done={allLearned} title="Basics" count={`${learned}/${skills.length}`} sub="Learn one rule, practice it right away. About 2 minutes per skill. Free." />
          <div className="flex flex-col gap-2">
            {skills.map((s) => {
              const done = !!basicsMap[basicsKey(exam.id, s.id)]?.done;
              const isNext = s.id === nextSkill?.id;
              return (
                <Link
                  key={s.id}
                  href={routes.basics(drill.key, s.id)}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 ${done ? "border-transparent bg-green-50 dark:bg-green-950" : isNext ? "border-brand bg-white dark:bg-gray-900" : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"}`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-bold text-gray-900 dark:text-gray-50">{s.name}</div>
                    <div className="text-[13px] text-gray-500 dark:text-gray-400">{s.sub}</div>
                  </div>
                  <div className={`shrink-0 text-xs font-bold ${done ? "text-green-700 dark:text-green-300" : "text-gray-500 dark:text-gray-400"}`}>{done ? "Learned ✓" : `${s.questions.length} quick Qs`}</div>
                </Link>
              );
            })}
          </div>

          <Stage
            number={2}
            done={questions.length > 0 && mastered === questions.length}
            muted={!allLearned}
            title="Exam level"
            lock={premiumDrill}
            sub={mastered ? `${mastered} of ${questions.length} mastered` : `${questions.length} real ${exam.shortName}-style questions${premiumDrill ? ". Premium." : "."}`}
          />
          <div className={`flex flex-col gap-2 rounded-xl border-2 p-4 ${allLearned ? "border-brand bg-brand-light" : "border-dashed border-gray-200 dark:border-gray-800"}`}>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {allLearned ? (mastered ? "Pick up where you left off." : "Basics done. You're ready for the real thing.") : mastered ? "Finish Basics to continue, or skip ahead." : "Opens when Basics is done."}
            </p>
            {!allLearned && <Link href={examHref} className="self-start text-sm font-semibold text-brand">Already know this? Skip to exam level</Link>}
          </div>
        </div>
      </div>

      <div className="v2-safe-bottom shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          {nextSkill ? (
            <Link href={routes.basics(drill.key, nextSkill.id)} className="v2-tap flex items-center justify-center rounded-xl bg-brand text-base font-bold text-white">
              {learned ? "Next skill" : "Start Basics"}: {nextSkill.name}
            </Link>
          ) : (
            examButton(mastered ? "Continue exam level" : "Start exam level")
          )}
        </div>
      </div>
    </div>
  );
}

function Stage({ number, done, muted = false, title, count, sub, lock = false }: { number: number; done: boolean; muted?: boolean; title: string; count?: string; sub: string; lock?: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${done ? "bg-green-600 text-white" : muted ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400" : "bg-brand text-white"}`}>
        {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : number}
      </span>
      <div className="min-w-0">
        <h2 className="flex items-center gap-1.5 text-[17px] font-bold text-gray-900 dark:text-gray-50">
          {title}
          {count && <span className="font-medium text-gray-500 dark:text-gray-400">· {count}</span>}
          {lock && <Lock className="h-4 w-4 text-gray-400" />}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{sub}</p>
      </div>
    </div>
  );
}
