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

const siteUrl = SITE_URL;

const statePractice = [
  {
    name: "Texas",
    href: "/life-health-insurance/tx/dashboard",
    body: "130 source-checked questions on the Pearson VUE Texas outline: 100 general and 30 Texas questions, including HMO rules.",
  },
  {
    name: "Florida",
    href: "/life-health-insurance/fl/dashboard",
    body: "150 questions like the real 2-15 exam: general knowledge plus Florida law for life, annuities (including variable) and health.",
  },
  {
    name: "California",
    href: "/life-health-insurance/ca/dashboard",
    body: "150 questions like CDI's combined life and accident and health exam, with California law, senior protections and Cal-COBRA.",
  },
  // state variants batch 2 (generated)
  {
    name: "New York",
    href: "/life-health-insurance/ny/dashboard",
    body: "150 questions like PSI's combined Series 17-55 exam, with New York Insurance Law, Regulations 60, 187 and 194, DBL and Paid Family Leave woven in.",
  },
  {
    name: "Pennsylvania",
    href: "/life-health-insurance/pa/dashboard",
    body: "150 questions like PSI's Series 16-03 exam, with Pennsylvania free look, grace, reinstatement, Medigap, long-term care and the 2024 rebating and CE rules.",
  },
  {
    name: "Illinois",
    href: "/life-health-insurance/il/dashboard",
    body: "Both Illinois lines, Life and Accident & Health, in one 150-question test: 88 general and 62 Illinois questions on licensing, replacement, Medicare supplement and long-term care.",
  },
  {
    name: "Ohio",
    href: "/life-health-insurance/oh/dashboard",
    body: "150 questions like PSI's combined life, accident and health exam (Series 11-35), with Ohio rules on licensing, replacement, health insuring corporations, dependents and long-term care.",
  },
  {
    name: "Georgia",
    href: "/life-health-insurance/ga/dashboard",
    body: "125 questions like Pearson VUE's Georgia life, accident and sickness combo exam: 100 general and 25 Georgia law questions.",
  },
  {
    name: "North Carolina",
    href: "/life-health-insurance/nc/dashboard",
    body: "Both North Carolina exams in one 110-question test: the Life Agent and Accident and Health Agent exams, with 28 North Carolina law questions.",
  },
  {
    name: "Michigan",
    href: "/life-health-insurance/mi/dashboard",
    body: "150 questions like PSI's combined life, accident and health exam (16-80), with Michigan Insurance Code rules on licensing, life policy provisions, dependents and long-term care.",
  },
  {
    name: "New Jersey",
    href: "/life-health-insurance/nj/dashboard",
    body: "Both New Jersey producer exams, Life and Accident & Health, in one 150-question test: 88 general and 62 New Jersey questions, including replacement, prompt pay and temporary disability.",
  },
  {
    name: "Virginia",
    href: "/life-health-insurance/va/dashboard",
    body: "140 questions like Prometric's combined Series 11-01 exam: general topics with Virginia licensing, policy, Medicare supplement and long-term care law.",
  },
  {
    name: "Washington",
    href: "/life-health-insurance/wa/dashboard",
    body: "150 questions like PSI's life and disability combo exam: 105 general and 45 Washington insurance law questions.",
  },
  // end batch 2
];

const title = "Free Life and Health Insurance Practice Test 2026";
const metaDescription =
  "Free life and health insurance practice tests: 200 questions on the general portion of the license exam, from policies and riders to annuities and Medicare.";
