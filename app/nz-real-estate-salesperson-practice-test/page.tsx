import "@/lib/banks/nzrealestate";
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

const title = "NZ Real Estate Salesperson Practice Test 2026 - Free Licence Questions (NZ)";
const metaDescription =
  "Free New Zealand real estate salesperson practice: 200 original questions on the Real Estate Agents Act 2008, the Code of Conduct, agency agreements, disclosure, trust money and sale and purchase agreements, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the knowledge behind the New Zealand Certificate in Real Estate (Salesperson) (Level 4), the qualification the Real Estate Authority accepts for a salesperson licence: 200 original questions on the Real Estate Agents Act 2008 (licensing, supervision, complaints and discipline), the Code of Conduct and client care, agency agreements and commission, disclosure and conflicts, trust money, sale and purchase agreements, tenure and leases, LIMs and building consents, and the other laws a licensee meets. Four 50-question mock tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nz real estate practice test, nz real estate licence, nz real estate salesperson, rea licence, level 4 real estate nz, new zealand certificate in real estate salesperson, real estate agents act 2008 quiz, code of conduct real estate nz, real estate practice questions nz 2026",
  alternates: {
    canonical: `${siteUrl}/nz-real-estate-salesperson-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nz-real-estate-salesperson-practice-test`,
    images: [{ url: shareImageUrl("nzrealestate"), width: 1200, height: 630, alt: "Tigertest free NZ real estate salesperson practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzrealestate")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What do I need to become a real estate salesperson in New Zealand?",
    a: "You need a licence from the Real Estate Authority (REA). For a salesperson licence REA accepts the New Zealand Certificate in Real Estate (Salesperson) (Level 4), which is available from approved providers. You must also be at least 18, be a fit and proper person and consent to a criminal conviction history check. A salesperson must work under the supervision of a licensed agent or branch manager.",
  },
  {
    q: "How is the qualification assessed, and what score do I need?",
    a: "The approved training provider sets and marks its own assessments, and no national question count or pass mark is published. The mock tests here are Tigertest's own: 50 questions with an 80% readiness line, so aim to clear it on every test before your provider assesses you.",
  },
  {
    q: "What do these practice questions cover?",
    a: "Each mock test covers licensing and who may do agency work, the Code of Conduct and client care, complaints and discipline, agency agreements and commission, disclosure of defects and conflicts, trust money and documents, sale and purchase agreements and their conditions, title, tenure and leases, council records such as LIMs and building consents, and other laws such as the Fair Trading Act and the AML/CFT Act.",
  },
  {
    q: "Are these the real assessment questions?",
    a: "No. Every question is original, written by Tigertest from the Real Estate Agents Act 2008, the Professional Conduct and Client Care Rules 2012 and the Real Estate Authority's published guidance, checked in November 2026. It is free practice, not affiliated with the Real Estate Authority, NZQA, REINZ or any training provider, and it does not replace an approved course.",
  },
  {
    q: "Does the law change after I qualify?",
    a: "Yes. The Act, the Rules and REA guidance are updated from time to time, and licensees must keep their knowledge current. Tigertest checks its sources regularly, but always confirm the current wording on the Real Estate Authority's website and on legislation.govt.nz before you rely on a detail in practice.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NZ Real Estate Salesperson Practice Test",
      description,
      url: `${siteUrl}/nz-real-estate-salesperson-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nzrealestate", "NZD"),
      featureList: [
        "200 NZ real estate practice questions",
        "4 mock tests of 50 questions",
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
        classFaqJsonLd("nzrealestate"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Licensing and who may do agency work", weight: "5 per test" },
  { name: "Code of Conduct and client care", weight: "6 per test" },
  { name: "Complaints and discipline", weight: "4 per test" },
  { name: "Agency agreements and commission", weight: "7 per test" },
  { name: "Disclosure, defects and conflicts", weight: "6 per test" },
  { name: "Money, trust accounts and documents", weight: "3 per test" },
  { name: "Sale and purchase agreements", weight: "6 per test" },
  { name: "Title, tenure and leases", weight: "3 per test" },
  { name: "Council, building and planning", weight: "4 per test" },
  { name: "Other laws licensees meet", weight: "4 per test" },
  { name: "Marketing and sales practice", weight: "2 per test" },
];

export default function NzRealEstateLandingPage() {
  return (
    <div data-theme="nzrealestate" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NZ Real Estate Salesperson Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-real-estate/dashboard"
            shortName="NZ Real Estate"
            subtitle="200 real estate salesperson questions and four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/nzrealestate-mobile.png", desktop: "/landing/nzrealestate-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzrealestate" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Topic at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: licensing and conduct, agency agreements and disclosure, sale and purchase, and council and other law. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions across every topic, with an 80% readiness line set by Tigertest. No question appears in more than one test, and every answer is explained with the rule behind it.
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
                Built on the Act, the Rules and REA Guidance
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                No national question count or topic weights are published, because each approved provider assesses its own course. The split below is Tigertest&apos;s, following the duties of a licensee under the Real Estate Agents Act 2008 and the Code of Conduct.
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
                src={getTigerAsset("nzrealestate", 3)}
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
            How to Study for Your Real Estate Assessments
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know who may do the work</h3>
              <p>
                Only a licensee, or someone exempt such as a lawyer or a registered auctioneer, may do agency work. A salesperson must be supervised by an agent or branch manager, and a licence cannot be transferred.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the Code of Conduct by its themes</h3>
              <p>
                Skill and care, fiduciary duty to the client, fair dealing with every party, no misleading statements, and keeping the client informed. The Rules set minimum standards, so a complaint can succeed even without a numbered rule being broken.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Follow the paperwork in order</h3>
              <p>
                A signed written agency agreement comes before commission or marketing, with the approved guide and legal advice offered first. Then offers, conditions, the deposit held in trust for 10 working days, and settlement. Disclose known defects and any benefit to you or your relatives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Connect the law to the property</h3>
              <p>
                Learn what a LIM shows and does not show, what a code compliance certificate confirms, the five activity categories in a district plan, and where the Fair Trading Act, AML/CFT Act and Overseas Investment Act touch a sale. Finish each training set, then aim for 80% on every mock test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NZ Real Estate Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="nzrealestate" />
        </div>
      </div>

      <ExamSampleQuestions examId="nzrealestate" />

      <ExamRelatedTests examId="nzrealestate" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Real Estate Assessments?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across the salesperson&apos;s duties.</p>
          <ExamLandingCTA dashboardHref="/nz-real-estate/dashboard" />
        </div>
      </div>
    </div>
  );
}
