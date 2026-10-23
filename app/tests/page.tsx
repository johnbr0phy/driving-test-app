import { Metadata } from "next";
import Link from "next/link";
import { TEST_CATALOG } from "@/lib/testCatalog";
import { TestCatalogGrid } from "@/components/TestCatalogGrid";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = `All Practice Tests: Browse ${TEST_CATALOG.length} Free Exams by Category`;
const description =
  "Browse every TigerTest practice test by category: DMV and CDL, nursing and healthcare, IT certs, trades, real estate, insurance, college entrance and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/tests` },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/tests`,
    siteName: "TigerTest",
    type: "website",
    images: [{ url: "/og-tests.png", width: 1200, height: 630, alt: `TigerTest: ${TEST_CATALOG.length} free practice tests` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-tests.png"] },
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

export default function TestsHubPage() {
  return (
    <div className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-14 pb-12 md:pt-20 md:pb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">Pick Your Practice Test</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <TestCatalogGrid />

        <div className="mt-14 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">Make your own practice test</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-5 max-w-xl mx-auto">
            Have ChatGPT or Claude write the questions from your notes, import a Quizlet set or write them yourself, and get a link anyone can play in Practice, Test and Flashcards
            modes.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-3 rounded-full font-medium transition-colors"
          >
            Make a quiz
          </Link>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/quizzes" className="underline">Browse quizzes members made</Link>.
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">Don&apos;t see your exam?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-5 max-w-xl mx-auto">
            We add new tests based on requests. Tell us which certification you are studying for.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-full font-medium hover:bg-brand-hover transition-colors"
          >
            Request a test
          </a>
        </div>
      </div>
    </div>
  );
}
