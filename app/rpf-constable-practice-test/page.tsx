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

const title = "Free RPF Constable Mock Test 2026 - CBT Practice";
const metaDescription =
  "Free RPF Constable CBT mock tests: 232 original questions on General Awareness, Arithmetic and Reasoning, with two 100-question tests at the real pace and an explanation on every answer.";
const description =
  "Free RPF Constable practice tests with 232 original questions on the CBT syllabus: General Awareness (history, geography, polity, the railways and general science), Arithmetic, and General Intelligence and Reasoning. Each mock test has 100 questions in 75 minutes, the real pace and subject balance of the 120-question paper, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the RPF Constable CBT exam pattern?",
    a: "In the last recruitment (CEN RPF 02/2024) the Computer Based Test had 120 multiple-choice questions for 120 marks in 90 minutes. Exam guides give the split as 50 questions on General Awareness, 35 on Arithmetic and 35 on General Intelligence and Reasoning. Candidates who do well enough are called to the Physical Efficiency Test and Physical Measurement Test, then document verification.",
  },
  {
    q: "Is there negative marking in the RPF Constable exam?",
    a: "Yes. The notice deducts one third of a mark for each wrong answer, and an unanswered question costs nothing. A blind guess among four options breaks even on average, so it neither helps nor hurts; once you can rule out even one option, a guess gains marks on average. Tigertest scores percent correct without the deduction, so keep count of the questions you guessed.",
  },
  {
    q: "What are the qualifying marks for the RPF Constable CBT?",
    a: "Guides report minimum qualifying marks of 35 percent for UR, EWS and OBC candidates and 30 percent for SC and ST candidates. Reaching the minimum is not enough on its own: candidates are called to the PET and PMT on normalised marks against cut-offs that are usually well above it, and the PET and PMT are qualifying only.",
  },
  {
    q: "Why are the Tigertest mock tests 100 questions instead of 120?",
    a: "Each mock test has 100 questions in 75 minutes, which is the real pace of 45 seconds a question, with the subjects in the real proportion: 42 General Awareness, 29 Arithmetic and 29 Reasoning. That keeps two full tests and eight drills in one bank. Every question is original, General Awareness covers static facts and not current affairs, and the next RPF Constable notice had not been published as of November 2026, so check its pattern when it appears. Tigertest is not affiliated with the Railway Protection Force or the Railway Recruitment Boards.",
  },
  {
    q: "Is the Tigertest RPF Constable mock test free?",
    a: "Yes. Both mock tests and all eight subject drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "RPF Constable mock test, RPF Constable practice test, RPF Constable CBT mock test free, RPF Constable 2026, Railway Protection Force constable exam questions, RPF general awareness questions, RPF arithmetic and reasoning practice, RPF exam mock test",
  alternates: {
    canonical: `${siteUrl}/rpf-constable-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rpf-constable-practice-test`,
    images: [{ url: shareImageUrl("rpfconst"), width: 1200, height: 630, alt: "Tigertest free RPF Constable mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rpfconst")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RPF Constable Mock Test",
      description,
      url: `${siteUrl}/rpf-constable-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "232 original RPF Constable CBT practice questions with explanations",
        "2 mock tests of 100 questions in 75 minutes, the real pace and subject balance",
        "8 drills: history and culture, geography, polity, economy and railways, general science, arithmetic, numbers and geometry, verbal and logical reasoning",
        "Static General Awareness facts only, no current affairs",
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
        classFaqJsonLd("rpfconst"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "General Awareness", weight: "50 questions" },
  { name: "Arithmetic", weight: "35 questions" },
  { name: "General Intelligence and Reasoning", weight: "35 questions" },
];

export default function RpfConstableLandingPage() {
  return (
    <div data-theme="rpfconst" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RPF Constable Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rpf-constable/dashboard"
            shortName="RPF Constable"
            subtitle="232 original CBT questions on General Awareness, Arithmetic and Reasoning. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/rpfconst-mobile.png", desktop: "/landing/rpfconst-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rpfconst" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills cover the whole CBT syllabus: history and culture, geography, polity, economy and the railways, general science, arithmetic word problems, numbers and geometry, verbal reasoning and logical reasoning. Questions you miss come back until you have mastered them.
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
                Two 100-question mock tests in 75 minutes, the real RPF pace of 45 seconds a question, grouped by subject like the paper. Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the RPF Constable CBT Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The last RPF Constable CBT had 120 questions in 90 minutes, split as below according to exam guides. Every Tigertest mock keeps that balance at 100 questions in 75 minutes. In the real exam each wrong answer costs 1/3 mark, so practise leaving a question blank when you cannot rule anything out.
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
                src={getTigerAsset("rpfconst", 1)}
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
            How to Prepare for the RPF Constable CBT
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Give General Awareness the most time</h3>
              <p>
                General Awareness is the biggest section, about 40 percent of the paper. Build it in two layers: static facts first (history, rivers and states, the Constitution, sports, general science and the railways, which an RPF paper often touches), then the news of the past year for current affairs, which this practice bank does not cover.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the arithmetic shortcuts</h3>
              <p>
                Most arithmetic questions are percentages, profit and loss, interest, ratio, averages, time and work, and trains. Know conversions such as km/h to m/s (multiply by 5/18) and the areas and volumes of common shapes, so that each question takes under a minute.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Make Reasoning your scoring section</h3>
              <p>
                Series, coding-decoding, blood relations, directions, syllogisms and clocks repeat in every shift. With practice these are quick and certain marks, which leaves more of the 90 minutes for General Awareness and arithmetic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Manage the negative marking</h3>
              <p>
                With 1/3 mark off for each wrong answer, accuracy matters more than attempting everything. Take a full 75-minute mock, count how many of your guesses were wrong, and drill the subject where you lose the most marks. Keep up your running and jumping practice for the PET as well.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RPF Constable Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="rpfconst" />
        </div>
      </div>

      <ExamRelatedTests examId="rpfconst" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the RPF Constable CBT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 232 questions across all three subjects.</p>
          <ExamLandingCTA dashboardHref="/rpf-constable/dashboard" />
        </div>
      </div>
    </div>
  );
}
