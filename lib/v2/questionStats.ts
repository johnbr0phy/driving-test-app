import { isAnswered } from "./grading";
import type { DrillState, QuestionTally, TestResultV2 } from "./types";

// Per-question answer counts for one v2 exam, from what the v2 store already
// keeps: every answered item of a finished practice test, plus the drill
// tallies (questionStats, recorded since Oct 31 2026). Drill answers from
// before the tallies existed count once each: right if the question was
// mastered, wrong if it still sits in the wrong queue. Pure, so the stats page
// and the nightly Common Mistakes cron count exactly the same way.

export interface V2QuestionPerf {
  answered: number;
  correct: number;
  wrong: number;
}

export interface V2PerfSource {
  results?: TestResultV2[];
  drills?: Record<string, DrillState>;
  questionStats?: Record<string, Record<string, QuestionTally>>;
}

export function v2QuestionPerformance(
  data: V2PerfSource,
  examId: string,
  options: { skipTests?: number[] } = {},
): Map<string, V2QuestionPerf> {
  const perf = new Map<string, V2QuestionPerf>();
  const add = (id: string, answered: number, wrong: number) => {
    if (answered <= 0) return;
    const p = perf.get(id) ?? { answered: 0, correct: 0, wrong: 0 };
    p.answered += answered;
    p.wrong += wrong;
    p.correct += answered - wrong;
    perf.set(id, p);
  };

  for (const r of data.results ?? []) {
    if (r?.examId !== examId || options.skipTests?.includes(r.testNumber)) continue;
    for (const it of Array.isArray(r.items) ? r.items : []) {
      if (typeof it?.id === "string" && isAnswered(it.answer)) add(it.id, 1, it.correct ? 0 : 1);
    }
  }

  const tallies = data.questionStats?.[examId] ?? {};
  for (const [id, t] of Object.entries(tallies)) {
    const n = Math.max(0, Number(t?.n) || 0);
    add(id, n, Math.min(n, Math.max(0, Number(t?.w) || 0)));
  }

  // Older drill progress, for questions with no tally yet.
  const legacy = new Map<string, boolean>();
  for (const [key, d] of Object.entries(data.drills ?? {})) {
    if (!key.startsWith(`${examId}:`) || !d) continue;
    for (const id of d.masteredIds ?? []) if (!tallies[id]) legacy.set(id, true);
    for (const id of d.wrongQueue ?? []) if (!tallies[id] && !legacy.has(id)) legacy.set(id, false);
  }
  for (const [id, right] of legacy) add(id, 1, right ? 0 : 1);

  return perf;
}
