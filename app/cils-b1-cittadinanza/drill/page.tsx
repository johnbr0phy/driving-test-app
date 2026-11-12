"use client";

import "@/lib/banks/itcils";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function ItcilsDrillPage() {
  return <ExamDrillPage exam={getExamById("itcils")!} />;
}
