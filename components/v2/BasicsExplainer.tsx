"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, RotateCcw, Volume2, X } from "lucide-react";
import { ExamV2Config } from "@/lib/v2/types";
import { BasicsSkill } from "@/lib/v2/basics";
import { ExplainerBeat, ExplainerBeatTiming, ExplainerManifest, beatOffsets, buildExplainer, estimateTimings, explainerAudioUrl, explainerManifestUrl, words } from "@/lib/v2/explainer";
import { getTigerAsset, TigerExpression } from "@/lib/tigerAssets";

/**
 * The 40-second explainer for one Basics skill: the tiger walks through the
 * rule, the trick, a sentence that breaks it, one that follows it, and the
 * ELI5 picture, with the words lighting up as they are read.
 *
 * Runs off one clock. With the skill's audio and manifest in
 * public/basics-audio/ the clock is the audio element, so every highlight
 * lands on the spoken word. Without them (no voice generated yet, or
 * autoplay refused) it runs silently on estimated timings and offers a
 * "Sound" button when the audio turns out to be playable after all.
 */

type Status = "loading" | "audio" | "silent";

const FACES: Record<ExplainerBeat["id"], TigerExpression> = { rule: 3, trick: 4, bad: 6, good: 1, eli5: 2, close: 1 };
const LABELS: Record<ExplainerBeat["id"], string> = { rule: "The rule", trick: "The trick", bad: "Doesn't work", good: "Works", eli5: "ELI5 · explained like you're five", close: "" };

/** How long to wait for the manifest (and an audio start) before running silently. */
const AUDIO_WAIT_MS = 2500;
/** Hard cap on the start-up wait even while audio is playing but the manifest has not arrived. */
const MANIFEST_WAIT_MS = 8000;

