import "@/lib/v2/banks/ieltsread";
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

const title = "Free IELTS Reading Practice Test 2026 - Academic, Band Score";
const metaDescription =
  "Free IELTS Academic Reading practice: two full 60-minute tests of 3 passages and 40 questions, every question type, 212 original questions and a band score estimate.";
const description =
  "Free IELTS Reading practice tests built like IELTS Academic Reading: three long passages and 40 questions in 60 minutes, with True/False/Not Given, Yes/No/Not Given, matching headings, matching information, matching features and sentence endings, multiple choice and every kind of completion question. 212 original questions on 18 original passages, an explanation on every answer and a band score estimate from your raw score out of 40. Reading only: Listening, Writing and Speaking are not covered.";

const faqs = [
  {
    q: "What is the IELTS Academic Reading test like?",
    a: "IELTS Academic Reading lasts 60 minutes and has 40 questions on three passages, 2,150 to 2,750 words in all. The texts come from books, journals, magazines, newspapers and online sources written for a general audience, and at least one has a detailed argument. On computer the passage and questions sit side by side, you type your answers on screen, and there is no extra time to transfer answers. Each correct answer earns one mark, and wrong answers lose nothing.",
  },
  {
    q: "Does Tigertest cover the whole IELTS test?",
    a: "No. Only the Reading module is modelled. Listening needs recorded audio, and Writing and Speaking are marked by trained examiners, so Tigertest does not practise them and cannot estimate your overall band. The band shown here is for Reading only.",
  },
  {
    q: "How is IELTS Reading scored?",
    a: "Your raw score out of 40 is converted to a band from 1 to 9, in whole or half bands. IDP publishes the average marks needed: for Academic Reading about 23 correct for band 6, 30 for band 7 and 35 for band 8. The exact numbers vary slightly between test versions. Tigertest uses that Academic table to estimate your band, so treat it as a guide rather than an official score.",
  },
  {
    q: "What about IELTS General Training Reading?",
    a: "General Training Reading is also 40 questions in 60 minutes, but its three sections use everyday texts (notices, adverts, timetables), workplace texts and one longer general-interest text, and it needs more correct answers for the same band: about 30 for band 6 and 34 for band 7. The practice tests here use Academic passages. The question types overlap, so the drills still help General Training candidates, but the band estimate is for Academic.",
  },
  {
    q: "Which question types are included?",
    a: "All the Academic Reading types: multiple choice, identifying information (True, False or Not Given), identifying the writer's views (Yes, No or Not Given), matching information, matching headings, matching features, matching sentence endings, sentence completion, summary, note, table and flow-chart completion, diagram label completion and short-answer questions. On the real test you write completion and short answers as words from the passage within a word limit; here you choose the word from a list, which is easier, so expect to do a little better here than on the day. Diagrams are described in words.",
  },
  {
    q: "Is the Tigertest IELTS Reading practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last are free; the completion drill and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. The passages and questions are original practice material, not taken from IELTS or Cambridge books. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "IELTS reading practice test, IELTS academic reading, IELTS reading test, IELTS mock test, IELTS reading band score, true false not given practice, matching headings practice, IELTS reading questions, free IELTS practice, IELTS general training reading",
  alternates: {
    canonical: `${siteUrl}/ielts-reading-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ielts-reading-practice-test`,
    images: [{ url: shareImageUrl("ieltsread"), width: 1200, height: 630, alt: "Tigertest free IELTS Reading practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ieltsread")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free IELTS Reading Practice Test",
      description,
      url: `${siteUrl}/ielts-reading-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ieltsread"),
      featureList: [
        "212 original IELTS Reading practice questions with explanations",
        "2 full Academic Reading tests: 3 passages, 40 questions, 60 minutes",
        "Every question type, from True/False/Not Given to matching headings",
        "A band score estimate from your raw score out of 40",
        "7 drills by question type on 12 more passages",
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
        classFaqJsonLd("ieltsread"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Academic Reading", weight: "3 passages, 40 questions, 60 min" },
  { name: "Listening (not modelled)", weight: "needs audio" },
  { name: "Writing and Speaking (not modelled)", weight: "marked by examiners" },
];

export default function IeltsReadingLandingPage() {
  return (
    <div data-theme="ieltsread" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free IELTS Reading Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ielts-reading/dashboard"
            shortName="IELTS Reading"
            subtitle="Two full Academic Reading tests and 212 original questions, with a band score estimate. Reading only. No account needed."
            shots={{ mobile: "/landing/ieltsread-mobile.png", desktop: "/landing/ieltsread-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ieltsread" />

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
                Seven drills on twelve shorter passages: True/False/Not Given, Yes/No/Not Given, multiple choice, matching headings, matching information, matching features and endings, and completion. Questions you miss come back until you have mastered them.
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
                Two full Academic Reading tests: three passages of rising difficulty and 40 questions on a 60-minute clock, with the passage beside the questions as on the computer test. Practice Test 2 is held out of the drills, so it measures readiness, not memory.
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
                Built Like IELTS Academic Reading
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test has three original passages of about 700 words, from a descriptive history to an argument with a clear point of view, and 40 one-mark questions in the real mix of types. Your raw score out of 40 becomes an estimated band. Only Reading is covered: the other three skills are not part of this practice.
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
                src={getTigerAsset("ieltsread", 1)}
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
            How to Raise Your IELTS Reading Band
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the difference between False and Not Given</h3>
              <p>
                False means the passage says the opposite. Not Given means it says nothing either way, even if the statement sounds likely. Find the part of the passage the statement is about, then ask: does it contradict it, or is the point simply missing? The same rule applies to No and Not Given for the writer&apos;s views.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read headings for the whole paragraph</h3>
              <p>
                A wrong heading often repeats a word or a detail from the paragraph. The right one sums up its main point. Read the first and last sentences, decide what the paragraph is mainly doing, and only then look at the list.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Watch the grammar of a gap</h3>
              <p>
                In completion questions the missing word has to fit the sentence: a plural noun, a verb, an adjective. On the real test you copy words from the passage, so spelling counts and the word limit is strict. Practise finding the exact phrase rather than putting the idea in your own words.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep to about 20 minutes a passage</h3>
              <p>
                The passages get harder and there is no extra time at the end. Skim each passage first, answer the questions you can find quickly, and do not let one difficult question take five minutes. Tigertest shows your accuracy by question type, so drill your weakest type before each full test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          IELTS Reading Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ieltsread" />
        </div>
      </div>

      <SampleQuestionsV2 examId="ieltsread" />

      <ExamRelatedTests examId="ieltsread" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for IELTS Reading?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 212 questions on 18 passages.</p>
          <ExamLandingCTA dashboardHref="/ielts-reading/dashboard" />
        </div>
      </div>
    </div>
  );
}
