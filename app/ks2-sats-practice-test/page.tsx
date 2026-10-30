import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free KS2 SATs Practice Test - Year 6 Reading, GPS and Maths";
const metaDescription =
  "Free Year 6 SATs practice: English reading, grammar, punctuation and vocabulary, arithmetic and reasoning, with short lessons before each drill and two practice tests with estimated scaled scores.";
const description =
  "Free KS2 SATs practice for Year 6 in England. Five drills cover reading, grammar and vocabulary, punctuation, arithmetic and reasoning, and each one starts with short click-through lessons on the skills the questions need: inference, relative clauses, fronted adverbials, long multiplication, short division, fractions of amounts and more. Two practice tests follow the real papers (reading, grammar and punctuation Paper 1, maths Papers 1, 2 and 3) at about 60% of the length, with an estimated scaled score from 80 to 120 for each subject. Every missed question comes back until it is learned. Free, with no account needed.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "KS2 SATs practice, Year 6 SATs, SATs practice test, KS2 reading test, KS2 SPaG test, GPS test practice, KS2 arithmetic test, KS2 reasoning practice, SATs revision, key stage 2 tests, scaled score 100, Year 6 maths",
  alternates: {
    canonical: `${siteUrl}/ks2-sats-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ks2-sats-practice-test`,
    images: [{ url: "/og/ks2", width: 1200, height: 630, alt: "Tigertest free KS2 SATs practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/ks2"],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What are the KS2 SATs?",
    a: "They are the national curriculum tests every Year 6 pupil in England takes at school in May. There are three subjects: English reading (one paper, 60 minutes), English grammar, punctuation and spelling (a 45-minute question paper and a short spelling test) and mathematics (an arithmetic paper of 30 minutes and two reasoning papers of 40 minutes each). Calculators are not allowed. Writing is assessed by the teacher instead of a test.",
  },
  {
    q: "What is a scaled score, and what is the expected standard?",
    a: "Each subject's raw mark is turned into a scaled score from 80 to 120. A scaled score of 100 or more means a child has met the expected standard, and 110 or more is reported as a high score. The number of marks needed for 100 changes a little each year; in 2026 it was 25 out of 50 in reading, 34 out of 70 in grammar, punctuation and spelling, and 56 out of 110 in maths.",
  },
  {
    q: "How close are these practice tests to the real SATs?",
    a: "They follow the same papers, question types and topic weightings as the official test frameworks, but each practice test is about 60% of the real length, with the time cut in proportion: 24 reading questions on three texts in 40 minutes, 30 grammar and punctuation questions in 27 minutes, and 44 maths questions across an arithmetic paper and two reasoning papers. The scaled score shown is our estimate, not an official result. The spelling test, which the teacher reads aloud, is not included.",
  },
  {
    q: "What are the lessons before each drill?",
    a: "Short click-through lessons on one skill at a time: finding answers in a text, inference, words in context, word classes, relative clauses, active and passive, the subjunctive, fronted adverbials, apostrophes, inverted commas, brackets, BODMAS, long multiplication, short division, adding fractions, percentages, fractions of amounts, ratio, angles and time. Each lesson asks the child to supply every step, then checks it with two quick questions. A missed drill question offers the matching lesson again.",
  },
  {
    q: "When should my child start practising?",
    a: "Most Year 6 classes revise for the SATs from January to May. Short, regular practice works best: one drill of 20 questions takes about 15 minutes. Start with the drills, which teach the basics first, and save the practice tests for later, ideally Practice Test 1 a few months before the SATs and Practice Test 2 in the last few weeks.",
  },
  {
    q: "Is it free?",
    a: "Yes, all of it: every lesson, drill and both practice tests, with no account needed. An account saves progress across devices, so a child can practise on a laptop at home and a tablet at a grandparent's.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free KS2 SATs Practice",
      description,
      url: `${siteUrl}/ks2-sats-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "English reading with stories, information texts and poems",
        "Grammar, punctuation and vocabulary questions like Paper 1",
        "Maths arithmetic and reasoning papers, no calculator",
        "Short click-through lessons before every drill",
        "Two practice tests with estimated scaled scores from 80 to 120",
        "Every missed question comes back until it is learned",
        "Free class dashboards for teachers",
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
        classFaqJsonLd("ks2"),
      ],
    },
  ],
};

const papers = [
  { name: "English reading", real: "50 marks · 60 min", here: "24 questions · 40 min" },
  { name: "Grammar, punctuation and spelling (Paper 1)", real: "50 marks · 45 min", here: "30 questions · 27 min" },
  { name: "Maths Paper 1: arithmetic", real: "40 marks · 30 min", here: "20 questions · 17 min" },
  { name: "Maths Papers 2 and 3: reasoning", real: "35 marks · 40 min each", here: "12 questions · 20 min each" },
];

export default function Ks2SatsLandingPage() {
  return (
    <div data-theme="ks2" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free KS2 SATs Practice
          </h1>
          <ExamLandingHero
            dashboardHref="/ks2-sats/dashboard"
            shortName="KS2 SATs"
            subtitle="Year 6 reading, grammar, punctuation and maths. A short lesson before every drill, then two practice tests with an estimated scaled score for each subject. Free, no account needed."
            shots={{ mobile: "/landing/ks2-mobile.png", desktop: "/landing/ks2-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ks2" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Lessons, Then Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five drills: reading, grammar and vocabulary, punctuation, arithmetic and reasoning. Each starts with short lessons your child taps through, like fronted adverbials or long multiplication, then 20 questions from easy to hard. Every miss comes back until it is learned.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Two Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each test has the same papers as the real SATs, timed and in the same order, at about 60% of the length. Results show an estimated scaled score for reading, grammar and maths, where 100 is the expected standard. Practice Test 2 never appears in the drills.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The papers */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">The Same Papers as the Real SATs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Topics and weightings follow the Standards and Testing Agency&apos;s key stage 2 test frameworks. No calculator, just like the real thing.
              </p>
              <div className="space-y-3">
                {papers.map((p) => (
                  <div key={p.name} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{p.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">Real test: {p.real}</span>
                    </span>
                    <span className="text-brand-dark font-semibold text-right text-sm md:text-base">{p.here}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("ks2", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach a Year 6 Class?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Set SATs practice as homework for free: share one link, children join with just their first name, and you see who practised, their estimated scaled scores and the skills your class finds hardest.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a class at tigertest.io/teach
          </Link>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Prepare for the KS2 SATs</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the words in the questions</h3>
              <p>
                Grammar questions use the terms children learn at school: relative clause, fronted adverbial, subordinate clause, determiner, passive. A child who knows the words can answer the question; the lessons before the grammar and punctuation drills teach them one at a time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Find the evidence in reading</h3>
              <p>
                Most reading marks come from finding information and making inferences. For every answer, a child should be able to point to the words in the text that prove it. That habit is what the reading lessons practise.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Get written methods secure for arithmetic</h3>
              <p>
                The arithmetic paper is quick marks for a child who can do column addition and subtraction, short division, long multiplication and fractions without slips. Practise the method until it is automatic, then check answers with the inverse.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Little and often</h3>
              <p>
                Fifteen minutes a few times a week beats a long session the weekend before. A drill is 20 questions and the missed ones come back, so each session ends on the questions that need it most.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">KS2 SATs Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ks2" />
        </div>
      </div>

      <ExamRelatedTests examId="ks2" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account needed. Start with a reading lesson.</p>
          <ExamLandingCTA dashboardHref="/ks2-sats/dashboard" />
        </div>
      </div>
    </div>
  );
}
