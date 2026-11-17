import "@/lib/v2/banks/apcsp";
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

const title = "Free AP Computer Science Principles Practice Test";
const description = "200 original AP CSP questions across five big ideas. Free topic drills and two 70-question, 120-minute multiple-choice tests, including choose-two and reading passages. Create is not covered.";
const url = `${SITE_URL}/ap-computer-science-principles-practice-test`;
const faqs = [
  { q: "What does this AP Computer Science Principles practice cover?", a: "It covers the current five big ideas: Creative Development, Data, Algorithms and Programming, Computer Systems and Networks, and Impact of Computing. There are 200 original questions, five topic drills and two 70-question multiple-choice tests. Code, passages and data are original. Diagrams are described in text." },
  { q: "Does this include the Create performance task?", a: "No. The real multiple-choice section contributes 70% of the AP score; Create and its written responses contribute the other 30%. This app does not assess your program, video, Personalized Project Reference or written responses. Prepare those with your course and current College Board guidance." },
  { q: "How closely do the practice tests match the MCQ format?", a: "Each test has 70 questions in 120 minutes: 57 standalone single-answer questions, five single-answer questions with an original computing-innovation passage, and eight choose-two questions. There are four options per question. The five big-idea counts fall within College Board's current weighting ranges. This is practice in Tigertest, not a reproduction of Bluebook." },
  { q: "Is this AP Computer Science A?", a: "No. AP Computer Science Principles is a separate course covering a broad range of computing ideas. These questions use Principles-style pseudocode, not an AP Computer Science A Java curriculum. Choose the exam that matches your course." },
  { q: "Can my percentage predict an AP score?", a: "No. The score is the percentage of these MCQ items fully correct, with both correct choices required on choose-two items. It excludes Create and written responses. Practice goals are study targets, not official AP cutoffs or a conversion to the AP 1–5 scale." },
  { q: "Are all the tests and drills free?", a: "Yes. All 200 questions, both timed tests and all five drills are free, with no account required. The second test stays out of drills for a fresh check. AP is a College Board trademark; College Board is not affiliated with and does not endorse Tigertest." },
];
export const metadata: Metadata = {
  title, description, keywords: "AP Computer Science Principles practice test, AP CSP, APCSP, computing algorithms data networks",
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Tigertest", type: "website", images: [{ url: shareImageUrl("apcsp"), width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [shareImageUrl("apcsp")] },
};
const jsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "WebApplication", name: "Tigertest - AP Computer Science Principles Practice", description, url, applicationCategory: "EducationalApplication", operatingSystem: "Any", offers: examOffers("apcsp"), publisher: { "@id": `${SITE_URL}/#organization` }, featureList: ["200 original questions", "Five topic drills", "Two full-length MCQ sections", "Create and written responses not covered"] },
  { "@type": "FAQPage", mainEntity: [...faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })), classFaqJsonLd("apcsp")] },
] };
const topics = [
  ["Creative Development", "8", "User needs, collaboration, input/output, testing and debugging."],
  ["Data", "14", "Binary representation, compression, cleaning data and drawing conclusions."],
  ["Algorithms and Programming", "23", "Original pseudocode, Boolean logic, loops, lists, procedures, searching and simulations."],
  ["Computer Systems and Networks", "9", "Protocols, packet delivery, redundancy and parallel or distributed computing."],
  ["Impact of Computing", "16", "Access, bias, crowdsourcing, privacy, security and responsible reuse."],
];
export default function ApCspLandingPage() {
  return <div data-theme="apcsp" className="flex-1 bg-white dark:bg-gray-900">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="bg-gradient-to-b from-brand-light to-white dark:to-gray-900 px-6 py-16 text-center"><div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">Free AP Computer Science Principles Practice Test</h1>
      <ExamLandingHero dashboardHref="/ap-computer-science-principles/dashboard" shortName="AP Computer Science Principles" subtitle="200 original computing questions. Five topic drills and two full-length MCQ tests, all free with no account needed. Prepare Create separately." shots={{ mobile: "/landing/apcsp-mobile.png", desktop: "/landing/apcsp-desktop.png" }} />
    </div></div>
    <ExamFacts examId="apcsp" />
    <section className="max-w-5xl mx-auto px-6 py-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">How It Works</h2>
      <div className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-300"><div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practise each big idea</h3><p>Trace code, interpret data and reason about computing scenarios. Five topic drills bring back questions you miss, with an explanation for every answer.</p></div><div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Try a full MCQ section</h3><p>Work through 70 questions in 120 minutes, including choose-two and reading-passage items. The second test is held out of drills. Your percentage measures this practice, not your complete AP readiness.</p></div></div>
    </section>
    <section className="bg-gray-50 dark:bg-gray-950 px-6 py-16"><div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_220px] gap-8 items-center"><div><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">The five big ideas</h2><div className="space-y-4">{topics.map(([name, count, detail]) => <div key={name}><h3 className="font-semibold text-gray-900 dark:text-gray-50">{name}: {count} questions per test</h3><p className="text-gray-600 dark:text-gray-300">{detail}</p></div>)}</div></div><Image src={getTigerAsset("apcsp", 1)} alt="Tigertest study tiger" width={220} height={220} /></div></section>
    <SampleQuestionsV2 examId="apcsp" />
    <section className="max-w-4xl mx-auto px-6 py-16 text-gray-600 dark:text-gray-300"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Study tips</h2><ul className="list-disc pl-5 space-y-3"><li>Trace variable values after each statement, especially inside loops.</li><li>Use one-based list indexing and read the inclusive endpoints of RANDOM.</li><li>On choose-two questions, check every option against the scenario.</li><li>Keep preparing your Create task and written responses alongside MCQ practice.</li></ul></section>
    <section className="max-w-4xl mx-auto px-6 pb-16"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Frequently Asked Questions</h2><div className="space-y-6">{faqs.map(f => <div key={f.q}><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3><p className="text-gray-600 dark:text-gray-300">{f.a}</p></div>)}</div></section>
    <ExamClassFaq examId="apcsp" /><ExamRelatedTests examId="apcsp" />
    <div className="max-w-4xl mx-auto px-6 py-16 text-center"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Build your computing skills</h2><p className="mb-8 text-gray-600 dark:text-gray-300">Start with a topic drill, then take a timed multiple-choice section.</p><ExamLandingCTA dashboardHref="/ap-computer-science-principles/dashboard" /></div>
  </div>;
}
