import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free ASVAB Practice Test 2026 - AFQT and All 8 Subtests";
const description =
  "Free ASVAB practice tests with 200 questions across eight subtests: Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension, Mathematics Knowledge, General Science, Electronics, Auto and Shop, and Mechanical Comprehension. Extra weight on the four AFQT sections, with the key step shown on every math answer.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "ASVAB practice test, free ASVAB practice test, AFQT practice test, ASVAB arithmetic reasoning practice, ASVAB word knowledge practice, ASVAB math knowledge practice, ASVAB paragraph comprehension, ASVAB test prep 2026",
  alternates: {
    canonical: `${siteUrl}/asvab-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/asvab-practice-test`,
    images: [{ url: "/og/asvab", width: 1200, height: 630, alt: "TigerTest free ASVAB practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/asvab"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free ASVAB Practice Tests",
      description,
      url: `${siteUrl}/asvab-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 ASVAB practice questions",
        "4 practice tests across all eight subtests",
        "Training sets for every subtest",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What subtests are on the ASVAB?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The computer version (CAT-ASVAB) has ten subtests: General Science, Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension, Mathematics Knowledge, Electronics Information, Auto Information, Shop Information, Mechanical Comprehension, and Assembling Objects. The paper version combines Auto and Shop into one subtest. TigerTest covers the first nine; Assembling Objects is a picture-based spatial test and is not included here.",
          },
        },
        {
          "@type": "Question",
          name: "How is the ASVAB scored and what is the AFQT?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each subtest gets a standard score, and the services combine them into line scores that qualify you for specific jobs. The Armed Forces Qualification Test (AFQT) score, which decides whether you can enlist at all, is a percentile from 1 to 99 built from four subtests only: Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension, and Mathematics Knowledge. A 50 means you scored as well as or better than half of the reference group.",
          },
        },
        {
          "@type": "Question",
          name: "What AFQT score do I need to enlist?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "As of 2026 the published minimums for high school graduates are 31 for the Army, Navy, Marine Corps and Air Force and 36 for the Coast Guard. Minimums move with recruiting needs, GED holders usually need a higher score, and many jobs require line scores well above the floor, so confirm the current number with a recruiter before you test.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use a calculator on the ASVAB?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Calculators are not allowed on any version of the ASVAB. You get scratch paper and a pencil, so practice doing arithmetic, fractions, percents and simple algebra by hand. The CAT-ASVAB also adapts to your answers and does not let you go back, so answer every question in order.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest ASVAB practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Arithmetic Reasoning", weight: "18%" },
  { name: "Word Knowledge", weight: "18%" },
  { name: "Mathematics Knowledge", weight: "18%" },
  { name: "Paragraph Comprehension", weight: "14%" },
  { name: "General Science", weight: "10%" },
  { name: "Electronics Information", weight: "8%" },
  { name: "Auto & Shop Information", weight: "8%" },
  { name: "Mechanical Comprehension", weight: "6%" },
];

export default function AsvabLandingPage() {
  return (
    <div data-theme="asvab" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="asvab" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free ASVAB Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/asvab/dashboard"
            shortName="ASVAB"
            subtitle="200 questions across all eight subtests, weighted toward the four AFQT sections that decide whether you enlist. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/asvab-mobile.png", desktop: "/landing/asvab-desktop.png" }}
          />
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Subtest</h3>
              <p className="text-gray-600">
                Four sets: arithmetic reasoning and math knowledge, word knowledge and paragraph comprehension, general science and electronics, and auto, shop and mechanical. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Tests</h3>
              <p className="text-gray-600">
                Four 50-question tests that sample every subtest, with the key step shown on every math answer and the passage embedded in every paragraph comprehension item. No calculator, just like test day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built on the ASVAB Subtests
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The ASVAB is a battery of separate subtests, and the four that make up your AFQT score (arithmetic reasoning, word knowledge, paragraph comprehension and mathematics knowledge) decide whether you can enlist. The practice tests here give those four more than two thirds of the questions, with the technical subtests filling out the rest.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <span className="font-medium text-gray-900">{area.name}</span>
                    <span className="text-brand font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("asvab", 1)}
                alt="TigerTest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Just launched */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Just Launched!</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            The ASVAB practice test is brand new. If a question looks wrong or a recruiter told you something different, tell us.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Send Us Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How to Score Higher on the ASVAB
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Put the AFQT four first</h3>
              <p>
                Only arithmetic reasoning, word knowledge, paragraph comprehension and mathematics knowledge count toward the AFQT percentile that qualifies you to enlist. If your study time is short, spend it there. The technical subtests matter for job line scores, so come back to them once the core four are solid.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Do the math by hand</h3>
              <p>
                No calculator is allowed, so drill fractions, percents, ratios, unit conversions, and solving for x on paper. For word problems, write down what the question asks before you compute; most wrong answers come from solving for the wrong quantity, not from bad arithmetic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Learn roots, prefixes and suffixes</h3>
              <p>
                Word knowledge asks for the closest synonym, and you will not know every word. Prefixes like bene, mal, ante and post, and roots like dict, port and spec, let you narrow four choices to two. In paragraph comprehension, read the question first so you know whether you are hunting for the main idea, a detail or an inference.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Answer everything and keep moving</h3>
              <p>
                The CAT-ASVAB adapts to you and will not let you go back, and unanswered questions count against you. Make your best pick and move on. Use TigerTest&apos;s per-subtest accuracy to find your weakest area, then retake that training set until you clear 85 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          ASVAB Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What subtests are on the ASVAB?</h3>
            <p className="text-gray-600">
              The computer version (CAT-ASVAB) has ten subtests: General Science, Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension, Mathematics Knowledge, Electronics Information, Auto Information, Shop Information, Mechanical Comprehension, and Assembling Objects. The paper version combines Auto and Shop into one subtest. TigerTest covers the first nine; Assembling Objects is a picture-based spatial test and is not included here.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How is the ASVAB scored and what is the AFQT?</h3>
            <p className="text-gray-600">
              Each subtest gets a standard score, and the services combine them into line scores that qualify you for specific jobs. The Armed Forces Qualification Test (AFQT) score, which decides whether you can enlist at all, is a percentile from 1 to 99 built from four subtests only: Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension, and Mathematics Knowledge. A 50 means you scored as well as or better than half of the reference group.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What AFQT score do I need to enlist?</h3>
            <p className="text-gray-600">
              As of 2026 the published minimums for high school graduates are 31 for the Army, Navy, Marine Corps and Air Force and 36 for the Coast Guard. Minimums move with recruiting needs, GED holders usually need a higher score, and many jobs require line scores well above the floor, so confirm the current number with a recruiter before you test.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Can I use a calculator on the ASVAB?</h3>
            <p className="text-gray-600">
              No. Calculators are not allowed on any version of the ASVAB. You get scratch paper and a pencil, so practice doing arithmetic, fractions, percents and simple algebra by hand. The CAT-ASVAB also adapts to your answers and does not let you go back, so answer every question in order.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest ASVAB practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="asvab" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Ace the ASVAB?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all eight subtests.</p>
          <ExamLandingCTA dashboardHref="/asvab/dashboard" />
        </div>
      </div>
    </div>
  );
}
