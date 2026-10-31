"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCommunityAvailable } from "@/hooks/useCommunityStats";
import { getExamById } from "@/lib/exams";

/** Renders its children only once this test has Common Mistakes
 *  (lib/communityStats.ts), e.g. the DMV landing's "Short on time?" block. */
export function CommunityGate({ examId, children }: { examId: string; children: ReactNode }) {
  return useCommunityAvailable(examId) ? <>{children}</> : null;
}

/** "Short on time?" block for a registry exam's landing, linking to its
 *  Common Mistakes tab. Shows up by itself once the exam has enough answers. */
export function CommunityUpsell({ examId }: { examId: string }) {
  const on = useCommunityAvailable(examId);
  const exam = getExamById(examId);
  if (!on || !exam) return null;
  return (
    <section className="bg-brand-light py-14">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-dark mb-3">Short on time?</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          We know which questions everyone fails. Start there.
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
          We track which {exam.shortName} questions real test takers get wrong most, so you can practice what actually matters first.
        </p>
        <Link
          href={`${exam.slug}/stats?tab=community`}
          className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-dark transition-colors"
        >
          See the hardest questions →
        </Link>
      </div>
    </section>
  );
}
