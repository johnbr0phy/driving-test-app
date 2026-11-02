import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Free Bihar Police Constable Mock Test 2026 - CSBC Practice Test";
const metaDescription =
  "Free Bihar Police Constable mock tests: 232 original questions on Hindi, English, Mathematics, Social Science, Science and GK at Class 10 level, with two full 100-question CSBC-pattern tests and every answer explained.";
const description =
  "Free Bihar Police Constable practice tests with 232 original questions on the CSBC written exam syllabus: Hindi (in Hindi), English, Mathematics, Social Science (history, civics, geography, economics), Science (physics, chemistry, biology) and General Knowledge with Bihar GK, all at Class 10 (Matric) level. Each mock test has 100 questions in 2 hours, the same length and time as the real paper, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the Bihar Police Constable written exam pattern?",
    a: "Under CSBC Advertisement No. 01/2025, the written exam is one objective OMR paper of 100 questions in 2 hours, with one mark for each correct answer. Questions are at Class 10 (Matric) level on Hindi, English, Mathematics, Social Science (history, geography, civics, economics), Science (physics, chemistry, zoology, botany) and General Knowledge and current affairs. The board does not publish how many questions come from each subject. Tigertest's mock tests have the same 100 questions in 2 hours.",
  },
  {
    q: "Is there negative marking in the Bihar Police Constable exam?",
    a: "Advertisement No. 01/2025 gives one mark for each correct answer and mentions no deduction for wrong answers, and most guides agree there is none. One news report said a quarter mark is deducted, so check the instructions in your own advertisement and admit card. If there is no penalty, never leave a question blank. Tigertest scores percent correct with no deduction.",
  },
  {
    q: "What are the qualifying marks, and does the written score count for selection?",
    a: "A candidate who scores less than 30% in the written exam is declared unsuccessful. The written exam is qualifying only: about five times the vacancies in each reservation category are called to the physical efficiency test on written marks, and the final merit list is made from the physical test's marks (running, high jump and shot put), not the written score. So the aim is a written score comfortably above the cut-off for your category.",
  },
  {
    q: "When was the latest Bihar Police Constable exam?",
    a: "The Central Selection Board of Constable advertised 19,838 constable posts in Bihar Police and the Bihar Special Armed Police in Advertisement No. 01/2025 (11 March 2025). The written exam was held on 16, 20, 23, 27 and 30 July and 3 August 2025, from 12 noon to 2 pm. Check csbc.bihar.gov.in for the next advertisement and its exact pattern.",
  },
  {
    q: "Are these Bihar Police previous year questions?",
    a: "No. Every question is original, written to the Class 10 syllabus the advertisement names, and none is copied from previous papers. Hindi questions are in Hindi, as on the real paper. General Knowledge covers static facts about Bihar, India and the world, not current affairs, so read the news of the past year separately. Both mock tests and all eight drills are free, with no account needed.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Bihar Police Constable mock test, Bihar Police mock test, CSBC constable practice test free, Bihar Police Constable 2026, CSBC sipahi exam questions, Bihar Police GK questions, Bihar Police Hindi questions, Bihar sipahi bharti practice set",
  alternates: {
    canonical: `${siteUrl}/bihar-police-constable-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/bihar-police-constable-practice-test`,
    images: [{ url: shareImageUrl("biharpolice"), width: 1200, height: 630, alt: "Tigertest free Bihar Police Constable mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("biharpolice")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Bihar Police Constable Mock Test",
      description,
      url: `${siteUrl}/bihar-police-constable-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "232 original Bihar Police Constable practice questions with explanations",
        "2 mock tests of 100 questions in 2 hours, the real paper's length and time",
        "8 drills: Hindi, English, Mathematics, history and civics, geography and economics, science, Bihar GK and general knowledge",
        "Hindi questions in Hindi, as on the real paper",
        "Class 10 (Matric) level, as the CSBC advertisement sets",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("biharpolice"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Hindi", weight: "15 per mock" },
  { name: "English", weight: "15 per mock" },
  { name: "Mathematics", weight: "15 per mock" },
  { name: "Social Science", weight: "25 per mock" },
  { name: "Science", weight: "15 per mock" },
  { name: "General Knowledge and Bihar", weight: "15 per mock" },
];

export default function BiharPoliceLandingPage() {
  return (
    <div data-theme="biharpolice" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Bihar Police Constable Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/bihar-police-constable/dashboard"
            shortName="Bihar Police"
            subtitle="232 original questions on Hindi, English, Maths, Social Science, Science and GK. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/biharpolice-mobile.png", desktop: "/landing/biharpolice-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="biharpolice" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills cover every subject in the advertisement: Hindi, English, Mathematics, history and civics, geography and economics, science, Bihar GK and general knowledge. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two full-length mock tests of 100 questions in 2 hours, exactly the size and time of the real paper. Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the CSBC Written Exam Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Central Selection Board of Constable sets one paper of 100 questions at Class 10 (Matric) level across six subjects, but does not publish how many questions come from each. Tigertest&apos;s mock tests use the split below, with Social Science covering history, civics, geography and economics. General Knowledge is static facts about Bihar, India and the world; current affairs are not covered, so follow the news separately.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("biharpolice", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Help Make Tigertest Better</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Have an idea, a topic you&apos;d like covered, or a question that could be clearer? We read every message and use it to improve every test.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Share Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Prepare for the Bihar Police Constable Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Go back to your Class 10 books</h3>
              <p>
                The advertisement sets the paper at Matric level, so the Class 10 textbooks for science, social science and mathematics are the syllabus. Revise the chapters most often asked: light and electricity, acids and metals, life processes, the national movement, the Constitution, resources and agriculture.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know Bihar well</h3>
              <p>
                Expect questions on the state itself: Bodh Gaya, Nalanda, Vaishali and Rajgir, the Ganga and its tributaries, Madhubani painting, Chhath, Sonepur Mela and the leaders of 1857 and the freedom struggle from Bihar. Add the past year&apos;s news for current affairs, which this bank does not cover.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Bank the language marks</h3>
              <p>
                Hindi and English are mostly rules you can learn: synonyms, antonyms, idioms, sandhi and samas, articles, prepositions, voice and narration. A few examples of each rule, practised often, turn these into quick, sure marks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question at exam pace</h3>
              <p>
                With 100 questions in 2 hours you have a little over a minute each. Take a full mock, see which subject ate your time, and drill it. The written exam only decides who reaches the physical test, so a steady, safe score matters more than a perfect one, and the physical test then decides the merit list.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Bihar Police Constable Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="biharpolice" />
        </div>
      </div>

      <ExamRelatedTests examId="biharpolice" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the Bihar Police Constable Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 232 questions across all six subjects.</p>
          <ExamLandingCTA dashboardHref="/bihar-police-constable/dashboard" />
        </div>
      </div>
    </div>
  );
}
