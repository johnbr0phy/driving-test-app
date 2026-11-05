"use client";

import "@/lib/banks/iedttcv";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function IedttcvDrillPage() {
  return <ExamDrillPage exam={getExamById("iedttcv")!} />;
}
