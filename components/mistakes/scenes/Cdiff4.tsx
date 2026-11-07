import { sceneHelpers } from "../Stage";
import { easeBack, easeIn, easeInOut, easeOut, SceneProps3, Shot } from "../Stage3";
import { DIM, WHITE } from "../Stage4";

/**
 * CRCST SPD-DEC-005, second version (dark design, Stage4): why alcohol hand
 * rub handles MRSA, Pseudomonas and hepatitis B but not C. diff spores.
 * Every line and drawing is in tools/mistakes/claims/crcst-cdiff-spores.json:
 * CDC's Guideline for Hand Hygiene in Health-Care Settings (MMWR 2002;
 * 51(RR-16)) and NLM MeSH scope notes. Shapes follow MeSH: Staphylococcus
 * coccoid in irregular clusters, Pseudomonas aeruginosa a rod, hepatitis B
 * a spherical particle (enveloped, per CDC), Clostridioides a spore-forming
 * rod with the spore formed inside the cell.
 */

const GOLD = "#fbbf24";
const PINK = "#f472b6";
const VIOLET = "#a78bfa";
const MINT = "#34d399";
const SPORE = "#fde68a";
const OK = "#4ade80";
const BAD = "#f87171";
const WATER = "#7dd3fc";

const clamp = (x: number) => Math.min(1, Math.max(0, x));
/** A small deterministic pseudo-random number for i. */
const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

function Grad({ id, c }: { id: string; c: string }) {
  return (
    <radialGradient id={id} cx="35%" cy="30%" r="75%">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
      <stop offset="25%" stopColor={c} />
      <stop offset="100%" stopColor={c} stopOpacity="0.55" />
    </radialGradient>
  );
}

/** Pieces flying apart as a germ is killed (k 0..1). */
function Burst({ x, y, k, c }: { x: number; y: number; k: number; c: string }) {
  if (k <= 0 || k >= 1) return null;
  return (
    <g opacity={1 - k}>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 + rnd(i) * 0.4;
        const d = 30 + 90 * easeOut(k) * (0.6 + rnd(i + 7) * 0.6);
        return <circle key={i} cx={x + Math.cos(a) * d} cy={y + Math.sin(a) * d} r={4 + 5 * (1 - k) * rnd(i + 3)} fill={c} />;
      })}
      <circle cx={x} cy={y} r={20 + 70 * easeOut(k)} fill="none" stroke={c} strokeWidth={3 * (1 - k)} />
    </g>
  );
}

function Label({ x, y, text, k, color = WHITE, tick }: { x: number; y: number; text: string; k: number; color?: string; tick?: "ok" | "bad" }) {
  if (k <= 0) return null;
  const w = text.length * 13.5 + (tick ? 44 : 30);
  return (
    <g opacity={clamp(k * 1.6)} transform={`translate(${x},${y}) scale(${0.85 + 0.15 * easeBack(k)})`}>
      <rect x={-w / 2} y={-19} width={w} height={38} rx={19} fill="rgba(15,23,42,0.72)" stroke="rgba(248,250,252,0.18)" />
      {tick && <circle cx={-w / 2 + 20} cy={0} r={10} fill={tick === "ok" ? OK : BAD} />}
      {tick && <text x={-w / 2 + 20} y={5} fontSize={14} fontWeight={900} fill="#0f172a" textAnchor="middle">{tick === "ok" ? "✓" : "✕"}</text>}
      <text x={tick ? 12 : 0} y={6} fontSize={18} fontWeight={800} fill={color} textAnchor="middle" letterSpacing={0.6}>{text}</text>
    </g>
  );
}

/** Big kinetic title at the top of the scene. */
function Title({ k, out, text, sub, color = WHITE }: { k: number; out: number; text: string; sub?: string; color?: string }) {
  const v = clamp(k) * (1 - clamp(out));
  if (v <= 0) return null;
  return (
    <g opacity={v} transform={`translate(0,${(1 - easeOut(k)) * 18 - easeIn(out) * 10})`}>
      <text x={360} y={70} fontSize={52} fontWeight={900} fill={color} textAnchor="middle" letterSpacing={-0.5 + 2 * (1 - easeOut(k))}>{text}</text>
      {sub && <text x={360} y={112} fontSize={22} fontWeight={700} fill={DIM} textAnchor="middle">{sub}</text>}
    </g>
  );
}

