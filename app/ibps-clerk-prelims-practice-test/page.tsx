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

const title = "Free IBPS Clerk Prelims Mock Test 2026 - Sectional Timing";
const metaDescription =
  "Free IBPS Clerk Prelims mock tests: 227 original questions in English, Numerical Ability and Reasoning, timed 20 minutes per section like the real exam.";
const description =
  "Free IBPS Clerk Prelims practice with 227 original questions on the Preliminary Examination pattern: English Language 30, Numerical Ability 35 and Reasoning Ability 35, 20 minutes per section. Two full 100-question mock tests with sectional timing, reading passages, cloze tests, simplification, data interpretation tables and puzzles, and an explanation on every answer.";

const faqs = [
  {
    q: "What is the IBPS Clerk Prelims exam pattern?",
    a: "The IBPS Clerk Preliminary Examination is one online objective paper of 100 questions in 60 minutes: English Language 30 questions, Numerical Ability 35 and Reasoning Ability 35, each worth one mark. The three tests are separately timed at 20 minutes each, so you work on one section at a time. This is the pattern in the official CRP CSA-XVI (2026) notification, and guides report it was the same for CRP CSA-XV (2025).",
  },
  {
    q: "Is there negative marking in IBPS Clerk Prelims?",
    a: "Yes. For every wrong answer, a quarter of the marks for that question is deducted. An unanswered question loses nothing. With five options per question, a blind guess gains nothing on average, while ruling out even one wrong option tips a guess slightly in your favour. Tigertest mock tests do not deduct marks, so count your wrong answers yourself and subtract a quarter of a mark for each.",
  },
  {
    q: "Can I switch between sections in IBPS Clerk Prelims?",
    a: "No. Each section is timed separately at 20 minutes and you cannot go back to a section once its time is over. Inside a section you can move freely between questions and mark them for review. The Tigertest mock tests also time each section separately and never let you go back to a closed one.",
  },
  {
    q: "What score do I need to clear IBPS Clerk Prelims?",
    a: "There is no fixed pass mark. The notification says you must clear a cutoff, decided by IBPS, in each of the three tests, and that an adequate number of candidates in each category is shortlisted for the Mains. In past years the cutoffs have also differed by state or union territory. Only Mains marks count in the final merit list. Aim for a comfortable margin in all three sections.",
  },
  {
    q: "Are these the real IBPS Clerk questions?",
    a: "No. These are original practice questions written to the IBPS Clerk Prelims pattern, not questions from IBPS or past papers. They follow the real paper's question types: reading comprehension, para jumbles, cloze tests, fillers and error spotting; simplification, approximation, number series, data interpretation and arithmetic; and inequalities, syllogisms, puzzles, seating arrangements, coding, blood relations, directions and ranking. The questions are in English only. Both mock tests and all nine drills are free, with no account required.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "IBPS Clerk mock test, IBPS Clerk prelims mock test free, IBPS Clerk practice test, IBPS Clerk prelims 2026, IBPS CSA mock test, bank clerk mock test, IBPS Clerk reasoning puzzles, IBPS Clerk numerical ability, IBPS Clerk English practice, IBPS Clerk sectional timing",
  alternates: {
    canonical: `${siteUrl}/ibps-clerk-prelims-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ibps-clerk-prelims-practice-test`,
    images: [{ url: shareImageUrl("ibpsclerk"), width: 1200, height: 630, alt: "Tigertest free IBPS Clerk Prelims mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ibpsclerk")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free IBPS Clerk Prelims Mock Test",
      description,
      url: `${siteUrl}/ibps-clerk-prelims-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "227 original IBPS Clerk Prelims practice questions with explanations",
        "2 full 100-question mock tests in 60 minutes with 20-minute sectional timing",
        "9 drills across English, Numerical Ability and Reasoning Ability",
        "Puzzles and seating arrangements with five questions each",
        "Simplification, number series and data interpretation tables",
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
        classFaqJsonLd("ibpsclerk"),
      ],
    },
  ],
};

const sections = [
  { name: "English Language", detail: "30 questions, 20 min" },
  { name: "Numerical Ability", detail: "35 questions, 20 min" },
  { name: "Reasoning Ability", detail: "35 questions, 20 min" },
];

export default function IbpsClerkLandingPage() {
  return (
    <div data-theme="ibpsclerk" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free IBPS Clerk Prelims Mock Test
          </h1>
          <ExamLandingHero
            dashboardHref="/ibps-clerk/dashboard"
            shortName="IBPS Clerk"
            subtitle="227 original questions in English, Numerical Ability and Reasoning, with 20-minute sectional timing. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ibpsclerk-mobile.png", desktop: "/landing/ibpsclerk-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ibpsclerk" />

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
                Nine drills, three per section: reading and para jumbles, cloze and fillers, error spotting; simplification and series, data interpretation, arithmetic; inequalities and syllogisms, puzzles and seating, coding and directions. Questions you miss come back until you have mastered them.
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
                Two 100-question mock tests in 60 minutes, each section on its own 20-minute clock with no going back, like the real Prelims. Mock Test 2 is held out of the drills, so it measures how ready you are.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the IBPS Clerk Prelims Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test has the same three sections, question counts and sectional timing as the real Preliminary Examination, with five options on every question as in past papers. The real exam deducts a quarter mark for each wrong answer; Tigertest shows your raw score so you can see where guessing would have cost you. On the real exam the English Language test is in English, and Numerical Ability and Reasoning Ability can be taken in English, Hindi or a regional language offered in your state; these questions are in English.
              </p>
              <div className="space-y-3">
                {sections.map((s) => (
                  <div key={s.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{s.name}</span>
                    <span className="text-brand-dark font-semibold">{s.detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("ibpsclerk", 1)}
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
            How to Clear IBPS Clerk Prelims
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Plan each 20 minutes</h3>
              <p>
                Sectional timing means you cannot borrow time from a strong section. In English, do fillers and error spotting before the reading passage. In Numerical Ability, take simplification, approximation and number series first: they are quick marks. In Reasoning, clear inequalities, syllogisms and short questions, then spend what is left on the puzzles.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make simplification automatic</h3>
              <p>
                Simplification and approximation carry more marks in the Clerk paper than almost any other topic, and they reward speed. Learn squares to 30, cubes to 15 and the common fraction-percentage pairs (1/8 is 12.5%, 3/8 is 37.5%) so each question takes seconds, and round sensibly in approximation questions instead of calculating exactly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Respect the negative marking</h3>
              <p>
                Each wrong answer costs a quarter mark, so a blind guess among five options gains nothing on average. Skip what you cannot narrow down at all. Track your accuracy in the mock tests: if many of your attempts in a section are wrong, slow down there, because careless errors cost you both the mark and the penalty.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weakest section</h3>
              <p>
                You must clear the cutoff in every section, so one weak section can cost you the Mains call. Tigertest tracks your accuracy by question type; retake the drill you miss most until it is as solid as your best one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          IBPS Clerk Prelims Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ibpsclerk" />
        </div>
      </div>

      <ExamRelatedTests examId="ibpsclerk" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the IBPS Clerk Prelims?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 227 questions across all three sections. Not affiliated with IBPS.</p>
          <ExamLandingCTA dashboardHref="/ibps-clerk/dashboard" />
        </div>
      </div>
    </div>
  );
}
