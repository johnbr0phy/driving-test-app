"use client";

import Link from "next/link";
import { useSchoolAuth } from "@/lib/hooks/useSchoolAuth";

export function SchoolsHeroCta() {
  const { user, schoolId, loading } = useSchoolAuth();

  if (loading) return <div className="h-12" />;

  // School admin → back to their dashboard
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

  // Logged in but not an admin → just show create (no login)
  if (user) {
    return (
      <Link
        href="/schools/create"
        className="inline-block bg-brand text-white px-8 py-3 rounded-full font-semibold hover:bg-brand/90 transition-colors"
      >
        Create free account
      </Link>
    );
  }

  // Not logged in → create + login
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
