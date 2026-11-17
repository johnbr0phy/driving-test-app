import "@/lib/banks/nzham";
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

const title = "NZ Amateur Radio Exam Practice Test 2026 - Free Ham Radio Licence Questions";
const metaDescription =
  "Free-to-start New Zealand amateur radio exam practice: 200 original questions on the NZART syllabus, the GURL and PIB 46, four 50-question tests, every answer explained.";
const description =
  "Practice for the New Zealand amateur radio examination for the General Amateur Operator's Certificate (GAOC) and a ZL callsign: 200 original questions written from the NZART syllabus, the General User Radio Licence for Amateur Radio Operators and RSM's PIB 46. Four 50-question practice tests weighted like the real paper's 30 topics, and four training sets covering regulations and operating, electronics fundamentals, safety, receivers and transmitters, and antennas, propagation and interference.";

const faqs = [
  {
    q: "What is the New Zealand amateur radio exam?",
    a: "It is the exam for the General Amateur Operator's Certificate of Competency (GAOC). With the certificate and a ZL callsign you may transmit on the amateur bands under the General User Radio Licence for Amateur Radio Operators. Radio Spectrum Management (RSM), part of MBIE, sets the rules, and NZART runs the exams through RSM-approved Approved Radio Examiners (ARXs). Only New Zealand citizens and permanent residents can normally be granted a GAOC.",
  },
  {
    q: "How many questions are on the amateur radio exam?",
    a: "Each paper has 60 multiple-choice questions. NZART's syllabus has 30 topics, each with a multiple of ten questions in a public 600-question bank, and one question from every ten is drawn at random, so every paper is different but always has the same number of questions from each topic. You have 2 hours, and a calculator is allowed.",
  },
  {
    q: "What score do you need to pass?",
    a: "The pass mark is 40 or more correct answers out of 60, about 67 percent. NZART's examination procedure lets the exam supervisor offer a second, different paper on the day to a candidate who just misses. The practice tests here use the same 67 percent line.",
  },
  {
    q: "What is on the amateur radio exam?",
    a: "Regulations are the biggest single topic, with 7 questions, followed by propagation with 5 and antennas with 4. The rest covers frequencies, electronics fundamentals, Ohm's law, resistance and power, AC and resonance, semiconductors, safety, meters and decibels, receivers, transmitters and harmonics, power supplies, operating practice and Q signals, transmission lines, interference and digital systems. Each practice test here keeps that balance, scaled to 50 questions.",
  },
  {
    q: "What can a new amateur do straight after passing?",
    a: "Under the General User Radio Licence, a new operator may use the bands below 5 MHz and above 25 MHz at once. Operation between 5 MHz and 25 MHz is allowed once you have held the certificate for three months and logged 50 contacts, and that logbook must be kept for at least a year.",
  },
  {
    q: "Are these the real NZART exam questions?",
    a: "No. Every question is original, written by Tigertest from the NZART syllabus, the General User Radio Licence and RSM's PIB 46, so it covers the same knowledge without copying NZART's question bank. NZART publishes its bank and exam generator, and studying them as well is a good idea. Questions that show a circuit symbol are not modelled. Tigertest is not affiliated with NZART or Radio Spectrum Management.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nz amateur radio exam, ham radio licence nz, amateur radio licence new zealand, nzart exam practice, gaoc exam, general amateur operator certificate, zl callsign, amateur radio practice test nz, harec nz",
  alternates: {
    canonical: `${siteUrl}/nz-amateur-radio-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nz-amateur-radio-exam-practice-test`,
    images: [{ url: shareImageUrl("nzham"), width: 1200, height: 630, alt: "Tigertest free NZ amateur radio exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzham")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NZ Amateur Radio Exam Practice Test",
      description,
      url: `${siteUrl}/nz-amateur-radio-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nzham"),
      featureList: [
        "200 New Zealand amateur radio practice questions",
        "4 practice tests of 50 questions weighted like the NZART syllabus",
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
        classFaqJsonLd("nzham"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Regulations & frequencies", weight: "9 of 60" },
  { name: "Ohm's law, resistance, power & units", weight: "10 of 60" },
  { name: "Receivers, transmitters & power supplies", weight: "13 of 60" },
  { name: "Antennas, lines & propagation", weight: "11 of 60" },
  { name: "Components, meters, safety, operating & EMC", weight: "17 of 60" },
];

export default function NzhamLandingPage() {
  return (
    <div data-theme="nzham" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NZ Amateur Radio Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-amateur-radio/dashboard"
            shortName="NZ Amateur Radio"
            subtitle="200 original questions on the New Zealand amateur radio syllabus: regulations, band limits and callsigns, Ohm's law, receivers, transmitters, antennas and propagation. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/nzham-mobile.png", desktop: "/landing/nzham-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzham" />

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
                Four training sets follow the NZART syllabus: regulations and operating; electronics fundamentals; safety, receivers and transmitters; and antennas, propagation and interference. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the 60-question real paper. Aim for 67% or better, the same line as 40 of 60. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the NZART Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NZART draws one question from every ten in each of its 30 syllabus topics, so every real paper has the same mix, and each practice test here keeps it, scaled to 50 questions. Regulations, propagation and antennas carry the most questions. Club tutors running a licence class can set Tigertest as revision at{" "}
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
                src={getTigerAsset("nzham", 3)}
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
                Regulations and frequencies give 9 of the 60 questions. Read the General User Radio Licence for Amateur Radio Operators and RSM&apos;s PIB 46: band edges and power limits, callsign rules, the 15-minute identification rule and what a new operator may do in the first three months.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise the sums with a calculator</h3>
              <p>
                Ohm&apos;s law, series and parallel resistors, power, decibels, wavelength and resonance come up on every paper. A calculator is allowed, so practise setting the sums out and checking the units until it is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know how a station works</h3>
              <p>
                Learn the blocks of a superhet receiver and an SSB transmitter, what each stage does, how harmonics and interference arise and are filtered, and how feed lines, antennas and the ionosphere get your signal to the other station.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 67% or better on every practice test before your exam, then drill the questions you missed and retrain the weakest topic. Your local NZART branch can arrange the exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NZ Amateur Radio Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="nzham" />
        </div>
      </div>

      <ExamSampleQuestions examId="nzham" />

      <ExamRelatedTests examId="nzham" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Amateur Radio Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every topic of the New Zealand amateur radio syllabus.</p>
          <ExamLandingCTA dashboardHref="/nz-amateur-radio/dashboard" />
        </div>
      </div>
    </div>
  );
}
