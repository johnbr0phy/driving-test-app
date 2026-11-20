import "@/lib/v2/banks/nzensf";
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
const path = "/nz-enrolled-nurse-state-final-exam-practice-test";

const title = "Free NZ Enrolled Nurse State Final Practice Test 2026";
const metaDescription =
  "Free practice for the Nursing Council of New Zealand enrolled nurse State Final: Part A medicine calculations and Part B nursing knowledge on the 2025 EN scope and standards, with rationales.";
const description =
  "Free practice for Diploma in Enrolled Nursing graduates sitting the Nursing Council of New Zealand State Final Examination. Two full mock tests of 90 questions in 90 minutes: Part A medicine calculations with typed answers, and Part B nursing knowledge written around the five pou of the 2025 enrolled nurse standards of competence, plus drills for calculations and every area of Part B.";

const faqs = [
  {
    q: "What is the enrolled nurse State Final Examination?",
    a: "It is the examination the Nursing Council of New Zealand sets for graduates of the Diploma in Enrolled Nursing before they can register as enrolled nurses. The Council's handbook for nursing programmes describes it as 90 multiple-choice questions in 90 minutes, held in March, July and November. The 2025 sample paper has two parts: Part A Medicine Calculations and Part B Nursing Knowledge.",
  },
  {
    q: "What is the pass mark for the EN State Final?",
    a: "The handbook says you need an overall pass of 70% across the whole exam. The Council's FAQ adds that there is no pass mark for each category, so you do not need full marks in the calculations; the exam is graded on your overall percentage. Candidates have three attempts to pass.",
  },
  {
    q: "What is on Part B of the enrolled nurse exam?",
    a: "Part B is nursing knowledge, linked to the Council's Standards of competence for enrolled nurses (February 2025). They have five pou: Māori health, cultural safety, whanaungatanga and communication, pūkengatanga and knowledge-informed practice, and mana hautū, professional accountability. Answer every question as an enrolled nurse working in Aotearoa New Zealand.",
  },
  {
    q: "How did the 2025 enrolled nurse scope change things?",
    a: "Since 20 January 2025 enrolled nurses initiate and monitor care through assessment, care planning, implementation and evaluation, and must work with access to, and seek when appropriate, guidance from a registered nurse or other registered health practitioner. They can direct and coordinate other health workers, are accountable for their own practice and must recognise and escalate a change in a patient's condition. Registered nurses remain accountable for directing and delegating.",
  },
  {
    q: "Is the Tigertest enrolled nurse practice test free?",
    a: "It is free to start, with no account needed. Practice Test 1 and every drill but the last two are free; the last two drills and the final practice test are part of Tigertest Premium, one payment with no subscription. The questions are original practice questions written from the Council's scope and standards, not real exam questions. Here Part A asks you to type each answer, while the real Part A is multiple choice.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "enrolled nurse state final, EN state final practice test, NZ enrolled nurse exam, Nursing Council of New Zealand enrolled nurse exam, Diploma in Enrolled Nursing exam, EN state finals questions, enrolled nurse medicine calculations, NZ nursing exam practice",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("nzensf"), width: 1200, height: 630, alt: "Tigertest free NZ enrolled nurse State Final practice test" }],
    siteName: "Tigertest",
    type: "website",
    locale: "en_NZ",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzensf")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NZ Enrolled Nurse State Final Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nzensf", "NZD"),
      featureList: [
        "212 original enrolled nurse practice questions with rationales, written for New Zealand practice",
        "Two full mock tests: 9 medicine calculations and 81 nursing knowledge questions in 90 minutes",
        "Typed calculation answers with an on-screen calculator",
        "Built around the five pou of the 2025 enrolled nurse standards of competence",
        "Mastery drills for calculations and every area of Part B",
        "Progress syncs between phone and computer",
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
        classFaqJsonLd("nzensf"),
      ],
    },
  ],
};

const partB = [
  { name: "Māori health and cultural safety", count: "8" },
  { name: "Communication and teamwork", count: "8" },
  { name: "Professional accountability and the law", count: "10" },
  { name: "Assessment and deterioration", count: "11" },
  { name: "Medicines", count: "10" },
  { name: "Infection prevention and health promotion", count: "6" },
  { name: "Acute and surgical care", count: "14" },
  { name: "Long-term conditions and older adults", count: "8" },
  { name: "Mental health and addiction", count: "4" },
  { name: "Child and maternal health", count: "2" },
];

export default function NzEnStateFinalLandingPage() {
  return (
    <div data-theme="nzensf" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NZ Enrolled Nurse State Final Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-en-state-final/dashboard"
            shortName="EN State Final"
            subtitle="212 questions with rationales for Diploma in Enrolled Nursing graduates. Free to start, no account needed."
            shots={{ mobile: "/landing/nzensf-mobile.png", desktop: "/landing/nzensf-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzensf" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills on Your Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                A medicine calculations drill with typed answers, then one drill for each area of Part B, from Te Tiriti and seeking guidance to sepsis and post-operative care. Check each answer and read the rationale on the spot; every miss comes back until you have it right. Fits around placements and study.
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
                Part A then Part B in one sitting, 90 questions in 90 minutes like the real exam: 9 calculations in 15 minutes with a calculator, then 81 nursing knowledge questions in 75 minutes, with flagging and review. Practice Test 2 questions never appear in the drills, so it is a fair check of your progress.
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
                Built on the 2025 Enrolled Nurse Standards
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Part A covers tablets, oral liquids, doses by weight, pump and drip rates, infusion times and fluid balance. The Council publishes no topic split for Part B, so Tigertest spreads its 81 questions across the five pou of the standards of competence like this:
              </p>
              <div className="space-y-3">
                {partB.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-right text-brand-dark font-semibold sm:whitespace-nowrap">{area.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("nzensf", 3)}
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
          How to Prepare for the EN State Final
        </h2>
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Answer as an enrolled nurse</h3>
            <p>
              The sample paper asks you to answer as if you were working as an enrolled nurse. You assess, plan, give and evaluate care, and you are accountable for it, but when a patient gets worse or a task is beyond your expertise, the right answer is usually to escalate to the registered nurse or another registered health practitioner. Prescribing and diagnosing are not the enrolled nurse&apos;s role.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the five pou and the Code of Rights</h3>
            <p>
              Learn what each pou asks: culturally safe care is determined by the person receiving it, kawa whakaruruhau addresses power imbalances, and documentation must be legible, accurate and timely. The Code of Health and Disability Services Consumers&apos; Rights comes up too: a person is presumed competent, may refuse care, may have a support person and may complain.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Make calculations automatic</h3>
            <p>
              Use one formula every time (what you want, divided by what you have, times the volume), change to the same unit before you divide, and read the rounding instruction twice. Pump rates are volume over hours; drip rates are volume times drop factor over minutes.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weakest area, then take a full test</h3>
            <p>
              Tigertest shows your practice score by area. Read the rationales in the area you miss most, then sit Practice Test 2 in one go to check your timing: about a minute a question. These scores track your practice and do not predict your result.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            EN State Final Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
            <ExamClassFaq examId="nzensf" />
          </div>
        </div>
      </div>

      <SampleQuestionsV2 examId="nzensf" />

      <ExamRelatedTests examId="nzensf" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start Your EN State Final Practice</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account needed. 212 questions across medicine calculations and every area of Part B, written for enrolled nurses in Aotearoa New Zealand.</p>
          <ExamLandingCTA dashboardHref="/nz-en-state-final/dashboard" />
        </div>
      </div>
    </div>
  );
}
