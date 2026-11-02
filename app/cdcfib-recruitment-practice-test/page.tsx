import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/cdcfib";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "CDCFIB Recruitment Practice Test 2026 - Free CBT Questions";
const metaDescription =
  "Free CDCFIB recruitment CBT practice for Civil Defence, Correctional, Fire and Immigration: 200 original questions, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the CDCFIB recruitment computer-based test for the Nigeria Security and Civil Defence Corps, the Nigerian Correctional Service, the Federal Fire Service and the Nigeria Immigration Service: 200 original questions on the four services, fire safety and first aid, Nigerian geography and environment, English grammar and vocabulary, numerical ability and logical reasoning. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cdcfib recruitment cbt, cdcfib past questions, cdcfib practice test, civil defence recruitment test, nscdc aptitude test, immigration recruitment cbt, nis recruitment exam, correctional service recruitment test, federal fire service recruitment exam, cdcfib online test 2026",
  alternates: {
    canonical: `${siteUrl}/cdcfib-recruitment-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cdcfib-recruitment-practice-test`,
    images: [{ url: shareImageUrl("cdcfib"), width: 1200, height: 630, alt: "Tigertest free CDCFIB recruitment practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cdcfib")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the CDCFIB recruitment CBT?",
    a: "It is a general aptitude test for applicants to the Nigeria Security and Civil Defence Corps, the Nigerian Correctional Service, the Federal Fire Service and the Nigeria Immigration Service. Guides and past candidates describe multiple-choice questions on English, mathematics, logical reasoning, general knowledge and current affairs, and the four services themselves. The Board does not publish a syllabus, so Tigertest covers that common core: the four services and the Board, fire safety and first aid, Nigerian geography and environment, English grammar and vocabulary, numerical ability and reasoning.",
  },
  {
    q: "How many questions are there and what is the pass mark?",
    a: "The Board has not published a question count, time limit or pass mark. For the 2025 online test, guides reported 100 questions in 60 or 90 minutes, while some candidates said their test had 40 questions. Tigertest's mock tests are 50 questions each with a 70% target, so scoring well on all four leaves a margin whatever the length of your test.",
  },
  {
    q: "Which services does the CDCFIB recruit for?",
    a: "The Civil Defence, Correctional, Fire and Immigration Services Board recruits, promotes and disciplines officers of four paramilitary services under the Federal Ministry of Interior: the Nigeria Security and Civil Defence Corps (NSCDC), the Nigerian Correctional Service (NCoS), the Federal Fire Service (FFS) and the Nigeria Immigration Service (NIS). You apply through the Board's recruitment portal when an exercise is open, not to each service separately.",
  },
  {
    q: "How does the online CBT work?",
    a: "In the 2025 exercise the test was taken online at a scheduled slot, on a laptop, desktop or smartphone with a working camera and microphone. The portal opened 30 minutes before each slot, candidates passed a photo check, and the test was watched by AI and live proctoring: leaving the screen, switching apps or taking calls was flagged, and repeated violations meant automatic failure. Successful candidates moved on to physical screening, document checks and a medical. Check the Board's instructions for your exercise, as the rules can change.",
  },
  {
    q: "Are these the real CDCFIB questions?",
    a: "No. Every question is original, written by Tigertest to cover the same kind of English, maths, reasoning and general knowledge, so it is not a past paper and does not copy any official question. Tigertest is free practice, not affiliated with the Civil Defence, Correctional, Fire and Immigration Services Board or any of the four services, and it does not register, shortlist or schedule anyone. Apply only through the Board's official portal, and never pay anyone who promises a place.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CDCFIB Recruitment Practice Test",
      description,
      url: `${siteUrl}/cdcfib-recruitment-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      featureList: [
        "200 original CDCFIB-style questions",
        "4 mock tests of 50 questions",
        "5 training sets by topic",
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
  { name: "Numerical Ability", weight: "18%" },
  { name: "The Four Services & the Board", weight: "16%" },
  { name: "English Grammar & Usage", weight: "12%" },
  { name: "Nigerian Geography", weight: "12%" },
  { name: "Logical Reasoning", weight: "12%" },
  { name: "Fire Safety, First Aid & Emergencies", weight: "10%" },
  { name: "Environment & Disasters", weight: "10%" },
  { name: "English Vocabulary", weight: "10%" },
];

export default function CdcfibLandingPage() {
  return (
    <div data-theme="cdcfib" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CDCFIB Recruitment Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cdcfib-recruitment/dashboard"
            shortName="CDCFIB test"
            subtitle="200 original questions for the Civil Defence, Correctional, Fire and Immigration recruitment CBT: the four services, fire safety, Nigerian geography, English, maths and reasoning. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cdcfib-mobile.png", desktop: "/landing/cdcfib-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cdcfib" />

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
                Five training sets cover the four services and fire safety, Nigerian geography and environment, English, numerical ability and logical reasoning. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that together cover all 200 questions, with a 70% target. No question repeats across tests, and every answer explains the working or the fact behind it.
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
                Built on the Aptitude Test Core
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Board publishes no syllabus or topic split, so these weights are Tigertest&apos;s own. Just over half of each test is the general aptitude core that guides and past candidates describe: English, numerical ability and logical reasoning. The rest is general knowledge for these services: what the NSCDC, the Correctional Service, the Fire Service and the Immigration Service do, basic fire safety and first aid, and Nigeria&apos;s geography and environment. There are no current affairs questions, which go out of date within months.
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
                src={getTigerAsset("cdcfib", 1)}
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
            How to Pass the CDCFIB Recruitment Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the four services</h3>
              <p>
                Learn what each one does and the law behind it: the NSCDC guards critical infrastructure and licenses private guard companies, the Correctional Service runs custodial centres and non-custodial measures, the Fire Service fights fires and enforces fire safety, and the Immigration Service issues passports and controls the borders.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise maths without a calculator</h3>
              <p>
                Percentages, ratio, simple interest, speed and time, averages and areas come up again and again. Write down the working, check that the answer makes sense (more workers should take fewer days), and watch for the trap of dividing by the wrong price.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the English questions twice</h3>
              <p>
                Concord, tenses, prepositions and spelling decide most grammar questions. Find the real subject of the sentence before choosing the verb, and say the sentence in your head with your chosen word in place.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Rehearse the online test</h3>
              <p>
                Take all four mock tests on the device you will use, with the phone on silent and nothing else open, since switching apps can be flagged as a violation. Aim for 40 or more out of 50, then retrain your weakest set before test day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CDCFIB Recruitment Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="cdcfib" />

      <ExamRelatedTests examId="cdcfib" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the CDCFIB Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions for the Civil Defence, Correctional, Fire and Immigration recruitment CBT.</p>
          <ExamLandingCTA dashboardHref="/cdcfib-recruitment/dashboard" />
        </div>
      </div>
    </div>
  );
}
