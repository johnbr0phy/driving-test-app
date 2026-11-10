import "@/lib/banks/kenck";
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
const path = "/nursing-council-of-kenya-exam-practice-test";

const title = "Nursing Council of Kenya Exam Practice Test 2026 - Free NCK Questions";
const metaDescription =
  "Free practice for the Nursing Council of Kenya licensure exam for KRCHN, BScN and KRN/M: 200 original questions on Kenyan nursing, midwifery and community health, every answer explained.";
const description =
  "Free practice for the Nursing Council of Kenya (NCK) licensure examination for registered nurses: 200 original multiple-choice questions on fundamentals of nursing, pharmacology and dosage calculation, medical-surgical nursing with malaria, TB and HIV care, midwifery and newborn care, reproductive health, child health and IMCI, community health and primary health care, mental health, and Kenyan nursing law, ethics and leadership. Four 50-question mock tests with a 60 percent readiness line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nck exam, nursing council of kenya exam, nck licensure exam, nck past papers practice, krchn exam questions, bscn licensure exam kenya, krn/m exam, nursing council of kenya licensing exam 2026, kenya nursing exam questions and answers, nck revision questions",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("kenck"), width: 1200, height: 630, alt: "Tigertest free Nursing Council of Kenya exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("kenck")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Nursing Council of Kenya licensure exam?",
    a: "It is the exam the Nursing Council of Kenya (NCK) sets before it registers and licenses a nurse or midwife to practise in Kenya. Graduates of KRCHN, BScN and nurse-midwife programmes sit it after their training school confirms they are eligible. The Council's 2026 and 2027 schedule runs it as an online exam at designated regional centres, in series in August, November and May.",
  },
  {
    q: "How many papers are there and how long is each one?",
    a: "Under the Council's schedule for the August 2026 to May 2027 series, KRCHN, BScN, KRN/M and KRN/MH candidates sit two papers on one day, Paper 1 from 9 to 11 am and Paper 2 from 2 to 4 pm, and each paper lasts two hours. Post-basic specialties sit one paper. Candidates must first attend a rehearsal at their centre and complete two mock exams in the exam system.",
  },
  {
    q: "How many questions are there and what is the pass mark?",
    a: "The Council does not publish the number of questions per paper or a numeric pass mark. Its examination page says each paper must satisfy the Board of Examiners and lists multiple-choice, short-answer and long-answer questions on brief health-care scenarios. The mock tests here are 50 multiple-choice questions each, and 60 percent is Tigertest's readiness target, not an NCK figure.",
  },
  {
    q: "What topics should I revise for the NCK exam?",
    a: "Registered nurse candidates are examined across general nursing, midwifery and community health. The practice here covers fundamentals of nursing, pharmacology and drug calculations, medical-surgical nursing including malaria, TB and HIV, antenatal, labour, postnatal and newborn care, family planning, child health and IMCI, primary health care and the KEPH levels, mental health, and the law that governs nursing in Kenya. The Council publishes no topic weights, so the split is Tigertest's.",
  },
  {
    q: "Are these the real NCK exam questions?",
    a: "No. Tigertest is independent and not affiliated with the Nursing Council of Kenya or any training institution. Every question is original, written from Kenyan Ministry of Health guidelines, WHO guidance and Kenyan law such as the Nurses and Midwives Act. It is free practice, not past papers and not a guarantee of a result.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Nursing Council of Kenya Exam Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("kenck", "KES"),
      featureList: [
        "200 registered nurse practice questions for Kenya",
        "4 mock tests of 50 questions with a 60% readiness line",
        "4 training sets, one per mock test",
        "Dosage calculation, midwifery and IMCI questions",
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
        classFaqJsonLd("kenck"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Fundamentals of Nursing", weight: "14%" },
  { name: "Pharmacology & Dosage", weight: "8%" },
  { name: "Medical-Surgical Nursing", weight: "18%" },
  { name: "Midwifery & Newborn Care", weight: "16%" },
  { name: "Reproductive Health", weight: "6%" },
  { name: "Child Health & IMCI", weight: "12%" },
  { name: "Community Health & PHC", weight: "12%" },
  { name: "Mental Health Nursing", weight: "6%" },
  { name: "Law, Ethics & Leadership", weight: "8%" },
];

// From the NCK's 2026 and 2027 schedule (checked November 2026).
const series = [
  { name: "November 2026", papers: "12 Nov (KRCHN), 13 Nov (BScN, KRN/M)", results: "11 December 2026" },
  { name: "May 2027", papers: "20 May (KRCHN), 21 May (BScN, KRN/M)", results: "Set by the Council" },
];

export default function KenckLandingPage() {
  return (
    <div data-theme="kenck" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Nursing Council of Kenya Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/kenya-nursing-council/dashboard"
            shortName="NCK Exam"
            subtitle="200 original questions for the NCK licensure exam for KRCHN, BScN and KRN/M: fundamentals, med-surg, midwifery, IMCI, community health, dosage and Kenyan nursing law. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/kenck-mobile.png", desktop: "/landing/kenck-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="kenck" />

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
                Four 50-question mock tests that mix every topic, with a 60 percent readiness line and an explanation on every question. The real papers also have short-answer and long-answer questions, which are not modelled here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exam series */}
      <div className="max-w-4xl mx-auto px-6 pb-16 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-6">
          Upcoming Exam Series
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          Registered nurse candidates sit two papers of two hours each on one day, online at a regional centre, after a rehearsal and two mock exams in the exam system. Dates can change, so check the Council&apos;s current schedule before you plan.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Series</th>
                <th className="px-4 py-3 font-semibold">Registered nurse papers</th>
                <th className="px-4 py-3 font-semibold">Results</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300">
              {series.map((s) => (
                <tr key={s.name} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50">{s.name}</td>
                  <td className="px-4 py-3">{s.papers}</td>
                  <td className="px-4 py-3">{s.results}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Source: Nursing Council of Kenya, Instructions and Schedules for 2026 and 2027 Licensure Examinations. Checked November 2026. Tigertest is not affiliated with the Nursing Council of Kenya.
        </p>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built for Kenyan Nursing Practice
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Council publishes no topic weights, so each mock test spreads its 50 questions across general nursing, midwifery and community health the way the KRCHN and BScN programmes do. Every question follows Kenyan practice: malaria, TB and HIV guidelines, the immunisation schedule, IMCI, the KEPH levels and community health promoters, and the Nurses and Midwives Act. Nursing colleges can set Tigertest as revision for a class at{" "}
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
                src={getTigerAsset("kenck", 1)}
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
            How to Pass the NCK Licensure Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the Kenyan guidelines, not just the textbook</h3>
              <p>
                Questions follow Kenyan practice: artemether-lumefantrine and test before treat for malaria, GeneXpert for TB, TLD for HIV, the KEPI schedule, IMCI cut-offs and the KEPH levels. Learn the national guideline wherever it differs from a foreign textbook.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Give midwifery and child health real time</h3>
              <p>
                Antenatal contacts, active management of the third stage, postpartum haemorrhage, eclampsia, newborn resuscitation, danger signs, dehydration plans and malnutrition come up again and again for KRCHN and BScN candidates.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise drug calculations every day</h3>
              <p>
                Tablets, reconstituted vials, mg per kg for children, drip rates in drops per minute and pump rates in mL per hour. Write the formula, put in the numbers, and check the answer makes sense before you choose.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 35 or more out of 50 on all four mock tests before your exam date. After each test, drill the questions you missed and retrain that test&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NCK Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="kenck" />
        </div>
      </div>

      <ExamSampleQuestions examId="kenck" />

      <ExamRelatedTests examId="kenck" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your NCK Licensure Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across general nursing, midwifery and community health.</p>
          <ExamLandingCTA dashboardHref="/kenya-nursing-council/dashboard" />
        </div>
      </div>
    </div>
  );
}
