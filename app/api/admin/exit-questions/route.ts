import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/server/adminAuth";
import { cachedAdminPayload, cachedJson, wantsRefresh } from "@/lib/server/adminCache";
import { classExamInfo } from "@/lib/classes";
import { classQuestionLookup } from "@/lib/server/classQuestions";
import { EXIT_MIN_EXITS, EXIT_QUIET_DAYS, type ExitQuestionsDoc, type ExitQuestionsPayload } from "@/lib/exitQuestions";

// The Exit questions card on the /admin Growth tab: globalStats/exitQuestions
// (written nightly by /api/cron/aggregate-stats, lib/exitQuestions.ts) with
// each listed question's text, options, answer and explanation attached.
export const maxDuration = 60;

async function build(): Promise<ExitQuestionsPayload> {
  const snap = await getAdminDb().collection("globalStats").doc("exitQuestions").get();
  const doc = snap.data() as ExitQuestionsDoc | undefined;
  if (!doc) return { exams: [], quietDays: EXIT_QUIET_DAYS, minExits: EXIT_MIN_EXITS, updatedAt: null };

  const exams = Object.entries(doc.exams ?? {}).map(([id, e]) => {
    const info = classExamInfo(id);
    const lookup = e.questions.length ? classQuestionLookup(id) : () => undefined;
    return {
      ...e,
      id,
      name: info?.name ?? id,
      questions: e.questions.map((q) => {
        const d = lookup(q.questionId);
        return {
          ...q,
          question: d?.question ?? "",
          options: d?.options ?? [],
          answer: d?.answer ?? "",
          topic: d ? info?.topicLabel(d.category) ?? d.category : "",
          explanation: d?.explanation ?? "",
        };
      }),
    };
  });
  // Exams with the most question exits first.
  exams.sort((a, b) => b.kinds.question - a.kinds.question || b.users - a.users);
  return { exams, quietDays: doc.quietDays, minExits: doc.minExits, updatedAt: doc.updatedAt };
}

export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const { payload, cache, at } = await cachedAdminPayload({
      key: "exit-questions",
      ttlMs: 5 * 60_000,
      staleMs: 24 * 3_600_000,
      refresh: wantsRefresh(request),
      build,
    });
    return cachedJson(payload, cache, at);
  } catch (error) {
    console.error("[admin/exit-questions]", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 },
    );
  }
}
