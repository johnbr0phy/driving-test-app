import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";
const path = "/canadian-firearms-safety-course-practice-test";

const title = "Canadian Firearms Safety Course (CFSC) Practice Test 2026 - Free PAL Test";
const metaDescription =
  "Free CFSC practice for the PAL written test: 200 original questions on ACTS and PROVE, actions, ammunition, safe storage and transport, and Canadian firearms law. 80% to pass.";
const description =
  "Free practice for the written test of the Canadian Firearms Safety Course (CFSC), the course you pass before applying for a non-restricted Possession and Acquisition Licence (PAL): 200 original questions on the evolution and parts of firearms, types and actions, ammunition, the Vital Four ACTS and PROVE, safe handling and carries, firing techniques, care, the storage, display and transport regulations, and licensing and the law. Four 50-question practice tests with the 80 percent pass mark and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CFSC practice test, PAL test practice, Canadian Firearms Safety Course test, PAL exam questions, firearms safety course Canada, ACTS and PROVE, non-restricted PAL test 2026",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: "/og/capal", width: 1200, height: 630, alt: "Tigertest free Canadian Firearms Safety Course practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/capal"],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Canadian Firearms Safety Course Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 CFSC practice questions",
        "4 practice tests of 50 questions with the 80% pass mark",
        "4 training sets, one per practice test",
        "Instant feedback with explanations",
        "Free classes for firearms safety instructors",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the pass mark for the Canadian Firearms Safety Course?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need 80 percent on the written test and 80 percent on the practical handling test, and you must pass both. The written test is usually 50 questions, mostly multiple choice with some true or false, so 40 correct answers is a pass. On the practical test the instructor watches you handle and PROVE common action types, and unsafe muzzle direction or trigger finger mistakes cost marks.",
          },
        },
        {
          "@type": "Question",
          name: "What does the CFSC cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The course follows the RCMP student handbook: how firearms evolved, their major parts, types and actions, ammunition, the Vital Four ACTS and PROVE, operating actions, safe handling and carries, firing techniques, care, the storage, display and transport rules for non-restricted firearms, and the law on licences, firearm classes and owners' responsibilities. The practice tests here group those into nine categories.",
          },
        },
        {
          "@type": "Question",
          name: "Who can take the course, and what comes after it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Anyone 12 or older can take the CFSC with a provincially designated instructor. Passing it lets you apply for a Possession and Acquisition Licence at 18, or a minor's licence from 12 to 17. A PAL is valid for five years, and first-time applicants wait at least 28 days while checks are done. Course fees and schedules vary by province and instructor.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the official RCMP test, and is it up to date?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is written by Tigertest from the published course topics and the current federal law, without copying the RCMP handbook or its test. It reflects the law as of October 2026, including the 2022 handgun freeze and Bill C-21, which received Royal Assent in December 2023. Firearms rules keep changing, so check the Canadian Firearms Program for the latest before you buy, sell or travel.",
          },
        },
        {
          "@type": "Question",
          name: "Does this cover restricted firearms or hunting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. It covers the non-restricted CFSC only. Restricted firearms need the separate Canadian Restricted Firearms Safety Course, and hunting needs a provincial or territorial hunting licence, often with its own hunter education course. Where provinces differ, the questions say so rather than picking one.",
          },
        },
        classFaqJsonLd("capal"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Evolution & Parts of Firearms", weight: "10%" },
  { name: "Types & Actions", weight: "12%" },
  { name: "Ammunition", weight: "12%" },
  { name: "Basic Safety: ACTS & PROVE", weight: "16%" },
  { name: "Safe Handling & Carrying", weight: "12%" },
  { name: "Firing Techniques", weight: "8%" },
  { name: "Care of Firearms", weight: "6%" },
  { name: "Storage, Display & Transport", weight: "12%" },
  { name: "Licensing & the Law", weight: "12%" },
];

