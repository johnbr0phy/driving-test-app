import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "LGV Theory Test Practice 2026 - Free Lorry Mock Tests";
const metaDescription =
  "Free LGV theory test practice for Driver CPC part 1: 200 questions on drivers' hours, tachographs, loading, brakes and signs, every answer explained.";
const description =
  "Free practice for the multiple-choice part of the DVSA lorry (LGV) theory test, with 200 original questions across the DVSA lorry topics: drivers' hours and tachographs, vehicle condition and braking systems, weights, dimensions and loading, the road and other road users, documents and the environment, incidents and traffic signs. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "LGV theory test, HGV theory test, lorry theory test practice, LGV theory test 2026, Driver CPC part 1, free HGV theory test questions, DVSA lorry theory test, Cat C theory test",
  alternates: {
    canonical: `${siteUrl}/lgv-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/lgv-theory-test`,
    images: [{ url: shareImageUrl("uklgv"), width: 1200, height: 630, alt: "Tigertest free LGV theory test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("uklgv")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free LGV Theory Test Practice",
      description,
      url: `${siteUrl}/lgv-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 LGV theory practice questions",
        "4 practice tests across all seven topic groups",
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
          name: "What is the pass mark for the lorry theory test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need 85 out of 100 on the multiple-choice part. The hazard perception part is marked separately: 19 video clips scored out of 100, with a pass mark of 67. The practice tests here use the same 85 percent pass line, so clearing it on all four tests is a good sign you are ready.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the LGV theory test and how long do I get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The multiple-choice part has 100 questions and you have 1 hour 55 minutes. You can flag questions to come back to and change answers before you finish. Hazard perception is booked and taken as a separate part.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the lorry theory test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The questions come from The Highway Code, Know Your Traffic Signs and The Official DVSA Guide to Driving Goods Vehicles. Topics include drivers' hours and rest periods, braking systems, vehicle condition, weights and dimensions, vehicle loading, restricted view, the road, other road users, accident handling, documents, leaving the vehicle, environmental issues and traffic signs.",
          },
        },
        {
          "@type": "Question",
          name: "How much does the lorry theory test cost and how long does a pass last?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Booked through GOV.UK, the multiple-choice part costs 26 pounds and hazard perception 11 pounds. Your theory test certificate is valid for 2 years from when you pass the first part, and you must pass both parts within 2 years of each other. After the theory you still need the Driver CPC case studies and the practical tests.",
          },
        },
        {
          "@type": "Question",
          name: "Does this practice test include hazard perception or the real DVSA questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. It covers the multiple-choice part only; the hazard perception clips are not included. Every question here is original, written from The Highway Code, GOV.UK guidance on drivers' hours, tachographs and load securing, and the DVSA lorry topics. It is a study tool, not the official DVSA revision bank.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Drivers' Hours & the Driver", weight: "18%" },
  { name: "Vehicle Condition & Brakes", weight: "16%" },
  { name: "Weights, Dimensions & Loading", weight: "16%" },
  { name: "The Road & Other Road Users", weight: "16%" },
  { name: "Documents, Security & Environment", weight: "12%" },
  { name: "Incidents & Emergencies", weight: "10%" },
  { name: "Traffic Signs", weight: "12%" },
];

export default function LgvTheoryLandingPage() {
  return (
    <div data-theme="uklgv" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free LGV Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/lgv-theory/dashboard"
            shortName="LGV Theory"
            subtitle="200 questions for the UK lorry theory test on drivers' hours, tachographs, air brakes, load security, weights and dimensions, the road, incidents and traffic signs, with an 85% pass line like the real test. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/uklgv-mobile.png", desktop: "/landing/uklgv-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="uklgv" />

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
                Four 50-question tests covering every DVSA lorry topic, with the real test&apos;s 85 percent pass line and an explanation of the right answer and the common wrong pick on every item. Hazard perception is not included.
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
                Built on the DVSA Lorry Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The DVSA draws lorry theory questions from The Highway Code, Know Your Traffic Signs and its guide to driving goods vehicles, across topics from drivers&apos; hours to vehicle loading. Tigertest groups them into seven areas. The DVSA does not publish how many questions come from each, so the split below follows how much there is to learn: drivers&apos; hours and tachographs take the largest share, then brakes, loading and the road.
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
                src={getTigerAsset("uklgv", 1)}
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
            How to Pass the LGV Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the drivers&apos; hours numbers as a set</h3>
              <p>
                Most of the numbers on the test are drivers&apos; hours: 9 hours of daily driving (10 twice a week), 56 hours a week and 90 over two weeks, a 45-minute break after 4 hours 30 minutes, 11 hours of daily rest (9 when reduced, up to three times between weekly rests) and 45 hours of weekly rest. Add the tachograph rules, such as 15 days without a card and 7 days to report it, and practise until you can tell the figures apart.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your vehicle: brakes, height and weight</h3>
              <p>
                Understand how air brakes, endurance brakes and ABS work and what their warning lights mean, why tanks are drained and how brake fade happens. Learn the limits that keep you out of trouble on the road: speed limits for lorries over 7.5 tonnes, the maximum lengths and widths, your plated weights and your vehicle&apos;s travelling height in feet and inches as well as metres.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think like a professional around other road users</h3>
              <p>
                Many questions test judgement: blind spots and which mirror covers them, cyclists on your nearside when you turn left, the space to give horses and cyclists, keeping a load secure and what to do when it shifts, and how to handle a breakdown or incident safely. The Highway Code&apos;s hierarchy of road users puts lorry drivers near the top for responsibility.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. The real test needs 85 out of 100, which leaves little room for weak areas, so after each practice test drill the questions you missed and retrain that test&apos;s set. Practise hazard perception separately with the official DVSA materials, as it is a different part of the test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          LGV Theory Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the lorry theory test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need 85 out of 100 on the multiple-choice part. The hazard perception part is marked separately: 19 video clips scored out of 100, with a pass mark of 67. The practice tests here use the same 85 percent pass line, so clearing it on all four tests is a good sign you are ready.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the LGV theory test and how long do I get?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The multiple-choice part has 100 questions and you have 1 hour 55 minutes. You can flag questions to come back to and change answers before you finish. Hazard perception is booked and taken as a separate part.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the lorry theory test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The questions come from The Highway Code, Know Your Traffic Signs and The Official DVSA Guide to Driving Goods Vehicles. Topics include drivers&apos; hours and rest periods, braking systems, vehicle condition, weights and dimensions, vehicle loading, restricted view, the road, other road users, accident handling, documents, leaving the vehicle, environmental issues and traffic signs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How much does the lorry theory test cost and how long does a pass last?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Booked through GOV.UK, the multiple-choice part costs 26 pounds and hazard perception 11 pounds. Your theory test certificate is valid for 2 years from when you pass the first part, and you must pass both parts within 2 years of each other. After the theory you still need the Driver CPC case studies and the practical tests.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this practice test include hazard perception or the real DVSA questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. It covers the multiple-choice part only; the hazard perception clips are not included. Every question here is original, written from The Highway Code, GOV.UK guidance on drivers&apos; hours, tachographs and load securing, and the DVSA lorry topics. It is a study tool, not the official DVSA revision bank.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="uklgv" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your LGV Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every DVSA lorry topic.</p>
          <ExamLandingCTA dashboardHref="/lgv-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}
