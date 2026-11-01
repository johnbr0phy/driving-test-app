import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Rajasthan Police Constable Mock Test 2026 - Practice Test";
const metaDescription =
  "Free Rajasthan Police Constable mock tests: 232 original questions on reasoning, basic computer, general knowledge, laws on women and children, and Rajasthan GK, with two 100-question tests at the real pace.";
const description =
  "Free Rajasthan Police Constable practice tests with 232 original questions on the written exam syllabus: reasoning and basic computer knowledge, general knowledge and science, laws on crimes against women and children, and Rajasthan's history, art and culture, geography and polity. Each mock test has 100 questions in 80 minutes, in the real paper's 60/45/45 balance and at its pace, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the Rajasthan Police Constable written exam pattern?",
    a: "The written exam has 150 objective questions in 2 hours, in three parts: logical ability, reasoning and basic computer knowledge 60; general knowledge, general science, social science, current affairs and laws on women and children 45; and Rajasthan's history, culture, geography, economy and polity 45. Tigertest's mock tests have 100 questions in 80 minutes, 40, 30 and 30 by part, so you practise at the same 0.8 minute a question.",
  },
  {
    q: "Is there negative marking in the Rajasthan Police Constable exam?",
    a: "Guides for the 2025 recruitment report that a quarter of a question's marks is taken off for each wrong answer; we could not open the department's own notice, so check your notification. At that rate a blind guess among four options still gains a little on average (a sixteenth of a mark), and ruling out even one option makes a guess clearly worth taking. Tigertest scores percent correct without any deduction.",
  },
  {
    q: "When was the latest Rajasthan Police Constable exam?",
    a: "Rajasthan Police issued the constable notification on 9 April 2025, and the written exam was held on 13 and 14 September 2025 in two shifts a day. Check police.rajasthan.gov.in for the next notification and its exact pattern.",
  },
  {
    q: "Is there a General Hindi section in the Rajasthan Police Constable exam?",
    a: "No. Unlike the UP, Bihar and MP constable papers, the Rajasthan paper has no Hindi language section; the question paper itself is set in Hindi and English. Its special parts are basic computer knowledge, laws on crimes against women and children, and a full 45 questions of Rajasthan GK. Tigertest's questions are in English.",
  },
  {
    q: "Are these Rajasthan Police previous year questions?",
    a: "No. Every question is original, written to the written exam syllabus, and none is copied from previous papers. General knowledge covers static facts about India, Rajasthan and the law, not current affairs or government schemes, so read the news of the past year separately. Both mock tests and all eight drills are free, with no account needed.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Rajasthan Police Constable mock test, Rajasthan Police mock test, Rajasthan Police Constable practice test free, Rajasthan Police Constable 2026, Rajasthan Police constable exam questions, Rajasthan GK questions, Rajasthan Police reasoning and computer practice",
  alternates: {
    canonical: `${siteUrl}/rajasthan-police-constable-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rajasthan-police-constable-practice-test`,
    images: [{ url: shareImageUrl("rajpolice"), width: 1200, height: 630, alt: "Tigertest free Rajasthan Police Constable mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rajpolice")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Rajasthan Police Constable Mock Test",
      description,
      url: `${siteUrl}/rajasthan-police-constable-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "232 original Rajasthan Police Constable practice questions with explanations",
        "2 mock tests of 100 questions in 80 minutes, the real exam's pace, in the 60/45/45 balance of parts",
        "8 drills: verbal and logical reasoning, basic computer, India GK and science, laws on women and children, Rajasthan history, art and culture, and geography and polity",
        "Negative marking explained, with percent-correct scoring",
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
        classFaqJsonLd("rajpolice"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Reasoning and basic computer knowledge", weight: "60 questions" },
  { name: "General knowledge, science, current affairs and laws on women and children", weight: "45 questions" },
  { name: "Rajasthan GK: history, culture, geography, economy and polity", weight: "45 questions" },
];

export default function RajPoliceLandingPage() {
  return (
    <div data-theme="rajpolice" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Rajasthan Police Constable Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rajasthan-police-constable/dashboard"
            shortName="Rajasthan Police"
            subtitle="232 original questions on reasoning, computer, GK, laws on women and children, and Rajasthan GK. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/rajpolice-mobile.png", desktop: "/landing/rajpolice-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rajpolice" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Part</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills cover the whole written exam syllabus: verbal reasoning, logical reasoning, basic computer, India GK and science, laws on women and children, Rajasthan history, Rajasthan art and culture, and Rajasthan geography and polity. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 100-question mock tests in 80 minutes, 40, 30 and 30 by part, at the real exam&apos;s pace of 0.8 minute a question (the real paper has 150 in 2 hours). Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the Written Exam Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Rajasthan Police sets three parts, shown below for the full 150-question paper as guides report the 2025 notification. Every Tigertest mock keeps that balance with 40, 30 and 30 questions. Reasoning questions are text only (no figure, Venn diagram, cube or dice items), and general knowledge sticks to static facts, so current affairs and state schemes are not covered. Guides report that each wrong answer costs a quarter of a question&apos;s marks, so practise deciding when a guess is worth it.
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
                src={getTigerAsset("rajpolice", 1)}
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
            How to Prepare for the Rajasthan Police Constable Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Give reasoning and computer the most time</h3>
              <p>
                Reasoning and basic computer knowledge make up 60 of the 150 questions, the biggest part of the paper. Series, coding, blood relations, directions and clocks follow patterns you can learn, and the computer questions keep coming back to the same ground: memory and storage units, MS Word and Excel shortcuts, email and staying safe from online fraud.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know Rajasthan inside out</h3>
              <p>
                Another 45 questions are on Rajasthan itself: Mewar and Marwar, 1857 and the peasant and tribal movements, integration, forts, folk dances, fairs, painting schools, rivers, lakes, minerals and the state&apos;s institutions. Make a one-page list for each, and revise district names from the latest official list, since districts changed in 2023 and again in 2024.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the laws on women and children</h3>
              <p>
                The syllabus names crimes against women and children and the laws on them. Know the main Acts and their years (POCSO 2012, Domestic Violence 2005, Dowry Prohibition 1961, Prohibition of Child Marriage 2006, Juvenile Justice 2015), the key ages and helplines, and the safeguards for women and children in police procedure.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise at exam pace</h3>
              <p>
                With 150 questions in 2 hours you have under a minute each. Take a full 80-minute mock, see which part ate your time, and drill it. Then read the past year&apos;s news and the state&apos;s main schemes separately, since current affairs are part of the paper but not of this bank.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Rajasthan Police Constable Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="rajpolice" />
        </div>
      </div>

      <ExamRelatedTests examId="rajpolice" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the Rajasthan Police Constable Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 232 questions across all three parts.</p>
          <ExamLandingCTA dashboardHref="/rajasthan-police-constable/dashboard" />
        </div>
      </div>
    </div>
  );
}
