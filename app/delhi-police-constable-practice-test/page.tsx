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

const title = "Free Delhi Police Constable Mock Test 2026 - CBE Practice";
const metaDescription =
  "Free Delhi Police Constable mock tests: 234 original questions on general knowledge, reasoning, numerical ability and computer, with two full 100-question, 90-minute tests and an explanation on every answer.";
const description =
  "Free Delhi Police Constable (Executive) practice with 234 original questions written to the CBE syllabus in the Staff Selection Commission notice: General Knowledge 50, Reasoning 25, Numerical Ability 15 and Computer Fundamentals 10 per mock test. Two full mock tests of 100 questions in 90 minutes, eight topic drills, and a worked explanation on every answer.";

const faqs = [
  {
    q: "What is the Delhi Police Constable exam pattern?",
    a: "The Computer Based Examination (CBE), conducted by the Staff Selection Commission for Delhi Police, is one objective paper of 100 multiple-choice questions for 100 marks in 90 minutes: Part A General Knowledge and Current Affairs 50, Part B Reasoning 25, Part C Numerical Ability 15, and Part D Computer Fundamentals, MS Excel, MS Word, Communication, Internet, WWW and Web Browsers 10. There is no separate time limit for each part. The paper is at matriculation level and is set in English and Hindi. Shortlisted candidates then take the Physical Endurance and Measurement Test (PE&MT) and document verification with Delhi Police in Delhi, and a medical examination.",
  },
  {
    q: "Is there negative marking in the Delhi Police Constable CBE?",
    a: "Yes. Each right answer earns 1 mark and each wrong answer costs 0.25 marks; an unanswered question scores zero. A blind guess among four options gains only about 0.06 marks on average, but once you can rule out one option a guess gains about 0.17. Tigertest mock tests score percent correct and do not deduct marks, so keep count of the questions you guessed.",
  },
  {
    q: "What are the cut-off marks for the Delhi Police Constable CBE?",
    a: "The 2025 notice makes candidates eligible for the PE&MT if they score at least 35 marks (UR), 30 marks (SC, ST, OBC and EWS) or 25 marks (ex-servicemen) out of 100 after normalisation. From those, about 12 times the number of vacancies are shortlisted category-wise on merit, and the final select list follows the CBE marks of those who pass the PE&MT, so the marks needed in practice are much higher. On Tigertest, aim for 70 percent or more on both mock tests with few wrong answers.",
  },
  {
    q: "Are these the same questions as the real Delhi Police exam?",
    a: "No. These are original practice questions written to the syllabus and pattern in the SSC notice, not questions copied from past papers or the real exam. The general knowledge questions cover static topics such as history, the Constitution and Delhi's special status, geography of India and its neighbours, everyday science and sports; current affairs change every year, so study them separately from a recent source. The notice says reasoning questions are mainly non-verbal (figures and patterns); those are not included, so practise them separately. Questions here are in English only.",
  },
  {
    q: "Is the Tigertest Delhi Police Constable mock test free?",
    a: "Yes. Both mock tests and all eight topic drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Delhi Police Constable mock test, Delhi Police Constable mock test free, Delhi Police constable practice set, Delhi Police constable 2026, Delhi Police constable exam pattern, Delhi Police GK questions, Delhi Police reasoning questions, Delhi Police computer questions, SSC Delhi Police online test",
  alternates: {
    canonical: `${siteUrl}/delhi-police-constable-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/delhi-police-constable-practice-test`,
    images: [{ url: shareImageUrl("delhipolice"), width: 1200, height: 630, alt: "Tigertest free Delhi Police Constable mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("delhipolice")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Delhi Police Constable Mock Test",
      description,
      url: `${siteUrl}/delhi-police-constable-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "234 original Delhi Police Constable practice questions with explanations",
        "2 full mock tests of 100 questions in 90 minutes, in the CBE order",
        "8 topic drills across general knowledge, reasoning, numerical ability and computer",
        "Static GK on Delhi, the Constitution, geography and science",
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
        classFaqJsonLd("delhipolice"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Part A: General Knowledge and Current Affairs", weight: "50 Qs, 50 marks" },
  { name: "Part B: Reasoning", weight: "25 Qs, 25 marks" },
  { name: "Part C: Numerical Ability", weight: "15 Qs, 15 marks" },
  { name: "Part D: Computer Fundamentals, MS Office and Internet", weight: "10 Qs, 10 marks" },
];

export default function DelhiPoliceLandingPage() {
  return (
    <div data-theme="delhipolice" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Delhi Police Constable Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/delhi-police-constable/dashboard"
            shortName="Delhi Police"
            subtitle="234 original CBE questions on GK, reasoning, maths and computer. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/delhipolice-mobile.png", desktop: "/landing/delhipolice-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="delhipolice" />

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
                Eight drills: four for general knowledge (history and culture, polity and Delhi, geography, everyday science), two for reasoning (analogy and coding, relations and puzzles), one for numerical ability and one for computer and internet. Questions you miss come back until you have mastered them.
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
                Two mock tests of 100 questions in 90 minutes, at full length and in the real paper&apos;s order. Move freely and flag questions, as in the exam. Mock Test 2 is held out of the drills, so it measures readiness.
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
                Built on the CBE Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test follows the CBE pattern in the Staff Selection Commission&apos;s 2025 notice: 100 questions, 1 mark each, in 90 minutes, at matriculation level. The real exam takes 0.25 marks off for every wrong answer. Tigertest scores percent correct; to see your exam-style score, take your correct answers and subtract a quarter of your wrong ones. Questions are in English only (the real paper is also in Hindi), general knowledge is static, and reasoning is text only, without the figure questions the notice says make up much of Part B.
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
                src={getTigerAsset("delhipolice", 1)}
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
            How to Prepare for the Delhi Police Constable CBE
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Win the GK half</h3>
              <p>
                General knowledge is half the paper, 50 of 100 marks. Learn static GK thoroughly: Indian history and the history of Delhi, the Constitution and Delhi&apos;s place in it under Article 239AA, the geography of India and its neighbours, everyday science and sports. Then add the last twelve months of current affairs from a recent source, since those change with each exam cycle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Plan your 90 minutes</h3>
              <p>
                With 100 questions in an hour and a half you have 54 seconds a question, but GK questions take a few seconds each when you know them. Answer the GK and computer questions quickly, then give the time you saved to reasoning and numerical ability. Practise your order in full mock tests so it is automatic on the day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Respect the negative marking</h3>
              <p>
                A wrong answer costs 0.25 marks against 1 for a right one, so a blind guess gains almost nothing. Guess only when you can rule out at least one option, and slow down on the questions you know: a careless slip costs you the whole mark.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not skip the computer part</h3>
              <p>
                Ten easy marks come from computer basics: MS Word and MS Excel shortcuts and formulas, e-mail terms such as Cc, Bcc and attachments, and internet terms such as URL, HTTP, FTP and OTP. The computer drill covers them in one sitting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Delhi Police Constable Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="delhipolice" />
        </div>
      </div>

      <ExamRelatedTests examId="delhipolice" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the Delhi Police CBE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 234 questions across all four parts.</p>
          <ExamLandingCTA dashboardHref="/delhi-police-constable/dashboard" />
        </div>
      </div>
    </div>
  );
}
