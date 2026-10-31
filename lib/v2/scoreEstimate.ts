import type { DrillDef, ExamV2Config, QuestionV2, ScaleSpec, SectionDef, SectionResult } from "./types";
import type { V2QuestionPerf } from "./questionStats";

// The v2 stats page is built around one question, "what would I score today,
// and where are my next points?", not a table of questions (SAT-style items
// repeat a handful of stems and are never seen twice on the real test).
//
// Every answered question counts once: right the first time or not (a drill
// miss comes back until mastered, so tallies alone would overweight misses).
// Per topic (a drill: what the student actually practises) that first-try
// accuracy is weighted by how much of the real section the topic is, scaled
// with the section's own curve and combined with the exam's own composite,
// so the estimate reads like a results page. A topic's "points to gain" is the
// composite with that topic brought to TARGET_ACCURACY, minus today's.

/** Distinct questions a section needs before it gets an estimate. */
export const MIN_SECTION_ANSWERS = 10;
/** The accuracy a topic is raised to when pricing its points. */
export const TARGET_ACCURACY = 0.9;
/** Pseudo-answers that pull a thinly answered topic toward its section's accuracy. */
const SMOOTHING = 3;
/** Stand-in accuracy for a section with no estimate yet, only so other sections' gains can be priced. */
const NEUTRAL = 0.5;

export interface SkillLine {
  skill: string;
  answered: number;
  missed: number;
}

export interface TopicEstimate {
  drill: DrillDef;
  /** Distinct questions answered in this topic. */
  answered: number;
  right: number;
  /** First-try accuracy 0..1, null before any answer. */
  accuracy: number | null;
  /** Share of the whole real test, 0..1. */
  weight: number;
  /** Composite points from bringing the topic to TARGET_ACCURACY (0 when unpriceable). */
  gain: number;
  /** Skills in this topic, most missed first. */
  skills: SkillLine[];
}

export interface SectionEstimate {
  section: SectionDef;
  answered: number;
  /** Answers still needed before this section gets an estimate. */
  needed: number;
  accuracy: number | null;
  scaled: number | null;
}

export interface ScoreEstimate {
  /** Every section has enough answers for a composite. */
  ready: boolean;
  composite: number | null;
  sections: SectionEstimate[];
  /** Highest gain first; unpriced (gain 0) topics last, untried before mastered. */
  topics: TopicEstimate[];
  answered: number;
}

/** How much of each section each domain is on a real test form (test 1, harder path). */
export function domainWeights(exam: ExamV2Config, bank: QuestionV2[]): Map<string, Map<string, number>> {
  const form = exam.tests[0]?.number ?? 1;
  const out = new Map<string, Map<string, number>>();
  for (const section of exam.sections) {
    const items = bank.filter((q) => q.section === section.key && q.test === form && q.variant !== "lower");
    const counts = new Map<string, number>();
    for (const q of items) counts.set(q.domain, (counts.get(q.domain) ?? 0) + 1);
    const weights = new Map<string, number>();
    if (items.length) for (const [d, n] of counts) weights.set(d, n / items.length);
    else for (const d of section.domains) weights.set(d, 1 / section.domains.length);
    out.set(section.key, weights);
  }
  return out;
}

const sectionTotal = (s: SectionDef) => s.modules.reduce((a, m) => a + m.questionCount, 0);

function scaleOf(section: SectionDef, accuracy: number): ScaleSpec {
  const threshold = section.modules.find((m) => m.adaptive)?.adaptive?.threshold;
  return section.lowerScale && threshold !== undefined && accuracy < threshold ? section.lowerScale : section.scale;
}

