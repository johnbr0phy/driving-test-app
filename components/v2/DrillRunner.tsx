"use client";

import { FocusMode } from "./FocusMode";

import { AccessibleOverlay } from "@/components/AccessibleOverlay";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FocusBar } from "@/components/FocusBar";
import { Card, CardContent } from "@/components/ui/card";
import { NextButton } from "@/components/question/NextButton";
import { RotateCcw, Lock, BookOpen, Play } from "lucide-react";
import { ExamV2Config, AnswerValue, QuestionV2 } from "@/lib/v2/types";
import { getBank, getStimulus } from "@/lib/v2/bank";
import { v2Routes } from "@/lib/v2/registry";
import { drillKey, drillQuestions, drillStateFor, nextDrillQuestion, EMPTY_DRILL } from "@/lib/v2/training";
import { optionOrderFor } from "@/lib/v2/session";
import { isComplete, isCorrect } from "@/lib/v2/grading";
import { useV2Store } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { useSound } from "@/hooks/useSound";
import { useIsPremium } from "@/hooks/useIsPremium";
import { useV2Premium } from "@/hooks/useV2Premium";
import { useIsNativeApp } from "@/hooks/useIsNativeApp";
import { hasDrillProgress, isDrillLocked } from "@/lib/v2/premium";
import { matchBasicsSkill } from "@/lib/v2/skillMatch";
import { hasExplainer } from "@/lib/v2/explainer";
import { BasicsRuleSheet } from "./BasicsRuleSheet";
import { DrillLockScreen } from "./DrillLockScreen";
import { Fireworks } from "@/components/Fireworks";
import { basicsDone, basicsFor } from "@/lib/v2/basics";
import { trackBasics } from "@/lib/v2/basicsTracking";
import { QuestionView } from "./QuestionView";
import { useV2Paywall, V2Paywall } from "./V2Paywall";
import { useAuth } from "@/contexts/AuthContext";
import { useGuestPrompt } from "@/hooks/useGuestPrompt";
import { GuestPromptStep } from "@/components/GuestPromptStep";
import { useSharePrompt } from "@/hooks/useSharePrompt";
import { SharePromptStep } from "@/components/SharePromptStep";
import { v2GuestAnswered } from "@/components/GuestSaveCard";
import { recordClassAnswerById, v2Pick } from "@/lib/classProgress";
import { ReportExamQuestion } from "@/components/ReportExamQuestion";
import { AchievementCelebration } from "@/components/AchievementCelebration";
import { useV2Ui } from "@/lib/v2/ui";

/**
 * Phone-first mastery drill: one question, one tap, instant feedback, big
 * Next button under the thumb. Wrong answers come back until mastered.
 */
