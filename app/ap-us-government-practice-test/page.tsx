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

const title = "Free AP US Government Practice Test 2027 - AP Gov Multiple Choice";
const metaDescription =
  "Free AP Gov practice tests: 55 multiple-choice questions in 80 minutes, all five units, required cases and documents, 201 original questions with explanations.";
const description =
  "Free AP U.S. Government and Politics practice tests built like Section I of the AP U.S. Government and Politics Exam: 55 multiple-choice questions with four choices in 80 minutes, about 30 on their own and the rest in sets on data tables, foundational documents, practice texts and visuals. 201 original questions, each with an explanation, covering all five units, the required Supreme Court cases and the foundational documents, including the four added for 2026-27, plus seven drills that bring missed questions back until you master them.";

const faqs = [
  {
    q: "What is the format of the AP U.S. Government and Politics Exam?",
    a: "The AP U.S. Government and Politics Exam is fully digital and lasts 3 hours. Section I has 55 multiple-choice questions in 80 minutes (50% of the score). Section II has four free-response questions in 100 minutes (50%): concept application, quantitative analysis, SCOTUS comparison and an argument essay, each worth 12.5%.",
  },
  {
    q: "What do AP Gov multiple-choice questions look like?",
    a: "About 30 questions stand alone. The rest come in sets that share a source: five quantitative analysis sets of two or three questions on tables, charts, graphs, maps or infographics; two text-based sets of three or four, one on a foundational document and one on another primary or secondary text; and three visual sets of two on a map, cartoon or infographic. Each question has four answer choices, and no points are taken off for wrong answers.",
  },
  {
    q: "Which documents and Supreme Court cases are required for AP Gov?",
    a: "The course requires 13 foundational documents and 14 Supreme Court cases. For 2026-27 the College Board added four documents: Federalist No. 39, the Emancipation Proclamation, the Gettysburg Address and core principles from Adam Smith's The Wealth of Nations. They join the Declaration of Independence, the Articles of Confederation, the Constitution, Federalist Nos. 10, 51, 70 and 78, Brutus No. 1 and Letter from a Birmingham Jail. The cases run from Marbury v. Madison (1803) to McDonald v. Chicago and Citizens United v. FEC (2010).",
  },
  {
    q: "How is the AP U.S. Government and Politics Exam scored?",
    a: "AP scores run from 1 to 5. The College Board combines the multiple-choice and free-response sections into a composite and converts it to a score of 1 to 5 each year; it does not publish a fixed percentage for each score. Tigertest reports the percent you got right on a full multiple-choice section, and its goals are its own targets, not official cutoffs.",
  },
  {
    q: "Does the Tigertest AP Gov practice test include the free-response questions?",
    a: "No. Tigertest models the 55-question multiple-choice section only. The four free-response questions are written answers scored by readers, so practice them with your teacher. The data tables are hypothetical and made for practice, maps and cartoons are described in words, and the questions are original, written to the College Board course framework. Tigertest is not affiliated with the College Board.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AP US Government practice test, AP Gov practice test, free AP Gov practice test, AP US Government and Politics multiple choice, AP Gov MCQ, AP Gov exam 2027, AP Gov required Supreme Court cases, AP Gov foundational documents, AP Gov review",
  alternates: {
    canonical: `${siteUrl}/ap-us-government-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ap-us-government-practice-test`,
    images: [{ url: shareImageUrl("apgov"), width: 1200, height: 630, alt: "Tigertest free AP US Government practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("apgov")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AP US Government Practice Test",
      description,
      url: `${siteUrl}/ap-us-government-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "201 original AP U.S. Government and Politics practice questions with explanations",
        "2 full multiple-choice sections: 55 questions in 80 minutes, four choices each",
        "Data, text and visual sets mixed with individual questions, like the real exam",
        "All five units, weighted like the real exam",
        "Required Supreme Court cases and foundational documents, including the 2026-27 additions",
        "7 drills, one for each unit or half of a large unit",
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
        classFaqJsonLd("apgov"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Unit 1: Foundations of American Democracy", weight: "15-22%" },
  { name: "Unit 2: Interactions Among Branches of Government", weight: "25-36%" },
  { name: "Unit 3: Civil Liberties and Civil Rights", weight: "13-18%" },
  { name: "Unit 4: American Political Ideologies and Beliefs", weight: "10-15%" },
  { name: "Unit 5: Political Participation", weight: "20-27%" },
];

export default function ApUsGovernmentLandingPage() {
  return (
    <div data-theme="apgov" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AP US Government Practice Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/ap-us-government/dashboard"
            shortName="AP US Government"
            subtitle="201 original multiple-choice questions across all five units, with the required cases and documents. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/apgov-mobile.png", desktop: "/landing/apgov-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="apgov" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Unit</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven drills: one for each of Units 1, 3 and 4, and two each for the big Units 2 and 5. Questions you miss come back until you have mastered them, so a weak unit gets the practice it needs.
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
                Two full multiple-choice sections: 55 questions in 80 minutes, on the real clock, with the source beside each set and a score by unit at the end. Practice Test 2 is held out of the drills, so it measures readiness. The free-response questions are not included.
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
                Weighted Like the Real Exam
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                These are the College Board&apos;s weights for the five units on the multiple-choice section. Every Tigertest practice test has 10 questions from Unit 1, 17 from Unit 2, 9 from Unit 3, 7 from Unit 4 and 12 from Unit 5: about 30 on their own, five data sets, two text sets (one on a foundational document) and three visual sets, like the real exam. The data tables are hypothetical, made for practice, and maps and cartoons are described in words.
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
                src={getTigerAsset("apgov", 1)}
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
            How to Raise Your AP Gov Score
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know every required case cold</h3>
              <p>
                Learn the facts, issue, holding and reasoning of all 14 required Supreme Court cases, and the constitutional clause each one turns on. Many questions describe a new situation and ask which required case applies.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read the foundational documents for their arguments</h3>
              <p>
                For each of the 13 documents, know its main claim and who would agree or disagree with it: Federalist No. 10 against Brutus No. 1, Federalist No. 51 on checks and balances, No. 70 on the presidency and No. 78 on the courts. Add the four new ones for 2026-27.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the data before the question</h3>
              <p>
                For a table or chart, note what is measured, the units and the trend before reading the choices. Then check each choice against the numbers: wrong answers often describe the wrong column or a trend that is not there.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep to about 85 seconds a question</h3>
              <p>
                With 55 questions in 80 minutes, answer the individual questions briskly to save time for the sets. Wrong answers cost nothing, so never leave a question blank. Tigertest shows your score by unit, so drill your weakest unit before each full test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AP US Government Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="apgov" />
        </div>
      </div>

      <ExamRelatedTests examId="apgov" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for AP Gov?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 201 questions across all five units.</p>
          <ExamLandingCTA dashboardHref="/ap-us-government/dashboard" />
        </div>
      </div>
    </div>
  );
}
