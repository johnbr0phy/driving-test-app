"use client";

import "@/lib/banks/arrtmri";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function ArrtMriDrillPage() {
  return <ExamDrillPage exam={getExamById("arrtmri")!} />;
}
