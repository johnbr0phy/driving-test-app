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

const title = "Free RRB ALP Mock Test 2026 - CBT 1 Practice";
const metaDescription =
  "Free RRB ALP CBT 1 mock tests: 200 original questions on Mathematics, Mental Ability and General Science, with two full 75-question tests in 60 minutes and an explanation on every answer.";
const description =
  "Free RRB ALP (Assistant Loco Pilot) CBT 1 practice tests with 200 original questions on the CEN 01/2026 syllabus: Mathematics, General Intelligence and Reasoning (Mental Ability) and General Science (physics, chemistry and life sciences to class 10). Each full mock test has 75 questions in 60 minutes, the real CBT 1 length, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the RRB ALP CBT 1 exam pattern?",
    a: "Exam guides summarising CEN 01/2026 agree that the First Stage CBT for Assistant Loco Pilot has 75 multiple-choice questions in 60 minutes on Mathematics, General Intelligence and Reasoning (Mental Ability) and General Science at class 10 level, one mark each. General Awareness and Current Affairs, part of CBT 1 in earlier ALP notices, is reported to have moved out of it (a few sites still list it, apparently from older notices). No official split by subject has been published that the guides agree on, so Tigertest's mock tests give 25 to each. Check the CEN on your RRB's website. CBT 1 is a screening test; those shortlisted go on to CBT 2 and then a computer based aptitude test.",
  },
  {
    q: "Is there negative marking in RRB ALP CBT 1?",
    a: "Yes. One third of a mark is deducted for each wrong answer, and an unanswered question costs nothing. A blind guess among four options breaks even on average (a 1 in 4 chance of +1 against a 3 in 4 chance of -1/3), so it neither helps nor hurts; once you can rule out even one option, a guess gains marks on average. Tigertest scores percent correct without the deduction, so keep count of the questions you guessed.",
  },
  {
    q: "What are the qualifying marks for RRB ALP CBT 1?",
    a: "The minimum qualifying percentages reported for the ALP notice are 40 percent for UR and EWS, 30 percent for OBC (non-creamy layer) and SC, and 25 percent for ST. Reaching the minimum is not enough on its own: CBT 1 marks do not count in the final merit, and candidates are called to CBT 2 by normalised marks against each board's cut-off, which is usually well above it. Check the CEN on your RRB's website for the exact figures.",
  },
  {
    q: "Are these the real RRB ALP previous year questions?",
    a: "No. Every question is original, written to the CBT 1 syllabus in the RRB notification, and none is copied from previous papers. General Science is pitched at the class 10 CBSE level the syllabus names, and the reasoning questions are text only, so practise figure-based items such as mirror images and paper folding from your own books as well.",
  },
  {
    q: "Is the Tigertest RRB ALP mock test free?",
    a: "Yes. Both full mock tests and all seven subject drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "RRB ALP mock test, RRB ALP practice test, RRB ALP CBT 1 mock test free, RRB ALP 2026, assistant loco pilot exam questions, RRB ALP general science questions, RRB ALP maths and reasoning practice, CEN 01/2026 ALP mock test",
  alternates: {
    canonical: `${siteUrl}/rrb-alp-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rrb-alp-practice-test`,
    images: [{ url: shareImageUrl("rrbalp"), width: 1200, height: 630, alt: "Tigertest free RRB ALP mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rrbalp")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RRB ALP Mock Test",
      description,
      url: `${siteUrl}/rrb-alp-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "200 original RRB ALP CBT 1 practice questions with explanations",
        "2 full 75-question mock tests in 60 minutes, the real CBT 1 length",
        "7 drills: arithmetic, numbers and geometry, verbal and logical reasoning, physics, chemistry and biology",
        "Follows the CEN 01/2026 syllabus, without General Awareness",
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
        classFaqJsonLd("rrbalp"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Mathematics", weight: "25 per mock test" },
  { name: "General Intelligence and Reasoning", weight: "25 per mock test" },
  { name: "General Science (class 10)", weight: "25 per mock test" },
];

export default function RrbAlpLandingPage() {
  return (
    <div data-theme="rrbalp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RRB ALP Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rrb-alp/dashboard"
            shortName="RRB ALP"
            subtitle="200 original CBT 1 questions on Maths, Mental Ability and General Science. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/rrbalp-mobile.png", desktop: "/landing/rrbalp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rrbalp" />

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
                Seven drills cover the whole CBT 1 syllabus: arithmetic, numbers and geometry, verbal reasoning, logical reasoning, physics, chemistry and biology. Questions you miss come back until you have mastered them.
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
                Two 75-question mock tests in 60 minutes, the real ALP CBT 1 length and timing, grouped by subject. Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the ALP CBT 1 Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Railway Recruitment Boards hold CBT 1 as the screening stage for Assistant Loco Pilot. Under CEN 01/2026 it is reported to cover three subjects; no agreed split by subject has been published, so every mock test here splits them evenly. In the real exam each wrong answer costs 1/3 mark, so practise leaving a question blank when you cannot rule anything out.
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
                src={getTigerAsset("rrbalp", 1)}
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
            How to Prepare for RRB ALP CBT 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Treat General Science as a full third of the paper</h3>
              <p>
                With General Awareness reported gone from CBT 1, science, maths and reasoning carry the whole paper. The science is class 10 CBSE: learn the NCERT chapters on motion, electricity, magnetism, light, chemical reactions, metals, carbon compounds and life processes until the facts and formulas are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the arithmetic shortcuts</h3>
              <p>
                Most maths questions are arithmetic: percentages, profit and loss, interest, ratio, averages, time and work, and trains. Know conversions such as km/h to m/s (multiply by 5/18) and the formulas for common shapes, so that each question takes under a minute. With 75 questions in 60 minutes you have 48 seconds each.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Make reasoning your fastest section</h3>
              <p>
                Series, coding-decoding, blood relations, directions, syllogisms and clock and calendar questions follow a few fixed patterns. Drill them until you can spot the rule in seconds, and save the time for the longer maths and science calculations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Manage the negative marking</h3>
              <p>
                With 1/3 mark off for each wrong answer, accuracy matters more than attempting everything. Take a full 60-minute mock, count how many of your guesses were wrong, and drill the subject where you lose the most marks. Start on the CBT 2 Part A subjects and your trade for Part B early as well.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RRB ALP Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="rrbalp" />
        </div>
      </div>

      <ExamRelatedTests examId="rrbalp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for RRB ALP CBT 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all three subjects.</p>
          <ExamLandingCTA dashboardHref="/rrb-alp/dashboard" />
        </div>
      </div>
    </div>
  );
}
