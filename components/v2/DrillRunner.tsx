"use client";

import { FocusMode } from "./FocusMode";

import { AccessibleOverlay } from "@/components/AccessibleOverlay";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { X, RotateCcw, Lock, BookOpen, Play } from "lucide-react";
import { ExamV2Config, AnswerValue, QuestionV2 } from "@/lib/v2/types";
import { getBank, getStimulus } from "@/lib/v2/bank";
import { v2Routes } from "@/lib/v2/registry";
import { drillKey, drillQuestions, drillStateFor, nextDrillQuestion, EMPTY_DRILL } from "@/lib/v2/training";
import { optionOrderFor } from "@/lib/v2/session";
import { isComplete, isCorrect } from "@/lib/v2/grading";
import { useV2Store } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { useSound } from "@/hooks/useSound";
import { getTigerAsset } from "@/lib/tigerAssets";
import { useIsPremium } from "@/hooks/useIsPremium";
import { useIsNativeApp } from "@/hooks/useIsNativeApp";
import { hasDrillProgress, isDrillLocked } from "@/lib/v2/premium";
import { matchBasicsSkill } from "@/lib/v2/skillMatch";
import { hasExplainer } from "@/lib/v2/explainer";
import { BasicsRuleSheet } from "./BasicsRuleSheet";
import { DrillLockScreen } from "./DrillLockScreen";
import { QuestionView } from "./QuestionView";
import { useV2Paywall, V2Paywall } from "./V2Paywall";

/**
 * Phone-first mastery drill: one question, one tap, instant feedback, big
 * Next button under the thumb. Wrong answers come back until mastered.
 */
