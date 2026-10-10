import { AnswerValue, ExamV2Config, QuestionV2, SectionDef, StageState, TestSessionV2, TestResultV2, SectionResult } from "./types";
import { stagesOf } from "./registry";
import { isCorrect } from "./grading";

function shuffle<T>(array: T[]): T[] {
  const out = [...array];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Position-dependent options ("Both A and B", "All of the above") keep their order. */
export function optionOrderFor(q: QuestionV2): number[] {
  const n = q.options?.length ?? 0;
  const identity = Array.from({ length: n }, (_, i) => i);
  if (n === 0 || q.lockedOrder) return identity;
  if (q.options!.some((o) => /\b(all|none) of the above\b|\b(both|either|neither)\b.*\b[A-E]\b|\b[A-E]\s+(and|or)\s+[A-E]\b/i.test(o))) return identity;
  return shuffle(identity);
}

/** Bank items for one stage. Items without a variant belong to every variant. */
export function questionsForStage(bank: QuestionV2[], testNumber: number, section: string, module: number, variant?: "lower" | "upper"): QuestionV2[] {
  return bank
    .filter((q) => q.test === testNumber && q.section === section && q.module === module && (!q.variant || !variant || q.variant === variant))
    .sort((a, b) => a.id.localeCompare(b.id));
}

function buildStage(bank: QuestionV2[], testNumber: number, section: SectionDef, module: number, timeLimit: number, variant?: "lower" | "upper"): StageState {
  const questions = questionsForStage(bank, testNumber, section.key, module, variant);
  const optionOrder: Record<string, number[]> = {};
  for (const q of questions) optionOrder[q.id] = optionOrderFor(q);
  return {
    section: section.key,
    module,
    variant,
    questionIds: questions.map((q) => q.id),
    optionOrder,
    answers: {},
    flagged: [],
    eliminated: {},
    remaining: timeLimit,
    current: 0,
  };
}

export function sessionKey(examId: string, testNumber: number) {
  return `${examId}:${testNumber}`;
}

/** New session: every non-adaptive stage is built now; adaptive stages are built when reached. */
export function createSession(exam: ExamV2Config, bank: QuestionV2[], testNumber: number): TestSessionV2 {
  const stages = stagesOf(exam).map(({ section, module }) =>
    module.adaptive
      ? buildStage(bank, testNumber, section, module.module, module.timeLimit, undefined)
      : buildStage(bank, testNumber, section, module.module, module.timeLimit)
  );
  // Adaptive stages get their variant (and question list) when the previous
  // module is submitted; until then they hold the variant-free items only.
  return {
    key: sessionKey(exam.id, testNumber),
    examId: exam.id,
    testNumber,
    startedAt: new Date().toISOString(),
    stage: 0,
    phase: "intro",
    stages,
  };
}

/** Accuracy on a stage, used to pick the next adaptive variant. */
export function stageAccuracy(stage: StageState, byId: Map<string, QuestionV2>): number {
  if (stage.questionIds.length === 0) return 0;
  const correct = stage.questionIds.filter((id) => {
    const q = byId.get(id);
    return q ? isCorrect(q, stage.answers[id]) : false;
  }).length;
  return correct / stage.questionIds.length;
}

/** Resolve an adaptive stage's variant from the previous stage of the same section. */
export function resolveAdaptive(exam: ExamV2Config, bank: QuestionV2[], session: TestSessionV2, stageIndex: number, byId: Map<string, QuestionV2>): StageState {
  const stage = session.stages[stageIndex];
  const defs = stagesOf(exam);
  const def = defs[stageIndex];
  if (!def.module.adaptive) return stage;
  const prev = session.stages[stageIndex - 1];
  const hasVariants = bank.some((q) => q.test === session.testNumber && q.section === stage.section && q.module === stage.module && q.variant);
  if (!hasVariants) return stage;
  const variant = prev && prev.section === stage.section && stageAccuracy(prev, byId) >= def.module.adaptive.threshold ? "upper" : "lower";
  return buildStage(bank, session.testNumber, def.section, stage.module, def.module.timeLimit, variant);
}

/** Seconds left right now, accounting for a running clock. */
export function remainingNow(stage: StageState, now = Date.now()): number {
  if (!stage.runningSince) return stage.remaining;
  const elapsed = (now - new Date(stage.runningSince).getTime()) / 1000;
  return Math.max(0, stage.remaining - elapsed);
}

export function scoreSession(exam: ExamV2Config, session: TestSessionV2, byId: Map<string, QuestionV2>): TestResultV2 {
  const items: TestResultV2["items"] = [];
  const sections: SectionResult[] = exam.sections.map((section) => {
    const byDomain: Record<string, { correct: number; total: number }> = {};
    for (const d of section.domains) byDomain[d] = { correct: 0, total: 0 };
    const byModule: SectionResult["byModule"] = [];
    let raw = 0;
    let total = 0;
    for (const stage of session.stages.filter((s) => s.section === section.key)) {
      let moduleRaw = 0;
      for (const id of stage.questionIds) {
        const q = byId.get(id);
        if (!q) continue;
        const answer = stage.answers[id];
        const correct = isCorrect(q, answer);
        items.push({ id, answer, correct, section: section.key, domain: q.domain });
        if (!byDomain[q.domain]) byDomain[q.domain] = { correct: 0, total: 0 };
        byDomain[q.domain].total++;
        total++;
        if (correct) {
          byDomain[q.domain].correct++;
          moduleRaw++;
          raw++;
        }
      }
      byModule.push({ module: stage.module, variant: stage.variant, raw: moduleRaw, total: stage.questionIds.length });
    }
    const scaled = section.scale.table[Math.min(raw, section.scale.table.length - 1)] ?? section.scale.min;
    return { section: section.key, raw, total, scaled, byDomain, byModule };
  });
  return {
    key: session.key,
    examId: exam.id,
    testNumber: session.testNumber,
    completedAt: new Date().toISOString(),
    sections,
    composite: exam.composite.combine(sections),
    items,
  };
}

export type { AnswerValue };
