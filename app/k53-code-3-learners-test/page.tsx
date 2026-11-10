import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/zak53c3";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "K53 Code 3 Learner's Test 2026 - Free C1 and C Truck Practice";
const metaDescription =
  "Free K53 Code 3 learner's licence practice for South Africa, the learner's you need for a C1 or C truck licence: 200 original questions on rules, signs and markings and heavy vehicle controls.";
const description =
  "Free practice for the South African K53 learner's licence test, Code 3 (heavy vehicles over 3,500 kg GVM), the step before a C1 or C truck licence: 200 original questions on the rules of the road for heavy vehicles, road signs and road markings, and truck controls. Four mock tests of 50 questions with an 80% target, and six training sets on licences, PrDP and alcohol, right of way, speed and overtaking, stopping, parking and loads, regulatory signs, warning signs, guidance signs and markings, and heavy vehicle controls.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "code 3 learners test, c1 learners licence, code 10 learners, k53 code 3 learners licence, heavy vehicle learners test south africa, truck learners licence questions, c1 licence south africa, code 14 learners, k53 truck vehicle controls, free code 3 learners test",
  alternates: {
    canonical: `${siteUrl}/k53-code-3-learners-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/k53-code-3-learners-test`,
    images: [{ url: shareImageUrl("zak53c3"), width: 1200, height: 630, alt: "Tigertest free K53 Code 3 learner's practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("zak53c3")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Which learner's licence do I need for a C1 licence?",
    a: "A Code 3 learner's licence. Code 1 is for motorcycles and Code 2 for light motor vehicles up to 3,500 kg GVM; Code 3 covers heavy motor vehicles over 3,500 kg GVM and is the learner's you hold before the driving test for a C1 licence (3,500 to 16,000 kg), a C licence (over 16,000 kg) or the articulated EC1 and EC codes. People often still call C1 and EC by their old names, code 10 and code 14.",
  },
  {
    q: "How old must I be for a Code 3 learner's licence?",
    a: "You must be 18 or older to apply for a Code 3 learner's licence. You book and write the test at a driving licence testing centre (DLTC). The learner's licence is valid for 24 months, cannot be extended, and lets you drive a heavy vehicle only while a driver licensed for that vehicle supervises you.",
  },
  {
    q: "Is the Code 3 learner's test different from Code 2?",
    a: "It has the same three sections: rules of the road, road signs and markings, and vehicle controls. The rules and signs are the same law for everyone; the controls section is about a heavy vehicle. Study guides give the learner's test 64 questions (28 rules, 28 signs, 8 controls) and say each section is passed separately; check the marks that apply at your test centre on the day.",
  },
  {
    q: "What is the pass mark on these mock tests?",
    a: "Each Tigertest mock test has 50 questions in the same mix as the Code 2 tests (22 rules, 22 signs and markings, 6 vehicle controls) and you need 40, or 80%, to pass. That 80% is Tigertest's own target, set a little above the section marks study guides quote, so a pass here means you are ready for the real thing.",
  },
  {
    q: "Are these the real K53 learner's test questions?",
    a: "No. Every question is original, written by Tigertest from the National Road Traffic Act and Regulations, the K53 learner material and the road sign manual, and none is shared with Tigertest's Code 2 test. Signs are described in words, so study the sign pictures in your K53 manual too. It is free revision, not an official test, and it does not book or replace your learner's test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free K53 Code 3 Learner's Practice Test",
      description,
      url: `${siteUrl}/k53-code-3-learners-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("zak53c3", "ZAR"),
      featureList: [
        "200 K53 Code 3 learner's practice questions",
        "4 mock tests of 50 questions with an 80% target",
        "6 training sets: rules, signs, markings and heavy vehicle controls",
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
  { name: "Rules of the Road", weight: "44%" },
  { name: "Road Signs & Markings", weight: "44%" },
  { name: "Heavy Vehicle Controls (Code 3)", weight: "12%" },
];

export default function K53Code3LandingPage() {
  return (
    <div data-theme="zak53c3" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free K53 Code 3 Learner&apos;s Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/k53-code-3/dashboard"
            shortName="K53 Code 3 learner's"
            subtitle="200 original questions for the South African Code 3 learner's test, the heavy vehicle learner's before a C1 or C truck licence: rules of the road, road signs and markings, and truck controls. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/zak53c3-mobile.png", desktop: "/landing/zak53c3-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="zak53c3" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Section</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six training sets split the three sections of the learner&apos;s test into bite-size topics, from four-way stops to steep-descent warnings and the exhaust brake. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests in the Real Mix</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question tests with 22 rules, 22 signs and markings and 6 heavy vehicle controls each, and 40 to pass. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on South Africa&apos;s Road Traffic Rules for Heavy Vehicles
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each mock test follows the three sections of the real learner&apos;s test in the same proportions guides give for its 64 questions. Every rule is South Africa&apos;s own, with the ones that change when you drive a truck: the 80 km/h limit for goods vehicles over 9,000 kg GVM, the professional driving permit, the 0.02 g alcohol limit for professional drivers, mass and height limit signs, securing your load and using a low gear on long descents.
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
                src={getTigerAsset("zak53c3", 1)}
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
            How to Pass the K53 Code 3 Learner&apos;s Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the sign families, not single signs</h3>
              <p>
                Signs come in families with their own shapes and colours: control signs such as stop and yield, blue command signs that tell you what to do, red-ringed prohibition signs that forbid something, red-bordered warning triangles, and guidance signs. Once you know the family, most new signs explain themselves.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make a table of the numbers</h3>
              <p>
                The rules section loves numbers: 60, 100 and 120 km/h general limits but 80 km/h for goods vehicles over 9,000 kg GVM, 3,500 kg GVM where Code 3 and the PrDP start, 16,000 kg between C1 and C, 0.02 g alcohol for professional drivers, 9 metres from a pedestrian crossing, headlights when you cannot see 150 metres, and the 24-hour rule for reporting an injury crash. Put them in one table and quiz yourself.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip vehicle controls</h3>
              <p>
                It is the shortest section, but guides say you may drop only two of its eight questions. Know what each control does and which ones you use together, and the truck ones too: the exhaust brake or retarder for long descents, the air pressure gauge and low-air warning, and why you change down before a hill, not on it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim above 40</h3>
              <p>
                Each section is marked on its own in the real test, so a strong score in one cannot rescue a weak one. Tigertest tracks your accuracy by topic: drill the questions you missed, retrain the weakest set, then take all four tests before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          K53 Code 3 Learner&apos;s Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="zak53c3" />

      <ExamRelatedTests examId="zak53c3" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get Your Code 3 Learner&apos;s Licence?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every section of the K53 Code 3 learner&apos;s test.</p>
          <ExamLandingCTA dashboardHref="/k53-code-3/dashboard" />
        </div>
      </div>
    </div>
  );
}
