"use client";

import Link from "next/link";
import { useSchoolAuth } from "@/lib/hooks/useSchoolAuth";

/**
 * Smart CTA for the /schools hero section.
 *
 * - School admin    → "Return to dashboard" (→ /schools/dashboard)
 * - Everyone else   → "Create free account" + "Log in"
 */
export function SchoolsHeroCta() {
  const { user, schoolId, loading } = useSchoolAuth();

  if (loading) {
    return <div className="h-12" />;
  }

  if (user && schoolId) {
    return (
      <Link
        href="/schools/dashboard"
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
