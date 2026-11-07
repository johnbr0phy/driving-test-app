import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/mtcpc";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Malta Driver CPC Theory Test 2026 - Free Practice";
const metaDescription =
  "Free practice for the Malta Driver CPC initial qualification theory test for bus and truck drivers: 200 original questions on drivers' hours, tachographs, loads and passengers, 60% to pass.";
const description =
  "Free practice for the Driver CPC initial qualification theory test in Malta, for bus, coach and truck drivers (categories C1, C, D1 and D), with 200 original questions: rational and economical driving, brakes and driver assistance systems, risk and weather, loading and load securing, passenger comfort and safety, EU drivers' hours and working time, tachographs, CPC and carriage rules, health, alcohol and drugs, and emergencies and security. Four 50-question tests at the pace of the multiple-choice module with the 60 percent pass line and an explanation on every question.";

const faqs = [
  {
    q: "What is the Driver CPC theory test in Malta?",
    a: "Since 2008 for bus drivers and 2009 for truck drivers, anyone who drives a bus, coach or truck for work in Malta needs a Certificate of Professional Competence (CPC) as well as the licence. To get the initial qualification you pass theory and practical tests held by Transport Malta or a body it designates. The law sets at least four hours of theory, made of multiple-choice questions and case studies, and a practical part of at least two hours. Once you pass, code 95 is added to your licence.",
  },
  {
    q: "How many questions are there and what is the pass mark?",
    a: "Transport Malta's guidelines for approved training providers describe the CPC multiple-choice module as 80 questions in 100 minutes and the case study module as six case studies in 100 minutes, each with a 60 percent pass mark. The practice tests here are 50 questions at the same pace with the same 60 percent line. Check the current format with your training provider when you book.",
  },
  {
    q: "What does the CPC theory test cover?",
    a: "The subjects set out in the Thirteenth Schedule of the Motor Vehicles (Driving Licences) Regulations, which follow the EU Driver CPC Directive: rational and economical driving, brakes, retarders and safety systems such as ESP and AEBS, risk in traffic, loading and load securing, passenger comfort and safety, EU drivers' hours and working time, tachographs, the rules on carrying goods and passengers, health and fitness, emergencies, crime prevention and the transport business.",
  },
  {
    q: "How long does the CPC last, and what is periodic training?",
    a: "A CPC is valid for five years. To keep driving professionally you complete 35 hours of periodic training every five years at a training centre approved by Transport Malta, given in periods of at least seven hours, with no more than 12 hours by e-learning. Drivers who live in Malta, and non-EU drivers working for a Malta firm, take their CPC and periodic training in Malta.",
  },
  {
    q: "Are these the real CPC test questions?",
    a: "No. Every question here is original, written from Maltese law and the EU rules for professional drivers as in force in 2026. Tigertest is not affiliated with Transport Malta or any training provider. The case studies and the practical tests are not modelled here, and the category theory test for your licence is a separate Tigertest practice test. It is a study tool, not a qualification.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Malta Driver CPC theory test, CPC Malta practice test, Driver CPC initial qualification Malta, Transport Malta CPC test, bus driver CPC Malta, truck driver CPC Malta, code 95 Malta, CPC multiple choice Malta 2026",
  alternates: {
    canonical: `${siteUrl}/malta-driver-cpc-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/malta-driver-cpc-theory-test`,
    images: [{ url: shareImageUrl("mtcpc"), width: 1200, height: 630, alt: "Tigertest free Malta Driver CPC theory test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("mtcpc")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Malta Driver CPC Theory Test Practice",
      description,
      url: `${siteUrl}/malta-driver-cpc-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 original Driver CPC theory practice questions for bus and truck drivers",
        "4 practice tests of 50 questions, 60% to pass",
        "4 training sets, one per practice test",
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
  { name: "Drivers' Hours, Rest & Working Time", weight: "7 of 50" },
  { name: "Loading, Stability & Load Securing", weight: "6 of 50" },
  { name: "Passenger Comfort, Safety & Accessibility", weight: "6 of 50" },
  { name: "Rational Driving & Fuel Economy", weight: "5 of 50" },
  { name: "Brakes, Retarders & Driver Assistance", weight: "5 of 50" },
  { name: "Risk, Weather & Vulnerable Road Users", weight: "5 of 50" },
  { name: "Tachographs & Records", weight: "5 of 50" },
  { name: "CPC, Licences & Carriage Rules", weight: "4 of 50" },
  { name: "Emergencies, Security & the Transport Business", weight: "4 of 50" },
  { name: "Health, Fitness, Alcohol & Drugs", weight: "3 of 50" },
];

export default function MaltaDriverCpcLandingPage() {
  return (
    <div data-theme="mtcpc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Malta Driver CPC Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/malta-driver-cpc/dashboard"
            shortName="Driver CPC (Malta)"
            subtitle="200 original questions for the Driver CPC initial qualification theory test, for bus, coach and truck drivers in Malta: drivers' hours, tachographs, brakes, loads, passengers and safety. Four 50-question tests, 60% to pass. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/mtcpc-mobile.png", desktop: "/landing/mtcpc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="mtcpc" />

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
                Four 50-question tests at the pace of the 80-question multiple-choice module, with the same 60 percent pass line and an explanation of the right answer and the common wrong pick on every question.
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
                Built on the CPC Syllabus in Maltese Law
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Transport Malta does not publish how many questions come from each subject, so the weights below are Tigertest&apos;s, following the list of subjects in the Thirteenth Schedule of the Motor Vehicles (Driving Licences) Regulations. Every rule is as in force in 2026: EU drivers&apos; hours with the 2020 Mobility Package, smart tachographs, the Maltese speed limits of 40 km/h in towns and 60 km/h outside for goods vehicles and minibuses, the alcohol limits in the Traffic Regulation Ordinance (zero for bus and coach drivers), Code 95 and periodic training. One bank covers both bus and truck drivers.
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
                src={getTigerAsset("mtcpc", 1)}
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
            How to Pass the Driver CPC Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Aim well above 60 percent</h3>
              <p>
                The pass line is low, but the case studies test the same knowledge in harder, linked questions. Treat 40 or more out of 50 on a practice test as your target before you sit the real thing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make one drivers&apos; hours table</h3>
              <p>
                Write out 4.5 hours then a 45-minute break (or 15 then 30), 9 hours a day (10 twice a week), 56 a week, 90 a fortnight, 11 hours daily rest (12 if split, 9 reduced), 45 hours weekly rest (24 reduced, made up within three weeks) and the working time limits of 48 on average and 60 in a week. Then practise the questions that make you do the sums.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the Maltese figures</h3>
              <p>
                Goods vehicles and minibuses: 40 km/h in towns and villages and 60 km/h outside. Alcohol: 9 micrograms per 100 ml of breath for commercial vehicles and zero for buses and coaches. CPC: valid five years, 35 hours of periodic training in periods of at least seven hours, code 95 on the licence.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by subject. Master each training set, take its practice test, then drill the questions you missed and retrain that set. Finish by taking two tests back to back before your test date.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Driver CPC Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="mtcpc" />

      <ExamRelatedTests examId="mtcpc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Driver CPC Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 original questions for bus and truck drivers in Malta.</p>
          <ExamLandingCTA dashboardHref="/malta-driver-cpc/dashboard" />
        </div>
      </div>
    </div>
  );
}
