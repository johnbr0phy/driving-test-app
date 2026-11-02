import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/fitheory";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Finland Driving Theory Test 2026 in English - Free Practice";
const metaDescription =
  "Free practice for the Finnish category B theory test (teoriakoe) in English: 200 original questions on Finnish traffic rules, four 50-question mock tests, every answer explained.";
const description =
  "Free practice in English for the Finnish category B driving theory test (teoriakoe): 200 original questions on the Road Traffic Act, covering the right-hand rule and giving way, speed and lanes, overtaking, stopping and parking, Finnish traffic signs, markings and signals, pedestrians and cyclists, alcohol and licence rules, winter tyres and safety equipment. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "finland driving theory test, finnish theory test in english, teoriakoe, teoriakoe english, ajokortti theory test, category b theory test finland, finnish driving licence test, ajovarma theory test, traficom theory test, finland driving test questions 2026",
  alternates: {
    canonical: `${siteUrl}/finland-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/finland-driving-theory-test`,
    images: [{ url: shareImageUrl("fitheory"), width: 1200, height: 630, alt: "Tigertest free Finland driving theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("fitheory")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the Finnish category B theory test?",
    a: "The theory test (teoriakoe) is taken on a tablet at an Ajovarma service point and has three parts: 15 multiple choice questions, 50 picture questions about traffic situations and 5 risk recognition questions. You have 30 minutes. Each part has its own pass mark: at least 11 of 15, 43 of 50 and 4 of 5, as set by Traficom. Failing any one part fails the test.",
  },
  {
    q: "Can I take the Finnish theory test in English?",
    a: "Yes. Traficom gives Finnish, Swedish and English as the languages of the test. If your mother tongue is none of these and you do not know any of them well, you may be allowed an oral test with 60 minutes, and in some cases an interpreter. Tigertest's practice is in English and uses the Finnish terms you will meet on signs and in the rules, such as taajama and pihakatu.",
  },
  {
    q: "How does Tigertest's practice compare with the real test?",
    a: "Tigertest's four mock tests have 50 multiple choice questions each, and the 86% target (43 of 50) matches the share needed on the real picture part. The picture and risk recognition questions on the real test show photos and video clips; Tigertest describes the same traffic situations in words, so it trains the rules behind them but not reading the pictures. Pass all four mock tests comfortably before you book.",
  },
  {
    q: "What changed for young drivers in 2026?",
    a: "The amended Driving Licence Act came into force on 29 May 2026. A 17-year-old who holds a car licence on an age exception permit may not drive a category B vehicle between midnight and 5 a.m., and from 1 October 2026 a sign identifying an underage driver is required on cars driven by 17-year-olds. Risk recognition training grew from 8 to 12 hours from 1 October 2026. The normal age for a category B licence is 18.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from the Finnish Road Traffic Act (Tieliikennelaki) and Traficom's rules for the theory test, so it tests the same knowledge without copying any official question. Signs and traffic situations are described in words. It is free practice, not affiliated with Traficom, Ajovarma or A-Katsastus, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Finland Driving Theory Practice Test",
      description,
      url: `${siteUrl}/finland-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 Finnish traffic rule and sign questions in English",
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
  { name: "Traffic Signs", weight: "16%" },
  { name: "Giving Way & Junctions", weight: "14%" },
  { name: "Overtaking & Meeting", weight: "12%" },
  { name: "Speed, Lanes & Motorways", weight: "10%" },
  { name: "Stopping & Parking", weight: "10%" },
  { name: "Pedestrians, Cyclists & Other Road Users", weight: "10%" },
  { name: "The Driver, Alcohol & Licence Rules", weight: "10%" },
  { name: "Vehicle, Winter & Safety Equipment", weight: "10%" },
  { name: "Markings, Lights & Police Signals", weight: "8%" },
];

export default function FinlandDrivingTheoryLandingPage() {
  return (
    <div data-theme="fitheory" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Finland Driving Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/finland-driving-theory/dashboard"
            shortName="Theory test"
            subtitle="200 original questions in English on the Finnish rules of the road for the category B teoriakoe: the right-hand rule, overtaking, parking, Finland's yellow warning signs, winter tyres and more. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/fitheory-mobile.png", desktop: "/landing/fitheory-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="fitheory" />

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
                Five training sets cover giving way and junctions, speed, lanes and overtaking, signs and markings, parking and other road users, and the driver, your car and winter driving. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that together cover all 200 questions, with an 86% target, the share the real test asks on its picture part. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on the Finnish Road Traffic Act
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Traficom lists the topics of the theory test: traffic rules, the driver, the road, other road users, safety equipment and the vehicle, plus picture questions on driving straight, turning, giving way, overtaking, changing lanes, stopping and parking. Tigertest follows those areas with the rules of the current Road Traffic Act: the right-hand rule, who must always give way, the 5-metre and 30-metre parking rules, winter tyres from November to March when conditions require, and the 2026 rules for 17-year-olds. The real test&apos;s photos and risk recognition videos are not modelled; situations are described in words.
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
                src={getTigerAsset("fitheory", 1)}
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
            How to Pass the Finnish Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the right-hand rule and its exceptions</h3>
              <p>
                Most picture questions are about who goes first. At an unsigned junction you give way to traffic from the right, but you always give way when you come from a car park, a yard, a fuel station, a path, a cycle path or a pihakatu, and when you turn across people crossing. Trams and emergency vehicles go first. Learn the exceptions until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn Finland&apos;s own signs</h3>
              <p>
                Finnish warning triangles and most prohibition circles have a yellow background, not white, and you will meet moose and reindeer warnings, the yellow priority road diamond and yellow temporary road works lines that override white ones. Learn signs by family first, then by symbol.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the numbers</h3>
              <p>
                50 km/h in a built-up area and 80 km/h outside one unless signed, 20 km/h in a pihakatu, no stopping within 5 metres of a crossing or junction, no parking within 30 metres of a level crossing, winter tyres with 3 mm of tread from November to March when conditions require, 0.5 per mille for drink driving. These figures come up again and again.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above the pass mark</h3>
              <p>
                The real test fails you if any one part is below its minimum, so there is little room for error. Aim for 45 or more in every mock test, drill the questions you missed, then take all four tests back to back before you book at Ajovarma.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Finland Driving Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="fitheory" />

      <ExamRelatedTests examId="fitheory" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Finnish Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on Finnish traffic rules and signs, in English.</p>
          <ExamLandingCTA dashboardHref="/finland-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}
