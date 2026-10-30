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

const title = "Free GCSE Computer Science Practice Test - Both Papers";
const metaDescription =
  "Free GCSE Computer Science practice for AQA, OCR and Edexcel: pseudocode, trace tables, binary and hex, networks, security and the law, with step-by-step basics and two timed tests.";
const description =
  "Free GCSE Computer Science practice built on the Department for Education subject content that the AQA, OCR and Pearson Edexcel specifications follow. Seven drills cover algorithms, programming, Boolean logic and languages, data representation, computer systems, networks and cyber security, and ethical, legal and environmental impacts. Programming questions use pseudocode with a reference panel: trace the code and type the output, put algorithm steps in order, or highlight the line with the bug. Binary, hexadecimal, binary addition, file sizes, trace tables and truth tables each have a click-through walkthrough first. Two timed practice tests mirror the two papers. Every miss comes back until it is learned. Free, with no account needed.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "GCSE computer science practice test, GCSE computer science revision, GCSE computer science questions, AQA 8525 practice, OCR J277 practice, Edexcel computer science GCSE, trace table practice, binary and hexadecimal practice, GCSE pseudocode questions, computer science mock exam",
  alternates: {
    canonical: `${siteUrl}/gcse-computer-science-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/gcse-computer-science-practice-test`,
    images: [{ url: shareImageUrl("gcsecs"), width: 1200, height: 630, alt: "Tigertest free GCSE Computer Science practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("gcsecs")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the GCSE Computer Science exam?",
    a: "Two written papers, each worth half the grade. One covers computational thinking, algorithms and programming: searching and sorting, pseudocode, trace tables, data types, loops, arrays, subroutines, testing and Boolean logic. The other covers computer systems: binary and hexadecimal, how text, images and sound are stored, the CPU, memory and storage, networks, cyber security, systems software and the ethical, legal and environmental impact of technology. The content comes from the Department for Education, so every exam board covers the same topics.",
  },
  {
    q: "Does it match AQA, OCR or Edexcel?",
    a: "All three. The topics follow the shared DfE subject content, and the two practice papers follow the split every board uses. Each board writes pseudocode slightly differently (AQA pseudo-code, OCR Exam Reference Language), so Tigertest uses one plain style with a reference panel you can open on any question. AQA also tests SQL on Paper 2, which appears in the programming drill. Check your own board's specification for its exact paper lengths: AQA's are 2 hours and 1 hour 45 minutes for 90 marks each, OCR's are 1 hour 30 minutes for 80 marks each.",
  },
  {
    q: "How long are the papers and is there a calculator?",
    a: "AQA's Paper 1 is 2 hours and Paper 2 is 1 hour 45 minutes, each for 90 marks. OCR's two papers are 1 hour 30 minutes each, for 80 marks. Pearson Edexcel's Paper 2 is a 2-hour on-screen programming paper. Calculators are not allowed on the written papers, so practise binary, hex and file-size working by hand.",
  },
  {
    q: "How is this different from past papers?",
    a: "Past papers are the best final practice, but they are long and mostly marked by hand. Tigertest is for the weeks before: short drills on one topic at a time, instant marking with a short explanation, and every missed question coming back until you get it right. The binary, hex, binary addition, file size, trace table and truth table basics each open with a walkthrough where you supply every step. All the questions are original, not copied from any exam board.",
  },
  {
    q: "What do the scores mean?",
    a: "Scores are percent correct. Real GCSE papers have short and extended written answers, and grade boundaries change every year, so a percent here is not a grade. A score of 70% or more on a practice test you have not seen before is a strong sign you know the content.",
  },
  {
    q: "Is it free?",
    a: "Yes, all of it: every drill, walkthrough and both practice tests, with no account needed. An account saves your progress across a phone and a computer.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free GCSE Computer Science Practice Test",
      description,
      url: `${siteUrl}/gcse-computer-science-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "Two timed practice tests, one per paper",
        "Seven topic drills on the DfE subject content",
        "Pseudocode with a reference panel, trace-the-output questions",
        "Walkthroughs for binary, hex, binary addition, file sizes, trace tables and truth tables",
        "Every missed question comes back until it is learned",
        "Free class dashboards for teachers",
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
        classFaqJsonLd("gcsecs"),
      ],
    },
  ],
};

const topics = [
  { name: "Algorithms", paper: "Paper 1", note: "Searching, sorting, flowcharts" },
  { name: "Programming", paper: "Paper 1", note: "Trace tables, loops, arrays, testing" },
  { name: "Boolean logic and languages", paper: "Paper 1", note: "Truth tables, translators, IDEs" },
  { name: "Data representation", paper: "Paper 2", note: "Binary, hex, images, sound" },
  { name: "Computer systems", paper: "Paper 2", note: "CPU, memory, storage, the OS" },
  { name: "Networks and cyber security", paper: "Paper 2", note: "Protocols, threats, defences" },
  { name: "Ethics, law and environment", paper: "Paper 2", note: "Data protection, misuse, copyright" },
];

export default function GcseComputerScienceLandingPage() {
  return (
    <div data-theme="gcsecs" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free GCSE Computer Science Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/gcse-computer-science/dashboard"
            shortName="GCSE Computer Science"
            subtitle="Both papers, for AQA, OCR and Edexcel: pseudocode and trace tables, binary and hex, systems, networks, security and the law. Learn the basics step by step, drill each topic, then sit two timed tests. Free, no account needed."
            shots={{ mobile: "/landing/gcsecs-mobile.png", desktop: "/landing/gcsecs-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="gcsecs" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Basics, Then Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Binary, hex, binary addition, file sizes, trace tables and truth tables each start with a walkthrough where you supply every step. Then 20 questions per topic, from easy to hard, marked instantly, and every miss comes back until you get it right.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Two Timed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each test is two timed papers of 30 questions, programming first and computer systems second, with a short break between. Practice Test 2 is kept out of the drills, so it shows how ready you really are.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Every Topic on Both Papers</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Seven drills follow the Department for Education subject content, grouped the way the exam boards split their two papers.
              </p>
              <div className="space-y-3">
                {topics.map((t) => (
                  <div key={t.name} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{t.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{t.note}</span>
                    </span>
                    <span className="text-brand-dark font-semibold text-right text-sm md:text-base">{t.paper}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("gcsecs", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach GCSE Computer Science?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Set it as homework or revision for free: share one link, students join with just their first name, and you see who practised, their test scores and the topics your class finds hardest.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a class at tigertest.io/teach
          </Link>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Revise GCSE Computer Science</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Trace code on paper</h3>
              <p>
                Many programming marks come from reading and tracing code, and it is also the fastest way to check code you have written. Draw a trace table with a column for each variable and write every change down. It is slow at first and then very fast, and it catches the off-by-one mistakes that cost marks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Get the number skills automatic</h3>
              <p>
                Binary to denary, hex, binary addition, shifts and file sizes come up every year and there is no calculator. Write the place values 128 down to 1 before every conversion, and check every answer by converting back.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the key words exactly</h3>
              <p>
                Theory marks go to precise terms: volatile, fetch-execute, abstraction, lossless, penetration testing. If an answer could be marked either way, the exact word usually decides it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Finish with past papers</h3>
              <p>
                Once the drills are green, sit Practice Test 2 to check you are ready, then move on to your exam board&apos;s past papers to practise the long written answers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">GCSE Computer Science Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="gcsecs" />
        </div>
      </div>

      <ExamRelatedTests examId="gcsecs" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account needed. Start with the binary basics.</p>
          <ExamLandingCTA dashboardHref="/gcse-computer-science/dashboard" />
        </div>
      </div>
    </div>
  );
}
