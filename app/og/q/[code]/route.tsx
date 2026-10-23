import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { getQuiz } from "@/lib/server/quizzes";
import { isQuizCode, normalizeQuizCode, type QuizDoc, type QuizQuestion } from "@/lib/quizzes";
import { interFonts } from "@/lib/ogFonts";

export const runtime = "nodejs";

// Open Graph / Twitter card for a user-made quiz (/og/q/<code>, set by
// app/q/[code]/page.tsx): the quiz's title, size and author beside a sample
// question card, so a shared link looks like the quiz it opens. A class quiz
// shows only its title (its questions are for the class), and a private quiz
// gets a card that names nothing. The page adds ?v=<updatedAt> so an edit
// never serves a stale cached card.

const ORANGE = "#ea580c";

/** Cut at a word boundary with an ellipsis. */
function clip(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,.;:]+$/, "")}…`;
}

/** The first of the opening questions that fits the card whole, else the first one clipped. */
function sampleQuestion(questions: QuizQuestion[]): QuizQuestion | null {
  const fits = (q: QuizQuestion) => q.question.length <= 110 && q.options.every((o) => o.length <= 38);
  return questions.slice(0, 10).find(fits) ?? questions[0] ?? null;
}

function titleSize(title: string): number {
  if (title.length <= 18) return 80;
  if (title.length <= 32) return 68;
  if (title.length <= 50) return 58;
  return 48;
}

export async function GET(_request: Request, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeQuizCode((await params).code);
  if (!isQuizCode(code)) return new Response("Not found", { status: 404 });
  let quiz: QuizDoc | null;
  try {
    quiz = await getQuiz(code);
  } catch (error) {
    console.error("quiz og: could not load", error);
    return new Response("Unavailable", { status: 503 });
  }
  if (!quiz) return new Response("Not found", { status: 404 });

  const read = async (file: string) => `data:image/png;base64,${(await readFile(join(process.cwd(), "public", file))).toString("base64")}`;
  const [tiger, face, fonts] = await Promise.all([read("tiger.png"), read("tiger_face_03.png"), interFonts()]);

  const hidden = quiz.visibility === "private";
  const isClass = quiz.visibility === "class";
  const title = hidden ? "A private quiz" : clip(quiz.title, 80);
  const count = quiz.questions.length;
  const byline = hidden
    ? "Made on Tigertest"
    : isClass
      ? `For ${quiz.classTeacherName || quiz.ownerName}'s class`
      : quiz.ownerName
        ? `By ${clip(quiz.ownerName, 40)}`
        : "Free practice quiz";
  const sample = hidden || isClass ? null : sampleQuestion(quiz.questions);

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
        <div style={{ display: "flex", flexDirection: "column", width: sample ? 560 : 680 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 34 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tiger} width={56} height={56} alt="" style={{ width: 56, height: 56, marginRight: 12 }} />
            <div style={{ display: "flex", fontSize: 30, fontWeight: 800 }}>Tigertest</div>
          </div>
          {!hidden && (
            <div style={{ display: "flex", marginBottom: 18 }}>
              <div
                style={{
                  display: "flex",
                  background: ORANGE,
                  color: "#ffffff",
                  borderRadius: 999,
                  padding: "8px 18px",
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                }}
              >
                {`QUIZ · ${count} QUESTION${count === 1 ? "" : "S"}`}
              </div>
            </div>
          )}
          <div style={{ display: "flex", fontSize: titleSize(title), fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5 }}>{title}</div>
          <div style={{ display: "flex", fontSize: 28, color: "#4b5563", marginTop: 20 }}>{byline}</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 40 }}>
            <div
              style={{
                display: "flex",
                background: "#111827",
                color: "#ffffff",
                borderRadius: 999,
                padding: "14px 30px",
                fontSize: 26,
                fontWeight: 800,
                marginRight: 22,
              }}
            >
              Play free →
            </div>
            <div style={{ display: "flex", fontSize: 24, color: "#6b7280" }}>{`tigertest.io/q/${code}`}</div>
          </div>
        </div>

        {sample ? (
          <div style={{ display: "flex", position: "relative", width: 470 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 470,
                background: "#ffffff",
                borderRadius: 32,
                border: "2px solid #fed7aa",
                boxShadow: "0 30px 60px rgba(124, 45, 18, 0.18)",
                padding: "30px 28px 26px",
                transform: "rotate(2deg)",
              }}
            >
              <div style={{ display: "flex", fontSize: 18, fontWeight: 800, color: ORANGE, letterSpacing: 1.2, marginBottom: 12 }}>
                {`QUESTION 1 OF ${count}`}
              </div>
              <div style={{ display: "flex", fontSize: 25, fontWeight: 800, lineHeight: 1.25, marginBottom: 18 }}>{clip(sample.question, 110)}</div>
              {sample.options.slice(0, 4).map((option, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "2px solid #e5e7eb",
                    borderRadius: 16,
                    padding: "10px 14px",
                    marginTop: i ? 10 : 0,
                    fontSize: 21,
                    color: "#1f2937",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      background: "#f3f4f6",
                      fontSize: 17,
                      fontWeight: 800,
                      color: "#4b5563",
                      marginRight: 12,
                      flexShrink: 0,
                    }}
                  >
                    {"ABCD"[i]}
                  </div>
                  {clip(option, 38)}
                </div>
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={face} width={92} height={103} alt="" style={{ position: "absolute", top: -78, right: 24, width: 92, height: 103 }} />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={face} width={300} height={336} alt="" style={{ width: 300, height: 336 }} />
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
      emoji: "twemoji",
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" },
    }
  );
}
