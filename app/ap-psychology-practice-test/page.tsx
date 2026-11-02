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

const title = "Free AP Psychology Practice Test 2027 - Multiple Choice";
const metaDescription =
  "Free AP Psychology practice tests for the redesigned exam: 75 multiple-choice questions in 90 minutes, all five units, 200 original questions with explanations.";
const description =
  "Free AP Psychology practice tests built like the multiple-choice section of the redesigned AP Psychology Exam: 75 questions with four choices in 90 minutes, covering all five units of the course framework plus research methods and data interpretation. 200 original questions, each with an explanation, including study summaries and data tables that several questions share, and six drills that bring missed questions back until you master them.";

const faqs = [
  {
    q: "What is the format of the AP Psychology Exam?",
    a: "The AP Psychology Exam is fully digital and lasts 2 hours 40 minutes. Section I has 75 multiple-choice questions in 90 minutes and counts for 66.7% of the score. Section II has 2 free-response questions in 70 minutes and counts for 33.3%: the Article Analysis Question, about one summarized research study, and the Evidence-Based Question, which uses three sources.",
  },
  {
    q: "What units are on the AP Psychology Exam?",
    a: "The course has five units, each 15% to 25% of the multiple-choice section: Biological Bases of Behavior, Cognition, Development and Learning, Social Psychology and Personality, and Mental and Physical Health. Research methods are tested throughout: in the multiple-choice section, Concept Application is 65%, Research Methods and Design 25% and Data Interpretation 10%.",
  },
  {
    q: "How many answer choices do AP Psychology multiple-choice questions have?",
    a: "Four. Since the 2024-25 redesign each multiple-choice question has four answer choices instead of five, and the section has 75 questions instead of 100. No points are taken off for wrong answers, so answer every question. Every Tigertest question has four choices too.",
  },
  {
    q: "How is the AP Psychology Exam scored?",
    a: "AP scores run from 1 to 5. The College Board combines the multiple-choice and free-response sections into a composite and converts it to a score of 1 to 5 each year; it does not publish a fixed percentage for each score. Tigertest reports the percent you got right on a full multiple-choice section, and its goals are its own targets, not official cutoffs.",
  },
  {
    q: "Does the Tigertest AP Psychology practice test include the free-response questions?",
    a: "No. Tigertest models the 75-question multiple-choice section only. The Article Analysis and Evidence-Based questions are written responses scored by readers, so practice them with your teacher. The research methods and data drill does help with them: it covers variables, design, ethics and reading study results. The questions are original, written to the College Board course framework, and Tigertest is not affiliated with the College Board.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AP Psychology practice test, free AP Psychology practice test, AP Psych practice test, AP Psychology multiple choice, AP Psychology practice questions, AP Psych MCQ, AP Psychology exam 2027, AP Psychology units, AP Psychology review",
  alternates: {
    canonical: `${siteUrl}/ap-psychology-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ap-psychology-practice-test`,
    images: [{ url: shareImageUrl("appsych"), width: 1200, height: 630, alt: "Tigertest free AP Psychology practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("appsych")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AP Psychology Practice Test",
      description,
      url: `${siteUrl}/ap-psychology-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 original AP Psychology practice questions with explanations",
        "2 full multiple-choice sections: 75 questions in 90 minutes, four choices each",
        "All five units of the redesigned course framework",
        "Research methods and data questions, with shared study summaries and data tables",
        "6 drills: one per unit plus research methods and data",
        "Score by unit after every practice test",
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
        classFaqJsonLd("appsych"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Biological Bases of Behavior", weight: "15-25%" },
  { name: "Cognition", weight: "15-25%" },
  { name: "Development and Learning", weight: "15-25%" },
  { name: "Social Psychology and Personality", weight: "15-25%" },
  { name: "Mental and Physical Health", weight: "15-25%" },
];

export default function ApPsychologyLandingPage() {
  return (
    <div data-theme="appsych" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AP Psychology Practice Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/ap-psychology/dashboard"
            shortName="AP Psychology"
            subtitle="200 original multiple-choice questions for the redesigned exam, all five units. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/appsych-mobile.png", desktop: "/landing/appsych-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="appsych" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Unit</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six drills: one for each of the five units and one for research methods and data. Questions you miss come back until you have mastered them, so a weak unit gets the practice it needs.
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
                Two full multiple-choice sections: 75 questions in 90 minutes, on the real clock, with a score by unit at the end. Practice Test 2 is held out of the drills, so it measures readiness. The free-response section is not included.
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
                Built on the Redesigned Course
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each unit is 15% to 25% of the real multiple-choice section, and research methods and data interpretation run through all of them. Every Tigertest practice test has 11 questions from each unit and 20 on research methods and data, some sharing a study summary or data table.
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
                src={getTigerAsset("appsych", 1)}
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
            How to Raise Your AP Psychology Score
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the pairs that get confused</h3>
              <p>
                Many questions turn on two terms that sound alike: negative reinforcement and punishment, proactive and retroactive interference, assimilation and accommodation, the actor-observer bias and the fundamental attribution error. Learn each pair together, with one example of each.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Apply, do not just define</h3>
              <p>
                Most questions describe a person or a study and ask which concept it shows. Practice naming the concept from a scenario, then explain why the closest wrong answer does not fit.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Master research methods</h3>
              <p>
                About a third of the multiple-choice section is research design and data. Know independent and dependent variables, random assignment and random sampling, correlation versus causation, the mean, median and standard deviation, and the ethics rules. They also carry the free-response questions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                Wrong answers cost nothing, so never leave a question blank. With 75 questions in 90 minutes you have a little over a minute each: flag the slow ones and come back. Tigertest shows your score by unit, so drill your weakest unit before each full test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AP Psychology Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="appsych" />
        </div>
      </div>

      <ExamRelatedTests examId="appsych" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for AP Psychology?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all five units.</p>
          <ExamLandingCTA dashboardHref="/ap-psychology/dashboard" />
        </div>
      </div>
    </div>
  );
}
