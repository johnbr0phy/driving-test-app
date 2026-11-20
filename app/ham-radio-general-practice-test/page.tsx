import "@/lib/banks/hamgeneral";
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

const title = "Free Ham Radio General Practice Test 2026";
const metaDescription =
  "Free ham radio General class practice exams from the official NCVEC 2023-2027 Element 3 pool, with a plain-English explanation for every question. 35 questions, 26 to pass.";
const description =
  "Free amateur radio General class practice exams built from the official NCVEC 2023-2027 Element 3 question pool, with a plain-English explanation for every question. 35-question exams drawn like the real test, 26 to pass.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ham radio general practice test, general class exam practice, amateur radio general license test, NCVEC general question pool 2023-2027, element 3 practice exam, upgrade to general",
  alternates: {
    canonical: `${siteUrl}/ham-radio-general-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ham-radio-general-practice-test`,
    images: [{ url: shareImageUrl("hamgeneral"), width: 1200, height: 630, alt: "Tigertest free Ham Radio General practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hamgeneral")],
    title,
    description: metaDescription,
  },
};

// One list for the visible FAQ and the FAQPage JSON-LD, so the two never drift.
const faqs = [
  {
    q: "How many questions are on the ham radio General exam?",
    a: "The General class exam (FCC Element 3) has 35 multiple-choice questions, and you must answer 26 correctly, about 74 percent. Each question comes from one of the 35 groups in the official pool, so every question on the real exam is in the pool word for word.",
  },
  {
    q: "Which General question pool is current?",
    a: "The NCVEC 2023-2027 General pool, effective July 1, 2023 through June 30, 2027, with errata through February 4, 2026. After nine withdrawals it has 423 live questions. This practice test uses all of them except the 5 that need the G7-1 schematic figure. A new General pool takes effect on July 1, 2027.",
  },
  {
    q: "Do I need a Technician license first?",
    a: "You need credit for Element 2 (Technician) as well as Element 3. Most people already hold a Technician license, but you can take both elements at the same session. A team of three volunteer examiners holding Advanced or Amateur Extra licenses gives the General exam.",
  },
  {
    q: "Is the Tigertest General practice exam free?",
    a: "Start for free with no account required. Most training sets and practice exams are free; the last few steps on the dashboard are part of Tigertest Premium (one payment, no subscription). Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Ham Radio General Practice Exams",
      description,
      url: `${siteUrl}/ham-radio-general-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("hamgeneral"),
      featureList: [
        "The official NCVEC 2023-2027 General question pool",
        "A plain-English explanation for every question",
        "35-question practice exams drawn like the real test",
        "Training sets for all ten subelements",
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
        classFaqJsonLd("hamgeneral"),
      ],
    },
  ],
};

const subelements = [
  { name: "G1 Commission's Rules", weight: "5 questions" },
  { name: "G2 Operating Procedures", weight: "5 questions" },
  { name: "G3 Radio Wave Propagation", weight: "3 questions" },
  { name: "G4 Amateur Radio Practices", weight: "5 questions" },
  { name: "G5 Electrical Principles", weight: "3 questions" },
  { name: "G6 Circuit Components", weight: "2 questions" },
  { name: "G7 Practical Circuits", weight: "3 questions" },
  { name: "G8 Signals & Emissions", weight: "3 questions" },
  { name: "G9 Antennas & Feed Lines", weight: "4 questions" },
  { name: "G0 Electrical & RF Safety", weight: "2 questions" },
];

export default function HamGeneralLandingPage() {
  return (
    <div data-theme="hamgeneral" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Ham Radio General Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ham-radio-general/dashboard"
            shortName="General"
            subtitle="The official 2023-2027 General pool, every answer explained. Free to start, no account needed."
            shots={{ mobile: "/landing/hamgeneral-mobile.png", desktop: "/landing/hamgeneral-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hamgeneral" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Training by Subelement</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six sets that walk the whole pool, G1 to G0. Every question is the real one, and every
                answer comes with a plain-English explanation. Questions you miss come back until you
                have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 35-question exams drawn from the subelements in the same proportions as the real
                Element 3 exam, one from every group of the pool, with the real pass line of 26 correct.
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
                The Official NCVEC 2023-2027 General Pool
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The exam draws one question from each of the pool&apos;s 35 groups. Here is how the 35
                questions split across the ten subelements, and how each practice exam draws them.
              </p>
              <div className="space-y-3">
                {subelements.map((s) => (
                  <div key={s.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{s.name}</span>
                    <span className="text-brand-dark font-semibold">{s.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("hamgeneral", 3)}
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
            How to Pass the General Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the format</h3>
              <p>
                35 multiple-choice questions, 26 to pass, no Morse code. Volunteer examiner teams give
                the exam at local sessions and online. Bring photo ID and your FCC Registration Number
                (FRN), and check your VE team&apos;s fee before you go.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the pool, because the pool is the exam</h3>
              <p>
                Every question on the real exam is taken word for word from the public pool, with the
                same four answers. Work through the training sets until you recognise each question,
                and read the explanations so the answers stick instead of being memorised.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the HF band edges and rules</h3>
              <p>
                G1 (the Commission&apos;s rules) and G2 (operating procedures) are 10 of the 35
                questions. General privileges, power limits, 60-meter channels and band-plan
                etiquette are facts you will also use on the air.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the math</h3>
              <p>
                G5 and G9 ask for decibels, power, reactance, SWR and dipole lengths. Read the worked
                explanations, then retake the sets you missed most until you clear 26 with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          General Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="hamgeneral" />
        </div>
      </div>

      <ExamSampleQuestions examId="hamgeneral" />

      <ExamRelatedTests examId="hamgeneral" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get on HF?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. The official General pool.</p>
          <ExamLandingCTA dashboardHref="/ham-radio-general/dashboard" />
        </div>
      </div>
    </div>
  );
}
