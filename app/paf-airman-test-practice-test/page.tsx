import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/pkpaf";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "PAF Airman Test Practice 2026 - Free Pakistan Air Force Recruitment Questions";
const metaDescription =
  "Free PAF airman test practice: 200 original questions in English, maths, physics, electricity, verbal and non-verbal intelligence, aviation and the Air Force, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the academic and intelligence tests in Pakistan Air Force airman recruitment: 200 original questions on English grammar and vocabulary, matric-level mathematics, physics basics, electricity and electronics, verbal intelligence (series, analogies, coding, directions), non-verbal intelligence written as text patterns, aviation and flight basics, and the PAF's ranks and institutions. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "paf airman test, paf initial test, join paf airman, paf aero apprentice test, paf airman intelligence test, paf academic test mcqs, paf selection and recruitment centre test, pakistan air force airman test preparation, paf airman test 2026",
  alternates: {
    canonical: `${siteUrl}/paf-airman-test-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/paf-airman-test-practice-test`,
    images: [{ url: shareImageUrl("pkpaf"), width: 1200, height: 630, alt: "Tigertest free PAF airman test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pkpaf")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How do you join the Pakistan Air Force as an airman?",
    a: "Airmen are recruited through the PAF's official recruitment portal and its selection and recruitment centres, which announce each intake in an advertisement. Candidates register, report with their documents and then take the selection tests, the medical and an interview. Tigertest could not load the PAF's recruitment portal when this page was written, so check the current advertisement for the categories, ages, education and dates of your intake.",
  },
  {
    q: "What is on the PAF airman initial test?",
    a: "The PAF does not publish a syllabus, question count or pass mark for the airman tests. Candidates and guides describe an academic test at matric or intermediate level (English, mathematics, and physics for technical trades) and intelligence tests with verbal and non-verbal parts. Tigertest covers all of these, plus aviation basics and the PAF's ranks and institutions. The real non-verbal test uses pictures; here the same reasoning (mirror images, folding, counting shapes, rotation) is written as text.",
  },
  {
    q: "What is the pass mark?",
    a: "The PAF does not publish one, and selection also depends on the medical, the interview, the trade you apply for and the places available. Tigertest's mock tests are 50 questions with a 70% target (35 of 50). Aim higher than that in practice so you have a margin on the day.",
  },
  {
    q: "What ranks and training does a PAF airman have?",
    a: "Airmen start as Aircraftman and rise through Leading Aircraftman, Senior Aircraftman, Junior Technician, Corporal Technician, Senior Technician and Chief Technician to Assistant Warrant Officer, Warrant Officer and Chief Warrant Officer. Since 2019 the PAF Airmen Academy at Korangi, Karachi, has trained airmen of all trades in one place. Officers train separately at the PAF Academy Asghar Khan in Risalpur.",
  },
  {
    q: "Are these the real PAF test questions?",
    a: "No. Every question is original, written by Tigertest to test the same English, mathematics, science, intelligence and general knowledge, without copying any past paper. Tigertest is free practice and is not affiliated with the Pakistan Air Force (PAF). Register only through the PAF's official recruitment portal or a PAF selection and recruitment centre.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PAF Airman Test Practice",
      description,
      url: `${siteUrl}/paf-airman-test-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
      featureList: [
        "200 original test questions",
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
  { name: "Mathematics", weight: "18%" },
  { name: "English Grammar & Vocabulary", weight: "16%" },
  { name: "Physics Basics", weight: "16%" },
  { name: "Verbal Intelligence", weight: "14%" },
  { name: "Aviation & Flight Basics", weight: "12%" },
  { name: "Non-Verbal Intelligence (as text)", weight: "10%" },
  { name: "The Pakistan Air Force", weight: "8%" },
  { name: "Electricity & Electronics", weight: "6%" },
];

export default function PafAirmanTestLandingPage() {
  return (
    <div data-theme="pkpaf" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PAF Airman Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/paf-airman-test/dashboard"
            shortName="PAF test"
            subtitle="200 original questions for the airman academic and intelligence tests: English, mathematics, physics, electricity, verbal and non-verbal intelligence, aviation and the Air Force. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/pkpaf-mobile.png", desktop: "/landing/pkpaf-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pkpaf" />

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
                Five training sets cover English, mathematics, verbal and non-verbal intelligence, physics with electricity, and aviation with the Pakistan Air Force. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that together cover all 200 questions, with a 70% target. No question repeats across tests, and every answer explains the working or the rule and the common wrong pick.
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
                Built on What the Airman Tests Cover
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Pakistan Air Force does not publish a syllabus, a question count or a pass mark for the airman tests. Candidates and guides describe an academic test in English, mathematics and physics and intelligence tests with verbal and non-verbal parts, so Tigertest covers those, adding electricity, aviation basics and the PAF&apos;s ranks and institutions as fixed facts. The real non-verbal test uses pictures; here it is written as text. The weights below are Tigertest&apos;s own.</p>
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
                src={getTigerAsset("pkpaf", 1)}
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
            How to Prepare for the PAF Airman Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Train the intelligence questions against the clock</h3>
              <p>
                Number and letter series, analogies, coding, directions and blood relations follow a small set of patterns. Work through them until you spot the rule in seconds, and for the non-verbal kind practise mirror images, folding, rotation and counting shapes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make matric maths and physics automatic</h3>
              <p>
                Percentages, ratios, speed and time, area and volume, simple equations and the 24-hour clock come up again and again, and technical trades need physics: units, Newton&apos;s laws, pressure, heat, light, sound and Ohm&apos;s law. Learn the methods, then check each answer against a rough estimate.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn how an aircraft flies and how the PAF is organised</h3>
              <p>
                Know the four forces of flight, what the ailerons, elevator and rudder do, how runways are numbered and what the main cockpit instruments show. Learn the airman ranks from Aircraftman to Chief Warrant Officer, the officer ranks from Pilot Officer upwards, and where the PAF Academy, the Airmen Academy and Air Headquarters are.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Prepare for the other stages too</h3>
              <p>
                The written tests are only one stage. Bring every document the advertisement lists, get ready for the medical and the interview, and follow only the PAF&apos;s official recruitment portal and your selection and recruitment centre: anyone asking for money to secure a place is not from the PAF.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PAF Airman Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="pkpaf" />

      <ExamRelatedTests examId="pkpaf" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your PAF Airman Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions in English, mathematics, physics, intelligence and aviation.</p>
          <ExamLandingCTA dashboardHref="/paf-airman-test/dashboard" />
        </div>
      </div>
    </div>
  );
}
