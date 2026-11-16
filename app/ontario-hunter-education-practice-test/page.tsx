import "@/lib/banks/cahunteron";
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
const path = "/ontario-hunter-education-practice-test";

const title = "Ontario Hunter Education Practice Test 2026 - Free Hunting Exam Questions";
const metaDescription =
  "Free-to-start practice for the Ontario Hunter Education Course exam: 200 original questions on Ontario hunting law, the Outdoors Card, tags, hunter orange, firearm and bow rules, wildlife and field care.";
const description =
  "Practice for the exam of the Ontario Hunter Education Course, which most residents pass before they can buy Ontario hunting licences and tags: 200 original questions on licences, the Outdoors Card and the apprentice program, tags, party hunting and hunter reporting, hunting hours, hunter orange and prohibited methods, firearm and archery rules, land access and conservation officers, hunter ethics, wildlife identification and management, and field care. Four 50-question practice tests and an explanation on every question, written from the Fish and Wildlife Conservation Act, 1997, the Hunting regulation and the ministry's Hunting Regulations Summary.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Ontario hunter education practice test, Ontario hunting exam questions, Ontario hunter safety test, OHEP exam, Ontario hunting licence test, Outdoors Card hunter accreditation, Ontario hunting regulations quiz 2026",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("cahunteron"), width: 1200, height: 630, alt: "Tigertest Ontario Hunter Education practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cahunteron")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Ontario Hunter Education Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cahunteron", "CAD"),
      featureList: [
        "200 Ontario hunter education practice questions",
        "4 practice tests of 50 questions",
        "4 training sets by topic",
        "Instant feedback with explanations",
        "Free classes for hunter education instructors",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is on the Ontario Hunter Education Course exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ontario lists six topic areas for the course: hunting safety and equipment, hunting laws and regulations, hunter responsibilities, wildlife management, hunting techniques and wildlife identification. The practice tests here cover those in eight categories, with most weight on the rules hunters live by: the Outdoors Card and licences, tags and party hunting, hunting hours, hunter orange, firearm and bow requirements and land access.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the exam, and what is the pass mark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The ministry does not publish the question count, time limit or pass mark for the exam, so ask your instructor or online course provider. Tigertest's practice tests have 50 questions each and use 80 percent as a readiness target. Aim to score above that on all four before you sit the real exam.",
          },
        },
        {
          "@type": "Question",
          name: "Who needs to take the Ontario Hunter Education Course?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most Ontario residents must pass it, including its exam, to buy hunting licences and tags and to join the Hunter Apprenticeship Safety Program for 12 to 14 year olds. New residents who have lived in Ontario for at least six months and hold recognized hunter education from their home jurisdiction, and some non-residents with recognized credentials, are exempt. You take it in person with a certified instructor or online, then register your accreditation at a participating ServiceOntario location, or online through the new licensing system from December 10, 2026.",
          },
        },
        {
          "@type": "Question",
          name: "Do I also need the Canadian Firearms Safety Course?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Only to hunt with a gun. Passing the Ontario Hunter Education Course and buying the right licences lets you hunt with a bow. To hunt with a gun you must also carry a possession and acquisition licence, a minor's licence or proof of passing the Canadian Firearms Safety Course. Many instructors teach the two courses together, but each can be taken on its own.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the official exam, and is it up to date?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Tigertest is not affiliated with the Ontario Ministry of Natural Resources or the Ontario Hunter Education Program. Every question is original, written from the Fish and Wildlife Conservation Act, 1997, the Hunting regulation as consolidated in 2026 and the ministry's 2026 Hunting Regulations Summary, without copying the course manual or its exam. Changes to tags and apprentices take effect on January 1, 2027, so check the current summary before you hunt.",
          },
        },
        classFaqJsonLd("cahunteron"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Licences, Outdoors Card & Apprentices", weight: "12%" },
  { name: "Tags, Party Hunting & Reporting", weight: "12%" },
  { name: "Hunting Hours, Hunter Orange & Methods", weight: "16%" },
  { name: "Firearms & Archery Rules", weight: "14%" },
  { name: "Land Access & Conservation Officers", weight: "10%" },
  { name: "Hunter Ethics & Responsibilities", weight: "10%" },
  { name: "Wildlife Identification & Management", weight: "16%" },
  { name: "Field Care, Health & Outdoor Safety", weight: "10%" },
];

