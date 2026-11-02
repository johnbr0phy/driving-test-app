import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/ukpcv";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "PCV Theory Test Practice 2026 - Free Bus and Coach";
const metaDescription =
  "Free PCV theory test practice for Driver CPC part 1: 200 questions on drivers' hours, passengers, vehicle safety and signs, every answer explained.";
const description =
  "Free practice for the DVSA bus and coach (PCV) theory test, the multiple-choice part of Driver CPC Part 1: 200 original questions on drivers' hours and tachographs, vehicle size and brakes, carrying passengers, the driver and the environment, the road and other road users, incidents and emergencies, and road and traffic signs. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "PCV theory test, bus theory test, coach theory test, PCV theory test practice, Driver CPC part 1 bus, DVSA bus and coach theory test 2026, free PCV mock test, category D theory test",
  alternates: {
    canonical: `${siteUrl}/pcv-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/pcv-theory-test`,
    images: [{ url: shareImageUrl("ukpcv"), width: 1200, height: 630, alt: "Tigertest free PCV theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukpcv")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PCV Theory Practice Tests",
      description,
      url: `${siteUrl}/pcv-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 bus and coach theory practice questions",
        "4 practice tests across all seven topic areas",
        "4 training sets, one per practice test",
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
          name: "What is the pass mark for the PCV theory test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need 85 out of 100 on the multiple-choice part. The hazard perception part is a separate test with its own pass mark of 67 out of 100, and you must pass both within 2 years of each other. The practice tests here use the same 85 percent pass line.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the bus and coach theory test and how long do I get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The multiple-choice part has 100 questions and you have 1 hour 55 minutes. You can flag questions, change answers and finish early. The hazard perception part is 19 video clips, booked and paid for separately; it costs 11 pounds and the multiple-choice part costs 26 pounds.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the PCV theory test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Questions come from The Highway Code, Know your traffic signs and The Official DVSA Guide to Driving Buses and Coaches. DVSA's topics include vehicle weights and dimensions, drivers' hours and rest periods, braking systems, carrying passengers, the driver, the road, restricted view, incidents and emergencies, vehicle condition, documents, environmental issues, other road users and road and traffic signs. The practice tests here group them into seven areas.",
          },
        },
        {
          "@type": "Question",
          name: "Does this practice test include hazard perception?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Tigertest covers the multiple-choice part only. Hazard perception needs video clips where you click as a hazard develops, so practise it with DVSA's own materials before you book it.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real DVSA questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question here is original and written from the official sources: GOV.UK drivers' hours rules, The Highway Code and Know your traffic signs. DVSA's own revision questions are licensed and are not reproduced. Learn the rules behind each answer rather than memorising wording. It is a study tool, not a credential.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Drivers' Hours, Tachographs & Documents", weight: "16%" },
  { name: "Vehicle Size, Condition & Brakes", weight: "16%" },
  { name: "Carrying Passengers", weight: "16%" },
  { name: "The Driver & the Environment", weight: "12%" },
  { name: "The Road, Restricted View & Other Road Users", weight: "16%" },
  { name: "Incidents, Emergencies & Leaving the Vehicle", weight: "10%" },
  { name: "Road & Traffic Signs", weight: "14%" },
];

export default function PcvTheoryLandingPage() {
  return (
    <div data-theme="ukpcv" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PCV Theory Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/pcv-theory/dashboard"
            shortName="PCV Theory"
            subtitle="200 bus and coach theory questions on drivers' hours, tachographs, passengers, brakes, the road and traffic signs, with the real 85 percent pass mark. Multiple-choice part only. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukpcv-mobile.png", desktop: "/landing/ukpcv-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukpcv" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
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
                Four 50-question tests across every bus and coach topic, with the real 85 percent pass line and an explanation of the right answer and the common wrong pick on every item.
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
                Built on the DVSA Bus and Coach Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                DVSA draws the bus and coach theory questions from The Highway Code, Know your traffic signs and its guide to driving buses and coaches, across topics from drivers&apos; hours to restricted view. The practice tests here group those topics into seven areas. Drivers&apos; hours, vehicle condition and carrying passengers are the parts a car driver has never studied, so give them most of your time.
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
                src={getTigerAsset("ukpcv", 1)}
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
            How to Pass the PCV Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the drivers&apos; hours as two tables</h3>
              <p>
                Under the assimilated (EU) rules: 9 hours a day (10 twice a week), 56 a week, 90 in two weeks, 45 minutes of break after 4 hours 30 minutes, 11 hours of daily rest and 45 hours of weekly rest. Under the GB domestic rules, which cover regular services on routes up to 50 km: 10 hours of driving, a 16-hour spreadover and 30 minutes after 5 hours 30 minutes. Most wrong answers swap a number from one table into the other.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Think like the person responsible for every passenger</h3>
              <p>
                Wait for passengers to sit or hold on before moving off, never move with people on the stairs, brake early and gently, pull in close and parallel to the kerb, and keep exits and aisles clear. When a question asks what a bus driver should do, the answer that keeps passengers safe is almost always right.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your vehicle: brakes, height and size</h3>
              <p>
                Never move off with the air pressure warning on, choose a low gear before a long descent and use the retarder to avoid brake fade, and know your height before you meet a low bridge. Learn the bus speed limits too: 50 mph on single carriageways, 60 on dual carriageways and 70 on motorways, or 60 over 12 metres long.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. The pass mark is high at 85 out of 100, so aim for 90 percent on all four practice tests. After each test, drill the questions you missed and retrain that test&apos;s set, then practise hazard perception separately before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PCV Theory Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the PCV theory test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need 85 out of 100 on the multiple-choice part. The hazard perception part is a separate test with its own pass mark of 67 out of 100, and you must pass both within 2 years of each other. The practice tests here use the same 85 percent pass line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the bus and coach theory test and how long do I get?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The multiple-choice part has 100 questions and you have 1 hour 55 minutes. You can flag questions, change answers and finish early. The hazard perception part is 19 video clips, booked and paid for separately; it costs 11 pounds and the multiple-choice part costs 26 pounds.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the PCV theory test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Questions come from The Highway Code, Know your traffic signs and The Official DVSA Guide to Driving Buses and Coaches. DVSA&apos;s topics include vehicle weights and dimensions, drivers&apos; hours and rest periods, braking systems, carrying passengers, the driver, the road, restricted view, incidents and emergencies, vehicle condition, documents, environmental issues, other road users and road and traffic signs. The practice tests here group them into seven areas.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this practice test include hazard perception?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Tigertest covers the multiple-choice part only. Hazard perception needs video clips where you click as a hazard develops, so practise it with DVSA&apos;s own materials before you book it.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real DVSA questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question here is original and written from the official sources: GOV.UK drivers&apos; hours rules, The Highway Code and Know your traffic signs. DVSA&apos;s own revision questions are licensed and are not reproduced. Learn the rules behind each answer rather than memorising wording. It is a study tool, not a credential.
            </p>
          </div>
        </div>
      </div>

      <ExamSampleQuestions examId="ukpcv" />

      <ExamRelatedTests examId="ukpcv" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the PCV Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all seven topic areas.</p>
          <ExamLandingCTA dashboardHref="/pcv-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}
