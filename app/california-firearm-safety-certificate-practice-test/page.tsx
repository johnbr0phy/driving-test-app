import "@/lib/banks/cafsc";
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

const title = "Free California FSC Practice Test 2026 - Firearm Safety Certificate Questions";
const metaDescription =
  "Free California Firearm Safety Certificate practice: 200 original questions from the DOJ study guide, six 30-question tests like the real FSC test, every answer explained.";
const description =
  "Free practice for the California Firearm Safety Certificate (FSC) test: 200 original questions written from the California Department of Justice Firearm Safety Certificate Study Guide and the Penal Code sections it summarizes. Six 30-question practice tests like the real test and four training sets covering the safety rules and children, firearm operation and ammunition, ownership, storage and buying laws, and carrying, self-defense and prohibited acts.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "california fsc practice test, firearm safety certificate test, fsc test california, california firearm safety certificate, ca fsc practice questions, california gun test, fsc study guide, california fsc 2026",
  alternates: {
    canonical: `${siteUrl}/california-firearm-safety-certificate-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/california-firearm-safety-certificate-practice-test`,
    images: [{ url: shareImageUrl("cafsc"), width: 1200, height: 630, alt: "Tigertest free California FSC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cafsc")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the California Firearm Safety Certificate?",
    a: "The Firearm Safety Certificate (FSC) is what California requires before you can buy or receive any firearm except an antique (Penal Code 31615), unless you are exempt. A dealer or seller may not transfer a firearm to someone without one. You get it by passing a written test on firearm safety and California firearms law from the Department of Justice. It is not needed just to keep a firearm you already own.",
  },
  {
    q: "How many questions are on the FSC test and what is the passing score?",
    a: "The DOJ test has 30 true/false and multiple choice questions, and you pass with 75%, which is 23 correct. Each practice test here has 30 questions with the same pass line of 23. Tigertest's questions all have four options, while the real test also uses true/false items.",
  },
  {
    q: "Where do I take the FSC test, and what if I fail?",
    a: "The test is given by DOJ Certified Instructors, generally at licensed firearms dealers. You must be at least 18 and bring a California driver license or DMV identification card. If you fail, you can take another version of the test from the same instructor after 24 hours at no extra charge. The certificate is valid for five years.",
  },
  {
    q: "What does the FSC test cover?",
    a: "Everything on the test is in the DOJ Firearm Safety Certificate Study Guide: the six basic safety rules, firearms and children, how revolvers, semiautomatic pistols and long guns work, ammunition and malfunctions, cleaning and safe storage, and the laws on buying, transferring, carrying and storing firearms, self-defense and prohibited persons. The guide says the safe handling demonstration steps are not on the written test, though you perform that demonstration before taking delivery of a firearm.",
  },
  {
    q: "Are these the real FSC test questions?",
    a: "No. Every question here is original, written by Tigertest from the DOJ study guide (2025 edition) and the Penal Code sections it cites. The first two training sets and practice tests 1 to 3 are free; Premium adds training sets 3 and 4, practice tests 4 to 6 and full stats. Tigertest is not affiliated with the California Department of Justice, and this is not legal advice: check current law with the DOJ before you buy, carry or store a firearm.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free California FSC Practice Test",
      description,
      url: `${siteUrl}/california-firearm-safety-certificate-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cafsc"),
      featureList: [
        "200 California FSC practice questions",
        "6 practice tests of 30 questions like the real test",
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
  { name: "Buying and transfer laws", weight: "5 of 30" },
  { name: "Firearm safety rules", weight: "4 of 30" },
  { name: "Firearm operation", weight: "4 of 30" },
  { name: "Ammunition, range and malfunctions", weight: "4 of 30" },
  { name: "Ownership, cleaning and storage", weight: "4 of 30" },
  { name: "Carrying, transport and self-defense", weight: "4 of 30" },
  { name: "Firearms and children", weight: "3 of 30" },
  { name: "Prohibited acts and persons", weight: "2 of 30" },
];

export default function CaliforniaFscLandingPage() {
  return (
    <div data-theme="cafsc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free California FSC Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/california-fsc/dashboard"
            shortName="California FSC"
            subtitle="200 questions from the DOJ study guide and six 30-question tests like the real FSC test. Free to start, no account needed."
            shots={{ mobile: "/landing/cafsc-mobile.png", desktop: "/landing/cafsc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cafsc" />

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
                Four training sets: safety rules and children, firearm operation and ammunition, ownership, storage and buying laws, and carrying and prohibited acts. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six practice tests of 30 questions, like the real FSC test, with the same pass line of 23 correct. No question appears in more than one test, and every answer is explained.
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
                Built on the DOJ Study Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The DOJ says everything on the test is in its Firearm Safety Certificate Study Guide but publishes no topic weights. Each practice test here spreads its 30 questions over the guide&apos;s chapters like this.
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
                src={getTigerAsset("cafsc", 3)}
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
            How to Study for the FSC Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the six safety rules word for word</h3>
              <p>
                Treat every firearm as loaded, point it in the safest direction, keep your finger off the trigger, know your target and beyond, know how your firearm works, and store it securely with ammunition apart. Many questions are these rules in a new situation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read the study guide once, all the way through</h3>
              <p>
                The DOJ says the information needed to pass is in its Firearm Safety Certificate Study Guide, free on oag.ca.gov. Read it before you practise, then come back to the chapters behind the questions you miss.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the storage and children rules cold</h3>
              <p>
                Learn the Rules for Kids (stop, don&apos;t touch, leave the area, tell an adult), the three degrees of criminal storage, and the secure storage rule for homes that took effect on January 1, 2026.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Learn the buying rules as a sequence</h3>
              <p>
                FSC, Dealer&apos;s Record of Sale, a 10-day wait with a background check, then a safe handling demonstration before delivery. Then learn the exceptions: parent and child or grandparent and grandchild transfers, pawn returns and the hunting license exemption for long guns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          California FSC Frequently Asked Questions
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

      <ExamSampleQuestions examId="cafsc" />

      <ExamRelatedTests examId="cafsc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your FSC Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every chapter of the DOJ study guide.</p>
          <ExamLandingCTA dashboardHref="/california-fsc/dashboard" />
        </div>
      </div>
    </div>
  );
}
