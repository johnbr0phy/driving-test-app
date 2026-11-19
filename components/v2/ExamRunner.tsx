"use client";

import { FocusMode } from "./FocusMode";

import { AccessibleOverlay } from "@/components/AccessibleOverlay";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Flag, ChevronLeft, ChevronRight, Calculator as CalcIcon, BookOpen, X, Strikethrough } from "lucide-react";
import { ExamV2Config, StageState, TestSessionV2, AnswerValue } from "@/lib/v2/types";
import { getBank, getQuestionIndex, getStimulus } from "@/lib/v2/bank";
import { stagesOf, v2Routes } from "@/lib/v2/registry";
import { createSession, remainingNow, resolveAdaptive, scoreSession, sessionKey } from "@/lib/v2/session";
import { isAnswered, isComplete } from "@/lib/v2/grading";
import { useV2Store } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { QuestionView } from "./QuestionView";
import { Timer, formatClock } from "./Timer";
import { Calculator } from "./Calculator";
import { RichText } from "./RichText";
import { recordClassAnswerById, recordClassTest, v2Pick } from "@/lib/classProgress";
import { useV2Ui } from "@/lib/v2/ui";

/**
 * Full-length exam simulation: section intro, timed module, review screen,
 * break, adaptive module 2, auto-submit at zero. Full-screen on every
 * device; two-column passage/question on desktop, stacked on phones with a
 * fixed bottom bar.
 */
