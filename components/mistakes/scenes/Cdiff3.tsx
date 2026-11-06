import { MistakeManifest } from "@/lib/mistakeExplainers";
import { sceneHelpers } from "../Stage";
import { INK, Note, SOFT } from "../Stage2";
import { brandFor, easeBack, easeOut, SceneProps3, Shot, SoundCue } from "../Stage3";
import { AnswerCard, GOOD, OptionGrid, QuoteCard } from "./medParts";

/**
 * CRCST SPD-DEC-005: which pathogen forms spores that alcohol hand rubs do
 * not reliably kill. Every line and label is in
 * tools/mistakes/claims/crcst-cdiff-spores.json, quoted from CDC's Guideline
 * for Hand Hygiene in Health-Care Settings (MMWR 2002;51(RR-16)) and the
 * NCBI Taxonomy record for Clostridioides difficile. Draft until reviewed.
 */

const OPTIONS = ["Clostridioides difficile", "Methicillin-resistant Staphylococcus aureus", "Pseudomonas aeruginosa", "Hepatitis B virus"];
const CDC = "CDC · Hand Hygiene Guideline, 2002";

function Bottle({ x, y, k }: { x: number; y: number; k: number }) {
  if (k <= 0) return null;
  return (
    <g opacity={Math.min(1, k * 1.5)} transform={`translate(${x},${y}) scale(${0.85 + 0.15 * easeBack(k)})`}>
      <rect x={-12} y={-118} width={24} height={34} rx={4} fill="#94a3b8" />
      <path d="M12,-108 h40 v12 h-40 z" fill="#94a3b8" />
      <rect x={-48} y={-84} width={96} height={170} rx={22} fill="#e0f2fe" stroke={INK} strokeWidth={4} />
      <rect x={-34} y={-30} width={68} height={58} rx={8} fill="#fff" stroke={INK} strokeOpacity={0.3} strokeWidth={2} />
      <text y={-6} fontSize={14} fontWeight={800} fill={INK} textAnchor="middle">HAND</text>
      <text y={14} fontSize={14} fontWeight={800} fill={INK} textAnchor="middle">RUB</text>
    </g>
  );
}

function Soap({ x, y, k }: { x: number; y: number; k: number }) {
  if (k <= 0) return null;
  return (
    <g opacity={Math.min(1, k * 1.5)} transform={`translate(${x},${y}) scale(${0.85 + 0.15 * easeBack(k)})`}>
      <rect x={-70} y={-30} width={140} height={70} rx={30} fill="#fde68a" stroke={INK} strokeWidth={4} />
      {[[-40, -60, 14], [0, -78, 18], [44, -58, 12], [-14, -104, 10]].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy - 10 * k} r={r} fill="#fff" stroke={INK} strokeOpacity={0.35} strokeWidth={2} />
      ))}
      {[-30, 0, 30].map((dx, i) => (
        <path key={i} d={`M${dx},${70 + ((i * 17) % 20)} q-8,14 0,20 q8,-6 0,-20 z`} fill="#60a5fa" />
      ))}
    </g>
  );
}

function Glove({ x, y, k }: { x: number; y: number; k: number }) {
  if (k <= 0) return null;
  return (
    <g opacity={Math.min(1, k * 1.5)} transform={`translate(${x},${y}) scale(${0.85 + 0.15 * easeBack(k)})`}>
      <path d="M-46,80 L-46,-10 Q-60,-30 -58,-70 Q-56,-84 -44,-82 Q-34,-80 -34,-60 L-34,-96 Q-32,-110 -20,-110 Q-8,-110 -8,-96 L-8,-112 Q-6,-126 6,-126 Q18,-126 18,-112 L18,-100 Q20,-114 32,-114 Q44,-112 44,-98 L44,-70 Q46,-82 56,-80 Q66,-76 64,-60 L56,20 Q50,60 46,80 Z"
        fill="#a5b4fc" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <rect x={-52} y={70} width={104} height={22} rx={6} fill="#818cf8" stroke={INK} strokeWidth={4} />
    </g>
  );
}

