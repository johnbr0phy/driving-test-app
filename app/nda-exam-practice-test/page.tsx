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

const title = "Free NDA Mock Test 2026 - Maths and GAT Practice";
const metaDescription =
  "Free NDA mock tests: 236 original questions on Mathematics and the General Ability Test (English and General Knowledge), with two timed mock tests at the real pace and an explanation on every answer.";
const description =
  "Free NDA and NA exam practice with 236 original questions written to the UPSC syllabus: Paper I Mathematics (algebra, matrices, trigonometry, coordinate geometry, calculus, vectors, statistics and probability) and Paper II General Ability Test (English, physics, chemistry and general science, history and polity, and geography). Two timed mock tests at the real pace, nine topic drills, and a worked explanation on every answer.";

const faqs = [
  {
    q: "What is the NDA exam pattern?",
    a: "The NDA and NA written exam, set by the Union Public Service Commission, has two objective papers of 2.5 hours each. Paper I, Mathematics, has 120 questions for 300 marks. Paper II, the General Ability Test, has 150 questions for 600 marks: Part A English (200 marks) and Part B General Knowledge (400 marks) covering physics, chemistry, general science, history and the freedom movement, geography and current events. The written total is 900 marks, and those who qualify go on to the 900-mark SSB interview.",
  },
  {
    q: "Is there negative marking in the NDA exam?",
    a: "Yes. A third of a question's marks is deducted for each wrong answer in both papers, so a wrong answer costs about 0.83 marks in Mathematics and about 1.33 marks in the General Ability Test, and an unanswered question scores zero. Tigertest mock tests score percent correct and do not deduct marks, so note which answers were guesses.",
  },
  {
    q: "How long are the Tigertest NDA mock tests?",
    a: "Each mock test is about 40 percent of the real length at the real pace: Mathematics has 48 questions in 60 minutes (75 seconds a question, as in the real 120 in 150 minutes) and the General Ability Test has 60 questions in 60 minutes (20 English and 40 General Knowledge, the real one-to-two split). A full mock takes 2 hours.",
  },
  {
    q: "Are these the same questions as the real NDA exam?",
    a: "No. These are original practice questions written to the NDA and NA syllabus and pattern, not questions copied from past papers. The General Knowledge questions cover static topics such as physics, chemistry, biology, history, the Constitution and geography; current events change with every sitting, so study them separately from a recent source.",
  },
  {
    q: "Is the Tigertest NDA mock test free?",
    a: "Yes. Both mock tests and all nine topic drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "NDA mock test, NDA mock test free, NDA practice test, NDA exam 2026, NDA maths mock test, NDA GAT mock test, NDA English questions, NDA GK questions, UPSC NDA NA practice, NDA online test",
  alternates: {
    canonical: `${siteUrl}/nda-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nda-exam-practice-test`,
    images: [{ url: shareImageUrl("nda"), width: 1200, height: 630, alt: "Tigertest free NDA mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nda")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NDA Mock Test",
      description,
      url: `${siteUrl}/nda-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "236 original NDA and NA practice questions with explanations",
        "2 timed mock tests at the real pace: Mathematics 48 in 60 minutes, General Ability Test 60 in 60 minutes",
        "9 topic drills across mathematics, English and General Knowledge",
        "Reading comprehension passages",
        "Negative marking explained, with percent-correct scoring",
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
        classFaqJsonLd("nda"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Paper I: Mathematics", weight: "120 Qs, 300 marks" },
  { name: "Paper II, Part A: English", weight: "50 Qs, 200 marks" },
  { name: "Paper II, Part B: General Knowledge", weight: "100 Qs, 400 marks" },
];

export default function NdaLandingPage() {
  return (
    <div data-theme="nda" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NDA Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nda/dashboard"
            shortName="NDA"
            subtitle="236 original NDA questions on Mathematics, English and General Knowledge. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nda-mobile.png", desktop: "/landing/nda-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nda" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Topic Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nine drills: algebra and matrices, trigonometry and geometry, calculus and vectors, statistics and probability, English, physics, chemistry and general science, history and polity, and geography. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two mock tests in the real order: Mathematics, 48 questions in 60 minutes, then the General Ability Test, 60 questions in 60 minutes, at the real exam&apos;s pace and about 40 percent of its length. Move freely and flag questions inside a paper. Mock Test 2 is held out of the drills, so it measures readiness.
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
                Built on the NDA Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test follows the UPSC NDA and NA pattern at a shorter length: the real Mathematics paper has 120 questions for 300 marks and the General Ability Test 150 questions for 600 marks, 2.5 hours each, with a third of a question&apos;s marks taken off for every wrong answer. Tigertest scores percent correct. General Knowledge here covers physics, chemistry and general science, history and polity, and geography; current events are left out because they change with every sitting. The SSB interview that follows is not part of this practice.
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
                src={getTigerAsset("nda", 1)}
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
            How to Prepare for the NDA Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Build speed in Mathematics</h3>
              <p>
                The Mathematics paper gives you 75 seconds a question with no calculator. Learn the standard results (sum and product of roots, ⁿCᵣ, sin(A + B), standard limits and integrals) so that most questions take one or two lines, and skip any question that needs a long calculation on the first pass.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Guess only with a reason</h3>
              <p>
                A wrong answer costs a third of the question&apos;s marks. A blind guess among four options gains nothing on average, but once you can rule out one or two options the guess is worth taking. Accuracy matters more than the number of questions attempted.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not neglect English</h3>
              <p>
                Part A English carries 200 of the 900 written marks, as much as two-thirds of the Mathematics paper. Spotting errors, sentence improvement, synonyms, antonyms and reading passages reward steady practice, and Tigertest&apos;s explanations name the rule behind each answer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Build static GK, then add current events</h3>
              <p>
                Physics carries the largest share of General Knowledge, followed by history and geography. These topics come from school science and social science and do not go out of date. Master them here, then add the last few months of current events from a recent source, since these change with each sitting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NDA Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="nda" />
        </div>
      </div>

      <ExamRelatedTests examId="nda" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the NDA Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 236 questions across both papers.</p>
          <ExamLandingCTA dashboardHref="/nda/dashboard" />
        </div>
      </div>
    </div>
  );
}
