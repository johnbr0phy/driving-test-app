import "@/lib/v2/banks/iegarda";
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

const title = "Free Garda Trainee Assessment Practice Test 2026 - Verbal and Numerical Reasoning";
const metaDescription =
  "Garda Trainee Stage 1 practice, free to start: 200 original verbal and numerical reasoning questions with explanations, two timed tests and four drills for the publicjobs online assessments.";
const description =
  "Garda Trainee assessment practice, free to start, with 200 original questions on the verbal and numerical reasoning tests An Garda Síochána names for Stage 1 of its recruitment: True, False or Cannot say statements and reading questions on short passages, and numerical reasoning on tables of figures, in two timed practice tests and four drills. Every answer has an explanation.";

const faqs = [
  {
    q: "What are the Garda Trainee Stage 1 assessments?",
    a: "Stage 1 of the Garda Trainee competition is run by publicjobs for An Garda Síochána. The Garda selection flowchart lists online verbal and numerical reasoning tests and a written exercise. The tests are taken online, in English only (2026 FAQ); in the 2024 competition they could be taken at any time within the testing window and were remotely proctored by webcam. publicjobs describes its verbal reasoning test as judging statements against written passages and its numerical reasoning test as drawing conclusions from numerical information, both multiple choice.",
  },
  {
    q: "Is there a pass mark for Stage 1?",
    a: "No pass mark is published. Candidates are ranked on their assessment scores, and those placed highest on the order of merit are called to Stage 2 first, an online interview on Zoom (the 2026 competition added a roleplay). Because places go in rank order, every extra mark helps. Tigertest reports percent correct, not a rank.",
  },
  {
    q: "What happens after the interview?",
    a: "Candidates who pass the interview and meet the eligibility rules go to An Garda Síochána for the appointments process: the Physical Competency Assessment, a medical, a substance misuse test and vetting. Those who pass everything are invited to the Foundation Training Programme at the Garda College in Templemore. The whole process can take 6 to 18 months, according to the 2026 FAQ.",
  },
  {
    q: "Is this the real Garda test?",
    a: "No. Every question here is original, written for Tigertest on the question types publicjobs describes, not taken from publicjobs familiarisation material, any test provider's practice items or any past test. Tigertest is not affiliated with publicjobs or An Garda Síochána. publicjobs does not publish the number of questions or the time for each test, so the length here (30 verbal questions in 25 minutes and 20 numerical in 25 minutes) is Tigertest's own. The written exercise is not modelled.",
  },
  {
    q: "Who can apply to be a Garda Trainee?",
    a: "Under the 2026 FAQ, you must be 18 and not yet 50 at midnight on the closing date, hold a Leaving Certificate with at least a D3 or O6 in five Ordinary Level subjects or a Level 5 Major award on the NFQ (or a comparable qualification), and be proficient in Irish or English. Nationality and residence rules also apply. Check the current competition booklet on publicjobs before you apply.",
  },
  {
    q: "Is the Tigertest Garda Trainee practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the first two drills are free; Practice Test 2 and the other two drills are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Garda Trainee test, Garda recruitment test, Garda aptitude test, Garda Trainee assessment, Garda verbal reasoning, Garda numerical reasoning, publicjobs Garda, Garda stage 1, An Garda Síochána recruitment, Garda practice test 2026",
  alternates: {
    canonical: `${siteUrl}/garda-trainee-assessment-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/garda-trainee-assessment-practice-test`,
    images: [{ url: shareImageUrl("iegarda"), width: 1200, height: 630, alt: "Tigertest Garda Trainee assessment practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("iegarda")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Garda Trainee Assessment Practice Test",
      description,
      url: `${siteUrl}/garda-trainee-assessment-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("iegarda"),
      featureList: [
        "200 original verbal and numerical reasoning questions with explanations",
        "2 timed practice tests: 30 verbal questions in 25 minutes and 20 numerical in 25 minutes",
        "True, False or Cannot say passages, reading questions and tables of figures",
        "4 drills, two verbal and two numerical",
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
        classFaqJsonLd("iegarda"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "True, False or Cannot say statements", weight: "20 questions" },
  { name: "Reading for meaning", weight: "10 questions" },
  { name: "Percentages and change", weight: "10 questions" },
  { name: "Totals, averages and ratios", weight: "10 questions" },
];

export default function GardaTraineeLandingPage() {
  return (
    <div data-theme="iegarda" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Garda Trainee Assessment Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/garda-trainee/dashboard"
            shortName="Garda Trainee"
            subtitle="200 original verbal and numerical reasoning questions for Garda Trainee Stage 1. Free to start, no account needed."
            shots={{ mobile: "/landing/iegarda-mobile.png", desktop: "/landing/iegarda-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="iegarda" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Question Type</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four drills: True, False or Cannot Say, Reading for Meaning, Percentages and Change, and Totals, Averages and Ratios. Questions you miss come back until you have mastered them, and every answer is explained.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Timed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two tests, each a verbal reasoning section of 30 questions in 25 minutes and a numerical reasoning section of 20 questions in 25 minutes with a calculator, scored by section and question type. Practice Test 2 is held out of the drills, so its questions are new to you.
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
                Built on the Tests Stage 1 Names
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                An Garda Síochána lists online verbal and numerical reasoning tests for Stage 1, and publicjobs describes both as multiple choice. No count per question type is published, so each practice test here spreads its 50 questions like this:
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
                src={getTigerAsset("iegarda", 3)}
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
            How to Prepare for Stage 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Use only what the passage says</h3>
              <p>
                In True, False or Cannot say questions, your own knowledge does not count. A statement is True only if the passage shows it, False only if the passage contradicts it, and Cannot say when the passage does not settle it, even if the statement sounds likely.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Watch the small words</h3>
              <p>
                &quot;All&quot;, &quot;only&quot;, &quot;always&quot;, &quot;some&quot; and &quot;most&quot; decide many answers. A passage that says a scheme closes some streets does not support a statement about every street.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Check the base of every percentage</h3>
              <p>
                The most common slip in numerical reasoning is dividing by the wrong number: a percentage change is always worked out on the starting figure. Read the column headings and units before you calculate.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read the booklet publicjobs sends</h3>
              <p>
                Before Stage 1, publicjobs provides familiarisation material with practice examples (2024 candidate booklet). Read it closely for the number of questions, the time and what you may use, and take the tests somewhere quiet with a reliable connection and a webcam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Garda Trainee Assessment Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="iegarda" />
        </div>
      </div>

      <SampleQuestionsV2 examId="iegarda" />

      <ExamRelatedTests examId="iegarda" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start Your Garda Application?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across verbal and numerical reasoning.</p>
          <ExamLandingCTA dashboardHref="/garda-trainee/dashboard" />
        </div>
      </div>
    </div>
  );
}
