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

const title = "Free ACT Practice Test 2026 - Full-Length & Timed";
const metaDescription =
  "Free full-length ACT practice test in the enhanced format: English, Math, Reading and Science, timed by section, with a 1-36 score estimate and skill drills.";
const description =
  "A free full-length ACT practice test in the enhanced 2025 format: English, Math, Reading and Science with real passages and section timing, four answer choices, and a 1 to 36 score estimate with a composite. Eleven skill drills, one per ACT reporting category and sized for your phone, bring every miss back until you master it. Both practice tests and every drill are free.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ACT practice test, free ACT practice test, full length ACT practice test, enhanced ACT practice, ACT English practice, ACT math practice, ACT reading practice, ACT science practice, ACT score calculator, ACT prep 2026",
  alternates: {
    canonical: `${siteUrl}/act-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/act-practice-test`,
    images: [{ url: shareImageUrl("act"), width: 1200, height: 630, alt: "Tigertest free ACT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("act")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the enhanced ACT?",
    a: "Since 2025 the ACT has English (50 questions, 35 minutes), Math (45 questions, 50 minutes) and Reading (36 questions, 40 minutes), with Science (40 questions, 40 minutes) and Writing optional. Every question has four answer choices. The Tigertest practice test uses the same sections, counts and timing, with Science included.",
  },
  {
    q: "How is the ACT scored?",
    a: "Each section is scaled from 1 to 36. The composite is the average of English, Math and Reading, rounded. If you take Science, it is reported separately and combined with Math into a STEM score. Tigertest converts your correct answers to an estimated section score with a typical conversion. It is an estimate, not an official score.",
  },
  {
    q: "Can I use a calculator on the ACT?",
    a: "Yes, on the whole Math section, as long as it is a permitted model. No calculator is needed or allowed on the other sections. The Tigertest practice test has a calculator one tap away on every Math question.",
  },
  {
    q: "What is a good ACT score?",
    a: "The national average composite is around 20. A 24 is above average and opens most state universities, a 28 is roughly the top 10 percent, and a 30 or higher is competitive for the most selective schools and many scholarships. Set the score your target colleges expect as your goal on the dashboard.",
  },
  {
    q: "Why are there two practice tests?",
    a: "Take Practice Test 1 cold for a baseline, drill for a week or two, then take Practice Test 2. Test 2 is held out of the drills, so none of its passages or questions appear anywhere else on Tigertest. That makes it a clean measure of what you have learned, not of what you remember.",
  },
  {
    q: "Is this an official ACT practice test?",
    a: "No. Every passage and question is original, written to the published enhanced ACT specifications for content, question types, timing and difficulty. Tigertest is not affiliated with or endorsed by ACT, Inc. Use it alongside the free official practice test from ACT.",
  },
  {
    q: "Is the Tigertest ACT practice test free?",
    a: "Yes, all of it. Both full-length practice tests, their scores and every explanation, all eleven skill drills and your stats page are free with no account required and no paywall.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ACT Practice Test",
      description,
      url: `${siteUrl}/act-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Two full-length ACT practice tests in the enhanced 2025 format, 171 questions each",
        "Real section timing with a break after Math",
        "Passages beside the question for English, Reading and Science",
        "Estimated section scores on the 1 to 36 scale and a composite",
        "Eleven mastery drills, one per ACT reporting category, with more than 300 questions",
        "Practice Test 2 held out of the drills for a clean score",
        "Explanations for every question",
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
        classFaqJsonLd("act"),
      ],
    },
  ],
};

const sections = [
  { name: "English", detail: "50 questions · 35 min", weight: "Composite" },
  { name: "Mathematics", detail: "45 questions · 50 min · calculator", weight: "Composite" },
  { name: "Reading", detail: "36 questions · 40 min", weight: "Composite" },
  { name: "Science", detail: "40 questions · 40 min", weight: "Reported separately" },
];

export default function ActLandingPage() {
  return (
    <div data-theme="act" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ACT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/act/dashboard"
            shortName="ACT"
            subtitle="Two full-length enhanced ACTs with real passages, section timing and a 1 to 36 score estimate, plus eleven skill drills built for your phone. Both are free, no account needed."
            shots={{ mobile: "/landing/act-mobile.png", desktop: "/landing/act-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="act" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Skill Drills on Your Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eleven drills, one per ACT reporting category from Conventions of Standard English to Evaluation of Models, with more than 300 questions. The passage sits above the question, one tap checks each answer, the explanation appears right away, and every miss comes back until you have mastered it.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Tests on a Computer</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two full-length tests: English, Math, Reading and Science in order with the real clocks, a calculator on Math, a break after it, flag for review and an answer eliminator. Finish with section scores, a composite, and a plan for what to drill next. Test 2 never appears in the drills, so it stays a clean measure.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Built on the Enhanced ACT</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The 2025 ACT is shorter, every question has four choices, and Science is optional. The practice test matches the new counts and timing section for section, and each section reports the same skill areas ACT does, so your results show where the points are.
              </p>
              <div className="space-y-3">
                {sections.map((s) => (
                  <div key={s.name} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{s.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{s.detail}</span>
                    </span>
                    <span className="text-brand-dark font-semibold text-sm">{s.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("act", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Raise Your ACT Score</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Pace is the whole game</h3>
              <p>
                The ACT gives you less than a minute a question in every section. Learn the pace in the drills, then hold it on the full test: 42 seconds on English, about a minute on Math, 65 seconds on Reading. Skip, flag and come back rather than sinking three minutes into one question.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the English rules, not the passages</h3>
              <p>
                More than half of English is punctuation and grammar that repeats: commas around nonessential clauses, apostrophes, subject-verb agreement, parallel structure. The English drill brings each rule back until it is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the question first on Science</h3>
              <p>
                Science is reading tables and graphs, not remembering chemistry. Go to the question, find the table it points to, and read only what it asks for. Save the conflicting-viewpoints passage for last; it takes the most reading.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Take the full test under real conditions</h3>
              <p>
                Sit all four sections in one go on a computer with the timer on. Then review every miss, drill the weakest skill, and retake. There is no penalty for guessing, so never leave a question blank.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">ACT Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="act" />
        </div>
      </div>

      <ExamRelatedTests examId="act" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Hit Your ACT Goal?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free, no account required. Two full-length tests and all eleven skill drills.</p>
          <ExamLandingCTA dashboardHref="/act/dashboard" />
        </div>
      </div>
    </div>
  );
}
