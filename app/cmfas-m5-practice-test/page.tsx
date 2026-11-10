import "@/lib/banks/sgm5";
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

const title = "CMFAS RES5 (M5) Practice Test 2026 - Free Singapore FAA Rules and Ethics Questions";
const metaDescription =
  "Free practice for CMFAS RES5, Rules, Ethics and Skills for Financial Advisory Services (which replaced Module 5): 200 original questions on the FAA, MAS notices, the balanced scorecard, AML, ILPs, ethics and advisory skills, every answer explained.";
const description =
  "Free practice for RES5, Rules, Ethics and Skills for Financial Advisory Services, the CMFAS module set by the Singapore College of Insurance that representatives of financial advisers in Singapore need under MAS Notice FAA-N26 (it replaced Module 5 in April 2024): 200 original questions on the Financial Advisers Act and Regulations, MAS Notice FAA-N16 on recommendations, the balanced scorecard, AML/CFT, investment-linked policies, collective investment schemes, market conduct, CPF, ethics and fair dealing, and advisory skills. Four 50-question mock tests and six training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cmfas m5 practice test, cmfas module 5, res5 practice test, cmfas res5, rules ethics and skills for financial advisory services, m5 mock exam, cmfas m5 questions, financial advisers act exam singapore, sci res5, res5 mock test 2026",
  alternates: {
    canonical: `${siteUrl}/cmfas-m5-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cmfas-m5-practice-test`,
    images: [{ url: shareImageUrl("sgm5"), width: 1200, height: 630, alt: "Tigertest free CMFAS RES5 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sgm5")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What happened to CMFAS Module 5 (M5)?",
    a: "Module 5, Rules and Regulations for Financial Advisory Services, was replaced by RES5, Rules, Ethics and Skills for Financial Advisory Services, when MAS Notice FAA-N26 took effect on 1 April 2024. Under the notice, a valid Module 5 pass counts as a pass in RES5, and the Singapore College of Insurance (SCI) now schedules RES5 rather than M5. RES5 keeps the rules and regulations of the old module and adds a part on ethics and advisory skills.",
  },
  {
    q: "How many questions are on RES5 and what is the pass mark?",
    a: "SCI lists RES5 as 150 multiple-choice questions in 3 hours: 110 in Part I on rules and regulations and 40 in Part II on ethics and skills. You need at least 75% in Part I and at least 80% in Part II, with one mark per correct answer and nothing deducted for wrong or blank answers. It is a closed-book computer screen examination in English at SCI, and you may bring an approved non-programmable calculator.",
  },
  {
    q: "Who needs to pass RES5?",
    a: "MAS Notice FAA-N26 requires representatives of licensed and exempt financial advisers who advise on securities, collective investment schemes, exchange-traded derivatives, leveraged foreign exchange or over-the-counter derivatives, or who advise on or arrange life policies, to hold a valid RES5 pass, together with the product modules for what they advise on, such as M9 for life policies or M8 for unit trusts. Some exemptions apply, so check with your company's compliance department.",
  },
  {
    q: "How are these mock tests built?",
    a: "The real paper's 150 questions are modelled as four 50-question mock tests at the real pace of about 1.2 minutes a question. Each keeps the paper's mix of 37 Part I and 13 Part II questions: 6 on the FAA and representatives, 5 on conduct of business, 8 on FAA-N16, 6 on the balanced scorecard and other notices, 4 on AML, 8 on ILPs, CIS, market conduct and CPF, 7 on ethics and 6 on advisory skills. SCI publishes only the 110 and 40 part split, so the chapter split is Tigertest's, and each mock uses the stricter 80% line.",
  },
  {
    q: "Are these the real SCI exam questions?",
    a: "No. Every question is original, written by Tigertest from the Financial Advisers Act, MAS notices FAA-N16, FAA-N20, FAA-N06 and FAA-N26, MAS guidelines and the RES5 syllabus as they stand in November 2026, not from the SCI study text or any past paper. It is free practice, not affiliated with SCI, MAS or IBF, and it does not replace the official study text.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CMFAS RES5 Practice Test",
      description,
      url: `${siteUrl}/cmfas-m5-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("sgm5", "SGD"),
      featureList: [
        "200 RES5 (formerly M5) practice questions",
        "4 mock tests of 50 questions at the real pace",
        "6 training sets by syllabus chapter",
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
  { name: "FAA, representatives and conduct of business", weight: "11 of 50" },
  { name: "Recommendations (MAS Notice FAA-N16)", weight: "8 of 50" },
  { name: "Balanced scorecard, other notices and AML", weight: "10 of 50" },
  { name: "ILPs, CIS, market conduct and CPF", weight: "8 of 50" },
  { name: "Ethics, professionalism and fair dealing", weight: "7 of 50" },
  { name: "Advisory skills and financial planning", weight: "6 of 50" },
];

export default function CmfasM5LandingPage() {
  return (
    <div data-theme="sgm5" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CMFAS RES5 (M5) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cmfas-m5/dashboard"
            shortName="CMFAS RES5"
            subtitle="200 original questions for RES5, the CMFAS rules, ethics and skills module that replaced M5: the Financial Advisers Act, MAS notices on recommendations, the balanced scorecard and AML, ILPs and unit trusts, ethics and fair dealing, and advisory skills. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/sgm5-mobile.png", desktop: "/landing/sgm5-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sgm5" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Topic at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six training sets that follow the RES5 chapters: the FAA and conduct of business, recommendations under FAA-N16, the balanced scorecard and AML, ILPs, unit trusts, market conduct and CPF, ethics and fair dealing, and advisory skills. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests at the Real Pace</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions, each with the paper&apos;s mix of rules and regulations (Part I) and ethics and skills (Part II), and an 80% pass line. No question appears in more than one test, and every answer explains the rule behind it, from the selected client checks to the balanced scorecard grades.
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
                Built on the RES5 Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real paper is 150 multiple-choice questions in 3 hours: 110 on rules and regulations (75% to pass) and 40 on ethics and skills (80% to pass). Each 50-question mock test here keeps that mix, with Tigertest&apos;s own split across the 27 chapters:
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
                src={getTigerAsset("sgm5", 1)}
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
            How to Pass RES5
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the notices by number</h3>
              <p>
                Many questions name a notice: FAA-N16 for recommendations, FAA-N20 for the balanced scorecard, FAA-N06 for AML/CFT and FAA-N26 for competency. Learn what each one requires and who it applies to.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the checks and thresholds</h3>
              <p>
                Selected clients (two of: 62 or over, not proficient in the language, below &apos;O&apos; or &apos;N&apos; Level), trusted individuals aged 21 or over, a CKA valid for one year and a CAR for three, grade E for any Category 1 infraction, and records kept for at least five years.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Put the client first in Part II</h3>
              <p>
                Part II needs 80%, the higher bar. Ethics and skills questions reward the answer that serves the client: know your client before advising, disclose conflicts, explain costs and risks, and never promise returns.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise at the real pace</h3>
              <p>
                Three hours for 150 questions is 1.2 minutes each. Finish every training set, then aim for 85% or better on each mock test before you book, so a few unfamiliar questions on the day cannot pull either part under its line.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CMFAS RES5 Frequently Asked Questions
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

      <ExamSampleQuestions examId="sgm5" />

      <ExamRelatedTests examId="sgm5" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass RES5?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across both parts of the RES5 syllabus.</p>
          <ExamLandingCTA dashboardHref="/cmfas-m5/dashboard" />
        </div>
      </div>
    </div>
  );
}
