import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free AWS Cloud Practitioner Practice Test 2026 - CLF-C02 Exam Prep";
const description =
  "Free AWS Certified Cloud Practitioner (CLF-C02) practice tests with 200 questions weighted to the exam guide: cloud concepts and the Well-Architected Framework, security and compliance with the shared responsibility model and IAM, core compute, storage, database and networking services, and billing, pricing and support plans.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "AWS Cloud Practitioner practice test, CLF-C02 practice exam, AWS certified cloud practitioner questions, AWS CCP exam prep 2026, free AWS practice test, AWS certification practice questions, cloud practitioner sample questions",
  alternates: {
    canonical: `${siteUrl}/aws-cloud-practitioner-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/aws-cloud-practitioner-practice-test`,
    images: [{ url: "/og/aws", width: 1200, height: 630, alt: "TigerTest free AWS CCP practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/aws"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free AWS Cloud Practitioner Practice Tests",
      description,
      url: `${siteUrl}/aws-cloud-practitioner-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 AWS practice questions",
        "2 full 65-question practice tests in 90 minutes",
        "4 drills, one per CLF-C02 domain",
        "Choose-two and choose-three multiple-response items",
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
          name: "How many questions are on the AWS Cloud Practitioner exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "65 questions in 90 minutes, of which 50 are scored and 15 are unscored. The score is scaled from 100 to 1000 and 700 is passing. Questions are multiple choice (one answer) and multiple response (two or more).",
          },
        },
        {
          "@type": "Question",
          name: "What is on the CLF-C02 exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Four domains: Cloud Concepts 24 percent, Security and Compliance 30 percent, Cloud Technology and Services 34 percent, and Billing, Pricing and Support 12 percent. It is a foundational exam that tests what each service is for, not how to configure it.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need hands-on AWS experience to pass?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The exam is designed for anyone who needs to understand AWS at a conceptual level, including sales, project managers and students. Six months of exposure helps, and the Free Tier lets you try the console, but these practice questions cover the exam's conceptual level.",
          },
        },
        {
          "@type": "Question",
          name: "Is this practice test the same format as the real exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Each practice test is 65 questions in 90 minutes with flagging and review, mixing single-answer items with choose-two and choose-three multiple-response items like the real exam. Scores here are percent correct; the real exam reports a scaled score from 100 to 1000, with 700 to pass.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest AWS practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Both practice tests and all four drills are free, with no account required. Create a free account if you want your progress saved across devices.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Cloud Technology & Services", weight: "34%" },
  { name: "Security & Compliance", weight: "30%" },
  { name: "Cloud Concepts", weight: "24%" },
  { name: "Billing, Pricing & Support", weight: "12%" },
];

export default function AwsLandingPage() {
  return (
    <div data-theme="aws" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AWS Cloud Practitioner Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/aws-cloud-practitioner/dashboard"
            shortName="AWS CCP"
            subtitle="200 questions weighted to the CLF-C02 exam guide. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aws-mobile.png", desktop: "/landing/aws-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aws" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four drills, one per exam domain: cloud concepts, security and compliance, cloud technology and services, and billing, pricing and support. Questions you miss come back until you have mastered them.
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
                Two 65-question tests in 90 minutes, written in the real exam&apos;s style: a company needs something, and you pick the AWS service, feature or principle that fits, sometimes two or three. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the CLF-C02 Exam Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AWS publishes the domain weighting for the Cloud Practitioner exam. Every practice test here follows it, and the questions use current service names and features, so nothing you learn is a retired product.
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
                src={getTigerAsset("aws", 1)}
                alt="TigerTest mascot"
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Help Make TigerTest Better</h2>
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
            How to Pass the AWS Cloud Practitioner Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the shared responsibility model cold</h3>
              <p>
                AWS secures the cloud: hardware, facilities, networking, managed service patching. You secure what is in it: data, encryption, IAM, OS patching on EC2, network configuration. Then watch how it shifts between EC2, RDS, Lambda and S3. It is the most tested idea on the exam.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Match the service to the need</h3>
              <p>
                Most questions describe a need and ask which service fits: DynamoDB for key-value at scale, Aurora for managed relational, Glacier Deep Archive for the cheapest archive, GuardDuty for threat detection, Macie for sensitive data in S3, Config for configuration compliance, CloudTrail for who did what. Learn one sentence per service.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the pricing and support numbers</h3>
              <p>
                Reserved Instances and Savings Plans for steady workloads, Spot for interruptible jobs, On-Demand for spiky ones. Inbound data is free and outbound is charged. Developer, Business, Enterprise On-Ramp and Enterprise support with their response times and the Technical Account Manager.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak domain</h3>
              <p>
                TigerTest tracks your accuracy by domain. The exam is scored on a 100 to 1000 scale with 700 to pass, which is not a fixed percent. Retake the drill you missed most until you clear 80 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AWS Cloud Practitioner Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the AWS Cloud Practitioner exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              65 questions in 90 minutes, of which 50 are scored and 15 are unscored. The score is scaled from 100 to 1000 and 700 is passing. Questions are multiple choice (one answer) and multiple response (two or more).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the CLF-C02 exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Four domains: Cloud Concepts 24 percent, Security and Compliance 30 percent, Cloud Technology and Services 34 percent, and Billing, Pricing and Support 12 percent. It is a foundational exam that tests what each service is for, not how to configure it.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do I need hands-on AWS experience to pass?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. The exam is designed for anyone who needs to understand AWS at a conceptual level, including sales, project managers and students. Six months of exposure helps, and the Free Tier lets you try the console, but these practice questions cover the exam&apos;s conceptual level.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this practice test the same format as the real exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. Each practice test is 65 questions in 90 minutes with flagging and review, mixing single-answer items with choose-two and choose-three multiple-response items like the real exam. Scores here are percent correct; the real exam reports a scaled score from 100 to 1000, with 700 to pass.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is the TigerTest AWS practice test free?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. Both practice tests and all four drills are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="aws" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the AWS Cloud Practitioner?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all four domains.</p>
          <ExamLandingCTA dashboardHref="/aws-cloud-practitioner/dashboard" />
        </div>
      </div>
    </div>
  );
}
