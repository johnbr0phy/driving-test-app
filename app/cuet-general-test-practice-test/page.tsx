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

const title = "Free CUET General Test Mock Test 2026 - GAT Practice";
const metaDescription =
  "Free CUET (UG) General Aptitude Test practice: 202 original questions on general knowledge, mental ability, numerical ability, quantitative and logical reasoning, with two full 50-question, 60-minute tests and an explanation on every answer.";
const description =
  "Free CUET (UG) General Aptitude Test practice with 202 original questions written to the syllabus in the NTA's CUET (UG) 2026 Information Bulletin: general knowledge, general mental ability, numerical ability, quantitative reasoning, and logical and analytical reasoning. Two full practice tests of 50 compulsory questions in 60 minutes, eight topic drills, and a worked explanation on every answer.";

const faqs = [
  {
    q: "What is the CUET General Test pattern?",
    a: "The General Aptitude Test (test code 501) is one of the 37 papers of CUET (UG), the Common University Entrance Test conducted by the National Testing Agency for admission to undergraduate programmes in central and participating universities. Under the CUET (UG) 2026 Information Bulletin, every paper, the General Aptitude Test included, has 50 compulsory multiple-choice questions in 60 minutes and is taken as a computer based test. Its syllabus is general knowledge, current affairs, general mental ability, numerical ability, quantitative reasoning (simple arithmetic, algebra, geometry, mensuration and statistics), and logical and analytical reasoning, and NTA's 2026 syllabus for test 501 adds general science and environment literacy. A candidate may choose up to five papers, including languages and the General Aptitude Test.",
  },
  {
    q: "Is there negative marking in the CUET General Test?",
    a: "Yes. Each right answer earns 5 marks and each wrong answer loses 1 mark, out of 250; an unanswered question scores zero. Because a right answer is worth five times a wrong one, a guess between two options you could not separate still gains marks on average, and even a blind guess among four gains a little. Tigertest practice tests score percent correct and do not deduct marks, so keep count of the questions you guessed.",
  },
  {
    q: "Which universities ask for the CUET General Test?",
    a: "It depends on the university and the course. Some programmes list the General Aptitude Test among the papers they require or accept, while many others ask only for a language and domain subjects. Check the admission rules of each university and course you are applying to before you choose your papers, since NTA conducts the test but the universities set the requirements and cut-offs.",
  },
  {
    q: "Are these the same questions as the real CUET exam?",
    a: "No. These are original practice questions written to the syllabus and pattern in the NTA information bulletin, not questions copied from past papers or the real exam. The general knowledge questions cover static topics such as history, art and culture, geography, the Constitution, the economy and everyday science; the syllabus also lists current affairs, which change every year, so study them separately from a recent source. Reasoning questions are text only, and the questions are in English (the real paper is offered in 13 mediums).",
  },
  {
    q: "Is the Tigertest CUET General Test practice free?",
    a: "Yes. Both practice tests and all eight topic drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CUET general test mock test, CUET general test practice, CUET GAT mock test free, CUET UG general aptitude test, CUET 501 general test, CUET 2026 general test questions, CUET general test syllabus, CUET reasoning questions, CUET quantitative aptitude practice, CUET GK questions",
  alternates: {
    canonical: `${siteUrl}/cuet-general-test-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cuet-general-test-practice-test`,
    images: [{ url: shareImageUrl("cuet"), width: 1200, height: 630, alt: "Tigertest free CUET General Test practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cuet")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CUET General Test Practice",
      description,
      url: `${siteUrl}/cuet-general-test-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "202 original CUET General Aptitude Test practice questions with explanations",
        "2 full practice tests of 50 compulsory questions in 60 minutes",
        "8 topic drills across general knowledge, mental ability, numerical ability, quantitative and logical reasoning",
        "Static GK on history, culture, geography, polity, the economy and science",
        "Negative marking explained, with percent-correct scoring",
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
        classFaqJsonLd("cuet"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "General knowledge (static)", weight: "18 Qs" },
  { name: "General mental ability", weight: "7 Qs" },
  { name: "Numerical ability", weight: "7 Qs" },
  { name: "Quantitative reasoning", weight: "8 Qs" },
  { name: "Logical and analytical reasoning", weight: "10 Qs" },
];

export default function CuetLandingPage() {
  return (
    <div data-theme="cuet" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CUET General Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cuet/dashboard"
            shortName="CUET GAT"
            subtitle="202 original General Aptitude Test questions on GK, reasoning and maths. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cuet-mobile.png", desktop: "/landing/cuet-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cuet" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Topic Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills: three for general knowledge (history and culture, geography and polity, science), one each for general mental ability, numerical ability and quantitative reasoning, and two for reasoning (logical, then analytical). Questions you miss come back until you have mastered them.
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
                Two practice tests of 50 questions in 60 minutes, the real length and time. Move freely and flag questions, as in the computer based test. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the CUET (UG) Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every practice test follows the pattern in the NTA&apos;s CUET (UG) 2026 Information Bulletin: 50 compulsory questions in 60 minutes, 5 marks for each right answer and 1 mark off for each wrong one. NTA does not publish how many questions come from each topic, so the split below is Tigertest&apos;s own, spread across the whole syllabus. Tigertest scores percent correct; for an exam-style score, take five times your right answers and subtract your wrong ones. Questions are in English only, general knowledge is static (no current affairs), and reasoning is text only.
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
                src={getTigerAsset("cuet", 1)}
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
            How to Prepare for the CUET General Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Check that you need it</h3>
              <p>
                Before you spend weeks on it, confirm which of your chosen courses ask for the General Aptitude Test. Each university sets its own paper requirements, and you can choose at most five CUET papers, languages included.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Pace the hour</h3>
              <p>
                Fifty questions in sixty minutes leaves just over a minute each. General knowledge questions take seconds when you know them, so answer them first and give the time you save to the arithmetic, quantitative and arrangement questions. Practise that order in full practice tests so it is automatic on the day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Use the marking to your advantage</h3>
              <p>
                A right answer is worth 5 marks and a wrong one costs only 1, so once you can rule out even one option, an answer is worth more than a blank on average. Still, slow down on the questions you know: a careless slip costs you 6 marks against a right answer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Add current affairs on your own</h3>
              <p>
                The syllabus lists current affairs alongside general knowledge. Tigertest covers static GK only, so read a recent monthly round-up of national and international events, awards, sports and appointments in the months before the exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CUET General Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cuet" />
        </div>
      </div>

      <ExamRelatedTests examId="cuet" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the CUET General Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 202 questions across the whole syllabus.</p>
          <ExamLandingCTA dashboardHref="/cuet/dashboard" />
        </div>
      </div>
    </div>
  );
}
