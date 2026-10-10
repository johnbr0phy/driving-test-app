import Link from "next/link";
import { TEST_CATALOG, relatedTests } from "@/lib/testCatalog";

// "Related practice tests" block for an exam landing: the rest of the exam's
// hub group (nursing, IT, driving...) plus a link to the hub. This is the
// cross-linking that lets new landings share authority with their neighbours.
export function ExamRelatedTests({ examId }: { examId: string }) {
  const tests = relatedTests(examId);
  if (tests.length === 0) return null;

  return (
    <section aria-labelledby="related-tests" className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <h2 id="related-tests" className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
        Related practice tests
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Every test on TigerTest is free and needs no account to start.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tests.map((test) => (
          <li key={test.id}>
            <Link
              href={test.href}
              className="block h-full rounded-2xl border border-gray-200 bg-white p-5 hover:border-brand hover:shadow-sm transition-colors"
            >
              <span className="block font-semibold text-gray-900">{test.name}</span>
              <span className="block text-sm text-gray-500 mt-1">{test.org}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-center mt-8">
        <Link href="/tests" className="text-brand font-medium hover:underline">
          See all {TEST_CATALOG.length} practice tests
        </Link>
      </p>
    </section>
  );
}
