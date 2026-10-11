import { BasicsExample, BasicsSkill } from "./basics";
import voiced from "./voiced-skills.json";

/**
 * Basics explainer: a 40-second animated walk through one skill, played
 * when a question is missed instead of (or as well as) the rule card. The
 * storyboard is built from the fields every skill already has, so there is
 * one template per example style rather than one video per skill.
 *
 * Today only the Sentence template exists: skills whose examples are a
 * good/bad pair of sentences (grammar and writing). The words that differ
 * between the pair are what the animation highlights. Worked (math `eg`
 * steps) and Data (table or passage) templates come later.
 *
 * Each beat has what the voice says, split into `lead` (a spoken lead-in
 * that is not shown), `show` (the text on screen, highlighted word by word
 * as it is read) and `tail` (lines that appear as they are spoken). Word
 * timings come from `public/basics-audio/<skillId>.json`, written by
 * `scripts/build-basics-audio.ts` from ElevenLabs' character alignment.
 * Without that file the explainer runs silently on estimated timings.
 */

export type ExplainerBeatId = "rule" | "trick" | "bad" | "good" | "eli5" | "close";

export interface ExplainerToken {
  text: string;
  /** Differs from the partner sentence, so it carries the mistake or the fix. */
  changed: boolean;
}

export interface ExplainerBeat {
  id: ExplainerBeatId;
  lead: string;
  show: string;
  tail: string[];
  /** The full spoken line: lead, show and tail joined. The audio builder sends this. */
  say: string;
  /** `show` split into tokens, for the Sentence template's highlights. */
  tokens?: ExplainerToken[];
  example?: BasicsExample;
}

export interface ExplainerWord {
  text: string;
  start: number;
  end: number;
}

export interface ExplainerBeatTiming {
  id: ExplainerBeatId;
  start: number;
  end: number;
  /** Every word of `say`, in order, with the time it is spoken. */
  words: ExplainerWord[];
}

/** `public/basics-audio/<skillId>.json`, next to the mp3. */
export interface ExplainerManifest {
  skillId: string;
  voice: string;
  model: string;
  duration: number;
  beats: ExplainerBeatTiming[];
}

export function explainerAudioUrl(skillId: string) {
  return `/basics-audio/${skillId}.mp3`;
}

export function explainerManifestUrl(skillId: string) {
  return `/basics-audio/${skillId}.json`;
}

export const words = (s: string) => s.split(/\s+/).filter(Boolean);

/** The Sentence template needs a good and a bad sentence and nothing to read beside them. */
export function canExplain(skill: BasicsSkill): boolean {
  const kinds = new Set(skill.examples.map((e) => e.kind));
  return kinds.has("good") && kinds.has("bad") && !skill.table && !skill.passage;
}

/** Skills whose voice is built: `lib/v2/voiced-skills.json`, rewritten by scripts/build-basics-audio.ts from public/basics-audio/. */
const VOICED = new Set<string>(voiced as string[]);

/** Only a skill with a template and a recorded voice shows the "Watch" buttons. */
export function hasExplainer(skill: BasicsSkill): boolean {
  return canExplain(skill) && VOICED.has(skill.id);
}

/**
 * Mark the tokens of `a` that do not appear in `b` (as a multiset, case
 * folded, punctuation kept so "movie," and "movie" count as different).
 */
export function diffTokens(a: string, b: string): ExplainerToken[] {
  const pool = new Map<string, number>();
  for (const w of words(b)) {
    const k = w.toLowerCase();
    pool.set(k, (pool.get(k) ?? 0) + 1);
  }
  return words(a).map((text) => {
    const k = text.toLowerCase();
    const n = pool.get(k) ?? 0;
    if (n > 0) {
      pool.set(k, n - 1);
      return { text, changed: false };
    }
    return { text, changed: true };
  });
}

function beat(id: ExplainerBeatId, lead: string, show: string, tail: string[] = [], extra: Partial<ExplainerBeat> = {}): ExplainerBeat {
  const say = [lead, show, ...tail].map((s) => s.trim()).filter(Boolean).join(" ");
  return { id, lead, show, tail, say, ...extra };
}

/** The storyboard for one skill. Bad example first, then the good one, so the fix lands last. */
export function buildExplainer(skill: BasicsSkill): ExplainerBeat[] {
  const bad = skill.examples.find((e) => e.kind === "bad");
  const good = skill.examples.find((e) => e.kind === "good");
  const beats: ExplainerBeat[] = [
    beat("rule", `${skill.name}.`, skill.rule),
    beat("trick", "Here's the trick.", skill.trick),
  ];
  if (bad && good) {
    beats.push(beat("bad", "This one doesn't work:", bad.text, bad.note ? [bad.note] : [], { tokens: diffTokens(bad.text, good.text), example: bad }));
    beats.push(beat("good", "This one works:", good.text, good.note ? [good.note] : [], { tokens: diffTokens(good.text, bad.text), example: good }));
  }
  beats.push(beat("eli5", "Think of it this way.", skill.another.text, skill.another.example.split("\n").map((l) => l.trim()).filter(Boolean)));
  beats.push(beat("close", "", "Now try it again."));
  return beats;
}

/** Word index where `show` starts and where each `tail` line starts, within `say`. */
export function beatOffsets(b: ExplainerBeat) {
  const showAt = words(b.lead).length;
  const tailAt: number[] = [];
  let at = showAt + words(b.show).length;
  for (const line of b.tail) {
    tailAt.push(at);
    at += words(line).length;
  }
  return { showAt, tailAt, total: at };
}

const WORDS_PER_SECOND = 2.6;
const LEAD_IN = 0.35;
const PAUSE_AFTER = 0.9;

/** Timings for a silent run: even word spacing at reading pace, a pause between beats. */
export function estimateTimings(beats: ExplainerBeat[]): ExplainerBeatTiming[] {
  let t = 0.4;
  return beats.map((b) => {
    const ws = words(b.say);
    const start = t;
    let cursor = start + LEAD_IN;
    const step = 1 / WORDS_PER_SECOND;
    const timed = ws.map((text) => {
      const w = { text, start: cursor, end: cursor + step };
      cursor += step;
      return w;
    });
    // Leave the example on screen a moment after the last word so the highlight is seen.
    const hold = b.id === "bad" || b.id === "good" ? 0.8 : 0;
    t = cursor + PAUSE_AFTER + hold;
    return { id: b.id, start, end: t, words: timed };
  });
}
