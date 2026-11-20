import "@/lib/banks/cadc";
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

const title = "Free ADC Practice Test 2026 - IC&RC Alcohol and Drug Counselor Questions";
const metaDescription =
  "Free-to-start IC&RC ADC practice test for the CADC, LADC and CAC credential: 200 original questions on the four ADC domains, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the IC&RC Alcohol and Drug Counselor (ADC) exam, the test many US state boards use for the CADC, LADC or CAC credential: 200 original questions written from the IC&RC ADC candidate guide and primary sources such as 42 CFR Part 2, NIDA, NIAAA and SAMHSA's treatment protocols. Four 50-question practice tests weighted like the four exam domains, and five training sets covering the science of addiction, screening and assessment, counseling and treatment planning, crisis, referral and ethics, and confidentiality and client rights.";

const faqs = [
  {
    q: "What is the IC&RC ADC exam?",
    a: "The Alcohol and Drug Counselor (ADC) exam is the certification exam of the International Certification & Reciprocity Consortium (IC&RC). Many US state boards that belong to IC&RC use it for their alcohol and drug counselor credential, which may be called CADC, LADC, CAC or another name depending on the state. IC&RC describes the credential as recognizing the core competencies of counselors working with substance use and addiction, for entry-to-mid-level professionals.",
  },
  {
    q: "How many questions are on the ADC exam?",
    a: "IC&RC's ADC candidate guide lists 150 questions: 125 scored and 25 unscored pretest questions, in 3 hours. Questions are multiple choice with three or four choices and one correct or best answer, and there is no penalty for guessing. The exam is taken on a computer at a Prometric test center, or by remote proctoring where the candidate's board allows it.",
  },
  {
    q: "What score do you need to pass the ADC exam?",
    a: "IC&RC reports scores on a scale from 200 to 800, and the minimum passing score is 500 for all IC&RC exams. Scores are equated across exam forms, so 500 is not a fixed percentage of questions. The 70 percent line on these practice tests is a readiness target, not the official standard. A candidate who does not pass must wait at least 90 days before retesting.",
  },
  {
    q: "What is on the ADC exam?",
    a: "The candidate guide (effective November 2022) has four domains: Scientific Principles of Substance Use and Co-Occurring Disorders (25%), Evidence-Based Screening and Assessment (20%), Evidence-Based Treatment, Counseling, and Referral (30%), and Professional, Ethical, and Legal Responsibilities (25%). Each practice test here keeps that balance.",
  },
  {
    q: "Are these the real ADC exam questions?",
    a: "No. Every question is original, written by Tigertest from IC&RC's published domains and primary sources such as the federal confidentiality rule (42 CFR Part 2), NIDA, NIAAA, the CDC and SAMHSA. Rules that vary by state, such as education and supervised hours, are not asked. Tigertest is not affiliated with IC&RC or any state certification board.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "adc practice test, ic&rc adc exam, cadc practice test, alcohol and drug counselor practice exam, ladc practice test, cac exam questions, icrc adc 2026, substance abuse counselor exam practice, addiction counselor exam",
  alternates: {
    canonical: `${siteUrl}/adc-alcohol-drug-counselor-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/adc-alcohol-drug-counselor-practice-test`,
    images: [{ url: shareImageUrl("cadc"), width: 1200, height: 630, alt: "Tigertest free ADC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cadc")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free IC&RC ADC Practice Test",
      description,
      url: `${siteUrl}/adc-alcohol-drug-counselor-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cadc"),
      featureList: [
        "200 IC&RC ADC practice questions",
        "4 practice tests of 50 questions weighted like the four ADC domains",
        "5 training sets by topic",
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
        classFaqJsonLd("cadc"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Treatment, Counseling & Referral", weight: "30%" },
  { name: "Scientific Principles & Co-Occurring Disorders", weight: "25%" },
  { name: "Professional, Ethical & Legal Responsibilities", weight: "25%" },
  { name: "Screening & Assessment", weight: "20%" },
];

export default function AdcLandingPage() {
  return (
    <div data-theme="cadc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ADC (IC&amp;RC) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/adc/dashboard"
            shortName="ADC"
            subtitle="200 IC&RC ADC questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/cadc-mobile.png", desktop: "/landing/cadc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cadc" />

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
                Five training sets follow the ADC domains: the science of addiction and co-occurring disorders; screening and assessment; counseling, groups and treatment planning; crisis, referral and professional ethics; and confidentiality, records and client rights. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions, each weighted like the four domains of the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the IC&amp;RC ADC Domains
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                IC&amp;RC publishes the weight of each domain, and every practice test here keeps that balance in 50 questions: 15 on treatment, counseling and referral, 13 on scientific principles, 12 on professional, ethical and legal responsibilities and 10 on screening and assessment. Addiction counseling program instructors can set Tigertest as ADC review at{" "}
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
                src={getTigerAsset("cadc", 3)}
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
            How to Pass the ADC Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Make treatment and counseling your core</h3>
              <p>
                Treatment, counseling and referral is the largest domain at 30%. Know the stages of change, motivational interviewing skills, group types and dynamics, treatment plan goals and objectives, relapse prevention, discharge planning and when to refer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the drugs and the brain</h3>
              <p>
                Scientific principles are a quarter of the exam. Learn the drug classes, signs of intoxication, overdose and withdrawal, how addiction changes the reward, stress and self-control circuits, and the signs of common co-occurring mental and medical conditions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn confidentiality cold</h3>
              <p>
                Ethics and law are another quarter. Learn 42 CFR Part 2 consent elements and its exceptions, documentation and record security, informed consent, boundaries and dual relationships, scope of practice and supervision. For assessment, know the DSM-5 criteria and severity levels and the ASAM dimensions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 70% or better on every practice test before your exam date. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ADC Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cadc" />
        </div>
      </div>

      <ExamSampleQuestions examId="cadc" />

      <ExamRelatedTests examId="cadc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the ADC Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all four domains of the IC&amp;RC ADC exam.</p>
          <ExamLandingCTA dashboardHref="/adc/dashboard" />
        </div>
      </div>
    </div>
  );
}
