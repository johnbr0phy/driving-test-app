import { shareImageUrl } from "@/lib/shareImageUrl";
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
import { getStateBySlug, getStateByCode, permitAgeText } from "@/data/states";
import { DMV_LANGUAGE_PAGES_UPDATED_AT } from "@/lib/seoDates";
import { getStateLandingInfoZh } from "@/data/stateLandingDataZh";
import { ZH_STATE_CODES } from "@/data/zhStates";
import { isViState } from "@/data/viStates";
import { isKoState } from "@/data/koStates";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

// Mirrors the English state page so AI engines see a consistent publish date
// across language variants.
const STATE_PAGE_PUBLISHED_AT = "2026-03-13";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseStateSlug(slug: string): string | null {
  const match = slug.match(/^(.+)-dmv-bishi-lianxi$/);
  return match ? match[1] : null;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return ZH_STATE_CODES.map((code) => ({
    slug: `${getStateByCode(code)!.slug}-dmv-bishi-lianxi`,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const stateSlug = parseStateSlug(slug);
  const state = stateSlug ? getStateBySlug(stateSlug) : undefined;

  if (!state) {
    return { title: "找不到该州" };
  }

  const title = `${state.name} DMV 笔试模拟考试 2026 - 免费 | Tigertest`;
  const description = `一次通过${state.name}驾照笔试。真实考试共${state.writtenTestQuestions}道题，用根据${state.name}驾驶手册编写的200道免费模拟题做好准备。现在就开始练习吧。`;
  const canonicalUrl = `${siteUrl}/zh/${state.slug}-dmv-bishi-lianxi`;
  const enUrl = `${siteUrl}/${state.slug}-dmv-practice-test`;
  const esUrl = `${siteUrl}/es/${state.slug}-examen-practica-dmv`;

  return {
    // The string already carries the brand; skip the root layout's "%s | Tigertest" template.
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": enUrl,
        "es": esUrl,
        ...(isViState(state.code)
          ? { "vi": `${siteUrl}/vi/${state.slug}-thi-thu-dmv` }
          : {}),
        ...(isKoState(state.code)
          ? { "ko": `${siteUrl}/ko/${state.slug}-dmv-pilgi-siheom` }
          : {}),
        "zh-Hans": canonicalUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      locale: "zh_CN",
      siteName: "Tigertest",
      images: [
        {
          url: shareImageUrl(`dmv-${state.code.toLowerCase()}`, "zh"),
          width: 1200,
          height: 630,
          alt: `${state.name} DMV 笔试模拟考试 - Tigertest`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImageUrl(`dmv-${state.code.toLowerCase()}`, "zh")],
    },
  };
}

export default async function ChineseStateDMVPage({ params }: PageProps) {
  const { slug } = await params;
  const stateSlug = parseStateSlug(slug);
  const state = stateSlug ? getStateBySlug(stateSlug) : undefined;

  if (!state) {
    notFound();
  }

  const landingInfo = getStateLandingInfoZh(state.code);
  if (!landingInfo) {
    notFound();
  }

  const rawPassing = state.passCount;

  const neighboringStates = landingInfo.neighboringSlugs
    .map((s) => getStateBySlug(s))
    .filter(Boolean);

  // FAQ data in Simplified Chinese
  const faqItems = [
    {
      question: `${state.name}驾照笔试有多少道题？`,
      answer: `${state.name} ${state.dmvName}的笔试共有${state.writtenTestQuestions}道题。至少答对${rawPassing}道题（${state.passingScore}%）才能通过。Tigertest提供200道模拟题，帮助你充分准备。`,
    },
    {
      question: `${state.name} DMV笔试要考多少分才能通过？`,
      answer: `${state.name} ${state.dmvName}笔试需要达到${state.passingScore}%或以上才能通过，也就是${state.writtenTestQuestions}道题中至少答对${rawPassing}道。`,
    },
    {
      question: `${state.name}的笔试可以在网上考吗？`,
      answer: landingInfo.onlineTestInfo,
    },
    {
      question: `在${state.name}几岁可以申请学习驾照？`,
      answer: `在${state.name}，年满${permitAgeText(state.minPermitAge, "zh")}即可申请学习驾照。申请时必须通过笔试和视力检查。`,
    },
    {
      question: `${state.name}笔试没通过怎么办？`,
      answer: landingInfo.retakeInfo,
    },
  ];

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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "各州DMV笔试模拟考试",
        item: `${siteUrl}/zh/gezhou-dmv-bishi-lianxi`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${state.name} DMV 笔试模拟考试`,
        item: `${siteUrl}/zh/${state.slug}-dmv-bishi-lianxi`,
      },
    ],
  };

  // Hand-bumped in lib/seoDates.ts when the state pages change, so the
  // date does not move on every deploy.
  const lastModifiedIso = DMV_LANGUAGE_PAGES_UPDATED_AT;

  // JSON-LD: WebApplication / LearningResource. Mirrors the English page so
  // Chinese results are equally citable in AI answers.
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "LearningResource"],
    name: `${state.name} DMV 笔试模拟考试 - Tigertest`,
    description: `免费的${state.name} DMV笔试模拟考试，共200道题，根据${state.name} ${state.dmvName}官方驾驶手册编写。`,
    url: `${siteUrl}/zh/${state.slug}-dmv-bishi-lianxi`,
    inLanguage: "zh-Hans",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    educationalLevel: "Beginner",
    learningResourceType: "Practice test",
    teaches: `${state.name} DMV笔试学习内容`,
    datePublished: STATE_PAGE_PUBLISHED_AT,
    dateModified: lastModifiedIso,
    author: {
      "@type": "Organization",
      name: "Tigertest",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Tigertest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // JSON-LD: HowTo. Targets "[州] DMV 笔试怎么通过" queries.
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `如何通过${state.name} DMV驾照笔试`,
    description: `第一次就通过${state.name} ${state.dmvName}笔试的分步指南。`,
    totalTime: "PT2H",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    supply: [
      { "@type": "HowToSupply", name: `${landingInfo.handbookName}` },
      { "@type": "HowToSupply", name: "Tigertest 模拟题" },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "阅读官方驾驶手册",
        text: `下载并阅读${landingInfo.handbookName}。${state.name}笔试的所有题目都出自这本手册。`,
        url: landingInfo.handbookUrl,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "用学习模式练习",
        text: `逐题完成Tigertest为${state.name}准备的200道模拟题。每答一题都会立即显示对错和解析。`,
        url: `${siteUrl}/zh/${state.slug}-dmv-bishi-lianxi`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "限时完成整套模拟考试",
        text: `用50道题的模拟考试来练习真实考试。${state.name} ${state.dmvName}笔试需要达到${state.passingScore}%（${state.writtenTestQuestions}道题中答对${rawPassing}道）才能通过。`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "复习所有答错的题目",
        text: "重新阅读答错题目的解析。Tigertest会把答错的题目放进复习列表，更频繁地让你再练。",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: `预约${state.name} ${state.dmvName}`,
        text: `当你在练习中稳定达到${state.passingScore}%以上时，就可以预约${state.dmvName}现场考试了。请带好所需的身份证件、居住证明和申请费。`,
      },
    ],
  };

  const testimonials = [
    {
      quote: "我就是用这个复习的，今天考过了！谢谢 :)",
      author: "Naive_Usual1910",
    },
    {
      quote: "7分钟就考过了",
      author: "vivacious-vi",
    },
    {
      quote: "对备考帮助很大，今天考试通过了",
      author: "Big-Burrito-8765",
    },
    {
      quote: "只在考前一天练了练，就很有信心了",
      author: "JayjayX12",
    },
    {
      quote: "3分钟就考过了",
      author: "Curdled_Cave",
    },
    {
      quote: "帮助非常大",
      author: "WorthEducational523",
    },
  ];

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 relative">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <div className="relative container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 flex-wrap">
            <li>
              <Link href="/" className="hover:text-brand">
                首页
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li>
              <Link
                href="/zh/gezhou-dmv-bishi-lianxi"
                className="hover:text-brand"
              >
                各州模拟考试
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li className="text-gray-900 dark:text-gray-50 font-medium">{state.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
            {state.name} DMV 笔试免费模拟考试 2026
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            一次通过{state.name} {state.dmvName}笔试。用根据官方驾驶手册编写的
            200道{state.name}专属模拟题做好准备。
          </p>
          <Button asChild
              size="lg"
              className="h-auto max-w-full whitespace-normal text-center text-lg px-8 py-3 sm:h-11 sm:py-6 sm:whitespace-nowrap bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 font-bold rounded-xl"
            >
            <Link href={`/dmv/dashboard?state=${state.code}`}>
              免费开始练习
            </Link>
          </Button>
        </div>

        {/* State Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-brand-dark mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                {state.writtenTestQuestions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">考试题数</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <Target className="h-6 w-6 md:h-8 md:w-8 text-brand-dark mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                {state.passingScore}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">及格分数线</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-brand-dark mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                {permitAgeText(state.minPermitAge, "zh")}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">学习驾照最低年龄</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-brand-dark mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                {rawPassing}/{state.writtenTestQuestions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">及格所需答对题数</div>
            </CardContent>
          </Card>
        </div>

        {/* State-Specific Content Section */}
        <Card className="mb-12">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              {state.name} {state.dmvName}笔试须知
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">
                  考试形式
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {state.name} {state.dmvName}的笔试由
                  <strong>{state.writtenTestQuestions}道选择题</strong>
                  组成，内容涵盖交通法规、道路标志、安全驾驶知识以及
                  {state.name}特有的规定。必须达到
                  <strong>
                    {state.passingScore}%（答对{rawPassing}道题）
                  </strong>
                  或以上才能通过。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">
                  最低年龄和报考资格
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  在{state.name}申请学习驾照，必须年满
                  <strong>{permitAgeText(state.minPermitAge, "zh")}</strong>
                  。领取学习驾照之前，必须通过笔试和视力检查。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">
                  没通过怎么办
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{landingInfo.retakeInfo}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">
                  {state.name}特有规定
                </h3>
                <ul className="space-y-2">
                  {landingInfo.notableRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {landingInfo.examManualChapters && (
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">
                    考试涉及的手册章节
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {landingInfo.examManualChapters}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">
                  官方驾驶手册
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  准备笔试，请认真学习
                  <strong>{landingInfo.handbookName}</strong>
                  。Tigertest的模拟题也是根据这本手册的内容编写的。
                </p>
                <a
                  href={landingInfo.handbookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-dark hover:text-brand-darker font-medium"
                >
                  <BookOpen className="h-4 w-4" />
                  下载{landingInfo.handbookName}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Included */}
        <Card className="mb-12">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              {state.name}模拟考试包含的内容
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-200">
                  <strong>200道模拟题</strong>：涵盖{state.dmvName}
                  笔试的所有主题，包括{state.name}特有的法规
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-200">
                  <strong>4套50题模拟考试</strong>：在与真实{state.dmvName}
                  考试相同的环境下练习
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-200">
                  <strong>学习模式</strong>：每道题都能立即看到对错和详细解析
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-200">
                  <strong>进度追踪</strong>：随时了解自己的通过几率如何提升
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-200">
                  <strong>手机友好</strong>：躺在床上、坐在沙发上，随时随地用手机学习
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Banner */}
        <div className="text-center bg-gradient-to-br from-brand to-brand-hover rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            准备好通过{state.name} DMV笔试了吗？
          </h2>
          <p className="text-brand-light text-lg mb-6">
            和众多用Tigertest一次通过的{state.name}驾驶者一起备考
          </p>
          <Button asChild
              size="lg"
              className="h-auto max-w-full whitespace-normal text-center text-lg px-8 py-3 sm:h-11 sm:py-6 sm:whitespace-nowrap bg-white dark:bg-gray-900 text-brand-dark hover:bg-gray-100 dark:hover:bg-gray-800 font-bold rounded-xl"
            >
            <Link href={`/dmv/dashboard?state=${state.code}`}>
              立即开始练习，完全免费
            </Link>
          </Button>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
            用户评价
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-5"
              >
                <p className="text-gray-800 dark:text-gray-100 mb-3 italic">
                  “{t.quote}”
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
            {state.name} DMV笔试常见问题
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related State Pages */}
        {neighboringStates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              邻近各州的模拟考试
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {neighboringStates.slice(0, 5).map(
                (neighbor) =>
                  neighbor && (
                    <Link
                      key={neighbor.slug}
                      href={
                        getStateLandingInfoZh(neighbor.code)
                          ? `/zh/${neighbor.slug}-dmv-bishi-lianxi`
                          : `/${neighbor.slug}-dmv-practice-test`
                      }
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-brand-border hover:bg-brand-light transition-colors"
                    >
                      <span className="font-medium text-gray-900 dark:text-gray-50">
                        {neighbor.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </Link>
                  )
              )}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            准备好开始复习{state.name}驾照笔试了吗？
          </p>
          <Button asChild
              size="lg"
              className="h-auto max-w-full whitespace-normal text-center text-lg px-8 py-3 sm:h-11 sm:py-6 sm:whitespace-nowrap bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 font-bold rounded-xl"
            >
            <Link href={`/dmv/dashboard?state=${state.code}`}>
              免费开始练习
            </Link>
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            无需注册账户，免费开始。
          </p>
        </div>
      </div>
    </div>
  );
}
