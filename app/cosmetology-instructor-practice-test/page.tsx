import "@/lib/banks/cosmoinstructor";
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

const title = "Free Cosmetology Instructor Practice Test 2026 - NIC Instructor Theory Exam";
const metaDescription =
  "Cosmetology instructor exam practice, free to start: 200 original questions on the NIC Instructor theory outline, four 50-question practice tests, every answer explained.";
const description =
  "Practice for the NIC National Instructor Theory Examination, the written licensure exam for cosmetology, barbering, esthetics and nail technology instructors in states that use NIC exams, free to start: 200 original questions written from the NIC content outline. Four 50-question practice tests weighted like the real exam, and five training sets covering curriculum and lesson planning; learners and assessment; teaching methods and obstacles; communication and professional duties; and the learning environment and safety.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cosmetology instructor practice test, nic instructor exam, cosmetology instructor exam, instructor theory exam, cosmetology teacher license test, barber instructor exam, esthetics instructor exam, nail instructor exam",
  alternates: {
    canonical: `${siteUrl}/cosmetology-instructor-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cosmetology-instructor-practice-test`,
    images: [{ url: shareImageUrl("cosmoinstructor"), width: 1200, height: 630, alt: "Tigertest cosmetology instructor practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cosmoinstructor")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the NIC Instructor theory exam?",
    a: "The National Instructor Theory Examination is the written licensure exam for instructors developed by the National-Interstate Council of State Boards of Cosmetology (NIC). State boards that use NIC exams give it to people seeking an instructor license to teach cosmetology, barbering, esthetics or nail technology, often alongside a practical or teaching exam. Some states use a different exam or their own rules, so check with your state board.",
  },
  {
    q: "How many questions are on the cosmetology instructor theory exam?",
    a: "The NIC Instructor theory exam has 85 multiple-choice questions, of which 75 are scored, with 90 minutes allowed. Each question has four answer options and only one is correct.",
  },
  {
    q: "What score do you need to pass?",
    a: "Each state board sets its passing score; NIC publishes no national pass mark. South Carolina, for example, requires a score of 80% for instructor licensure. The practice tests here use 80% as a readiness line.",
  },
  {
    q: "What does the instructor theory exam cover?",
    a: "The NIC content outline has three domains of about a third each. Instructional Planning (33%) covers syllabi, course outlines, lesson plans, learning styles, instructional materials and choosing assessments. Instructional Methods (33%) covers lecture, demonstration and group learning, obstacles to learning, communication, time management and assessing student learning, including reliability and validity. Theory and Practical Classroom (34%) covers physical and virtual learning environments, the instructor's professional responsibilities, and keeping a safe learning environment with infection control.",
  },
  {
    q: "Are these the real NIC questions?",
    a: "No. Every question is original, written by Tigertest from the NIC content outline and US federal rules on student records, academic progress and workplace safety. It is not affiliated with NIC or any state board, and no NIC sample question was used. Instructor training hours, teaching experience requirements, fees and continuing education vary by state, so check your own state board.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Cosmetology Instructor Practice Test",
      description,
      url: `${siteUrl}/cosmetology-instructor-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cosmoinstructor"),
      featureList: [
        "200 cosmetology instructor practice questions",
        "4 practice tests of 50 questions weighted like the real exam",
        "5 training sets by topic",
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
        classFaqJsonLd("cosmoinstructor"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Instructional Planning", weight: "33%" },
  { name: "Instructional Methods", weight: "33%" },
  { name: "Theory and Practical Classroom", weight: "34%" },
];

export default function CosmoInstructorLandingPage() {
  return (
    <div data-theme="cosmoinstructor" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Cosmetology Instructor Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cosmetology-instructor/dashboard"
            shortName="Instructor"
            subtitle="200 original questions on the NIC Instructor theory outline: lesson planning, learning styles, teaching methods, communication, assessment, the learning environment, professional duties and classroom safety. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/cosmoinstructor-mobile.png", desktop: "/landing/cosmoinstructor-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cosmoinstructor" />

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
                Five training sets: curriculum and lesson planning; learners and assessment; teaching methods and obstacles; communication and professional duties; and the learning environment and safety. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions in the content outline&apos;s proportions, each with an 80% readiness line. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on the NIC Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NIC splits the instructor theory exam into three domains of about a third each. Each practice test keeps close to the same balance: 16 instructional planning questions, 17 instructional methods questions and 17 theory and practical classroom questions in every 50.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("cosmoinstructor", 3)}
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
            How to Pass the Instructor Theory Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the language of lesson planning</h3>
              <p>
                Know the difference between a syllabus, a course outline and a lesson plan, the parts of a lesson plan, and how to write an objective with a behavior, a condition and a criterion. Learn the cognitive, affective and psychomotor domains and the levels of Bloom&apos;s taxonomy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Match the method to the goal</h3>
              <p>
                Lectures suit new theory, demonstrations suit hand skills, and group methods such as role play, case studies and jigsaw build problem solving. For each, know how to run it well and which learners it serves.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your assessment terms</h3>
              <p>
                Formative and summative, norm- and criterion-referenced, written, practical and oral, reliability and validity. Expect questions on what to do when results show students missed an objective.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice at the real pace</h3>
              <p>
                The NIC exam gives 90 minutes for 85 questions. Time yourself on the practice tests and aim to clear the 80% readiness line comfortably, ideally 90%, on every one before you book your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Cosmetology Instructor Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cosmoinstructor" />
        </div>
      </div>

      <ExamSampleQuestions examId="cosmoinstructor" />

      <ExamRelatedTests examId="cosmoinstructor" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Instructor Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all three NIC domains.</p>
          <ExamLandingCTA dashboardHref="/cosmetology-instructor/dashboard" />
        </div>
      </div>
    </div>
  );
}
