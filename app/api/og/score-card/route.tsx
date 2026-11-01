import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { states } from "@/data/states";
import { getExamByStateCode } from "@/lib/exams";
import { getTigerFace } from "@/lib/resultsCopy";
import { createT } from "@/i18n";

export const runtime = "nodejs";

// Inter from the repo (the same files as the 1200x630 cards). The card used to
// fetch Inter from fonts.gstatic.com, whose URLs had gone stale, so it fell
// back to a thin default face.
let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 700; style: "normal" }[]> | undefined;
function loadFonts() {
  fonts ??= Promise.all(([400, 700] as const).map(async weight => ({
    name: "Inter", data: await readFile(join(process.cwd(), "public/fonts/share", `Inter-${weight === 400 ? "Regular" : "Bold"}.ttf`)), weight, style: "normal" as const,
  }))).catch(error => { fonts = undefined; throw error; });
  return fonts;
}

/**
 * The tiger for this score. Exam tiger sets live in public/tigers (about
 * 180 MB in all), far too big to bundle into this function (Vercel's 250 MB
 * limit), so the image is fetched from the site's own static files. If that
 * fails (a protected preview, say), the DMV face for the same score is read
 * from disk instead: public/tiger_face_*.png is the only image bundled here.
 */
async function loadTiger(file: string, percentage: number, origin: string): Promise<Buffer> {
  try {
    const res = await fetch(new URL(file, origin));
    if (res.ok) return Buffer.from(await res.arrayBuffer());
  } catch {
    // Fall through to the bundled DMV face.
  }
  return readFile(join(process.cwd(), "public", getTigerFace(percentage).slice(1)));
}

