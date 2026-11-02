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

const siteUrl = SITE_URL;

const title = "18th Edition Practice Test 2026 - Free BS 7671 Mock Exams";
const metaDescription =
  "Free 18th Edition practice for City & Guilds 2382-26 (BS 7671:2018+A4:2026): 200 original questions with explanations, four 60% pass mock exams.";
const description =
  "Free practice for the 18th Edition IET Wiring Regulations exam, City & Guilds 2382-26 on BS 7671:2018+A4:2026: 200 original questions on scope and definitions, assessment of general characteristics, protection for safety, selection and erection, inspection and testing, special locations, Part 8 and the appendices. Four 50-question mock exams weighted like the City & Guilds test specification, with an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "18th edition practice test, 18th edition mock exam, City and Guilds 2382-26 practice questions, BS 7671 practice test, wiring regulations exam questions, 2382 mock test, amendment 4 2026 18th edition, IET wiring regulations quiz",
  alternates: {
    canonical: `${siteUrl}/18th-edition-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/18th-edition-practice-test`,
    images: [{ url: shareImageUrl("uk18ed"), width: 1200, height: 630, alt: "Tigertest free 18th Edition wiring regulations practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("uk18ed")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free 18th Edition Wiring Regulations Practice",
      description,
      url: `${siteUrl}/18th-edition-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 BS 7671 practice questions on Amendment 4:2026",
        "4 mock exams of 50 questions weighted like the C&G 2382-26 test specification",
        "4 training sets, one per mock exam",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the pass mark for the 18th Edition exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "City & Guilds sets the pass mark for the 2382-26 exam at approximately 60 percent, which is about 36 of the 60 questions. The result is simply pass or fail. The mock exams here use 60 percent too, but aim for 80 percent or more before you sit the real one, because the open-book format rewards knowing where things are, not just what they say.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the 18th Edition exam and how long do I get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The City & Guilds 2382-26 exam is one online multiple-choice test of 60 questions in 120 minutes, about two minutes a question. It is open book: you take in a clean copy of BS 7671:2018+A4:2026 with no notes, sample questions or added diagrams in it.",
          },
        },
        {
          "@type": "Question",
          name: "What topics does the 18th Edition exam cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The test specification follows the parts of BS 7671: scope and fundamental principles (4 questions), definitions (2), assessment of general characteristics (6), protection for safety (15), selection and erection (14), inspection and testing (4), special installations or locations (7), and Part 8 with the appendices (8). Protection for safety and selection and erection together are almost half the paper.",
          },
        },
        {
          "@type": "Question",
          name: "Which version should I study: 2382-22 or 2382-26?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Study for 2382-26. Amendment 4 to BS 7671:2018 was published on 15 April 2026, City & Guilds made 2382-26 the current version from 16 April 2026, and the previous version of the standard was withdrawn on 15 October 2026. Amendment 4 adds Section 716 on Power over Ethernet, a new section on functional earthing, a revised Section 710 for medical locations and changes to the EICR coding, and it includes everything from Amendments 2 and 3.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real City & Guilds questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question here is written by Tigertest from the requirements of BS 7671:2018+A4:2026 and the City & Guilds test specification, without copying past papers or sample tests. The questions describe the requirement rather than quoting regulation numbers, so practise looking each answer up in your own copy of the book, which is the skill the open-book exam really tests.",
          },
        },
        classFaqJsonLd("uk18ed"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Scope, Object & Fundamental Principles", weight: "6%" },
  { name: "Definitions", weight: "4%" },
  { name: "Assessment of General Characteristics", weight: "10%" },
  { name: "Protection for Safety", weight: "26%" },
  { name: "Selection & Erection", weight: "24%" },
  { name: "Inspection & Testing", weight: "6%" },
  { name: "Special Installations & Locations", weight: "12%" },
  { name: "Part 8 & Appendices", weight: "12%" },
];

export default function EighteenthEditionLandingPage() {
  return (
    <div data-theme="uk18ed" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free 18th Edition Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/18th-edition/dashboard"
            shortName="18th Edition"
            subtitle="200 questions on BS 7671:2018+A4:2026 for the City & Guilds 2382-26 exam: protection for safety, selection and erection, special locations and the appendices, weighted like the real paper. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/uk18ed-mobile.png", desktop: "/landing/uk18ed-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="uk18ed" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one per mock exam: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question mock exams in the proportions of the City & Guilds test specification, with the same 60% pass mark and an explanation of the right answer on every question. Keep your copy of the book open, just like on the day.
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
                Built on the City & Guilds 2382-26 Test Specification
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                City & Guilds publishes how many of the 60 questions come from each part of BS 7671, and the mock exams here follow it. Part 4 (protection for safety) and Part 5 (selection and erection) make up almost half the paper, so those are where most of your practice should go. Every question is original and checked against the Amendment 4:2026 requirements, including the new EICR coding and functional earthing rules.
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
                src={getTigerAsset("uk18ed", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For teachers */}
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Course Tutors</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Running a 2382-26 course at a college or training centre? Set Tigertest as practice between sessions at{" "}
          <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
          {" "}and see which parts of BS 7671 your group misses most before exam day. It is free for you and your learners.
        </p>
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
            How to Pass the 18th Edition Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the book&apos;s layout, not just its content</h3>
              <p>
                The exam is open book, so speed of finding things decides your score. Know that Part 2 holds the definitions, Part 4 the protective measures and disconnection times, Part 5 cable selection and earthing, Part 6 testing and Part 7 the special locations, and use the index and the contents page of each part. Tabs on the main tables (disconnection times, maximum Zs, cpc sizes, bonding sizes) save minutes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the key numbers without looking</h3>
              <p>
                Some figures come up so often that looking them up wastes time: 0.4 s and 0.2 s for TN and TT final circuits, 5 s and 1 s for distribution circuits, 30 mA for additional protection, 50 V for touch voltage, 2.25 m and 0.6 m for bathroom zones, 3 m for sockets near a bath, 3% and 5% voltage drop, and 500 V DC with 1 MΩ for insulation resistance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise the calculations</h3>
              <p>
                Expect a few sums: maximum Zs from (U0 × Cmin) / Ia, the adiabatic equation for protective conductors, rating factors for cable sizing, voltage drop from mV/A/m and the ring circuit (r1 + r2) / 4. Read the question for what it gives you, write the formula, then check your answer against the matching table.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by part of the book. Aim for 80 percent or more on all four mock exams before you sit the real one, so you have room above the 60 percent pass mark. After each mock, find every missed answer in BS 7671 yourself, then retrain that test&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          18th Edition Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the 18th Edition exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              City & Guilds sets the pass mark for the 2382-26 exam at approximately 60 percent, which is about 36 of the 60 questions. The result is simply pass or fail. The mock exams here use 60 percent too, but aim for 80 percent or more before you sit the real one, because the open-book format rewards knowing where things are, not just what they say.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the 18th Edition exam and how long do I get?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The City & Guilds 2382-26 exam is one online multiple-choice test of 60 questions in 120 minutes, about two minutes a question. It is open book: you take in a clean copy of BS 7671:2018+A4:2026 with no notes, sample questions or added diagrams in it.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What topics does the 18th Edition exam cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The test specification follows the parts of BS 7671: scope and fundamental principles (4 questions), definitions (2), assessment of general characteristics (6), protection for safety (15), selection and erection (14), inspection and testing (4), special installations or locations (7), and Part 8 with the appendices (8). Protection for safety and selection and erection together are almost half the paper.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which version should I study: 2382-22 or 2382-26?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Study for 2382-26. Amendment 4 to BS 7671:2018 was published on 15 April 2026, City & Guilds made 2382-26 the current version from 16 April 2026, and the previous version of the standard was withdrawn on 15 October 2026. Amendment 4 adds Section 716 on Power over Ethernet, a new section on functional earthing, a revised Section 710 for medical locations and changes to the EICR coding, and it includes everything from Amendments 2 and 3.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real City & Guilds questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question here is written by Tigertest from the requirements of BS 7671:2018+A4:2026 and the City & Guilds test specification, without copying past papers or sample tests. The questions describe the requirement rather than quoting regulation numbers, so practise looking each answer up in your own copy of the book, which is the skill the open-book exam really tests.
            </p>
          </div>
          <ExamClassFaq examId="uk18ed" />
        </div>
      </div>

      <ExamRelatedTests examId="uk18ed" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the 18th Edition?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every part of BS 7671.</p>
          <ExamLandingCTA dashboardHref="/18th-edition/dashboard" />
        </div>
      </div>
    </div>
  );
}
