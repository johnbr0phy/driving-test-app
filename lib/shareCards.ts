import { TEST_CATALOG } from "./testCatalog";
import { EXAMS_V2 } from "./v2/registry";
import { states } from "@/data/states";
import { getExamById } from "./exams";
import { hasTigerSet } from "./tigerAssets";
import { EXAM_SHARE_COPY } from "./shareCardCopy";

export interface ShareCard {
  title: string;
  description: string;
  lines?: string[];
  descriptionLines?: string[];
  footer: string;
  color: string;
  tint: string;
  mascots: string[];
}

const general = { footer: "Free practice. Every answer explained.", color: "#B84B05", tint: "#FFF0DF" };
const hubs: Record<string, ShareCard> = {
  home: { title: "Free practice tests. Find your next step.", lines: ["Free practice tests.", "Find your next step."], description: "Driving, school, healthcare and work. Learn with every answer.", footer: "Start practising at tigertest.io", color: "#C34D07", tint: "#FFF0DE", mascots: ["sat", "nclex", "dmv"] },
  uk: { title: "Free UK practice tests", lines: ["Free UK", "practice tests"], description: "Driving theory, GCSEs, school entrance and workplace certificates.", footer: "Find your test at tigertest.io/uk", color: "#1E4F91", tint: "#EAF1FC", mascots: ["ks2", "uksia", "gcsemaths"] },
  ca: { title: "Free Canadian practice tests", lines: ["Free Canadian", "practice tests"], description: "Driving knowledge, school assessments, healthcare and Red Seal trades.", footer: "Find your test at tigertest.io/ca", color: "#B02D38", tint: "#FCEDEF", mascots: ["osslt", "rexpn", "caelec"] },
  au: { title: "Free Australian practice tests", lines: ["Free Australian", "practice tests"], description: "Learner licences, NAPLAN, selective entry and workplace certificates.", footer: "Find your test at tigertest.io/au", color: "#17644B", tint: "#E7F5ED", mascots: ["naplan", "auforklift", "auwhite"] },
  in: { title: "Free practice tests for India", lines: ["Free practice tests", "for India"], description: "Learner's licence, government jobs, JEE, NEET and teacher tests.", footer: "Find your test at tigertest.io/in", color: "#B35A00", tint: "#FFF3E0", mascots: ["dmv", "nclex", "aws"] },
  ie: { title: "Free practice tests for Ireland", lines: ["Free practice tests", "for Ireland"], description: "Driver Theory Test, college entrance and IT certifications.", footer: "Find your test at tigertest.io/ie", color: "#13704A", tint: "#E6F5EC", mascots: ["dmv", "sat", "aws"] },
  nz: { title: "Free practice tests for New Zealand", lines: ["Free practice tests", "for New Zealand"], description: "Learner licence, college entrance and IT certifications.", footer: "Find your test at tigertest.io/nz", color: "#1F2A44", tint: "#ECEFF6", mascots: ["dmv", "sat", "aws"] },
  ph: { title: "Free practice tests for the Philippines", lines: ["Free practice tests", "for the Philippines"], description: "LTO exam reviewer, Civil Service Exam, LET and IT certifications.", footer: "Find your test at tigertest.io/ph", color: "#1F3A5F", tint: "#EAF0F7", mascots: ["dmv", "sat", "aws"] },
  my: { title: "Free practice tests for Malaysia", lines: ["Free practice tests", "for Malaysia"], description: "KPP01 theory test, college entrance and IT certifications.", footer: "Find your test at tigertest.io/my", color: "#7A1FA2", tint: "#F5EAFA", mascots: ["dmv", "sat", "aws"] },
  sg: { title: "Free practice tests for Singapore", lines: ["Free practice tests", "for Singapore"], description: "Basic Theory Test, college entrance and IT certifications.", footer: "Find your test at tigertest.io/sg", color: "#A30000", tint: "#FCEBEB", mascots: ["dmv", "sat", "aws"] },
  hk: { title: "Free practice tests for Hong Kong", lines: ["Free practice tests", "for Hong Kong"], description: "Driving theory test, college entrance and IT certifications.", footer: "Find your test at tigertest.io/hk", color: "#A3007A", tint: "#FBE9F5", mascots: ["dmv", "sat", "aws"] },
  ae: { title: "Free practice tests for the UAE", lines: ["Free practice tests", "for the UAE"], description: "Driving theory test, college entrance and IT certifications.", footer: "Find your test at tigertest.io/ae", color: "#0C6B52", tint: "#E6F5F0", mascots: ["dmv", "sat", "aws"] },
  za: { title: "Free practice tests for South Africa", lines: ["Free practice tests", "for South Africa"], description: "K53 learner's test, college entrance and IT certifications.", footer: "Find your test at tigertest.io/za", color: "#4F7408", tint: "#F0F6E3", mascots: ["dmv", "sat", "aws"] },
  ng: { title: "Free practice tests for Nigeria", lines: ["Free practice tests", "for Nigeria"], description: "JAMB UTME, recruitment tests, the TRCN PQE and the driving test.", footer: "Find your test at tigertest.io/ng", color: "#1B6B20", tint: "#E8F4E9", mascots: ["dmv", "sat", "aws"] },
  pk: { title: "Free practice tests for Pakistan", lines: ["Free practice tests", "for Pakistan"], description: "Driving licence sign test, college entrance and IT certifications.", footer: "Find your test at tigertest.io/pk", color: "#0B5E3A", tint: "#E6F4EC", mascots: ["dmv", "sat", "aws"] },
  ke: { title: "Free practice tests for Kenya", lines: ["Free practice tests", "for Kenya"], description: "NTSA driving test, college entrance and IT certifications.", footer: "Find your test at tigertest.io/ke", color: "#066A6E", tint: "#E4F4F5", mascots: ["dmv", "sat", "aws"] },
};

