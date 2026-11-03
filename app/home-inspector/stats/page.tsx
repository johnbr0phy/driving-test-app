"use client";

import "@/lib/banks/nhie";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HomeInspectorStatsPage() {
  return <ExamStatsPage exam={getExamById("nhie")!} />;
}
