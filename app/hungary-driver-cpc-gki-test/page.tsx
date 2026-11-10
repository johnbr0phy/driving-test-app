import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/hugki";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Hungary GKI Test 2026 - Free Driver CPC Theory Practice in English";
const metaDescription =
  "Free practice in English for Hungary's GKI (Driver CPC) theory exams for truck and bus drivers: 200 original questions, four 40-question tests and every answer explained.";
const description =
  "Free practice in English for the three computer-based theory exams of Hungary's GKI, the EU Driver CPC for truck and bus drivers: 200 original questions on eco-driving, brakes and safety systems, loads and passengers, EU driving and rest times, tachographs, Hungarian rules for heavy vehicles, permits and documents, health and fatigue, emergencies and the transport business. Four 40-question tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "gki test english, gki vizsga angolul, hungary driver cpc test, gépjárművezetői képesítési igazolvány, gki elméleti vizsga, gki teszt, code 95 hungary, hungarian truck driver exam english, hungary bus driver cpc, kav gki vizsga, gki practice test 2026",
  alternates: {
    canonical: `${siteUrl}/hungary-driver-cpc-gki-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/hungary-driver-cpc-gki-test`,
    images: [{ url: shareImageUrl("hugki"), width: 1200, height: 630, alt: "Tigertest free Hungary GKI Driver CPC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hugki")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What are the GKI theory exams like?",
    a: "The GKI basic qualification for truck or bus drivers ends with three computer-based theory exams taken at a KAV centre: safe and rational driving based on safety rules (BSZAVSZ), applying the regulations (EASZ), and health, road and environmental safety, service and logistics (EKKKBSZLSZ). Each has 40 multiple-choice questions in 40 minutes and is worth 40 points, and you need at least 30 points to pass each one. A 120-minute written case study (100 points, 60 to pass) and practical exams follow; Tigertest does not model those.",
  },
  {
    q: "Can I take the GKI theory exams in English?",
    a: "Yes. Since September 2022 the basic and periodic GKI theory exams can be taken with English and Russian test sheets without an interpreter, and Serbian and Ukrainian test sheets have been produced since 2020, according to the trade press. Under Hungary's training and exam decree you may choose any language version that exists, whatever your citizenship. Ask your training provider which language to book when it enrols you.",
  },
  {
    q: "Who needs a GKI?",
    a: "Every driver of a category C1, C1E, C, CE truck or D1, D1E, D, DE bus who drives for work in Hungary needs the basic qualification, unless an exemption applies, and then periodic training every five years. The GKI card carries the EU code 95 and is valid for five years; finish periodic training in the last six months and the new card runs on from the old expiry date. A driver from outside the EEA can qualify with a work permit or when employed by a business registered in Hungary.",
  },
  {
    q: "Does the course have to come first?",
    a: "Yes. Attending the course is compulsory. The basic course for one category lasts at least 44 hours (66 hours for truck and bus together) and periodic training at least 35 hours, and you can sit the exams once the theory part is completed. Everything, exams included, must be finished within a year of starting the course, or the course and the exams must be repeated.",
  },
  {
    q: "Are these the real GKI exam questions?",
    a: "No. Every question is original, written by Tigertest in English from the GKI curriculum and exam requirements of March 2025, the EU driving and rest time and tachograph rules, and Hungarian law as in force in November 2026. The KAV's own question bank is not public and was not used. Each Tigertest test mixes the three subjects, and 75% (30 of 40) matches the real pass line of each subject. It is free practice, not affiliated with the KAV or any Hungarian authority, and it does not book or replace your exams.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Hungary GKI Driver CPC Practice Test",
      description,
      url: `${siteUrl}/hungary-driver-cpc-gki-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 GKI theory questions in English for truck and bus drivers",
        "4 full tests of 40 questions",
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
  { name: "Driving Times, Rest & Working Time", weight: "5 of 40" },
  { name: "Hungarian Rules, Permits & Documents", weight: "5 of 40" },
  { name: "Health, Fitness & Fatigue", weight: "5 of 40" },
  { name: "Eco-Driving, Engine & Fuel", weight: "4 of 40" },
  { name: "Brakes & Safety Systems", weight: "4 of 40" },
  { name: "Emergencies, Crime & Security", weight: "4 of 40" },
  { name: "Transport Business, Service & Logistics", weight: "4 of 40" },
  { name: "Loads, Stability & Securing", weight: "3 of 40" },
  { name: "Buses & Passengers", weight: "3 of 40" },
  { name: "Tachographs", weight: "3 of 40" },
];

export default function HungaryGkiLandingPage() {
  return (
    <div data-theme="hugki" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Hungary GKI Driver CPC Practice Test in English 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/hungary-gki/dashboard"
            shortName="GKI test"
            subtitle="200 original questions in English for truck and bus drivers: eco-driving, brakes, loads and passengers, driving and rest times, tachographs, Hungarian heavy vehicle rules, health and emergencies. Four 40-question tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/hugki-mobile.png", desktop: "/landing/hugki-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hugki" />

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
                Five training sets cover eco-driving and brakes, loads and passengers, driving times and tachographs, rules, permits and the transport business, and health, safety and emergencies. Questions you miss come back until you have mastered them.
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
                Four 40-question tests, the length of one real subject exam, each mixing all three subjects, with the real 75% pass line (30 of 40). No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on the GKI Curriculum, for Trucks and Buses
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The questions follow the three theory subjects of the GKI curriculum and exam requirements (March 2025): vehicle technology and rational driving, the regulations (EU driving and rest times, tachographs, permits, documents and Hungarian rules), and health, safety, service and logistics. Hungarian details include the heavy vehicle speed limits, the weekend driving ban for trucks over 7.5 tonnes and the distance-based HU-GO toll, with no fines or toll rates. Truck and bus questions share one bank. The case study and the practical exams are not modelled.
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
                src={getTigerAsset("hugki", 1)}
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
            How to Pass the GKI Theory Exams
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Work the driving time rules on paper</h3>
              <p>
                The rules under Regulation (EC) No 561/2006 are easy to recite and easy to get wrong in a real week. Practise with numbers: 4.5 hours then a break, 9 hours a day (10 twice a week), 56 hours a week, 90 hours in two weeks, and how much rest is owed after a reduced weekly rest.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the Hungarian heavy vehicle rules</h3>
              <p>
                Know the limits for trucks over 3,500 kg (80 km/h on motorways, 70 km/h on other roads outside built-up areas), the following gap a car must be able to fit into, which roads trucks over 7.5 tonnes may use, and when the weekend ban starts in summer and in the rest of the year.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Understand your vehicle, not just the rules</h3>
              <p>
                The first subject asks why things work: the torque curve and the green band, why a retarder can lock the drive axle, what ABS, ASR, EBS and ESP each do, and how load height and position change stability. Learn the reason and the answer follows.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim above 30 of 40 in every subject</h3>
              <p>
                Each real subject is passed on its own, so a strong score in one cannot carry a weak one. Aim for 34 or more out of 40 in every Tigertest test, retrain the set behind your misses, then take all four tests again before your exam day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Hungary GKI Theory Exam Frequently Asked Questions
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

      <ExamSampleQuestions examId="hugki" />

      <ExamRelatedTests examId="hugki" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your GKI Exams?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions in English for truck and bus drivers in Hungary.</p>
          <ExamLandingCTA dashboardHref="/hungary-gki/dashboard" />
        </div>
      </div>
    </div>
  );
}
