import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { interFonts } from "@/lib/ogFonts";

export const runtime = "nodejs";

// Open Graph / Twitter card for /create (the route keeps its old /connect name): the headline beside a small chat
// where a pasted PDF becomes a Tigertest quiz link, like the page's hero.
// A static segment, so it wins over /og/[examId].

export async function GET() {
  const read = async (file: string) => `data:image/png;base64,${(await readFile(join(process.cwd(), "public", file))).toString("base64")}`;
  const [tiger, face, fonts] = await Promise.all([read("tiger.png"), read("tiger_face_03.png"), interFonts()]);

  const bubble = { display: "flex", borderRadius: 22, padding: "16px 22px", fontSize: 26, lineHeight: 1.3 } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 64px 0 72px",
          background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 45%, #fde68a 100%)",
          fontFamily: fonts.length ? "Inter" : "sans-serif",
          fontWeight: 500,
          color: "#111827",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 520 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tiger} width={64} height={64} alt="" style={{ width: 64, height: 64, marginRight: 14 }} />
            <div style={{ display: "flex", fontSize: 34, fontWeight: 800 }}>Tigertest</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5 }}>
            Turn any chat into a&nbsp;<span style={{ color: "#ea580c" }}>practice test</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#4b5563", marginTop: 26, lineHeight: 1.3 }}>
            Free in Claude and ChatGPT.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 520,
            background: "#ffffff",
            borderRadius: 32,
            border: "2px solid #fed7aa",
            boxShadow: "0 30px 60px rgba(124, 45, 18, 0.18)",
            padding: 28,
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
            <div style={{ ...bubble, alignItems: "center", fontSize: 22, padding: "10px 16px", background: "#f9fafb", border: "2px solid #e5e7eb", color: "#374151" }}>
              <div style={{ display: "flex", background: "#ef4444", color: "#ffffff", borderRadius: 6, padding: "2px 8px", fontSize: 16, fontWeight: 800, marginRight: 10 }}>PDF</div>
              bio-chapter-4.pdf
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 22 }}>
            <div style={{ ...bubble, background: "#111827", color: "#ffffff", maxWidth: 400, borderBottomRightRadius: 6 }}>
              Turn this into a Tigertest quiz with 20 questions.
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#1f2937", marginBottom: 14 }}>Done! 20 questions. Here&apos;s your link:</div>
          <div style={{ display: "flex", alignItems: "center", border: "2px solid #e5e7eb", borderRadius: 22, padding: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={face} width={58} height={65} alt="" style={{ width: 58, height: 65, marginRight: 16 }} />
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ display: "flex", fontSize: 25, fontWeight: 800 }}>Cell Biology, Ch. 4</div>
              <div style={{ display: "flex", fontSize: 18, color: "#6b7280", marginTop: 4 }}>tigertest.io/q/K7RM2Q</div>
            </div>
            <div style={{ display: "flex", background: "#f97316", color: "#ffffff", borderRadius: 999, padding: "10px 20px", fontSize: 22, fontWeight: 800 }}>
              Play
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" },
    }
  );
}
