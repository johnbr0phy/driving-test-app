"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Flag, ChevronLeft, ChevronRight, Calculator as CalcIcon, BookOpen, X, Strikethrough } from "lucide-react";
import { ExamV2Config, StageState, TestSessionV2, AnswerValue } from "@/lib/v2/types";
import { getBank, getQuestionIndex, getStimulus } from "@/lib/v2/bank";
import { stagesOf, v2Routes } from "@/lib/v2/registry";
import { createSession, remainingNow, resolveAdaptive, scoreSession, sessionKey } from "@/lib/v2/session";
import { isAnswered } from "@/lib/v2/grading";
import { useV2Store } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { QuestionView } from "./QuestionView";
import { Timer, formatClock } from "./Timer";
import { Calculator } from "./Calculator";
import { RichText } from "./RichText";

/**
 * Full-length exam simulation: section intro, timed module, review screen,
 * break, adaptive module 2, auto-submit at zero. Full-screen on every
 * device; two-column passage/question on desktop, stacked on phones with a
 * fixed bottom bar.
 */
export function ExamRunner({ exam, testNumber }: { exam: ExamV2Config; testNumber: number }) {
  const router = useRouter();
  const routes = v2Routes(exam);
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

  // Create the session on first visit.
  useEffect(() => {
    if (!hydrated) return;
    if (!exam.tests.some((t) => t.number === testNumber)) {
      router.replace(routes.dashboard);
      return;
    }
    if (!session) putSession(createSession(exam, bank, testNumber));
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
    putSession({ ...next, stages, stage: nextIndex, phase: sameSection || exam.breakSeconds <= 0 ? "intro" : "break" });
  }, [key, exam, bank, byId, finish, putSession]);

  // Keyboard shortcuts for the desktop simulation.
  useEffect(() => {
    if (!session || session.phase !== "questions" || !question || tool !== "none") return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      const linearNow = !!def?.section.linear;
      if (e.key === "ArrowRight") { if (!linearNow || isAnswered(stage!.answers[question.id])) goTo(1); }
      else if (e.key === "ArrowLeft") { if (!linearNow) goTo(-1); }
      else if (/^[a-eA-E]$/.test(e.key) && question.format !== "numeric") {
        const pos = e.key.toUpperCase().charCodeAt(0) - 65;
        const orig = stage!.optionOrder[question.id]?.[pos];
        if (orig !== undefined) setAnswer(question.format === "multi" ? toggleMulti(stage!.answers[question.id], orig) : [orig]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.phase, question?.id, tool, stage]);

  if (!hydrated || !session || !stage || !def) {
    return (
      <div className="v2-focus items-center justify-center">
        <div className="text-gray-600">Loading your test...</div>
      </div>
    );
  }

  const total = stage.questionIds.length;
  const answeredCount = stage.questionIds.filter((id) => isAnswered(stage.answers[id])).length;
  const stageTitle = def.section.modules.length > 1 ? `${def.section.name} · Module ${def.module.module}` : def.section.name;
  const timed = def.module.timeLimit > 0;
  const linear = !!def.section.linear;

  function toggleMulti(cur: AnswerValue | undefined, orig: number): number[] {
    const arr = Array.isArray(cur) ? cur : [];
    return arr.includes(orig) ? arr.filter((i) => i !== orig) : [...arr, orig].sort((a, b) => a - b);
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
      stages: s.stages.map((st, i) => (i === s.stage ? { ...st, runningSince: new Date().toISOString() } : st)),
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
    if (!stage.runningSince && !stage.submittedAt) {
      update((s) => ({ ...s, stages: s.stages.map((st, i) => (i === s.stage ? { ...st, runningSince: new Date().toISOString() } : st)) }));
    }
  }

  // ---------- Intro ----------
  if (session.phase === "intro") {
    const isResume = timed && stage.runningSince === undefined && stage.remaining < def.module.timeLimit;
    return (
      <div className="v2-focus">
        <TopBar title={exam.shortName} onExit={() => setConfirm("exit")} />
        <div className="v2-scroll">
          <div className="mx-auto max-w-2xl px-4 py-8">
            <div className="text-sm font-semibold uppercase tracking-wide text-brand">Section {exam.sections.findIndex((s) => s.key === def.section.key) + 1} of {exam.sections.length}</div>
            <h1 className="mt-1 text-2xl font-bold md:text-3xl">{stageTitle}</h1>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold">{total} questions</span>
              {timed ? (
                <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold">{formatClock(isResume ? stage.remaining : def.module.timeLimit)} {isResume ? "left" : ""}</span>
              ) : (
                <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold">Untimed</span>
              )}
              {stage.variant && <span className="rounded-full bg-brand-light px-3 py-1 font-semibold text-brand-dark">Adaptive: {stage.variant === "upper" ? "harder" : "easier"} module</span>}
              {def.section.calculator ? (
                <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold">Calculator allowed</span>
              ) : (
                <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold">No calculator</span>
              )}
              {linear && <span className="rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-800">No going back</span>}
            </div>
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-2 font-semibold">Directions</div>
              <RichText text={def.section.directions} className="text-[15px] text-gray-700" />
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600">
                {timed ? <li>The clock starts when you tap Start{linear ? "." : " and keeps running on the review screen."}</li> : <li>There is no clock on this section. Take the time you need.</li>}
                {linear ? (
                  <li>Answer each question before moving on. Like the real computer test, you cannot go back.</li>
                ) : (
                  <li>Move freely between questions. Flag any you want to revisit.</li>
                )}
                {timed && <li>When time runs out the section submits itself.</li>}
              </ul>
            </div>
          </div>
        </div>
        <BottomBar>
          <button type="button" onClick={startModule} className="v2-tap w-full rounded-xl bg-brand text-base font-bold text-white md:max-w-xs">
            {isResume ? "Resume module" : "Start module"}
          </button>
        </BottomBar>
        {confirm === "exit" && <Confirm title="Leave the test?" body="Your progress is saved and the clock pauses. Resume any time from the dashboard." okLabel="Leave" onOk={exitAndPause} onCancel={() => setConfirm(null)} />}
      </div>
    );
  }

  // ---------- Break ----------
  if (session.phase === "break") {
    return (
      <div className="v2-focus">
        <TopBar title={exam.shortName} onExit={() => setConfirm("exit")} />
        <div className="v2-scroll">
          <div className="mx-auto max-w-xl px-4 py-12 text-center">
            <div className="text-5xl">☕</div>
            <h1 className="mt-4 text-2xl font-bold">Break time</h1>
            <p className="mt-2 text-gray-600">The real test gives you {Math.round(exam.breakSeconds / 60)} minutes between sections. Stand up, drink water, then continue to {def.section.name}.</p>
          </div>
        </div>
        <BottomBar>
          <button type="button" onClick={() => update((s) => ({ ...s, phase: "intro" }))} className="v2-tap w-full rounded-xl bg-brand text-base font-bold text-white md:max-w-xs">
            Continue to {def.section.name}
          </button>
        </BottomBar>
        {confirm === "exit" && <Confirm title="Leave the test?" body="Your progress is saved. Resume any time from the dashboard." okLabel="Leave" onOk={exitAndPause} onCancel={() => setConfirm(null)} />}
      </div>
    );
  }

  // ---------- Review ----------
  if (session.phase === "review") {
    resumeClockIfNeeded();
    const unanswered = total - answeredCount;
    return (
      <div className="v2-focus">
        <TopBar title={stageTitle} onExit={() => setConfirm("exit")} right={timed ? <Timer remaining={remaining} onExpire={submitStage} /> : undefined} />
        <div className="v2-scroll">
          <div className="mx-auto max-w-2xl px-4 py-6">
            <h1 className="text-xl font-bold">Check your work</h1>
            <p className="mt-1 text-sm text-gray-600">
              {answeredCount} of {total} answered{stage.flagged.length ? `, ${stage.flagged.length} flagged` : ""}. Tap a number to go back to it.
            </p>
            <Palette stage={stage} onJump={jumpTo} />
          </div>
        </div>
        <BottomBar>
          <button type="button" onClick={() => update((s) => ({ ...s, phase: "questions" }))} className="v2-tap flex-1 rounded-xl border-2 border-gray-300 bg-white text-base font-semibold">
            Back
          </button>
          <button type="button" onClick={() => (unanswered > 0 ? setConfirm("submit") : submitStage())} className="v2-tap flex-1 rounded-xl bg-brand text-base font-bold text-white">
            Submit module
          </button>
        </BottomBar>
        {confirm === "submit" && <Confirm title={`${unanswered} unanswered`} body="There is no penalty for guessing. Submit anyway?" okLabel="Submit" onOk={submitStage} onCancel={() => setConfirm(null)} />}
        {confirm === "exit" && <Confirm title="Leave the test?" body="Your progress is saved and the clock pauses." okLabel="Leave" onOk={exitAndPause} onCancel={() => setConfirm(null)} />}
      </div>
    );
  }

  // ---------- Questions ----------
  resumeClockIfNeeded();
  if (!question) return null;
  const flagged = stage.flagged.includes(question.id);
  const isLast = stage.current === total - 1;
  const answeredHere = isAnswered(stage.answers[question.id]);
  const unanswered = total - answeredCount;

  return (
    <div className="v2-focus">
      <TopBar
        title={stageTitle}
        onExit={() => setConfirm("exit")}
        right={
          <div className="flex items-center gap-1.5">
            {timed && <Timer remaining={remaining} onExpire={submitStage} />}
            {def.section.calculator && (
              <IconButton label="Calculator" active={tool === "calc"} onClick={() => setTool(tool === "calc" ? "none" : "calc")}>
                <CalcIcon className="h-5 w-5" />
              </IconButton>
            )}
            {def.section.reference && (
              <IconButton label="Reference sheet" active={tool === "ref"} onClick={() => setTool(tool === "ref" ? "none" : "ref")}>
                <BookOpen className="h-5 w-5" />
              </IconButton>
            )}
            {question.format !== "numeric" && (
              <IconButton label="Eliminate choices" active={eliminator} onClick={() => setEliminator((e) => !e)}>
                <Strikethrough className="h-5 w-5" />
              </IconButton>
            )}
          </div>
        }
      />
      <div className="v2-scroll">
        <div className="mx-auto max-w-6xl px-4 py-4 md:py-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-700">
              Question {stage.current + 1} <span className="font-normal text-gray-400">of {total}</span>
            </div>
            {!linear && <button
              type="button"
              onClick={toggleFlag}
              aria-pressed={flagged}
              className={`v2-tap flex items-center gap-1.5 rounded-full border px-3 text-sm font-semibold ${flagged ? "border-amber-400 bg-amber-50 text-amber-800" : "border-gray-300 bg-white text-gray-600"}`}
            >
              <Flag className={`h-4 w-4 ${flagged ? "fill-amber-500 text-amber-600" : ""}`} />
              {flagged ? "Flagged" : "Flag for review"}
            </button>}
          </div>
          <QuestionView
            key={question.id}
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
            <div className="v2-tap flex flex-1 items-center justify-center rounded-xl border-2 border-gray-200 bg-white text-sm font-semibold">
              {stage.current + 1} / {total}
            </div>
            {isLast ? (
              <button type="button" onClick={() => (unanswered > 0 ? setConfirm("submit") : submitStage())} disabled={!answeredHere} className="v2-tap shrink-0 rounded-xl bg-brand px-5 text-base font-bold text-white disabled:opacity-40 md:w-40">
                Submit section
              </button>
            ) : (
              <button type="button" onClick={() => goTo(1)} disabled={!answeredHere} className="v2-tap shrink-0 rounded-xl bg-brand px-5 text-base font-bold text-white disabled:opacity-40 md:w-32">
                Next
              </button>
            )}
          </>
        ) : (
          <>
            <button type="button" onClick={() => goTo(-1)} disabled={stage.current === 0} className="v2-tap w-14 shrink-0 rounded-xl border-2 border-gray-300 bg-white disabled:opacity-40 md:w-28" aria-label="Previous question">
              <ChevronLeft className="mx-auto h-6 w-6" />
            </button>
            <button type="button" onClick={() => setTool("palette")} className="v2-tap flex-1 rounded-xl border-2 border-gray-300 bg-white text-sm font-semibold">
              {stage.current + 1} / {total}
              <span className="ml-2 font-normal text-gray-500">{answeredCount} answered</span>
            </button>
            {isLast ? (
              <button type="button" onClick={() => update((s) => ({ ...s, phase: "review" }))} className="v2-tap shrink-0 rounded-xl bg-brand px-5 text-base font-bold text-white md:w-32">
                Review
              </button>
            ) : (
              <button type="button" onClick={() => goTo(1)} className="v2-tap w-14 shrink-0 rounded-xl bg-brand text-white md:w-28" aria-label="Next question">
                <ChevronRight className="mx-auto h-6 w-6" />
              </button>
            )}
          </>
        )}
      </BottomBar>

      {tool === "palette" && (
        <Sheet title="Questions" onClose={() => setTool("none")}>
          <Palette stage={stage} onJump={jumpTo} />
          <button type="button" onClick={() => { setTool("none"); update((s) => ({ ...s, phase: "review" })); }} className="v2-tap mt-4 w-full rounded-xl border-2 border-brand text-sm font-bold text-brand">
            Go to review screen
          </button>
        </Sheet>
      )}
      {tool === "calc" && (
        <Sheet title="Calculator" onClose={() => setTool("none")} side>
          <Calculator />
        </Sheet>
      )}
      {tool === "ref" && def.section.reference && (
        <Sheet title="Reference" onClose={() => setTool("none")} side>
          <RichText text={def.section.reference} className="text-sm" />
        </Sheet>
      )}
      {confirm === "submit" && <Confirm title={`${unanswered} unanswered`} body="There is no penalty for guessing. Submit anyway?" okLabel="Submit" onOk={submitStage} onCancel={() => setConfirm(null)} />}
      {confirm === "exit" && <Confirm title="Leave the test?" body="Your answers are saved and the clock pauses until you come back. The real test never pauses, so finish in one sitting when you can." okLabel="Leave" onOk={exitAndPause} onCancel={() => setConfirm(null)} />}
    </div>
  );
}

