import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free UPSC Prelims Mock Test 2027 - GS Paper I Practice";
const metaDescription =
  "Free UPSC Prelims mock tests: two full 100-question GS Paper I papers in 2 hours, subject drills in the UPSC statement format and a CSAT drill, with 234 original questions and every answer explained.";
const description =
  "Free UPSC Civil Services Prelims practice with 234 original questions: two full-length General Studies Paper I mocks of 100 questions in 2 hours, seven subject drills (ancient and medieval history and culture, modern history, geography, polity, economy, environment, science) and a CSAT drill for the qualifying Paper II. Static syllabus only, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the UPSC Prelims exam pattern?",
    a: "The Civil Services (Preliminary) Examination has two compulsory objective papers of 200 marks each, each two hours long, set in Hindi and English. Paper I, General Studies, decides who qualifies for the Main examination. Paper II, CSAT, is qualifying: you need 33% in it, and its marks do not count towards the cut-off. Guides list 100 questions in Paper I and 80 in Paper II. Prelims marks only screen candidates; they do not count in the final ranking.",
  },
  {
    q: "Is there negative marking in UPSC Prelims?",
    a: "Yes. Every question has four options, and one-third of the marks for a question is deducted for each wrong answer. Marking more than one answer counts as wrong, and a question left blank costs nothing. A blind guess among four options breaks even on average; once you can rule out an option, a guess gains marks on average. Tigertest scores percent correct without the deduction, so keep count of your guesses.",
  },
  {
    q: "Why does this practice test have only one CSAT drill?",
    a: "CSAT (General Studies Paper II) is a qualifying paper with a 33% pass mark, while the cut-off for the Main examination is set on GS Paper I alone. So the full mock tests here are GS Paper I, and CSAT comes as one drill of reading comprehension, reasoning and Class X level numeracy to check that you clear the 33% comfortably.",
  },
  {
    q: "Are these UPSC previous year questions?",
    a: "No. Every question is original, written to the GS Paper I syllabus in the UPSC notice, and many use the statement and pair formats the Commission uses. The bank covers the static syllabus only: history, geography, polity, economy, environment and science. Current events of national and international importance are a large part of the real paper, so follow the news for the year before your exam alongside these drills. Tigertest is not affiliated with the Union Public Service Commission.",
  },
  {
    q: "Is the Tigertest UPSC Prelims mock test free?",
    a: "Yes. Both full GS Paper I mocks, the seven subject drills and the CSAT drill are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "UPSC Prelims mock test, UPSC Prelims practice test, UPSC GS Paper 1 mock test free, UPSC Prelims 2027, IAS prelims mock test, civil services prelims questions, UPSC polity questions, UPSC CSAT practice",
  alternates: {
    canonical: `${siteUrl}/upsc-prelims-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/upsc-prelims-practice-test`,
    images: [{ url: shareImageUrl("upscse"), width: 1200, height: 630, alt: "Tigertest free UPSC Prelims mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("upscse")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free UPSC Prelims Mock Test",
      description,
      url: `${siteUrl}/upsc-prelims-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "234 original UPSC Prelims practice questions with explanations",
        "2 full GS Paper I mock tests of 100 questions in 2 hours",
        "7 subject drills: ancient and medieval history and culture, modern history, geography, polity, economy, environment, science",
        "A CSAT drill of comprehension, reasoning and basic numeracy",
        "UPSC statement and pair formats",
        "Negative marking explained, with percent-correct scoring",
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
        classFaqJsonLd("upscse"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Ancient and Medieval India, Art and Culture", weight: "14 questions" },
  { name: "Modern India and the National Movement", weight: "14 questions" },
  { name: "Indian and World Geography", weight: "16 questions" },
  { name: "Indian Polity and Governance", weight: "16 questions" },
  { name: "Economic and Social Development", weight: "14 questions" },
  { name: "Environment, Ecology and Climate Change", weight: "14 questions" },
  { name: "General Science and Technology", weight: "12 questions" },
];

export default function UpscPrelimsLandingPage() {
  return (
    <div data-theme="upscse" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free UPSC Prelims Mock Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/upsc-prelims/dashboard"
            shortName="UPSC Prelims"
            subtitle="234 original GS Paper I questions in the UPSC statement format, plus a CSAT drill. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/upscse-mobile.png", desktop: "/landing/upscse-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="upscse" />

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
                Seven GS drills cover the static syllabus: ancient and medieval history and culture, modern history, geography, polity, economy, environment and science, plus a CSAT drill for Paper II. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full GS Paper I Mocks</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 100-question mock tests in 2 hours, the real GS Paper I length, with subjects mixed as on the day. Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the GS Paper I Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                UPSC publishes the GS Paper I syllabus but no subject weights, and the mix changes every year. Each mock here follows Tigertest&apos;s own split of the static syllabus below. Current events, which the real paper also tests, are left out. In the real exam each wrong answer costs one-third of a question&apos;s marks, so practise leaving a question blank when you cannot rule anything out.
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
                src={getTigerAsset("upscse", 1)}
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
            How to Prepare for UPSC Prelims
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Build the static base from NCERTs</h3>
              <p>
                History, geography, polity and economy questions reward a firm base: the NCERT books, a standard polity text and the Constitution itself. Drill each subject here until you can say why every wrong option is wrong, not just which option is right.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn to read statement questions</h3>
              <p>
                Many questions give two or three statements and ask which are correct, or how many pairs are correctly matched. Judge each statement on its own before looking at the options. Words such as &quot;only&quot;, &quot;all&quot; and &quot;always&quot; often decide them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not neglect CSAT</h3>
              <p>
                Paper II only has to be cleared at 33%, but if you fall short your GS marks do not count. Use the CSAT drill to find out early whether comprehension or numeracy needs work, especially if maths was not part of your degree.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Manage the negative marking</h3>
              <p>
                With one-third of a question&apos;s marks lost for each wrong answer, accuracy matters more than attempting everything. Take a full two-hour mock, count how many of your guesses were wrong, and decide on a guessing rule you will use on the day. Add a year of current affairs on top of this static practice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          UPSC Prelims Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="upscse" />
        </div>
      </div>

      <ExamRelatedTests examId="upscse" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for UPSC Prelims?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 234 questions across GS Paper I and CSAT.</p>
          <ExamLandingCTA dashboardHref="/upsc-prelims/dashboard" />
        </div>
      </div>
    </div>
  );
}
