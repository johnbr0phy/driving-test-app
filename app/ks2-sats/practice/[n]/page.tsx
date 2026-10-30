"use client";

import { Suspense } from "react";
import { TrainPage } from "@/components/v2/TrainPage";
import { getExamV2 } from "@/lib/v2/registry";
import "@/lib/v2/banks/ks2";

export default function Ks2TrainPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-600 dark:text-gray-300">Loading...</div>}>
      <TrainPage exam={getExamV2("ks2")} />
    </Suspense>
  );
}
