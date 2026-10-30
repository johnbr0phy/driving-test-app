import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "ADI Part 1 Practice Test 2026 - Free Mock Tests";
const metaDescription =
  "Free ADI part 1 practice: 200 questions across the four bands, from road procedure to instructional techniques, every answer explained. Four mock tests.";
const description =
  "Free ADI part 1 practice tests with 200 original questions across the four DVSA bands: road procedure; traffic signs and signals, car control, pedestrians and mechanical knowledge; the driving test, disabilities and the law; and publications and instructional techniques. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ADI part 1 practice test, ADI theory test, driving instructor theory test, ADI part 1 questions, DVSA ADI part 1 2026, free ADI theory test practice, approved driving instructor test",
  alternates: {
    canonical: `${siteUrl}/adi-part-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/adi-part-1-practice-test`,
    images: [{ url: "/og/ukadi", width: 1200, height: 630, alt: "Tigertest free ADI part 1 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/ukadi"],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ADI Part 1 Practice Tests",
      description,
      url: `${siteUrl}/adi-part-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 ADI part 1 practice questions",
        "4 practice tests across all four DVSA bands",
        "4 training sets, one per practice test",
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
          name: "What is the pass mark for ADI part 1?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need at least 85 out of 100 on the multiple-choice part and at least 20 out of 25 in each of the four bands, so a high total cannot hide a weak band. You also need 57 out of 75 on the hazard perception part, taken in the same sitting. The practice tests here use an 85 percent pass line; aim to clear it on all four tests and to score at least 80 percent in every topic.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the ADI part 1 test and how long do I get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The multiple-choice part has 100 questions in 1 hour 30 minutes, and you can flag questions and go back to them. After a break of up to 3 minutes comes the hazard perception part: 14 video clips, one of which has two developing hazards, scored up to 5 points per hazard.",
          },
        },
        {
          "@type": "Question",
          name: "What are the four bands on ADI part 1?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Road procedure; traffic signs and signals, car control, pedestrians and mechanical knowledge; driving test, disabilities and the law; and publications and instructional techniques. Each band is 25 questions. Here each band is split into two topics, so your results show exactly where you lose marks.",
          },
        },
        {
          "@type": "Question",
          name: "How much does ADI part 1 cost and what happens after I pass?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The test costs 81 pounds. You can book it once DVSA has accepted your application to start the qualifying process. After passing, you have 2 years to pass part 2 (driving ability) and part 3 (instructional ability). If you fail part 1, you can retake it after at least 3 working days.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the official DVSA revision questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question here is original, written from the books DVSA lists for the test: the Highway Code, Know Your Traffic Signs, the national standards, the ADI code of practice and the driving test rules. The hazard perception part is not modelled, so practise it separately with video clips. It is a study tool, not a DVSA product.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Road Procedure", weight: "14%" },
  { name: "Speed, Motorways & Conditions", weight: "12%" },
  { name: "Traffic Signs & Signals", weight: "12%" },
  { name: "Car Control, Pedestrians & Mechanical", weight: "12%" },
  { name: "The Driving Test", weight: "12%" },
  { name: "Disabilities & the Law", weight: "14%" },
  { name: "Publications & ADI Rules", weight: "12%" },
  { name: "Instructional Techniques", weight: "12%" },
];

export default function AdiPart1LandingPage() {
  return (
    <div data-theme="ukadi" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ADI Part 1 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/adi-part-1/dashboard"
            shortName="ADI Part 1"
            subtitle="200 original questions across the four DVSA bands: road procedure, signs and car control, the driving test and the law, and publications and instructional techniques. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukadi-mobile.png", desktop: "/landing/ukadi-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukadi" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
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
                Four 50-question tests with the four DVSA bands in near-equal measure (13, 12, 13 and 12 questions), an 85 percent pass line like the real test, and an explanation of the right answer and the common wrong pick on every item.
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
                Built on the Four DVSA Bands
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real test gives each of the four bands 25 questions and fails anyone who scores under 20 in any one of them. The practice tests here keep the bands level and split each into two topics, so a weak area shows up before test day. Publications and instructional techniques is the band furthest from everyday driving, because it asks about the national standards and teaching methods.
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
                src={getTigerAsset("ukadi", 1)}
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
            How to Pass ADI Part 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the Highway Code to the number</h3>
              <p>
                ADI part 1 expects more than a learner knows. Learn the figures: stopping distances at every speed, the national speed limits for cars and for towing, the 1.5 metre and 2 metre passing gaps, the 10 metre junction rule, the drink-drive limits in England, Wales and Scotland, and the hierarchy of road users and rules H1 to H3 added in 2022.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the tests you will teach and take</h3>
              <p>
                The driving test band covers the learner test (eyesight at 20 metres, one tell me and one show me question, up to 15 driving faults, the reversing exercises) and the instructor tests (27 metres and 6 driving faults on part 2, 17 competencies scored 0 to 3 on part 3). Mixing the two sets of numbers up is the most common slip.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the national standards and the code of practice</h3>
              <p>
                Publications and instructional techniques is the band a good driver knows least about. Read the national standard for driver and rider training, the ADI code of practice and a teaching text, and be sure of client-centred learning, open questions, fault analysis, the GROW model, the GDE matrix and how responsibility for risk passes to the pupil.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Because the real test needs 20 of 25 in every band, aim for 80 percent or more in every topic, not just 85 percent overall. After each test, drill the questions you missed and retrain that test&apos;s set, and practise hazard perception clips separately, since that part is not modelled here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ADI Part 1 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for ADI part 1?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need at least 85 out of 100 on the multiple-choice part and at least 20 out of 25 in each of the four bands, so a high total cannot hide a weak band. You also need 57 out of 75 on the hazard perception part, taken in the same sitting. The practice tests here use an 85 percent pass line; aim to clear it on all four tests and to score at least 80 percent in every topic.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the ADI part 1 test and how long do I get?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The multiple-choice part has 100 questions in 1 hour 30 minutes, and you can flag questions and go back to them. After a break of up to 3 minutes comes the hazard perception part: 14 video clips, one of which has two developing hazards, scored up to 5 points per hazard.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What are the four bands on ADI part 1?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Road procedure; traffic signs and signals, car control, pedestrians and mechanical knowledge; driving test, disabilities and the law; and publications and instructional techniques. Each band is 25 questions. Here each band is split into two topics, so your results show exactly where you lose marks.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How much does ADI part 1 cost and what happens after I pass?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The test costs 81 pounds. You can book it once DVSA has accepted your application to start the qualifying process. After passing, you have 2 years to pass part 2 (driving ability) and part 3 (instructional ability). If you fail part 1, you can retake it after at least 3 working days.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the official DVSA revision questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question here is original, written from the books DVSA lists for the test: the Highway Code, Know Your Traffic Signs, the national standards, the ADI code of practice and the driving test rules. The hazard perception part is not modelled, so practise it separately with video clips. It is a study tool, not a DVSA product.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="ukadi" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass ADI Part 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all four DVSA bands.</p>
          <ExamLandingCTA dashboardHref="/adi-part-1/dashboard" />
        </div>
      </div>
    </div>
  );
}
