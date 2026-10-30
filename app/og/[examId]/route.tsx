import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { getTigerAsset } from "@/lib/tigerAssets";
import { getShareCard } from "@/lib/shareCards";

export const runtime = "nodejs";

let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 700; style: "normal" }[]> | undefined;
function loadFonts() {
  fonts ??= Promise.all(([400, 700] as const).map(async weight => ({
    name: "Inter", data: await readFile(join(process.cwd(), "public/fonts/share", `Inter-${weight === 400 ? "Regular" : "Bold"}.ttf`)), weight, style: "normal" as const,
  }))).catch(error => { fonts = undefined; throw error; });
  return fonts;
}

// Measure in approximate ems to keep long exam names inside the text column.
function titleLines(title: string): string[] {
  const width = (s: string) => [...s].reduce((n, c) => n + (/\s/.test(c) ? 0.3 : /[MW]/.test(c) ? 0.9 : /[ilI.,']/.test(c) ? 0.25 : /[A-Z]/.test(c) ? 0.67 : /[^\u0000-\u024f]/.test(c) ? 1 : 0.52), 0);
  const lines: string[] = [];
  let line = "";
  for (const word of title.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (line && width(next) > 9.8) { lines.push(line); line = word; } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

export async function GET(request: Request, { params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params;
  const language = new URL(request.url).searchParams.get("lang") ?? "en";
  const card = getShareCard(examId, language);
  if (!card) return new Response("Not found", { status: 404 });
  const lines = card.lines ?? titleLines(card.title);
  const fontSize = lines.length > 3 ? 48 : lines.length === 3 ? 60 : examId === "home" ? 59 : 66;
  const top = lines.length > 2 ? 148 : 182;
  const descriptionTop = lines.length > 3 ? 368 : lines.length === 3 ? 383 : 370;
  const [images, brand, loadedFonts] = await Promise.all([
    Promise.all(card.mascots.map(async id => `data:image/png;base64,${(await readFile(join(process.cwd(), "public", getTigerAsset(id, 3).slice(1)))).toString("base64")}`)),
    readFile(join(process.cwd(), "public/tiger_face_03.png")).then(b => `data:image/png;base64,${b.toString("base64")}`),
    loadFonts(),
  ]);

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "Inter", color: "#152230", background: `linear-gradient(110deg, #ffffff 0%, #ffffff 30%, ${card.tint} 100%)` }}>
      <div style={{ display: "flex", position: "absolute", left: 62, top: 48, alignItems: "center", gap: 13 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brand} width={46} height={46} alt="" />
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>Tigertest</div>
      </div>
      <div style={{ display: "flex", position: "absolute", left: 65, top, width: 690, flexDirection: "column" }}>
        {lines.map((line, i) => <div key={i} style={{ display: "flex", fontSize, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, marginBottom: 4 }}>{line}</div>)}
      </div>
      <div style={{ display: "flex", position: "absolute", left: 66, top: descriptionTop, width: 650, fontSize: 28, lineHeight: 1.45, color: "#465061", flexDirection: "column" }}>{card.descriptionLines ? card.descriptionLines.map((line, i) => <div key={i} style={{ display: "flex" }}>{line}</div>) : card.description}</div>
      <div style={{ display: "flex", position: "absolute", left: 66, top: 549, fontSize: 22, fontWeight: 700, color: card.color, maxWidth: 700 }}>{card.footer}</div>
      {images.map((src, i) => {
        const style = images.length === 1 ? { left: 758, top: 131, width: 420, height: 420 } : [{ left: 883, top: 92, width: 222, height: 222 }, { left: 797, top: 332, width: 198, height: 198 }, { left: 985, top: 337, width: 194, height: 194 }][i];
        // eslint-disable-next-line @next/next/no-img-element
        return <img key={i} src={src} alt="" width={style.width} height={style.height} style={{ position: "absolute", ...style }} />;
      })}
    </div>,
    { width: 1200, height: 630, fonts: loadedFonts, headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" } },
  );
}