const dmvCopy: Record<string, { title: (state?: string) => string; description: string; footer: string }> = {
  en: { title: s => s ? `${s} DMV practice tests` : "DMV permit practice tests", description: "Get ready for your permit test with state-specific practice.", footer: general.footer },
  es: { title: s => s ? `DMV de ${s}` : "Exámenes de práctica del DMV", description: "Prepárate para el examen de manejo con preguntas de tu estado.", footer: "Práctica gratis. Cada respuesta explicada." },
  vi: { title: s => s ? `Thi thử DMV ${s}` : "Thi thử bằng lái DMV", description: "Ôn thi bằng lái với câu hỏi phù hợp cho từng tiểu bang.", footer: "Luyện tập miễn phí. Có giải thích đáp án." },
  ko: { title: s => s ? `${s} DMV 모의시험` : "DMV 운전면허 모의시험", description: "주별 문제로 운전면허 필기시험을 준비하세요.", footer: "무료 연습. 모든 정답에 해설 제공." },
  zh: { title: s => s ? `${s} DMV 模拟考试` : "DMV 驾照模拟考试", description: "通过各州的练习题，准备驾照笔试。", footer: "免费练习，每个答案都有解析。" },
};

// Versioned card copy is separate from longer search descriptions and bank counts.
export function getShareCard(id: string, language = "en"): ShareCard | undefined {
  if (Object.prototype.hasOwnProperty.call(hubs, id)) {
    const card = hubs[id];
    const split = card.description.indexOf(". ");
    return { ...card, descriptionLines: split >= 0 ? [card.description.slice(0, split + 1), card.description.slice(split + 2)] : undefined };
  }
  if (id === "dmv" || id.startsWith("dmv-")) {
    const state = id === "dmv" ? undefined : states.find(s => s.code.toLowerCase() === id.slice(4));
    if (id !== "dmv" && !state) return undefined;
    const copy = Object.prototype.hasOwnProperty.call(dmvCopy, language) ? dmvCopy[language] : dmvCopy.en;
    return { ...general, title: copy.title(state?.name), description: copy.description, footer: copy.footer, mascots: ["dmv"] };
  }
  const exam = TEST_CATALOG.find(e => e.id === id) ?? getExamById(id);
  if (!exam) return undefined;
  const copy = EXAM_SHARE_COPY[id];
  const theme = EXAMS_V2.find(e => e.id === id)?.theme;
  const color = theme ? `hsl(${theme.brand.replace(/ /g, ", ")})` : SHARE_COLORS[id]?.color ?? SHARE_COLORS[id.split("-")[0]]?.color ?? general.color;
  const tint = theme ? `hsl(${theme.brandLight.replace(/ /g, ", ")})` : SHARE_COLORS[id]?.tint ?? SHARE_COLORS[id.split("-")[0]]?.tint ?? general.tint;
  const ink = color.replace(/(hsl\([^,]+,[^,]+,)\s*([\d.]+)%\)/, (_, prefix, lightness) => `${prefix} ${Math.min(35, Number(lightness))}%)`);
  return { ...general, title: copy?.title ?? exam.name.replace(/ Practice Tests?$/i, ""), description: copy?.description ?? ("blurb" in exam ? exam.blurb : `Practise ${exam.fullName}. Review the topics to work on next.`), color: ink, tint, mascots: [hasTigerSet(id) ? id : hasTigerSet(id.split("-")[0]) ? id.split("-")[0] : id] };
}

