import "@/lib/banks/danbice";
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

const title = "Free DANB ICE Practice Test 2026 - Dental Infection Control Questions";
const metaDescription =
  "Free-to-start DANB ICE practice test: 200 original questions on the Infection Control outline, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the Dental Assisting National Board (DANB) Infection Control (ICE) exam: 200 original questions written from DANB's published ICE outline, the CDC's dental infection control guidelines and OSHA's bloodborne pathogens and hazard communication standards. Four 50-question practice tests weighted like the real exam, and five training sets covering disease transmission and PPE; surfaces, tray setups and waterlines; lab items, waste and instrument processing; sterilization monitoring and bloodborne pathogens; and hazard communication and records.";

const faqs = [
  {
    q: "What is the DANB ICE exam?",
    a: "The Infection Control (ICE) exam is the Dental Assisting National Board's (DANB) test of the infection prevention and control knowledge a dental assistant needs to keep patients and the dental team safe. It is one of the component exams of DANB's Certified Dental Assistant (CDA), National Entry Level Dental Assistant (NELDA) and Certified Orthodontic Assistant (COA) certifications. There are no eligibility requirements to take it.",
  },
  {
    q: "How many questions are on the ICE exam?",
    a: "The ICE exam has 75 multiple-choice questions and you have 60 minutes. DANB uses computer adaptive testing, and you can take it at a test center or by remote online proctoring. DANB also offers it in Spanish and Vietnamese.",
  },
  {
    q: "What score do you need to pass the DANB ICE?",
    a: "DANB reports a scaled score from 100 to 900, and 400 passes. A scaled score is neither the number nor the percent of questions right, so the 70 percent line on these practice tests is a readiness target, not DANB's rule. If you do not pass, you can retake the exam as often as you need, reapplying and paying the full fee each time.",
  },
  {
    q: "What does the ICE exam cover?",
    a: "DANB's outline, effective March 12, 2025, gives prevention of disease transmission 20%, prevention of cross-contamination 34%, processing instruments and devices 26%, and occupational safety and administration protocols 20%. That spans hand hygiene and PPE, surface disinfection, waterlines, lab items and waste, sterilization and its monitoring, and the OSHA bloodborne pathogens and hazard communication standards. These practice tests keep that balance across 50 questions.",
  },
  {
    q: "Is the ICE the same as the DANB CDA exam?",
    a: "The ICE is one part of the CDA. The CDA also needs the General Chairside (GC) and Radiation Health and Safety (RHS) exams, but ICE can be taken on its own. Tigertest also has a DANB CDA practice test that mixes all three and a separate DANB RHS practice test.",
  },
  {
    q: "Are these the real DANB ICE questions?",
    a: "No. Every question is original, written by Tigertest from DANB's published outline and from primary sources such as the CDC's 2003 dental infection control guidelines and 2016 summary, the OSHA bloodborne pathogens and hazard communication standards and the EPA's dental amalgam rule. Tigertest is not affiliated with the Dental Assisting National Board.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "danb ice practice test, ice practice test, danb infection control practice test, danb ice exam questions, dental infection control test, dental assistant infection control exam, danb ice 2026",
  alternates: {
    canonical: `${siteUrl}/danb-ice-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/danb-ice-practice-test`,
    images: [{ url: shareImageUrl("danbice"), width: 1200, height: 630, alt: "Tigertest free DANB ICE practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("danbice")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free DANB ICE Practice Test",
      description,
      url: `${siteUrl}/danb-ice-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("danbice"),
      featureList: [
        "200 DANB ICE practice questions",
        "4 practice tests of 50 questions weighted like the DANB ICE outline",
        "5 training sets by ICE domain",
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
        classFaqJsonLd("danbice"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Prevention of Disease Transmission", weight: "20%" },
  { name: "Prevention of Cross-contamination", weight: "34%" },
  { name: "Process Instruments and Devices", weight: "26%" },
  { name: "Occupational Safety and Administration Protocols", weight: "20%" },
];

export default function DanbiceLandingPage() {
  return (
    <div data-theme="danbice" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free DANB ICE Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/dental-infection-control/dashboard"
            shortName="DANB ICE"
            subtitle="200 DANB Infection Control questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/danbice-mobile.png", desktop: "/landing/danbice-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="danbice" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets cover every ICE domain: disease transmission and PPE; surfaces, tray setups and waterlines; lab items, waste and instrument processing; sterilization monitoring and bloodborne pathogens; and hazard communication and records. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the four domains of the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the DANB ICE Exam Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                DANB publishes the share of the exam each domain takes, and every practice test here keeps that balance, scaled to 50 questions. Prevention of cross-contamination is the largest domain, at 34%. Dental assisting instructors can set Tigertest as ICE review at{" "}
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
                src={getTigerAsset("danbice", 3)}
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
            How to Prepare for the DANB ICE Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the CDC guidelines DANB builds on</h3>
              <p>
                DANB lists the CDC&apos;s 2003 Guidelines for Infection Control in Dental Health-Care Settings and its 2016 summary among its references. Read the sections on hand hygiene, PPE, environmental surfaces, waterlines, instrument processing and the dental laboratory, and note every number they give.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Follow an instrument from chair to storage</h3>
              <p>
                Processing and monitoring are a quarter of the exam. Walk through transport, cleaning, packaging, loading, sterilizing and storage, then learn what mechanical, chemical and biological indicators each prove and what to do when a spore test comes back positive.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know OSHA&apos;s two standards</h3>
              <p>
                Learn the Bloodborne Pathogens Standard (engineering and work practice controls, sharps containers, the exposure control plan, training, records and post-exposure steps) and the Hazard Communication Standard (labels, signal words, safety data sheet sections and secondary containers).
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the largest domain most</h3>
              <p>
                Prevention of cross-contamination is 34% of the exam: surfaces and disinfectants, barriers, tray setups, waterlines, evacuation lines, impressions and waste. Drill those questions until you get them right, then take a full practice test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          DANB ICE Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="danbice" />
        </div>
      </div>

      <ExamSampleQuestions examId="danbice" />

      <ExamRelatedTests examId="danbice" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Practice for the DANB ICE Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the DANB ICE exam.</p>
          <ExamLandingCTA dashboardHref="/dental-infection-control/dashboard" />
        </div>
      </div>
    </div>
  );
}
