"use client";

import { Suspense } from "react";
import { TrainPage } from "@/components/v2/TrainPage";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/gre";

export default function ExamTrainPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-600 dark:text-gray-300">Loading...</div>}>
      <TrainPage exam={getExamV2("gre")} />
    </Suspense>
  );
}
