import { ACCENT, AnswerCard, CYAN, DIM, Dimension, Draw, GOOD, INK, Label, MONO, SceneProps, Wrong, sceneHelpers } from "../Stage";

/** Part 107 P107-WX-006: 19/12 A3002 at the end of a METAR. */

const CH = 13.2; // px per mono character at 22px
const METAR = "KMEM 121753Z 18010KT 10SM CLR 19/12 A3002";
const at = (s: string) => 300 - (METAR.length * CH) / 2 + METAR.indexOf(s) * CH;
const HOT = "#ff8a5b";

// Thermometer: 0..30 C from y=600 to y=330.
const TX = 120;
const ty = (c: number) => 600 - c * 9;
// The zoomed groups.
const ZY = 205;
const BIG = 36.1; // px per mono character at 60px

export function MetarScene(props: SceneProps) {
  const { p, onWord } = sceneHelpers(props);
  const q = p("question", 0, 0.8);
  const box = onWord("question", "nineteen");
  const boxA = onWord("question", "a");
  const zoom = p("temps", 0, 0.7);
  const temp = onWord("temps", "first");
  const dew = onWord("temps", "second");
  const trick = p("trick");
  const fog = onWord("dew", "fog", 0.8) * (1 - trick);
  const never = onWord("dew", "never") * (1 - trick);
  const alt = p("alt", 0);
  const dot = onWord("alt", "decimal");
  const thirty = onWord("alt", "thirty");
  const lock = p("lock", 0.6);
  const x19 = at("19/12"), xA = at("A3002");
  const zx = 70; // left of "19/12"
  const ax = 330; // left of the altimeter group
  const altText = thirty > 0 ? "30.02" : dot > 0 ? "30·02" : "A3002";

  return (
    <g>
      {/* the METAR line */}
      <g opacity={q}>
        <rect x={20} y={34} width={560} height={52} rx={10} fill="#0b2247" stroke="#2a4f86" />
        <text x={300} y={68} fontSize={22} fill={INK} textAnchor="middle" fontFamily={MONO} xmlSpace="preserve">{METAR}</text>
        {box > 0 && <rect x={x19 - 4} y={42} width={5 * CH + 8} height={36} rx={6} fill="none" stroke={ACCENT} strokeWidth={3} opacity={box} />}
        {boxA > 0 && <rect x={xA - 4} y={42} width={5 * CH + 8} height={36} rx={6} fill="none" stroke={CYAN} strokeWidth={3} opacity={boxA} />}
      </g>

      <Wrong x={170} y={140} k={onWord("trap", "date") * (1 - zoom)} text="A DATE?" />
      <Wrong x={430} y={140} k={onWord("trap", "visibility") * (1 - zoom)} text="VISIBILITY?" />

      {/* zoomed in: 19/12 and A3002 */}
      {zoom > 0 && (
        <g opacity={zoom}>
          <Draw d={`M${x19 + 2.5 * CH},86 L${zx + 2.5 * BIG},${ZY - 50}`} k={zoom} stroke={ACCENT} w={1.5} dash="4 6" />
          <Draw d={`M${xA + 2.5 * CH},86 L${ax + 2.5 * BIG},${ZY - 50}`} k={zoom} stroke={CYAN} w={1.5} dash="4 6" />
          <text x={zx} y={ZY} fontSize={60} fontWeight={800} fontFamily={MONO} xmlSpace="preserve">
            <tspan fill={temp > 0 ? HOT : INK}>19</tspan>
            <tspan fill={DIM}>/</tspan>
            <tspan fill={dew > 0 ? CYAN : INK}>12</tspan>
          </text>
          <text x={ax} y={ZY} fontSize={60} fontWeight={800} fontFamily={MONO} fill={thirty > 0 ? GOOD : alt > 0 ? CYAN : INK}>{altText}</text>
        </g>
      )}
      <Draw d={`M${zx + 4},${ZY + 12} v12 h${2 * BIG - 8} v-12`} k={temp} stroke={HOT} w={3} />
      <Label x={zx + BIG} y={ZY + 50} k={temp} size={18} fill={HOT} weight={800} mono>TEMP °C</Label>
      <Draw d={`M${zx + 3 * BIG + 4},${ZY + 12} v12 h${2 * BIG - 8} v-12`} k={dew} stroke={CYAN} w={3} />
      <Label x={zx + 4 * BIG} y={ZY + 50} k={dew} size={18} fill={CYAN} weight={800} mono>DEW PT °C</Label>
      <Label x={ax + 2.5 * BIG} y={ZY + 50} k={onWord("alt", "altimeter")} size={18} fill={CYAN} weight={800} mono>A = ALTIMETER</Label>

      {/* thermometer */}
      <g opacity={temp}>
        <rect x={TX - 14} y={ty(32)} width={28} height={ty(0) - ty(32) + 10} rx={14} fill="none" stroke={INK} strokeWidth={3} />
        <circle cx={TX} cy={ty(0) + 26} r={24} fill={HOT} stroke={INK} strokeWidth={3} />
        <rect x={TX - 7} y={ty(19 * temp)} width={14} height={ty(0) - ty(19 * temp) + 12} fill={HOT} />
        {[0, 10, 20, 30].map((c) => (
          <g key={c}>
            <line x1={TX + 16} y1={ty(c)} x2={TX + 26} y2={ty(c)} stroke={DIM} strokeWidth={2} />
            <text x={TX + 32} y={ty(c) + 5} fontSize={15} fill={DIM} fontFamily={MONO}>{c}</text>
          </g>
        ))}
      </g>
      <Draw d={`M${TX - 18},${ty(19)} H${TX - 46}`} k={temp} stroke={HOT} w={3} />
      <Label x={TX - 50} y={ty(19) + 7} k={temp} size={20} fill={HOT} anchor="end" weight={800} mono>19</Label>
      <Draw d={`M${TX - 18},${ty(12)} H${TX - 46}`} k={dew} stroke={CYAN} w={3} />
      <Label x={TX - 50} y={ty(12) + 7} k={dew} size={20} fill={CYAN} anchor="end" weight={800} mono>12</Label>

      {/* dew point never above temp; fog forms when the air cools to it */}
      <Dimension x1={TX + 80} y1={ty(19)} x2={TX + 80} y2={ty(12)} k={never} label="" />
      <Label x={TX + 100} y={ty(15.5) + 6} k={never} size={17} fill={DIM} anchor="start" weight={700} mono>DEW ≤ TEMP</Label>
      {fog > 0 && (
        <g opacity={fog}>
          <path d={`M${TX + 70},${ty(12) + 34} q10,-18 26,-8 q10,-16 28,-2 q18,-4 18,12 z`} fill="none" stroke={CYAN} strokeWidth={2.5} />
          <text x={TX + 150} y={ty(12) + 24} fontSize={16} fill={CYAN} fontFamily={MONO} fontWeight={700}>FOG FORMS</text>
          <text x={TX + 150} y={ty(12) + 44} fontSize={16} fill={CYAN} fontFamily={MONO} fontWeight={700}>AT DEW PT</text>
        </g>
      )}

      {/* altimeter dial */}
      <g opacity={alt} transform="translate(480,350)">
        <circle r={66} fill="#0b2247" stroke={INK} strokeWidth={3} />
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
          return <line key={i} x1={Math.cos(a) * 54} y1={Math.sin(a) * 54} x2={Math.cos(a) * 62} y2={Math.sin(a) * 62} stroke={DIM} strokeWidth={2} />;
        })}
        <line x1={0} y1={0} x2={Math.cos(-Math.PI / 2 + alt * 2.4) * 48} y2={Math.sin(-Math.PI / 2 + alt * 2.4) * 48} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
        <circle r={6} fill={ACCENT} />
        <text y={34} fontSize={15} fill={DIM} textAnchor="middle" fontFamily={MONO}>inHg</text>
      </g>

      {/* the trick: T before D */}
      {trick > 0 && (
        <g opacity={trick}>
          <rect x={250} y={470} width={320} height={100} rx={14} fill="#0b2247" stroke={GOOD} strokeWidth={2} />
          <text x={290} y={538} fontSize={52} fontWeight={900} fill={HOT} fontFamily={MONO}>T</text>
          <text x={330} y={530} fontSize={20} fill={GOOD} fontWeight={700}>before</text>
          <text x={400} y={538} fontSize={52} fontWeight={900} fill={CYAN} fontFamily={MONO}>D</text>
          <text x={450} y={512} fontSize={16} fill={DIM} fontFamily={MONO}>A B C D</text>
          <text x={450} y={540} fontSize={16} fill={DIM} fontFamily={MONO}>… S T</text>
        </g>
      )}

      <AnswerCard k={lock} text="19°C, dew point 12°C, 30.02 inHg" y={604} />
    </g>
  );
}
