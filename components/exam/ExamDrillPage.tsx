"use client";

import { Suspense } from "react";
import { MissDrill } from "@/components/MissDrill";
import { ExamConfig } from "@/lib/exams";
import { useLocalizedExam } from "@/hooks/useLocalizedExam";

export function ExamDrillPage({ exam }: { exam: ExamConfig }) {
  const { routes } = useLocalizedExam(exam);
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50 dark:bg-gray-950" />}>
      <MissDrill routes={routes} />
    </Suspense>
  );
}
