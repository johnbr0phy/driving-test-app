import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TEST_CATALOG } from "@/lib/testCatalog";
import { TestCatalogGrid } from "@/components/TestCatalogGrid";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = `Free Practice Tests for ${TEST_CATALOG.length} Exams - DMV, CDL, Nursing, IT & More`;
const description =
  "Free practice tests for DMV permits in all 50 states, CDL, motorcycle, citizenship, nursing and healthcare certifications, IT certs, real estate, insurance, notary and more. No account needed.";

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
    images: [{ url: "/tiger.png", width: 512, height: 512, alt: "TigerTest" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/tiger.png"] },
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
        <TestCatalogGrid />

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
