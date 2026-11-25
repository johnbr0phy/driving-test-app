import "@/lib/banks/gulfmd";
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
const path = "/smle-practice-test";

const title = "SMLE Practice Test 2026 - Free Saudi Medical Licensing Exam and Gulf GP Exam Prep";
const metaDescription =
  "Free practice for the Saudi SMLE and the Gulf doctor licensing exams (DHA, DOH, MOHAP, Qatar, Oman, Kuwait, Bahrain): 200 original questions, every answer explained.";
const description =
  "Free practice for the SCFHS Saudi Medical Licensure Examination and the general practitioner licensing exams of the other Gulf health authorities: 200 original multiple-choice questions weighted like the 2026 SMLE blueprint, medicine 30 percent, obstetrics and gynecology 25, pediatrics 25 and surgery 20, with patient safety, ethics and preventive medicine. Four 50-question mock tests with a 60 percent readiness line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SMLE practice test, SMLE exam, Saudi Medical Licensure Examination, Saudi medical licensing exam, SCFHS SMLE, SCFHS exam for doctors, DHA exam for doctors, DHA GP exam, prometric exam for doctors, prometric GP exam, DOH GP exam, HAAD exam for doctors, MOHAP GP exam, QCHP GP exam, Oman medical licensing exam, Kuwait MOH doctor exam, Gulf doctor licensing exam, GP licensing exam",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("gulfmd"), width: 1200, height: 630, alt: "Tigertest free SMLE and Gulf doctor licensing exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("gulfmd")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the SMLE?",
    a: "The Saudi Medical Licensure Examination is the computer-based exam the Saudi Commission for Health Specialties (SCFHS) sets for doctors before supervised practice, registration and residency selection in Saudi Arabia. Under the SCFHS 2026 content guideline it has 200 one-best-answer questions in two parts of 100, each 120 minutes, with a 30-minute break, and it is taken at SCFHS-approved Prometric centres in Saudi Arabia and abroad. Final-year students, interns and graduates with an MBBS or equivalent can apply.",
  },
  {
    q: "What is the SMLE pass mark?",
    a: "The SMLE is scored on a 200 to 800 scale, and SCFHS sets the passing score at 560 after a standard-setting exercise. Results come 2 to 6 weeks after the testing window closes. Tigertest's mock tests are 50 questions each and use a 60 percent readiness line, which is Tigertest's own target, not the SCFHS cut score.",
  },
  {
    q: "What topics does the SMLE cover?",
    a: "The 2026 SMLE blueprint gives 30 percent to medicine, 25 to obstetrics and gynecology, 25 to pediatrics and 20 to surgery, each allowed to vary by 5 percent, and lists patient safety, preventive medicine and ethics as well. Within each section it names the topics and a mastery level, from cardiology, diabetes and infections to preeclampsia, neonatal care, trauma and biostatistics. The mock tests here follow that split.",
  },
  {
    q: "Is this also practice for the DHA, DOH, MOHAP and other Gulf GP exams?",
    a: "Yes, for the medical knowledge. The Dubai Health Authority, the Department of Health Abu Dhabi, MOHAP and the authorities in Qatar, Oman, Kuwait and Bahrain each run their own assessment for general practitioners, often booked through Prometric, and each sets its own length, pass mark and attempts. DHA's 2025 assessment manual reports only pass or fail and allows three attempts. The questions here test international clinical practice from WHO and other primary guidelines, not one authority's local rules.",
  },
  {
    q: "Is this the official exam or affiliated with SCFHS, Prometric or a health authority?",
    a: "No. Tigertest is independent and not affiliated with SCFHS, Prometric, DHA, DOH, MOHAP, DHP or any other authority. Every question is original, written by Tigertest from the published SMLE blueprint and primary clinical guidelines, so it tests the same knowledge without copying any exam. It is practice, not a licence or a guarantee of a result.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SMLE and Gulf Doctor Licensing Exam Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("gulfmd"),
      featureList: [
        "200 doctor licensing practice questions",
        "4 mock tests of 50 questions with a 60% readiness line",
        "5 training sets by topic",
        "Weighted like the SCFHS 2026 SMLE blueprint",
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
        classFaqJsonLd("gulfmd"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Cardiology & Pulmonology", weight: "8%" },
  { name: "Gastroenterology, Nephrology & Endocrinology", weight: "8%" },
  { name: "Infectious Diseases & Critical Care", weight: "8%" },
  { name: "Hematology, Rheumatology, Neurology & Psychiatry", weight: "8%" },
  { name: "Obstetrics", weight: "14%" },
  { name: "Gynecology", weight: "10%" },
  { name: "Neonatology, Growth & Child Infections", weight: "12%" },
  { name: "Pediatric Systems & Emergencies", weight: "12%" },
  { name: "Surgery & Trauma", weight: "12%" },
  { name: "Patient Safety, Ethics & Preventive Medicine", weight: "8%" },
];

// Only figures read from the authority's own published guide (checked November 2026).
const authorities = [
  { name: "Saudi Arabia (SCFHS, SMLE)", questions: "200 in two parts", time: "2 x 120 minutes", pass: "560 on a 200 to 800 scale" },
  { name: "Dubai (DHA)", questions: "Check guide", time: "Check guide", pass: "Pass or fail only" },
  { name: "Abu Dhabi (DOH)", questions: "Check guide", time: "Check guide", pass: "Check guide" },
  { name: "UAE (MOHAP)", questions: "Check guide", time: "Check guide", pass: "Check guide" },
  { name: "Qatar (DHP)", questions: "Check guide", time: "Check guide", pass: "Check guide" },
  { name: "Oman, Kuwait, Bahrain", questions: "Check guide", time: "Check guide", pass: "Check guide" },
];

export default function GulfDoctorLandingPage() {
  return (
    <div data-theme="gulfmd" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SMLE Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/gulf-doctor-exam/dashboard"
            shortName="Gulf Doctor"
            subtitle="200 doctor questions for the Saudi SMLE and the DHA, DOH, MOHAP and Qatar GP licensing exams. Free to start, no account needed."
            shots={{ mobile: "/landing/gulfmd-mobile.png", desktop: "/landing/gulfmd-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="gulfmd" />

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
                Five training sets by topic, from Heart, Lungs, Gut, Kidney &amp; Glands to Surgery, Patient Safety &amp; Ethics. Master a topic, then take a test. Questions you miss come back until you have mastered them.
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
                Four 50-question mock tests weighted like the SCFHS SMLE blueprint, with a 60 percent readiness line set by Tigertest (the SMLE itself is scored on a 200 to 800 scale) and an explanation on every question.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Authorities */}
      <div className="max-w-4xl mx-auto px-6 pb-16 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-6">
          Each Authority Sets Its Own Exam
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          The number of questions, the time and the pass mark are set by your health authority, not by the test centre, and they change. This table shows only what we could read in an authority&apos;s own published guide. For the rest, check your authority&apos;s current candidate guide before you book.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Authority</th>
                <th className="px-4 py-3 font-semibold">Questions</th>
                <th className="px-4 py-3 font-semibold">Time</th>
                <th className="px-4 py-3 font-semibold">Pass mark</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300">
              {authorities.map((a) => (
                <tr key={a.name} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50">{a.name}</td>
                  <td className="px-4 py-3">{a.questions}</td>
                  <td className="px-4 py-3">{a.time}</td>
                  <td className="px-4 py-3">{a.pass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Sources: SCFHS Saudi Medical Licensure Examination (SMLE) Examination Content Guideline (2026 blueprint); DHA Manual for Professional Assessment (2025). Checked November 2026. Tigertest is not affiliated with SCFHS, Prometric or any health authority.
        </p>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the 2026 SMLE Blueprint
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The SCFHS blueprint gives 30 percent of the SMLE to medicine, 25 to obstetrics and gynecology, 25 to pediatrics and 20 to surgery, and lists patient safety, preventive medicine and ethics with surgery. The mock tests follow that split and break each section into topics. Medical colleges and review centres preparing a group for the SMLE or a Gulf GP licence can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the group misses most.
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
                src={getTigerAsset("gulfmd", 3)}
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
            How to Prepare for the SMLE
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Give medicine the most time, but not all of it</h3>
              <p>
                Medicine is the largest section at 30 percent, yet obstetrics, gynecology and pediatrics together make up half the exam. Plan your weeks by the blueprint, not by the subject you like best.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn first-line management from the guidelines</h3>
              <p>
                Many questions ask for the next step or the first-line drug. Know the WHO recommendations for maternal, newborn and child health, and the main society guidelines for sepsis, diabetes, asthma and COPD, stroke and trauma, and why the tempting second choice is wrong.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip patient safety, ethics and statistics</h3>
              <p>
                The blueprint lists consent, confidentiality, error disclosure, research ethics, screening and biostatistics. Practise predictive values, likelihood ratios, bias and study designs until the arithmetic is quick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. After each mock test, drill the questions you missed and retrain your weakest topic, then take the next test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SMLE and Gulf Doctor Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="gulfmd" />
        </div>
      </div>

      <ExamSampleQuestions examId="gulfmd" />

      <ExamRelatedTests examId="gulfmd" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your SMLE or Gulf GP Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across the whole SMLE blueprint.</p>
          <ExamLandingCTA dashboardHref="/gulf-doctor-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
