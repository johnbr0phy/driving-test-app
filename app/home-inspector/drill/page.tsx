"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HomeInspectorDrillPage() {
  return <ExamDrillPage exam={getExamById("nhie")!} />;
}