function getTagline(percentage: number, lang: string): string {
  if (lang === "es") {
    if (percentage >= 100) return "PUNTUACIÓN PERFECTA";
    if (percentage >= 90) return "LISTO PARA EL DMV";
    if (percentage >= 80) return "APROBÉ MI EXAMEN DEL DMV";
    if (percentage >= 70) return "APROBÉ POR POCO";
    if (percentage >= 50) return "REPROBÉ MI EXAMEN DEL DMV";
    if (percentage >= 30) return "EL DMV PUEDE ESPERAR";
    if (percentage >= 10) return "NECESITO MÁS PRÁCTICA";
    return "CREO QUE TOMARÉ EL AUTOBÚS";
  }

  if (lang === "vi") {
    if (percentage >= 100) return "ĐIỂM TUYỆT ĐỐI";
    if (percentage >= 90) return "SẴN SÀNG ĐI THI DMV";
    if (percentage >= 80) return "ĐÃ ĐẬU BÀI THI THỬ DMV";
    if (percentage >= 70) return "ĐẬU SÍT SAO";
    if (percentage >= 50) return "RỚT BÀI THI THỬ DMV";
    if (percentage >= 30) return "DMV CHỜ CHÚT NHÉ";
    if (percentage >= 10) return "CẦN LUYỆN THÊM";
    return "CHẮC PHẢI ĐI XE BUÝT THÔI";
  }

  if (percentage >= 100) return "PERFECT SCORE";
  if (percentage >= 90) return "READY FOR THE DMV";
  if (percentage >= 80) return "PASSED MY DMV PRACTICE TEST";
  if (percentage >= 70) return "BARELY PASSED";
  if (percentage >= 50) return "FAILED MY DMV PRACTICE TEST";
  if (percentage >= 30) return "THE DMV CAN WAIT";
  if (percentage >= 10) return "NEED MORE PRACTICE";
  return "GUESS I'M TAKING THE BUS";
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const scoreStr = searchParams.get("score");
  const totalStr = searchParams.get("total");
  const stateCode = searchParams.get("state");
  const testIdStr = searchParams.get("testId");
  const setIdStr = searchParams.get("setId");
  // Korean deliberately renders the English card. Satori only has the Inter
  // faces loaded below, and Inter carries no Hangul glyphs — Korean strings
  // would come out as tofu boxes. Add a Hangul face to loadFonts() before
  // translating any of the labels in this route.
  const lang = searchParams.get("lang") || "en";

  // Validate required params — need either testId or setId
  if (!scoreStr || !totalStr || !stateCode || (!testIdStr && !setIdStr)) {
    return new Response("Missing required params: score, total, state, and testId or setId", {
      status: 400,
    });
  }

  const score = parseInt(scoreStr);
  const total = parseInt(totalStr);
  const testId = testIdStr ? parseInt(testIdStr) : null;
  const setId = setIdStr ? parseInt(setIdStr) : null;

  if (isNaN(score) || isNaN(total) || total <= 0 || score < 0 || score > total) {
    return new Response("Invalid params", { status: 400 });
  }
  if (testId !== null && isNaN(testId)) {
    return new Response("Invalid testId", { status: 400 });
  }
  // Certification exams (HTL, CST, CRCST) share this card. They are not US
  // states, so they resolve to a label from the exam registry instead.
  const exam = getExamByStateCode(stateCode);
  const maxSetId = exam ? exam.trainingSets.length : 4;
  if (setId !== null && (isNaN(setId) || setId < 1 || setId > maxSetId)) {
    return new Response("Invalid setId", { status: 400 });
  }

  const isTraining = setId !== null;

  const stateObj = exam
    ? { name: exam.examLabel }
    : states.find((s) => s.code === stateCode.toUpperCase());
  if (!stateObj) {
    return new Response("Invalid state code", { status: 400 });
  }

  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  // Load tiger face image and fonts in parallel
  const tigerFile = getTigerFace(percentage, exam?.id);
  const [tigerData, brandData, fonts] = await Promise.all([
    loadTiger(tigerFile, percentage, request.nextUrl.origin),
    readFile(join(process.cwd(), "public/tiger_face_03.png")),
    loadFonts(),
  ]);
  const tigerBase64 = `data:image/png;base64,${tigerData.toString("base64")}`;
  const brandBase64 = `data:image/png;base64,${brandData.toString("base64")}`;
  const good = passed || isTraining;

  const tagline = isTraining && exam
    ? `MASTERED MY ${exam.shortName} TRAINING`
    : isTraining
    ? (lang === "es"
      ? "DOMINÉ MI ENTRENAMIENTO DEL DMV"
      : lang === "vi"
        ? "ĐÃ THÀNH THẠO PHẦN LUYỆN TẬP DMV"
        : "MASTERED MY DMV TRAINING")
    : exam
      ? getTagline(percentage, lang).replace("DMV", exam.shortName.toUpperCase())
      : getTagline(percentage, lang);
  const stateName = stateObj.name;

  // The DMV's own names for its sets and tests ("Signs & Signals", "Test A"),
  // in the card's language; Korean and Chinese cards are English (no CJK font).
  const t = createT(lang === "es" || lang === "vi" ? lang : "en");

  const examSetName = exam && isTraining
    ? exam.trainingSets.find((def) => def.setNumber === setId)?.name
    : undefined;
  const displayTestId = exam && testId !== null ? testId - exam.idBase : testId;
  const modeLabel = isTraining
    ? (examSetName || t(`trainingSets.${setId}`))
    : exam
      ? `Test ${displayTestId}`
      : t(`practiceTests.${displayTestId}`);
  const correctLabel = lang === "es"
    ? `${score} de ${total} correctas`
    : lang === "vi"
      ? `Đúng ${score} trên ${total} câu`
      : `${score} out of ${total} correct`;
  const passLabel = isTraining
    ? (lang === "es" ? "DOMINADO" : lang === "vi" ? "THÀNH THẠO" : "MASTERED")
    : (lang === "es"
      ? (passed ? "APROBADO" : "REPROBADO")
      : lang === "vi"
        ? (passed ? "ĐẬU" : "RỚT")
        : (passed ? "PASSED" : "FAILED"));
  const subtitle = exam
    ? (isTraining ? `${exam.shortName} TRAINING` : `${exam.shortName} PRACTICE TEST`)
    : isTraining
    ? (lang === "es" ? "ENTRENAMIENTO DMV" : lang === "vi" ? "LUYỆN TẬP DMV" : "DMV TRAINING")
    : (lang === "es" ? "EXAMEN DE PRÁCTICA DEL DMV" : lang === "vi" ? "BÀI THI THỬ DMV" : "DMV PRACTICE TEST");

  // The site's light look (Nov 2026): the Tigertest lockup on white fading to
  // green for a pass or mastery, orange for a miss.
  const response = new ImageResponse(
    (
      <div
        style={{
          width: 1080,
          height: 1920,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: good
            ? "linear-gradient(180deg, #ffffff 0%, #ffffff 22%, #dcfce7 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #ffffff 22%, #ffedd5 100%)",
          fontFamily: "Inter",
          color: "#152230",
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brandBase64} width={88} height={88} alt="" />
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: "-3px" }}>Tigertest</div>
        </div>
        <div style={{ display: "flex", marginTop: 14, marginBottom: 56, fontSize: 30, color: "#6b7280", letterSpacing: "3px" }}>{subtitle}</div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tigerBase64} width={380} height={380} alt="" style={{ marginBottom: 50 }} />

        <div style={{ display: "flex", fontSize: 54, fontWeight: 700, textAlign: "center", marginBottom: 36, color: good ? "#15803d" : "#c2410c", letterSpacing: "2px" }}>
          {tagline}
        </div>

        <div style={{ display: "flex", fontSize: 220, fontWeight: 700, lineHeight: 1, letterSpacing: "-6px", marginBottom: 20, color: good ? "#16a34a" : "#ea580c" }}>
          {percentage}%
        </div>

        <div style={{ display: "flex", fontSize: 40, color: "#4b5563", marginBottom: 40 }}>{correctLabel}</div>

        <div style={{ display: "flex", fontSize: 36, fontWeight: 700, padding: "16px 60px", borderRadius: 100, marginBottom: 50, background: good ? "#16a34a" : "#ea580c", color: "white", letterSpacing: "3px" }}>
          {passLabel}
        </div>

        <div style={{ display: "flex", fontSize: 36, color: "#4b5563", marginBottom: 90 }}>
          {stateName} · {modeLabel}
        </div>

        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: good ? "#15803d" : "#c2410c", letterSpacing: "1px" }}>tigertest.io</div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
      fonts,
      headers: {
        "Cache-Control": "public, max-age=86400",
      },
    }
  );

  return response;
}
