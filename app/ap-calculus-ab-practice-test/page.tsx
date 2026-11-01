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

const title = "Free AP Calculus AB Practice Test 2027 - Multiple Choice";
const metaDescription =
  "Free AP Calculus AB practice tests: 42 multiple-choice questions in 100 minutes, Part A without a calculator and Part B with one, all eight units, 215 original questions.";
const description =
  "Free AP Calculus AB practice tests built like the multiple-choice section of the AP Calculus AB Exam from May 2027: 29 questions in 62 minutes without a calculator, then 13 questions in 38 minutes with one, four choices each, covering all eight units of the course framework. 215 original questions, each with an explanation, and eight drills, one per unit, that bring missed questions back until you master them.";

const faqs = [
  {
    q: "What is the format of the AP Calculus AB Exam?",
    a: "From May 2027 the AP Calculus AB Exam lasts 3 hours 10 minutes. Section I has 42 multiple-choice questions in 1 hour 40 minutes and counts for 50% of the score: Part A is 29 questions in 62 minutes with no calculator, and Part B is 13 questions in 38 minutes with a graphing calculator required. Section II has 6 free-response questions in 90 minutes and counts for the other 50%: 2 with a graphing calculator in 30 minutes, then 4 without one in 60 minutes. The exam is hybrid digital: you answer the multiple choice in the Bluebook app and handwrite the free responses in a paper booklet.",
  },
  {
    q: "Did the AP Calculus AB multiple-choice section change for 2027?",
    a: "Yes. The College Board changed the number of multiple-choice questions and the timing starting with the May 2027 exams. Part A went from 30 questions in 60 minutes to 29 questions in 62 minutes, and Part B from 15 questions in 45 minutes to 13 questions in 38 minutes. The course content did not change. Tigertest's practice tests use the new lengths and times.",
  },
  {
    q: "What units are on the AP Calculus AB Exam?",
    a: "There are eight units. Their shares of the multiple-choice section are: Limits and Continuity 10% to 15%, Differentiation: Definition and Fundamental Properties 10% to 15%, Composite, Implicit and Inverse Functions 5% to 10%, Contextual Applications of Differentiation 10% to 15%, Analytical Applications of Differentiation 15% to 20%, Integration and Accumulation of Change 15% to 20%, Differential Equations 5% to 10%, and Applications of Integration 10% to 15%.",
  },
  {
    q: "How is the AP Calculus AB Exam scored?",
    a: "AP scores run from 1 to 5. The College Board combines the multiple-choice and free-response sections into a composite and converts it to a score of 1 to 5 each year; it does not publish a fixed percentage for each score. No points are taken off for wrong answers, so answer every question. Tigertest reports the percent you got right on a full multiple-choice section, and its goals are its own targets, not official cutoffs.",
  },
  {
    q: "Does the Tigertest AP Calculus AB practice test include the free-response questions?",
    a: "No. Tigertest models the 42-question multiple-choice section only. The six free-response questions are written answers scored by readers, so practice them with your teacher. The real Part B requires a graphing calculator; the calculator in Tigertest's practice tests is scientific, so its Part B questions are written to be solved with one. The questions are original, written to the College Board course framework, and Tigertest is not affiliated with the College Board.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AP Calculus AB practice test, free AP Calculus AB practice test, AP Calc AB practice test, AP Calculus AB multiple choice, AP Calc AB MCQ, AP Calculus AB practice questions, AP Calculus AB exam 2027, AP Calculus AB units, AP Calc review",
  alternates: {
    canonical: `${siteUrl}/ap-calculus-ab-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ap-calculus-ab-practice-test`,
    images: [{ url: shareImageUrl("apcalcab"), width: 1200, height: 630, alt: "Tigertest free AP Calculus AB practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("apcalcab")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AP Calculus AB Practice Test",
      description,
      url: `${siteUrl}/ap-calculus-ab-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "215 original AP Calculus AB practice questions with explanations",
        "2 full multiple-choice sections: 29 questions without a calculator, then 13 with one",
        "The May 2027 lengths and times: 62 minutes for Part A and 38 minutes for Part B",
        "All eight units of the course framework, weighted like the real exam",
        "8 drills, one per unit, and a score by unit after every practice test",
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
        classFaqJsonLd("apcalcab"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Limits and Continuity", weight: "10-15%" },
  { name: "Differentiation: Definition and Fundamental Properties", weight: "10-15%" },
  { name: "Composite, Implicit and Inverse Functions", weight: "5-10%" },
  { name: "Contextual Applications of Differentiation", weight: "10-15%" },
  { name: "Analytical Applications of Differentiation", weight: "15-20%" },
  { name: "Integration and Accumulation of Change", weight: "15-20%" },
  { name: "Differential Equations", weight: "5-10%" },
  { name: "Applications of Integration", weight: "10-15%" },
];

export default function ApCalculusAbLandingPage() {
  return (
    <div data-theme="apcalcab" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AP Calculus AB Practice Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/ap-calculus-ab/dashboard"
            shortName="AP Calculus AB"
            subtitle="215 original multiple-choice questions across all eight units, with and without a calculator. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/apcalcab-mobile.png", desktop: "/landing/apcalcab-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="apcalcab" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Unit</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills of 20 questions, one for each unit of the course, all without a calculator. Questions you miss come back until you have mastered them, so a weak unit gets the practice it needs.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two full multiple-choice sections on the real clock: Part A, 29 questions in 62 minutes with no calculator, then Part B, 13 questions in 38 minutes with one, and a score by unit at the end. Practice Test 2 is held out of the drills, so it measures readiness. The free-response section is not included.
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
                Weighted Like the Real Exam
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each unit has its own share of the real multiple-choice section, shown below. Every Tigertest practice test stays inside those ranges, from 3 questions on Differential Equations to 8 on Integration and Accumulation of Change, with the calculator questions in Part B weighted toward motion, accumulation and volume, as on the real exam.
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
                src={getTigerAsset("apcalcab", 1)}
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
            How to Raise Your AP Calculus AB Score
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Make the rules automatic</h3>
              <p>
                Part A gives you about two minutes a question with no calculator. The chain rule, the quotient rule, implicit differentiation and substitution need to be quick and accurate, so drill them until you do not have to think about the steps.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read what the question asks for</h3>
              <p>
                Many wrong choices are the right number for a different question: the x-value instead of the maximum value, the displacement instead of the total distance, the integral instead of the average value. Underline the quantity asked for before you solve.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Connect f, f&apos; and f&apos;&apos;</h3>
              <p>
                A large share of the exam asks what the sign of a derivative says about a function: increasing or decreasing, concave up or down, a maximum or a point of inflection. Say each link in words, such as &quot;f&apos; changes from positive to negative, so f has a relative maximum&quot;.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                Wrong answers cost nothing, so never leave a question blank. In Part B, set up the derivative or integral first and use the calculator only for the arithmetic. Integration and analysis of functions carry the most weight, so drill those units first if they are weak.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AP Calculus AB Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="apcalcab" />
        </div>
      </div>

      <ExamRelatedTests examId="apcalcab" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for AP Calculus AB?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 215 questions across all eight units.</p>
          <ExamLandingCTA dashboardHref="/ap-calculus-ab/dashboard" />
        </div>
      </div>
    </div>
  );
}
