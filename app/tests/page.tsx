import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TEST_CATALOG } from "@/lib/testCatalog";
import { TestCatalogGrid } from "@/components/TestCatalogGrid";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "All Free Practice Tests - DMV, Motorcycle, CDL, Endorsements, Citizenship, Part 107, Ham Radio, EPA 608, CNA, CCMA, PTCB, Phlebotomy, EKG, Dental Assistant, EMT, Food Manager, Real Estate, Insurance, Notary, TEAS, HESI A2, AWS, CompTIA A+, Security+, Food Handler, Boating, Hunter Safety, HTL, CST, CRCST";
const description =
  "Every free practice test on TigerTest in one place: DMV permit tests for all 50 states, motorcycle permit, CDL general knowledge and endorsements, the USCIS citizenship civics test, the FAA Part 107 drone pilot test, the FCC ham radio Technician exam, the EPA 608 refrigerant exam, the certified food protection manager exam, the real estate salesperson national exam, the life and health insurance license exam, the notary public exam, the ATI TEAS nursing entrance exam, the AWS Cloud Practitioner, CompTIA A+ and Security+ exams, the HESI A2 nursing entrance exam, the food handler card test, the boating license and hunter safety exams, the CNA written exam, the NHA CCMA medical assistant exam, the PTCB pharmacy technician exam, the NHA phlebotomy and EKG technician exams, the DANB dental assistant exam, the NREMT EMT exam, and ASCP HTL, NBSTSA CST and HSPA CRCST certification exam prep.";

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
