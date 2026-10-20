import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Part 107 Practice Test 2026 - FAA Drone Exam";
const metaDescription =
  "Free FAA Part 107 practice tests: 200 questions on the Remote Pilot ACS, covering regulations, airspace, weather, loading and operations, with explanations.";
const description =
  "Free FAA Part 107 practice tests with 200 questions weighted to the Remote Pilot ACS: regulations, airspace and charts, weather, loading and performance, operations. Instant feedback and explanations citing the rule.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Part 107 practice test, FAA drone test, remote pilot knowledge test, UAG practice test, Part 107 exam questions, drone license test prep, sUAS knowledge test",
  alternates: {
    canonical: `${siteUrl}/part-107-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/part-107-practice-test`,
    images: [{ url: "/og/part107", width: 1200, height: 630, alt: "TigerTest free Part 107 practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/part107"],
    title,
    description: metaDescription,
  },
};

// One list for the visible FAQ and the FAQPage JSON-LD, so the two never drift.
const faqs = [
  {
    q: "How many questions are on the Part 107 test?",
    a: "The FAA Unmanned Aircraft General (UAG) knowledge test has 60 multiple-choice questions, a 2-hour limit, and a 70 percent pass mark (42 correct). It is taken at a PSI testing center and you need an FAA Tracking Number from IACRA to book.",
  },
  {
    q: "What topics does the Part 107 test cover?",
    a: "Regulations (15 to 25 percent), Airspace and Requirements (15 to 25 percent), Weather (11 to 16 percent), Loading and Performance (7 to 11 percent), and Operations (35 to 45 percent), per the FAA Remote Pilot ACS.",
  },
  {
    q: "Does the Part 107 test use sectional charts?",
    a: "Yes. Several questions refer to sectional chart excerpts and figures in the FAA testing supplement. This bank cannot show figures, so its airspace questions test what the symbols, numbers and boundaries mean. Pair it with a sectional chart legend before test day.",
  },
  {
    q: "Is the TigerTest Part 107 practice test free?",
    a: "Yes. All four practice tests and all five training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free FAA Part 107 Practice Tests",
      description,
      url: `${siteUrl}/part-107-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 Part 107 practice questions",
        "4 practice tests weighted to the FAA ACS",
        "Training sets for all 5 ACS areas",
        "Explanations that cite the regulation",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "Operations", weight: "35 to 45%" },
  { name: "Regulations", weight: "15 to 25%" },
  { name: "Airspace & Charts", weight: "15 to 25%" },
  { name: "Weather", weight: "11 to 16%" },
  { name: "Loading & Performance", weight: "7 to 11%" },
];

export default function Part107LandingPage() {
  return (
    <div data-theme="part107" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Part 107 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/part-107/dashboard"
            shortName="Part 107"
            subtitle="200 questions weighted to the FAA Remote Pilot ACS. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/part107-mobile.png", desktop: "/landing/part107-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="part107" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Training by ACS Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                One set per area of the FAA Airman Certification Standards. Instant feedback, an
                explanation that cites the rule, and questions you miss come back until you have
                mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question tests weighted like the UAG exam, with the real 70 percent pass line.
                Operations is more than a third of every test, just like the real thing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the FAA Remote Pilot ACS
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The FAA publishes the five knowledge areas of the UAG test and the share each carries.
                Every practice test here follows that weighting.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("part107", 1)}
                alt="TigerTest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Help Make TigerTest Better</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Have an idea, a topic you&apos;d like covered, or a question that could be clearer? We read every message and use it to improve every test.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Share Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Pass the Part 107 Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the format</h3>
              <p>
                60 multiple-choice questions in 2 hours at a PSI testing center, 70 percent to pass.
                You must be 16, read and speak English, and get an FAA Tracking Number from IACRA
                before you book. After passing, you complete the certificate application in IACRA.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn to read a sectional chart</h3>
              <p>
                The real test shows chart excerpts from the FAA testing supplement. This bank cannot
                show figures, so it tests what the symbols and numbers mean. Spend an evening with a
                chart legend and the airspace questions here will feel easy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Get the numbers down</h3>
              <p>
                400 feet AGL, 100 mph, 3 statute miles, 500 below and 2,000 horizontal from clouds,
                8 hours bottle to throttle and 0.04 BAC, 10 days to report an accident, 24 calendar
                months for recurrent training. The regulations set drills every one.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak areas</h3>
              <p>
                TigerTest tracks your accuracy by ACS area. After each practice test, go back to the
                set you missed most and retake until you clear 70 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Part 107 Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamRelatedTests examId="part107" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Part 107 Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all five ACS areas.</p>
          <ExamLandingCTA dashboardHref="/part-107/dashboard" />
        </div>
      </div>
    </div>
  );
}
