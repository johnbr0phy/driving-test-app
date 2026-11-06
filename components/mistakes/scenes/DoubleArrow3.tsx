import { MistakeManifest } from "@/lib/mistakeExplainers";
import { sceneHelpers } from "../Stage";
import { CurveArrow, GREEN, INK, Note, ORANGE, RED, SOFT } from "../Stage2";
import { Card, easeBack, easeOut, SceneProps3, Shot, Sign3, SoundCue } from "../Stage3";

/**
 * DMV U-019, the double arrow sign (MUTCD W12-1), premium pass: the same
 * drawing as DoubleArrow2 (checked against FHWA Standard Highway Signs,
 * Warning chapter, page 2-105, https://mutcd.fhwa.dot.gov/SHSe/Warning.pdf),
 * shot by shot with a camera, card shadows and sound cues.
 */

const VP = [360, 130];
const ISLAND = "M314,500 L350,300 Q360,292 370,300 L406,500 Q360,532 314,500 Z";

export function DoubleArrowScene3(props: SceneProps3) {
  const { t, at, duration } = props;
  const { onWord } = sceneHelpers(props);
  const pop = (s: number, d = 0.5) => Math.max(0, Math.min(1, (t - s) / d));

  const merge = onWord("trap", "merging", 0.5);
  const twoWay = onWord("trap", "two-way", 0.5);
  const differ = onWord("trap", "different", 0.45);
  const left = onWord("arrows", "left", 0.6);
  const right = onWord("arrows", "right", 0.6);
  const island = onWord("island", "island", 0.6);
  const ways = onWord("island", "ways", 1.1);
  const fork = onWord("trick", "fork", 0.5);
  const lockT = at("lock").start;

  return (
    <g>
      {/* 1. the sign, big, with a question mark */}
      <Shot t={t} at={at} from="hook" until="trap" zoom={[1, 1.07]} focus={[360, 320]}>
        <Sign3 name="double-arrow" x={360} y={320} size={420} k={pop(at("hook").start + 0.05, 0.7)} />
        <g opacity={easeOut(pop(at("hook").start + 0.8, 0.3))} transform={`translate(565,138) scale(${0.6 + 0.4 * easeBack(pop(at("hook").start + 0.8, 0.45))})`}>
          <circle r={44} fill={RED} filter="url(#mx3-sign-shadow)" />
          <text y={17} fontSize={50} fontWeight={900} fill="#fff" textAnchor="middle">?</text>
        </g>
      </Shot>

      {/* 2. not merge, not two-way traffic */}
      <Shot t={t} at={at} from="trap" until="arrows" zoom={[1, 1.03]} focus={[360, 300]}>
        <Note x={360} y={60} k={1} size={30} color={SOFT}>It is not one of these:</Note>
        {[
          { k: merge, x: 190, name: "merge", label: "Merge" },
          { k: twoWay, x: 530, name: "two-way-traffic", label: "Two-way traffic" },
        ].map((c) => {
          const s = 0.9 + 0.1 * easeBack(c.k);
          return (
            <g key={c.name} opacity={Math.max(0.15, Math.min(1, c.k * 1.5))} transform={`translate(${c.x},280) scale(${s}) translate(${-c.x},-280)`}>
              <Card x={c.x - 150} y={100} w={300} h={360} />
              <Sign3 name={c.name} x={c.x} y={250} size={210} shadow={false} />
              <text x={c.x} y={420} fontSize={30} fontWeight={800} fill={INK} textAnchor="middle">{c.label}</text>
              {differ > 0 && (
                <g stroke={RED} strokeWidth={12} strokeLinecap="round" fill="none">
                  <path d={`M${c.x - 95},155 L${c.x + 95},345`} pathLength={1} strokeDasharray={`${Math.min(1, differ * 2)} 1`} />
                  <path d={`M${c.x + 95},155 L${c.x - 95},345`} pathLength={1} strokeDasharray={`${Math.max(0, differ * 2 - 1)} 1`} />
                </g>
              )}
            </g>
          );
        })}
        <Sign3 name="double-arrow" x={360} y={570} size={170} k={pop(wordAt0(props, "trap", "different") + 0.5, 0.5)} />
      </Shot>

      {/* 3. look closely: the camera pushes in on two separate arrows */}
      <Shot t={t} at={at} from="arrows" until="island" zoom={[1, 1.1]} focus={[360, 390]}>
        <Sign3 name="double-arrow" x={360} y={300} size={440} k={1} />
        <circle cx={360 - 220 + 0.32 * 440} cy={300 - 220 + 0.47 * 440} r={78} fill="none" stroke={ORANGE} strokeWidth={7} pathLength={1} strokeDasharray={`${left} 1`} strokeLinecap="round" />
        <circle cx={360 - 220 + 0.68 * 440} cy={300 - 220 + 0.47 * 440} r={78} fill="none" stroke={ORANGE} strokeWidth={7} pathLength={1} strokeDasharray={`${right} 1`} strokeLinecap="round" />
        <CurveArrow d="M215,400 Q170,480 115,540" k={left} color={ORANGE} w={9} head={[115, 540, 130]} />
        <CurveArrow d="M505,400 Q550,480 605,540" k={right} color={ORANGE} w={9} head={[605, 540, 50]} />
        <Note x={175} y={605} k={left} size={30} color={ORANGE}>down-left</Note>
        <Note x={545} y={605} k={right} size={30} color={ORANGE}>down-right</Note>
      </Shot>

      {/* 4. the driver's view: starts close on the island, pulls back */}
      <Shot t={t} at={at} from="island" end={duration} zoom={[1.18, 1]} focus={[360, 420]}>
        <line x1={0} y1={VP[1]} x2={720} y2={VP[1]} stroke={INK} strokeOpacity={0.25} strokeWidth={2} />
        <path d={`M-60,680 L${VP[0] - 22},${VP[1]} L${VP[0] + 22},${VP[1]} L780,680 Z`} fill="#d5d2c9" />
        <path d={`M-60,680 L${VP[0] - 22},${VP[1]} M780,680 L${VP[0] + 22},${VP[1]}`} stroke="#fff" strokeWidth={8} />
        <g opacity={island} transform={`translate(360,500) scale(${0.92 + 0.08 * easeBack(island)}) translate(-360,-500)`}>
          <path d={ISLAND} fill="#f3dc8a" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <path d="M328,470 L354,320 M345,490 L359,315 M375,490 L366,320 M392,470 L366,325" stroke={INK} strokeOpacity={0.25} strokeWidth={3} />
          <path d={`M360,290 L${VP[0]},${VP[1] + 6}`} stroke="#f5c518" strokeWidth={5} strokeDasharray="18 16" />
          <line x1={360} y1={505} x2={360} y2={445} stroke={INK} strokeWidth={6} />
          <Sign3 name="double-arrow" x={360} y={395} size={120} k={1} />
        </g>
        <CurveArrow d="M300,660 Q170,470 330,270" k={ways} color={GREEN} w={16} head={[330, 270, -51]} />
        <CurveArrow d="M420,660 Q550,470 390,270" k={ways} color={GREEN} w={16} head={[390, 270, -129]} />
        <g opacity={Math.min(1, fork * 1.5)} transform={`translate(130,348) scale(${0.7 + 0.3 * easeBack(fork)})`}>
          <rect x={-78} y={-34} width={156} height={50} rx={25} fill="#fff" filter="url(#mx3-shadow)" />
          <text y={2} fontSize={30} fontWeight={800} fill={GREEN} textAnchor="middle">LEFT ✓</text>
        </g>
        <g opacity={Math.min(1, fork * 1.5)} transform={`translate(590,348) scale(${0.7 + 0.3 * easeBack(fork)})`}>
          <rect x={-86} y={-34} width={172} height={50} rx={25} fill="#fff" filter="url(#mx3-shadow)" />
          <text y={2} fontSize={30} fontWeight={800} fill={GREEN} textAnchor="middle">RIGHT ✓</text>
        </g>
        <path d="M60,680 Q360,600 660,680 Z" fill={INK} />
      </Shot>

      {/* label outside the shot so the zoom never crops it */}
      <Note x={40} y={40} k={easeOut((t - at("island").start + 0.2) / 0.5)} size={22} color={SOFT} anchor="start" weight={700}>DRIVER&apos;S VIEW</Note>

      {/* the answer card */}
      {t > lockT && (
        <g opacity={Math.min(1, pop(lockT, 0.25))} transform={`translate(360,585) scale(${0.8 + 0.2 * easeBack(pop(lockT, 0.55))}) translate(-360,-585)`}>
          <rect x={30} y={530} width={660} height={110} rx={22} fill={GREEN} filter="url(#mx3-sign-shadow)" />
          <text x={360} y={576} fontSize={22} fontWeight={800} fill="#dcfce7" textAnchor="middle" letterSpacing={1.5}>THE ANSWER</text>
          <text x={360} y={617} fontSize={31} fontWeight={800} fill="#fff" textAnchor="middle">Pass on either side of an obstruction</text>
          {/* a light sweep across the card as it lands */}
          <rect x={30 + 760 * easeOut(pop(lockT + 0.35, 0.9)) - 120} y={530} width={70} height={110} fill="#fff" opacity={0.18 * (1 - pop(lockT + 1.1, 0.2))} transform="skewX(-18)" />
        </g>
      )}
    </g>
  );
}

function wordAt0(props: SceneProps3, id: string, word: string) {
  const b = props.at(id);
  const w = b.words.find((x) => x.w.toLowerCase().replace(/[^a-z0-9'-]/g, "") === word);
  return w ? w.start : b.start;
}

/** Sound cues for the film: none for now (the pops and pencil read as noise). */
export function doubleArrowCues(_m: MistakeManifest): SoundCue[] {
  return [];
}