export function DrillRunner({ exam, drillKeyParam }: { exam: ExamV2Config; drillKeyParam: string | null }) {
  const router = useRouter();
  const routes = v2Routes(exam);
  const hydrated = useHydration();
  const { playCorrectSound, playIncorrectSound } = useSound();
  const drill = exam.drills.find((d) => d.key === drillKeyParam);
  const key = drill ? drillKey(exam.id, drill.key) : "";
  const drillsMap = useV2Store((s) => s.drills);
  const answerDrill = useV2Store((s) => s.answerDrill);
  const resetDrill = useV2Store((s) => s.resetDrill);

  const allQuestions = useMemo(() => (drill ? drillQuestions(getBank(exam.id).questions, drill, exam) : []), [exam, drill]);
  const questions = allQuestions;
  // A Premium drill stays open for anyone already working in it (their own
  // saved progress, not progress carried over from a retired drill).
  const { isPremium, ready: premiumReady } = useIsPremium();
  const basicsMap = useV2Store((s) => s.basics);
  const locked = !!drill && premiumReady && isDrillLocked(exam, drill.key, isPremium) && !hasDrillProgress(drillsMap, basicsMap, exam, drill);
  // Free drills never wait on auth: only a Premium drill needs to know who's signed in.
  const gateReady = !drill || !exam.premium?.lockedDrills.includes(drill.key) || premiumReady;
  // Own progress, or what carried over from the drill this one was split from.
  const state = drill ? drillStateFor(drillsMap, exam.id, drill, allQuestions) : EMPTY_DRILL;
  const paywall = useV2Paywall(exam, "drill");
  const isNative = useIsNativeApp();

  // Close goes back to the dashboard, where the exam level was opened from.
  const backHref = routes.dashboard;

  const [question, setQuestion] = useState<QuestionV2 | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [answer, setAnswer] = useState<AnswerValue | undefined>(undefined);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  // The Basics rule sheet offered under a miss.
  const [brushUp, setBrushUp] = useState(false);
  const currentId = useRef<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hydrated && !drill) router.replace(routes.dashboard);
  }, [hydrated, drill, router, routes.dashboard]);

  const load = useCallback(() => {
    const fresh = drill ? drillStateFor(useV2Store.getState().drills, exam.id, drill, allQuestions) : EMPTY_DRILL;
    const next = nextDrillQuestion(questions, fresh, currentId.current);
    if (!next) {
      setDone(true);
      setQuestion(null);
      return;
    }
    currentId.current = next.id;
    setQuestion(next);
    setOrder(optionOrderFor(next));
    setAnswer(undefined);
    setRevealed(false);
    setBrushUp(false);
    setDone(false);
    scroller.current?.scrollTo({ top: 0 });
  }, [drill, exam.id, allQuestions, questions]);

  useEffect(() => {
    if (hydrated && drill && gateReady && !locked && !question && !done) load();
  }, [hydrated, drill, gateReady, locked, question, done, load]);

  const check = (value?: AnswerValue) => {
    if (!question || revealed) return;
    const final = value ?? answer;
    if (!isComplete(question, final)) return;
    setAnswer(final);
    const ok = isCorrect(question, final);
    setRevealed(true);
    answerDrill(key, question.id, ok, drill ? drillStateFor(useV2Store.getState().drills, exam.id, drill, allQuestions) : undefined);
    if (ok) playCorrectSound();
    else {
      playIncorrectSound();
      if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(40);
    }
  };

  const onAnswer = (value: AnswerValue) => {
    if (revealed) return;
    setAnswer(value);
    // One tap checks a single-choice item; every other format waits for Check.
    if (question?.format === "single") check(value);
  };

  if (!hydrated || !drill || !gateReady) {
    return <FocusMode className="v2-focus items-center justify-center text-gray-600 dark:text-gray-300">Loading...</FocusMode>;
  }

  if (locked) {
    return <DrillLockScreen exam={exam} drill={drill} detail={`${allQuestions.length} questions`} backHref={backHref} />;
  }

  const mastered = state.masteredIds.filter((id) => questions.some((q) => q.id === id)).length;
  const pct = questions.length ? Math.round((mastered / questions.length) * 100) : 0;
  // After a miss, the Basics skill the question was really about, if the drill has one for it.
  const missedSkill = question && revealed && !isCorrect(question, answer) ? matchBasicsSkill(question, drill) : null;

  return (
    <FocusMode className="v2-focus">
      <div className="v2-safe-top shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pb-2">
        <div className="flex items-center gap-2">
          <Link href={backHref} className="v2-tap -ml-1 flex w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400" aria-label="Back">
            <X className="h-5 w-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold">{drill.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{mastered} of {questions.length} mastered{state.wrongQueue.length ? ` · ${state.wrongQueue.length} to retry` : ""}</div>
          </div>
          <button type="button" onClick={() => setConfirmReset(true)} className="v2-tap flex w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400" aria-label="Reset this drill">
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="v2-scroll" ref={scroller}>
        <div className="mx-auto max-w-2xl px-4 py-4">
          {done ? (
            <div className="v2-pop rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 p-6 text-center">
              <Image src={getTigerAsset(exam.id, 1)} alt="" width={112} height={112} className="mx-auto h-28 w-28 object-contain" />
              <h2 className="mt-2 text-xl font-bold text-green-900 dark:text-green-200">Drill mastered</h2>
              <p className="mt-1 text-sm text-green-800 dark:text-green-300">Every {drill.name} question answered correctly. Take a full test to see it show up in your score.</p>
              <div className="mt-5 flex flex-col gap-2">
                <Link href={routes.dashboard} className="v2-tap flex items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">Back to dashboard</Link>
                <button type="button" onClick={() => { resetDrill(key); currentId.current = null; setDone(false); }} className="v2-tap rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-semibold">Run it again</button>
              </div>
            </div>
          ) : question ? (
            <QuestionView focusOnChange
              key={question.id}
              question={question}
              stimulus={getStimulus(exam.id, question)}
              optionOrder={order}
              answer={answer}
              onAnswer={onAnswer}
              reveal={revealed}
              disabled={revealed}
              layout="stack"
              label={`${exam.domainLabels[question.domain] ?? question.domain}${question.skill ? ` · ${question.skill}` : ""}`}
            />
          ) : null}
          {missedSkill && (
            <div className="v2-pop mt-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Brush up on the basics</div>
              <button type="button" onClick={() => setBrushUp(true)} className="v2-tap mt-1 flex w-full items-center gap-3 text-left">
                {hasExplainer(missedSkill) ? <Play className="h-5 w-5 shrink-0 text-brand" /> : <BookOpen className="h-5 w-5 shrink-0 text-brand" />}
                <span className="min-w-0 flex-1">
                  <span className="block text-[17px] font-bold text-gray-900 dark:text-gray-50">{missedSkill.name}</span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">{hasExplainer(missedSkill) ? "Listen to the 30-second explainer, or read the rule" : "The rule, the trick and two examples"}</span>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {!done && question && (
        <div className="v2-safe-bottom shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pt-3">
          <div className="mx-auto flex max-w-2xl gap-2">
            {revealed ? (
              <button type="button" onClick={load} className="v2-tap w-full rounded-xl bg-brand text-base font-bold text-white">Next</button>
            ) : question.format === "single" ? (
              <div className="v2-tap flex w-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">Tap an answer to check it</div>
            ) : (
              <button type="button" onClick={() => check()} disabled={!isComplete(question, answer)} className="v2-tap w-full rounded-xl bg-brand text-base font-bold text-white disabled:opacity-40">Check</button>
            )}
          </div>
        </div>
      )}

      <V2Paywall exam={exam} {...paywall.modalProps} />

      {missedSkill && <BasicsRuleSheet exam={exam} skill={missedSkill} open={brushUp} onClose={() => setBrushUp(false)} />}

      {confirmReset && (
        <AccessibleOverlay onClose={() => setConfirmReset(false)} aria-label="Reset this drill?" className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4" role="alertdialog">
          <div className="v2-pop w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 p-5 shadow-xl">
            <div className="text-lg font-bold">Reset this drill?</div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Mastery for {drill.name} starts over. Your test scores are not affected.</p>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => setConfirmReset(false)} className="v2-tap flex-1 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-sm font-semibold">Cancel</button>
              <button type="button" onClick={() => { resetDrill(key); setConfirmReset(false); currentId.current = null; setQuestion(null); setDone(false); }} className="v2-tap flex-1 rounded-xl bg-brand text-sm font-bold text-white">Reset</button>
            </div>
          </div>
        </AccessibleOverlay>
      )}
    </FocusMode>
  );
}
