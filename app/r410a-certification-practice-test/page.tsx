import "@/lib/banks/r410a";
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
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free R-410A Certification Practice Test 2026 - R-410A Safety Exam Prep";
const metaDescription =
  "R-410A safety certification practice, free to start: 200 original questions on safe handling, cylinders, pressures, POE oil, evacuation, charging and the EPA rules for HFCs, with every answer explained.";
const description =
  "Practice for the R-410A Safety Certification exam offered by the ESCO Institute (the AC&R Safety Coalition program), free to start: 200 original questions written from ESCO's program outline, the EPA Section 608 and AIM Act rules, DOT and OSHA rules, the R-410A safety data sheet and a manufacturer's R-410A service guide. Four 50-question practice tests and four training sets covering safety and cylinder handling; pressures, POE oil and evacuation; retrofits, installation and charging; and EPA rules and the HFC transition.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "r-410a certification practice test, r410a certification test, r-410a safety certification, esco r-410a exam, ac&r safety coalition r-410a, r410a practice test, r-410a exam questions, hvac r-410a test",
  alternates: {
    canonical: `${siteUrl}/r410a-certification-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/r410a-certification-practice-test`,
    images: [{ url: shareImageUrl("r410a"), width: 1200, height: 630, alt: "Tigertest R-410A certification practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("r410a")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the R-410A certification exam?",
    a: "The R-410A Safety Certification is offered by the ESCO Institute. It comes from the AC&R Safety Coalition program and checks that a technician has the knowledge to work safely with R-410A, a high-pressure HFC refrigerant. Persons who pass receive a certificate and an AC&R Safety Coalition R-410A patch. It is a specialty certification, separate from the EPA Section 608 certification that federal law requires to buy and handle refrigerant.",
  },
  {
    q: "How many questions are on the R-410A exam?",
    a: "ESCO describes it as a 50-question exam covering proper safety, handling and application of R-410A refrigerant systems. ESCO does not publish a time limit or passing score for it on its program pages, so check with your proctor or school. The practice tests here use 70% as a readiness line.",
  },
  {
    q: "What does the R-410A exam cover?",
    a: "ESCO lists three areas: proper safety, handling, and application of R-410A. Its training manual covers servicing systems with R-410A and R-407C, the R-22 phase-out, the right refrigerant and oil for each application, service techniques and safe handling. This practice bank adds the federal rules a technician works under: EPA venting, sales and evacuation rules, the AIM Act transition away from high-GWP refrigerants, DOT cylinder rules and OSHA safety rules.",
  },
  {
    q: "Can new R-410A systems still be installed?",
    a: "Under EPA's Technology Transitions rule, self-contained residential and light commercial air conditioners and heat pumps using a refrigerant with a GWP of 700 or more, such as R-410A, may no longer be made or imported from January 1, 2025, and new split systems may be installed only if all their components were made or imported before 2025. EPA's May 2026 final rule removed the January 1, 2026 installation deadline, so that pre-2025 inventory may still be installed until it runs out. Existing R-410A systems may still be serviced.",
  },
  {
    q: "Are these the real ESCO questions?",
    a: "No. Every question is original, written by Tigertest from ESCO's program description and pressure-temperature chart, federal rules from EPA, DOT and OSHA, the R-410A safety data sheet and a manufacturer's R-410A service guide. Tigertest is not affiliated with the ESCO Institute, HVAC Excellence or the AC&R Safety Coalition, and no ESCO practice or exam question was used.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - R-410A Certification Practice Test",
      description,
      url: `${siteUrl}/r410a-certification-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("r410a"),
      featureList: [
        "200 R-410A safety practice questions",
        "4 practice tests of 50 questions",
        "4 training sets by topic",
        "Instant feedback with explanations",
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
        classFaqJsonLd("r410a"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Personal Safety & First Aid", weight: "18%" },
  { name: "Cylinders, Tools & Storage", weight: "12%" },
  { name: "Properties & Pressures", weight: "20%" },
  { name: "Oil, Moisture & Evacuation", weight: "10%" },
  { name: "R-22 Phase-Out & Retrofits", weight: "6%" },
  { name: "EPA Rules & the HFC Transition", weight: "20%" },
  { name: "Installation & Charging", weight: "14%" },
];

export default function R410aLandingPage() {
  return (
    <div data-theme="r410a" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free R-410A Certification Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/r410a/dashboard"
            shortName="R-410A"
            subtitle="200 R-410A certification questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/r410a-mobile.png", desktop: "/landing/r410a-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="r410a" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: safety and cylinder handling; pressures, oil and evacuation; retrofits, installation and charging; and EPA rules and the HFC transition. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">50-Question Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions, the length of the real exam, each with a 70% readiness line. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on Safety, Handling and Application
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ESCO lists the exam&apos;s three areas as proper safety, handling and application of R-410A, but publishes no weights. Tigertest splits each 50-question test across seven topics: 9 safety, 6 cylinders and tools, 10 properties and pressures, 5 oil and evacuation, 3 R-22 phase-out, 10 EPA rules and 7 installation and charging.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("r410a", 3)}
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
            How to Pass the R-410A Safety Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Respect the pressure</h3>
              <p>
                R-410A runs 50 to 70 percent above R-22. Know a few pressure-temperature points (118 psig at 40 F, 336 psig at 104 F), and why gauges, hoses, recovery cylinders and filter driers must be rated for R-410A.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the safety data sheet</h3>
              <p>
                Asphyxiation in low spaces, frostbite from liquid, heart rhythm effects at high levels and toxic hydrogen fluoride when it meets a flame. Learn the first aid and the right protective equipment for each.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Keep moisture out of POE oil</h3>
              <p>
                POE oil absorbs moisture fast and a vacuum pump will not pull it back out. Break vacuums with dry nitrogen, replace the filter drier whenever the system is opened, and evacuate with a micron gauge.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Learn the rules that changed</h3>
              <p>
                HFC venting and sales rules, the January 1, 2025 GWP 700 limit for new home AC, the May 2026 change for pre-2025 inventory, and the 2026 and 2028 leak repair and cylinder rules. Then take the 50-question tests and aim well above the 70% readiness line, around 85%, before your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          R-410A Certification Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="r410a" />
        </div>
      </div>

      <ExamSampleQuestions examId="r410a" />

      <ExamRelatedTests examId="r410a" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your R-410A Certification?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on safety, handling and application.</p>
          <ExamLandingCTA dashboardHref="/r410a/dashboard" />
        </div>
      </div>
    </div>
  );
}
