"use client";

import "@/lib/banks/cosmoinstructor";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CosmoInstructorDrillPage() {
  return <ExamDrillPage exam={getExamById("cosmoinstructor")!} />;
}