const Cocci = ({ c }: { c: string }) => (
  <g>
    {[[0, 0], [30, -10], [-26, 14], [14, 26], [44, 20], [-6, -30], [-36, -14], [22, -38]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={17} fill={`url(#${c})`} />
    ))}
  </g>
);
const Rod = ({ c, w = 150, h = 56 }: { c: string; w?: number; h?: number }) => (
  <g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={`url(#${c})`} />
    <rect x={-w / 2 + 14} y={-h / 2 + 8} width={w - 40} height={8} rx={4} fill="#fff" opacity={0.35} />
  </g>
);
const Virus = ({ c }: { c: string }) => (
  <g>
    <circle r={40} fill="none" stroke={VIOLET} strokeWidth={5} opacity={0.65} />
    <circle r={31} fill={`url(#${c})`} />
  </g>
);
function Spore({ s = 1, glow = 1 }: { s?: number; glow?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <ellipse rx={44} ry={32} fill={SPORE} opacity={0.25 * glow} filter="url(#mx4-bigglow)" />
      <ellipse rx={36} ry={26} fill="#78350f" stroke={SPORE} strokeWidth={5} />
      <ellipse rx={27} ry={19} fill="none" stroke="#fcd34d" strokeWidth={3} opacity={0.85} />
      <ellipse rx={18} ry={12} fill="url(#cd-spore)" />
      <ellipse cx={-8} cy={-6} rx={7} ry={4} fill="#fff" opacity={0.6} />
    </g>
  );
}

