"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { BookOpen, Pause, Play, RotateCcw, X } from "lucide-react";
import { ExamV2Config } from "@/lib/v2/types";
import { BasicsSkill } from "@/lib/v2/basics";
import { ExplainerBeat, ExplainerBeatTiming, ExplainerManifest, beatOffsets, buildExplainer, estimateTimings, explainerAudioUrl, explainerManifestUrl, words } from "@/lib/v2/explainer";
import { getTigerAsset, TigerExpression } from "@/lib/tigerAssets";

/**
 * The 30-second explainer for one Basics skill: the tiger walks through the
 * rule, the trick, a sentence that breaks it and one that follows it, with
 * the words lighting up as they are read. It is the first thing a voiced
 * skill shows; the text card is one tap away ("Read it instead").
 *
 * It opens on a Play screen. That tap is the user gesture phones require
 * before any sound, so play() is called inside it and nothing has to guess
 * about autoplay. One clock then drives the run: with the skill's audio and
 * manifest in public/basics-audio/ the audio element is the clock, so every
 * highlight lands on the spoken word; when they are missing, or the audio
 * fails, it runs silently on estimated timings and says so.
 */

type Status = "ready" | "starting" | "audio" | "silent";

const FACES: Record<ExplainerBeat["id"], TigerExpression> = { rule: 3, trick: 4, bad: 6, good: 1, close: 2 };
const LABELS: Record<ExplainerBeat["id"], string> = { rule: "The rule", trick: "The trick", bad: "Doesn't work", good: "Works", close: "" };

/** After Play, how long to wait for the manifest before running silently. */
const MANIFEST_WAIT_MS = 8000;

