import "@/lib/v2/banks/osssc";
import type { Metadata } from "next";
import Image from "next/image";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { getTigerAsset } from "@/lib/tigerAssets";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { examOffers } from "@/lib/examSeo";
import { SITE_URL } from "@/lib/siteUrl";

const title = "Free OSSSC CRE Practice Test";
const description = "200 original questions for selected Odisha OSSSC CRE-2025 written subjects. English-language practice; Odia, current affairs and computer practical excluded. Free to start.";
const url = `${SITE_URL}/osssc-cre-practice-test`;
const faqs = [
  { q: "Which Odisha recruitment exam does this cover?", a: "This is selected written-subject practice for OSSSC CRE-2025 advertisement IIE-120/2025-3219, covering RI, ICDS Supervisor, VAW, Junior Assistant, ARI, Amin and SFS posts. OSSSC means Odisha Sub-ordinate Staff Selection Commission. This is not OSSC, Odisha Police, or OSSSC CRE-2025(II) forest and excise recruitment. Check the official notice for your particular post and cycle." },
  { q: "What is the official written format?", a: "The verified CRE-2025 notice specifies 100 MCQs in 90 minutes at minimum HSC standard: mathematics 20, general studies 20, English 20, Odia 15, computer knowledge 15 and logical reasoning 10. Correct answers earn one mark, wrong answers lose 0.25 and blanks earn zero. Stage II is a qualifying basic-computer practical of 50 marks in 60 minutes, with 40% qualifying." },
  { q: "Is this a full mock exam?", a: "No. Each practice test contains 85 questions, retaining the five non-Odia subject counts. All practice is in English. Odia, current affairs and the practical computer assessment are excluded. General studies covers selected stable topics rather than the full breadth of the subject. The 90-minute subset timer is a practice choice. All 200 questions are original, not reproduced papers." },
  { q: "Does the displayed score include negative marking?", a: "No. Tigertest shows percentage correct without the official 0.25 wrong-answer deduction, normalization or selection rules. Study goals from 50% to 90% are personal targets, not official qualifying or selection cutoffs. Prepare the excluded subjects separately and check current official instructions." },
  { q: "Is OSSSC practice free?", a: "It is free to start. The last quarter of the five drills and two tests requires a one-time Premium purchase; earlier steps are free. The second test is held out of drills for a fresh check. Tigertest is not affiliated with OSSSC or the Government of Odisha." },
];
export const metadata: Metadata = {
  title, description, keywords: "OSSSC CRE practice test, Odisha combined recruitment examination, OSSSC RI ARI Amin Junior Assistant, CRE 2025 English practice",
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Tigertest", type: "website", images: [{ url: shareImageUrl("osssc"), width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [shareImageUrl("osssc")] },
};
const jsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "WebApplication", name: "Tigertest - OSSSC CRE Written Subjects Practice", description, url, applicationCategory: "EducationalApplication", operatingSystem: "Any", offers: examOffers("osssc", "INR"), publisher: { "@id": `${SITE_URL}/#organization` }, featureList: ["200 original English-language questions", "Five subject drills", "Two 85-question subset tests", "Odia, current affairs and practical excluded"] },
  { "@type": "FAQPage", mainEntity: [...faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })), classFaqJsonLd("osssc")] },
] };
const topics = [
  ["Mathematics — 20 per test", "Percentages, ratios, work, geometry, algebra and data."],
  ["Stable General Studies — 20 per test", "Selected Odisha history and geography, civics and basic science. Current affairs excluded."],
  ["English — 20 per test", "Grammar, vocabulary, notices and original short reading passages."],
  ["Computer Knowledge — 15 per test", "Hardware, software, documents, spreadsheets and digital security concepts."],
  ["Logical Reasoning — 10 per test", "Directions, order, logical conclusions, sequences and data sufficiency."],
];
export default function OssscLandingPage() {
  return <div data-theme="osssc" className="flex-1 bg-white dark:bg-gray-900">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="bg-gradient-to-b from-brand-light to-white dark:to-gray-900 px-6 py-16 text-center"><div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">Free OSSSC CRE Practice Test</h1>
      <ExamLandingHero dashboardHref="/osssc/dashboard" shortName="OSSSC CRE" subtitle="Free to start. 200 original questions for selected CRE-2025 written subjects, all in English. Odia, current affairs and the computer practical are excluded. Practice scores do not apply official negative marking." shots={{ mobile: "/landing/osssc-mobile.png", desktop: "/landing/osssc-desktop.png" }} />
    </div></div>
    <ExamFacts examId="osssc" />
    <section className="max-w-5xl mx-auto px-6 py-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">How It Works</h2><div className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-300"><div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practise by subject</h3><p>Start with a topic drill. Missed questions return for more practice, and each answer includes an explanation. Use separate resources for Odia, current affairs and practical computer tasks.</p></div><div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Check your progress</h3><p>Two 85-question tests retain the five covered subject counts. Each uses a chosen 90-minute timer; the second stays out of drills. The percentage score measures this limited practice, not the complete official paper or selection prospects.</p></div></div></section>
    <section className="bg-gray-50 dark:bg-gray-950 px-6 py-16"><div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_220px] gap-8 items-center"><div><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Five subjects to practise</h2><div className="space-y-4">{topics.map(([name, detail]) => <div key={name}><h3 className="font-semibold text-gray-900 dark:text-gray-50">{name}</h3><p className="text-gray-600 dark:text-gray-300">{detail}</p></div>)}</div></div><Image src={getTigerAsset("osssc", 1)} alt="Tigertest government exam study tiger" width={220} height={220} /></div></section>
    <SampleQuestionsV2 examId="osssc" />
    <section className="max-w-4xl mx-auto px-6 py-16 text-gray-600 dark:text-gray-300"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Study tips</h2><ul className="list-disc pl-5 space-y-3"><li>Write out calculations and check units before selecting an answer.</li><li>For reasoning, separate what is given from what must follow.</li><li>Practise spreadsheet and document tasks on a computer as well as learning concepts.</li><li>Prepare Odia and current affairs separately. Remember that the official exam penalises wrong answers even though this practice score does not.</li></ul></section>
    <section className="max-w-4xl mx-auto px-6 pb-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Frequently Asked Questions</h2><div className="space-y-6">{faqs.map(f => <div key={f.q}><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3><p className="text-gray-600 dark:text-gray-300">{f.a}</p></div>)}</div></section>
    <ExamClassFaq examId="osssc" /><ExamRelatedTests examId="osssc" />
    <div className="max-w-4xl mx-auto px-6 py-16 text-center"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start with Mathematics</h2><p className="mb-8 text-gray-600 dark:text-gray-300">Build your skills one subject at a time.</p><ExamLandingCTA dashboardHref="/osssc/dashboard" /></div>
  </div>;
}
