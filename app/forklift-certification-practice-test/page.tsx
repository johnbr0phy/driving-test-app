import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Forklift Certification Practice Test 2026 - OSHA Operator Exam";
const description =
  "Free forklift certification practice tests with 200 questions on OSHA 29 CFR 1910.178: truck classes and operator rules, the stability triangle and load capacity, pre-shift inspection, propane and battery safety, safe operation around pedestrians, and ramps, docks and trailers. Every answer explained.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "forklift certification practice test, forklift test questions and answers, OSHA forklift test, forklift operator written test, forklift license practice test, powered industrial truck test, free forklift practice test 2026",
  alternates: {
    canonical: `${siteUrl}/forklift-certification-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/forklift-certification-practice-test`,
    images: [{ url: "/og/forklift", width: 1200, height: 630, alt: "TigerTest free forklift certification practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/forklift"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free Forklift Certification Practice Tests",
      description,
      url: `${siteUrl}/forklift-certification-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 forklift operator practice questions",
        "4 practice tests weighted like a real operator written test",
        "Training sets for every topic area",
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
          name: "Does passing this practice test certify me to drive a forklift?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. OSHA 29 CFR 1910.178 requires your employer to certify you after formal instruction, hands-on practical training and an evaluation of your performance on the actual truck in your workplace. This practice test prepares you for the written or oral knowledge portion of that training. It does not replace the hands-on evaluation and it is not a certificate.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a national forklift license?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. There is no government-issued forklift license in the United States. OSHA does not issue licenses and neither does any state motor vehicle agency. The employer issues the certification, which must record the operator's name, the training and evaluation dates, and the trainer's identity. A new employer must evaluate you again before relying on earlier training.",
          },
        },
        {
          "@type": "Question",
          name: "How often do forklift operators need to be re-certified?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "OSHA requires an evaluation of each operator's performance at least once every three years. Refresher training is also required sooner after an accident or near miss, after unsafe operation is observed, after a failed evaluation, when you are assigned a different type of truck, or when workplace conditions change in a way that affects safe operation.",
          },
        },
        {
          "@type": "Question",
          name: "How old do you have to be to operate a forklift?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "At least 18 in non-agricultural jobs. The federal Fair Labor Standards Act lists forklift operation as a hazardous occupation that is off limits to workers under 18. Some agricultural settings have different rules, so check your state's requirements if you work on a farm.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest forklift practice test free?",
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
  { name: "Forklift Basics & OSHA Rules", weight: "20%" },
  { name: "Stability & Load Capacity", weight: "24%" },
  { name: "Inspection, Fueling & Charging", weight: "16%" },
  { name: "Safe Operation & Pedestrians", weight: "24%" },
  { name: "Load Handling, Docks & Ramps", weight: "16%" },
];

export default function ForkliftLandingPage() {
  return (
    <div data-theme="forklift" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="forklift" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Forklift Certification Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/forklift/dashboard"
            shortName="Forklift"
            subtitle="200 questions on OSHA 1910.178: truck classes, the stability triangle, inspections, propane and battery safety, pedestrians, ramps and docks. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/forklift-mobile.png", desktop: "/landing/forklift-desktop.png" }}
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Topic</h3>
              <p className="text-gray-600">
                Four sets: basics, rules and inspection; stability and load capacity; safe operation; and load handling, docks and ramps. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that sample every topic the way an employer&apos;s written evaluation does, with the OSHA rule or stability principle explained on every answer.
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
                Built on OSHA 1910.178
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                OSHA&apos;s powered industrial truck standard lists the truck-related and workplace-related topics every operator must be trained on. The practice tests here give stability and safe operation the most weight because tip-overs and pedestrian strikes cause most forklift deaths.
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
                src={getTigerAsset("forklift", 1)}
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
            The forklift practice test is brand new. If a question looks wrong or your employer&apos;s training covers something we missed, tell us.
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
            How to Pass the Forklift Written Test
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Learn the stability triangle cold</h3>
              <p>
                The truck stays upright only while the combined center of gravity of truck and load stays inside the triangle formed by the two front wheels and the rear axle pivot. Raising the load, tilting forward, turning fast and driving across a slope all push it toward the edge. Half the hard questions are this one idea in different clothes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Do the load center math</h3>
              <p>
                Capacity on the data plate assumes a 24-inch load center. Multiply rated capacity by 24, then divide by the actual load center to estimate what you can lift: a 5,000-pound truck handles about 4,000 pounds at 30 inches. Attachments and fork extensions lower it further, and the manufacturer&apos;s chart always wins.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Memorize the OSHA numbers</h3>
              <p>
                Evaluation at least every three years. Operators 18 or older. About three truck lengths following distance. Unattended means 25 feet away or out of view. Load upgrade on grades over 10 percent. Lights required under 2 lumens per square foot. No parking within 8 feet of railroad tracks. These appear on nearly every employer test.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill the operating rules until they are reflexes</h3>
              <p>
                Forks low and tilted back, travel in reverse when the load blocks your view, horn at every blind corner, pedestrians always have the right of way, nobody under the forks, nobody riding, stay in the seat if the truck tips. TigerTest tracks your accuracy by topic, so retake the set you miss most until you clear 90 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Forklift Certification Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does passing this practice test certify me to drive a forklift?</h3>
            <p className="text-gray-600">
              No. OSHA 29 CFR 1910.178 requires your employer to certify you after formal instruction, hands-on practical training and an evaluation of your performance on the actual truck in your workplace. This practice test prepares you for the written or oral knowledge portion of that training. It does not replace the hands-on evaluation and it is not a certificate.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is there a national forklift license?</h3>
            <p className="text-gray-600">
              No. There is no government-issued forklift license in the United States. OSHA does not issue licenses and neither does any state motor vehicle agency. The employer issues the certification, which must record the operator&apos;s name, the training and evaluation dates, and the trainer&apos;s identity. A new employer must evaluate you again before relying on earlier training.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How often do forklift operators need to be re-certified?</h3>
            <p className="text-gray-600">
              OSHA requires an evaluation of each operator&apos;s performance at least once every three years. Refresher training is also required sooner after an accident or near miss, after unsafe operation is observed, after a failed evaluation, when you are assigned a different type of truck, or when workplace conditions change in a way that affects safe operation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How old do you have to be to operate a forklift?</h3>
            <p className="text-gray-600">
              At least 18 in non-agricultural jobs. The federal Fair Labor Standards Act lists forklift operation as a hazardous occupation that is off limits to workers under 18. Some agricultural settings have different rules, so check your state&apos;s requirements if you work on a farm.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest forklift practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="forklift" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your Forklift Test?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across every OSHA training topic.</p>
          <ExamLandingCTA dashboardHref="/forklift/dashboard" />
        </div>
      </div>
    </div>
  );
}
