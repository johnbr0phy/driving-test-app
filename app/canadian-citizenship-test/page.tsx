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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Canadian Citizenship Test Practice 2026 - Free 20-Question Tests";
const metaDescription =
  "Free Canadian citizenship test practice: 200 original questions from Discover Canada on rights, history, government, elections, symbols and every provincial capital, with eight 20-question tests.";
const description =
  "Free practice for the Canadian citizenship test: 200 original questions written from the official study guide, Discover Canada: The Rights and Responsibilities of Citizenship. Rights and responsibilities, who Canadians are, history, modern Canada, how Canadians govern themselves, federal elections, the justice system, symbols, the economy and the regions, including every provincial and territorial capital. Eight 20-question tests scored like the real one (15 of 20 to pass) and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "canadian citizenship test, citizenship test canada practice, discover canada practice test, canada citizenship quiz, canadian citizenship test questions, IRCC citizenship test, citizenship test 20 questions, provincial capitals quiz",
  alternates: {
    canonical: `${siteUrl}/canadian-citizenship-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/canadian-citizenship-test`,
    images: [{ url: shareImageUrl("cacit"), width: 1200, height: 630, alt: "Tigertest free Canadian citizenship test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cacit")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Canadian Citizenship Test Practice",
      description,
      url: `${siteUrl}/canadian-citizenship-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 Canadian citizenship practice questions from Discover Canada",
        "8 practice tests of 20 questions, 15 correct to pass",
        "4 training sets by chapter of the study guide",
        "Every provincial and territorial capital",
        "Instant feedback with explanations",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the Canadian citizenship test like?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It has 20 questions, either multiple choice or true or false, and you have 45 minutes. You need at least 15 correct, 75 percent, to pass. Applicants aged 18 to 54 must take it, usually online. The questions cover rights and responsibilities, history, geography, the economy, government, laws and symbols.",
          },
        },
        {
          "@type": "Question",
          name: "Which study guide is the citizenship test based on?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Immigration, Refugees and Citizenship Canada (IRCC) bases every test question on its official study guide, Discover Canada: The Rights and Responsibilities of Citizenship. As of October 2026 it is still the current guide. You can read it free on canada.ca or download it as a PDF, ebook or audio file.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to know the provincial and territorial capitals?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Questions can come from any part of the guide, including its chapter on Canada's five regions, which names every province and territory and its capital. Learn all 13 capitals plus Ottawa, starting with your own. Tigertest asks about every capital but not about current premiers, who change.",
          },
        },
        {
          "@type": "Question",
          name: "What happens if I fail the citizenship test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You get up to three chances to pass within your test period. If you do not pass by the third try, IRCC invites you to a hearing with a citizenship official, who can check your knowledge by asking questions in person. Follow the instructions in your own invitation, since the process can change.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the official citizenship test questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. IRCC does not publish its test questions. Every question here is written by Tigertest from Discover Canada and checked against canada.ca, so it covers the same knowledge without copying any official test. It is free practice, not an IRCC service. Where a fact changed after the guide was printed, such as the number of federal ridings or NAFTA becoming CUSMA, the explanation says so.",
          },
        },
        classFaqJsonLd("cacit"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Rights & Responsibilities", weight: "10%" },
  { name: "Who We Are", weight: "10%" },
  { name: "Canada's History", weight: "20%" },
  { name: "Modern Canada", weight: "5%" },
  { name: "How Canadians Govern Themselves", weight: "15%" },
  { name: "Federal Elections", weight: "10%" },
  { name: "The Justice System", weight: "5%" },
  { name: "Canadian Symbols", weight: "10%" },
  { name: "Canada's Economy", weight: "5%" },
  { name: "Regions & Capitals", weight: "10%" },
];

export default function CanadianCitizenshipLandingPage() {
  return (
    <div data-theme="cacit" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Canadian Citizenship Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/canadian-citizenship/dashboard"
            shortName="Citizenship"
            subtitle="200 questions from Discover Canada on rights, history, government, elections, symbols and every capital, in 20-question tests scored like the real one. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cacit-mobile.png", desktop: "/landing/cacit-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cacit" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Chapter</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets follow the study guide: rights and who we are, history, government and elections, then symbols, the economy and the regions. Together they hold all 200 questions, and the ones you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight practice tests of 20 questions each, the same length as the real test, with the same pass mark of 15 out of 20 and an explanation of the right answer on every question.
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
                Built on Discover Canada
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                IRCC takes every test question from its study guide, Discover Canada, but does not publish how many come from each chapter. Each practice test here spreads its 20 questions across the guide&apos;s chapters, with the most from history and government, where the guide spends the most pages. Settlement agencies and newcomer classes can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which chapters the group misses most.
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
                src={getTigerAsset("cacit", 1)}
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
            How to Pass the Citizenship Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read Discover Canada once, all the way through</h3>
              <p>
                It is about 60 pages and every test question comes from it. A first read gives you the story: the First Nations, Inuit and Métis, New France, the Loyalists, Confederation in 1867, the World Wars and modern Canada. Then use practice questions to find what did not stick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the dates and names that come up again and again</h3>
              <p>
                1215 Magna Carta, 1759 Plains of Abraham, 1774 Quebec Act, 1791 Upper and Lower Canada, 1812 war with the United States, 1867 Confederation, 1885 the railway and the North-West Rebellion, 1917 Vimy Ridge, 1944 Juno Beach, 1965 the maple leaf flag, 1980 O Canada, 1982 the Charter. Put a person to each: Cartier, Champlain, Brock, Laura Secord, Macdonald, Riel, Currie.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know who does what in government</h3>
              <p>
                The Sovereign is head of state, represented by the Governor General and, in each province, a Lieutenant Governor. The Prime Minister heads the federal government and a premier each province. Parliament is the Sovereign, the Senate and the House of Commons. Know which level handles defence, education and snow removal, and how a bill becomes law.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Take full tests until 15 is easy</h3>
              <p>
                Each practice test here is 20 questions, like the real one. Aim for 18 or more on all eight before your test date, then drill the questions you missed. The real test gives you 45 minutes, which is plenty, so read every option before you answer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Canadian Citizenship Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the Canadian citizenship test like?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It has 20 questions, either multiple choice or true or false, and you have 45 minutes. You need at least 15 correct, 75 percent, to pass. Applicants aged 18 to 54 must take it, usually online. The questions cover rights and responsibilities, history, geography, the economy, government, laws and symbols.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which study guide is the citizenship test based on?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Immigration, Refugees and Citizenship Canada (IRCC) bases every test question on its official study guide, Discover Canada: The Rights and Responsibilities of Citizenship. As of October 2026 it is still the current guide. You can read it free on canada.ca or download it as a PDF, ebook or audio file.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do I need to know the provincial and territorial capitals?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. Questions can come from any part of the guide, including its chapter on Canada&apos;s five regions, which names every province and territory and its capital. Learn all 13 capitals plus Ottawa, starting with your own. Tigertest asks about every capital but not about current premiers, who change.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What happens if I fail the citizenship test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You get up to three chances to pass within your test period. If you do not pass by the third try, IRCC invites you to a hearing with a citizenship official, who can check your knowledge by asking questions in person. Follow the instructions in your own invitation, since the process can change.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the official citizenship test questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. IRCC does not publish its test questions. Every question here is written by Tigertest from Discover Canada and checked against canada.ca, so it covers the same knowledge without copying any official test. It is free practice, not an IRCC service. Where a fact changed after the guide was printed, such as the number of federal ridings or NAFTA becoming CUSMA, the explanation says so.
            </p>
          </div>
          <ExamClassFaq examId="cacit" />
        </div>
      </div>

      <ExamRelatedTests examId="cacit" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Citizenship Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every chapter of Discover Canada.</p>
          <ExamLandingCTA dashboardHref="/canadian-citizenship/dashboard" />
        </div>
      </div>
    </div>
  );
}