export default function OntarioHunterLandingPage() {
  return (
    <div data-theme="cahunteron" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Ontario Hunter Education Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ontario-hunter/dashboard"
            shortName="Ontario Hunter Ed"
            subtitle="200 questions for the Ontario Hunter Education Course exam: the Outdoors Card, tags, hunter orange, firearm and bow rules, land access, ethics, wildlife and field care, written from Ontario's hunting law. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/cahunteron-mobile.png", desktop: "/landing/cahunteron-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cahunteron" />

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
                Four training sets by topic, from Licences, Tags &amp; Reporting to Wildlife, Management &amp; Field Care. Master a topic, then take a test. Questions you miss come back until you have mastered them.
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
                Four 50-question practice tests with Tigertest&apos;s 80 percent readiness target, and an explanation of the right answer on every question, citing the Act or regulation it comes from.
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
                Built on Ontario&apos;s Hunting Law
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Ontario lists the course&apos;s six topic areas but does not publish how many exam questions each one gets. The practice tests here lean on the rules you hunt by: the Fish and Wildlife Conservation Act, 1997, the Hunting regulation (O. Reg. 665/98) and the ministry&apos;s 2026 Hunting Regulations Summary, plus its guidance on wildlife, disease and field care. Season dates, bag limits and fees change every year, so they are left out.
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
                src={getTigerAsset("cahunteron", 1)}
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Hunter Education Instructors</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Teach the Ontario Hunter Education Course? Make a free class at{" "}
            <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
            , share one link before or after the course, and see who practised, their test scores and the topics your group misses most. It is extra practice, never a substitute for your course or its exam.
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
            How to Pass the Ontario Hunter Education Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers the law sets</h3>
              <p>
                Half an hour before sunrise to half an hour after sunset. 400 square inches of hunter orange above the waist, plus a head cover. Three shells in a shotgun. 8 metres from the travelled road in most of southern Ontario. Within 5 km of the tag holder, with reliable contact, in a hunting party. 7.5 cm antlers for an antlered deer. These come up again and again.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know what to carry and when to notch</h3>
              <p>
                Your Outdoors Card, your licence summary, your tag unless you party hunt on someone else&apos;s, and, with a gun, your firearms proof. Notch the tag immediately after the kill, at the site, before moving the animal, and keep the identifying parts with the carcass until it is being prepared for long-term storage.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the gear rules by species</h3>
              <p>
                Big game needs a centre-fire rifle, a shotgun of 20 gauge or larger with SG or bigger shot, a muzzle-loader or a bow of the right draw weight. Turkey is shotgun with shot 4 to 7, or a bow, and never a rifle. Air and pellet guns are for small game only.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 45 or more out of 50 on all four practice tests, then drill the questions you missed. Read the current Hunting Regulations Summary for your wildlife management unit before every season.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Ontario Hunter Education Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the Ontario Hunter Education Course exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ontario lists six topic areas for the course: hunting safety and equipment, hunting laws and regulations, hunter responsibilities, wildlife management, hunting techniques and wildlife identification. The practice tests here cover those in eight categories, with most weight on the rules hunters live by: the Outdoors Card and licences, tags and party hunting, hunting hours, hunter orange, firearm and bow requirements and land access.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the exam, and what is the pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The ministry does not publish the question count, time limit or pass mark for the exam, so ask your instructor or online course provider. Tigertest&apos;s practice tests have 50 questions each and use 80 percent as a readiness target. Aim to score above that on all four before you sit the real exam.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Who needs to take the Ontario Hunter Education Course?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Most Ontario residents must pass it, including its exam, to buy hunting licences and tags and to join the Hunter Apprenticeship Safety Program for 12 to 14 year olds. New residents who have lived in Ontario for at least six months and hold recognized hunter education from their home jurisdiction, and some non-residents with recognized credentials, are exempt. You take it in person with a certified instructor or online, then register your accreditation at a participating ServiceOntario location, or online through the new licensing system from December 10, 2026.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do I also need the Canadian Firearms Safety Course?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Only to hunt with a gun. Passing the Ontario Hunter Education Course and buying the right licences lets you hunt with a bow. To hunt with a gun you must also carry a possession and acquisition licence, a minor&apos;s licence or proof of passing the Canadian Firearms Safety Course. Many instructors teach the two courses together, but each can be taken on its own.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the official exam, and is it up to date?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Tigertest is not affiliated with the Ontario Ministry of Natural Resources or the Ontario Hunter Education Program. Every question is original, written from the Fish and Wildlife Conservation Act, 1997, the Hunting regulation as consolidated in 2026 and the ministry&apos;s 2026 Hunting Regulations Summary, without copying the course manual or its exam. Changes to tags and apprentices take effect on January 1, 2027, so check the current summary before you hunt.
            </p>
          </div>
          <ExamClassFaq examId="cahunteron" />
        </div>
      </div>

      <ExamSampleQuestions examId="cahunteron" />

      <ExamRelatedTests examId="cahunteron" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Ontario Hunter Education Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every course topic.</p>
          <ExamLandingCTA dashboardHref="/ontario-hunter/dashboard" />
        </div>
      </div>
    </div>
  );
}
