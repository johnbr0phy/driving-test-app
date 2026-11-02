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

const title = "Free AISSEE Class 6 Mock Test 2027 - Sainik School Practice";
const metaDescription =
  "Free Sainik School Class 6 mock tests: 237 original AISSEE questions on Language, Mathematics, Intelligence and General Knowledge, with two full tests at the real pace and an explanation on every answer.";
const description =
  "Free AISSEE Class 6 practice tests with 237 original questions on the All India Sainik Schools Entrance Examination pattern: Language, Mathematics, Intelligence and General Knowledge. Each mock test has 100 questions in 2 hours, the real pace and mix, with a simple explanation on every answer.";

const faqs = [
  {
    q: "What is the AISSEE Class 6 exam pattern?",
    a: "Under the AISSEE-2026 Information Bulletin, the Class 6 paper has 125 multiple-choice questions for 300 marks in 150 minutes: Language 25 questions (50 marks), Mathematics 50 questions (150 marks), Intelligence 25 questions (50 marks) and General Knowledge 25 questions (50 marks). Mathematics questions carry 3 marks each and the others 2. It is a pen and paper test on an OMR sheet, offered in English, Hindi and 11 other languages. Check the AISSEE-2027 bulletin on NTA's website when it is published.",
  },
  {
    q: "Is there negative marking in the Sainik School entrance exam?",
    a: "No. The bulletin says there is no negative marking for a wrong answer, so never leave a question blank. For the existing Sainik Schools you also need at least 25% in each subject and 40% in total (SC and ST candidates have no minimum there), and seats then go on merit, school by school.",
  },
  {
    q: "Why are the Tigertest mock tests 100 questions and not 125?",
    a: "Each mock test is 100 questions in 2 hours, the same pace as the real paper (1.2 minutes a question) and the same mix: 20 Language, 40 Mathematics, 20 Intelligence and 20 General Knowledge. That keeps a full practice sitting a little shorter. Picture-based Intelligence questions are written in words here, so practise some figure puzzles from your books as well.",
  },
  {
    q: "Are these real AISSEE previous year questions?",
    a: "No. Every question and passage is original, written for a student who has finished Class 5, to the topics in the AISSEE Class VI syllabus. None is copied from previous papers or answer keys. General Knowledge sticks to facts that do not change, so it leaves out current affairs.",
  },
  {
    q: "Is the Tigertest AISSEE mock test free?",
    a: "Yes. Both full mock tests and all eight drills are free, with no account required. Create a free account if you want progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AISSEE mock test, AISSEE class 6 practice test, Sainik School class 6 mock test free, Sainik School entrance exam 2027, AISSEE 2027, Sainik School question paper practice, AISSEE maths intelligence GK language practice",
  alternates: {
    canonical: `${siteUrl}/aissee-class-6-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/aissee-class-6-practice-test`,
    images: [{ url: shareImageUrl("aissee"), width: 1200, height: 630, alt: "Tigertest free AISSEE Class 6 mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aissee")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AISSEE Class 6 Mock Test",
      description,
      url: `${siteUrl}/aissee-class-6-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "237 original AISSEE Class 6 practice questions with explanations",
        "2 full 100-question mock tests in 2 hours, at the real pace and in the real section order",
        "8 drills: grammar, reading passages, numbers, ratio and percentage, shapes and measurement, intelligence, GK India and GK science",
        "Written for students finishing Class 5",
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
        classFaqJsonLd("aissee"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Language", weight: "25 questions, 50 marks" },
  { name: "Mathematics", weight: "50 questions, 150 marks" },
  { name: "Intelligence", weight: "25 questions, 50 marks" },
  { name: "General Knowledge", weight: "25 questions, 50 marks" },
];

export default function AisseeLandingPage() {
  return (
    <div data-theme="aissee" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AISSEE Class 6 Mock Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/aissee/dashboard"
            shortName="AISSEE"
            subtitle="237 original Sainik School practice questions on Language, Mathematics, Intelligence and General Knowledge. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aissee-mobile.png", desktop: "/landing/aissee-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aissee" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Short Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills cover every part of the test: grammar, reading passages, numbers and fractions, ratio and percentage, shapes and measurement, intelligence, and General Knowledge on India and on science. Questions you miss come back until you get them right.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 100-question mock tests in 2 hours, the real AISSEE pace and mix, in the real section order. Move between questions and flag the ones to check again. Practice Test 2 is kept out of the drills, so it shows how ready you are.
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
                Built on the AISSEE Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The National Testing Agency sets the Class 6 paper in four sections, 125 questions for 300 marks, with no negative marking. Mathematics questions carry 3 marks each, so Mathematics alone is half the marks. Every mock test here keeps the same mix at 100 questions. Tigertest is not affiliated with NTA or the Sainik Schools Society.
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
                src={getTigerAsset("aissee", 1)}
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
            How to Prepare for the Sainik School Entrance Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Give Mathematics the most time</h3>
              <p>
                Mathematics has 50 of the 125 questions and 150 of the 300 marks. Practise fractions, LCM and HCF, percentage, profit and loss, speed and time, and area and volume a little every day, and write each step on the rough sheet.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your tables and units</h3>
              <p>
                Questions go quickly if you know the times tables to 20, squares and cubes of small numbers and the units by heart: 1 km is 1,000 m, 1 kg is 1,000 g, 1 litre is 1,000 mL and ₹1 is 100 paise.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip any section</h3>
              <p>
                For the existing Sainik Schools you need at least 25% in every subject and 40% overall, so a weak section can stop you even with a good total. Read a story or newspaper every day for Language, and revise your EVS and social science books for General Knowledge.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                There is no negative marking, so never leave a circle empty. Take a full 2-hour mock test to practise your timing: at the real pace you have about 1 minute 12 seconds for each question.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AISSEE Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="aissee" />
        </div>
      </div>

      <ExamRelatedTests examId="aissee" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the AISSEE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 237 questions across all four sections.</p>
          <ExamLandingCTA dashboardHref="/aissee/dashboard" />
        </div>
      </div>
    </div>
  );
}