export default function CanadianFirearmsLandingPage() {
  return (
    <div data-theme="capal" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Canadian Firearms Safety Course Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/canadian-firearms/dashboard"
            shortName="CFSC"
            subtitle="200 questions for the PAL written test: ACTS and PROVE, actions, ammunition, safe handling, storage and transport rules, and Canadian firearms law, with the real 80% pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/capal-mobile.png", desktop: "/landing/capal-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="capal" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question practice tests with the same 80 percent pass mark as the course&apos;s written test, and an explanation of the right answer on every question.
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
                Built on the CFSC Course Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The RCMP lists the topics the course must teach but does not publish how many test questions each one gets. The practice tests here follow the order of the student handbook and lean on what the course leans on: the Vital Four ACTS and PROVE, safe handling, and the storage, transport and licensing rules. Every question is original and checked against the federal regulations current in October 2026.
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
                src={getTigerAsset("capal", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For instructors */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Firearms Safety Instructors</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Teach the CFSC? Make a free class at{" "}
            <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
            , share one link before or after the classroom day, and see who practised, their test scores and the topics your group misses most. It is extra practice for the written test, never a substitute for your course or the practical evaluation.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Set Up a Class
          </Link>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Pass the CFSC Written Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know ACTS and PROVE word for word</h3>
              <p>
                Assume every firearm is loaded, Control the muzzle direction, keep your Trigger finger off the trigger and out of the guard, See that it is unloaded. Then Point it safely, Remove all cartridges, Observe the chamber, Verify the feeding path and Examine the bore. Many questions, and the whole practical test, come back to these nine steps.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the storage and transport rules as a checklist</h3>
              <p>
                Stored: unloaded, plus a locking device, the bolt removed or a locked container, with ammunition not readily accessible unless it is locked up. Transported: unloaded, and in a locked trunk or out of sight in a locked vehicle when you leave it. Displayed: unloaded, locked and never next to its ammunition.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Match the carry to the people around you</h3>
              <p>
                The two-hand carry gives the best control. Trail carry is out when someone is ahead, shoulder carry when someone is behind and the cradle carry when someone is on the muzzle side. Crossing fences, climbing and getting into vehicles all start with unloading.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 45 or more out of 50 on all four practice tests so you have room above the 40 you need, then drill the questions you missed. Practise the actions with your instructor; no app replaces hands-on handling.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CFSC Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the Canadian Firearms Safety Course?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need 80 percent on the written test and 80 percent on the practical handling test, and you must pass both. The written test is usually 50 questions, mostly multiple choice with some true or false, so 40 correct answers is a pass. On the practical test the instructor watches you handle and PROVE common action types, and unsafe muzzle direction or trigger finger mistakes cost marks.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the CFSC cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The course follows the RCMP student handbook: how firearms evolved, their major parts, types and actions, ammunition, the Vital Four ACTS and PROVE, operating actions, safe handling and carries, firing techniques, care, the storage, display and transport rules for non-restricted firearms, and the law on licences, firearm classes and owners&apos; responsibilities. The practice tests here group those into nine categories.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who can take the course, and what comes after it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Anyone 12 or older can take the CFSC with a provincially designated instructor. Passing it lets you apply for a Possession and Acquisition Licence at 18, or a minor&apos;s licence from 12 to 17. A PAL is valid for five years, and first-time applicants wait at least 28 days while checks are done. Course fees and schedules vary by province and instructor.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the official RCMP test, and is it up to date?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is written by Tigertest from the published course topics and the current federal law, without copying the RCMP handbook or its test. It reflects the law as of October 2026, including the 2022 handgun freeze and Bill C-21, which received Royal Assent in December 2023. Firearms rules keep changing, so check the Canadian Firearms Program for the latest before you buy, sell or travel.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this cover restricted firearms or hunting?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. It covers the non-restricted CFSC only. Restricted firearms need the separate Canadian Restricted Firearms Safety Course, and hunting needs a provincial or territorial hunting licence, often with its own hunter education course. Where provinces differ, the questions say so rather than picking one.
            </p>
          </div>
          <ExamClassFaq examId="capal" />
        </div>
      </div>

      <ExamRelatedTests examId="capal" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your CFSC?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every course topic.</p>
          <ExamLandingCTA dashboardHref="/canadian-firearms/dashboard" />
        </div>
      </div>
    </div>
  );
}
