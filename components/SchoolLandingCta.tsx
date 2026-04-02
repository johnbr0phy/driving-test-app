"use client";

import Link from "next/link";
import { useSchoolAuth } from "@/lib/hooks/useSchoolAuth";

interface Props {
  signupUrl: string;
}

/**
 * Smart CTA for /schools/[schoolSlug] landing pages.
 *
 * - School admin    → "Return to dashboard" (→ /schools/dashboard)
 * - Everyone else   → "Start practising free →" (→ signupUrl)
 */
export function SchoolLandingCta({ signupUrl }: Props) {
  const { user, schoolId, loading } = useSchoolAuth();

  if (loading) {
    return <div className="h-14" />;
  }

  if (user && schoolId) {
    return (
      <Link
        href="/schools/dashboard"
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
