import "@/lib/banks/nzsfe";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;
const path = "/nursing-council-nz-state-final-exam-practice-test";

const title = "Nursing Council NZ State Final Exam Practice Test 2026 - Free RN Questions";
const metaDescription =
  "Free practice for the Nursing Council of New Zealand State Final Examination for registered nurses: 200 original questions on NZ nursing practice, law and Te Tiriti, every answer explained.";
const description =
  "Free practice for the Nursing Council of New Zealand State Final Examination for registered nurses: 200 original multiple-choice questions on Te Tiriti o Waitangi, Māori health and cultural safety, the HPCA Act and the Code of Rights, assessment and clinical reasoning, medicines and drug calculations, acute and medical-surgical care, long-term conditions and older adults, mental health and addiction, child, maternal and whānau health, and leadership and safety. Four 50-question mock tests with a 70 percent readiness line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "state final exam nz, nursing council state final examination, nz state finals nursing, registered nurse state final exam practice, ncnz state final exam questions, nz nursing exam practice 2026, state final nursing exam questions and answers, bachelor of nursing state finals revision",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("nzsfe"), width: 1200, height: 630, alt: "Tigertest free Nursing Council NZ State Final Exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzsfe")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Nursing Council of New Zealand State Final Examination?",
    a: "It is the examination the Nursing Council of New Zealand (Te Kaunihera Tapuhi o Aotearoa) sets for graduates of approved nursing programmes before it registers them. New Zealand graduates applying for registration as a registered nurse supply their State Final Examination results, support from the head of their school of nursing and two referees. The Council registers successful applicants as soon as practicable after they pass, and they then apply for an annual practising certificate.",
  },
  {
    q: "How many questions are in the State Final Examination and what is the pass mark?",
    a: "The Council's public website does not set out the number of questions, the time allowed or the pass standard, so ask your school of nursing or the Council for the current exam details. The mock tests here are 50 multiple-choice questions each, and 70 percent is Tigertest's readiness target, not a Nursing Council figure.",
  },
  {
    q: "What do the 2025 standards of competence mean for the exam?",
    a: "The Council's standards of competence for registered nurses were rewritten around six pou: Māori health, cultural safety, whanaungatanga and communication, pūkengatanga and evidence-informed nursing practice, manaakitanga and people-centred care, and rangatiratanga and leadership. They apply for all purposes from 1 January 2026. The practice here follows them, with more weight on Te Tiriti, cultural safety, clinical reasoning and leadership.",
  },
  {
    q: "What topics should I revise for State Finals?",
    a: "Revise the law that governs your practice (the HPCA Act, the Code of Rights, privacy, consent and medicines law), Te Tiriti o Waitangi and Māori health models, clinical assessment and deterioration, medicines and drug calculations, acute medical and surgical care, long-term conditions, mental health and addiction, child and maternal health, and delegation and safety. The Council publishes no topic weights, so the split here is Tigertest's.",
  },
  {
    q: "Are these the real State Final Examination questions?",
    a: "No. Tigertest is independent and not affiliated with the Nursing Council of New Zealand or any school of nursing. Every question is original, written from New Zealand law, the Council's standards and New Zealand clinical guidance. It is free practice, not past papers and not a guarantee of a result.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Nursing Council NZ State Final Exam Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nzsfe", "NZD"),
      featureList: [
        "200 registered nurse practice questions for New Zealand",
        "4 mock tests of 50 questions with a 70% readiness line",
        "4 training sets, one per mock test",
        "Te Tiriti, Code of Rights and drug calculation questions",
        "Instant feedback with explanations",
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
        classFaqJsonLd("nzsfe"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Te Tiriti, Māori Health & Cultural Safety", weight: "10%" },
  { name: "Law, Ethics & Professional Practice", weight: "12%" },
  { name: "Assessment & Clinical Reasoning", weight: "12%" },
  { name: "Medicines & Calculations", weight: "14%" },
  { name: "Acute & Medical-Surgical Care", weight: "18%" },
  { name: "Long-term Conditions & Older Adults", weight: "10%" },
  { name: "Mental Health & Addiction", weight: "8%" },
  { name: "Child, Maternal & Whānau Health", weight: "8%" },
  { name: "Leadership, Safety & Communication", weight: "8%" },
];

// From the Nursing Council's Standards of competence for registered nurses (2025), checked November 2026.
const pou = [
  { name: "Pou one", title: "Māori health" },
  { name: "Pou two", title: "Cultural safety" },
  { name: "Pou three", title: "Whanaungatanga and communication" },
  { name: "Pou four", title: "Pūkengatanga and evidence-informed nursing practice" },
  { name: "Pou five", title: "Manaakitanga and people-centred care" },
  { name: "Pou six", title: "Rangatiratanga and leadership" },
];

export default function NzsfeLandingPage() {
  return (
    <div data-theme="nzsfe" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Nursing Council NZ State Final Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-nursing-state-final/dashboard"
            shortName="NZ State Final"
            subtitle="200 original questions for the registered nurse State Final Examination: Te Tiriti and cultural safety, the Code of Rights, assessment, medicines and calculations, acute care, mental health and whānau health. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nzsfe-mobile.png", desktop: "/landing/nzsfe-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzsfe" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one per mock test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question mock tests that mix every topic, with a 70 percent readiness line and an explanation on every question. The length and the line are Tigertest&apos;s; ask your school of nursing or the Council for the real exam&apos;s format.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Standards of competence */}
      <div className="max-w-4xl mx-auto px-6 pb-16 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-6">
          The Six Pou of the 2025 Standards
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          The Nursing Council&apos;s standards of competence for registered nurses describe safe practice in six pou, in force for all purposes from 1 January 2026. Every question here maps to one of them.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Pou</th>
                <th className="px-4 py-3 font-semibold">Standard</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300">
              {pou.map((p) => (
                <tr key={p.name} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50">{p.name}</td>
                  <td className="px-4 py-3">{p.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Source: Nursing Council of New Zealand, Standards of competence for registered nurses (2025). Checked November 2026. Tigertest is not affiliated with the Nursing Council of New Zealand.
        </p>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built for Nursing in Aotearoa
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Council publishes no topic weights, so each mock test spreads its 50 questions across the areas a New Zealand Bachelor of Nursing prepares you for. Every question follows New Zealand practice: Te Tiriti o Waitangi and kawa whakaruruhau, the Code of Rights, the HPCA Act, the Medicines Act and Misuse of Drugs Act, New Zealand drug names in mmol/L and micrograms, and whānau-centred care. Schools of nursing can set Tigertest as revision for a class at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the class misses most.
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
                src={getTigerAsset("nzsfe", 1)}
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
            How to Prepare for State Finals
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know Te Tiriti and cultural safety, not just definitions</h3>
              <p>
                Learn the principles of Te Tiriti o Waitangi, Te Whare Tapa Whā and other models, and what cultural safety asks of you in practice: whānau at the bedside, tikanga around tapu and noa, and who decides whether care was safe.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the law you practise under</h3>
              <p>
                The HPCA Act, the ten rights of the Code of Rights, informed consent and refusal, privacy, enduring powers of attorney, medicines classes and controlled drugs, and direction and delegation come up again and again.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise drug calculations every day</h3>
              <p>
                Tablets and liquids, mg per kg for children, units of heparin, micrograms, pump rates in mL per hour and drip rates in drops per minute. Write the formula, put in the numbers, and check the answer makes sense before you choose.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 35 or more out of 50 on all four mock tests before your exam. After each test, drill the questions you missed and retrain that test&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          State Final Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="nzsfe" />
        </div>
      </div>

      <ExamSampleQuestions examId="nzsfe" />

      <ExamRelatedTests examId="nzsfe" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your State Final Examination?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on registered nurse practice in Aotearoa New Zealand.</p>
          <ExamLandingCTA dashboardHref="/nz-nursing-state-final/dashboard" />
        </div>
      </div>
    </div>
  );
}
