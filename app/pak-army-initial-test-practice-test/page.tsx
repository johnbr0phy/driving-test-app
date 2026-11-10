import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/pakarmy";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Pak Army Initial Test Practice 2026 - Free Soldier Recruitment Questions";
const metaDescription =
  "Free Pak Army soldier initial test practice: 200 original questions in English, maths, verbal and non-verbal intelligence, everyday science, the Army, Islamiat and Pakistan, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the written and intelligence tests in Pakistan Army soldier recruitment: 200 original questions on English grammar and vocabulary, matric-level mathematics, verbal intelligence (series, analogies, coding, directions), non-verbal intelligence written as text patterns, everyday science and first aid, the Army's ranks, corps and institutions, Islamic studies and Pakistan general knowledge. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "pak army initial test, pak army soldier test, join pak army test preparation, pak army intelligence test, pak army written test mcqs, army selection and recruitment centre test, sipahi test, pak army general duty soldier test, verbal non verbal intelligence test pak army, pak army test 2026",
  alternates: {
    canonical: `${siteUrl}/pak-army-initial-test-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/pak-army-initial-test-practice-test`,
    images: [{ url: shareImageUrl("pakarmy"), width: 1200, height: 630, alt: "Tigertest free Pak Army initial test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pakarmy")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What are the stages of Pak Army soldier recruitment?",
    a: "You register online on the Army's recruitment portal or in person at an Army Selection and Recruitment Centre (AS&RC) or regimental centre, then report with your documents. The Associated Press of Pakistan's report on the September to November 2025 drive described the selection process as a written test, physical and medical tests, and an interview, held at the selection and recruitment centres. Your centre tells you the dates for each stage.",
  },
  {
    q: "What is on the Pak Army initial test?",
    a: "The Army does not publish a syllabus, question count or pass mark for the soldier test. Candidates and guides describe a written test with intelligence sections (verbal, and non-verbal or picture-based) and multiple-choice questions at matric level on English, mathematics, general knowledge, Islamiat and Pakistan studies, with different subjects for some trades. Tigertest covers all of these. The real non-verbal section uses pictures; here the same reasoning (mirror images, folding, counting shapes, rotation) is written as text.",
  },
  {
    q: "What is the pass mark?",
    a: "The Army does not publish one, and selection also depends on the physical test, the medical, the interview and the places available. Tigertest's mock tests are 50 questions with a 70% target (35 of 50). Aim higher than that in practice so you have a margin on the day.",
  },
  {
    q: "Who can apply to join the Pak Army as a soldier?",
    a: "For the drive with registration from 1 September to 23 November 2026, as reported in the news, General Duty, Technical, Driver, Military Police, Clerk and Cook candidates had to be 17½ to 23 years old. General Duty, Driver and Military Police needed Matric, Technical needed Matric with science, and Clerk needed Intermediate. The minimum height was 5 feet 6 inches for General Duty, Technical and Driver, 5 feet 8 inches for Military Police and 5 feet 3 inches for Clerk and Cook, with some relaxation for candidates from Balochistan, the merged districts of Khyber Pakhtunkhwa and Gilgit-Baltistan. These rules are set in each advertisement, so check the current one.",
  },
  {
    q: "Are these the real Pak Army test questions?",
    a: "No. Every question is original, written by Tigertest to test the same English, mathematics, intelligence and general knowledge, without copying any past paper. Tigertest is free practice and is not affiliated with the Pakistan Army. Register only through the Army's official recruitment portal or your nearest Army Selection and Recruitment Centre.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Pak Army Initial Test Practice",
      description,
      url: `${siteUrl}/pak-army-initial-test-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("pakarmy", "PKR"),
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
  { name: "English Grammar & Vocabulary", weight: "16%" },
  { name: "Mathematics", weight: "16%" },
  { name: "Everyday Science & First Aid", weight: "16%" },
  { name: "Verbal Intelligence", weight: "14%" },
  { name: "The Pakistan Army", weight: "14%" },
  { name: "Non-Verbal Intelligence (as text)", weight: "10%" },
  { name: "Islamic Studies", weight: "8%" },
  { name: "Pakistan General Knowledge", weight: "6%" },
];

export default function PakArmyInitialTestLandingPage() {
  return (
    <div data-theme="pakarmy" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Pak Army Initial Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/pak-army-test/dashboard"
            shortName="Army test"
            subtitle="200 original questions for the soldier written and intelligence test: English, mathematics, verbal and non-verbal intelligence, everyday science, the Army, Islamiat and Pakistan. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/pakarmy-mobile.png", desktop: "/landing/pakarmy-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pakarmy" />

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
                Five training sets cover English, mathematics, verbal and non-verbal intelligence, everyday science, and the Army with Islamiat and Pakistan general knowledge. Questions you miss come back until you have mastered them.
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
                Built on What the Soldier Test Covers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Pakistan Army does not publish a syllabus, a question count or a pass mark for the soldier written test. Candidates and guides describe verbal and non-verbal intelligence sections and matric-level questions on English, mathematics and general knowledge, so Tigertest covers those, with general knowledge drawn from fixed facts: the Army&apos;s ranks, corps and institutions, everyday science, Islamic studies and Pakistan. The real non-verbal section uses pictures; here it is written as text. The weights below are Tigertest&apos;s own.</p>
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
                src={getTigerAsset("pakarmy", 1)}
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
            How to Prepare for the Pak Army Initial Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Train the intelligence questions against the clock</h3>
              <p>
                Number and letter series, analogies, coding, directions and blood relations follow a small set of patterns. Work through them until you spot the rule in seconds, and for the non-verbal kind practise mirror images, folding, rotation and counting shapes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make matric maths automatic</h3>
              <p>
                Percentages, ratios, fractions, speed and time, area and volume, and the 24-hour clock come up again and again. Learn the methods, then check each answer against a rough estimate before you move on.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the Army, your science and your general knowledge</h3>
              <p>
                Learn the order of ranks from Sipahi to Subedar Major and from Second Lieutenant upwards, what each corps does, where GHQ, the PMA and the ISSB are, and the everyday science of health, first aid and the human body. Islamic studies and Pakistan&apos;s national symbols are fixed facts that pay off quickly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Prepare for the other stages too</h3>
              <p>
                The written test is only one stage. Bring every document the advertisement lists, train for the running, push-ups and other physical tests, and follow only the Army&apos;s official portal and your selection and recruitment centre: registration is free, and anyone asking for money to secure a place is not from the Army.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Pak Army Initial Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="pakarmy" />

      <ExamRelatedTests examId="pakarmy" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Pak Army Initial Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions in English, mathematics, intelligence and general knowledge.</p>
          <ExamLandingCTA dashboardHref="/pak-army-test/dashboard" />
        </div>
      </div>
    </div>
  );
}
