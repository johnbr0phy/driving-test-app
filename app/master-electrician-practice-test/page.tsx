import "@/lib/banks/masterelec";
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

const title = "Master Electrician Practice Test 2026 - Free, 2023 NEC";
const metaDescription =
  "Free master electrician practice test: 200 original 2023 NEC questions on load calculations, services, transformers, motors, wiring methods and special occupancies, with every answer explained.";
const description =
  "Practice for the master electrician license exam: 200 original questions written from the 2023 National Electrical Code, weighted like the ICC National Master Electrician outline. Four 50-question mock tests with a 75 percent pass line and five training sets covering theory and load calculations, services, feeders and branch circuits, wiring methods, equipment, motors and generators, and special occupancies.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "master electrician practice test, master electrician exam, master electrician license test, icc master electrician exam, 2023 nec practice test, electrical load calculation practice, master electrician test questions, electrical exam prep 2026",
  alternates: {
    canonical: `${siteUrl}/master-electrician-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/master-electrician-practice-test`,
    images: [{ url: shareImageUrl("masterelec"), width: 1200, height: 630, alt: "Tigertest free master electrician practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("masterelec")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Master Electrician Practice Test",
      description,
      url: `${siteUrl}/master-electrician-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("masterelec"),
      featureList: [
        "200 master electrician practice questions on the 2023 NEC",
        "4 mock tests of 50 questions with a 75 percent pass line",
        "5 training sets by NEC topic",
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
          name: "What is the master electrician exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is the written licensing exam a state or city requires before an electrician can hold a master license, which usually lets them plan and lay out installations, supervise other electricians and, in many places, pull permits or qualify an electrical contracting business. Most jurisdictions require several years of licensed journeyman experience first. The exam, experience rules and license names vary by state.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the exam and what is the passing score?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on where you test. The ICC National Master Electrician exam has 100 multiple-choice questions, is open book, allows 5 hours and needs 75 percent to pass. State exams differ: Iowa's has 100 scored questions and a 70 percent pass mark, and Texas splits its master exam into an NEC knowledge portion and a calculations portion, each needing 70 percent. Each mock test here has 50 questions and uses a 75 percent pass line.",
          },
        },
        {
          "@type": "Question",
          name: "Which edition of the NEC is on the exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The edition your licensing authority uses. The ICC National Master Electrician exam is based on the 2023 NEC, while some states have moved on: Texas master exams have been referenced to the 2026 NEC since September 1, 2026. These questions follow the 2023 NEC, so check your exam bulletin for the edition you will be tested on.",
          },
        },
        {
          "@type": "Question",
          name: "How is the master exam different from the journeyman exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It goes deeper into design. Expect more service and feeder load calculations, including the dwelling standard and optional methods, multifamily and commercial loads, plus transformer protection and secondary conductors, motor feeder sizing, larger services, ground-fault protection and special occupancies. Some states also give a separate business and law exam for contractors; that part is not covered here.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real master electrician exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from the 2023 National Electrical Code and standard electrical theory. They cover the topics the licensing exams test, but this is practice, not an official exam, and it does not cover your state's own licensing law. Tigertest is not affiliated with the ICC, PSI or any state licensing board.",
          },
        },
        classFaqJsonLd("masterelec"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Theory, Definitions & Plans", weight: "10%" },
  { name: "Service & Feeder Load Calculations", weight: "12%" },
  { name: "Services, Feeders & Transformers", weight: "12%" },
  { name: "Branch Circuits & Conductors", weight: "14%" },
  { name: "Wiring Methods & Materials", weight: "20%" },
  { name: "Equipment, Devices & Controls", weight: "12%" },
  { name: "Motors & Generators", weight: "8%" },
  { name: "Special Occupancies & Systems", weight: "12%" },
];

export default function MasterElectricianLandingPage() {
  return (
    <div data-theme="masterelec" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Master Electrician Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/master-electrician/dashboard"
            shortName="Master Electrician"
            subtitle="200 questions on the 2023 NEC, heavy on load calculations. Four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/masterelec-mobile.png", desktop: "/landing/masterelec-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="masterelec" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Code Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the master outline: theory and load calculations; services, feeders and branch circuits; wiring methods; equipment, motors and generators; and special occupancies. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions, each weighted across the whole Code and needing 75 percent to pass, the ICC master line. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the 2023 NEC
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each mock test follows the ICC National Master Electrician content outline, with its load calculations pulled into their own area because the master exam leans on them: wiring methods get the most questions, then branch circuits, services and feeders, load calculations, equipment, special occupancies, theory and motors. Electrical instructors and exam prep classes can set Tigertest as practice at{" "}
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
                src={getTigerAsset("masterelec", 3)}
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
            How to Pass the Master Electrician Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know Article 220 cold (Article 120 in the 2026 NEC)</h3>
              <p>
                Load calculations carry more weight on the master exam than anywhere else. Work the dwelling standard method, the optional method for one dwelling and for multifamily buildings, existing-dwelling additions, commercial receptacle and kitchen demand, and neutral loads until each one takes a few minutes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise transformer and tap sizing</h3>
              <p>
                Transformer primary and secondary protection, secondary conductor rules, feeder taps, parallel conductors and the grounding and bonding conductors that go with them come up together. Do them as one chain: load, current, conductor, overcurrent device, grounding electrode conductor and bonding jumper.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn where things live in the Code</h3>
              <p>
                Most answers are in the book, so speed comes from knowing the layout: Article 100 for definitions, 110 for working space and labels, 210 to 240 for circuits, services and overcurrent, 250 for grounding, 300 to 400 for wiring methods, 430 to 450 for motors, air conditioning and transformers, and Chapters 5 to 7 for special occupancies and systems.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 85 percent or more on every mock test before you sit the exam, since the ICC master pass line is 75 percent. After each test, drill the questions you missed and retrain the weakest set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Master Electrician Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the master electrician exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It is the written licensing exam a state or city requires before an electrician can hold a master license, which usually lets them plan and lay out installations, supervise other electricians and, in many places, pull permits or qualify an electrical contracting business. Most jurisdictions require several years of licensed journeyman experience first. The exam, experience rules and license names vary by state.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the exam and what is the passing score?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It depends on where you test. The ICC National Master Electrician exam has 100 multiple-choice questions, is open book, allows 5 hours and needs 75 percent to pass. State exams differ: Iowa&apos;s has 100 scored questions and a 70 percent pass mark, and Texas splits its master exam into an NEC knowledge portion and a calculations portion, each needing 70 percent. Each mock test here has 50 questions and uses a 75 percent pass line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which edition of the NEC is on the exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The edition your licensing authority uses. The ICC National Master Electrician exam is based on the 2023 NEC, while some states have moved on: Texas master exams have been referenced to the 2026 NEC since September 1, 2026. These questions follow the 2023 NEC, so check your exam bulletin for the edition you will be tested on.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is the master exam different from the journeyman exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It goes deeper into design. Expect more service and feeder load calculations, including the dwelling standard and optional methods, multifamily and commercial loads, plus transformer protection and secondary conductors, motor feeder sizing, larger services, ground-fault protection and special occupancies. Some states also give a separate business and law exam for contractors; that part is not covered here.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real master electrician exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from the 2023 National Electrical Code and standard electrical theory. They cover the topics the licensing exams test, but this is practice, not an official exam, and it does not cover your state&apos;s own licensing law. Tigertest is not affiliated with the ICC, PSI or any state licensing board.
            </p>
          </div>
          <ExamClassFaq examId="masterelec" />
        </div>
      </div>

      <ExamSampleQuestions examId="masterelec" />

      <ExamRelatedTests examId="masterelec" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Master Electrician Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across the master exam outline.</p>
          <ExamLandingCTA dashboardHref="/master-electrician/dashboard" />
        </div>
      </div>
    </div>
  );
}
