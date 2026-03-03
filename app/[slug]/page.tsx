import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  FileText,
  Target,
  Clock,
  BookOpen,
  AlertCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { states, getStateBySlug } from "@/data/states";
import { stateLandingData, getStateLandingInfo } from "@/data/stateLandingData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseStateSlug(slug: string): string | null {
  const match = slug.match(/^(.+)-dmv-practice-test$/);
  return match ? match[1] : null;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return states.map((state) => ({
    slug: `${state.slug}-dmv-practice-test`,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const stateSlug = parseStateSlug(slug);
  const state = stateSlug ? getStateBySlug(stateSlug) : undefined;

  if (!state) {
    return { title: "State Not Found" };
  }

  const rawPassing = Math.ceil(
    (state.writtenTestQuestions * state.passingScore) / 100
  );
  const title = `${state.name} DMV Practice Test 2026 - Free Permit Practice | TigerTest`;
  const description = `Pass your ${state.name} permit test on the first try. ${state.writtenTestQuestions} free practice questions based on the ${state.name} driver's manual. Start practicing now.`;
  const canonicalUrl = `${siteUrl}/${state.slug}-dmv-practice-test`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": canonicalUrl,
        "es": `${siteUrl}/es/${state.slug}-examen-practica-dmv`,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: "TigerTest",
      images: [
        {
          url: "/tiger.png",
          width: 512,
          height: 512,
          alt: `${state.name} DMV Practice Test - TigerTest`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/tiger.png"],
    },
  };
}

export default async function StateDMVPracticeTestPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const stateSlug = parseStateSlug(slug);
  const state = stateSlug ? getStateBySlug(stateSlug) : undefined;

  if (!state) {
    notFound();
  }

  const landingInfo = getStateLandingInfo(state.code);
  if (!landingInfo) {
    notFound();
  }

  const rawPassing = Math.ceil(
    (state.writtenTestQuestions * state.passingScore) / 100
  );

  const neighboringStates = landingInfo.neighboringSlugs
    .map((s) => getStateBySlug(s))
    .filter(Boolean);

  // FAQ data
  const faqItems = [
    {
      question: `How many questions are on the ${state.name} permit test?`,
      answer: `The ${state.name} ${state.dmvName} written knowledge test has ${state.writtenTestQuestions} questions. You need to answer at least ${rawPassing} correctly (${state.passingScore}%) to pass. TigerTest provides 200 practice questions to thoroughly prepare you.`,
    },
    {
      question: `What score do I need to pass the ${state.name} DMV test?`,
      answer: `You need a score of ${state.passingScore}% or higher to pass the ${state.name} ${state.dmvName} written test. That means getting at least ${rawPassing} out of ${state.writtenTestQuestions} questions correct.`,
    },
    {
      question: `Can I take the ${state.name} permit test online?`,
      answer: landingInfo.onlineTestInfo,
    },
    {
      question: `How old do I have to be to get a learner's permit in ${state.name}?`,
      answer: `In ${state.name}, you can apply for a learner's permit at ${state.minPermitAge} years old. You must pass the written knowledge test and a vision screening to receive your permit.`,
    },
    {
      question: `What happens if I fail the ${state.name} permit test?`,
      answer: landingInfo.retakeInfo,
    },
  ];

  // JSON-LD: FAQ schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  // JSON-LD: Course/WebApplication schema with AggregateRating
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${state.name} DMV Practice Test - TigerTest`,
    description: `Free ${state.name} DMV practice test with 200 questions based on the official ${state.dmvName} driver's manual.`,
    url: `${siteUrl}/${state.slug}-dmv-practice-test`,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // JSON-LD: BreadcrumbList schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${state.name} DMV Practice Test`,
        item: `${siteUrl}/${state.slug}-dmv-practice-test`,
      },
    ],
  };

  // Testimonials data (reusing existing social proof from homepage)
  const testimonials = [
    {
      quote: "Used this to help me study. Passed today! Thank you :)",
      author: "Naive_Usual1910",
      source: "Reddit",
    },
    {
      quote: "passed within seven minutes",
      author: "vivacious-vi",
      source: "Reddit",
    },
    {
      quote: "it really helped me prepare, and I passed my exam today",
      author: "Big-Burrito-8765",
      source: "Reddit",
    },
    {
      quote: "felt confident after just studying the previous day",
      author: "JayjayX12",
      source: "Reddit",
    },
    {
      quote: "i passed in 3 minutes",
      author: "Curdled_Cave",
      source: "Reddit",
    },
    {
      quote: "helped a lot",
      author: "WorthEducational523",
      source: "Reddit",
    },
  ];

  return (
    <div className="flex-1 bg-white relative">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-light to-white pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      <div className="relative container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav
          className="text-sm text-gray-500 mb-6"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-1 flex-wrap">
            <li>
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li>
              <Link
                href="/practice-tests-by-state"
                className="hover:text-brand"
              >
                Practice Tests by State
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li className="text-gray-900 font-medium">{state.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Free {state.name} DMV Practice Test 2026
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Pass your {state.name} {state.dmvName} permit test on the first
            try. Practice with 200 {state.name}-specific questions based on
            the official driver&apos;s manual.
          </p>
          <Link href={`/signup?state=${state.code}`}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gray-900 text-white hover:bg-gray-800 font-bold rounded-xl"
            >
              Start Practicing Free
            </Button>
          </Link>
        </div>

        {/* State Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {state.writtenTestQuestions}
              </div>
              <div className="text-sm text-gray-600">Questions on Test</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <Target className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {state.passingScore}%
              </div>
              <div className="text-sm text-gray-600">Passing Score</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {state.minPermitAge}
              </div>
              <div className="text-sm text-gray-600">Min. Permit Age</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {rawPassing}/{state.writtenTestQuestions}
              </div>
              <div className="text-sm text-gray-600">Correct to Pass</div>
            </CardContent>
          </Card>
        </div>

        {/* State-Specific Content Section */}
        <Card className="mb-12">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {state.name} {state.dmvName} Written Test: What You Need to
              Know
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Test Format
                </h3>
                <p className="text-gray-600">
                  The {state.name} {state.dmvName} written knowledge test
                  consists of{" "}
                  <strong>{state.writtenTestQuestions} multiple-choice questions</strong>{" "}
                  covering traffic laws, road signs, safe driving practices,
                  and {state.name}-specific regulations. You must score at
                  least{" "}
                  <strong>
                    {state.passingScore}% ({rawPassing} correct answers)
                  </strong>{" "}
                  to pass.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Minimum Age &amp; Eligibility
                </h3>
                <p className="text-gray-600">
                  You must be at least{" "}
                  <strong>{state.minPermitAge} years old</strong> to apply for
                  a learner&apos;s permit in {state.name}. You will need to
                  pass the written knowledge test and a vision screening before
                  your permit is issued.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  If You Fail
                </h3>
                <p className="text-gray-600">
                  {landingInfo.retakeInfo}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {state.name}-Specific Rules
                </h3>
                <ul className="space-y-2">
                  {landingInfo.notableRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Official Driver&apos;s Manual
                </h3>
                <p className="text-gray-600 mb-3">
                  Study the{" "}
                  <strong>{landingInfo.handbookName}</strong> to
                  prepare for the written test. TigerTest&apos;s practice
                  questions are based on the material in this manual.
                </p>
                <a
                  href={landingInfo.handbookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-medium"
                >
                  <BookOpen className="h-4 w-4" />
                  Download the {landingInfo.handbookName}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Included */}
        <Card className="mb-12">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What&apos;s Included in Our {state.name} Practice Test
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>200 practice questions</strong> covering all topics
                  on the {state.dmvName} written test, including{" "}
                  {state.name}-specific laws
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>4 full practice tests</strong> with 50 questions
                  each, simulating the real {state.dmvName} exam experience
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Training mode</strong> with instant feedback and
                  detailed explanations for every answer
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Progress tracking</strong> to see your pass
                  probability increase as you study
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Mobile-friendly</strong> — study on your phone in
                  bed, on the couch, or anywhere else
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Banner */}
        <div className="text-center bg-gradient-to-br from-brand to-brand-hover rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Pass Your {state.name} DMV Test?
          </h2>
          <p className="text-brand-light text-lg mb-6">
            Join thousands of {state.name} drivers who passed on their first
            try with TigerTest
          </p>
          <Link href={`/signup?state=${state.code}`}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-white text-brand-dark hover:bg-gray-100 font-bold rounded-xl"
            >
              Start Practicing Now — It&apos;s Free
            </Button>
          </Link>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What Students Are Saying
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5"
              >
                <p className="text-gray-800 mb-3 italic">
                  &quot;{t.quote}&quot;
                </p>
                <p className="text-gray-500 text-sm">{t.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions About the {state.name} DMV Test
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related State Pages */}
        {neighboringStates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Practice Tests for Nearby States
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {neighboringStates.slice(0, 5).map(
                (neighbor) =>
                  neighbor && (
                    <Link
                      key={neighbor.slug}
                      href={`/${neighbor.slug}-dmv-practice-test`}
                      className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-border hover:bg-brand-light transition-colors"
                    >
                      <span className="font-medium text-gray-900">
                        {neighbor.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  )
              )}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Ready to start studying for your {state.name} permit test?
          </p>
          <Link href={`/signup?state=${state.code}`}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gray-900 text-white hover:bg-gray-800 font-bold rounded-xl"
            >
              Start Practicing Free
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            No account required. Free to start.
          </p>
        </div>
      </div>
    </div>
  );
}
