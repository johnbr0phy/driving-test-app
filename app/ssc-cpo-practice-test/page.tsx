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

const title = "Free SSC CPO Mock Test 2026 - Paper-I Practice";
const metaDescription =
  "Free SSC CPO Paper-I mock tests for Sub-Inspector in Delhi Police and CAPFs: 232 original questions on reasoning, general knowledge, quantitative aptitude and English, two full 100-question, 60-minute tests timed 15 minutes per part, and an explanation on every answer.";
const description =
  "Free SSC CPO Paper-I practice with 232 original questions written to the Staff Selection Commission's 2026 syllabus for the Sub-Inspector in Delhi Police and Central Armed Police Forces exam: General Intelligence and Reasoning, General Knowledge and General Awareness, Quantitative Aptitude and English Comprehension, 25 questions each per mock test. Two full mock tests of 100 questions in 60 minutes with a 15-minute timer on each part, eight topic drills, and a worked explanation on every answer.";

const faqs = [
  {
    q: "What is the SSC CPO Paper-I exam pattern in 2026?",
    a: "The 2026 notice changed Paper-I to one computer-based paper of 100 multiple-choice questions in 1 hour, down from 200 questions in 2 hours in earlier years. It has four parts of 25 questions and 25 marks each: General Intelligence and Reasoning, General Knowledge and General Awareness, Quantitative Aptitude and English Comprehension, with a sectional timer of 15 minutes for each part. The first three parts are set in Hindi and English. Guides report Paper-I on 20 to 28 November 2026; check the Commission's website for your own date.",
  },
  {
    q: "Is there negative marking in SSC CPO Paper-I?",
    a: "Yes. The 2026 notice takes away 0.25 marks for each wrong answer in Paper-I, a quarter of the 1 mark a right answer earns, and 0.50 marks in Paper-II. An unanswered question scores zero. With four options a blind guess gains only about 0.06 marks on average, so guess only when you can rule out at least one option. Tigertest mock tests score percent correct and do not deduct marks, so compare your score with how many questions you would have attempted.",
  },
  {
    q: "What marks do I need to clear SSC CPO Paper-I?",
    a: "The 2026 notice sets minimum qualifying marks of 30 percent for unreserved candidates, 25 percent for OBC and EWS candidates and 20 percent for all other categories, without NCC bonus marks. Paper-I then shortlists candidates for the physical standard and endurance tests by category-wise cut-offs, which the Commission may set part by part and which change every year. Final selection is made on Paper-II marks. On Tigertest, aim for 75 percent or more on both mock tests with few wrong answers.",
  },
  {
    q: "Are these the same questions as the real SSC CPO exam?",
    a: "No. These are original practice questions written to the official SSC CPO syllabus and pattern, not questions copied from past papers or the real exam. Reasoning is text only, so the figure-based question types on the real paper are not included, and general knowledge covers static topics such as history, polity, India's neighbours, geography, economy and science. Current affairs change every year, so study them separately from a recent source. Paper-II, the harder second paper (reasoning, general knowledge and quantitative aptitude, 20 questions each, plus a 100-question English test) that decides the final merit, is not modelled.",
  },
  {
    q: "Is the Tigertest SSC CPO mock test free?",
    a: "Yes. Both mock tests and all eight topic drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SSC CPO mock test, SSC CPO Paper 1 mock test free, SSC CPO practice test, SSC CPO 2026, SSC CPO exam pattern 2026, SSC CPO new pattern, Delhi Police SI mock test, CAPF SI exam practice, SSC CPO reasoning questions, SSC CPO GK questions, SSC CPO maths practice, SSC CPO English practice",
  alternates: {
    canonical: `${siteUrl}/ssc-cpo-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ssc-cpo-practice-test`,
    images: [{ url: shareImageUrl("ssccpo"), width: 1200, height: 630, alt: "Tigertest free SSC CPO mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ssccpo")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SSC CPO Mock Test",
      description,
      url: `${siteUrl}/ssc-cpo-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "232 original SSC CPO Paper-I practice questions with explanations",
        "2 full mock tests of 100 questions in 60 minutes, with a 15-minute timer on each part",
        "8 topic drills across reasoning, general knowledge, quantitative aptitude and English",
        "Cloze and reading comprehension passages",
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
        classFaqJsonLd("ssccpo"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "General Intelligence and Reasoning", weight: "25 Qs, 25 marks, 15 min" },
  { name: "General Knowledge and General Awareness", weight: "25 Qs, 25 marks, 15 min" },
  { name: "Quantitative Aptitude", weight: "25 Qs, 25 marks, 15 min" },
  { name: "English Comprehension", weight: "25 Qs, 25 marks, 15 min" },
];

export default function SscCpoLandingPage() {
  return (
    <div data-theme="ssccpo" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SSC CPO Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ssc-cpo/dashboard"
            shortName="SSC CPO"
            subtitle="232 original Paper-I questions on reasoning, GK, maths and English for Delhi Police and CAPF Sub-Inspector. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ssccpo-mobile.png", desktop: "/landing/ssccpo-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ssccpo" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Topic Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills, two for each part of Paper-I: analogy and coding, relations and logic, history and polity with India&apos;s neighbours, geography and science, arithmetic, algebra and geometry, grammar and cloze, and vocabulary and reading. Questions you miss come back until you have mastered them.
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
                Two full-length mock tests of 100 questions in 60 minutes, with a 15-minute timer on each of the four parts, as in the 2026 notice. Move and flag questions inside a part; once its timer ends, the next part opens. Mock Test 2 is held out of the drills, so it measures readiness.
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
                Built on the New Paper-I Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test follows the Staff Selection Commission&apos;s 2026 Paper-I pattern: four parts of 25 questions, 1 mark each, 100 marks in 60 minutes, with 15 minutes for each part. The real exam takes 0.25 marks off for every wrong answer, so a wrong guess costs a quarter of a right answer. Tigertest scores percent correct; to see your exam-style score, take your correct answers and subtract a quarter of your wrong ones. The real paper also has figure-based reasoning questions, which these text-only tests leave out, and Paper-II (the harder second paper, with a 100-question English part, that decides final merit) is not modelled.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-right text-brand-dark font-semibold sm:whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("ssccpo", 1)}
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
            How to Prepare for SSC CPO Paper-I
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Work to the 15-minute timers</h3>
              <p>
                Each part has its own 15 minutes, so you have 36 seconds a question and no way to borrow time from General Knowledge for a hard maths question. Earlier cycles gave 2 hours for 200 questions; the new paper is the same pace with half the questions, so speed matters as much as before. Answer the quick ones first inside each part, flag the slow ones, and come back to them before the timer ends.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Respect the negative marking</h3>
              <p>
                A wrong answer costs 0.25 marks. A blind guess among four gains only about 0.06 marks on average and is a gamble; once you can rule out one or two options, the guess is clearly worth taking. Because the Commission may set cut-offs part by part, do not leave a weak part almost empty.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Make arithmetic fast, not just right</h3>
              <p>
                Percentages, profit and discount, ratio, averages, interest, partnership, work and speed make up much of the quant part, with algebra, geometry, mensuration and trigonometry on top. Learn the quick methods (successive discounts, the x + 1/x identities, standard trigonometric values) and drill each topic until it is fast as well as right. Tigertest&apos;s explanations show the short method.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Build static GK, then add current affairs</h3>
              <p>
                History, culture, the Constitution, India&apos;s neighbouring countries, geography, the economy and everyday science are named in the syllabus and do not go out of date. Master them here, then add the last twelve months of current affairs from a recent source, since these change with each exam cycle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SSC CPO Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ssccpo" />
        </div>
      </div>

      <ExamRelatedTests examId="ssccpo" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for SSC CPO Paper-I?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 232 questions across all four parts.</p>
          <ExamLandingCTA dashboardHref="/ssc-cpo/dashboard" />
        </div>
      </div>
    </div>
  );
}
