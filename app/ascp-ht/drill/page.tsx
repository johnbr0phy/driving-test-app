"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AscpHtDrillPage() {
  return <ExamDrillPage exam={getExamById("ascpht")!} />;
}
