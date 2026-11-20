import "@/lib/v2/banks/staarbio";
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

const title = "Free STAAR Biology Practice Test 2027 - Texas EOC";
const metaDescription =
  "Free STAAR Biology practice tests on TEA's 2026 blueprint: all four strands, cluster sets with data tables, untimed like the real EOC, 202 original questions.";
const description =
  "Free STAAR Biology practice tests built on the Texas Education Agency's Biology STAAR Blueprint, effective beginning with the Spring 2026 administration: two untimed 35-question tests across all four strands, with cluster sets that share a scenario and data table, multiselect questions, and nine drills, one for each group of tested standards. 202 original questions, each with an explanation.";

const faqs = [
  {
    q: "What is on the STAAR Biology test?",
    a: "The STAAR Biology end-of-course test has 33 to 35 questions worth 40 points in four strands: Biological Structures, Functions, and Processes (12 to 14 questions), Mechanisms of Genetics (7 to 9), Biological Evolution (7 to 9), and Interdependence within Environmental Systems (5 to 7). The questions cover the Biology TEKS that TEA lists as eligible for assessment, from biomolecules, cells and viruses to genetic crosses, natural selection and ecosystems. Sub-scores are not reported for the strands.",
  },
  {
    q: "What kinds of questions are on STAAR Biology?",
    a: "Besides multiple choice, the test uses multiselect, drag and drop, hot spot, inline choice, match table grid, multipart, text entry and short constructed response questions. 26 to 30 questions are worth one point and 5 to 7 are worth two points. Some questions come in cluster sets: a scenario with a graphic or data display followed by 3 to 5 questions, each scored on its own.",
  },
  {
    q: "How long is the STAAR Biology test, and can I use a calculator?",
    a: "There is no fixed time limit. TEA expects students to finish in about three to four hours; a student who needs more time may keep working until the end of the school day, up to seven hours, and the test must be finished the same day. A calculator is required for Biology: the online test has a built-in calculator tool, and an allowed handheld calculator may also be used.",
  },
  {
    q: "What score do I need on STAAR Biology?",
    a: "STAAR reports a scale score and a performance level. On the Spring 2026 Biology test, Approaches Grade Level started at a scale score of 3550 (10 of 40 raw points on that form), Meets Grade Level at 4000 (17 points) and Masters Grade Level at 4570 (26 points). The raw points needed can change from one test form to the next, so check the conversion table TEA publishes for your administration.",
  },
  {
    q: "Is the Tigertest STAAR Biology practice test like the real one?",
    a: "It follows TEA's 2026 blueprint: each practice test has 35 questions split across the four strands like the real test, three cluster sets with data tables, and no clock. It uses multiple choice and choose-two questions only, every question is worth one point, and figures are described in words or tables, so your result is a percent correct, not a scale score. The questions are original. Tigertest is not affiliated with the Texas Education Agency. Under House Bill 8, TEA plans to replace STAAR with a new assessment program beginning in the 2027-28 school year.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "STAAR Biology practice test, free STAAR Biology practice test, Biology EOC practice test, Texas Biology EOC, STAAR Biology 2027, STAAR Bio practice, Biology STAAR review, STAAR EOC Biology questions",
  alternates: {
    canonical: `${siteUrl}/staar-biology-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/staar-biology-practice-test`,
    images: [{ url: shareImageUrl("staarbio"), width: 1200, height: 630, alt: "Tigertest free STAAR Biology practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("staarbio")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free STAAR Biology Practice Test",
      description,
      url: `${siteUrl}/staar-biology-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("staarbio"),
      featureList: [
        "202 original STAAR Biology practice questions with explanations",
        "2 full untimed practice tests of 35 questions",
        "All four strands of TEA's 2026 blueprint, weighted like the real test",
        "Cluster sets that share a scenario and data table",
        "Built-in calculator, like the real test",
        "9 drills, one per group of tested standards, and a score by topic after every test",
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
        classFaqJsonLd("staarbio"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Biological Structures, Functions, and Processes", weight: "12-14 questions" },
  { name: "Mechanisms of Genetics", weight: "7-9 questions" },
  { name: "Biological Evolution", weight: "7-9 questions" },
  { name: "Interdependence within Environmental Systems", weight: "5-7 questions" },
];

export default function StaarBiologyLandingPage() {
  return (
    <div data-theme="staarbio" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free STAAR Biology Practice Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/staar-biology/dashboard"
            shortName="STAAR Biology"
            subtitle="202 questions on all four strands of the STAAR Biology EOC. Free, tuned for mobile, no account needed."
            shots={{ mobile: "/landing/staarbio-mobile.png", desktop: "/landing/staarbio-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="staarbio" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nine drills, one for each group of tested Biology standards. Questions you miss come back until you have mastered them, so a weak topic gets the practice it needs.
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
                Two full practice tests of 35 questions with no clock, like the real test, a built-in calculator and a score by topic at the end. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Weighted Like the Real Test
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                TEA&apos;s blueprint gives each strand a range of questions, shown below. Every Tigertest practice test takes the middle of each range, 13, 8, 8 and 6 questions, and includes three cluster sets of three or four questions that share a scenario and data table.
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
                src={getTigerAsset("staarbio", 3)}
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
            How to Raise Your STAAR Biology Score
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the scenario before the questions</h3>
              <p>
                In a cluster set, every question comes back to one scenario. Before you answer, say what was changed, what was measured and what the data table shows in one sentence. The questions in the set usually ask about exactly those things.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the processes, not just the words</h3>
              <p>
                Many questions ask what happens next or why: why an enzyme slows down when heated, why a frameshift changes a protein more than a substitution, why fewer predators can mean fewer trees. Say the cause and effect in your own words, then why the closest wrong answer fails.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice Punnett squares and the 10% rule</h3>
              <p>
                Expect monohybrid and dihybrid crosses with incomplete dominance, codominance, multiple alleles and sex-linked traits, and energy passed up a food chain. Work each kind until it is quick, and use the calculator for the arithmetic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question and use your time</h3>
              <p>
                There is no clock, so read slowly, check each data table twice and flag anything you are unsure of. Structures, Functions, and Processes has the most questions, so drill its four topics first if they are weak.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          STAAR Biology Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="staarbio" />
        </div>
      </div>

      <SampleQuestionsV2 examId="staarbio" />

      <ExamRelatedTests examId="staarbio" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for STAAR Biology?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free, with no account required. 202 questions across all four strands.</p>
          <ExamLandingCTA dashboardHref="/staar-biology/dashboard" />
        </div>
      </div>
    </div>
  );
}
