import "@/lib/banks/backflow";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free Backflow Tester Practice Test 2026 - Backflow Certification Exam Prep";
const metaDescription =
  "Backflow prevention assembly tester practice, free to start: 200 original questions on cross-connections, hydraulics, RP, double check and PVB assemblies, test kits, field test procedures and troubleshooting, with every answer explained.";
const description =
  "Practice for the backflow prevention assembly tester written exam (ASSE 5110 and the tester courses many water suppliers accept), free to start: 200 original questions written from ASSE's tester course objectives and field test flow charts, the US EPA Cross-Connection Control Manual and the federal drinking water rules. Four 50-question practice tests and five training sets covering cross-connections and hydraulics; programs and tester duties; backflow assemblies and installation; test kits and field test procedures; and troubleshooting and safety.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "backflow tester practice test, backflow certification test, backflow prevention assembly tester exam, asse 5110 practice test, backflow test questions, rpz test procedure, backflow tester exam prep, cross connection control test",
  alternates: {
    canonical: `${siteUrl}/backflow-tester-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/backflow-tester-practice-test`,
    images: [{ url: shareImageUrl("backflow"), width: 1200, height: 630, alt: "Tigertest backflow tester practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("backflow")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the backflow tester certification exam?",
    a: "Water suppliers and states require backflow prevention assemblies to be tested by a certified tester. ASSE International certifies testers under its 5110 standard: candidates take a tester course, then a written exam and a practical exam on real assemblies. California's State Water Board recognized ASSE 5110 in June 2025. Many programs also accept other certifications, such as ABPA's, so check which ones your water supplier or state accepts.",
  },
  {
    q: "How is the ASSE backflow tester written exam run?",
    a: "ASSE's written exam instructions allow 2 hours, closed book, with no notes or reference material, though a calculator may be used for math questions. Each question has one correct or best answer, ASSE grades the exam, and 70% or better passes. ASSE does not publish the number of questions. A separate practical exam checks that you can test the assemblies.",
  },
  {
    q: "What does the backflow tester exam cover?",
    a: "ASSE's tester course objectives cover cross-connections and their history, drinking water regulations, cross-connection programs and tester duties, hydraulics such as backsiphonage, backpressure and the pressure scales, the parts and installation of air gaps, vacuum breakers, double checks, RPs and detector assemblies, test kits, field test procedures, troubleshooting, records and safety.",
  },
  {
    q: "What are the pass readings for an RP, double check and PVB?",
    a: "Under ASSE's field test flow charts, an RP's first check must hold at least 5 psid and its relief valve must open at 2 psid or more, with the second check tight under backpressure. Each check on a double check must hold more than 1 psid. A PVB's check must hold at least 1 psid and its air inlet must open at 1 psid or more. Local programs may add their own steps.",
  },
  {
    q: "Are these the real ASSE questions?",
    a: "No. Every question is original, written by Tigertest from ASSE's published course objectives and field test flow charts, the US EPA Cross-Connection Control Manual and federal regulations. Tigertest is not affiliated with ASSE International, IAPMO or the American Backflow Prevention Association, and no exam or course question was used.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Backflow Tester Practice Test",
      description,
      url: `${siteUrl}/backflow-tester-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("backflow"),
      featureList: [
        "200 backflow tester practice questions",
        "4 practice tests of 50 questions",
        "5 training sets by topic",
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
        classFaqJsonLd("backflow"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Cross-Connections & Drinking Water Rules", weight: "12%" },
  { name: "Programs, Records & Tester Duties", weight: "14%" },
  { name: "Hydraulics & Pressure", weight: "14%" },
  { name: "Backflow Assemblies & Installation", weight: "20%" },
  { name: "Test Kits & Gauges", weight: "8%" },
  { name: "Field Test Procedures", weight: "20%" },
  { name: "Troubleshooting & Safety", weight: "12%" },
];

export default function BackflowLandingPage() {
  return (
    <div data-theme="backflow" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Backflow Tester Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/backflow-tester/dashboard"
            shortName="Backflow Tester"
            subtitle="200 backflow tester questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/backflow-mobile.png", desktop: "/landing/backflow-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="backflow" />

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
                Five training sets: cross-connections and hydraulics; programs and tester duties; assemblies and installation; test kits and field tests; and troubleshooting and safety. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">50-Question Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions, each with ASSE&apos;s 70% passing line. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on ASSE&apos;s Tester Course Objectives
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ASSE lists 14 course objectives for testers but publishes no weights. Tigertest splits each 50-question test across seven topics: 6 cross-connections, 7 programs, 7 hydraulics, 10 assemblies, 4 test kits, 10 field test procedures and 6 troubleshooting and safety.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("backflow", 3)}
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
            How to Pass the Backflow Tester Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Match the device to the hazard</h3>
              <p>
                Know which devices stop backsiphonage only (the vacuum breakers and the barometric loop) and which also stop backpressure (the air gap, double checks and RPs), and which hazards call for an RP rather than a double check.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the pass numbers cold</h3>
              <p>
                RP first check at least 5 psid, relief valve opening at 2 psid or more, double check and PVB checks at 1 psid, PVB air inlet at 1 psid. Know which test cocks each reading is taken between.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read failures like a flow chart</h3>
              <p>
                A relief valve that discharges when the #2 shutoff closes, a gauge that rises, a relief that drips too early or never: each points to one part. Learn what each symptom means and when a no-flow condition must come first.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do the pressure math</h3>
              <p>
                0.433 psi per foot of water, 2.31 feet per psi, 14.7 psi of atmosphere. Practice converting between psig and psia and working out head. Then take the 50-question tests and aim well above 70%, around 85%, before your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Backflow Tester Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="backflow" />
        </div>
      </div>

      <ExamSampleQuestions examId="backflow" />

      <ExamRelatedTests examId="backflow" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Backflow Tester Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on assemblies, test procedures and troubleshooting.</p>
          <ExamLandingCTA dashboardHref="/backflow-tester/dashboard" />
        </div>
      </div>
    </div>
  );
}
