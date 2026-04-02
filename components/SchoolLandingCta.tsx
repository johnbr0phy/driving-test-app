"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useSchoolAuth } from "@/lib/hooks/useSchoolAuth";

interface Props {
  signupUrl: string;
}

/**
 * Smart CTA for /schools/[schoolSlug] landing pages.
 *
 * - Not logged in   → "Start practising free →" (→ signupUrl)
 * - Logged in, school admin → "Return to dashboard" (→ /schools/dashboard)
 * - Logged in, student → "Return to dashboard" (→ /dashboard)
 */
export function SchoolLandingCta({ signupUrl }: Props) {
  const { user, loading: authLoading } = useAuth();
  const { schoolId, loading: schoolLoading } = useSchoolAuth();

  const loading = authLoading || schoolLoading;

  if (loading) {
    return <div className="h-14" />;
  }

  if (user) {
    const dashboardHref = schoolId ? "/schools/dashboard" : "/dashboard";
    return (
      <Link
        href={dashboardHref}
        className="inline-block bg-brand hover:bg-brand/90 text-white font-semibold px-10 py-4 rounded-full text-lg shadow-md hover:shadow-lg transition-all"
      >
        Return to dashboard →
      </Link>
    );
  }

  return (
    <Link
      href={signupUrl}
      className="inline-block bg-brand hover:bg-brand/90 text-white font-semibold px-10 py-4 rounded-full text-lg shadow-md hover:shadow-lg transition-all"
    >
      Start practising free →
    </Link>
  );
}
