import "@/lib/banks/ukg3";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

const title = "Unvented Hot Water G3 Practice Test 2026 - Free Mock Exams";
const metaDescription =
  "Free unvented hot water (G3) practice: 200 original questions on safety devices, tundish and D2 sizing, inlet controls and commissioning, from Approved Document G.";
const description =
  "Free practice for the unvented hot water storage systems (G3) certificate: 200 original questions on Part G3 and system types, inlet controls and expansion, thermostats, cut-outs and relief valves, tundish and discharge pipework, temperature control and legionella, installation, commissioning and maintenance. Four 50-question practice tests with an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "unvented hot water practice test, g3 unvented mock exam, unvented cylinder questions, bpec unvented test, part g3 quiz, tundish d2 discharge pipe questions, approved document g practice",
  alternates: {
    canonical: `${siteUrl}/unvented-hot-water-g3-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/unvented-hot-water-g3-practice-test`,
    images: [{ url: shareImageUrl("ukg3"), width: 1200, height: 630, alt: "Tigertest free unvented hot water G3 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukg3")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Unvented Hot Water (G3) Practice",
      description,
      url: `${siteUrl}/unvented-hot-water-g3-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ukg3", "GBP"),
      featureList: ["200 unvented hot water practice questions", "4 practice tests of 50 questions", "4 training sets by topic", "Instant feedback with explanations", "Auto-save progress"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who needs an unvented hot water certificate?",
          acceptedAnswer: { "@type": "Answer", text: "Anyone installing an unvented cylinder in England without building control inspecting it first. Approved Document G says installers can show the skills through a competent person scheme or a current unvented skills card, and schemes ask for this certificate." },
        },
        {
          "@type": "Question",
          name: "What does the assessment cover?",
          acceptedAnswer: { "@type": "Answer", text: "System types, the inlet group (strainer, pressure reducing valve, check valve, expansion relief valve and vessel), the energy cut-out and temperature and pressure relief valve, the tundish and D1 and D2 discharge pipe rules, temperature control and legionella, commissioning, Benchmark paperwork and fault finding." },
        },
        {
          "@type": "Question",
          name: "Do I need to do discharge pipe sums?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Expect to size D2 from Table 3.1 of Approved Document G: take the straight-pipe allowance for the size, subtract the resistance of each elbow, and go up a size if the run is too long." },
        },
        {
          "@type": "Question",
          name: "Is the practical assessment covered here?",
          acceptedAnswer: { "@type": "Answer", text: "No. Tigertest practises the knowledge paper only. The practical, fitting or inspecting a system, is done at the training centre." },
        },
        {
          "@type": "Question",
          name: "How long does the certificate last?",
          acceptedAnswer: { "@type": "Answer", text: "BPEC certificates are valid for five years, and you can reassess in the 12 months before expiry. Check your awarding body's rules." },
        },
        classFaqJsonLd("ukg3"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Building Regulations & Part G3", weight: "12%" },
  { name: "System Types & Principles", weight: "10%" },
  { name: "Inlet Controls & Expansion", weight: "14%" },
  { name: "Thermostats, Cut-outs & Relief Valves", weight: "16%" },
  { name: "Tundish & Discharge Pipework", weight: "16%" },
  { name: "Temperature Control & Legionella", weight: "10%" },
  { name: "Installation & Controls", weight: "8%" },
  { name: "Commissioning & Handover", weight: "6%" },
  { name: "Maintenance & Fault Finding", weight: "8%" },
];

export default function Ukg3LandingPage() {
  return (
    <div data-theme="ukg3" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Unvented Hot Water (G3) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/unvented-hot-water/dashboard"
            shortName="Unvented G3"
            subtitle="200 questions on Part G3 and Approved Document G for the unvented cylinder certificate: safety devices, tundish and D2 sizing, inlet controls, temperatures and commissioning. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukg3-mobile.png", desktop: "/landing/ukg3-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukg3" />

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
                Four training sets, from Regulations & System Types to Install, Commission & Maintain. Master a topic, then take a test. Questions you miss come back until you have mastered them.
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
                Four 50-question practice tests across every topic, with a 70% readiness line and an explanation of the right answer on every question.
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
                Built on Part G3 and Approved Document G
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                No awarding body publishes how many questions come from each topic, so the practice tests follow Approved Document G&apos;s order and put the most weight on the safety devices and discharge pipework, which the law and every assessment focus on. Every question is original.
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
                src={getTigerAsset("ukg3", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For teachers */}
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Course Tutors</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Running unvented courses? Set Tigertest as practice before the assessment at{" "}
          <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
          {" "}and see which topics your group misses most. It is free for you and your learners.
        </p>
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
            How to Pass the Unvented Hot Water Assessment
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the safety devices in order</h3>
              <p>
                An unvented cylinder needs a thermostat plus two independent safety devices: the energy cut-out and the temperature and pressure relief valve. Know what each one does, what it protects against and the order they act in.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise D2 sizing sums</h3>
              <p>
                Expect to size the D2 discharge pipe from Approved Document G: take the allowance for the pipe size, subtract the resistance of each elbow and bend, and go up a size if the run is too long.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the inlet group</h3>
              <p>
                Know each part of the inlet controls (strainer, pressure reducing valve, check valve, expansion relief valve and expansion vessel), what fails when each one goes wrong, and the symptoms that point to it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 85 percent on every practice test before the real one, then retrain your weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Unvented Hot Water (G3) Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who needs an unvented hot water certificate?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Anyone installing an unvented cylinder in England without building control inspecting it first. Approved Document G says installers can show the skills through a competent person scheme or a current unvented skills card, and schemes ask for this certificate.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the assessment cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              System types, the inlet group (strainer, pressure reducing valve, check valve, expansion relief valve and vessel), the energy cut-out and temperature and pressure relief valve, the tundish and D1 and D2 discharge pipe rules, temperature control and legionella, commissioning, Benchmark paperwork and fault finding.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do I need to do discharge pipe sums?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. Expect to size D2 from Table 3.1 of Approved Document G: take the straight-pipe allowance for the size, subtract the resistance of each elbow, and go up a size if the run is too long.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is the practical assessment covered here?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Tigertest practises the knowledge paper only. The practical, fitting or inspecting a system, is done at the training centre.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How long does the certificate last?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              BPEC certificates are valid for five years, and you can reassess in the 12 months before expiry. Check your awarding body&apos;s rules.
            </p>
          </div>
          <ExamClassFaq examId="ukg3" />
        </div>
      </div>

      <ExamSampleQuestions examId="ukg3" />

      <ExamRelatedTests examId="ukg3" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Unvented Assessment?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every topic.</p>
          <ExamLandingCTA dashboardHref="/unvented-hot-water/dashboard" />
        </div>
      </div>
    </div>
  );
}
