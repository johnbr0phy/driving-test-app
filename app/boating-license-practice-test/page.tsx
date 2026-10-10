import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Boating License Practice Test 2026 - Boater Safety Exam Prep";
const description =
  "Free boating license practice test with 200 questions on the NASBLA boater education standards every state exam uses: navigation rules, buoys and markers, lights and sound signals, life jackets and required equipment, safe operation, PWC rules and emergencies. Pass your boater safety card exam.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "boating license practice test, boater safety test, boat ed practice test, boater education exam questions, boating safety certificate test, boating test answers 2026, free boater exam practice",
  alternates: {
    canonical: `${siteUrl}/boating-license-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/boating-license-practice-test`,
    images: [{ url: "/og/boating", width: 1200, height: 630, alt: "TigerTest free Boating practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/boating"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free Boating Practice Tests",
      description,
      url: `${siteUrl}/boating-license-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 boating practice questions",
        "4 practice tests weighted like the state exams",
        "Training sets for every domain",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need a boating license?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most states require operators born after a certain date (often 1988 or later, in some states everyone) to carry a boater education card to operate a motorboat or PWC. The card is not a license in the driver's license sense and in most states never expires. Check your state's boating agency.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the boating exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "State exams are typically 50 to 75 multiple-choice questions, taken online at the end of an approved course, with 80 percent to pass. Most courses let you retake the exam. This practice bank uses the same topics in the same proportions.",
          },
        },
        {
          "@type": "Question",
          name: "Is the boater card valid in other states?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Cards from NASBLA-approved courses are recognized by every state that requires education, under reciprocity, as long as you meet the state's age rules.",
          },
        },
        {
          "@type": "Question",
          name: "Does this cover personal watercraft?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. PWC operation, the engine cut-off lanyard, off-throttle steering and reboarding are in the safe operation set. Most states apply the same education requirement to PWC and often add age and night restrictions, which vary.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest boating practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Boat Basics", weight: "16%" },
  { name: "Required Equipment", weight: "20%" },
  { name: "Navigation Rules", weight: "24%" },
  { name: "Safe Operation", weight: "24%" },
  { name: "Emergencies", weight: "16%" },
];

export default function BoatingLandingPage() {
  return (
    <div data-theme="boating" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="boating" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Boating License Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/boating/dashboard"
            shortName="Boating"
            subtitle="200 questions on the boater education standards behind every state exam. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/boating-mobile.png", desktop: "/landing/boating-desktop.png" }}
          />
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Domain</h3>
              <p className="text-gray-600">
                Five sets: boat basics and trailering, required equipment, navigation rules and buoys, safe operation, and emergencies. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Tests</h3>
              <p className="text-gray-600">
                Four 50-question tests written like the course exams: you are at the helm, you see a light or a buoy or another boat, and you choose what to do.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built on the NASBLA Standards
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Every state-approved boater education course and exam follows the NASBLA national standards and the U.S. Coast Guard navigation rules. The practice tests here draw questions in those proportions, with navigation rules and safe operation carrying the most weight, just like the real exam.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <span className="font-medium text-gray-900">{area.name}</span>
                    <span className="text-brand font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("boating", 1)}
                alt="TigerTest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Just launched */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Just Launched!</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            The boating practice test is brand new. If a question looks wrong or your state teaches it differently, tell us.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Send Us Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How to Pass the Boater Safety Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Learn the rules of the road as pictures</h3>
              <p>
                Red light to your right means you give way. Two boats meeting head-on both turn to starboard. The overtaking boat always gives way. Sail beats power unless the sailboat is overtaking. Draw them until they are reflexes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Memorize the buoys</h3>
              <p>
                Red right returning: red nun buoys with even numbers on your right coming in from sea, green cans with odd numbers on your left. White buoys with orange marks are regulatory: diamond danger, crossed diamond keep out, circle controlled area, square information.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Know the equipment numbers</h3>
              <p>
                A wearable life jacket for everyone aboard, a throwable on boats 16 feet and up, children under 13 wearing one underway, 5-B extinguishers, night distress signals for small boats on coastal waters, lights from sunset to sunrise, horn or whistle, VHF channel 16.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak topic</h3>
              <p>
                TigerTest tracks your accuracy by topic. Most state exams require 80 percent, so retake the set you miss most until you clear 90 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Boating License Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Do I need a boating license?</h3>
            <p className="text-gray-600">
              Most states require operators born after a certain date (often 1988 or later, in some states everyone) to carry a boater education card to operate a motorboat or PWC. The card is not a license in the driver&apos;s license sense and in most states never expires. Check your state&apos;s boating agency.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the boating exam?</h3>
            <p className="text-gray-600">
              State exams are typically 50 to 75 multiple-choice questions, taken online at the end of an approved course, with 80 percent to pass. Most courses let you retake the exam. This practice bank uses the same topics in the same proportions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the boater card valid in other states?</h3>
            <p className="text-gray-600">
              Yes. Cards from NASBLA-approved courses are recognized by every state that requires education, under reciprocity, as long as you meet the state&apos;s age rules.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this cover personal watercraft?</h3>
            <p className="text-gray-600">
              Yes. PWC operation, the engine cut-off lanyard, off-throttle steering and reboarding are in the safe operation set. Most states apply the same education requirement to PWC and often add age and night restrictions, which vary.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest boating practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="boating" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Get Your Boater Card?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all five topics.</p>
          <ExamLandingCTA dashboardHref="/boating/dashboard" />
        </div>
      </div>
    </div>
  );
}
