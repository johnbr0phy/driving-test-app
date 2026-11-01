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

const title = "Free AP Biology Practice Test 2027 - Multiple Choice";
const metaDescription =
  "Free AP Biology practice tests: 60 multiple-choice questions in 90 minutes, all eight units, data and experiment sets, 200 original questions with explanations.";
const description =
  "Free AP Biology practice tests built like the multiple-choice section of the AP Biology Exam: 60 questions with four choices in 90 minutes, covering all eight units of the course framework. 200 original questions, each with an explanation, including experiments and data tables that several questions share, chi-square and Hardy-Weinberg calculations, and eight drills that bring missed questions back until you master them.";

const faqs = [
  {
    q: "What is the format of the AP Biology Exam?",
    a: "The AP Biology Exam lasts 3 hours. Section I has 60 multiple-choice questions in 90 minutes and counts for 50% of the score; the questions come one at a time or in sets of typically four to five that share a stimulus. Section II has 6 free-response questions in 90 minutes and counts for the other 50%: two long questions on interpreting experimental results and four short-answer questions. The exam is hybrid digital: you answer the multiple choice in the Bluebook app and handwrite the free responses in a paper booklet.",
  },
  {
    q: "What units are on the AP Biology Exam?",
    a: "There are eight units. Their shares of the multiple-choice section are: Chemistry of Life 8% to 11%, Cells 10% to 13%, Cellular Energetics 12% to 16%, Cell Communication and Cell Cycle 10% to 15%, Heredity 8% to 11%, Gene Expression and Regulation 12% to 16%, Natural Selection 13% to 20%, and Ecology 10% to 15%.",
  },
  {
    q: "Can I use a calculator on the AP Biology Exam?",
    a: "Yes. A four-function, scientific or graphing calculator is allowed on both sections, and you get an equations and formulas sheet with chi-square, Hardy-Weinberg, water potential, population growth and other formulas. Tigertest's practice tests have a calculator and a practice formula sheet in the tools drawer.",
  },
  {
    q: "How is the AP Biology Exam scored?",
    a: "AP scores run from 1 to 5. The College Board combines the multiple-choice and free-response sections into a composite and converts it to a score of 1 to 5 each year; it does not publish a fixed percentage for each score. No points are taken off for wrong answers, so answer every question. Tigertest reports the percent you got right on a full multiple-choice section, and its goals are its own targets, not official cutoffs.",
  },
  {
    q: "Does the Tigertest AP Biology practice test include the free-response questions?",
    a: "No. Tigertest models the 60-question multiple-choice section only. The six free-response questions are written answers scored by readers, so practice them with your teacher. The data sets in the practice tests do build the same skills: identifying variables and controls, reading tables, calculating rates and percent change, and running a chi-square test. The questions are original, written to the College Board course framework, and Tigertest is not affiliated with the College Board.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AP Biology practice test, free AP Biology practice test, AP Bio practice test, AP Biology multiple choice, AP Biology practice questions, AP Bio MCQ, AP Biology exam 2027, AP Biology units, AP Biology review",
  alternates: {
    canonical: `${siteUrl}/ap-biology-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ap-biology-practice-test`,
    images: [{ url: shareImageUrl("apbio"), width: 1200, height: 630, alt: "Tigertest free AP Biology practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("apbio")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AP Biology Practice Test",
      description,
      url: `${siteUrl}/ap-biology-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 original AP Biology practice questions with explanations",
        "2 full multiple-choice sections: 60 questions in 90 minutes, four choices each",
        "All eight units of the course framework, weighted like the real exam",
        "Experiment and data sets that several questions share",
        "Calculator and practice formula sheet built in",
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
        classFaqJsonLd("apbio"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Chemistry of Life", weight: "8-11%" },
  { name: "Cells", weight: "10-13%" },
  { name: "Cellular Energetics", weight: "12-16%" },
  { name: "Cell Communication and Cell Cycle", weight: "10-15%" },
  { name: "Heredity", weight: "8-11%" },
  { name: "Gene Expression and Regulation", weight: "12-16%" },
  { name: "Natural Selection", weight: "13-20%" },
  { name: "Ecology", weight: "10-15%" },
];

export default function ApBiologyLandingPage() {
  return (
    <div data-theme="apbio" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AP Biology Practice Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/ap-biology/dashboard"
            shortName="AP Biology"
            subtitle="200 original multiple-choice questions across all eight units, with experiments and data sets. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/apbio-mobile.png", desktop: "/landing/apbio-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="apbio" />

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
                Eight drills, one for each unit of the course. Questions you miss come back until you have mastered them, so a weak unit gets the practice it needs.
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
                Two full multiple-choice sections: 60 questions in 90 minutes, on the real clock, with a calculator, a formula sheet and a score by unit at the end. Practice Test 2 is held out of the drills, so it measures readiness. The free-response section is not included.
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
                Each unit has its own share of the real multiple-choice section, shown below. Every Tigertest practice test follows the middle of those ranges, from 6 questions on Chemistry of Life to 10 on Natural Selection, and includes three sets of four questions that share an experiment or data table.
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
                src={getTigerAsset("apbio", 1)}
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
            How to Raise Your AP Biology Score
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the data before the question</h3>
              <p>
                Many questions come in sets about one experiment. Before you answer, name the independent and dependent variables, find the control, and say the trend in the table in one sentence. The questions in the set usually ask about exactly those things.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice the calculations</h3>
              <p>
                Expect rates, percent change, chi-square, Hardy-Weinberg, water potential and population growth. The formulas are on the sheet, so the skill is knowing which one to use and what each letter stands for. Work every calculation drill question until it is quick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Explain, do not just define</h3>
              <p>
                Most questions ask why: why an enzyme stops working above its best temperature, why a mutation changes a protein, why a population levels off. For each answer, say the mechanism in your own words, then why the closest wrong option fails.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                Wrong answers cost nothing, so never leave a question blank. With 60 questions in 90 minutes you have a minute and a half each: flag the slow ones and come back. Natural Selection, Cellular Energetics and Gene Expression carry the most weight, so drill them first if they are weak.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AP Biology Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="apbio" />
        </div>
      </div>

      <ExamRelatedTests examId="apbio" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for AP Biology?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all eight units.</p>
          <ExamLandingCTA dashboardHref="/ap-biology/dashboard" />
        </div>
      </div>
    </div>
  );
}
