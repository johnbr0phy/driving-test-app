import "@/lib/banks/appraiser";
import type { Metadata } from "next";
import Image from "next/image";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { getTigerAsset } from "@/lib/tigerAssets";
import { SITE_URL } from "@/lib/siteUrl";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { examOffers } from "@/lib/examSeo";

const title = "Free Licensed Residential Appraiser Practice Test 2026";
const description = "200 original Licensed Residential Appraiser questions on the April 2026 AQB outline: market analysis, valuation, USPAP and statistics. Free to start.";
const path = "/licensed-residential-appraiser-practice-test";
export const metadata: Metadata = {
  title, description,
  keywords: "licensed residential appraiser practice test, aqb appraisal exam, appraiser exam questions, uspap practice, real property valuation",
  alternates: { canonical: `${SITE_URL}${path}` },
  openGraph: { title, description, url: `${SITE_URL}${path}`, type: "website", siteName: "Tigertest", images: [{ url: shareImageUrl("appraiser"), width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [shareImageUrl("appraiser")] },
};
const faqs = [
  { q: "How long is the Licensed Residential Appraiser exam?", a: "The national AQB Licensed Residential examination has 125 questions, including 110 scored and 15 unscored questions, with four hours allowed. Our four 50-question practice tests are shorter study sessions, not full-length simulations." },
  { q: "Does this also prepare me for Certified Residential or Certified General?", a: "This bank follows the Licensed Residential column of the April 2026 AQB outline. The Certified Residential and Certified General examinations have different content weights and requirements. State licensing rules, eligibility and required education also need separate review." },
  { q: "What is the passing score?", a: "The official national examination uses a scaled passing score of 75, which does not mean 75% correct. Tigertest uses 70% as a study target only; it is not a conversion of the official scale or a prediction of licensing success." },
  { q: "Which USPAP edition and questions are used?", a: "The practice uses current USPAP 2024 rules and original scenarios. It does not reproduce official exam questions or the full paid USPAP guidance and FAQ manual. Study the current standards and your approved course materials alongside this practice." },
  { q: "Is this practice free?", a: "It is free to start without an account. The first three training sets and practice tests are free; the final set and test require Premium. An account lets you save progress across devices." },
];
const jsonLd = {
  "@context": "https://schema.org", "@graph": [
    { "@type": "WebApplication", name: title, description, url: `${SITE_URL}${path}`, applicationCategory: "EducationalApplication", operatingSystem: "Any", offers: examOffers("appraiser"), publisher: { "@id": `${SITE_URL}/#organization` } },
    { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Tigertest", url: SITE_URL },
    { "@type": "FAQPage", mainEntity: [...faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })), classFaqJsonLd("appraiser")] },
  ],
};
const topics = [
  ["Real Estate Market", "10 of 50", "Market forces, highest and best use, value concepts and investment mathematics."],
  ["Property Description", "5 of 50", "Property interests, legal descriptions, restrictions and physical characteristics."],
  ["Land and Site Valuation", "2 of 50", "Allocation, extraction, residual analysis and subdivision development."],
  ["Sales Comparison", "13 of 50", "Verified comparables, adjustment reasoning, units of comparison and calculations."],
  ["Cost Approach", "5 of 50", "Cost methods, depreciation, obsolescence and economic life."],
  ["Income Approach", "2 of 50", "Income measures, capitalization, rent multipliers and discounting."],
  ["Reconciliation", "1 of 50", "Weigh evidence quality and resolve inconsistent inputs."],
  ["USPAP", "11 of 50", "Ethics, competency, scope, records and appraisal development and reporting."],
  ["Statistics", "1 of 50", "Interpret and calculate basic measures from original property datasets."],
];
export default function AppraiserLandingPage() {
  return <div data-theme="appraiser" className="flex-1 bg-white dark:bg-gray-900">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Free Licensed Residential Appraiser Practice Test 2026</h1>
      <ExamLandingHero dashboardHref="/appraiser/dashboard" shortName="Residential Appraiser" subtitle="200 original questions on market analysis, valuation approaches, USPAP and statistics. Four shorter national Licensed Residential practice tests. Free to start, no account needed." shots={{ mobile: "/landing/appraiser-mobile.png", desktop: "/landing/appraiser-desktop.png" }} />
      <p className="mt-6 rounded-xl border border-brand-border-light p-5 text-gray-700 dark:text-gray-200"><strong>National Licensed Residential practice.</strong> These 50-question tests are shorter than the official 125-question exam. They do not simulate Certified Residential, Certified General or state-law exams, and do not replace qualifying education or the complete USPAP guidance manual.</p>
    </section>
    <ExamFacts examId="appraiser" />
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">How It Works</h2>
      <p>Start with Market and Property, then study Site and Sales Comparison, Valuation and Statistics, and USPAP. Work through each explanation and calculation. Use the four fixed practice tests to check your understanding across the outline.</p>
      <h2 className="text-3xl font-bold mt-12 mb-6">What You Will Practice</h2>
      <div className="grid md:grid-cols-2 gap-6">{topics.map(([name, count, text]) => <div key={name} className="rounded-xl border border-brand-border-light p-5"><h3 className="font-semibold">{name} · {count}</h3><p className="mt-2">{text}</p></div>)}</div>
      <p className="mt-5">Counts approximate the April 2026 Licensed Residential outline in whole questions. The official 110 scored items allocate 22 to Market, 11 to Property, 5 to Site, 28 to Sales, 10 to Cost, 5 to Income, 2 to Reconciliation, 24 to USPAP and 3 to Statistics. This bank provides introductory and applied practice, not a calibrated prediction of exam difficulty.</p>
      <div className="flex items-center gap-6 mt-12"><Image src={getTigerAsset("appraiser", 1)} alt="Tigertest property study tiger" width={140} height={140} /><div><h2 className="text-2xl font-bold">We Just Launched</h2><p>Help us improve this new practice bank by reporting any unclear question through the app.</p></div></div>
      <h2 className="text-3xl font-bold mt-12 mb-5">Four Study Tips</h2>
      <ul className="list-disc pl-6 space-y-3"><li>Identify the property interest, value definition and effective date before choosing an approach.</li><li>Adjust comparable sales to the subject and check every adjustment direction.</li><li>Keep gross income, net operating income and equity cash flow distinct.</li><li>Apply USPAP rules to the exact facts, and study current state licensing requirements separately.</li></ul>
    </section>
    <ExamSampleQuestions examId="appraiser" count={4} />
    <section className="max-w-4xl mx-auto px-6 py-12"><h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>{faqs.map(({ q, a }) => <div key={q} className="mb-6"><h3 className="font-semibold text-xl mb-2">{q}</h3><p>{a}</p></div>)}<ExamClassFaq examId="appraiser" /></section>
    <ExamRelatedTests examId="appraiser" />
    <div className="max-w-4xl mx-auto px-6 py-12"><ExamLandingCTA dashboardHref="/appraiser/dashboard" /></div>
  </div>;
}
