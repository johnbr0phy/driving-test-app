"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function VicFirearmsDrillPage() {
  return <ExamDrillPage exam={getExamById("aufirearmsvic")!} />;
}
