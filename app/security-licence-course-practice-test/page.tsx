import "@/lib/banks/ausecurity";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
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

const title = "Security Licence Course Practice Test 2026 - Free CPP20218 Questions";
const metaDescription =
  "Free practice test for the Australian security licence course (CPP20218 Certificate II in Security Operations): 200 original questions on arrest and use of force, trespass, evidence, WHS, counter-terrorism, patrols, screening and crowd control. Four 50-question tests, every answer explained.";
const description =
  "Practice for the Australian security licence course, CPP20218 Certificate II in Security Operations, a national qualification that aligns with the unarmed guard and crowd controller licences that each state and territory issues: 200 original multiple-choice questions written from the 14 core units, the citizen's arrest and use of force provisions of the Victorian Crimes Act 1958 and the Queensland Criminal Code, and the Australian Government's crowded places guidelines. Four 50-question practice tests and four training sets: the law, arrest and use of force; communication, WHS and risk; counter-terrorism, patrols and escorts; and screening, crowds and removals.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "security licence practice test, security licence nsw, security licence course, cpp20218 practice test, certificate ii in security operations, crowd controller licence, security guard licence australia, security officer test, security licence victoria, security licence qld",
  alternates: {
    canonical: `${siteUrl}/security-licence-course-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/security-licence-course-practice-test`,
    images: [{ url: shareImageUrl("ausecurity"), width: 1200, height: 630, alt: "Tigertest security licence course practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ausecurity")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What course do I need for a security licence in Australia?",
    a: "The national qualification for this work is CPP20218 Certificate II in Security Operations, which training.gov.au says aligns with unarmed guard and crowd controller licences. It has 14 core units, from communication and the law to screening, crowd control, removing people from premises and first aid (HLTAID011). It is the current release on training.gov.au. Each state and territory licenses its own security workers and decides which units, extra training and checks each licence class needs, so check with your state's regulator before you enrol.",
  },
  {
    q: "Is there a pass mark for the security licence course?",
    a: "No single national exam exists. Each unit is assessed by your registered training organisation (RTO) with its own written questions, scenarios and practical tasks, and the result is competent or not yet competent. No question count or pass mark is published, so the 80% on these practice tests is Tigertest's own target.",
  },
  {
    q: "Are these questions based on NSW law?",
    a: "No. The NSW legislation and police licensing websites could not be read when these questions were written, so no question states a NSW-only rule. The bank covers the national units and the principles that state laws share, with arrest and force rules shown from the Victorian Crimes Act 1958 and the Queensland Criminal Code. Licence classes, fees, who may carry restraints and other details vary by state, and your RTO will teach your own state's laws.",
  },
  {
    q: "What powers of arrest does a security officer have?",
    a: "The same as any other person. A licence gives no police powers. In Victoria (Crimes Act 1958, s 458) and Queensland (Criminal Code, s 546) any person may arrest someone found committing an offence, use only force that is reasonably necessary and proportionate, and must hand the person to police straight away. Detaining someone without lawful authority can be false imprisonment.",
  },
  {
    q: "Are these real security licence course questions?",
    a: "No. Every question is original, written by Tigertest from the CPP20218 units of competency, the legislation and the Australian Government's crowded places guidelines. No RTO's assessment, police question set or past paper was used. Tigertest is not affiliated with any police force, licensing body or training provider, and it does not replace an accredited course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Security Licence Course Practice Test",
      description,
      url: `${siteUrl}/security-licence-course-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ausecurity", "AUD"),
      featureList: [
        "200 security licence practice questions",
        "4 practice tests of 50 questions",
        "4 training sets by CPP20218 unit",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("ausecurity"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Law, evidence and licensing", weight: "14%" },
  { name: "Arrest, force and trespass", weight: "16%" },
  { name: "Communication and client service", weight: "12%" },
  { name: "WHS, emergencies and risk", weight: "12%" },
  { name: "Counter-terrorism and crowded places", weight: "12%" },
  { name: "Patrols, alarms and escorts", weight: "12%" },
  { name: "Screening and access control", weight: "12%" },
  { name: "Crowds, intoxication and removals", weight: "10%" },
];

export default function AuSecurityLandingPage() {
  return (
    <div data-theme="ausecurity" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Security Licence Course Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/au-security-licence/dashboard"
            shortName="Security Licence (AU)"
            subtitle="200 CPP20218 questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/ausecurity-mobile.png", desktop: "/landing/ausecurity-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ausecurity" />

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
                Four training sets that follow the CPP20218 units: the law, arrest and use of force; communication, WHS and risk; counter-terrorism, patrols and escorts; and screening, crowds and removals. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions that mix every unit, with an 80% target. No question appears in more than one test, and every explanation names the law, guideline or principle behind the answer.
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
                Built on the CPP20218 Units
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The questions follow the knowledge each of the 13 security units asks for, from legal and procedural requirements to removing persons from premises. There are no official topic weights, so each practice test spreads its 50 questions as below. First aid (HLTAID011) has its own Tigertest test.
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
                src={getTigerAsset("ausecurity", 3)}
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
            How to Pass Your Security Licence Course
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the limits of your powers</h3>
              <p>
                A security licence adds no police powers. Learn when any person may arrest, why force must be reasonably necessary and proportionate, why the person goes to police straight away, and how a patron becomes a trespasser.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Write notes a court will accept</h3>
              <p>
                Assessors look for factual, contemporaneous notes: what you saw and heard, not opinion or hearsay, with exhibits handled so continuity is never broken.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the crowded places guidance</h3>
              <p>
                Escape, Hide, Tell; the HOT principle for unattended items; the 25, 100 and 500 metre distances; the signs of a chemical attack; and the five threat levels come up again and again across the units.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Put safety first in every scenario</h3>
              <p>
                Positional asphyxia, intoxicated patrons and removing people from premises are where things go wrong. Practise the safe choice until it is automatic, and aim for 80% or better on every practice test here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Security Licence Course Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ausecurity" />
        </div>
      </div>

      <ExamSampleQuestions examId="ausecurity" />

      <ExamRelatedTests examId="ausecurity" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Security Licence Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on the law, use of force, counter-terrorism, patrols, screening and crowd control.</p>
          <ExamLandingCTA dashboardHref="/au-security-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
