import "@/lib/v2/banks/vidyagyan";
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

const title = "Free VidyaGyan Class 6 Practice Test";
const description = "160 original English-language Class 4–5 skills questions for UP VidyaGyan preparation. Free maths, English, science and text-reasoning drills. Hindi and full entrance-stage simulations excluded.";
const url = `${SITE_URL}/vidyagyan-class-6-practice-test`;
const faqs = [
  { q: "What does this VidyaGyan practice cover?", a: "It offers 160 original Class 4–5 skills questions in English: English language, mathematics, science and general knowledge, and text reasoning. There are four topic drills and two 40-question skills tests. All questions and short passages are original, not copied entrance papers." },
  { q: "Does it reproduce the preliminary or main entrance exam?", a: "No. VidyaGyan has preliminary and main entrance stages. The latest accessible official subject notice, for the 2026–27 main exam, describes Class 4–5 language, mathematics, science, general knowledge and aptitude. We did not locate a detailed current-year blueprint. This practice develops supporting skills; the equal topic weights and 60-minute timer are Tigertest choices, not an official stage pattern." },
  { q: "Is Hindi included?", a: "No. All practice here is in English. Earlier official guidance includes Hindi and English language knowledge, so prepare Hindi separately. Picture-only reasoning, OMR answer-sheet mechanics, interviews and eligibility screening are also outside this practice. Check current instructions with a parent or teacher." },
  { q: "What score is needed for admission?", a: "This app does not provide a current official admission cutoff. The displayed percentage measures only these skills questions. Choose a study goal from 50% to 90%, then review mistakes with a teacher. Selection depends on the official process and requirements, not a Tigertest score." },
  { q: "Are both tests and all drills free?", a: "Yes. All 160 questions, four drills and both skills tests are free, with no account required. The second test stays out of the drills for a fresh check. Tigertest is not affiliated with VidyaGyan or the Shiv Nadar Foundation." },
];
export const metadata: Metadata = {
  title, description, keywords: "VidyaGyan Class 6 practice test, Vidya Gyan entrance, UP Vidyagyan, English Class 5 skills, Shiv Nadar school preparation",
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Tigertest", type: "website", images: [{ url: shareImageUrl("vidyagyan"), width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [shareImageUrl("vidyagyan")] },
};
const jsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "WebApplication", name: "Tigertest - VidyaGyan Class 6 Skills Practice", description, url, applicationCategory: "EducationalApplication", operatingSystem: "Any", offers: examOffers("vidyagyan", "INR"), publisher: { "@id": `${SITE_URL}/#organization` }, featureList: ["160 original English-language skills questions", "Four free drills", "Two 40-question skills tests", "Hindi and full entrance-stage simulations not included"] },
  { "@type": "FAQPage", mainEntity: [...faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })), classFaqJsonLd("vidyagyan")] },
] };
const topics = [
  ["English Language", "Words in context, grammar, punctuation and eight independent original reading passages."],
  ["Mathematics", "Number operations, fractions, measurement, shapes, time and simple data."],
  ["Science and General Knowledge", "Plants, water, materials, observations and community services. No current-affairs questions."],
  ["Text Reasoning", "Directions, order, patterns, classification and relationships described in words."],
];
export default function VidyagyanLandingPage() {
  return <div data-theme="vidyagyan" className="flex-1 bg-white dark:bg-gray-900">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="bg-gradient-to-b from-brand-light to-white dark:to-gray-900 px-6 py-16 text-center"><div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">Free VidyaGyan Class 6 Practice Test</h1>
      <ExamLandingHero dashboardHref="/vidyagyan/dashboard" shortName="VidyaGyan Class 6" subtitle="160 original Class 4–5 skills questions, all in English. Four free drills and two skills tests. Prepare Hindi separately; this does not simulate either entrance stage." shots={{ mobile: "/landing/vidyagyan-mobile.png", desktop: "/landing/vidyagyan-desktop.png" }} />
    </div></div>
    <ExamFacts examId="vidyagyan" />
    <section className="max-w-5xl mx-auto px-6 py-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">How It Works</h2><div className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-300"><div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Build one skill at a time</h3><p>Start with a topic drill. Questions you miss return for more practice, and every answer has an explanation you can discuss with a parent or teacher.</p></div><div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Check your progress</h3><p>Each skills test has 40 questions with a chosen 60-minute timer. The second test is held out of drills. These tests measure the skills covered here, not readiness for the complete VidyaGyan selection process.</p></div></div></section>
    <section className="bg-gray-50 dark:bg-gray-950 px-6 py-16"><div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_220px] gap-8 items-center"><div><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Four areas to practise</h2><div className="space-y-4">{topics.map(([name, detail]) => <div key={name}><h3 className="font-semibold text-gray-900 dark:text-gray-50">{name}: 10 questions per skills test</h3><p className="text-gray-600 dark:text-gray-300">{detail}</p></div>)}</div></div><Image src={getTigerAsset("vidyagyan", 1)} alt="Tigertest school study tiger" width={220} height={220} /></div></section>
    <SampleQuestionsV2 examId="vidyagyan" />
    <section className="max-w-4xl mx-auto px-6 py-16 text-gray-600 dark:text-gray-300"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Study tips</h2><ul className="list-disc pl-5 space-y-3"><li>Read the whole question before choosing an answer.</li><li>Write down each step in a calculation and include the units.</li><li>For reading questions, find the words that support your answer.</li><li>Keep practising Hindi and follow current official guidance with a parent or teacher.</li></ul></section>
    <section className="max-w-4xl mx-auto px-6 pb-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Frequently Asked Questions</h2><div className="space-y-6">{faqs.map(f => <div key={f.q}><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3><p className="text-gray-600 dark:text-gray-300">{f.a}</p></div>)}</div></section>
    <ExamClassFaq examId="vidyagyan" /><ExamRelatedTests examId="vidyagyan" />
    <div className="max-w-4xl mx-auto px-6 py-16 text-center"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start with a skills drill</h2><p className="mb-8 text-gray-600 dark:text-gray-300">Choose English, maths, science or text reasoning.</p><ExamLandingCTA dashboardHref="/vidyagyan/dashboard" /></div>
  </div>;
}
