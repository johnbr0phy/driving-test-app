import { BasicsExample, BasicsSkill } from "./basics";
import voiced from "./voiced-skills.json";

/**
 * Basics explainer: a 40-second animated walk through one skill, played
 * when a question is missed instead of (or as well as) the rule card. The
 * storyboard is built from the fields every skill already has, so there is
 * one template per example style rather than one video per skill.
 *
 * Two templates exist. Sentence: skills whose examples are a good/bad pair
 * of sentences (grammar and writing); the words that differ between the
 * pair are what the animation highlights. Worked: skills whose examples
 * are `eg` items with a note of steps (math); the expression is shown
 * large and the note's sentences appear one by one as steps, the last
 * ("So ...") as the answer. A Data template (table or passage) comes later.
 *
 * The storyboard is rule, trick, the two examples, then "now you try":
 * under 40 seconds. The ELI5 picture stays on the rule card behind its
 * button, for whoever still wants it after that.
 *
 * Each beat has what the voice says, split into `lead` (a spoken lead-in
 * that is not shown), `show` (the text on screen, highlighted word by word
 * as it is read) and `tail` (lines that appear as they are spoken). Word
 * timings come from `public/basics-audio/<skillId>.json`, written by
 * `scripts/build-basics-audio.ts` from ElevenLabs' character alignment.
 * Without that file the explainer runs silently on estimated timings.
 */

export type ExplainerBeatId = "rule" | "trick" | "bad" | "good" | "work1" | "work2" | "close";

export type ExplainerTemplate = "sentence" | "worked";

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

/** The worked examples a skill offers: `eg` items that carry a note of steps. */
const workedExamples = (skill: BasicsSkill) => skill.examples.filter((e) => e.kind === "eg" && !!e.note).slice(0, 2);

/**
 * Which template a skill fits, or null. Sentence needs a good and a bad
 * sentence; Worked needs at least one `eg` example with steps. Both need
 * nothing to read beside them (no table, no passage).
 */
export function explainerTemplate(skill: BasicsSkill): ExplainerTemplate | null {
  if (skill.table || skill.passage) return null;
  const kinds = new Set(skill.examples.map((e) => e.kind));
  if (kinds.has("good") && kinds.has("bad")) return "sentence";
  if (workedExamples(skill).length > 0) return "worked";
  return null;
}

export function canExplain(skill: BasicsSkill): boolean {
  return explainerTemplate(skill) !== null;
}

/** A note's sentences, one step each. Splits after a full stop only, so "Which adds to 5? 2 and 3." stays one line. */
export function steps(note: string): string[] {
  return note.split(/(?<=[.!])\s+(?=\S)/).map((s) => s.trim()).filter(Boolean);
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

/**
 * The storyboard for one skill. Sentence: bad example first, then the good
 * one, so the fix lands last. Worked: each example's expression, then its
 * steps.
 */
export function buildExplainer(skill: BasicsSkill): ExplainerBeat[] {
  const beats: ExplainerBeat[] = [
    beat("rule", `${skill.name}.`, skill.rule),
    beat("trick", "Here's the trick.", skill.trick),
  ];
  const template = explainerTemplate(skill);
  if (template === "sentence") {
    const bad = skill.examples.find((e) => e.kind === "bad")!;
    const good = skill.examples.find((e) => e.kind === "good")!;
    beats.push(beat("bad", "This one doesn't work:", bad.text, bad.note ? [bad.note] : [], { tokens: diffTokens(bad.text, good.text), example: bad }));
    beats.push(beat("good", "This one works:", good.text, good.note ? [good.note] : [], { tokens: diffTokens(good.text, bad.text), example: good }));
  } else if (template === "worked") {
    const leads = ["Let's work one.", "One more."];
    workedExamples(skill).forEach((eg, i) => {
      beats.push(beat(i === 0 ? "work1" : "work2", leads[i], eg.text, steps(eg.note ?? ""), { example: eg }));
    });
  }
  beats.push(beat("close", "", "Now you try."));
  return beats;
}

/** Beats that show an example and should stay on screen a moment after the last word. */
export const isExampleBeat = (id: ExplainerBeatId) => id === "bad" || id === "good" || id === "work1" || id === "work2";

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
    const hold = isExampleBeat(b.id) ? 0.8 : 0;
    t = cursor + PAUSE_AFTER + hold;
    return { id: b.id, start, end: t, words: timed };
  });
}
