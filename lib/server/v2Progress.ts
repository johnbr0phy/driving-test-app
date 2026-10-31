import type { Firestore } from 'firebase-admin/firestore';
import { EXAMS_V2 } from '@/lib/v2/registry';
import { getBank } from '@/lib/v2/bank';
import { basicsFor, basicsKey } from '@/lib/v2/basics';
import { drillQuestions, drillStateFor } from '@/lib/v2/training';
import type { BasicsSkillState, DrillState, ExamV2Config } from '@/lib/v2/types';
import '@/lib/v2/banks/accuplacer';
import '@/lib/v2/banks/act';
import '@/lib/v2/banks/asvab';
import '@/lib/v2/banks/elevenplus';
import '@/lib/v2/banks/eqao9';
import '@/lib/v2/banks/fsmaths';
import '@/lib/v2/banks/gcsecs';
import '@/lib/v2/banks/gcsehigher';
import '@/lib/v2/banks/gcsemaths';
import '@/lib/v2/banks/gcsescience';
import '@/lib/v2/banks/ged';
import '@/lib/v2/banks/hesi';
import '@/lib/v2/banks/hscmaths';
import '@/lib/v2/banks/ks2';
import '@/lib/v2/banks/naplan';
import '@/lib/v2/banks/naplan7';
import '@/lib/v2/banks/nswsel';
import '@/lib/v2/banks/ocnsw';
import '@/lib/v2/banks/osslt';
import '@/lib/v2/banks/praxis';
import '@/lib/v2/banks/psat';
import '@/lib/v2/banks/rrbntpc';
import '@/lib/v2/banks/sat';
import '@/lib/v2/banks/teas';
import '@/lib/v2/banks/timestables';
import '@/lib/v2/banks/vicsel';

// How far students get through the v2 exams that have Basics (every bank
// imported above: an exam with Basics and no import here breaks the card), for the "Basics" card on the /admin Growth
// tab. Two sources:
//   - signed-in accounts: users/{uid}.v2, the same state the dashboard reads,
//     so steps here are the dashboard's N/N steps exactly. All history, but
//     guests are missing (their progress stays in the browser).
//   - every browser: analytics/v2Basics events (lib/v2/basicsTracking),
//     guests included, counted since BASICS_TRACKING_SINCE.

type V2Doc = {
  drills?: Record<string, DrillState>;
  basics?: Record<string, BasicsSkillState>;
  results?: { examId?: string; testNumber?: number; composite?: number }[];
  goals?: Record<string, number>;
};

type Split = { drills: number; seen: number; correct: number; mastered: number };
type Counter = { total?: number; daily?: Record<string, number> };

export type V2ProgressExam = {
  id: string;
  name: string;
  /** Accounts with any drill answer, learned skill or finished test. */
  students: number;
  totalSteps: number;
  medianStepsDone: number | null;
  steps: { label: string; kind: 'basics' | 'exam' | 'test'; started: number; completed: number; premium: boolean }[];
  basics: {
    /** Accounts that learned at least one skill. */
    learnedAny: number;
    /** ...and finished every skill of at least one drill. */
    finishedADrill: number;
    medianLearned: number | null;
    totalSkills: number;
    /** Did exam-level questions but never learned a skill. */
    skippedToExam: number;
  };
  /** Exam-level drill results, per (account, drill with Basics) that was started, split by whether a skill of that drill was learned. */
  value: { withBasics: Split; withoutBasics: Split };
  tests: { finished: number; reachedGoal: number };
  skills: { id: string; name: string; drill: string; learned: number; firstTryPct: number | null }[];
  /** All browsers, from analytics/v2Basics. */
  events: Record<string, number>;
  skillEvents: Record<string, Record<string, number>>;
};

/** When the analytics/v2Basics events started (lib/v2/basicsTracking). */
export const BASICS_TRACKING_SINCE = '2026-10-20';

export type V2ProgressPayload = { exams: V2ProgressExam[]; trackingSince: string; generatedAt: string };

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

const emptySplit = (): Split => ({ drills: 0, seen: 0, correct: 0, mastered: 0 });

