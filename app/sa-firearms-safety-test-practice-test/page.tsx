import "@/lib/banks/aufasa";
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
const path = "/sa-firearms-safety-test-practice-test";

const title = "Free SA Firearms Safety Practice Test 2026 - South Australia Gun Licence Questions";
const metaDescription =
  "Free-to-start South Australia firearms safety practice test: 200 original questions on the Firearms Act 2015 (SA), the Firearms Regulations 2017, storage levels, permits and safe handling, four 50-question tests, every answer explained.";
const description =
  "Practice for the firearms safety training SAPOL requires before a first South Australian firearms licence: 200 original questions written from the Firearms Act 2015 (SA), the Firearms Regulations 2017 and its storage code, SAPOL Firearms Branch guidance and the National Firearms Safety Code. Four 50-question practice tests and four training sets covering firearm and licence categories, supervised use, permits and registration, storage, transport and conduct, and safe handling, clubs and police powers.";

const faqs = [
  {
    q: "What safety training do I need for a first SA firearms licence?",
    a: "Section 15 of the Firearms Act 2015 (SA) lets the Registrar refuse a licence until you have completed training in the safe handling, use, storage and transport of firearms, and regulation 28 lets the Registrar require a course, a written examination and a practical examination. In practice you apply to SAPOL first with form PD303; if your application is accepted, the approval letter tells you what training you need and who to contact. TAFE SA runs SAPOL-approved firearm safety training, and TAFE SA says its category A and B course must be completed before, or on the same day as, its category H training.",
  },
  {
    q: "What is the TAFE SA firearm safety course like?",
    a: "TAFE SA says the Category A and B course has online learning with compulsory exercises (about 6 to 8 hours) to finish before a one-day class of about 8.5 hours, with theory and assessments and about 2 hours of practical assessment. It covers what a firearm is, firearms and the law, safety with firearms and using them responsibly, hunting and animal destruction, and range rules. You must bring your SAPOL approval letter and complete the training within 6 months of the letter. TAFE SA does not publish a question count or pass mark, so the 80% line in these tests is Tigertest's own target.",
  },
  {
    q: "What else do I need for a first SA firearms licence?",
    a: "You must be an Australian citizen or permanent resident usually resident in South Australia, be a fit and proper person and have a genuine reason, such as club shooting, hunting or primary production; personal protection is never a genuine reason. Most applicants must be 18, with narrow exceptions for juniors. A new licence cannot be granted until at least 28 days after you apply, you need compliant storage at your home, and licences covering only categories A, B or C run for up to 5 years (3 years for others).",
  },
  {
    q: "Does this cover South Australian law or national rules?",
    a: "South Australian law. Every legal rule comes from the Firearms Act 2015 (SA), the Firearms Regulations 2017 and its Schedule 1 storage and transport code, as in force in November 2026, and SAPOL's own guidance. SA's rules differ from other states in many details, such as the 12 licence categories, the storage tiers by number of firearms and the 10-day and 28-day loan agreements, so check the law of any state you travel to.",
  },
  {
    q: "Are these the real course questions?",
    a: "No. Every question is original, written by Tigertest from the Firearms Act 2015 (SA), the Firearms Regulations 2017, SAPOL Firearms Branch pages and the National Firearms Safety Code. Tigertest is not affiliated with South Australia Police, the Registrar of Firearms, TAFE SA or any firearms club or trainer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "sa firearms licence test, south australia firearms safety course, sapol firearms licence, tafe sa firearm safety training, firearms act 2015 sa, sa gun licence practice test, south australia gun licence, firearms regulations 2017",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("aufasa"), width: 1200, height: 630, alt: "Tigertest free South Australia firearms safety practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aufasa")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SA Firearms Safety Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aufasa", "AUD"),
      featureList: [
        "200 South Australia firearms safety practice questions",
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
  { name: "Firearm & licence categories", weight: "13 of 50" },
  { name: "Supervised use, permits & registration", weight: "11 of 50" },
  { name: "Storage, transport & conduct", weight: "13 of 50" },
  { name: "Safe handling, clubs & police powers", weight: "13 of 50" },
];

export default function SaFirearmsLandingPage() {
  return (
    <div data-theme="aufasa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SA Firearms Safety Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/sa-firearms-licence/dashboard"
            shortName="SA Firearms Safety"
            subtitle="200 South Australian firearms safety questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/aufasa-mobile.png", desktop: "/landing/aufasa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aufasa" />

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
                Four training sets: firearm and licence categories; supervised use, permits and registration; storage, transport and conduct; and safe handling, clubs and police powers. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each mixing South Australian law with safe handling. Aim for 80%, Tigertest&apos;s target: TAFE SA publishes no pass mark for its assessments. No question appears in more than one test, and every one comes with an explanation.
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
                Written from the Firearms Act 2015 (SA)
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every legal rule comes from the Firearms Act 2015 and Firearms Regulations 2017 as they stand in South Australia, including the 12 licence categories, supervised use by adults and juniors, permits to acquire and loan agreements, the level 1 and level 2 safes and storage levels 1 to 3, and the transport code. Handling basics follow the National Firearms Safety Code. The split between topics is Tigertest&apos;s, since none is published. Other states have their own laws, so check theirs before you travel.
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
                src={getTigerAsset("aufasa", 3)}
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the categories</h3>
              <p>
                Know which firearms fall in categories A, B, C, D and H and which are prescribed, then the 12 licence categories and the firearm categories each allows: hunting is A and B only, club handguns come with extra limits, and primary producers have their own rules.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know who may use a firearm, and how one changes hands</h3>
              <p>
                Learn the supervised-use rules for adults and for 10 to 13 and 14 to 17-year-olds, the 28-day permit wait and when it does not apply, witnessed transfers, registering within 14 days, and oral and written loan agreements.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Get storage and transport exactly right</h3>
              <p>
                Know when a level 1 or level 2 safe is enough, when CCTV, an alarm or a strongroom is needed, how to anchor a safe under 150 kg, where keys and ammunition may be kept, and how to carry firearms out of sight in a locked compartment.
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
          SA Firearms Safety Frequently Asked Questions
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

      <ExamSampleQuestions examId="aufasa" />

      <ExamRelatedTests examId="aufasa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Firearm Safety Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on South Australian firearms law and safe firearm handling.</p>
          <ExamLandingCTA dashboardHref="/sa-firearms-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