export function CdiffScene3(props: SceneProps3) {
  const { t, at, duration } = props;
  const { onWord } = sceneHelpers(props);
  const brand = brandFor("crcst");
  const pop = (s: number, d = 0.5) => Math.max(0, Math.min(1, (t - s) / d));

  const reveal = easeOut(pop(at("answer").start, 0.6));
  const lockT = at("lock").start;
  const after = onWord("after", "after", 0.5);
  const outbreak = onWord("after", "during", 0.5);

  return (
    <g>
      {/* 1. the four options; the answer lights up */}
      <Shot t={t} at={at} from="hook" until="answer" zoom={[1, 1.03]} focus={[360, 300]}>
        <OptionGrid options={OPTIONS} keyIndex={0} k={pop(at("hook").start + 0.1, 1.2)} reveal={reveal} y={70} />
      </Shot>

      {/* 2. the name, old and new */}
      <Shot t={t} at={at} from="answer" until="spores" zoom={[1, 1.04]} focus={[360, 300]}>
        <text x={360} y={210} fontSize={48} fontWeight={800} fontStyle="italic" fill={GOOD} textAnchor="middle" opacity={easeOut(pop(at("answer").start, 0.5))}>Clostridioides difficile</text>
        <Note x={360} y={300} k={onWord("answer", "known", 0.5)} size={26} color={SOFT}>also known as</Note>
        <Note x={360} y={360} k={onWord("answer", "clostridium", 0.5)} size={38} color={INK}><tspan fontStyle="italic">Clostridium difficile</tspan></Note>
        <Note x={360} y={450} k={onWord("answer", "or", 0.5)} size={38} color={INK}><tspan fontStyle="italic">C. difficile</tspan></Note>
        <Note x={360} y={560} k={pop(at("answer").start + 0.8, 0.5)} size={18} color={SOFT} weight={700}>NCBI TAXONOMY</Note>
      </Shot>

      {/* 3. the guideline: spore-forming bacteria */}
      <Shot t={t} at={at} from="spores" until="why" zoom={[1, 1.03]} focus={[360, 300]}>
        <QuoteCard y={90} source={CDC} brand={brand} k={pop(at("spores").start, 0.6)} mark="spore-forming bacteria"
          quote="…diarrhea caused by Clostridium difficile … has raised concern regarding the activity of antiseptic agents against spore-forming bacteria." />
      </Shot>

      {/* 4. not reliably sporicidal */}
      <Shot t={t} at={at} from="why" until="soap" zoom={[1, 1.03]} focus={[360, 300]}>
        <Bottle x={360} y={150} k={pop(at("why").start, 0.6)} />
        <QuoteCard y={280} source={CDC} brand={brand} k={pop(at("why").start + 0.4, 0.6)} size={25} mark="reliably sporicidal"
          quote="None of the agents (including alcohols, …) used in antiseptic handwash or antiseptic hand-rub preparations are reliably sporicidal against Clostridium spp." />
      </Shot>

      {/* 5. soap and water */}
      <Shot t={t} at={at} from="soap" until="gloves" zoom={[1, 1.03]} focus={[360, 300]}>
        <Soap x={360} y={170} k={pop(at("soap").start, 0.6)} />
        <QuoteCard y={330} source={CDC} brand={brand} k={pop(at("soap").start + 0.4, 0.6)} mark="physically remove spores"
          quote="Washing hands with … soap and water may help to physically remove spores from the surface of contaminated hands." />
      </Shot>

      {/* 6. gloves, then what to use after */}
      <Shot t={t} at={at} from="gloves" until="lock" zoom={[1, 1.02]} focus={[360, 300]}>
        <Glove x={150} y={175} k={pop(at("gloves").start, 0.6)} />
        <QuoteCard x={260} w={420} y={50} size={23} source={CDC} brand={brand} k={pop(at("gloves").start + 0.3, 0.6)} mark="wear gloves"
          quote="HCWs should be encouraged to wear gloves when caring for patients with C. difficile-associated diarrhea." />
        <g opacity={easeOut(after)} transform={`translate(0,${(1 - easeOut(after)) * 16})`}>
          <rect x={40} y={330} width={640} height={110} rx={20} fill="#fff" filter="url(#mx3-shadow)" />
          <text x={70} y={372} fontSize={18} fontWeight={800} fill={brand} letterSpacing={1.4}>AFTER GLOVES ARE REMOVED</text>
          <text x={70} y={414} fontSize={28} fontWeight={800} fill={INK}>Soap and water, or alcohol-based hand rub</text>
        </g>
        <g opacity={easeOut(outbreak)} transform={`translate(0,${(1 - easeOut(outbreak)) * 16})`}>
          <rect x={40} y={460} width={640} height={110} rx={20} fill="#fff" stroke={GOOD} strokeWidth={4} filter="url(#mx3-shadow)" />
          <text x={70} y={502} fontSize={18} fontWeight={800} fill={GOOD} letterSpacing={1.4}>DURING C. DIFFICILE OUTBREAKS</text>
          <text x={70} y={544} fontSize={28} fontWeight={800} fill={INK}>Soap and water is prudent</text>
        </g>
      </Shot>

      {/* the answer */}
      <Shot t={t} at={at} from="lock" end={duration} zoom={[1, 1]} focus={[360, 300]}>
        <text x={360} y={250} fontSize={46} fontWeight={800} fontStyle="italic" fill={INK} textAnchor="middle">Clostridioides difficile</text>
        <AnswerCard k={pop(lockT, 0.55)} text="A. Clostridioides difficile" y={360} />
      </Shot>
    </g>
  );
}

/** No sound cues (the effects read as noise). */
export function cdiffCues(_m: MistakeManifest): SoundCue[] {
  return [];
}
