import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { states } from "@/data/states";

export const runtime = "nodejs";

// Cache font data at module level so it's only loaded once
let interBoldData: ArrayBuffer | null = null;
let interBlackData: ArrayBuffer | null = null;

async function loadFonts(): Promise<{ interBoldData: ArrayBuffer; interBlackData: ArrayBuffer } | null> {
  try {
    if (!interBoldData) {
      const res = await fetch("https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf");
      if (!res.ok) return null;
      interBoldData = await res.arrayBuffer();
    }
    if (!interBlackData) {
      const res = await fetch("https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf");
      if (!res.ok) return null;
      interBlackData = await res.arrayBuffer();
    }
    return { interBoldData, interBlackData };
  } catch {
    return null;
  }
}

function getTigerFace(percentage: number): string {
  if (percentage >= 100) return "tiger_face_01.png";
  if (percentage >= 85) return "tiger_face_02.png";
  if (percentage >= 70) return "tiger_face_03.png";
  if (percentage >= 55) return "tiger_face_04.png";
  if (percentage >= 40) return "tiger_face_05.png";
  if (percentage >= 25) return "tiger_face_06.png";
  if (percentage >= 10) return "tiger_face_07.png";
  return "tiger_face_08.png";
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
  if (setId !== null && (isNaN(setId) || setId < 1 || setId > 4)) {
    return new Response("Invalid setId", { status: 400 });
  }

  const isTraining = setId !== null;

  const stateObj = states.find((s) => s.code === stateCode.toUpperCase());
  if (!stateObj) {
    return new Response("Invalid state code", { status: 400 });
  }

  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  // Load tiger face image and fonts in parallel
  const tigerFile = getTigerFace(percentage);
  const tigerPath = join(process.cwd(), "public", tigerFile);
  const [tigerData, fonts] = await Promise.all([readFile(tigerPath), loadFonts()]);
  const tigerBase64 = `data:image/png;base64,${tigerData.toString("base64")}`;

  const tagline = isTraining
    ? (lang === "es"
      ? "DOMINÉ MI ENTRENAMIENTO DEL DMV"
      : lang === "vi"
        ? "ĐÃ THÀNH THẠO PHẦN LUYỆN TẬP DMV"
        : "MASTERED MY DMV TRAINING")
    : getTagline(percentage, lang);
  const stateName = stateObj.name;

  const trainingSetNames: Record<string, Record<number, string>> = {
    en: { 1: "Signs & Signals", 2: "Rules of the Road", 3: "Safety & Emergencies", 4: "State Laws" },
    es: { 1: "Señales y semáforos", 2: "Reglas de tránsito", 3: "Seguridad y emergencias", 4: "Leyes estatales" },
    vi: { 1: "Biển báo & tín hiệu", 2: "Luật đi đường", 3: "An toàn & khẩn cấp", 4: "Luật tiểu bang" },
  };

  const modeLabel = isTraining
    ? (trainingSetNames[lang]?.[setId!] || trainingSetNames["en"][setId!])
    : (lang === "es" ? `Examen ${testId}` : lang === "vi" ? `Bài Thi ${testId}` : `Test ${testId}`);
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
  const subtitle = isTraining
    ? (lang === "es" ? "ENTRENAMIENTO DMV" : lang === "vi" ? "LUYỆN TẬP DMV" : "DMV TRAINING")
    : (lang === "es" ? "EXAMEN DE PRÁCTICA DEL DMV" : lang === "vi" ? "BÀI THI THỬ DMV" : "DMV PRACTICE TEST");

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
          background: (passed || isTraining)
            ? "linear-gradient(180deg, #0a0a0a 0%, #091a0f 25%, #0c2414 50%, #042a12 75%, #052e16 100%)"
            : "linear-gradient(180deg, #0a0a0a 0%, #1a0f09 25%, #241409 50%, #2e1a07 75%, #431407 100%)",
          fontFamily: "Inter",
          color: "white",
          padding: "60px",
        }}
      >
        {/* TigerTest branding */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: "4px",
              color: "#d4d4d4",
              marginBottom: 12,
            }}
          >
            tigertest.io
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#737373",
              letterSpacing: "2px",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Tiger face */}
        <img
          src={tigerBase64}
          width={360}
          height={360}
          style={{
            marginBottom: 50,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 800,
            textAlign: "center",
            marginBottom: 40,
            color: passed ? "#86efac" : "#fdba74",
            letterSpacing: "2px",
          }}
        >
          {tagline}
        </div>

        {/* Giant percentage */}
        <div
          style={{
            display: "flex",
            fontSize: 200,
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: 20,
            color: passed ? "#22c55e" : "#f97316",
          }}
        >
          {percentage}%
        </div>

        {/* X out of 50 correct */}
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#a3a3a3",
            marginBottom: 40,
          }}
        >
          {correctLabel}
        </div>

        {/* PASSED/FAILED badge */}
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 700,
            padding: "16px 60px",
            borderRadius: 100,
            marginBottom: 50,
            background: passed ? "#16a34a" : "#ea580c",
            color: "white",
            letterSpacing: "3px",
          }}
        >
          {passLabel}
        </div>

        {/* State + Test */}
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#a3a3a3",
            marginBottom: 80,
          }}
        >
          {stateName} · {modeLabel}
        </div>

        {/* tigertest.io */}
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 600,
            color: "#737373",
            letterSpacing: "2px",
          }}
        >
          tigertest.io
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
      ...(fonts && {
        fonts: [
          { name: "Inter", data: fonts.interBoldData, weight: 700 as const, style: "normal" as const },
          { name: "Inter", data: fonts.interBlackData, weight: 900 as const, style: "normal" as const },
        ],
      }),
      headers: {
        "Cache-Control": "public, max-age=86400",
      },
    }
  );

  return response;
}
