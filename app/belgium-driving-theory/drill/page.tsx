"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function BedrivingDrillPage() {
  return <ExamDrillPage exam={getExamById("bedriving")!} />;
}
