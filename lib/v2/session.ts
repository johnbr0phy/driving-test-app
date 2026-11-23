import { AnswerValue, ExamV2Config, QuestionV2, SectionDef, StageState, TestSessionV2, TestResultV2, SectionResult } from "./types";
import { stagesOf } from "./registry";
import { isCorrect } from "./grading";
import { scaleFor } from "./scales";

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

/** Half-length practice keeps every other item (in bank order, so domains stay spread) and half the time. */
function halve<T>(items: T[]): T[] {
  return items.filter((_, i) => i % 2 === 0);
}

export function stageTimeLimit(timeLimit: number, length?: "full" | "half"): number {
  return length === "half" ? Math.ceil(timeLimit / 2) : timeLimit;
}

function buildStage(bank: QuestionV2[], testNumber: number, section: SectionDef, module: number, timeLimit: number, variant?: "lower" | "upper", length?: "full" | "half"): StageState {
  const all = questionsForStage(bank, testNumber, section.key, module, variant);
  const questions = length === "half" ? halve(all) : all;
  timeLimit = stageTimeLimit(timeLimit, length);
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
export function createSession(exam: ExamV2Config, bank: QuestionV2[], testNumber: number, length: "full" | "half" = "full"): TestSessionV2 {
  const stages = stagesOf(exam).map(({ section, module }) => buildStage(bank, testNumber, section, module.module, module.timeLimit, undefined, length));
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
    ...(length === "half" ? { length } : {}),
  };
}

/** Switch a session that has not started between full and half length (keeps the timing choice). */
export function withLength(exam: ExamV2Config, bank: QuestionV2[], session: TestSessionV2, length: "full" | "half"): TestSessionV2 {
  const fresh = createSession(exam, bank, session.testNumber, length);
  return { ...fresh, key: session.key, startedAt: session.startedAt, timing: session.timing, length };
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
  return buildStage(bank, session.testNumber, def.section, stage.module, def.module.timeLimit, variant, session.length);
}

/** Seconds left right now, accounting for a running clock. */
export function remainingNow(stage: StageState, now = Date.now()): number {
  if (!stage.runningSince) return stage.remaining;
  const elapsed = (now - new Date(stage.runningSince).getTime()) / 1000;
  return Math.max(0, stage.remaining - elapsed);
}

export function scoreSession(exam: ExamV2Config, session: TestSessionV2, byId: Map<string, QuestionV2>): TestResultV2 {
  const items: TestResultV2["items"] = [];
  const half = session.length === "half";
  const bank = half ? Array.from(byId.values()) : [];
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
    const scale = scaleFor(section, byModule);
    // Half length: scale the raw score up to the full-length stages it stands for.
    const fullTotal = half
      ? byModule.reduce((n, m) => n + questionsForStage(bank, session.testNumber, section.key, m.module, m.variant as "lower" | "upper" | undefined).length, 0)
      : total;
    const scaleRaw = half && total > 0 ? Math.round((raw * fullTotal) / total) : raw;
    const scaled = scale.table[Math.min(scaleRaw, scale.table.length - 1)] ?? scale.min;
    return { section: section.key, raw, total, scaled, byDomain, byModule };
  });
  return {
    key: session.key,
    examId: exam.id,
    testNumber: session.testNumber,
    timing: session.timing ?? "standard",
    ...(half ? { length: "half" as const } : {}),
    completedAt: new Date().toISOString(),
    sections,
    composite: exam.composite.combine(sections),
    items,
  };
}

export type { AnswerValue };
