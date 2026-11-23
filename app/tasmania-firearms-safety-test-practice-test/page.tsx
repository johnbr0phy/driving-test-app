import "@/lib/banks/aufatas";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;
const path = "/tasmania-firearms-safety-test-practice-test";

const title = "Free Tasmania Firearms Safety Practice Test 2026 - Tas Gun Licence Questions";
const metaDescription =
  "Free-to-start Tasmania firearms safety practice test: 200 original questions on the Firearms Act 1996 (Tas) and Firearms Regulations 2026, licence categories, permits, storage and the safety code, four 50-question tests, every answer explained.";
const description =
  "Practice for the Tasmanian firearms safety training course you need before a first firearms licence: 200 original questions written from the Firearms Act 1996 (Tas), the Firearms Regulations 2026, Tasmania Police Firearms Services information sheets and the National Firearms Safety Code. Four 50-question practice tests and four training sets covering licence categories and applying, permits, conditions and offences, storage, minors and public places, and the safety code and firearm basics.";

const faqs = [
  {
    q: "Do I need to pass a firearms safety course for a Tasmanian licence?",
    a: "Yes. Under section 29 of the Firearms Act 1996 (Tas), the Commissioner of Police cannot grant a firearms licence unless the applicant has satisfactorily completed an approved firearms safety course. The Commissioner has approved TasTAFE to run these courses, and they are used to determine the competency of licence applicants.",
  },
  {
    q: "How do I enrol in the course?",
    a: "You lodge a licence application at Service Tasmania first. Firearms Services then writes to you with approval to enrol, and only people with that written approval may enrol, in the course for the category of firearms that was approved. There are different courses for different categories, and once you have completed the course for a category you do not have to do it again.",
  },
  {
    q: "What is the course assessment like?",
    a: "TasTAFE runs and assesses the course. Tasmania Police and TasTAFE do not publish a question count or pass mark, so the 50-question tests and the 80% line here are Tigertest's readiness targets, not the official format. The course covers Tasmanian firearms law, storage and safe handling.",
  },
  {
    q: "What else do I need for a first Tasmanian firearms licence?",
    a: "You must be at least 18, a fit and proper person and have a genuine reason, such as sport or target shooting with an approved club or recreational hunting with written permission to shoot on specified land. Personal protection is never a genuine reason. A licence can be granted only after 28 days from the day you lodge the application, and you cannot possess a firearm until the licence card arrives. A permit to acquire is then needed for each firearm.",
  },
  {
    q: "Are these the real course questions?",
    a: "No. Every question is original, written by Tigertest from the Firearms Act 1996 (Tas), the Firearms Regulations 2026, Tasmania Police Firearms Services information sheets and the National Firearms Safety Code. Tigertest is not affiliated with Tasmania Police or TasTAFE.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "tasmania firearms licence test, tasmanian firearms safety course, tas gun licence test, firearms act 1996 tasmania, tastafe firearms safety training, tasmania firearms safety practice test, firearms services tasmania, tasmania gun licence",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("aufatas"), width: 1200, height: 630, alt: "Tigertest free Tasmania firearms safety practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aufatas")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Tasmania Firearms Safety Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aufatas", "AUD"),
      featureList: [
        "200 Tasmania firearms safety practice questions",
        "4 practice tests of 50 questions across every topic",
        "4 training sets by topic",
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
  { name: "Licence categories & applying", weight: "14 of 50" },
  { name: "Permits, conditions & offences", weight: "12 of 50" },
  { name: "Storage, minors & public places", weight: "13 of 50" },
  { name: "Safety code & firearm basics", weight: "11 of 50" },
];

export default function TasFirearmsLandingPage() {
  return (
    <div data-theme="aufatas" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Tasmania Firearms Safety Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/tas-firearms-licence/dashboard"
            shortName="Tas Firearms Safety"
            subtitle="200 Tasmanian firearms safety questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/aufatas-mobile.png", desktop: "/landing/aufatas-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aufatas" />

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
                Four training sets: licence categories and applying; permits, conditions and offences; storage, minors and public places; and the safety code and firearm basics. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each mixing Tasmanian law with safe handling. Aim for 80%, Tigertest&apos;s readiness line, since no official pass mark is published. No question appears in more than one test, and every one comes with an explanation.
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
                Written from the Firearms Act 1996 (Tas)
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every legal rule comes from the Firearms Act 1996 (Tas) and the Firearms Regulations 2026 as they stand in Tasmania, including the Category A, B, C, D and H licences, genuine reasons, permits to acquire, minor&apos;s permits, the 2 mm and 3 mm safe rules, electronic security devices and the conveying rules. Changes that Parliament has passed but that have not yet commenced are left out. Handling follows Tasmania Police&apos;s information sheets and the National Firearms Safety Code. The split between topics is Tigertest&apos;s, since none is published. Other states have their own laws, so check theirs before you travel.
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
                src={getTigerAsset("aufatas", 3)}
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
            How to Prepare for the Course
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the categories and genuine reasons</h3>
              <p>
                Learn which firearms fall in Categories A, B, C, D and H, which genuine reasons each category allows, and why personal protection never counts.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the permit and registration steps</h3>
              <p>
                Know when you need a permit to acquire, how long it lasts, the waiting periods, and the 7-day notices for selling a firearm or reporting one lost or stolen.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Get storage and conveying exactly right</h3>
              <p>
                Know the metal thickness for each category, how a light safe must be fixed, when an alarm or camera is needed, and how to carry a firearm and its ammunition in a vehicle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 80% or better on every practice test before your course. After each test, drill the questions you missed and retrain the weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Tasmania Firearms Safety Frequently Asked Questions
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

      <ExamSampleQuestions examId="aufatas" />

      <ExamRelatedTests examId="aufatas" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Firearms Safety Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on Tasmanian firearms law and safe firearm handling.</p>
          <ExamLandingCTA dashboardHref="/tas-firearms-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
