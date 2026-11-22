import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/plcpc";
import { SITE_URL } from "@/lib/siteUrl";
import { examLandingAlternates, examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Poland Driver CPC Qualification Test 2026 - Free Practice";
const metaDescription =
  "Practice for the Polish professional driver qualification test (kwalifikacja wstępna) at the WORD, for truck and bus drivers: 200 original questions in English, basic part plus C and D specialist blocks. Free to start.";
const description =
  "Practice in English for the qualification test (test kwalifikacyjny) that ends the initial qualification for professional drivers in Poland, for truck (C, C+E) and bus (D, D+E) drivers, with 200 original questions: rational and economical driving, brakes and driver assistance systems, EU drivers' hours and the Polish Drivers' Working Time Act, tachographs, road and workplace risk, crime and smuggling, health and fatigue, emergencies and first aid, the driver's qualification duties and service, plus a freight block (loading, load securing, CMR, ADR, cabotage) and a passenger block (passenger comfort and safety, bus passenger rights). Four 50-question tests and five training sets, with an explanation on every question. Free to start, no account needed.";

const faqs = [
  {
    q: "What is the qualification test for professional drivers in Poland?",
    a: "Anyone in Poland who drives a truck (C1, C, C+E) or a bus (D1, D, D+E) for work needs an initial qualification (kwalifikacja wstępna) as well as the licence. It takes a 280-hour course at an accredited training centre, or a 140-hour accelerated course, and ends with a computer-based qualification test at a voivodeship road traffic centre (WORD). Passing it gives the certificate of professional competence, and code 95 then goes on the driving licence or on a driver qualification card.",
  },
  {
    q: "How many questions are there and what is the pass mark?",
    a: "Under the Minister of Infrastructure's regulation on training and examining drivers (Dz.U. 2026 poz. 1355, in force from 3 November 2026), the test after initial or accelerated qualification has 30 questions in 45 minutes: a basic part of 20 questions and a specialist part of 10 questions for the truck or bus block. Each question has one correct answer. You pass with at least 16 correct in the basic part and at least 5 in the specialist part. Tigertest's tests are 50 questions with both blocks, and 70 percent (35 of 50) is the line, the same share as 21 of 30.",
  },
  {
    q: "Can I take the test in English?",
    a: "The test is held in Polish. The regulation allows a WORD to provide the test in a language the candidate speaks, and trade press reports that WORD Warszawa has run it with question sets translated into English; otherwise a candidate who does not speak Polish may bring a sworn translator. Ask your WORD which languages it offers when you book. Tigertest's practice is in English, with a Polish version.",
  },
  {
    q: "What does the test cover?",
    a: "The basic part covers the subjects in annex 1 to the regulation: rational driving and engine characteristics, brakes and safety systems such as ESP, AEBS, ABS and TCS, drivers' hours and tachographs, accident risk, crime and smuggling of people, physical hazards and ergonomics, health and fatigue, emergencies and first aid, and the carrier's image. The specialist part covers loading, fuel-efficient driving, hazard perception, goods carriage rules and the haulage market for trucks, or passenger comfort and safety, bus loading, passenger rules and the passenger market for buses.",
  },
  {
    q: "Are these the real WORD test questions?",
    a: "No. Every question here is original, written from the Polish Road Transport Act, the Road Traffic Act, the Drivers' Working Time Act and the EU rules for professional drivers as in force in 2026. Tigertest is not affiliated with any WORD, the Ministry of Infrastructure or any training centre. The practical parts of the course are not modelled, and passing a practice test is not a qualification.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Poland driver CPC test, kwalifikacja wstępna test, test kwalifikacyjny kierowcy zawodowego, Polish CPC practice test in English, WORD qualification test, code 95 Poland, truck driver Poland test, bus driver Poland test 2026",
  alternates: {
    canonical: `${siteUrl}/poland-driver-cpc-practice-test`,
    languages: examLandingAlternates("plcpc"),
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/poland-driver-cpc-practice-test`,
    images: [{ url: shareImageUrl("plcpc"), width: 1200, height: 630, alt: "Tigertest free Poland Driver CPC qualification test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("plcpc")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Poland Driver CPC Qualification Test Practice",
      description,
      url: `${siteUrl}/poland-driver-cpc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("plcpc", "PLN"),
      featureList: [
        "200 original qualification test questions for truck and bus drivers in Poland",
        "4 practice tests of 50 questions, 70% to pass",
        "5 training sets, with separate truck (C) and bus (D) sets",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Drivers' Hours & Working Time", weight: "6 of 50" },
  { name: "Rational Driving & Fuel Economy", weight: "4 of 50" },
  { name: "Brakes, Retarders & Driver Assistance", weight: "4 of 50" },
  { name: "Tachographs & Records", weight: "4 of 50" },
  { name: "Road & Workplace Risk", weight: "4 of 50" },
  { name: "Emergencies, First Aid & Fire", weight: "4 of 50" },
  { name: "Health, Fatigue, Alcohol & Drugs", weight: "3 of 50" },
  { name: "Qualification, Service & Company Image", weight: "3 of 50" },
  { name: "Crime & Smuggling of People", weight: "2 of 50" },
  { name: "Freight (C): Loading & Load Securing", weight: "4 of 50" },
  { name: "Freight (C): Goods Carriage Rules & Market", weight: "4 of 50" },
  { name: "Passengers (D): Comfort, Safety & Bus Loading", weight: "4 of 50" },
  { name: "Passengers (D): Passenger Rules & Market", weight: "4 of 50" },
];

export default function PolandDriverCpcLandingPage() {
  return (
    <div data-theme="plcpc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Poland Driver CPC Qualification Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/poland-driver-cpc/dashboard"
            shortName="Driver CPC (Poland)"
            subtitle="200 qualification test questions in English for truck and bus drivers. Four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/plcpc-mobile.png", desktop: "/landing/plcpc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="plcpc" />

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
                Five training sets: three for the basic part everyone sits, one for the truck (C) block and one for the bus (D) block. Master a set, then take a test. Questions you miss come back until you have mastered them.
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
                Four 50-question tests in the shape of the real one: about two thirds basic questions and one third specialist, with both the truck and bus blocks in every test, a 70 percent line and an explanation of the right answer and the common wrong pick on every question.
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
                Built on the Polish Qualification Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real test draws 2 or 3 basic questions from each of nine sections of annex 1 to the regulation on training and examining drivers, plus specialist questions for your block. It publishes no further weights, so the split below is Tigertest&apos;s. Every rule is as in force in 2026: EU drivers&apos; hours with the 2020 Mobility Package, the Polish Drivers&apos; Working Time Act, smart tachographs, the Road Traffic Act limits for heavy vehicles and buses, load overhang rules, CMR, ADR basics and EU bus passenger rights. The 34 basic questions in each test apply to everyone; the truck and bus blocks are 8 each.
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
                src={getTigerAsset("plcpc", 3)}
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
            How to Pass the Qualification Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Pass both parts, not just the total</h3>
              <p>
                The real test needs 16 of 20 in the basic part, which is 80 percent, and 5 of 10 in the specialist part. A good total does not save a weak basic part, so aim for 40 or more out of 50 on a practice test, with few misses in the basic topics.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make one drivers&apos; hours table</h3>
              <p>
                Write out 4.5 hours then a 45-minute break (or 15 then 30), 9 hours a day (10 twice a week), 56 a week, 90 a fortnight, 11 hours daily rest (3 plus 9 if split, 9 reduced), 45 hours weekly rest (24 reduced), and beside it the Polish Act: 8 hours a day and 40 a week on average, 48 with overtime and 60 at most in a week, 30 or 45 minutes of break after 6 hours of work, 10 hours if any work falls in the night period. Then practise the questions that make you do the sums.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the Polish figures for heavy vehicles</h3>
              <p>
                Over 3.5 t: 80 km/h on motorways and expressways, 70 km/h on other roads outside built-up areas, 100 km/h for buses that meet the extra conditions. In tunnels over 500 m, 80 m behind the vehicle ahead for a combination. Loads: 23 cm on one side, 0.5 m at the front, marking at the rear from 0.5 m, 4 m height. Medical checks every 5 years, every 30 months from 60, and periodic training every five years.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by subject. Master each training set, take a practice test, then drill the questions you missed and retrain your weakest topic. Finish by taking two tests back to back before your test date.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Poland Driver CPC Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="plcpc" />

      <ExamRelatedTests examId="plcpc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Qualification Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 original questions in English for truck and bus drivers in Poland.</p>
          <ExamLandingCTA dashboardHref="/poland-driver-cpc/dashboard" />
        </div>
      </div>
    </div>
  );
}
