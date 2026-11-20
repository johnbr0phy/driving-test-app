"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { trackFunnelStep } from "@/lib/funnel";

/**
 * The "saw a dashboard" funnel step: a signed-out browser's first view of any
 * dashboard (DMV, v1, v2 or quiz), the page where people learn to turn every
 * step green. Waits for auth so signed-in people are never counted.
 */
export function useTrackDashboardView() {
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && !user) trackFunnelStep("dashboard");
  }, [loading, user]);
}
