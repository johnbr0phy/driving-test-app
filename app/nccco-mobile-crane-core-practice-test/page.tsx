import "@/lib/banks/nccco";
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

const title = "Free NCCCO Mobile Crane Core Practice Test 2026";
const description = "200 original CCO Mobile Crane Core knowledge questions on site conditions, operations, inspections and illustrative load charts. Free to start.";
const path = "/nccco-mobile-crane-core-practice-test";
export const metadata: Metadata = {
  title, description,
  keywords: "nccco practice test, cco core exam, mobile crane operator practice test, crane operator certification questions",
  alternates: { canonical: `${SITE_URL}${path}` },
  openGraph: { title, description, url: `${SITE_URL}${path}`, type: "website", siteName: "Tigertest", images: [{ url: shareImageUrl("nccco"), width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [shareImageUrl("nccco")] },
};
const faqs = [
  { q: "How many questions are on the CCO Mobile Crane Core exam?", a: "The current CCO Mobile Crane Operator handbook lists 95 Core questions in 90 minutes, without a calculator. Tigertest provides four shorter 50-question practice tests, not full-length exam simulations." },
  { q: "Does this cover the entire mobile crane certification?", a: "No. This is Core knowledge practice. Certification also requires the applicable specialty written exam and practical exam. Specialty chart packages, practical demonstrations and exhaustive ASME standards coverage are not included here. Completing practice does not qualify you to operate a crane." },
  { q: "What score should I aim for?", a: "The practice pass line is a 70% study target, not an official CCO raw passing score or a prediction of your certification result. Review every missed question and study the current official handbook and reference materials." },
  { q: "Are these actual crane load charts or official exam questions?", a: "No. All questions and simplified chart exercises are original. Each chart problem supplies its own assumptions and ratings for study only. Never use these illustrative values for an actual lift; use the applicable manufacturer chart and procedures for the crane and configuration." },
  { q: "Is this practice free?", a: "It is free to start without an account. The first three training sets and practice tests are free; the final training set and test require Premium. Saving progress across devices requires an account." },
];
const jsonLd = {
  "@context": "https://schema.org", "@graph": [
    { "@type": "WebApplication", name: title, description, url: `${SITE_URL}${path}`, applicationCategory: "EducationalApplication", operatingSystem: "Any", offers: examOffers("nccco"), publisher: { "@id": `${SITE_URL}/#organization` } },
    { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Tigertest", url: SITE_URL },
    { "@type": "FAQPage", mainEntity: [...faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })), classFaqJsonLd("nccco")] },
  ],
};
const topics = [
  ["Site", "11 of 50", "Ground support, assembly, power lines and safe access."],
  ["Operations", "14 of 50", "Communication, load control, operating limits and lift coordination."],
  ["Technical Knowledge", "12 of 50", "Inspections, wire rope, safety devices and operational aids."],
  ["Load Charts", "13 of 50", "Original capacity, deduction, configuration and reeving problems."],
];
export default function NcccoLandingPage() {
  return <div data-theme="nccco" className="flex-1 bg-white dark:bg-gray-900">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Free NCCCO Mobile Crane Core Practice Test 2026</h1>
      <ExamLandingHero dashboardHref="/nccco/dashboard" shortName="NCCCO Core" subtitle="200 original Core knowledge questions on site conditions, operations, technical knowledge and illustrative load charts. Four shorter practice tests. Free to start, no account needed." shots={{ mobile: "/landing/nccco-mobile.png", desktop: "/landing/nccco-desktop.png" }} />
      <p className="mt-6 rounded-xl border border-brand-border-light p-5 text-gray-700 dark:text-gray-200"><strong>Core knowledge practice only.</strong> Specialty written exams and practical skills are not simulated. These 50-question tests are shorter than the official 95-question Core exam. Illustrative chart values are never for actual lifts.</p>
    </section>
    <ExamFacts examId="nccco" />
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">How It Works</h2>
      <p>Start with the Site training set, then work through Operations, Technical Knowledge and Load Charts. Read each explanation and revisit missed questions. Take the four fixed practice tests to check your understanding across the domains.</p>
      <h2 className="text-3xl font-bold mt-12 mb-6">What You Will Practice</h2>
      <div className="grid md:grid-cols-2 gap-6">{topics.map(([name, count, text]) => <div key={name} className="rounded-xl border border-brand-border-light p-5"><h3 className="font-semibold">{name} · {count}</h3><p className="mt-2">{text}</p></div>)}</div>
      <p className="mt-5">The official outline weights are Site 22%, Operations 28%, Technical Knowledge 23% and Load Charts 27%. Whole questions in our shorter tests give 22%, 28%, 24% and 26%. Questions emphasize OSHA construction rules; applicable manufacturer procedures and industry-specific requirements still need separate study.</p>
      <div className="flex items-center gap-6 mt-12"><Image src={getTigerAsset("nccco", 1)} alt="Tigertest construction safety tiger" width={140} height={140} /><div><h2 className="text-2xl font-bold">We Just Launched</h2><p>Help us improve this new Core practice bank by reporting any unclear question through the app.</p></div></div>
      <h2 className="text-3xl font-bold mt-12 mb-5">Four Study Tips</h2>
      <ul className="list-disc pl-6 space-y-3"><li>Identify the crane configuration and operating area before selecting a chart rating.</li><li>Account for the block, rigging and any other stated deductions.</li><li>Distinguish a required safety device from an operational aid with a permitted temporary alternative.</li><li>Read the current CCO handbook and study the specialty and practical requirements separately.</li></ul>
    </section>
    <ExamSampleQuestions examId="nccco" count={4} />
    <section className="max-w-4xl mx-auto px-6 py-12"><h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>{faqs.map(({ q, a }) => <div key={q} className="mb-6"><h3 className="font-semibold text-xl mb-2">{q}</h3><p>{a}</p></div>)}<ExamClassFaq examId="nccco" /></section>
    <ExamRelatedTests examId="nccco" />
    <div className="max-w-4xl mx-auto px-6 py-12"><ExamLandingCTA dashboardHref="/nccco/dashboard" /></div>
  </div>;
}
