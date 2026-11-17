import "@/lib/banks/zafirearm";
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

const title = "Free South Africa Firearm Competency Practice Test 2026";
const description = "200 original South Africa Firearms Control Act knowledge questions on licensing, safe custody and legal duties. Unit Standard 117705 study. Free to start.";
const path = "/south-africa-firearm-competency-practice-test";
export const metadata: Metadata = {
  title, description,
  keywords: "south africa firearm competency practice test, firearms control act, 117705, firearm licence knowledge, gun competency legal knowledge",
  alternates: { canonical: `${SITE_URL}${path}` },
  openGraph: { title, description, url: `${SITE_URL}${path}`, type: "website", siteName: "Tigertest", images: [{ url: shareImageUrl("zafirearm"), width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [shareImageUrl("zafirearm")] },
};
const faqs = [
  { q: "What does this firearm competency practice cover?", a: "This is independent legal knowledge practice associated with SAQA Unit Standard 117705. It covers statutory responsibilities, licensing, safe custody, ammunition possession, reporting and accountability under the Firearms Control Act and relevant regulations. It does not teach tactical use or replace practical handling assessment." },
  { q: "Are the 50 questions and 70% score official requirements?", a: "No. The four 50-question tests, topic distribution and 70% study target are editorial practice choices. They are not a verified universal provider assessment format or passing requirement. Confirm assessment arrangements with your accredited provider." },
  { q: "Does completing this give me competency or a firearm licence?", a: "No. Prescribed knowledge and practical training, SAPS competency certification and the appropriate licence are separate requirements. Tigertest is not an accredited firearm training provider, and this practice awards no unit-standard credits or licensing rights." },
  { q: "Is Unit Standard 117705 still available?", a: "The SAQA record has passed its registration end date but currently lists June 30, 2028 as the last enrolment date and June 30, 2031 as the last achievement date. PFTC still lists it as Category 1 legal knowledge. Check current provider and SAQA notices before enrolling. Proposed legislative changes are not treated as enacted law in this practice." },
  { q: "Is this practice free?", a: "It is free to start without an account. The first three training sets and practice tests are free; the final set and test require Premium. An account lets you save progress across devices." },
];
const jsonLd = {
  "@context": "https://schema.org", "@graph": [
    { "@type": "WebApplication", name: title, description, url: `${SITE_URL}${path}`, applicationCategory: "EducationalApplication", operatingSystem: "Any", offers: examOffers("zafirearm"), publisher: { "@id": `${SITE_URL}/#organization` } },
    { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Tigertest", url: SITE_URL },
    { "@type": "FAQPage", mainEntity: [...faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })), classFaqJsonLd("zafirearm")] },
  ],
};
const topics = [
  ["Legal Foundations", "10 of 50", "Competency, authorities, eligibility, legal status and procedural protections."],
  ["Licensing", "15 of 50", "Licensing purposes, applications, renewals, notifications and lawful transfers."],
  ["Safe Custody", "12 of 50", "Prescribed storage, authorised storage arrangements, public carrying and ammunition possession."],
  ["Duties and Accountability", "13 of 50", "Reporting, inspections, offences, unfitness, appeals and inherited firearms."],
];
export default function ZaFirearmLandingPage() {
  return <div data-theme="zafirearm" className="flex-1 bg-white dark:bg-gray-900">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Free South Africa Firearm Competency Practice Test 2026</h1>
      <ExamLandingHero dashboardHref="/zafirearm/dashboard" shortName="SA Firearm Competency" subtitle="200 original legal knowledge questions on the Firearms Control Act, licensing, safe custody and reporting. Four practice tests. Free to start, no account needed." shots={{ mobile: "/landing/zafirearm-mobile.png", desktop: "/landing/zafirearm-desktop.png" }} />
      <p className="mt-6 rounded-xl border border-brand-border-light p-5 text-gray-700 dark:text-gray-200"><strong>Legal knowledge study only.</strong> This is not accredited training or a practical firearm assessment. The 50-question format and 70% target are study choices, not official provider requirements. Completing practice does not grant competency certification or permission to possess a firearm.</p>
    </section>
    <ExamFacts examId="zafirearm" />
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">How It Works</h2>
      <p>Start with Legal Foundations, then study Licensing, Safe Custody, and Duties and Accountability. Read the explanation after every answer. Use the four fixed practice tests to review the topics, then continue with an accredited provider for the prescribed knowledge and practical assessments.</p>
      <h2 className="text-3xl font-bold mt-12 mb-6">What You Will Practice</h2>
      <div className="grid md:grid-cols-2 gap-6">{topics.map(([name, count, text]) => <div key={name} className="rounded-xl border border-brand-border-light p-5"><h3 className="font-semibold">{name} · {count}</h3><p className="mt-2">{text}</p></div>)}</div>
      <p className="mt-5">The topic counts are our study distribution, not an official assessment blueprint. Questions use the Act with enacted amendments and relevant regulations, including the amended storage rules. Provider assessment, practical skills, business qualifications and tactical training are outside this bank.</p>
      <div className="flex items-center gap-6 mt-12"><Image src={getTigerAsset("zafirearm", 1)} alt="Tigertest firearm safety study tiger" width={140} height={140} /><div><h2 className="text-2xl font-bold">We Just Launched</h2><p>Help us improve this new practice bank by reporting any unclear question through the app.</p></div></div>
      <h2 className="text-3xl font-bold mt-12 mb-5">Four Study Tips</h2>
      <ul className="list-disc pl-6 space-y-3"><li>Keep training results, SAPS competency certification and firearm licensing distinct.</li><li>Read the exact trigger and deadline for each notification duty.</li><li>Check the conditions and exceptions before applying a storage or ammunition rule.</li><li>Study the current Act and regulations alongside your accredited course materials.</li></ul>
    </section>
    <ExamSampleQuestions examId="zafirearm" count={4} />
    <section className="max-w-4xl mx-auto px-6 py-12"><h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>{faqs.map(({ q, a }) => <div key={q} className="mb-6"><h3 className="font-semibold text-xl mb-2">{q}</h3><p>{a}</p></div>)}<ExamClassFaq examId="zafirearm" /></section>
    <ExamRelatedTests examId="zafirearm" />
    <div className="max-w-4xl mx-auto px-6 py-12"><ExamLandingCTA dashboardHref="/zafirearm/dashboard" /></div>
  </div>;
}
