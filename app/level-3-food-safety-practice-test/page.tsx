import "@/lib/banks/ukfood3";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Level 3 Food Safety Practice Test 2026 - Free UK Supervising Quiz with Answers";
const metaDescription =
  "Free Level 3 Food Safety (Supervising) for Catering practice: 200 original questions on HACCP, enforcement, due diligence, microbiology, allergens and supervising staff, every answer explained.";
const description =
  "Free practice for the UK Level 3 Award in Food Safety (Supervising) for Catering: 200 original questions on food law and enforcement, HACCP and food safety management, microbiology and food poisoning, contamination and premises, allergen management, temperature control, staff hygiene and training, and cleaning, waste and pests. Four 50-question mock tests with a 66 percent pass line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "level 3 food hygiene practice test, level 3 food safety mock exam, level 3 award in food safety in catering, supervising food safety level 3 questions, food safety supervisor quiz UK, HACCP test questions, due diligence food law quiz",
  alternates: {
    canonical: `${siteUrl}/level-3-food-safety-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/level-3-food-safety-practice-test`,
    images: [{ url: shareImageUrl("ukfood3"), width: 1200, height: 630, alt: "Tigertest free Level 3 food safety practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukfood3")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Level 3 Food Safety Practice Test",
      description,
      url: `${siteUrl}/level-3-food-safety-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ukfood3", "GBP"),
      featureList: [
        "200 Level 3 food safety (supervising) practice questions",
        "4 mock tests of 50 questions with a 66% pass line",
        "4 training sets by topic",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the Level 3 food safety certificate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is the usual name for a Level 3 Award in Food Safety (Supervising) for Catering, a regulated qualification for supervisors, head chefs, kitchen managers and owners. Awarding bodies such as Highfield and RSPH offer it, and Highfield sets about 20 guided learning hours for it. It goes beyond Level 2 into food safety management, HACCP, enforcement and supervising staff.",
          },
        },
        {
          "@type": "Question",
          name: "How is the Level 3 food safety exam assessed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each awarding body sets its own paper. Highfield's Level 3 Award in Food Safety for Catering, for example, is a multiple-choice exam of 45 questions in 90 minutes, with a pass at 30 out of 45 (66 percent) and a distinction at 36 (80 percent). Check your own course's format with your trainer. The mock tests here have 50 questions each and use a 66 percent pass line.",
          },
        },
        {
          "@type": "Question",
          name: "What does Level 3 food safety add to Level 2?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Level 2 is about your own practice in the kitchen. Level 3 is about making sure others follow the rules: putting HACCP-based procedures in place, monitoring and verifying them, keeping records for a due diligence defence, dealing with enforcement officers and notices, training and supervising staff, managing allergens and handling complaints and food poisoning allegations.",
          },
        },
        {
          "@type": "Question",
          name: "Is a Level 3 certificate a legal requirement?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The law requires food handlers to be supervised and trained in food hygiene to suit their work, and those who develop and maintain the HACCP-based procedures to be trained in the HACCP principles. It does not name a qualification, but a Level 3 award is a common way for supervisors to show that training.",
          },
        },
        {
          "@type": "Question",
          name: "Is this an official course or certificate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is written by Tigertest from UK food hygiene law and Food Standards Agency guidance that the Level 3 qualifications are built on, so it tests the same knowledge without copying any awarding body's exam. Tigertest is not affiliated with Highfield, RSPH, CIEH or any awarding body, and it is revision practice, not a certificate.",
          },
        },
        classFaqJsonLd("ukfood3"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Law & Enforcement", weight: "14%" },
  { name: "HACCP & Food Safety Management", weight: "16%" },
  { name: "Microbiology & Food Poisoning", weight: "14%" },
  { name: "Contamination & Premises", weight: "10%" },
  { name: "Allergen Management", weight: "8%" },
  { name: "Temperature Control", weight: "14%" },
  { name: "Staff Hygiene & Training", weight: "12%" },
  { name: "Cleaning, Waste & Pests", weight: "12%" },
];

export default function Level3FoodSafetyLandingPage() {
  return (
    <div data-theme="ukfood3" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Level 3 Food Safety Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/uk-level-3-food-safety/dashboard"
            shortName="Level 3 Food Safety"
            subtitle="200 supervisor-level questions on HACCP, food law and managing a safe kitchen. Free to start, no account needed."
            shots={{ mobile: "/landing/ukfood3-mobile.png", desktop: "/landing/ukfood3-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukfood3" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets by topic, from Food Law &amp; HACCP to Staff, Cleaning &amp; Pests. Master a topic, then take a test. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question mock tests covering every learning outcome, with a 66 percent pass line like Highfield&apos;s 30 out of 45, and an explanation of the right answer on every question.
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
                Built on the Level 3 Food Safety in Catering Unit
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Level 3 catering qualifications cover two outcomes: making sure the business complies with food safety law and management procedures, and applying and monitoring good practice on contamination, temperature control, personal hygiene and cleaning. No awarding body publishes how many questions each topic gets, so the mock tests here give the most weight to HACCP, law and microbiology, where supervisors carry the most responsibility. Colleges, councils and trainers who run the course can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the group misses most.
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
                src={getTigerAsset("ukfood3", 1)}
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
            How to Pass Level 3 Food Safety
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn HACCP as a sequence</h3>
              <p>
                Hazards, critical control points, critical limits, monitoring, corrective action, verification, then documents and records. Be clear on the difference between monitoring (checking a CCP as you go), verification (checking the whole system works) and validation (evidence a control will work before you rely on it).
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the enforcement ladder</h3>
              <p>
                A hygiene improvement notice gives at least 14 days to put things right; an emergency prohibition notice closes premises at once where there is an imminent risk, and lapses after 3 days without a court application; a hygiene prohibition order follows a conviction. A due diligence defence needs all reasonable precautions and all due diligence, shown in signed records.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think like a supervisor</h3>
              <p>
                Many questions ask what you would do: correct poor practice at once, act on the food and the cause when a limit is missed, keep suspect food after a complaint, exclude staff with symptoms, brief every shift when a procedure changes, and update the allergen matrix before a recipe changes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. After each mock test, drill the questions you missed and retrain your weakest topic before you sit the real exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Level 3 Food Safety Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the Level 3 food safety certificate?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It is the usual name for a Level 3 Award in Food Safety (Supervising) for Catering, a regulated qualification for supervisors, head chefs, kitchen managers and owners. Awarding bodies such as Highfield and RSPH offer it, and Highfield sets about 20 guided learning hours for it. It goes beyond Level 2 into food safety management, HACCP, enforcement and supervising staff.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is the Level 3 food safety exam assessed?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Each awarding body sets its own paper. Highfield&apos;s Level 3 Award in Food Safety for Catering, for example, is a multiple-choice exam of 45 questions in 90 minutes, with a pass at 30 out of 45 (66 percent) and a distinction at 36 (80 percent). Check your own course&apos;s format with your trainer. The mock tests here have 50 questions each and use a 66 percent pass line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does Level 3 food safety add to Level 2?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Level 2 is about your own practice in the kitchen. Level 3 is about making sure others follow the rules: putting HACCP-based procedures in place, monitoring and verifying them, keeping records for a due diligence defence, dealing with enforcement officers and notices, training and supervising staff, managing allergens and handling complaints and food poisoning allegations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is a Level 3 certificate a legal requirement?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. The law requires food handlers to be supervised and trained in food hygiene to suit their work, and those who develop and maintain the HACCP-based procedures to be trained in the HACCP principles. It does not name a qualification, but a Level 3 award is a common way for supervisors to show that training.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this an official course or certificate?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is written by Tigertest from UK food hygiene law and Food Standards Agency guidance that the Level 3 qualifications are built on, so it tests the same knowledge without copying any awarding body&apos;s exam. Tigertest is not affiliated with Highfield, RSPH, CIEH or any awarding body, and it is revision practice, not a certificate.
            </p>
          </div>
          <ExamClassFaq examId="ukfood3" />
        </div>
      </div>

      <ExamSampleQuestions examId="ukfood3" />

      <ExamRelatedTests examId="ukfood3" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Level 3 Food Safety?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every learning outcome.</p>
          <ExamLandingCTA dashboardHref="/uk-level-3-food-safety/dashboard" />
        </div>
      </div>
    </div>
  );
}
