import "@/lib/banks/auham";
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

const title = "Australian Amateur Radio Foundation Practice Test 2026 - Free ACMA Exam Questions";
const metaDescription =
  "Free-to-start practice for Australia's Foundation amateur radio exam: 200 original questions on the ACMA syllabus and the Amateur Class Licence, eight 25-question tests, every answer explained.";
const description =
  "Practice for the Australian amateur radio Foundation exam for an ACMA recognition certificate (Foundation): 200 original questions written from the ACMA Foundation syllabus, the Radiocommunications (Amateur Stations) Class Licence 2023 and ACMA's operating procedures and call sign policy. Eight 25-question practice tests like the real multi-choice paper, and four training sets covering licence conditions and call signs, technical basics and radios, antennas and propagation, and interference and safety.";

const faqs = [
  {
    q: "What is the Foundation amateur radio exam?",
    a: "It is the entry-level exam for an ACMA recognition certificate (Foundation), the basic Australian amateur radio qualification. Since 19 February 2024 amateur stations operate under the Radiocommunications (Amateur Stations) Class Licence 2023, and a qualified Foundation operator may use parts of the 80, 40, 15, 10 and 2 metre and 70 centimetre bands at up to 10 watts peak envelope power. The ACMA administers the exams through a network of volunteer accredited assessors, and sitting the exam with an assessor is free.",
  },
  {
    q: "How many questions are on the Foundation exam?",
    a: "The theory and regulations part is a multi-choice paper of 25 questions, drawn from every section of the ACMA Foundation syllabus except the operating practices section. You have 30 minutes when you sit it in one session, and the assessor supplies reference material such as tables, formulas and the class licence. There is also a practical assessment of operating a station, based mainly on syllabus section 8.",
  },
  {
    q: "What score do you need to pass?",
    a: "The ACMA syllabus says you need 70 percent, 18 of the 25 multi-choice questions, and must show competence in every element of the practical assessment. If you do not pass, a resit must be at least 3 months later and use a different paper. The practice tests here use the same 18 of 25 line.",
  },
  {
    q: "What is on the Foundation exam?",
    a: "The syllabus has nine sections: the nature of amateur radio, licence conditions, technical basics such as Ohm's law and wavelength, transmitters and receivers, transmission lines and antennas, propagation, interference and EMC, operating practices and safety. Licence conditions have the most assessment points, so each practice test here gives them 7 of 25 questions, then technical basics and antennas 4 each.",
  },
  {
    q: "Are these the real ACMA exam questions?",
    a: "No. The ACMA does not publish its exam questions; accredited assessors set the papers. Every question here is original, written by Tigertest from the ACMA Foundation syllabus, the Amateur Class Licence and ACMA's operating procedures and call sign policy. The practical assessment and picture-identification items are not modelled. Tigertest is not affiliated with the ACMA.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "australian amateur radio foundation exam, foundation licence practice test, acma recognition certificate foundation, ham radio licence australia, amateur radio exam australia, vk callsign, amateur class licence, foundation amateur radio questions",
  alternates: {
    canonical: `${siteUrl}/australian-amateur-radio-foundation-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/australian-amateur-radio-foundation-practice-test`,
    images: [{ url: shareImageUrl("auham"), width: 1200, height: 630, alt: "Tigertest free Australian amateur radio Foundation practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("auham")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Australian Amateur Radio Foundation Practice Test",
      description,
      url: `${siteUrl}/australian-amateur-radio-foundation-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("auham"),
      featureList: [
        "200 Australian amateur radio Foundation practice questions",
        "8 practice tests of 25 questions like the real paper",
        "4 training sets by syllabus section",
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
        classFaqJsonLd("auham"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Licence conditions, bands & call signs", weight: "7 of 25" },
  { name: "Technical basics", weight: "4 of 25" },
  { name: "Transmitters & receivers", weight: "3 of 25" },
  { name: "Transmission lines & antennas", weight: "4 of 25" },
  { name: "Propagation", weight: "2 of 25" },
  { name: "Interference & EMC", weight: "2 of 25" },
  { name: "Safety", weight: "3 of 25" },
];

export default function AuhamLandingPage() {
  return (
    <div data-theme="auham" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Australian Amateur Radio Foundation Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/au-amateur-radio/dashboard"
            shortName="AU Amateur Radio"
            subtitle="200 Foundation syllabus questions and eight 25-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/auham-mobile.png", desktop: "/landing/auham-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="auham" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Syllabus Section</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets follow the ACMA Foundation syllabus: licence conditions and call signs; technical basics and radios; antennas and propagation; and interference and safety. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight practice tests of 25 questions, the length of the real multi-choice paper. Aim for 18 of 25 or better, the ACMA pass line. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the ACMA Foundation Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real paper draws on every section of the syllabus except operating practices, which is assessed in the practical. The ACMA publishes no weights, so each practice test here follows the number of assessment points in each section, with licence conditions carrying the most. Club tutors running a Foundation course can set Tigertest as revision at{" "}
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
                src={getTigerAsset("auham", 3)}
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
            How to Pass the Foundation Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the class licence first</h3>
              <p>
                Licence conditions carry the most syllabus points. Read the Radiocommunications (Amateur Stations) Class Licence 2023 and ACMA&apos;s operating procedures: the Foundation bands and 10 watt limit, call signs, identifying every 10 minutes, encoding, distress and urgency calls.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise the simple sums</h3>
              <p>
                Ohm&apos;s law, power, milli, kilo and mega prefixes, and turning frequency into wavelength come up in the technical basics. Practise setting the sums out and checking the units until it is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know how a station fits together</h3>
              <p>
                Learn the stages of a simple transmitter and receiver, the transceiver controls, coax and connectors, antennas, VSWR and the ATU, and how propagation, interference and station safety work. The practical assessment builds on the same knowledge.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 18 of 25 or better on every practice test, then drill the questions you missed and retrain the weakest topic. The ACMA lists accredited assessors who arrange exams.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Foundation Amateur Radio Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="auham" />
        </div>
      </div>

      <ExamSampleQuestions examId="auham" />

      <ExamRelatedTests examId="auham" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Foundation Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every section of the ACMA Foundation syllabus.</p>
          <ExamLandingCTA dashboardHref="/au-amateur-radio/dashboard" />
        </div>
      </div>
    </div>
  );
}
