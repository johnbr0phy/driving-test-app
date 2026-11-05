import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/sgftt";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Singapore FTT Practice Test 2026 - Free Final Theory Test Questions";
const metaDescription =
  "Free Singapore Final Theory Test practice: 200 original questions from the 2026 Final Theory of Driving handbook, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for Singapore's Final Theory Test (FTT) for a class 3 or 3A car licence: 200 original questions written from the Traffic Police handbook Final Theory of Driving (published 2 January 2026). Four mock tests of 50 questions with a 45 of 50 pass line, and five training sets on car controls and driving technique, lanes, junctions and manoeuvres, defensive driving, other road users and expressways, and emergencies and vehicle care.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "singapore ftt practice test, final theory test singapore, ftt questions 2026, ftt mock test, final theory of driving handbook, class 3 theory test, class 3a ftt, bbdc ftt, ssdc ftt, cdc ftt, ftt singapore free",
  alternates: {
    canonical: `${siteUrl}/singapore-ftt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/singapore-ftt-practice-test`,
    images: [{ url: shareImageUrl("sgftt"), width: 1200, height: 630, alt: "Tigertest free Singapore FTT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sgftt")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the Singapore FTT and what is the pass mark?",
    a: "The Traffic Police do not publish the format on their own pages. Driving school and study guides say the FTT is 50 multiple-choice questions on a computer in 50 minutes, and that you need 45 right (90%) to pass. The mock tests here are 50 questions each and use that 45 of 50 line, so treat it as the guides' figure and check with your driving centre when you book.",
  },
  {
    q: "What does the Final Theory Test cover?",
    a: "The FTT is the second theory test for a class 3 or 3A car licence, taken after the Basic Theory Test and before the practical driving test. It is based on the Traffic Police handbook Final Theory of Driving: how to use the car's controls and instruments, moving off, gear changing, bends, slopes, lane changes, junctions, roundabouts, overtaking, reversing and parking, defensive driving in bad weather and at night, sharing the road with pedestrians, cyclists, motorcyclists and large vehicles, expressway driving, and what to do in emergencies and accidents.",
  },
  {
    q: "Who has to take the FTT and when?",
    a: "Learners going for a class 3 or 3A car licence take the FTT after passing the Basic Theory Test. You book it at one of the three driving centres, and you need a valid final theory pass to take the practical driving test. Motorcycle learners take the Riding Theory Test instead. Learner drivers may not drive on expressways, so the FTT is where expressway rules are learnt.",
  },
  {
    q: "Which edition of the handbook do these questions follow?",
    a: "Final Theory of Driving, published online by the Traffic Police on 2 January 2026. The questions do not repeat the Basic Theory Test material (signs, markings, parking distances), which has its own Tigertest practice test. Rules that are changing, such as the alcohol limits under the 2026 amendments and the demerit point thresholds that change on 1 January 2027, are left out, and so are fines.",
  },
  {
    q: "Are these the real FTT questions?",
    a: "No. Every question is original, written by Tigertest from the Final Theory of Driving handbook, so it tests the same rules without copying any official or commercial question bank. The handbook's diagrams are described in words. It is free revision, not an official test, it does not book or replace your FTT, and Tigertest is not affiliated with the Singapore Police Force or the Traffic Police.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Singapore FTT Practice Test",
      description,
      url: `${siteUrl}/singapore-ftt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "SGD" },
      featureList: [
        "200 Final Theory Test practice questions",
        "4 mock tests of 50 questions with a 45 of 50 pass line",
        "5 training sets by handbook topic",
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
  { name: "Lanes, Junctions & Manoeuvres", weight: "18%" },
  { name: "Moving Off, Gears, Bends & Slopes", weight: "16%" },
  { name: "Defensive Driving & Conditions", weight: "16%" },
  { name: "Car Controls & Instruments", weight: "14%" },
  { name: "Pedestrians, Cyclists & Large Vehicles", weight: "14%" },
  { name: "Emergencies, Accidents & Vehicle Care", weight: "12%" },
  { name: "Expressways", weight: "10%" },
];

export default function SingaporeFttLandingPage() {
  return (
    <div data-theme="sgftt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Singapore FTT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/singapore-ftt/dashboard"
            shortName="FTT"
            subtitle="200 original questions from the 2026 Final Theory of Driving handbook: car controls, gears and slopes, junctions and parking manoeuvres, defensive driving, expressways and emergencies. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/sgftt-mobile.png", desktop: "/landing/sgftt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sgftt" />

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
                Five training sets cover the Final Theory of Driving handbook, from the clutch and the engine-brake to expressway exits and tyre blow-outs. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">50-Question Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions with a pass line of 45, the mark study guides quote, so you can only drop five. No question repeats across tests, and every answer explains the rule.
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
                Built on the Final Theory of Driving Handbook
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Traffic Police do not publish how many questions come from each topic, so each mock test follows the chapters of the Final Theory of Driving handbook, with driving technique, manoeuvres and defensive driving weighted heaviest. Every rule is Singapore&apos;s own: keep-left traffic, km/h, the circuit manoeuvres, expressway lanes and shoulders, and the steps for an accident with or without injuries.
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
                src={getTigerAsset("sgftt", 1)}
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
            How to Pass the Final Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the controls by what they do</h3>
              <p>
                The FTT asks how the car works: the handbrake acts on the rear wheels, the clutch disconnects the engine, the engine-brake is strongest in low gears and stops working when you press the clutch, and each warning light means something specific when it stays on. In an automatic, know P, R, N, D, L and kick-down.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Walk through each manoeuvre in order</h3>
              <p>
                Moving off, stopping, hill starts, bends, overtaking, vertical and parallel parking, the directional change and narrow courses are all step-by-step drills in the handbook. Say the steps aloud in order; the questions ask which step comes first, or what goes wrong when one is done too early or too late.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the expressway and emergency rules cold</h3>
              <p>
                Learners cannot practise on expressways, so the rules have to come from the book: who may not use them, how to join from the slip road, the right outermost lane, the shoulder, missed exits and breakdowns. Learn the drills for a loose bonnet, overheating, fire, a stuck accelerator, brake failure and a blow-out, and what to do after an accident with and without injuries.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above 45</h3>
              <p>
                With only five mistakes allowed, aim for 48 or more in every mock test. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all four tests back to back before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Final Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="sgftt" />

      <ExamRelatedTests examId="sgftt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your FTT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every chapter of the Final Theory of Driving handbook.</p>
          <ExamLandingCTA dashboardHref="/singapore-ftt/dashboard" />
        </div>
      </div>
    </div>
  );
}
