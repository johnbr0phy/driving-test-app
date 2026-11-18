"use client";

import "@/lib/banks/nailtech";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NailTechDrillPage() {
  return <ExamDrillPage exam={getExamById("nailtech")!} />;
}
