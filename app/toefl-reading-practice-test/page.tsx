import "@/lib/v2/banks/toeflread";
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

const title = "Free TOEFL Reading Practice Test 2026 - New TOEFL iBT Format";
const metaDescription =
  "Free TOEFL iBT Reading practice in the 2026 format: Complete the Words, Read in Daily Life and Read an Academic Passage, two adaptive 50-question sections and 194 original questions.";
const description =
  "Free TOEFL Reading practice tests built like the TOEFL iBT Reading section ETS has given since January 2026: two-stage adaptive sections of 50 questions in about 30 minutes, with Complete the Words paragraphs, short daily-life texts such as notices, emails and menus, and 200-word academic passages. 194 original questions on 35 original texts, an explanation on every answer and drills for each task type. Reading only: Listening, Writing and Speaking are not covered.";

const faqs = [
  {
    q: "What is the new TOEFL iBT Reading section like?",
    a: "Since January 21, 2026, Reading is the first section of the TOEFL iBT. It has 50 items in about 30 minutes, including some unscored ones, and three task types: Complete the Words, Read in Daily Life and Read an Academic Passage. The long passages of the old test are gone; texts now run from about 15 words up to about 200. Every text stays on screen while you answer, and everything you need is in the text.",
  },
  {
    q: "How does Complete the Words work?",
    a: "You see a short academic paragraph of about 70 to 100 words. The first sentence is complete. After that, the second half of every second word is missing, ten words in all, and you type the missing letters. It tests vocabulary, grammar and spelling as well as reading. Here each gap shows one underscore per missing letter and you choose the word that fits from four of the same length, so practise spelling the words as well.",
  },
  {
    q: "What does adaptive mean for TOEFL Reading?",
    a: "Reading is a two-stage adaptive section. Everyone takes the same kind of first stage; how well you do decides whether your second stage, about 9 minutes long, is easier or harder. You cannot go back to the first stage. Your score counts the questions you get right in both stages and how hard they are. Tigertest's practice tests work the same way, with an easier or harder second stage chosen from your first-stage accuracy.",
  },
  {
    q: "How is TOEFL Reading scored?",
    a: "Since January 2026 each section, Reading included, is reported on a 1 to 6 scale in half bands, and your overall score is the average of the four sections rounded to the nearest half band. For two years ETS also reports a comparable total on the old 0 to 120 scale. ETS does not publish a table from raw Reading points to a band, so Tigertest shows your percent correct, capped at 80 when your second stage was the easier one. It is a guide to your progress, not a TOEFL score.",
  },
  {
    q: "Does Tigertest cover the whole TOEFL test?",
    a: "No. Only the Reading section is modelled. Listening needs recorded audio, and Writing and Speaking responses are scored from what you write and say, so Tigertest does not practise them and cannot estimate your overall TOEFL score.",
  },
  {
    q: "Is the Tigertest TOEFL Reading practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last are free; the inference and purpose drill and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. The texts and questions are original practice material, not taken from ETS. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "TOEFL reading practice test, TOEFL iBT reading, new TOEFL 2026, TOEFL mock test, complete the words practice, read in daily life, read an academic passage, TOEFL reading questions, free TOEFL practice, TOEFL 1 to 6 score",
  alternates: {
    canonical: `${siteUrl}/toefl-reading-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/toefl-reading-practice-test`,
    images: [{ url: shareImageUrl("toeflread"), width: 1200, height: 630, alt: "Tigertest free TOEFL Reading practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("toeflread")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free TOEFL Reading Practice Test",
      description,
      url: `${siteUrl}/toefl-reading-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("toeflread"),
      featureList: [
        "194 original TOEFL iBT Reading practice questions with explanations",
        "2 full Reading sections in the 2026 format: 50 questions, about 30 minutes",
        "Two-stage adaptive: an easier or harder second stage",
        "Complete the Words, Read in Daily Life and Read an Academic Passage",
        "7 drills by task type on 13 more texts",
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
        classFaqJsonLd("toeflread"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Complete the Words", weight: "30 of 50 questions" },
  { name: "Read in Daily Life", weight: "10 of 50 questions" },
  { name: "Read an Academic Passage", weight: "10 of 50 questions" },
  { name: "Listening, Writing, Speaking", weight: "not modelled" },
];

export default function ToeflReadingLandingPage() {
  return (
    <div data-theme="toeflread" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free TOEFL Reading Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/toefl-reading/dashboard"
            shortName="TOEFL Reading"
            subtitle="Two full TOEFL iBT Reading sections in the 2026 format and 194 original questions. Reading only. Free to start, no account needed."
            shots={{ mobile: "/landing/toeflread-mobile.png", desktop: "/landing/toeflread-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="toeflread" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Task Type</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven drills: grammar words and content words in Complete the Words, details and implied meaning in daily-life texts, and facts, vocabulary and inference in academic passages. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two full Reading sections: 35 questions in 21 minutes, then an easier or harder second stage of 15 questions in 9 minutes, with no going back, as on the real test. Practice Test 2 is held out of the drills, so it measures readiness, not memory.
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
                Built Like the 2026 TOEFL Reading Section
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test has three Complete the Words paragraphs, four short daily-life texts and two academic passages of about 200 words, 50 questions in all, all original. Your result is a percent correct, not a TOEFL band, since ETS publishes no conversion. Only Reading is covered: the other three sections are not part of this practice.
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
                src={getTigerAsset("toeflread", 3)}
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
            How to Raise Your TOEFL Reading Score
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Use the grammar around each gap</h3>
              <p>
                In Complete the Words the number of missing letters is shown, and the words on either side tell you what kind of word it is: an article before a noun, a verb after a subject, a plural after &quot;many&quot;. Decide the kind of word first, then the meaning. Read the first sentence carefully; it tells you the topic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise spelling, not just recognising</h3>
              <p>
                On the real test you type the missing letters, so a word you recognise but cannot spell still costs a point. Common academic words (process, structure, release, produce) and small grammar words are the ones that come up most. When you finish a drill, write out the words you missed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Scan daily-life texts for the question first</h3>
              <p>
                Notices, schedules, menus and emails are short, and most questions ask for one time, place, price or reason. Read the question, then look for it in the text. Questions about purpose ask why the text was written: look at the opening lines and what the reader is asked to do.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do the first stage well</h3>
              <p>
                Your first-stage accuracy decides whether the second stage is harder, and the harder stage is the way to the top scores. Do not rush the first 35 questions: there is time to read each text once properly. Tigertest shows your accuracy by task type, so drill your weakest one before each full test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          TOEFL Reading Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="toeflread" />
        </div>
      </div>

      <SampleQuestionsV2 examId="toeflread" />

      <ExamRelatedTests examId="toeflread" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for TOEFL Reading?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 194 questions on 35 texts.</p>
          <ExamLandingCTA dashboardHref="/toefl-reading/dashboard" />
        </div>
      </div>
    </div>
  );
}
