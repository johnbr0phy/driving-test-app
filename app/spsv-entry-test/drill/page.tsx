"use client";

import "@/lib/banks/iespsv";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function IespsvDrillPage() {
  return <ExamDrillPage exam={getExamById("iespsv")!} />;
}
