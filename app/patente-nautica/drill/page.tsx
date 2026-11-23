"use client";

import "@/lib/banks/itnautica";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function ItnauticaDrillPage() {
  return <ExamDrillPage exam={getExamById("itnautica")!} />;
}
