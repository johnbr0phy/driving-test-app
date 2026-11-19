"use client";

import "@/lib/banks/crc";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CrcDrillPage() {
  return <ExamDrillPage exam={getExamById("crc")!} />;
}
