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

const title = "Free IBPS RRB Office Assistant Prelims Mock Test 2026";
const metaDescription =
  "Free IBPS RRB Clerk (Office Assistant) Prelims mock tests: 200 original questions in Reasoning and Numerical Ability, timed 25 and 20 minutes like the real exam.";
const description =
  "Free IBPS RRB Office Assistant (Multipurpose) Prelims practice with 200 original questions on the Preliminary Examination pattern: Reasoning 40 questions in 25 minutes and Numerical Ability 40 in 20 minutes. Two full 80-question mock tests with sectional timing, puzzles and seating arrangements, inequalities, coding, simplification, number series and data interpretation tables, and an explanation on every answer.";

const faqs = [
  {
    q: "What is the IBPS RRB Office Assistant Prelims exam pattern?",
    a: "The IBPS RRB Office Assistant (Multipurpose) Preliminary Examination is one online objective paper of 80 questions in 45 minutes: Reasoning 40 questions in 25 minutes and Numerical Ability 40 questions in 20 minutes, each question worth one mark. The two tests are timed separately, so you work on one section at a time. There is no English section in the Prelims. This is the pattern in the official CRP RRBs-XV notification of 1 September 2026.",
  },
  {
    q: "Is there negative marking in IBPS RRB Clerk Prelims?",
    a: "Yes. For every wrong answer, a quarter of the marks for that question is deducted. An unanswered question loses nothing. With five options per question, a blind guess gains nothing on average, while ruling out even one wrong option tips a guess slightly in your favour. Tigertest mock tests do not deduct marks, so count your wrong answers yourself and subtract a quarter of a mark for each.",
  },
  {
    q: "When is the IBPS RRB Office Assistant Prelims in 2026?",
    a: "The CRP RRBs-XV notification schedules the Preliminary Examination for November or December 2026 and the Main Examination for December 2026 to February 2027, all tentative. Guides report the Office Assistant Prelims on 6, 12 and 13 December 2026. Check your call letter and the IBPS website for your own date and shift.",
  },
  {
    q: "What score do I need to clear IBPS RRB Clerk Prelims?",
    a: "There is no fixed pass mark. The notification says you must clear a minimum cutoff, decided by IBPS, in both tests, and that an adequate number of candidates in each category is shortlisted for the Mains. In past years the cutoffs have differed by state and category. Only Main examination marks count for the final merit list and provisional allotment. Aim for a comfortable margin in both sections.",
  },
  {
    q: "Are these the real IBPS RRB questions?",
    a: "No. These are original practice questions written to the IBPS RRB Office Assistant Prelims pattern, not questions from IBPS or past papers. They follow the real paper's question types: puzzles, seating arrangements, inequalities, syllogisms, coding-decoding, blood relations, directions and ranking in Reasoning; simplification, approximation, number series, data interpretation and arithmetic in Numerical Ability. The questions are in English only, though the real exam can also be taken in Hindi and the state's language. Both mock tests and all seven drills are free, with no account required.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "IBPS RRB Clerk mock test, IBPS RRB Office Assistant mock test, IBPS RRB Clerk prelims mock test free, IBPS RRB Office Assistant prelims 2026, RRB Clerk practice test, CRP RRBs XV, gramin bank clerk mock test, IBPS RRB reasoning puzzles, IBPS RRB numerical ability, IBPS RRB sectional timing",
  alternates: {
    canonical: `${siteUrl}/ibps-rrb-office-assistant-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ibps-rrb-office-assistant-practice-test`,
    images: [{ url: shareImageUrl("ibpsrrb"), width: 1200, height: 630, alt: "Tigertest free IBPS RRB Office Assistant Prelims mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ibpsrrb")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free IBPS RRB Office Assistant Prelims Mock Test",
      description,
      url: `${siteUrl}/ibps-rrb-office-assistant-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "200 original IBPS RRB Office Assistant Prelims practice questions with explanations",
        "2 full 80-question mock tests in 45 minutes with sectional timing (25 and 20 minutes)",
        "7 drills across Reasoning and Numerical Ability",
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
        classFaqJsonLd("ibpsrrb"),
      ],
    },
  ],
};

const sections = [
  { name: "Reasoning", detail: "40 questions, 25 min" },
  { name: "Numerical Ability", detail: "40 questions, 20 min" },
];

export default function IbpsRrbLandingPage() {
  return (
    <div data-theme="ibpsrrb" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free IBPS RRB Office Assistant Prelims Mock Test
          </h1>
          <ExamLandingHero
            dashboardHref="/ibps-rrb-clerk/dashboard"
            shortName="IBPS RRB Clerk"
            subtitle="200 original questions in Reasoning and Numerical Ability, with sectional timing like the real Prelims. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ibpsrrb-mobile.png", desktop: "/landing/ibpsrrb-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ibpsrrb" />

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
                Seven drills: inequalities and syllogisms, puzzles and seating, coding and alphabet, relations, directions and ranking; simplification and series, data interpretation, arithmetic. Questions you miss come back until you have mastered them.
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
                Two 80-question mock tests in 45 minutes: Reasoning on a 25-minute clock, then Numerical Ability on a 20-minute clock, with no going back, like the real Prelims. Mock Test 2 is held out of the drills, so it measures how ready you are.
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
                Built on the IBPS RRB Office Assistant Prelims Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test has the same two sections, question counts and sectional timing as the real Preliminary Examination in the CRP RRBs-XV notification, with five options on every question as in past papers. The real exam deducts a quarter mark for each wrong answer; Tigertest shows your raw score so you can see where guessing would have cost you. On the real exam both tests can be taken in English, Hindi or the language offered in your state; these questions are in English. The Main examination adds General Awareness, Computer Knowledge and English or Hindi, which these mock tests do not cover.
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
                src={getTigerAsset("ibpsrrb", 1)}
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
            How to Clear IBPS RRB Office Assistant Prelims
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Plan 25 and 20 minutes</h3>
              <p>
                Reasoning gets 25 minutes for 40 questions and Numerical Ability only 20, and you cannot borrow time between them. In Reasoning, clear inequalities, syllogisms, coding and directions first, then spend what is left on the puzzles. In Numerical Ability, take simplification, approximation and number series first: they are the quickest marks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Solve each puzzle once</h3>
              <p>
                A puzzle carries five questions, so a correct grid is worth five marks and a wrong one can cost five. Draw the arrangement on rough paper from the most fixed clue (a named floor, day or end seat), check every clue against it, and then answer all five questions from the grid.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Respect the negative marking</h3>
              <p>
                Each wrong answer costs a quarter mark, so a blind guess among five options gains nothing on average. Skip what you cannot narrow down at all. Track your accuracy in the mock tests: if many of your attempts in a section are wrong, slow down there, because careless errors cost you both the mark and the penalty.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weaker section</h3>
              <p>
                You must clear the cutoff in both tests, so one weak section can cost you the Mains call. Tigertest tracks your accuracy by question type; retake the drill you miss most until it is as solid as your best one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          IBPS RRB Office Assistant Prelims Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ibpsrrb" />
        </div>
      </div>

      <ExamRelatedTests examId="ibpsrrb" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the IBPS RRB Office Assistant Prelims?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across both sections. Not affiliated with IBPS.</p>
          <ExamLandingCTA dashboardHref="/ibps-rrb-clerk/dashboard" />
        </div>
      </div>
    </div>
  );
}
