import { BasicsSkillState, DrillState, TestResultV2, TestSessionV2 } from "./types";
import type { V2Data } from "@/store/useV2Store";

// Pure merge of two copies of the v2 store (this device and the account),
// kept free of Firebase imports so it can be tested in isolation.

function answeredCount(s: TestSessionV2) {
  return s.stages.reduce((n, st) => n + Object.keys(st.answers).length, 0);
}

function mergeDrill(a: DrillState | undefined, b: DrillState | undefined): DrillState {
  if (!a) return b!;
  if (!b) return a;
  const masteredIds = Array.from(new Set([...a.masteredIds, ...b.masteredIds]));
  const newer = a.seen >= b.seen ? a : b;
  return {
    masteredIds,
    wrongQueue: newer.wrongQueue.filter((id) => !masteredIds.includes(id)),
    seen: Math.max(a.seen, b.seen),
    correct: Math.max(a.correct, b.correct),
  };
}

/**
 * Combine this device's data with the account's. Nothing is lost:
 * results and mastered questions are unions, the further-along copy of an
 * in-progress test wins, and a test already finished elsewhere is dropped.
 * Goals prefer the account, since that is the last one set on any device.
 */
export function mergeV2(local: V2Data, remote: V2Data): V2Data {
  const results: TestResultV2[] = [];
  const seen = new Set<string>();
  for (const r of [...remote.results, ...local.results]) {
    const k = `${r.key}@${r.completedAt}`;
    if (!seen.has(k)) {
      seen.add(k);
      results.push(r);
    }
  }

  const drills: Record<string, DrillState> = {};
  for (const k of new Set([...Object.keys(local.drills), ...Object.keys(remote.drills)])) {
    drills[k] = mergeDrill(local.drills[k], remote.drills[k]);
  }

  const sessions: Record<string, TestSessionV2> = {};
  for (const k of new Set([...Object.keys(local.sessions), ...Object.keys(remote.sessions)])) {
    const a = local.sessions[k];
    const b = remote.sessions[k];
    const pick = !a ? b : !b ? a : a.stage !== b.stage ? (a.stage > b.stage ? a : b) : answeredCount(a) >= answeredCount(b) ? a : b;
    const finishedLater = results.some((r) => r.key === pick.key && r.completedAt > pick.startedAt);
    if (!finishedLater) sessions[k] = pick;
  }

  // A skill learned on either side stays learned; keep the earlier completion.
  const basics: Record<string, BasicsSkillState> = {};
  for (const k of new Set([...Object.keys(local.basics ?? {}), ...Object.keys(remote.basics ?? {})])) {
    const a = local.basics?.[k];
    const b = remote.basics?.[k];
    basics[k] = !a ? b! : !b ? a : a.completedAt <= b.completedAt ? a : b;
  }

  return { sessions, results, drills, basics, goals: { ...local.goals, ...remote.goals } };
}

/** The same data with one exam's sessions, results, drills and goal removed. */
export function withoutExamV2(data: V2Data, examId: string): V2Data {
  const goals = { ...data.goals };
  delete goals[examId];
  return {
    sessions: Object.fromEntries(Object.entries(data.sessions).filter(([, v]) => v.examId !== examId)),
    results: data.results.filter((r) => r.examId !== examId),
    drills: Object.fromEntries(Object.entries(data.drills).filter(([k]) => !k.startsWith(`${examId}:`))),
    basics: Object.fromEntries(Object.entries(data.basics ?? {}).filter(([k]) => !k.startsWith(`${examId}:`))),
    goals,
  };
}
