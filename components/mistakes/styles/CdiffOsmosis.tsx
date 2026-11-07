import { MistakeExplainer, MistakeManifest } from "@/lib/mistakeExplainers";
import { getTigerAsset } from "@/lib/tigerAssets";
import { speaking } from "../Stage";
import { arrow, capsule, check, clamp, Draw, easeOut, FONTS, H, timing, W, wobblyEllipse, Write } from "./kit";

/**
 * C. diff (CRCST SPD-DEC-005), Osmosis-style whiteboard: white board inside
 * a deep red frame, hand-lettered capitals, pastel line art that draws on,
 * and a cause-and-effect arrow chain that builds down the board. Same
 * verified script as tools/mistakes/claims/crcst-cdiff-spores.json.
 */

const RED = "#a3243b";
const INK = "#3f3a45";
const SOFT = "#8a8391";
const P = { pink: "#f3a6c0", blue: "#9cc9f0", violet: "#c4b5fd", mint: "#8fdcc0", gold: "#f6d27a", green: "#3f9a63" };

export function CdiffOsmosis({ ex, m, t }: { ex: MistakeExplainer; m: MistakeManifest; t: number }) {
  const { at, spokenEnd } = timing(m);
  const { bi, wi, talking } = speaking(m, t);
  let face = ex.beats[bi].face;
  if (talking && (face === 3 || face === 4 || face === 5)) face = wi % 2 === 0 ? 3 : 5;
  const endK = easeOut((t - spokenEnd - 0.5) / 0.6);

  // the chain down the right side: [beat, word, text, colour]
  const chain: [string, string, string, string][] = [
    ["turn", "c", "C. DIFF", RED],
    ["spore", "spore", "CAN FORM A SPORE INSIDE ITSELF", INK],
    ["spore", "inactive", "INACTIVE, RESISTS HEAT", INK],
    ["alcohol", "alcohol", "ALCOHOL: VERY POOR ACTIVITY", RED],
    ["soap", "scrubbing", "SOAP + WATER HELP WASH SPORES OFF", "#2f6fa8"],
  ];
  const CX = 470;
  const CY0 = 470;
  const STEP = 96;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-full" role="img" aria-label={ex.beats.map((b) => b.say).join(" ")}>
      <defs><style>{FONTS}</style></defs>
      <rect width={W} height={H} fill={RED} />
      <rect x={18} y={18} width={W - 36} height={H - 36} rx={18} fill="#fffdfa" />

      <g opacity={1 - endK}>
        <Write id="exam" t={t} start={0} x={50} y={78} text="CRCST · MOST MISSED" size={26} color={SOFT} font="patrick" perChar={0.012} />
        {ex.medical && <Write id="draft" t={t} start={0} x={670} y={78} text="DRAFT · NOT REVIEWED" size={22} color="#d9536a" font="patrick" anchor="end" perChar={0.01} />}
        <Write id="title" t={t} start={0.1} x={360} y={150} text="ALCOHOL HAND RUB" size={64} color={RED} font="patrick" anchor="middle" perChar={0.035} />
        <Write id="sub" t={t} start={at("hook", "kills")} x={360} y={196} text="KILLS A LOT OF GERMS WELL" size={30} color={INK} font="patrick" anchor="middle" perChar={0.025} />

        {/* the three it handles, in pastel line art */}
        {[[0, 0], [22, -8], [-18, 11], [9, 20], [33, 14], [-4, -22], [-26, -9]].map(([dx, dy], i) => (
          <Draw key={i} t={t} start={0.8 + i * 0.07} dur={0.35} d={wobblyEllipse(140 + dx, 290 + dy, 12, 12, i + 3, 0.03)} stroke={P.pink} width={3} fill={P.pink} fillOpacity={0.35} />
        ))}
        <Write id="m1" t={t} start={at("hook", "mrsa")} x={140} y={360} text="MRSA" size={28} color={INK} font="patrick" anchor="middle" perChar={0.04} />
        <Draw t={t} start={1.3} dur={0.6} d={capsule(360, 290, 120, 42, -15, 2)} stroke={P.blue} width={3} fill={P.blue} fillOpacity={0.35} />
        <Write id="m2" t={t} start={at("hook", "pseudomonas")} x={360} y={360} text="PSEUDOMONAS" size={28} color={INK} font="patrick" anchor="middle" perChar={0.03} />
        <Draw t={t} start={1.8} dur={0.5} d={wobblyEllipse(580, 290, 32, 32, 9, 0.03)} stroke={P.violet} width={3} fill={P.violet} fillOpacity={0.35} />
        <Draw t={t} start={2.1} dur={0.4} d={wobblyEllipse(580, 290, 22, 22, 10, 0.03)} stroke={P.violet} width={2} />
        <Write id="m3" t={t} start={at("hook", "hepatitis")} x={580} y={360} text="HEPATITIS B" size={28} color={INK} font="patrick" anchor="middle" perChar={0.03} />
        {[["mrsa", 190], ["pseudomonas", 425], ["hepatitis", 628]].map(([w, x]) => (
          <Draw key={w as string} t={t} start={at("hook", w as string) + 0.4} dur={0.3} d={check(x as number, 262, 0.9)} stroke={P.green} width={5} />
        ))}
        <Draw t={t} start={at("turn") - 0.3} dur={0.5} d="M60,402 L660,402" stroke="#eadfe2" width={3} />

        {/* C. diff illustration on the left: a rod, then a spore inside it */}
        <Draw t={t} start={at("turn", "c")} dur={0.7} d={capsule(165, 560, 230, 84, 0, 5)} stroke="#5fbf9d" width={3.5} fill={P.mint} fillOpacity={0.4 * (1 - clamp((t - at("alcohol")) / 0.6))} />
        <Draw t={t} start={at("spore", "spore")} dur={0.5} d={wobblyEllipse(165, 560, 40, 27, 21, 0.03)} stroke="#c9952b" width={3.5} fill={P.gold} fillOpacity={0.75} />
        <Draw t={t} start={at("spore", "spore") + 0.25} dur={0.4} d={wobblyEllipse(165, 560, 26, 16, 22, 0.03)} stroke="#c9952b" width={2.5} />
        {/* alcohol drops running over the intact spore */}
        {[0, 1, 2, 3].map((i) => {
          const s = at("alcohol", "alcohol") + i * 0.15;
          const k = clamp((t - s) / 1.4);
          if (k <= 0) return null;
          const x = 120 + i * 30;
          const y = 470 + 170 * k;
          const push = Math.max(0, 1 - Math.abs(y - 560) / 50) * (x < 165 ? -26 : 26);
          return <path key={i} d={`M${x + push},${y - 16} C${x + push + 7},${y - 6} ${x + push + 7},${y} ${x + push},${y} C${x + push - 7},${y} ${x + push - 7},${y - 6} ${x + push},${y - 16} Z`} fill={P.blue} stroke="#5d9fd6" strokeWidth={2} opacity={1 - k * 0.6} />;
        })}
        <Write id="lbl-sp" t={t} start={at("spore", "spore") + 0.5} x={165} y={640} text="SPORE" size={26} color="#b07d18" font="patrick" anchor="middle" perChar={0.05} />

        {/* the arrow chain on the right */}
        {chain.map(([beat, word, text, color], i) => {
          const s = at(beat, word);
          const y = CY0 + i * STEP;
          const lines = text.length > 22 ? splitTwo(text) : [text];
          return (
            <g key={i}>
              {i > 0 && <Draw t={t} start={s - 0.3} dur={0.3} d={arrow(CX, y - STEP + 28 + (chain[i - 1][2].length > 22 ? 26 : 0), CX, y - 40, 0)} stroke={SOFT} width={3} />}
              {lines.map((ln, j) => (
                <Write key={j} id={`ch${i}-${j}`} t={t} start={s + j * 0.4} x={CX} y={y + j * 34} text={ln} size={i === 0 ? 50 : 32} color={color} font="patrick" anchor="middle" perChar={0.025} />
              ))}
            </g>
          );
        })}

        {/* after gloves: the 2002 CDC rule */}
        <Draw t={t} start={at("outbreak", "everyday") - 0.2} dur={0.6} d="M60,962 L660,962" stroke="#eadfe2" width={3} />
        <Write id="g0" t={t} start={at("outbreak", "everyday") - 0.1} x={360} y={1002} text="AFTER GLOVES · CDC GUIDELINE 2002" size={24} color={SOFT} font="patrick" anchor="middle" perChar={0.015} />
        <Write id="g1" t={t} start={at("outbreak", "everyday")} x={360} y={1044} text="EVERYDAY: SOAP + WATER OR ALCOHOL RUB" size={28} color={INK} font="patrick" anchor="middle" perChar={0.02} />
        <Write id="g2" t={t} start={at("outbreak", "outbreak")} x={360} y={1084} text="C. DIFF OUTBREAK: SOAP + WATER (PRUDENT)" size={28} color={RED} font="patrick" anchor="middle" perChar={0.02} />

        {/* the answer */}
        <Write id="ans" t={t} start={at("lock", "answer")} x={300} y={1162} text="ANSWER: C. DIFF" size={48} color={P.green} font="patrick" anchor="middle" perChar={0.035} />
        <Draw t={t} start={at("lock", "answer") + 0.6} dur={0.6} d={wobblyEllipse(300, 1146, 210, 46, 30, 0.04)} stroke={P.green} width={4} />
        <Write id="ans2" t={t} start={at("lock", "clostridioides")} x={300} y={1222} text="CLOSTRIDIOIDES DIFFICILE" size={26} color={INK} font="patrick" anchor="middle" perChar={0.025} />
      </g>

      <image href={getTigerAsset(ex.examId, face)} x={W - 190} y={1080} width={160} height={170} preserveAspectRatio="xMidYMax meet" opacity={1 - endK} />

      {endK > 0 && (
        <g>
          <image href={getTigerAsset(ex.examId, 2)} x={235} y={330} width={250} height={250} preserveAspectRatio="xMidYMid meet" opacity={endK} />
          <Write id="e1" t={t} start={spokenEnd + 0.7} x={360} y={680} text="TIGERTEST" size={84} color={RED} font="patrick" anchor="middle" perChar={0.05} />
          <Write id="e2" t={t} start={spokenEnd + 1.2} x={360} y={744} text="GET READY FOR THE CRCST" size={36} color={INK} font="patrick" anchor="middle" perChar={0.025} />
          <Write id="e3" t={t} start={spokenEnd + 1.8} x={360} y={792} text="4 FULL PRACTICE TESTS + PRACTICE SETS" size={26} color={SOFT} font="patrick" anchor="middle" perChar={0.015} />
          <Write id="e4" t={t} start={spokenEnd + 2.3} x={360} y={872} text="TIGERTEST.IO" size={44} color="#2f6fa8" font="patrick" anchor="middle" perChar={0.035} />
        </g>
      )}
    </svg>
  );
}

function splitTwo(text: string) {
  const words = text.split(" ");
  let best = 1, bestDiff = 1e9;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ").length, b = words.slice(i).join(" ").length;
    if (Math.abs(a - b) < bestDiff) { bestDiff = Math.abs(a - b); best = i; }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}