// Light-mode exam brand colours, matching globals.css.
const SHARE_COLORS: Record<string, { color: string; tint: string }> = {
  "cdl": {
    "color": "hsl(217, 91%, 52.2%)",
    "tint": "hsl(214, 100%, 97%)"
  },
  "htl": {
    "color": "hsl(271, 70%, 50%)",
    "tint": "hsl(270, 100%, 97%)"
  },
  "cst": {
    "color": "hsl(172, 66%, 30.6%)",
    "tint": "hsl(170, 70%, 95%)"
  },
  "cdlx": {
    "color": "hsl(205, 70%, 38%)",
    "tint": "hsl(205, 80%, 95%)"
  },
  "part107": {
    "color": "hsl(199, 89%, 36.3%)",
    "tint": "hsl(199, 95%, 95%)"
  },
  "ham": {
    "color": "hsl(32, 90%, 35.6%)",
    "tint": "hsl(36, 100%, 95%)"
  },
  "epa608": {
    "color": "hsl(150, 60%, 32.2%)",
    "tint": "hsl(150, 60%, 95%)"
  },
  "cna": {
    "color": "hsl(340, 65%, 46%)",
    "tint": "hsl(340, 80%, 96%)"
  },
  "ptcb": {
    "color": "hsl(292, 60%, 50%)",
    "tint": "hsl(292, 80%, 96%)"
  },
  "phleb": {
    "color": "hsl(120, 40%, 36%)",
    "tint": "hsl(120, 55%, 95%)"
  },
  "ccma": {
    "color": "hsl(188, 70%, 32.8%)",
    "tint": "hsl(188, 70%, 95%)"
  },
  "cet": {
    "color": "hsl(8, 72%, 48%)",
    "tint": "hsl(8, 85%, 96%)"
  },
  "danb": {
    "color": "hsl(165, 60%, 31.8%)",
    "tint": "hsl(165, 60%, 95%)"
  },
  "emt": {
    "color": "hsl(240, 55%, 48%)",
    "tint": "hsl(240, 65%, 95%)"
  },
  "foodmgr": {
    "color": "hsl(42, 90%, 31.1%)",
    "tint": "hsl(42, 90%, 95%)"
  },
  "realestate": {
    "color": "hsl(200, 45%, 36%)",
    "tint": "hsl(200, 55%, 95%)"
  },
  "insurance": {
    "color": "hsl(330, 55%, 42%)",
    "tint": "hsl(330, 65%, 95%)"
  },
  "notary": {
    "color": "hsl(35, 45%, 36%)",
    "tint": "hsl(35, 55%, 95%)"
  },
  "teas": {
    "color": "hsl(95, 50%, 33.5%)",
    "tint": "hsl(95, 60%, 95%)"
  },
  "aws": {
    "color": "hsl(20, 90%, 41.4%)",
    "tint": "hsl(20, 90%, 95%)"
  },
  "aplus": {
    "color": "hsl(350, 75%, 44%)",
    "tint": "hsl(350, 85%, 95%)"
  },
  "foodhandler": {
    "color": "hsl(135, 55%, 33.4%)",
    "tint": "hsl(135, 65%, 95%)"
  },
  "boating": {
    "color": "hsl(215, 65%, 32%)",
    "tint": "hsl(215, 75%, 95%)"
  },
  "hunter": {
    "color": "hsl(70, 45%, 32.9%)",
    "tint": "hsl(70, 55%, 95%)"
  },
  "secplus": {
    "color": "hsl(260, 55%, 48%)",
    "tint": "hsl(260, 65%, 95%)"
  },
  "hesi": {
    "color": "hsl(310, 60%, 45%)",
    "tint": "hsl(310, 70%, 95%)"
  },
  "nclex": {
    "color": "hsl(200, 80%, 36%)",
    "tint": "hsl(200, 80%, 95%)"
  },
  "asvab": {
    "color": "hsl(95, 30%, 34%)",
    "tint": "hsl(95, 40%, 95%)"
  },
  "cpr": {
    "color": "hsl(355, 70%, 44%)",
    "tint": "hsl(355, 80%, 95%)"
  },
  "osha": {
    "color": "hsl(205, 55%, 38%)",
    "tint": "hsl(205, 65%, 95%)"
  },
  "forklift": {
    "color": "hsl(42, 80%, 32.3%)",
    "tint": "hsl(42, 80%, 95%)"
  },
  "alcohol": {
    "color": "hsl(345, 55%, 36%)",
    "tint": "hsl(345, 65%, 95%)"
  },
  "sat": {
    "color": "hsl(221, 83%, 45%)",
    "tint": "hsl(221, 100%, 96%)"
  },
  "act": {
    "color": "hsl(350, 70%, 42%)",
    "tint": "hsl(350, 100%, 96%)"
  },
  "accuplacer": {
    "color": "hsl(175, 55%, 32%)",
    "tint": "hsl(175, 65%, 95%)"
  },
  "security": {
    "color": "hsl(222, 35%, 36%)",
    "tint": "hsl(222, 45%, 95%)"
  },
  "lifeguard": {
    "color": "hsl(190, 75%, 33.0%)",
    "tint": "hsl(190, 80%, 95%)"
  },
  "pnc": {
    "color": "hsl(160, 50%, 30%)",
    "tint": "hsl(160, 60%, 95%)"
  },
  "moto": {
    "color": "hsl(355, 72%, 44%)",
    "tint": "hsl(355, 85%, 96%)"
  },
  "civics": {
    "color": "hsl(222, 68%, 42%)",
    "tint": "hsl(222, 85%, 96%)"
  },
  "crcst": {
    "color": "hsl(195, 85%, 34.3%)",
    "tint": "hsl(195, 100%, 95%)"
  },
  "cosmetology": {
    "color": "hsl(320, 60%, 40%)",
    "tint": "hsl(320, 75%, 96%)"
  },
  "vtne": {
    "color": "hsl(158, 60%, 34%)",
    "tint": "hsl(158, 65%, 95%)"
  },
  "auwa": {
    "color": "hsl(150, 60%, 28%)",
    "tint": "hsl(150, 65%, 95%)"
  },
  "camb": {
    "color": "hsl(356, 68%, 40%)",
    "tint": "hsl(356, 65%, 95%)"
  },
  "caon": {
    "color": "hsl(356, 68%, 40%)",
    "tint": "hsl(356, 65%, 95%)"
  },
  "caab": {
    "color": "hsl(356, 68%, 40%)",
    "tint": "hsl(356, 65%, 95%)"
  },
  "ukmoto": {
    "color": "hsl(222, 62%, 38%)",
    "tint": "hsl(222, 65%, 95%)"
  },
  "aunsw": {
    "color": "hsl(150, 60%, 28%)",
    "tint": "hsl(150, 65%, 95%)"
  },
  "cabc": {
    "color": "hsl(356, 68%, 40%)",
    "tint": "hsl(356, 65%, 95%)"
  },
  "ukpcv": {
    "color": "hsl(222, 62%, 38%)",
    "tint": "hsl(222, 65%, 95%)"
  },
  "ukcar": {
    "color": "hsl(222, 62%, 38%)",
    "tint": "hsl(222, 65%, 95%)"
  },
  "ukadi": {
    "color": "hsl(222, 62%, 38%)",
    "tint": "hsl(222, 65%, 95%)"
  },
  "auvic": {
    "color": "hsl(150, 60%, 28%)",
    "tint": "hsl(150, 65%, 95%)"
  },
  "ausa": {
    "color": "hsl(150, 60%, 28%)",
    "tint": "hsl(150, 65%, 95%)"
  },
  "auqld": {
    "color": "hsl(150, 60%, 28%)",
    "tint": "hsl(150, 65%, 95%)"
  },
  "uklgv": {
    "color": "hsl(222, 62%, 38%)",
    "tint": "hsl(222, 65%, 95%)"
  },
  "caqc": {
    "color": "hsl(356, 68%, 40%)",
    "tint": "hsl(356, 65%, 95%)"
  },
  "nclexpn": {
    "color": "hsl(185, 70%, 34%)",
    "tint": "hsl(185, 70%, 95%)"
  },
  "paramedic": {
    "color": "hsl(10, 65%, 42%)",
    "tint": "hsl(10, 75%, 95%)"
  },
  "ged": {
    "color": "hsl(265, 55%, 44%)",
    "tint": "hsl(265, 100%, 96%)"
  },
  "timestables": {
    "color": "hsl(300, 60%, 42%)",
    "tint": "hsl(300, 100%, 96%)"
  },
  "nswsel": {
    "color": "hsl(250, 50%, 42%)",
    "tint": "hsl(250, 100%, 96%)"
  },
  "ks2": {
    "color": "hsl(280, 55%, 44%)",
    "tint": "hsl(280, 100%, 96%)"
  },
  "gcsemaths": {
    "color": "hsl(82, 65%, 28%)",
    "tint": "hsl(82, 70%, 95%)"
  },
  "uksia": {
    "color": "hsl(128, 45%, 30%)",
    "tint": "hsl(128, 45%, 95%)"
  },
  "uk18ed": {
    "color": "hsl(50, 80%, 30%)",
    "tint": "hsl(50, 80%, 95%)"
  },
  "osslt": {
    "color": "hsl(232, 52%, 42%)",
    "tint": "hsl(232, 100%, 96%)"
  },
  "capal": {
    "color": "hsl(110, 38%, 30%)",
    "tint": "hsl(110, 40%, 95%)"
  },
  "caelec": {
    "color": "hsl(60, 70%, 26%)",
    "tint": "hsl(60, 70%, 94%)"
  },
  "rexpn": {
    "color": "hsl(276, 60%, 32%)",
    "tint": "hsl(276, 60%, 95%)"
  },
  "eqao9": {
    "color": "hsl(255, 70%, 32%)",
    "tint": "hsl(255, 70%, 95%)"
  },
  "capsw": {
    "color": "hsl(325, 50%, 30%)",
    "tint": "hsl(325, 50%, 95%)"
  },
  "casfa": {
    "color": "hsl(2, 78%, 31%)",
    "tint": "hsl(2, 75%, 95%)"
  },
  "cawhmis": {
    "color": "hsl(37, 62%, 30%)",
    "tint": "hsl(37, 62%, 95%)"
  },
  "caguard": {
    "color": "hsl(228, 80%, 30%)",
    "tint": "hsl(228, 75%, 95%)"
  },
  "caauto": {
    "color": "hsl(205, 22%, 34%)",
    "tint": "hsl(205, 30%, 95%)"
  },
  "caplumb": {
    "color": "hsl(212, 88%, 30%)",
    "tint": "hsl(212, 75%, 95%)"
  },
  "cacarp": {
    "color": "hsl(24, 50%, 30%)",
    "tint": "hsl(24, 50%, 95%)"
  },
  "caweld": {
    "color": "hsl(16, 85%, 32%)",
    "tint": "hsl(16, 75%, 95%)"
  },
  "naplan": {
    "color": "hsl(142, 64%, 30%)",
    "tint": "hsl(142, 60%, 95%)"
  },
  "auwhite": {
    "color": "hsl(28, 85%, 40%)",
    "tint": "hsl(28, 90%, 95%)"
  },
  "gcsehigher": {
    "color": "hsl(286, 60%, 36%)",
    "tint": "hsl(286, 80%, 96%)"
  },
  "gcsescience": {
    "color": "hsl(103, 58%, 30%)",
    "tint": "hsl(103, 78%, 96%)"
  },
  "gcsecs": {
    "color": "hsl(180, 35%, 34%)",
    "tint": "hsl(180, 55%, 96%)"
  },
  "elevenplus": {
    "color": "hsl(245, 70%, 36%)",
    "tint": "hsl(245, 90%, 96%)"
  },
  "fsmaths": {
    "color": "hsl(15, 45%, 34%)",
    "tint": "hsl(15, 65%, 96%)"
  },
  "cscs": {
    "color": "hsl(46, 50%, 34%)",
    "tint": "hsl(46, 70%, 96%)"
  },
  "ukfood": {
    "color": "hsl(305, 70%, 34%)",
    "tint": "hsl(305, 90%, 96%)"
  },
  "ukaplh": {
    "color": "hsl(335, 70%, 30%)",
    "tint": "hsl(335, 90%, 96%)"
  },
  "ukfaw": {
    "color": "hsl(124, 72%, 30%)",
    "tint": "hsl(124, 92%, 96%)"
  },
  "ukcare": {
    "color": "hsl(315, 35%, 40%)",
    "tint": "hsl(315, 55%, 96%)"
  },
  "naplan7": {
    "color": "hsl(240, 90%, 44%)",
    "tint": "hsl(240, 70%, 96%)"
  },
  "ocnsw": {
    "color": "hsl(325, 90%, 44%)",
    "tint": "hsl(325, 70%, 96%)"
  },
  "vicsel": {
    "color": "hsl(256, 90%, 37%)",
    "tint": "hsl(256, 70%, 96%)"
  },
  "hscmaths": {
    "color": "hsl(168, 38%, 30%)",
    "tint": "hsl(168, 48%, 96%)"
  },
  "aursa": {
    "color": "hsl(352, 40%, 30%)",
    "tint": "hsl(352, 50%, 96%)"
  },
  "aurcg": {
    "color": "hsl(269, 40%, 30%)",
    "tint": "hsl(269, 50%, 96%)"
  },
  "aufss": {
    "color": "hsl(95, 75%, 29%)",
    "tint": "hsl(95, 70%, 96%)"
  },
  "aufirstaid": {
    "color": "hsl(3, 45%, 44%)",
    "tint": "hsl(3, 55%, 96%)"
  },
  "auforklift": {
    "color": "hsl(21, 55%, 42%)",
    "tint": "hsl(21, 65%, 96%)"
  },
  "auwah": {
    "color": "hsl(208, 90%, 43%)",
    "tint": "hsl(208, 70%, 96%)"
  },
  "uklitu": {
    "color": "hsl(229, 100%, 42%)",
    "tint": "hsl(229, 70%, 96%)"
  },
  "cacit": {
    "color": "hsl(340, 90%, 32%)",
    "tint": "hsl(340, 70%, 96%)"
  },
  "aucit": {
    "color": "hsl(144, 90%, 30%)",
    "tint": "hsl(144, 70%, 96%)"
  },
  "gulfrn": {
    "color": "hsl(69, 75%, 30%)",
    "tint": "hsl(69, 70%, 96%)"
  },
  "inrto": {
    "color": "hsl(116, 85%, 30%)",
    "tint": "hsl(116, 70%, 96%)"
  },
  "awssaa": {
    "color": "hsl(235, 30%, 32%)",
    "tint": "hsl(235, 70%, 96%)"
  },
  "az900": {
    "color": "hsl(248, 90%, 32%)",
    "tint": "hsl(248, 70%, 96%)"
  },
  "ccna": {
    "color": "hsl(191, 45%, 30%)",
    "tint": "hsl(191, 70%, 96%)"
  },
  "uknmc": {
    "color": "hsl(289, 90%, 44%)",
    "tint": "hsl(289, 70%, 96%)"
  },
  "pmp": {
    "color": "hsl(305, 90%, 44%)",
    "tint": "hsl(305, 70%, 96%)"
  },
  "nasm": {
    "color": "hsl(12, 90%, 46%)",
    "tint": "hsl(12, 80%, 96%)"
  },
  "rbt": {
    "color": "hsl(318, 80%, 40%)",
    "tint": "hsl(318, 80%, 96%)"
  },
  "cpc": {
    "color": "hsl(280, 40%, 43%)",
    "tint": "hsl(280, 40%, 96%)"
  },
  "jelec": {
    "color": "hsl(36, 90%, 28%)",
    "tint": "hsl(36, 80%, 96%)"
  },
  "barber": {
    "color": "hsl(4, 60%, 31%)",
    "tint": "hsl(4, 60%, 96%)"
  },
  "ffi": {
    "color": "hsl(22, 40%, 43%)",
    "tint": "hsl(22, 40%, 96%)"
  },
  "police": {
    "color": "hsl(226, 70%, 28%)",
    "tint": "hsl(226, 70%, 96%)"
  },
  "sie": {
    "color": "hsl(204, 60%, 28%)",
    "tint": "hsl(204, 60%, 96%)"
  },
  "series7": {
    "color": "hsl(212, 90%, 43%)",
    "tint": "hsl(212, 80%, 96%)"
  },
  "pcoc": {
    "color": "hsl(220, 50%, 46%)",
    "tint": "hsl(220, 50%, 96%)"
  },
  "cask": {
    "color": "hsl(84, 50%, 28%)",
    "tint": "hsl(84, 50%, 96%)"
  },
  "cans": {
    "color": "hsl(222, 90%, 46%)",
    "tint": "hsl(222, 80%, 96%)"
  },
  "ukseru": {
    "color": "hsl(232, 80%, 43%)",
    "tint": "hsl(232, 80%, 96%)"
  },
  "nzroad": {
    "color": "hsl(204, 90%, 40%)",
    "tint": "hsl(204, 80%, 96%)"
  },
  "iedtt": {
    "color": "hsl(142, 40%, 28%)",
    "tint": "hsl(142, 40%, 96%)"
  },
  "phlto": {
    "color": "hsl(212, 40%, 26%)",
    "tint": "hsl(212, 40%, 95%)"
  },
  "zak53": {
    "color": "hsl(81, 90%, 30%)",
    "tint": "hsl(81, 60%, 95%)"
  },
  "sgbtt": {
    "color": "hsl(0, 100%, 32%)",
    "tint": "hsl(0, 70%, 96%)"
  },
  "aerta": {
    "color": "hsl(162, 80%, 26%)",
    "tint": "hsl(162, 55%, 95%)"
  },
  "ngfrsc": {
    "color": "hsl(123, 60%, 26%)",
    "tint": "hsl(123, 45%, 95%)"
  },
  "kentsa": {
    "color": "hsl(182, 90%, 26%)",
    "tint": "hsl(182, 60%, 95%)"
  },
  "mykpp": {
    "color": "hsl(280, 100%, 48%)",
    "tint": "hsl(280, 80%, 96%)"
  },
  "hkdrive": {
    "color": "hsl(314, 100%, 42%)",
    "tint": "hsl(314, 80%, 96%)"
  },
  "pkdrive": {
    "color": "hsl(152, 75%, 30%)",
    "tint": "hsl(152, 75%, 96%)"
  },
  "phlet": {
    "color": "hsl(160, 25%, 40%)",
    "tint": "hsl(160, 35%, 95%)"
  },
  "ngpolice": {
    "color": "hsl(235, 65%, 30%)",
    "tint": "hsl(235, 75%, 95%)"
  },
  "cdcfib": {
    "color": "hsl(10, 30%, 40%)",
    "tint": "hsl(10, 40%, 95%)"
  },
  "ngarmy": {
    "color": "hsl(80, 18%, 30%)",
    "tint": "hsl(80, 28%, 95%)"
  },
  "ngcustoms": {
    "color": "hsl(184, 20%, 33%)",
    "tint": "hsl(184, 30%, 95%)"
  },
  "trcnpqe": {
    "color": "hsl(170, 20%, 38%)",
    "tint": "hsl(170, 30%, 95%)"
  }
};
