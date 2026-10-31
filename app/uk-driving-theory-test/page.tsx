import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/ukcar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "UK Driving Theory Test Practice 2026 - Free Mock Tests";
const metaDescription =
  "Free UK car theory test practice: 200 original questions on the Highway Code, road signs, hazards and motorways, with every answer explained. Four mock tests.";
const description =
  "Free practice for the DVSA car theory test multiple-choice part: 200 original questions on alertness and attitude, your vehicle and loading, safety margins, hazards and vulnerable road users, motorway rules, rules of the road, road and traffic signs, and documents, incidents and emergencies. Four 50-question mock tests with the real 43 of 50 pass mark and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "UK driving theory test practice, theory test mock test, car theory test 2026, DVSA theory test practice questions, free theory test UK, Highway Code test questions, road signs test UK",
  alternates: {
    canonical: `${siteUrl}/uk-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/uk-driving-theory-test`,
    images: [{ url: shareImageUrl("ukcar"), width: 1200, height: 630, alt: "Tigertest free UK driving theory test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukcar")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free UK Driving Theory Test Practice",
      description,
      url: `${siteUrl}/uk-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 car theory test practice questions",
        "4 mock tests of 50 questions with the 43 of 50 pass mark",
        "4 training sets, one per mock test",
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
          name: "What is the pass mark for the UK car theory test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need 43 out of 50 on the multiple-choice part, which is 86 percent, and 44 out of 75 on the hazard perception part. You have to pass both parts to pass the theory test. Your pass certificate number lasts 2 years, and you must pass your practical driving test within that time or take the theory test again.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the theory test and how long do I get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The multiple-choice part has 50 questions in 57 minutes. Three of them are about a short silent video of a normal driving situation, which you can watch as many times as you like. You can flag questions and change answers before you finish. After a break of up to 3 minutes comes the hazard perception part: 14 video clips with 15 developing hazards, each worth up to 5 points.",
          },
        },
        {
          "@type": "Question",
          name: "What topics does the car theory test cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "DVSA takes its questions from The Highway Code, Know Your Traffic Signs and Driving: the essential skills. They cover 14 topics: alertness, attitude, safety and your vehicle, safety margins, hazard awareness, vulnerable road users, other types of vehicle, vehicle handling, motorway rules, rules of the road, road and traffic signs, essential documents, incidents, accidents and emergencies, and vehicle loading. The practice tests here group them into eight categories.",
          },
        },
        {
          "@type": "Question",
          name: "Who can take the theory test and what does it cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need a provisional driving licence and must be at least 17, or 16 if you get or have applied for the higher rate of the mobility part of Personal Independence Payment. The car theory test costs 23 pounds to book in England, Scotland and Wales. You can hear it in English or Welsh through headphones, take it with a British Sign Language video, or ask for extra time if you have a reading difficulty.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the official DVSA question bank, and does it include hazard perception?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No to both. Every question here is written by Tigertest from The Highway Code and the other official books, so it tests the same rules without copying the licensed DVSA revision questions. It covers the multiple-choice part only; the hazard perception video clips are not modelled, so practise those separately. It follows the rules for Great Britain, including the different drink-drive limits in Scotland and the 20 mph default in Wales. Northern Ireland has its own test.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Alertness & Attitude", weight: "10%" },
  { name: "Safety & Your Vehicle (incl. loading)", weight: "12%" },
  { name: "Safety Margins & Vehicle Handling", weight: "14%" },
  { name: "Hazards & Vulnerable Road Users", weight: "16%" },
  { name: "Motorway Rules", weight: "10%" },
  { name: "Rules of the Road", weight: "16%" },
  { name: "Road & Traffic Signs", weight: "12%" },
  { name: "Documents, Incidents & Emergencies", weight: "10%" },
];

export default function UkDrivingTheoryTestLandingPage() {
  return (
    <div data-theme="ukcar" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free UK Driving Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/uk-theory/dashboard"
            shortName="Theory Test"
            subtitle="200 questions on the Highway Code, road signs, motorways, safety margins, hazards and vulnerable road users, with the real 43 of 50 pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukcar-mobile.png", desktop: "/landing/ukcar-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukcar" />

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
                Four training sets, one per mock test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
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
                Four 50-question mock tests, the length of the real multiple-choice part, with the same 43 of 50 pass mark and an explanation of the right answer on every question.
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
                Built on the DVSA Theory Test Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                DVSA lists 14 topics for the car theory test but does not publish how many questions each gets. The mock tests here group the 14 into eight categories and lean on the ones that carry the most rules: hazards and vulnerable road users, rules of the road and safety margins. Every question is original and checked against the current Highway Code for Great Britain. The hazard perception clips are not part of these tests.
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
                src={getTigerAsset("ukcar", 1)}
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
            How to Pass the Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers by heart</h3>
              <p>
                A handful of figures come up again and again: national speed limits (30 in built-up areas, 20 in most of Wales, 60 on single carriageways, 70 on dual carriageways and motorways, less when towing), stopping distances (23 metres at 30 mph, 96 metres at 70 mph), the two-second gap, doubled in the wet and up to ten times on ice, 1.6 mm of tread, a 45-metre gap for a warning triangle and a 15-minute break every two hours.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read signs by shape and colour first</h3>
              <p>
                Circles give orders, triangles warn and rectangles inform. A red ring forbids, a blue circle tells you what to do, and direction signs are blue on motorways, green on primary routes and brown for tourist attractions. Once the system is clear, most sign questions answer themselves even when the symbol is new to you.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the hierarchy of road users</h3>
              <p>
                Since 2022 the Highway Code puts the greatest responsibility on those who can do the most harm. Give way to pedestrians crossing or waiting to cross at junctions, do not cut across cyclists going ahead, leave 1.5 metres when passing a cyclist at up to 30 mph, and pass horses at no more than 10 mph with 2 metres to spare. Many questions turn on these rules.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim to score 45 or more out of 50 on all four mock tests before you book, so you have room above the 43 pass mark. After each test, drill the questions you missed and retrain that test&apos;s set, and practise hazard perception clips alongside.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Theory Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the UK car theory test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need 43 out of 50 on the multiple-choice part, which is 86 percent, and 44 out of 75 on the hazard perception part. You have to pass both parts to pass the theory test. Your pass certificate number lasts 2 years, and you must pass your practical driving test within that time or take the theory test again.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the theory test and how long do I get?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The multiple-choice part has 50 questions in 57 minutes. Three of them are about a short silent video of a normal driving situation, which you can watch as many times as you like. You can flag questions and change answers before you finish. After a break of up to 3 minutes comes the hazard perception part: 14 video clips with 15 developing hazards, each worth up to 5 points.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What topics does the car theory test cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              DVSA takes its questions from The Highway Code, Know Your Traffic Signs and Driving: the essential skills. They cover 14 topics: alertness, attitude, safety and your vehicle, safety margins, hazard awareness, vulnerable road users, other types of vehicle, vehicle handling, motorway rules, rules of the road, road and traffic signs, essential documents, incidents, accidents and emergencies, and vehicle loading. The practice tests here group them into eight categories.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who can take the theory test and what does it cost?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need a provisional driving licence and must be at least 17, or 16 if you get or have applied for the higher rate of the mobility part of Personal Independence Payment. The car theory test costs 23 pounds to book in England, Scotland and Wales. You can hear it in English or Welsh through headphones, take it with a British Sign Language video, or ask for extra time if you have a reading difficulty.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the official DVSA question bank, and does it include hazard perception?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No to both. Every question here is written by Tigertest from The Highway Code and the other official books, so it tests the same rules without copying the licensed DVSA revision questions. It covers the multiple-choice part only; the hazard perception video clips are not modelled, so practise those separately. It follows the rules for Great Britain, including the different drink-drive limits in Scotland and the 20 mph default in Wales. Northern Ireland has its own test.
            </p>
          </div>
        </div>
      </div>

      <ExamSampleQuestions examId="ukcar" />

      <ExamRelatedTests examId="ukcar" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all 14 DVSA topics.</p>
          <ExamLandingCTA dashboardHref="/uk-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}
