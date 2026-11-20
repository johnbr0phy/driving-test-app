import "@/lib/banks/rhit";
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

const title = "RHIT Practice Test 2026 - Free AHIMA Registered Health Information Technician Questions";
const metaDescription =
  "Free RHIT practice test: 200 original questions on the AHIMA Registered Health Information Technician content outline, four 50-question practice tests and four training sets, every answer explained.";
const description =
  "Free practice for the AHIMA Registered Health Information Technician (RHIT) exam: 200 original questions written from the RHIT Content Outline. Four 50-question practice tests weighted like the real six domains: data content and information governance, access, disclosure, privacy and security, data analytics, revenue cycle management, compliance, and leadership.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "rhit practice test, rhit exam practice, ahima rhit practice test, registered health information technician practice test, rhit exam questions, rhit mock exam, rhit exam 2026, health information technician exam, him exam practice",
  alternates: {
    canonical: `${siteUrl}/rhit-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rhit-practice-test`,
    images: [{ url: shareImageUrl("rhit"), width: 1200, height: 630, alt: "Tigertest free RHIT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rhit")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RHIT Practice Test",
      description,
      url: `${siteUrl}/rhit-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("rhit"),
      featureList: [
        "200 RHIT practice questions",
        "4 practice tests of 50 questions weighted like the AHIMA RHIT Content Outline",
        "4 training sets by topic",
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
          name: "What is the RHIT exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Registered Health Information Technician (RHIT) is AHIMA's credential for health information technicians, the people who keep medical records complete, accurate and secure, release them lawfully, code and abstract data, and support the revenue cycle. To sit for it you complete the associate-level requirements of a CAHIIM-accredited Health Information Management program, or an HIM program approved by a foreign association with an AHIMA reciprocity agreement.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the RHIT exam and how long is it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The exam has 150 multiple-choice questions in 3 hours 30 minutes at a Pearson VUE test center: 130 are scored and 20 are unscored pretest items placed at random. You can move between questions once an answer is selected and flag questions for review. The passing score is a scaled 300, so the 70 percent line on these practice tests is a readiness target, not the official pass mark.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the RHIT exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The RHIT Content Outline has six domains: Data Content, Structure and Information Governance 19 to 25 percent, Access, Disclosure, Privacy and Security 14 to 18 percent, Data Analytics and Use 12 to 18 percent, Revenue Cycle Management 19 to 25 percent, Compliance 13 to 17 percent, and Leadership 9 to 12 percent. Each 50-question practice test here keeps that balance.",
          },
        },
        {
          "@type": "Question",
          name: "How is the RHIT different from the CCA or CCS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The CCA and CCS are coding credentials. The RHIT covers the whole health information function: record content and the Conditions of Participation, the master patient index, HIPAA release of information and breach rules, hospital statistics, coding and CDI, the revenue cycle, compliance and basic leadership.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real RHIT exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from AHIMA's published RHIT Content Outline and the federal rules it points to, such as HIPAA and the CMS Conditions of Participation, so it tests the same skills without copying the exam. It is free practice, not an official AHIMA product.",
          },
        },
        classFaqJsonLd("rhit"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Data Content, Structure & Information Governance", weight: "19-25%" },
  { name: "Access, Disclosure, Privacy & Security", weight: "14-18%" },
  { name: "Data Analytics & Use", weight: "12-18%" },
  { name: "Revenue Cycle Management", weight: "19-25%" },
  { name: "Compliance", weight: "13-17%" },
  { name: "Leadership", weight: "9-12%" },
];

export default function RhitLandingPage() {
  return (
    <div data-theme="rhit" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RHIT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rhit/dashboard"
            shortName="RHIT"
            subtitle="200 RHIT questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/rhit-mobile.png", desktop: "/landing/rhit-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rhit" />

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
                Four training sets by topic, from Data Content &amp; Governance to Compliance &amp; Leadership. Questions you miss come back until you have mastered them, then you take a practice test for a score.
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
                Four practice tests of 50 questions, each weighted like the six domains of the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the RHIT Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AHIMA publishes a weight range for each of the six domains, and every practice test here sits inside it. Data content and the revenue cycle weigh most, with privacy, analytics and compliance close behind. Instructors running an HIM program can set Tigertest as practice at{" "}
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
                src={getTigerAsset("rhit", 3)}
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">We Just Launched</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            The RHIT practice test is new. Spot a question that could be clearer, or a topic you&apos;d like covered? We read every message and use it to improve every test.
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
            How to Pass the RHIT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the rules behind release of information</h3>
              <p>
                Access, accounting, amendment and authorization each have their own deadlines and exceptions under HIPAA. Learn which disclosures need an authorization, which go in an accounting, and what a valid request looks like, because these are everyday RHIT decisions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice the hospital statistics</h3>
              <p>
                Occupancy, average length of stay, census, death and infection rates, case-mix index and turnaround times all come down to a few formulas. Work them by hand until you can set each one up without looking.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. See the revenue cycle end to end</h3>
              <p>
                Registration, the chargemaster, coding, queries and CDI, billing, denials and the DNFB are one chain. Questions often ask which link broke, so know what each step does and who owns it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Review, then retest</h3>
              <p>
                You can flag questions and come back on the real exam, so pace yourself across 150 questions. Aim for 70% or better on every practice test before you book, and drill the questions you missed after each one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RHIT Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the RHIT exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Registered Health Information Technician (RHIT) is AHIMA&apos;s credential for health information technicians, the people who keep medical records complete, accurate and secure, release them lawfully, code and abstract data, and support the revenue cycle. To sit for it you complete the associate-level requirements of a CAHIIM-accredited Health Information Management program, or an HIM program approved by a foreign association with an AHIMA reciprocity agreement.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the RHIT exam and how long is it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The exam has 150 multiple-choice questions in 3 hours 30 minutes at a Pearson VUE test center: 130 are scored and 20 are unscored pretest items placed at random. You can move between questions once an answer is selected and flag questions for review. The passing score is a scaled 300, so the 70 percent line on these practice tests is a readiness target, not the official pass mark.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the RHIT exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The RHIT Content Outline has six domains: Data Content, Structure and Information Governance 19 to 25 percent, Access, Disclosure, Privacy and Security 14 to 18 percent, Data Analytics and Use 12 to 18 percent, Revenue Cycle Management 19 to 25 percent, Compliance 13 to 17 percent, and Leadership 9 to 12 percent. Each 50-question practice test here keeps that balance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is the RHIT different from the CCA or CCS?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The CCA and CCS are coding credentials. The RHIT covers the whole health information function: record content and the Conditions of Participation, the master patient index, HIPAA release of information and breach rules, hospital statistics, coding and CDI, the revenue cycle, compliance and basic leadership.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real RHIT exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from AHIMA&apos;s published RHIT Content Outline and the federal rules it points to, such as HIPAA and the CMS Conditions of Participation, so it tests the same skills without copying the exam. It is free practice, not an official AHIMA product.
            </p>
          </div>
          <ExamClassFaq examId="rhit" />
        </div>
      </div>

      <ExamSampleQuestions examId="rhit" />

      <ExamRelatedTests examId="rhit" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the RHIT Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the RHIT outline.</p>
          <ExamLandingCTA dashboardHref="/rhit/dashboard" />
        </div>
      </div>
    </div>
  );
}