export function ExamRunner({ exam, testNumber }: { exam: ExamV2Config; testNumber: number }) {
  const router = useRouter();
  const routes = v2Routes(exam);
  const ui = useV2Ui();
  const t = ui.runner;
  const hydrated = useHydration();
  const key = sessionKey(exam.id, testNumber);
  const session = useV2Store((s) => s.sessions[key]);
  const putSession = useV2Store((s) => s.putSession);
  const removeSession = useV2Store((s) => s.removeSession);
  const addResult = useV2Store((s) => s.addResult);

  const bank = useMemo(() => getBank(exam.id).questions, [exam.id]);
  const byId = useMemo(() => getQuestionIndex(exam.id), [exam.id]);
  const stageDefs = useMemo(() => stagesOf(exam), [exam]);

  const [tool, setTool] = useState<"none" | "calc" | "ref" | "palette">("none");
  const [eliminator, setEliminator] = useState(false);
  const [confirm, setConfirm] = useState<"submit" | "exit" | null>(null);

  const finished = useRef(false);

  // Create the session on first visit.
  useEffect(() => {
    if (!hydrated) return;
    if (!exam.tests.some((t) => t.number === testNumber)) {
      router.replace(routes.dashboard);
      return;
    }
    // Not after finish(): removing the finished session re-runs this effect
    // before the results page replaces this one, and a fresh empty session
    // made the dashboard offer to resume a test that was just handed in.
    if (!session && !finished.current) putSession(createSession(exam, bank, testNumber));
  }, [hydrated, session, exam, bank, testNumber, putSession, router, routes.dashboard]);

  const update = useCallback(
    (fn: (s: TestSessionV2) => TestSessionV2) => {
      const cur = useV2Store.getState().sessions[key];
      if (cur) putSession(fn(cur));
    },
    [key, putSession]
  );

  const updateStage = useCallback(
    (fn: (st: StageState) => StageState) =>
      update((s) => ({ ...s, stages: s.stages.map((st, i) => (i === s.stage ? fn(st) : st)) })),
    [update]
  );

  const stage = session?.stages[session.stage];
  const def = session ? stageDefs[session.stage] : undefined;
  const question = stage ? byId.get(stage.questionIds[stage.current]) : undefined;

  const remaining = useCallback(() => (stage ? remainingNow(stage) : 0), [stage]);

  const finish = useCallback(
    (s: TestSessionV2) => {
      const result = scoreSession(exam, s, byId);
      addResult(result);
      // A finished test reports every item to the student's class, if any.
      for (const item of result.items) recordClassAnswerById(exam.id, item.id, item.domain, item.correct, v2Pick(byId.get(item.id)?.format, item.answer));
      recordClassTest(exam.id, result.testNumber, result.items.filter((i) => i.correct).length, result.items.length);
      finished.current = true;
      removeSession(s.key);
      router.replace(routes.results(testNumber));
    },
    [exam, byId, addResult, removeSession, router, routes, testNumber]
  );

  /** Submit the current module and move on. */
  const submitStage = useCallback(() => {
    setTool("none");
    setConfirm(null);
    const cur = useV2Store.getState().sessions[key];
    if (!cur) return;
    const st = cur.stages[cur.stage];
    const closed: StageState = { ...st, remaining: remainingNow(st), runningSince: undefined, submittedAt: new Date().toISOString() };
    const stages = cur.stages.map((x, i) => (i === cur.stage ? closed : x));
    const nextIndex = cur.stage + 1;
    if (nextIndex >= stages.length) {
      finish({ ...cur, stages, completedAt: new Date().toISOString() });
      return;
    }
    const next = { ...cur, stages };
    stages[nextIndex] = resolveAdaptive(exam, bank, next, nextIndex, byId);
    const sameSection = stages[nextIndex].section === closed.section;
    const anyExplicit = exam.sections.some((s) => s.breakAfter !== undefined);
    const closedDef = exam.sections.find((s) => s.key === closed.section);
    const wantsBreak = exam.breakSeconds > 0 && !sameSection && (anyExplicit ? !!closedDef?.breakAfter : true);
    putSession({ ...next, stages, stage: nextIndex, phase: wantsBreak ? "break" : "intro" });
  }, [key, exam, bank, byId, finish, putSession]);

  // Keyboard shortcuts for the desktop simulation.
  useEffect(() => {
    if (!session || session.phase !== "questions" || !question || tool !== "none") return;
    const onKey = (e: KeyboardEvent) => {
      if (confirm || e.defaultPrevented || e.repeat || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;
      // Shortcuts work wherever focus is (including a just-clicked answer),
      // except while typing or inside an open figure or dialog.
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable=true], [role=dialog], [role=alertdialog]")) return;
      const linearNow = !!def?.section.linear;
      if (e.key === "ArrowRight") { if (!linearNow || isComplete(question, stage!.answers[question.id])) goTo(1); }
      else if (e.key === "ArrowLeft") { if (!linearNow) goTo(-1); }
      else if (/^[a-fA-F]$/.test(e.key) && (question.format === "single" || question.format === "multi")) {
        const pos = e.key.toUpperCase().charCodeAt(0) - 65;
        const orig = stage!.optionOrder[question.id]?.[pos];
        if (orig !== undefined) setAnswer(question.format === "multi" ? toggleMulti(stage!.answers[question.id], orig) : [orig]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.phase, question?.id, tool, stage, confirm]);

  if (!hydrated || !session || !stage || !def) {
    return (
      <FocusMode className="v2-focus items-center justify-center">
        <div className="text-gray-600 dark:text-gray-300">{t.loadingTest}</div>
      </FocusMode>
    );
  }

  const total = stage.questionIds.length;
  const answeredCount = stage.questionIds.filter((id) => isAnswered(stage.answers[id])).length;
  const stageTitle = def.section.modules.length > 1 ? t.moduleTitle(def.section.name, def.module.module) : def.section.name;
  const timed = def.module.timeLimit > 0 && session.timing !== "untimed";
  const linear = !!def.section.linear;

  function toggleMulti(cur: AnswerValue | undefined, orig: number): number[] {
    const arr = Array.isArray(cur) ? cur : [];
    if (arr.includes(orig)) return arr.filter((i) => i !== orig);
    if (question?.select && arr.length >= question.select) return arr;
    return [...arr, orig].sort((a, b) => a - b);
  }

  function setAnswer(value: AnswerValue) {
    if (!question) return;
    updateStage((st) => ({ ...st, answers: { ...st.answers, [question.id]: value } }));
  }

  function goTo(delta: number) {
    if (linear && delta < 0) return;
    updateStage((st) => ({ ...st, current: Math.min(total - 1, Math.max(0, st.current + delta)) }));
  }

  function jumpTo(index: number) {
    setTool("none");
    update((s) => ({ ...s, phase: "questions", stages: s.stages.map((st, i) => (i === s.stage ? { ...st, current: index } : st)) }));
  }

  function toggleFlag() {
    if (!question) return;
    updateStage((st) => ({ ...st, flagged: st.flagged.includes(question.id) ? st.flagged.filter((id) => id !== question.id) : [...st.flagged, question.id] }));
  }

  function toggleEliminate(orig: number) {
    if (!question) return;
    updateStage((st) => {
      const cur = st.eliminated[question.id] ?? [];
      return { ...st, eliminated: { ...st.eliminated, [question.id]: cur.includes(orig) ? cur.filter((i) => i !== orig) : [...cur, orig] } };
    });
  }

  function startModule() {
    update((s) => ({
      ...s,
      phase: "questions",
      stages: s.stages.map((st, i) => (i === s.stage ? { ...st, runningSince: s.timing === "untimed" ? undefined : new Date().toISOString() } : st)),
    }));
  }

  function exitAndPause() {
    update((s) => ({
      ...s,
      stages: s.stages.map((st, i) => (i === s.stage && st.runningSince ? { ...st, remaining: remainingNow(st), runningSince: undefined } : st)),
    }));
    router.push(routes.dashboard);
  }

  function resumeClockIfNeeded() {
    if (timed && !stage.runningSince && !stage.submittedAt) {
      update((s) => ({ ...s, stages: s.stages.map((st, i) => (i === s.stage ? { ...st, runningSince: s.timing === "untimed" ? undefined : new Date().toISOString() } : st)) }));
    }
  }

  // ---------- Intro ----------
  if (session.phase === "intro") {
    const isResume = timed && stage.runningSince === undefined && stage.remaining < def.module.timeLimit;
    return (
      <FocusMode className="v2-focus">
        <TopBar title={exam.shortName} onExit={() => setConfirm("exit")} />
        <div className="v2-scroll">
          <div className="mx-auto max-w-2xl px-4 py-8">
            <div className="text-sm font-semibold uppercase tracking-wide text-brand-dark">{t.sectionOf(exam.sections.findIndex((s) => s.key === def.section.key) + 1, exam.sections.length)}</div>
            <h1 className="mt-1 text-2xl font-bold md:text-3xl">{stageTitle}</h1>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 font-semibold">{t.questionCount(total)}</span>
              {timed ? (
                <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 font-semibold">{isResume ? t.timeLeft(formatClock(stage.remaining)) : `${formatClock(def.module.timeLimit)} `}</span>
              ) : (
                <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 font-semibold">{t.untimed}</span>
              )}
              {stage.variant && <span className="rounded-full bg-brand-light px-3 py-1 font-semibold text-brand-dark">{stage.variant === "upper" ? t.adaptiveHarder : t.adaptiveEasier}</span>}
              {def.section.calculator ? (
                <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 font-semibold">{t.calculatorAllowed}</span>
              ) : (
                <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 font-semibold">{t.noCalculator}</span>
              )}
              {linear && <span className="rounded-full bg-amber-50 dark:bg-amber-950 px-3 py-1 font-semibold text-amber-800 dark:text-amber-300">{t.noGoingBack}</span>}
            </div>
            {stagesOf(exam).some(({ module }) => module.timeLimit > 0) && session.stage === 0 && stage.remaining === def.module.timeLimit && !stage.runningSince && stage.current === 0 && Object.keys(stage.answers).length === 0 && (
              <label className="mt-4 flex items-center gap-2 text-sm">
                <input type="checkbox" checked={session.timing === "untimed"} onChange={(e) => update(s => ({ ...s, timing: e.target.checked ? "untimed" : "standard" }))} />
                {t.untimedPractice}
              </label>
            )}
            <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
              <div className="mb-2 font-semibold">{t.directions}</div>
              <RichText text={def.section.directions} className="text-[15px] text-gray-700 dark:text-gray-200" />
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
                {timed ? <li>{linear ? t.clockStartsLinear : t.clockStartsReview}</li> : <li>{t.noClock}</li>}
                {linear ? (
                  <li>{t.linearRule}</li>
                ) : (
                  <li>{t.freeRule}</li>
                )}
                {timed && <li>{t.autoSubmit}</li>}
              </ul>
            </div>
          </div>
        </div>
        <BottomBar>
          <button type="button" onClick={startModule} className="v2-tap mx-auto w-full rounded-xl bg-brand text-base font-bold text-white md:max-w-xs">
            {isResume ? t.resumeModule : t.startModule}
          </button>
        </BottomBar>
        {confirm === "exit" && <Confirm title={t.leaveTitle} body={t.leaveBodyIntro} okLabel={t.leave} onOk={exitAndPause} onCancel={() => setConfirm(null)} />}
      </FocusMode>
    );
  }

  // ---------- Break ----------
  if (session.phase === "break") {
    return (
      <FocusMode className="v2-focus">
        <TopBar title={exam.shortName} onExit={() => setConfirm("exit")} />
        <div className="v2-scroll">
          <div className="mx-auto max-w-xl px-4 py-12 text-center">
            <div className="text-5xl">☕</div>
            <h1 className="mt-4 text-2xl font-bold">{t.breakTitle}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{exam.breakNote ?? t.breakDefault(Math.round(exam.breakSeconds / 60))} {t.breakAdvice(def.section.name)}</p>
          </div>
        </div>
        <BottomBar>
          <button type="button" onClick={() => update((s) => ({ ...s, phase: "intro" }))} className="v2-tap mx-auto w-full rounded-xl bg-brand text-base font-bold text-white md:max-w-xs">
            {t.continueTo(def.section.name)}
          </button>
        </BottomBar>
        {confirm === "exit" && <Confirm title={t.leaveTitle} body={t.leaveBodyBreak} okLabel={t.leave} onOk={exitAndPause} onCancel={() => setConfirm(null)} />}
      </FocusMode>
    );
  }

  // ---------- Review ----------
  if (session.phase === "review") {
    resumeClockIfNeeded();
    const unanswered = total - answeredCount;
    return (
      <FocusMode className="v2-focus">
        <TopBar title={stageTitle} onExit={() => setConfirm("exit")} right={timed ? <Timer remaining={remaining} onExpire={submitStage} /> : undefined} />
        <div className="v2-scroll">
          <div className="mx-auto max-w-2xl px-4 py-6">
            <h1 className="text-xl font-bold">{t.checkYourWork}</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {t.reviewSummary(answeredCount, total, stage.flagged.length)}
            </p>
            <Palette stage={stage} onJump={jumpTo} />
          </div>
        </div>
        <BottomBar>
          <button type="button" onClick={() => update((s) => ({ ...s, phase: "questions" }))} className="v2-tap flex-1 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-base font-semibold">
            {ui.common.back}
          </button>
          <button type="button" onClick={() => (unanswered > 0 ? setConfirm("submit") : submitStage())} className="v2-tap flex-1 rounded-xl bg-brand text-base font-bold text-white">
            {t.submitModule}
          </button>
        </BottomBar>
        {confirm === "submit" && <Confirm title={t.unansweredCount(unanswered)} body={t.submitAnywayBody} okLabel={t.submit} onOk={submitStage} onCancel={() => setConfirm(null)} />}
        {confirm === "exit" && <Confirm title={t.leaveTitle} body={t.leaveBodyReview} okLabel={t.leave} onOk={exitAndPause} onCancel={() => setConfirm(null)} />}
      </FocusMode>
    );
  }

  // ---------- Questions ----------
  resumeClockIfNeeded();
  if (!question) return null;
  const flagged = stage.flagged.includes(question.id);
  const isLast = stage.current === total - 1;
  // A linear section (no going back) needs a complete answer before Next.
  const answeredHere = isComplete(question, stage.answers[question.id]);
  const unanswered = total - answeredCount;

  return (
    <FocusMode className="v2-focus">
      <TopBar
        title={stageTitle}
        onExit={() => setConfirm("exit")}
        right={
          <div className="flex items-center gap-1.5">
            {timed && <Timer remaining={remaining} onExpire={submitStage} />}
            {def.section.calculator && (
              <IconButton label={t.calculator} active={tool === "calc"} onClick={() => setTool(tool === "calc" ? "none" : "calc")}>
                <CalcIcon className="h-5 w-5" />
              </IconButton>
            )}
            {def.section.reference && (
              <IconButton label={t.referenceSheet} active={tool === "ref"} onClick={() => setTool(tool === "ref" ? "none" : "ref")}>
                <BookOpen className="h-5 w-5" />
              </IconButton>
            )}
            {(question.format === "single" || question.format === "multi") && (
              <IconButton label={t.eliminateChoices} active={eliminator} onClick={() => setEliminator((e) => !e)}>
                <Strikethrough className="h-5 w-5" />
              </IconButton>
            )}
          </div>
        }
      />
      <div className="v2-scroll">
        <div className="mx-auto max-w-6xl px-4 py-4 md:py-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {t.questionNumber(stage.current + 1)} <span className="font-normal text-gray-500 dark:text-gray-400">{t.ofTotal(total)}</span>
            </div>
            {!linear && <button
              type="button"
              onClick={toggleFlag}
              aria-pressed={flagged}
              className={`v2-tap flex items-center gap-1.5 rounded-full border px-3 text-sm font-semibold ${flagged ? "border-amber-400 dark:border-amber-600 bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300" : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300"}`}
            >
              <Flag className={`h-4 w-4 ${flagged ? "fill-amber-500 text-amber-600 dark:text-amber-400" : ""}`} />
              {flagged ? t.flagged : t.flagForReview}
            </button>}
          </div>
          <QuestionView focusOnChange
            key={question.stimulusId ?? question.id}
            question={question}
            stimulus={getStimulus(exam.id, question)}
            optionOrder={stage.optionOrder[question.id] ?? (question.options ?? []).map((_, i) => i)}
            answer={stage.answers[question.id]}
            onAnswer={setAnswer}
            eliminated={stage.eliminated[question.id]}
            onToggleEliminate={toggleEliminate}
            eliminatorOn={eliminator}
            layout="split"
          />
        </div>
      </div>
      <BottomBar>
        {linear ? (
          <>
            <div className="v2-tap flex flex-1 items-center justify-center rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm font-semibold">
              {stage.current + 1} / {total}
            </div>
            {isLast ? (
              <button type="button" onClick={() => (unanswered > 0 ? setConfirm("submit") : submitStage())} disabled={!answeredHere} className="v2-tap shrink-0 rounded-xl bg-brand px-5 text-base font-bold text-white disabled:opacity-40 md:w-40">
                {t.submitSection}
              </button>
            ) : (
              <button type="button" onClick={() => goTo(1)} disabled={!answeredHere} className="v2-tap shrink-0 rounded-xl bg-brand px-5 text-base font-bold text-white disabled:opacity-40 md:w-32">
                {ui.common.next}
              </button>
            )}
          </>
        ) : (
          <>
            <button type="button" onClick={() => goTo(-1)} disabled={stage.current === 0} className="v2-tap w-14 shrink-0 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 disabled:opacity-40 md:w-28" aria-label={t.previousQuestion}>
              <ChevronLeft className="mx-auto h-6 w-6" />
            </button>
            <button type="button" onClick={() => setTool("palette")} aria-haspopup="dialog" aria-label={t.paletteButtonLabel(stage.current + 1, total, answeredCount)} className="v2-tap flex-1 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-semibold">
              {stage.current + 1} / {total}
              <span className="ml-2 font-normal text-gray-500 dark:text-gray-400">{t.answeredCount(answeredCount)}</span>
            </button>
            {isLast ? (
              <button type="button" onClick={() => update((s) => ({ ...s, phase: "review" }))} className="v2-tap shrink-0 rounded-xl bg-brand px-5 text-base font-bold text-white md:w-32">
                {t.review}
              </button>
            ) : (
              <button type="button" onClick={() => goTo(1)} className="v2-tap w-14 shrink-0 rounded-xl bg-brand text-white md:w-28" aria-label={t.nextQuestion}>
                <ChevronRight className="mx-auto h-6 w-6" />
              </button>
            )}
          </>
        )}
      </BottomBar>

      {tool === "palette" && (
        <Sheet title={t.questions} onClose={() => setTool("none")}>
          <Palette stage={stage} onJump={jumpTo} />
          <button type="button" onClick={() => { setTool("none"); update((s) => ({ ...s, phase: "review" })); }} className="v2-tap mt-4 w-full rounded-xl border-2 border-brand text-sm font-bold text-brand-dark">
            {t.goToReview}
          </button>
        </Sheet>
      )}
      {tool === "calc" && (
        <Sheet title={t.calculator} onClose={() => setTool("none")} side>
          <Calculator />
        </Sheet>
      )}
      {tool === "ref" && def.section.reference && (
        <Sheet title={t.reference} onClose={() => setTool("none")} side>
          <RichText text={def.section.reference} className="text-sm" />
        </Sheet>
      )}
      {confirm === "submit" && <Confirm title={t.unansweredCount(unanswered)} body={t.submitAnywayBody} okLabel={t.submit} onOk={submitStage} onCancel={() => setConfirm(null)} />}
      {confirm === "exit" && <Confirm title={t.leaveTitle} body={t.leaveBodyQuestions} okLabel={t.leave} onOk={exitAndPause} onCancel={() => setConfirm(null)} />}
    </FocusMode>
  );
}

// ---------- Small building blocks ----------

function TopBar({ title, right, onExit }: { title: string; right?: React.ReactNode; onExit: () => void }) {
  const ui = useV2Ui();
  return (
    <div className="v2-safe-top flex shrink-0 items-center gap-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pb-2">
      <button type="button" onClick={onExit} className="v2-tap -ml-1 flex w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400" aria-label={ui.runner.exitTest}>
        <X className="h-5 w-5" />
      </button>
      <div className="min-w-0 flex-1 truncate text-sm font-bold text-gray-900 dark:text-gray-50">{title}</div>
      {right}
    </div>
  );
}

function BottomBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2-safe-bottom flex shrink-0 justify-center gap-2 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pt-3">
      <div className="flex w-full max-w-3xl items-stretch gap-2">{children}</div>
    </div>
  );
}

function IconButton({ label, active, onClick, children }: { label: string; active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} aria-pressed={active} title={label} className={`v2-tap flex w-10 items-center justify-center rounded-full ${active ? "bg-brand text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
      {children}
    </button>
  );
}

function Sheet({ title, children, onClose, side = false }: { title: string; children: React.ReactNode; onClose: () => void; side?: boolean }) {
  const ui = useV2Ui();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    // Side tools (calculator, reference) float beside the question on desktop
    // so the student keeps working; everything is a bottom sheet on phones.
    <AccessibleOverlay onClose={onClose} aria-label={title} modal={!side || mobile}
      className={`fixed inset-0 z-[70] flex items-end justify-center bg-black/40 md:items-stretch md:justify-end ${side ? "md:pointer-events-none md:bg-transparent" : ""}`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`v2-pop flex max-h-[85dvh] w-full flex-col rounded-t-2xl bg-white dark:bg-gray-900 shadow-xl md:pointer-events-auto md:max-h-none md:rounded-none md:border-l md:border-gray-200 dark:md:border-gray-800 ${side ? "md:w-96" : "md:w-[28rem]"}`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <div className="font-bold">{title}</div>
          <button type="button" onClick={onClose} className="v2-tap w-10 rounded-full text-gray-500 dark:text-gray-400" aria-label={ui.common.close}>
            <X className="mx-auto h-5 w-5" />
          </button>
        </div>
        <div className="v2-safe-bottom overflow-y-auto px-4 py-4">{children}</div>
      </div>
    </AccessibleOverlay>
  );
}

function Palette({ stage, onJump }: { stage: StageState; onJump: (i: number) => void }) {
  const t = useV2Ui().runner;
  return (
    <div>
      <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-9">
        {stage.questionIds.map((id, i) => {
          const answered = isAnswered(stage.answers[id]);
          const flagged = stage.flagged.includes(id);
          const current = i === stage.current;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onJump(i)}
              className={`v2-tap relative rounded-lg border-2 text-sm font-bold ${
                current ? "border-brand bg-brand text-white" : answered ? "border-brand bg-brand-light text-brand-dark" : "border-dashed border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300"
              }`}
              aria-label={t.paletteItemLabel(i + 1, answered, flagged)}
            >
              {i + 1}
              {flagged && <Flag className="absolute -right-1 -top-1 h-3.5 w-3.5 fill-amber-500 text-amber-600 dark:text-amber-400" />}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-300">
        <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded border-2 border-brand bg-brand-light" /> {t.legendAnswered}</span>
        <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded border-2 border-dashed border-gray-400 dark:border-gray-600" /> {t.legendUnanswered}</span>
        <span className="flex items-center gap-1"><Flag className="h-3 w-3 fill-amber-500 text-amber-600 dark:text-amber-400" /> {t.legendFlagged}</span>
      </div>
    </div>
  );
}

function Confirm({ title, body, okLabel, onOk, onCancel }: { title: string; body: string; okLabel: string; onOk: () => void; onCancel: () => void }) {
  const ui = useV2Ui();
  return (
    <AccessibleOverlay onClose={onCancel} aria-label={title} className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4" role="alertdialog">
      <div className="v2-pop w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 p-5 shadow-xl">
        <div className="text-lg font-bold">{title}</div>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{body}</p>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={onCancel} className="v2-tap flex-1 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-sm font-semibold">{ui.common.cancel}</button>
          <button type="button" onClick={onOk} className="v2-tap flex-1 rounded-xl bg-brand text-sm font-bold text-white">{okLabel}</button>
        </div>
      </div>
    </AccessibleOverlay>
  );
}
