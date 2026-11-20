import "@/lib/banks/cahambasic";
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

const title = "Free Canadian Amateur Radio Basic Practice Test 2026 - Ham Radio Exam Questions";
const metaDescription =
  "Free-to-start practice for Canada's Amateur Radio Operator Certificate with Basic Qualification: 200 original questions on ISED's Basic syllabus, RBR-4 and the Radiocommunication Regulations, four 50-question tests, every answer explained.";
const description =
  "Practice for the ISED exam for the Amateur Radio Operator Certificate with Basic Qualification: 200 original questions written from RIC-3's Basic syllabus, RBR-4, the Radiocommunication Regulations and ISED's formula and block diagram sheet. Four 50-question practice tests weighted like the real paper's eight sections, and four training sets covering regulations and bands, operating and station layout, electronics and safety, and antennas, propagation and interference.";

const faqs = [
  {
    q: "What is the Basic Qualification?",
    a: "The Amateur Radio Operator Certificate with Basic Qualification is the certificate Innovation, Science and Economic Development Canada (ISED) issues to new amateur radio operators, with a call sign. It lets you operate on every amateur band above 30 MHz, such as 2 m and 70 cm, at up to 250 W DC input, and build any station equipment except transmitters, which must be assembled from commercial kits of professional design. The exam is given by ISED-accredited examiners, in person or by videoconference, and there is no age or nationality limit.",
  },
  {
    q: "How many questions are on the Basic exam, and what is the pass mark?",
    a: "The exam has 100 multiple-choice questions, one drawn from each of the 100 topics in ISED's Basic syllabus. You need 70% to pass. There is no set time limit; ISED says most candidates finish within an hour. The exam is closed book, but you may use ISED's approved formula and block diagram sheet and a calculator that cannot store formulas or text.",
  },
  {
    q: "What does Basic with Honours give you?",
    a: "A score of 80% or more earns Basic with Honours, which adds every amateur band below 30 MHz, the HF bands used for long-distance contacts. Without Honours, a Basic holder can reach HF by adding the Morse Code (5 wpm) or Advanced qualification. The practice tests here use the 70% pass line; aim for 80% if you want HF.",
  },
  {
    q: "What is on the Basic exam?",
    a: "ISED's syllabus has eight sections: regulations and policies (25 questions), station assembly, practice and safety (21), basic electronics and theory (13), feed lines and antenna systems (13), operating and procedures (9), radio wave propagation (8), circuit components (6) and interference and suppression (5). Each practice test here keeps that balance, scaled to 50 questions.",
  },
  {
    q: "Are these the real ISED exam questions?",
    a: "No. Every question is original, written by Tigertest from ISED's Basic syllabus in RIC-3, RBR-4, the Radiocommunication Regulations and the Radiocommunication Act, so it covers the same knowledge without copying ISED's public question bank. ISED updated that bank on July 15, 2025 and publishes it with an exam generator, and studying it as well is a good idea. Tigertest is not affiliated with ISED.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "canadian amateur radio basic exam, ham radio licence canada, amateur radio operator certificate basic qualification, ised amateur radio exam, basic with honours, ham radio practice test canada, ve call sign, amateur radio exam canada",
  alternates: {
    canonical: `${siteUrl}/canada-amateur-radio-basic-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/canada-amateur-radio-basic-practice-test`,
    images: [{ url: shareImageUrl("cahambasic"), width: 1200, height: 630, alt: "Tigertest free Canadian amateur radio Basic practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cahambasic")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Canadian Amateur Radio Basic Practice Test",
      description,
      url: `${siteUrl}/canada-amateur-radio-basic-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cahambasic"),
      featureList: [
        "200 Canadian amateur radio Basic practice questions",
        "4 practice tests of 50 questions weighted like the ISED Basic syllabus",
        "4 training sets by syllabus topic",
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
        classFaqJsonLd("cahambasic"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Regulations & policies", weight: "25 of 100" },
  { name: "Station assembly, practice & safety", weight: "21 of 100" },
  { name: "Basic electronics & theory", weight: "13 of 100" },
  { name: "Feed lines & antenna systems", weight: "13 of 100" },
  { name: "Operating & procedures", weight: "9 of 100" },
  { name: "Radio wave propagation", weight: "8 of 100" },
  { name: "Circuit components", weight: "6 of 100" },
  { name: "Interference & suppression", weight: "5 of 100" },
];

export default function CahambasicLandingPage() {
  return (
    <div data-theme="cahambasic" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Canadian Amateur Radio Basic Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/canada-amateur-radio-basic/dashboard"
            shortName="Canada Amateur Radio Basic"
            subtitle="200 questions on ISED's Basic syllabus. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/cahambasic-mobile.png", desktop: "/landing/cahambasic-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cahambasic" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Syllabus Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets follow ISED&apos;s Basic syllabus: regulations and bands; operating and station layout; electronics, components and safety; and antennas, propagation and interference. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions, each weighted like the 100-question real exam. Aim for 70% to pass, and 80% for Honours and the HF bands. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the ISED Basic Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ISED draws one question from each of the 100 topics in its Basic syllabus, so every real exam has the same mix, and each practice test here keeps it, scaled to 50 questions. Regulations and station assembly carry almost half the questions. Club instructors running a Basic course can set Tigertest as revision at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the class misses most.
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
                src={getTigerAsset("cahambasic", 3)}
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
            How to Pass the Amateur Radio Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the licence conditions first</h3>
              <p>
                Regulations and policies give 25 of the 100 questions. Read RBR-4 and the amateur sections of the Radiocommunication Regulations: band edges and bandwidths, Basic power limits, identification every 30 minutes, call sign prefixes and what a Basic holder may build and modify.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise the sums with the formula sheet</h3>
              <p>
                Ohm&apos;s law, series and parallel resistors and capacitors, power, decibels, wavelength and antenna lengths come up on every exam. ISED&apos;s formula and block diagram sheet and a basic calculator are allowed, so practise with the same formulas (300/F, 142/F, 71/F, 306/F) until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know how a station works</h3>
              <p>
                Learn the blocks on ISED&apos;s diagrams, from the superhet receiver to the SSB and FM transmitters and the HF station, what each stage does, how harmonics and interference arise and are filtered, and how feed lines, antennas and the ionosphere get your signal to the other station.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 80% or better on every practice test before your exam, so Honours is within reach, then drill the questions you missed and retrain the weakest topic. A local amateur radio club can put you in touch with an accredited examiner.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Canadian Amateur Radio Basic Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cahambasic" />
        </div>
      </div>

      <ExamSampleQuestions examId="cahambasic" />

      <ExamRelatedTests examId="cahambasic" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Amateur Radio Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every section of ISED&apos;s Basic syllabus.</p>
          <ExamLandingCTA dashboardHref="/canada-amateur-radio-basic/dashboard" />
        </div>
      </div>
    </div>
  );
}
