import "@/lib/banks/aufirearmsnsw";
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

const title = "Free NSW Firearms Safety Test Practice 2026 - NSW Gun Licence Questions";
const metaDescription =
  "Free-to-start NSW firearms safety practice test: 200 original questions on the Firearms Act 1996, licence categories, permits, storage and safe handling, four 50-question tests, every answer explained.";
const description =
  "Practice for the NSW firearms safety course (Firearms Licence Qualification course) that comes before a first firearms licence: 200 original questions written from the Firearms Act 1996 as in force from 1 July 2026, the NSW Police Firearms (Longarms) Users Guide and the National Firearms Safety Code. Four 50-question practice tests and four training sets covering licence categories and applying, permits, registration and offences, storage and safe handling, and ranges, the field and firearm basics.";

const faqs = [
  {
    q: "Do I need a safety course for an NSW firearms licence?",
    a: "Yes. Under section 11(3)(b) of the Firearms Act 1996, a person who has never held a firearms licence must complete the firearms training and safety courses prescribed for that licence before one can be issued. For longarms the NSW Police users guide calls this the Firearms Licence Qualification course, run by approved clubs, organisations or trainers, with theory and a practical part on safe handling.",
  },
  {
    q: "What does the NSW firearms safety course cover?",
    a: "The NSW Police users guide for the course covers firearm types, parts and ammunition, basic safety rules and the National Firearms Safety Code, licences and permits, buying, registering and storing firearms, modifying firearms, ranges and the field, the law, and your responsibilities, then a practical component on handling, loading, unloading and maintaining a firearm. This practice test covers the same ground, with every legal rule taken from the current Firearms Act.",
  },
  {
    q: "What score do I need to pass?",
    a: "The documents read for this practice test do not publish a question count or pass mark for the course, which is assessed by the approved trainer. The 80 percent line on these practice tests is a readiness target, not the official standard.",
  },
  {
    q: "What are the genuine reasons for a firearms licence in NSW?",
    a: "The Table to section 12 of the Firearms Act lists sport/target shooting, recreational hunting/vermin control, primary production, vertebrate pest animal control, business or employment, occupational requirements relating to rural purposes, animal welfare and firearms collection. Personal protection is never a genuine reason. Target shooters must be current members of an approved club, and hunters need rural land of their own, permission to shoot on rural land, or membership of an approved hunting club.",
  },
  {
    q: "How long does an NSW firearms licence last?",
    a: "Since 1 July 2026, section 21 of the Firearms Act gives a licence a term of up to 2 years. The NSW Government says licences issued before that date with a 5-year term stay valid until they expire. A first licence cannot be issued until 28 days after the application, and identity verification is now required before an application can proceed.",
  },
  {
    q: "How must firearms be stored in NSW?",
    a: "Category A and B firearms must be kept in a locked, approved receptacle made of hard wood or steel that is not easily penetrable, fixed in place if it weighs less than 150 kg empty, with solid metal locks. Ammunition must be in a separate locked container. Category C, D and H firearms need a locked steel safe bolted to the building. Since 1 July 2026 a permit to acquire is issued only once you show you meet these rules.",
  },
  {
    q: "Are these the real course questions?",
    a: "No. Every question is original, written by Tigertest from the NSW Firearms Act 1996, the NSW Police users guide and the National Firearms Safety Code. Tigertest is not affiliated with the NSW Police Force, the Firearms Registry or any training provider.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nsw firearms licence test, nsw firearms safety course, nsw gun licence practice test, firearms licence qualification course, firearms act 1996 nsw, nsw firearms registry, nsw gun safety test, national firearms safety code",
  alternates: {
    canonical: `${siteUrl}/nsw-firearms-safety-test-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nsw-firearms-safety-test-practice-test`,
    images: [{ url: shareImageUrl("aufirearmsnsw"), width: 1200, height: 630, alt: "Tigertest free NSW firearms safety practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aufirearmsnsw")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NSW Firearms Safety Practice Test",
      description,
      url: `${siteUrl}/nsw-firearms-safety-test-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aufirearmsnsw", "AUD"),
      featureList: [
        "200 NSW firearms safety practice questions",
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
  { name: "Permits, registration & offences", weight: "13 of 50" },
  { name: "Storage & safe handling", weight: "12 of 50" },
  { name: "Ranges, the field & firearm basics", weight: "12 of 50" },
];

export default function NswFirearmsLandingPage() {
  return (
    <div data-theme="aufirearmsnsw" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NSW Firearms Safety Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nsw-firearms-licence/dashboard"
            shortName="NSW Firearms Safety"
            subtitle="200 original questions for the NSW firearms safety course: the Firearms Act 1996, licence categories, permits, storage, safe handling, ranges and the National Firearms Safety Code. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/aufirearmsnsw-mobile.png", desktop: "/landing/aufirearmsnsw-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aufirearmsnsw" />

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
                Four training sets: licence categories and applying; permits, registration and offences; storage and safe handling; and ranges, the field and firearm basics. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each mixing NSW law with safe handling. Aim for 80% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Written from NSW Law and the National Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every legal rule comes from the Firearms Act 1996 as it stands in New South Wales from 1 July 2026, including the 2-year licence term and the new permit to acquire checks. Safe handling, ranges and firearm basics follow the NSW Police users guide and the National Firearms Safety Code. Other states have their own laws, so check theirs before you travel.
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
                src={getTigerAsset("aufirearmsnsw", 1)}
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
                Learn which firearms are category A, B, C, D and H, the genuine reasons the Act accepts, how permits to acquire work, and the notices you must give the Firearms Registry within 7 days.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Get storage and transport exactly right</h3>
              <p>
                Know what a compliant receptacle or safe looks like, why ammunition goes in a separate locked container, and how to carry a firearm safely in a vehicle.
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
          NSW Firearms Safety Frequently Asked Questions
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

      <ExamSampleQuestions examId="aufirearmsnsw" />

      <ExamRelatedTests examId="aufirearmsnsw" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Firearms Safety Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on NSW firearms law and safe firearm handling.</p>
          <ExamLandingCTA dashboardHref="/nsw-firearms-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
