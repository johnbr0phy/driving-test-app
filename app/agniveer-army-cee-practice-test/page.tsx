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

const title = "Free Agniveer Army GD Mock Test 2026 - CEE Practice";
const metaDescription =
  "Free Agniveer Army GD mock tests: 231 original questions on General Knowledge, General Science, Maths and Reasoning, with two full 50-question CEE tests in 60 minutes and an explanation on every answer.";
const description =
  "Free Agniveer (General Duty) practice tests with 231 original questions on the Army's Online Common Entrance Exam: General Knowledge (history, defence, the Constitution and geography), General Science (physics, chemistry and biology), Mathematics and Logical Reasoning. Each full mock test has 50 questions in 60 minutes, split 15, 15, 15 and 5 like the GD paper, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the Agniveer Army GD exam pattern?",
    a: "The Agniveer (General Duty) Online Common Entrance Exam is a computer-based test of 50 multiple-choice questions for 100 marks in 60 minutes, guides say: 15 on General Knowledge, 15 on General Science, 15 on Mathematics and 5 on Logical Reasoning, 2 marks each. The Army holds the CEE in 13 languages. Candidates who are shortlisted go on to the recruitment rally for the physical tests, then a medical examination.",
  },
  {
    q: "Is there negative marking in the Agniveer GD exam?",
    a: "Guides say yes: half a mark is deducted for each wrong answer, and an unanswered question costs nothing. With 2 marks for a right answer, even a blind guess among four options gains a little on average (a 1 in 4 chance of +2 against a 3 in 4 chance of -0.5 is +0.125 marks), and ruling out one or two options makes a guess clearly worth taking. Tigertest scores percent correct without the deduction, so keep count of the questions you guessed.",
  },
  {
    q: "What is the passing mark for the Agniveer GD CEE?",
    a: "Guides put the pass mark for General Duty at 35 out of 100 (one gives 32). Passing is not the same as selection: candidates are shortlisted by merit for the rally, and the final merit list comes after the physical tests and the medical, so aim well above the pass mark.",
  },
  {
    q: "Are these real Agniveer previous year questions?",
    a: "No. Every question is original, written for the GD syllabus of General Knowledge, General Science, Mathematics and Reasoning, and none is copied from previous papers. General Knowledge covers static facts such as history, the Army's battles and awards, the Constitution and geography, not current affairs, so read the news of the past year separately before your exam.",
  },
  {
    q: "Is the Tigertest Agniveer mock test free?",
    a: "Yes. Both full mock tests and all nine subject drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Agniveer mock test, Agniveer Army GD mock test, Agniveer CEE practice test, Agniveer GD question paper practice, Indian Army GD exam 2026, Agnipath Army exam mock test free, Agniveer general knowledge questions, Agniveer maths and reasoning practice",
  alternates: {
    canonical: `${siteUrl}/agniveer-army-cee-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/agniveer-army-cee-practice-test`,
    images: [{ url: shareImageUrl("agniveer"), width: 1200, height: 630, alt: "Tigertest free Agniveer Army GD mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("agniveer")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Agniveer Army GD Mock Test",
      description,
      url: `${siteUrl}/agniveer-army-cee-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "231 original Agniveer GD CEE practice questions with explanations",
        "2 full 50-question mock tests in 60 minutes, split 15, 15, 15 and 5 like the GD paper",
        "9 drills: history and defence, Constitution and economy, geography, physics, chemistry, biology, arithmetic, maths and reasoning",
        "Static General Knowledge only, no current affairs",
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
        classFaqJsonLd("agniveer"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "General Knowledge", weight: "15 questions" },
  { name: "General Science", weight: "15 questions" },
  { name: "Mathematics", weight: "15 questions" },
  { name: "Logical Reasoning", weight: "5 questions" },
];

export default function AgniveerLandingPage() {
  return (
    <div data-theme="agniveer" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Agniveer Army GD Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/agniveer-army/dashboard"
            shortName="Agniveer GD"
            subtitle="231 original CEE questions on General Knowledge, Science, Maths and Reasoning. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/agniveer-mobile.png", desktop: "/landing/agniveer-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="agniveer" />

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
                Nine drills cover the whole GD syllabus: history and defence, the Constitution and economy, geography, physics, chemistry, biology, arithmetic, maths and reasoning. Questions you miss come back until you have mastered them.
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
                Two 50-question mock tests in 60 minutes, the GD paper&apos;s length and timing as guides report them, in the order GK, Science, Maths, Reasoning. Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the GD CEE Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Online Common Entrance Exam is the first step of Agniveer recruitment, before the rally and the medical. Every mock test here follows the four-part GD split that guides report. Guides also say each question is worth 2 marks and a wrong answer costs half a mark, so a careful guess usually pays, but a careless one throws marks away.
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
                src={getTigerAsset("agniveer", 1)}
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
            How to Prepare for the Agniveer GD CEE
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Treat GK, Science and Maths as equal thirds</h3>
              <p>
                Each of the three big subjects carries 15 questions, 30 marks. Science is class 10 level, so learn the NCERT physics, chemistry and biology chapters until the facts and formulas are automatic, and keep the Army&apos;s battles, awards and days in your GK notes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the arithmetic shortcuts</h3>
              <p>
                Most maths questions are arithmetic: percentages, profit and loss, interest, ratio, averages, time and work, and speed. Know conversions such as km/h to m/s (multiply by 5/18) and the areas and volumes of common shapes, so that each question takes about a minute.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Collect the five reasoning marks</h3>
              <p>
                Reasoning has only 5 questions, but series, coding-decoding, directions and blood relations are quick once practised. Finish them early and spend the time saved on maths.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Manage the negative marking, and train for the rally</h3>
              <p>
                With half a mark off for each wrong answer, as guides report, accuracy matters. Take a full 60-minute mock, count how many of your guesses were wrong, and drill the subject where you lose the most marks. Start your running and physical training now, since the rally follows soon after the CEE.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Agniveer GD Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="agniveer" />
        </div>
      </div>

      <ExamRelatedTests examId="agniveer" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the Agniveer CEE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 231 questions across all four subjects.</p>
          <ExamLandingCTA dashboardHref="/agniveer-army/dashboard" />
        </div>
      </div>
    </div>
  );
}
