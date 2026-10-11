"use client";

import { Suspense } from "react";
import { MissDrill } from "@/components/MissDrill";
import { DMV_ROUTES } from "@/lib/examRoutes";

export default function DrillPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50 dark:bg-gray-950" />}>
      <MissDrill routes={DMV_ROUTES} />
    </Suspense>
  );
}
