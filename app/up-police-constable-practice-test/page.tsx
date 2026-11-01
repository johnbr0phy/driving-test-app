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

const title = "Free UP Police Constable Mock Test 2026 - Practice Test";
const metaDescription =
  "Free UP Police Constable mock tests: 232 original questions on General Knowledge, General Hindi, Numerical Ability and Reasoning, with two 100-question tests at the real pace and an explanation on every answer.";
const description =
  "Free UP Police Constable practice tests with 232 original questions on the written exam syllabus: General Knowledge (India, Uttar Pradesh, police and law), General Hindi (shabd gyan and vyakaran, in Hindi), Numerical and Mental Ability, and Mental Aptitude and Reasoning. Each mock test has 100 questions in 80 minutes, 25 per subject, at the real exam's pace, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the UP Police Constable written exam pattern?",
    a: "The written exam has 150 objective questions worth 2 marks each, 300 marks in all, in 2 hours: General Knowledge 38, General Hindi 37, Numerical and Mental Ability 38, and Mental Aptitude, IQ and Reasoning 37. Tigertest's mock tests have 100 questions in 80 minutes, 25 per subject, so you practise at the same 0.8 minute a question.",
  },
  {
    q: "Is there negative marking in the UP Police Constable exam?",
    a: "Guides disagree. Most report 0.5 mark off for each wrong answer, against 2 marks for a right one; others say 0.25 or no negative marking at all for the latest recruitment, and we could not confirm it from the board's own notice, so check your notification. Even at 0.5 off, a blind guess among four options gains a little on average, and ruling out one option makes a guess clearly worth taking. Tigertest scores percent correct without any deduction.",
  },
  {
    q: "When was the latest UP Police Constable exam?",
    a: "The Uttar Pradesh Police Recruitment and Promotion Board advertised 32,679 constable and equivalent posts on 31 December 2025 (Advt. 07/2025), and the written exam was held on 8, 9 and 10 June 2026. Check uppbpb.gov.in for the next notification and its exact pattern.",
  },
  {
    q: "Are the General Hindi questions in Hindi?",
    a: "Yes. As on the real paper, the General Hindi questions and options are in Hindi: synonyms, antonyms, one-word substitution, idioms and proverbs, sandhi, samas, gender, number, karak, alankar, ras and authors. The explanations are in English with the Hindi terms, so you can see why each answer is right.",
  },
  {
    q: "Are these UP Police previous year questions?",
    a: "No. Every question is original, written to the written exam syllabus, and none is copied from previous papers. General Knowledge covers static facts about India, Uttar Pradesh and the law, not current affairs, so read the news of the past year separately. Both mock tests and all eight drills are free, with no account needed.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "UP Police Constable mock test, UP Police mock test, UP Police Constable practice test free, UP Police Constable 2026, UPPRPB constable exam questions, UP Police GK questions, UP Police Hindi questions, UP Police reasoning practice",
  alternates: {
    canonical: `${siteUrl}/up-police-constable-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/up-police-constable-practice-test`,
    images: [{ url: shareImageUrl("uppolice"), width: 1200, height: 630, alt: "Tigertest free UP Police Constable mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("uppolice")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free UP Police Constable Mock Test",
      description,
      url: `${siteUrl}/up-police-constable-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "232 original UP Police Constable practice questions with explanations",
        "2 mock tests of 100 questions in 80 minutes, the real exam's pace, 25 per subject",
        "8 drills: India GK, Uttar Pradesh and law, Hindi shabd gyan, Hindi vyakaran, arithmetic, numbers and mensuration, verbal and logical reasoning",
        "General Hindi questions in Hindi, as on the real paper",
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
        classFaqJsonLd("uppolice"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "General Knowledge", weight: "38 questions" },
  { name: "General Hindi", weight: "37 questions" },
  { name: "Numerical and Mental Ability", weight: "38 questions" },
  { name: "Mental Aptitude, IQ and Reasoning", weight: "37 questions" },
];

export default function UpPoliceLandingPage() {
  return (
    <div data-theme="uppolice" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free UP Police Constable Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/up-police-constable/dashboard"
            shortName="UP Police"
            subtitle="232 original questions on GK, General Hindi, Numerical Ability and Reasoning. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/uppolice-mobile.png", desktop: "/landing/uppolice-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="uppolice" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills cover the whole written exam syllabus: India GK, Uttar Pradesh with police and law, Hindi shabd gyan, Hindi vyakaran, arithmetic, numbers and mensuration, verbal reasoning and logical reasoning. Questions you miss come back until you have mastered them.
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
                Two 100-question mock tests in 80 minutes, 25 per subject, at the real exam&apos;s pace of 0.8 minute a question (the real paper has 150 in 2 hours). Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the Written Exam Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Uttar Pradesh Police Recruitment and Promotion Board sets four subjects of almost equal weight, shown below for the full 150-question paper. Every Tigertest mock keeps that balance with 25 questions per subject. Reasoning questions are text only (no figure, Venn diagram or mirror-image items), and the Hindi passage and letter-writing questions are not modelled. Guides report that wrong answers may cost marks in the real exam, so practise deciding when a guess is worth it.
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
                src={getTigerAsset("uppolice", 1)}
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
            How to Prepare for the UP Police Constable Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Treat General Hindi as scoring marks</h3>
              <p>
                A quarter of the paper is General Hindi, and most of it is rules you can learn: synonyms and antonyms, one-word substitutions, idioms, sandhi and samas. Learn a few examples of each rule rather than long lists, and practise reading Hindi stems quickly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know Uttar Pradesh well</h3>
              <p>
                Expect questions on the state itself: its rivers, districts, crafts, festivals, history and symbols. Add basic police and law facts, such as the new criminal laws in force since 1 July 2024 and your rights on arrest, then read the past year&apos;s news for current affairs, which this bank does not cover.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the arithmetic shortcuts</h3>
              <p>
                Percentages, profit and discount, interest, averages, time and work and speed come up again and again. Know conversions such as km/h to m/s (multiply by 5/18) and formulas such as successive discounts, so that each question takes under a minute.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise at exam pace</h3>
              <p>
                With 150 questions in 2 hours you have under a minute each. Take a full 80-minute mock, see which subject ate your time, and drill it until the patterns in series, coding, blood relations and directions feel routine.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          UP Police Constable Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="uppolice" />
        </div>
      </div>

      <ExamRelatedTests examId="uppolice" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the UP Police Constable Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 232 questions across all four subjects.</p>
          <ExamLandingCTA dashboardHref="/up-police-constable/dashboard" />
        </div>
      </div>
    </div>
  );
}
