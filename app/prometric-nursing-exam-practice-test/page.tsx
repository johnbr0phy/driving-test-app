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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";
const path = "/prometric-nursing-exam-practice-test";

const title = "Prometric Exam for Nurses Practice Test 2026 - Free Gulf RN Questions";
const metaDescription =
  "Free practice for the Gulf registered nurse licensing exams (DHA, DOH, MOHAP, SCFHS, Qatar DHP, Oman, Kuwait, Bahrain): 200 original questions, every answer explained.";
const description =
  "Free practice for the registered nurse licensing exams set by the Gulf health authorities and taken at computer test centres: 200 original multiple-choice questions on nursing fundamentals, pharmacology and dosage calculation, adult medical-surgical nursing by body system, mental health, community health, maternal and newborn care, pediatrics, and leadership, ethics and infection control. Four 50-question mock tests with a 60 percent readiness line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "prometric exam for nurses, prometric nursing exam practice test, DHA exam for nurses, DOH nursing exam, HAAD exam nurses, MOHAP nursing exam, SCFHS nursing exam, SNLE practice, QCHP nursing exam, DHP Qatar nurse exam, Oman nursing exam, Kuwait nursing exam, NHRA nurse exam, Gulf nursing licensing exam",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("gulfrn"), width: 1200, height: 630, alt: "Tigertest free Gulf nursing licensing exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("gulfrn")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Prometric exam for nurses?",
    a: "It is the usual name for the licensing exam a registered nurse takes to work in the Gulf: Dubai (DHA), Abu Dhabi (DOH), the rest of the UAE (MOHAP), Saudi Arabia (SCFHS), Qatar (DHP), Oman, Kuwait and Bahrain. Each health authority sets its own exam and books it through a computer test centre network, which is why nurses call it after the test centre. It is a multiple-choice test of general registered nurse knowledge, taken after your documents are verified.",
  },
  {
    q: "How many questions are on the exam, and what is the pass mark?",
    a: "Each authority sets its own number of questions, time and pass mark, and they change, so check your authority's current candidate guide. The two we could check directly: Qatar's DHP lists 150 multiple-choice questions with a 50 percent pass mark, and Saudi Arabia's SCFHS Nursing Licensure Exam (SNLE) has 200 questions in two 120-minute parts, scored on a 200 to 800 scale with 500 to pass. The mock tests here have 50 questions each and a 60 percent readiness line.",
  },
  {
    q: "What topics does the Gulf nursing exam cover?",
    a: "The blueprints Qatar and Saudi Arabia publish share four parts: nursing fundamentals (with physical assessment, pharmacology and nutrition), adult nursing (medical, surgical, critical care, mental health and community), maternal and child nursing (maternity, newborn and pediatrics), and nursing management and leadership. Saudi Arabia's SNLE guide weights them 20, 40, 30 and 10 percent, and Qatar's blueprint is close to that split.",
  },
  {
    q: "Is the exam the same for DHA, DOH, SCFHS and the other authorities?",
    a: "No. The content is much the same registered nurse knowledge, but each authority writes its own exam and sets its own length, pass mark, number of attempts and eligibility rules. The questions test international nursing standards rather than one country's law.",
  },
  {
    q: "Is this the official exam or affiliated with Prometric or a health authority?",
    a: "No. Tigertest is independent and not affiliated with Prometric, DHA, DOH, MOHAP, SCFHS, DHP or any other authority. Every question is original, written by Tigertest from the published blueprints and standard nursing textbooks, so it tests the same knowledge without copying any exam. It is free practice, not a licence or a guarantee of a result.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Gulf Nursing Licensing Exam Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 registered nurse practice questions",
        "4 mock tests of 50 questions with a 60% readiness line",
        "4 training sets, one per mock test",
        "Dosage calculation and prioritization questions",
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
        classFaqJsonLd("gulfrn"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Nursing Fundamentals", weight: "14%" },
  { name: "Pharmacology & Dosage", weight: "8%" },
  { name: "Cardiovascular & Respiratory", weight: "14%" },
  { name: "Medical-Surgical Nursing", weight: "16%" },
  { name: "Mental Health Nursing", weight: "6%" },
  { name: "Community Health Nursing", weight: "4%" },
  { name: "Maternal & Newborn Nursing", weight: "14%" },
  { name: "Pediatric Nursing", weight: "14%" },
  { name: "Leadership, Ethics & Infection Control", weight: "10%" },
];

// Only figures read from the authority's own published page or guide (checked October 2026).
const authorities = [
  { name: "Qatar (DHP, Ministry of Public Health)", questions: "150", time: "3 hours (3.5 on the blueprint)", pass: "50%" },
  { name: "Saudi Arabia (SCFHS, SNLE)", questions: "200 in two parts", time: "2 x 120 minutes", pass: "500 on a 200 to 800 scale" },
  { name: "Dubai (DHA)", questions: "Check guide", time: "Check guide", pass: "Check guide" },
  { name: "Abu Dhabi (DOH)", questions: "Check guide", time: "Check guide", pass: "Check guide" },
  { name: "UAE (MOHAP)", questions: "Check guide", time: "Check guide", pass: "Check guide" },
  { name: "Oman, Kuwait, Bahrain", questions: "Check guide", time: "Check guide", pass: "Check guide" },
];

export default function GulfNursingLandingPage() {
  return (
    <div data-theme="gulfrn" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Prometric Exam for Nurses Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/gulf-nursing-exam/dashboard"
            shortName="Gulf RN"
            subtitle="200 original registered nurse questions for the DHA, DOH, MOHAP, SCFHS, Qatar, Oman, Kuwait and Bahrain licensing exams: fundamentals, med-surg, maternity, pediatrics and dosage. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/gulfrn-mobile.png", desktop: "/landing/gulfrn-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="gulfrn" />

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
                Four 50-question mock tests weighted like the published Gulf blueprints, with a 60 percent readiness line, a little above the 50 percent pass marks some authorities publish, and an explanation on every question.
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
          Sources: DHP Qualifying Examination page and Nurse and Midwifery Blueprint; SCFHS SNLE Applicant Guide (2024). Checked October 2026. Tigertest is not affiliated with Prometric or any health authority.
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
                Qatar&apos;s published registered nurse blueprint gives 30 of its 150 questions to fundamentals, 61 to adult nursing, 44 to maternal and child nursing and 15 to unit management and leadership, and Saudi Arabia&apos;s SNLE is built on the same four sections. The mock tests follow that split and break adult nursing down by body system, with mental health and community nursing inside it. Nursing schools and agencies preparing a group for the Gulf can set Tigertest as practice at{" "}
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
                src={getTigerAsset("gulfrn", 1)}
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
            How to Pass the Gulf Nursing Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Spend most of your time on adult nursing</h3>
              <p>
                It is about 40 percent of Qatar&apos;s published blueprint. Know the priorities for chest pain, heart failure, COPD and asthma, diabetes and DKA, stroke and raised intracranial pressure, kidney injury, the post-operative patient, burns and shock, and the normal values for vital signs, blood gases and electrolytes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Prioritize with airway, breathing, circulation</h3>
              <p>
                Many questions ask what to do first or whom to see first. Airway problems beat breathing, breathing beats circulation, and assessment comes before action. A patient who is unstable or deteriorating comes before a stable one with a routine need.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise dosage every day</h3>
              <p>
                Tablets, liquids, mg per kg for children, IV pump rates in mL per hour and drip rates in drops per minute come up in every form. Write the formula, put in the numbers, and check the answer makes sense before you choose.
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
          Gulf Nursing Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="gulfrn" />
        </div>
      </div>

      <ExamRelatedTests examId="gulfrn" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Gulf Nursing Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across the whole registered nurse blueprint.</p>
          <ExamLandingCTA dashboardHref="/gulf-nursing-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
