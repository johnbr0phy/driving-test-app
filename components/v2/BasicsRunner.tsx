"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ListChecks, Play, X } from "lucide-react";
import { ExamV2Config } from "@/lib/v2/types";
import { v2Routes } from "@/lib/v2/registry";
import { BasicsQuestion, BasicsRun, BasicsSkill, PUNCTUATION_NAMES, answerBasics, basicsFor, basicsKey, basicsOptionOrder, hasWalkthrough, isPunctuationQuestion, newBasicsRun } from "@/lib/v2/basics";
import { hasExplainer } from "@/lib/v2/explainer";
import { BasicsExplainer } from "./BasicsExplainer";
import { BasicsWalkthrough } from "./BasicsWalkthrough";
import { BasicsRuleSheet } from "./BasicsRuleSheet";
import { DataTable, Eli5Toggle, Passage, RuleCard } from "./BasicsRuleCard";
import { useV2Store } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { useSound } from "@/hooks/useSound";
import { getTigerAsset } from "@/lib/tigerAssets";
import { useIsPremium } from "@/hooks/useIsPremium";
import { hasDrillProgress, isDrillLocked } from "@/lib/v2/premium";
import { DrillLockScreen } from "./DrillLockScreen";

/**
 * One Basics skill on the phone: learn it, then a handful of one-line
 * questions. The learn screen is the click-through walkthrough when the
 * skill has one (math, reading, science, paragraph work), the voiced
 * explainer when it has one (sentence skills), else the text rule card; the
 * card is always one tap away ("Read it"). A miss explains why and comes
 * back later in the run; two misses bring the lesson back once. Finishing
 * marks the skill learned in the store.
 */
