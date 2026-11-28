"use client";

import "@/lib/banks/txpersonal";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function TexasPersonalLinesDrillPage() {
  return <ExamDrillPage exam={getExamById("txpersonal")!} />;
}
