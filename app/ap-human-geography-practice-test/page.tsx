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

const title = "Free AP Human Geography Practice Test 2027 - APHG Multiple Choice";
const metaDescription =
  "Free AP Human Geography practice tests: 60 multiple-choice questions in 60 minutes, all seven units, 204 original questions with explanations.";
const description =
  "Free AP Human Geography practice tests built like Section I of the AP Human Geography Exam: 60 multiple-choice questions with five choices in 60 minutes, about a third of them on a shared stimulus. 204 original questions, each with an explanation, covering all seven units, with stimulus sets built on practice data tables and on maps, landscapes and population pyramids described in words, plus seven drills that bring missed questions back until you master them.";

const faqs = [
  {
    q: "What is the format of the AP Human Geography Exam?",
    a: "The AP Human Geography Exam is fully digital and lasts 2 hours 15 minutes. Section I has 60 multiple-choice questions in 60 minutes and is 50% of the score. Section II has 3 free-response questions in 75 minutes, also 50%: the first has no stimulus, the second one stimulus and the third two (data, images or maps).",
  },
  {
    q: "What do AP Human Geography multiple-choice questions look like?",
    a: "Some stand alone and some come in sets that share a stimulus. About 30% to 40% of them use a map, table, chart, graph, image, infographic or landscape, roughly half quantitative and half qualitative. The College Board's sample questions have five answer choices, and no points are taken off for wrong answers.",
  },
  {
    q: "Which units are on the AP Human Geography Exam?",
    a: "Seven units. Unit 1, Thinking Geographically, is 8% to 10% of the multiple-choice section. Units 2 to 7 (population and migration, culture, political geography, agriculture, cities, and industrial and economic development) are each 12% to 17%. Every Tigertest practice test has 6 questions from Unit 1 and 9 from each of the other units.",
  },
  {
    q: "How is the AP Human Geography Exam scored?",
    a: "AP scores run from 1 to 5. The College Board combines the multiple-choice and free-response sections into a composite and converts it to a score of 1 to 5 each year; it does not publish a fixed percentage for each score. Tigertest reports the percent you got right on a full multiple-choice section, and its goals are its own targets, not official cutoffs.",
  },
  {
    q: "Does the Tigertest AP Human Geography practice test include the free-response questions?",
    a: "No. Tigertest models the 60-question multiple-choice section only. The three free-response questions are scored by readers, so practice them with your teacher. Maps and images are described in words, and the data in the tables are made up for practice. The questions are original, written to the College Board course framework, and Tigertest is not affiliated with the College Board.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AP Human Geography practice test, APHG practice test, free AP Human Geography practice test, AP Human Geography multiple choice, AP Human Geo MCQ, AP Human Geography exam 2027, AP Human Geography units, APHG review",
  alternates: {
    canonical: `${siteUrl}/ap-human-geography-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ap-human-geography-practice-test`,
    images: [{ url: shareImageUrl("aphug"), width: 1200, height: 630, alt: "Tigertest free AP Human Geography practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aphug")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AP Human Geography Practice Test",
      description,
      url: `${siteUrl}/ap-human-geography-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "204 original AP Human Geography practice questions with explanations",
        "2 full multiple-choice sections: 60 questions in 60 minutes, five choices each",
        "Stimulus sets on data tables, maps, landscapes and population pyramids",
        "All seven units, weighted like the real exam",
        "7 drills, one for each unit",
        "Score by unit after every practice test",
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
        classFaqJsonLd("aphug"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Unit 1: Thinking Geographically", weight: "8-10%" },
  { name: "Unit 2: Population and Migration Patterns and Processes", weight: "12-17%" },
  { name: "Unit 3: Cultural Patterns and Processes", weight: "12-17%" },
  { name: "Unit 4: Political Patterns and Processes", weight: "12-17%" },
  { name: "Unit 5: Agriculture and Rural Land-Use Patterns and Processes", weight: "12-17%" },
  { name: "Unit 6: Cities and Urban Land-Use Patterns and Processes", weight: "12-17%" },
  { name: "Unit 7: Industrial and Economic Development Patterns and Processes", weight: "12-17%" },
];

export default function ApHumanGeographyLandingPage() {
  return (
    <div data-theme="aphug" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AP Human Geography Practice Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/ap-human-geography/dashboard"
            shortName="AP Human Geography"
            subtitle="204 original multiple-choice questions across all seven units. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aphug-mobile.png", desktop: "/landing/aphug-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aphug" />

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
                Seven drills, one for each unit, from Thinking Geographically to Industrial and Economic Development. Questions you miss come back until you have mastered them, so a weak unit gets the practice it needs.
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
                Two full multiple-choice sections: 60 questions in 60 minutes, on the real clock, with the stimulus beside each set and a score by unit at the end. Practice Test 2 is held out of the drills, so it measures readiness. The free-response questions are not included.
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
                These are the College Board&apos;s weights for the seven units on the multiple-choice section. Every Tigertest practice test has 6 questions from Unit 1 and 9 from each of Units 2 to 7. About a third of the questions, one set of three per unit, share a stimulus: a practice data table, or a map, landscape or population pyramid described in words. The data are made up for practice, so read them from the stimulus, not from memory.
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
                src={getTigerAsset("aphug", 1)}
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
            How to Raise Your AP Human Geography Score
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the models cold</h3>
              <p>
                The course is built on models: the demographic transition, von Thunen, Burgess, Hoyt and the other city models, central place theory, Rostow, Wallerstein and Weber. Know what each one predicts, the assumptions behind it and its main criticism, because questions ask you to apply a model to a new place, not just to name it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read the stimulus before the choices</h3>
              <p>
                For a table, note what each column measures and its units before you calculate. For a map or landscape, name the pattern first (clustered, dispersed, a gradient from the center) and then match it to a concept. Choices that are true in general but not shown in the stimulus are a common trap.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think across scales</h3>
              <p>
                Scale analysis is a skill of its own on the exam. Ask how a pattern changes from global to national to local: a country&apos;s average can hide large differences between its regions, and a global process such as trade or migration looks different in one city or village.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep to a minute a question</h3>
              <p>
                With 60 questions in 60 minutes, answer the quick vocabulary questions fast to bank time for the stimulus sets, and flag the hard ones to come back to. Wrong answers cost nothing, so never leave a question blank. Tigertest shows your score by unit, so drill your weakest unit before each full test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AP Human Geography Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="aphug" />
        </div>
      </div>

      <ExamRelatedTests examId="aphug" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for AP Human Geography?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 204 questions across all seven units.</p>
          <ExamLandingCTA dashboardHref="/ap-human-geography/dashboard" />
        </div>
      </div>
    </div>
  );
}
