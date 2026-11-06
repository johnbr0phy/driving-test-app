import { MistakeManifest } from "@/lib/mistakeExplainers";
import { sceneHelpers } from "../Stage";
import { INK, Note, SOFT } from "../Stage2";
import { brandFor, easeBack, easeInOut, easeOut, SceneProps3, Shot, SoundCue } from "../Stage3";
import { AnswerCard, OptionGrid } from "./medParts";

/**
 * CCMA-ANP-005: the heart's natural pacemaker. Every line and label is in
 * tools/mistakes/claims/ccma-sa-node.json, quoted from NHLBI (How the Heart
 * Beats; Conduction Disorders), the NCI SEER training module (Physiology of
 * the Heart) and NLM MeSH (Bundle of His, Purkinje Fibers). Draft until
 * reviewed.
 *
 * The drawing is a schematic front view, the patient's right on the
 * viewer's left: SA node high in the right atrium; AV node on the right
 * atrium side of the lower interatrial septum, just above the
 * interventricular septum; the bundle of His continues straight down the
 * septum from it, then the signal spreads into both ventricle walls.
 */

const OPTIONS = ["Sinoatrial (SA) node", "Atrioventricular (AV) node", "Bundle of His", "Purkinje fibers"];

// geometry (scene box 720 x 680)
const RA = "M180,250 Q160,130 230,100 Q300,80 345,120 L352,268 Z";
const LA = "M372,268 L378,120 Q430,85 500,105 Q560,130 545,268 Z";
const VENT = "M178,282 L548,282 Q560,430 470,540 Q420,600 398,610 Q370,600 300,540 Q190,440 178,282 Z";
const SEPTUM = "M362,282 Q368,450 398,606";
const SA: [number, number] = [238, 128];
const AV: [number, number] = [348, 262];
const APEX: [number, number] = [398, 600];
const WALL_L = "M398,600 Q260,520 200,300";
const WALL_R = "M398,600 Q540,500 540,300";

function Dot({ at, k, color, r = 13 }: { at: [number, number]; k: number; color: string; r?: number }) {
  if (k <= 0) return null;
  return (
    <g>
      <circle cx={at[0]} cy={at[1]} r={r + 18 * (1 - k)} fill={color} opacity={0.25 * k} />
      <circle cx={at[0]} cy={at[1]} r={r} fill={color} stroke="#fff" strokeWidth={3} opacity={Math.min(1, k * 1.5)} />
    </g>
  );
}

/** Where a pulse is along a straight line from a to b at progress u. */
const lerp = (a: [number, number], b: [number, number], u: number): [number, number] => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];

