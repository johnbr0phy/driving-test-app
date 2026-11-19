"use client";

import "@/lib/banks/titleagent";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function TitleAgentStatsPage() {
  return <ExamStatsPage exam={getExamById("titleagent")!} />;
}
