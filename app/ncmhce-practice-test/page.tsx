import "@/lib/banks/ncmhce";
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

const title = "NCMHCE Practice Test 2026 - Free Clinical Counseling Exam Questions";
const metaDescription =
  "Free NCMHCE practice test: 200 original clinical vignette questions on the NBCC content outline, four 50-question mock exams and five training sets, every answer explained.";
const description =
  "Free practice for the National Clinical Mental Health Counseling Examination (NCMHCE): 200 original clinical vignette questions written from the NBCC NCMHCE Content Outline. Four 50-question mock exams weighted like the 100 scored questions, and five training sets covering professional practice and ethics, intake, assessment and DSM-5-TR diagnosis, treatment planning and interventions, group, family and crisis work, and core counseling attributes.";

const faqs = [
  {
    q: "What is the NCMHCE?",
    a: "The National Clinical Mental Health Counseling Examination is NBCC's case-based exam for clinical mental health counselors. Many state boards use it for the clinical counseling license (titles such as LCMHC, LMHC, LPCC or LPC vary by state), and it is required for NBCC's Certified Clinical Mental Health Counselor (CCMHC) credential. Your state board decides whether you need the NCMHCE, the NCE or both.",
  },
  {
    q: "How is the NCMHCE set up?",
    a: "The current exam has 11 clinical case studies, one of them unscored. Each case starts with an intake summary followed by two counseling sessions, and each part is followed by multiple-choice questions with four options and one correct answer, 9 to 15 questions per case. 100 questions are scored. You have 225 minutes of testing time, with one scheduled 15-minute break after the fifth case, at a Pearson VUE test center or online through OnVUE.",
  },
  {
    q: "What score do you need to pass the NCMHCE?",
    a: "Your score is the number of scored questions you answer correctly. NBCC sets the passing score by standard setting with subject matter experts and adjusts it for each form's difficulty by statistical equating, so the number needed varies slightly from form to form. The 70% line on these practice tests is a readiness target, not the official standard. If you do not pass, you can retest after a 30-day wait; your state board sets how many attempts you may take.",
  },
  {
    q: "What changes on the NCMHCE in July 2027?",
    a: "NBCC has published new examination specifications effective July 1, 2027, based on a 2024-2025 work analysis. The exam will have 10 case studies and 130 to 150 questions (30 to 50 unscored field-test items), 3 hours 45 minutes with an optional 15-minute break, and scaled scores from 100 to 500 with 360 to pass. The six new domains are Professional Development and Counselor Self-Awareness, Intake and Assessment, Treatment Planning and Continuity of Care, Provision of Counseling Interventions, Indirect Client Care, and Legal and Ethical Compliance. This practice follows the outline in force now; most of its content carries over.",
  },
  {
    q: "Are these the real NCMHCE questions?",
    a: "No. Every question is original, written by Tigertest from NBCC's published content outline, the ACA Code of Ethics and DSM-5-TR. On the real exam several questions share one case narrative that unfolds over three sections; here each question is a short stand-alone vignette, so the multi-question case format is not modelled. Tigertest is not affiliated with NBCC.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ncmhce practice test, ncmhce practice exam, ncmhce questions, nbcc clinical exam, clinical mental health counseling exam, lcmhc exam practice, lmhc exam practice, ncmhce 2026, ncmhce case study practice",
  alternates: {
    canonical: `${siteUrl}/ncmhce-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ncmhce-practice-test`,
    images: [{ url: shareImageUrl("ncmhce"), width: 1200, height: 630, alt: "Tigertest free NCMHCE practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ncmhce")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NCMHCE Practice Test",
      description,
      url: `${siteUrl}/ncmhce-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ncmhce"),
      featureList: [
        "200 NCMHCE practice questions written as clinical vignettes",
        "4 mock exams of 50 questions weighted like the NBCC content outline",
        "5 training sets by content area",
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
        classFaqJsonLd("ncmhce"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Counseling Skills & Interventions", weight: "30%" },
  { name: "Intake, Assessment & Diagnosis", weight: "25%" },
  { name: "Professional Practice & Ethics", weight: "15%" },
  { name: "Treatment Planning", weight: "15%" },
  { name: "Core Counseling Attributes", weight: "15%" },
];

export default function NcmhceLandingPage() {
  return (
    <div data-theme="ncmhce" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NCMHCE Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ncmhce/dashboard"
            shortName="NCMHCE"
            subtitle="200 clinical vignette questions and four 50-question mock exams. Free to start, no account needed."
            shots={{ mobile: "/landing/ncmhce-mobile.png", desktop: "/landing/ncmhce-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ncmhce" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Content Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the NBCC content outline: professional practice and ethics; intake, assessment and DSM-5-TR diagnosis; treatment planning and theory-based interventions; group, family and crisis work; and core counseling attributes. Every question is a short clinical vignette, and the ones you miss come back until you have mastered them.
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
                Four mock exams of 50 questions, each weighted like the 100 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the NBCC Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NBCC weights the 100 scored questions across five domains, and every mock exam here keeps those weights, scaled to 50 questions. The sixth domain, Areas of Clinical Focus, is carried by the cases themselves: depression, anxiety, trauma, grief, substance use, relationship problems and the other presenting concerns the outline lists. Questions are written at the clinical counselor&apos;s level: choosing the next step, reading risk, telling one diagnosis from another, writing goals and responding in session. Counselor educators can set Tigertest as NCMHCE review at{" "}
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
                src={getTigerAsset("ncmhce", 3)}
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
            How to Pass the NCMHCE
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put safety first, then sequence</h3>
              <p>
                Many questions ask what to do first or next. Risk to the client or others comes before history, goals or technique, and assessment comes before intervention. Read each vignette for the detail that changes the order.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the ethics code in practice</h3>
              <p>
                Informed consent, the limits of confidentiality, couples and group confidentiality, competence, boundaries and records come up again and again. Learn what the ACA Code of Ethics asks you to do in each situation, not just its headings.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the details that separate diagnoses</h3>
              <p>
                Durations, onset, specifiers and the one feature that rules out a look-alike decide most diagnosis questions. Practice naming why each wrong option does not fit.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by content area. Aim for 70% or better on every mock exam before your test date. After each test, drill the questions you missed and retrain the weakest area.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NCMHCE Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ncmhce" />
        </div>
      </div>

      <ExamSampleQuestions examId="ncmhce" />

      <ExamRelatedTests examId="ncmhce" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the NCMHCE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 vignette questions across every scored domain of the NBCC content outline.</p>
          <ExamLandingCTA dashboardHref="/ncmhce/dashboard" />
        </div>
      </div>
    </div>
  );
}
