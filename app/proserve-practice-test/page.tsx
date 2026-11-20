import "@/lib/banks/proserve";
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

const title = "ProServe Practice Test 2026 - Free AGLC Liquor Staff Training Questions";
const metaDescription =
  "Free ProServe practice test for Alberta: 200 original questions on the Gaming, Liquor and Cannabis Act and AGLC policy: minors and ID, signs of intoxication, refusing service, standard drinks and safety. Four 50-question tests, every answer explained.";
const description =
  "Free practice for AGLC's ProServe Liquor Staff Training exam, required for anyone who sells, serves or secures liquor in Alberta licensed premises: 200 original multiple-choice questions written from AGLC's Liquor Licensee Handbook, the Gaming, Liquor and Cannabis Act, AHS's Alcohol and the Body and Health Canada's standard drink. Four 50-question practice tests and four training sets covering liquor law and licensed premises; alcohol and standard drinks; minors, ID and intoxication; and safety and illegal activity.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "proserve practice test, proserve test, proserve exam, aglc proserve, proserve alberta, alberta liquor staff training, alberta bartender certification, proserve answers, proserve questions 2026",
  alternates: {
    canonical: `${siteUrl}/proserve-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/proserve-practice-test`,
    images: [{ url: shareImageUrl("proserve"), width: 1200, height: 630, alt: "Tigertest free ProServe practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("proserve")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Who needs ProServe in Alberta?",
    a: "AGLC requires ProServe for full- and part-time workers where liquor is provided under a Class A, B, D, E, F or Duty-Free licence: owners who manage the premises, managers, supervisors, retailers, bartenders, servers, greeters, hosts, delivery drivers and security staff, plus listed roles at public special events and liquor agency sampling staff. Kitchen staff, bus persons and cleaners do not need it.",
  },
  {
    q: "What score do I need to pass the ProServe exam?",
    a: "AGLC says the ProServe exam needs a minimum score of 80% to pass, and each registration comes with five exam attempts. The course is offered in English. AGLC sets the rest of the exam format, so the practice tests here use 50 questions with the same 80% line.",
  },
  {
    q: "How soon do I need to be certified?",
    a: "New hires in ProServe positions must be certified within 30 days of their employment start date, and staff at public resale special events must be certified before the event. At least one ProServe-certified staff member must be on shift at all times, and staff must show proof to an AGLC Inspector when asked.",
  },
  {
    q: "What does the ProServe course cover?",
    a: "AGLC lists your duty of care to guests, your legal responsibilities when serving or selling liquor, how alcohol affects the body and behaviour, how to tell when someone appears intoxicated, working as a team, refusing service to minors and people who appear intoxicated, and illegal activities on licensed premises.",
  },
  {
    q: "Are these real ProServe exam questions?",
    a: "No. Every question is original, written by Tigertest from AGLC's Liquor Licensee Handbook and minors guide, Alberta's Gaming, Liquor and Cannabis Act, Alberta Health Services and Health Canada. It is practice, not affiliated with AGLC, and it does not replace the ProServe course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ProServe Practice Test",
      description,
      url: `${siteUrl}/proserve-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("proserve"),
      featureList: [
        "200 ProServe practice questions",
        "4 practice tests of 50 questions",
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
  { name: "Alberta liquor law and ProServe", weight: "12%" },
  { name: "Licensed premises and hours", weight: "14%" },
  { name: "Alcohol and the body", weight: "12%" },
  { name: "Standard drinks and service rules", weight: "14%" },
  { name: "Minors and checking ID", weight: "16%" },
  { name: "Intoxication and refusing service", weight: "14%" },
  { name: "Safety, drugs and duty of care", weight: "18%" },
];

export default function ProServeLandingPage() {
  return (
    <div data-theme="proserve" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ProServe Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/proserve/dashboard"
            shortName="ProServe"
            subtitle="200 ProServe questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/proserve-mobile.png", desktop: "/landing/proserve-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="proserve" />

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
                Four training sets: liquor law and licensed premises; alcohol and standard drinks; minors, ID and intoxication; and safety and illegal activity. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions that mix every topic, with the same 80% pass line AGLC uses. No question appears in more than one test, and every explanation names the policy or section behind the answer.
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
                Built on AGLC Policy and Alberta Law
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AGLC&apos;s Liquor Licensee Handbook sets the Board policies licensees and staff follow, and the Gaming, Liquor and Cannabis Act sets the offences: serving a minor, serving someone apparently intoxicated, adulterating drinks. AGLC publishes no topic weights for the ProServe exam, so each practice test spreads its 50 questions as below.
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
                src={getTigerAsset("proserve", 3)}
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
            How to Pass Your ProServe Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn Alberta&apos;s numbers</h3>
              <p>
                Minors are under 18, ID is checked for anyone who appears under 25, service ends by 2 a.m. with an hour to finish drinks, and after 1 a.m. no patron may have more than two standard servings. These figures come straight from the Act and AGLC policy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know what valid ID looks like</h3>
              <p>
                Primary ID has a photo, a name, a date of birth and a unique number, is government issued, current and original. Know when to ask for a second piece and how a paper temporary licence works with an expired card.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise the edges of refusing service</h3>
              <p>
                Refuse liquor to anyone apparently intoxicated by liquor or a drug, but food and coffee are still fine. Offer a taxi to someone who drove; call police only when they get into a car. Most wrong answers are the right move at the wrong time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Know who reports what</h3>
              <p>
                Staff report suspected drug activity to management and the licensee reports it to police; smuggled or stolen liquor goes to AGLC. Aim for 80% or better on every practice test here before your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ProServe Frequently Asked Questions
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

      <ExamSampleQuestions examId="proserve" />

      <ExamRelatedTests examId="proserve" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your ProServe Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on Alberta liquor law, minors, intoxication and safety.</p>
          <ExamLandingCTA dashboardHref="/proserve/dashboard" />
        </div>
      </div>
    </div>
  );
}
