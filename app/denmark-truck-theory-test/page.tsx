import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/dktruck";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Denmark Truck Theory Test 2026 in English - Free Practice";
const metaDescription =
  "Free Danish truck theory test (teoriprøve, categories C and CE) practice in English: 200 original questions, eight 25-question mock tests and every answer explained.";
const description =
  "Free practice in English for the Danish truck theory test (teoriprøve) for category C, with CE coupling and length rules: 200 original questions written from Færdselsstyrelsen's teaching plan for lorries, on steering and air brakes, lights, tyres and the engine, bodywork, mirrors and the tachograph, licence rules, widths, weights and load marking, EU driving and rest times, how other vehicles handle, the driver and the road, driving a lorry in traffic, junctions, motorways and parking, alcohol, drugs, speed and seat belts. Eight 25-question mock tests with 20 to pass, like the real test, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "denmark truck theory test, danish truck theory test in english, teoriprøve lastbil, lastbil teori, lorry theory test denmark, kørekort lastbil, category c theory test denmark, ce theory test denmark, køre- og hviletid, færdselsstyrelsen lastbil, teoriprøve 2026",
  alternates: {
    canonical: `${siteUrl}/denmark-truck-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/denmark-truck-theory-test`,
    images: [{ url: shareImageUrl("dktruck"), width: 1200, height: 630, alt: "Tigertest free Denmark truck theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("dktruck")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Danish truck theory test like?",
    a: "The theory test (teoriprøve) for category C is run by Færdselsstyrelsen, the Danish Road Traffic Authority. You may make at most five errors; an unanswered question counts as an error. On the digital test each question shows a picture or video of a traffic situation and you choose the correct answer or answers. Questions are drawn at random from the teaching plan for lorries. Færdselsstyrelsen does not state the number of questions for category C on its site; guides give 25, so 20 right is a pass.",
  },
  {
    q: "Can I take the truck theory test in English?",
    a: "Yes. Færdselsstyrelsen offers the digital theory test in English for category C, among other categories, and runs digital tests in Danish and English at all of its digital test sites. German digital tests are held only in Aabenraa.",
  },
  {
    q: "What does the truck theory test cover?",
    a: "Færdselsstyrelsen's published key for the digital category C test gives about 32% of the questions to the lorry itself (steering, brakes, lights, tyres, engine, bodywork, mirrors, tachograph and documents), about 28% to manoeuvres on the road, about 16% to the basic rules for lorries (licence, dimensions, weights, loads, driving and rest times), about 8% each to how other vehicles handle and to special risks such as alcohol, drugs and speed, and about 4% each to road user behaviour and road conditions. Tigertest's mock tests follow that split.",
  },
  {
    q: "What about category CE?",
    a: "Category CE, a lorry with a trailer over 750 kg, has its own theory test with its own key, weighted even more towards the vehicles (about 40%) and the rules (about 20%). The rules on the lorry, loads and driving times are largely the same, and Tigertest includes the CE coupling and length rules from the CE teaching plan, but the mock tests are weighted like the category C test.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from Færdselsstyrelsen's teaching plans for categories C and D and for CE (version 1.0, 2026), so it tests the same rules without copying any official question. The real test shows a picture or video with each question and can have more than one correct answer; Tigertest uses text questions with one answer and describes signs and situations in words. It is practice, not affiliated with Færdselsstyrelsen, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Denmark Truck Theory Practice Test",
      description,
      url: `${siteUrl}/denmark-truck-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("dktruck", "DKK"),
      inLanguage: "en",
      featureList: [
        "200 Danish truck theory questions in English",
        "8 mock tests of 25 questions, 20 to pass",
        "4 training sets by topic",
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
  { name: "Speed, Lanes, Meeting & Overtaking", weight: "16%" },
  { name: "Steering & Air Brakes", weight: "12%" },
  { name: "Lights, Tyres & Engine", weight: "12%" },
  { name: "Junctions, Motorways & Parking", weight: "12%" },
  { name: "Body, Mirrors, Tachograph & Coupling", weight: "8%" },
  { name: "Licence, Dimensions, Weights & Loads", weight: "8%" },
  { name: "Driving Times, Tachograph & Haulage", weight: "8%" },
  { name: "Other Vehicles & How They Handle", weight: "8%" },
  { name: "The Driver & Road Conditions", weight: "8%" },
  { name: "Alcohol, Drugs, Speed & Seat Belts", weight: "8%" },
];

export default function DenmarkTruckTheoryLandingPage() {
  return (
    <div data-theme="dktruck" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Denmark Truck Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/denmark-truck-theory/dashboard"
            shortName="Truck theory"
            subtitle="200 original questions in English for the Danish lorry teoriprøve (category C, with CE coupling rules): air brakes and steering, mirrors and the tachograph, driving and rest times, widths, weights and loads, right turns with cyclists, roundabouts and motorways. Eight 25-question mock tests with 20 to pass, like the real test. Free to start, no account needed."
            shots={{ mobile: "/landing/dktruck-mobile.png", desktop: "/landing/dktruck-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="dktruck" />

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
                Four training sets cover brakes, steering and lights; bodywork, loads and driving times; other vehicles, the driver and the risks; and driving a lorry in traffic. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight 25-question tests that together cover all 200 questions. You need 20 right, the same as at most five errors on the real test. No question repeats across tests, and every answer explains the rule.
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
                Weighted Like the Digital Teoriprøve
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Færdselsstyrelsen draws the questions at random from the teaching plan for lorries and publishes how the digital category C test is weighted: about 32% on the vehicle, 28% on manoeuvres on the road and 16% on the basic rules for lorries. Tigertest&apos;s mock tests follow the same split, in km/h, metres and tonnes, for right-hand traffic. The real test shows a picture or video with every question and some have more than one correct answer; here each question is text with one answer, and signs are described in words. The practical test is not part of this practice.
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
                src={getTigerAsset("dktruck", 1)}
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
            How to Pass the Danish Truck Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know your lorry before you drive it</h3>
              <p>
                A third of the test is about the vehicle. Learn what each part of the air brake system does and what each fault looks like: a long pump-up time, water in the tanks, a big pressure drop, rear wheels locking. The same goes for lights, tyres, mirrors and the tachograph.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the lorry numbers</h3>
              <p>
                80 km/h on every road and a limiter at 90, 2.55 m wide, 12 m long, 4.1 m high, 10 tonnes on an axle, 20% of the weight on the steered axles, marking beyond 1 m or 15 cm, and the driving-time limits of 9, 10, 56 and 90 hours with a 45-minute break after 4.5 hours.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Turn right as if a cyclist is always there</h3>
              <p>
                The plan&apos;s most serious lorry crash is the right turn across a cyclist at the right front corner, often after both waited at a red light. Keep watching your mirrors while you wait, do not take green as a free path, and stop before the cycle path if you need more time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read every answer, then look at the picture</h3>
              <p>
                On the real test a question can have more than one correct answer and an unanswered one counts as an error, so read each option on its own against the picture. Aim for 23 or more in every Tigertest mock test before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Danish Truck Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="dktruck" />

      <ExamRelatedTests examId="dktruck" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Truck Teoriprøve?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions in English on the Danish rules for lorry drivers.</p>
          <ExamLandingCTA dashboardHref="/denmark-truck-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}
