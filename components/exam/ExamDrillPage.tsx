"use client";

import { Suspense } from "react";
import { MissDrill } from "@/components/MissDrill";
import { getExamRoutes } from "@/lib/examRoutes";
import { ExamConfig } from "@/lib/exams";

export function ExamDrillPage({ exam }: { exam: ExamConfig }) {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50" />}>
      <MissDrill routes={getExamRoutes(exam.id)} />
    </Suspense>
  );
}
