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

const title = "Free Civil Service Exam Reviewer 2026 - Professional and Subprofessional";
const metaDescription =
  "Free Civil Service Exam reviewer for the Philippines: 245 original CSE-PPT questions on verbal, analytical, clerical and numerical ability and general information, with two 100-item mock exams and every answer explained.";
const description =
  "Free Civil Service Exam (CSE-PPT) reviewer with 245 original questions for both levels: verbal ability, analytical ability (Professional), clerical ability (Subprofessional), numerical ability, and general information on the Philippine Constitution, R.A. 6713, peace and human rights, and the environment. Practice Test 1 follows the Professional level and Practice Test 2 the Subprofessional level, 100 items in 2 hours each, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the difference between the Professional and Subprofessional Civil Service Exam?",
    a: "Both levels test verbal ability, numerical ability and general information. The Professional level adds analytical ability (word analogies, logic, assumptions and conclusions, data interpretation), while the Subprofessional level adds clerical ability (filing and spelling) instead. For the 2026 exams the CSC set, as reported from its announcements, 170 items in 3 hours and 10 minutes for Professional and 165 items in 2 hours and 40 minutes for Subprofessional. Passing the Professional level gives the eligibility for first and second level positions; Subprofessional is for first level positions only.",
  },
  {
    q: "What is the passing score for the Civil Service Exam?",
    a: "You need a general rating of at least 80.00 to pass, at either level. The CSC does not publish how raw scores are converted into the rating, so aim comfortably above 80 percent in practice.",
  },
  {
    q: "What topics are in the general information part?",
    a: "The CSC lists the Philippine Constitution, R.A. 6713 (the Code of Conduct and Ethical Standards for Public Officials and Employees), peace and human rights issues and concepts, and environment management and protection. This reviewer covers all four with original questions whose explanations name the article, section or law behind each answer.",
  },
  {
    q: "Are these real Civil Service Exam questions?",
    a: "No. Every question is original, written to the scope in the CSC examination announcements, and none is copied from past exams or other reviewers. The real exam also has verbal items in Filipino, and its abstract reasoning items use figures; this reviewer is in English and writes reasoning items as words and letter patterns.",
  },
  {
    q: "Is the Tigertest Civil Service Exam reviewer free?",
    a: "Yes. Both mock exams and all nine drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "civil service exam reviewer, civil service exam reviewer 2026, CSE-PPT reviewer, civil service exam professional reviewer, civil service exam subprofessional reviewer, civil service exam practice test, CSC exam reviewer philippines, RA 6713 reviewer, Philippine Constitution reviewer, career service exam",
  alternates: {
    canonical: `${siteUrl}/civil-service-exam-reviewer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/civil-service-exam-reviewer-practice-test`,
    images: [{ url: shareImageUrl("phcse"), width: 1200, height: 630, alt: "Tigertest free Civil Service Exam reviewer" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phcse")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Civil Service Exam Reviewer",
      description,
      url: `${siteUrl}/civil-service-exam-reviewer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
      featureList: [
        "245 original Civil Service Exam practice questions with explanations",
        "A Professional level mock and a Subprofessional level mock, 100 items in 2 hours each",
        "9 drills: grammar, vocabulary, reading, analytical ability, clerical ability, basic operations, word problems, the Constitution, and ethics, human rights and environment",
        "General information on the 1987 Constitution and R.A. 6713, with the section behind each answer",
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
        classFaqJsonLd("phcse"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Verbal Ability", weight: "Both levels" },
  { name: "Numerical Ability", weight: "Both levels" },
  { name: "General Information", weight: "Both levels" },
  { name: "Analytical Ability", weight: "Professional" },
  { name: "Clerical Ability", weight: "Subprofessional" },
];

export default function CivilServiceExamLandingPage() {
  return (
    <div data-theme="phcse" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Civil Service Exam Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/civil-service-exam/dashboard"
            shortName="Civil Service Exam"
            subtitle="245 original CSE-PPT questions for the Professional and Subprofessional levels. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phcse-mobile.png", desktop: "/landing/phcse-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phcse" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Part</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nine drills cover the whole exam scope: grammar, vocabulary, reading, analytical ability, clerical ability, basic operations, word problems, the Constitution, and ethics, human rights and environment. Skip the analytical drill if you are taking Subprofessional, or the clerical drill if you are taking Professional. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Exams for Each Level</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practice Test 1 follows the Professional level and Practice Test 2 the Subprofessional level: 100 items in 2 hours each, about the pace of the real exam, which is longer. Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the CSE-PPT Scope
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Civil Service Commission gives the same verbal, numerical and general information parts at both levels. Professional adds analytical ability; Subprofessional adds clerical ability. Each mock exam here groups its 100 items in that order: 30 verbal, 25 analytical or clerical, 25 numerical and 20 general information.
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
                src={getTigerAsset("phcse", 1)}
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
            How to Prepare for the Civil Service Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know which level you are taking</h3>
              <p>
                The two levels share most of their content, but only Professional has analytical ability and only Subprofessional has clerical ability. Spend your drill time on the part your level actually tests, and take the matching mock exam.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read the Constitution and R.A. 6713 directly</h3>
              <p>
                General information questions come from short, fixed texts. Read Article II, the Bill of Rights, Article IX-B on the civil service and Article XI on accountability, then the norms of conduct, duties and prohibited acts in R.A. 6713. Note numbers that are easy to ask: 15 working days, April 30, one year.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice numbers without a calculator</h3>
              <p>
                Study guides say calculators are not allowed, so practice by hand. Get quick at fractions, percents and the common word problems on work, speed, ratio and discounts, and check each answer by estimating before you shade it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep a steady pace</h3>
              <p>
                You have about a minute per item. Answer the easy ones first, flag the hard ones, and come back. Take a full two-hour mock exam to learn how that pace feels, then drill the part where you lose the most points.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Civil Service Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="phcse" />
        </div>
      </div>

      <ExamRelatedTests examId="phcse" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the Civil Service Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 245 questions for both levels.</p>
          <ExamLandingCTA dashboardHref="/civil-service-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}
