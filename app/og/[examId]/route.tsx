import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { getExamById } from "@/lib/exams";
import { getTigerAsset } from "@/lib/tigerAssets";

export const runtime = "nodejs";

// Open Graph / Twitter card image for an exam landing page (/og/<examId>).
// Lives outside /api/ so robots.txt does not block Google from fetching it.
// The DMV pages keep the static tiger.png card.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ examId: string }> }
) {
  const { examId } = await params;
  const exam = getExamById(examId);
  if (!exam) return new Response("Not found", { status: 404 });

  const tigerPath = join(process.cwd(), "public", getTigerAsset(exam.id, 3).slice(1));
  const tigerData = await readFile(tigerPath);
  const tiger = `data:image/png;base64,${tigerData.toString("base64")}`;
  const questions = exam.testCount * exam.questionsPerTest;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "linear-gradient(135deg, #fff7ed 0%, #ffffff 60%)",
          fontFamily: "sans-serif",
          color: "#111827",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#ea580c", marginBottom: 24 }}>
            TigerTest
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
            Free {exam.shortName} Practice Test
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#4b5563", lineHeight: 1.3 }}>
            {exam.fullName}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#6b7280", marginTop: 28 }}>
            {questions} questions · {exam.testCount} practice tests · no account needed
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tiger} width={320} height={320} alt="" style={{ width: 320, height: 320 }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" },
    }
  );
}
