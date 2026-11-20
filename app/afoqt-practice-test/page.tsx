import "@/lib/v2/banks/afoqt";
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

const title = "Free AFOQT Practice Test 2026 - Air Force Officer Qualifying Test";
const metaDescription =
  "AFOQT practice tests, free to start: 250 original questions across eight Form T subtests, from Verbal Analogies and Arithmetic Reasoning to Table Reading and Aviation Information, timed at the real pace.";
const description =
  "AFOQT practice tests, free to start, with 250 original questions across eight Form T subtests: Verbal Analogies, Arithmetic Reasoning, Word Knowledge, Math Knowledge, Reading Comprehension, Physical Science, Table Reading and Aviation Information. Two practice tests at about half length and the real pace, five answer choices, an explanation for every answer and a drill for each subtest.";

const faqs = [
  {
    q: "What is on the AFOQT?",
    a: "The AFOQT (Form T) has 12 timed multiple-choice subtests, 516 questions in about five hours with breaks: Verbal Analogies, Arithmetic Reasoning, Word Knowledge, Math Knowledge, Reading Comprehension, Situational Judgment, the Self-Description Inventory (a personality survey that is not graded), Physical Science, Table Reading, Instrument Comprehension, Block Counting and Aviation Information. Every question must be answered to receive results.",
  },
  {
    q: "How is the AFOQT scored?",
    a: "Subtest scores are combined into composites, and each composite is reported as a percentile from 1 to 99 against other test takers, not as percent correct. The Air Force's result areas are Verbal, Quantitative, Academic Aptitude, Pilot, Combat Systems Officer and Air Battle Manager. Air Force ROTC, citing DAFMAN 36-2664, gives the minimums as the 15th percentile on Verbal and the 10th on Quantitative; pilot, CSO and ABM applicants need more. Tigertest shows percent correct for each subtest and never estimates an AFOQT percentile.",
  },
  {
    q: "How many times can I take the AFOQT?",
    a: "The Air Force limits the AFOQT to two attempts, or three with an approved waiver. Air Force ROTC cadets get up to three attempts, at least 90 days apart, and the best composite across attempts becomes the score of record. The test is free; you get a voucher from a recruiter or test control officer and schedule it with Pearson VUE.",
  },
  {
    q: "Which AFOQT subtests are in this practice test?",
    a: "Eight: Verbal Analogies, Arithmetic Reasoning, Word Knowledge, Math Knowledge, Reading Comprehension, Physical Science, Table Reading and Aviation Information, in the Form T order, at about half the real length and the real time per question, with five answer choices. Situational Judgment, Instrument Comprehension and Block Counting are not included (they rely on keyed judgment scenarios or on pictures of instruments and block stacks), and neither is the ungraded Self-Description Inventory. Every question is original, not taken from an Air Force pamphlet or a past test.",
  },
  {
    q: "Is the Tigertest AFOQT practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and six of the eight drills are free; the Table Reading and Aviation Information drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AFOQT practice test, free AFOQT practice test 2026, Air Force Officer Qualifying Test practice, AFOQT Form T, AFOQT table reading practice, AFOQT aviation information, AFOQT verbal analogies, AFROTC AFOQT, OTS AFOQT",
  alternates: {
    canonical: `${siteUrl}/afoqt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/afoqt-practice-test`,
    images: [{ url: shareImageUrl("afoqt"), width: 1200, height: 630, alt: "Tigertest AFOQT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("afoqt")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - AFOQT Practice Test",
      description,
      url: `${siteUrl}/afoqt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("afoqt"),
      featureList: [
        "250 original AFOQT practice questions with explanations",
        "2 practice tests of eight Form T subtests at the real pace",
        "Five answer choices on every question, like the real AFOQT",
        "Table Reading grids and Aviation Information on flight physics",
        "8 drills, one per subtest",
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
        classFaqJsonLd("afoqt"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Verbal Analogies", weight: "12 questions, 4 min" },
  { name: "Arithmetic Reasoning", weight: "12 questions, 14 min" },
  { name: "Word Knowledge", weight: "12 questions, 2.5 min" },
  { name: "Math Knowledge", weight: "12 questions, 11 min" },
  { name: "Reading Comprehension", weight: "12 questions, 12 min" },
  { name: "Physical Science", weight: "10 questions, 5 min" },
  { name: "Table Reading", weight: "20 questions, 3.5 min" },
  { name: "Aviation Information", weight: "10 questions, 4 min" },
];

export default function AfoqtLandingPage() {
  return (
    <div data-theme="afoqt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AFOQT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/afoqt/dashboard"
            shortName="AFOQT"
            subtitle="250 questions across eight AFOQT subtests, at the real pace. Free to start, no account needed."
            shots={{ mobile: "/landing/afoqt-mobile.png", desktop: "/landing/afoqt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="afoqt" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">A Drill for Every Subtest</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills, one per subtest. Arithmetic Reasoning and Math Knowledge open with short lessons on the basics, such as setting up word problems and solving for x. Questions you miss come back until you have mastered them.
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
                Two practice tests of eight subtests in the Form T order, each on its own clock at the real time per question, with the 15-minute break after Reading Comprehension. You see percent correct on every subtest. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on AFOQT Form T
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test has the eight Form T subtests that can be written as text, at about half the real length and the same time per question. The AFOQT&apos;s pace varies a lot: Word Knowledge and Table Reading give you seconds a question, while Arithmetic Reasoning gives you more than a minute. Situational Judgment, Instrument Comprehension and Block Counting are not included.
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
                src={getTigerAsset("afoqt", 3)}
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">We Just Launched</h2>
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
            How to Prepare for the AFOQT
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the composites you need</h3>
              <p>
                Every officer applicant needs the Verbal and Quantitative minimums, but pilot, combat systems officer and air battle manager applicants are also judged on their own rated composites, with higher bars. Ask your recruiter or detachment which composites matter for the job you want, and spend your time there.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Rebuild your math without a calculator</h3>
              <p>
                Arithmetic Reasoning and Math Knowledge are done by hand. Refresh fractions, percents, ratios, rate and time, solving equations, exponents and basic geometry until you can set up a word problem in a few seconds.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Train speed on the fast subtests</h3>
              <p>
                Word Knowledge and Table Reading leave you only seconds a question. Read widely to grow your vocabulary, name the relationship before you look at an analogy&apos;s choices, and drill Table Reading until finding a row and column is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Learn how airplanes fly</h3>
              <p>
                Aviation Information and Physical Science reward plain physics: the four forces, the three axes and the controls that move the aircraft about them, lift and drag, Newton&apos;s laws, work, energy and simple machines. Then take a full practice test and drill the subtest that costs you the most.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AFOQT Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="afoqt" />
        </div>
      </div>

      <SampleQuestionsV2 examId="afoqt" />

      <ExamRelatedTests examId="afoqt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Take On the AFOQT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 250 questions across eight subtests.</p>
          <ExamLandingCTA dashboardHref="/afoqt/dashboard" />
        </div>
      </div>
    </div>
  );
}
