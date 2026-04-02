"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useSchoolAuth } from "@/lib/hooks/useSchoolAuth";

/**
 * Smart CTA for the /schools hero section.
 *
 * - Not logged in   → "Create free account" + "Log in"
 * - Logged in, school admin → "Return to dashboard" (→ /schools/dashboard)
 * - Logged in, student (no school) → "Return to dashboard" (→ /dashboard)
 */
export function SchoolsHeroCta() {
  const { user, loading: authLoading } = useAuth();
  const { schoolId, loading: schoolLoading } = useSchoolAuth();

  const loading = authLoading || schoolLoading;

  // While resolving auth state, show nothing (avoids flash of wrong buttons)
  if (loading) {
    return <div className="h-12" />;
  }

  if (user) {
    const dashboardHref = schoolId ? "/schools/dashboard" : "/dashboard";
    return (
      <Link
        href={dashboardHref}
        className="inline-block bg-brand text-white px-8 py-3 rounded-full font-semibold hover:bg-brand/90 transition-colors"
      >
        Return to dashboard
      </Link>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link
        href="/schools/create"
        className="inline-block bg-brand text-white px-8 py-3 rounded-full font-semibold hover:bg-brand/90 transition-colors"
      >
        Create free account
      </Link>
      <Link
        href="/login?redirect=/schools/dashboard"
        className="inline-block text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors border border-gray-300"
      >
        Log in
      </Link>
    </div>
  );
}
