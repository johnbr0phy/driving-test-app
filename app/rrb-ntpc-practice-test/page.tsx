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

const title = "Free RRB NTPC Mock Test 2026 - CBT 1 Practice";
const metaDescription =
  "Free RRB NTPC CBT 1 mock tests: 232 original questions on General Awareness, Mathematics and Reasoning, with two full 100-question tests in 90 minutes and an explanation on every answer.";
const description =
  "Free RRB NTPC practice tests with 232 original questions on the CBT 1 syllabus: General Awareness (history, geography, polity, economy and general science), Mathematics and General Intelligence and Reasoning. Each full mock test has 100 questions in 90 minutes, split 40, 30 and 30 like the real paper, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the RRB NTPC CBT 1 exam pattern?",
    a: "CBT 1 has 100 multiple-choice questions in 90 minutes: 40 on General Awareness, 30 on Mathematics and 30 on General Intelligence and Reasoning, one mark each. The same pattern is used for both the graduate and undergraduate level posts. Eligible PwBD candidates who use a scribe get 120 minutes.",
  },
  {
    q: "Is there negative marking in RRB NTPC CBT 1?",
    a: "Yes. One third of a mark is deducted for each wrong answer, and an unanswered question costs nothing. A blind guess among four options breaks even on average (a 1 in 4 chance of +1 against a 3 in 4 chance of -1/3), so it neither helps nor hurts; once you can rule out even one option, a guess gains marks on average. Tigertest scores percent correct without the deduction, so keep count of the questions you guessed.",
  },
  {
    q: "What are the qualifying marks for RRB NTPC CBT 1?",
    a: "The minimum qualifying percentages are 40 percent for UR and EWS, 30 percent for OBC (non-creamy layer) and SC, and 25 percent for ST, with a small relaxation for PwBD candidates where seats would otherwise go unfilled. CBT 1 only screens candidates: those shortlisted for CBT 2 are chosen by normalised marks, which usually needs well above the minimum, and CBT 1 marks do not count in the final merit list.",
  },
  {
    q: "Are these the real RRB NTPC previous year questions?",
    a: "No. Every question is original, written to the CBT 1 syllabus in the RRB notification, and none is copied from previous papers. General Awareness questions cover static facts such as history, geography, the Constitution and science, not current affairs, so check recent news separately before your exam.",
  },
  {
    q: "Is the Tigertest RRB NTPC mock test free?",
    a: "Yes. Both full mock tests and all eight subject drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "RRB NTPC mock test, RRB NTPC practice test, RRB NTPC CBT 1 mock test free, RRB NTPC 2026, railway NTPC exam questions, RRB NTPC general awareness questions, RRB NTPC maths and reasoning practice, railway exam mock test",
  alternates: {
    canonical: `${siteUrl}/rrb-ntpc-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rrb-ntpc-practice-test`,
    images: [{ url: shareImageUrl("rrbntpc"), width: 1200, height: 630, alt: "Tigertest free RRB NTPC mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rrbntpc")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RRB NTPC Mock Test",
      description,
      url: `${siteUrl}/rrb-ntpc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "232 original RRB NTPC CBT 1 practice questions with explanations",
        "2 full 100-question mock tests in 90 minutes, split 40, 30 and 30 like the real paper",
        "8 drills: history, geography, polity and economy, general science, arithmetic, algebra and geometry, verbal and logical reasoning",
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
        classFaqJsonLd("rrbntpc"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "General Awareness", weight: "40 questions" },
  { name: "Mathematics", weight: "30 questions" },
  { name: "General Intelligence and Reasoning", weight: "30 questions" },
];

export default function RrbNtpcLandingPage() {
  return (
    <div data-theme="rrbntpc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RRB NTPC Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rrb-ntpc/dashboard"
            shortName="RRB NTPC"
            subtitle="232 original CBT 1 questions on General Awareness, Maths and Reasoning. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/rrbntpc-mobile.png", desktop: "/landing/rrbntpc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rrbntpc" />

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
                Eight drills cover the whole CBT 1 syllabus: history and culture, geography, polity and economy, general science, arithmetic, numbers and geometry, verbal reasoning and logical reasoning. Questions you miss come back until you have mastered them.
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
                Two 100-question mock tests in 90 minutes, the real CBT 1 length and timing, grouped by subject. Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the CBT 1 Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Railway Recruitment Boards set the same three subjects for graduate and undergraduate NTPC posts. Every mock test here follows that split. In the real exam each wrong answer costs 1/3 mark, so practise leaving a question blank when you cannot rule anything out.
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
                src={getTigerAsset("rrbntpc", 1)}
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
            How to Prepare for RRB NTPC CBT 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Treat General Awareness as the biggest section</h3>
              <p>
                At 40 questions it carries the most marks. Build a base of static facts first: Indian history and the freedom struggle, rivers and states, the Constitution and Parliament, banking and taxes, and class 10 science. Then read the news of the past year for current affairs, which this practice bank does not cover.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the arithmetic shortcuts</h3>
              <p>
                Most maths questions are arithmetic: percentages, profit and loss, interest, ratio, averages, time and work, and trains. Know conversions such as km/h to m/s (multiply by 5/18) and formulas such as compound interest, so that each question takes under a minute.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise reasoning patterns until they are routine</h3>
              <p>
                Series, coding-decoding, blood relations, directions and syllogisms repeat in every paper. Draw a quick family tree or direction sketch on your rough sheet rather than holding it in your head.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Manage the negative marking</h3>
              <p>
                With 1/3 mark off for each wrong answer, accuracy matters more than attempting everything. Take a full 90-minute mock, then count how many of your guesses were wrong, and drill the subject where you lose the most marks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RRB NTPC Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="rrbntpc" />
        </div>
      </div>

      <ExamRelatedTests examId="rrbntpc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for RRB NTPC CBT 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 232 questions across all three subjects.</p>
          <ExamLandingCTA dashboardHref="/rrb-ntpc/dashboard" />
        </div>
      </div>
    </div>
  );
}
