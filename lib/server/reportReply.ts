import type { DocumentSnapshot } from "firebase-admin/firestore";
import { sendEmail } from "@/lib/resend";
import { CAMPAIGN_REPLY_TO } from "@/lib/cron-email";
import { reportReplyEmail, reportReplySubject } from "@/lib/email-templates";
import { voiceFor } from "@/lib/email-voice";
import { classQuestionLookup } from "@/lib/server/classQuestions";

// Emails the student who reported a question once it is settled, either way
// ("fixed" or the key is "right"), from the /admin Questions tab. Once per
// report: emailedAt on the report doc stops a second send.

export type ReportOutcome = "fixed" | "right";

export async function emailReporter(doc: DocumentSnapshot, outcome: ReportOutcome): Promise<"sent" | "no_email" | "already" | "failed"> {
  const r = doc.data();
  if (!r?.email) return "no_email";
  if (r.emailedAt) return "already";
  const q = classQuestionLookup(r.examId)(r.questionId);
  if (!q) return "failed";
  const content = { outcome, question: q.question, answer: q.answer, explanation: q.explanation };
  const result = await sendEmail({
    kind: "transactional",
    to: r.email,
    subject: reportReplySubject(content),
    html: reportReplyEmail(voiceFor(r.examId), content),
    replyTo: CAMPAIGN_REPLY_TO,
    idempotencyKey: `report-reply-${doc.id}`,
  });
  if (!result.ok) return "failed";
  await doc.ref.update({ emailedAt: new Date().toISOString(), emailOutcome: outcome });
  return "sent";
}
