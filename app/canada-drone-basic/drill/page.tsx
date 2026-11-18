"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CanadaDroneBasicDrillPage() {
  return <ExamDrillPage exam={getExamById("cadronebasic")!} />;
}
