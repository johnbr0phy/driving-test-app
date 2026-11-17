import "@/lib/banks/aufirearmsqld";
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

const title = "Free QLD Firearms Safety Test Practice 2026 - Queensland Gun Licence Questions";
const metaDescription =
  "Free-to-start Queensland firearms safety practice test: 200 original questions on the Weapons Act 1990, storage, transport and the National Firearms Safety Code, four 50-question tests, every answer explained.";
const description =
  "Practice for the Queensland firearms safety course (11029NAT) that comes before a first weapons licence: 200 original questions written from the Weapons Act 1990, the Weapons Regulation 2016, the Weapons Categories Regulation 1997, the Queensland Police Service storage brochure and the National Firearms Safety Code. Four 50-question practice tests and four training sets covering weapons law and categories, storage and transport, safe handling and firearm actions, and field safety, ranges and private land.";

const faqs = [
  {
    q: "Do I need a safety course for a Queensland firearms licence?",
    a: "Yes. Under section 10AA of the Weapons Act 1990, an applicant must show adequate knowledge of safety practices for the use, storage and maintenance of the weapons the licence will cover. For most first applicants that means completing an approved safety training course within 1 year before applying. The approved course is 11029NAT Course in Firearms and Weapons Safety, owned by the Queensland Police Service and delivered by approved training providers.",
  },
  {
    q: "What does the Queensland firearms safety course cover?",
    a: "The course has a core unit on weapons legislation, weapons and community safety, and a unit for each weapon category, such as using category A and B firearms lawfully, safely and responsibly. This practice test covers the core unit and the category A and B unit: the Weapons Act, genuine reasons and licences, weapon categories, secure storage, transport, public places, private land, buying and selling, ranges and minors, and the National Firearms Safety Code.",
  },
  {
    q: "What score do I need to pass?",
    a: "The Queensland Police Service does not publish a question count or pass mark for the course, and the training provider assesses it. The 80 percent line on these practice tests is a readiness target, not the official standard.",
  },
  {
    q: "What are the genuine reasons for a firearms licence in Queensland?",
    a: "Section 11 of the Weapons Act lists sports or target shooting, recreational shooting, an occupational requirement including rural purposes, and the collection, preservation or study of weapons, and the Weapons Regulation 2016 adds a few more, such as historical re-enactments. Self-defence is not a genuine reason. Target shooters show current membership of an approved club, and recreational shooters show written permission from a rural landowner or membership of a prescribed body.",
  },
  {
    q: "How must firearms be stored in Queensland?",
    a: "When no one has physical possession of a category A, B or C firearm, it must be stored unloaded, with the bolt removed or the action broken, in a locked rigid container of solid steel or solid timber, fixed to the building if it weighs under 150 kg. Category D, H and R weapons need a solid steel container bolted to the building. The Queensland Police Service says ammunition must be stored in a separate secure container.",
  },
  {
    q: "Are these the real course questions?",
    a: "No. Every question is original, written by Tigertest from the Queensland weapons legislation, the Queensland Police Service storage brochure and the National Firearms Safety Code. Tigertest is not affiliated with the Queensland Police Service or any training provider.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "qld firearms licence test, queensland firearms safety course, qld gun licence practice test, 11029nat, weapons act 1990 qld, firearms safety course queensland, qld weapons licence, national firearms safety code",
  alternates: {
    canonical: `${siteUrl}/qld-firearms-safety-test-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/qld-firearms-safety-test-practice-test`,
    images: [{ url: shareImageUrl("aufirearmsqld"), width: 1200, height: 630, alt: "Tigertest free QLD firearms safety practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aufirearmsqld")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free QLD Firearms Safety Practice Test",
      description,
      url: `${siteUrl}/qld-firearms-safety-test-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aufirearmsqld", "AUD"),
      featureList: [
        "200 Queensland firearms safety practice questions",
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
  { name: "Weapons law, licences & categories", weight: "12 of 50" },
  { name: "Storage, transport & public places", weight: "12 of 50" },
  { name: "Safe handling & firearm actions", weight: "13 of 50" },
  { name: "Field safety, ranges & private land", weight: "13 of 50" },
];

export default function QldFirearmsLandingPage() {
  return (
    <div data-theme="aufirearmsqld" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free QLD Firearms Safety Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/qld-firearms-licence/dashboard"
            shortName="QLD Firearms Safety"
            subtitle="200 original questions for the Queensland firearms safety course: the Weapons Act 1990, weapon categories, secure storage, transport, ranges and the National Firearms Safety Code. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/aufirearmsqld-mobile.png", desktop: "/landing/aufirearmsqld-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aufirearmsqld" />

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
                Four training sets: weapons law and categories; storage and transport; safe handling and firearm actions; and field safety, ranges and private land. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each mixing Queensland law with safe handling. Aim for 80% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Written from Queensland Law and the National Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every legal rule comes from the Weapons Act 1990, the Weapons Regulation 2016 and the Weapons Categories Regulation 1997 as they stand in Queensland, with storage advice from the Queensland Police Service. Safe handling, firing zones and firearm actions follow the National Firearms Safety Code. Other states have their own laws, so check theirs before you travel.
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
                src={getTigerAsset("aufirearmsqld", 3)}
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
                Treat every firearm as loaded, keep the muzzle in a safe direction, identify your target beyond all doubt and keep your finger off the trigger until you are ready to shoot. Most of the handling questions come back to these principles.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the categories and your licence</h3>
              <p>
                Learn which firearms are category A, B, C, D and H, the genuine reasons the Act accepts, and the changes you must report to police within 14 days.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Get storage and transport exactly right</h3>
              <p>
                Know what a compliant safe looks like, why ammunition goes in a separate container, how a firearm must travel in a vehicle and what you may never do in a public place.
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
          QLD Firearms Safety Frequently Asked Questions
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

      <ExamSampleQuestions examId="aufirearmsqld" />

      <ExamRelatedTests examId="aufirearmsqld" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Firearms Safety Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on Queensland weapons law and safe firearm handling.</p>
          <ExamLandingCTA dashboardHref="/qld-firearms-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
