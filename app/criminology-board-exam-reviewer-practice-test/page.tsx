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

const title = "Criminology Board Exam Reviewer 2026 - Free CLE Practice Test";
const metaDescription =
  "Free criminology board exam reviewer: 200 original questions on all six CLE subjects, four 50-question mock exams weighted like the PRC program, every answer explained.";
const description =
  "Free practice for the Philippine Licensure Examination for Criminologists (CLE): 200 original questions written from the Board of Criminology table of specifications. Four 50-question mock exams weighted like the real exam, and six training sets for Criminal Law and Jurisprudence, Law Enforcement Administration, Crime Detection and Investigation, Forensic Science, Criminology and Correctional Administration.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "criminology board exam reviewer, cle reviewer, criminologist licensure exam reviewer, criminology board exam 2026, criminal law and jurisprudence reviewer, law enforcement administration reviewer, forensic science reviewer, correctional administration reviewer, criminology mock exam, prc criminology",
  alternates: {
    canonical: `${siteUrl}/criminology-board-exam-reviewer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/criminology-board-exam-reviewer-practice-test`,
    images: [{ url: shareImageUrl("phcle"), width: 1200, height: 630, alt: "Tigertest free criminology board exam reviewer" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phcle")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Criminology Board Exam Reviewer",
      description,
      url: `${siteUrl}/criminology-board-exam-reviewer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
      featureList: [
        "200 criminology board exam practice questions",
        "4 mock exams of 50 questions weighted like the six board subjects",
        "6 training sets, one per board subject",
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
          name: "What is the Criminologist Licensure Examination?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Licensure Examination for Criminologists (CLE) is the board exam the Professional Regulation Commission (PRC) and the Professional Regulatory Board of Criminology give to criminology graduates. Passing it is required to register as a criminologist under R.A. 11131, the Philippine Criminology Profession Act of 2018. It covers six subjects over three days, two subjects a day.",
          },
        },
        {
          "@type": "Question",
          name: "What subjects are on the criminology board exam and how are they weighted?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Under the PRC program for the 2026 exams: Criminal Law and Jurisprudence 20%, Law Enforcement Administration 15%, Crime Detection and Investigation 20%, Forensic Science 15%, Criminology 20% and Correctional Administration 10%. Morning subjects run from 8:00 to 11:30 a.m. and afternoon subjects from 1:30 to 4:00 p.m. In the Board's table of specifications, each 20% subject has 100 items.",
          },
        },
        {
          "@type": "Question",
          name: "What is the passing score for the criminology board exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Under Section 17 of R.A. 11131 you need a weighted average of at least 75%, with no grade below 60% in any subject. If you reach 75% but score below 60% in a subject, your result is deferred and you retake that subject within two years, needing at least 80%. Failing three or more subjects means failing the exam. Each 50-question mock exam here uses 75% as its pass line; the subject floor is not modelled.",
          },
        },
        {
          "@type": "Question",
          name: "How is this reviewer laid out?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Six training sets follow the six board subjects, and four mock exams of 50 questions keep the board weights: 10 Criminal Law and Jurisprudence, 8 Law Enforcement Administration, 10 Crime Detection and Investigation, 7 Forensic Science, 10 Criminology and 5 Correctional Administration. Questions you miss come back until you have mastered them.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real board exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from the Revised Penal Code, the Rules of Court, R.A. 6975, R.A. 9344, R.A. 10592 and the other laws and topics in the Board's table of specifications, without copying any past exam. Tigertest is not affiliated with the PRC or the Professional Regulatory Board of Criminology; check prc.gov.ph for exam dates, requirements and any changes to the coverage.",
          },
        },
        classFaqJsonLd("phcle"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Criminal Law and Jurisprudence", weight: "20%" },
  { name: "Law Enforcement Administration", weight: "15%" },
  { name: "Crime Detection and Investigation", weight: "20%" },
  { name: "Forensic Science", weight: "15%" },
  { name: "Criminology", weight: "20%" },
  { name: "Correctional Administration", weight: "10%" },
];

export default function CriminologyReviewerLandingPage() {
  return (
    <div data-theme="phcle" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Criminology Board Exam Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/criminologist-licensure-exam/dashboard"
            shortName="CLE"
            subtitle="200 original questions on all six subjects of the Licensure Examination for Criminologists, from the Board of Criminology table of specifications. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phcle-mobile.png", desktop: "/landing/phcle-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phcle" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six training sets, one for each board subject, from criminal law to correctional administration. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock exams of 50 questions keep the board weights: 10 Criminal Law, 8 Law Enforcement, 10 Crime Detection, 7 Forensic Science, 10 Criminology and 5 Corrections. Aim for 75% or better. No question appears in more than one test.
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
                Built on the Board&apos;s Subject Weights
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The criminology board exam has six subjects over three days. These are the weights in the PRC program for the February and August 2026 exams, and every mock exam here keeps close to them. The real exam is far longer, with 100 items in each 20% subject under the Board&apos;s 2022 table of specifications, so each mock is a shorter sample at the same balance. Review centers and criminology instructors can set Tigertest as class practice at{" "}
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
                src={getTigerAsset("phcle", 1)}
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
            How to Pass the Criminology Board Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put the three 20% subjects first</h3>
              <p>
                Criminal Law and Jurisprudence, Crime Detection and Investigation, and Criminology together make up 60% of the weighted average. Know the elements of the common felonies in Book 2 of the Revised Penal Code, the rules on warrantless arrest and search, and the main theories of crime causation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Keep every subject above 60%</h3>
              <p>
                Under R.A. 11131 a 75% average is not enough if any subject falls below 60%: that subject is deferred and must be retaken within two years. Correctional Administration weighs only 10%, but it can still hold up your license, so do not skip it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the laws by number and by elements</h3>
              <p>
                Many items name a law by its number (R.A. 6975, R.A. 9165, R.A. 9344, R.A. 10592) or ask for the element that separates two crimes, such as robbery and theft, or homicide and parricide. Learn what each law does and what makes each crime different.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by subject. Aim for 75% or better on every mock exam. After each test, drill the questions you missed and retrain the weakest subject.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Criminology Board Exam FAQ
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the Criminologist Licensure Examination?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Licensure Examination for Criminologists (CLE) is the board exam the Professional Regulation Commission (PRC) and the Professional Regulatory Board of Criminology give to criminology graduates. Passing it is required to register as a criminologist under R.A. 11131, the Philippine Criminology Profession Act of 2018. It covers six subjects over three days, two subjects a day.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What subjects are on the criminology board exam and how are they weighted?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Under the PRC program for the 2026 exams: Criminal Law and Jurisprudence 20%, Law Enforcement Administration 15%, Crime Detection and Investigation 20%, Forensic Science 15%, Criminology 20% and Correctional Administration 10%. Morning subjects run from 8:00 to 11:30 a.m. and afternoon subjects from 1:30 to 4:00 p.m. In the Board&apos;s table of specifications, each 20% subject has 100 items.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the passing score for the criminology board exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Under Section 17 of R.A. 11131 you need a weighted average of at least 75%, with no grade below 60% in any subject. If you reach 75% but score below 60% in a subject, your result is deferred and you retake that subject within two years, needing at least 80%. Failing three or more subjects means failing the exam. Each 50-question mock exam here uses 75% as its pass line; the subject floor is not modelled.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is this reviewer laid out?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Six training sets follow the six board subjects, and four mock exams of 50 questions keep the board weights: 10 Criminal Law and Jurisprudence, 8 Law Enforcement Administration, 10 Crime Detection and Investigation, 7 Forensic Science, 10 Criminology and 5 Correctional Administration. Questions you miss come back until you have mastered them.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real board exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from the Revised Penal Code, the Rules of Court, R.A. 6975, R.A. 9344, R.A. 10592 and the other laws and topics in the Board&apos;s table of specifications, without copying any past exam. Tigertest is not affiliated with the PRC or the Professional Regulatory Board of Criminology; check prc.gov.ph for exam dates, requirements and any changes to the coverage.
            </p>
          </div>
          <ExamClassFaq examId="phcle" />
        </div>
      </div>

      <ExamRelatedTests examId="phcle" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Criminology Board Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all six board subjects.</p>
          <ExamLandingCTA dashboardHref="/criminologist-licensure-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
