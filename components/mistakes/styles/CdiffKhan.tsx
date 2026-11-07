import { MistakeExplainer, MistakeManifest } from "@/lib/mistakeExplainers";
import { getTigerAsset } from "@/lib/tigerAssets";
import { speaking } from "../Stage";
import { arrow, box, capsule, check, clamp, Draw, easeOut, FONTS, H, rnd, timing, W, wobblyEllipse, Write } from "./kit";

/**
 * C. diff (CRCST SPD-DEC-005), Khan Academy style: a black board, a digital
 * pen in five colours, everything written and sketched on as the voice
 * speaks, and the whole lesson left on the board at the end. Same verified
 * script as tools/mistakes/claims/crcst-cdiff-spores.json.
 */

const C = { white: "#f4f4f5", yellow: "#fde047", blue: "#7dd3fc", pink: "#f9a8d4", green: "#86efac", orange: "#fdba74", grey: "#a1a1aa" };

export function CdiffKhan({ ex, m, t }: { ex: MistakeExplainer; m: MistakeManifest; t: number }) {
  const { at, spokenEnd } = timing(m);
  const { bi, wi, talking } = speaking(m, t);
  const beat = ex.beats[bi];
  let face = beat.face;
  if (talking && (face === 3 || face === 4 || face === 5)) face = wi % 2 === 0 ? 3 : 5;
  const endK = easeOut((t - spokenEnd - 0.5) / 0.6);

  // a few drops of alcohol sketched above the spore
  const drops = [[150, 662], [205, 650], [262, 664]];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-full" role="img" aria-label={ex.beats.map((b) => b.say).join(" ")}>
      <defs>
        <style>{FONTS}</style>
        <filter id="kh-chalk" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" />
        </filter>
        <radialGradient id="kh-bg" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#1c1c1f" />
          <stop offset="100%" stopColor="#0b0b0c" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#kh-bg)" />

      <g filter="url(#kh-chalk)" opacity={1 - 0.85 * endK}>
        {/* header */}
        <Write id="exam" t={t} start={0} x={36} y={58} text="CRCST · most missed" size={26} color={C.grey} perChar={0.015} />
        {ex.medical && <Write id="draft" t={t} start={0} x={684} y={58} text="draft · not reviewed" size={22} color="#fca5a5" anchor="end" perChar={0.01} />}
        <Write id="title" t={t} start={0.15} x={36} y={128} text="Alcohol hand rub vs. germs" size={52} color={C.white} perChar={0.03} />
        <Draw t={t} start={0.9} dur={0.5} d="M38,146 Q300,138 560,148" stroke={C.white} width={3} />

        {/* 1. three germs alcohol kills */}
        <Write id="kills" t={t} start={at("hook", "kills")} x={36} y={200} text="kills these well:" size={34} color={C.yellow} perChar={0.03} />
        {/* MRSA: cocci in a cluster */}
        {[[0, 0], [24, -8], [-20, 12], [10, 22], [36, 16], [-4, -24], [-28, -10]].map(([dx, dy], i) => (
          <Draw key={i} t={t} start={0.9 + i * 0.08} dur={0.35} d={wobblyEllipse(130 + dx, 295 + dy, 13, 13, i + 3)} stroke={C.pink} width={3.5} />
        ))}
        <Write id="mrsa" t={t} start={at("hook", "mrsa")} x={130} y={372} text="MRSA" size={32} color={C.pink} anchor="middle" perChar={0.05} />
        <Draw t={t} start={at("hook", "mrsa") + 0.35} dur={0.35} d={check(185, 262, 1.1)} stroke={C.green} width={5} />
        {/* Pseudomonas: a rod */}
        <Draw t={t} start={1.4} dur={0.6} d={capsule(360, 295, 130, 46, -18, 2)} stroke={C.blue} width={3.5} />
        <Write id="pseudo" t={t} start={at("hook", "pseudomonas")} x={360} y={372} text="Pseudomonas" size={32} color={C.blue} anchor="middle" perChar={0.04} />
        <Draw t={t} start={at("hook", "pseudomonas") + 0.45} dur={0.35} d={check(440, 258, 1.1)} stroke={C.green} width={5} />
        {/* hepatitis B: a round, enveloped particle */}
        <Draw t={t} start={1.9} dur={0.5} d={wobblyEllipse(590, 295, 36, 36, 9)} stroke={C.green} width={3.5} />
        <Draw t={t} start={2.2} dur={0.5} d={wobblyEllipse(590, 295, 26, 26, 10)} stroke={C.green} width={2.5} />
        <Write id="hbv" t={t} start={at("hook", "hepatitis")} x={590} y={372} text="hepatitis B" size={32} color={C.green} anchor="middle" perChar={0.04} />
        <Draw t={t} start={at("hook", "hepatitis") + 0.5} dur={0.35} d={check(646, 256, 1.1)} stroke={C.green} width={5} />
        <Draw t={t} start={at("turn") - 0.3} dur={0.4} d="M36,412 L684,412" stroke={C.grey} width={2} dash="6 10" opacity={0.6} />

        {/* 2. C. diff, and its spore */}
        <Write id="but" t={t} start={at("turn", "but")} x={36} y={468} text="but..." size={36} color={C.white} perChar={0.05} />
        <Write id="cdiff" t={t} start={at("turn", "c")} x={130} y={468} text="C. diff" size={48} color={C.orange} perChar={0.05} />
        <Write id="cant" t={t} start={at("turn", "can't")} x={300} y={468} text="alcohol can't count on it" size={30} color={C.white} perChar={0.03} />
        <Draw t={t} start={at("turn", "c") + 0.2} dur={0.7} d={capsule(205, 575, 270, 96, 0, 5)} stroke={C.orange} width={4} />
        <Write id="rod" t={t} start={at("spore", "rod")} x={205} y={660} text="a rod" size={26} color={C.orange} anchor="middle" perChar={0.04} opacity={1 - clamp((t - at("alcohol")) / 0.4)} />
        {/* the spore forms inside the rod */}
        <Draw t={t} start={at("spore", "spore")} dur={0.5} d={wobblyEllipse(205, 575, 46, 30, 21)} stroke={C.yellow} width={4} fill={C.yellow} fillOpacity={0.18} />
        <Draw t={t} start={at("spore", "spore") + 0.3} dur={0.4} d={wobblyEllipse(205, 575, 30, 18, 22)} stroke={C.yellow} width={3} />
        <Draw t={t} start={at("spore", "spore") + 0.6} dur={0.4} d={arrow(262, 560, 380, 530)} stroke={C.white} width={3} />
        <Write id="sp1" t={t} start={at("spore", "spore") + 0.7} x={392} y={540} text="spore =" size={34} color={C.yellow} perChar={0.04} />
        <Write id="sp2" t={t} start={at("spore", "inactive")} x={410} y={584} text="• inactive" size={32} color={C.white} perChar={0.035} />
        <Write id="sp3" t={t} start={at("spore", "resists")} x={410} y={626} text="• resists heat" size={32} color={C.white} perChar={0.035} />
        {/* alcohol: very poor activity against spores */}
        {drops.map(([x, y], i) => (
          <Draw key={i} t={t} start={at("alcohol", "alcohol") + i * 0.12} dur={0.3} d={`M${x},${y - 22} C${x + 9},${y - 8} ${x + 9},${y} ${x},${y} C${x - 9},${y} ${x - 9},${y - 8} ${x},${y - 22} Z`} stroke={C.blue} width={3} />
        ))}
        <Write id="alc" t={t} start={at("alcohol", "alcohol") + 0.3} x={36} y={720} text="alcohol → very poor activity vs. spores" size={32} color={C.pink} perChar={0.025} />
        <Draw t={t} start={at("alcohol", "little")} dur={0.4} d="M300,733 Q450,742 600,733" stroke={C.pink} width={3} />
        <Draw t={t} start={at("soap") - 0.3} dur={0.4} d="M36,762 L684,762" stroke={C.grey} width={2} dash="6 10" opacity={0.6} />

        {/* 3. soap and water */}
        <Write id="soap" t={t} start={at("soap", "soap")} x={36} y={818} text="soap + water" size={44} color={C.blue} perChar={0.04} />
        <Write id="scrub" t={t} start={at("soap", "scrubbing")} x={36} y={862} text="scrubbing + rinsing help wash spores off" size={30} color={C.white} perChar={0.022} />
        {[0, 1, 2].map((i) => (
          <Draw key={i} t={t} start={at("soap", "wash") + i * 0.1} dur={0.3} d={wobblyEllipse(470 + i * 44, 808, 14, 10, 40 + i)} stroke={C.yellow} width={3} />
        ))}
        <Draw t={t} start={at("soap", "off")} dur={0.4} d={arrow(605, 808, 680, 790, -0.1)} stroke={C.blue} width={3.5} />

        {/* 4. the rule after gloves, from the 2002 CDC guideline */}
        <Draw t={t} start={at("outbreak", "everyday") - 0.2} dur={0.6} d={box(28, 892, 664, 148, 3)} stroke={C.grey} width={2.5} />
        <Write id="after" t={t} start={at("outbreak", "everyday") - 0.1} x={48} y={926} text="after gloves (CDC guideline, 2002):" size={24} color={C.grey} perChar={0.02} />
        <Write id="every" t={t} start={at("outbreak", "everyday")} x={48} y={968} text="everyday: soap + water  OR  alcohol rub" size={31} color={C.white} perChar={0.022} />
        <Write id="out" t={t} start={at("outbreak", "outbreak")} x={48} y={1016} text="C. diff outbreak: soap + water (prudent)" size={31} color={C.orange} perChar={0.022} />

        {/* 5. the answer */}
        <Write id="ans" t={t} start={at("lock", "answer")} x={48} y={1102} text="Answer: C. diff" size={46} color={C.green} perChar={0.04} />
        <Write id="ans2" t={t} start={at("lock", "clostridioides")} x={50} y={1146} text="(Clostridioides difficile)" size={30} color={C.green} perChar={0.03} italic />
        <Draw t={t} start={at("lock", "answer") + 0.6} dur={0.6} d={box(30, 1058, 400, 106, 8)} stroke={C.green} width={3.5} />
      </g>

      {/* the tiger, small, in the corner */}
      <image href={getTigerAsset(ex.examId, face)} x={W - 178} y={1080} width={160} height={170} preserveAspectRatio="xMidYMax meet" opacity={1 - endK} />
      <text x={36} y={1250} fontSize={22} fontWeight={700} fill={C.grey} fontFamily="TT Caveat" opacity={1 - endK}>tigertest.io</text>

      {/* end card, written on the same board */}
      {endK > 0 && (
        <g filter="url(#kh-chalk)">
          <image href={getTigerAsset(ex.examId, 2)} x={235} y={330} width={250} height={250} preserveAspectRatio="xMidYMid meet" opacity={endK} />
          <Write id="e1" t={t} start={spokenEnd + 0.7} x={360} y={680} text="Tigertest" size={88} color={C.white} anchor="middle" perChar={0.05} />
          <Write id="e2" t={t} start={spokenEnd + 1.2} x={360} y={750} text="Get ready for the CRCST" size={40} color={C.yellow} anchor="middle" perChar={0.03} />
          <Write id="e3" t={t} start={spokenEnd + 1.8} x={360} y={800} text="4 full practice tests + practice sets" size={30} color={C.white} anchor="middle" perChar={0.02} />
          <Write id="e4" t={t} start={spokenEnd + 2.3} x={360} y={880} text="tigertest.io" size={48} color={C.blue} anchor="middle" perChar={0.04} />
          <Draw t={t} start={spokenEnd + 2.6} dur={0.4} d="M250,898 Q360,906 470,896" stroke={C.blue} width={3} />
        </g>
      )}
      {/* subtle grain */}
      <rect width={W} height={H} fill="#fff" opacity={0.012 + 0.006 * rnd(Math.floor(t * 12))} pointerEvents="none" />
    </svg>
  );
}
