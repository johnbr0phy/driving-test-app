import "@/lib/v2/banks/pmiacp";
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
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free PMI-ACP Practice Test 2026 - Agile Certified Practitioner";
const metaDescription =
  "Free PMI-ACP practice exam: 204 original situational questions on PMI's current outline, with two 60-question mock exams at the real pace and an explanation on every answer.";
const description =
  "Free PMI Agile Certified Practitioner practice tests with 204 original questions written to PMI's PMI-ACP Examination Content Outline (November 2024, revised March 2026): the agile mindset, servant leadership and conflict, the product backlog and value, and delivery with flow metrics, risk and continuous improvement. Two mock exams of 60 questions in 90 minutes, half the real exam at its pace, plus seven drills, with an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are on the PMI-ACP exam?",
    a: "The PMI-ACP exam has 120 questions, of which 100 are scored and 20 are unscored pretest items placed at random. You have 3 hours, with one 10-minute break after question 60; once you start the break you cannot go back to the first 60. Questions are multiple choice, multiple response, drag-and-drop and exhibit items.",
  },
  {
    q: "What does the PMI-ACP exam cover?",
    a: "Four domains from PMI's PMI-ACP Examination Content Outline: Mindset (28 percent), Leadership (25 percent), Product (19 percent) and Delivery (28 percent). They cover the agile values and principles, team collaboration and psychological safety, empowering teams and managing conflict, refining the backlog and managing value, and agile metrics, risk, waste, continuous improvement and flow.",
  },
  {
    q: "What is the passing score for the PMI-ACP?",
    a: "PMI does not publish a passing score for the PMI-ACP. Here you get a percent score, with 70 percent shown as a readiness line; aim higher than that before you book.",
  },
  {
    q: "Is this practice test the same format as the real PMI-ACP exam?",
    a: "Each practice test is 60 questions in 90 minutes, one half of the real exam at the same pace, weighted by domain like the outline. Most questions are single answer; some ask you to choose two or to match items in a grid, standing in for the real exam's multiple-response and drag-and-drop items. The questions are original and written from the outline and the primary agile texts, not taken from any PMI practice exam. Practice Test 2 is held out of the drills, so it shows how you do on questions you have not seen.",
  },
  {
    q: "Is the Tigertest PMI-ACP practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and most of the drills are free; the last drill and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "PMI-ACP practice test, PMI-ACP practice exam, PMI ACP questions, agile certified practitioner practice test, PMI-ACP mock exam, PMI-ACP 2026, agile certification practice questions",
  alternates: {
    canonical: `${siteUrl}/pmi-acp-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/pmi-acp-practice-test`,
    images: [{ url: shareImageUrl("pmiacp"), width: 1200, height: 630, alt: "Tigertest free PMI-ACP practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pmiacp")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PMI-ACP Practice Test",
      description,
      url: `${siteUrl}/pmi-acp-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("pmiacp"),
      featureList: [
        "204 original PMI-ACP practice questions with explanations",
        "2 mock exams of 60 questions in 90 minutes, the real exam's pace",
        "7 drills covering every task in the four PMI-ACP domains",
        "Questions on flow metrics, burn charts, risk exposure and earned value",
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
        classFaqJsonLd("pmiacp"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Mindset", weight: "17 of 60" },
  { name: "Delivery", weight: "17 of 60" },
  { name: "Leadership", weight: "15 of 60" },
  { name: "Product", weight: "11 of 60" },
];

export default function PmiAcpLandingPage() {
  return (
    <div data-theme="pmiacp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PMI-ACP Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/pmi-acp/dashboard"
            shortName="PMI-ACP"
            subtitle="204 original situational questions and two 60-question mock exams on PMI's current PMI-ACP outline. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/pmiacp-mobile.png", desktop: "/landing/pmiacp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pmiacp" />

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
                Seven drills cover all four domains, from the Agile Manifesto and psychological safety to servant leadership, backlog refinement, flow metrics, risk spikes and WIP limits. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 60-question tests in 90 minutes, one half of the real exam at its pace, weighted by domain. Practice Test 2 is held out of the drills, so you meet its questions for the first time.
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
                Weighted Like the Real Exam
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                PMI&apos;s outline sets the share of questions from each domain: Mindset 28 percent, Leadership 25, Product 19 and Delivery 28. Every Tigertest practice test follows the same split across its 60 questions.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-right text-brand-dark font-semibold sm:whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("pmiacp", 3)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Study guide */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          How to Prepare for the PMI-ACP
        </h2>
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the outline&apos;s tasks and enablers</h3>
            <p>
              The outline lists every task in the four domains with examples of the work behind it, from fostering psychological safety to limiting work in progress at all levels. Many questions turn on knowing which task a situation belongs to and what the outline says to do.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the primary agile texts</h3>
            <p>
              The four values and twelve principles of the Agile Manifesto, the Scrum Guide&apos;s accountabilities and events, and the Kanban Guide&apos;s flow metrics (WIP, throughput, work item age and cycle time) come up again and again. Learn the exact distinctions, such as cycle time against work item age.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise situational judgment</h3>
            <p>
              Most PMI-ACP questions describe a team situation and ask what the practitioner should do. Several answers are often reasonable agile practices; the right one fits the specific situation, its timing and who owns the decision. Read every option before choosing.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Take a full mock exam under time</h3>
            <p>
              Ninety minutes for 60 questions is the real pace. Take Practice Test 2 last, after the drills, since its questions never appear in them.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            PMI-ACP Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
            <ExamClassFaq examId="pmiacp" />
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

      <SampleQuestionsV2 examId="pmiacp" />

      <ExamRelatedTests examId="pmiacp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start Practicing for the PMI-ACP</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 204 questions across all four domains.</p>
          <ExamLandingCTA dashboardHref="/pmi-acp/dashboard" />
        </div>
      </div>
    </div>
  );
}