export function DrillRunner({ exam, drillKeyParam }: { exam: ExamV2Config; drillKeyParam: string | null }) {
  const router = useRouter();
  const ui = useV2Ui();
  const t = ui.drill;
  const routes = v2Routes(exam);
  // Primary school exams get the warmer celebration copy.
  const childFriendly = exam.id === "timestables" || exam.id === "ks2";
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
  const { isPremium, ready: premiumReady } = useV2Premium(exam.id);
  const { isPremium: paidAccount } = useIsPremium();
  const basicsMap = useV2Store((s) => s.basics);
  const locked = !!drill && premiumReady && isDrillLocked(exam, drill.key, isPremium) && !hasDrillProgress(drillsMap, basicsMap, exam, drill);
  // Free drills never wait on auth: only a Premium drill needs to know who's signed in.
  const gateReady = !drill || !exam.premium?.lockedDrills.includes(drill.key) || premiumReady;
  // Own progress, or what carried over from the drill this one was split from.
  const state = drill ? drillStateFor(drillsMap, exam.id, drill, allQuestions) : EMPTY_DRILL;
  const paywall = useV2Paywall(exam, "drill");
  const isNative = useIsNativeApp();
  const results = useV2Store((s) => s.results);
  const { user, loading: authLoading } = useAuth();
  // Signed-out visitors get the sign-up prompt in place of a question now and then.
  const guestPrompt = useGuestPrompt(!authLoading && !user, "drill");
  // Non-paying people on a roll get John's "tell a friend" ask the same way (v2 drills are English).
  const examAnswered = v2GuestAnswered(drillsMap, results, exam.id);
  const sharePrompt = useSharePrompt(premiumReady && !paidAccount, examAnswered, "drill");

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
  // One burst when this answer masters the drill (same canvas as Super Amazing Mode);
  // reopening a mastered drill from the dashboard lands on the same screen without it.
  const [fireworks, setFireworks] = useState(false);
  const [earnedMastery, setEarnedMastery] = useState(false);
  const currentId = useRef<string | null>(null);
  const answerSubmitted = useRef(false);
  const scroller = useRef<HTMLDivElement>(null);
  // Revealing disables the options, which drops focus to the page. Put it on
  // Next so a keyboard user carries on from there; the feedback is in a
  // role="status" region, which is announced wherever focus is. Only when focus
  // was actually lost, so a click elsewhere (or a screen reader reading on) is
  // left alone.
  const nextRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!revealed) return;
    const active = document.activeElement as HTMLElement | null;
    if (!active || active === document.body || (active as HTMLButtonElement).disabled) {
      nextRef.current?.focus({ preventScroll: true });
    }
  }, [revealed]);

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
    answerSubmitted.current = false;
    setRevealed(false);
    setBrushUp(false);
    setDone(false);
    scroller.current?.scrollTo({ top: 0 });
  }, [drill, exam.id, allQuestions, questions]);

  useEffect(() => {
    if (hydrated && drill && gateReady && !locked && !question && !done) load();
  }, [hydrated, drill, gateReady, locked, question, done, load]);

  // Basics usage: a miss that offers the rule sheet (lib/v2/basicsTracking).
  useEffect(() => {
    if (!drill || !question || !revealed || isCorrect(question, answer)) return;
    const skill = matchBasicsSkill(question, drill);
    if (skill) trackBasics("brushup_shown", exam.id, drill.key, { skill: skill.id });
  }, [drill, question, revealed, answer, exam.id]);

  const check = (value?: AnswerValue) => {
    if (!question || revealed || answerSubmitted.current) return;
    const final = value ?? answer;
    if (!isComplete(question, final)) return;
    answerSubmitted.current = true;
    setAnswer(final);
    const ok = isCorrect(question, final);
    setRevealed(true);
    guestPrompt.record(ok);
    sharePrompt.record(ok);
    recordClassAnswerById(exam.id, question.id, question.domain, ok, v2Pick(question.format, final));
    const before = drill ? drillStateFor(useV2Store.getState().drills, exam.id, drill, allQuestions) : undefined;
    answerDrill(key, question.id, ok, before);
    if (ok && drill) {
      const after = drillStateFor(useV2Store.getState().drills, exam.id, drill, allQuestions);
      if (questions.length > 0 && questions.some((q) => !before?.masteredIds.includes(q.id)) && questions.every((q) => after.masteredIds.includes(q.id))) {
        setFireworks(true);
        setEarnedMastery(true);
      }
    }
    if (drill?.basics?.length) {
      // Basics usage (lib/v2/basicsTracking): did they learn a skill of this drill first?
      const basicsFirst = basicsDone(useV2Store.getState().basics, exam.id, basicsFor(drill)) > 0;
      trackBasics("exam_start", exam.id, drill.key, { basicsFirst });
      const after = drillStateFor(useV2Store.getState().drills, exam.id, drill, allQuestions);
      if (allQuestions.length > 0 && allQuestions.every((q) => after.masteredIds.includes(q.id))) trackBasics("drill_mastered", exam.id, drill.key, { basicsFirst });
    }
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
    return <FocusMode className="v2-focus items-center justify-center text-gray-600 dark:text-gray-300">{ui.common.loading}</FocusMode>;
  }

  if (locked) {
    return <DrillLockScreen exam={exam} drill={drill} detail={t.lockDetail(allQuestions.length)} backHref={backHref} />;
  }

  const mastered = state.masteredIds.filter((id) => questions.some((q) => q.id === id)).length;
  const pct = questions.length ? Math.round((mastered / questions.length) * 100) : 0;
  // After a miss, the Basics skill the question was really about, if the drill has one for it.
  const missedSkill = question && revealed && !isCorrect(question, answer) ? matchBasicsSkill(question, drill) : null;

  return (
    <FocusMode className="v2-focus">
      {fireworks && done && <Fireworks duration={3000} onComplete={() => setFireworks(false)} />}
      <FocusBar
        rank="replace"
        className="v2-safe-top shrink-0"
        exitHref={backHref}
        exitLabel={ui.common.back}
        title={drill.name}
        subtitle={`${mastered}/${questions.length} ${t.questionsCorrect}`}
        progress={questions.length ? mastered / questions.length : undefined}
        right={
          user ? (
            <Link href={routes.stats} className="text-sm font-medium text-brand-dark hover:text-brand-darker transition-colors">
              {t.viewStats}
            </Link>
          ) : undefined
        }
      />

      <div className="v2-scroll" ref={scroller}>
        <div className="relative container mx-auto px-4 py-4 max-w-lg md:max-w-2xl lg:max-w-4xl">
          {done ? (
            <AchievementCelebration
              examId={exam.id}
              earned={earnedMastery}
              eyebrow={t.masteredEyebrow}
              title={childFriendly ? t.masteredTitleChild : t.masteredTitle}
              description={t.masteredDescription(drill.name, childFriendly)}
              detail={t.masteredDetail(questions.length, drill.name)}
            >
              <Link href={`${routes.dashboard}?completed=${encodeURIComponent(`drill:${drill.key}`)}`} className="v2-tap flex items-center justify-center rounded-xl bg-brand px-4 text-base font-bold text-white">{t.seeProgress}</Link>
              <button type="button" onClick={() => setConfirmReset(true)} className="v2-tap rounded-xl border-2 border-gray-200 bg-white text-sm font-semibold dark:border-gray-700 dark:bg-gray-900">{t.practiseAgain}</button>
            </AchievementCelebration>
          ) : guestPrompt.showing ? (
            <GuestPromptStep
              signupHref={`/signup?redirect=${encodeURIComponent(routes.drillQuestions(drill.key))}`}
              answered={examAnswered}
              where="drill"
              dataTheme={exam.id}
              onSkip={() => { guestPrompt.skip(); load(); }}
              test={guestPrompt.test}
            />
          ) : sharePrompt.showing ? (
            <SharePromptStep onShared={sharePrompt.shared} onSkip={() => { sharePrompt.skip(); load(); }} />
          ) : question ? (
            <Card className="w-full">
              <CardContent className="p-4 md:p-8">
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
                  actions={!done && !guestPrompt.showing && !sharePrompt.showing ? <NextButton ref={nextRef} onClick={() => { if (earnedMastery || !(guestPrompt.takeStep() || sharePrompt.takeStep())) load(); }}>{t.nextQuestion}</NextButton> : null}
                  footer={<ReportExamQuestion key={question.id} examId={exam.id} questionId={question.id} picked={v2Pick(question.format, answer)} />}
                />
              </CardContent>
            </Card>
          ) : null}
          {missedSkill && !guestPrompt.showing && !sharePrompt.showing && (
            <div className="v2-pop mt-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{t.brushUpHeading}</div>
              <button type="button" onClick={() => { setBrushUp(true); trackBasics("brushup", exam.id, drill.key, { skill: missedSkill.id }); }} className="v2-tap mt-1 flex w-full items-center gap-3 text-left">
                {hasExplainer(missedSkill) ? <Play className="h-5 w-5 shrink-0 text-brand-dark" /> : <BookOpen className="h-5 w-5 shrink-0 text-brand-dark" />}
                <span className="min-w-0 flex-1">
                  <span className="block text-[17px] font-bold text-gray-900 dark:text-gray-50">{missedSkill.name}</span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">{hasExplainer(missedSkill) ? t.brushUpListen : t.brushUpRead}</span>
                </span>
              </button>
            </div>
          )}
          {/* Progress under the card, as on v1 training */}
          {!done && question && !guestPrompt.showing && !sharePrompt.showing && questions.length > 0 && (
            <div className="mt-4 md:mt-6 text-center">
              <div className="flex items-center justify-center gap-1 text-sm md:text-lg text-gray-700 dark:text-gray-200">
                <span className="font-bold text-xl md:text-2xl text-brand-dark">{mastered}</span>
                <span className="text-gray-500 dark:text-gray-400">/{questions.length}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs md:text-base ml-1">{t.questionsCorrect}</span>
              </div>
              <div className="w-full bg-brand-border-light rounded-full h-2 mt-2 max-w-md mx-auto">
                <div className="bg-brand h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Only formats that need a Check button (select-all, numeric, ordering...) keep a bottom bar; single choice answers on tap like v1. */}
      {!done && question && !revealed && question.format !== "single" && !guestPrompt.showing && !sharePrompt.showing && (
        <div className="v2-safe-bottom shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pt-3">
          <div className="mx-auto flex max-w-2xl gap-2">
            <button type="button" onClick={() => check()} disabled={!isComplete(question, answer)} className="v2-tap w-full rounded-xl bg-brand text-base font-bold text-white disabled:opacity-40">{t.check}</button>
          </div>
        </div>
      )}

      <V2Paywall exam={exam} {...paywall.modalProps} />

      {missedSkill && <BasicsRuleSheet exam={exam} skill={missedSkill} open={brushUp} onClose={() => setBrushUp(false)} />}

      {confirmReset && (
        <AccessibleOverlay onClose={() => setConfirmReset(false)} aria-label={t.resetTitle} className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4" role="alertdialog">
          <div className="v2-pop w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 p-5 shadow-xl">
            <div className="text-lg font-bold">{t.resetTitle}</div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t.resetBody(drill.name)}</p>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => setConfirmReset(false)} className="v2-tap flex-1 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-sm font-semibold">{ui.common.cancel}</button>
              <button type="button" onClick={() => { resetDrill(key); setConfirmReset(false); currentId.current = null; setQuestion(null); setFireworks(false); setEarnedMastery(false); setDone(false); }} className="v2-tap flex-1 rounded-xl bg-brand text-sm font-bold text-white">{t.reset}</button>
            </div>
          </div>
        </AccessibleOverlay>
      )}
    </FocusMode>
  );
}
