import "@/lib/banks/cdm";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { getTigerAsset } from "@/lib/tigerAssets";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { examOffers } from "@/lib/examSeo";
import { SITE_URL } from "@/lib/siteUrl";

const title = "Free CDM Practice Test 2026 - Certified Dietary Manager";
const description = "CDM, CFPP practice with 200 original questions on nutrition, foodservice, staffing, sanitation and business operations. Five topic sets and four practice tests.";
const url = `${SITE_URL}/cdm-practice-test`;
export const metadata: Metadata = {
  title, description,
  keywords: "CDM practice test, CFPP practice questions, certified dietary manager, CBDM exam prep, dietary management practice",
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Tigertest", type: "website", images: [{ url: shareImageUrl("cdm"), width: 1200, height: 630, alt: "Tigertest CDM practice test" }] },
  twitter: { card: "summary_large_image", title, description, images: [shareImageUrl("cdm")] },
};
const areas = [
  ["Nutrition", "20%"], ["Foodservice", "22%"], ["Personnel & Communications", "20%"],
  ["Sanitation & Safety", "24%"], ["Business Operations", "14%"],
];
const faqs = [
  { question: "What score passes the CDM, CFPP exam?", answer: "CBDM sets the cut score using a modified Angoff procedure. Historically, about 70% of the scored items has been required, but your score report gives the exact required count. Tigertest uses 70% as a study target, not a guarantee of an official pass." },
  { question: "How many questions are on the official exam?", answer: "The computer-based exam has 160 multiple-choice questions in 180 minutes. Of these, 140 are scored and 20 are unscored pretest items. The four Tigertest practice tests each contain 50 questions and do not simulate the full exam length." },
  { question: "Which outline does this practice follow?", answer: "The CBDM outline effective March 1, 2025: nutrition 20%, foodservice 22%, personnel and communications 20%, sanitation and safety 24%, and business operations 14%. Each 50-question practice test follows those proportions exactly." },
  { question: "Does this replace the official textbooks or training?", answer: "No. This is focused practice in screening and care-plan implementation, foodservice production, staffing, food safety and operational calculations. It is not exhaustive medical nutrition therapy, culinary or employment-law instruction. Use the current CBDM outline, ANFP reference materials and your program alongside it. No official exam questions are reproduced." },
  { question: "Is CDM practice free?", answer: "It is free to start with no account required. Later practice steps require Tigertest Premium. The practice does not award the CDM, CFPP credential; eligibility, testing and certification are handled by CBDM." },
];
const tips = [
  ["Connect screening to the care plan", "Practice recording actual intake, recognizing changes and communicating useful observations. Distinguish the CDM's implementation role from independent diagnosis or prescribing."],
  ["Show the units in calculations", "Write the units beside each quantity: portions, edible pounds, labor hours or patient days. Check whether the question asks for a total, a rate or a percentage before calculating."],
  ["Separate food-safety processes", "Cooking, cooling, cold holding and reheating have different requirements. Use the FDA Food Code provisions named in the question, and consult applicable local rules for workplace practice."],
  ["Use mistakes to choose your next topic", "Review explanations and your domain results. A practice score describes performance on these questions; it does not establish readiness for every topic in the official reference materials."],
];
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebApplication", name: "Tigertest - Free CDM Practice Test", description, url, applicationCategory: "EducationalApplication", operatingSystem: "Any", offers: examOffers("cdm"), publisher: { "@id": `${SITE_URL}/#organization` }, featureList: ["200 original practice questions", "Five topic training sets", "Four 50-question tests", "Explanations and saved progress"] },
    { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Tigertest", url: SITE_URL },
    { "@type": "FAQPage", mainEntity: [...faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })), classFaqJsonLd("cdm")] },
  ],
};
export default function CdmLandingPage() {
  return <div data-theme="cdm" className="flex-1 bg-white dark:bg-gray-900">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">Free CDM Practice Test 2026</h1>
        <ExamLandingHero dashboardHref="/cdm/dashboard" shortName="CDM" subtitle="200 original questions across the five CBDM domains, with practical scenarios, calculations and explanations. Free to start, no account needed." shots={{ mobile: "/landing/cdm-mobile.png", desktop: "/landing/cdm-desktop.png" }} />
      </div>
    </div>
    <ExamFacts examId="cdm" />
    <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-50 mb-10">How It Works</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8"><h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-50">Five topic sets</h3><p className="text-gray-600 dark:text-gray-300">Start with Nutrition, then work through Foodservice, Personnel &amp; Communications, Sanitation &amp; Safety, and Business Operations. Questions you miss return for practice.</p></div>
        <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8"><h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-50">Four practice tests</h3><p className="text-gray-600 dark:text-gray-300">Each test has 50 questions with the official domain proportions. The 70% practice target helps you track progress; the official cut score is set separately.</p></div>
      </div>
    </section>
    <section className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24"><div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
      <div className="flex-1"><h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">Based on the CBDM Outline</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">These proportions follow the outline effective March 1, 2025. Original questions draw on CBDM practice standards and the FDA Food Code. Dietary management programs can use <Link href="/teach" className="text-brand-dark underline">Tigertest for classes</Link> to follow topic progress.</p>
        <div className="space-y-3">{areas.map(([name, weight]) => <div key={name} className="flex justify-between gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4"><span className="text-gray-900 dark:text-gray-50">{name}</span><span className="text-brand-dark font-semibold">{weight}</span></div>)}</div>
      </div><Image src={getTigerAsset("cdm", 1)} alt="Tigertest dietary study mascot" width={180} height={180} className="w-32 md:w-44" />
    </div></section>
    <section className="max-w-3xl mx-auto px-6 py-16 text-center"><div className="bg-brand-light border border-brand-border-light rounded-2xl p-8"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">We Just Launched</h2><p className="text-gray-600 dark:text-gray-300 mb-5">Tell us which explanations could be clearer or which topics would help your study.</p><a href="https://johnbrophy.net/#contact" target="_blank" rel="noopener noreferrer" className="text-brand-dark underline">Share feedback</a></div></section>
    <section className="bg-gray-50 dark:bg-gray-950 py-16"><div className="max-w-3xl mx-auto px-6"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-10">Study for the Work, Then the Exam</h2><div className="space-y-8">{tips.map(([heading, text], i) => <div key={heading}><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">{i + 1}. {heading}</h3><p className="text-gray-600 dark:text-gray-300">{text}</p></div>)}</div></div></section>
    <section className="max-w-3xl mx-auto px-6 py-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-10">CDM Frequently Asked Questions</h2><div className="space-y-8">{faqs.map(({ question, answer }) => <div key={question}><h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">{question}</h3><p className="text-gray-600 dark:text-gray-300">{answer}</p></div>)}<ExamClassFaq examId="cdm" /></div></section>
    <ExamSampleQuestions examId="cdm" />
    <ExamRelatedTests examId="cdm" />
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start Your CDM Practice</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Five domains, explanations on every question, and progress you can revisit.</p>
        <ExamLandingCTA dashboardHref="/cdm/dashboard" />
      </div>
    </div>
  </div>;
}
