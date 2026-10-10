"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DrillRunner } from "@/components/v2/DrillRunner";
import { getExamV2 } from "@/lib/v2/registry";

function Train() {
  const params = useSearchParams();
  return <DrillRunner exam={getExamV2("asvab")} drillKeyParam={params.get("drill")} />;
}

export default function TrainPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-600">Loading...</div>}>
      <Train />
    </Suspense>
  );
}
