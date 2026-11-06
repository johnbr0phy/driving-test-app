"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, X } from "lucide-react";
import { AccessibleOverlay } from "@/components/AccessibleOverlay";
import { estimateTimings, manifestMatches, mistakeAudioUrl, mistakeManifestUrl, type MistakeExplainer, type MistakeManifest } from "@/lib/mistakeExplainers";
import { Stage } from "./Stage";
import { SCENES } from "./scenes";

/**
 * The full-screen player for one mistake explainer. It opens on a Play
 * screen (the tap phones need before sound), then one clock drives the run:
 * the audio element when the voice and its manifest are there, else
 * estimated timings, labelled "no sound".
 */

type Status = "ready" | "audio" | "silent" | "done";

export function useMistakeManifest(ex: MistakeExplainer) {
  const [manifest, setManifest] = useState<MistakeManifest | null | undefined>(undefined);
  useEffect(() => {
    let live = true;
    fetch(mistakeManifestUrl(ex.id))
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((m) => live && setManifest(manifestMatches(ex, m) ? m : null));
    return () => {
      live = false;
    };
  }, [ex]);
  return manifest;
}

export function MistakeExplainerPlayer({ ex, onClose }: { ex: MistakeExplainer; onClose: () => void }) {
  const manifest = useMistakeManifest(ex);
  const estimated = useMemo(() => estimateTimings(ex), [ex]);
  const m = manifest ?? estimated;
  const Scene = SCENES[ex.id];

  const audio = useRef<HTMLAudioElement | null>(null);
  const silent = useRef({ base: 0, at: 0 });
  const [status, setStatus] = useState<Status>("ready");
  const [paused, setPaused] = useState(false);
  const [t, setT] = useState(0);

  useEffect(() => {
    if (typeof Audio === "undefined") return;
    const a = new Audio(mistakeAudioUrl(ex.id));
    a.preload = "auto";
    audio.current = a;
    return () => {
      a.pause();
      audio.current = null;
    };
  }, [ex.id]);

  const runSilent = (from: number) => {
    audio.current?.pause();
    silent.current = { base: from, at: performance.now() };
    setStatus("silent");
  };

  const start = (from = 0) => {
    setPaused(false);
    setT(from);
    const a = audio.current;
    if (!a || !manifest) return runSilent(from);
    a.currentTime = from;
    setStatus("audio");
    a.play().catch(() => runSilent(from));
  };

  useEffect(() => {
    if (status !== "audio" && status !== "silent") return;
    let raf = 0;
    const tick = () => {
      let now: number;
      if (status === "audio" && audio.current) {
        const a = audio.current;
        // Past the voice, keep the clock going for the hold.
        now = a.ended ? a.duration + (performance.now() - silent.current.at) / 1000 : a.currentTime;
        if (!a.ended) silent.current.at = performance.now();
      } else {
        now = paused ? silent.current.base : silent.current.base + (performance.now() - silent.current.at) / 1000;
      }
      if (now >= m.duration) {
        setT(m.duration);
        setStatus("done");
        return;
      }
      setT(now);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [status, paused, m.duration]);

  const togglePause = () => {
    if (status === "audio" && audio.current) {
      if (paused) audio.current.play().catch(() => runSilent(t));
      else audio.current.pause();
    } else if (status === "silent") {
      silent.current = { base: t, at: performance.now() };
    }
    setPaused(!paused);
  };

  if (!Scene) return null;

  return (
    <AccessibleOverlay onClose={onClose} aria-label={`Explainer: ${ex.title}`} className="fixed inset-0 z-[80] bg-black/85 flex items-center justify-center p-2 sm:p-6">
      <div className="relative h-full max-h-[min(100dvh,1000px)] aspect-[9/16] max-w-full rounded-2xl overflow-hidden shadow-2xl bg-[#07152e]">
        <Stage ex={ex} m={m} t={t} Scene={Scene} silent={status === "silent"} />

        {status === "ready" && (
          <button onClick={() => start(0)} className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#07152e]/70 text-white">
            <span className="w-20 h-20 rounded-full bg-[#ffcf3f] text-[#07152e] flex items-center justify-center shadow-lg">
              <Play className="w-9 h-9 ml-1" fill="currentColor" />
            </span>
            <span className="text-lg font-semibold">Watch the explainer</span>
            <span className="text-sm text-white/70">{manifest === null ? "About 45 seconds" : "About 45 seconds · sound on"}</span>
          </button>
        )}

        {status === "done" && (
          <div className="absolute inset-x-0 bottom-16 flex justify-center gap-3">
            <button onClick={() => start(0)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium backdrop-blur">
              <RotateCcw className="w-4 h-4" /> Watch again
            </button>
            <button onClick={onClose} className="px-5 py-2 rounded-full bg-[#ffcf3f] text-[#07152e] text-sm font-bold">Got it</button>
          </div>
        )}

        <div className="absolute top-2 right-2 flex gap-2">
          {(status === "audio" || status === "silent") && (
            <button onClick={togglePause} aria-label={paused ? "Play" : "Pause"} className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center">
              {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          )}
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AccessibleOverlay>
  );
}
