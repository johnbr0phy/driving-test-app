import "@/lib/banks/rhia";
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

const title = "RHIA Practice Test 2026 - Free AHIMA Registered Health Information Administrator Questions";
const metaDescription =
  "Free RHIA practice test: 200 original questions on the AHIMA RHIA exam content outline, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Free practice for the AHIMA Registered Health Information Administrator (RHIA) exam: 200 original questions written from the RHIA Exam Content Outline. Four 50-question practice tests weighted like the real five domains: data and information governance, compliance with access, use and disclosure, data analytics and informatics, revenue cycle management, and management and leadership.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "rhia practice test, rhia exam practice, ahima rhia practice test, registered health information administrator practice test, rhia exam questions, rhia mock exam, rhia exam 2026, health information management exam, him certification exam",
  alternates: {
    canonical: `${siteUrl}/rhia-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rhia-practice-test`,
    images: [{ url: shareImageUrl("rhia"), width: 1200, height: 630, alt: "Tigertest free RHIA practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rhia")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the RHIA exam?",
    a: "The Registered Health Information Administrator (RHIA) is AHIMA's credential for health information management leaders: people who manage patient health information, data governance, privacy and release of information, revenue cycle work, departments and budgets. To sit for it you graduate from a CAHIIM-accredited HIM bachelor's, master's or post-baccalaureate certificate program, or a foreign program covered by an AHIMA reciprocity agreement.",
  },
  {
    q: "How many questions are on the RHIA exam and how long is it?",
    a: "The exam has 150 questions in 3 hours 30 minutes at a Pearson VUE test center: 130 are scored and 20 are unscored pretest items placed at random. You can move between questions and flag them for review. The passing score is a scaled 300, so the 70 percent line on these practice tests is a readiness target, not the official pass mark.",
  },
  {
    q: "What is on the RHIA exam?",
    a: "The RHIA Exam Content Outline (effective October 1, 2023) has five domains: Data and Information Governance 17 to 20 percent, Compliance with Access, Use, and Disclosure of Health Information 15 to 18 percent, Data Analytics and Informatics 23 to 26 percent, Revenue Cycle Management 20 to 23 percent, and Management and Leadership 23 to 26 percent. Each 50-question practice test here keeps that balance.",
  },
  {
    q: "How is the RHIA different from the RHIT?",
    a: "Both are AHIMA credentials. The RHIT is for graduates of associate degree HIM programs and centres on day-to-day record, coding and release work. The RHIA is for graduates of bachelor's and higher HIM programs and adds leadership: information governance, data analytics, revenue cycle strategy, budgets, human resources and project management.",
  },
  {
    q: "Are these the real RHIA exam questions?",
    a: "No. Every question is original, written by Tigertest from AHIMA's published RHIA Exam Content Outline and from federal rules such as the HIPAA Privacy, Security and Breach Notification Rules and the Medicare Conditions of Participation. It is free practice, not an official AHIMA product, and Tigertest is not affiliated with AHIMA.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RHIA Practice Test",
      description,
      url: `${siteUrl}/rhia-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("rhia"),
      featureList: [
        "200 RHIA practice questions",
        "4 practice tests of 50 questions weighted like the AHIMA RHIA Exam Content Outline",
        "5 training sets, one per domain",
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
        classFaqJsonLd("rhia"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Data & Information Governance", weight: "17-20%" },
  { name: "Access, Use & Disclosure", weight: "15-18%" },
  { name: "Data Analytics & Informatics", weight: "23-26%" },
  { name: "Revenue Cycle Management", weight: "20-23%" },
  { name: "Management & Leadership", weight: "23-26%" },
];

export default function RhiaLandingPage() {
  return (
    <div data-theme="rhia" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RHIA Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rhia/dashboard"
            shortName="RHIA"
            subtitle="200 original questions on the AHIMA Registered Health Information Administrator outline: information governance and the MPI, HIPAA access, disclosure and breach rules, healthcare statistics, informatics, reimbursement and revenue integrity, budgets, HR and projects. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/rhia-mobile.png", desktop: "/landing/rhia-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rhia" />

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
                Five training sets, one per domain, from Data &amp; Information Governance to Management &amp; Leadership. Questions you miss come back until you have mastered them, then you take a practice test for a score.
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
                Four practice tests of 50 multiple-choice questions, each weighted like the five domains of the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the RHIA Exam Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AHIMA publishes a weight range for each of the five domains. Every practice test here has 9 governance questions, 8 on access, use and disclosure, 12 on data analytics and informatics, 10 on revenue cycle management and 11 on management and leadership. The outline&apos;s minimums add up to 98 percent, so a 50-question test cannot sit inside every range; management and leadership runs one question under its floor. Instructors in an HIM program can set Tigertest as practice at{" "}
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
                src={getTigerAsset("rhia", 3)}
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
            The RHIA practice test is new. Spot a question that could be clearer, or a topic you&apos;d like covered? We read every message and use it to improve every test.
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
            How to Pass the RHIA Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the HIPAA clocks and exceptions</h3>
              <p>
                Access, amendment, accounting and breach notice each run on a set time limit, and each has its own exceptions: unreviewable denials, subpoenas without a court order, facility directory rules, the breach exclusions and the four-factor risk assessment. Learn the rule and the exception together.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise the statistics by hand</h3>
              <p>
                Average daily census, length of stay, occupancy, gross and net death rates, case mix index, days in A/R and budget variances all come down to a short formula. Work each one until you know which number goes on top and which day counts.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think like a department head</h3>
              <p>
                Half the exam is analytics, informatics and management. Expect questions on the systems development life cycle, HIE models, data governance roles, FMLA and FLSA basics, budgets, FTEs, quality tools and project schedules, asked from the point of view of the person who runs HIM.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Connect documentation to revenue</h3>
              <p>
                MS-DRGs, APCs, CDI, DNFB, denials and compliance all depend on complete, accurate records. Aim for 70% or better on every practice test before you book, and drill the questions you missed after each one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RHIA Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="rhia" />
        </div>
      </div>

      <ExamSampleQuestions examId="rhia" />

      <ExamRelatedTests examId="rhia" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the RHIA Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the RHIA outline.</p>
          <ExamLandingCTA dashboardHref="/rhia/dashboard" />
        </div>
      </div>
    </div>
  );
}