const description =
  "Free life and health insurance license practice tests with 200 questions on the general portion every state tests: insurance concepts and regulation, life insurance policies, provisions and riders, annuities and taxation, health insurance basics, provisions and policy types including disability, Medicare supplement and long-term care.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "life and health insurance practice test, insurance license exam prep, life insurance exam practice questions, health insurance license test 2026, life accident and health exam, free insurance practice exam, insurance producer exam",
  alternates: {
    canonical: `${siteUrl}/life-health-insurance-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/life-health-insurance-practice-test`,
    images: [{ url: shareImageUrl("insurance"), width: 1200, height: 630, alt: "Tigertest free Insurance practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("insurance")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Life & Health Insurance Practice Tests",
      description,
      url: `${siteUrl}/life-health-insurance-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 insurance practice questions",
        "4 practice tests weighted to the general portion of the life and health exam",
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
            text: "Thirteen states have their own full-length practice with state law: California, Florida, Georgia, Illinois, Michigan, New Jersey, New York, North Carolina, Ohio, Pennsylvania, Texas, Virginia and Washington. For other states, the 200-question bank covers the general portion shared by every Pearson VUE, PSI or Prometric exam; the state portion (license law, free-look lengths, replacement rules, guaranty limits) is separate, and no question here states one state's rule as universal.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this for a life-only or health-only exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Each training set and practice test mixes life and health the way the general portion does, and your stats show your accuracy by topic, so a life-only or health-only candidate can see exactly how they do on their own lines.",
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
          name: "Is the Tigertest insurance practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
          },
        },
        classFaqJsonLd("insurance"),
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
    <div data-theme="insurance" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
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

      <ExamFacts examId="insurance" />

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
                Four training sets for the general portion, one per practice test: each holds exactly the 50 questions of its test. Master Set 1, then take Test 1, and so on. Questions you miss come back until you have mastered them.
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
                Four 50-question tests weighted like the general portion and written in its style: a client with a need, a policy with a provision, and a question about who gets paid, when, and how it is taxed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* State practice */}
      <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-4">
          State Practice: 13 States
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-10">
          Taking the exam in one of these states? Practice a full-length exam with questions checked against your state&apos;s insurance law, including state-only rules. Progress is saved separately for each state.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {statePractice.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="block bg-gray-50 dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-brand transition-colors"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{s.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">{s.body}</p>
              <span className="text-brand-dark font-semibold">Start {s.name} practice &rarr;</span>
            </a>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
          Practice only. Not affiliated with any state regulator, PSI, Pearson VUE or Prometric, and a practice score does not predict your exam result.
        </p>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the General Portion Every State Tests
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                State life and health producer exams from Pearson VUE, PSI and Prometric share a general section built on the NAIC model and the same prelicensing texts. Every practice test here follows that weighting. The state law section is covered for the states below.
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
                src={getTigerAsset("insurance", 1)}
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
            How to Pass the Life and Health Insurance Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the provisions with their numbers</h3>
              <p>
                Grace period, reinstatement, incontestability at 2 years, suicide clause, misstatement of age, free look, the 12 mandatory health provisions with their day counts. The exam asks what happens in a scenario, and the answer is almost always in the provision.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know who is taxed and when</h3>
              <p>
                Premiums usually not deductible, death benefits tax-free, cash value tax-deferred, annuity withdrawals LIFO, MECs taxed harder, employer-paid disability benefits taxable. Taxation runs through the life, annuity and health sections and is the most-missed topic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Match the product to the need</h3>
              <p>
                Decreasing term for a mortgage, whole life for permanent needs, universal life for flexibility, life-only annuity for the highest income, noncancelable for the strongest renewability, own-occupation for the surgeon. Scenario questions are really asking which product fits.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Then study your state portion separately</h3>
              <p>
                Outside the states with their own practice, this bank covers the general portion only. Your state exam adds licensing rules, continuing education, replacement forms and guaranty association limits. Clear 75 percent here with room to spare, then study your state&apos;s candidate handbook.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Insurance License Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the life and health insurance exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              A combined life, accident and health exam usually has about 150 scored questions with 2 to 3 hours, and most states pass at 70 percent. Stand-alone life or health exams are shorter. The general portion is the larger part; the state portion is the rest.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this cover my state&apos;s exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Thirteen states have their own full-length practice with state law: California, Florida, Georgia, Illinois, Michigan, New Jersey, New York, North Carolina, Ohio, Pennsylvania, Texas, Virginia and Washington. For other states, the 200-question bank covers the general portion shared by every Pearson VUE, PSI or Prometric exam; the state portion (license law, free-look lengths, replacement rules, guaranty limits) is separate, and no question here states one state&apos;s rule as universal.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Can I use this for a life-only or health-only exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. Each training set and practice test mixes life and health the way the general portion does, and your stats show your accuracy by topic, so a life-only or health-only candidate can see exactly how they do on their own lines.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What are the hardest topics?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Taxation (MECs, the exclusion ratio, qualified plans), the health policy mandatory provisions with their time limits, Medicare parts and benefit periods, and telling the renewability provisions apart. Every explanation here spells out the figure and why the tempting wrong answer fails.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is the Tigertest insurance practice test free?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
          <ExamClassFaq examId="insurance" />
        </div>
      </div>

      <ExamRelatedTests examId="insurance" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Insurance Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every content area.</p>
          <ExamLandingCTA dashboardHref="/life-health-insurance/dashboard" />
        </div>
      </div>
    </div>
  );
}
