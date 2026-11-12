import "@/lib/banks/ukwater";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Water Regulations Practice Test 2026 - Free Water Regs Mock Exams";
const metaDescription =
  "Free Water Regulations practice for the City & Guilds 3345 and BPEC tests: 200 original questions on fluid categories, backflow, notification and Schedule 2.";
const description =
  "Free practice for the UK Water Regulations certificate on the Water Supply (Water Fittings) Regulations 1999: 200 original questions on the regulations and notification, water fittings and materials, system design and testing, fluid categories, backflow prevention, cold and hot water services, and WCs, taps and appliances. Four 50-question practice tests with an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "water regulations practice test, water regs mock exam, water regulations questions and answers, city and guilds 3345 practice, bpec water regulations test, fluid categories quiz, backflow prevention questions, water fittings regulations 1999",
  alternates: {
    canonical: `${siteUrl}/water-regulations-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/water-regulations-practice-test`,
    images: [{ url: shareImageUrl("ukwater"), width: 1200, height: 630, alt: "Tigertest free Water Regulations practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukwater")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Water Regulations Practice",
      description,
      url: `${siteUrl}/water-regulations-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ukwater", "GBP"),
      featureList: ["200 Water Regulations practice questions", "4 practice tests of 50 questions", "4 training sets by topic", "Instant feedback with explanations", "Auto-save progress"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the Water Regulations test open book?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. City & Guilds lets candidates take the Water Regulations Guide into the 3345 test, and BPEC allows its training manual and course notes. You still need to know where things are, because there is not time to look up every answer." },
        },
        {
          "@type": "Question",
          name: "What pass mark do I need?",
          acceptedAnswer: { "@type": "Answer", text: "BPEC's Water Regulations and Byelaws test needs 42 of 52 (80%), with a second attempt on the missed questions if you score 37 to 41. City & Guilds does not publish its mark. Tigertest uses 80% as the line." },
        },
        {
          "@type": "Question",
          name: "Does this cover Scotland and Northern Ireland?",
          acceptedAnswer: { "@type": "Answer", text: "The questions follow the 1999 Regulations for England and Wales. Scotland's Byelaws 2014 and Northern Ireland's 2009 Regulations are almost the same; where they differ, such as the 20°C cold water limit and notifying Scottish Water or NI Water, the question says so." },
        },
        {
          "@type": "Question",
          name: "Does passing make me an approved plumber?",
          acceptedAnswer: { "@type": "Answer", text: "No. The certificate is the evidence most approved contractors' schemes ask for, but you join a scheme (WIAPS, APHC, CIPHE or SNIPEF) separately. Approved contractors can skip notifying some jobs and issue compliance certificates." },
        },
        {
          "@type": "Question",
          name: "Is the new backflow specification included?",
          acceptedAnswer: { "@type": "Answer", text: "Defra published a new Specification on the Prevention of Backflow on 6 May 2026, which takes effect on 6 May 2027. The device types and fluid categories asked here are the same in both; the new Type AUK4 air gap for WC suites is left out until it is in force." },
        },
        classFaqJsonLd("ukwater"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "The Regulations & Notification", weight: "12%" },
  { name: "Water Fittings & Materials", weight: "14%" },
  { name: "System Design, Testing & Flushing", weight: "16%" },
  { name: "Fluid Categories & Cross Connection", weight: "12%" },
  { name: "Backflow Prevention", weight: "20%" },
  { name: "Cold Water Services", weight: "8%" },
  { name: "Hot Water Services", weight: "8%" },
  { name: "WCs, Taps, Appliances & Outside Use", weight: "10%" },
];

export default function UkwaterLandingPage() {
  return (
    <div data-theme="ukwater" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Water Regulations Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/water-regulations/dashboard"
            shortName="Water Regulations"
            subtitle="200 questions on the Water Supply (Water Fittings) Regulations 1999 for the City & Guilds 3345 and BPEC tests: fluid categories, backflow devices, notification and the Schedule 2 rules. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukwater-mobile.png", desktop: "/landing/ukwater-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukwater" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, from The Regulations & Fluid Categories to Backflow Prevention. Master a topic, then take a test. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question practice tests across every topic, with an 80% pass line like BPEC&apos;s and an explanation of the right answer on every question.
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
                Built on the Water Regulations Topics You Are Tested On
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                No awarding body publishes how many questions come from each topic, so the practice tests follow the City & Guilds 3345 test specification topics and put the most weight on backflow prevention and system design, where most marks are lost. Every question is original and written from the 1999 Regulations and Schedule 2.
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
                src={getTigerAsset("ukwater", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For teachers */}
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Course Tutors</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Running a Water Regulations course? Set Tigertest as practice between sessions at{" "}
          <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
          {" "}and see which topics your group misses most before the assessment. It is free for you and your learners.
        </p>
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
            How to Pass the Water Regulations Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the five fluid categories cold</h3>
              <p>
                Most backflow questions start from the fluid category: drinking water is 1, aesthetic changes 2, slight hazard 3, significant hazard 4 and serious hazard 5. Learn an example of each, then the devices allowed for each category.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn what must be notified</h3>
              <p>
                Know which jobs need the water company&apos;s consent before work starts, how much notice is needed, and which jobs an approved contractor can do without notifying.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Use the open book, but do not rely on it</h3>
              <p>
                The test is open book, but there is not time to look up every answer. Tab the fluid category tables and the backflow device schedule, and know the common figures (test pressures, temperatures, WC flush volumes) without looking.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 90 percent on every practice test before the real one, so you have room above the 80 percent line.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Water Regulations Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is the Water Regulations test open book?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. City & Guilds lets candidates take the Water Regulations Guide into the 3345 test, and BPEC allows its training manual and course notes. You still need to know where things are, because there is not time to look up every answer.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What pass mark do I need?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              BPEC&apos;s Water Regulations and Byelaws test needs 42 of 52 (80%), with a second attempt on the missed questions if you score 37 to 41. City & Guilds does not publish its mark. Tigertest uses 80% as the line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this cover Scotland and Northern Ireland?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The questions follow the 1999 Regulations for England and Wales. Scotland&apos;s Byelaws 2014 and Northern Ireland&apos;s 2009 Regulations are almost the same; where they differ, such as the 20°C cold water limit and notifying Scottish Water or NI Water, the question says so.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does passing make me an approved plumber?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. The certificate is the evidence most approved contractors&apos; schemes ask for, but you join a scheme (WIAPS, APHC, CIPHE or SNIPEF) separately. Approved contractors can skip notifying some jobs and issue compliance certificates.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is the new backflow specification included?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Defra published a new Specification on the Prevention of Backflow on 6 May 2026, which takes effect on 6 May 2027. The device types and fluid categories asked here are the same in both; the new Type AUK4 air gap for WC suites is left out until it is in force.
            </p>
          </div>
          <ExamClassFaq examId="ukwater" />
        </div>
      </div>

      <ExamSampleQuestions examId="ukwater" />

      <ExamRelatedTests examId="ukwater" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Water Regulations?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every topic.</p>
          <ExamLandingCTA dashboardHref="/water-regulations/dashboard" />
        </div>
      </div>
    </div>
  );
}
