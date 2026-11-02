import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/sgbtt";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Singapore BTT Practice Test 2026 - Free Basic Theory Test Questions";
const metaDescription =
  "Free Singapore Basic Theory Test practice: 200 original questions from the 2026 Basic Theory of Driving handbook, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for Singapore's Basic Theory Test (BTT): 200 original questions written from Part B of the Basic Theory of Driving handbook (last updated 2 January 2026), the part the BTT tests. Four mock tests of 50 questions with a 45 of 50 pass line, and five training sets on traffic signs, road markings and signals, lanes and overtaking, junctions and right of way, parking, lights and your vehicle, and safe driving.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "singapore btt practice test, basic theory test singapore, btt questions 2026, btt mock test, singapore driving theory test, basic theory of driving handbook, bbdc btt, ssdc btt, cdc btt, btt singapore free",
  alternates: {
    canonical: `${siteUrl}/singapore-btt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/singapore-btt-practice-test`,
    images: [{ url: shareImageUrl("sgbtt"), width: 1200, height: 630, alt: "Tigertest free Singapore BTT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sgbtt")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the Singapore BTT and what is the pass mark?",
    a: "The Traffic Police do not publish the format on their own pages. Driving school and study guides say the BTT is 50 multiple-choice questions on a computer in 50 minutes, and that you need 45 right (90%) to pass. The mock tests here are 50 questions each and use that 45 of 50 line, so treat it as the guides' figure and check with your driving centre when you book.",
  },
  {
    q: "What does the Basic Theory Test cover?",
    a: "The BTT tests your knowledge of traffic rules, traffic regulations, traffic signs and signals, and general road safety. The Traffic Police handbook, Basic Theory of Driving, marks Part B as the part tested in the BTT: signs and signals, road markings, traffic rules and regulations, the code of conduct on the road, parts of a car, work zones, special zones such as school and silver zones, and tunnels.",
  },
  {
    q: "What do I need to take the BTT and what comes after it?",
    a: "You must be at least 18 to hold a driving licence in Singapore. You take the eyesight test and the BTT at one of the three driving centres; the eyesight test is done when you register to book the theory test. After passing the BTT you can apply for a Provisional Driving Licence (PDL), valid for 2 years, and learn on the road only with a licensed driving instructor, with L plates on the front and back. Car learners then pass the Final Theory Test (FTT) before the practical driving test.",
  },
  {
    q: "Which edition of the handbook do these questions follow?",
    a: "The Basic Theory of Driving handbook last updated on 2 January 2026. It uses the three-second rule for following distance (it used to be two seconds), the 1.5 metre gap when passing cyclists, the 40 km/h limit in Friendly Streets, and the current bus lane hours. Rules that are changing, such as the alcohol limits under the 2026 amendments and the demerit point thresholds that change on 1 January 2027, are left out of the questions.",
  },
  {
    q: "Are these the real BTT questions?",
    a: "No. Every question is original, written by Tigertest from the Basic Theory of Driving handbook, so it tests the same rules without copying any official or commercial question bank. Signs and markings are described in words, so look at the pictures in the handbook too. It is free revision, not an official test, and it does not book or replace your BTT.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Singapore BTT Practice Test",
      description,
      url: `${siteUrl}/singapore-btt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "SGD" },
      featureList: [
        "200 Basic Theory Test practice questions",
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
  { name: "Traffic Signs", weight: "20%" },
  { name: "Road Markings & Signals", weight: "18%" },
  { name: "Lanes, Overtaking & Speed", weight: "16%" },
  { name: "Junctions & Right of Way", weight: "14%" },
  { name: "Safe Driving & Road Users", weight: "14%" },
  { name: "Lights, Phones & Your Vehicle", weight: "10%" },
  { name: "Stopping & Parking", weight: "8%" },
];

export default function SingaporeBttLandingPage() {
  return (
    <div data-theme="sgbtt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Singapore BTT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/singapore-btt/dashboard"
            shortName="BTT"
            subtitle="200 original questions from the 2026 Basic Theory of Driving handbook: traffic signs, road markings, lanes, junctions, parking and safe driving. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/sgbtt-mobile.png", desktop: "/landing/sgbtt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sgbtt" />

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
                Five training sets cover every part of the handbook the BTT tests, from yellow lines and bus lanes to yellow box junctions. Questions you miss come back until you have mastered them.
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
                Built on the Basic Theory of Driving Handbook
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Traffic Police do not publish how many questions come from each topic, so each mock test follows Part B of the handbook, the part marked for the BTT, with signs, markings and signals weighted heaviest. Every rule is Singapore&apos;s own: keep-left traffic, km/h, yellow box junctions, bus lane hours, EMAS signs, tunnels, and school, silver and Friendly Street zones.
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
                src={getTigerAsset("sgbtt", 1)}
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
            How to Pass the Basic Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the lines on the road</h3>
              <p>
                Road markings are where most marks go missing. Know the difference between a single yellow line (no parking 7 am to 7 pm, except Sundays and public holidays), double yellow lines (no parking at any time), a single yellow zig-zag (no parking) and double yellow zig-zags (no stopping), and the normal and full-day bus lane hours.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make a table of the numbers</h3>
              <p>
                The handbook is full of figures: 50 km/h unless signed, 40 km/h in Friendly Streets, 6 metres from a junction, 9 metres from a bus stop, 3 metres from a fire hydrant, 20 metres for the warning triangle, 1.5 metres when passing a cyclist, a three-second following gap, a 2 metre gap at the lights and 1.6 mm of tyre tread. Write them in one table and quiz yourself until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Master the give way rules</h3>
              <p>
                At an uncontrolled junction, straight-through traffic gives way to straight traffic from the right, and a right-turner gives way to straight traffic from every direction. At a roundabout, traffic from your right goes first. Learn the three cases where you may wait inside a yellow box.
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
          Basic Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="sgbtt" />

      <ExamRelatedTests examId="sgbtt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your BTT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every part of the handbook the BTT tests.</p>
          <ExamLandingCTA dashboardHref="/singapore-btt/dashboard" />
        </div>
      </div>
    </div>
  );
}
