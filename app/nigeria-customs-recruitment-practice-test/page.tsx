import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Nigeria Customs Recruitment CBT Practice Test 2026 - Free";
const metaDescription =
  "Free Nigeria Customs Service recruitment CBT practice: 200 original questions in English, maths, reasoning and customs and trade knowledge, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the Nigeria Customs Service recruitment computer-based test: 200 original questions on English grammar and comprehension, arithmetic and duty calculations, algebra and data, verbal and logical reasoning, customs procedures and ports, economics and ECOWAS trade, and world geography. Four 50-question mock tests and five training sets for Superintendent, Inspectorate and Customs Assistant applicants.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nigeria customs recruitment cbt, customs aptitude test, nigeria customs service exam practice, customs cbt questions, customs recruitment test 2026, customs superintendent cbt, customs inspectorate test, customs assistant exam, ncs recruitment practice, nigeria paramilitary aptitude test",
  alternates: {
    canonical: `${siteUrl}/nigeria-customs-recruitment-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nigeria-customs-recruitment-practice-test`,
    images: [{ url: shareImageUrl("ngcustoms"), width: 1200, height: 630, alt: "Tigertest free Nigeria Customs recruitment practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ngcustoms")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Nigeria Customs recruitment CBT?",
    a: "It is the computer-based test that follows the documentary screening in a Nigeria Customs Service recruitment exercise. In the exercise advertised on 27 December 2024 (3,927 vacancies across the Superintendent, Inspectorate and Customs Assistant cadres), the Service invited 286,697 shortlisted applicants to an online CBT in September and October 2025, taken from any location on a laptop or desktop with a webcam, after a compulsory pre-test two days earlier. Superintendent applicants were told to expect an additional CBT in the next phase.",
  },
  {
    q: "How many questions are on the Customs CBT and what is the pass mark?",
    a: "The Nigeria Customs Service has not published a question count, a time limit, a subject list or a pass mark for its recruitment CBT. Guides describe a general aptitude test in English, mathematics and general knowledge, with questions on the Service itself. Tigertest's mock tests are 50 questions with a 70% target, so scoring well above it gives you a margin whatever the real format turns out to be.",
  },
  {
    q: "What rules apply on the day of the online CBT?",
    a: "In the 2025 exercise the Service said the test must be taken on a laptop or desktop computer with a webcam and a full-screen display, not on a phone. A facial check is done at login, and noise, excessive movement, whispering or switching windows can log you out or be treated as malpractice. Calculators and phones were not allowed, so practise your arithmetic without one.",
  },
  {
    q: "Which topics should I study?",
    a: "Revise English grammar, vocabulary and comprehension, everyday arithmetic (percentages, ratios, interest, profit and loss) and basic algebra and statistics, plus simple reasoning puzzles. For general knowledge, learn what the Customs Service does (revenue, anti-smuggling, trade facilitation), the main customs terms and documents, Nigeria's ports and borders, basic economics and ECOWAS trade rules, and world geography. Check current affairs from reliable news close to your test date.",
  },
  {
    q: "Are these the real Customs exam questions?",
    a: "No. Every question is original, written by Tigertest to cover the same skills and knowledge without copying any past paper. Tigertest is free practice and is not affiliated with the Nigeria Customs Service. The Service says it never asks for payment and does not recruit through social media, so follow only its official website and channels for invitations and results.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Nigeria Customs Recruitment Practice Test",
      description,
      url: `${siteUrl}/nigeria-customs-recruitment-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      featureList: [
        "200 original Customs recruitment CBT questions",
        "4 mock tests of 50 questions",
        "5 training sets by subject",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "English: Grammar & Usage", weight: "16%" },
  { name: "English: Vocabulary & Comprehension", weight: "14%" },
  { name: "Maths: Arithmetic, Percentages & Duty", weight: "14%" },
  { name: "Customs, Trade & Ports", weight: "14%" },
  { name: "Maths: Algebra, Ratio & Data", weight: "12%" },
  { name: "Verbal & Logical Reasoning", weight: "10%" },
  { name: "Economics & ECOWAS Trade", weight: "10%" },
  { name: "World Geography & Capitals", weight: "10%" },
];

export default function NigeriaCustomsRecruitmentLandingPage() {
  return (
    <div data-theme="ngcustoms" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Nigeria Customs Recruitment CBT Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nigeria-customs-recruitment/dashboard"
            shortName="Customs CBT"
            subtitle="200 original questions for the Nigeria Customs Service recruitment CBT: English, maths without a calculator, reasoning, and the customs, trade, economics and world geography knowledge behind customs work. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ngcustoms-mobile.png", desktop: "/landing/ngcustoms-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ngcustoms" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets cover English language, mathematics, customs, trade and ports, economics with ECOWAS trade and world geography, and logical reasoning. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that together cover all 200 questions, with a 70% target. No question repeats across tests, and every answer explains the working and the common wrong pick.
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
                Built for a Customs Aptitude Test
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Service does not publish a syllabus for its recruitment CBT, so each mock test follows the general aptitude pattern guides describe: English, mathematics and general knowledge. Tigertest weights the knowledge questions to customs work: duties and documents, ports and borders, trade terms, economics and ECOWAS trade rules, and world geography. Maths items include duty and warehouse calculations, done without a calculator as on the day. Current affairs are left out because they change; read the news before your test.
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
                src={getTigerAsset("ngcustoms", 1)}
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
            How to Pass the Customs Recruitment CBT
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Practise maths without a calculator</h3>
              <p>
                Calculators were not allowed in the 2025 CBT. Drill percentages, ratios, simple and compound interest, profit and loss, and fractions until you can do them on paper quickly. Duty questions are just percentages of a value.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the language of customs</h3>
              <p>
                Know what excise, ad valorem and specific duties are, what a bonded warehouse, drawback, transit goods and contraband mean, which documents travel with goods (bill of lading, certificate of origin), and the main ports and border posts. These words appear across the general knowledge questions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Test your set-up before the day</h3>
              <p>
                The 2025 CBT was online, on a laptop or desktop with a webcam, with a compulsory pre-test two days earlier. Use the pre-test to check your internet, camera and a quiet room, since noise, movement or switching windows can end your test.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above the target</h3>
              <p>
                Aim for at least 35 of 50 (70%) in every mock test, and more for a margin. Tigertest tracks your accuracy by subject, so drill the questions you missed, retrain the weakest set, then take all four tests back to back before your test date.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Nigeria Customs Recruitment CBT Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamRelatedTests examId="ngcustoms" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Customs CBT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions for the Nigeria Customs Service recruitment test.</p>
          <ExamLandingCTA dashboardHref="/nigeria-customs-recruitment/dashboard" />
        </div>
      </div>
    </div>
  );
}
