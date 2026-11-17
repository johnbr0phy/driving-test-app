import "@/lib/banks/cahunteron";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free Ontario Hunter Education Practice Test 2026 - Hunting Exam Questions";
const metaDescription =
  "Practice for the Ontario Hunter Education Course exam: 200 original questions on Ontario hunting law, the Outdoors Card, tags, hunter orange, firearm and bow rules, wildlife and field care. Four 50-question practice tests, every answer explained.";
const description =
  "Practice for the exam of the Ontario Hunter Education Course, which most residents pass before they can buy Ontario hunting licences and tags: 200 original questions on licences, the Outdoors Card and apprentices, tags, party hunting and hunter reporting, hunting hours, hunter orange and prohibited methods, firearm and archery rules, land access and conservation officers, hunter ethics, wildlife identification and management, and field care. Written from the Fish and Wildlife Conservation Act, 1997, the Hunting regulation and the ministry's Hunting Regulations Summary. Four 50-question practice tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ontario hunter education practice test, ontario hunting exam questions, ontario hunter safety test, ohep exam, ontario hunting licence test, outdoors card hunter accreditation, ontario hunting regulations quiz 2026",
  alternates: {
    canonical: `${siteUrl}/ontario-hunter-education-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ontario-hunter-education-practice-test`,
    images: [{ url: shareImageUrl("cahunteron"), width: 1200, height: 630, alt: "Tigertest Ontario Hunter Education practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cahunteron")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Ontario Hunter Education Course exam?",
    a: "It is the exam at the end of the Ontario Hunter Education Course, which most Ontario residents must pass before they can buy hunting licences and tags or join the Hunter Apprenticeship Safety Program for 12 to 14 year olds. The Ontario Hunter Education Program runs the course for the Ministry of Natural Resources, in person with a certified instructor or online. After passing, you register your accreditation at a participating ServiceOntario location, or online through the new licensing system from December 10, 2026.",
  },
  {
    q: "How many questions are on the exam, and what is the pass mark?",
    a: "The ministry does not publish a question count or a provincial pass mark. The online course (HUNTERcourse.com) requires at least 80 percent on its final exam, and instructor-led exams are set by the course, so ask your instructor. Tigertest's practice tests have 50 questions each and use 80 percent as Tigertest's target, matching the online course. Aim to clear it on all four before you sit the real exam.",
  },
  {
    q: "What does the course cover?",
    a: "Ontario lists six topic areas: hunting safety and equipment, hunting laws and regulations, hunter responsibilities, wildlife management, hunting techniques and wildlife identification. The ministry publishes no topic weights, so the practice tests here spread those areas across eight categories, with most weight on the rules hunters live by: the Outdoors Card and licences, tags and party hunting, hunting hours, hunter orange, firearm and bow requirements and land access.",
  },
  {
    q: "Do I also need the Canadian Firearms Safety Course?",
    a: "Only to hunt with a gun. Passing the Ontario Hunter Education Course and buying the right licences lets you hunt with a bow. To hunt with a gun you must also carry a possession and acquisition licence, a minor's licence or proof of passing the Canadian Firearms Safety Course. Many instructors teach the two courses together, but each can be taken on its own.",
  },
  {
    q: "Are these the real exam questions?",
    a: "No. Every question is original, written by Tigertest from the Fish and Wildlife Conservation Act, 1997, the Hunting regulation (O. Reg. 665/98) as consolidated in 2026 and the ministry's 2026 Hunting Regulations Summary, without copying the course manual or its exam. Tigertest is not affiliated with the Ontario Ministry of Natural Resources or the Ontario Hunter Education Program. Changes to tags and apprentices take effect on January 1, 2027, so check the current summary before you hunt.",
  },
];


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Ontario Hunter Education Practice Test",
      description,
      url: `${siteUrl}/ontario-hunter-education-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cahunteron", "CAD"),
      featureList: [
        "200 Ontario hunter education practice questions",
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
        classFaqJsonLd("cahunteron"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Licences, Outdoors Card and apprentices", weight: "6 per test" },
  { name: "Tags, party hunting and reporting", weight: "6 per test" },
  { name: "Hunting hours, hunter orange and methods", weight: "8 per test" },
  { name: "Firearms and archery rules", weight: "7 per test" },
  { name: "Land access and conservation officers", weight: "5 per test" },
  { name: "Hunter ethics and responsibilities", weight: "5 per test" },
  { name: "Wildlife identification and management", weight: "8 per test" },
  { name: "Field care, health and outdoor safety", weight: "5 per test" },
];


export default function OntarioHunterLandingPage() {
  return (
    <div data-theme="cahunteron" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Ontario Hunter Education Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ontario-hunter/dashboard"
            shortName="Ontario Hunter Ed"
            subtitle="200 original questions for the Ontario Hunter Education Course exam: the Outdoors Card, tags, hunter orange, firearm and bow rules, land access, ethics, wildlife and field care, written from Ontario's hunting law. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/cahunteron-mobile.png", desktop: "/landing/cahunteron-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cahunteron" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train Topic by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: licences, tags and reporting; hunting rules and land access; firearms, archery and ethics; and wildlife and field care. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Four Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions that mix all eight topics, with an 80% line, Tigertest&apos;s target, matching the online course&apos;s final exam. No question appears in more than one test, and every answer comes with a short explanation citing the Act, the regulation or the ministry&apos;s summary.
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
                Built on Ontario&apos;s Hunting Law
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Ontario lists the course&apos;s six topic areas but publishes no weights, so each 50-question test spreads them across eight topics as below. The rules come from the Fish and Wildlife Conservation Act, 1997, the Hunting regulation (O. Reg. 665/98) and the ministry&apos;s 2026 Hunting Regulations Summary. Season dates, bag limits and fees change every year, so they are left out.
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
                src={getTigerAsset("cahunteron", 3)}
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
            How to Pass the Ontario Hunter Education Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the documents and the tag rules</h3>
              <p>
                Know what you must carry (Outdoors Card, licence, tag, and firearms proof with a gun), who counts as a resident, how apprentices hunt with a mentor, and how to notch and attach a tag. Party hunting has its own conditions: everyone licensed, within 5 km of the tag holder, able to talk to each other.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers once</h3>
              <p>
                Half an hour before sunrise to half an hour after sunset, 400 square inches of hunter orange, a three-shell shotgun plug, 8 m from the road in the south, 60 cm arrows and 22 mm broadheads, and the bow and crossbow draw weights for deer and for moose, elk and bear.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the land and the ethics</h3>
              <p>
                Red circles and cultivated land mean no entry, wounded game on posted land needs permission, Crown game preserves are closed, and meat and pelts may not be wasted. Learn what a conservation officer may do and what you must tell them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each topic, then test</h3>
              <p>
                Finish the four training sets first, then take the practice tests and aim for 80% on every one. Read the current Hunting Regulations Summary before your exam and before you hunt.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Ontario Hunter Education FAQ
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cahunteron" />
        </div>
      </div>

      <ExamSampleQuestions examId="cahunteron" />

      <ExamRelatedTests examId="cahunteron" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the Ontario Hunter Education Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every course topic.</p>
          <ExamLandingCTA dashboardHref="/ontario-hunter/dashboard" />
        </div>
      </div>
    </div>
  );
}