export function BasicsExplainer({ exam, skill, audio: given, onClose, onTryAgain }: {
  exam: ExamV2Config;
  skill: BasicsSkill;
  /** An element whose play() was already called inside a tap, so iOS lets it sound. */
  audio?: HTMLAudioElement | null;
  onClose: () => void;
  onTryAgain?: () => void;
}) {
  const beats = useMemo(() => buildExplainer(skill), [skill]);
  const estimated = useMemo(() => estimateTimings(beats), [beats]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioFailed = useRef(false);
  const triedPlay = useRef(false);
  const mountedAt = useRef(0);
  const silent = useRef({ accum: 0, last: 0 });
  const shown = useRef(0);

  const [status, setStatus] = useState<Status>("loading");
  const [manifest, setManifest] = useState<ExplainerManifest | null | undefined>(undefined);
  const [paused, setPaused] = useState(false);
  const [soundOffer, setSoundOffer] = useState(false);
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

  // The audio element: the one handed in, or our own.
  useEffect(() => {
    mountedAt.current = performance.now();
    silent.current = { accum: 0, last: performance.now() };
    const a = given ?? (typeof Audio !== "undefined" ? new Audio(explainerAudioUrl(skill.id)) : null);
    audioRef.current = a;
    if (!a) {
      audioFailed.current = true;
      return;
    }
    a.preload = "auto";
    const onError = () => {
      audioFailed.current = true;
    };
    a.addEventListener("error", onError);
    return () => {
      a.pause();
      a.removeEventListener("error", onError);
    };
  }, [given, skill.id]);

  // One clock. While loading it decides between audio and silent; then it reads time.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const a = audioRef.current;
      const now = performance.now();
      const goSilent = (from = 0) => {
        // Audio started inside the tap must not keep talking under a silent run.
        a?.pause();
        silent.current = { accum: from, last: performance.now() };
        shown.current = from;
        setT(from);
        setStatus("silent");
      };
      if (status === "loading") {
        const waited = now - mountedAt.current;
        if (audioFailed.current || manifest === null) goSilent();
        else if (manifest && a) {
          // play() accepted (in the opening tap, or here) is enough: the clock
          // simply waits at 0 until the first bytes arrive. Phones often need
          // longer than a fixed wait to buffer, and iPhones load nothing at
          // all until a tap, so readiness is never a condition.
          if (!a.paused) setStatus("audio");
          else if (!triedPlay.current) {
            triedPlay.current = true;
            a.play().then(() => setStatus("audio")).catch(() => {
              setSoundOffer(true);
              goSilent();
            });
          }
        } else if (waited > MANIFEST_WAIT_MS || (waited > AUDIO_WAIT_MS && (!a || a.paused))) goSilent();
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
        // Sound can be turned on by a tap whenever the files exist, loaded or not.
        if (!soundOffer && manifest && !audioFailed.current) setSoundOffer(true);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [status, manifest, paused, soundOffer, estimated]);

  const timings: ExplainerBeatTiming[] = status === "audio" && manifest ? manifest.beats : estimated;
  const total = timings[timings.length - 1].end;
  let index = 0;
  for (let k = 0; k < timings.length; k++) if (timings[k].start <= t) index = k;
  const beat = beats[index];
  const timing = timings[index];
  const done = t >= total - 0.05;
  const closing = beat.id === "close";
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
    const a = audioRef.current;
    if (status === "audio" && a) {
      if (a.ended) seek(0);
      else if (a.paused) a.play().catch(() => {});
      else a.pause();
    } else setPaused((p) => !p);
  };

  // Inside a tap, so phones allow it; the run restarts from the top in sync with the voice.
  const turnOnSound = () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      a.currentTime = 0;
    } catch {
      // Not loaded yet: it starts at 0 anyway.
    }
    a.play()
      .then(() => {
        setSoundOffer(false);
        shown.current = 0;
        setT(0);
        setPaused(false);
        setStatus("audio");
      })
      .catch(() => setSoundOffer(false));
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

  const tryAgain = onTryAgain ?? onClose;

  return (
    <div className="fixed inset-0 z-[95] flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50" role="dialog" aria-modal="true" aria-label={`${skill.name} explainer`}>
      <div className="v2-safe-top shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pb-2">
        <div className="flex items-center gap-2">
          <button type="button" onClick={onClose} className="v2-tap -ml-1 flex w-10 items-center justify-center rounded-full text-gray-500 dark:text-gray-400" aria-label="Close the explainer">
            <X className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold">{skill.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Explainer · {Math.round(total)} seconds{status === "silent" ? " · no sound" : ""}</div>
          </div>
          {soundOffer && (
            <button type="button" onClick={turnOnSound} className="v2-tap flex items-center gap-1.5 rounded-full bg-brand px-4 text-sm font-bold text-white">
              <Volume2 className="h-4 w-4" /> Tap for sound
            </button>
          )}
        </div>
        <div className="mt-2 flex gap-1">
          {timings.map((tm, k) =>
            beats[k].id === "close" ? null : (
              <button key={tm.id} type="button" onClick={() => seek(tm.start)} className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700" aria-label={`Jump to ${LABELS[tm.id]}`}>
                <div className="h-full rounded-full bg-brand transition-[width] duration-150" style={{ width: `${Math.round(Math.min(1, Math.max(0, (t - tm.start) / (tm.end - tm.start))) * 100)}%` }} />
              </button>
            )
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" onClick={closing ? undefined : togglePause}>
        <div className="mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center gap-3 px-4 py-6 pb-16">
          <Image key={FACES[beat.id]} src={getTigerAsset(exam.id, FACES[beat.id])} alt="" width={112} height={112} className="v2-pop h-28 w-28 object-contain" />
          <div key={beat.id} className="v2-pop relative w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-4 shadow-sm">
            <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900" />
            {LABELS[beat.id] && <SectionLabel>{LABELS[beat.id]}</SectionLabel>}
            <BeatBody beat={beat} spoken={spoken} />
          </div>
          {paused && !closing && <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Paused · tap to continue</div>}
        </div>
      </div>

      <div className="v2-safe-bottom shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pt-3">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          {closing || done ? (
            <>
              <button type="button" onClick={() => seek(0)} className="v2-tap flex items-center justify-center gap-1.5 rounded-xl border-2 border-gray-200 dark:border-gray-800 px-4 text-sm font-semibold text-gray-700 dark:text-gray-200" aria-label="Replay">
                <RotateCcw className="h-4 w-4" /> Replay
              </button>
              <button type="button" onClick={tryAgain} className="v2-tap flex-1 rounded-xl bg-brand text-base font-bold text-white">
                Try it again
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={togglePause} className="v2-tap flex w-12 items-center justify-center rounded-xl border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200" aria-label={paused ? "Play" : "Pause"}>
                {paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
              </button>
              <div className="flex-1 text-center text-sm text-gray-500 dark:text-gray-400">{status === "loading" ? "Starting..." : buffering ? "Loading sound..." : "Tap anywhere to pause"}</div>
              <button type="button" onClick={onClose} className="v2-tap px-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Skip
              </button>
            </>
          )}
        </div>
      </div>
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
          beat.id === "eli5" ? (
            <div key={j} className="v2-pop border-l-2 border-brand pl-3 text-[17px] leading-relaxed text-gray-800 dark:text-gray-100">{line}</div>
          ) : (
            <p key={j} className="v2-pop text-[15px] leading-snug text-gray-600 dark:text-gray-300">{line}</p>
          )
        ) : null
      )}
    </div>
  );
}