function examReport(exam: ExamV2Config, docs: V2Doc[], analytics: Record<string, unknown>): V2ProgressExam {
  const bank = getBank(exam.id).questions;
  const drillDefs = exam.drills.map((d) => ({ def: d, qs: drillQuestions(bank, d, exam), skills: basicsFor(d) }));
  const locked = new Set(exam.premium?.lockedDrills ?? []);
  const lockedTests = new Set(exam.premium?.lockedTests ?? []);

  // Step order is the dashboard's: Basics then exam level per drill, then the tests.
  const steps: V2ProgressExam['steps'] = [];
  for (const d of drillDefs) {
    if (d.skills.length) steps.push({ label: `${d.def.name} [Basics]`, kind: 'basics', started: 0, completed: 0, premium: locked.has(d.def.key) });
    steps.push({ label: d.def.name, kind: 'exam', started: 0, completed: 0, premium: locked.has(d.def.key) });
  }
  for (const t of exam.tests) steps.push({ label: `Practice Test ${t.number}`, kind: 'test', started: 0, completed: 0, premium: lockedTests.has(t.number) });

  const skillRows = new Map<string, { id: string; name: string; drill: string; learned: number; firstTry: number; total: number }>();
  for (const d of drillDefs) for (const s of d.skills) {
    if (!skillRows.has(s.id)) skillRows.set(s.id, { id: s.id, name: s.name, drill: d.def.name, learned: 0, firstTry: 0, total: 0 });
  }

  let students = 0, learnedAny = 0, finishedADrill = 0, skippedToExam = 0, testsFinished = 0, reachedGoal = 0;
  const learnedCounts: number[] = [];
  const doneCounts: number[] = [];
  const withBasics = emptySplit(), withoutBasics = emptySplit();

  for (const v2 of docs) {
    const drills = v2.drills ?? {};
    const basics = v2.basics ?? {};
    const results = (v2.results ?? []).filter((r) => r?.examId === exam.id);
    const goal = v2.goals?.[exam.id] ?? exam.defaultGoal;

    const learnedIds = new Set<string>();
    for (const s of skillRows.values()) {
      const b = basics[basicsKey(exam.id, s.id)];
      if (b?.done) {
        learnedIds.add(s.id);
        s.learned += 1;
        if (typeof b.firstTry === 'number' && typeof b.total === 'number' && b.total > 0) {
          s.firstTry += b.firstTry;
          s.total += b.total;
        }
      }
    }
    const perDrill = drillDefs.map((d) => {
      const st = drillStateFor(drills, exam.id, d.def, d.qs);
      const mastered = st.masteredIds.filter((id) => d.qs.some((q) => q.id === id)).length;
      const learned = d.skills.filter((s) => learnedIds.has(s.id)).length;
      return { ...d, st, mastered, learned };
    });
    const anyExamLevel = perDrill.some((d) => d.st.seen > 0);
    if (!anyExamLevel && learnedIds.size === 0 && results.length === 0) continue;
    students += 1;

    let i = 0;
    let done = 0;
    for (const d of perDrill) {
      if (d.skills.length) {
        const step = steps[i++];
        if (d.learned > 0) step.started += 1;
        if (d.learned === d.skills.length) { step.completed += 1; done += 1; }
      }
      const step = steps[i++];
      const complete = d.qs.length > 0 && d.mastered === d.qs.length;
      if (d.st.seen > 0) step.started += 1;
      if (complete) { step.completed += 1; done += 1; }
      if (d.skills.length && d.st.seen > 0) {
        const split = d.learned > 0 ? withBasics : withoutBasics;
        split.drills += 1;
        split.seen += d.st.seen;
        split.correct += d.st.correct;
        if (complete) split.mastered += 1;
      }
    }
    for (const t of exam.tests) {
      const step = steps[i++];
      const attempts = results.filter((r) => r.testNumber === t.number);
      if (attempts.length) step.started += 1;
      if (attempts.some((r) => typeof r.composite === 'number' && r.composite >= goal)) { step.completed += 1; done += 1; }
    }
    doneCounts.push(done);

    if (learnedIds.size > 0) {
      learnedAny += 1;
      learnedCounts.push(learnedIds.size);
      if (perDrill.some((d) => d.skills.length > 0 && d.learned === d.skills.length)) finishedADrill += 1;
    } else if (anyExamLevel) {
      skippedToExam += 1;
    }
    if (results.length) testsFinished += 1;
    if (results.some((r) => typeof r.composite === 'number' && r.composite >= goal)) reachedGoal += 1;
  }

  // analytics/v2Basics: exams.<exam>.<event>.total, skills.<exam>.<skill>.<event>
  const examEvents = ((analytics.exams as Record<string, Record<string, Counter>> | undefined)?.[exam.id]) ?? {};
  const events: Record<string, number> = {};
  for (const [k, c] of Object.entries(examEvents)) events[k] = typeof c?.total === 'number' ? c.total : 0;
  const skillEvents = ((analytics.skills as Record<string, Record<string, Record<string, number>>> | undefined)?.[exam.id]) ?? {};

  return {
    id: exam.id,
    name: exam.shortName,
    students,
    totalSteps: steps.length,
    medianStepsDone: median(doneCounts),
    steps,
    basics: { learnedAny, finishedADrill, medianLearned: median(learnedCounts), totalSkills: skillRows.size, skippedToExam },
    value: { withBasics, withoutBasics },
    tests: { finished: testsFinished, reachedGoal },
    skills: [...skillRows.values()].map((s) => ({ id: s.id, name: s.name, drill: s.drill, learned: s.learned, firstTryPct: s.total ? Math.round((s.firstTry / s.total) * 100) : null })),
    events,
    skillEvents,
  };
}

export async function buildV2Progress(db: Firestore, internalUids: Set<string>): Promise<V2ProgressPayload> {
  const [usersSnap, analyticsDoc] = await Promise.all([
    db.collection('users').select('v2').get(),
    db.doc('analytics/v2Basics').get(),
  ]);
  const docs: V2Doc[] = [];
  for (const d of usersSnap.docs) {
    if (internalUids.has(d.id)) continue;
    const v2 = d.get('v2') as V2Doc | undefined;
    if (v2 && typeof v2 === 'object') docs.push(v2);
  }
  const analytics = (analyticsDoc.data() ?? {}) as Record<string, unknown>;
  const exams = EXAMS_V2.filter((e) => e.drills.some((d) => d.basics?.length)).map((e) => examReport(e, docs, analytics));
  return { exams, trackingSince: BASICS_TRACKING_SINCE, generatedAt: new Date().toISOString() };
}
