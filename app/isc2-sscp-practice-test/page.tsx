import "@/lib/v2/banks/sscp";
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

const title = "Free ISC2 SSCP Practice Test";
const description = "260 original ISC2 SSCP multiple-choice questions. Seven domain drills and two fixed 100-question tests. Free to start; CAT and advanced formats are not simulated.";
const url = `${SITE_URL}/isc2-sscp-practice-test`;
const faqs = [
  { q: "What is the current SSCP exam format?", a: "The ISC2 outline effective 1 October 2025 specifies computerized adaptive testing with 100-125 items in two hours. Items include multiple-choice and advanced types. The CAT FAQ states that 25 items are unscored and finalized answers cannot be revisited. These practice tests are fixed-length MCQs and do not simulate those features." },
  { q: "What does this SSCP practice cover?", a: "Selected operational concepts across all seven domains: security practices, access controls, risk analysis, incident recovery, cryptography, networks and systems. Each test allocates 16, 15, 15, 14, 9, 16 and 15 questions respectively, matching the official percentages. The 60 drill questions are separate from both tests. This is not exhaustive coverage of every outline example." },
  { q: "Is 70% enough to pass the real SSCP?", a: "ISC2 publishes a passing standard of 700 out of 1000, which is not a 70% raw-score cutoff. CAT evaluates ability using its scoring process, and candidates receive a pass/fail result rather than a numeric score. Tigertest shows percentage correct and uses an editorial 80% study goal; neither predicts an official result." },
  { q: "Can I go back to earlier questions here?", a: "Yes. You may flag and revisit questions in these fixed practice tests to support learning. The real CAT exam does not allow revisiting a finalized answer. Practice with the official exam rules as well as using these explanations." },
  { q: "How should I use the questions?", a: "Study the requirement in each scenario, explain why the alternatives do not fit it, and review missed concepts. Combine this bank with the current ISC2 outline and authorized practical work. It does not assess hands-on administration, advanced item interaction or adaptive exam performance." },
  { q: "Is this SSCP practice free?", a: "It is free to start with no account required. Practice Test 1 and the first six drills are free. The Systems and Application Security drill and Practice Test 2 require Tigertest Premium, one payment with no subscription. ISC2 does not endorse or sponsor Tigertest." },
];
export const metadata: Metadata = {
  title, description, keywords: "SSCP practice test, ISC2 SSCP, Systems Security Certified Practitioner, operational security certification",
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Tigertest", type: "website", images: [{ url: shareImageUrl("sscp"), width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [shareImageUrl("sscp")] },
};
const jsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "WebApplication", name: "Tigertest - SSCP Practice", description, url, applicationCategory: "EducationalApplication", operatingSystem: "Any", offers: examOffers("sscp"), publisher: { "@id": `${SITE_URL}/#organization` }, featureList: ["260 original conceptual MCQs", "Seven domain drills", "Two fixed 100-question tests", "CAT and advanced item types not simulated"] },
  { "@type": "FAQPage", mainEntity: [...faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })), classFaqJsonLd("sscp")] },
] };
const topics = [
  ["Security Concepts and Practices", "16%", "Ethics, control purposes, asset lifecycle and change management."],
  ["Access Controls", "15%", "Identity lifecycle, authentication, authorization and federation."],
  ["Risk Identification, Monitoring and Analysis", "15%", "Risk decisions, assessment evidence and monitoring results."],
  ["Incident Response and Recovery", "14%", "Response coordination, evidence handling and recovery objectives."],
  ["Cryptography", "9%", "Cryptographic purposes, certificates, secure channels and key lifecycle."],
  ["Network and Communications Security", "16%", "Traffic controls, remote access, wireless, IoT and device management."],
  ["Systems and Application Security", "15%", "Endpoint and mobile controls, cloud, virtualization and secure applications."],
];
export default function SSCPLandingPage() {
  return <div data-theme="sscp" className="flex-1 bg-white dark:bg-gray-900">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="bg-gradient-to-b from-brand-light to-white dark:to-gray-900 px-6 py-16 text-center"><div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">Free ISC2 SSCP Practice Test</h1>
      <ExamLandingHero dashboardHref="/isc2-sscp/dashboard" shortName="SSCP" subtitle="260 original operational-security MCQs, seven drills and two fixed practice tests. CAT and advanced item types are not simulated. Free to start, no account needed." shots={{ mobile: "/landing/sscp-mobile.png", desktop: "/landing/sscp-desktop.png" }} />
    </div></div>
    <ExamFacts examId="sscp" />
    <section className="max-w-5xl mx-auto px-6 py-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">How It Works</h2>
      <div className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-300"><div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Seven Domain Drills</h3><p>Read each scenario, choose an answer and use the explanation to check the distinction. Missed questions return for more practice. The 60 drill questions are separate from both test banks.</p></div><div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Two Practice Tests</h3><p>Each test has 100 single-answer questions and a 120-minute timer. Flag questions and review them before finishing. The tests use separate questions; the second is held out for a fresh check of these concepts.</p></div></div>
    </section>
    <section className="bg-gray-50 dark:bg-gray-950 py-16"><div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-10 items-center"><div className="flex-1"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">The Seven SSCP Domains</h2><p className="text-gray-600 dark:text-gray-300 mb-6">Each fixed test follows the official domain percentages exactly. Practice focuses on selected operational concepts. Adaptive selection, unscored items, advanced formats and exhaustive technology coverage are not included.</p><div className="space-y-3">{topics.map(([name, weight, detail]) => <div key={name} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"><div className="flex justify-between gap-4 font-semibold text-gray-900 dark:text-gray-50"><span>{name}</span><span>{weight}</span></div><p className="text-gray-600 dark:text-gray-300 mt-2">{detail}</p></div>)}</div></div><Image src={getTigerAsset("sscp", 3)} alt="Tigertest security mascot" width={180} height={180} /></div></section>
    <section className="max-w-3xl mx-auto px-6 py-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Study the Decision Behind the Answer</h2><div className="space-y-6 text-gray-600 dark:text-gray-300">
      <div><h3 className="font-semibold text-gray-900 dark:text-gray-50">1. Identify the constraint</h3><p>Find the actual requirement: a trust boundary, a recovery limit, a device-management need or an authorization rule. Several controls may be useful, but only one directly addresses the stated gap.</p></div>
      <div><h3 className="font-semibold text-gray-900 dark:text-gray-50">2. Follow the evidence</h3><p>Separate authentication from authorization, configuration from observed behavior, and a completed change from a verified outcome. Use the logs and measurements provided in the question.</p></div>
      <div><h3 className="font-semibold text-gray-900 dark:text-gray-50">3. Explain the alternatives</h3><p>For each missed question, identify the circumstance in which another option would be appropriate. This builds understanding of scope and timing.</p></div>
      <div><h3 className="font-semibold text-gray-900 dark:text-gray-50">4. Add hands-on preparation</h3><p>Use authorized practical work and the current ISC2 outline alongside these conceptual drills. A high percentage here does not assess CAT performance, advanced items or hands-on administration.</p></div>
    </div></section>
    <section className="bg-gray-50 dark:bg-gray-950 py-12 text-center px-6"><h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">Help Improve This Practice</h2><p className="text-gray-600 dark:text-gray-300">Use question feedback to flag an unclear scenario or explanation.</p></section>
    <section className="max-w-3xl mx-auto px-6 py-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">SSCP Questions</h2><div className="space-y-7">{faqs.map(f => <div key={f.q}><h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3><p className="text-gray-600 dark:text-gray-300">{f.a}</p></div>)}<ExamClassFaq examId="sscp" /></div></section>
    <SampleQuestionsV2 examId="sscp" /><ExamRelatedTests examId="sscp" />
    <section className="max-w-4xl mx-auto px-6 py-16 text-center"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Start SSCP Practice</h2><p className="text-gray-600 dark:text-gray-300 mb-8">Start with Security Concepts and Practices, then work through the seven domains.</p><ExamLandingCTA dashboardHref="/isc2-sscp/dashboard" /></section>
  </div>;
}
