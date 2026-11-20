import "@/lib/banks/hknurse";
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
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "HK Nursing Licensing Exam Practice Test 2026 - Free Nursing Council of Hong Kong Questions";
const metaDescription =
  "Free practice for the written part of the Nursing Council of Hong Kong Licensing Examination for registered nurses (general): 200 original multiple-choice questions on nursing care, body systems, sciences, pharmacology, first aid and ethics, four 50-question tests, every answer explained.";
const description =
  "Free practice for the written part of the Nursing Council of Hong Kong Licensing Examination, the exam nurses trained outside Hong Kong sit to register as a registered nurse (general): 200 original questions on psychology and communication, basic nursing care and infection control, body systems nursing, peri-operative and emergency care, child, maternal, older adult and mental health nursing, anatomy and physiology, nutrition, public health, microbiology, first aid, pharmacology, and law and ethics. Four 50-question practice tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "hong kong nursing licensing exam, nchk licensing examination, nursing council of hong kong exam, hk nurse licensing exam practice test, hong kong rn exam, nchk exam questions, registered nurse general hong kong exam, hong kong nurse registration exam 2026",
  alternates: {
    canonical: `${siteUrl}/hk-nursing-licensing-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/hk-nursing-licensing-exam-practice-test`,
    images: [{ url: shareImageUrl("hknurse"), width: 1200, height: 630, alt: "Tigertest free HK nursing licensing exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hknurse")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Nursing Council of Hong Kong Licensing Examination?",
    a: "Nurses trained outside Hong Kong who apply to register with the Nursing Council of Hong Kong can be required to prove their competence by examination under the Nurses Registration Ordinance. The Licensing Examination for Part I (General) Registration has a written part and a practical part, and there is no exemption for either. The practical part (health assessment, administration of medication and aseptic technique) can be taken only after the written part is passed, and both must be passed before registration.",
  },
  {
    q: "What is in the written part and what is the pass mark?",
    a: "The Council's Candidates' Handbook (September 2018) describes a one-day written part of 200 marks with a passing mark of 100, and says candidates must pass both Paper A and Paper B. Paper A is a Proficiency Test in Medical English (40 marks). Paper B(I) is 60 marks of multiple choice on psychology, basic nursing care and system nursing care. Paper B(II) has 40 marks of multiple choice on anatomy and physiology, food and nutrition, primary health care, personal and communal health, microbiology, first aid and pharmacology, plus essay and specialty nursing questions. Candidates may take it in Chinese or English. The handbook is the Council's latest published format, so check the Council's current notice for your sitting.",
  },
  {
    q: "What does Tigertest cover?",
    a: "Tigertest covers the multiple-choice subject areas: the topics of the Council's 2025 syllabus for Registered Nurse (General) that those papers draw on. It does not cover Paper A (Medical English), the essay questions, the specialty nursing choice or the practical part.",
  },
  {
    q: "How are the practice tests built?",
    a: "Each practice test has 50 questions across all fourteen topics: 3 psychology, 3 law and ethics, 7 basic nursing care, 4 cardiovascular and respiratory, 4 digestive, renal and endocrine, 4 neurological, musculoskeletal and sensory, 3 peri-operative and palliative, 4 life-span and mental health, 3 first aid, 4 anatomy and physiology, 2 nutrition, 3 public health, 3 microbiology and 3 pharmacology. The Council publishes no per-topic counts for its multiple-choice papers, so this split is Tigertest's own, and the 60% readiness line sits above the real 100 of 200 pass mark.",
  },
  {
    q: "Are these the real Nursing Council questions?",
    a: "No. Every question is original, written by Tigertest from the topics in the Council's syllabus and its Code of Ethics and Professional Conduct, using standard nursing knowledge and SI units. It is free practice and does not replace your course, the Council's sample papers or its official notices. It is not affiliated with the Nursing Council of Hong Kong.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free HK Nursing Licensing Exam Practice Test",
      description,
      url: `${siteUrl}/hk-nursing-licensing-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("hknurse", "HKD"),
      featureList: [
        "200 Hong Kong nursing licensing practice questions",
        "4 practice tests of 50 questions",
        "4 training sets by topic",
        "Instant feedback with explanations",
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
        classFaqJsonLd("hknurse"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Basic nursing care and infection control", weight: "14%" },
  { name: "Body systems nursing (heart, lungs, gut, nerves, bones)", weight: "24%" },
  { name: "Peri-operative, life-span and mental health nursing", weight: "14%" },
  { name: "Anatomy, physiology and nutrition", weight: "12%" },
  { name: "Pharmacology and microbiology", weight: "12%" },
  { name: "Public health and first aid", weight: "12%" },
  { name: "Psychology, law and ethics", weight: "12%" },
];

export default function HkNursingLandingPage() {
  return (
    <div data-theme="hknurse" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free HK Nursing Licensing Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/hk-nursing-licensing/dashboard"
            shortName="HK Nursing Exam"
            subtitle="200 Hong Kong nursing licensing questions and four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/hknurse-mobile.png", desktop: "/landing/hknurse-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hknurse" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Topic at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: professional practice and basic care, body systems and medical-surgical care, peri-operative, life-span and first aid, and the sciences with pharmacology and public health. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Four Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions, each drawing on all fourteen topics with a 60% readiness line. No question appears in more than one test, and every answer explains the reason behind it.
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
                Built on the Council&apos;s Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Council names the subject areas of its multiple-choice papers but publishes no topic counts, so each practice test here uses Tigertest&apos;s own split of 50 questions:
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
                src={getTigerAsset("hknurse", 3)}
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
            How to Prepare for the Written Part
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the Council&apos;s documents first</h3>
              <p>
                The Council&apos;s Candidates&apos; Handbook, its syllabus for Registered Nurse (General) and its Code of Ethics and Professional Conduct are on its website. Check the current notice for your sitting before you plan your study.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Anchor each system to its normal values</h3>
              <p>
                Normal vital signs, blood pH, glucose targets and drug calculations come up across topics. Learn the normal range first, then the signs that depart from it and the first nursing action.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the legal and ethical basics</h3>
              <p>
                Be ready on consent, confidentiality, negligence, vicarious liability and the four domains of the Council&apos;s Code, and on the Hong Kong ordinances the syllabus names.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise the other papers separately</h3>
              <p>
                The written part also has Medical English, essay and specialty questions that Tigertest does not cover. Finish every training set here, then aim for 80% or better on each practice test before you spend time on those papers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          HK Nursing Licensing Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="hknurse" />
        </div>
      </div>

      <ExamSampleQuestions examId="hknurse" />

      <ExamRelatedTests examId="hknurse" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Practise for the Licensing Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all fourteen topics.</p>
          <ExamLandingCTA dashboardHref="/hk-nursing-licensing/dashboard" />
        </div>
      </div>
    </div>
  );
}
