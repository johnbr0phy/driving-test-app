import "@/lib/v2/banks/jamblit";
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

const title = "Free JAMB Literature in English Practice Test";
const description = "120 original JAMB Literature skills questions: drama, prose, poetry and unseen extracts. Four free drills and two timed practice tests. Prescribed books must be studied separately.";
const url = `${SITE_URL}/jamb-literature-practice-test`;
const faqs = [
  { q: "What does this JAMB Literature practice cover?", a: "It covers literary skills from the current JAMB IBASS syllabus: dramatic techniques, narrative viewpoints, character and plot, poetic forms and devices, and interpretation of original unseen extracts. There are 120 original questions, four topic drills and two 40-question tests. It does not cover knowledge of the prescribed books and poems, so use it alongside your reading and lessons." },
  { q: "Does it replace reading the prescribed texts?", a: "No. JAMB's Literature syllabus includes named plays, novels and poems, as well as general literary skills. This practice does not test those books. Read the current list on IBASS and study each prescribed text with your teacher. A strong score here is a check of these skills, not a prediction of your full UTME Literature score." },
  { q: "How long are the practice tests?", a: "Each practice test has 40 questions and a 30-minute timer. The timer and equal split of ten questions from each of the four areas are Tigertest practice choices, not a claim about JAMB's official topic weights or a separate Literature time limit. You can move between questions and flag them." },
  { q: "What score should I aim for?", a: "Choose a practice goal from 50% to 90%. These are study targets, not official admission pass marks. Each correct answer earns one point, with no penalty for a wrong answer in this practice. Admission requirements depend on the institution, course and current JAMB rules." },
  { q: "Are the questions original and free?", a: "Yes. All 120 questions and all extracts are original, not JAMB past questions or copied textbook exercises. Both tests and all four drills are free, with no account required. Practice Test 2 is held out of the drills for a fresh skills check. Tigertest is not affiliated with or endorsed by JAMB." },
];
export const metadata: Metadata = {
  title, description,
  keywords: "JAMB Literature in English practice test, UTME Literature, JAMB literature skills, unseen poetry drama prose, JAMB Literature skills",
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Tigertest", type: "website", images: [{ url: shareImageUrl("jamblit"), width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [shareImageUrl("jamblit")] },
};
const jsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "WebApplication", name: "Tigertest - JAMB Literature Skills Practice", description, url, applicationCategory: "EducationalApplication", operatingSystem: "Any", offers: examOffers("jamblit", "NGN"), publisher: { "@id": `${SITE_URL}/#organization` }, featureList: ["120 original literary-skills questions", "Four topic drills", "Two 40-question tests", "Prescribed-book knowledge not covered"] },
  { "@type": "FAQPage", mainEntity: [...faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })), classFaqJsonLd("jamblit")] },
] };
const topics = [
  ["Drama", "Dramatic forms, dialogue, stage directions, character, conflict and irony."],
  ["Prose", "Narrators, character development, plot, setting, symbolism and theme."],
  ["Poetry", "Poetic forms, sound patterns, figurative language, structure and persona."],
  ["Literary Appreciation", "Interpret original short extracts and support your reading with evidence."],
];
export default function JambLiteratureLandingPage() {
  return <div data-theme="jamblit" className="flex-1 bg-white dark:bg-gray-900">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="bg-gradient-to-b from-brand-light to-white dark:to-gray-900 px-6 py-16 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">Free JAMB Literature in English Practice Test</h1>
        <ExamLandingHero dashboardHref="/jamb-literature/dashboard" shortName="JAMB Literature" subtitle="120 original questions on literary skills and unseen extracts. Study the prescribed books separately. All drills and tests are free, no account needed." shots={{ mobile: "/landing/jamblit-mobile.png", desktop: "/landing/jamblit-desktop.png" }} />
      </div>
    </div>
    <ExamFacts examId="jamblit" />
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">How It Works</h2>
      <div className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-300">
        <div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practise one area at a time</h3><p>Four topic drills bring back questions you miss. Every answer has an explanation of the literary technique or the evidence supporting the interpretation.</p></div>
        <div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Check your skills</h3><p>Each test has 40 questions in 30 minutes. The second test stays out of the drills. Topic weights and timing are practice choices; the score does not measure your knowledge of the prescribed books.</p></div>
      </div>
    </section>
    <section className="bg-gray-50 dark:bg-gray-950 px-6 py-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_220px] gap-8 items-center">
        <div><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Four areas of literary practice</h2>
          <div className="space-y-4">{topics.map(([name, detail]) => <div key={name}><h3 className="font-semibold text-gray-900 dark:text-gray-50">{name}: 10 questions per test</h3><p className="text-gray-600 dark:text-gray-300">{detail}</p></div>)}</div>
        </div>
        <Image src={getTigerAsset("jamblit", 1)} alt="Tigertest study tiger" width={220} height={220} />
      </div>
    </section>
    <SampleQuestionsV2 examId="jamblit" />
    <section className="max-w-4xl mx-auto px-6 py-16 text-gray-600 dark:text-gray-300">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Study tips</h2>
      <ul className="list-disc pl-5 space-y-3"><li>Keep the current IBASS prescribed-text list beside your study plan. This practice supplements those books.</li><li>When identifying a device, explain what it does in the particular passage.</li><li>Separate the narrator or poetic speaker from the real author.</li><li>Check an interpretation against the words on the page before choosing it.</li></ul>
    </section>
    <section className="max-w-4xl mx-auto px-6 pb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Frequently Asked Questions</h2>
      <div className="space-y-6">{faqs.map(f => <div key={f.q}><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3><p className="text-gray-600 dark:text-gray-300">{f.a}</p></div>)}</div>
    </section>
    <ExamClassFaq examId="jamblit" /><ExamRelatedTests examId="jamblit" />
    <div className="max-w-4xl mx-auto px-6 py-16 text-center"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Build your literary skills</h2><p className="mb-8 text-gray-600 dark:text-gray-300">Start with Drama, then practise prose, poetry and unseen extracts.</p><ExamLandingCTA dashboardHref="/jamb-literature/dashboard" /></div>
  </div>;
}
