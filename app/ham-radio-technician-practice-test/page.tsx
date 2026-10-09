import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Ham Radio Technician Practice Test 2026 - Official 2026-2030 Pool";
const description =
  "Free amateur radio Technician class practice exams built from the official NCVEC 2026-2030 question pool, with a plain-English explanation for every question. 35-question exams drawn like the real test, 26 to pass.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "ham radio technician practice test, technician class exam practice, amateur radio license test, NCVEC technician question pool 2026, ham radio test questions, FCC element 2 practice exam",
  alternates: {
    canonical: `${siteUrl}/ham-radio-technician-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/ham-radio-technician-practice-test`,
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free Ham Radio Technician Practice Exams",
      description,
      url: `${siteUrl}/ham-radio-technician-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "The official NCVEC 2026-2030 Technician question pool",
        "A plain-English explanation for every question",
        "35-question practice exams drawn like the real test",
        "Training sets for all ten subelements",
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
          name: "How many questions are on the ham radio Technician exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Technician class exam (FCC Element 2) has 35 multiple-choice questions and you must answer 26 correctly, about 74 percent. Each question comes from one of the 35 groups in the official pool, so every question you see on the real exam is in the pool word for word.",
          },
        },
        {
          "@type": "Question",
          name: "Which question pool is current?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The NCVEC 2026-2030 Technician pool, effective July 1, 2026 through June 30, 2030. It has 409 questions. This practice test uses all of them except the 12 that require a schematic figure.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to know Morse code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The FCC dropped the Morse code requirement in 2007. The Technician exam is written only, given by volunteer examiners, and the license is valid for 10 years.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest Technician practice exam free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice exams and all six training sets are free, with no account required.",
          },
        },
      ],
    },
  ],
};

const subelements = [
  { name: "T1 FCC Rules", weight: "6 questions" },
  { name: "T2 Operating Procedures", weight: "3 questions" },
  { name: "T3 Radio Wave Propagation", weight: "3 questions" },
  { name: "T4 Amateur Radio Practices", weight: "2 questions" },
  { name: "T5 Electrical Principles", weight: "4 questions" },
  { name: "T6 Electronic Components", weight: "4 questions" },
  { name: "T7 Practical Circuits", weight: "4 questions" },
  { name: "T8 Signals & Emissions", weight: "4 questions" },
  { name: "T9 Antennas & Feed Lines", weight: "2 questions" },
  { name: "T0 Safety", weight: "3 questions" },
];

export default function HamLandingPage() {
  return (
    <div data-theme="ham" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Ham Radio Technician Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ham-radio/dashboard"
            shortName="Technician"
            subtitle="The official 2026-2030 question pool with an explanation for every answer. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ham-mobile.png", desktop: "/landing/ham-desktop.png" }}
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Subelement</h3>
              <p className="text-gray-600">
                Six sets that walk the whole pool, T1 to T0. Every question is the real one, and every
                answer comes with a plain-English explanation. Questions you miss come back until you
                have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Exams</h3>
              <p className="text-gray-600">
                Four 35-question exams drawn from the subelements in the same proportions as the real
                Element 2 exam, with the real pass line of 26 correct.
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
                The Official NCVEC 2026-2030 Pool
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The exam draws one question from each of the pool&apos;s 35 groups. Here is how the 35
                questions split across the ten subelements, and how each practice exam draws them.
              </p>
              <div className="space-y-3">
                {subelements.map((s) => (
                  <div key={s.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <span className="font-medium text-gray-900">{s.name}</span>
                    <span className="text-brand font-semibold">{s.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("ham", 1)}
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
            The Technician practice exam is brand new. If an explanation looks wrong, or you want
            General and Extra class added, tell us.
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
            How to Pass the Technician Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Know the format</h3>
              <p>
                35 multiple-choice questions, 26 to pass, no Morse code. Volunteer examiners give the
                exam at local sessions and online. Bring photo ID and your FCC Registration Number
                (FRN); the FCC charges a $35 application fee once you pass, and the license lasts 10 years.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Learn the pool, because the pool is the exam</h3>
              <p>
                Every question on the real exam is taken word for word from the public pool, with the
                same four answers. Work through the training sets until you recognise each question,
                and read the explanations so the answers stick instead of being memorised.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Do not skip the rules and safety</h3>
              <p>
                T1 (FCC rules) is 6 of the 35 questions and T0 (safety) is 3. They are the easiest
                points on the exam and the ones new hams most often lose.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak areas</h3>
              <p>
                TigerTest tracks your accuracy by subelement. After each practice exam, go back to the
                set you missed most and retake until you clear 26 with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Technician Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the ham radio Technician exam?</h3>
            <p className="text-gray-600">
              35 multiple-choice questions, and you must answer 26 correctly, about 74 percent. Each
              question comes from one of the 35 groups in the official pool, so every question on the
              real exam is in the pool word for word.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Which question pool is current?</h3>
            <p className="text-gray-600">
              The NCVEC 2026-2030 Technician pool, effective July 1, 2026 through June 30, 2030. It has
              409 questions. This practice test uses all of them except the 12 that require a schematic
              figure.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Do I need to know Morse code?</h3>
            <p className="text-gray-600">
              No. The FCC dropped the Morse code requirement in 2007. The Technician exam is written
              only, given by volunteer examiners, and the license is valid for 10 years.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest Technician practice exam free?</h3>
            <p className="text-gray-600">
              Yes. All four practice exams and all six training sets are free, with no account required.
              Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Get Your Call Sign?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. The whole official pool.</p>
          <ExamLandingCTA dashboardHref="/ham-radio/dashboard" />
        </div>
      </div>
    </div>
  );
}
