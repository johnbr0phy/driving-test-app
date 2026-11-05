"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Zak53motoDrillPage() {
  return <ExamDrillPage exam={getExamById("zak53moto")!} />;
}
