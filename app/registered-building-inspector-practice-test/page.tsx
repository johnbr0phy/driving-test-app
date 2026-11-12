import "@/lib/banks/ukrbi";
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

const title = "Registered Building Inspector Practice Test 2026 - Free RBI Mock Exams";
const metaDescription =
  "Free practice for the RBI competence assessment in England: 200 original questions on registration, the code of conduct, procedure, notices and higher-risk buildings.";
const description =
  "Free practice for the Registered Building Inspector (RBI) competence assessment in England: 200 original questions on registration and classes, the code of conduct, building control procedure, dutyholders and competence, higher-risk buildings, enforcement and dangerous structures, operational standards and the wider law. Four 50-question practice tests with an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "registered building inspector practice test, rbi competence assessment questions, building inspector exam uk, bicof practice, building safety regulator test, class 2 building inspector, building control mock exam",
  alternates: {
    canonical: `${siteUrl}/registered-building-inspector-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/registered-building-inspector-practice-test`,
    images: [{ url: shareImageUrl("ukrbi"), width: 1200, height: 630, alt: "Tigertest free registered building inspector practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukrbi")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Registered Building Inspector Practice",
      description,
      url: `${siteUrl}/registered-building-inspector-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ukrbi", "GBP"),
      featureList: ["200 building inspector practice questions", "4 practice tests of 50 questions", "4 training sets by topic", "Instant feedback with explanations", "Auto-save progress"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need to register to work as a building inspector?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. In England it is a criminal offence to assess plans, inspect building work or advise a building control body on its regulated functions without being registered with the Building Safety Regulator." },
        },
        {
          "@type": "Question",
          name: "Which class do I need?",
          acceptedAnswer: { "@type": "Answer", text: "Class 1 is for trainees working under supervision. Class 2 lets you work alone on buildings under 18 m (categories A to F). Class 3 adds non-standard and higher-risk buildings (G and H). Class 4 is for technical managers who already hold class 2 or 3." },
        },
        {
          "@type": "Question",
          name: "How is competence assessed?",
          acceptedAnswer: { "@type": "Answer", text: "Classes 2 and 3 need a certificate from an independent, BSR-approved competence scheme, assessed against the Building Inspector Competence Framework. Each scheme sets its own method, and you must be reassessed at least every 4 years." },
        },
        {
          "@type": "Question",
          name: "What does this practice test cover?",
          acceptedAnswer: { "@type": "Answer", text: "Registration and the code of conduct, building control procedure under the Building Regulations 2010, dutyholders and competence, the higher-risk building regime, enforcement notices, dangerous structures and demolition, the operational standards rules and the wider law an inspector works within. Technical Approved Document values are in our Building Regulations test." },
        },
        {
          "@type": "Question",
          name: "Does it cover Wales?",
          acceptedAnswer: { "@type": "Answer", text: "No. It follows the law and BSR documents for England. Wales has its own register categories, code of conduct and appeal routes, run by the Welsh Ministers." },
        },
        classFaqJsonLd("ukrbi"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Registration, Classes & Restricted Activities", weight: "12%" },
  { name: "Code of Conduct", weight: "14%" },
  { name: "Building Control Procedure", weight: "14%" },
  { name: "Dutyholders & Competence", weight: "12%" },
  { name: "Higher-Risk Buildings", weight: "14%" },
  { name: "Enforcement & Dangerous Structures", weight: "12%" },
  { name: "Operational Standards & Inspection", weight: "14%" },
  { name: "Wider Law, Guidance & Safety", weight: "8%" },
];

export default function UkrbiLandingPage() {
  return (
    <div data-theme="ukrbi" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Registered Building Inspector Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/building-inspector/dashboard"
            shortName="Building Inspector"
            subtitle="200 questions on the Building Safety Act, the competence framework and the RBI code of conduct: classes, procedure, dutyholders, notices, gateways and higher-risk buildings. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukrbi-mobile.png", desktop: "/landing/ukrbi-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukrbi" />

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
                Four training sets, from Registration & Code of Conduct to Higher-Risk Buildings & Safety. Master a topic, then take a test. Questions you miss come back until you have mastered them.
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
                Four 50-question practice tests across every topic, with a 70% readiness line and an explanation of the right answer on every question.
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
                Built on the Competence Framework and the Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                BSR does not publish how the assessment is weighted, so the practice tests spread across the subject areas of the Building Inspector Competence Framework and the code of conduct, with procedure, higher-risk buildings and inspection practice carrying the most questions. Every question is original and follows the law in force in England.
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
                src={getTigerAsset("ukrbi", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For teachers */}
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Course Tutors</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Training building control surveyors for their assessment? Set Tigertest as practice at{" "}
          <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
          {" "}and see which topics your group misses most. It is free for you and your learners.
        </p>
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
            How to Prepare for the RBI Competence Assessment
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the classes and what each may do</h3>
              <p>
                Learn the four classes, the building categories each covers and which activities are restricted to registered inspectors. Many questions turn on whether an inspector is working within their class.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the procedure end to end</h3>
              <p>
                Follow a project through the Building Regulations 2010 procedure: applications, commencement, inspections, completion and the notices that can be served. Then do the same for a higher-risk building through each gateway.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the code of conduct closely</h3>
              <p>
                The code&apos;s duties on honesty, competence, conflicts of interest and reporting come up again and again. Know what an inspector must do when asked to work outside their competence or to approve something they doubt.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 85 percent on every practice test, then retrain your weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Registered Building Inspector Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do I need to register to work as a building inspector?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. In England it is a criminal offence to assess plans, inspect building work or advise a building control body on its regulated functions without being registered with the Building Safety Regulator.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which class do I need?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Class 1 is for trainees working under supervision. Class 2 lets you work alone on buildings under 18 m (categories A to F). Class 3 adds non-standard and higher-risk buildings (G and H). Class 4 is for technical managers who already hold class 2 or 3.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is competence assessed?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Classes 2 and 3 need a certificate from an independent, BSR-approved competence scheme, assessed against the Building Inspector Competence Framework. Each scheme sets its own method, and you must be reassessed at least every 4 years.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does this practice test cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Registration and the code of conduct, building control procedure under the Building Regulations 2010, dutyholders and competence, the higher-risk building regime, enforcement notices, dangerous structures and demolition, the operational standards rules and the wider law an inspector works within. Technical Approved Document values are in our Building Regulations test.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does it cover Wales?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. It follows the law and BSR documents for England. Wales has its own register categories, code of conduct and appeal routes, run by the Welsh Ministers.
            </p>
          </div>
          <ExamClassFaq examId="ukrbi" />
        </div>
      </div>

      <ExamSampleQuestions examId="ukrbi" />

      <ExamRelatedTests examId="ukrbi" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Competence Assessment?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every topic.</p>
          <ExamLandingCTA dashboardHref="/building-inspector/dashboard" />
        </div>
      </div>
    </div>
  );
}
