import "@/lib/banks/aufirearmswa";
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
const path = "/wa-firearm-safety-course-practice-test";

const title = "Free WA Firearm Safety Training Practice Test 2026 - WA Gun Licence Questions";
const metaDescription =
  "Free-to-start WA firearm safety practice test: 200 original questions on the Firearms Act 2024 and Firearms Regulations 2024, licences, hunting permissions, storage levels and safe handling, five 40-question tests, every answer explained.";
const description =
  "Practice for the WA Firearm Safety Training Course theory assessment: 200 original questions written from the Firearms Act 2024 (WA), the Firearms Regulations 2024, WA Police Force information sheets and the National Firearms Safety Code. Five 40-question practice tests and four training sets covering licences and hunting permissions, eligibility and firearm categories, storage, transport and conduct, and handling, ranges and young shooters.";

const faqs = [
  {
    q: "Is there still a Firearm Awareness Test in WA?",
    a: "No. The Firearm Awareness Test belonged to the old Firearms Act 1973 and Firearms Regulations 1974. Since the Firearms Act 2024 and Firearms Regulations 2024 commenced on 31 March 2025, anyone applying for a firearm authority (a licence, permit or approval, including approval as an authorised person) who has not held a licence or been an authorised person in the last 3 years must complete the Firearm Safety Training Course instead. It has two parts: an online theory course and assessment delivered by Central Regional TAFE, and an in-person practical course run by a licensed firearms dealer or another approved firearms trainer.",
  },
  {
    q: "What is the theory assessment like?",
    a: "WA Police's information sheet on the CRTAFE theory course says the assessment has 40 questions drawn at random from a question bank, so each attempt is different, and you need an overall score of at least 80% across its three sections. You get 3 attempts; after that you must wait at least 30 days and re-enrol. Allow about 2 hours for the course and assessment, and you have 3 months from enrolment to finish. The certificate is valid for 12 months for a licence application.",
  },
  {
    q: "What does the course cover?",
    a: "CRTAFE lists firearms legislation and licensing, safe handling, operation and storage, firearm types and responsible ownership, transport and security, and the role of firearms in the community. The practical part covers safe handling, your legal obligations under the Firearms Act 2024 and Firearms Regulations 2024, and the responsibilities of authority holders. This practice test covers the same ground, with every legal rule taken from the Act and Regulations.",
  },
  {
    q: "What else do I need for a first WA firearms licence?",
    a: "You must be 18 or older, live in WA and be an Australian citizen, a permanent resident or in a prescribed residency category. You need a genuine reason, such as membership of a licensed firearm club for a Competition Licence or a hunting permission on registered land for a Hunting Licence, compliant storage, and a Firearm Authority Health Examination. A first licence cannot be granted until at least 42 days after you apply, and licences run for 1, 3 or 5 years.",
  },
  {
    q: "Are these the real assessment questions?",
    a: "No. Every question is original, written by Tigertest from the Firearms Act 2024, the Firearms Regulations 2024, WA Police Force information sheets and the National Firearms Safety Code. Tigertest is not affiliated with the Western Australia Police Force, Central Regional TAFE or any firearms trainer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "wa firearm awareness test, wa firearm safety training course, wa gun licence test, firearms act 2024 wa, crtafe firearm safety theory, wa firearms licence practice test, wa police firearms licensing, western australia gun licence",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("aufirearmswa"), width: 1200, height: 630, alt: "Tigertest free WA firearm safety practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aufirearmswa")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free WA Firearm Safety Training Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aufirearmswa", "AUD"),
      featureList: [
        "200 WA firearm safety practice questions",
        "5 practice tests of 40 questions across every topic",
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
  { name: "Licences & hunting permissions", weight: "10 of 40" },
  { name: "Eligibility, categories & ammunition", weight: "10 of 40" },
  { name: "Storage, transport & conduct", weight: "11 of 40" },
  { name: "Handling, ranges & young shooters", weight: "9 of 40" },
];

export default function WaFirearmsLandingPage() {
  return (
    <div data-theme="aufirearmswa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free WA Firearm Safety Training Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/wa-firearms-licence/dashboard"
            shortName="WA Firearm Safety"
            subtitle="200 WA firearm safety questions and five 40-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/aufirearmswa-mobile.png", desktop: "/landing/aufirearmswa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aufirearmswa" />

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
                Four training sets: licences and hunting permissions; eligibility, firearm categories and ammunition; storage, transport and conduct; and handling, ranges and young shooters. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">40-Question Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five practice tests of 40 questions, the length of the CRTAFE theory assessment, each mixing WA law with safe handling. Aim for 80%, the assessment&apos;s pass mark. No question appears in more than one test, and every one comes with an explanation.
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
                Written from the Firearms Act 2024
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every legal rule comes from the Firearms Act 2024 and Firearms Regulations 2024 as they stand in Western Australia, including the eight licence types, firearm number limits, hunting permissions on registered land, the level 1, 2 and 3 storage rules and the transit rules. Handling and firearm basics follow the National Firearms Safety Code. The split between topics is Tigertest&apos;s, since none is published. Other states have their own laws, so check theirs before you travel.
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
                src={getTigerAsset("aufirearmswa", 3)}
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the new licence types</h3>
              <p>
                Know what an Individual Licence allows for competition, hunting and paintball, the 10 and 5 firearm limits, which categories each licence covers, and how a Primary Producer or Collector Licence differs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Understand hunting permissions</h3>
              <p>
                Learn how land is registered, how standard and temporary hunting permissions work, the 28 days you have to replace a permission that expires or is revoked, and why you still need the landholder&apos;s consent each time you hunt.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Get storage and transit exactly right</h3>
              <p>
                Know the thickness of level 1 and level 2 cabinets, when level 3 storage or an alarm is needed, how to anchor a cabinet, and how to make a firearm inoperable and keep ammunition separate on the road.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 80% or better on every practice test before your assessment. After each test, drill the questions you missed and retrain the weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          WA Firearm Safety Frequently Asked Questions
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

      <ExamSampleQuestions examId="aufirearmswa" />

      <ExamRelatedTests examId="aufirearmswa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Firearm Safety Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on WA firearms law and safe firearm handling.</p>
          <ExamLandingCTA dashboardHref="/wa-firearms-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
