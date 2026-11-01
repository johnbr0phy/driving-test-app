import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free JEE Main Mock Test 2027 - Maths, Physics, Chemistry";
const metaDescription =
  "Free JEE Main mock tests: 204 original questions on Mathematics, Physics and Chemistry, with two full 75-question mock tests in 3 hours, numerical value questions and an explanation on every answer.";
const description =
  "Free JEE (Main) Paper 1 practice with 204 original questions written to the NTA syllabus for 2027: Mathematics (algebra, calculus, coordinate geometry, vectors, trigonometry, statistics and probability), Physics (mechanics, electricity and magnetism, heat, waves, optics and modern physics) and Chemistry (physical, inorganic and organic). Two full mock tests of 75 questions in 3 hours with Section A multiple choice and Section B numerical value questions, nine chapter drills, and a worked explanation on every answer.";

const faqs = [
  {
    q: "What is the JEE Main Paper 1 exam pattern?",
    a: "JEE (Main) Paper 1, for B.E. and B.Tech. admissions, is a 3-hour computer-based test set by the National Testing Agency. It has 75 questions for 300 marks: 25 each in Mathematics, Physics and Chemistry. In each subject Section A has 20 multiple-choice questions and Section B has 5 questions whose answer is a numerical value, entered as an integer on an on-screen keypad. All 75 questions are compulsory. For 2027 the exam is held in two sessions, January and April 2027, and the better of the two NTA scores counts.",
  },
  {
    q: "Is there negative marking in JEE Main?",
    a: "Yes. Every question gives 4 marks for a correct answer and takes 1 mark off for a wrong one, in both Section A and Section B; an unanswered question scores zero. The 2027 Information Bulletin confirms negative marking for the numerical value questions too. Tigertest mock tests score percent correct and do not deduct marks, so note which answers were guesses.",
  },
  {
    q: "How long are the Tigertest JEE Main mock tests?",
    a: "Each mock test is the full paper: 75 questions in 3 hours, 25 per subject (20 multiple choice and 5 numerical value). Each subject is its own 60-minute section, in the order Mathematics, Physics, Chemistry. The real paper runs on one 3-hour clock and lets you move between subjects, so treat the 60 minutes per subject as a pacing guide.",
  },
  {
    q: "How do the numerical value questions work here?",
    a: "As in the real Section B, you type a whole number on a keypad instead of choosing an option. Every answer in this bank is a non-negative integer, worked out exactly, and the explanation shows the steps. In the real exam the bulletin asks for the answer rounded to the nearest integer.",
  },
  {
    q: "Is the Tigertest JEE Main mock test free?",
    a: "Yes. Both mock tests and all nine chapter drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "JEE Main mock test, JEE Main mock test free, JEE Main practice test, JEE Main 2027, JEE Main Paper 1 mock test, JEE Main numerical value questions, JEE Main physics questions, JEE Main chemistry questions, JEE Main maths questions, NTA JEE Main online test",
  alternates: {
    canonical: `${siteUrl}/jee-main-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/jee-main-practice-test`,
    images: [{ url: shareImageUrl("jeemain"), width: 1200, height: 630, alt: "Tigertest free JEE Main mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("jeemain")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free JEE Main Mock Test",
      description,
      url: `${siteUrl}/jee-main-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "204 original JEE Main Paper 1 practice questions with explanations",
        "2 full mock tests: 75 questions in 3 hours, 25 per subject",
        "Section B numerical value questions with a number keypad",
        "9 chapter drills across Mathematics, Physics and Chemistry",
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
        classFaqJsonLd("jeemain"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Mathematics", weight: "20 MCQ + 5 numerical, 100 marks" },
  { name: "Physics", weight: "20 MCQ + 5 numerical, 100 marks" },
  { name: "Chemistry", weight: "20 MCQ + 5 numerical, 100 marks" },
];

export default function JeeMainLandingPage() {
  return (
    <div data-theme="jeemain" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free JEE Main Mock Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/jee-main/dashboard"
            shortName="JEE Main"
            subtitle="204 original JEE Main questions on Mathematics, Physics and Chemistry, with numerical value questions. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/jeemain-mobile.png", desktop: "/landing/jeemain-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="jeemain" />

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
                Nine drills, three per subject: algebra, calculus, and coordinate geometry with vectors and probability; mechanics, electricity and magnetism, and heat, optics and modern physics; physical, inorganic and organic chemistry. Questions you miss come back until you have mastered them.
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
                Two full mock tests of 75 questions in 3 hours: Mathematics, Physics and Chemistry, 60 minutes each, with 20 multiple-choice questions and 5 numerical value questions per subject. Move freely and flag questions inside a subject. Mock Test 2 is held out of the drills, so it measures readiness.
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
                Built on the JEE Main Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test follows the JEE (Main) 2027 Information Bulletin: 75 questions for 300 marks in 3 hours, the three subjects weighted equally, each with 20 multiple-choice questions in Section A and 5 numerical value questions in Section B. A correct answer earns 4 marks and a wrong one costs 1, in both sections. Tigertest scores percent correct and does not deduct marks. NTA converts raw marks to NTA scores (percentiles) for each session, so there is no fixed pass mark. Tigertest is not affiliated with the National Testing Agency.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("jeemain", 1)}
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
            How to Prepare for JEE Main
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Pace yourself at about 2 minutes 24 seconds a question</h3>
              <p>
                75 questions in 180 minutes is under two and a half minutes each, with no calculator. Make a first pass through every subject answering what you can do quickly, then come back to the long calculations. Do not let one hard integral eat the time for five easier questions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Treat Section B with care</h3>
              <p>
                The 5 numerical value questions in each subject have no options to check against, and the 2027 bulletin takes a mark off for a wrong answer there too. Work them carefully, check units and powers of ten, and round to the nearest integer as the bulletin asks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Guess only with a reason</h3>
              <p>
                With +4 for a right answer and -1 for a wrong one, a blind guess among four options gains a quarter of a mark on average, but once you can rule out one or two options the guess is clearly worth taking. Accuracy matters as much as speed: ties are broken partly on the ratio of wrong to right answers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep all three subjects strong</h3>
              <p>
                The subjects carry equal marks, and Mathematics, then Physics, then Chemistry decide ties. Chemistry questions are often the quickest to answer, so learn the NCERT facts of inorganic chemistry and the named organic reactions well: they buy time for Mathematics and Physics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          JEE Main Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="jeemain" />
        </div>
      </div>

      <ExamRelatedTests examId="jeemain" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for JEE Main?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 204 questions across all three subjects.</p>
          <ExamLandingCTA dashboardHref="/jee-main/dashboard" />
        </div>
      </div>
    </div>
  );
}
