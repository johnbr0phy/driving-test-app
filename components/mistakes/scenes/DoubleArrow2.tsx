import { ramp } from "@/lib/mistakeExplainers";
import { sceneHelpers, type SceneProps } from "../Stage";
import { CurveArrow, GREEN, INK, Note, ORANGE, RED, SOFT, Sign, window2 } from "../Stage2";

/**
 * DMV U-019, the double arrow sign (MUTCD W12-1): two separate arrows,
 * down-left and down-right, mounted on the nose of an island. Sign art in
 * public/signs/double-arrow.svg (Wikimedia's public-domain MUTCD W12-1 file),
 * checked against the official FHWA drawing: Standard Highway Signs, Warning
 * chapter, page 2-105 (https://mutcd.fhwa.dot.gov/SHSe/Warning.pdf).
 * Every sign in an explainer is checked against its FHWA page before use.
 */

// Driver's-eye road: vanishing point and the island in the middle.
const VP = [360, 130];
const ISLAND = "M314,500 L350,300 Q360,292 370,300 L406,500 Q360,532 314,500 Z";

export function DoubleArrowScene2(props: SceneProps) {
  const { t, at } = props;
  const { onWord } = sceneHelpers(props);

  const intro = window2(t, at, "hook", "trap");
  const trap = window2(t, at, "trap", "arrows");
  const arrows = window2(t, at, "arrows", "island");
  const road = window2(t, at, "island");

  const merge = onWord("trap", "merging");
  const twoWay = onWord("trap", "two-way");
  const differ = onWord("trap", "different");
  const left = onWord("arrows", "left", 0.5);
  const right = onWord("arrows", "right", 0.5);
  const island = onWord("island", "island", 0.6);
  const ways = onWord("island", "ways", 1.1);
  const fork = onWord("trick", "fork", 0.6);
  const lock = ramp(t, at("lock").start, 0.5);

  return (
    <g>
      {/* 1. the sign, big */}
      {intro > 0 && (
        <g opacity={intro}>
          <Sign name="double-arrow" x={360} y={320} size={420} k={ramp(t, at("hook").start, 0.6)} />
          <g opacity={ramp(t, at("hook").start + 0.8, 0.4)} transform="translate(560,140)">
            <circle r={44} fill={RED} />
            <text y={17} fontSize={50} fontWeight={900} fill="#fff" textAnchor="middle">?</text>
          </g>
        </g>
      )}

      {/* 2. not merge, not two-way traffic */}
      {trap > 0 && (
        <g opacity={trap}>
          <Note x={360} y={60} k={1} size={30} color={SOFT}>It is not one of these:</Note>
          {[
            { k: merge, x: 190, name: "merge", label: "Merge" },
            { k: twoWay, x: 530, name: "two-way-traffic", label: "Two-way traffic" },
          ].map((c) => (
            <g key={c.name} opacity={Math.max(0.2, c.k)}>
              <rect x={c.x - 150} y={100} width={300} height={360} rx={24} fill="#fff" stroke={INK} strokeOpacity={0.12} strokeWidth={2} />
              <Sign name={c.name} x={c.x} y={250} size={210} />
              <text x={c.x} y={420} fontSize={30} fontWeight={800} fill={INK} textAnchor="middle">{c.label}</text>
              {differ > 0 && (
                <g opacity={differ} stroke={RED} strokeWidth={12} strokeLinecap="round">
                  <path d={`M${c.x - 95},${155} L${c.x + 95},${345} M${c.x + 95},${155} L${c.x - 95},${345}`} />
                </g>
              )}
            </g>
          ))}
          <Sign name="double-arrow" x={360} y={570} size={170} k={differ} />
        </g>
      )}

      {/* 3. look closely: two separate arrows */}
      {arrows > 0 && (
        <g opacity={arrows}>
          <Sign name="double-arrow" x={360} y={300} size={440} />
          {/* arrow centres on the official art: 32% and 68% across, 47% down */}
          <circle cx={360 - 220 + 0.32 * 440} cy={300 - 220 + 0.47 * 440} r={78} fill="none" stroke={ORANGE} strokeWidth={7} pathLength={1} strokeDasharray={`${left} 1`} />
          <circle cx={360 - 220 + 0.68 * 440} cy={300 - 220 + 0.47 * 440} r={78} fill="none" stroke={ORANGE} strokeWidth={7} pathLength={1} strokeDasharray={`${right} 1`} />
          <CurveArrow d="M215,400 Q170,480 115,540" k={left} color={ORANGE} w={9} head={[115, 540, 130]} />
          <CurveArrow d="M505,400 Q550,480 605,540" k={right} color={ORANGE} w={9} head={[605, 540, 50]} />
          <Note x={110} y={610} k={left} size={30} color={ORANGE}>down-left</Note>
          <Note x={610} y={610} k={right} size={30} color={ORANGE}>down-right</Note>
        </g>
      )}

      {/* 4. the driver's view: an island with the sign on its nose */}
      {road > 0 && (
        <g opacity={road}>
          <Note x={40} y={40} k={1} size={22} color={SOFT} anchor="start" weight={700}>DRIVER&apos;S VIEW</Note>
          <line x1={0} y1={VP[1]} x2={720} y2={VP[1]} stroke={INK} strokeOpacity={0.25} strokeWidth={2} />
          <path d={`M-60,680 L${VP[0] - 22},${VP[1]} L${VP[0] + 22},${VP[1]} L780,680 Z`} fill="#d5d2c9" />
          <path d={`M-60,680 L${VP[0] - 22},${VP[1]} M780,680 L${VP[0] + 22},${VP[1]}`} stroke="#fff" strokeWidth={8} />
          <g opacity={island}>
            <path d={ISLAND} fill="#f3dc8a" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
            <path d="M328,470 L354,320 M345,490 L359,315 M375,490 L366,320 M392,470 L366,325" stroke={INK} strokeOpacity={0.25} strokeWidth={3} />
            {/* centre line beyond the island */}
            <path d={`M360,290 L${VP[0]},${VP[1] + 6}`} stroke="#f5c518" strokeWidth={5} strokeDasharray="18 16" />
            <line x1={360} y1={505} x2={360} y2={445} stroke={INK} strokeWidth={6} />
            <Sign name="double-arrow" x={360} y={395} size={120} />
          </g>
          <CurveArrow d="M300,660 Q170,470 330,270" k={ways} color={GREEN} w={16} head={[330, 270, -51]} />
          <CurveArrow d="M420,660 Q550,470 390,270" k={ways} color={GREEN} w={16} head={[390, 270, -129]} />
          <Note x={130} y={360} k={fork} size={34} color={GREEN}>LEFT ✓</Note>
          <Note x={590} y={360} k={fork} size={34} color={GREEN}>RIGHT ✓</Note>
          {/* the hood of your car */}
          <path d="M60,680 Q360,600 660,680 Z" fill={INK} />
        </g>
      )}

      {lock > 0 && (
        <g opacity={lock} transform={`translate(0,${(1 - lock) * 20})`}>
          <rect x={30} y={530} width={660} height={110} rx={22} fill={GREEN} />
          <text x={360} y={576} fontSize={22} fontWeight={800} fill="#dcfce7" textAnchor="middle" letterSpacing={1.5}>THE ANSWER</text>
          <text x={360} y={617} fontSize={31} fontWeight={800} fill="#fff" textAnchor="middle">Pass on either side of an obstruction</text>
        </g>
      )}
    </g>
  );
}
