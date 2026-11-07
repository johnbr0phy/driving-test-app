import { MistakeExplainer, MistakeManifest } from "@/lib/mistakeExplainers";
import { getTigerAsset } from "@/lib/tigerAssets";
import { speaking } from "../Stage";
import { Shot } from "../Stage3";
import { clamp, easeBack, easeInOut, easeOut, FONTS, H, timing, W } from "./kit";

/**
 * C. diff (CRCST SPD-DEC-005), cartoon style (SimpleNursing-like): cream
 * paper, a green title bar, flat germs with faces, and the tiger as host.
 * Shapes follow the sources (MRSA cocci in a cluster, Pseudomonas and
 * C. diff rods, hepatitis B a round enveloped particle, the spore formed
 * inside the rod). Same verified script as
 * tools/mistakes/claims/crcst-cdiff-spores.json.
 */

const CREAM = "#fdf3df";
const INK = "#2b2633";
const GREEN = "#2f9e6e";
const C = { pink: "#f58fb4", blue: "#6fb3ef", violet: "#a98bf0", mint: "#5fd3a8", gold: "#f5c242", red: "#e5484d", water: "#6cc4f5", skin: "#f1c3a1" };
const F = "TT Fredoka";

type Mood = "happy" | "smug" | "ko" | "worried" | "calm";
/** Cartoon eyes and mouth centred on (0,0), sized by s. */
function Face({ mood, s = 1, look = 0 }: { mood: Mood; s?: number; look?: number }) {
  const ex = 11 * s, ey = -3 * s, r = 6.5 * s;
  if (mood === "ko") {
    return (
      <g stroke={INK} strokeWidth={3 * s} strokeLinecap="round" fill="none">
        <path d={`M${-ex - 5 * s},${ey - 5 * s} l${10 * s},${10 * s} M${-ex + 5 * s},${ey - 5 * s} l${-10 * s},${10 * s}`} />
        <path d={`M${ex - 5 * s},${ey - 5 * s} l${10 * s},${10 * s} M${ex + 5 * s},${ey - 5 * s} l${-10 * s},${10 * s}`} />
        <path d={`M${-7 * s},${12 * s} q${7 * s},${-5 * s} ${14 * s},0`} />
      </g>
    );
  }
  const lid = mood === "smug" || mood === "calm";
  return (
    <g>
      {[-ex, ex].map((x) => (
        <g key={x}>
          <circle cx={x} cy={ey} r={r} fill="#fff" stroke={INK} strokeWidth={2 * s} />
          <circle cx={x + look * 2 * s} cy={ey + 1 * s} r={3.2 * s} fill={INK} />
          {lid && <path d={`M${x - r},${ey - 1 * s} A${r},${r} 0 0 1 ${x + r},${ey - 1 * s} Z`} fill={INK} opacity={0.85} />}
        </g>
      ))}
      {mood === "happy" && <path d={`M${-9 * s},${9 * s} q${9 * s},${9 * s} ${18 * s},0`} stroke={INK} strokeWidth={3 * s} fill="none" strokeLinecap="round" />}
      {mood === "smug" && <path d={`M${-8 * s},${11 * s} q${10 * s},${4 * s} ${16 * s},${-4 * s}`} stroke={INK} strokeWidth={3 * s} fill="none" strokeLinecap="round" />}
      {mood === "calm" && <path d={`M${-6 * s},${11 * s} l${12 * s},0`} stroke={INK} strokeWidth={3 * s} strokeLinecap="round" />}
      {mood === "worried" && <path d={`M${-8 * s},${14 * s} q${8 * s},${-7 * s} ${16 * s},0`} stroke={INK} strokeWidth={3 * s} fill="none" strokeLinecap="round" />}
    </g>
  );
}

const outline = { stroke: INK, strokeWidth: 4, strokeLinejoin: "round" as const };

