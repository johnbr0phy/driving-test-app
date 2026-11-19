import "@/lib/v2/banks/kcet";
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
const COUNT = 246;

const title = "Free KCET Mock Test 2027 - Karnataka CET PCM Practice";
const metaDescription = `Free KCET mock tests: ${COUNT} original Physics, Chemistry and Mathematics questions on the I and II PUC syllabus, with two timed mock tests at the real pace and an explanation on every answer.`;
const description = `Free KCET (Karnataka CET) practice for the engineering stream with ${COUNT} original questions on the I and II PUC syllabus: Physics (mechanics, matter, heat and waves, electricity and magnetism, optics and modern physics), Chemistry (physical, inorganic and organic) and Mathematics (algebra, calculus, trigonometry, vectors and geometry, statistics, probability and linear programming). Two timed mock tests at the real pace, eleven topic drills, and a worked explanation on every answer.`;

const faqs = [
  {
    q: "What is the KCET exam pattern?",
    a: "KCET has four papers, Physics, Chemistry, Mathematics and Biology, held over two days by the Karnataka Examinations Authority (KEA). Each paper has 60 multiple choice questions with four options, one mark each, in 80 minutes, answered on an OMR sheet. Engineering candidates take Physics, Chemistry and Mathematics; Biology is for farm science, veterinary, nursing and pharmacy courses.",
  },
  {
    q: "Is there negative marking in KCET?",
    a: "No. KEA's Information Bulletin says there is no negative evaluation for wrong answers, but a question with more than one answer marked scores nothing. Answer every question, and mark only one option for each.",
  },
  {
    q: "How is the KCET engineering rank worked out?",
    a: "KEA prepares the engineering rank list from your Physics, Chemistry and Mathematics marks in both the CET and the qualifying examination (II PUC or 12th), taken in equal proportion. So your board marks in those three subjects count as much as the CET itself.",
  },
  {
    q: "Which syllabus do these questions follow?",
    a: "KCET questions are based on the First and Second PUC syllabi of Karnataka's Department of Pre-University Education, which uses the NCERT textbooks for Physics, Chemistry and Mathematics. Tigertest questions are written on the chapters of the current NCERT books for Class XI and XII. KEA publishes the syllabus for each year's CET on its website, so check the current one there.",
  },
  {
    q: "How long are the Tigertest KCET mock tests?",
    a: "Each mock test is half the real length at the real pace: Physics, Chemistry and Mathematics, 30 questions in 40 minutes each, with a short break between papers. The score is the percent of marks, with the three subjects counting equally, as each real paper is 60 marks. Biology is not included.",
  },
  {
    q: "Is the Tigertest KCET mock test free?",
    a: "Yes. Both mock tests and all eleven topic drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "KCET mock test, KCET mock test free, KCET practice test, KCET 2027, Karnataka CET mock test, KCET physics questions, KCET chemistry questions, KCET maths mock test, UGCET, KEA CET, KCET online test",
  alternates: {
    canonical: `${siteUrl}/kcet-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/kcet-practice-test`,
    images: [{ url: shareImageUrl("kcet"), width: 1200, height: 630, alt: "Tigertest free KCET mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("kcet")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free KCET Mock Test",
      description,
      url: `${siteUrl}/kcet-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("kcet", "INR"),
      featureList: [
        `${COUNT} original KCET Physics, Chemistry and Mathematics questions with explanations`,
        "2 timed mock tests at the real pace: 30 questions in 40 minutes per subject",
        "11 topic drills across Physics, Chemistry and Mathematics",
        "Questions on the I and II PUC (NCERT) chapters",
        "Scored as percent of marks, the three subjects counting equally",
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
        classFaqJsonLd("kcet"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Physics", weight: "60 Qs, 80 min" },
  { name: "Chemistry", weight: "60 Qs, 80 min" },
  { name: "Mathematics", weight: "60 Qs, 80 min" },
  { name: "Biology (not modelled)", weight: "60 Qs, 80 min" },
];

export default function KcetLandingPage() {
  return (
    <div data-theme="kcet" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free KCET Mock Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/kcet/dashboard"
            shortName="KCET"
            subtitle={`${COUNT} original KCET questions on Physics, Chemistry and Mathematics. Tuned for mobile. No account needed.`}
            shots={{ mobile: "/landing/kcet-mobile.png", desktop: "/landing/kcet-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="kcet" />

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
                Eleven drills: four in Physics, three in Chemistry and four in Mathematics, each on a group of I and II PUC chapters. Questions you miss come back until you have mastered them.
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
                Two mock tests at the real exam&apos;s pace and half its length: Physics, Chemistry and Mathematics, 30 questions in 40 minutes each. Move freely and flag questions inside a paper. Mock Test 2 is held out of the drills, so it measures readiness.
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
                Built on the KCET Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each mock test follows KEA&apos;s pattern at half the length: every real paper has 60 one-mark questions with four options in 80 minutes and no negative marking. Questions are spread across the I and II PUC chapters of each subject. Engineering ranks use Physics, Chemistry and Mathematics, so Biology is not modelled.
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
                src={getTigerAsset("kcet", 3)}
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
            How to Prepare for KCET
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Work from the NCERT books</h3>
              <p>
                KCET questions come from the I and II PUC syllabus, which follows the NCERT textbooks. Read each chapter, learn its formulas and standard results, and work its examples before moving to harder material.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Build speed</h3>
              <p>
                Each paper gives 60 questions in 80 minutes, about 80 seconds each. Most questions test one idea or a short calculation, so the marks go to students who know the facts and formulas well enough to answer at once.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Answer every question, once</h3>
              <p>
                There is no negative marking, so a blank scores the same as a wrong answer. Fill in exactly one bubble per question: a question with two answers marked scores nothing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep up your board marks</h3>
              <p>
                The engineering rank uses your II PUC Physics, Chemistry and Mathematics marks as well as your CET marks, in equal proportion. Preparing for the board exam and the CET together pays twice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          KCET Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="kcet" />
        </div>
      </div>

      <SampleQuestionsV2 examId="kcet" />

      <ExamRelatedTests examId="kcet" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for KCET?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. {COUNT} questions across three papers.</p>
          <ExamLandingCTA dashboardHref="/kcet/dashboard" />
        </div>
      </div>
    </div>
  );
}
