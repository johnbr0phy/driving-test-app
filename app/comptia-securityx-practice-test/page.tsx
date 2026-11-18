import "@/lib/v2/banks/securityx";
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

const title = "Free CompTIA SecurityX Practice Test";
const description = "240 original SecurityX CAS-005 multiple-choice questions. Four domain drills and two 90-question tests. Free to start; interactive performance tasks are not included.";
const url = `${SITE_URL}/comptia-securityx-practice-test`;
const faqs = [
  { q: "Is SecurityX the same certification as CASP+?", a: "SecurityX is the renamed CompTIA advanced security certification formerly called CASP+. This practice follows CAS-005 V5 objectives document version 7.0, checked on 17 November 2026. It does not claim to reproduce older CAS-004 questions." },
  { q: "What is the SecurityX exam format?", a: "CompTIA specifies a maximum of 90 multiple-choice and performance-based questions in 165 minutes. These two practice tests each contain 90 original single-answer MCQs with a 165-minute timer. Interactive performance tasks are omitted, so these are not complete format simulations." },
  { q: "What does the practice bank cover?", a: "Governance, Risk and Compliance, Security Architecture, Security Engineering and Security Operations. Each test uses 18, 24, 28 and 20 questions respectively, rounding the official 20%, 27%, 31% and 22% weights. There are 60 additional drill-only questions. Selected concepts span all numbered objectives, but not every technology example in the outline." },
  { q: "What score do I need to pass SecurityX?", a: "CompTIA reports pass/fail only, with no scaled score or published percentage cutoff. Tigertest reports percentage correct. Its default 80% study goal is editorial, not an official threshold or a prediction that you will pass." },
  { q: "How should I prepare for performance-based questions?", a: "Combine conceptual study with authorized hands-on practice and the current CompTIA objectives. These questions exercise interpretation and design decisions, but do not assess your ability to operate an interactive lab or configure a live system." },
  { q: "Is this SecurityX practice free?", a: "It is free to start with no account required. Practice Test 1 and the first three drills are free. The Security Operations drill and Practice Test 2 require Tigertest Premium, one payment with no subscription. CompTIA does not endorse or sponsor Tigertest." },
];
export const metadata: Metadata = {
  title, description, keywords: "SecurityX practice test, CompTIA SecurityX, CAS-005, CASP+, enterprise security certification",
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Tigertest", type: "website", images: [{ url: shareImageUrl("securityx"), width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [shareImageUrl("securityx")] },
};
const jsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "WebApplication", name: "Tigertest - SecurityX Practice", description, url, applicationCategory: "EducationalApplication", operatingSystem: "Any", offers: examOffers("securityx"), publisher: { "@id": `${SITE_URL}/#organization` }, featureList: ["240 original conceptual MCQs", "Four domain drills", "Two 90-question tests", "Interactive performance tasks not included"] },
  { "@type": "FAQPage", mainEntity: [...faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })), classFaqJsonLd("securityx")] },
] };
const topics = [
  ["Governance, Risk and Compliance", "20%", "Risk ownership, supplier obligations, threat modeling and AI governance."],
  ["Security Architecture", "27%", "Zero trust, access boundaries, resilient systems and software assurance."],
  ["Security Engineering", "31%", "Identity and network diagnostics, endpoints, OT, automation and cryptography."],
  ["Security Operations", "22%", "Monitoring, defensive remediation, threat hunting and incident evidence."],
];
export default function SecurityXLandingPage() {
  return <div data-theme="securityx" className="flex-1 bg-white dark:bg-gray-900">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="bg-gradient-to-b from-brand-light to-white dark:to-gray-900 px-6 py-16 text-center"><div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">Free CompTIA SecurityX Practice Test</h1>
      <ExamLandingHero dashboardHref="/comptia-securityx/dashboard" shortName="SecurityX" subtitle="240 original enterprise-security MCQs, four drills and two practice tests. Interactive performance tasks are not included. Free to start, no account needed." shots={{ mobile: "/landing/securityx-mobile.png", desktop: "/landing/securityx-desktop.png" }} />
    </div></div>
    <ExamFacts examId="securityx" />
    <section className="max-w-5xl mx-auto px-6 py-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">How It Works</h2>
      <div className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-300"><div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Four Domain Drills</h3><p>Read each scenario, choose an answer and use the explanation to check the distinction. Missed questions return for more practice. The 60 drill questions are separate from both test banks.</p></div><div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Two Practice Tests</h3><p>Each test has 90 single-answer questions and a 165-minute timer. Flag questions and review them before finishing. The tests use separate questions; the second is held out for a fresh check of these concepts.</p></div></div>
    </section>
    <section className="bg-gray-50 dark:bg-gray-950 py-16"><div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-10 items-center"><div className="flex-1"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">The Four CAS-005 Domains</h2><p className="text-gray-600 dark:text-gray-300 mb-6">Official domain weights guide the allocation. Practice questions focus on selected conceptual decisions and defensive analysis, with interactive tasks and exhaustive technology coverage left out.</p><div className="space-y-3">{topics.map(([name, weight, detail]) => <div key={name} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"><div className="flex justify-between gap-4 font-semibold text-gray-900 dark:text-gray-50"><span>{name}</span><span>{weight}</span></div><p className="text-gray-600 dark:text-gray-300 mt-2">{detail}</p></div>)}</div></div><Image src={getTigerAsset("securityx", 3)} alt="Tigertest security mascot" width={180} height={180} /></div></section>
    <section className="max-w-3xl mx-auto px-6 py-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Study the Decision Behind the Answer</h2><div className="space-y-6 text-gray-600 dark:text-gray-300">
      <div><h3 className="font-semibold text-gray-900 dark:text-gray-50">1. Identify the constraint</h3><p>Find the actual requirement: a trust boundary, a recovery limit, an operational safety need or an authorization rule. Several controls may be useful, but only one directly addresses the stated gap.</p></div>
      <div><h3 className="font-semibold text-gray-900 dark:text-gray-50">2. Follow the evidence</h3><p>Separate authentication from authorization, configuration from observed behavior, and a completed change from a verified outcome. Use the logs and measurements provided in the question.</p></div>
      <div><h3 className="font-semibold text-gray-900 dark:text-gray-50">3. Explain the alternatives</h3><p>For each missed question, identify the circumstance in which another option would be appropriate. This builds understanding of scope and timing.</p></div>
      <div><h3 className="font-semibold text-gray-900 dark:text-gray-50">4. Add hands-on preparation</h3><p>Use authorized lab work and the current official outline alongside these conceptual drills. A high percentage here does not assess interactive performance or guarantee the certification result.</p></div>
    </div></section>
    <section className="bg-gray-50 dark:bg-gray-950 py-12 text-center px-6"><h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">Help Improve This Practice</h2><p className="text-gray-600 dark:text-gray-300">Use question feedback to flag an unclear scenario or explanation.</p></section>
    <section className="max-w-3xl mx-auto px-6 py-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">SecurityX Questions</h2><div className="space-y-7">{faqs.map(f => <div key={f.q}><h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3><p className="text-gray-600 dark:text-gray-300">{f.a}</p></div>)}<ExamClassFaq examId="securityx" /></div></section>
    <SampleQuestionsV2 examId="securityx" /><ExamRelatedTests examId="securityx" />
    <section className="max-w-4xl mx-auto px-6 py-16 text-center"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Start SecurityX Practice</h2><p className="text-gray-600 dark:text-gray-300 mb-8">Start with governance, then work through the four domains.</p><ExamLandingCTA dashboardHref="/comptia-securityx/dashboard" /></section>
  </div>;
}