export function BasicsRunner({ exam, drillKeyParam, skillIdParam }: { exam: ExamV2Config; drillKeyParam: string | null; skillIdParam: string | null }) {
  const router = useRouter();
  const routes = v2Routes(exam);
  const hydrated = useHydration();
  const { playCorrectSound, playIncorrectSound } = useSound();
  const completeBasics = useV2Store((s) => s.completeBasics);
  const basicsMap = useV2Store((s) => s.basics);
  const drillsMap = useV2Store((s) => s.drills);
  const { isPremium, ready: premiumReady } = useIsPremium();

  const drill = exam.drills.find((d) => d.key === drillKeyParam);
  const skills = drill ? basicsFor(drill) : [];
  const skillIndex = skills.findIndex((s) => s.id === skillIdParam);
  const skill: BasicsSkill | undefined = skills[skillIndex];

  type Screen = "learn" | "review" | "question" | "done";
  const [screen, setScreen] = useState<Screen>("learn");
  const [run, setRun] = useState<BasicsRun | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [ruleOpen, setRuleOpen] = useState(false);
  const [another, setAnother] = useState(false);
  // The explainer or walkthrough overlay after a miss, and whether the learn/review screen shows the text card instead.
  const [explainer, setExplainer] = useState(false);
  const [walking, setWalking] = useState(false);
  const [readMode, setReadMode] = useState(false);

  useEffect(() => {
    if (hydrated && (!drill || !skill)) router.replace(drill ? routes.drill(drill.key) : routes.dashboard);
  }, [hydrated, drill, skill, router, routes]);

  // A new skill id in the URL starts a fresh run.
  useEffect(() => {
    setScreen("learn");
    setRun(null);
    setCurrent(null);
    setPicked(null);
    setAnother(false);
    setExplainer(false);
    setWalking(false);
    setReadMode(false);
  }, [skillIdParam]);

  // Basics of a Premium drill is gated like its questions, unless they are already in it.
  const premiumDrill = !!drill && !!exam.premium?.lockedDrills.includes(drill.key);
  if (!hydrated || !drill || !skill || (premiumDrill && !premiumReady)) {
    return <div className="v2-focus items-center justify-center text-gray-600 dark:text-gray-300">Loading...</div>;
  }
  const overviewHref = routes.drill(drill.key);
  if (isDrillLocked(exam, drill.key, isPremium) && !hasDrillProgress(drillsMap, basicsMap, exam, drill)) {
    return <DrillLockScreen exam={exam} drill={drill} detail={`${skills.length} Basics skills`} backHref={overviewHref} />;
  }

  const nextSkill = skills.find((s, i) => i !== skillIndex && !basicsMap[basicsKey(exam.id, s.id)]?.done);
  const total = skill.questions.length;

  const next = (r: BasicsRun) => {
    if (r.mastered.length === total) {
      completeBasics(basicsKey(exam.id, skill.id), { firstTry: total - r.retried.length, total });
      setScreen("done");
      return;
    }
    if (r.misses >= 2 && !r.reviewed) {
      setRun({ ...r, reviewed: true });
      setReadMode(false);
      setScreen("review");
      return;
    }
    setCurrent(r.queue[0]);
    setPicked(null);
    setScreen("question");
  };

  const start = () => {
    const r = run ?? newBasicsRun(skill);
    setRun(r);
    next(r);
  };

  const pick = (i: number) => {
    if (!run || current === null || picked !== null) return;
    const ok = i === skill.questions[current].answer;
    setPicked(i);
    setRun(answerBasics(run, current, ok));
    if (ok) playCorrectSound();
    else {
      playIncorrectSound();
      if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(40);
    }
  };

  const closeRule = () => setRuleOpen(false);

  const walkable = hasWalkthrough(skill);
  const explainable = hasExplainer(skill);
  const closeOverlay = () => {
    setExplainer(false);
    setWalking(false);
  };
  // "Read it" on a miss overlay drops into the text sheet, so the words are never more than a tap away.
  const openRuleSheet = () => {
    closeOverlay();
    setRuleOpen(true);
  };
  const overlay = walking ? (
    <BasicsWalkthrough exam={exam} skill={skill} doneLabel="Try it again" onDone={closeOverlay} onClose={closeOverlay} onRead={openRuleSheet} />
  ) : explainer ? (
    <BasicsExplainer exam={exam} skill={skill} doneLabel="Try it again" onDone={closeOverlay} onClose={closeOverlay} onRead={openRuleSheet} />
  ) : null;
  // On the text card, the way back to the lesson.
  const watchButton = walkable ? (
    <button type="button" onClick={() => setReadMode(false)} className="flex items-center gap-1.5 self-start text-[15px] font-semibold text-brand">
      <ListChecks className="h-4 w-4" /> Walk through it instead
    </button>
  ) : explainable ? (
    <button type="button" onClick={() => setReadMode(false)} className="flex items-center gap-1.5 self-start text-[15px] font-semibold text-brand">
      <Play className="h-4 w-4" /> Watch it instead · 30 seconds
    </button>
  ) : null;

  // ---- Learn / review: the walkthrough or the video first, the text card behind "Read it" ----
  if (screen === "learn" || screen === "review") {
    const review = screen === "review";
    const doneLabel = review ? "Got it, keep going" : `Got it, try ${total} questions`;
    if (walkable && !readMode) {
      return <BasicsWalkthrough exam={exam} skill={skill} doneLabel={doneLabel} onDone={start} onClose={() => setReadMode(true)} onRead={() => setReadMode(true)} />;
    }
    if (explainable && !readMode) {
      return <BasicsExplainer exam={exam} skill={skill} doneLabel={doneLabel} onDone={start} onClose={() => setReadMode(true)} onRead={() => setReadMode(true)} />;
    }
    return (
      <div className="v2-focus">
        <Header title={skill.name} sub={`Basics · ${drill.name}`} closeHref={overviewHref} />
        <div className="v2-scroll">
          <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">{review ? "One more look" : "Learn it · 20 seconds"}</div>
            <h1 className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-50">{skill.name}</h1>
            {review && <p className="text-sm text-gray-600 dark:text-gray-300">That one&apos;s tricky. Here&apos;s the rule again before the next question.</p>}
            {watchButton}
            <RuleCard skill={skill} />
            <Eli5Toggle skill={skill} open={another} onOpen={() => setAnother(true)} />
          </div>
        </div>
        <div className="v2-safe-bottom shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pt-3">
          <div className="mx-auto max-w-2xl">
            <button type="button" onClick={start} className="v2-tap w-full rounded-xl bg-brand text-base font-bold text-white">
              {review ? "Got it, keep going" : `Got it, try ${total} questions`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- Done ----
  if (screen === "done" && run) {
    const firstTry = total - run.retried.length;
    return (
      <div className="v2-focus">
        <div className="v2-scroll">
          <div className="v2-pop mx-auto flex max-w-md flex-col items-center gap-3 px-6 pt-10 text-center">
            <Image src={getTigerAsset(exam.id, 1)} alt="" width={120} height={120} className="h-28 w-28 object-contain" />
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">Skill learned</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{skill.name}</h1>
            <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5">{firstTry} of {total} right first try</span>
              {run.retried.length > 0 && <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5">{run.retried.length} fixed on a retry</span>}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{run.retried.length ? "Every miss came back until you got it. That's how it sticks." : "Clean sweep. This rule shows up all over the real test."}</p>
          </div>
        </div>
        <div className="v2-safe-bottom shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pt-3">
          <div className="mx-auto flex max-w-2xl flex-col gap-2">
            {nextSkill ? (
              <>
                <Link href={routes.basics(drill.key, nextSkill.id)} className="v2-tap flex items-center justify-center rounded-xl bg-brand text-base font-bold text-white">
                  Next skill: {nextSkill.name}
                </Link>
                <Link href={overviewHref} className="v2-tap flex items-center justify-center text-sm font-semibold text-gray-500 dark:text-gray-400">Back to the drill</Link>
              </>
            ) : (
              <Link href={overviewHref} className="v2-tap flex items-center justify-center rounded-xl bg-brand text-base font-bold text-white">
                Basics done: see exam level
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---- Question ----
  if (!run || current === null) return <div className="v2-focus items-center justify-center text-gray-600 dark:text-gray-300">Loading...</div>;
  const q = skill.questions[current];
  const revealed = picked !== null;
  const correct = revealed && picked === q.answer;
  const comingBack = run.queue.filter((i) => run.retried.includes(i)).length;
  const punct = isPunctuationQuestion(q);
  const table = q.table ?? (!q.blank ? skill.table : undefined);
  const order = basicsOptionOrder(skill.id, current, q.options.length);

  return (
    <div className="v2-focus">
      <div className="v2-safe-top shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pb-2">
        <div className="flex items-center gap-2">
          <Link href={overviewHref} className="v2-tap -ml-1 flex w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400" aria-label="Back to the drill">
            <X className="h-5 w-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold">{skill.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{run.mastered.length} of {total} right{comingBack ? ` · ${comingBack} coming back` : ""}</div>
          </div>
          <button type="button" onClick={() => setRuleOpen(true)} className="rounded-full border-2 border-gray-200 px-3 py-1.5 text-sm font-semibold text-brand">
            Rule
          </button>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${(run.mastered.length / total) * 100}%` }} />
        </div>
      </div>

      <div className="v2-scroll">
        <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-5">
          {run.retried.includes(current) && !revealed && <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">Back for another try</div>}
          {q.passage && <Passage text={q.passage} />}
          <Prompt q={q} revealed={revealed} punct={punct} />
          {table && <DataTable table={table} />}
          <div className="flex flex-col gap-2.5">
            {order.map((i) => {
              const o = q.options[i];
              let cls = "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 active:bg-brand-light";
              if (revealed) cls = i === q.answer ? "border-green-500 bg-green-50 dark:bg-green-950" : i === picked ? "border-amber-500 bg-amber-50 dark:bg-amber-950" : "border-gray-200 dark:border-gray-800 opacity-60";
              return (
                <button key={i} type="button" disabled={revealed} onClick={() => pick(i)} className={`v2-tap flex min-h-[3.5rem] w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-[17px] ${cls}`}>
                  {punct ? (
                    <>
                      <span className="min-w-[1.5rem] text-center text-2xl font-bold">{o === "" ? "∅" : o}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{PUNCTUATION_NAMES[o]}</span>
                    </>
                  ) : (
                    <span>{o}</span>
                  )}
                </button>
              );
            })}
          </div>
          {revealed && (
            <div className={`v2-pop flex items-start gap-3 rounded-2xl p-4 ${correct ? "bg-green-50 dark:bg-green-950" : "bg-amber-50 dark:bg-amber-950"}`}>
              <Image src={getTigerAsset(exam.id, correct ? 1 : 5)} alt="" width={56} height={56} className="h-14 w-14 shrink-0 object-contain" />
              <div className="flex min-w-0 flex-col gap-1.5">
                <div className={`text-lg font-bold ${correct ? "text-green-800 dark:text-green-300" : "text-amber-800 dark:text-amber-300"}`}>{correct ? (run.retried.includes(current) ? "Got it this time" : "Right") : "Not quite"}</div>
                <p className="text-[15px] text-gray-800 dark:text-gray-100">{q.why}</p>
                {!correct && (
                  <>
                    <p className="text-sm text-gray-800 dark:text-gray-100"><b>The trick:</b> {skill.trick}</p>
                    {walkable ? (
                      <button type="button" onClick={() => setWalking(true)} className="v2-tap mt-1 flex items-center justify-center gap-2 self-start rounded-xl bg-white dark:bg-gray-900 px-4 text-[15px] font-bold text-brand shadow-sm">
                        <ListChecks className="h-4 w-4" /> Walk through it again
                      </button>
                    ) : explainable ? (
                      <button type="button" onClick={() => setExplainer(true)} className="v2-tap mt-1 flex items-center justify-center gap-2 self-start rounded-xl bg-white dark:bg-gray-900 px-4 text-[15px] font-bold text-brand shadow-sm">
                        <Play className="h-4 w-4" /> Watch the explainer · 30 seconds
                      </button>
                    ) : null}
                    <p className="text-xs text-gray-500 dark:text-gray-400">This one will come back in a minute.</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="v2-safe-bottom shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pt-3">
        <div className="mx-auto max-w-2xl">
          {revealed ? (
            <button type="button" onClick={() => next(run)} className="v2-tap w-full rounded-xl bg-brand text-base font-bold text-white">
              {run.mastered.length === total ? "Finish" : "Next"}
            </button>
          ) : (
            <div className="v2-tap flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">Tap an answer</div>
          )}
        </div>
      </div>

      <BasicsRuleSheet exam={exam} skill={skill} open={ruleOpen} onClose={closeRule} />
      {overlay}
    </div>
  );
}

function Header({ title, sub, closeHref }: { title: string; sub: string; closeHref: string }) {
  return (
    <div className="v2-safe-top shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pb-2">
      <div className="flex items-center gap-2">
        <Link href={closeHref} className="v2-tap -ml-1 flex w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400" aria-label="Back to the drill">
          <X className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold">{title}</div>
          <div className="truncate text-xs text-gray-500 dark:text-gray-400">{sub}</div>
        </div>
      </div>
    </div>
  );
}

function Prompt({ q, revealed, punct }: { q: BasicsQuestion; revealed: boolean; punct: boolean }) {
  if (!q.blank) return <p className="text-[21px] font-medium leading-snug text-gray-900 dark:text-gray-50">{q.stem}</p>;
  const [before, after] = q.blank.split("__");
  const answer = q.options[q.answer];
  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{punct ? "Which punctuation goes in the blank?" : "Which word goes in the blank?"}</p>
      <p className="mt-1 text-[21px] font-medium leading-snug text-gray-900 dark:text-gray-50">
        {before}
        {revealed ? (
          answer !== "" && <span className="mx-0.5 inline-block rounded-t-md border-b-[3px] border-green-600 bg-green-50 dark:bg-green-950 px-1.5 font-bold text-green-700 dark:text-green-300">{answer}</span>
        ) : (
          <span className="mx-0.5 inline-block min-w-[2.75rem] border-b-[3px] border-brand">&nbsp;</span>
        )}
        {after}
      </p>
    </div>
  );
}

