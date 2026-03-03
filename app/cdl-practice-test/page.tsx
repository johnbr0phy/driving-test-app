import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Smartphone, Monitor } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

export const metadata: Metadata = {
  title: "Free CDL Practice Test 2026 - General Knowledge | TigerTest",
  description: "Free CDL practice tests with 600 questions. Pass your Commercial Driver&apos;s License general knowledge test on the first try. 12 practice tests with instant feedback.",
  keywords: "CDL practice test, commercial driver&apos;s license, CDL general knowledge, truck driver test, CDL exam prep, free CDL test",
  alternates: {
    canonical: `${siteUrl}/cdl-practice-test`,
  },
  openGraph: {
    title: "Free CDL Practice Test 2026 - General Knowledge | TigerTest",
    description: "Free CDL practice tests with 600 questions. Pass your Commercial Driver&apos;s License general knowledge test on the first try. 12 practice tests with instant feedback.",
    url: `${siteUrl}/cdl-practice-test`,
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CDL Practice Test 2026 - General Knowledge | TigerTest",
    description: "Free CDL practice tests with 600 questions. Pass your Commercial Driver&apos;s License general knowledge test on the first try.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free CDL Practice Tests",
      description:
        "Pass your Commercial Driver&apos;s License general knowledge test with 600 practice questions. Free training mode, practice tests, and detailed analytics for CDL certification.",
      url: `${siteUrl}/cdl-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "600 CDL practice questions",
        "12 comprehensive practice tests",
        "Training mode with instant feedback",
        "Vehicle inspection questions",
        "Safe driving practices",
        "Braking systems and cargo handling",
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
          name: "How many questions are on the CDL general knowledge test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The CDL general knowledge test typically has 50 questions, and you need to answer 40 correctly (80%) to pass. TigerTest offers 600 practice questions to ensure you&apos;re fully prepared.",
          },
        },
        {
          "@type": "Question",
          name: "Is TigerTest CDL practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! You can take all 12 CDL practice tests and access training mode completely free. No hidden costs or premium requirements.",
          },
        },
        {
          "@type": "Question",
          name: "What topics are covered in the CDL practice test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our CDL practice tests cover vehicle inspection, safe driving practices, braking systems, cargo handling, hazmat basics, and all topics from the official CDL manual.",
          },
        },
        {
          "@type": "Question",
          name: "How should I study for the CDL general knowledge test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start with TigerTest&apos;s training mode to learn questions with instant feedback. Complete all 12 training sets, then take practice tests to simulate the real exam. Aim for 80%+ scores consistently.",
          },
        },
      ],
    },
  ],
};

export default function CDLLandingPage() {
  return (
    <div data-theme="cdl" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free CDL Practice Test 2026 - General Knowledge
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Master your Commercial Driver&apos;s License test with 600 practice questions. 
            12 comprehensive tests covering vehicle inspection, safe driving, and cargo handling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/cdl/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand hover:bg-brand-hover text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              Start Free Practice Test
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-brand text-brand hover:bg-brand-light font-semibold rounded-xl transition-colors"
            >
              Learn How It Works
            </Link>
          </div>
          <p className="text-gray-500 text-sm">
            ✓ 600 questions ✓ 12 practice tests ✓ 80% pass rate ✓ No registration required
          </p>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Training Mode
              </h3>
              <p className="text-gray-600">
                Learn CDL questions on your phone anywhere. Study vehicle inspection, 
                braking systems, and cargo handling with instant feedback after each answer.
              </p>
            </div>
          </div>

          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Practice Tests
              </h3>
              <p className="text-gray-600">
                Take full 50-question tests that simulate the real CDL exam. 
                Practice under test conditions to build confidence for exam day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl text-gray-700 italic mb-4">
            &quot;Passed my CDL test on the first try after using TigerTest for just one week&quot;
          </p>
          <p className="text-gray-500 text-sm">TruckDriver2024</p>
        </div>
      </div>

      {/* CDL specific content */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              CDL Questions Based on Federal Standards
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Unlike state driving tests, CDL requirements are federally regulated. 
              Our questions cover the exact topics from the official CDL manual that 
              appears on your actual test.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                <span>Vehicle Inspection</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                <span>Safe Driving Practices</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                <span>Braking Systems</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                <span>Cargo Handling</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                <span>Hazmat Basics</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                <span>Air Brake Systems</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="/tiger_face_01.png"
              alt="TigerTest mascot"
              width={180}
              height={180}
              className="w-32 md:w-44"
            />
          </div>
        </div>
      </div>

      {/* Just Launched CTA */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            We Just Launched!
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            Our CDL practice tests are brand new and we&apos;d love your feedback. 
            Try a test and let us know what you think.
          </p>
          <a
            href="https://www.johnbrophy.net/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Send Us Feedback
          </a>
        </div>
      </div>

      {/* How to Study for CDL */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How to Pass Your CDL General Knowledge Test
          </h2>

          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                1. Study the CDL Manual Thoroughly
              </h3>
              <p>
                The CDL manual covers all federal regulations for commercial driving. 
                Every question on your test comes directly from this material. 
                TigerTest&apos;s 600 practice questions are based on the latest CDL manual content.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2. Master Vehicle Inspection Procedures
              </h3>
              <p>
                Vehicle inspection is a major component of the CDL test. 
                Use TigerTest&apos;s training mode to learn the step-by-step inspection process, 
                what to check, and how to identify potential problems.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                3. Practice with Realistic Test Conditions
              </h3>
              <p>
                Once you&apos;ve completed the training sets, take our 12 practice tests 
                to simulate the real CDL exam. Each test has 50 questions with 80% 
                pass requirement (40/50 correct). Aim for consistent 80%+ scores.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                4. Focus on Your Weak Areas
              </h3>
              <p>
                TigerTest tracks your performance across different topics like braking systems, 
                cargo handling, and hazmat basics. Spend extra time on topics where you&apos;re 
                struggling to ensure you&apos;re ready for every question type.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          CDL Test Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              How many questions are on the CDL general knowledge test?
            </h3>
            <p className="text-gray-600">
              The CDL general knowledge test typically has 50 questions, and you need to answer 
              40 correctly (80%) to pass. TigerTest offers 600 practice questions to ensure 
              you&apos;re fully prepared for every possible question topic.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              Is TigerTest CDL practice test free?
            </h3>
            <p className="text-gray-600">
              Yes! You can take all 12 CDL practice tests and access training mode completely free. 
              No hidden costs, premium requirements, or account registration needed.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              What topics are covered in the CDL practice test?
            </h3>
            <p className="text-gray-600">
              Our CDL practice tests cover vehicle inspection procedures, safe driving practices, 
              braking systems (including air brakes), cargo handling and securement, hazmat basics, 
              and all other topics from the official federal CDL manual.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              How should I study for the CDL general knowledge test?
            </h3>
            <p className="text-gray-600">
              Start with TigerTest&apos;s training mode to learn questions with instant feedback. 
              Complete all 12 training sets, focusing on weak areas. Then take practice tests 
              to simulate the real exam. Most successful candidates score 80%+ consistently 
              on practice tests before taking the real exam.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              Do I need a CDL permit before taking the general knowledge test?
            </h3>
            <p className="text-gray-600">
              No, the general knowledge test is typically the first step in getting your CDL permit. 
              After passing the general knowledge test and any required endorsement tests, 
              you&apos;ll receive your Commercial Learner&apos;s Permit (CLP), which allows you to practice driving.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              How long should I study before taking the CDL test?
            </h3>
            <p className="text-gray-600">
              Most successful candidates study for 1-2 weeks using TigerTest. Complete all 12 training 
              sets (about 30-45 minutes each), then take practice tests until you consistently score 
              80% or higher. Some people need only a few days, others prefer 2-3 weeks of preparation.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Your CDL?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Free to start. No account required. 600 questions covering all CDL topics.
          </p>
          <Link
            href="/cdl/dashboard"
            className="inline-flex items-center px-8 py-4 bg-brand hover:bg-brand-hover text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl text-lg"
          >
            Start Your Free CDL Practice Test
          </Link>
          <p className="text-gray-500 text-sm mt-6">
            No credit card. No sign up. Just practice.
          </p>
        </div>
      </div>
    </div>
  );
}