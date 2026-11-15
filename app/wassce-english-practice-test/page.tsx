import "@/lib/v2/banks/wassceeng";
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

const title = "Free WASSCE English Practice Test 2027 - WAEC Objectives and Orals";
const metaDescription =
  "Free WAEC WASSCE English Language practice: 270 original questions on Paper 1 lexis and structure and the Test of Orals, with full 80-question timed tests. Every answer explained.";
const description =
  "Free WAEC WASSCE English Language practice with 270 original questions on the syllabus: vocabulary of the syllabus fields, synonyms and antonyms, idioms, concord, tenses, pronouns, prepositions and question tags, and the Test of Orals on vowels, consonants, rhymes and stress. Two practice tests with the full 80-question Paper 1 in 1 hour, ten drills and an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are in WAEC English Paper 1?",
    a: "WAEC's English Language syllabus, as published by syllabus sites, sets Paper 1 as 80 objective questions in 1 hour for 40 marks, each with four options lettered A to D: forty on lexis and forty on structure. Tigertest practice tests have the full 80 Paper 1 questions in 1 hour, split the same way.",
  },
  {
    q: "What does the WASSCE English syllabus cover?",
    a: "Lexis covers the vocabulary of everyday life and of sixteen fields of activity (building, agriculture, fishing, the stock exchange, health, the environment, ceremonies, law and order, motor vehicles and travel, government, sports, religion, science and technology, animal husbandry, advertising and the human body), plus synonyms, antonyms, idioms and figurative usage. Structure covers word forms for number, tense and degree, how words combine into sentences, and structural words such as conjunctions, determiners and prepositions. Paper 3 covers vowels, consonants and clusters, rhymes, word stress and syllables, emphatic stress and intonation, and phonetic symbols.",
  },
  {
    q: "What is the Test of Orals?",
    a: "Paper 3 is 60 multiple-choice items in 45 minutes for 30 marks. Candidates in Nigeria and Liberia take the Test of Orals, on sounds, rhymes, stress and intonation. Candidates in Ghana, The Gambia and Sierra Leone take a listening comprehension test from a recording instead, which Tigertest does not model. Tigertest's orals section has 30 questions in 23 minutes, half the paper at the same pace, judged by standard British pronunciation.",
  },
  {
    q: "Does Tigertest cover the essay, comprehension and summary?",
    a: "No. Paper 2 is written: an essay of at least 450 words on one of five topics, a comprehension passage and a summary, in 2 hours for 100 marks. It needs a teacher to mark it, so Tigertest covers only the two objective papers. Paper 2 carries 100 of the 170 marks, so practise writing too. Ghana's Paper 1 also has 30 literature questions on set texts, which are not covered here.",
  },
  {
    q: "How is WASSCE English graded?",
    a: "WAEC reports results as grades from A1 to F9. It does not publish how marks turn into grades, so Tigertest shows your percent correct, not a grade. A high percent on both objective papers is a strong sign that your lexis, structure and orals are ready.",
  },
  {
    q: "Are these WAEC past questions?",
    a: "No. These are original practice questions written to WAEC's English Language syllabus, not WAEC past questions. They use British English and West African names and settings. Both practice tests and all ten drills are free, with no account required. Tigertest is not affiliated with or endorsed by WAEC.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "WASSCE English practice test, WAEC English objective questions, WAEC English Language practice, SSCE English practice, May/June WAEC English, WAEC test of orals, WAEC lexis and structure, oral English WAEC, WAEC English 2027",
  alternates: {
    canonical: `${siteUrl}/wassce-english-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/wassce-english-practice-test`,
    images: [{ url: shareImageUrl("wassceeng"), width: 1200, height: 630, alt: "Tigertest free WASSCE English Language practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("wassceeng")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free WASSCE English Language Practice Test",
      description,
      url: `${siteUrl}/wassce-english-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("wassceeng", "NGN"),
      featureList: [
        "270 original WASSCE English Language practice questions with explanations",
        "2 practice tests: the full 80-question Paper 1 in 1 hour and 30 Test of Orals questions",
        "10 drills, one for each part of the objective papers",
        "Vocabulary from every field the syllabus lists",
        "Test of Orals on vowels, consonants, rhymes, stress and intonation",
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
        classFaqJsonLd("wassceeng"),
      ],
    },
  ],
};

const sections = [
  { name: "Paper 1: vocabulary in context", detail: "16 questions" },
  { name: "Paper 1: synonyms and antonyms", detail: "14 questions" },
  { name: "Paper 1: idioms and figurative usage", detail: "10 questions" },
  { name: "Paper 1: structure", detail: "40 questions" },
  { name: "Paper 3: Test of Orals", detail: "30 questions" },
];

export default function WassceEnglishLandingPage() {
  return (
    <div data-theme="wassceeng" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free WASSCE English Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/wassce-english/dashboard"
            shortName="WASSCE English"
            subtitle="270 original questions on WAEC Paper 1 lexis and structure and the Test of Orals, with full timed tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/wassceeng-mobile.png", desktop: "/landing/wassceeng-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="wassceeng" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Question Type</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ten drills: vocabulary in context, synonyms and antonyms, idioms, concord, tenses, pronouns and prepositions, then vowels, consonants, rhymes and stress for the Test of Orals. Questions you miss come back until you have mastered them.
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
                Each practice test is the full Paper 1, 80 questions in 1 hour, then 30 Test of Orals questions in 23 minutes. Practice Test 2 is held out of the drills, so it measures how ready you are.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the WAEC English Language Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Paper 1 follows the syllabus as published by syllabus sites: 80 four-option questions, forty on lexis and forty on structure. The Test of Orals section covers the six areas the syllabus lists for Nigeria and Liberia. Paper 2, Ghana&apos;s literature questions and the listening test are not modelled. Your score is percent correct, since WAEC publishes no conversion to grades.
              </p>
              <div className="space-y-3">
                {sections.map((s) => (
                  <div key={s.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{s.name}</span>
                    <span className="text-brand-dark font-semibold">{s.detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("wassceeng", 1)}
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
            How to Score High in WASSCE English Objectives
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Keep to 45 seconds a question</h3>
              <p>
                Paper 1 gives you 1 hour for 80 questions. Answer the ones you know at once, mark the hard ones and come back to them before time runs out.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read the whole sentence</h3>
              <p>
                In a gap-filling question, the right word must fit both the grammar and the meaning. Check the subject before choosing a verb, and look for clues such as since, by the time or if that fix the tense.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the vocabulary of each field</h3>
              <p>
                The syllabus lists sixteen fields, from building and fishing to the stock exchange and the human body. Learn the everyday words of each one, the words an educated reader of a newspaper would know.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Trust the sounds, not the spelling</h3>
              <p>
                In the Test of Orals, spelling often misleads: the ea in break is not the ea in bread, and the s in sugar sounds like the c in ocean. Learn the phonetic symbols, the common silent letters and the stress rules for -tion words and for nouns and verbs such as record and object.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          WASSCE English Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="wassceeng" />
        </div>
      </div>

      <SampleQuestionsV2 examId="wassceeng" />

      <ExamRelatedTests examId="wassceeng" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for WASSCE English?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Everything is free. No account required. 270 questions across both objective papers.</p>
          <ExamLandingCTA dashboardHref="/wassce-english/dashboard" />
        </div>
      </div>
    </div>
  );
}
