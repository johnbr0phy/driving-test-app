import { ramp } from "@/lib/mistakeExplainers";
import { sceneHelpers, type SceneProps } from "../Stage";
import { GREEN, INK, Note, ORANGE, RED, SOFT, Sign, window2 } from "../Stage2";

/**
 * DMV U-012, the NO PASSING ZONE pennant (MUTCD W14-3). Art: the official
 * drawing (public/signs/no-passing-pennant.svg without its words for the
 * question, no-passing-zone-full.svg with them), checked against FHWA
 * Standard Highway Signs, Warning chapter (https://mutcd.fhwa.dot.gov/SHSe/Warning.pdf).
 * Rules from MUTCD 11th Edition 2C.53 (pennant, longer axis horizontal,
 * pointing right, on the left-hand side at the beginning of a no-passing zone)
 * and Table 2A-2 (that shape is used for no other sign).
 */

const VP = [360, 120];

export function PennantScene2(props: SceneProps) {
  const { t, at } = props;
  const { onWord } = sceneHelpers(props);

  const intro = window2(t, at, "hook", "trap");
  const trap = window2(t, at, "trap", "shape");
  const shape = window2(t, at, "shape", "road");
  const road = window2(t, at, "road");

  const school = onWord("trap", "school");
  const merge = onWord("trap", "merge");
  const away = onWord("trap", "away", 0.5);
  const pointing = onWord("shape", "pointing");
  const other = onWord("shape", "other");
  const left = onWord("road", "left");
  const zone = onWord("road", "zone", 0.8);
  const finger = onWord("trick", "finger", 0.8);
  const lock = ramp(t, at("lock").start, 0.5);

  return (
    <g>
      {/* 1. the shape on its own: no words yet, they would give the answer away */}
      {intro > 0 && (
        <g opacity={intro}>
          <Sign name="no-passing-pennant" x={360} y={320} size={440} k={ramp(t, at("hook").start, 0.6)} />
          <g opacity={ramp(t, at("hook").start + 0.8, 0.4)} transform="translate(600,150)">
            <circle r={44} fill={RED} />
            <text y={17} fontSize={50} fontWeight={900} fill="#fff" textAnchor="middle">?</text>
          </g>
        </g>
      )}

      {/* 2. not a school zone, not a merge */}
      {trap > 0 && (
        <g opacity={trap}>
          <Note x={360} y={60} k={1} size={30} color={SOFT}>It is not one of these:</Note>
          {[
            { k: school, x: 190, name: "school-zone", label: "School zone" },
            { k: merge, x: 530, name: "merge", label: "Merge" },
          ].map((c) => (
            <g key={c.name} opacity={Math.max(0.2, c.k)}>
              <rect x={c.x - 150} y={100} width={300} height={360} rx={24} fill="#fff" stroke={INK} strokeOpacity={0.12} strokeWidth={2} />
              <Sign name={c.name} x={c.x} y={250} size={210} />
              <text x={c.x} y={420} fontSize={30} fontWeight={800} fill={INK} textAnchor="middle">{c.label}</text>
              {away > 0 && (
                <g opacity={away} stroke={RED} strokeWidth={12} strokeLinecap="round">
                  <path d={`M${c.x - 95},155 L${c.x + 95},345 M${c.x + 95},155 L${c.x - 95},345`} />
                </g>
              )}
            </g>
          ))}
          <Sign name="no-passing-pennant" x={360} y={570} size={170} k={away} />
        </g>
      )}

      {/* 3. the shape, measured: long axis flat, pointing right, the only one */}
      {shape > 0 && (
        <g opacity={shape}>
          <Sign name="no-passing-pennant" x={360} y={260} size={460} />
          <g opacity={pointing}>
            <line x1={150} y1={440} x2={560} y2={440} stroke={ORANGE} strokeWidth={6} />
            <path d="M590,440 L556,422 L556,458 Z" fill={ORANGE} />
            <text x={360} y={490} fontSize={30} fontWeight={800} fill={ORANGE} textAnchor="middle">long side flat, pointing right</text>
          </g>
          <Note x={360} y={580} k={other} size={32} color={INK}>Only the no passing sign uses it</Note>
        </g>
      )}

      {/* 4. the driver's view: the pennant on the left, where the zone begins */}
      {road > 0 && (
        <g opacity={road}>
          <Note x={40} y={40} k={1} size={22} color={SOFT} anchor="start" weight={700}>DRIVER&apos;S VIEW</Note>
          <line x1={0} y1={VP[1]} x2={720} y2={VP[1]} stroke={INK} strokeOpacity={0.25} strokeWidth={2} />
          <path d={`M60,680 L${VP[0] - 26},${VP[1]} L${VP[0] + 26},${VP[1]} L660,680 Z`} fill="#d5d2c9" />
          <path d={`M60,680 L${VP[0] - 26},${VP[1]} M660,680 L${VP[0] + 26},${VP[1]}`} stroke="#fff" strokeWidth={7} />
          {/* centre line: broken near you, solid yellow from where the zone begins */}
          <path d="M360,680 L360,400" stroke="#e8b400" strokeWidth={9} strokeDasharray="34 30" />
          <g opacity={zone}>
            <path d="M356,400 L358,124" stroke="#e8b400" strokeWidth={6} />
            <path d="M364,400 L362,124" stroke="#e8b400" strokeWidth={6} />
          </g>
          {/* the pennant on its post, left-hand side, at the start of the zone */}
          <g opacity={left}>
            <line x1={150} y1={460} x2={150} y2={330} stroke={INK} strokeWidth={6} />
            <Sign name="no-passing-zone-full" x={170} y={300} size={150} />
          </g>
          <Note x={150} y={520} k={left} size={26} color={ORANGE}>LEFT SIDE</Note>
          <Note x={470} y={330} k={zone} size={26} color={ORANGE} anchor="start">zone begins</Note>
          <path d="M466,322 L372,380" stroke={ORANGE} strokeWidth={4} opacity={zone} />
          {/* the trick: it points across your path */}
          {finger > 0 && (
            <g opacity={finger}>
              <path d="M250,300 Q320,300 345,360" fill="none" stroke={GREEN} strokeWidth={10} strokeLinecap="round" />
              <path d="M330,372 L362,374 L352,344 Z" fill={GREEN} />
              <text x={360} y={250} fontSize={40} fontWeight={900} fill={GREEN} textAnchor="middle">NOT HERE</text>
            </g>
          )}
          <path d="M60,680 Q360,600 660,680 Z" fill={INK} />
        </g>
      )}

      {lock > 0 && (
        <g opacity={lock} transform={`translate(0,${(1 - lock) * 20})`}>
          <rect x={30} y={530} width={660} height={110} rx={22} fill={GREEN} />
          <text x={360} y={576} fontSize={22} fontWeight={800} fill="#dcfce7" textAnchor="middle" letterSpacing={1.5}>THE ANSWER</text>
          <text x={360} y={617} fontSize={31} fontWeight={800} fill="#fff" textAnchor="middle">No passing zone</text>
        </g>
      )}
    </g>
  );
}