export function BasicsExplainer({ exam, skill, doneLabel, onDone, onClose, onRead }: {
  exam: ExamV2Config;
  skill: BasicsSkill;
  /** The primary button at the end (and what Skip does): "Got it, try 2 questions", "Try it again"... */
  doneLabel: string;
  onDone: () => void;
  /** The X in the corner. */
  onClose: () => void;
  /** "Read it instead" on the Play screen, when the text card is the alternative. */
  onRead?: () => void;
}) {
  const beats = useMemo(() => buildExplainer(skill), [skill]);
  const estimated = useMemo(() => estimateTimings(beats), [beats]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioFailed = useRef(false);
  const startedAt = useRef(0);
  const silent = useRef({ accum: 0, last: 0 });
  const shown = useRef(0);

  const [status, setStatus] = useState<Status>("ready");
  const [manifest, setManifest] = useState<ExplainerManifest | null | undefined>(undefined);
  const [paused, setPaused] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [t, setT] = useState(0);

  // The manifest, checked against the storyboard so stale audio never drives the wrong words.
  useEffect(() => {
    let live = true;
    fetch(explainerManifestUrl(skill.id))
      .then((r) => (r.ok ? (r.json() as Promise<ExplainerManifest>) : null))
      .catch(() => null)
      .then((m) => {
        if (!live) return;
        const ok = !!m && m.beats.length === beats.length && m.beats.every((b, i) => b.id === beats[i].id && b.words.length === words(beats[i].say).length);
        setManifest(ok ? m : null);
      });
    return () => {
      live = false;
    };
  }, [skill.id, beats]);

  // The audio element, created up front so the Play tap only has to call play().
  useEffect(() => {
    if (typeof Audio === "undefined") {
      audioFailed.current = true;
      return;
    }
    const a = new Audio(explainerAudioUrl(skill.id));
    a.preload = "auto";
    audioRef.current = a;
    const onError = () => {
      audioFailed.current = true;
    };
    a.addEventListener("error", onError);
    return () => {
      a.pause();
      a.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, [skill.id]);

  const goSilent = (from = 0) => {
    audioRef.current?.pause();
    silent.current = { accum: from, last: performance.now() };
    shown.current = from;
    setT(from);
    setPaused(false);
    setStatus("silent");
  };

  /** The Play tap: the one user gesture, so play() is called right here. */
  const start = () => {
    if (status !== "ready") return;
    const a = audioRef.current;
    startedAt.current = performance.now();
    if (!a || audioFailed.current || manifest === null) {
      goSilent();
      return;
    }
    setStatus("starting");
    a.play().catch(() => goSilent());
  };

  // One clock. "starting" waits for the manifest while the audio spins up; then it reads time.
  useEffect(() => {
    if (status === "ready") return;
    let raf = 0;
    const tick = () => {
      const a = audioRef.current;
      const now = performance.now();
      if (status === "starting") {
        if (audioFailed.current || manifest === null || !a) goSilent();
        else if (manifest) setStatus("audio");
        else if (now - startedAt.current > MANIFEST_WAIT_MS) goSilent();
      } else if (status === "audio" && a) {
        if (audioFailed.current) {
          goSilent(shown.current);
        } else {
          const total = manifest?.duration ?? estimated[estimated.length - 1].end;
          const cur = a.ended ? total : a.currentTime;
          if (Math.abs(cur - shown.current) > 0.03) {
            shown.current = cur;
            setT(cur);
          }
          setPaused(a.paused && !a.ended);
          setBuffering(!a.paused && !a.ended && a.readyState < 3);
        }
      } else if (status === "silent") {
        if (!paused) silent.current.accum += (now - silent.current.last) / 1000;
        silent.current.last = now;
        if (Math.abs(silent.current.accum - shown.current) > 0.03) {
          shown.current = silent.current.accum;
          setT(silent.current.accum);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, manifest, paused, estimated]);

  const timings: ExplainerBeatTiming[] = status === "audio" && manifest ? manifest.beats : estimated;
  const total = timings[timings.length - 1].end;
  let index = 0;
  for (let k = 0; k < timings.length; k++) if (timings[k].start <= t) index = k;
  const beat = beats[index];
  const timing = timings[index];
  const done = t >= total - 0.05;
  const closing = beat.id === "close";
  const running = status === "audio" || status === "silent";
  let spoken = 0;
  for (const w of timing.words) if (w.start <= t) spoken++;
  else break;

  const seek = (s: number) => {
    const a = audioRef.current;
    if (status === "audio" && a) {
      a.currentTime = s;
      if (a.paused || a.ended) a.play().catch(() => {});
    } else {
      silent.current = { accum: s, last: performance.now() };
      setPaused(false);
    }
    shown.current = s;
    setT(s);
  };

  const togglePause = () => {
    if (status === "ready") {
      start();
      return;
    }
    const a = audioRef.current;
    if (status === "audio" && a) {
      if (a.ended) seek(0);
      else if (a.paused) a.play().catch(() => {});
      else a.pause();
    } else if (status === "silent") setPaused((p) => !p);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        togglePause();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // The real length once the manifest is in; before that, no number to flicker.
  const length = manifest ? `${Math.round(manifest.duration)} seconds` : "half a minute";
  const subline = status === "silent" ? `Explainer · ${Math.round(total)} seconds · no sound` : `Explainer · ${length}`;

  return (
    <div className="fixed inset-0 z-[95] flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50" role="dialog" aria-modal="true" aria-label={`${skill.name} explainer`}>
      <div className="v2-safe-top shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pb-2">
        <div className="flex items-center gap-2">
          <button type="button" onClick={onClose} className="v2-tap -ml-1 flex w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400" aria-label="Close the explainer">
            <X className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold">{skill.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{subline}</div>
          </div>
          {onRead && (
            <button type="button" onClick={onRead} className="flex items-center gap-1.5 rounded-full border-2 border-gray-200 dark:border-gray-800 px-3 py-1.5 text-sm font-semibold text-brand">
              <BookOpen className="h-4 w-4" /> Read it
            </button>
          )}
        </div>
        <div className="mt-2 flex gap-1">
          {timings.map((tm, k) =>
            beats[k].id === "close" ? null : (
              <button key={tm.id} type="button" disabled={!running} onClick={() => seek(tm.start)} className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700" aria-label={`Jump to ${LABELS[tm.id]}`}>
                <div className="h-full rounded-full bg-brand transition-[width] duration-150" style={{ width: running ? `${Math.round(Math.min(1, Math.max(0, (t - tm.start) / (tm.end - tm.start))) * 100)}%` : "0%" }} />
              </button>
            )
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" onClick={closing ? undefined : togglePause}>
        <div className="mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center gap-3 px-4 py-6 pb-16">
          {running ? (
            <>
              <Image key={FACES[beat.id]} src={getTigerAsset(exam.id, FACES[beat.id])} alt="" width={112} height={112} className="v2-pop h-28 w-28 object-contain" />
              <Bubble key={beat.id}>
                {LABELS[beat.id] && <SectionLabel>{LABELS[beat.id]}</SectionLabel>}
                <BeatBody beat={beat} spoken={spoken} />
              </Bubble>
              {paused && !closing && <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Paused · tap to continue</div>}
            </>
          ) : (
            <>
              <Image src={getTigerAsset(exam.id, 3)} alt="" width={112} height={112} className="h-28 w-28 object-contain" />
              <Bubble>
                <SectionLabel>{skill.sub}</SectionLabel>
                <p className="text-2xl font-bold leading-tight">{skill.name}, in {length}.</p>
                <p className="mt-2 text-[17px] leading-relaxed text-gray-600 dark:text-gray-300">The rule, the trick, one sentence that breaks it and one that follows it. Sound on.</p>
              </Bubble>
            </>
          )}
        </div>
      </div>

      <div className="v2-safe-bottom shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pt-3">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          {!running ? (
            <>
              <button type="button" onClick={onDone} className="v2-tap px-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Skip
              </button>
              <button type="button" onClick={start} disabled={status === "starting"} className="v2-tap flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand text-base font-bold text-white disabled:opacity-70">
                <Play className="h-5 w-5 fill-current" /> {status === "starting" ? "Starting..." : "Play"}
              </button>
            </>
          ) : closing || done ? (
            <>
              <button type="button" onClick={() => seek(0)} className="v2-tap flex items-center justify-center gap-1.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 px-4 text-sm font-semibold text-gray-700 dark:text-gray-200" aria-label="Replay">
                <RotateCcw className="h-4 w-4" /> Replay
              </button>
              <button type="button" onClick={onDone} className="v2-tap flex-1 rounded-xl bg-brand text-base font-bold text-white">
                {doneLabel}
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={togglePause} className="v2-tap flex w-12 items-center justify-center rounded-xl border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200" aria-label={paused ? "Play" : "Pause"}>
                {paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
              </button>
              <div className="flex-1 text-center text-sm text-gray-500 dark:text-gray-400">{buffering ? "Loading sound..." : "Tap anywhere to pause"}</div>
              <button type="button" onClick={onDone} className="v2-tap px-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Skip
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Bubble({ children }: { children: ReactNode }) {
  return (
    <div className="v2-pop relative w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-4 shadow-sm">
      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900" />
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{children}</div>;
}

/** One beat's text, lit word by word; the Sentence template adds the strike and the fix. */
function BeatBody({ beat, spoken }: { beat: ExplainerBeat; spoken: number }) {
  const { showAt, tailAt } = beatOffsets(beat);
  const tokens = beat.tokens ?? words(beat.show).map((text) => ({ text, changed: false }));
  const showDone = spoken >= showAt + tokens.length;
  const sentence = beat.id === "bad" || beat.id === "good";
  const size = beat.id === "rule" ? "text-2xl font-semibold leading-snug" : beat.id === "close" ? "text-2xl font-bold" : "text-[19px] leading-relaxed";

  return (
    <div className="flex flex-col gap-3">
      <p className={`${size} ${sentence ? "font-medium" : ""}`}>
        {tokens.map((tok, i) => {
          const lit = spoken > showAt + i;
          let cls = lit ? "text-gray-900 dark:text-gray-50" : "text-gray-300 dark:text-gray-600";
          if (sentence && tok.changed && lit) {
            cls = beat.id === "bad"
              ? "rounded bg-red-100 px-1 text-red-700 line-through decoration-red-500 decoration-2 dark:bg-red-950 dark:text-red-300"
              : "rounded bg-green-100 px-1 font-bold text-green-800 dark:bg-green-950 dark:text-green-300";
          }
          return (
            <span key={i} className={`transition-colors duration-150 ${cls}`}>
              {tok.text}
              {i < tokens.length - 1 ? " " : ""}
            </span>
          );
        })}
      </p>
      {sentence && showDone && (
        <div className={`v2-pop flex items-center gap-2 text-[15px] font-bold ${beat.id === "bad" ? "text-red-600 dark:text-red-300" : "text-green-700 dark:text-green-300"}`}>
          <span className="text-xl leading-none">{beat.id === "bad" ? "✗" : "✓"}</span>
          {beat.id === "bad" ? "Breaks the rule" : "Follows the rule"}
        </div>
      )}
      {beat.tail.map((line, j) =>
        spoken > tailAt[j] ? (
          <p key={j} className="v2-pop text-[15px] leading-snug text-gray-600 dark:text-gray-300">{line}</p>
        ) : null
      )}
    </div>
  );
}
