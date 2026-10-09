"use client";

import { Suspense } from "react";
import { MissDrill } from "@/components/MissDrill";
import { HTL_ROUTES } from "@/lib/examRoutes";

export default function HTLDrillPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50" />}>
      <MissDrill routes={HTL_ROUTES} />
    </Suspense>
  );
}