export function CdiffScene4(props: SceneProps3) {
  const { t, at, duration } = props;
  const { onWord } = sceneHelpers(props);
  const b = (id: string) => at(id).start;
  const bob = (i: number) => Math.sin(t * 1.3 + i * 1.7) * 6;

  // field: three germs die as they are named
  const kM = onWord("hook", "mrsa", 0.7);
  const kP = onWord("hook", "pseudomonas", 0.7);
  const kH = onWord("hook", "hepatitis", 0.7);
  const fieldIn = easeOut((t - b("hook")) / 0.8);
  const spray = clamp((t - b("hook") - 0.4) / 0.6) * (1 - clamp((t - b("soap")) / 0.4));

  // camera dives onto C. diff
  const dive = easeInOut((t - b("turn")) / 1.4);
  const CD: [number, number] = [520, 560];
  const s = 1 + 1.4 * dive;
  const cam = `translate(${CD[0] + (360 - CD[0]) * dive},${CD[1] + (360 - CD[1]) * dive}) scale(${s}) translate(${-CD[0]},${-CD[1]})`;
  const warn = onWord("turn", "c", 0.6);

  // the spore forms inside, then the rod falls away
  const sporeK = onWord("spore", "spore", 0.9);
  const rodGone = onWord("spore", "inactive", 1.0);
  const heatK = onWord("spore", "heat", 0.5);
  const inactiveK = onWord("spore", "inactive", 0.5);

  // alcohol bounces off
  const bounce = (t - b("alcohol")) / 2.2;

  // soap and water
  const wash = easeInOut(onWord("soap", "scrubbing", 2.2));
  const soapIn = easeOut((t - b("soap")) / 0.6);

  const lockK = easeOut((t - b("lock")) / 0.5);
  const answerK = onWord("lock", "answer", 0.6);

  return (
    <g>
      <defs>
        <Grad id="cd-gold" c={GOLD} />
        <Grad id="cd-pink" c={PINK} />
        <Grad id="cd-violet" c={VIOLET} />
        <Grad id="cd-mint" c={MINT} />
        <Grad id="cd-spore" c={SPORE} />
        <linearGradient id="cd-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={WATER} stopOpacity="0" />
          <stop offset="30%" stopColor={WATER} stopOpacity="0.55" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="cd-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2c6a5" />
          <stop offset="100%" stopColor="#d9a07a" />
        </linearGradient>
      </defs>

      {/* 1-4: the germ field, the dive, the spore, alcohol bouncing off */}
      <Shot t={t} at={at} from="hook" until="soap" zoom={[1, 1]} focus={[360, 380]}>
        <Title k={easeOut((t - b("hook")) / 0.6)} out={clamp((t - b("turn")) / 0.4)} text="ALCOHOL HAND RUB" sub="kills a lot of germs well" />
        <Title k={easeOut((t - b("turn") - 0.6) / 0.6)} out={clamp((t - b("spore")) / 0.4)} text="C. DIFF" color={SPORE} sub="alcohol can't reliably kill it" />
        <Title k={easeOut((t - b("spore")) / 0.6)} out={clamp((t - b("alcohol")) / 0.4)} text="IT MAKES A SPORE" color={SPORE} />
        <Title k={easeOut((t - b("alcohol")) / 0.6)} out={clamp((t - b("soap") + 0.4) / 0.4)} text="ALCOHOL BARELY WORKS" color={BAD} sub="very poor activity against spores" />

        <g transform={cam} opacity={fieldIn}>
          {/* MRSA: cocci in an irregular cluster */}
          <g opacity={1 - clamp(kM * 1.4)} transform={`translate(185,${330 + bob(1)}) scale(${1 + 0.15 * Math.sin(Math.PI * clamp(kM * 1.2))})`}><Cocci c="cd-gold" /></g>
          <Burst x={185} y={330} k={kM} c={GOLD} />
          <Label x={185} y={420} text="MRSA" k={fieldIn * (1 - dive)} tick={kM > 0.3 ? "ok" : undefined} />
          {/* Pseudomonas: a rod */}
          <g opacity={1 - clamp(kP * 1.4)} transform={`translate(525,${300 + bob(2)}) rotate(-22)`}><Rod c="cd-pink" w={140} h={50} /></g>
          <Burst x={525} y={300} k={kP} c={PINK} />
          <Label x={525} y={390} text="PSEUDOMONAS" k={fieldIn * (1 - dive)} tick={kP > 0.3 ? "ok" : undefined} />
          {/* hepatitis B: a spherical, enveloped particle */}
          <g opacity={1 - clamp(kH * 1.4)} transform={`translate(205,${560 + bob(3)})`}><Virus c="cd-violet" /></g>
          <Burst x={205} y={560} k={kH} c={VIOLET} />
          <Label x={205} y={640} text="HEPATITIS B" k={fieldIn * (1 - dive)} tick={kH > 0.3 ? "ok" : undefined} />
          {/* C. diff: a rod that makes a spore inside itself */}
          <g transform={`translate(${CD[0]},${CD[1] + bob(4) * (1 - dive)}) rotate(${14 * (1 - dive)})`}>
            <g opacity={1 - easeIn(rodGone)} transform={`scale(${1 + 0.06 * easeIn(rodGone)})`}>
              <Rod c="cd-mint" w={170} h={62} />
            </g>
            {sporeK > 0 && <g transform="translate(0,0)"><Spore s={0.35 + 0.4 * easeBack(sporeK) + 0.15 * rodGone} glow={sporeK} /></g>}
            {warn > 0 && dive < 1 && <circle r={96} fill="none" stroke={BAD} strokeWidth={4} opacity={(1 - dive) * Math.min(1, warn) * (0.6 + 0.4 * Math.sin(t * 8))} />}
          </g>
          <Label x={CD[0]} y={CD[1] + 80} text="C. DIFF" k={fieldIn * (1 - dive)} color={SPORE} />
        </g>

        {/* spore labels, in screen space around the zoomed spore */}
        <Label x={190} y={300} text="HEAT-RESISTANT" k={heatK * (1 - clamp((t - b("alcohol")) / 0.4))} color={SPORE} />
        <Label x={540} y={440} text="INACTIVE" k={inactiveK * (1 - clamp((t - b("alcohol")) / 0.4))} color={SPORE} />
        <Label x={360} y={520} text="C. DIFF SPORE" k={clamp((t - b("alcohol")) / 0.5)} color={SPORE} />

        {/* alcohol droplets: falling over the field, bouncing off the spore */}
        <g opacity={spray}>
          {Array.from({ length: 26 }, (_, i) => {
            const period = 1.6 + rnd(i) * 0.8;
            const ph = ((t + rnd(i + 9) * period) % period) / period;
            if (t >= b("alcohol")) {
              // falling on the spore and running around it; the spore stays intact
              const x0 = 360 + (rnd(i + 2) - 0.5) * 220;
              const y = 120 + ph * 520;
              const near = Math.max(0, 1 - Math.abs(y - 360) / 70);
              const side = x0 < 360 ? -1 : 1;
              const push = Math.max(0, 74 - Math.abs(x0 - 360)) * near;
              return <ellipse key={i} cx={x0 + side * push} cy={y} rx={4} ry={7} fill={WATER} opacity={0.75 * clamp(bounce * 4)} />;
            }
            const x = 60 + rnd(i + 4) * 600;
            const y = 130 + ph * 620;
            return <ellipse key={i} cx={x} cy={y} rx={3.5} ry={7} fill={WATER} opacity={0.55} />;
          })}
        </g>
        {t >= b("alcohol") && t < b("soap") && (
          <circle cx={360} cy={360} r={70 + 6 * Math.sin(t * 10)} fill="none" stroke={SPORE} strokeWidth={3} opacity={0.5} />
        )}
      </Shot>

      {/* 5: soap and water washes spores off the hands */}
      <Shot t={t} at={at} from="soap" until="outbreak" zoom={[1, 1.03]} focus={[360, 400]}>
        <Title k={soapIn} out={0} text="SOAP + WATER" color={WATER} sub="scrubbing and rinsing help wash spores off" />
        {/* water stream */}
        <path d={`M300,140 C ${300 + 10 * Math.sin(t * 6)},300 ${330 + 14 * Math.sin(t * 5)},420 330,520 L410,520 C ${400 + 12 * Math.sin(t * 6.5)},420 ${420 + 10 * Math.sin(t * 5.5)},300 420,140 Z`} fill="url(#cd-water)" opacity={soapIn} />
        {Array.from({ length: 16 }, (_, i) => {
          const ph = ((t * 0.8 + rnd(i)) % 1);
          return <circle key={i} cx={320 + rnd(i + 3) * 80 + Math.sin(t * 3 + i) * 8} cy={150 + ph * 380} r={4 + rnd(i + 5) * 7} fill="none" stroke="#e0f2fe" strokeWidth={2} opacity={soapIn * (0.7 - ph * 0.5)} />;
        })}
        {/* the hands: a palm seen edge-on */}
        <g opacity={soapIn}>
          <path d="M40,560 Q360,500 680,560 L680,700 Q360,660 40,700 Z" fill="url(#cd-skin)" />
          <path d="M120,580 Q240,560 330,575 M390,573 Q500,560 600,582" stroke="#b9805b" strokeWidth={3} fill="none" opacity={0.6} />
          <text x={60} y={680} fontSize={18} fontWeight={800} fill="#7c4a2d" letterSpacing={1.2}>YOUR HANDS</text>
        </g>
        {/* spores sliding away with the water */}
        {[[200, 548], [300, 538], [420, 538], [520, 546], [610, 556]].map(([x, y], i) => {
          const k = clamp(wash * 1.3 - i * 0.07);
          const dx = 260 * easeIn(k) * (x > 360 ? 1 : -1);
          const dy = 140 * easeIn(k) * easeIn(k);
          return <g key={i} transform={`translate(${x + dx},${y + dy}) rotate(${80 * k * (x > 360 ? 1 : -1)})`} opacity={soapIn * (1 - easeIn(clamp(k * 1.1)))}><Spore s={0.45} glow={0.6} /></g>;
        })}
      </Shot>

      {/* 6: the outbreak rule */}
      <Shot t={t} at={at} from="outbreak" until="lock" zoom={[1, 1.03]} focus={[360, 360]}>
        <g transform="translate(50,130)">
          <rect width={620} height={460} rx={32} fill="rgba(15,23,42,0.7)" stroke="rgba(248,250,252,0.16)" filter="url(#mx4-shadow)" />
          <text x={36} y={58} fontSize={17} fontWeight={800} fill={DIM} letterSpacing={1.4}>AFTER GLOVES COME OFF</text>
          {/* everyday care */}
          <g opacity={easeOut(onWord("outbreak", "everyday", 0.5))} transform={`translate(0,${(1 - easeOut(onWord("outbreak", "everyday", 0.5))) * 12})`}>
            <rect x={24} y={86} width={572} height={150} rx={22} fill="rgba(248,250,252,0.06)" />
            <text x={52} y={128} fontSize={18} fontWeight={900} fill={WHITE} letterSpacing={1.2}>EVERYDAY CARE</text>
            <text x={52} y={178} fontSize={27} fontWeight={800} fill={WATER}>Soap and water</text>
            <text x={292} y={178} fontSize={24} fontWeight={700} fill={DIM}>or</text>
            <text x={330} y={178} fontSize={27} fontWeight={800} fill={WHITE}>alcohol rub</text>
            <text x={52} y={214} fontSize={16} fontWeight={600} fill={DIM}>either is allowed</text>
          </g>
          {/* outbreak */}
          <g opacity={easeOut(onWord("outbreak", "outbreak", 0.5))} transform={`translate(0,${(1 - easeOut(onWord("outbreak", "outbreak", 0.5))) * 12})`}>
            <rect x={24} y={256} width={572} height={150} rx={22} fill="rgba(248,113,113,0.1)" stroke={BAD} strokeOpacity={0.6} strokeWidth={2} />
            <text x={52} y={298} fontSize={18} fontWeight={900} fill="#fecaca" letterSpacing={1.2}>C. DIFF OUTBREAK</text>
            <path transform="translate(560,330) scale(0.5)" d="M0,-60 C30,-20 48,10 48,34 A48,48 0 0 1 -48,34 C-48,10 -30,-20 0,-60 Z" fill={WATER} filter="url(#mx4-glow)" />
            <text x={52} y={348} fontSize={27} fontWeight={800} fill={WATER}>Soap and water</text>
            <text x={52} y={384} fontSize={16} fontWeight={600} fill={DIM} opacity={easeOut(onWord("outbreak", "prudent", 0.5))}>the “prudent” choice</text>
          </g>
          <text x={310} y={442} fontSize={15} fontWeight={600} fill="rgba(248,250,252,0.45)" textAnchor="middle">CDC Guideline for Hand Hygiene in Health-Care Settings, 2002</text>
        </g>
      </Shot>

      {/* 7: the answer */}
      <Shot t={t} at={at} from="lock" end={duration} zoom={[1, 1]} focus={[360, 360]}>
        <Title k={lockK} out={0} text="THE ANSWER" color={SPORE} sub="alcohol can't reliably kill spores" />
        {["Clostridioides difficile", "Methicillin-resistant Staphylococcus aureus", "Pseudomonas aeruginosa", "Hepatitis B virus"].map((o, i) => {
          const right = i === 0;
          const k = clamp((t - b("lock") - 0.3 - i * 0.12) / 0.4);
          return (
            <g key={i} opacity={easeOut(k) * (right || answerK < 0.5 ? 1 : 0.4)} transform={`translate(0,${(1 - easeOut(k)) * 20})`}>
              <rect x={50} y={170 + i * 92} width={620} height={76} rx={22} fill={right && answerK > 0 ? "rgba(74,222,128,0.16)" : "rgba(15,23,42,0.6)"} stroke={right && answerK > 0 ? OK : "rgba(248,250,252,0.14)"} strokeWidth={right && answerK > 0 ? 3 : 1} filter={right && answerK > 0.5 ? "url(#mx4-glow)" : undefined} />
              <circle cx={92} cy={208 + i * 92} r={20} fill={right && answerK > 0.5 ? OK : "rgba(248,250,252,0.12)"} />
              <text x={92} y={215 + i * 92} fontSize={19} fontWeight={900} fill={right && answerK > 0.5 ? "#052e16" : DIM} textAnchor="middle">{"ABCD"[i]}</text>
              <text x={128} y={216 + i * 92} fontSize={o.length > 30 ? 21 : 25} fontWeight={800} fill={WHITE} fontStyle={i < 3 ? "italic" : undefined}>{o}</text>
            </g>
          );
        })}
        <text x={360} y={590} fontSize={20} fontWeight={700} fill={DIM} textAnchor="middle" opacity={answerK}>formerly Clostridium difficile</text>
        <text x={360} y={720} fontSize={15} fontWeight={600} fill="rgba(248,250,252,0.4)" textAnchor="middle">Sources: CDC Guideline for Hand Hygiene in Health-Care Settings (2002) · NLM MeSH</text>
      </Shot>
    </g>
  );
}
