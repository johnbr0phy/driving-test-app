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

const siteUrl = SITE_URL;

const title = "Free Forklift Licence Practice Test Australia (LF) 2026";
const metaDescription =
  "Free forklift licence practice test for the Australian LF high risk work licence (TLILIC0003): 200 original questions on load charts, calculations, checks and safe operation.";
const description =
  "Free practice tests for the knowledge part of the Australian forklift high risk work licence, class LF (unit TLILIC0003): 200 original questions on licensing and WHS duties, hazards and traffic management, pre-start and operational checks, data plates, load charts and load weight calculations, safe operation, attachments, LPG and battery handling and shutdown. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "forklift licence practice test, forklift licence test Australia, LF licence questions, TLILIC0003 practice test, high risk work licence forklift, forklift theory test, forklift load chart questions, free forklift licence test",
  alternates: {
    canonical: `${siteUrl}/forklift-licence-practice-test-australia`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/forklift-licence-practice-test-australia`,
    images: [{ url: shareImageUrl("auforklift"), width: 1200, height: 630, alt: "Tigertest free forklift licence practice test, Australia" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("auforklift")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Forklift Licence Practice Tests (Australia)",
      description,
      url: `${siteUrl}/forklift-licence-practice-test-australia`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "200 forklift licence practice questions",
        "4 practice tests across all six topic groups",
        "4 training sets, one per practice test",
        "Load chart and load weight calculation questions",
        "Instant feedback with explanations",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I get a forklift licence in Australia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Operating a forklift truck at work is high risk work, so you need a high risk work licence of class LF. You train with a registered training organisation, then pass a knowledge assessment and a practical assessment with an accredited assessor for the unit TLILIC0003. You then apply to your state or territory WHS regulator, usually within 60 days of the assessment, and must be at least 18.",
          },
        },
        {
          "@type": "Question",
          name: "What is in the forklift licence knowledge assessment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The knowledge assessment covers WHS duties and the licence rules, hazards and traffic management, pre-start and operational checks, reading the data plate and load chart, working out the weight of a load, stability, safe operation, attachments, refuelling and battery charging, and shutdown. It is marked by an accredited assessor using the national assessment materials, and you must also pass the practical on a real forklift.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to do calculations for the forklift licence?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You need to work out the weight of a load from labels, paperwork or by weighing one carton and multiplying, then check it against the data plate and load chart for the load centre and lift height. The practice tests here include those calculations, with the working shown in every explanation.",
          },
        },
        {
          "@type": "Question",
          name: "How long does an LF licence last, and does it work in other states?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A high risk work licence is issued for 5 years and should be renewed before it expires; leave it too long past expiry and you must be reassessed. A licence issued in one state or territory is recognised in all the others, so you can keep operating if you move, though fees and renewal steps vary by state.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the official forklift licence test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. These are 200 original practice questions written to the TLILIC0003 unit and the topics the licence assessment covers, not the official assessment instrument. Use them to prepare for your course and assessment; the 80 percent pass line here is a study target, not the official marking.",
          },
        },
        classFaqJsonLd("auforklift"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Licensing, WHS Law & Duties", weight: "14%" },
  { name: "Planning, Hazards & Traffic", weight: "18%" },
  { name: "Pre-start & Operational Checks", weight: "16%" },
  { name: "Load Charts, Stability & Calculations", weight: "20%" },
  { name: "Safe Operation & Load Handling", weight: "20%" },
  { name: "Attachments, Fuel & Shutdown", weight: "12%" },
];

export default function AuForkliftLandingPage() {
  return (
    <div data-theme="auforklift" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Forklift Licence Practice Test (LF)
          </h1>
          <ExamLandingHero
            dashboardHref="/au-forklift-licence/dashboard"
            shortName="Forklift Licence"
            subtitle="200 questions for the Australian LF high risk work licence: load charts, load weight calculations, pre-start checks, safe operation, LPG and batteries. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/auforklift-mobile.png", desktop: "/landing/auforklift-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="auforklift" />

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
                Four 50-question tests across all six topic groups, with an 80 percent practice pass line and an explanation on every item, including the working for every load calculation.
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
                Built on the TLILIC0003 Unit
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The LF licence is assessed against the national unit TLILIC0003, Licence to operate a forklift truck. Its knowledge evidence covers WHS law and the hierarchy of control, communication, hazards and work surfaces, pre-start and operational checks, data plates and load weights, stability, attachments, refuelling and recharging, and shutdown. The practice tests split their questions across those topics, with load charts, calculations and safe operation taking the most.
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
                src={getTigerAsset("auforklift", 1)}
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Trainers and RTOs</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Running a forklift licence course? Set up a free class at{" "}
          <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
          , share one link, and see which load chart, calculation and safety questions your group misses most before assessment day. Use it alongside your own course materials and practical training.
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
            How to Pass Your Forklift Licence Assessment
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the load chart</h3>
              <p>
                Capacity is only true at the load centre and lift height on the plate. Know that a longer load centre or a higher lift means less capacity, use the next longer load centre when yours falls between columns, and remember that an attachment has its own rating: work to the lower figure.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise the load weight sums</h3>
              <p>
                Most calculations are cartons times weight, plus the pallet. Write each step down, check the pallet is included, and compare the total with the chart for the load centre you will actually have. An evenly loaded standard Australian pallet has a load centre of about 583 mm, more than the common 500 mm rating.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your checks in order</h3>
              <p>
                Be able to talk through the pre-start (visual and fluid checks, data plate, forks, chains, tyres, seatbelt, logbook) and the operational check (every control, full hydraulic travel, brakes, steering, warning devices), and what to do with a defect: tag it out and report it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. After each test, drill the questions you missed and retrain that test&apos;s set until it is mastered, then take the four tests back to back before assessment day. Licence fees, forms and timeframes vary by state, so check your regulator&apos;s website as well.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Forklift Licence Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How do I get a forklift licence in Australia?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Operating a forklift truck at work is high risk work, so you need a high risk work licence of class LF. You train with a registered training organisation, then pass a knowledge assessment and a practical assessment with an accredited assessor for the unit TLILIC0003. You then apply to your state or territory WHS regulator, usually within 60 days of the assessment, and must be at least 18.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is in the forklift licence knowledge assessment?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The knowledge assessment covers WHS duties and the licence rules, hazards and traffic management, pre-start and operational checks, reading the data plate and load chart, working out the weight of a load, stability, safe operation, attachments, refuelling and battery charging, and shutdown. It is marked by an accredited assessor using the national assessment materials, and you must also pass the practical on a real forklift.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do I need to do calculations for the forklift licence?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. You need to work out the weight of a load from labels, paperwork or by weighing one carton and multiplying, then check it against the data plate and load chart for the load centre and lift height. The practice tests here include those calculations, with the working shown in every explanation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How long does an LF licence last, and does it work in other states?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              A high risk work licence is issued for 5 years and should be renewed before it expires; leave it too long past expiry and you must be reassessed. A licence issued in one state or territory is recognised in all the others, so you can keep operating if you move, though fees and renewal steps vary by state.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the official forklift licence test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. These are 200 original practice questions written to the TLILIC0003 unit and the topics the licence assessment covers, not the official assessment instrument. Use them to prepare for your course and assessment; the 80 percent pass line here is a study target, not the official marking.
            </p>
          </div>
          <ExamClassFaq examId="auforklift" />
        </div>
      </div>

      <ExamRelatedTests examId="auforklift" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Forklift Licence?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all six LF topic groups.</p>
          <ExamLandingCTA dashboardHref="/au-forklift-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}
