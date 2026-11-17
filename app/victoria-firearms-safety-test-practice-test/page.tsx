import "@/lib/banks/aufirearmsvic";
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

const title = "Free Victoria Firearms Safety Test Practice 2026 - Vic Gun Licence Questions";
const metaDescription =
  "Free-to-start Victorian firearm safety course practice test: 200 original questions on the Firearms Act 1996 (Vic), licence categories, permits, storage and the ten safety rules, four 50-question tests, every answer explained.";
const description =
  "Practice for the Victorian longarm firearm safety course and its multiple-choice safety and law knowledge test, which come before a first firearm licence: 200 original questions written from the Firearms Act 1996 (Vic) as in force from 19 August 2026, the Victoria Police Firearm Safety Code booklet and the longarm course material. Four 50-question practice tests and four training sets covering licence categories and applying, permits, carriage and the law, storage and the ten safety rules, and the field and firearm basics.";

const faqs = [
  {
    q: "Do I need a safety course for a Victorian firearm licence?",
    a: "Yes. Under section 17 of the Firearms Act 1996, the Chief Commissioner must be satisfied that an applicant has satisfactorily completed an approved course of firearms safety and has a good knowledge of firearms law, and section 20 sets the same rule for junior licences. Victoria Police sets the minimum course requirements and approves independent instructors, and the course must suit the licence you apply for.",
  },
  {
    q: "What is on the Victorian firearm safety test?",
    a: "Victoria Police says the longarm course ends with a short multiple-choice safety and law knowledge test, sat in person even when the course is online, with photo identification. The course covers the ten rules of the Firearm Safety Code, firearm types and actions, safe handling, and the parts of the Firearms Act you need: licence categories, permits to acquire, storage, carriage and your duties. If you pass, the instructor gives you a certificate to attach to your licence application. Victoria Police does not publish a question count or pass mark in the documents read for this practice test, so the 80 percent line here is a readiness target, not the official standard.",
  },
  {
    q: "What licence categories are there in Victoria?",
    a: "Category A covers airguns, rimfire rifles that are not semi-automatic and shotguns that are not lever, pump or semi-automatic. Category B covers muzzle loaders, centre fire rifles that are not semi-automatic, and lever action shotguns of up to 5 rounds. Category C covers semi-automatic rimfire rifles of up to 10 rounds and semi-automatic or pump shotguns of up to 5 rounds, and is limited to reasons such as primary production and clay target shooting. Categories D and E are restricted further. A junior licence lets 12 to 17 year olds shoot under immediate supervision.",
  },
  {
    q: "How must firearms be stored in Victoria?",
    a: "Schedule 4 of the Firearms Act says category A and B longarms must be kept in a purpose-built steel receptacle of at least 1.6 mm steel to AS/NZS 1594, bolted to the building if it weighs less than 150 kg empty and locked with a sturdy lock. Ammunition goes in a separate locked container. More than 15 firearms on the premises need an intruder alarm, and for category C and D firearms the safe key must be carried by you or kept securely in another room.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from the Firearms Act 1996 (Vic), the Victoria Police Firearm Safety Code booklet and the longarm course material. Tigertest is not affiliated with Victoria Police, its Licensing and Regulation Division or any firearm safety course provider.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "victoria firearms licence test, vic firearm safety course, victorian gun licence practice test, firearm safety code victoria, firearms act 1996 victoria, licensing and regulation division, vic gun safety test, longarm safety course",
  alternates: {
    canonical: `${siteUrl}/victoria-firearms-safety-test-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/victoria-firearms-safety-test-practice-test`,
    images: [{ url: shareImageUrl("aufirearmsvic"), width: 1200, height: 630, alt: "Tigertest free Victorian firearm safety practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aufirearmsvic")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Victoria Firearms Safety Practice Test",
      description,
      url: `${siteUrl}/victoria-firearms-safety-test-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aufirearmsvic", "AUD"),
      featureList: [
        "200 Victorian firearm safety practice questions",
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
  { name: "Licence categories & applying", weight: "13 of 50" },
  { name: "Permits, carriage & the law", weight: "13 of 50" },
  { name: "Storage & the ten safety rules", weight: "12 of 50" },
  { name: "The field & firearm basics", weight: "12 of 50" },
];

export default function VicFirearmsLandingPage() {
  return (
    <div data-theme="aufirearmsvic" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Victoria Firearms Safety Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/vic-firearms-licence/dashboard"
            shortName="Vic Firearms Safety"
            subtitle="200 original questions for the Victorian firearm safety course test: the Firearms Act 1996 (Vic), licence categories, permits to acquire, storage, carriage and the ten rules of the Firearm Safety Code. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/aufirearmsvic-mobile.png", desktop: "/landing/aufirearmsvic-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aufirearmsvic" />

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
                Four training sets: licence categories and applying; permits, carriage and the law; storage and the ten safety rules; and the field and firearm basics. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions, each mixing Victorian law with safe handling. Aim for 80% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Written from Victorian Law and the Firearm Safety Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every legal rule comes from the Firearms Act 1996 as it stands in Victoria from 19 August 2026, including the steel safe standard in Schedule 4. Safe handling, the field and firearm basics follow the Victoria Police Firearm Safety Code booklet and the longarm course material. Other states have their own laws, so check theirs before you travel.
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
                src={getTigerAsset("aufirearmsvic", 3)}
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the safety code by heart</h3>
              <p>
                The Victorian Firearm Safety Code has ten basic rules, from treating every firearm as loaded to never climbing fences with a loaded firearm. Learn them in order and what each one means in the field: most of the handling questions come back to them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the categories and your licence</h3>
              <p>
                Learn which firearms are category A, B, C, D and E, the genuine reasons the Act accepts, how permits to acquire work, and the notices you must give: loss or theft within 24 hours and a change of address within 14 days.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Get storage and transport exactly right</h3>
              <p>
                Know what a compliant steel safe looks like, why ammunition goes in a separate locked container, and why a loaded firearm in a vehicle on a public road is an offence.
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
          Victoria Firearms Safety Frequently Asked Questions
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

      <ExamSampleQuestions examId="aufirearmsvic" />

      <ExamRelatedTests examId="aufirearmsvic" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Firearms Safety Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on Victorian firearms law and safe firearm handling.</p>
          <ExamLandingCTA dashboardHref="/vic-firearms-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
