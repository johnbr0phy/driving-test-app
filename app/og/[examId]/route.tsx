import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { getTigerAsset } from "@/lib/tigerAssets";
import { getShareCard, type ShareCard } from "@/lib/shareCards";
import { getPopularTests } from "@/lib/server/popularTests";
import { TEST_CATALOG } from "@/lib/testCatalog";

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
  if (card.kind) {
    const [brand, loadedFonts] = await Promise.all([
      readFile(join(process.cwd(), "public/tiger_face_03.png")).then(b => `data:image/png;base64,${b.toString("base64")}`),
      loadFonts(),
    ]);
    // Rounded down, so a card cached for a week never overstates the count.
    const weekly = card.kind === "search" ? await getPopularTests(1).then(p => p.totalAnswered).catch(() => null) : null;
    const answered = weekly && weekly >= 1000 ? `${(Math.floor(weekly / 1000) * 1000).toLocaleString("en-US")}+` : null;
    return new ImageResponse(card.kind === "search" ? <SearchCard card={card} brand={brand} answered={answered} /> : <TeachCard card={card} brand={brand} />, {
      width: 1200,
      height: 630,
      fonts: loadedFonts,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" },
    });
  }
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

const INK = "#152230";
const MUTED = "#465061";

/** A homepage card drawn like the homepage: the wordmark, its line, the search box and this week's answers. */
function SearchCard({ card, brand, answered }: { card: ShareCard; brand: string; answered: string | null }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "Inter", color: INK, background: `linear-gradient(180deg, #ffffff 0%, #ffffff 52%, ${card.tint} 100%)` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 92 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brand} width={112} height={112} alt="" />
        <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: -5 }}>Tigertest</div>
      </div>
      <div style={{ display: "flex", marginTop: 14, fontSize: 36, color: MUTED }}>{card.tagline}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 44, width: 840, height: 96, padding: "0 36px", borderRadius: 48, background: "#ffffff", border: "2px solid #dfe1e5", boxShadow: "0 6px 22px rgba(32, 33, 36, 0.14)" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#70757a" strokeWidth="2.4" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <div style={{ display: "flex", fontSize: 34, color: "#70757a" }}>{`Search ${TEST_CATALOG.length} practice tests`}</div>
      </div>
      {answered && (
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 40, fontSize: 30, color: MUTED }}>
          <div style={{ display: "flex", width: 14, height: 14, borderRadius: 14, background: "#22c55e" }} />
          <div style={{ display: "flex", fontWeight: 700, color: INK }}>{answered}</div>
          <div style={{ display: "flex" }}>questions answered this week</div>
        </div>
      )}
      <div style={{ display: "flex", position: "absolute", bottom: 40, fontSize: 26, fontWeight: 700, color: card.color }}>{card.footer}</div>
    </div>
  );
}

const TOPICS = [
  { name: "Right of way", pct: 58, color: "#dc2626" },
  { name: "Speed limits", pct: 71, color: "#ea580c" },
  { name: "Road signs", pct: 86, color: "#16a34a" },
];

/** /teach: the pitch on the left, a class page on the right. The class is an illustration. */
function TeachCard({ card, brand }: { card: ShareCard; brand: string }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "Inter", color: INK, background: `linear-gradient(110deg, #ffffff 0%, #ffffff 34%, ${card.tint} 100%)` }}>
      <div style={{ display: "flex", position: "absolute", left: 62, top: 48, alignItems: "center", gap: 13 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brand} width={46} height={46} alt="" />
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>Tigertest</div>
      </div>
      <div style={{ display: "flex", position: "absolute", left: 65, top: 160, width: 560, flexDirection: "column" }}>
        {(card.lines ?? [card.title]).map((line, i) => <div key={i} style={{ display: "flex", fontSize: 54, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, marginBottom: 4 }}>{line}</div>)}
      </div>
      <div style={{ display: "flex", position: "absolute", left: 66, top: 330, width: 520, fontSize: 28, lineHeight: 1.45, color: MUTED }}>{card.description}</div>
      <div style={{ display: "flex", position: "absolute", left: 66, top: 549, fontSize: 22, fontWeight: 700, color: card.color }}>{card.footer}</div>
      <div style={{ display: "flex", flexDirection: "column", position: "absolute", left: 660, top: 92, width: 478, padding: "30px 32px", borderRadius: 28, background: "#ffffff", border: "1px solid #e5e7eb", boxShadow: "0 18px 44px rgba(21, 34, 48, 0.14)" }}>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>Period 3 · DMV permit</div>
        <div style={{ display: "flex", marginTop: 6, fontSize: 20, color: "#6b7280" }}>24 students · 1,812 answers this week</div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 16, fontWeight: 700, letterSpacing: 1.5, color: "#6b7280" }}>TOPICS, WEAKEST FIRST</div>
        {TOPICS.map(t => (
          <div key={t.name} style={{ display: "flex", flexDirection: "column", marginTop: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
              <div style={{ display: "flex" }}>{t.name}</div>
              <div style={{ display: "flex", fontWeight: 700 }}>{`${t.pct}%`}</div>
            </div>
            <div style={{ display: "flex", marginTop: 8, width: 414, height: 12, borderRadius: 12, background: "#f3f4f6" }}>
              <div style={{ display: "flex", width: Math.round(414 * t.pct / 100), height: 12, borderRadius: 12, background: t.color }} />
            </div>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 26, paddingTop: 20, borderTop: "1px solid #e5e7eb", fontSize: 20 }}>
          <div style={{ display: "flex", width: 34, height: 34, borderRadius: 34, background: "#C34D07", color: "#ffffff", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18 }}>M</div>
          <div style={{ display: "flex", flex: 1 }}>Maya R. passed Test A</div>
          <div style={{ display: "flex", fontWeight: 700, color: "#16a34a" }}>92%</div>
        </div>
      </div>
    </div>
  );
}
