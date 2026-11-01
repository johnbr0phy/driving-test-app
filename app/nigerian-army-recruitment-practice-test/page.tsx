import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/ngarmy";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Nigerian Army Recruitment Practice Test 2026 - Free Aptitude Questions";
const metaDescription =
  "Free Nigerian Army recruitment aptitude test practice: 200 original questions in English, maths, reasoning and general knowledge, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the written and aptitude tests in Nigerian Army recruitment (Regular Recruits Intake, Short Service and Direct Short Service): 200 original questions on English grammar and vocabulary, arithmetic, algebra and statistics, verbal and logical reasoning, Nigerian history to independence, the Nigerian Army and armed forces, and Africa, ECOWAS and the African Union. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nigerian army recruitment test, nigerian army aptitude test, army recruitment past questions, nigerian army rri exam, 91rri screening, ssc army exam, dssc army exam, nigerian army general knowledge questions, army recruitment cbt nigeria, nigerian army exam 2026",
  alternates: {
    canonical: `${siteUrl}/nigerian-army-recruitment-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nigerian-army-recruitment-practice-test`,
    images: [{ url: shareImageUrl("ngarmy"), width: 1200, height: 630, alt: "Tigertest free Nigerian Army recruitment practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ngarmy")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Is there a computer-based test in Nigerian Army recruitment?",
    a: "Not for recruits in the latest intakes. The Army's notices for the 90th and 91st Regular Recruits Intakes (2025 and 2026), as reported in the news, said there would be no pre-selection computer-based test: shortlisted applicants were screened in their state of origin (documents, physical fitness and medical checks). The 89th intake notice of April 2025 did announce a pre-selection CBT, so the format changes from one intake to the next. Officer applicants (Short Service and Direct Short Service) go before a selection board; reports on the board for Short Service Course 49/2026 listed document checks, physical, medical and academic tests and an oral interview. Read the notice for your intake on the Army's recruitment portal.",
  },
  {
    q: "What is on the Nigerian Army aptitude test?",
    a: "The Army does not publish a syllabus or a question count. Candidates and guides describe multiple-choice papers in English language, mathematics and general knowledge, sometimes with reasoning questions. Tigertest covers all of these: grammar, vocabulary and idioms, arithmetic, algebra and statistics, number series and coding, Nigerian history to independence, the armed forces, and Africa, ECOWAS and the African Union.",
  },
  {
    q: "What is the pass mark?",
    a: "The Army does not publish one, and selection also depends on screening, fitness, medical results and the number of places for your state. Tigertest's mock tests are 50 questions with a 70% target (35 of 50). Aim higher than that in practice so you have a margin on the day.",
  },
  {
    q: "Who can apply to join the Nigerian Army as a recruit?",
    a: "For the 91st Regular Recruits Intake (2026), applicants had to be single, Nigerian by birth, hold a NIN and BVN with matching details, have at least four passes including English Language in WASSCE, GCE, NECO, NABTEB or NBAIS in no more than two sittings, apply through their state of origin and meet the height standard (1.68 m for men, 1.65 m for women). Reports gave the age limits as 18 to 22 for non-tradesmen and women and up to 26 for tradesmen and women, who also need a trade test or City and Guilds certificate. These rules are set in each intake's notice, so check the current one.",
  },
  {
    q: "Are these the real Nigerian Army test questions?",
    a: "No. Every question is original, written by Tigertest to test the same English, mathematics, reasoning and general knowledge, without copying any past question. Tigertest is free practice and is not affiliated with the Nigerian Army or the Ministry of Defence. Applications are free and made only through the Army's official recruitment portal.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Nigerian Army Recruitment Practice Test",
      description,
      url: `${siteUrl}/nigerian-army-recruitment-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      featureList: [
        "200 original aptitude questions",
        "4 mock tests of 50 questions",
        "5 training sets by subject",
        "Instant feedback with explanations",
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
  { name: "Arithmetic & Number Work", weight: "16%" },
  { name: "English Grammar & Usage", weight: "14%" },
  { name: "Nigerian History to Independence", weight: "14%" },
  { name: "English Vocabulary & Idioms", weight: "12%" },
  { name: "Algebra, Shapes & Statistics", weight: "12%" },
  { name: "Verbal & Logical Reasoning", weight: "12%" },
  { name: "The Nigerian Army & Armed Forces", weight: "10%" },
  { name: "Africa, ECOWAS & the AU", weight: "10%" },
];

export default function NigerianArmyRecruitmentLandingPage() {
  return (
    <div data-theme="ngarmy" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Nigerian Army Recruitment Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nigerian-army-recruitment/dashboard"
            shortName="Army test"
            subtitle="200 original aptitude questions in English, mathematics, reasoning and general knowledge: Nigerian history, the armed forces, ECOWAS and the African Union. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ngarmy-mobile.png", desktop: "/landing/ngarmy-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ngarmy" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets cover English language, mathematics, verbal and logical reasoning, Nigerian history, and the armed forces with Africa and ECOWAS. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that together cover all 200 questions, with a 70% target. No question repeats across tests, and every answer explains the working or the rule and the common wrong pick.
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
                Built on What Army Aptitude Tests Cover
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Nigerian Army does not publish a syllabus, a question count or a pass mark for its written tests, and the latest recruit intakes have had no pre-selection computer-based test. Candidates and guides describe English, mathematics and general knowledge papers, so Tigertest covers those at secondary-school credit level, plus reasoning, with general knowledge drawn from fixed facts: Nigerian history to 1963, the armed forces, and Africa, ECOWAS and the African Union. The weights below are Tigertest&apos;s own.
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
                src={getTigerAsset("ngarmy", 1)}
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
            How to Prepare for the Army Aptitude Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get the arithmetic fast and sure</h3>
              <p>
                Percentages, ratios, fractions, speed and time, and the 24-hour clock are the arithmetic this practice leans on most. Learn the methods until you no longer need to think about them, and check each answer against a rough estimate before you move on.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Fix the common English errors</h3>
              <p>
                Many wrong options are everyday mistakes: &quot;congratulate for&quot; for &quot;congratulate on&quot;, &quot;lives here since 2019&quot;, &quot;isn&apos;t it&quot; as a tag after &quot;you are&quot;, &quot;advices&quot; and &quot;equipments&quot;. Read each option aloud in your head and ask which one a careful writer would use.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your Army and your history</h3>
              <p>
                Learn how the Nigerian Army began, where recruits and officer cadets train, the order of ranks and units, the key dates from amalgamation to independence, and how ECOWAS and the African Union work. These are fixed facts, so every hour you spend on them pays off.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Prepare for screening too</h3>
              <p>
                The written test is only one stage. Bring every document your intake&apos;s notice lists, train for the physical fitness test, and follow only the Army&apos;s official portal and announcements: applications are free, and anyone asking for money to secure a place is not from the Army.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Nigerian Army Recruitment Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="ngarmy" />

      <ExamRelatedTests examId="ngarmy" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Army Aptitude Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions in English, mathematics, reasoning and general knowledge.</p>
          <ExamLandingCTA dashboardHref="/nigerian-army-recruitment/dashboard" />
        </div>
      </div>
    </div>
  );
}
