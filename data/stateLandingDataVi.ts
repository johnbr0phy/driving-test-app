import { StateLandingInfo } from "./stateLandingData";

// Vietnamese landing-page copy for TigerTest. Coverage is intentionally
// limited to the 10 states whose DMV offers the real knowledge test in
// Vietnamese: CA, WA, OR, AZ, VA, GA, MA, PA, MN, MD. Only the same fields the
// Spanish mirror translates are localized here (retakeWaitTime, retakeInfo,
// notableRules, onlineTestInfo); handbook names/URLs, state names, and
// neighboringSlugs stay in their standard English forms.
export const stateLandingDataVi: Record<string, StateLandingInfo> = {
  AZ: {
    retakeWaitTime: "Ngày làm việc kế tiếp",
    retakeInfo: "Nếu bạn trượt bài thi viết của Arizona, bạn có thể quay lại vào ngày làm việc kế tiếp để thi lại. Sau 3 lần trượt, bạn có thể phải chờ 30 ngày trước khi thử lại.",
    handbookUrl: "https://azdot.gov/mvd/driver-services/driver-license-information/arizona-driver-license-manual",
    handbookName: "Arizona Driver License Manual",
    notableRules: [
      "Bằng lái xe của Arizona không hết hạn cho đến khi bạn 65 tuổi — một trong những thời hạn hiệu lực dài nhất ở Hoa Kỳ.",
      "Hệ thống Giấy phép Lái xe Từng bước (Graduated Driver License) của Arizona hạn chế hành khách dưới 18 tuổi và việc lái xe ban đêm trong 6 tháng đầu.",
      "Arizona cấm sử dụng điện thoại di động cầm tay khi lái xe đối với tất cả các tài xế."
    ],
    neighboringSlugs: ["california", "nevada", "utah", "new-mexico", "colorado"],
    onlineTestInfo: "Không, bài thi viết của MVD Arizona phải được thực hiện trực tiếp tại văn phòng MVD hoặc tại trung tâm khảo thí bên thứ ba được ủy quyền."
  },
  CA: {
    retakeWaitTime: "7 ngày",
    retakeInfo: "Nếu bạn trượt bài thi viết của California, bạn phải chờ 7 ngày trước lần thi thứ hai và thêm 7 ngày nữa trước lần thứ ba. Sau 3 lần trượt, bạn phải nộp đơn lại và trả lệ phí nộp đơn một lần nữa.",
    handbookUrl: "https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/",
    handbookName: "California Driver Handbook",
    notableRules: [
      "California yêu cầu 50 giờ lái xe có giám sát (10 giờ vào ban đêm) trước khi tham gia bài thi thực hành lái xe.",
      "Người có bằng lái tạm thời dưới 18 tuổi không được chở hành khách dưới 20 tuổi trong 12 tháng đầu, trừ khi có tài xế từ 25 tuổi trở lên đi cùng.",
      "Bài thi viết của California có 46 câu hỏi — nhiều nhất trong tất cả các tiểu bang — và bạn cần trả lời đúng 39 câu (83%) để đậu."
    ],
    neighboringSlugs: ["oregon", "nevada", "arizona"],
    onlineTestInfo: "Không, bài thi viết của DMV California phải được thực hiện trực tiếp tại văn phòng DMV. Bạn có thể đặt lịch hẹn trực tuyến để giảm thời gian chờ đợi."
  },
  GA: {
    retakeWaitTime: "1 ngày",
    retakeInfo: "Nếu bạn trượt bài thi viết của Georgia, bạn có thể thi lại vào ngày làm việc kế tiếp. Có một khoản lệ phí cho mỗi lần thi lại.",
    handbookUrl: "https://dds.georgia.gov/drivers-manual",
    handbookName: "Georgia DDS Driver's Manual",
    notableRules: [
      "Luật Joshua của Georgia yêu cầu tài xế dưới 18 tuổi hoàn thành 40 giờ lái xe có giám sát (6 giờ vào ban đêm).",
      "Georgia chỉ yêu cầu điểm đậu là 75%, ngưỡng thấp nhất trong hầu hết các tiểu bang.",
      "Tài xế dưới 18 tuổi không được chở quá 3 hành khách dưới 21 tuổi không phải là người thân trong 6 tháng đầu."
    ],
    neighboringSlugs: ["florida", "alabama", "tennessee", "north-carolina", "south-carolina"],
    onlineTestInfo: "Không, bài thi kiến thức của DDS Georgia phải được thực hiện trực tiếp tại trung tâm dịch vụ khách hàng của DDS."
  },
  MA: {
    retakeWaitTime: "1 ngày",
    retakeInfo: "Nếu bạn trượt bài thi viết của Massachusetts, bạn có thể thi lại vào ngày làm việc kế tiếp tại bất kỳ địa điểm nào của RMV.",
    handbookUrl: "https://www.mass.gov/lists/drivers-manuals",
    handbookName: "Massachusetts Driver's Manual",
    notableRules: [
      "Massachusetts chỉ yêu cầu điểm đậu là 72%, thấp nhất cả nước.",
      "Tài xế dưới 18 tuổi có Bằng lái Junior (Junior Operator License, JOL) với các hạn chế về hành khách và lái xe ban đêm.",
      "Người có JOL không được lái xe trong khoảng thời gian từ 12:30 sáng đến 5:00 sáng và không được chở hành khách dưới 18 tuổi (trừ anh chị em ruột) trong 6 tháng đầu."
    ],
    neighboringSlugs: ["connecticut", "rhode-island", "new-hampshire", "new-york", "vermont"],
    onlineTestInfo: "Không, bài thi kiến thức của RMV Massachusetts phải được thực hiện trực tiếp tại trung tâm dịch vụ của RMV."
  },
  MD: {
    retakeWaitTime: "7 ngày",
    retakeInfo: "Nếu bạn trượt bài thi viết của Maryland, bạn phải chờ 7 ngày trước khi thi lại. Sau nhiều lần trượt, có thể áp dụng thời gian chờ bổ sung.",
    handbookUrl: "https://mva.maryland.gov/pages/driver-manuals.aspx",
    handbookName: "Maryland Driver's Manual",
    notableRules: [
      "Maryland yêu cầu điểm đậu là 85%, một trong những ngưỡng cao nhất cả nước.",
      "Người xin giấy phép tập lái phải ít nhất 15 tuổi 9 tháng — một yêu cầu về độ tuổi khác thường.",
      "Maryland yêu cầu 60 giờ lái xe có giám sát (10 giờ vào ban đêm) trước khi tham gia bài thi thực hành lái xe."
    ],
    neighboringSlugs: ["delaware", "pennsylvania", "virginia", "west-virginia", "district-of-columbia"],
    onlineTestInfo: "Không, bài thi kiến thức của Maryland phải được thực hiện trực tiếp tại văn phòng MVA. Bài thi có sẵn bằng nhiều ngôn ngữ."
  },
  MN: {
    retakeWaitTime: "1 ngày",
    retakeInfo: "Nếu bạn trượt bài thi viết của Minnesota, bạn có thể thi lại vào ngày làm việc kế tiếp tại bất kỳ trạm khảo thí nào của DVS.",
    handbookUrl: "https://dps.mn.gov/divisions/dvs/forms-documents/Pages/drivers-manual.aspx",
    handbookName: "Minnesota Driver's Manual",
    notableRules: [
      "Minnesota cấm mọi hình thức sử dụng điện thoại di động (cầm tay và rảnh tay) đối với tài xế dưới 18 tuổi.",
      "Người có bằng lái tạm thời dưới 18 tuổi không được lái xe trong khoảng thời gian từ nửa đêm đến 5:00 sáng trong 6 tháng đầu.",
      "Minnesota yêu cầu người có giấy phép tập lái giữ giấy phép ít nhất 6 tháng và hoàn thành 40 giờ lái xe có giám sát."
    ],
    neighboringSlugs: ["wisconsin", "iowa", "south-dakota", "north-dakota"],
    onlineTestInfo: "Minnesota cung cấp bài thi kiến thức Hạng D trực tuyến thông qua một chương trình thí điểm được phê duyệt tại một số trạm khảo thí. Hãy liên hệ với DVS để kiểm tra tình trạng khả dụng hiện tại."
  },
  OR: {
    retakeWaitTime: "1 ngày",
    retakeInfo: "Nếu bạn trượt bài thi viết của Oregon, bạn có thể thi lại vào ngày làm việc kế tiếp. Sau 3 lần trượt, bạn có thể phải chờ lâu hơn.",
    handbookUrl: "https://www.oregon.gov/odot/dmv/pages/driverid/manual.aspx",
    handbookName: "Oregon Driver Manual",
    notableRules: [
      "Oregon cấm tự bơm xăng (tài xế không được tự bơm xăng cho xe của mình ở hầu hết các khu vực).",
      "Người có giấy phép tập lái phải ghi nhận 50 giờ lái xe có giám sát (10 giờ vào ban đêm) và giữ giấy phép ít nhất 6 tháng.",
      "Người có bằng lái tạm thời dưới 18 tuổi không được chở hành khách dưới 20 tuổi trong 6 tháng đầu."
    ],
    neighboringSlugs: ["washington", "idaho", "nevada", "california"],
    onlineTestInfo: "Không, bài thi kiến thức của DMV Oregon phải được thực hiện trực tiếp tại văn phòng DMV."
  },
  PA: {
    retakeWaitTime: "1 ngày",
    retakeInfo: "Nếu bạn trượt bài thi viết của Pennsylvania, bạn có thể thi lại vào ngày làm việc kế tiếp tại bất kỳ trung tâm cấp bằng lái xe nào của PennDOT.",
    handbookUrl: "https://www.dot.state.pa.us/Public/DVSPubsForms/BDL/BDL%20Manuals/Manuals/PA%20Drivers%20Manual%20By%20Chapter/English/PUB%2095.pdf",
    handbookName: "Pennsylvania Driver's Manual",
    notableRules: [
      "Bài thi viết của Pennsylvania chỉ có 18 câu hỏi, ít nhất trong tất cả các tiểu bang, và yêu cầu 83% (15 câu đúng) để đậu.",
      "Người có giấy phép tập lái phải ghi nhận 65 giờ lái xe có giám sát (10 giờ vào ban đêm, 5 giờ trong thời tiết xấu) — một trong những yêu cầu chi tiết nhất.",
      "Người có bằng lái junior không được lái xe trong khoảng thời gian từ 11:00 tối đến 5:00 sáng."
    ],
    neighboringSlugs: ["new-york", "new-jersey", "delaware", "maryland", "ohio"],
    onlineTestInfo: "Không, bài thi kiến thức của PennDOT Pennsylvania phải được thực hiện trực tiếp tại trung tâm cấp bằng lái xe."
  },
  VA: {
    retakeWaitTime: "15 ngày",
    retakeInfo: "Nếu bạn trượt bài thi viết của Virginia, bạn phải chờ 15 ngày trước khi thi lại — một trong những thời gian chờ dài nhất cả nước.",
    handbookUrl: "https://www.dmv.virginia.gov/drivers/manuals.asp",
    handbookName: "Virginia Driver's Manual",
    notableRules: [
      "Virginia yêu cầu người có giấy phép tập lái giữ giấy phép ít nhất 9 tháng trước khi tham gia bài thi thực hành lái xe.",
      "Virginia yêu cầu 45 giờ lái xe có giám sát (15 giờ vào ban đêm) — một trong những yêu cầu về giờ lái ban đêm cao nhất.",
      "Giấy phép tập lái của Virginia có thể được cấp khi 15 tuổi 6 tháng, và bài thi viết phải được vượt qua trước khi giấy phép được cấp."
    ],
    neighboringSlugs: ["maryland", "district-of-columbia", "west-virginia", "kentucky", "north-carolina"],
    onlineTestInfo: "Không, bài thi kiến thức của DMV Virginia phải được thực hiện trực tiếp tại trung tâm dịch vụ khách hàng của DMV."
  },
  WA: {
    retakeWaitTime: "1 ngày",
    retakeInfo: "Nếu bạn trượt bài thi viết của Washington, bạn có thể thi lại vào ngày làm việc kế tiếp tại bất kỳ văn phòng nào của DOL.",
    handbookUrl: "https://www.dol.wa.gov/driver-licenses-permits-ids/drivers-guide",
    handbookName: "Washington Driver Guide",
    notableRules: [
      "Washington yêu cầu bằng lái trung cấp (Intermediate Driver License, IDL) cho tất cả tài xế mới dưới 18 tuổi, với các hạn chế về hành khách và lái xe ban đêm.",
      "Người có giấy phép tập lái phải giữ giấy phép ít nhất 6 tháng và hoàn thành khóa đào tạo lái xe được phê duyệt.",
      "Washington yêu cầu tối thiểu 50 giờ lái xe có giám sát (10 giờ vào ban đêm)."
    ],
    neighboringSlugs: ["oregon", "idaho"],
    onlineTestInfo: "Không, bài thi kiến thức của DOL Washington phải được thực hiện trực tiếp tại văn phòng DOL hoặc tại địa điểm khảo thí được phê duyệt."
  }
};

export function getStateLandingInfoVi(stateCode: string): StateLandingInfo | undefined {
  return stateLandingDataVi[stateCode];
}
