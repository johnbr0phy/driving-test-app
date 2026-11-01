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

const title = "Free NEET Mock Test 2026 - Physics, Chemistry, Biology";
const metaDescription =
  "Free NEET mock tests: 234 original Physics, Chemistry and Biology questions on the NCERT syllabus, with two timed mock tests at the real pace and an explanation on every answer.";
const description =
  "Free NEET (UG) practice with 234 original questions written to the NMC syllabus for NEET (UG) 2026: Physics (mechanics, heat and waves; electricity, optics and modern physics), Chemistry (physical, inorganic and organic) and Biology (diversity, cells and plant physiology; reproduction, genetics and evolution; human welfare, biotechnology and ecology; human physiology). Two timed mock tests at the real pace, nine chapter drills, and a worked explanation on every answer.";

const faqs = [
  {
    q: "What is the NEET exam pattern?",
    a: "Per the NEET (UG) 2026 information bulletin, NEET is one pen-and-paper paper set by the National Testing Agency with 180 compulsory multiple-choice questions in 180 minutes: Physics 45, Chemistry 45 and Biology (Botany and Zoology) 90, for 720 marks. Each question has four options and one correct answer. It is offered in 13 languages. The 2026 paper was held on 21 June 2026 in a 2:00 to 5:15 PM window, which included time for examination formalities.",
  },
  {
    q: "Is there negative marking in NEET?",
    a: "Yes. A correct answer earns 4 marks, each wrong answer loses 1 mark, and an unanswered question scores zero. A blind guess among four options is worth about zero on average, but once you can rule out an option a guess gains marks. Tigertest mock tests score percent correct and do not deduct marks, so note which answers were guesses.",
  },
  {
    q: "How long are the Tigertest NEET mock tests?",
    a: "Each mock test has 100 questions, a little over half the real length, at about a minute a question like the real 180 in 180 minutes: Physics 25 in 30 minutes, Chemistry 25 in 25 minutes and Biology 50 in 45 minutes, the real one-one-two split. The real paper has a single clock with no time limit per subject; the subject times here are Tigertest's, to help you practise pacing.",
  },
  {
    q: "Are these the same questions as the real NEET?",
    a: "No. These are original practice questions written to the NCERT class 11 and 12 topics in the NMC syllabus for NEET (UG) 2026, not questions copied from past papers. They include the statement and assertion-reason formats used in recent papers. Tigertest is not affiliated with the National Testing Agency or the National Medical Commission.",
  },
  {
    q: "Is the Tigertest NEET mock test free?",
    a: "Yes. Both mock tests and all nine chapter drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "NEET mock test, NEET mock test free, NEET practice test, NEET 2026, NEET physics questions, NEET chemistry questions, NEET biology questions, NEET UG online test, NCERT NEET practice, NEET MCQ",
  alternates: {
    canonical: `${siteUrl}/neet-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/neet-practice-test`,
    images: [{ url: shareImageUrl("neet"), width: 1200, height: 630, alt: "Tigertest free NEET mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("neet")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NEET Mock Test",
      description,
      url: `${siteUrl}/neet-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "234 original NEET (UG) practice questions with explanations",
        "2 timed mock tests of 100 questions: Physics 25, Chemistry 25, Biology 50",
        "9 chapter drills across Physics, Chemistry and Biology",
        "Statement and assertion-reason questions like recent papers",
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
        classFaqJsonLd("neet"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Physics", weight: "45 Qs, 180 marks" },
  { name: "Chemistry", weight: "45 Qs, 180 marks" },
  { name: "Biology (Botany and Zoology)", weight: "90 Qs, 360 marks" },
];

export default function NeetLandingPage() {
  return (
    <div data-theme="neet" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NEET Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/neet/dashboard"
            shortName="NEET"
            subtitle="234 original NEET questions on Physics, Chemistry and Biology. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/neet-mobile.png", desktop: "/landing/neet-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="neet" />

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
                Nine drills: two in Physics, three in Chemistry (physical, inorganic and organic) and four in Biology, each a group of NCERT chapters. Questions you miss come back until you have mastered them.
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
                Two mock tests of 100 questions in the real order: Physics 25 in 30 minutes, Chemistry 25 in 25 minutes, then Biology 50 in 45 minutes, about a minute a question like the real paper. Move freely and flag questions inside a subject. Mock Test 2 is held out of the drills, so it measures readiness.
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
                Built on the NEET Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test follows the NEET (UG) 2026 pattern at a shorter length: the real paper has 180 compulsory questions for 720 marks in 3 hours, with 4 marks for each right answer and 1 taken off for each wrong one. Tigertest keeps the same one-one-two split of Physics, Chemistry and Biology and scores percent correct. Questions follow the NCERT class 11 and 12 chapters in the NMC syllabus, including statement and assertion-reason items.
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
                src={getTigerAsset("neet", 1)}
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
            How to Prepare for NEET
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Make NCERT your base</h3>
              <p>
                The syllabus follows the NCERT class 11 and 12 books, and Biology questions often turn on a single line of NCERT text: an example, an exception or a number. Read each chapter closely before you drill it, then use the explanations here to check what you missed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Guess only with a reason</h3>
              <p>
                A wrong answer costs 1 mark and a right one earns 4. A blind guess among four options gains nothing on average, but once you can rule out one or two options the guess is worth taking. Accuracy matters more than the number of questions attempted.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Bank time on Biology</h3>
              <p>
                Biology carries half the marks, and most of its questions take well under a minute. Many candidates answer Biology first and save the extra time for Physics calculations; there is no clock per subject in the real paper, so practise the order that works for you.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Know the formulas and exceptions</h3>
              <p>
                Physics and physical chemistry reward a short list of formulas you can use without thinking (½CV², λD/d, ΔG = ΔH - TΔS, t½ for first order), and inorganic chemistry rewards the exceptions to each trend, such as nitrogen&apos;s ionisation enthalpy or fluorine&apos;s electron gain enthalpy. Keep a page of each and review it weekly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NEET Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="neet" />
        </div>
      </div>

      <ExamRelatedTests examId="neet" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for NEET?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 234 questions across Physics, Chemistry and Biology.</p>
          <ExamLandingCTA dashboardHref="/neet/dashboard" />
        </div>
      </div>
    </div>
  );
}
