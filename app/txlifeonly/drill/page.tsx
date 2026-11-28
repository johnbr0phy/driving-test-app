"use client";

import "@/lib/banks/txlifeonly";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function TexasLifeAgentDrillPage() {
  return <ExamDrillPage exam={getExamById("txlifeonly")!} />;
}
