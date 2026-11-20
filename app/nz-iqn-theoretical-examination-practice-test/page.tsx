import "@/lib/v2/banks/nziqn";
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
const path = "/nz-iqn-theoretical-examination-practice-test";

const title = "Free NZ IQN Theoretical Examination Practice Test 2026";
const metaDescription =
  "Start for free: practice for the Nursing Council of New Zealand IQN theoretical exam, Part A medication safety calculations and Part B nursing knowledge on the 2025 standards, with rationales.";
const description =
  "Free-to-start practice for overseas-trained registered nurses sitting the Nursing Council of New Zealand IQN theoretical examination. Two practice tests: Part A medication safety in full, 12 questions in 30 minutes with a calculator, and Part B nursing knowledge at half length and the real pace, 54 questions in 68 minutes, plus drills for medication safety and every pou of the 2025 standards of competence, all written for New Zealand practice.";

const faqs = [
  {
    q: "What is the IQN theoretical examination?",
    a: "It is the first test of competence that the Nursing Council of New Zealand asks of internationally qualified nurses who need one before they can register. The registered nurse exam is 120 computer-based multiple-choice questions in 165 minutes at a Pearson test centre: Part A, Medication safety, 12 questions in 30 minutes, and Part B, Nursing knowledge, 108 questions in 135 minutes. After a pass you are invited to the clinical competence assessment, which includes the OSCE.",
  },
  {
    q: "What is the pass mark for the IQN theoretical examination?",
    a: "The Nursing Council does not publish one. Results are emailed within 24 hours and each part is reported only as Pass or Fail, with no further feedback. If you fail one part you re-sit only that part, and you have three attempts within six months of your invitation.",
  },
  {
    q: "Can I use a calculator in Part A?",
    a: "Yes. The Council's handbook says a calculator is provided in the exam software for questions that need a calculation. Part A covers medication and fluid safety, including medicine calculations, and like Part B every question is multiple choice with one correct answer. Practise converting milligrams, micrograms and grams, and working out pump and drip rates, until the method is automatic.",
  },
  {
    q: "What does Part B cover?",
    a: "The Council says Part B questions are closely linked to its standards of competence for registered nurses: the six pou of Māori health, cultural safety, whanaungatanga and communication, pūkengatanga and evidence-informed practice, manaakitanga and people-centred care, and rangatiratanga and leadership. Its recommended resources are the standards, the Code of Health and Disability Services Consumers' Rights, the Code of Conduct for nurses and the HPCA Act 2003.",
  },
  {
    q: "Is the Tigertest IQN practice test free?",
    a: "It is free to start, with no account needed. Practice Test 1 and every drill but the last are free; the last drill and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. The questions are original practice questions written from the Council's handbook and standards, not the Council's sample questions or real exam questions.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "IQN theoretical examination practice test, Nursing Council of New Zealand IQN exam, NZ IQN exam, IQN medication safety, overseas nurse New Zealand registration exam, NCNZ competence assessment theory exam, NZ nursing exam for international nurses",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("nziqn"), width: 1200, height: 630, alt: "Tigertest free NZ IQN theoretical examination practice test" }],
    siteName: "Tigertest",
    type: "website",
    locale: "en_NZ",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nziqn")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NZ IQN Theoretical Examination Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nziqn", "NZD"),
      featureList: [
        "200 original practice questions with rationales, written for New Zealand nursing practice",
        "Two practice tests: Part A medication safety, 12 questions in 30 minutes, and Part B nursing knowledge, 54 questions in 68 minutes",
        "Medicine calculations with an on-screen calculator, like the real Part A",
        "Part B built on the six pou of the 2025 standards of competence",
        "Mastery drills for medication safety and every pou",
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
        classFaqJsonLd("nziqn"),
      ],
    },
  ],
};

const partB = [
  { name: "Pou one: Māori health", count: "5" },
  { name: "Pou two: Cultural safety", count: "5" },
  { name: "Pou three: Whanaungatanga and communication", count: "8" },
  { name: "Pou four: Assessment and escalation", count: "10" },
  { name: "Pou four: Clinical care and medicines", count: "12" },
  { name: "Pou five: Manaakitanga and people-centred care", count: "7" },
  { name: "Pou six: Rangatiratanga and leadership", count: "7" },
];

export default function NzIqnLandingPage() {
  return (
    <div data-theme="nziqn" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NZ IQN Theoretical Examination Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-iqn-exam/dashboard"
            shortName="NZ IQN Exam"
            subtitle="200 questions with rationales for overseas-trained nurses. Free to start, no account needed."
            shots={{ mobile: "/landing/nziqn-mobile.png", desktop: "/landing/nziqn-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nziqn" />

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
                A medication safety drill, then one drill for each pou of the standards of competence, from te Tiriti and cultural safety to the early warning score and the Code of Rights. Check each answer and read the rationale on the spot; every miss comes back until you have it right.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Timed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Part A then Part B, timed at the real pace: 12 medication safety questions in 30 minutes with a calculator, then 54 nursing knowledge questions in 68 minutes, half the real Part B, with flagging and review. Practice Test 2 questions never appear in the drills, so it is a fair check of your progress.
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
                Built on the Standards of Competence
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Part A in each practice test has the real 12 questions: tablets, liquids, injections, pump and drip rates, doses by weight, unit conversions and safe administration. The Council publishes no split for Part B, so Tigertest spreads its 54 questions across the six pou like this:
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
                src={getTigerAsset("nziqn", 3)}
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
          How to Prepare for the IQN Theoretical Examination
        </h2>
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Answer as a nurse working in Aotearoa New Zealand</h3>
            <p>
              The handbook asks you to answer every question as if you were working as a nurse. Some answers differ from practice at home: a person with diminished competence still makes the choices they can, whānau are partners in care, and culturally safe care is defined by the person receiving it. When two options look right, choose the one that keeps the person safe and fits the Code of Rights.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read the four documents the Council recommends</h3>
            <p>
              The standards of competence for registered nurses, the Code of Health and Disability Services Consumers&apos; Rights, the Code of Conduct for nurses and the HPCA Act 2003. Learn the ten rights by number, the six pou and what each asks of you, and the kawa whakaruruhau and Te Tiriti principles behind pou one.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Make medicine calculations automatic</h3>
            <p>
              Use one method every time (what you want, divided by what you have, times the volume), convert to the same unit before dividing, and check whether an answer is plausible before you choose it. New Zealand charts write micrograms in full, and children&apos;s doses use their weight in kilograms.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weakest pou, then take a full test</h3>
            <p>
              Tigertest shows your practice score by pou. Read the rationales in the area you miss most, then sit Practice Test 2 in one go to check your timing: about 2.5 minutes a Part A question and 75 seconds a Part B one. These scores track your practice and do not predict your result.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            NZ IQN Exam Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
            <ExamClassFaq examId="nziqn" />
          </div>
        </div>
      </div>

      <SampleQuestionsV2 examId="nziqn" />

      <ExamRelatedTests examId="nziqn" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start Your NZ IQN Exam Practice</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account needed. 200 questions across medication safety and all six pou, written for nurses registering in New Zealand.</p>
          <ExamLandingCTA dashboardHref="/nz-iqn-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
