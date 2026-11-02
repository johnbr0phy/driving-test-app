import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/iedtt";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Ireland Driver Theory Test 2026 - Free Practice Tests";
const metaDescription =
  "Free Irish Driver Theory Test practice: 200 original questions from the RSA Rules of the Road, five 40-question tests with the real 35 to pass, all explained.";
const description =
  "Free practice for the Irish Driver Theory Test with 200 original questions written from the RSA Rules of the Road: learner permits and documents, traffic signs, road markings and traffic lights, speed limits, junctions and roundabouts, motorways and parking, vulnerable road users, alcohol, distraction and seatbelts, and bad weather, breakdowns and collisions. Five 40-question tests with the real 35 to pass and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Driver Theory Test Ireland, Irish theory test, DTT practice test, RSA theory test, theory test Ireland 2026, Rules of the Road test, learner permit test Ireland, free theory test questions Ireland",
  alternates: {
    canonical: `${siteUrl}/ireland-driver-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ireland-driver-theory-test`,
    images: [{ url: shareImageUrl("iedtt"), width: 1200, height: 630, alt: "Tigertest free Ireland Driver Theory Test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("iedtt")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Ireland Driver Theory Test Practice",
      description,
      url: `${siteUrl}/ireland-driver-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 original Driver Theory Test practice questions",
        "5 practice tests of 40 questions, 35 to pass",
        "5 training sets, one per practice test",
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
          name: "What score do I need to pass the Driver Theory Test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need 35 correct answers out of 40, which is 87.5 percent. You have 45 minutes. The practice tests here use the same 40 questions and the same 35 to pass, so a pass here means you are scoring at the real standard.",
          },
        },
        {
          "@type": "Question",
          name: "How does the Driver Theory Test work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The car test (category BW, car, tractor and work vehicles) is 40 multiple-choice questions taken on a computer at an official test centre in 45 minutes. You book online at theorytest.ie and bring photo identification. Your score report shows which category areas you got right and wrong, so you know what to study before a retake.",
          },
        },
        {
          "@type": "Question",
          name: "When do I need to take the theory test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Before your first learner permit. You must pass the Driver Theory Test and send the certificate to the NDLS with your learner permit application, and the certificate is valid for two years from the test date. You must be 17 to hold a car learner permit, and from 1 November 2026 the minimum age to sit the theory test is 15.",
          },
        },
        {
          "@type": "Question",
          name: "What happens after I pass?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Apply to the NDLS for a learner permit with your theory test certificate and an eyesight report. As a learner you display L-plates front and rear, drive only with someone who has held a full licence for at least two years, never use a motorway, and take 12 Essential Driver Training lessons with an approved instructor. After six months you can sit the driving test, then show N-plates for two years.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real theory test questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The RSA's official question bank is copyrighted and sold separately. Every question here is original, written from the RSA's Rules of the Road: signs, road markings, junctions and roundabouts, speed limits, motorways, vulnerable road users, alcohol and seatbelts, bad weather and collisions. Signs are described in words, so study the pictures in the Rules of the Road too. It is a study tool, not a licence.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Traffic Signs", weight: "8 of 40" },
  { name: "Speed, Junctions & Overtaking", weight: "8 of 40" },
  { name: "Vulnerable Road Users", weight: "5 of 40" },
  { name: "Alcohol, Distraction & Seatbelts", weight: "5 of 40" },
  { name: "Licences, Permits & Documents", weight: "4 of 40" },
  { name: "Road Markings & Traffic Lights", weight: "4 of 40" },
  { name: "Motorways, Tunnels & Parking", weight: "3 of 40" },
  { name: "Weather, Breakdowns & Collisions", weight: "3 of 40" },
];

export default function IrelandDriverTheoryLandingPage() {
  return (
    <div data-theme="iedtt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Ireland Driver Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ireland-driver-theory/dashboard"
            shortName="Theory Test"
            subtitle="200 original questions on Irish road signs, road markings, speed limits, roundabouts, motorways, learner rules and safe driving, written from the RSA Rules of the Road. Five 40-question tests, 35 to pass. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/iedtt-mobile.png", desktop: "/landing/iedtt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="iedtt" />

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
                Five training sets, one per practice test: Set 1 holds exactly the 40 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
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
                Five 40-question tests, the same length as the real one, with the same 35 to pass and an explanation of the right answer and the common wrong pick on every question.
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
                Built on the RSA Rules of the Road
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The RSA does not publish how many questions come from each topic, so every practice test follows the chapters of the Rules of the Road, with signs and markings 12 of the 40 questions. Every rule is Irish: driving on the left, km/h limits including the 60 km/h rural local road default since 2025, yielding to the right at roundabouts, green, amber, red lights with no red and amber phase, L and N plates and the lower drink-drive limit for learners and novices.
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
                src={getTigerAsset("iedtt", 1)}
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
            How to Pass the Driver Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Aim well above 35</h3>
              <p>
                You can drop only five questions out of 40, so a near pass is a fail. Treat 38 or more on a practice test as your target, and keep retaking a test until you reach it before you book.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn signs by family first</h3>
              <p>
                Warning signs are yellow diamonds; most regulatory signs are circles with a red border, and a red diagonal line means not allowed. Motorway direction signs are blue, national roads green, regional and local roads white and tourist signs brown. Then learn the special shapes: the red octagon STOP and the downward Yield triangle with Géill Slí. Study the pictures in the Rules of the Road as you go.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the numbers</h3>
              <p>
                Make one table: 120 km/h motorways, 100 national primary roads, 60 rural local roads, 50 in built-up areas unless signed, the two-second gap doubled in the wet, 1 and 1.5 metres when passing cyclists, 5 metres from a junction when parking, 1.6 mm tyre tread, 150 cm or 36 kg for child seats, 20 km/h for e-scooters and the 50 and 20 mg drink-drive limits.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Master each training set, take its practice test, then drill the questions you missed and retrain that set. Finish by taking all five tests back to back before your test date.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Driver Theory Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass the Driver Theory Test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need 35 correct answers out of 40, which is 87.5 percent. You have 45 minutes. The practice tests here use the same 40 questions and the same 35 to pass, so a pass here means you are scoring at the real standard.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How does the Driver Theory Test work?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The car test (category BW, car, tractor and work vehicles) is 40 multiple-choice questions taken on a computer at an official test centre in 45 minutes. You book online at theorytest.ie and bring photo identification. Your score report shows which category areas you got right and wrong, so you know what to study before a retake.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">When do I need to take the theory test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Before your first learner permit. You must pass the Driver Theory Test and send the certificate to the NDLS with your learner permit application, and the certificate is valid for two years from the test date. You must be 17 to hold a car learner permit, and from 1 November 2026 the minimum age to sit the theory test is 15.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What happens after I pass?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Apply to the NDLS for a learner permit with your theory test certificate and an eyesight report. As a learner you display L-plates front and rear, drive only with someone who has held a full licence for at least two years, never use a motorway, and take 12 Essential Driver Training lessons with an approved instructor. After six months you can sit the driving test, then show N-plates for two years.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real theory test questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. The RSA&apos;s official question bank is copyrighted and sold separately. Every question here is original, written from the RSA&apos;s Rules of the Road: signs, road markings, junctions and roundabouts, speed limits, motorways, vulnerable road users, alcohol and seatbelts, bad weather and collisions. Signs are described in words, so study the pictures in the Rules of the Road too. It is a study tool, not a licence.
            </p>
          </div>
        </div>
      </div>

      <ExamSampleQuestions examId="iedtt" />

      <ExamRelatedTests examId="iedtt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 original questions on the Irish Rules of the Road.</p>
          <ExamLandingCTA dashboardHref="/ireland-driver-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}