function Cluster({ mood }: { mood: Mood }) {
  return (
    <g>
      {[[0, 0], [30, -12], [-28, 10], [12, 26], [40, 18], [-6, -30], [-34, -16]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={20} fill={C.pink} {...outline} />
      ))}
      <Face mood={mood} s={0.9} />
    </g>
  );
}
function Rod({ color, mood, w = 150, h = 58 }: { color: string; mood: Mood; w?: number; h?: number }) {
  return (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={color} {...outline} />
      <rect x={-w / 2 + 16} y={-h / 2 + 9} width={w * 0.45} height={7} rx={3.5} fill="#fff" opacity={0.5} />
      <Face mood={mood} s={0.95} />
    </g>
  );
}
function Virus({ mood }: { mood: Mood }) {
  return (
    <g>
      <circle r={46} fill="#ddd2fb" {...outline} />
      <circle r={34} fill={C.violet} stroke={INK} strokeWidth={3} />
      <Face mood={mood} s={0.9} />
    </g>
  );
}
function Spore({ mood, s = 1 }: { mood: Mood; s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse rx={62} ry={44} fill="#c98f1c" {...outline} />
      <ellipse rx={50} ry={34} fill={C.gold} stroke={INK} strokeWidth={3} />
      <ellipse cx={-20} cy={-16} rx={14} ry={7} fill="#fff" opacity={0.55} />
      <Face mood={mood} s={1.05} />
    </g>
  );
}
function Bottle({ squirt }: { squirt: number }) {
  return (
    <g>
      <rect x={-14} y={-128} width={28} height={40} rx={6} fill="#cbd5e1" {...outline} />
      <path d="M14,-118 h54 v14 h-54 z" fill="#cbd5e1" {...outline} />
      <rect x={-56} y={-90} width={112} height={180} rx={30} fill="#dbeafe" {...outline} />
      <rect x={-40} y={-30} width={80} height={56} rx={12} fill="#fff" stroke={INK} strokeWidth={3} />
      <text y={-6} fontSize={17} fontWeight={700} fill={INK} textAnchor="middle" fontFamily={F}>HAND</text>
      <text y={16} fontSize={17} fontWeight={700} fill={INK} textAnchor="middle" fontFamily={F}>RUB</text>
      <g transform="translate(0,-58)"><Face mood="happy" s={0.85} /></g>
      {squirt > 0 && (
        <g opacity={1 - squirt}>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={80 + squirt * (60 + i * 24)} cy={-110 + squirt * (20 + i * 14) + (i % 2) * 8} r={6 - i * 0.6} fill={C.water} />
          ))}
        </g>
      )}
    </g>
  );
}
function Pill({ x, y, text, color, k, w }: { x: number; y: number; text: string; color: string; k: number; w?: number }) {
  if (k <= 0) return null;
  const width = w ?? text.length * 15 + 40;
  return (
    <g opacity={clamp(k * 1.5)} transform={`translate(${x},${y}) scale(${0.8 + 0.2 * easeBack(k)})`}>
      <rect x={-width / 2} y={-24} width={width} height={48} rx={24} fill={color} {...outline} strokeWidth={3} />
      <text y={9} fontSize={24} fontWeight={700} fill="#fff" textAnchor="middle" fontFamily={F}>{text}</text>
    </g>
  );
}

