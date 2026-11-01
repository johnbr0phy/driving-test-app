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

const title = "Free JAMB Use of English Practice Test 2026 - UTME CBT";
const metaDescription =
  "Free JAMB UTME Use of English practice: 200 original questions on comprehension, cloze, lexis and structure and oral forms, with 60-question timed tests. Every answer explained.";
const description =
  "Free JAMB UTME Use of English practice with 200 original questions on the syllabus: comprehension passages, cloze tests, sentence interpretation, synonyms and antonyms, sentence completion and oral forms. Two full 60-question practice tests in 40 minutes, six drills and an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are in JAMB Use of English?",
    a: "Use of English is the compulsory UTME subject and has 60 questions, while each of your other three subjects has 40, so the whole UTME is 180 questions in 2 hours on a computer. Each subject is scored out of 100, giving a total out of 400. Tigertest practice tests have the full 60 Use of English questions in 40 minutes, which is English's share of the 2 hours if you split the time by questions.",
  },
  {
    q: "What topics does the Use of English syllabus cover?",
    a: "The JAMB syllabus has three sections: Comprehension and Summary (passages, a cloze passage and the prescribed reading text), Lexis and Structure (synonyms, antonyms, sentence interpretation, idioms, concord, tenses, question tags, punctuation and spelling) and Oral Forms (vowels, consonants, rhymes, word stress, emphatic stress and intonation). Guides say the paper has about 25 comprehension, 25 lexis and structure and 10 oral forms questions.",
  },
  {
    q: "Does Tigertest include questions on the JAMB novel?",
    a: "No. JAMB names a prescribed reading text for each UTME cycle (guides list The Lekki Headmaster by Kabir Alabi Garba for 2026), and guides say about 10 questions come from it. The text changes and is copyrighted, so Tigertest replaces those questions with two extra original comprehension passages. Read the current prescribed text yourself and check JAMB's brochure for the cycle you are writing.",
  },
  {
    q: "What score do I need in the UTME?",
    a: "Your UTME score is your total across four subjects, out of 400. JAMB sets minimum scores each year; for 2026 admissions it set 150 for universities and 100 for polytechnics and colleges of education. Many institutions and competitive courses ask for much more, so check the cut-off mark for your course. A strong Use of English score helps every course, since English is part of every candidate's total.",
  },
  {
    q: "Are these real JAMB past questions?",
    a: "No. These are original practice questions written to the JAMB Use of English syllabus, not JAMB past questions. The passages are new, set in Nigeria, and the lexis, structure and oral forms questions follow the real question types in standard British English. Both practice tests and all six drills are free, with no account required. Tigertest is not affiliated with or endorsed by JAMB.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "JAMB Use of English practice test, JAMB English past questions alternative, UTME English practice, JAMB CBT practice English, JAMB English 2026, JAMB oral English questions, JAMB lexis and structure, JAMB comprehension practice, JAMB cloze test",
  alternates: {
    canonical: `${siteUrl}/jamb-use-of-english-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/jamb-use-of-english-practice-test`,
    images: [{ url: shareImageUrl("jambeng"), width: 1200, height: 630, alt: "Tigertest free JAMB Use of English practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("jambeng")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free JAMB Use of English Practice Test",
      description,
      url: `${siteUrl}/jamb-use-of-english-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      featureList: [
        "200 original JAMB Use of English practice questions with explanations",
        "2 full 60-question practice tests in 40 minutes",
        "6 drills: comprehension, cloze, sentence interpretation, synonyms and antonyms, sentence completion, oral forms",
        "Original Nigerian comprehension and cloze passages",
        "Oral forms on vowels, consonants, stress and intonation",
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
        classFaqJsonLd("jambeng"),
      ],
    },
  ],
};

const sections = [
  { name: "Comprehension passages", detail: "15 questions" },
  { name: "Cloze test", detail: "10 questions" },
  { name: "Sentence interpretation", detail: "5 questions" },
  { name: "Synonyms and antonyms", detail: "10 questions" },
  { name: "Sentence completion", detail: "10 questions" },
  { name: "Oral forms", detail: "10 questions" },
];

export default function JambUseOfEnglishLandingPage() {
  return (
    <div data-theme="jambeng" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free JAMB Use of English Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/jamb-use-of-english/dashboard"
            shortName="JAMB English"
            subtitle="200 original questions on comprehension, lexis and structure and oral forms, with full 60-question timed tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/jambeng-mobile.png", desktop: "/landing/jambeng-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="jambeng" />

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
                Six drills, one for each part of the paper: comprehension, cloze, sentence interpretation, synonyms and antonyms, sentence completion and oral forms. Questions you miss come back until you have mastered them.
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
                Two 60-question practice tests in 40 minutes, with free movement between questions and flags like the real CBT. Practice Test 2 is held out of the drills, so it measures how ready you are.
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
                Built on the JAMB Use of English Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every practice test has 60 four-option questions across the three syllabus sections: Comprehension and Summary, Lexis and Structure, and Oral Forms. The prescribed reading text is not modelled; its share goes to two more original passages. Your score is out of 100, like the UTME subject score.
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
                src={getTigerAsset("jambeng", 1)}
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
            How to Score High in JAMB Use of English
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Budget your 2 hours</h3>
              <p>
                The UTME gives you 2 hours for all four subjects, and English has the most questions. Plan about 40 minutes for its 60 questions, then move on. Lexis, structure and oral forms are quick, so they buy time for the passages.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read the questions before the passage</h3>
              <p>
                Look at the five questions on a passage first, then read it once with them in mind. For the cloze test, read the whole passage before filling any gap: the right word must fit the grammar of the sentence and the meaning of the paragraph.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the sounds, not just the spellings</h3>
              <p>
                Oral forms questions are judged by standard British pronunciation, so spelling often misleads: the o in women sounds like the i in sit. Learn the vowel and consonant sounds, the common silent letters and the stress rules for -tion words and for nouns and verbs such as record.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                Guides agree that the UTME takes nothing off for a wrong answer, so never leave a question blank. Flag the hard ones, finish the rest, then come back. Read the prescribed text for your cycle too: Tigertest does not cover it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          JAMB Use of English Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="jambeng" />
        </div>
      </div>

      <ExamRelatedTests examId="jambeng" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for JAMB Use of English?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across the whole syllabus.</p>
          <ExamLandingCTA dashboardHref="/jamb-use-of-english/dashboard" />
        </div>
      </div>
    </div>
  );
}
