import { MistakeManifest } from "@/lib/mistakeExplainers";
import { sceneHelpers } from "../Stage";
import { INK, Note, SOFT } from "../Stage2";
import { brandFor, easeBack, easeOut, SceneProps3, Shot, SoundCue } from "../Stage3";
import { AnswerCard, OptionGrid, QuoteCard } from "./medParts";

/**
 * PTCB-MED-010: Januvia (sitagliptin)'s drug class. Every line and label is
 * in tools/mistakes/claims/ptcb-gliptin.json, quoted from WHO's 2024 INN
 * stem book and the FDA labels for Januvia and Jardiance (DailyMed).
 * Draft until reviewed.
 */

const OPTIONS = ["DPP-4 inhibitor", "Thiazolidinedione", "Biguanide", "SGLT2 inhibitor"];

export function GliptinScene3(props: SceneProps3) {
  const { t, at, duration } = props;
  const { onWord } = sceneHelpers(props);
  const brand = brandFor("ptcb");
  const pop = (s: number, d = 0.5) => Math.max(0, Math.min(1, (t - s) / d));

  const word = pop(at("ending").start, 0.6);
  const whole = onWord("ending", "whole", 0.5);
  const gli = onWord("ending", "gli", 0.4);
  const r1 = onWord("others", "two", 0.5);
  const r2 = onWord("others", "gliflozin", 0.5);
  const r2b = onWord("others", "jardiance", 0.5);
  const r3 = onWord("others", "glitazone", 0.5);
  const lockT = at("lock").start;

  return (
    <g>
      {/* 1. the four options */}
      <Shot t={t} at={at} from="hook" until="ending" zoom={[1, 1.03]} focus={[360, 300]}>
        <OptionGrid options={OPTIONS} keyIndex={0} k={pop(at("hook").start + 0.1, 1.2)} reveal={0} y={70} />
      </Shot>

      {/* 2. the name, and its whole ending */}
      <Shot t={t} at={at} from="ending" until="stem" zoom={[1, 1.06]} focus={[360, 300]}>
        <g opacity={easeOut(word)} transform={`translate(360,300) scale(${0.9 + 0.1 * easeBack(word)}) translate(-360,-300)`}>
          <text x={360} y={320} fontSize={92} fontWeight={800} fill={INK} textAnchor="middle" letterSpacing={1}>
            sita<tspan fill={brand}>gliptin</tspan>
          </text>
        </g>
        {/* the whole ending boxed */}
        <rect x={327} y={232} width={320} height={118} rx={18} fill="none" stroke={brand} strokeWidth={6} opacity={easeOut(whole)} />
        <Note x={487} y={410} k={whole} size={30} color={brand}>-gliptin</Note>
        {/* not just "gli" */}
        <g opacity={easeOut(gli)}>
          <rect x={232} y={470} width={256} height={64} rx={32} fill="#fff" filter="url(#mx3-shadow)" />
          <text x={360} y={512} fontSize={28} fontWeight={800} fill={SOFT} textAnchor="middle">not just “gli”</text>
        </g>
        <Note x={360} y={120} k={word} size={22} color={SOFT} weight={700}>JANUVIA (sitagliptin)</Note>
      </Shot>

      {/* 3. WHO's stem book */}
      <Shot t={t} at={at} from="stem" until="label" zoom={[1, 1.03]} focus={[360, 300]}>
        <QuoteCard y={40} source="WHO · INN stems, 2024 · -gliptin" brand={brand} k={pop(at("stem").start, 0.6)} mark="sitagliptin"
          quote="… saxagliptin (92), sitagliptin (94), teneligliptin (99) …" />
        <QuoteCard y={300} source="WHO · INN stems, 2024" brand={brand} k={onWord("stem", "stem", 0.6)} mark="pharmacologically related group"
          quote="Stems define the pharmacologically related group to which the INN belongs." />
      </Shot>

      {/* 4. the FDA label */}
      <Shot t={t} at={at} from="label" until="others" zoom={[1, 1.04]} focus={[360, 300]}>
        <QuoteCard y={150} source="FDA label · Januvia (DailyMed)" brand={brand} k={pop(at("label").start, 0.6)} size={29} mark="dipeptidyl peptidase-4 (DPP-4) inhibitor"
          quote="JANUVIA is a dipeptidyl peptidase-4 (DPP-4) inhibitor …" />
      </Shot>

      {/* 5. the endings behind the other answers */}
      <Shot t={t} at={at} from="others" until="lock" zoom={[1, 1.02]} focus={[360, 300]}>
        {[
          { k: r1, y: 40, stem: "-gliptin", what: "Januvia (sitagliptin): DPP-4 inhibitor", note: "FDA label, Januvia", key: true },
          { k: r2, y: 205, stem: "-gliflozin", what: "sodium glucose co-transporter inhibitors", note: "WHO INN stems" },
          { k: r3, y: 450, stem: "-glitazone", what: "thiazolidinedione derivatives", note: "WHO INN stems" },
        ].map((r) => (
          <g key={r.stem} opacity={easeOut(r.k)} transform={`translate(0,${(1 - easeOut(r.k)) * 14})`}>
            <rect x={40} y={r.y} width={640} height={r.stem === "-gliflozin" ? 220 : 150} rx={22} fill="#fff" stroke={r.key ? "#15803d" : "none"} strokeWidth={4} filter="url(#mx3-shadow)" />
            <text x={70} y={r.y + 56} fontSize={40} fontWeight={800} fill={brand}>{r.stem}</text>
            <text x={70} y={r.y + 102} fontSize={27} fontWeight={800} fill={INK}>{r.what}</text>
            <text x={650} y={r.y + 46} fontSize={15} fontWeight={800} fill={SOFT} textAnchor="end" letterSpacing={1}>{r.note.toUpperCase()}</text>
          </g>
        ))}
        <g opacity={easeOut(r2b)}>
          <text x={70} y={355} fontSize={25} fontWeight={700} fill={SOFT}>Jardiance (empagliflozin):</text>
          <text x={70} y={392} fontSize={27} fontWeight={800} fill={INK}>an SGLT2 inhibitor</text>
          <text x={650} y={392} fontSize={15} fontWeight={800} fill={SOFT} textAnchor="end" letterSpacing={1}>FDA LABEL, JARDIANCE</text>
        </g>
      </Shot>

      {/* the answer */}
      <Shot t={t} at={at} from="lock" end={duration} zoom={[1, 1]} focus={[360, 300]}>
        <text x={360} y={250} fontSize={60} fontWeight={800} fill={INK} textAnchor="middle">sita<tspan fill={brand}>gliptin</tspan></text>
        <AnswerCard k={pop(lockT, 0.55)} text="A. DPP-4 inhibitor" y={360} />
      </Shot>
    </g>
  );
}

export function gliptinCues(_m: MistakeManifest): SoundCue[] {
  return [];
}
