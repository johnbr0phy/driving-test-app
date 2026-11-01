// Vietnamese homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.

import type { HomeCopy } from "../homeCopy";

export const vi: HomeCopy = {
  heroTitle: "Bài thi thử miễn phí giúp bạn thi đậu",
  findYourTest: "Tìm bài thi của bạn",
  answeredThisWeek: "câu hỏi đã được trả lời tuần này",
  popularThisWeek: "Phổ biến tuần này",
  popularTests: "Bài thi phổ biến",
  allTests: (n) => `Tất cả ${n} bài thi`,
  aboutTheTest: "Về kỳ thi",
  aboutEachTest: "Về từng kỳ thi",
  howItWorks: "Cách Tigertest hoạt động",
  steps: [
    {
      label: "Bước 1",
      title: "Học ngay trên điện thoại",
      body: "Chạm vào một đáp án và biết ngay đúng hay sai, kèm lời giải thích. Câu nào bạn làm sai sẽ quay lại cho đến khi bạn làm đúng, nên vài phút trên xe buýt cũng có ích thật sự.",
    },
    {
      label: "Bước 2",
      title: "Làm bài thi như thật",
      body: "Khi thấy các câu hỏi đã dễ, hãy làm một bài thi thử đầy đủ theo đúng dàn ý của kỳ thi thật, với cùng tỷ lệ chủ đề. Vậy là bạn biết điểm của mình trước khi thi thật.",
    },
    {
      label: "Bước 3",
      title: "Biết khi nào bạn đã sẵn sàng",
      body: "Bảng điều khiển của bạn chuyển sang màu xanh khi bạn hoàn thành từng bộ luyện tập và đậu từng bài thi. Khi tất cả đều xanh, hãy đi đăng ký thi.",
    },
  ],
  shotAlts: {
    phones: ["Bài luyện toán SAT trên điện thoại", "Câu hỏi kỹ thuật viên phẫu thuật trên điện thoại", "Câu hỏi luyện thi CNA trên điện thoại"],
    desktop: "Bài thi thử SAT có tính giờ trên máy tính",
    dashboard: "Bảng điều khiển DMV của Tigertest với các bộ luyện tập và bài thi thử",
  },
  everyTest: "Tất cả bài thi thử",
  testsFor: (inName) => `Bài thi thử cho ${inName}`,
  usExamPrompt: "Bạn sắp chuyển đến Mỹ hoặc đang ôn một kỳ thi của Mỹ?",
  seeAllTests: (n) => `Xem tất cả ${n} bài thi`,
  faqTitle: "Câu hỏi thường gặp",
  requestTitle: "Không thấy kỳ thi của bạn?",
  requestBody: "Chúng tôi thêm bài thi mới theo yêu cầu. Hãy cho chúng tôi biết bạn đang ôn thi gì.",
  requestCta: "Yêu cầu bài thi",
  usLead: (examCount) =>
    `${examCount} kỳ thi, từ bài thi viết lấy giấy phép tập lái (permit) của DMV đến SAT, điều dưỡng và chứng chỉ IT. Mọi đáp án đều có giải thích. Không cần đăng ký.`,
  countryLead: (countryName) =>
    `Bài thi thử miễn phí cho ${countryName}: bài thi lý thuyết lái xe và các chứng chỉ giống nhau ở mọi nơi. Mọi đáp án đều có giải thích. Không cần đăng ký.`,
  usFaqs: (examCount) => [
    {
      q: "Tigertest là gì?",
      a: `Tigertest là trang web thi thử miễn phí cho ${examCount} kỳ thi, từ bài thi permit của DMV ở mọi tiểu bang đến SAT, ACT và các kỳ thi về điều dưỡng, y tế, IT, nghề kỹ thuật và giấy phép hành nghề. Mỗi bài thi theo đúng dàn ý chính thức của kỳ thi thật, và mỗi câu hỏi đều giải thích đáp án đúng.`,
    },
    {
      q: "Tigertest có miễn phí không?",
      a: "Có. Gần như mọi bài thi đều hoàn toàn miễn phí. Phần DMV có bài thi thử và luyện tập miễn phí, cùng gói Premium tùy chọn $9.99 trả một lần (không phải gói thuê bao) để mở khóa thêm hai bài thi, hai bộ luyện tập và thống kê đầy đủ cho mọi kỳ thi của Mỹ.",
    },
    {
      q: "Tôi có cần tài khoản không?",
      a: "Không. Bạn có thể bắt đầu bất kỳ bài thi nào mà không cần đăng ký. Hãy tạo tài khoản miễn phí nếu bạn muốn lưu tiến độ trên mọi thiết bị.",
    },
    {
      q: "Tigertest giúp tôi thi đậu như thế nào?",
      a: "Chế độ luyện tập cho bạn phản hồi ngay và đưa những câu bạn làm sai quay lại cho đến khi bạn thuộc. Sau đó các bài thi thử đầy đủ mô phỏng kỳ thi thật, và kết quả cho bạn thấy chủ đề nào còn cần ôn thêm.",
    },
    {
      q: "Tigertest có liên kết với DMV hay công ty tổ chức thi nào không?",
      a: "Không. Tigertest hoạt động độc lập và không liên kết với bất kỳ DMV, công ty tổ chức thi hay cơ quan cấp chứng chỉ nào.",
    },
  ],
  dmv: {
    cta: "Bài thi permit DMV",
    title: "Bạn sắp thi permit ở DMV?",
    body: "200 câu hỏi soạn theo sổ tay lái xe của chính tiểu bang bạn, cho cả 50 tiểu bang và DC.",
    about: "Về bài thi thử DMV",
    questionsOnTest: (n) => `${n} câu hỏi trong bài thi viết`,
    viewAll: "Xem cả 50 tiểu bang",
  },
  listName: (inName) => `Bài thi thử Tigertest cho ${inName}`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "Tigertest là gì?",
      a:
        local === 0
          ? `Tigertest là trang web thi thử miễn phí. Cho ${inName}, chúng tôi có các chứng chỉ giống nhau ở mọi nơi, như CompTIA và AWS. Mỗi câu hỏi đều giải thích đáp án đúng.`
          : `Tigertest là trang web thi thử miễn phí. Cho ${inName}, chúng tôi có ${local === 1 ? "một bài thi lái xe" : `${local} bài thi lái xe`} soạn theo ${local === 1 ? "luật chính thức" : "các sổ tay chính thức"}, cùng các chứng chỉ giống nhau ở mọi nơi, như CompTIA và AWS. Mỗi câu hỏi đều giải thích đáp án đúng.`,
    },
    { q: "Tigertest có miễn phí không?", a: `Có. Mọi bài thi cho ${inName} đều miễn phí, không có gói thuê bao.` },
    {
      q: "Tôi có cần tài khoản không?",
      a: "Không. Bạn có thể bắt đầu bất kỳ bài thi nào mà không cần đăng ký. Hãy tạo tài khoản miễn phí nếu bạn muốn lưu tiến độ trên mọi thiết bị.",
    },
    {
      q: "Tigertest giúp tôi thi đậu như thế nào?",
      a: "Chế độ luyện tập cho bạn phản hồi ngay và đưa những câu bạn làm sai quay lại cho đến khi bạn thuộc. Sau đó các bài thi thử đầy đủ mô phỏng kỳ thi thật, và kết quả cho bạn thấy chủ đề nào còn cần ôn thêm.",
    },
    {
      q: "Tigertest có phải là bài thi chính thức không?",
      a: `Không. Tigertest hoạt động độc lập và không liên kết với ${authority} hay bất kỳ công ty tổ chức thi nào. Các câu hỏi là câu hỏi riêng của chúng tôi, soạn theo các sổ tay chính thức.`,
    },
  ],
  card: {
    questions: (n) => `${n} câu hỏi`,
    free: "Miễn phí",
    freePlusPremium: "Miễn phí + Premium",
    answeredThisWeek: "lượt trả lời tuần này",
    availableIn: (names) => `Có bằng ${names}`,
  },
  search: {
    placeholder: "Tìm kỳ thi hoặc nghề nghiệp",
    label: "Tìm bài thi thử",
    clear: "Xóa tìm kiếm",
    countOf: (count, total) => `${count} trên ${total} bài thi`,
    allFree: (n) => `${n} bài thi thử, tất cả đều miễn phí để bắt đầu`,
    noMatch: (q) => `Không có bài thi nào khớp với “${q}”`,
    noMatchHint: "Hãy thử tên kỳ thi, tên nghề hoặc tên tổ chức cấp chứng chỉ.",
  },
  pills: {
    showTestsFor: "Hiện bài thi cho",
    testsByCountry: "Bài thi theo quốc gia",
    countryTests: (name) => `Bài thi ${name}`,
    moreCountries: "Thêm quốc gia",
    saved: "Đã lưu cho lần sau. Tiến độ của bạn giống nhau ở mọi quốc gia.",
    geo: (inName) => `Đang hiện bài thi cho ${inName} vì bạn đang ở đó. Bạn có thể chọn quốc gia khác bất cứ lúc nào.`,
  },
};

/** Every country's name in Vietnamese, for the country pills and "Practice tests for <country>". */
export const countryNames: Record<string, string> = {
  US: "Hoa Kỳ", CA: "Canada", UK: "Vương quốc Anh", IE: "Ireland", AU: "Úc", NZ: "New Zealand", IN: "Ấn Độ", PH: "Philippines", MY: "Malaysia", SG: "Singapore", HK: "Hồng Kông",
  AE: "Các Tiểu vương quốc Ả Rập Thống nhất", ZA: "Nam Phi", NG: "Nigeria", KE: "Kenya", PK: "Pakistan", ES: "Tây Ban Nha", PT: "Bồ Đào Nha", RO: "Romania", SE: "Thụy Điển", GR: "Hy Lạp", DK: "Đan Mạch",
  HU: "Hungary", BE: "Bỉ", FI: "Phần Lan", MT: "Malta", DE: "Đức",
};
