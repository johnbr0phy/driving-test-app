import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Languages } from "lucide-react";
import { getStateByCode } from "@/data/states";
import { VI_STATE_CODES } from "@/data/viStates";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

export const metadata: Metadata = {
  title: "Thi Thử DMV Bằng Tiếng Việt Theo Tiểu Bang 2026 - Miễn Phí | TigerTest",
  description:
    "Bài thi thử DMV miễn phí bằng tiếng Việt cho các tiểu bang cho phép thi bằng viết bằng tiếng Việt. 200 câu hỏi mỗi tiểu bang, dựa trên cẩm nang lái xe chính thức. Đậu ngay lần thi đầu tiên.",
  alternates: {
    canonical: `${siteUrl}/vi/thi-thu-dmv-theo-tieu-bang`,
    languages: {
      en: `${siteUrl}/practice-tests-by-state`,
      es: `${siteUrl}/es/examenes-practica-por-estado`,
      vi: `${siteUrl}/vi/thi-thu-dmv-theo-tieu-bang`,
      "x-default": `${siteUrl}/practice-tests-by-state`,
    },
  },
  openGraph: {
    title: "Thi Thử DMV Bằng Tiếng Việt Theo Tiểu Bang 2026 | TigerTest",
    description:
      "Bài thi thử DMV miễn phí bằng tiếng Việt. 200 câu hỏi mỗi tiểu bang với phản hồi ngay lập tức.",
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/vi/thi-thu-dmv-theo-tieu-bang`,
    images: [{ url: "/tiger.png", width: 512, height: 512 }],
  },
};

const viStates = VI_STATE_CODES.map((code) => getStateByCode(code)!).sort(
  (a, b) => a.name.localeCompare(b.name)
);

export default function VietnamesePracticeTestsByStatePage() {
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
    ],
  };

  return (
    <div className="flex-1 bg-white relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="relative container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-brand">
                Trang Chủ
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li className="text-gray-900 font-medium">
              Thi Thử Theo Tiểu Bang
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Thi Thử DMV Bằng Tiếng Việt Theo Tiểu Bang
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chọn tiểu bang của bạn bên dưới để luyện thi miễn phí bằng tiếng
            Việt với các câu hỏi dựa trên cẩm nang lái xe chính thức của tiểu
            bang.
          </p>
        </div>

        {/* Why these states */}
        <div className="flex items-start gap-4 bg-green-50 border border-green-200 rounded-2xl p-6 mb-10">
          <Languages className="h-7 w-7 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700">
            Các tiểu bang dưới đây cho phép làm{" "}
            <strong>bài thi viết thật bằng tiếng Việt</strong> tại DMV. Bạn có
            thể ôn bằng tiếng Việt với TigerTest rồi thi thật bằng tiếng Việt.
            Nếu tiểu bang của bạn không có trong danh sách, bài thi thật thường
            chỉ có tiếng Anh hoặc các ngôn ngữ khác — bạn có thể luyện bằng{" "}
            <Link
              href="/practice-tests-by-state"
              className="text-brand hover:text-brand-dark font-medium underline"
            >
              bản tiếng Anh của TigerTest
            </Link>
            .
          </p>
        </div>

        {/* State Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-16">
          {viStates.map((state) => (
            <Link
              key={state.slug}
              href={`/vi/${state.slug}-thi-thu-dmv`}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 hover:border-brand-border hover:bg-brand-light transition-colors group"
            >
              <div>
                <span className="font-medium text-gray-900 group-hover:text-brand-dark">
                  {state.name}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {state.writtenTestQuestions} câu &middot; {state.passingScore}
                  %
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-brand" />
            </Link>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Về Bài Thi Thử Theo Tiểu Bang Của TigerTest
          </h2>
          <div className="text-gray-600 space-y-3">
            <p>
              Mỗi tiểu bang có luật giao thông, hình thức thi và điểm đậu khác
              nhau. TigerTest có <strong>200 câu hỏi cho mỗi tiểu bang</strong>,
              bao gồm các câu hỏi riêng về luật địa phương, giới hạn tốc độ và
              những quy định đặc thù của tiểu bang bạn.
            </p>
            <p>
              Mỗi bài thi thử mô phỏng đúng hình thức bài thi viết thật của DMV
              tiểu bang bạn. Ôn ở chế độ luyện tập trên điện thoại để học
              nhanh, rồi làm bài thi thử 50 câu đầy đủ khi bạn sẵn sàng mô
              phỏng kỳ thi thật.
            </p>
            <p>
              Tất cả bài thi thử đều <strong>miễn phí để bắt đầu</strong>,
              không cần tạo tài khoản. Theo dõi tiến độ, xem giải thích chi
              tiết và tự tin hơn trước ngày thi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
