"use client";

// The player for one "Drive the Question" scene. three.js and the scene code
// arrive with import() after this mounts, so nothing here weighs on other pages.
// The canvas is the picture; every decision and result is ordinary HTML beside
// it, so it works with a keyboard and a screen reader.

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackDrive } from "@/src/drive/analytics";
import { getDriveRule } from "@/src/drive/rules";

type Option = { id: string; label: string; correct: boolean; consequence?: string };
type Decision = { id: string; prompt: string; sign?: string; signAlt?: string; options: Option[] };
type Result = { ok: boolean; decisionId: string | null; optionId: string | null };
type DriveRecord = {
  bankAnswer?: string;
  rule: string;
  questionId: string;
  state: string;
  prompt: string;
  ruleText: string;
  successText: string;
  citation: { source: string; section: string; url: string };
  decisions: { id: string; wrongActions: { id: string; consequence: string }[] }[];
};
type Stage = {
  start: () => void;
  choose: (id: string) => boolean;
  decision: () => Decision | null;
  state: () => { phase: string; seg: string; caption?: string; speedMph: number | null; elapsed: number };
  stats: () => Record<string, number | null>;
  setMuted: (muted: boolean) => void;
  dispose: () => void;
};
export type FallbackQuestion = { question: string; options: string[]; correctIndex: number; explanation: string };

type Props = {
  slug: string;
  title: string;
  record: DriveRecord;
  fallback: FallbackQuestion;
  next: { slug: string; title: string };
  /** Two-letter state from ?state=, kept on the links out. */
  stateCode: string | null;
};

const button =
  "w-full min-h-[3.5rem] rounded-xl border-2 border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-900 px-4 py-3 text-left text-base font-semibold text-gray-900 dark:text-gray-50 transition-colors hover:bg-orange-50 dark:hover:bg-gray-800 focus-visible:outline focus-visible:outline-4 focus-visible:outline-orange-500";
const primary =
  "inline-flex min-h-[3.25rem] items-center justify-center rounded-xl bg-black dark:bg-white px-5 py-3 text-base font-semibold text-white dark:text-black hover:opacity-90 focus-visible:outline focus-visible:outline-4 focus-visible:outline-orange-500";
const secondary =
  "inline-flex min-h-[3.25rem] items-center justify-center rounded-xl border-2 border-gray-300 dark:border-gray-700 px-5 py-3 text-base font-semibold text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline focus-visible:outline-4 focus-visible:outline-orange-500";

