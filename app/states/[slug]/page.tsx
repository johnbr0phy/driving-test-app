import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, FileText, Target, Clock } from "lucide-react";
import { states, getStateBySlug } from "@/data/states";

interface StatePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return states.map((state) => ({
    slug: state.slug,
  }));
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const state = getStateBySlug(slug);

  if (!state) {
    return {
      title: "State Not Found",
    };
  }

  const title = `${state.name} DMV Practice Test 2025 | Free ${state.dmvName} Test Prep`;
  const description = `Free ${state.name} DMV practice test with 200 questions. Pass your ${state.dmvName} written test on the first try. ${state.writtenTestQuestions} questions, ${state.passingScore}% to pass.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function StatePage({ params }: StatePageProps) {
  const { slug } = await params;
  const state = getStateBySlug(slug);

  if (!state) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How many questions are on the ${state.name} DMV written test?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${state.name} ${state.dmvName} written test has ${state.writtenTestQuestions} questions. You need to score ${state.passingScore}% or higher to pass. TigerTest offers 200 practice questions to help you prepare.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the minimum age to get a learner's permit in ${state.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `In ${state.name}, you can apply for a learner's permit at ${state.minPermitAge} years old.`,
        },
      },
      {
        "@type": "Question",
        name: `What score do I need to pass the ${state.name} DMV test?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You need to score ${state.passingScore}% or higher to pass the ${state.name} ${state.dmvName} written test.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {state.name} DMV Practice Test 2025
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Free practice questions for the {state.dmvName} written knowledge test.
            Pass on your first try with 200 {state.name}-specific questions.
          </p>
          <Link href="/onboarding/select-state">
            <Button size="lg" className="text-lg px-8 py-6 bg-black text-white hover:bg-gray-800 font-bold rounded-xl">
              Start Practicing Free
            </Button>
          </Link>
        </div>

        {/* State Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {state.writtenTestQuestions}
              </div>
              <div className="text-gray-600">Questions on Test</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {state.passingScore}%
              </div>
              <div className="text-gray-600">Passing Score</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {state.minPermitAge}
              </div>
              <div className="text-gray-600">Min. Permit Age</div>
            </CardContent>
          </Card>
        </div>

        {/* What's Included */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What&apos;s Included in Our {state.name} Practice Test
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>200 practice questions</strong> covering all topics on the {state.dmvName} written test
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>{state.name}-specific questions</strong> about state traffic laws, speed limits, and regulations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Instant feedback</strong> with detailed explanations for every question
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Progress tracking</strong> to see your pass probability increase as you practice
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>100% free</strong> - no hidden fees, no premium tiers
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                How many questions are on the {state.name} {state.dmvName} written test?
              </h3>
              <p className="text-gray-600">
                The {state.name} written knowledge test has {state.writtenTestQuestions} questions.
                You need to answer at least {Math.ceil(state.writtenTestQuestions * state.passingScore / 100)} correctly
                ({state.passingScore}%) to pass.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                What is the minimum age for a learner&apos;s permit in {state.name}?
              </h3>
              <p className="text-gray-600">
                In {state.name}, you can apply for a learner&apos;s permit at {state.minPermitAge} years old.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Is the TigerTest {state.name} practice test free?
              </h3>
              <p className="text-gray-600">
                Yes! TigerTest is 100% free. You get access to all 200 {state.name}-specific questions,
                training mode, and practice tests without paying anything.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Pass Your {state.name} DMV Test?
          </h2>
          <p className="text-orange-100 text-lg mb-6">
            Join thousands of {state.name} drivers who passed on their first try
          </p>
          <Link href="/onboarding/select-state">
            <Button size="lg" className="text-lg px-8 py-6 bg-black text-white hover:bg-gray-800 font-bold rounded-xl">
              Start Practicing Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
