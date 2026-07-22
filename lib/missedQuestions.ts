import { Question, TestSession } from "@/types";

// Aggregated view of a single question the user has gotten wrong at least
// once across ALL attempts of the practice tests for the current state.
export interface MissEntry {
  question: Question;
  testNumber: number;
  timesMissed: number;
  timesSeen: number;
  // Letter the user picked on their most recent attempt ("" = skipped)
  lastAnswer: string;
  // Wrong on the most recent attempt that included this question. Retaking a
  // test and getting it right retires the miss (it becomes "fixed").
  stillMissed: boolean;
}

export interface MissSummary {
  // Questions ever answered wrong on any attempt
  everMissedCount: number;
  // Ever missed, but correct on the latest attempt
  fixedCount: number;
  // Sorted: most-often-missed first
  stillMissed: MissEntry[];
  // testNumber -> attempt count + miss counts for that test
  perTest: Map<number, { attempts: number; stillMissed: number; everMissed: number }>;
  attemptCount: number;
}

export function computeMissSummary(
  completedTests: TestSession[],
  selectedState: string | null
): MissSummary {
  // completedTests is append-only, so array order is chronological.
  const sessions = completedTests.filter(
    (t) => t.state === (selectedState || "CA") && t.testNumber <= 4
  );

  const byQuestion = new Map<string, MissEntry>();
  const perTest = new Map<number, { attempts: number; stillMissed: number; everMissed: number }>();

  for (const session of sessions) {
    const stats = perTest.get(session.testNumber) ?? {
      attempts: 0,
      stillMissed: 0,
      everMissed: 0,
    };
    stats.attempts++;
    perTest.set(session.testNumber, stats);

    for (const answer of session.answers) {
      const question = session.questions.find((q) => q.questionId === answer.questionId);
      if (!question) continue;
      const entry = byQuestion.get(answer.questionId) ?? {
        question,
        testNumber: session.testNumber,
        timesMissed: 0,
        timesSeen: 0,
        lastAnswer: "",
        stillMissed: false,
      };
      entry.timesSeen++;
      if (!answer.isCorrect) entry.timesMissed++;
      entry.lastAnswer = answer.userAnswer;
      entry.stillMissed = !answer.isCorrect;
      byQuestion.set(answer.questionId, entry);
    }
  }

  const everMissed = [...byQuestion.values()].filter((e) => e.timesMissed > 0);
  const stillMissed = everMissed
    .filter((e) => e.stillMissed)
    .sort((a, b) => b.timesMissed - a.timesMissed || b.timesSeen - a.timesSeen);

  for (const entry of everMissed) {
    const stats = perTest.get(entry.testNumber);
    if (!stats) continue;
    stats.everMissed++;
    if (entry.stillMissed) stats.stillMissed++;
  }

  return {
    everMissedCount: everMissed.length,
    fixedCount: everMissed.length - stillMissed.length,
    stillMissed,
    perTest,
    attemptCount: sessions.length,
  };
}