export function CdiffCartoon({ ex, m, t }: { ex: MistakeExplainer; m: MistakeManifest; t: number }) {
  const { at, spokenEnd } = timing(m);
  const beatT = (id: string) => m.beats.find((b) => b.id === id) ?? m.beats[0];
  const { bi, wi, talking } = speaking(m, t);
  let face = ex.beats[bi].face;
  if (talking && (face === 3 || face === 4 || face === 5)) face = wi % 2 === 0 ? 3 : 5;
  const endK = easeOut((t - spokenEnd - 0.5) / 0.6);
  const bob = (i: number) => Math.sin(t * 2.2 + i * 1.9) * 5;
  const pop = (s: number, d = 0.5) => clamp((t - s) / d);

  const ko = (w: string) => pop(at("hook", w) + 0.25, 0.4);
  const squirtAt = (w: string) => clamp((t - at("hook", w) + 0.1) / 0.5);
  const squirt = Math.max(squirtAt("mrsa") < 1 ? squirtAt("mrsa") : 0, squirtAt("pseudomonas") < 1 ? squirtAt("pseudomonas") : 0, squirtAt("hepatitis") < 1 ? squirtAt("hepatitis") : 0);
  const move = easeInOut((t - at("turn", "c")) / 0.9);
  const sporeK = easeBack(pop(at("spore", "spore"), 0.6));
  const rodFade = pop(at("spore", "inactive"), 0.6);
  const rainK = t >= at("alcohol") ? (t - at("alcohol")) : -1;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-full" role="img" aria-label={ex.beats.map((b) => b.say).join(" ")}>
      <defs><style>{FONTS}</style></defs>
      <rect width={W} height={H} fill={CREAM} />
      {/* soft paper dots */}
      {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 197) % W} cy={(i * 331) % H} r={2} fill="#e9dcc0" />)}

      <g opacity={1 - endK}>
        <text x={36} y={42} fontSize={20} fontWeight={700} fill="#8c8170" fontFamily={F} letterSpacing={1}>CRCST · MOST MISSED</text>
        {ex.medical && <text x={684} y={42} fontSize={17} fontWeight={700} fill={C.red} fontFamily={F} textAnchor="end" letterSpacing={1}>DRAFT · NOT REVIEWED</text>}
        <rect x={24} y={58} width={672} height={74} rx={16} fill={GREEN} {...outline} />
        <text x={360} y={108} fontSize={34} fontWeight={700} fill="#fff" textAnchor="middle" fontFamily={F}>ALCOHOL HAND RUB VS. GERMS</text>

        {/* 1-4: the bottle, the germs, C. diff and its spore */}
        <Shot t={t} at={beatT} from="hook" until="soap" zoom={[1, 1]} focus={[360, 500]}>
          <g transform={`translate(360,${300 + bob(0)})`} opacity={1 - move}><Bottle squirt={squirt} /></g>
          <Pill x={360} y={430} text="KILLS A LOT OF GERMS WELL" color={GREEN} k={pop(at("hook", "kills"), 0.5) * (1 - move)} w={420} />
          {/* MRSA */}
          <g transform={`translate(130,${600 + bob(1)})`} opacity={(1 - 0.75 * ko("mrsa")) * (1 - move)}><Cluster mood={ko("mrsa") > 0.2 ? "ko" : "happy"} /></g>
          <Pill x={130} y={690} text="MRSA ✓" color={C.pink} k={pop(at("hook", "mrsa"), 0.4) * (1 - move)} />
          {/* Pseudomonas */}
          <g transform={`translate(360,${600 + bob(2)}) rotate(-12)`} opacity={(1 - 0.75 * ko("pseudomonas")) * (1 - move)}><Rod color={C.blue} mood={ko("pseudomonas") > 0.2 ? "ko" : "happy"} /></g>
          <Pill x={360} y={690} text="PSEUDOMONAS ✓" color={C.blue} k={pop(at("hook", "pseudomonas"), 0.4) * (1 - move)} />
          {/* hepatitis B */}
          <g transform={`translate(590,${600 + bob(3)})`} opacity={(1 - 0.75 * ko("hepatitis")) * (1 - move)}><Virus mood={ko("hepatitis") > 0.2 ? "ko" : "happy"} /></g>
          <Pill x={590} y={690} text="HEPATITIS B ✓" color={C.violet} k={pop(at("hook", "hepatitis"), 0.4) * (1 - move)} />
          {/* C. diff: walks in from the bottom, then makes a spore inside itself */}
          <g transform={`translate(360,${880 - 330 * move + bob(4) * (1 - move)}) scale(${0.8 + 0.7 * move})`}>
            <g opacity={1 - rodFade}><Rod color={C.mint} mood="smug" w={180} h={66} /></g>
            {sporeK > 0 && <g transform={`translate(0,0) scale(${0.25 + 0.35 * sporeK + 0.25 * rodFade})`}><Spore mood={t > at("alcohol") ? "calm" : "smug"} /></g>}
          </g>
          <Pill x={360} y={950} text="C. DIFF" color={C.mint} k={pop(at("hook"), 1) * (1 - move)} />
          <Pill x={360} y={330} text="CAN'T COUNT ON ALCOHOL" color={C.red} k={pop(at("turn", "can't"), 0.5) * (1 - pop(at("spore"), 0.4))} w={420} />
          <Pill x={360} y={330} text="MAKES A SPORE INSIDE ITSELF" color="#c98f1c" k={pop(at("spore", "spore"), 0.5) * (1 - pop(at("alcohol"), 0.4))} w={470} />
          <Pill x={180} y={760} text="INACTIVE" color="#8c8170" k={pop(at("spore", "inactive"), 0.4) * (1 - pop(at("alcohol"), 0.4))} />
          <Pill x={540} y={760} text="RESISTS HEAT" color={C.red} k={pop(at("spore", "resists"), 0.4) * (1 - pop(at("alcohol"), 0.4))} />
          {/* alcohol drips over the spore, which stays intact */}
          {rainK >= 0 && Array.from({ length: 10 }, (_, i) => {
            const ph = ((rainK * 0.7 + i * 0.13) % 1);
            const x0 = 300 + (i % 5) * 30;
            const y = 330 + ph * 420;
            const push = Math.max(0, 1 - Math.abs(y - 550) / 70) * (x0 < 360 ? -60 : 60);
            return <path key={i} d={`M${x0 + push},${y - 18} C${x0 + push + 8},${y - 7} ${x0 + push + 8},${y} ${x0 + push},${y} C${x0 + push - 8},${y} ${x0 + push - 8},${y - 7} ${x0 + push},${y - 18} Z`} fill={C.water} stroke={INK} strokeWidth={2} opacity={clamp(rainK * 3) * (1 - ph * 0.5)} />;
          })}
          <Pill x={360} y={330} text="ALCOHOL: VERY POOR ACTIVITY" color={C.red} k={pop(at("alcohol", "alcohol"), 0.5)} w={480} />
        </Shot>

        {/* 5: soap and water wash the spores off a hand */}
        <Shot t={t} at={beatT} from="soap" until="outbreak" zoom={[1, 1.02]} focus={[360, 500]}>
          <Pill x={360} y={230} text="SOAP + WATER" color="#2f80c8" k={pop(at("soap"), 0.5)} w={300} />
          <text x={360} y={300} fontSize={26} fontWeight={600} fill={INK} textAnchor="middle" fontFamily={F} opacity={pop(at("soap", "scrubbing"), 0.5)}>scrubbing + rinsing help wash spores off</text>
          {/* water from a tap */}
          <rect x={300} y={330} width={120} height={36} rx={10} fill="#94a3b8" {...outline} />
          <path d={`M330,366 C ${330 + 8 * Math.sin(t * 7)},470 ${338 + 10 * Math.sin(t * 6)},560 340,640 L390,640 C ${386 + 8 * Math.sin(t * 6.5)},560 ${394 + 8 * Math.sin(t * 7.5)},470 392,366 Z`} fill={C.water} opacity={0.75 * pop(at("soap"), 0.5)} />
          {/* the hand */}
          <path d="M60,700 Q120,610 360,620 Q600,610 660,700 L660,860 Q360,830 60,860 Z" fill={C.skin} {...outline} />
          <path d="M150,680 Q250,660 330,672 M400,670 Q490,660 580,684" stroke="#c98f6b" strokeWidth={3} fill="none" />
          {/* spores sliding away */}
          {[[170, 640], [270, 628], [460, 628], [560, 642]].map(([x, y], i) => {
            const k = easeInOut(clamp((t - at("soap", "wash") - i * 0.12) / 1.4));
            const dx = 300 * k * (x < 360 ? -1 : 1);
            const dy = 260 * k * k;
            return <g key={i} transform={`translate(${x + dx},${y + dy}) rotate(${60 * k * (x < 360 ? -1 : 1)})`} opacity={1 - k}><Spore mood={k > 0.05 ? "worried" : "calm"} s={0.5} /></g>;
          })}
        </Shot>

        {/* 6: the rule after gloves */}
        <Shot t={t} at={beatT} from="outbreak" until="lock" zoom={[1, 1.02]} focus={[360, 500]}>
          <text x={360} y={240} fontSize={28} fontWeight={700} fill="#8c8170" textAnchor="middle" fontFamily={F}>AFTER GLOVES · CDC GUIDELINE, 2002</text>
          <g opacity={pop(at("outbreak", "everyday"), 0.5)} transform={`translate(0,${(1 - easeOut(pop(at("outbreak", "everyday"), 0.5))) * 14})`}>
            <rect x={50} y={280} width={620} height={220} rx={26} fill="#fff" {...outline} />
            <text x={84} y={334} fontSize={26} fontWeight={700} fill={GREEN} fontFamily={F}>EVERYDAY CARE</text>
            <text x={84} y={392} fontSize={34} fontWeight={700} fill={INK} fontFamily={F}>Soap + water</text>
            <text x={84} y={440} fontSize={30} fontWeight={500} fill="#8c8170" fontFamily={F}>or</text>
            <text x={130} y={440} fontSize={34} fontWeight={700} fill={INK} fontFamily={F}>alcohol rub</text>
            <g transform="translate(560,400) scale(0.6)"><Bottle squirt={0} /></g>
          </g>
          <g opacity={pop(at("outbreak", "outbreak"), 0.5)} transform={`translate(0,${(1 - easeOut(pop(at("outbreak", "outbreak"), 0.5))) * 14})`}>
            <rect x={50} y={530} width={620} height={200} rx={26} fill="#fff1f1" {...outline} stroke={C.red} />
            <text x={84} y={584} fontSize={26} fontWeight={700} fill={C.red} fontFamily={F}>C. DIFF OUTBREAK</text>
            <text x={84} y={642} fontSize={34} fontWeight={700} fill={INK} fontFamily={F}>Soap + water</text>
            <text x={84} y={690} fontSize={26} fontWeight={500} fill="#8c8170" fontFamily={F} opacity={pop(at("outbreak", "prudent"), 0.4)}>the prudent choice</text>
            <path transform="translate(590,630) scale(1.1)" d="M0,-50 C26,-16 40,8 40,28 A40,40 0 0 1 -40,28 C-40,8 -26,-16 0,-50 Z" fill={C.water} {...outline} />
          </g>
        </Shot>

        {/* 7: the answer */}
        <Shot t={t} at={beatT} from="lock" end={m.duration} zoom={[1, 1]} focus={[360, 500]}>
          <Pill x={360} y={250} text="ALCOHOL CAN'T RELIABLY KILL SPORES" color={C.red} k={pop(at("lock"), 0.5)} w={600} />
          <g transform={`translate(360,470) scale(${0.6 + 0.4 * easeBack(pop(at("lock", "answer"), 0.6))})`} opacity={pop(at("lock", "answer"), 0.3)}>
            <circle r={140} fill={GREEN} opacity={0.15} />
            <Spore mood="smug" s={1.3} />
          </g>
          <text x={360} y={690} fontSize={66} fontWeight={700} fill={GREEN} textAnchor="middle" fontFamily={F} opacity={pop(at("lock", "answer"), 0.4)}>C. DIFF</text>
          <text x={360} y={740} fontSize={30} fontWeight={600} fill={INK} textAnchor="middle" fontFamily={F} fontStyle="italic" opacity={pop(at("lock", "clostridioides"), 0.4)}>Clostridioides difficile</text>
        </Shot>
      </g>

      {/* the host */}
      <image href={getTigerAsset(ex.examId, face)} x={20} y={1010} width={230} height={240} preserveAspectRatio="xMidYMax meet" opacity={1 - endK} />
      <text x={690} y={1240} fontSize={22} fontWeight={700} fill="#8c8170" textAnchor="end" fontFamily={F} opacity={1 - endK}>tigertest.io</text>

      {endK > 0 && (
        <g opacity={endK}>
          <image href={getTigerAsset(ex.examId, 2)} x={225} y={300} width={270} height={270} preserveAspectRatio="xMidYMid meet" />
          <text x={360} y={660} fontSize={80} fontWeight={700} fill={INK} textAnchor="middle" fontFamily={F}>Tigertest</text>
          <text x={360} y={720} fontSize={34} fontWeight={600} fill={INK} textAnchor="middle" fontFamily={F}>Get ready for the CRCST</text>
          <text x={360} y={766} fontSize={26} fontWeight={500} fill="#8c8170" textAnchor="middle" fontFamily={F}>4 full practice tests + practice sets</text>
          <rect x={210} y={810} width={300} height={72} rx={36} fill={GREEN} {...outline} />
          <text x={360} y={858} fontSize={30} fontWeight={700} fill="#fff" textAnchor="middle" fontFamily={F}>tigertest.io</text>
        </g>
      )}
    </svg>
  );
}
