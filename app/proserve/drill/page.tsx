"use client";

import "@/lib/banks/proserve";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function ProServeDrillPage() {
  return <ExamDrillPage exam={getExamById("proserve")!} />;
}
