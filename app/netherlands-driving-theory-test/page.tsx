import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/nltheorie";
import { SITE_URL } from "@/lib/siteUrl";
import { examLandingAlternates, examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Netherlands Driving Theory Test 2026 in English - Free Practice";
const metaDescription =
  "Free practice for the Dutch CBR theory exam for a car licence (category B) in English: 350 original questions on Dutch traffic rules, seven 50-question mock tests, every answer explained.";
const description =
  "Free practice in English for the CBR theory exam (theorie-examen) for a category B car licence in the Netherlands: 350 original questions on priority to the right, road use and speed limits, motorways, roundabouts and the erf, safe driving and emergencies, signs and markings, parking, responsible and eco driving, the licence and driver assistance systems. Seven 50-question mock tests and seven training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "netherlands driving theory test, dutch driving theory test in english, cbr theory exam, cbr theorie examen auto, theorie examen auto oefenen, dutch car theory test english, rijbewijs b theorie, cbr theory test practice 2026, voorrang van rechts, dutch road signs test",
  alternates: {
    canonical: `${siteUrl}/netherlands-driving-theory-test`,
    languages: examLandingAlternates("nltheorie"),
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/netherlands-driving-theory-test`,
    images: [{ url: shareImageUrl("nltheorie"), width: 1200, height: 630, alt: "Tigertest free Netherlands driving theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nltheorie")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the Dutch driving theory exam?",
    a: "The CBR theory exam for a car (category B) has eight subjects: use of the road, priority and giving way, special roads and manoeuvres such as motorways and roundabouts, safe driving and emergencies, traffic signs and directions, responsible and eco-friendly driving, traffic law, and vehicle knowledge. Since 1 April 2026 the rules also ask about how electronic driver assistance systems work. Since April 2025 it is one combined exam that tests traffic rules and traffic insight together.",
  },
  {
    q: "How many questions are there and what is the pass mark?",
    a: "You answer 50 exam questions in 30 minutes and need at least 44 right to pass. You also get 2 test questions that do not count, and you cannot tell which ones they are, plus 2 practice questions before the exam starts. With extra time, or as an individually guided exam, you have 45 minutes. Tigertest's mock tests are 50 questions with the same line, 44 of 50.",
  },
  {
    q: "Can I take the CBR theory exam in English?",
    a: "Yes. CBR offers the ordinary car theory exam in Dutch or in English, with the same 30 minutes. A few Dutch terms stay in Dutch, such as erf, autoweg, APK, brommobiel, snorfiets and speed pedelec, so learn what they mean. You can also take the exam with extra time in Dutch or English, or arrange an approved interpreter for another language.",
  },
  {
    q: "When can I take the theory exam?",
    a: "You can take the car theory exam from age 16. You need a theory certificate and a health declaration before your practical exam, which you can take from 17. If you pass before 18, you may only drive with a coach named on your coach pass until you turn 18.",
  },
  {
    q: "Are these the real exam questions?",
    a: "No. Every question is original, written by Tigertest from the Dutch traffic rules (RVV 1990 and the Wegenverkeerswet) and CBR's published exam plan, so it tests the same knowledge without copying any exam question. The real exam is built around pictures and animations, with drag-and-drop, hotspot, yes or no and number questions; Tigertest uses text-only multiple choice, describes signs and situations in words, and does not model the hazard recognition timing. Tigertest is free practice, not affiliated with the CBR, and it does not book or replace your exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Netherlands Driving Theory Practice Test",
      description,
      url: `${siteUrl}/netherlands-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nltheorie", "EUR"),
      featureList: [
        "350 questions on Dutch traffic rules in English",
        "7 mock tests of 50 questions",
        "7 training sets by topic",
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
  { name: "Priority & Giving Way", weight: "16%" },
  { name: "Use of the Road", weight: "14%" },
  { name: "Motorways, Roundabouts & Special Roads", weight: "14%" },
  { name: "Safe Driving & Emergencies", weight: "14%" },
  { name: "Signs, Markings & Directions", weight: "14%" },
  { name: "Stopping & Parking", weight: "8%" },
  { name: "Responsible & Eco Driving", weight: "8%" },
  { name: "Licence & Traffic Law", weight: "6%" },
  { name: "Vehicle & Driver Assistance", weight: "6%" },
];

export default function NetherlandsDrivingTheoryLandingPage() {
  return (
    <div data-theme="nltheorie" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Netherlands Driving Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/netherlands-driving-theory/dashboard"
            shortName="Theory test"
            subtitle="350 Netherlands theory questions in English and seven 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/nltheorie-mobile.png", desktop: "/landing/nltheorie-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nltheorie" />

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
                Seven training sets follow CBR&apos;s eight exam subjects: road use, priority, motorways and roundabouts, safe driving, signs, parking with traffic law, and responsible driving with your car and its driver aids. Questions you miss come back until you have mastered them.
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
                Seven 50-question tests that together cover all 350 questions, with an 88% target like the real 44 of 50. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on the Dutch Traffic Rules
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CBR names eight subjects but does not publish how many questions each gets, so the weights are Tigertest&apos;s, with more on the subjects CBR tests at the higher K+ level. Rules are the Netherlands&apos; own as of November 2026: right-hand traffic, priority to the right at unmarked junctions, 50 km/h in built-up areas, 80 km/h outside them, 100 on an autoweg and 130 on a motorway unless signed, 15 km/h in an erf, and 0.5 per mille alcohol (0.2 for novice drivers). Signs are described in words, and the real exam&apos;s pictures, animations and hazard recognition timing are not modelled.
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
                src={getTigerAsset("nltheorie", 3)}
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
            How to Pass the CBR Theory Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master priority to the right</h3>
              <p>
                With no signs, traffic from the right goes first, cyclists included, and a T-junction gives the through road no priority. Trams go first unless signs or lights say otherwise, drivers on an unpaved road give way to a paved one, and leaving a driveway, car park or erf you let everyone go. Turning off, you let cyclists and pedestrians going straight go first.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the Dutch details</h3>
              <p>
                Shark&apos;s teeth on the road mean give way. Know the orange diamond of a priority road, the yellow kerb lines for no stopping and no parking, the parking disc rules, the red X and white arrow on motorway matrix signs, and where cycle paths, mopeds and speed pedelecs fit in.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise reading situations</h3>
              <p>
                The real exam shows photos and animations of traffic. As you study, picture each question as a scene: where the cyclists and pedestrians are, who may move next, and what the safest choice is. Look at the official sign pictures as well, since Tigertest describes them in words.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above the pass mark</h3>
              <p>
                You need 44 of 50 on the day, which leaves only 6 mistakes. Aim for 46 or more in every Tigertest mock, drill the questions you missed, retrain your weakest set, then take the tests back to back before your exam day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Netherlands Driving Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="nltheorie" />

      <ExamRelatedTests examId="nltheorie" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your CBR Theory Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 350 questions on Dutch traffic rules, in English.</p>
          <ExamLandingCTA dashboardHref="/netherlands-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}
