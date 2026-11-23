import "@/lib/v2/banks/emr";
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
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free EMR Practice Test 2026 - NREMT Emergency Medical Responder Exam Prep";
const metaDescription =
  "Free NREMT Emergency Medical Responder practice tests: 200 questions on the 2025 EMR exam specifications, with build-list and options-table items and EMR scope of practice.";
const description =
  "Free NREMT EMR practice tests with 200 questions weighted to the Emergency Medical Responder examination specifications: scene size-up and safety, primary assessment, secondary assessment, patient treatment and transport, and operations.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "EMR practice test, emergency medical responder practice test, NREMT EMR exam, EMR exam questions, EMR test prep 2026, free EMR practice questions, medical first responder exam",
  alternates: {
    canonical: `${siteUrl}/emr-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/emr-practice-test`,
    images: [{ url: shareImageUrl("emr"), width: 1200, height: 630, alt: "Tigertest free EMR practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("emr")],
    title,
    description: metaDescription,
  },
};

const FAQ = [
  {
    q: "How many questions are on the NREMT EMR exam?",
    a: "The EMR certification exam is computer adaptive: you answer at least 90 and at most 110 questions in 1 hour 45 minutes, and 30 of them are unscored pilot items. It ends once the computer is 95 percent sure whether you are above or below the passing standard, or when you reach the maximum or the time limit. You take it at a Pearson VUE center or online with OnVUE.",
  },
  {
    q: "What is on the NREMT EMR exam?",
    a: "Five domains from the 2023 BLS Practice Analysis, used since April 7, 2025: Scene Size-up and Safety 19 to 23 percent, Primary Assessment 37 to 41 percent, Secondary Assessment 4 to 8 percent, Patient Treatment and Transport 20 to 24 percent, and Operations 10 to 14 percent. Pediatric patients appear throughout rather than as a separate section.",
  },
  {
    q: "What kinds of questions does the EMR exam use?",
    a: "Multiple choice with four options, multiple response (two or three of five or six), build list (put steps in order), drag and drop, and options tables (classify each row). Every item is all or nothing. The practice tests and drills here include multiple response, build list and options-table items alongside single answer.",
  },
  {
    q: "What score do I need to pass the EMR exam?",
    a: "The National Registry reports a score on a scale from 100 to 1500, and 950 is the passing point; it is not a percentage. Scores here are percent correct on practice items, so use them to find weak domains rather than as a prediction. You have three attempts, at least 15 days apart, and after three you must take a new EMR course.",
  },
  {
    q: "Is the Tigertest EMR practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the scene size-up, airway and breathing, and circulation drills are free; the secondary assessment, treatment and transport, and operations drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free EMR Practice Tests",
      description,
      url: `${siteUrl}/emr-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("emr"),
      featureList: [
        "200 Emergency Medical Responder practice questions",
        "2 full 60-question practice tests in 70 minutes, answered in order like the NREMT",
        "6 drills across the five NREMT EMR domains",
        "Build-list, options-table and select-two or select-three items alongside single answer",
        "Questions kept inside the EMR column of the national scope of practice",
        "Instant feedback with explanations",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        classFaqJsonLd("emr"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Scene Size-up & Safety", weight: "19-23%" },
  { name: "Primary Assessment", weight: "37-41%" },
  { name: "Secondary Assessment", weight: "4-8%" },
  { name: "Patient Treatment & Transport", weight: "20-24%" },
  { name: "Operations", weight: "10-14%" },
];

export default function EmrLandingPage() {
  return (
    <div data-theme="emr" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free EMR Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/emr/dashboard"
            shortName="EMR"
            subtitle="200 Emergency Medical Responder questions weighted to the NREMT EMR exam specifications. Free to start, no account needed."
            shots={{ mobile: "/landing/emr-mobile.png", desktop: "/landing/emr-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="emr" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six drills across the five NREMT EMR domains, with Primary Assessment, the biggest, split into airway and breathing and circulation and priorities. Questions you miss come back until you have mastered them.
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
                Two 60-question tests in 70 minutes, the real exam&apos;s pace, answered in order with no going back. The real exam is adaptive; these are fixed forms at the same weighting. Practice Test 2 is held out of the drills, so it shows what you know rather than what you remember.
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
                Built on the NREMT EMR Examination Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Since April 7, 2025 the National Registry builds the EMR exam from its 2023 BLS Practice Analysis. Every practice test here follows that weighting. Skills and drugs stay inside the EMR column of the National EMS Scope of Practice Model, clinical figures follow the NASEMSO National Model EMS Clinical Guidelines, and choking follows the 2025 AHA guidelines. States set their own scope, so follow your state and medical director where they differ.
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
                src={getTigerAsset("emr", 3)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For programs */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teaching an EMR Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            EMR instructors, fire academies and workplace response programs can assign Tigertest as a class for free: post one link, students join with just their name, and you see who practiced, their test scores and the domains your cohort misses most.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a Class
          </Link>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Study for the NREMT EMR Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the primary assessment</h3>
              <p>
                Close to 40 percent of the exam is Primary Assessment: the general impression, responsiveness, airway, breathing, circulation and the life threats that decide how fast the patient needs help. Practice the order until it is automatic, and know what each finding tells you to do next.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your scope</h3>
              <p>
                Under the national model, EMRs open airways, place oral airways, suction, ventilate with a BVM, give oxygen by cannula or nonrebreather, do CPR with an AED, control bleeding with pressure, tourniquets and packing, place cervical collars and splints, and give naloxone by nose or auto-injector. Nasal airways, pulse oximetry, aspirin, oral glucose and epinephrine auto-injectors start at the EMT level, though some states add them. The exam expects you to know the line.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Size up every scene</h3>
              <p>
                About a fifth of the exam is Scene Size-up and Safety: hazards, PPE, finding every patient, triage and calling for the right resources. Read each stem for the danger first.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak domain</h3>
              <p>
                Tigertest tracks your accuracy by domain. Work the drills until the misses stop coming back, then take Practice Test 2 to see where you stand.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NREMT EMR Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="emr" />
        </div>
      </div>

      <SampleQuestionsV2 examId="emr" />

      <ExamRelatedTests examId="emr" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Practice for the NREMT EMR Exam</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all five domains.</p>
          <ExamLandingCTA dashboardHref="/emr/dashboard" />
        </div>
      </div>
    </div>
  );
}
