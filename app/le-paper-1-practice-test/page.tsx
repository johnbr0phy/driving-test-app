import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "LE Paper 1 Practice Test 2026 - Free HKSI Licensing Exam Questions (Hong Kong)";
const metaDescription =
  "Free practice for HKSI LE Paper 1, Fundamentals of Securities and Futures Regulation: 200 original questions on the SFO, licensing, the Code of Conduct, AML and market misconduct, three 60-question mock tests, every answer explained.";
const description =
  "Free practice for Paper 1 of the Licensing Examination for Securities and Futures Intermediaries (LE), the Hong Kong regulatory paper set by the HKSI Institute: 200 original questions on Hong Kong's regulators, company law, the Securities and Futures Ordinance, licensing and client asset rules, the SFC Code of Conduct, internal control and anti-money laundering, the exchanges, listing and takeovers, and market misconduct. Three real-length 60-question mock tests and six training sets by syllabus topic.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "le paper 1 practice test, hksi paper 1, hksi le paper 1 questions, fundamentals of securities and futures regulation, hong kong licensing examination paper 1, sfc licensing exam, hksi mock exam, le paper 1 mock test, hksi paper 1 practice test 2026",
  alternates: {
    canonical: `${siteUrl}/le-paper-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/le-paper-1-practice-test`,
    images: [{ url: shareImageUrl("hklesfi1"), width: 1200, height: 630, alt: "Tigertest free LE Paper 1 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hklesfi1")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is LE Paper 1?",
    a: "Paper 1, Fundamentals of Securities and Futures Regulation, is the local regulatory framework paper of the Licensing Examination for Securities and Futures Intermediaries (LE), run by the HKSI Institute. The LE is designed to meet the competence requirements the Securities and Futures Commission (SFC) recognises for people seeking a licence as a representative or responsible officer. Paper 1 covers Hong Kong's regulators, company law, the Securities and Futures Ordinance and its rules, business conduct, internal control and anti-money laundering, the exchanges, listing and takeovers, and market misconduct.",
  },
  {
    q: "How many questions are on LE Paper 1 and what is the pass mark?",
    a: "The HKSI Institute lists Paper 1 as 60 multiple-choice questions in 90 minutes, with a pass mark of 70%. It is a computer-based exam, taken at the Hong Kong Examination Centre or a global examination centre, with questions in English or Traditional Chinese. The current syllabus, Version 3.5, applies to exams from 30 June 2026.",
  },
  {
    q: "Do I need Paper 1 for my licence?",
    a: "Paper 1 is listed for representatives across the regulated activity types, and responsible officers take it together with a second paper that depends on the activity, such as Paper 2, 3, 4, 5, 6 or 18. Representatives usually also need Paper 7 (Financial Markets) together with a product paper such as Paper 8, 9 or 12, or another recognised industry qualification. Which papers you need, and whether any exemption applies, depends on your role and the SFC's Guidelines on Competence, so check with your firm or the SFC before you book.",
  },
  {
    q: "How are these mock tests built?",
    a: "Each mock test has 60 questions at the real pace, with the 70% pass line, and draws from all nine syllabus topics: 6 regulatory overview, 5 law and company law, 9 SFO, 9 licensing and subsidiary rules, 9 business conduct, 8 operations and AML, 5 exchanges, 5 public capital and 4 market misconduct. The HKSI Institute publishes no topic weights, so this split is Tigertest's own. The real exam is also offered in Traditional Chinese; this practice is in English only.",
  },
  {
    q: "Are these the real HKSI exam questions?",
    a: "No. Every question is original, written by Tigertest from the Paper 1 syllabus, the Securities and Futures Ordinance and its subsidiary rules, the SFC's codes and guidelines, the Companies Ordinance, the anti-money laundering laws and the Personal Data (Privacy) Ordinance as they stand in November 2026. It is free practice, not affiliated with the HKSI Institute, the SFC or HKEX, and it does not replace the official study manual.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free LE Paper 1 Practice Test",
      description,
      url: `${siteUrl}/le-paper-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "HKD" },
      featureList: [
        "200 LE Paper 1 practice questions",
        "3 real-length mock tests of 60 questions",
        "6 training sets by syllabus topic",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "Regulatory overview and Hong Kong law", weight: "11 of 60" },
  { name: "Securities and Futures Ordinance", weight: "9 of 60" },
  { name: "Licensing and subsidiary legislation", weight: "9 of 60" },
  { name: "Business conduct and client relations", weight: "9 of 60" },
  { name: "Operations, internal control and AML", weight: "8 of 60" },
  { name: "Exchanges and accessing public capital", weight: "10 of 60" },
  { name: "Market misconduct", weight: "4 of 60" },
];

export default function LePaper1LandingPage() {
  return (
    <div data-theme="hklesfi1" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free LE Paper 1 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/le-paper-1/dashboard"
            shortName="LE Paper 1"
            subtitle="200 original questions for the HKSI Institute's Paper 1 on Hong Kong securities and futures regulation: the SFO and its rules, licensing and client assets, the Code of Conduct, AML, the exchanges, listing and takeovers, and market misconduct. Three 60-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/hklesfi1-mobile.png", desktop: "/landing/hklesfi1-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hklesfi1" />

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
                Six training sets that follow the nine syllabus topics: regulators and law, the SFO and market misconduct, licensing and client assets, business conduct, internal control and AML, and the exchanges and public capital. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Three mock tests of 60 questions, each drawing on all nine topics with the real 70% pass line. No question appears in more than one test, and every answer explains the rule behind it, from client money deadlines to the mandatory offer threshold.
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
                Built on the Paper 1 Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real paper is 60 multiple-choice questions in 90 minutes with 70% to pass, on the nine topics of syllabus Version 3.5. The HKSI Institute publishes no topic weights, so each mock test here uses Tigertest&apos;s own split:
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
                src={getTigerAsset("hklesfi1", 1)}
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
            How to Pass LE Paper 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know who does what</h3>
              <p>
                Many questions turn on which body acts: the SFC licenses and disciplines, HKEX runs the markets and the Listing Rules, the HKMA supervises banks&apos; securities business, the MMT hears civil misconduct cases, and the SFAT reviews SFC decisions. Learn them as a table.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the deadlines and thresholds</h3>
              <p>
                One business day for client money and a liquid capital shortfall, two business days for a contract note, 5% and three business days for disclosure of interests, 30% for a mandatory offer, 18 months to restore a public float shortfall, six months for phone recordings and seven years for most records.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read conduct questions as the SFC would</h3>
              <p>
                The right answer puts the client first: know your client, suitability, client orders before staff orders, conflicts disclosed, client assets segregated, and a report to the JFIU without tipping off when something looks wrong.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise at the real pace</h3>
              <p>
                Ninety minutes for 60 questions is a minute and a half each. Finish every training set, then aim for 80% or better on each mock test before you book, so a few unfamiliar questions on the day cannot pull you under 70%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          LE Paper 1 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamRelatedTests examId="hklesfi1" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass LE Paper 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all nine Paper 1 topics.</p>
          <ExamLandingCTA dashboardHref="/le-paper-1/dashboard" />
        </div>
      </div>
    </div>
  );
}
