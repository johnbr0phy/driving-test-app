import "@/lib/v2/banks/projectplus";
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

const title = "Free CompTIA Project+ Practice Test 2026";
const metaDescription =
  "Free CompTIA Project+ (PK0-005) practice tests: 203 original questions on methodologies, change and risk, the project life cycle, tools and charts, and IT governance, all explained.";
const description =
  "Free CompTIA Project+ (PK0-005) practice tests with 203 original questions weighted to the exam objectives: projects, programs and portfolios, Waterfall and Agile methods, change control, risk and issue management, scheduling and earned value, communication, teams and procurement, the discovery, initiation, planning, execution and closing phases, Gantt, PERT and quality charts, and IT security, privacy, cloud models and operational change control.";

const faqs = [
  {
    q: "How many questions are on the CompTIA Project+ exam?",
    a: "CompTIA's certification page says a maximum of 90 questions, multiple choice and performance-based, in 90 minutes; the PK0-005 objectives document says a maximum of 95. The exam is offered in English, Japanese and Thai.",
  },
  {
    q: "What is the passing score for CompTIA Project+?",
    a: "You need 710 on a scale of 100 to 900. The score is scaled, so it is not a fixed percentage of questions. Aim for 80 percent or better on these practice tests before you book.",
  },
  {
    q: "What is on the Project+ exam?",
    a: "Four domains in the PK0-005 objectives: Project Management Concepts 33 percent, Project Life Cycle Phases 30 percent, Tools and Documentation 19 percent, and Basics of IT and Governance 18 percent. The exam covers both Waterfall and Agile methods.",
  },
  {
    q: "Does CompTIA Project+ expire?",
    a: "No. CompTIA says Project+ is good for life and does not need to be renewed. There are no prerequisites, though CompTIA recommends 6 to 12 months of hands-on experience managing projects in an IT environment.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 90 questions in 90 minutes with free navigation and flagging, the length and pace CompTIA gives on its certification page. Most are multiple choice; a few ordering, matching and number questions stand in for the performance-based items. The questions are original, not CompTIA's.",
  },
  {
    q: "Is the Tigertest CompTIA Project+ practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the methodologies, change and risk, scheduling and quality, and communication and teams drills are free; the initiation and planning, execution and closing, tools and charts, and IT governance drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CompTIA Project+ practice test, Project+ practice exam, PK0-005 practice test, free Project+ questions, CompTIA Project+ exam prep 2026, IT project management practice test",
  alternates: {
    canonical: `${siteUrl}/comptia-project-plus-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/comptia-project-plus-practice-test`,
    images: [{ url: shareImageUrl("projectplus"), width: 1200, height: 630, alt: "Tigertest free CompTIA Project+ practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("projectplus")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CompTIA Project+ Practice Tests",
      description,
      url: `${siteUrl}/comptia-project-plus-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("projectplus"),
      featureList: [
        "203 original CompTIA Project+ practice questions",
        "2 full 90-question practice tests in 90 minutes",
        "8 drills covering every exam domain",
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
        classFaqJsonLd("projectplus"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Project Management Concepts", weight: "33%" },
  { name: "Project Life Cycle Phases", weight: "30%" },
  { name: "Tools and Documentation", weight: "19%" },
  { name: "Basics of IT and Governance", weight: "18%" },
];

export default function ProjectPlusLandingPage() {
  return (
    <div data-theme="projectplus" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CompTIA Project+ Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/comptia-project-plus/dashboard"
            shortName="Project+"
            subtitle="203 questions weighted to the Project+ PK0-005 objectives, from change control to earned value. Free to start, no account needed."
            shots={{ mobile: "/landing/projectplus-mobile.png", desktop: "/landing/projectplus-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="projectplus" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Eight Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Methodologies; change, risk and issues; scheduling and quality; communication, teams and procurement; initiation and planning; execution and closing; tools and charts; and IT basics and governance. Questions you miss come back until you have mastered them.
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
                Two 90-question tests in 90 minutes with flagging and review, the length and pace CompTIA gives for the real exam. Questions mix every domain in the weights CompTIA publishes. Practice Test 2 is held out of the drills, so its questions are new to you.
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
                Built on the Project+ Exam Objectives
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CompTIA publishes the PK0-005 exam objectives with four domains and their weights. Every practice test follows them, from Scrum, Kanban and PRINCE2 to the change control process, RACI charts, PERT estimates, Pareto charts and cloud models.
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
                src={getTigerAsset("projectplus", 3)}
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
            How to Pass CompTIA Project+
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the change control steps in order</h3>
              <p>
                Project+ asks what happens next: log the request, assess its impact, get a decision from the right approvers, update the plan, then implement and validate. Know when a change goes to the change control board and why scope creep is a failure of this process.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know both Waterfall and Agile</h3>
              <p>
                The exam mixes plan-based and Agile questions. Learn when each fits, the Scrum roles and events, and what Kanban, XP, SAFe and PRINCE2 are known for, so a scenario points you to the right method.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice the few calculations</h3>
              <p>
                Cost variance (EV minus AC), schedule variance (EV minus PV), the PERT estimate (optimistic plus four times most likely plus pessimistic, over six), the critical path and team velocity are quick marks once practised.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by domain. Retake the drill you miss most until you clear 80 percent, then take Practice Test 2 cold. Project management concepts and the life cycle phases are almost two thirds of the exam, so give them the most time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CompTIA Project+ Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="projectplus" />
        </div>
      </div>

      <SampleQuestionsV2 examId="projectplus" />

      <ExamRelatedTests examId="projectplus" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CompTIA Project+?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 203 questions across all four domains.</p>
          <ExamLandingCTA dashboardHref="/comptia-project-plus/dashboard" />
        </div>
      </div>
    </div>
  );
}
