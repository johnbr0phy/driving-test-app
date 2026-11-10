import "@/lib/banks/pknle";
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
const path = "/pmdc-nle-practice-test";

const title = "PMDC NRE (NLE) Practice Test 2026 - Free Step 1 MCQs";
const metaDescription =
  "Free practice for the PMDC National Registration Examination (formerly NLE) Step 1 for foreign medical graduates: 200 original MCQs on basic and clinical sciences, every answer explained.";
const description =
  "Free practice for Step 1 of the Pakistan Medical and Dental Council's National Registration Examination (NRE, formerly the National Licensing Examination or NLE) for foreign medical graduates: 200 original multiple-choice questions following the PM&DC 2024 syllabus, 30 percent applied basic sciences (anatomy, physiology, pathology, biochemistry, clinical pharmacology, community medicine, forensic medicine) and 70 percent clinical sciences (medicine, surgery, obstetrics and gynaecology, paediatrics, eye and ENT). Four 50-question mock tests with the 60 percent pass line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "pmdc nre, pmdc nle, nre step 1, national registration examination pakistan, national licensing exam pakistan, nle step 1 mcqs, foreign medical graduates pakistan exam, pmdc exam for foreign graduates 2026, nums nre, nre mcqs practice",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("pknle"), width: 1200, height: 630, alt: "Tigertest free PMDC NRE Step 1 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pknle")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the PMDC NRE, and is it the same as the NLE?",
    a: "The National Registration Examination (NRE) is the exam a Pakistani graduate of a foreign medical college must pass before the Pakistan Medical and Dental Council grants full registration. It is required by section 18 of the Pakistan Medical and Dental Council Act, 2022. It replaced the National Licensing Examination (NLE) of the former Pakistan Medical Commission, and many people still call it the NLE.",
  },
  {
    q: "What is in NRE Step 1?",
    a: "Step 1 is the theory component: 200 multiple-choice questions aimed at applying knowledge, 30 percent from applied basic sciences and 70 percent from clinical sciences, under the PM&DC's NRE Standards, Structure and Syllabus 2024. The June 2025 sitting lasted 3 hours 30 minutes (the 2024 standards give no theory duration). The PM&DC's notices for later sittings do not restate the question count, so check the latest one. Step 2 is the Clinical Skills Examination, an OSCE of 20 stations, which only Step 1 passers may sit and which is not modelled here.",
  },
  {
    q: "What is the pass mark, and is there negative marking?",
    a: "The PM&DC sets the pass mark at 60 percent in the theory and 60 percent in the Clinical Skills Examination, passed separately, with no negative marking in either. Its 2024 standards also mention Angoff's method for standardisation. The mock tests here use the same 60 percent line.",
  },
  {
    q: "Who sets the paper and when is the next sitting?",
    a: "The National University of Medical Sciences (NUMS), Rawalpindi conducts the NRE for the PM&DC, which holds it at least twice a year. The June 2025 sitting was held in Islamabad, Lahore, Karachi and Peshawar; later sittings may use other centres. The PM&DC's notice of 5 October 2026 moved Step 1 to Sunday 8 November 2026. Check pmdc.pk for the current schedule before you plan.",
  },
  {
    q: "Are these the real NRE questions?",
    a: "No. Tigertest is independent and not affiliated with the Pakistan Medical and Dental Council, NUMS or any medical college. Every question is original, written to the PM&DC's published syllabus and weightage with Pakistani practice in mind, such as the EPI schedule, hepatitis, typhoid, dengue and malaria. It is free practice, not past papers and not a guarantee of a result.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PMDC NRE Step 1 Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("pknle", "PKR"),
      featureList: [
        "200 Step 1 practice MCQs for foreign medical graduates",
        "4 mock tests of 50 questions with the 60% pass line",
        "4 training sets, one per mock test",
        "30% basic and 70% clinical sciences, as in the PM&DC syllabus",
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
        classFaqJsonLd("pknle"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Applied Anatomy & Physiology", weight: "10%" },
  { name: "Pathology & Biochemistry", weight: "10%" },
  { name: "Clinical Pharmacology", weight: "4%" },
  { name: "Community & Forensic Medicine", weight: "6%" },
  { name: "Medicine & Allied", weight: "26%" },
  { name: "Surgery & Allied", weight: "22%" },
  { name: "Obstetrics & Gynaecology", weight: "8%" },
  { name: "Paediatrics", weight: "8%" },
  { name: "Eye & ENT", weight: "6%" },
];

// From the PM&DC NRE (Medical) Standards, Structure and Syllabus 2024 (checked November 2026).
const official = [
  { name: "Medicine and Allied", mcqs: "52" },
  { name: "Surgery and Allied", mcqs: "48" },
  { name: "Obstetrics & Gynaecology", mcqs: "14" },
  { name: "Paediatrics", mcqs: "14" },
  { name: "Ophthalmology and ENT", mcqs: "6 + 6" },
  { name: "Applied Pathology and Anatomy", mcqs: "11 + 11" },
  { name: "Applied Physiology", mcqs: "10" },
  { name: "Clinical Pharmacology", mcqs: "8" },
  { name: "Biochemistry, Community Medicine, Forensic Medicine", mcqs: "6 + 6 + 4" },
];

export default function PknleLandingPage() {
  return (
    <div data-theme="pknle" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PMDC NRE (NLE) Step 1 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/pmdc-nle/dashboard"
            shortName="PMDC NRE"
            subtitle="200 original MCQs for foreign medical graduates, 30% basic and 70% clinical sciences as the PM&DC syllabus sets them, with the 60% pass line. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/pknle-mobile.png", desktop: "/landing/pknle-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pknle" />

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
                Four 50-question mock tests, each a quarter of the real 200-question paper with the same basic and clinical mix, a 60 percent pass line and an explanation on every question. The Step 2 clinical skills OSCE is not modelled.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official weightage */}
      <div className="max-w-4xl mx-auto px-6 pb-16 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-6">
          The Real Step 1 Paper
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
          200 MCQs: 140 from clinical sciences and 60 from applied basic sciences. The PM&amp;DC&apos;s basic sciences rows add up to 56 although the table gives a total of 60.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Discipline</th>
                <th className="px-4 py-3 font-semibold">MCQs</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300">
              {official.map((s) => (
                <tr key={s.name} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-50">{s.name}</td>
                  <td className="px-4 py-3">{s.mcqs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Source: Pakistan Medical &amp; Dental Council, National Registration Examination (Medical) Standards, Structure and Syllabus 2024. Checked November 2026. Tigertest is not affiliated with the PM&amp;DC or NUMS.
        </p>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built for Practice in Pakistan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each mock test keeps the official 30 to 70 split between basic and clinical sciences, with the disciplines grouped as below. Clinical questions are written for the diseases and programmes a house officer meets in Pakistan: hepatitis B and C, XDR typhoid, dengue, vivax and falciparum malaria, Congo fever, rabies, snakebite, organophosphate and wheat pill poisoning, and the EPI schedule. Teachers and academies can set Tigertest for a class at{" "}
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
                src={getTigerAsset("pknle", 1)}
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
            How to Pass NRE Step 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put medicine and surgery first</h3>
              <p>
                Medicine and allied subjects and surgery and allied subjects are exactly half the paper between them. Cardiology, gastroenterology and hepatology, infectious disease, trauma, the acute abdomen and orthopaedics repay the most time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the Pakistani version of the disease</h3>
              <p>
                The NRE is set on the curriculum of an MBBS in Pakistan. Know how hepatitis C, XDR typhoid, dengue, vivax malaria, rabies, snakebite and pesticide poisoning are managed here, and the EPI schedule, as well as what your foreign textbook says.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Revise basic sciences as applied questions</h3>
              <p>
                The 60 basic science questions are applied: which nerve a fracture injures, which mediator causes a sign, which drug interaction raised a level. Tie each fact to a patient rather than learning it alone.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for at least 35 out of 50 on all four mock tests, comfortably above the 30 that the 60 percent line needs. After each test, drill the questions you missed and retrain that test&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PMDC NRE Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="pknle" />
        </div>
      </div>

      <ExamSampleQuestions examId="pknle" />

      <ExamRelatedTests examId="pknle" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for NRE Step 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across basic and clinical sciences.</p>
          <ExamLandingCTA dashboardHref="/pmdc-nle/dashboard" />
        </div>
      </div>
    </div>
  );
}