// ---------- Small building blocks ----------

function TopBar({ title, right, onExit }: { title: string; right?: React.ReactNode; onExit: () => void }) {
  return (
    <div className="v2-safe-top flex shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-3 pb-2">
      <button type="button" onClick={onExit} className="v2-tap -ml-1 flex w-10 items-center justify-center rounded-full text-gray-500" aria-label="Exit test">
        <X className="h-5 w-5" />
      </button>
      <div className="min-w-0 flex-1 truncate text-sm font-bold text-gray-900">{title}</div>
      {right}
    </div>
  );
}

function BottomBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2-safe-bottom flex shrink-0 justify-center gap-2 border-t border-gray-200 bg-white px-3 pt-3">
      <div className="flex w-full max-w-3xl items-stretch gap-2">{children}</div>
    </div>
  );
}

function IconButton({ label, active, onClick, children }: { label: string; active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} aria-pressed={active} title={label} className={`v2-tap flex w-10 items-center justify-center rounded-full ${active ? "bg-brand text-white" : "text-gray-600 hover:bg-gray-100"}`}>
      {children}
    </button>
  );
}

function Sheet({ title, children, onClose, side = false }: { title: string; children: React.ReactNode; onClose: () => void; side?: boolean }) {
  return (
    // Side tools (calculator, reference) float beside the question on desktop
    // so the student keeps working; everything is a bottom sheet on phones.
    <div
      className={`fixed inset-0 z-[70] flex items-end justify-center bg-black/40 md:items-stretch md:justify-end ${side ? "md:pointer-events-none md:bg-transparent" : ""}`}
      onClick={onClose}
      role="dialog"
      aria-modal={!side}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`v2-pop flex max-h-[85dvh] w-full flex-col rounded-t-2xl bg-white shadow-xl md:pointer-events-auto md:max-h-none md:rounded-none md:border-l md:border-gray-200 ${side ? "md:w-96" : "md:w-[28rem]"}`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div className="font-bold">{title}</div>
          <button type="button" onClick={onClose} className="v2-tap w-10 rounded-full text-gray-500" aria-label="Close">
            <X className="mx-auto h-5 w-5" />
          </button>
        </div>
        <div className="v2-safe-bottom overflow-y-auto px-4 py-4">{children}</div>
      </div>
    </div>
  );
}

