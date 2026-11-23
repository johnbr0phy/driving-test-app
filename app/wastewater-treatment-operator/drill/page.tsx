"use client";

import "@/lib/banks/wastewaterop";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function WastewaterOpDrillPage() {
  return <ExamDrillPage exam={getExamById("wastewaterop")!} />;
}
