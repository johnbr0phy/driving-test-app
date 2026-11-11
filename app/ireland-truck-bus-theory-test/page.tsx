import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/iedttcv";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Ireland Truck and Bus Theory Test 2026 - Free Practice";
const metaDescription =
  "Free practice for Ireland's category C and D Driver Theory Test: 200 original questions on drivers' hours, tachographs, air brakes, loads and passengers, 74% to pass.";
const description =
  "Free practice for the Irish truck and bus Driver Theory Test (categories C and D) with 200 original questions: licences and Driver CPC, EU drivers' hours and working time, tachographs, air brakes and coupling, weights, dimensions and load security, carrying passengers, heavy vehicle speed limits and lanes, blind spots, fatigue and alcohol, and breakdowns and incidents. Four 50-question tests at the real pace with the real 74 percent pass line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "truck theory test Ireland, bus theory test Ireland, category C theory test, category D theory test, CD theory test practice, RSA truck theory test, Driver CPC theory test Ireland, HGV theory test Ireland 2026",
  alternates: {
    canonical: `${siteUrl}/ireland-truck-bus-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ireland-truck-bus-theory-test`,
    images: [{ url: shareImageUrl("iedttcv"), width: 1200, height: 630, alt: "Tigertest free Ireland truck and bus theory test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("iedttcv")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Ireland Truck and Bus Theory Test Practice",
      description,
      url: `${siteUrl}/ireland-truck-bus-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("iedttcv", "EUR"),
      featureList: [
        "200 original truck and bus theory test practice questions",
        "4 practice tests of 50 questions, 74% to pass",
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
          name: "What score do I need to pass the truck or bus theory test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The category C (truck) and category D (bus) Driver Theory Tests are each 100 multiple-choice questions in 120 minutes, and you need 74 correct to pass. The combined truck and bus test is 140 questions in 180 minutes with 104 to pass. The practice tests here are 50 questions at the same pace and the same 74 percent line.",
          },
        },
        {
          "@type": "Question",
          name: "Who needs the truck and bus theory test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Anyone in Ireland who wants a learner permit to drive a truck (categories C1 and C) or a bus (categories D1 and D). You must already hold a full category B car licence. The certificate is valid for two years from the test date, and the bus or truck test also covers the first step of the Driver CPC for professional drivers.",
          },
        },
        {
          "@type": "Question",
          name: "Can I take the test in Irish, and is there a module test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The separate truck and bus tests are offered in English and Irish; the combined test is in English only for now. If you passed a full truck or bus test on or after 30 September 2014, you can add the other category within two years with a 40-question module test (45 minutes, 30 to pass).",
          },
        },
        {
          "@type": "Question",
          name: "What does the truck and bus test cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Everything in the car theory test plus the rules a professional driver lives by: EU drivers' hours and working time, tachographs, air brakes and coupling, weights, dimensions and load security, carrying passengers, heavy vehicle speed limits (90 km/h for trucks on motorways, 80 elsewhere; 100 for coaches on motorways and dual carriageways), blind spots, fatigue and the 20 mg drink-driving limit for professional drivers.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real theory test questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The RSA's official question bank is copyrighted and sold separately. Every question here is original, written from EU and Irish rules for truck and bus drivers. Tigertest is not affiliated with the Road Safety Authority. The Driver CPC case study test (step 2) is separate and is not modelled here. It is a study tool, not a licence.",
          },
        }
      ],
    },
  ],
};

const contentAreas = [
  { name: "Drivers' Hours & Working Time", weight: "7 of 50" },
  { name: "Brakes, Coupling & Vehicle Checks", weight: "7 of 50" },
  { name: "Speed Limits, Lanes & Large Vehicles", weight: "7 of 50" },
  { name: "Weights, Dimensions & Load Security", weight: "6 of 50" },
  { name: "Carrying Passengers", weight: "6 of 50" },
  { name: "Tachographs & Records", weight: "5 of 50" },
  { name: "Blind Spots, Fatigue & Alcohol", weight: "5 of 50" },
  { name: "Licences, Driver CPC & Roadworthiness", weight: "4 of 50" },
  { name: "Eco-Driving, Breakdowns & Incidents", weight: "3 of 50" },
];

export default function IrelandTruckBusTheoryLandingPage() {
  return (
    <div data-theme="iedttcv" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Ireland Truck and Bus Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ireland-truck-bus-theory/dashboard"
            shortName="Truck & Bus Theory"
            subtitle="200 original questions for the category C and D Driver Theory Test: drivers' hours, tachographs, air brakes, loads, passengers and heavy vehicle rules on Irish roads. Four 50-question tests at the real pace, 74% to pass. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/iedttcv-mobile.png", desktop: "/landing/iedttcv-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="iedttcv" />

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
                Four training sets, one per topic area, from Drivers&apos; Hours &amp; Tachographs to Licences, Fatigue &amp; Emergencies. Master a topic, then take a test. Questions you miss come back until you have mastered them.
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
                Four 50-question tests, half the length of the real 100-question test at the same pace, with the same 74 percent pass line and an explanation of the right answer and the common wrong pick on every question.
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
                Built on Irish and EU Rules for Professional Drivers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The RSA does not publish how many questions come from each topic, so the weights below are Tigertest&apos;s, centred on what a truck or bus driver must know beyond the car test. Every rule is Irish or EU law as in force in 2026: the Irish speed limits for trucks and buses, Regulation 561/2006 drivers&apos; hours with the 2020 Mobility Package, 56 days of tachograph records since 31 December 2024, the 20 mg limit for professional drivers, Driver CPC, CVRT and the Dublin Port Tunnel for five-axle trucks. Signs, junctions and roundabouts are in our Ireland car theory test.
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
                src={getTigerAsset("iedttcv", 1)}
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
            How to Pass the Truck and Bus Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Aim well above 74 percent</h3>
              <p>
                The real test is 100 questions and you can drop only 26. Treat 42 or more out of 50 on a practice test as your target, and keep retaking a test until you reach it before you book.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make one drivers&apos; hours table</h3>
              <p>
                Most lost marks are numbers. Write out 4.5 hours then a 45-minute break (or 15 then 30), 9 hours a day (10 twice a week), 56 a week, 90 a fortnight, 11 hours daily rest (9 reduced, three times), 45 hours weekly rest (24 reduced), and the working time limits of 48 on average, 60 in a week and 10 a day with night work. Then practise questions that make you do the sums.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your vehicle</h3>
              <p>
                Learn how air brakes, spring brakes and endurance brakes work, what the red and yellow trailer lines do, the 2.55 m width and 16.5 m articulated length, why part-unloading can overload the front axle, and the speed limits: trucks 90 km/h on motorways and 80 elsewhere, coaches 100 on motorways and dual carriageways and 80 elsewhere, buses with standing passengers 65.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Master each training set, take a practice test, then drill the questions you missed and retrain your weakest topic. Finish by taking two tests back to back, 100 questions in two hours, before your test date.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Truck and Bus Theory Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass the truck or bus theory test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The category C (truck) and category D (bus) Driver Theory Tests are each 100 multiple-choice questions in 120 minutes, and you need 74 correct to pass. The combined truck and bus test is 140 questions in 180 minutes with 104 to pass. The practice tests here are 50 questions at the same pace and the same 74 percent line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who needs the truck and bus theory test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Anyone in Ireland who wants a learner permit to drive a truck (categories C1 and C) or a bus (categories D1 and D). You must already hold a full category B car licence. The certificate is valid for two years from the test date, and the bus or truck test also covers the first step of the Driver CPC for professional drivers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Can I take the test in Irish, and is there a module test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The separate truck and bus tests are offered in English and Irish; the combined test is in English only for now. If you passed a full truck or bus test on or after 30 September 2014, you can add the other category within two years with a 40-question module test (45 minutes, 30 to pass).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the truck and bus test cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Everything in the car theory test plus the rules a professional driver lives by: EU drivers&apos; hours and working time, tachographs, air brakes and coupling, weights, dimensions and load security, carrying passengers, heavy vehicle speed limits (90 km/h for trucks on motorways, 80 elsewhere; 100 for coaches on motorways and dual carriageways), blind spots, fatigue and the 20 mg drink-driving limit for professional drivers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real theory test questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. The RSA&apos;s official question bank is copyrighted and sold separately. Every question here is original, written from EU and Irish rules for truck and bus drivers. Tigertest is not affiliated with the Road Safety Authority. The Driver CPC case study test (step 2) is separate and is not modelled here. It is a study tool, not a licence.
            </p>
          </div>
        </div>
      </div>

      <ExamSampleQuestions examId="iedttcv" />

      <ExamRelatedTests examId="iedttcv" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Truck or Bus Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 original questions for Irish truck and bus drivers.</p>
          <ExamLandingCTA dashboardHref="/ireland-truck-bus-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}
