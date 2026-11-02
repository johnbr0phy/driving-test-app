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

const siteUrl = SITE_URL;

const title = "Free UGC-NET Paper 1 Mock Test 2026 - Practice Questions";
const metaDescription =
  "Free UGC-NET Paper 1 mock tests: 216 original questions on all ten units of Teaching and Research Aptitude, with reading passages, data tables and an explanation for every answer.";
const description =
  "Free UGC-NET Paper 1 (General Paper on Teaching and Research Aptitude) practice with 216 original questions written to the UGC NET Bureau syllabus: teaching aptitude, research aptitude, comprehension, communication, mathematical reasoning, logical reasoning with Indian logic, data interpretation, ICT, people, development and environment, and the higher education system. Two timed 50-question mock tests and nine drills, with an explanation on every answer. Paper 2 is not included.";

const faqs = [
  {
    q: "What is the exam pattern of UGC-NET Paper 1?",
    a: "UGC-NET is a computer-based test conducted by the National Testing Agency. Paper 1 and Paper 2 are taken in one sitting of 3 hours with no break. Paper 1 has 50 compulsory multiple-choice questions worth 100 marks, and Paper 2, on your own subject, has 100 questions worth 200 marks. The UGC syllabus sets five questions from each of Paper 1's ten units. The paper is offered in English and Hindi.",
  },
  {
    q: "Is there negative marking in UGC-NET?",
    a: "No. Each question carries 2 marks, a correct answer earns 2 marks and a wrong or unanswered question earns nothing, so answer every question. Tigertest scores the same way, as percent correct with no deduction.",
  },
  {
    q: "What marks do I need to qualify UGC-NET?",
    a: "To be considered at all, you need at least 40 percent aggregate across Paper 1 and Paper 2 together as a general or EWS candidate, or 35 percent in a reserved category. NTA then sets cut-offs for each subject and category, separately for JRF, for Assistant Professor and for PhD admission, so the real cut-offs are usually well above that minimum. A strong Paper 1 score lifts your aggregate in every subject.",
  },
  {
    q: "What does this UGC-NET Paper 1 mock test cover, and what is left out?",
    a: "Each mock has 50 questions, five from each unit in syllabus order, including a reading passage and a data table with five questions each, in 60 minutes: Paper 1's share of the real 3 hours at 1.2 minutes per question. Paper 2 is not included, because it depends on your subject. Current affairs are left out too. The questions, passages and tables are original, not copied from past papers.",
  },
  {
    q: "Is the Tigertest UGC-NET Paper 1 practice test free?",
    a: "Yes. Both mock tests and all nine drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "UGC NET Paper 1 mock test, UGC NET Paper 1 practice test, UGC NET free mock test 2026, NTA UGC NET Paper 1, teaching aptitude questions, research aptitude questions, UGC NET data interpretation, UGC NET logical reasoning, UGC NET higher education system, UGC NET JRF",
  alternates: {
    canonical: `${siteUrl}/ugc-net-paper-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ugc-net-paper-1-practice-test`,
    images: [{ url: shareImageUrl("ugcnet"), width: 1200, height: 630, alt: "Tigertest free UGC-NET Paper 1 mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ugcnet")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free UGC-NET Paper 1 Mock Test",
      description,
      url: `${siteUrl}/ugc-net-paper-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "216 original UGC-NET Paper 1 practice questions with explanations",
        "2 timed mock tests of 50 questions in 60 minutes, five from each unit",
        "9 drills: teaching, research, comprehension, communication, mathematical reasoning, logical reasoning, data interpretation, ICT and higher education, and people and environment",
        "Original reading passages and data tables with five questions each",
        "No negative marking, like the real UGC-NET",
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
        classFaqJsonLd("ugcnet"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Teaching Aptitude", weight: "5 questions" },
  { name: "Research Aptitude", weight: "5 questions" },
  { name: "Comprehension", weight: "5 questions" },
  { name: "Communication", weight: "5 questions" },
  { name: "Mathematical Reasoning and Aptitude", weight: "5 questions" },
  { name: "Logical Reasoning", weight: "5 questions" },
  { name: "Data Interpretation", weight: "5 questions" },
  { name: "Information and Communication Technology", weight: "5 questions" },
  { name: "People, Development and Environment", weight: "5 questions" },
  { name: "Higher Education System", weight: "5 questions" },
];

export default function UgcNetLandingPage() {
  return (
    <div data-theme="ugcnet" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free UGC-NET Paper 1 Mock Test
          </h1>
          <ExamLandingHero
            dashboardHref="/ugc-net-paper-1/dashboard"
            shortName="UGC-NET"
            subtitle="216 original questions across all ten units of Teaching and Research Aptitude. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ugcnet-mobile.png", desktop: "/landing/ugcnet-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ugcnet" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Nine Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Teaching aptitude, research aptitude, comprehension, communication, mathematical reasoning, logical reasoning, data interpretation, ICT with higher education, and people and environment. Questions you miss come back until you have mastered them, and every answer has an explanation.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Timed Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two full Paper 1 mocks of 50 questions in 60 minutes, five from each unit like the real paper, with a reading passage and a data table. Practice Test 2 is held out of the drills, so it measures readiness rather than memory.
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
                Built on the UGC Paper I Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The UGC NET Bureau&apos;s syllabus for the General Paper on Teaching and Research Aptitude has ten units and sets five questions from each, for 50 questions and 100 marks. Every Tigertest mock follows the same blueprint. Paper 2, on your own subject, is not included. Tigertest is not affiliated with the UGC or the National Testing Agency.
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
                src={getTigerAsset("ugcnet", 1)}
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
            How to Score Well in UGC-NET Paper 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Bank the passage and the table</h3>
              <p>
                The reading passage and the data table give ten questions that need no memorised facts, only care. Read the passage once for its main idea, then answer from the text. For the table, write down the totals you need before you look at the options.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the terms the paper loves</h3>
              <p>
                Teaching, research and communication questions test precise terms: memory, understanding and reflective levels; formative and summative evaluation; stratified and snowball sampling; Type I errors; proxemics and kinesics; agenda-setting and gatekeeping. Learn what each one means in a classroom or a study.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip Indian logic</h3>
              <p>
                Logical Reasoning covers the square of opposition, syllogisms and fallacies, and also the pramanas, vyapti and hetvabhasas of Indian logic. A few hours on which school accepts which pramana, and on paksha, sadhya and hetu, turn guesses into marks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                There is no negative marking, so never leave a question blank. Paper 1 is a third of your total marks in every subject, so a strong Paper 1 lifts your aggregate whatever your Paper 2 subject. Keep drilling your weakest unit until both mocks are comfortably above your goal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          UGC-NET Paper 1 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ugcnet" />
        </div>
      </div>

      <ExamRelatedTests examId="ugcnet" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for UGC-NET Paper 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 216 questions across all ten units of Paper 1.</p>
          <ExamLandingCTA dashboardHref="/ugc-net-paper-1/dashboard" />
        </div>
      </div>
    </div>
  );
}
