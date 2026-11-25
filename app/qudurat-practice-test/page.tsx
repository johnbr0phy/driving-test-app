import "@/lib/v2/banks/qudurat";
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

const title = "Free Qudurat Practice Test 2026 - GAT in English (Qiyas)";
const metaDescription =
  "Free Qudurat (GAT) practice in English: two full 120-question tests in 2 hours 5 minutes, eight drills on analogies, contextual error, reading, arithmetic, geometry, algebra and data, every answer explained.";
const description =
  "Free practice for Qudurat, the General Aptitude Test (GAT) of Qiyas at ETEC, in its English version: 271 original questions written to ETEC's description of the test, with two full practice tests of 120 questions in 2 hours 5 minutes, eight drills on the verbal and quantitative domains and a worked explanation on every answer.";

const faqs = [
  {
    q: "What is on the Qudurat (GAT) test?",
    a: "Qudurat, the General Aptitude Test, is set by Qiyas, the National Center for Assessment at ETEC, and used for admission to universities and colleges in Saudi Arabia. ETEC's Test-Taker's Guide describes 5 sections of 24 multiple-choice questions, 120 in all, in 2 hours and 5 minutes. The verbal section has verbal analogies (17% of the test), sentence completion (7%), contextual error (10%) and reading comprehension (21%). The quantitative section of the Science Tracks version has arithmetic (23%), geometry (10%), algebra (4%) and data analysis (8%), including questions that compare two values.",
  },
  {
    q: "Can I take the GAT in English?",
    a: "Yes. ETEC's guide lists the test language as Arabic and English. This practice test is the English version only: the Arabic GAT is not modelled, because Tigertest does not yet support right-to-left text. The questions follow the English version's question types and weights for the Science Tracks; the Humanities Tracks version, which has no algebra, is not modelled separately.",
  },
  {
    q: "What is a good Qudurat score?",
    a: "There is no pass or fail. The GAT is norm-referenced, so your score shows where you stand among everyone who took it. ETEC publishes this guide: 81 and above is the top 5% of test takers, 78 and above the top 10%, 73 and above the top 20%, 70 and above the top 30%, 65 is average and 60 and below is the bottom 30%. Each university decides what weight the score carries in admission. Tigertest reports percent correct, which cannot be converted into a GAT score.",
  },
  {
    q: "Is a calculator allowed on the GAT?",
    a: "No. ETEC does not allow calculators of any kind in the test room, so the quantitative questions use numbers you can work with by hand: fractions, percentages, powers and roots, ratios and simple geometry. Every quantitative question here is written to be solved without one, and the practice tests have no calculator.",
  },
  {
    q: "Is the Tigertest Qudurat practice test free?",
    a: "Yes. Both practice tests and all eight drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer. Every question is original, written for Tigertest; none is taken from ETEC's sample questions or past tests, and Tigertest is not affiliated with ETEC or Qiyas.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Qudurat practice test, Qudurat test in English, GAT Saudi Arabia, General Aptitude Test Saudi, Qiyas GAT, Qiyas practice test, ETEC GAT, GAT English version, Qudurat verbal and quantitative, Qudurat 2026",
  alternates: {
    canonical: `${siteUrl}/qudurat-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/qudurat-practice-test`,
    images: [{ url: shareImageUrl("qudurat"), width: 1200, height: 630, alt: "Tigertest free Qudurat (GAT) practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("qudurat")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Qudurat (GAT) Practice Test",
      description,
      url: `${siteUrl}/qudurat-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("qudurat", "SAR"),
      featureList: [
        "271 original GAT practice questions in English with explanations",
        "2 full practice tests of 120 questions in 2 hours 5 minutes",
        "Verbal analogies, odd one out, sentence completion, contextual error and reading passages",
        "Arithmetic, geometry, algebra, data analysis and comparison questions, no calculator",
        "8 drills, 7 of them with Basics lessons",
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
        classFaqJsonLd("qudurat"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Verbal analogies and odd one out", weight: "20 Qs (17%)" },
  { name: "Sentence completion", weight: "9 Qs (7%)" },
  { name: "Contextual error", weight: "12 Qs (10%)" },
  { name: "Reading comprehension", weight: "25 Qs (21%)" },
  { name: "Arithmetic", weight: "28 Qs (23%)" },
  { name: "Geometry", weight: "12 Qs (10%)" },
  { name: "Algebra", weight: "5 Qs (4%)" },
  { name: "Data analysis", weight: "9 Qs (8%)" },
];

export default function QuduratLandingPage() {
  return (
    <div data-theme="qudurat" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Qudurat Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/qudurat/dashboard"
            shortName="Qudurat GAT"
            subtitle="Two full 120-question GAT practice tests in English, verbal and quantitative. No account needed."
            shots={{ mobile: "/landing/qudurat-mobile.png", desktop: "/landing/qudurat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="qudurat" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills, one for each domain ETEC lists: verbal analogies, sentence completion, contextual error, reading comprehension, arithmetic, geometry, algebra and data analysis. Seven open with short Basics lessons, and questions you miss come back until you have mastered them.
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
                Two tests of 120 questions in 2 hours 5 minutes, the real length and time: a verbal section in three timed parts and a quantitative section in two, with no going back to a finished part and no calculator. Practice Test 2 is held out of the drills, so its questions are new to you.
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
                Built on ETEC&apos;s GAT Weights
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ETEC weights the verbal domains 17%, 7%, 10% and 21% and, for the Science Tracks, the quantitative domains 23%, 10%, 4% and 8%. Each practice test turns those weights into its 120 questions like this. ETEC does not say how its five sections of 24 divide between verbal and quantitative, so here the verbal questions come first and the quantitative ones second, at the real pace. This is the English version; the Arabic GAT is not modelled.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-right text-brand-dark font-semibold sm:whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("qudurat", 3)}
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
            How to Prepare for Qudurat
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Name the relationship first</h3>
              <p>
                In a verbal analogy, say the link between the first pair in a short sentence (&quot;a feather covers a bird&quot;) before you look at the choices, then test each pair in the same sentence. Most wrong choices share a topic with the question but not its relationship.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Hunt for the clash in contextual error</h3>
              <p>
                The wrong word breaks the logic of the sentence: a cause with the wrong result, a contrast that is not one, or an adjective that disagrees with the rest. Find the words you cannot change, then ask which underlined word fights them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Try special numbers in comparisons</h3>
              <p>
                When a comparison question uses a letter, test zero, one, a fraction and a negative number if the facts allow them. If two allowed values give different answers, the information is insufficient; if every value gives the same answer, choose it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep to the pace</h3>
              <p>
                120 questions in 125 minutes is about a minute each, and a finished section cannot be reopened. Do not let one hard item cost you three easy ones: mark a guess, flag it and come back if time is left in that section.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Qudurat Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="qudurat" />
        </div>
      </div>

      <SampleQuestionsV2 examId="qudurat" />

      <ExamRelatedTests examId="qudurat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Qudurat?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 271 questions across every GAT domain.</p>
          <ExamLandingCTA dashboardHref="/qudurat/dashboard" />
        </div>
      </div>
    </div>
  );
}
