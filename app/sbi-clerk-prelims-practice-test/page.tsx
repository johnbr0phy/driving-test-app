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

const siteUrl = SITE_URL;

const title = "Free SBI Clerk Prelims Mock Test 2026 - Sectional Timing";
const metaDescription =
  "Free SBI Clerk (Junior Associates) Prelims mock tests: 227 original questions in English, Numerical Ability and Reasoning, timed 20 minutes per section like the real exam.";
const description =
  "Free SBI Clerk Prelims practice with 227 original questions on the Junior Associates Preliminary Examination pattern: English Language 30, Numerical Ability 35 and Reasoning Ability 35, 20 minutes per section. Two full 100-question mock tests with sectional timing, reading passages, cloze tests, simplification, data interpretation tables and puzzles, and an explanation on every answer.";

const faqs = [
  {
    q: "What is the SBI Clerk Prelims exam pattern?",
    a: "The SBI Clerk (Junior Associates) Preliminary Examination is one online objective test of 100 questions for 100 marks in one hour: English Language 30 questions, Numerical Ability 35 and Reasoning Ability 35. Each test is separately timed at 20 minutes, so you work on one section at a time. This is the pattern in SBI's 2026 Junior Associates advertisement (CRPD/CR/2026-27/17), which set the Prelims tentatively for September 2026.",
  },
  {
    q: "Is there negative marking in SBI Clerk Prelims?",
    a: "Yes. A quarter of the marks for a question is deducted for each wrong answer, and an unanswered question loses nothing. With five options per question, a blind guess gains nothing on average, while ruling out even one wrong option tips a guess slightly in your favour. Tigertest mock tests do not deduct marks, so count your wrong answers yourself and subtract a quarter of a mark for each.",
  },
  {
    q: "Is there a sectional cutoff in SBI Clerk Prelims?",
    a: "No. The 2026 advertisement says no minimum qualifying marks are prescribed for any individual test or for the aggregate in the Prelims. SBI instead shortlists about ten times the number of vacancies in each category for the Mains, in order of total marks, so the cutoff depends on your state and category each year. Prelims marks are not added to the final merit list, which uses Mains marks only.",
  },
  {
    q: "In which languages is the SBI Clerk Prelims held?",
    a: "The English Language test is in English only. Numerical Ability and Reasoning Ability are offered in English, Hindi and, in many states, the state's own language, as listed in the advertisement. Candidates who are provisionally selected after the Mains must also show they know the local language of their state, through a 10th or 12th mark sheet or a language test. The questions on Tigertest are in English.",
  },
  {
    q: "Are these the real SBI Clerk questions?",
    a: "No. These are original practice questions written to the SBI Clerk Prelims pattern, not questions from SBI or past papers. They follow the real paper's question types: reading comprehension, cloze tests, fillers, error spotting, sentence improvement and phrase rearrangement; simplification, approximation, number series, data interpretation and arithmetic; and inequalities, syllogisms, puzzles, seating arrangements, coding, blood relations, directions and ranking. Both mock tests and all nine drills are free, with no account required.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SBI Clerk mock test, SBI Clerk prelims mock test free, SBI Clerk practice test, SBI Clerk prelims 2026, SBI Junior Associate mock test, bank clerk mock test, SBI Clerk reasoning puzzles, SBI Clerk numerical ability, SBI Clerk English practice, SBI Clerk sectional timing",
  alternates: {
    canonical: `${siteUrl}/sbi-clerk-prelims-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/sbi-clerk-prelims-practice-test`,
    images: [{ url: shareImageUrl("sbiclerk"), width: 1200, height: 630, alt: "Tigertest free SBI Clerk Prelims mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sbiclerk")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SBI Clerk Prelims Mock Test",
      description,
      url: `${siteUrl}/sbi-clerk-prelims-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "227 original SBI Clerk Prelims practice questions with explanations",
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
        classFaqJsonLd("sbiclerk"),
      ],
    },
  ],
};

const sections = [
  { name: "English Language", detail: "30 questions, 20 min" },
  { name: "Numerical Ability", detail: "35 questions, 20 min" },
  { name: "Reasoning Ability", detail: "35 questions, 20 min" },
];

export default function SbiClerkLandingPage() {
  return (
    <div data-theme="sbiclerk" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SBI Clerk Prelims Mock Test
          </h1>
          <ExamLandingHero
            dashboardHref="/sbi-clerk/dashboard"
            shortName="SBI Clerk"
            subtitle="227 original questions in English, Numerical Ability and Reasoning, with 20-minute sectional timing. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/sbiclerk-mobile.png", desktop: "/landing/sbiclerk-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sbiclerk" />

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
                Nine drills, three per section: reading comprehension, cloze and fillers, error spotting and rearrangement; simplification and series, data interpretation, arithmetic; inequalities and syllogisms, puzzles and seating, coding and directions. Questions you miss come back until you have mastered them.
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
                Built on the SBI Clerk Prelims Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test has the same three sections, question counts and sectional timing as the real Junior Associates Preliminary Examination, with five options on every question as in past papers. The real exam deducts a quarter mark for each wrong answer; Tigertest shows your raw score so you can see where guessing would have cost you. On the real exam the English Language test is in English, and Numerical Ability and Reasoning Ability can be taken in English, Hindi or, in many states, the state&apos;s own language; these questions are in English.
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
                src={getTigerAsset("sbiclerk", 1)}
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
            How to Clear SBI Clerk Prelims
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
                In past papers simplification and approximation have usually been the biggest block of Numerical Ability, and they reward speed. Learn squares to 40, cubes to 15 and the common fraction-percentage pairs (1/8 is 12.5%, 5/8 is 62.5%) so each question takes seconds, and round sensibly in approximation questions instead of calculating exactly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Respect the negative marking</h3>
              <p>
                Each wrong answer costs a quarter mark, so a blind guess among five options gains nothing on average. Skip what you cannot narrow down at all. Track your accuracy in the mock tests: if many of your attempts in a section are wrong, slow down there, because careless errors cost you both the mark and the penalty.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Push your total, not one section</h3>
              <p>
                SBI sets no sectional cutoff in the Prelims: the Mains list is drawn up by total marks. Every extra correct answer counts the same wherever it comes from, so lift the section where you lose the most marks. Tigertest tracks your accuracy by question type; retake the drill you miss most until it is as solid as your best one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SBI Clerk Prelims Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="sbiclerk" />
        </div>
      </div>

      <ExamRelatedTests examId="sbiclerk" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the SBI Clerk Prelims?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 227 questions across all three sections. Not affiliated with State Bank of India.</p>
          <ExamLandingCTA dashboardHref="/sbi-clerk/dashboard" />
        </div>
      </div>
    </div>
  );
}
