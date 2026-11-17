import "@/lib/v2/banks/servicenowcsa";
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

const title = "Free ServiceNow CSA Practice Test";
const description = "200 original ServiceNow CSA questions. Six domain drills and two 60-question tests, with single-answer and multiple-select practice. Free to start.";
const url = `${SITE_URL}/servicenow-csa-practice-test`;
const faqs = [
  { q: "What is the current CSA exam format?", a: "The ServiceNow blueprint updated January 2026 specifies 60 questions in 90 minutes. It includes single-answer questions and multiple-select questions that state how many answers to choose. Multiple-select questions receive no partial credit." },
  { q: "What does this CSA practice cover?", a: "Selected concepts across all six domains: platform navigation, instance configuration, collaboration, self service and automation, database and platform security, and migration and integration. Each test has 4, 6, 12, 12, 18 and 8 questions respectively, rounding the official 7/10/20/20/30/13% weights. The 80 drill questions are separate from both tests. This is not exhaustive feature coverage or a hands-on assessment." },
  { q: "What percentage is needed to pass the real CSA?", a: "ServiceNow does not publish its exam cut score and warns against assuming it is always 70%. Tigertest reports percentage correct and uses an editorial 80% study goal. That target does not represent or predict the official passing standard." },
  { q: "Which ServiceNow release does this follow?", a: "The owner blueprint is dated January 2026 and does not specify an exam release codename. We checked primary product documentation in November 2026; most current pages resolve to Brazil. Product-document release labels are not a claim about the exam release. Follow ServiceNow University for your scheduled exam requirements." },
  { q: "How should I prepare alongside these questions?", a: "Use the official blueprint, authorized learning and hands-on platform administration. The questions focus on interpreting requirements, choosing suitable features and checking results. They do not simulate administering a live instance or establish exam readiness." },
  { q: "Is this CSA practice free?", a: "It is free to start with no account required. Practice Test 1 and the first five drills are free. The Data Migration and Integration drill and Practice Test 2 require Tigertest Premium, one payment with no subscription. ServiceNow does not endorse or sponsor Tigertest." },
];
export const metadata: Metadata = {
  title, description, keywords: "ServiceNow CSA practice test, Certified System Administrator, ServiceNow administrator certification",
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Tigertest", type: "website", images: [{ url: shareImageUrl("servicenowcsa"), width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [shareImageUrl("servicenowcsa")] },
};
const jsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "WebApplication", name: "Tigertest - CSA Practice", description, url, applicationCategory: "EducationalApplication", operatingSystem: "Any", offers: examOffers("servicenowcsa"), publisher: { "@id": `${SITE_URL}/#organization` }, featureList: ["200 original administration questions", "Six domain drills", "Two 60-question tests", "Single-answer and multiple-select questions"] },
  { "@type": "FAQPage", mainEntity: [...faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })), classFaqJsonLd("servicenowcsa")] },
] };
const topics = [
  ["Platform Overview and Navigation", "7%", "Navigation, views, preferences and instance context."],
  ["Instance Configuration", "10%", "Applications, plugins and configuration decisions."],
  ["Configuring Applications for Collaboration", "20%", "Lists, forms, filters, visualizations and notifications."],
  ["Self Service and Automation", "20%", "Knowledge, catalog, Workflow Studio and Virtual Agent."],
  ["Database Management and Platform Security", "30%", "Tables, references, imports, access controls and CMDB relationships."],
  ["Data Migration and Integration", "13%", "Client and server behavior, configuration migration and validation."],
];
export default function CSALandingPage() {
  return <div data-theme="servicenowcsa" className="flex-1 bg-white dark:bg-gray-900">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="bg-gradient-to-b from-brand-light to-white dark:to-gray-900 px-6 py-16 text-center"><div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">Free ServiceNow CSA Practice Test</h1>
      <ExamLandingHero dashboardHref="/servicenow-csa/dashboard" shortName="CSA" subtitle="200 original administration questions, six drills and two practice tests. Selected conceptual and applied practice; hands-on administration is not assessed. Free to start, no account needed." shots={{ mobile: "/landing/servicenowcsa-mobile.png", desktop: "/landing/servicenowcsa-desktop.png" }} />
    </div></div>
    <ExamFacts examId="servicenowcsa" />
    <section className="max-w-5xl mx-auto px-6 py-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">How It Works</h2>
      <div className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-300"><div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Six Domain Drills</h3><p>Read each scenario, choose an answer and use the explanation to check the distinction. Missed questions return for more practice. The 80 drill questions are separate from both test banks.</p></div><div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Two Practice Tests</h3><p>Each test has 60 questions and a 90-minute timer. Multiple-select questions state the required number of choices and receive no partial credit. Flag questions and review them before finishing. The tests use separate questions; the second is held out for a fresh check of these concepts.</p></div></div>
    </section>
    <section className="bg-gray-50 dark:bg-gray-950 py-16"><div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-10 items-center"><div className="flex-1"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">The Six CSA Domains</h2><p className="text-gray-600 dark:text-gray-300 mb-6">Each test follows the official domain weights with rounding to whole questions. Practice focuses on selected administration concepts and scenarios. Exhaustive feature coverage and hands-on platform assessment are not included.</p><div className="space-y-3">{topics.map(([name, weight, detail]) => <div key={name} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"><div className="flex justify-between gap-4 font-semibold text-gray-900 dark:text-gray-50"><span>{name}</span><span>{weight}</span></div><p className="text-gray-600 dark:text-gray-300 mt-2">{detail}</p></div>)}</div></div><Image src={getTigerAsset("servicenowcsa", 3)} alt="Tigertest technology mascot" width={180} height={180} /></div></section>
    <section className="max-w-3xl mx-auto px-6 py-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Study the Decision Behind the Answer</h2><div className="space-y-6 text-gray-600 dark:text-gray-300">
      <div><h3 className="font-semibold text-gray-900 dark:text-gray-50">1. Identify the constraint</h3><p>Find the actual requirement: a user-interface behavior, a record validation, a migration dependency or an authorization rule. Several features may be useful; choose the ones that meet the stated requirement.</p></div>
      <div><h3 className="font-semibold text-gray-900 dark:text-gray-50">2. Follow the evidence</h3><p>Separate form presentation from record access, configuration from observed behavior, and a completed change from a verified outcome. Use the conditions and data provided in the question.</p></div>
      <div><h3 className="font-semibold text-gray-900 dark:text-gray-50">3. Explain the alternatives</h3><p>For each missed question, identify the circumstance in which another option would be appropriate. This builds understanding of scope and timing.</p></div>
      <div><h3 className="font-semibold text-gray-900 dark:text-gray-50">4. Add hands-on preparation</h3><p>Use authorized platform practice and the current ServiceNow blueprint alongside these questions. A high percentage here does not assess hands-on administration or predict a certification result.</p></div>
    </div></section>
    <section className="bg-gray-50 dark:bg-gray-950 py-12 text-center px-6"><h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">Help Improve This Practice</h2><p className="text-gray-600 dark:text-gray-300">Use question feedback to flag an unclear scenario or explanation.</p></section>
    <section className="max-w-3xl mx-auto px-6 py-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">CSA Questions</h2><div className="space-y-7">{faqs.map(f => <div key={f.q}><h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3><p className="text-gray-600 dark:text-gray-300">{f.a}</p></div>)}<ExamClassFaq examId="servicenowcsa" /></div></section>
    <SampleQuestionsV2 examId="servicenowcsa" /><ExamRelatedTests examId="servicenowcsa" />
    <section className="max-w-4xl mx-auto px-6 py-16 text-center"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Start CSA Practice</h2><p className="text-gray-600 dark:text-gray-300 mb-8">Start with Platform Overview and Navigation, then work through the six domains.</p><ExamLandingCTA dashboardHref="/servicenow-csa/dashboard" /></section>
  </div>;
}
