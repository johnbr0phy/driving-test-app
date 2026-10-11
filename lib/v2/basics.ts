import grammar from "@/data/v2/basics/skills.json";
import reading from "@/data/v2/basics/reading.json";
import math from "@/data/v2/basics/math.json";
import science from "@/data/v2/basics/science.json";
import writing from "@/data/v2/basics/writing.json";
import { BasicsSkillState, DrillDef, ExamV2Config } from "./types";

/**
 * Basics: the first level inside a v2 phone drill. Each skill is one rule a
 * student has to understand before the exam-level questions make sense
 * (semicolons, slope, reading a table), taught as a 20-second rule card and
 * a handful of one-line questions. Skills live in one shared library
 * (data/v2/basics/skills.json) and a drill lists the ones it opens with
 * (`DrillDef.basics`), so SAT and ACT Conventions share Semicolons.
 */

export interface BasicsTable {
  head: string[];
  rows: string[][];
}

export interface BasicsExample {
  kind: "good" | "bad" | "eg";
  text: string;
  note?: string;
}

export interface BasicsQuestion {
  /** Fill-the-blank sentence with `__` where the answer goes. */
  blank?: string;
  /** Plain question stem, when it is not a blank. */
  stem?: string;
  options: string[];
  answer: number;
  why: string;
  table?: BasicsTable;
  /** A two or three sentence mini-passage above the stem (reading skills). */
  passage?: string;
}

export interface BasicsSkill {
  id: string;
  name: string;
  sub: string;
  rule: string;
  trick: string;
  examples: BasicsExample[];
  /** An ELI5 explanation (a picture a little kid already knows), behind the "ELI5" button. */
  another: { text: string; example: string };
  /** Data the whole skill reads from (shown on the rule card and plain-stem questions). */
  table?: BasicsTable;
  /** A short worked passage on the rule card (reading skills). */
  passage?: string;
  questions: BasicsQuestion[];
}

const LIBRARY: Record<string, BasicsSkill> = Object.fromEntries(
  ([...grammar, ...reading, ...math, ...science, ...writing] as BasicsSkill[]).map((s) => [s.id, s])
);

/** Punctuation marks shown with their names on a blank question. */
export const PUNCTUATION_NAMES: Record<string, string> = { ";": "semicolon", ",": "comma", ":": "colon", "": "no punctuation" };

export function isPunctuationQuestion(q: BasicsQuestion): boolean {
  return !!q.blank && q.options.every((o) => o in PUNCTUATION_NAMES);
}

/** The Basics skills a drill opens with, in order. Empty when it has none yet. */
export function basicsFor(drill: DrillDef): BasicsSkill[] {
  return (drill.basics ?? []).map((id) => LIBRARY[id]).filter((s): s is BasicsSkill => !!s);
}

export function basicsKey(examId: string, skillId: string) {
  return `${examId}:${skillId}`;
}

export function basicsDone(basics: Record<string, BasicsSkillState>, examId: string, skills: BasicsSkill[]): number {
  return skills.filter((s) => basics[basicsKey(examId, s.id)]?.done).length;
}

/** True when a drill has Basics and every skill is learned. */
export function basicsComplete(basics: Record<string, BasicsSkillState>, exam: ExamV2Config, drill: DrillDef): boolean {
  const skills = basicsFor(drill);
  return skills.length > 0 && basicsDone(basics, exam.id, skills) === skills.length;
}

/**
 * One Basics run: fresh questions in order, misses pushed to the back and
 * asked again until every question has been answered correctly.
 */
export interface BasicsRun {
  queue: number[];
  mastered: number[];
  retried: number[];
  misses: number;
  /** The rule card has already come back once after two misses. */
  reviewed: boolean;
}

export function newBasicsRun(skill: BasicsSkill): BasicsRun {
  return { queue: skill.questions.map((_, i) => i), mastered: [], retried: [], misses: 0, reviewed: false };
}

export function answerBasics(run: BasicsRun, index: number, correct: boolean): BasicsRun {
  const queue = run.queue.filter((i) => i !== index);
  if (correct) return { ...run, queue, mastered: [...run.mastered, index] };
  return { ...run, queue: [...queue, index], retried: run.retried.includes(index) ? run.retried : [...run.retried, index], misses: run.misses + 1 };
}

/**
 * Deterministic option order for one question, so the key does not sit in
 * the same slot run after run (the authored keys lean on the middle slot).
 * Same skill and question always shuffle the same way.
 */
export function basicsOptionOrder(skillId: string, questionIndex: number, count: number): number[] {
  let h = 2166136261 ^ questionIndex;
  for (const c of skillId) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}
