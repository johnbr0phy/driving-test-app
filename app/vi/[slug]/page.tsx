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
  Languages,
} from "lucide-react";
import { getStateBySlug, getStateByCode } from "@/data/states";
import { getStateLandingInfoVi } from "@/data/stateLandingDataVi";
import { VI_STATE_CODES } from "@/data/viStates";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

// Mirrors the English state page so AI engines see a consistent publish date
// across language variants.
const STATE_PAGE_PUBLISHED_AT = "2026-03-13";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseStateSlug(slug: string): string | null {
  const match = slug.match(/^(.+)-thi-thu-dmv$/);
  return match ? match[1] : null;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return VI_STATE_CODES.map((code) => ({
    slug: `${getStateByCode(code)!.slug}-thi-thu-dmv`,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const stateSlug = parseStateSlug(slug);
  const state = stateSlug ? getStateBySlug(stateSlug) : undefined;

  if (!state) {
    return { title: "Không Tìm Thấy Tiểu Bang" };
  }

  const title = `Thi Thử DMV ${state.name} 2026 - Miễn Phí | TigerTest`;
  const description = `Đậu bài thi viết lấy bằng lái xe ở ${state.name} ngay lần đầu. ${state.writtenTestQuestions} câu hỏi trong bài thi thật; luyện với 200 câu hỏi tiếng Việt miễn phí dựa trên cẩm nang lái xe của ${state.name}. Bắt đầu luyện thi ngay.`;
  const canonicalUrl = `${siteUrl}/vi/${state.slug}-thi-thu-dmv`;
  const enUrl = `${siteUrl}/${state.slug}-dmv-practice-test`;
  const esUrl = `${siteUrl}/es/${state.slug}-examen-practica-dmv`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": enUrl,
        "es": esUrl,
        "vi": canonicalUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      locale: "vi_VN",
      siteName: "TigerTest",
      images: [
        {
          url: "/tiger.png",
          width: 512,
          height: 512,
          alt: `Thi Thử DMV ${state.name} - TigerTest`,
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

export default async function VietnameseStateDMVPage({ params }: PageProps) {
  const { slug } = await params;
  const stateSlug = parseStateSlug(slug);
  const state = stateSlug ? getStateBySlug(stateSlug) : undefined;

  if (!state) {
    notFound();
  }

  const landingInfo = getStateLandingInfoVi(state.code);
  if (!landingInfo) {
    notFound();
  }

  const rawPassing = Math.ceil(
    (state.writtenTestQuestions * state.passingScore) / 100
  );

  // Only link to neighbors that also have a Vietnamese page.
  const neighboringStates = landingInfo.neighboringSlugs
    .map((s) => getStateBySlug(s))
    .filter(
      (s) => s && (VI_STATE_CODES as readonly string[]).includes(s.code)
    );

  // FAQ data in Vietnamese
  const faqItems = [
    {
      question: `Tôi có thể thi bằng viết ở ${state.name} bằng tiếng Việt không?`,
      answer: `Có. ${state.dmvName} của ${state.name} cho phép làm bài thi viết (knowledge test) bằng tiếng Việt. Bạn có thể luyện thi bằng tiếng Việt với TigerTest, và khi đi thi thật chỉ cần yêu cầu làm bài bằng tiếng Việt.`,
    },
    {
      question: `Bài thi lấy giấy phép tập lái ở ${state.name} có bao nhiêu câu hỏi?`,
      answer: `Bài thi viết của ${state.dmvName} ở ${state.name} có ${state.writtenTestQuestions} câu hỏi. Bạn cần trả lời đúng ít nhất ${rawPassing} câu (${state.passingScore}%) để đậu. TigerTest có 200 câu hỏi luyện thi giúp bạn chuẩn bị kỹ càng.`,
    },
    {
      question: `Tôi cần bao nhiêu điểm để đậu bài thi DMV ở ${state.name}?`,
      answer: `Bạn cần đạt ${state.passingScore}% trở lên để đậu bài thi viết của ${state.dmvName} ở ${state.name}. Nghĩa là trả lời đúng ít nhất ${rawPassing} trong ${state.writtenTestQuestions} câu hỏi.`,
    },
    {
      question: `Tôi có thể thi bài thi viết ở ${state.name} trực tuyến (online) không?`,
      answer: landingInfo.onlineTestInfo,
    },
    {
      question: `Bao nhiêu tuổi thì được lấy giấy phép tập lái ở ${state.name}?`,
      answer: `Ở ${state.name}, bạn có thể xin giấy phép tập lái (learner's permit) từ ${state.minPermitAge}. Bạn phải đậu bài thi viết và bài kiểm tra thị lực để được cấp giấy phép.`,
    },
    {
      question: `Nếu tôi rớt bài thi ở ${state.name} thì sao?`,
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
        name: "Trang Chủ",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Thi Thử Theo Tiểu Bang",
        item: `${siteUrl}/vi/thi-thu-dmv-theo-tieu-bang`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Thi Thử DMV ${state.name}`,
        item: `${siteUrl}/vi/${state.slug}-thi-thu-dmv`,
      },
    ],
  };

  // Build-time timestamp; baked into the static page on each deploy.
  const lastModifiedIso = new Date().toISOString();

  // JSON-LD: WebApplication / LearningResource — mirrors the English page so
  // Vietnamese results are equally citable in AI answers.
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "LearningResource"],
    name: `Thi Thử DMV ${state.name} - TigerTest`,
    description: `Bài thi thử DMV ${state.name} miễn phí với 200 câu hỏi tiếng Việt dựa trên cẩm nang lái xe chính thức của ${state.dmvName} ${state.name}.`,
    url: `${siteUrl}/vi/${state.slug}-thi-thu-dmv`,
    inLanguage: "vi",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    educationalLevel: "Beginner",
    learningResourceType: "Practice test",
    teaches: `Nội dung bài thi viết của DMV ${state.name}`,
    datePublished: STATE_PAGE_PUBLISHED_AT,
    dateModified: lastModifiedIso,
    author: {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // JSON-LD: HowTo — targets "cách đậu bài thi DMV [tiểu bang]" queries.
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Cách Đậu Bài Thi Viết DMV ${state.name}`,
    description: `Hướng dẫn từng bước để đậu bài thi viết của ${state.dmvName} ${state.name} ngay lần thi đầu tiên.`,
    totalTime: "PT2H",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    supply: [
      { "@type": "HowToSupply", name: `${landingInfo.handbookName}` },
      { "@type": "HowToSupply", name: "Câu hỏi luyện thi TigerTest" },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Đọc cẩm nang lái xe chính thức",
        text: `Tải và đọc ${landingInfo.handbookName}. Mọi câu hỏi trong bài thi ở ${state.name} đều lấy từ cẩm nang này.`,
        url: landingInfo.handbookUrl,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Luyện tập ở chế độ ôn luyện",
        text: `Ôn 200 câu hỏi luyện thi dành riêng cho ${state.name} của TigerTest từng câu một, với phản hồi ngay lập tức và giải thích cho từng đáp án.`,
        url: `${siteUrl}/vi/${state.slug}-thi-thu-dmv`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Làm bài thi thử đầy đủ có tính giờ",
        text: `Mô phỏng bài thi thật với bài thi thử 50 câu. Bài thi của ${state.dmvName} ${state.name} yêu cầu ${state.passingScore}% (${rawPassing} trong ${state.writtenTestQuestions} câu) để đậu.`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Xem lại từng câu trả lời sai",
        text: "Đọc lại phần giải thích của những câu bạn làm sai. TigerTest tự động đưa các câu sai vào hàng chờ ôn tập ngắt quãng để bạn gặp lại chúng thường xuyên hơn.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: `Đặt hẹn với ${state.dmvName} ${state.name}`,
        text: `Khi bạn thường xuyên đạt trên ${state.passingScore}% lúc luyện tập, hãy đặt hẹn thi tại ${state.dmvName}. Nhớ mang giấy tờ tùy thân, bằng chứng địa chỉ cư trú và lệ phí nộp đơn.`,
      },
    ],
  };

  const testimonials = [
    {
      quote: "Tôi dùng trang này để ôn. Hôm nay đậu rồi! Cảm ơn :)",
      author: "Naive_Usual1910",
    },
    {
      quote: "đậu trong bảy phút",
      author: "vivacious-vi",
    },
    {
      quote: "thật sự giúp tôi chuẩn bị tốt, và hôm nay tôi đã đậu",
      author: "Big-Burrito-8765",
    },
    {
      quote: "chỉ ôn một ngày trước khi thi mà vẫn thấy tự tin",
      author: "JayjayX12",
    },
    {
      quote: "đậu trong 3 phút",
      author: "Curdled_Cave",
    },
    {
      quote: "giúp ích rất nhiều",
      author: "WorthEducational523",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <div className="relative container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 flex-wrap">
            <li>
              <Link href="/" className="hover:text-brand">
                Trang Chủ
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li>
              <Link
                href="/vi/thi-thu-dmv-theo-tieu-bang"
                className="hover:text-brand"
              >
                Thi Thử Theo Tiểu Bang
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
            Thi Thử DMV {state.name} Miễn Phí 2026
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Đậu bài thi viết của {state.dmvName} {state.name} ngay lần thi đầu
            tiên. Luyện với 200 câu hỏi tiếng Việt dành riêng cho {state.name},
            dựa trên cẩm nang lái xe chính thức.
          </p>
          <Link href={`/signup?state=${state.code}`}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gray-900 text-white hover:bg-gray-800 font-bold rounded-xl"
            >
              Bắt Đầu Luyện Thi Miễn Phí
            </Button>
          </Link>
        </div>

        {/* Vietnamese-language availability callout */}
        <Card className="mb-12 border-green-200 bg-green-50">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Languages className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Bài thi thật ở {state.name} có tiếng Việt
                </h2>
                <p className="text-gray-700">
                  {state.dmvName} của {state.name} cho phép làm bài thi viết
                  (knowledge test) <strong>bằng tiếng Việt</strong>. Bạn có thể
                  ôn luyện bằng tiếng Việt với TigerTest rồi thi thật bằng
                  tiếng Việt — không cần lo về rào cản ngôn ngữ.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* State Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {state.writtenTestQuestions}
              </div>
              <div className="text-sm text-gray-600">Câu Hỏi Trong Bài Thi</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <Target className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {state.passingScore}%
              </div>
              <div className="text-sm text-gray-600">Điểm Để Đậu</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {state.minPermitAge}
              </div>
              <div className="text-sm text-gray-600">Tuổi Tối Thiểu Lấy Permit</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {rawPassing}/{state.writtenTestQuestions}
              </div>
              <div className="text-sm text-gray-600">Câu Đúng Để Đậu</div>
            </CardContent>
          </Card>
        </div>

        {/* State-Specific Content Section */}
        <Card className="mb-12">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Bài Thi Viết Của {state.dmvName} {state.name}: Những Điều Cần Biết
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Hình Thức Bài Thi
                </h3>
                <p className="text-gray-600">
                  Bài thi viết của {state.dmvName} {state.name} gồm{" "}
                  <strong>
                    {state.writtenTestQuestions} câu hỏi trắc nghiệm
                  </strong>{" "}
                  về luật giao thông, biển báo, cách lái xe an toàn và các quy
                  định riêng của {state.name}. Bạn phải đạt ít nhất{" "}
                  <strong>
                    {state.passingScore}% ({rawPassing} câu đúng)
                  </strong>{" "}
                  để đậu.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Tuổi Tối Thiểu Và Điều Kiện
                </h3>
                <p className="text-gray-600">
                  Bạn phải từ <strong>{state.minPermitAge}</strong> trở lên để
                  xin giấy phép tập lái ở {state.name}. Bạn cần đậu bài thi
                  viết và bài kiểm tra thị lực trước khi được cấp giấy phép.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Nếu Bạn Rớt
                </h3>
                <p className="text-gray-600">{landingInfo.retakeInfo}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Quy Định Riêng Của {state.name}
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
                  Cẩm Nang Lái Xe Chính Thức
                </h3>
                <p className="text-gray-600 mb-3">
                  Học <strong>{landingInfo.handbookName}</strong> để chuẩn bị
                  cho bài thi viết. Các câu hỏi luyện thi của TigerTest đều dựa
                  trên nội dung cẩm nang này.
                </p>
                <a
                  href={landingInfo.handbookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-medium"
                >
                  <BookOpen className="h-4 w-4" />
                  Tải {landingInfo.handbookName}
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
              Bài Thi Thử {state.name} Của Chúng Tôi Có Gì
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>200 câu hỏi luyện thi</strong> bao quát mọi chủ đề
                  trong bài thi viết của {state.dmvName}, kể cả luật riêng của{" "}
                  {state.name}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>4 bài thi thử đầy đủ</strong>, mỗi bài 50 câu, mô
                  phỏng trải nghiệm thi thật tại {state.dmvName}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Chế độ ôn luyện</strong> với phản hồi ngay lập tức và
                  giải thích chi tiết cho từng đáp án
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Theo dõi tiến độ</strong> để thấy khả năng đậu của bạn
                  tăng dần trong lúc ôn
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Dùng tốt trên điện thoại</strong> — học trên giường,
                  trên ghế sofa hay bất cứ đâu
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Banner */}
        <div className="text-center bg-gradient-to-br from-brand to-brand-hover rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Sẵn Sàng Đậu Bài Thi DMV {state.name}?
          </h2>
          <p className="text-brand-light text-lg mb-6">
            Hãy cùng hàng ngàn người lái xe ở {state.name} đã đậu ngay lần đầu
            với TigerTest
          </p>
          <Link href={`/signup?state=${state.code}`}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-white text-brand-dark hover:bg-gray-100 font-bold rounded-xl"
            >
              Bắt Đầu Luyện Thi Ngay — Miễn Phí
            </Button>
          </Link>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Học Viên Nói Gì
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
            Câu Hỏi Thường Gặp Về Bài Thi DMV {state.name}
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
              Bài Thi Thử Của Các Tiểu Bang Lân Cận
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {neighboringStates.slice(0, 5).map(
                (neighbor) =>
                  neighbor && (
                    <Link
                      key={neighbor.slug}
                      href={`/vi/${neighbor.slug}-thi-thu-dmv`}
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
            Sẵn sàng bắt đầu ôn cho bài thi lấy giấy phép ở {state.name}?
          </p>
          <Link href={`/signup?state=${state.code}`}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gray-900 text-white hover:bg-gray-800 font-bold rounded-xl"
            >
              Bắt Đầu Luyện Thi Miễn Phí
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Không cần tài khoản. Bắt đầu miễn phí.
          </p>
        </div>
      </div>
    </div>
  );
}
