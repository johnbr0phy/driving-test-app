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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Personal Licence Practice Test 2026 - Free APLH Mock Exams";
const metaDescription =
  "Free personal licence practice test for the Level 2 APLH: 200 original questions on the Licensing Act 2003, TENs, the DPS and underage sales, every answer explained.";
const description =
  "Free practice for the Level 2 Award for Personal Licence Holders in England and Wales: 200 original questions on the licensing objectives and authorities, personal licences, premises licences and mandatory conditions, the designated premises supervisor, licensable activities and temporary event notices, police powers and offences, protecting children, and alcohol units and responsible retail. Four 50-question mock tests with the real 70 percent pass line and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "personal licence practice test, APLH mock exam, award for personal licence holders questions, personal licence exam questions 2026, Licensing Act 2003 quiz, personal licence course test, DPS exam practice",
  alternates: {
    canonical: `${siteUrl}/personal-licence-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/personal-licence-practice-test`,
    images: [{ url: shareImageUrl("ukaplh"), width: 1200, height: 630, alt: "Tigertest free personal licence practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukaplh")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Personal Licence Practice Test",
      description,
      url: `${siteUrl}/personal-licence-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 personal licence practice questions",
        "4 mock tests of 50 questions with a 70 percent pass line",
        "4 training sets, one per mock test",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the pass mark for the personal licence exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Level 2 Award for Personal Licence Holders is a 40-question multiple-choice exam, and you need 28 correct to pass, which is 70 percent. Depending on the awarding body you get between 40 and 60 minutes. The mock tests here are 50 questions long with the same 70 percent line, so 35 of 50 is a pass.",
          },
        },
        {
          "@type": "Question",
          name: "What does the personal licence course cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The course follows the Licensing Act 2003: the four licensing objectives and the role of licensing authorities, applying for and keeping a personal licence, premises licences, operating schedules and mandatory conditions, the designated premises supervisor, licensable activities, unauthorised activities and temporary event notices, police and council powers of entry and closure, offences such as selling to a drunk person, protecting children from harm, and alcohol units and their effects.",
          },
        },
        {
          "@type": "Question",
          name: "How do I get a personal licence after passing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Apply to the licensing authority for the area where you live. You need to be 18 or over and send your qualification certificate, a basic criminal record check, two photographs, proof of your right to work in the UK and the fee. If you have an unspent relevant offence the police can object within 14 days. Once granted, the licence lasts indefinitely; it no longer needs renewing.",
          },
        },
        {
          "@type": "Question",
          name: "Does the personal licence cover Scotland and Northern Ireland?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. These questions follow the Licensing Act 2003, which applies in England and Wales. Scotland has its own personal licence and qualification under the Licensing (Scotland) Act 2005, with a fifth objective on public health, and Northern Ireland has separate liquor licensing law.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the official exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is written by Tigertest from the Licensing Act 2003, the mandatory licensing conditions and the Home Office section 182 guidance, so it tests the same law without copying any awarding body's papers. The real exam is set by the awarding body that runs your course, and question wording varies between them.",
          },
        },
        classFaqJsonLd("ukaplh"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Licensing Objectives & Authorities", weight: "12%" },
  { name: "Personal Licences", weight: "14%" },
  { name: "Premises Licences & Conditions", weight: "16%" },
  { name: "Designated Premises Supervisor", weight: "8%" },
  { name: "Licensable Activities & TENs", weight: "14%" },
  { name: "Police Powers & Offences", weight: "12%" },
  { name: "Protecting Children", weight: "14%" },
  { name: "Alcohol & Responsible Retail", weight: "10%" },
];

export default function PersonalLicencePracticeTestLandingPage() {
  return (
    <div data-theme="ukaplh" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Personal Licence Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/personal-licence/dashboard"
            shortName="Personal Licence"
            subtitle="200 questions on the Licensing Act 2003 for the Level 2 Award for Personal Licence Holders: objectives, premises licences, the DPS, TENs, police powers and underage sales. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukaplh-mobile.png", desktop: "/landing/ukaplh-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukaplh" />

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
                Four training sets, one per mock test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question mock tests, a little longer than the real 40-question paper, with the same 70 percent pass line and an explanation of the right answer on every question.
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
                Built on the Licensing Act 2003
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The award is a single unit on the legal and social responsibilities of a personal licence holder, and the awarding bodies do not publish how many questions each topic gets. The mock tests here split the course into eight areas and lean on the ones with the most rules to learn: premises licences and their conditions, personal licences, temporary event notices and underage sales. Every question is original and checked against the current Act and the section 182 guidance.
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
                src={getTigerAsset("ukaplh", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For trainers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Running a Personal Licence Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Trainers can set Tigertest as practice for free: post one link, learners join with just their name, and you see who practised, their mock test scores and the topics your group misses most before exam day.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a Class
          </Link>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Pass the Personal Licence Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers by heart</h3>
              <p>
                A handful of figures carry many marks: 4 licensing objectives, 18 as the minimum age, 14 days for police objections, 28 days for the blue notice and representations, 21 days to appeal, and for TENs 499 people, 168 hours, 15 notices and 21 days per premises a year, 50 for a personal licence holder and 5 for anyone else, with 10 working days&apos; notice.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know who does what</h3>
              <p>
                Many questions turn on roles. You apply for a personal licence where you live and for a premises licence where the premises are. The licensing authority grants licences, responsible authorities and other persons make representations, the DPS runs the premises day to day, and every sale is made or authorised by a personal licence holder.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Get the children rules exact</h3>
              <p>
                Selling to anyone under 18 is an offence, proxy buying is an offence, and persistent selling means two sales within three months. The one exception is a 16 or 17-year-old drinking beer, wine or cider with a table meal, bought by an accompanying adult. Unaccompanied under-16s are barred from pubs used mainly for drinking.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim to score 40 or more out of 50 on all four mock tests before exam day, so you have room above the 70 percent line. After each test, drill the questions you missed and retrain that test&apos;s set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Personal Licence Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the personal licence exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Level 2 Award for Personal Licence Holders is a 40-question multiple-choice exam, and you need 28 correct to pass, which is 70 percent. Depending on the awarding body you get between 40 and 60 minutes. The mock tests here are 50 questions long with the same 70 percent line, so 35 of 50 is a pass.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the personal licence course cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The course follows the Licensing Act 2003: the four licensing objectives and the role of licensing authorities, applying for and keeping a personal licence, premises licences, operating schedules and mandatory conditions, the designated premises supervisor, licensable activities, unauthorised activities and temporary event notices, police and council powers of entry and closure, offences such as selling to a drunk person, protecting children from harm, and alcohol units and their effects.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How do I get a personal licence after passing?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Apply to the licensing authority for the area where you live. You need to be 18 or over and send your qualification certificate, a basic criminal record check, two photographs, proof of your right to work in the UK and the fee. If you have an unspent relevant offence the police can object within 14 days. Once granted, the licence lasts indefinitely; it no longer needs renewing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does the personal licence cover Scotland and Northern Ireland?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. These questions follow the Licensing Act 2003, which applies in England and Wales. Scotland has its own personal licence and qualification under the Licensing (Scotland) Act 2005, with a fifth objective on public health, and Northern Ireland has separate liquor licensing law.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the official exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is written by Tigertest from the Licensing Act 2003, the mandatory licensing conditions and the Home Office section 182 guidance, so it tests the same law without copying any awarding body&apos;s papers. The real exam is set by the awarding body that runs your course, and question wording varies between them.
            </p>
          </div>
          <ExamClassFaq examId="ukaplh" />
        </div>
      </div>

      <ExamRelatedTests examId="ukaplh" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Personal Licence Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on the Licensing Act 2003.</p>
          <ExamLandingCTA dashboardHref="/personal-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
