"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackLayoutRetention } from "@/lib/layoutRetention";

// Counts a return (and, on a /test/ page, a practice test) for the layout
// retention cohort (lib/layoutRetention). Mounted on the shared v1 test,
// results and practice routes; the dashboard does its own tracking.
export function LayoutRetentionTracker({ examId }: { examId: string }) {
  const pathname = usePathname();
  useEffect(() => {
    trackLayoutRetention(examId, { onTest: /\/test\//.test(pathname ?? "") });
  }, [examId, pathname]);
  return null;
}
