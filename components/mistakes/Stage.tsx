import { BeatTiming, MistakeManifest, ramp } from "@/lib/mistakeExplainers";

/**
 * Timing helpers shared by the mistake explainer scenes and Stage2: a scene
 * gets the clock `t` and each beat's timing, and keys its animation to beats
 * and to the moment a word is spoken, so every frame is a pure function of t.
 */

export interface SceneProps {
  t: number;
  /** A beat's timing by id (start, end, words). */
  at: (id: string) => BeatTiming;
}

export function sceneHelpers({ t, at }: SceneProps) {
  /** 0..1 as beat `id` starts (+ delay). */
  const p = (id: string, delay = 0, dur = 0.8) => ramp(t, at(id).start + delay, dur);
  /** 0..1 from the moment `word` (text, or index in the beat) is spoken. */
  const onWord = (id: string, word: string | number, dur = 0.6) => {
    const b = at(id);
    const i = typeof word === "number" ? word : b.words.findIndex((w) => w.w.toLowerCase().replace(/[^a-z0-9'-]/g, "") === word);
    const start = i >= 0 && b.words[i] ? b.words[i].start : b.start;
    return ramp(t, start, dur);
  };
  return { p, onWord };
}

/** The speaking beat and word at t. */
export function speaking(m: MistakeManifest, t: number) {
  let bi = 0;
  for (let i = 0; i < m.beats.length; i++) if (t >= m.beats[i].start - 0.05) bi = i;
  const beat = m.beats[bi];
  const wi = beat.words.findIndex((w) => t >= w.start && t < w.end);
  return { bi, wi, talking: wi >= 0 };
}
