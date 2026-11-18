import "@/lib/v2/banks/vidyagyan";
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

const title = "Free VidyaGyan Class 6 Practice Test";
const metaDescription =
  "160 original English-language Class 4 to 5 skills questions for UP VidyaGyan preparation. Free maths, English, science and text-reasoning drills. Hindi and full entrance-stage simulations excluded.";
const description =
  "Free VidyaGyan Class 6 skills practice: 160 original English-language Class 4 to 5 questions in English language, mathematics, science and general knowledge, and text reasoning, with four drills and two 40-question skills tests. It supports preparation for the UP VidyaGyan entrance process but does not simulate the preliminary or main stage. Hindi is not included.";

const faqs = [
  {
    q: "What does this VidyaGyan practice cover?",
    a: "It offers 160 original Class 4 to 5 skills questions in English: English language, mathematics, science and general knowledge, and text reasoning. There are four topic drills and two 40-question skills tests. All questions and short passages are original, not copied entrance papers.",
  },
  {
    q: "Does it reproduce the preliminary or main entrance exam?",
    a: "No. VidyaGyan has preliminary and main entrance stages. The latest accessible official subject notice, for the 2026-27 main exam, describes Class 4 to 5 language, mathematics, science, general knowledge and aptitude. We did not locate a detailed current-year blueprint. This practice develops supporting skills; the equal topic weights and 60-minute timer are Tigertest choices, not an official stage pattern.",
  },
  {
    q: "Is Hindi included?",
    a: "No. All practice here is in English. Earlier official guidance includes Hindi and English language knowledge, so prepare Hindi separately. Picture-only reasoning, OMR answer-sheet mechanics, interviews and eligibility screening are also outside this practice. Check current instructions with a parent or teacher.",
  },
  {
    q: "What score is needed for admission?",
    a: "This app does not provide a current official admission cutoff. The displayed percentage measures only these skills questions. Choose a study goal from 50% to 90%, then review mistakes with a teacher. Selection depends on the official process and requirements, not a Tigertest score.",
  },
  {
    q: "Are both tests and all drills free?",
    a: "Yes. All 160 questions, four drills and both skills tests are free, with no account required. The second test stays out of the drills for a fresh check. Tigertest is not affiliated with VidyaGyan or the Shiv Nadar Foundation.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "VidyaGyan Class 6 practice test, Vidya Gyan entrance, UP Vidyagyan, English Class 5 skills, Shiv Nadar school preparation",
  alternates: {
    canonical: `${siteUrl}/vidyagyan-class-6-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/vidyagyan-class-6-practice-test`,
    images: [{ url: shareImageUrl("vidyagyan"), width: 1200, height: 630, alt: "Tigertest free VidyaGyan Class 6 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("vidyagyan")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - VidyaGyan Class 6 Skills Practice",
      description,
      url: `${siteUrl}/vidyagyan-class-6-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("vidyagyan", "INR"),
      featureList: [
        "160 original English-language skills questions",
        "Four free drills",
        "Two 40-question skills tests",
        "Instant feedback with explanations",
        "Hindi and full entrance-stage simulations not included",
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
        classFaqJsonLd("vidyagyan"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "English Language", weight: "10 per test", detail: "Words in context, grammar, punctuation and eight independent original reading passages." },
  { name: "Mathematics", weight: "10 per test", detail: "Number operations, fractions, measurement, shapes, time and simple data." },
  { name: "Science and General Knowledge", weight: "10 per test", detail: "Plants, water, materials, observations and community services. No current-affairs questions." },
  { name: "Text Reasoning", weight: "10 per test", detail: "Directions, order, patterns, classification and relationships described in words." },
];

export default function VidyagyanLandingPage() {
  return (
    <div data-theme="vidyagyan" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free VidyaGyan Class 6 Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/vidyagyan/dashboard"
            shortName="VidyaGyan Class 6"
            subtitle="160 original Class 4 to 5 skills questions, all in English. Four free drills and two skills tests. Prepare Hindi separately; this does not simulate either entrance stage."
            shots={{ mobile: "/landing/vidyagyan-mobile.png", desktop: "/landing/vidyagyan-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="vidyagyan" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Build One Skill at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start with a topic drill. Questions you miss return for more practice, and every answer has an explanation you can discuss with a parent or teacher.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Check Your Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each skills test has 40 questions with a chosen 60-minute timer. The second test is held out of drills. These tests measure the skills covered here, not readiness for the complete VidyaGyan selection process.
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
                Four Areas to Practise
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The latest accessible VidyaGyan subject notice names Class 4 to 5 language, mathematics, science, general knowledge and aptitude, but gives no question counts or topic weights. Each skills test here has ten questions in each of four areas; that equal split is a Tigertest choice, not an official blueprint.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                      <span className="text-brand-dark font-semibold">{area.weight}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{area.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("vidyagyan", 1)}
                alt="Tigertest school study tiger"
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
            Study Tips for VidyaGyan Class 6
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the whole question first</h3>
              <p>Read the whole question before choosing an answer.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Show every step in maths</h3>
              <p>Write down each step in a calculation and include the units.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Find the words that prove your answer</h3>
              <p>For reading questions, find the words that support your answer.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep practising Hindi</h3>
              <p>Keep practising Hindi and follow current official guidance with a parent or teacher.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          VidyaGyan Class 6 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="vidyagyan" />
        </div>
      </div>

      <SampleQuestionsV2 examId="vidyagyan" />

      <ExamRelatedTests examId="vidyagyan" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start with a Skills Drill</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Choose English, maths, science or text reasoning. Free, no account required.</p>
          <ExamLandingCTA dashboardHref="/vidyagyan/dashboard" />
        </div>
      </div>
    </div>
  );
}
