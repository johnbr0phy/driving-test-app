import "@/lib/v2/banks/mcat";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "MCAT Practice Test 2026 - All Four Sections";
const metaDescription =
  "MCAT practice test: 234 original passage-based and discrete questions across Chem/Phys, CARS, Bio/Biochem and Psych/Soc, with explanations and a 472 to 528 score estimate.";
const description =
  "MCAT practice tests with 234 original questions across all four sections: Chemical and Physical Foundations of Biological Systems, Critical Analysis and Reasoning Skills, Biological and Biochemical Foundations of Living Systems, and Psychological, Social, and Biological Foundations of Behavior. Each practice test runs every section at about half length and the real pace, with passage sets and discrete questions weighted like the AAMC outline, no calculator, an explanation on every answer and an estimated score from 472 to 528.";

const faqs = [
  {
    q: "What is on the MCAT?",
    a: "The MCAT has four sections. Chemical and Physical Foundations of Biological Systems tests general and organic chemistry, physics and biochemistry. Critical Analysis and Reasoning Skills (CARS) tests reading and reasoning on humanities and social science passages. Biological and Biochemical Foundations of Living Systems tests biology and biochemistry. Psychological, Social, and Biological Foundations of Behavior tests psychology and sociology with some biology. The three science sections have 59 questions in 95 minutes each and mix passage sets with discrete questions; CARS has 53 questions in 90 minutes, all on passages.",
  },
  {
    q: "How is the MCAT scored?",
    a: "Each of the four sections is scored from 118 to 132, and the total is their sum, from 472 to 528. Wrong answers count the same as blank ones, so it pays to answer every question. The AAMC converts the number you get right to a scaled score through equating for each test form and does not publish a conversion table, so Tigertest's scores are estimates from its own conversion, not official scores.",
  },
  {
    q: "How long is the MCAT?",
    a: "The four sections take 6 hours 15 minutes, and the whole day is about 7 hours 30 minutes in the seat, not counting check-in. There are three optional breaks: 10 minutes after the first section, 30 minutes at the midpoint and 10 minutes after the third section.",
  },
  {
    q: "Can I use a calculator on the MCAT?",
    a: "No. Personal electronic devices are not allowed, and you do calculations by hand on the noteboard booklet the test center gives you. A periodic table is provided, and questions are written so that arithmetic, estimation, logarithms and scientific notation can be done by hand. Every calculation in Tigertest's practice tests is written the same way.",
  },
  {
    q: "How is this practice test different from the real MCAT?",
    a: "Each practice test has all four sections in the real order, with passages and discrete questions weighted like the AAMC content outline, four choices per question and no calculator. To fit a practice session, each section is about half the real length at the same pace: 30 questions in 48 minutes for the science sections and 27 in 46 for CARS. Every passage and question is original; none is taken from AAMC official practice material or commercial prep.",
  },
  {
    q: "Is the Tigertest MCAT practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and most drills are free; the last two drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "MCAT practice test, MCAT practice exam, MCAT practice questions, MCAT CARS practice, MCAT chem phys practice, MCAT bio biochem practice, MCAT psych soc practice, MCAT score estimate",
  alternates: {
    canonical: `${siteUrl}/mcat-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/mcat-practice-test`,
    images: [{ url: shareImageUrl("mcat"), width: 1200, height: 630, alt: "Tigertest MCAT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("mcat")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - MCAT Practice Test",
      description,
      url: `${siteUrl}/mcat-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("mcat"),
      featureList: [
        "234 original MCAT practice questions with explanations",
        "2 practice tests with all four sections at half length and the real pace",
        "Passage sets and discrete questions weighted like the AAMC content outline",
        "Estimated section scores (118 to 132) and total score (472 to 528)",
        "9 drills by foundational concept and CARS skill",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("mcat"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Chemical and Physical Foundations", weight: "30 questions, 48 min" },
  { name: "Critical Analysis and Reasoning Skills", weight: "27 questions, 46 min" },
  { name: "Biological and Biochemical Foundations", weight: "30 questions, 48 min" },
  { name: "Psychological, Social, and Biological Foundations", weight: "30 questions, 48 min" },
];

export default function McatLandingPage() {
  return (
    <div data-theme="mcat" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            MCAT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/mcat/dashboard"
            shortName="MCAT"
            subtitle="234 original passage-based and discrete questions across all four MCAT sections. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/mcat-mobile.png", desktop: "/landing/mcat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="mcat" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Concept and Skill</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nine drills: physical and chemical foundations, the three CARS skills, biomolecules, cells and organ systems, mind and behavior, and self and society. Each question you miss comes back until you have mastered it, and the passage stays beside it.
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
                Two practice tests with all four sections in the real order, each about half the real length at the same pace, with short breaks between. You get an estimated score for each section and a total from 472 to 528. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the AAMC Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Questions are spread across the foundational concepts the way the AAMC outline weights them: in Chem/Phys 40% physical principles and 60% chemistry; in Bio/Biochem 55% biomolecules; in Psych/Soc mostly psychology with a third sociology; and in CARS 30% comprehension, 30% reasoning within the text and 40% reasoning beyond it, on humanities and social science passages in equal measure.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("mcat", 1)}
                alt="Tigertest mascot"
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Help Make Tigertest Better</h2>
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
            How to Prepare for the MCAT
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the content, then use it on passages</h3>
              <p>
                Most science questions sit on a passage about an experiment or a clinical case, so knowing a fact is only the start. Practice pulling the variables, the result and the conclusion out of a passage quickly, then bringing in what you know: an enzyme mechanism, a buffer equation, a learning principle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Do the math by hand</h3>
              <p>
                There is no calculator, so get quick at estimation, ratios, scientific notation and logarithms. Most calculations reduce to a clean number if you set them up first: write the formula, cancel what you can, and round sensibly before multiplying.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read CARS for the argument</h3>
              <p>
                CARS needs no outside knowledge. For each passage, find the author&apos;s main claim and attitude, and note what each paragraph does. Questions then ask what the author says, how a part of the argument works, and how the ideas would apply to a new case or change with new information. Answer from the passage, not from what you believe.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice under the clock, then drill your weakest area</h3>
              <p>
                The real exam gives about a minute and a half per question in each section. Take a timed practice test, use the score breakdown to find the concept or CARS skill that costs you the most, and drill it until you have mastered it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          MCAT Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="mcat" />
        </div>
      </div>

      <SampleQuestionsV2 examId="mcat" />

      <ExamRelatedTests examId="mcat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Take On the MCAT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 234 questions across all four sections.</p>
          <ExamLandingCTA dashboardHref="/mcat/dashboard" />
        </div>
      </div>
    </div>
  );
}
