import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "RE5 Exam Practice Test 2026 - Free FAIS Representative Questions";
const metaDescription =
  "Free RE5 practice for South African FAIS representatives: 200 original questions on the FAIS Act, the General Code of Conduct, the FIC Act, the Ombud and fit and proper, in four 50-question mock tests with every answer explained.";
const description =
  "Free practice for the RE5, the regulatory examination for representatives under South Africa's FAIS Act: 200 original questions across its eight tasks, from the FAIS Act and FSP licences, key individuals and the General Code of Conduct to record keeping, the FIC Act, the Ombud for FSPs, fit and proper requirements, supervision and debarment. Four 50-question mock tests with the 66% pass line and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "re5 exam practice test, re5 practice questions, re5 mock exam 2026, regulatory examination for representatives, fais re5, re5 fsca, fais exam questions, re5 general code of conduct, re5 fica questions, fais representative exam south africa",
  alternates: {
    canonical: `${siteUrl}/re5-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/re5-exam-practice-test`,
    images: [{ url: shareImageUrl("zare5"), width: 1200, height: 630, alt: "Tigertest free RE5 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("zare5")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the RE5 exam?",
    a: "The RE5 is the regulatory examination for representatives in all categories of financial services providers under South Africa's Financial Advisory and Intermediary Services (FAIS) Act. It is part of the fit and proper requirements set by the Financial Sector Conduct Authority (FSCA), and it tests whether a representative understands the law that governs the advice and intermediary services they give clients.",
  },
  {
    q: "How many questions are on the RE5 and what is the pass mark?",
    a: "According to the FSCA's preparation guide for the regulatory examinations (January 2026), the RE5 has 50 multiple-choice questions with four options each, to be answered in 2 hours. Each question is worth 2%, the pass mark is 66% (33 correct), and there is no negative marking. It is a closed-book paper exam, and you may write it as many times as you need to.",
  },
  {
    q: "What does the RE5 cover?",
    a: "Eight tasks: the FAIS Act as a regulatory framework and financial products, maintaining an FSP licence and undesirable practices, the role of the key individual, the General Code of Conduct (duties, conflicts of interest, disclosures, advice, client funds and complaints), record keeping, the FIC Act and money laundering control, the Ombud for FSPs, and operating as a representative (fit and proper, supervision and debarment). Every task appears at least once in each exam.",
  },
  {
    q: "How are these mock tests built?",
    a: "Each of the four mock tests has 50 questions, like the real exam, with the 66% pass line, and covers all eight tasks. The FSCA publishes no weight per task, so the split is Tigertest's, led by how many qualifying criteria each task has. The four training sets follow the tasks: the FAIS Act, licence and key individuals; the General Code of Conduct; records, the FIC Act and the Ombud; and representatives and debarment.",
  },
  {
    q: "Are these the real RE5 questions?",
    a: "No. Every question is original, written by Tigertest from the FAIS Act, the General Code of Conduct, the Determination of Fit and Proper Requirements (Board Notice 194 of 2017), the exemption for services under supervision, the FIC Act and the Financial Sector Regulation Act. It is free practice, not affiliated with the FSCA or the examination body, and it does not replace reading the legislation, which the official guide strongly advises.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RE5 Practice Test",
      description,
      url: `${siteUrl}/re5-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
      featureList: [
        "200 RE5 practice questions",
        "4 mock tests of 50 questions with the 66% pass line",
        "4 training sets by exam task",
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
  { name: "FAIS Act, financial products and the compliance officer", weight: "6 per test" },
  { name: "Maintaining the FSP licence and undesirable practices", weight: "6 per test" },
  { name: "Key individuals", weight: "3 per test" },
  { name: "General Code of Conduct", weight: "13 per test" },
  { name: "Record keeping", weight: "3 per test" },
  { name: "FIC Act and money laundering control", weight: "5 per test" },
  { name: "The Ombud for FSPs", weight: "3 per test" },
  { name: "Operating as a representative and debarment", weight: "11 per test" },
];

export default function Zare5LandingPage() {
  return (
    <div data-theme="zare5" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RE5 Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/re5-exam/dashboard"
            shortName="RE5"
            subtitle="200 original questions for the RE5 regulatory examination for FAIS representatives: the FAIS Act and FSP licences, the General Code of Conduct, the FIC Act, the Ombud for FSPs, fit and proper requirements and debarment. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/zare5-mobile.png", desktop: "/landing/zare5-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="zare5" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Task at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets that follow the RE5 tasks: the FAIS Act, licence and key individuals; the General Code of Conduct; records, the FIC Act and the Ombud; and representatives and debarment. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions, the real length, with the real 66% pass line, each covering all eight tasks. No question appears in more than one test, and every answer is explained with the rule behind it.
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
                Built on the Eight RE5 Tasks
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real RE5 is 50 questions in 2 hours, 66% to pass, drawn from a central bank so that every task appears at least once. The FSCA publishes no weight per task, so the split below is Tigertest&apos;s, led by how many qualifying criteria each task has.
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
                src={getTigerAsset("zare5", 1)}
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
            How to Pass the RE5 Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the legislation itself</h3>
              <p>
                The questions use the legal terms of the FAIS Act, the General Code of Conduct and the FIC Act, and the official guide warns that summaries alone are not enough. Work through the task map one qualifying criterion at a time and read the section it points to.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the definitions cold</h3>
              <p>
                Advice versus intermediary service, what is and is not a financial product, who counts as a representative, a key individual or a client, and what the Code calls a conflict of interest or a complaint. Many questions turn on one word in a definition.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the Code of Conduct as a process</h3>
              <p>
                Disclosures before and during the service, the needs analysis and record of advice, replacement, client funds, complaints and termination. The Code of Conduct task has more qualifying criteria than any other task.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Watch for negative and most/best questions</h3>
              <p>
                The RE5 asks which option is not required, or which is the most appropriate, and some questions have more than one correct statement to combine. Read every option before you answer, and, as our own rule of thumb rather than an official figure, aim for 75% or better on every mock test before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          RE5 Exam Frequently Asked Questions
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

      <ExamRelatedTests examId="zare5" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the RE5?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all eight RE5 tasks.</p>
          <ExamLandingCTA dashboardHref="/re5-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
