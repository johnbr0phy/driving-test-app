import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/fitruck";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Finland Truck and Bus Theory Test 2026 in English - Free Practice";
const metaDescription =
  "Free practice for the Finnish C, CE, D and DE theory test (teoriakoe) in English: 200 original questions on drivers' hours, tachographs, loads, passengers, brakes and winter driving.";
const description =
  "Free practice in English for the Finnish truck and bus theory test, categories C, CE, D and DE (teoriakoe): 200 original questions on EU driving and rest times, tachographs and documents, loads, masses and dimensions, carrying passengers, vehicle systems and faults, air brakes, winter tyres and coupling, heavy vehicles in traffic, blind spots and fitness to drive, and route planning, winter and incidents. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "finland truck theory test, finland bus theory test, c theory test finland, teoriakoe c, teoriakoe english, kuorma-auto teoriakoe, linja-auto teoriakoe, ce theory test finland, d theory test finland, ajovarma theory test, traficom truck licence, finnish truck licence test 2026",
  alternates: {
    canonical: `${siteUrl}/finland-truck-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/finland-truck-theory-test`,
    images: [{ url: shareImageUrl("fitruck"), width: 1200, height: 630, alt: "Tigertest free Finland truck and bus theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("fitruck")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the Finnish truck and bus theory test?",
    a: "For categories C, CE, D and DE the theory test (teoriakoe) is taken on a tablet at an Ajovarma service point and has three parts in 30 minutes: 20 multiple choice questions, 30 picture questions about traffic situations and 5 risk recognition questions. Traficom sets a minimum for each part: 14 of 20, 26 of 30 and 4 of 5. Failing any one part fails the test. Smaller categories (C1, C1E, D1, D1E) have a shorter test of 10, 30 and 5 questions.",
  },
  {
    q: "Can I take the truck or bus theory test in English?",
    a: "Traficom's rules name Finnish, Swedish and English as the languages of the theory test, and a candidate whose mother tongue is none of these and who does not know any of them well may be allowed an oral test with 60 minutes. Traficom's pages do not list languages by category, so check that English is available for your category when you book with Ajovarma. Tigertest's practice is in English and uses the Finnish terms you will meet, such as ammattipätevyys and rahtikirja.",
  },
  {
    q: "What do I need before I can take the test?",
    a: "Traficom says you need a valid category B licence when you take the truck theory test, and a certificate of instruction from your driving school or vocational institution. You can take the theory test one month before the minimum age: 21 for C and CE (18 with a basic professional qualification as a lorry driver), 24 for D and DE. A passed theory test is valid for one year. Drivers in commercial transport also need professional competence (ammattipätevyys), shown as code 95 on the licence.",
  },
  {
    q: "How does Tigertest's practice compare with the real test?",
    a: "Tigertest's four mock tests have 50 multiple choice questions each and an 80% target, the share of all 55 questions the real minimums add up to (44 of 55). The bank follows Traficom's topic list for heavy categories: driving and rest times, documents, loads, passengers, tyres, brakes, coupling, maintenance, blind spots and route planning, plus heavy vehicles in traffic. The real picture and risk recognition parts use photos and video; Tigertest describes the same situations in words.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from the Finnish Road Traffic Act, the EU rules on driving times and tachographs and Traficom's rules for the theory test, so it tests the same knowledge without copying any official question. Truck and bus topics are in one bank. It is free practice, not affiliated with Traficom, Ajovarma or A-Katsastus, and it does not book or replace your test or the professional competence training.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Finland Truck and Bus Theory Practice Test",
      description,
      url: `${siteUrl}/finland-truck-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 Finnish truck and bus theory questions in English",
        "4 mock tests of 50 questions",
        "5 training sets by topic",
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
  { name: "Driving & Rest Times", weight: "14%" },
  { name: "Brakes, Tyres & Coupling", weight: "14%" },
  { name: "Heavy Vehicles in Traffic", weight: "14%" },
  { name: "Loads, Masses & Dimensions", weight: "12%" },
  { name: "Tachographs, Documents & Driver CPC", weight: "10%" },
  { name: "Carrying Passengers", weight: "10%" },
  { name: "Vehicle Systems, Maintenance & Faults", weight: "10%" },
  { name: "Blind Spots, Risks & Fitness to Drive", weight: "10%" },
  { name: "Route Planning, Winter & Incidents", weight: "6%" },
];

export default function FinlandTruckTheoryLandingPage() {
  return (
    <div data-theme="fitruck" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Finland Truck and Bus Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/finland-truck-theory/dashboard"
            shortName="Theory test"
            subtitle="200 original questions in English for the Finnish C, CE, D and DE teoriakoe: EU driving and rest times, tachographs, load securing, passengers, air brakes, 5 mm winter tyres and heavy vehicles in traffic. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/fitruck-mobile.png", desktop: "/landing/fitruck-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="fitruck" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets cover drivers&apos; hours and tachographs, loads and passengers, brakes, tyres and the vehicle, heavy vehicles in traffic, and blind spots, winter and incidents. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that together cover all 200 questions, with an 80% target, the share of all questions the real test&apos;s minimums add up to. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on Traficom&apos;s Topics for Heavy Vehicles
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Traficom lists the topics of the C, CE, D and DE theory test: driving and rest times, carrying goods or passengers, documents, accidents, tyre changing, masses, dimensions and speed limiters, blind spots, route planning, load safety, vehicle construction, lubrication and antifreeze, brakes, coupling, fault finding and maintenance, plus picture questions on turning, giving way, overtaking, changing lanes, stopping and parking. Tigertest follows those areas with the Finnish Road Traffic Act and the EU rules: 4.5 hours of driving before a break, a truck&apos;s own 80 km/h limit, the two right-hand lanes on a three-lane motorway, 5 mm winter tread on driven axles and alcohol interlocks on school transport. The real test&apos;s photos and risk recognition videos are not modelled; situations are described in words.
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
                src={getTigerAsset("fitruck", 1)}
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
            How to Pass the Finnish Truck and Bus Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the driving and rest times by heart</h3>
              <p>
                The EU rules are full of numbers that look alike: 4.5 hours, 45 minutes, 9 and 10 hours a day, 56 hours a week, 90 in two weeks, 11 hours of daily rest, 45 hours of weekly rest. Learn which number goes with which rule, and the split break of 15 then 30 minutes and the split rest of 3 then 9 hours.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the Finnish rules for heavy vehicles</h3>
              <p>
                A truck&apos;s own maximum is 80 km/h, and a bus may do 100 km/h only when approved for it and with no one standing. On a motorway with three lanes each way, trucks and combinations over 7 metres use only the two right-hand lanes. From November to March, when conditions require, driven axles need 5 mm of winter tread.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think like a heavy vehicle driver</h3>
              <p>
                Picture questions are the biggest part of the real test, and you need 26 of 30. Ask who gives way, where your blind areas are, how the rear wheels cut in on a turn and how much room your vehicle needs to stop. Moose, reindeer and black ice are part of Finnish driving.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above the pass mark</h3>
              <p>
                Each part has its own minimum, so a weak part fails the whole test. Aim for 45 or more in every mock test, drill the questions you missed, then take all four tests back to back before you book at Ajovarma.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Finland Truck and Bus Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="fitruck" />

      <ExamRelatedTests examId="fitruck" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Truck or Bus Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on Finnish and EU rules for truck and bus drivers, in English.</p>
          <ExamLandingCTA dashboardHref="/finland-truck-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}
