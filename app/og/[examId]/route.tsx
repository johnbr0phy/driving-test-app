import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { getExamById } from "@/lib/exams";
import { getTigerAsset } from "@/lib/tigerAssets";
import { EXAMS_V2 } from "@/lib/v2/registry";

export const runtime = "nodejs";

// Open Graph / Twitter card image for an exam landing page (/og/<examId>).
// Lives outside /api/ so robots.txt does not block Google from fetching it.
// The DMV pages keep the static tiger.png card.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ examId: string }> }
) {
  const { examId } = await params;
  const v1 = getExamById(examId);
  const v2 = EXAMS_V2.find((e) => e.id === examId);
  if (!v1 && !v2) return new Response("Not found", { status: 404 });

  // v1 registry exams and v2 exams (SAT) share one card layout.
  const exam = v1
    ? { id: v1.id, shortName: v1.shortName, fullName: v1.fullName, line: `${v1.testCount * v1.questionsPerTest} questions · ${v1.testCount} practice tests · no account needed` }
    : { id: v2!.id, shortName: v2!.shortName, fullName: `Full-length ${v2!.fullName} with a ${v2!.composite.min} to ${v2!.composite.max} score estimate`, line: `Timed, adaptive modules · skill drills for your phone · free` };

  const tigerPath = join(process.cwd(), "public", getTigerAsset(exam.id, 3).slice(1));
  const tigerData = await readFile(tigerPath);
  const tiger = `data:image/png;base64,${tigerData.toString("base64")}`;

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
            {exam.line}
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
