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

const siteUrl = SITE_URL;
const path = "/pnmc-licensing-exam-practice-test";

const title = "PNMC Licensing Exam Practice Test 2026 - Free Nursing MCQs";
const metaDescription =
  "Free practice for the PNMC nursing licensing exam in Pakistan: 200 original MCQs on fundamentals, adult health, midwifery, paediatrics and EPI, community health and nursing law, every answer explained.";
const description =
  "Free practice for the Pakistan Nursing and Midwifery Council (PNMC) licensing examination for registered nurses: 200 original multiple-choice questions on fundamentals of nursing, pharmacology and dosage calculation, adult health nursing with hepatitis, dengue, typhoid and diabetes care, critical care and emergencies, maternal and newborn health, paediatric nursing and the EPI schedule, community health nursing and immunisation, mental health, and nursing law, ethics and leadership. Four 50-question mock tests with a 60 percent readiness line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "pnmc licensing exam, pnmc exam, pakistan nursing council exam, pnmc licensing exam mcqs, nursing licensing exam pakistan 2026, bsn licensing exam pakistan, pnc exam mcqs, pakistan nursing and midwifery council exam, staff nurse test mcqs pakistan, nursing mcqs with answers",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("pkpnmc"), width: 1200, height: 630, alt: "Tigertest free PNMC licensing exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pkpnmc")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the PNMC licensing exam?",
    a: "The Pakistan Nursing and Midwifery Council (PNMC), formerly the Pakistan Nursing Council, registers and licenses nurses, midwives and Lady Health Visitors in Pakistan. The Pakistan Nursing and Midwifery Council (Amendment) Act, 2023 lists among its functions carrying out licensure examinations for the grant of a licence to practise. This practice test is for nursing graduates preparing for that licensing step.",
  },
  {
    q: "How many questions are there and what is the pass mark?",
    a: "As of November 2026, PNMC does not publish a question count, time limit or pass mark for a registered nurse licensing exam on its website. Its Licensing Exams page shows results of the Family Welfare Workers licensing examination, and its online portal lists a licensing examination without details. The mock tests here are 50 multiple-choice questions each, and 60 percent is Tigertest's readiness target, not a PNMC figure.",
  },
  {
    q: "What topics should I revise?",
    a: "The practice here follows the subjects of PNMC's nursing programmes: fundamentals of nursing, pharmacology and drug calculations, adult health nursing, critical care and emergencies, maternal and newborn health, paediatric nursing and the EPI schedule, community health nursing, mental health nursing, and nursing law, ethics and leadership. PNMC publishes no topic weights, so the split is Tigertest's.",
  },
  {
    q: "What do I need for PNMC registration after a BSN?",
    a: "PNMC states that Generic BSN graduates must successfully complete a one-year internship to be registered. Graduates with an overseas qualification need an equivalence certificate from the Higher Education Commission. Check PNMC's registration page for the current requirements before you apply.",
  },
  {
    q: "Are these the real PNMC exam questions?",
    a: "No. Tigertest is independent and not affiliated with the Pakistan Nursing and Midwifery Council, any Nursing Examination Board or any nursing college. Every question is original, written from WHO guidance, Pakistan's EPI schedule and Pakistani law such as the PNMC Act. It is free practice, not past papers and not a guarantee of a result.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PNMC Licensing Exam Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
      featureList: [
        "200 registered nurse practice questions for Pakistan",
        "4 mock tests of 50 questions with a 60% readiness line",
        "4 training sets, one per mock test",
        "Dosage calculation, midwifery and EPI questions",
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
        classFaqJsonLd("pkpnmc"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Fundamentals of Nursing", weight: "14%" },
  { name: "Pharmacology & Dosage", weight: "8%" },
  { name: "Adult Health Nursing", weight: "18%" },
  { name: "Critical Care & Emergency", weight: "8%" },
  { name: "Maternal & Newborn Health", weight: "12%" },
  { name: "Paediatric Nursing & EPI", weight: "12%" },
  { name: "Community Health Nursing", weight: "12%" },
  { name: "Mental Health Nursing", weight: "8%" },
  { name: "Law, Ethics & Leadership", weight: "8%" },
];

export default function PkpnmcLandingPage() {
  return (
    <div data-theme="pkpnmc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PNMC Licensing Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/pnmc-licensing-exam/dashboard"
            shortName="PNMC Exam"
            subtitle="200 original nursing MCQs for the PNMC licensing exam: fundamentals, adult health, midwifery, paediatrics and EPI, community health, dosage and nursing law in Pakistan. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/pkpnmc-mobile.png", desktop: "/landing/pkpnmc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pkpnmc" />

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
                Four 50-question mock tests that mix every topic, with a 60 percent readiness line and an explanation on every question. PNMC publishes no question count or pass mark, so the length and the line are Tigertest&apos;s own.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About the exam */}
      <div className="max-w-4xl mx-auto px-6 pb-16 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-6">
          What PNMC Publishes
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          The Pakistan Nursing and Midwifery Council (Amendment) Act, 2023 renamed the Pakistan Nursing Council and lists among its functions carrying out licensure examinations for the grant of a licence to practise. PNMC works with the provincial Nursing Examination Boards of Punjab, Khyber Pakhtunkhwa, Sindh and Balochistan, which hold the programme examinations.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          As of November 2026, PNMC&apos;s website does not give a question count, time limit, pass mark or schedule for a registered nurse licensing exam. Watch PNMC&apos;s notifications and your college for official details, and use these mock tests to revise the whole nursing syllabus in the meantime.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Source: Pakistan Nursing and Midwifery Council website and the PNMC (Amendment) Act, 2023. Checked November 2026. Tigertest is not affiliated with the Pakistan Nursing and Midwifery Council.
        </p>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built for Nursing in Pakistan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                PNMC publishes no topic weights, so each mock test spreads its 50 questions across the subjects of the BSN and diploma programmes. Questions follow practice in Pakistan: the EPI schedule, hepatitis B and C, dengue and typhoid, thalassaemia, diabetes care, vaccine handling and the PNMC Act. Nursing colleges can set Tigertest as revision for a class at{" "}
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
                src={getTigerAsset("pkpnmc", 1)}
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
            How to Prepare for the PNMC Licensing Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn practice as it is done in Pakistan</h3>
              <p>
                Know the EPI schedule from birth to 15 months, how hepatitis B and C spread and are prevented, dengue warning signs, typhoid complications, and how multi-dose vaccine vials are handled. Learn the national programme wherever it differs from a foreign textbook.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Give maternal and child health real time</h3>
              <p>
                Bleeding in pregnancy, pre-eclampsia and magnesium sulphate, postpartum haemorrhage, newborn resuscitation, breastfeeding, milestones and childhood infections come up again and again in nursing papers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise drug calculations every day</h3>
              <p>
                Tablets, syrups, mg per kg for children, units of heparin, drip rates in drops per minute and pump rates in mL per hour. Write the formula, put in the numbers, and check the answer makes sense before you choose.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 35 or more out of 50 on all four mock tests. After each test, drill the questions you missed and retrain that test&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PNMC Licensing Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="pkpnmc" />
        </div>
      </div>

      <ExamRelatedTests examId="pkpnmc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your PNMC Licensing Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across nursing, midwifery and community health in Pakistan.</p>
          <ExamLandingCTA dashboardHref="/pnmc-licensing-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