function Palette({ stage, onJump }: { stage: StageState; onJump: (i: number) => void }) {
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
                current ? "border-brand bg-brand text-white" : answered ? "border-brand bg-brand-light text-brand-dark" : "border-dashed border-gray-400 bg-white text-gray-600"
              }`}
              aria-label={`Question ${i + 1}${answered ? ", answered" : ", unanswered"}${flagged ? ", flagged" : ""}`}
            >
              {i + 1}
              {flagged && <Flag className="absolute -right-1 -top-1 h-3.5 w-3.5 fill-amber-500 text-amber-600" />}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-600">
        <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded border-2 border-brand bg-brand-light" /> Answered</span>
        <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded border-2 border-dashed border-gray-400" /> Unanswered</span>
        <span className="flex items-center gap-1"><Flag className="h-3 w-3 fill-amber-500 text-amber-600" /> Flagged</span>
      </div>
    </div>
  );
}

function Confirm({ title, body, okLabel, onOk, onCancel }: { title: string; body: string; okLabel: string; onOk: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4" role="alertdialog" aria-modal="true">
      <div className="v2-pop w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
        <div className="text-lg font-bold">{title}</div>
        <p className="mt-1 text-sm text-gray-600">{body}</p>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={onCancel} className="v2-tap flex-1 rounded-xl border-2 border-gray-300 text-sm font-semibold">Cancel</button>
          <button type="button" onClick={onOk} className="v2-tap flex-1 rounded-xl bg-brand text-sm font-bold text-white">{okLabel}</button>
        </div>
      </div>
    </div>
  );
}
