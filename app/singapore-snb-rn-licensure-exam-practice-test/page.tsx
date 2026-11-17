import "@/lib/banks/sgsnb";
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
const path = "/singapore-snb-rn-licensure-exam-practice-test";

const title = "SNB RN Licensure Exam Practice Test 2026 - Free Questions";
const metaDescription =
  "Free practice for the Singapore Nursing Board RN Licensure Examination: 200 original questions on the SNB test plan and the Code for Nurses and Midwives, every answer explained.";
const description =
  "Free practice for the Singapore Nursing Board (SNB) Registered Nurse Licensure Examination taken by foreign-trained nurses: 200 original multiple-choice questions on the Code for Nurses and Midwives, professional boundaries and confidentiality, quality and communication, assessment, infection control and safety, medications and dosage calculations, fluids and elimination, emergencies and respiratory care, surgical, wound and diabetes care, mental health, older adults and end-of-life care, and delegation and teamwork. Four 50-question practice tests with a 70 percent readiness line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "snb exam, snb licensure exam, singapore nursing board exam, snb rn licensure examination, singapore nurse registration exam, snb le practice questions, singapore nursing exam for foreign nurses, snb rn exam practice 2026, snb pearson vue exam, overseas nurse singapore registration",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("sgsnb"), width: 1200, height: 630, alt: "Tigertest free SNB RN Licensure Exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sgsnb")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the SNB RN Licensure Examination?",
    a: "It is the examination the Singapore Nursing Board sets for foreign-trained nurses who want to register as a registered nurse in Singapore, to check that they can practise safely and effectively as an RN. Since 28 November 2024 it has been a computer-based test taken at Pearson VUE test centres. A nurse is put forward by the Singapore healthcare institution that wants to employ them, and each candidate has two attempts.",
  },
  {
    q: "How many questions are on the exam and what is the pass mark?",
    a: "SNB does not publish the number of questions or the pass mark. Pearson VUE describes a multiple-choice exam of 60 minutes with an on-screen calculator. The practice tests here are 50 questions each, and 70 percent is Tigertest's readiness target, not an SNB figure.",
  },
  {
    q: "What topics does the SNB test plan cover?",
    a: "The April 2026 test plan lists four core competencies: legal and ethical nursing practice, professional nursing practice (with 20 categories from quality improvement, health promotion and client education to medications, infection control, emergencies, mental health, elder care and mobility), collaborative practice and teamwork, and continuing professional education. SNB publishes no weights, so the split here is Tigertest's.",
  },
  {
    q: "Is the Code for Nurses and Midwives on the exam?",
    a: "The plan's legal and ethical competency is built around it. The Code, in effect since 2 April 2018, has ten principles covering respect for people's values and rights, autonomy, confidentiality, advocacy, accountability, competence, records, professionalism, self-regulation and collaboration, plus guidelines on professional boundaries and social media. The first topic set here is based on it.",
  },
  {
    q: "Are these the real SNB exam questions?",
    a: "No. Tigertest is independent and not affiliated with the Singapore Nursing Board or Pearson VUE. Every question is original, written from the SNB test plan, the Code and standard nursing practice. It is free practice, not past papers and not a guarantee of a result.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SNB RN Licensure Exam Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("sgsnb", "SGD"),
      featureList: [
        "200 registered nurse practice questions for Singapore",
        "4 practice tests of 50 questions with a 70% readiness line",
        "5 training sets by topic",
        "Code for Nurses and Midwives, dosage calculation and emergency questions",
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
        classFaqJsonLd("sgsnb"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Law, Ethics & Culturally Safe Care", weight: "12%" },
  { name: "Quality, Communication & Client Education", weight: "10%" },
  { name: "Client Assessment & Reassessment", weight: "8%" },
  { name: "Safety, Infection Control & Comfort", weight: "10%" },
  { name: "Medications & Pharmacology", weight: "14%" },
  { name: "Fluids, Nutrition & Elimination", weight: "8%" },
  { name: "Medical Emergencies & Respiratory Care", weight: "10%" },
  { name: "Surgical, Wound & Diabetes Care", weight: "10%" },
  { name: "Mental Health, Elder & End-of-Life Care", weight: "10%" },
  { name: "Teamwork, Delegation & Professional Development", weight: "8%" },
];

// From the SNB RN Licensure Examination test plan (April 2026), checked November 2026.
const competencies = [
  { name: "1. Legal and Ethical Nursing Practice", detail: "Accountability and legal obligations, ethical practice, culturally appropriate care" },
  { name: "2. Professional Nursing Practice", detail: "Twenty categories, from quality improvement and client education to medications, infection control, emergencies, mental health and elder care" },
  { name: "3. Collaborative Practice and Teamwork", detail: "Collaboration and teamwork, delegation and supervision" },
  { name: "4. Continuing Professional Education", detail: "Maintaining continuing professional education and currency of practice" },
];

export default function SgsnbLandingPage() {
  return (
    <div data-theme="sgsnb" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SNB RN Licensure Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/singapore-snb-rn-exam/dashboard"
            shortName="SNB RN Exam"
            subtitle="200 original questions for the Singapore Nursing Board RN Licensure Examination: the Code for Nurses and Midwives, assessment, infection control, medications and calculations, emergencies and elder care. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/sgsnb-mobile.png", desktop: "/landing/sgsnb-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sgsnb" />

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
                Five practice sets by topic, from Law, Ethics &amp; Quality Care to Mental Health, Older Adults &amp; Teamwork. Master a topic, then take a test. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question practice tests that mix every topic, with a 70 percent readiness line and an explanation on every question. The length and the line are Tigertest&apos;s; SNB does not publish the real exam&apos;s question count or pass mark.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Test plan */}
      <div className="max-w-4xl mx-auto px-6 pb-16 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-6">
          The SNB Test Plan
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          SNB&apos;s test plan for the RN Licensure Examination groups what it tests into four core competencies. Every question here belongs to one of them.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Core competency</th>
                <th className="px-4 py-3 font-semibold">Covers</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300">
              {competencies.map((c) => (
                <tr key={c.name} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50">{c.name}</td>
                  <td className="px-4 py-3">{c.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Source: Singapore Nursing Board, RN Licensure Examination test plan (April 2026). Checked November 2026. Tigertest is not affiliated with the Singapore Nursing Board.
        </p>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built for Nursing in Singapore
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                SNB publishes no topic weights, so each practice test spreads its 50 questions across the plan&apos;s categories. The legal and ethical questions follow the SNB Code for Nurses and Midwives; clinical questions use standard nursing practice, SI units and generic drug names. Nursing schools and hospital educators can set Tigertest as revision for a class through{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">Tigertest for teachers</Link>
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
                src={getTigerAsset("sgsnb", 3)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* We just launched */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">We Just Launched This Test</h2>
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
            How to Prepare for the SNB Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the Code for Nurses and Midwives</h3>
              <p>
                SNB publishes it free. Learn the ten principles and the practice statements under each, especially confidentiality, consent, records, professional boundaries and social media, then think about what each means on a ward.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Work through the test plan categories</h3>
              <p>
                Tick off each of the plan&apos;s categories, from wound care and diabetes care to end-of-life care and mobility. Ask yourself the safest next step and the first action, not only the definition.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise dosage calculations every day</h3>
              <p>
                The exam has an on-screen calculator. Practise tablets and liquids, mg per kg, pump rates in mL per hour and drip rates in drops per minute. Write the formula, put in the numbers and check the answer is sensible.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 35 or more out of 50 on all four practice tests before your exam. After each test, drill the questions you missed and retrain your weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SNB RN Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="sgsnb" />
        </div>
      </div>

      <ExamSampleQuestions examId="sgsnb" />

      <ExamRelatedTests examId="sgsnb" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your SNB RN Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on registered nurse practice in Singapore.</p>
          <ExamLandingCTA dashboardHref="/singapore-snb-rn-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