export function SaNodeScene3(props: SceneProps3) {
  const { t, at, duration } = props;
  const { onWord } = sceneHelpers(props);
  const brand = brandFor("ccma");
  const SIG = "#f59e0b";
  const pop = (s: number, d = 0.5) => Math.max(0, Math.min(1, (t - s) / d));

  const heartIn = easeOut(pop(at("mixup").start - 0.1, 0.7));
  const saLbl = onWord("mixup", "sa", 0.5);
  const avLbl = onWord("mixup", "av", 0.5);
  const both = onWord("mixup", "both", 0.5);
  const startK = pop(at("start").start, 0.6);
  const raLbl = onWord("start", "right", 0.5);
  // the signal: across the atria, to the AV node, then down
  const atria = easeInOut(onWord("travel", "travels", 1.4));
  const toAv = easeInOut(onWord("travel", "then", 0.9));
  const slow = onWord("travel", "slows", 0.5);
  const septum = easeInOut(onWord("down", "extends", 1.2));
  const walls = easeInOut(onWord("down", "purkinje", 1.2));
  const squeeze = onWord("pump", "contract", 0.8);
  const again = onWord("pump", "again", 0.6);
  const trickK = onWord("trick", "start", 0.5);
  const lockT = at("lock").start;
  const sq = 1 - 0.05 * Math.sin(Math.PI * squeeze);

  const pulse = t >= at("travel").start && t < at("down").start ? lerp(SA, AV, toAv) : null;

  return (
    <g>
      {/* 1. the four options */}
      <Shot t={t} at={at} from="hook" until="mixup" zoom={[1, 1.03]} focus={[360, 300]}>
        <OptionGrid options={OPTIONS} keyIndex={0} k={pop(at("hook").start + 0.1, 1.2)} reveal={0} y={70} />
      </Shot>

      {/* 2. the heart, from the mix-up to the trick */}
      <Shot t={t} at={at} from="mixup" until="lock" zoom={[1, 1.04]} focus={[360, 330]}>
        <g opacity={heartIn}>
          {/* chambers */}
          <path d={RA} fill="#fecaca" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <path d={LA} fill="#fecaca" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <g transform={`translate(363,300) scale(${sq}) translate(-363,-300)`}>
            <path d={VENT} fill="#fca5a5" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
            <path d={SEPTUM} fill="none" stroke={INK} strokeWidth={3} strokeOpacity={0.45} />
          </g>
          {/* the atria light up as the signal crosses them */}
          <path d={RA} fill={SIG} opacity={0.35 * atria * (1 - pop(at("down").start, 0.6))} />
          <path d={LA} fill={SIG} opacity={0.35 * atria * (1 - pop(at("down").start, 0.6))} />
          {/* bundle of His down the septum, then into both walls */}
          <path d={`M${AV[0]},${AV[1]} L362,282 ${SEPTUM.slice(1).replace(/^362,282 /, "")}`} fill="none" stroke={SIG} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={`${septum} 1`} />
          {walls > 0 && (
            <g fill="none" stroke={SIG} strokeWidth={7} strokeLinecap="round">
              <path d={WALL_L} pathLength={1} strokeDasharray={`${walls} 1`} />
              <path d={WALL_R} pathLength={1} strokeDasharray={`${walls} 1`} />
            </g>
          )}
          {/* labels (all from the sources) */}
          <Note x={150} y={60} k={raLbl} size={22} color={INK} anchor="middle" weight={800}>Right atrium</Note>
          <Note x={590} y={70} k={raLbl} size={22} color={INK} anchor="middle" weight={800}>Left atrium</Note>
          <Note x={110} y={470} k={atria} size={22} color={INK} anchor="middle" weight={800}>Right</Note>
          <Note x={110} y={496} k={atria} size={22} color={INK} anchor="middle" weight={800}>ventricle</Note>
          <Note x={618} y={440} k={atria} size={22} color={INK} anchor="middle" weight={800}>Left</Note>
          <Note x={618} y={466} k={atria} size={22} color={INK} anchor="middle" weight={800}>ventricle</Note>
          {/* bundle of His and Purkinje labels sit under the heart, with leader lines, until the pump */}
          <g opacity={septum * (1 - pop(at("pump").start, 0.4))}>
            <line x1={250} y1={628} x2={372} y2={440} stroke="#b45309" strokeWidth={2.5} strokeDasharray="6 5" />
            <Note x={190} y={652} k={1} size={22} color="#b45309" anchor="middle" weight={800}>Bundle of His</Note>
          </g>
          <g opacity={walls * (1 - pop(at("pump").start, 0.4))}>
            <line x1={540} y1={628} x2={515} y2={480} stroke="#b45309" strokeWidth={2.5} strokeDasharray="6 5" />
            <Note x={560} y={652} k={1} size={22} color="#b45309" anchor="middle" weight={800}>Purkinje fibers</Note>
          </g>
        </g>
        {/* the two nodes */}
        <Dot at={SA} k={Math.max(saLbl, startK > 0 ? 1 : 0)} color={brand} r={14 + 4 * Math.sin(Math.PI * startK)} />
        <Dot at={AV} k={avLbl} color="#64748b" />
        {/* node labels outside the outline, with leader lines */}
        <g opacity={saLbl}>
          <line x1={110} y1={150} x2={SA[0] - 14} y2={SA[1] + 4} stroke={brand} strokeWidth={2.5} />
          <Note x={78} y={178} k={1} size={26} color={brand} anchor="middle">SA node</Note>
        </g>
        <g opacity={avLbl}>
          <line x1={120} y1={322} x2={AV[0] - 12} y2={AV[1] + 6} stroke="#475569" strokeWidth={2.5} />
          <Note x={78} y={346} k={1} size={26} color="#475569" anchor="middle">AV node</Note>
        </g>
        {/* "both are pacemaker cells" */}
        <g opacity={both * (1 - pop(at("start").start, 0.4))}>
          <rect x={200} y={622} width={320} height={46} rx={23} fill="#fff" filter="url(#mx3-shadow)" />
          <text x={360} y={652} fontSize={22} fontWeight={800} fill={INK} textAnchor="middle">Both: pacemaker cells</text>
        </g>
        {/* "starts here" */}
        <g opacity={startK * (1 - pop(at("travel").start, 0.4))}>
          <rect x={160} y={622} width={400} height={46} rx={23} fill={brand} />
          <text x={360} y={652} fontSize={22} fontWeight={800} fill="#fff" textAnchor="middle">The signal starts in the SA node</text>
        </g>
        {pulse && <circle cx={pulse[0]} cy={pulse[1]} r={11} fill={SIG} stroke="#fff" strokeWidth={3} />}
        <g opacity={slow * (1 - pop(at("down").start, 0.4))}>
          <rect x={210} y={622} width={300} height={46} rx={23} fill="#fff" filter="url(#mx3-shadow)" />
          <text x={360} y={652} fontSize={22} fontWeight={800} fill="#b45309" textAnchor="middle">Slows down slightly</text>
        </g>
        {/* back to the SA node */}
        {again > 0 && <circle cx={SA[0]} cy={SA[1]} r={14 + 40 * again} fill="none" stroke={brand} strokeWidth={4} opacity={1 - again} />}
        {/* the trick */}
        <g opacity={easeOut(trickK)} transform={`translate(360,645) scale(${0.85 + 0.15 * easeBack(trickK)}) translate(-360,-645)`}>
          <rect x={150} y={616} width={420} height={58} rx={29} fill={brand} filter="url(#mx3-sign-shadow)" />
          <text x={360} y={655} fontSize={30} fontWeight={800} fill="#fff" textAnchor="middle">S-A node: S for Start</text>
        </g>
      </Shot>

      {/* the answer */}
      <Shot t={t} at={at} from="lock" end={duration} zoom={[1, 1]} focus={[360, 300]}>
        <Note x={360} y={250} k={1} size={40} color={INK}>Sinoatrial (SA) node</Note>
        <Note x={360} y={300} k={1} size={22} color={SOFT} weight={700}>the pacemaker of the heart</Note>
        <AnswerCard k={pop(lockT, 0.55)} text="A. Sinoatrial (SA) node" y={380} />
      </Shot>
    </g>
  );
}

export function saNodeCues(_m: MistakeManifest): SoundCue[] {
  return [];
}
