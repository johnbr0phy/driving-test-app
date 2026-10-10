/**
 * TigerTest v2: question model and exam configuration for sectioned, timed,
 * navigable exams (SAT, ACT, AP, ASVAB, GED). Lives beside the v1 flow and
 * shares nothing with it: separate store, routes, components and banks.
 */

export type QuestionFormat = "single" | "multi" | "numeric";

export interface Figure {
  src: string;
  alt: string;
}

export interface NumericAnswer {
  /** Every accepted spelling: "12", "3/4", "0.75", ".75", "-2". */
  answers: string[];
  /** Absolute tolerance when comparing numerically. 0 = exact. */
  tolerance?: number;
}

export interface QuestionV2 {
  id: string;
  section: string;
  test: number;
  module: number;
  /** Adaptive module variant. Items without a variant belong to every variant. */
  variant?: "lower" | "upper";
  domain: string;
  skill?: string;
  difficulty: 1 | 2 | 3;
  format: QuestionFormat;
  /** Inline stimulus (passage, notes, data) rendered beside or above the stem. */
  passage?: string;
  /** Shared stimulus id, resolved against the bank's stimuli. */
  stimulusId?: string;
  stem: string;
  options?: string[];
  correct?: number[];
  numeric?: NumericAnswer;
  lockedOrder?: boolean;
  figure?: Figure;
  calculator?: boolean;
  explanation: string;
}

export interface Stimulus {
  id: string;
  title?: string;
  text: string;
  figure?: Figure;
}

export interface QuestionBank {
  questions: QuestionV2[];
  stimuli: Record<string, Stimulus>;
}

/** Student answer: option indices for choice items, raw string for numeric. */
export type AnswerValue = number[] | string;

export interface ModuleDef {
  module: number;
  questionCount: number;
  /** Seconds. 0 = untimed (no clock, never auto-submits). */
  timeLimit: number;
  /** Adaptive: pick the variant of this module from the previous module's accuracy. */
  adaptive?: { threshold: number };
}

export interface SectionDef {
  key: string;
  name: string;
  shortName: string;
  modules: ModuleDef[];
  calculator?: boolean;
  /**
   * Computer-adaptive style (ASVAB): questions are answered in order, no
   * going back, no palette jumping, no review screen; each question must be
   * answered before Next.
   */
  linear?: boolean;
  /** Reference sheet (rich text) shown in the tools drawer. */
  reference?: string;
  /** Rich text shown on the section intro screen. */
  directions: string;
  /** Scaled score for this section from raw correct count. */
  scale: ScaleSpec;
  /** Domain keys in this section, in reporting order. */
  domains: string[];
}

export interface ScaleSpec {
  min: number;
  max: number;
  /** Index = raw correct; value = scaled score. Length = max raw + 1. */
  table: number[];
  /** Band around the estimate shown in results. */
  band: number;
}

export interface DrillDef {
  key: string;
  name: string;
  section: string;
  domains: string[];
  blurb: string;
  /** Short weight line on the dashboard step, e.g. "28% of Reading and Writing". */
  weight: string;
}

export interface ExamV2Config {
  id: string;
  slug: string;
  /** SEO landing page, the only URL of the exam meant to rank. */
  landingPath: string;
  name: string;
  shortName: string;
  fullName: string;
  tagline: string;
  /** Header and catalog icon key (see TestIcon). */
  icon: string;
  /** Theme brand colour tokens (HSL triplets like the v1 themes). */
  theme: { brand: string; brandDark: string; brandLight: string };
  sections: SectionDef[];
  /** Order of sections in a full test and a break between each pair. */
  breakSeconds: number;
  tests: { number: number; name: string }[];
  domainLabels: Record<string, string>;
  drills: DrillDef[];
  /** Composite from the scored sections (scaled, raw and total per section, in exam order). */
  composite: { name: string; min: number; max: number; combine: (sections: SectionResult[]) => number };
  /** Default goal for the goal picker. */
  defaultGoal: number;
  goalChoices: number[];
  /** One line under each goal choice, e.g. "Top 25% of test takers". */
  goalNotes: Record<number, string>;
  /** Total test time shown on the test step, e.g. "2 hr 14 min". */
  testLength: string;
  copy: {
    /** Five hero subtitles for 0%, <40%, <70%, <100%, 100% of steps complete. */
    heroSubs: [string, string, string, string, string];
    sourceLine: string;
    /** One line under the composite on the results page saying what the score is. */
    scoreNote: string;
  };
}

/** One in-progress or finished full-length test. */
export interface TestSessionV2 {
  key: string;
  examId: string;
  testNumber: number;
  startedAt: string;
  completedAt?: string;
  /** Index into the flattened module list (section x module). */
  stage: number;
  /** Phase within the current stage. */
  phase: "intro" | "questions" | "review" | "break";
  /** Question ids per stage, in presented order, with options in presented order. */
  stages: StageState[];
}

export interface StageState {
  section: string;
  module: number;
  variant?: "lower" | "upper";
  questionIds: string[];
  /** Per question: presented option order (index into original options). */
  optionOrder: Record<string, number[]>;
  answers: Record<string, AnswerValue>;
  flagged: string[];
  /** Option indices (original) struck out per question. */
  eliminated: Record<string, number[]>;
  /** Seconds remaining when last saved. */
  remaining: number;
  /** ISO time the clock was last running from, when it is running. */
  runningSince?: string;
  current: number;
  submittedAt?: string;
}

export interface SectionResult {
  section: string;
  raw: number;
  total: number;
  scaled: number;
  byDomain: Record<string, { correct: number; total: number }>;
  byModule: { module: number; variant?: string; raw: number; total: number }[];
}

export interface TestResultV2 {
  key: string;
  examId: string;
  testNumber: number;
  completedAt: string;
  sections: SectionResult[];
  composite: number;
  /** Every question with the student's answer, for the review screen. */
  items: { id: string; answer?: AnswerValue; correct: boolean; section: string; domain: string }[];
}

export interface DrillState {
  masteredIds: string[];
  wrongQueue: string[];
  seen: number;
  correct: number;
}
