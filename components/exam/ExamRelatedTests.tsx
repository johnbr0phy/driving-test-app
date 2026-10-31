import Link from "next/link";
import { TEST_CATALOG, relatedTests } from "@/lib/testCatalog";
import { CommunityUpsell } from "@/components/CommunityUpsell";
import { regionHomePath, regionInfo, regionOfTest } from "@/lib/region";

// "Related practice tests" block for an exam landing: the rest of the exam's
// hub group (nursing, IT, driving...) plus a link to the hub. This is the
// cross-linking that lets new landings share authority with their neighbours.
// Every landing renders it, so it also carries the exam's "Short on time?"
// Common Mistakes upsell, which appears once the exam has enough answers.
export function ExamRelatedTests({ examId }: { examId: string }) {
  const tests = relatedTests(examId);
  // A country's exam links up to that country's homepage (/ph, /uk...), the
  // hub that collects its tests, so the country page earns links from them.
  const region = regionOfTest(examId);
  const country = region === "US" || region === "GLOBAL" ? null : regionInfo(region);
  if (tests.length === 0) return <CommunityUpsell examId={examId} />;

  return (
    <>
    <CommunityUpsell examId={examId} />
    <section aria-labelledby="related-tests" className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <h2 id="related-tests" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 text-center mb-2">
        Related practice tests
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
        Every test on Tigertest is free and needs no account to start.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tests.map((test) => (
          <li key={test.id}>
            <Link
              href={test.href}
              className="block h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:border-brand hover:shadow-sm transition-colors"
            >
              <span className="block font-semibold text-gray-900 dark:text-gray-50">{test.name}</span>
              <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">{test.org}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-center mt-8 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2">
        {country && (
          <Link href={regionHomePath(country.code)} className="text-brand-dark font-medium hover:underline">
            Free practice tests for {country.inName}
          </Link>
        )}
        <Link href="/tests" className="text-brand-dark font-medium hover:underline">
          See all {TEST_CATALOG.length} practice tests
        </Link>
      </p>
    </section>
    </>
  );
}
