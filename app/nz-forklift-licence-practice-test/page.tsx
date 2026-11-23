import "@/lib/banks/nzforklift";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = SITE_URL;

const title = "Free NZ Forklift Practice Test 2026 - Forklift Licence and F Endorsement";
const metaDescription =
  "Free-to-start practice for the New Zealand forklift operator certificate: 200 original questions on NZQA skill standards 40735, 40736 and 40737 (formerly 10851 and 10852), the Health and Safety at Work Act and the F endorsement, in four 50-question tests.";
const description =
  "Practice for the theory side of a New Zealand forklift course: 200 original questions written from NZQA skill standards 40735 Operate a forklift safely, 40736 attachments and 40737 working platforms, which replaced unit standards 10851 and 10852, from the Health and Safety at Work Act 2015 and its General Risk and Workplace Management Regulations, and from NZ Transport Agency Waka Kotahi's F endorsement rules. Four 50-question practice tests and four training sets cover PCBU and worker duties, the F endorsement and road use, load plates, load centre and derating, stability and forklift physics, pre-start checks and start-up, site hazards and traffic, driving, stacking and parking, and attachments and working platforms.";

const faqs = [
  {
    q: "Do I need a forklift licence in New Zealand?",
    a: "For work off the road there is no government forklift licence. Under the Health and Safety at Work Act the business you work for (the PCBU) must make sure you are adequately trained or supervised to use the forklift, and most do that with a course from a registered forklift trainer, which gives you a certificate. The usual standards are NZQA skill standard 40735 Operate a forklift safely, with 40736 for attachments and 40737 for working platforms; they replaced unit standards 10851 and 10852, which expire on 31 December 2027. NZQA recommends refresher training every three years.",
  },
  {
    q: "What is the F endorsement?",
    a: "If you drive a forklift on a road you must have an F endorsement on your driver licence. NZ Transport Agency Waka Kotahi says you also need the licence class for the forklift's weight including its load: class 1 up to 18,000 kg and class 2 above that. A road includes any place the public can get to, such as wharves, beaches and a factory yard with no gate. You complete an approved F endorsement course, then apply at a driver licensing agent; the course certificate alone does not let you drive on the road, and the endorsement expires with your licence.",
  },
  {
    q: "Is there a written exam with a pass mark?",
    a: "No. There is no national forklift exam. Your trainer assesses what you know about safe operation, load plates and stability, then watches you do a pre-start check, drive forward and in reverse, stack and de-stack at low, eye and high levels, park and shut down. The result is Achieved or not. Some trainers add a short written quiz of their own. The 80% on these tests is Tigertest's readiness line, not an official mark.",
  },
  {
    q: "What do the practice tests cover?",
    a: "Each 50-question test mixes eight topics: health and safety law; the F endorsement and road use; load plates, capacity and derating; stability and forklift physics; pre-operation checks and start-up; driving, stacking and parking; site hazards and traffic; and attachments and working platforms. NZQA publishes no topic weights, so the split is Tigertest's.",
  },
  {
    q: "Is this an official forklift course or certificate?",
    a: "No. Every question is original, written by Tigertest from the NZQA standards, New Zealand law and published lift truck safety codes. It is practice for the theory side of a course, not a certificate, and it cannot replace hands-on training and assessment by a registered forklift trainer. Tigertest is not affiliated with NZQA, WorkSafe New Zealand, NZ Transport Agency Waka Kotahi or any training provider.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nz forklift practice test, forklift licence nz, forklift certificate nz, f endorsement nz, unit standard 10851, unit standard 10852, 40735 operate a forklift safely, nzqa forklift, forklift course quiz nz, forklift ticket nz",
  alternates: {
    canonical: `${siteUrl}/nz-forklift-licence-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nz-forklift-licence-practice-test`,
    images: [{ url: shareImageUrl("nzforklift"), width: 1200, height: 630, alt: "Tigertest free NZ forklift practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzforklift")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NZ Forklift Practice Test",
      description,
      url: `${siteUrl}/nz-forklift-licence-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nzforklift"),
      featureList: [
        "200 New Zealand forklift practice questions",
        "4 practice tests of 50 questions",
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
        classFaqJsonLd("nzforklift"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Health & safety law", weight: "6 of 50" },
  { name: "F endorsement & road use", weight: "4 of 50" },
  { name: "Load plates, capacity & derating", weight: "7 of 50" },
  { name: "Stability & forklift physics", weight: "7 of 50" },
  { name: "Pre-operation checks & start-up", weight: "7 of 50" },
  { name: "Driving, stacking & parking", weight: "9 of 50" },
  { name: "Site hazards & traffic", weight: "5 of 50" },
  { name: "Attachments & working platforms", weight: "5 of 50" },
];

export default function NzForkliftLandingPage() {
  return (
    <div data-theme="nzforklift" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NZ Forklift Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-forklift/dashboard"
            shortName="NZ Forklift"
            subtitle="200 questions on NZQA forklift standards 40735, 40736 and 40737 (formerly 10851 and 10852) and the F endorsement. Four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/nzforklift-mobile.png", desktop: "/landing/nzforklift-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzforklift" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets follow the forklift standards and the law: health and safety duties and the F endorsement; load capacity and stability; pre-start checks and site hazards; and driving, stacking and attachments. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions, each mixing every topic. Your course is assessed by your trainer rather than a national exam, so aim for 80% here as a target. No question appears in more than one test, and every one comes with an explanation.
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
                Built on NZQA 40735, 40736 and 40737
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NZQA&apos;s forklift skill standards say what you must know and do: forklift physics and operating parameters, pre-operation checks, safe driving, stacking, parking and shut-down, plus attachments and working platforms. The law questions come from the Health and Safety at Work Act and Waka Kotahi&apos;s F endorsement rules. NZQA publishes no topic weights, so this split is Tigertest&apos;s.
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
                src={getTigerAsset("nzforklift", 3)}
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
            How to Prepare for Your Forklift Course
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the load plate every time</h3>
              <p>
                Rated capacity only holds at the load centre and lift height on the plate. A load further out on the forks, a higher lift or an attachment all cut what the truck can safely take, so know the weight before you lift.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Understand the stability triangle</h3>
              <p>
                A counterbalanced truck stays upright while the combined centre of gravity stays inside the triangle formed by the front wheels and the rear axle pivot. Raised loads, sharp turns, slopes and harsh braking move that point toward the edge.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the law and the road rules</h3>
              <p>
                The PCBU must make sure you are trained or supervised, and you must take reasonable care and follow reasonable instructions. On a road you need a full licence of the right class plus an F endorsement, and a road includes any place the public can reach.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then practise on the truck</h3>
              <p>
                Tigertest tracks your accuracy by topic. After each test, drill the questions you missed. Then put it into practice at your course: the pre-start check, three points of contact, travelling with forks low and stacking at three heights are what your trainer watches.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NZ Forklift Course Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="nzforklift" />
        </div>
      </div>

      <ExamSampleQuestions examId="nzforklift" />

      <ExamRelatedTests examId="nzforklift" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Forklift Course?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on NZQA forklift standards, NZ law and the F endorsement.</p>
          <ExamLandingCTA dashboardHref="/nz-forklift/dashboard" />
        </div>
      </div>
    </div>
  );
}
