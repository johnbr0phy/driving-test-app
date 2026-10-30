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

const title = "Free PSW Practice Test 2026 - Ontario PSW Exam Prep";
const metaDescription =
  "Free Ontario PSW practice tests: 200 original questions on the PSW role, consent, abuse reporting, infection control, daily living, medication, palliative care and dementia. All explained.";
const description =
  "Free Ontario Personal Support Worker practice tests with 200 original questions built on the 2022 Ontario PSW program standard and current Ontario law: the PSW role and teamwork, communication and documentation, consent and residents' rights, abuse and neglect, safety and infection control, activities of daily living, medication assistance, palliative care, mental health and responsive behaviours. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "PSW practice test, PSW exam Ontario, personal support worker practice test, NACC PSW exam practice, PSW final exam questions, PSW test 2026, free PSW practice questions, Ontario PSW certificate",
  alternates: {
    canonical: `${siteUrl}/psw-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/psw-practice-test`,
    images: [{ url: shareImageUrl("capsw"), width: 1200, height: 630, alt: "Tigertest free Ontario PSW practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("capsw")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Ontario PSW Practice Tests",
      description,
      url: `${siteUrl}/psw-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "200 Ontario PSW practice questions",
        "4 practice tests across all 14 program outcomes",
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
          name: "What is on the Ontario PSW exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PSW programs in Ontario, at public colleges, career colleges and school boards, all follow the Personal Support Worker program standard released by the Ministry of Colleges and Universities in January 2022. It sets 14 vocational learning outcomes: the PSW role and the law, professional accountability, teamwork, person-centred and culturally safe care, communication and boundaries, observing and reporting, safety and infection control, activities of daily living, medication assistance, household management, supporting caregivers, abuse and neglect, palliative and end-of-life care, and mental health and responsive behaviours. Final exams, including the NACC PSW exam, test that theory.",
          },
        },
        {
          "@type": "Question",
          name: "What score do I need to pass?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on your program. Each college, career college or school board sets its own pass marks, and NACC does not publish the current pass mark for its final exam on its website, so ask your program. The practice tests here use a 70 percent line as a readiness target: clearing it on all four tests means you have covered every outcome.",
          },
        },
        {
          "@type": "Question",
          name: "Which Ontario laws do I need to know?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Fixing Long-Term Care Act, 2021 (which replaced the Long-Term Care Homes Act, 2007 in April 2022) with its Residents' Bill of Rights and duty to report abuse to the Director, the Retirement Homes Act, 2010, the Health Care Consent Act, 1996 and its list of substitute decision-makers, the Personal Health Information Protection Act, 2004, the Regulated Health Professions Act, 1991 and its controlled acts, and the Occupational Health and Safety Act. The questions here use the current laws.",
          },
        },
        {
          "@type": "Question",
          name: "Do PSWs in Ontario have to register?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PSWs are not a regulated health profession in Ontario. Since 1 December 2024 the Health and Supportive Care Providers Oversight Authority (HSCPOA) has run a public register of PSWs with a code of ethics. Check the HSCPOA and your employer for current registration rules.",
          },
        },
        {
          "@type": "Question",
          name: "Is this an official PSW exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original and written to the 2022 program standard and current Ontario law; none come from NACC, a college or a textbook. Employer policies and the client's plan of care still decide what you do on the job. It is a study tool, not a credential.",
          },
        },
        classFaqJsonLd("capsw"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Daily Living, Body Systems & Restorative Care", weight: "18%" },
  { name: "Safety, Infection Control & Emergencies", weight: "16%" },
  { name: "PSW Role, Law & Teamwork", weight: "14%" },
  { name: "Rights, Consent, Ethics & Abuse", weight: "14%" },
  { name: "Communication, Observation & Reporting", weight: "12%" },
  { name: "Medication, Home Management & Caregivers", weight: "10%" },
  { name: "Palliative & End-of-Life Care", weight: "8%" },
  { name: "Mental Health, Dementia & Responsive Behaviours", weight: "8%" },
];

export default function CapswLandingPage() {
  return (
    <div data-theme="capsw" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PSW Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/psw/dashboard"
            shortName="PSW"
            subtitle="200 original questions for Ontario Personal Support Worker students: the PSW role, consent and residents' rights, abuse reporting, infection control, daily living, medication, palliative care and dementia. Built on the 2022 program standard. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/capsw-mobile.png", desktop: "/landing/capsw-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="capsw" />

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
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
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
                Four 50-question tests across all 14 program outcomes, with a 70 percent readiness line and an explanation of the right answer and the common wrong pick on every item.
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
                Built on the 2022 PSW Program Standard
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Ontario&apos;s program standard sets 14 vocational learning outcomes that every PSW graduate must meet. The questions here group them into eight topics. The standard does not weight its outcomes, so the split below is ours, leaning toward the daily care and safety you will do every shift.
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
                src={getTigerAsset("capsw", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For PSW Instructors</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Teach PSW at a college, career college or school board? Set up a free class, share one link, and see which topics your cohort misses most before placements and the final exam.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Set Up a Class
          </Link>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Pass Your PSW Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know where your role stops</h3>
              <p>
                Many questions turn on scope: a PSW observes, reports and records, follows the plan of care and works under the direction of the team. Diagnosing, changing medication or doses, and re-delegating a controlled act are never the answer. When in doubt, the right move is usually to keep the client safe and tell the nurse or supervisor.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the laws by what they make you do</h3>
              <p>
                In long-term care, suspected abuse or neglect is reported at once to the Director under the Fixing Long-Term Care Act; in a retirement home, to the Registrar under the Retirement Homes Act. Consent must be informed and voluntary, a capable person may refuse, and the Health Care Consent Act ranks who decides when they cannot. PHIPA means health information stays in the circle of care.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise the safety routines until they are automatic</h3>
              <p>
                Hand hygiene and the four moments, routine practices and when to add contact, droplet or airborne precautions, the order for putting on and taking off PPE, RACE and PASS for fire, the emergency codes, safe body mechanics and fall prevention. These are quick marks on any test.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. After each test, drill the questions you missed and retrain that test&apos;s set, then take the four tests back to back in the week before your final exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PSW Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the Ontario PSW exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              PSW programs in Ontario, at public colleges, career colleges and school boards, all follow the Personal Support Worker program standard released by the Ministry of Colleges and Universities in January 2022. It sets 14 vocational learning outcomes: the PSW role and the law, professional accountability, teamwork, person-centred and culturally safe care, communication and boundaries, observing and reporting, safety and infection control, activities of daily living, medication assistance, household management, supporting caregivers, abuse and neglect, palliative and end-of-life care, and mental health and responsive behaviours. Final exams, including the NACC PSW exam, test that theory.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It depends on your program. Each college, career college or school board sets its own pass marks, and NACC does not publish the current pass mark for its final exam on its website, so ask your program. The practice tests here use a 70 percent line as a readiness target: clearing it on all four tests means you have covered every outcome.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which Ontario laws do I need to know?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Fixing Long-Term Care Act, 2021 (which replaced the Long-Term Care Homes Act, 2007 in April 2022) with its Residents&apos; Bill of Rights and duty to report abuse to the Director, the Retirement Homes Act, 2010, the Health Care Consent Act, 1996 and its list of substitute decision-makers, the Personal Health Information Protection Act, 2004, the Regulated Health Professions Act, 1991 and its controlled acts, and the Occupational Health and Safety Act. The questions here use the current laws.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do PSWs in Ontario have to register?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              PSWs are not a regulated health profession in Ontario. Since 1 December 2024 the Health and Supportive Care Providers Oversight Authority (HSCPOA) has run a public register of PSWs with a code of ethics. Check the HSCPOA and your employer for current registration rules.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this an official PSW exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original and written to the 2022 program standard and current Ontario law; none come from NACC, a college or a textbook. Employer policies and the client&apos;s plan of care still decide what you do on the job. It is a study tool, not a credential.
            </p>
          </div>
          <ExamClassFaq examId="capsw" />
        </div>
      </div>

      <ExamRelatedTests examId="capsw" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your PSW Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all 14 program outcomes.</p>
          <ExamLandingCTA dashboardHref="/psw/dashboard" />
        </div>
      </div>
    </div>
  );
}