export function estimateScore(exam: ExamV2Config, bank: QuestionV2[], perf: Map<string, V2QuestionPerf>): ScoreEstimate {
  const weights = domainWeights(exam, bank);
  const answeredQs = bank.filter((q) => perf.has(q.id));
  const rightOf = (q: QuestionV2) => (perf.get(q.id)?.wrong ?? 0) === 0;

  // Per section, then per domain within it: distinct answered and first-try right.
  const secAcc = new Map<string, { n: number; right: number }>();
  const domAcc = new Map<string, { n: number; right: number }>();
  for (const q of answeredQs) {
    const s = secAcc.get(q.section) ?? { n: 0, right: 0 };
    s.n++;
    if (rightOf(q)) s.right++;
    secAcc.set(q.section, s);
    const key = `${q.section}:${q.domain}`;
    const d = domAcc.get(key) ?? { n: 0, right: 0 };
    d.n++;
    if (rightOf(q)) d.right++;
    domAcc.set(key, d);
  }

  const sectionAccuracy = (key: string) => {
    const s = secAcc.get(key);
    return s && s.n ? s.right / s.n : null;
  };
  const domainAccuracy = (section: string, domain: string) => {
    const base = sectionAccuracy(section) ?? NEUTRAL;
    const d = domAcc.get(`${section}:${domain}`);
    return ((d?.right ?? 0) + SMOOTHING * base) / ((d?.n ?? 0) + SMOOTHING);
  };

  const ready = (key: string) => (secAcc.get(key)?.n ?? 0) >= MIN_SECTION_ANSWERS;

  // One composite from per-domain accuracies (with optional overrides).
  const simulate = (override?: (section: string, domain: string, acc: number) => number) => {
    const results: SectionResult[] = exam.sections.map((section) => {
      const w = weights.get(section.key)!;
      let share = 0;
      for (const [domain, weight] of w) {
        const base = ready(section.key) ? domainAccuracy(section.key, domain) : NEUTRAL;
        share += weight * (override ? override(section.key, domain, base) : base);
      }
      const total = sectionTotal(section);
      const raw = Math.max(0, Math.min(total, Math.round(share * total)));
      const scale = scaleOf(section, share);
      const scaled = scale.table[Math.min(raw, scale.table.length - 1)] ?? scale.min;
      return { section: section.key, raw, total, scaled, byDomain: {}, byModule: [] };
    });
    return { results, composite: exam.composite.combine(results) };
  };

  const base = simulate();
  const allReady = exam.sections.every((s) => ready(s.key));

  const sections: SectionEstimate[] = exam.sections.map((section, i) => {
    const n = secAcc.get(section.key)?.n ?? 0;
    return {
      section,
      answered: n,
      needed: Math.max(0, MIN_SECTION_ANSWERS - n),
      accuracy: sectionAccuracy(section.key),
      scaled: ready(section.key) ? base.results[i].scaled : null,
    };
  });

  const topics: TopicEstimate[] = exam.drills.map((drill) => {
    // By domain only: a drill draws from one section, but its domains can be
    // tested in others too (GCSE papers 2 and 3, EQAO session B, FS Maths
    // section A). No domain belongs to two drills in any exam.
    const inTopic = answeredQs.filter((q) => drill.domains.includes(q.domain));
    const right = inTopic.filter(rightOf).length;
    // Share of the whole exam this topic is, across every section it appears in.
    const totalItems = exam.sections.reduce((a, sec) => a + sectionTotal(sec), 0) || 1;
    const weight = exam.sections.reduce(
      (a, sec) => a + drill.domains.reduce((b, d) => b + (weights.get(sec.key)?.get(d) ?? 0), 0) * sectionTotal(sec),
      0,
    ) / totalItems;
    const priceable = exam.sections.some((sec) => ready(sec.key) && drill.domains.some((d) => weights.get(sec.key)?.has(d)));
    let gain = 0;
    if (priceable) {
      const raised = simulate((section, domain, acc) =>
        ready(section) && drill.domains.includes(domain) ? Math.max(acc, TARGET_ACCURACY) : acc,
      );
      gain = Math.max(0, raised.composite - base.composite);
    }
    const bySkill = new Map<string, SkillLine>();
    for (const q of inTopic) {
      const label = q.skill || "Other";
      const line = bySkill.get(label) ?? { skill: label, answered: 0, missed: 0 };
      line.answered++;
      if (!rightOf(q)) line.missed++;
      bySkill.set(label, line);
    }
    return {
      drill,
      answered: inTopic.length,
      right,
      accuracy: inTopic.length ? right / inTopic.length : null,
      weight,
      gain,
      skills: [...bySkill.values()].sort((a, b) => b.missed - a.missed || a.answered - b.answered),
    };
  });

  topics.sort((a, b) => b.gain - a.gain || (a.accuracy ?? 1.01) - (b.accuracy ?? 1.01) || b.weight - a.weight);

  return {
    ready: allReady,
    composite: allReady ? base.composite : null,
    sections,
    topics,
    answered: answeredQs.length,
  };
}
