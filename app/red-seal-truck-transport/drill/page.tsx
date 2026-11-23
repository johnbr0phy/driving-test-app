"use client";

import "@/lib/banks/carstruck";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CarstruckDrillPage() {
  return <ExamDrillPage exam={getExamById("carstruck")!} />;
}
