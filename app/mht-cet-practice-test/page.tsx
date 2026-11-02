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

const title = "Free MHT-CET Mock Test 2027 - PCM Practice";
const metaDescription =
  "Free MHT-CET PCM mock tests: 214 original Physics, Chemistry and Mathematics questions on the Maharashtra Std XI and XII syllabus, with two timed mock tests at the real pace and an explanation on every answer.";
const description =
  "Free MHT-CET practice for the PCM group with 214 original questions on the Maharashtra State Board Std XI and XII syllabus: Physics (mechanics and heat, waves, optics and modern physics, electricity and magnetism), Chemistry (physical, inorganic and organic) and Mathematics (algebra, trigonometry, vectors and geometry, calculus and probability). Two timed mock tests at the real pace, eight topic drills, and a worked explanation on every answer.";

const faqs = [
  {
    q: "What is the MHT-CET exam pattern for PCM?",
    a: "The PCM group sits two papers of multiple choice questions, each worth 100 marks in 90 minutes. Paper I, Mathematics, has 50 questions at 2 marks each. Paper II, Physics and Chemistry, has 50 questions in each subject at 1 mark each. That makes 150 questions and 200 marks in 3 hours. In each subject about 20 percent of the questions come from the Std XI syllabus and 80 percent from Std XII, and the State CET Cell says the difficulty is at par with JEE (Main).",
  },
  {
    q: "Is there negative marking in MHT-CET?",
    a: "No. The State CET Cell's marking scheme for MHT-CET 2026 says there is no negative marking, so an unanswered question and a wrong answer both score zero. Answer every question, and guess when you run short of time.",
  },
  {
    q: "How long are the Tigertest MHT-CET mock tests?",
    a: "Each mock test is half the real length at the real pace: Physics and Chemistry, 50 questions in 45 minutes (25 in each subject), then Mathematics, 25 questions in 45 minutes. A full mock takes 90 minutes. The score is the percent of marks, with Mathematics worth half, just as the real Mathematics paper is 100 of the 200 marks.",
  },
  {
    q: "Which syllabus do these questions follow?",
    a: "The questions follow the Maharashtra State Board (SCERT) syllabus that the State CET Cell names for MHT-CET: the whole Std XII syllabus in Physics, Chemistry and Mathematics, plus the Std XI chapters it lists, such as vectors, motion in a plane and gravitation in Physics, atomic structure, bonding and hydrocarbons in Chemistry, and complex numbers, circles, conics, limits and probability in Mathematics. The CET Cell publishes the syllabus for each year's exam, so check the current one on its website.",
  },
  {
    q: "Is the Tigertest MHT-CET mock test free?",
    a: "Yes. Both mock tests and all eight topic drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "MHT-CET mock test, MHT CET mock test free, MHT CET practice test, MHT CET 2027, MHT CET PCM mock test, MHT CET physics questions, MHT CET chemistry questions, MHT CET maths mock test, Maharashtra CET engineering, MHT CET online test",
  alternates: {
    canonical: `${siteUrl}/mht-cet-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/mht-cet-practice-test`,
    images: [{ url: shareImageUrl("mhtcet"), width: 1200, height: 630, alt: "Tigertest free MHT-CET mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("mhtcet")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free MHT-CET Mock Test",
      description,
      url: `${siteUrl}/mht-cet-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "214 original MHT-CET PCM practice questions with explanations",
        "2 timed mock tests at the real pace: Physics and Chemistry 50 in 45 minutes, Mathematics 25 in 45 minutes",
        "8 topic drills across Physics, Chemistry and Mathematics",
        "Std XI and Std XII questions in the real 20 to 80 balance",
        "Scored as percent of marks, with Mathematics worth half",
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
        classFaqJsonLd("mhtcet"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Paper I: Mathematics", weight: "50 Qs, 100 marks" },
  { name: "Paper II: Physics", weight: "50 Qs, 50 marks" },
  { name: "Paper II: Chemistry", weight: "50 Qs, 50 marks" },
];

export default function MhtCetLandingPage() {
  return (
    <div data-theme="mhtcet" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free MHT-CET Mock Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/mht-cet/dashboard"
            shortName="MHT-CET"
            subtitle="214 original MHT-CET questions on Physics, Chemistry and Mathematics. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/mhtcet-mobile.png", desktop: "/landing/mhtcet-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="mhtcet" />

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
                Eight drills: mechanics and heat, waves, optics and modern physics, electricity and magnetism, physical, inorganic and organic chemistry, algebra, vectors and geometry, and calculus and probability. Questions you miss come back until you have mastered them.
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
                Two mock tests at the real exam&apos;s pace and half its length: Physics and Chemistry, 50 questions in 45 minutes, then Mathematics, 25 questions in 45 minutes. Move freely and flag questions inside a paper. Mock Test 2 is held out of the drills, so it measures readiness.
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
                Built on the MHT-CET Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test follows the State CET Cell&apos;s PCM pattern at half the length: the real Mathematics paper has 50 questions at 2 marks each and the Physics and Chemistry paper 100 questions at 1 mark each, 90 minutes per paper and no negative marking. In each subject about a fifth of the questions come from Std XI and the rest from Std XII, and the mock tests keep that balance. The CET Cell reports results as percentiles, so Tigertest shows the percent of marks as a readiness line.
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
                src={getTigerAsset("mhtcet", 1)}
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
            How to Prepare for MHT-CET
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Give Mathematics its due</h3>
              <p>
                Each Mathematics question is worth 2 marks, so the 50 Mathematics questions carry as much as the 100 Physics and Chemistry questions together. Calculus (derivatives, integrals, differential equations) and the Std XII algebra chapters (matrices, vectors, three-dimensional geometry) are worth steady practice.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Answer every question</h3>
              <p>
                There is no negative marking, so a blank scores the same as a wrong answer. On the first pass answer what you can quickly, mark the rest, and make sure every question has an answer before each paper closes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Keep up the pace in Physics and Chemistry</h3>
              <p>
                Paper II gives 100 questions in 90 minutes, under a minute each. Learn the formulas and standard results so that most numericals take one line, and keep the long ones for the end. Chemistry facts such as reagents, named reactions and shapes of molecules are quick marks once learned.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not skip Std XI</h3>
              <p>
                About a fifth of the questions come from the Std XI chapters that the CET Cell lists. They are often the basics that Std XII builds on, such as vectors, gravitation, atomic structure, chemical bonding, complex numbers and limits, so revising them pays twice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          MHT-CET Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="mhtcet" />
        </div>
      </div>

      <ExamRelatedTests examId="mhtcet" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for MHT-CET?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 214 questions across both papers.</p>
          <ExamLandingCTA dashboardHref="/mht-cet/dashboard" />
        </div>
      </div>
    </div>
  );
}
