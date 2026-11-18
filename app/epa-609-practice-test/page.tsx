import "@/lib/banks/epa609";
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

const title = "Free EPA 609 Practice Test 2026 - MVAC Refrigerant Prep";
const metaDescription =
  "EPA 609 practice with 100 original questions on MVAC refrigerant rules, recovery, equipment and R-1234yf. Four 25-question tests. Free to start.";
const description =
  "Independent EPA Section 609 practice: 100 original refrigerant-handling questions, four topic sets and four 25-question tests. Editorial topic weights and a MACS online/home-based 84% study target. Free to start.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords: "EPA 609 practice test, Section 609, MVAC certification practice, automotive refrigerant recovery, R-1234yf, MACS study, EPA 609 prep 2026",
  alternates: {
    canonical: `${siteUrl}/epa-609-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/epa-609-practice-test`,
    images: [{ url: shareImageUrl("epa609"), width: 1200, height: 630, alt: "Tigertest free EPA 609 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("epa609")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free EPA 609 Practice Tests",
      description,
      url: `${siteUrl}/epa-609-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("epa609"),
      featureList: [
        "100 original EPA 609 practice questions",
        "4 practice tests with 25 questions each",
        "4 training sets by topic",
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
          name: "What score do I need for EPA 609 certification?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Passing requirements depend on the approved program and delivery mode. MACS online/home testing requires 21 correct answers out of 25, or 84%. Tigertest uses that percentage as a study target; it is not a universal EPA pass mark. Check the program through which you plan to certify.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the EPA 609 test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "MACS online/home testing has 25 multiple-choice questions, is untimed and open book. Its classroom testing conditions differ, and other EPA-approved programs may use different formats. Tigertest has four 25-question practice tests with original questions, not copies of any certification test.",
          },
        },
        {
          "@type": "Question",
          name: "What subjects does this practice cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The 100 questions cover federal MVAC rules and environmental effects, equipment and safe handling, recovery and charge accuracy, and R-1234yf service procedures. The topic weights are editorial choices based on EPA requirements and the MACS training manual, not an official weighted EPA blueprint.",
          },
        },
        {
          "@type": "Question",
          name: "Does practicing here give me Section 609 certification?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Certification requires training and testing through an EPA-approved program. Tigertest is an independent study resource, not an approved certification course, an official exam or proof of hands-on competence. Start here for free; additional practice steps use Tigertest Premium.",
          },
        },
        {
          "@type": "Question",
          name: "Is Section 609 the same as Section 608?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Section 609 addresses motor vehicle air-conditioning service. Section 608 generally covers other refrigeration equipment and also applies to matters such as venting and disposal. MVAC-like equipment has specific overlap rules. These questions focus on refrigerant handling, not general automotive diagnosis or stationary-system service.",
          },
        },
        classFaqJsonLd("epa609"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Rules & Environmental Effects", weight: "28%" },
  { name: "Equipment & Safe Handling", weight: "24%" },
  { name: "Recovery, Leaks & Charging", weight: "32%" },
  { name: "R-1234yf Procedures", weight: "16%" },
];

export default function Epa609LandingPage() {
  return (
    <div data-theme="epa609" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free EPA 609 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/epa609/dashboard"
            shortName="EPA 609"
            subtitle="100 original questions on MVAC rules, equipment, recovery, charging and R-1234yf procedures. Four 25-question practice tests with explanations. Free to start, no account needed."
            shots={{ mobile: "/landing/epa609-mobile.png", desktop: "/landing/epa609-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="epa609" />

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
                Four topic sets, from Rules &amp; Environmental Effects to R-1234yf Procedures. Practice the decisions and measurements involved in handling refrigerant. Questions you miss return for more practice.
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
                Four 25-question tests with editorial topic weights and an 84 percent study target based on MACS online/home testing. Every answer includes an explanation. Provider formats and requirements vary.
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
                Based on EPA Requirements
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                EPA requires knowledge of refrigerant containment, servicing equipment, environmental effects and applicable rules. This practice uses those subjects and the January 2025 MACS manual. The percentages below describe our practice allocation, not official exam weights. Instructors can assign practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}alongside their approved training materials.
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
                src={getTigerAsset("epa609", 3)}
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
            How to Prepare for EPA 609
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Separate the regulatory scopes</h3>
              <p>
                Learn which rules govern MVAC service, MVAC-like equipment, refrigerant purchases and disposal. Keep Section 609 service requirements distinct from Section 608 overlap, and check current EPA guidance when an older manual differs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Follow the refrigerant through service</h3>
              <p>
                Trace identification, recovery, processing, evacuation and recharging as separate steps. Know what each machine can do, why recovered fluid needs processing and how contamination can spread through shared equipment.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Check quantities and procedures</h3>
              <p>
                Practice converting charge units and reading tolerances. Distinguish a pressure reading from a measured refrigerant mass. For R-1234yf, review equipment compatibility and the vacuum and pressure checks before a full recharge.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Use your approved program materials</h3>
              <p>
                Review missed questions by topic, then take each practice test. The 84 percent line is a MACS-based study target, not a guarantee of certification. Complete the training and test required by your chosen EPA-approved program.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          EPA 609 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need for EPA 609 certification?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Passing requirements depend on the approved program and delivery mode. MACS online/home testing requires 21 correct answers out of 25, or 84%. Tigertest uses that percentage as a study target; it is not a universal EPA pass mark. Check the program through which you plan to certify.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the EPA 609 test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              MACS online/home testing has 25 multiple-choice questions, is untimed and open book. Its classroom testing conditions differ, and other EPA-approved programs may use different formats. Tigertest has four 25-question practice tests with original questions, not copies of any certification test.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What subjects does this practice cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The 100 questions cover federal MVAC rules and environmental effects, equipment and safe handling, recovery and charge accuracy, and R-1234yf service procedures. The topic weights are editorial choices based on EPA requirements and the MACS training manual, not an official weighted EPA blueprint.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does practicing here give me Section 609 certification?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Certification requires training and testing through an EPA-approved program. Tigertest is an independent study resource, not an approved certification course, an official exam or proof of hands-on competence. Start here for free; additional practice steps use Tigertest Premium.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is Section 609 the same as Section 608?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Section 609 addresses motor vehicle air-conditioning service. Section 608 generally covers other refrigeration equipment and also applies to matters such as venting and disposal. MVAC-like equipment has specific overlap rules. These questions focus on refrigerant handling, not general automotive diagnosis or stationary-system service.
            </p>
          </div>
          <ExamClassFaq examId="epa609" />
        </div>
      </div>

      <ExamSampleQuestions examId="epa609" />

      <ExamRelatedTests examId="epa609" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Practice EPA 609?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 100 original questions on MVAC refrigerant handling.</p>
          <ExamLandingCTA dashboardHref="/epa609/dashboard" />
        </div>
      </div>
    </div>
  );
}
