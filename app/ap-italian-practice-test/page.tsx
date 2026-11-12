import "@/lib/v2/banks/apitalian";
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
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free AP Italian Practice Test 2027 - Reading Multiple Choice";
const metaDescription =
  "Free AP Italian practice tests: 30 reading questions in Italian in 40 minutes, in sets of five on articles, charts, literary texts and ads. 210 original questions.";
const description =
  "Free AP Italian Language and Culture practice tests built like Part B (Reading) of Section II of the 2027 exam: 30 multiple-choice questions in Italian with four choices in 40 minutes, in six sets of five that share a text. 210 original questions on 42 original Italian practice texts (articles, articles with a chart, literary texts and promotional material) across the six units of the 2026 course, each with an explanation in English, plus six drills that bring missed questions back until you master them.";

const faqs = [
  {
    q: "What is on the AP Italian multiple-choice section?",
    a: "Section II has 55 questions in Italian in 80 minutes and counts for half your score. Part A is 25 listening questions in 40 minutes; Part B is 30 reading questions in 40 minutes. Questions come in sets of five on one or two texts or recordings, and each has four choices.",
  },
  {
    q: "Which part does this practice test cover?",
    a: "The reading part (Part B), at full length and pace: 30 questions in 40 minutes in six sets of five, on articles, articles with a chart, literary excerpts and promotional material. The listening part and the free-response section (the project presentation, the project Q&A and the argumentative essay) are not included.",
  },
  {
    q: "Did the AP Italian exam change for 2027?",
    a: "Yes. The College Board revised the AP world language courses for the 2026-27 school year, and from May 2027 the exam is fully digital in Bluebook. The course now has six units (Families and Communities, Language and Culture, Art and Creativity, Science and Technology, Contemporary Life, Global Contexts) and a course project that leads to two speaking questions. Tigertest follows the course and exam description effective fall 2026.",
  },
  {
    q: "Are the texts real Italian articles?",
    a: "No. Every text is an original practice text written in Italian for Tigertest, in the styles the exam uses. Places, people, organizations and data in them are invented, and each text says so. No College Board question was used or reworded.",
  },
  {
    q: "Is there a penalty for guessing on AP Italian?",
    a: "No. The College Board does not take off points for wrong answers, so answer every question.",
  },
  {
    q: "What score do I need?",
    a: "AP scores run from 1 to 5, and the College Board sets the cut points for each score every year from a composite of all parts of the exam. It publishes no fixed percent, so the goals on Tigertest are practice targets, not official cutoffs.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AP Italian practice test, free AP Italian practice test, AP Italian Language and Culture, AP Italian multiple choice, AP Italian reading practice, AP Italian exam 2027, AP Italiano",
  alternates: {
    canonical: `${siteUrl}/ap-italian-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ap-italian-practice-test`,
    images: [{ url: shareImageUrl("apitalian"), width: 1200, height: 630, alt: "Tigertest free AP Italian practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("apitalian")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AP Italian Practice Test",
      description,
      url: `${siteUrl}/ap-italian-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("apitalian"),
      featureList: [
        "210 original AP Italian reading questions in Italian, with explanations in English",
        "2 full reading sections: 30 questions in 40 minutes, four choices each",
        "Sets of five on articles, articles with a chart, literary texts and promotional material",
        "All six units of the 2026 course",
        "6 drills, one for each unit",
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
        classFaqJsonLd("apitalian"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Families and Communities", weight: "5 questions" },
  { name: "Language and Culture", weight: "5 questions" },
  { name: "Art and Creativity", weight: "5 questions" },
  { name: "Science and Technology", weight: "5 questions" },
  { name: "Contemporary Life", weight: "5 questions" },
  { name: "Global Contexts", weight: "5 questions" },
];

export default function ApItalianLandingPage() {
  return (
    <div data-theme="apitalian" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AP Italian Practice Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/ap-italian/dashboard"
            shortName="AP Italian"
            subtitle="210 original reading questions in Italian, in sets of five on one text. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/apitalian-mobile.png", desktop: "/landing/apitalian-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="apitalian" />

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
                Six drills, one for each unit of the course, each with its own texts. Questions you miss come back until you have mastered them, so a weak unit gets the practice it needs.
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
                Two full reading sections: 30 questions in 40 minutes, on the real clock, with the text beside each set and a score by unit at the end. Practice Test 2 is held out of the drills, so it measures readiness. Listening and the free-response tasks are not included.
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
                Every Unit, Every Text Type
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The reading part has six sets of five questions across four task types: an article, an article with a chart, a literary text and promotional material. Every Tigertest practice test has one set for each of the six course units and uses all four task types. Every text is an original practice text in Italian; its places, people and data are invented.
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
                src={getTigerAsset("apitalian", 1)}
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
            How to Raise Your AP Italian Reading Score
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the introduction first</h3>
              <p>
                Every text opens with a line saying what it is and where it comes from. Read it before the text: knowing that it is an ad, a letter or a story tells you what kind of questions to expect and where the answers will be.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read the questions before the text</h3>
              <p>
                Skim the five questions of a set first, then read the text once with them in mind. Most questions point to one paragraph, a line of the chart or one detail of an ad.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Watch for words that change the meaning</h3>
              <p>
                Italian negation, comparisons and connectives (non, nessuno, invece, tuttavia, pur, anche se) often decide the answer. A choice that repeats words from the text but flips their meaning is the most common trap.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep to eight minutes a set</h3>
              <p>
                With 30 questions in 40 minutes you have about six and a half minutes for each set of five. Flag a hard question and move on. Wrong answers cost nothing, so never leave one blank.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AP Italian Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="apitalian" />
        </div>
      </div>

      <SampleQuestionsV2 examId="apitalian" />

      <ExamRelatedTests examId="apitalian" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for AP Italian?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 210 questions across all six units.</p>
          <ExamLandingCTA dashboardHref="/ap-italian/dashboard" />
        </div>
      </div>
    </div>
  );
}
