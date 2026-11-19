"use client";

import "@/lib/banks/titleagent";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function TitleAgentDrillPage() {
  return <ExamDrillPage exam={getExamById("titleagent")!} />;
}
