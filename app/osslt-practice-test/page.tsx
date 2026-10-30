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

const title = "Free OSSLT Practice Test 2026 - Ontario Literacy Test";
const metaDescription =
  "Free OSSLT practice for Grade 10: two practice tests with the four reading forms (information paragraph, news report, dialogue, real-life narrative) and the writing questions, plus drills that teach the basics first.";
const description =
  "Free practice for the Ontario Secondary School Literacy Test (OSSLT), the literacy graduation requirement most Ontario students write in Grade 10. Two practice tests follow the EQAO blueprint: 23 reading questions on an information paragraph, a news report, a dialogue and a real-life narrative, and 12 writing questions on main idea, organization and conventions. Four drills open with short lessons on main idea, inference, topic sentences, transitions, commas and apostrophes. Original Canadian passages, free, with no account needed.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "osslt practice test, osslt practice, ontario literacy test, ontario secondary school literacy test, eqao osslt, grade 10 literacy test, osslt sample questions, osslt reading, osslt writing, osslc, literacy test ontario",
  alternates: {
    canonical: `${siteUrl}/osslt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/osslt-practice-test`,
    images: [{ url: "/og/osslt", width: 1200, height: 630, alt: "Tigertest free OSSLT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/osslt"],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the OSSLT?",
    a: "The Ontario Secondary School Literacy Test is EQAO's provincial reading and writing test. Students working toward the Ontario Secondary School Diploma normally write it for the first time in Grade 10, and a successful result (or the literacy course) is a graduation requirement. It checks the reading and writing skills expected across all subjects up to the end of Grade 9.",
  },
  {
    q: "What is on the OSSLT?",
    a: "The test is taken online in two sessions. It has 37 scored questions: 35 selected-response questions and two written answers. Reading has four selections (an information paragraph, a news report, a dialogue and a real-life narrative) with 23 questions and one written answer. Writing has 12 selected-response questions on developing a main idea, organizing ideas and conventions, plus an opinion essay. Some extra field-test questions do not count.",
  },
  {
    q: "How long is the OSSLT?",
    a: "EQAO designs Session A to take about 65 minutes and Session B about 75 minutes. Students finish each session in one sitting, and the two can be written back to back with a short break or on different days.",
  },
  {
    q: "What score do you need to pass the OSSLT?",
    a: "Results are reported as successful or not yet successful, with a scale score from 200 to 400. A score of 300 or more is successful. The score is not points out of 400 or a percent; EQAO works it out from all of your answers, including the two written ones. Tigertest scores the multiple-choice questions as a percent, and our estimate is that about 75% on both practice tests means you are on track.",
  },
  {
    q: "What happens if I am not successful on the OSSLT?",
    a: "You can write it again at a later sitting. Once you have had two opportunities and were unsuccessful at least once, you can take the Ontario Secondary School Literacy Course (OSSLC) instead, and passing that course meets the literacy requirement. A principal can allow the course earlier when it is in the student's best interest.",
  },
  {
    q: "Does Tigertest practise the opinion essay and the written answer?",
    a: "No. Tigertest covers the 35 selected-response questions: all four reading forms and the three writing skills. The opinion essay and the short written answer on the news report are scored by trained Ontario teachers on the real test, so practise those with your English teacher and use the drills here to build the reading and writing skills behind them.",
  },
  {
    q: "Is it free?",
    a: "Yes. Both practice tests, all four drills and the basics lessons are free, with no account needed. An account saves your progress across a phone and a computer.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free OSSLT Practice Test",
      description,
      url: `${siteUrl}/osslt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "Two practice tests of 35 questions following the EQAO OSSLT blueprint",
        "Information paragraphs, news reports, dialogues and real-life narratives",
        "Writing questions on main idea, organization, spelling, grammar and punctuation",
        "Four drills that open with short lessons on the basics",
        "Original passages set in Canada, with Canadian spelling",
        "Every missed question comes back until it is mastered",
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
        classFaqJsonLd("osslt"),
      ],
    },
  ],
};

const blueprint = [
  { name: "Information paragraph", part: "Reading", count: "6 questions" },
  { name: "News report", part: "Reading", count: "5 questions" },
  { name: "Dialogue", part: "Reading", count: "5 questions" },
  { name: "Real-life narrative", part: "Reading", count: "7 questions" },
  { name: "Main idea, organization, conventions", part: "Writing", count: "12 questions" },
];

export default function OssltLandingPage() {
  return (
    <div data-theme="osslt" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free OSSLT Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/osslt/dashboard"
            shortName="OSSLT"
            subtitle="Practise for the Ontario Grade 10 literacy test: the four reading forms and the writing questions in two practice tests, plus drills that teach the basics first. Free, no account needed."
            shots={{ mobile: "/landing/osslt-mobile.png", desktop: "/landing/osslt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="osslt" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills on Your Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four drills: information and news, stories and dialogues, main idea and organization, and spelling, grammar and punctuation. Each opens with short lessons on one skill at a time, like finding the main idea or fixing a run-on sentence, then 20 test-level questions. Every miss comes back until you get it.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests Online</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two practice tests of 35 questions, like the selected-response part of the real OSSLT: the passage beside its questions, a clock, flag for review, and the choose-two, dropdown, tap-the-sentence and put-in-order questions the online test uses. Practice Test 2 never appears in the drills, so it is an honest check.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Built on the EQAO Blueprint</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test has the same reading selections and question counts as the scored part of the real test. The passages are original, written for Grade 10 and set in Canada. The opinion essay and the written answer on the news report are not included.
              </p>
              <div className="space-y-3">
                {blueprint.map((b) => (
                  <div key={b.name} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{b.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{b.part}</span>
                    </span>
                    <span className="text-brand-dark font-semibold text-right text-sm md:text-base">{b.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("osslt", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach Grade 10 English or the OSSLC?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Set it as practice for free: share one link, students join with just their name, and you see who practised, their test scores and the reading forms and writing skills your class misses most.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a class at tigertest.io/teach
          </Link>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Get Ready for the OSSLT</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the four reading forms</h3>
              <p>
                Every OSSLT has an information paragraph, a news report, a dialogue and a real-life narrative. Each is read a little differently: a news report puts the key facts first, a dialogue shows feelings through what people say, and a narrative builds to a change in the main character. The drills give you plenty of each.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Go back to the text</h3>
              <p>
                Some questions ask for something stated in the passage, and some ask what it suggests. Either way, the answer has to be supported by the text. Before you choose, find the sentence that proves it, and be wary of answers that sound right but are not in the passage.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the few rules that come up most</h3>
              <p>
                The writing questions keep returning to the same skills: a topic sentence that covers the whole paragraph, the sentence that does not belong, transition words, run-on sentences, apostrophes and commonly confused words. Each is a short lesson in the drills.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Take a practice test, then the real practice test</h3>
              <p>
                Take Practice Test 1 to see where you stand, work on your weakest drill, then take Practice Test 2. EQAO also has its own online practice test with the real test&apos;s screens; try it before test day so nothing about the format surprises you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">OSSLT Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="osslt" />
        </div>
      </div>

      <ExamRelatedTests examId="osslt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account needed. Two practice tests, four drills and the basics.</p>
          <ExamLandingCTA dashboardHref="/osslt/dashboard" />
        </div>
      </div>
    </div>
  );
}
