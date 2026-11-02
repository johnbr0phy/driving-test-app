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

const title = "Free MP Police Constable Mock Test 2026 - Practice Test";
const metaDescription =
  "Free MP Police Constable mock tests: 232 original questions on GK and reasoning, intellectual and mental ability, science and simple arithmetic, with two full 100-question, 2-hour tests and an explanation on every answer.";
const description =
  "Free MP Police Constable practice tests with 232 original questions on the MPESB written exam syllabus: General Knowledge (India, Madhya Pradesh, computer awareness) and Reasoning, Intellectual and Mental Ability, and Science and Simple Arithmetic. Each mock test has 100 questions in 2 hours, the same as the real paper, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the MP Police Constable written exam pattern?",
    a: "Guides that summarise the rule book of the Madhya Pradesh Employees Selection Board (MPESB) all give the same pattern: 100 objective questions worth 1 mark each, 100 marks in all, in 2 hours, in three parts: General Knowledge and Reasoning 40, Intellectual Ability and Mental Ability 30, and Science and Simple Arithmetic 30. Tigertest's mock tests follow the same 100 questions in 2 hours and the same 40, 30 and 30 split.",
  },
  {
    q: "Is there negative marking in the MP Police Constable exam?",
    a: "No. Guides for the latest recruitment agree that there is no negative marking: a wrong answer costs nothing, so answer every question, guessing after ruling out what you can. Tigertest scores percent correct, which on a 100-mark paper is your mark out of 100.",
  },
  {
    q: "When was the latest MP Police Constable exam?",
    a: "MPESB took applications for 7,500 constable posts from 15 September 2025, and the online written exam began on 30 October 2025. News reports say the first-phase result came out on 25 January 2026 and the physical tests ran from 23 February to 13 March 2026. Check esb.mp.gov.in for the next recruitment and its rule book.",
  },
  {
    q: "Is there a General Hindi section in the MP Police Constable exam?",
    a: "No separate Hindi section is listed in the pattern guides report from the MPESB rule book: the three parts are GK and reasoning, intellectual and mental ability, and science and simple arithmetic. Guides differ on the paper's language (some say Hindi, some Hindi and English), so check the rule book and practise reading questions quickly. Tigertest's questions are in English.",
  },
  {
    q: "Are these MP Police previous year questions?",
    a: "No. Every question is original, written to the written exam syllabus, and none is copied from previous papers. General Knowledge covers static facts about India, Madhya Pradesh and computers, not current affairs, so read the news of the past year separately. Both mock tests and all eight drills are free, with no account needed.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "MP Police Constable mock test, MP Police mock test, MP Police Constable practice test free, MP Police Constable 2026, MPESB constable exam questions, MP Police GK questions, MP GK questions, MP Police reasoning practice",
  alternates: {
    canonical: `${siteUrl}/mp-police-constable-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/mp-police-constable-practice-test`,
    images: [{ url: shareImageUrl("mppolice"), width: 1200, height: 630, alt: "Tigertest free MP Police Constable mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("mppolice")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free MP Police Constable Mock Test",
      description,
      url: `${siteUrl}/mp-police-constable-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "232 original MP Police Constable practice questions with explanations",
        "2 full mock tests of 100 questions in 2 hours, like the real paper",
        "8 drills: India GK, Madhya Pradesh GK, computer awareness, analogies and series, logical reasoning, mental ability, general science and simple arithmetic",
        "The real paper's 40, 30 and 30 split across its three parts",
        "No negative marking, as guides report for the real exam",
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
        classFaqJsonLd("mppolice"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "General Knowledge and Reasoning", weight: "40 questions" },
  { name: "Intellectual and Mental Ability", weight: "30 questions" },
  { name: "Science and Simple Arithmetic", weight: "30 questions" },
];

export default function MpPoliceLandingPage() {
  return (
    <div data-theme="mppolice" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free MP Police Constable Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/mp-police-constable/dashboard"
            shortName="MP Police"
            subtitle="232 original questions on GK, reasoning, mental ability, science and arithmetic. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/mppolice-mobile.png", desktop: "/landing/mppolice-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="mppolice" />

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
                Eight drills cover the whole written exam syllabus: India GK, Madhya Pradesh GK, computer awareness, analogies and series, logical reasoning, mental ability, general science and simple arithmetic. Questions you miss come back until you have mastered them.
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
                Two full mock tests of 100 questions in 2 hours, the same length and time as the real paper, in its three parts. Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Guides that summarise the Madhya Pradesh Employees Selection Board&apos;s rule book split the 100-question paper into three parts, shown below. Every Tigertest mock keeps the same split: GK and reasoning has India, Madhya Pradesh and computer questions plus analogies and series; the second part is logical reasoning and mental ability; the third is general science and arithmetic. Reasoning questions are text only (no figure or Venn diagram items). Physical tests are not modelled.
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
                src={getTigerAsset("mppolice", 1)}
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
            How to Prepare for the MP Police Constable Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know Madhya Pradesh well</h3>
              <p>
                Expect questions on the state itself: the Narmada and its sister rivers, the national parks and tiger reserves, Khajuraho, Sanchi and Bhimbetka, the crafts of Chanderi and Maheshwar, the tribes and their festivals, and the state symbols. Add India GK and basic computer awareness, then read the past year&apos;s news for current affairs, which this bank does not cover.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make reasoning routine</h3>
              <p>
                Reasoning and mental ability run through two of the three parts, about half the paper. Series, analogies, coding-decoding, blood relations, directions, calendars and clocks follow a few fixed patterns, so drill them until each takes well under a minute.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the arithmetic shortcuts</h3>
              <p>
                Percentages, profit and discount, interest, averages, time and work and speed come up again and again. Know conversions such as km/h to m/s (multiply by 5/18) and formulas such as successive discounts. For science, revise class 8 to 10 physics, chemistry and biology, especially the human body and diseases.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                With 100 questions in 2 hours you have over a minute each, and there is no negative marking, so never leave a question blank. Take a full 2-hour mock, see which part ate your time, and drill it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          MP Police Constable Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="mppolice" />
        </div>
      </div>

      <ExamRelatedTests examId="mppolice" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the MP Police Constable Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 232 questions across all three parts.</p>
          <ExamLandingCTA dashboardHref="/mp-police-constable/dashboard" />
        </div>
      </div>
    </div>
  );
}
