import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CERTIFICATION_TESTS, DRIVING_TESTS, TEST_CATALOG, TestCatalogEntry } from "@/lib/testCatalog";
import { TestIcon } from "@/components/TestIcon";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "All Free Practice Tests - DMV, CDL, HTL, CST, CRCST";
const description =
  "Every free practice test on TigerTest in one place: DMV permit tests for all 50 states, CDL general knowledge, and ASCP HTL, NBSTSA CST and HSPA CRCST certification exam prep.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/tests` },
  openGraph: { title, description, url: `${siteUrl}/tests`, siteName: "TigerTest", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "TigerTest practice tests",
  itemListElement: TEST_CATALOG.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    url: `${siteUrl}${t.href}`,
  })),
};

function TestCard({ test }: { test: TestCatalogEntry }) {
  return (
    <div data-theme={test.theme} className="h-full">
      <Link
        href={test.href}
        className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-brand hover:shadow-lg"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
            <TestIcon icon={test.icon} className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{test.name}</h2>
            <p className="text-sm text-gray-500">{test.org}</p>
          </div>
        </div>
        <p className="flex-1 text-gray-600">{test.blurb}</p>
        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="text-gray-500">{test.questions} questions · Free</span>
          <span className="inline-flex items-center gap-1 font-semibold text-brand group-hover:gap-2 transition-all">
            Start <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </div>
  );
}

export default function TestsHubPage() {
  return (
    <div className="flex-1 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-14 pb-12 md:pt-20 md:pb-16 text-center">
          <Image src="/tiger.png" alt="TigerTest" width={72} height={72} className="mx-auto mb-5 w-16 md:w-[72px]" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Pick Your Practice Test</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Every test on TigerTest is free, needs no account to start, and uses the same
            mastery-based training and full-length practice tests.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">Driving tests</h2>
        <div className="grid gap-5 sm:grid-cols-2 mb-12">
          {DRIVING_TESTS.map((t) => (
            <TestCard key={t.id} test={t} />
          ))}
        </div>

        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">Healthcare certification exams</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATION_TESTS.map((t) => (
            <TestCard key={t.id} test={t} />
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-gray-50 border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Don&apos;t see your exam?</h2>
          <p className="text-gray-600 mb-5 max-w-xl mx-auto">
            We add new tests based on requests. Tell us which certification you are studying for.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Request a test
          </a>
        </div>
      </div>
    </div>
  );
}
