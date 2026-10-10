import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free TEAS Practice Test 2026 - ATI TEAS 7 Nursing Entrance Exam Prep";
const description =
  "Free ATI TEAS 7 practice tests with 200 questions across all four sections: reading with passages, mathematics with worked solutions, science with anatomy and physiology, biology, chemistry and scientific reasoning, and English and language usage. Instant feedback with explanations.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "TEAS practice test, ATI TEAS 7 practice test, TEAS exam prep 2026, TEAS science practice questions, TEAS math practice, nursing school entrance exam practice, free TEAS practice test, TEAS reading practice",
  alternates: {
    canonical: `${siteUrl}/teas-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/teas-practice-test`,
    images: [{ url: "/og/teas", width: 1200, height: 630, alt: "TigerTest free TEAS practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/teas"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free TEAS Full-Length Test on a Computer",
      description,
      url: `${siteUrl}/teas-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 TEAS practice questions",
        "A full-length timed TEAS: four sections, 170 questions, 209 minutes",
        "Percent scores per section and a composite, like the ATI report",
        "Mastery drills for reading, math, science and English",
        "Instant feedback with explanations",
        "Progress syncs between phone and computer",
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
          name: "How many questions are on the TEAS 7?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "170 questions in about 209 minutes: Reading 45 in 55 minutes, Mathematics 38 in 57, Science 50 in 60, and English and Language Usage 37 in 37. Twenty of the 170 are unscored pretest items you cannot identify.",
          },
        },
        {
          "@type": "Question",
          name: "What score do I need on the TEAS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no national pass mark. Each nursing or allied health program sets its own cutoff, commonly 60 to 70 percent overall, and competitive programs look for higher. Check your program's admissions page.",
          },
        },
        {
          "@type": "Question",
          name: "Does this have the same question types as the real TEAS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The real exam mixes multiple choice with select-all-that-apply, fill-in, hot-spot and ordered-response items. Everything here is four-option single answer, with each reading passage shown beside its question, so use this to learn the content and the timing and expect the other formats on exam day.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TEAS science section mostly anatomy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Of 44 scored science questions, 18 are human anatomy and physiology, 9 biology, 8 chemistry and 9 scientific reasoning. The science set here follows that split.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest TEAS practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The full-length test and all four drills are free, with no account required. Create a free account to keep your progress in step between your phone and your computer.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Science", weight: "29%" },
  { name: "Reading", weight: "26%" },
  { name: "Mathematics", weight: "23%" },
  { name: "English & Language Usage", weight: "22%" },
];

export default function TeasLandingPage() {
  return (
    <div data-theme="teas" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="teas" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free TEAS Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/teas"
            shortName="TEAS"
            subtitle="200 questions across all four ATI TEAS 7 sections. Worked math, anatomy-heavy science. No account needed."
            shots={{ mobile: "/landing/teas-mobile.png", desktop: "/landing/teas-desktop.png" }}
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Skill Drills on Your Phone</h3>
              <p className="text-gray-600">
                Four drills, one per TEAS section: reading passages beside the question, math with every step shown, science weighted to anatomy and physiology, and English and language usage. One tap checks each answer, and every miss comes back until you have mastered it.
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
                The real structure: Reading, Mathematics, Science and English in order, each with its own clock, a calculator on the math section and a break after it. Finish with percent scores per section and a composite, then a plan for what to drill next.
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
                Built on the ATI TEAS 7 Blueprint
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                ATI publishes the number of scored questions in each section and sub-area. Every practice test here follows that weighting: 39 reading, 34 math, 44 science and 33 English scored items on the real exam become 13, 11, 15 and 11 here.
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
                src={getTigerAsset("teas", 1)}
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
            The TEAS practice test is brand new. If a question looks wrong or an answer doesn&apos;t add up, tell us.
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
            How to Pass the TEAS
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Put your hours into anatomy and physiology</h3>
              <p>
                Science is the biggest section and A&P is almost half of it: the heart, lungs, kidneys, nerves, hormones and immune system, each with its structure, function and a common disorder. Biology, chemistry and scientific reasoning fill the rest.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Do the math on paper first</h3>
              <p>
                Fractions, percents, ratios, proportions, unit conversions, mean and median, area and volume. The real exam gives you a four-function calculator, so the mistakes come from setting problems up wrong. Every math question here shows its working.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Read for the author, not just the facts</h3>
              <p>
                Main idea, inference, tone, purpose, text structure, fact versus opinion. The passages here are short and the question types match the TEAS, so you learn to spot what each one is really asking.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak section</h3>
              <p>
                TigerTest tracks your accuracy by section. Programs usually want 60 to 70 percent overall and some set section minimums, so retake the set you missed most until you clear 75 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          TEAS Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the TEAS 7?</h3>
            <p className="text-gray-600">
              170 questions in about 209 minutes: Reading 45 in 55 minutes, Mathematics 38 in 57, Science 50 in 60, and English and Language Usage 37 in 37. Twenty of the 170 are unscored pretest items you cannot identify.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What score do I need on the TEAS?</h3>
            <p className="text-gray-600">
              There is no national pass mark. Each nursing or allied health program sets its own cutoff, commonly 60 to 70 percent overall, and competitive programs look for higher. Check your program&apos;s admissions page.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this have the same question types as the real TEAS?</h3>
            <p className="text-gray-600">
              The real exam mixes multiple choice with select-all-that-apply, fill-in, hot-spot and ordered-response items. Everything here is four-option single answer, with each reading passage shown beside its question, so use this to learn the content and the timing and expect the other formats on exam day.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TEAS science section mostly anatomy?</h3>
            <p className="text-gray-600">
              Yes. Of 44 scored science questions, 18 are human anatomy and physiology, 9 biology, 8 chemistry and 9 scientific reasoning. The science set here follows that split.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest TEAS practice test free?</h3>
            <p className="text-gray-600">
              Yes. The full-length test and all four drills are free, with no account required. Create a free account to keep your progress in step between your phone and your computer.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="teas" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass the TEAS?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all four sections.</p>
          <ExamLandingCTA dashboardHref="/teas" />
        </div>
      </div>
    </div>
  );
}
