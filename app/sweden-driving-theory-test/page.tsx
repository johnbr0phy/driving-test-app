import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/setrafik";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Sweden Driving Theory Test 2026 in English - Free Practice";
const metaDescription =
  "Free practice for the Swedish driving theory test (kunskapsprov B) in English: 200 original questions on Swedish rules, four 50-question mock tests, every answer explained.";
const description =
  "Free practice in English for Trafikverket's knowledge test for a category B licence in Sweden: 200 original questions on right of way and the right-hand rule, road signs, markings, speed limits, parking and motorways, wildlife and winter driving, vehicle knowledge, eco-driving, alcohol and your licence. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "sweden driving theory test, swedish driving theory test in english, kunskapsprov b, trafikverket theory test, teoriprov körkort, swedish driving licence test english, körkortsprov practice, sweden theory test questions 2026, högerregeln, swedish road signs test",
  alternates: {
    canonical: `${siteUrl}/sweden-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/sweden-driving-theory-test`,
    images: [{ url: shareImageUrl("setrafik"), width: 1200, height: 630, alt: "Tigertest free Sweden driving theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("setrafik")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the Swedish driving theory test?",
    a: "The knowledge test (kunskapsprov) for a category B licence is run by Trafikverket on a touch screen at a test centre. It covers five areas: traffic rules, traffic safety, vehicle knowledge and handling, the environment, and personal prerequisites such as alcohol, fatigue and group pressure. Traffic rules make up the biggest share, including the right-hand rule (högerregeln), priority roads, signs and markings. Many real questions show a photo or drawing of a traffic situation.",
  },
  {
    q: "How many questions are there and what is the pass mark?",
    a: "The test has 70 multiple-choice questions with one correct answer each, and you have 50 minutes. Five of the questions are unscored trial questions, so the maximum is 65 points, and you need at least 52 points to pass. You see your result on screen at the end, by subject area, but not which questions you got wrong. Tigertest's mock tests are 50 questions with the same 80% line, 40 of 50.",
  },
  {
    q: "Can I take the theory test in English?",
    a: "Yes. Trafikverket offers the category B test in British English and in 14 other languages: Albanian, Arabic, Bosnian, Croatian or Serbian, Finnish, French, Persian, Russian, Somali, Sorani, Spanish, Thai, Tigrinya, Turkish and German. The test is also offered in Swedish with audio, and you can apply for an interpreter. During a translated test you can switch to Swedish if you want to.",
  },
  {
    q: "What do I need before I can take the test?",
    a: "You need an approved learner's permit (körkortstillstånd) to book, and both parts of the risk education (riskutbildning) must be completed and still valid on the day: Riskettan on alcohol, drugs, fatigue and risky behaviour, and Risktvåan, the skid pan. Bring valid photo ID and arrive 30 minutes early. A theory test passed from 19 August 2026 is valid for one year, so you must pass the driving test within that time; passes before that date were valid for four months.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from Swedish traffic rules and official Trafikverket and Transportstyrelsen guidance, so it tests the same knowledge without copying any test question. The real test's photo and drawing questions are not modelled; signs and situations are described in words, so look at pictures of Swedish signs too. Tigertest is free practice, not affiliated with Trafikverket or Transportstyrelsen, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Sweden Driving Theory Practice Test",
      description,
      url: `${siteUrl}/sweden-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "SEK" },
      featureList: [
        "200 questions on Swedish traffic rules in English",
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
  { name: "Traffic Safety, Wildlife & Winter", weight: "18%" },
  { name: "Road Signs", weight: "16%" },
  { name: "Right of Way & Junctions", weight: "14%" },
  { name: "Speed, Overtaking & Lanes", weight: "12%" },
  { name: "Road Markings & Traffic Lights", weight: "10%" },
  { name: "Stopping, Parking & Motorways", weight: "8%" },
  { name: "Vehicle Knowledge & Handling", weight: "8%" },
  { name: "Personal Factors & Your Licence", weight: "8%" },
  { name: "Environment & Eco-driving", weight: "6%" },
];

export default function SwedenDrivingTheoryLandingPage() {
  return (
    <div data-theme="setrafik" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Sweden Driving Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/sweden-driving-theory/dashboard"
            shortName="Theory test"
            subtitle="200 original questions in English on what Trafikverket's knowledge test for a B licence asks: the right-hand rule, priority roads, signs, speed limits, moose and winter driving, alcohol limits and eco-driving. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/setrafik-mobile.png", desktop: "/landing/setrafik-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="setrafik" />

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
                Five training sets cover road signs, junctions and markings, speed, lanes and parking, traffic safety with wildlife and winter, and the vehicle, environment and personal factors. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that together cover all 200 questions, with an 80% target like the real 52 of 65. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on Sweden&apos;s Traffic Rules
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Trafikverket tests five areas but does not publish how many questions each gets, so Tigertest weights traffic rules at about half and traffic safety at about a quarter, as guides report. Rules are Sweden&apos;s own as of November 2026: right-hand traffic, the right-hand rule at unmarked junctions, 50 km/h in built-up areas and 70 km/h elsewhere unless signed, winter tyres from 1 December to 31 March in winter conditions, and a 0.2 per mille alcohol limit for every driver. Signs are described in words, and the real test&apos;s photo questions are not modelled.
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
                src={getTigerAsset("setrafik", 1)}
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
            How to Pass the Swedish Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master who goes first</h3>
              <p>
                Right of way is where most candidates lose points. With no signs, give way to traffic from your right. On a priority road (huvudled) others give way to you. Coming out of a car park or a private road, you give way to everyone, and you always let pedestrians cross at an unguarded zebra crossing and cyclists at a marked cycle crossing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the Swedish details</h3>
              <p>
                Swedish warning and prohibitory signs have a yellow background, and dashed or solid yellow lines at the kerb ban parking or stopping. Know the basic speed limits, the 80 km/h limit with a trailer, the winter tyre and studded tyre dates, and what to do after hitting a moose or deer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise reading situations</h3>
              <p>
                The real test shows photos of traffic situations. As you study, picture each question as a scene: where the other road users are, what they may do next, and what the safest choice is. Look at the official sign pictures as well, since Tigertest describes them in words.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above the pass mark</h3>
              <p>
                You need 52 of 65 on the day, which leaves only 13 mistakes. Aim for 45 or more in every Tigertest mock, drill the questions you missed, retrain your weakest set, then take all four tests back to back before your test day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Sweden Driving Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="setrafik" />

      <ExamRelatedTests examId="setrafik" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Swedish Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on Swedish traffic rules, in English.</p>
          <ExamLandingCTA dashboardHref="/sweden-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}