export function DrivePlayer({ slug, title, record, fallback, next, stateCode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<Stage | null>(null);
  const signUrl = useRef<(kind: string, size?: number) => string>(() => "");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<"loading" | "ready" | "play" | "decide" | "result" | "fallback">("loading");
  const [caption, setCaption] = useState("");
  const [speed, setSpeed] = useState<number | null>(null);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [muted, setMuted] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const base = { rule: slug, question_id: record.questionId, state: stateCode ?? record.state };
  const baseRef = useRef(base);
  baseRef.current = base;

  useEffect(() => {
    let cancelled = false;
    let stage: Stage | null = null;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const forceFallback = new URLSearchParams(window.location.search).get("webgl") === "off";

    (async () => {
      try {
        const rule = getDriveRule(slug);
        if (!rule) throw new Error("unknown rule");
        const [runtime, builder] = await Promise.all([import("@/src/drive/runtime"), rule.load()]);
        if (cancelled) return;
        if (forceFallback || !runtime.webglAvailable() || !canvasRef.current) throw new Error("no webgl");
        signUrl.current = runtime.signDataUrl;
        stage = runtime.createStage({
          canvas: canvasRef.current,
          builder,
          record,
          reducedMotion,
          onEvent(event: { type: string; id?: string; ok?: boolean; decisionId?: string; optionId?: string; correct?: boolean }) {
            if (!stage) return;
            const state = stage.state();
            if (event.type === "segment") {
              setCaption(state.caption || "");
              setMode("play");
            } else if (event.type === "decision") {
              setDecision(stage.decision());
              setMode("decide");
            } else if (event.type === "choice") {
              trackDrive("drive_decision", { ...baseRef.current, decision: event.decisionId, choice: event.optionId, correct: Boolean(event.correct) });
              setMode("play");
            } else if (event.type === "result") {
              trackDrive("drive_complete", { ...baseRef.current, correct: Boolean(event.ok), seconds: Math.round(state.elapsed) });
              setCaption(state.caption || "");
              setResult({ ok: Boolean(event.ok), decisionId: event.decisionId ?? null, optionId: event.optionId ?? null });
              setMode("result");
            } else if (event.type === "frame") {
              setSpeed(state.speedMph);
            }
          },
        }) as Stage;
        stageRef.current = stage;
        // For tools/drive-shoot.mjs and for poking at a scene from the console.
        (window as unknown as { __drive?: unknown }).__drive = stage;
        setMode("ready");
      } catch {
        if (!cancelled) setMode("fallback");
      }
    })();

    return () => {
      cancelled = true;
      stage?.dispose();
      stageRef.current = null;
    };
  }, [slug, record]);

  // Move focus to the new prompt or result, so a screen reader hears it.
  useEffect(() => {
    if (mode === "decide" || mode === "result") headingRef.current?.focus({ preventScroll: true });
  }, [mode, decision?.id]);

  const start = useCallback(
    (retry: boolean) => {
      setResult(null);
      setDecision(null);
      setAttempt((n) => n + 1);
      trackDrive(retry ? "drive_retry" : "drive_start", baseRef.current);
      // Fill the screen with the scene: the site header scrolls away above it.
      sectionRef.current?.scrollIntoView({ block: "start" });
      stageRef.current?.start();
    },
    [],
  );

  const choose = useCallback((id: string) => {
    stageRef.current?.choose(id);
  }, []);

  // Number keys pick an option while a decision is open.
  useEffect(() => {
    if (mode !== "decide" || !decision) return;
    const onKey = (event: KeyboardEvent) => {
      const index = Number(event.key) - 1;
      if (Number.isInteger(index) && index >= 0 && index < decision.options.length) choose(decision.options[index].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, decision, choose]);

  const toggleSound = () => {
    setMuted((value) => {
      stageRef.current?.setMuted(!value);
      return !value;
    });
  };

  const testHref = `/dmv/dashboard${stateCode ? `?state=${stateCode}` : ""}`;
  const nextHref = `/drive/${next.slug}${stateCode ? `?state=${stateCode}` : ""}`;
  const toTest = (from: string) => trackDrive("drive_to_test_click", { ...base, from });

  if (mode === "fallback") {
    return <FallbackQuiz title={title} record={record} fallback={fallback} testHref={testHref} nextHref={nextHref} next={next} onTest={toTest} />;
  }

  const wrong =
    result && !result.ok
      ? record.decisions.find((d) => d.id === result.decisionId)?.wrongActions.find((w) => w.id === result.optionId)
      : null;

  return (
    <section
      aria-label={`${title}: driving scene`}
      data-drive-mode={mode}
      ref={sectionRef}
      className="grid h-[100svh] min-h-[30rem] grid-rows-[minmax(0,1fr)_auto] bg-gray-950 landscape:grid-cols-[minmax(0,1fr)_minmax(17rem,38%)] landscape:grid-rows-1"
    >
      <div className="relative min-h-0">
        <canvas ref={canvasRef} className="block h-full w-full" role="img" aria-label={caption || `${title}. Press Start driving to begin.`} />
        {speed !== null && mode !== "ready" && mode !== "loading" && (
          <div aria-hidden="true" className="absolute left-3 top-3 rounded-lg bg-black/70 px-3 py-1.5 text-white">
            <span className="text-xl font-bold tabular-nums">{speed}</span> <span className="text-xs">mph</span>
          </div>
        )}
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={muted}
          className="absolute right-3 top-3 rounded-lg bg-black/70 px-3 py-1.5 text-sm font-medium text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-orange-500"
        >
          {muted ? "Sound off" : "Sound on"}
        </button>
      </div>

      <div className={`${mode === "result" ? "max-h-[64svh]" : "max-h-[48svh]"} overflow-y-auto bg-white p-4 text-gray-900 dark:bg-gray-900 dark:text-gray-50 landscape:max-h-none landscape:p-5`}>
        {/* What is happening, for people who cannot see the picture. */}
        <p aria-live="polite" className={mode === "play" ? "text-base leading-snug" : "sr-only"}>
          {caption}
        </p>

        {mode === "loading" && <p className="text-base text-gray-600 dark:text-gray-300">Loading the scene...</p>}

        {mode === "ready" && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">Drive the Question</p>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              You do not steer. When a choice comes up, time slows down: tap what you would do. About 20 seconds.
            </p>
            <button type="button" className={`${primary} w-full`} onClick={() => start(false)} data-drive-start>
              Start driving
            </button>
          </div>
        )}

        {mode === "decide" && decision && (
          <div role="group" aria-labelledby="drive-prompt" className="space-y-3" key={`${attempt}-${decision.id}`}>
            <div className="flex items-start gap-3">
              {decision.sign && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={signUrl.current(decision.sign, 128)} alt={decision.signAlt || ""} width={64} height={64} className="h-16 w-16 shrink-0" />
              )}
              <h2 id="drive-prompt" ref={headingRef} tabIndex={-1} className="text-lg font-bold leading-snug outline-none">
                {decision.prompt}
              </h2>
            </div>
            <div className="grid gap-2">
              {decision.options.map((option, index) => (
                <button key={option.id} type="button" className={button} data-drive-option={option.id} onClick={() => choose(option.id)}>
                  <span aria-hidden="true" className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs text-white dark:bg-gray-100 dark:text-gray-900">
                    {index + 1}
                  </span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === "result" && result && (
          <div className="space-y-3" data-drive-result={result.ok ? "ok" : "fail"}>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className={`text-xl font-bold outline-none ${result.ok ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}
            >
              {result.ok ? "Right call" : "Not this time"}
            </h2>
            <p className="text-base leading-snug">{result.ok ? record.successText : wrong?.consequence}</p>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">The rule</p>
              <p className="mt-1 text-base font-medium leading-snug">{record.ruleText}</p>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                Source:{" "}
                <a className="underline" href={record.citation.url} target="_blank" rel="noopener noreferrer">
                  {record.citation.source}
                </a>
                , {record.citation.section}.
              </p>
            </div>
            {result.ok ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <Link className={primary} href={nextHref}>
                  Next scene
                </Link>
                <Link className={secondary} href={testHref} onClick={() => toTest("result")}>
                  Take the full test
                </Link>
              </div>
            ) : (
              <button type="button" className={`${primary} w-full`} onClick={() => start(true)} data-drive-retry>
                Try again
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/** No WebGL: the same question the ordinary way, with the same rule and source. */
function FallbackQuiz({
  title,
  record,
  fallback,
  testHref,
  nextHref,
  next,
  onTest,
}: {
  title: string;
  record: DriveRecord;
  fallback: FallbackQuestion;
  testHref: string;
  nextHref: string;
  next: { slug: string; title: string };
  onTest: (from: string) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  return (
    <section aria-label={`${title}: question`} data-drive-mode="fallback" className="mx-auto max-w-xl space-y-4 px-4 py-8 text-gray-900 dark:text-gray-50">
      <p className="text-sm text-gray-600 dark:text-gray-300">This device cannot show the driving scene, so here is the question itself.</p>
      <h2 className="text-xl font-bold">{fallback.question}</h2>
      <div className="grid gap-2">
        {fallback.options.map((option, index) => {
          const state = !answered ? "" : index === fallback.correctIndex ? " !border-green-600 bg-green-50 dark:bg-green-950" : index === picked ? " !border-red-600 bg-red-50 dark:bg-red-950" : " opacity-70";
          return (
            <button key={option} type="button" disabled={answered} className={button + state} onClick={() => setPicked(index)}>
              {option}
              {answered && index === fallback.correctIndex && <span className="sr-only"> (correct answer)</span>}
            </button>
          );
        })}
      </div>
      {answered && (
        <div role="status" className="space-y-3">
          <p className="font-bold">{picked === fallback.correctIndex ? "Correct." : "Not quite."}</p>
          <p>{record.ruleText}</p>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            Source:{" "}
            <a className="underline" href={record.citation.url} target="_blank" rel="noopener noreferrer">
              {record.citation.source}
            </a>
            , {record.citation.section}.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link className={primary} href={nextHref}>
              Next: {next.title}
            </Link>
            <Link className={secondary} href={testHref} onClick={() => onTest("fallback")}>
              Take the full test
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
