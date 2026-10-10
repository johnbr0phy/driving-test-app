import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Life and Health Insurance Practice Test 2026 - License Exam Prep";
const description =
  "Free life and health insurance license practice tests with 200 questions on the general portion every state tests: insurance concepts and regulation, life insurance policies, provisions and riders, annuities and taxation, health insurance basics, provisions and policy types including disability, Medicare supplement and long-term care.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "life and health insurance practice test, insurance license exam prep, life insurance exam practice questions, health insurance license test 2026, life accident and health exam, free insurance practice exam, insurance producer exam",
  alternates: {
    canonical: `${siteUrl}/life-health-insurance-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/life-health-insurance-practice-test`,
    images: [{ url: "/og/insurance", width: 1200, height: 630, alt: "TigerTest free Insurance practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/insurance"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free Life & Health Insurance Practice Tests",
      description,
      url: `${siteUrl}/life-health-insurance-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 insurance practice questions",
        "4 practice tests weighted to the general portion of the life and health exam",
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
          name: "How many questions are on the life and health insurance exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A combined life, accident and health exam usually has about 150 scored questions with 2 to 3 hours, and most states pass at 70 percent. Stand-alone life or health exams are shorter. The general portion is the larger part; the state portion is the rest.",
          },
        },
        {
          "@type": "Question",
          name: "Does this cover my state's exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It covers the general portion, which is shared by every state's Pearson VUE, PSI or Prometric exam. The state portion (license law, free-look lengths, replacement rules, guaranty limits) is separate, and no question here states one state's rule as universal.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this for a life-only or health-only exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The training sets split life from health, so a life-only candidate can work sets 1 and 2 plus the annuities set, and a health-only candidate can work sets 1, 3 and 4. The mixed practice tests cover both.",
          },
        },
        {
          "@type": "Question",
          name: "What are the hardest topics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Taxation (MECs, the exclusion ratio, qualified plans), the health policy mandatory provisions with their time limits, Medicare parts and benefit periods, and telling the renewability provisions apart. Every explanation here spells out the figure and why the tempting wrong answer fails.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest insurance practice test free?",
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
  { name: "Life Policy Provisions, Options & Riders", weight: "16%" },
  { name: "Health Policy Types", weight: "14%" },
  { name: "Life Policy Types", weight: "12%" },
  { name: "General Insurance Concepts", weight: "10%" },
  { name: "Life Insurance Basics", weight: "10%" },
  { name: "Annuities, Taxation & Retirement", weight: "10%" },
  { name: "Health Insurance Basics", weight: "10%" },
  { name: "Health Policy Provisions", weight: "10%" },
  { name: "Insurance Regulation", weight: "8%" },
];

export default function InsuranceLandingPage() {
  return (
    <div data-theme="insurance" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="insurance" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Life & Health Insurance Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/life-health-insurance/dashboard"
            shortName="Insurance"
            subtitle="200 questions on the general portion of the life and health license exam. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/insurance-mobile.png", desktop: "/landing/insurance-desktop.png" }}
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
                Four sets covering the general portion: insurance basics and regulation; life insurance policies and provisions; annuities, taxation and health basics; and health policy provisions and types. Questions you miss come back until you have mastered them.
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
                Four 50-question tests weighted like the general portion and written in its style: a client with a need, a policy with a provision, and a question about who gets paid, when, and how it is taxed.
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
                Built on the General Portion Every State Tests
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                State life and health producer exams from Pearson VUE, PSI and Prometric share a general section built on the NAIC model and the same prelicensing texts. Every practice test here follows that weighting. The state law section is separate and not covered.
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
                src={getTigerAsset("insurance", 1)}
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
            The insurance practice test is brand new. If a question looks wrong or your state teaches it differently, tell us.
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
            How to Pass the Life and Health Insurance Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Learn the provisions with their numbers</h3>
              <p>
                Grace period, reinstatement, incontestability at 2 years, suicide clause, misstatement of age, free look, the 12 mandatory health provisions with their day counts. The exam asks what happens in a scenario, and the answer is almost always in the provision.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Know who is taxed and when</h3>
              <p>
                Premiums usually not deductible, death benefits tax-free, cash value tax-deferred, annuity withdrawals LIFO, MECs taxed harder, employer-paid disability benefits taxable. Taxation runs through the life, annuity and health sections and is the most-missed topic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Match the product to the need</h3>
              <p>
                Decreasing term for a mortgage, whole life for permanent needs, universal life for flexibility, life-only annuity for the highest income, noncancelable for the strongest renewability, own-occupation for the surgeon. Scenario questions are really asking which product fits.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Then study your state portion separately</h3>
              <p>
                This bank covers the general portion only. Your state exam adds licensing rules, continuing education, replacement forms and guaranty association limits. Clear 75 percent here with room to spare, then study your state&apos;s candidate handbook.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Insurance License Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the life and health insurance exam?</h3>
            <p className="text-gray-600">
              A combined life, accident and health exam usually has about 150 scored questions with 2 to 3 hours, and most states pass at 70 percent. Stand-alone life or health exams are shorter. The general portion is the larger part; the state portion is the rest.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this cover my state&apos;s exam?</h3>
            <p className="text-gray-600">
              It covers the general portion, which is shared by every state&apos;s Pearson VUE, PSI or Prometric exam. The state portion (license law, free-look lengths, replacement rules, guaranty limits) is separate, and no question here states one state&apos;s rule as universal.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Can I use this for a life-only or health-only exam?</h3>
            <p className="text-gray-600">
              Yes. The training sets split life from health, so a life-only candidate can work sets 1 and 2 plus the annuities set, and a health-only candidate can work sets 1, 3 and 4. The mixed practice tests cover both.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What are the hardest topics?</h3>
            <p className="text-gray-600">
              Taxation (MECs, the exclusion ratio, qualified plans), the health policy mandatory provisions with their time limits, Medicare parts and benefit periods, and telling the renewability provisions apart. Every explanation here spells out the figure and why the tempting wrong answer fails.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest insurance practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="insurance" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your Insurance Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across every content area.</p>
          <ExamLandingCTA dashboardHref="/life-health-insurance/dashboard" />
        </div>
      </div>
    </div>
  );
}
