"use client";

import "@/lib/banks/pkpaf";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PkpafDrillPage() {
  return <ExamDrillPage exam={getExamById("pkpaf")!} />;
}
