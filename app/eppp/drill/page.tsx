"use client";

import "@/lib/banks/eppp";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function EpppDrillPage() {
  return <ExamDrillPage exam={getExamById("eppp")!} />;
}
