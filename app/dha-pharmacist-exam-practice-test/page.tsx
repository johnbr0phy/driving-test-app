import "@/lib/banks/aedhapharm";
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
const path = "/dha-pharmacist-exam-practice-test";

const title = "DHA Pharmacist Exam Practice Test 2026 - Free Gulf Prometric Questions";
const metaDescription =
  "Free practice for the Gulf pharmacist licensing exams (DHA, DOH, MOHAP, Saudi SPLE, Qatar DHP, Oman, Kuwait, Bahrain): 200 original questions, every answer explained.";
const description =
  "Free practice for the pharmacist licensing exams set by the Gulf health authorities and taken at computer test centres: 200 original multiple-choice questions on the four areas their published blueprints share, basic biomedical sciences, pharmaceutical sciences with calculations, social, behavioural and administrative sciences, and clinical sciences. Four 50-question mock tests with a 60 percent readiness line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "DHA pharmacist exam, DHA exam for pharmacist, prometric exam for pharmacist, prometric pharmacist exam practice test, DOH pharmacist exam, HAAD pharmacist exam, MOHAP pharmacist exam, SPLE practice test, Saudi Pharmacist Licensure Examination, SCFHS pharmacist exam, QCHP pharmacist exam, Qatar pharmacist qualifying exam, Oman pharmacist exam, Kuwait pharmacist exam, Gulf pharmacist licensing exam",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("aedhapharm"), width: 1200, height: 630, alt: "Tigertest free Gulf pharmacist licensing exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aedhapharm")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the DHA pharmacist exam?",
    a: "It is the computer-based assessment the Dubai Health Authority requires before it registers a pharmacist, booked through Prometric once your documents are checked in DHA's Sheryan system. Under DHA's 2025 assessment manual the result is given only as pass or fail, you have three attempts, and failing the third blocks a new DHA application for two years. The other Gulf authorities (DOH Abu Dhabi, MOHAP, Saudi Arabia's SCFHS, Qatar's DHP, Oman, Kuwait and Bahrain) each run their own pharmacist exam, which is why pharmacists often call them all the Prometric exam.",
  },
  {
    q: "How many questions are on the exam, and what is the pass mark?",
    a: "Each authority sets its own number of questions, time and pass mark, and they change, so check your authority's current candidate guide. The two we could read directly: Saudi Arabia's SPLE has 200 questions in two 120-minute parts, scored from 200 to 800 with 536 to pass, and Qatar's National Pharmacist Qualifying Examination has 150 multiple-choice questions with a 60 percent pass mark. The mock tests here have 50 questions each and a 60 percent readiness line.",
  },
  {
    q: "What topics does the Gulf pharmacist exam cover?",
    a: "The blueprints Saudi Arabia and Qatar publish share four areas: basic biomedical sciences (physiology, biochemistry, microbiology, immunology), pharmaceutical sciences (medicinal chemistry, pharmacology, pharmacognosy, pharmaceutics, pharmacokinetics, compounding and calculations), social, behavioural and administrative sciences (law, ethics, management, epidemiology, pharmacoeconomics, drug information) and clinical sciences (patient assessment, therapeutics and monitoring). The SPLE weights them 10, 35, 20 and 35 percent.",
  },
  {
    q: "Is the exam the same for DHA, DOH, SCFHS and the other authorities?",
    a: "No. The content is much the same pharmacist knowledge, but each authority writes its own exam and sets its own length, pass mark, attempts and eligibility rules. Most questions test international pharmacy practice; a few rules, such as what a pharmacy technician may do, belong to one authority, and those questions name it.",
  },
  {
    q: "Is this the official exam or affiliated with Prometric or a health authority?",
    a: "No. Tigertest is independent and not affiliated with Prometric, DHA, DOH, MOHAP, SCFHS, DHP or any other authority. Every question is original, written by Tigertest from the published blueprints and standard pharmacy references, so it tests the same knowledge without copying any exam. It is practice, not a licence or a guarantee of a result.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Gulf Pharmacist Licensing Exam Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aedhapharm"),
      featureList: [
        "200 pharmacist practice questions",
        "4 mock tests of 50 questions with a 60% readiness line",
        "5 training sets by topic",
        "Pharmaceutical and clinical calculation questions",
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
        classFaqJsonLd("aedhapharm"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Basic Biomedical Sciences", weight: "10%" },
  { name: "Pharmacology, Medicinal Chemistry & Toxicology", weight: "18%" },
  { name: "Pharmaceutics & Pharmacokinetics", weight: "10%" },
  { name: "Compounding & Calculations", weight: "8%" },
  { name: "Practice, Ethics & Management", weight: "10%" },
  { name: "Epidemiology, Pharmacovigilance & Outcomes", weight: "10%" },
  { name: "Clinical PK & Patient Assessment", weight: "6%" },
  { name: "Cardiovascular, Renal & Endocrine", weight: "10%" },
  { name: "Infections & Immunisation", weight: "8%" },
  { name: "Respiratory, GI, CNS & Self-Care", weight: "10%" },
];

// Only figures read from the authority's own published page or guide (checked November 2026).
const authorities = [
  { name: "Saudi Arabia (SCFHS, SPLE)", questions: "200 in two parts", time: "2 x 120 minutes", pass: "536 on a 200 to 800 scale" },
  { name: "Qatar (DHP, Ministry of Public Health)", questions: "150", time: "3 hours (3.5 on the blueprint)", pass: "60%" },
  { name: "Dubai (DHA)", questions: "Check guide", time: "Check guide", pass: "Pass or fail only" },
  { name: "Abu Dhabi (DOH)", questions: "Check guide", time: "Check guide", pass: "Check guide" },
  { name: "UAE (MOHAP)", questions: "Check guide", time: "Check guide", pass: "Check guide" },
  { name: "Oman, Kuwait, Bahrain", questions: "Check guide", time: "Check guide", pass: "Check guide" },
];

export default function GulfPharmacistLandingPage() {
  return (
    <div data-theme="aedhapharm" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free DHA Pharmacist Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/gulf-pharmacist-exam/dashboard"
            shortName="Gulf Pharmacist"
            subtitle="200 pharmacist questions for the DHA, DOH, MOHAP, Saudi SPLE and Qatar licensing exams. Free to start, no account needed."
            shots={{ mobile: "/landing/aedhapharm-mobile.png", desktop: "/landing/aedhapharm-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aedhapharm" />

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
                Five training sets by topic, from Biomedical Sciences &amp; Pharmacology to Infections &amp; Other Therapeutics. Master a topic, then take a test. Questions you miss come back until you have mastered them.
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
                Four 50-question mock tests weighted like the published Gulf pharmacist blueprints, with a 60 percent readiness line, the pass mark Qatar publishes, and an explanation on every question.
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
          Sources: SCFHS SPLE Examination Content Guideline (2025); DHP National Pharmacist Qualifying Examination Blueprint and Qualifying Examination page; DHA Manual for Professional Assessment (2025). Checked November 2026. Tigertest is not affiliated with Prometric or any health authority.
        </p>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the Shared Gulf Blueprint
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Saudi Arabia&apos;s SPLE gives 10 percent of its questions to basic biomedical sciences, 35 to pharmaceutical sciences, 20 to social, behavioural and administrative sciences and 35 to clinical sciences, and Qatar&apos;s pharmacist blueprint uses the same four areas. The mock tests follow that split and break each area into topics. Colleges and review centres preparing a group for a Gulf licence can set Tigertest as practice at{" "}
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
                src={getTigerAsset("aedhapharm", 3)}
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
            How to Pass the Gulf Pharmacist Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put most of your time into pharmaceutical and clinical sciences</h3>
              <p>
                Together they are about 70 percent of the SPLE blueprint. Know drug classes and mechanisms, key adverse effects and interactions, antidotes, and first-line treatment and monitoring for heart failure, diabetes, asthma and COPD, common infections and pregnancy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Do calculations every day</h3>
              <p>
                Dilutions, alligation, percentage and ratio strength, mEq and mmol, infusion rates, mg per kg doses, creatinine clearance and pharmacokinetic sums come up on every form. Write the formula, put in the numbers and check the units before you choose.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip the administrative sciences</h3>
              <p>
                Ethics, management, biostatistics, pharmacoeconomics and pharmacovigilance are a fifth of the SPLE and more than a quarter of Qatar&apos;s blueprint. Learn NNT, sensitivity and specificity, study designs, the types of economic analysis and how signals and adverse reactions are classified.
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
          Gulf Pharmacist Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="aedhapharm" />
        </div>
      </div>

      <ExamSampleQuestions examId="aedhapharm" />

      <ExamRelatedTests examId="aedhapharm" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Gulf Pharmacist Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across the whole pharmacist blueprint.</p>
          <ExamLandingCTA dashboardHref="/gulf-pharmacist-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
