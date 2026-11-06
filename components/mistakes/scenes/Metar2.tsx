import { ramp } from "@/lib/mistakeExplainers";
import { sceneHelpers, type SceneProps } from "../Stage";
import { BLUE, GREEN, INK, MONO_FONT, Note, ORANGE, RED, SOFT, window2 } from "../Stage2";

/**
 * Part 107 P107-WX-006: 19/12 A3002 at the end of a METAR.
 * Source: FAA Aviation Weather Handbook (FAA-H-8083-28A, 2024), 24.4.3.10
 * (temperature then dewpoint, two digits, whole degrees Celsius; dewpoint is
 * the temperature to which air must be cooled to become saturated) and
 * 24.4.3.11 (altimeter group: A plus four digits, inches of mercury, decimal
 * point not coded, A2992 = 29.92 inHg).
 */

const HOT = "#ea580c";
const COOL = "#0284c7";
const TX = 150;
const ty = (c: number) => 600 - c * 9;

export function MetarScene2(props: SceneProps) {
  const { t, at } = props;
  const { onWord } = sceneHelpers(props);

  const intro = window2(t, at, "hook", "trap");
  const trap = window2(t, at, "trap", "temps");
  const temps = window2(t, at, "temps", "alt");
  const alt = window2(t, at, "alt", "trick");
  const trick = window2(t, at, "trick");

  const groups = onWord("question", "nineteen");
  const date = onWord("trap", "date");
  const vis = onWord("trap", "visibility");
  const not = onWord("trap", "not", 0.4);
  const first = onWord("temps", "first");
  const second = onWord("temps", "second");
  const saturated = onWord("dew", "saturated", 0.8);
  const never = onWord("dew", "never");
  const decimal = onWord("alt", "decimal", 0.6);
  const thirty = onWord("alt", "thirty", 0.5);
  const bigger = onWord("trick", "bigger", 0.6);
  const lock = ramp(t, at("lock").start, 0.5);

  return (
    <g>
      {/* 1. the report */}
      {intro > 0 && (
        <g opacity={intro}>
          <rect x={40} y={140} width={640} height={250} rx={24} fill="#fff" stroke={INK} strokeOpacity={0.12} strokeWidth={2} />
          <text x={70} y={186} fontSize={20} fill={SOFT} fontWeight={800} letterSpacing={1.5}>METAR</text>
          <text x={70} y={250} fontSize={40} fontWeight={700} fill={INK} fontFamily={MONO_FONT}>KMEM 121753Z 18010KT</text>
          <text x={70} y={320} fontSize={40} fontWeight={700} fill={INK} fontFamily={MONO_FONT} xmlSpace="preserve">10SM CLR <tspan fill={groups > 0 ? HOT : INK}>19/12</tspan> <tspan fill={groups > 0 ? BLUE : INK}>A3002</tspan></text>
          {groups > 0 && <rect x={276} y={276} width={392} height={64} rx={12} fill="none" stroke={ORANGE} strokeWidth={4} opacity={groups} />}
        </g>
      )}

      {/* 2. not a date, not a visibility */}
      {trap > 0 && (
        <g opacity={trap}>
          {[
            { k: date, y: 150, text: "19/12: the 19th of December?" },
            { k: vis, y: 330, text: "A visibility?" },
          ].map((c) => (
            <g key={c.text} opacity={Math.max(0.15, c.k)}>
              <rect x={60} y={c.y - 60} width={600} height={110} rx={22} fill="#fff" stroke={INK} strokeOpacity={0.12} strokeWidth={2} />
              <text x={360} y={c.y + 8} fontSize={32} fontWeight={800} fill={INK} textAnchor="middle">{c.text}</text>
              {not > 0 && <line x1={90} y1={c.y - 4} x2={630} y2={c.y - 4} stroke={RED} strokeWidth={8} strokeLinecap="round" opacity={not} />}
            </g>
          ))}
        </g>
      )}

      {/* 3. two temperatures in Celsius, on one thermometer */}
      {temps > 0 && (
        <g opacity={temps}>
          <text x={360} y={90} fontSize={84} fontWeight={800} textAnchor="middle" fontFamily={MONO_FONT}>
            <tspan fill={HOT}>19</tspan><tspan fill={SOFT}>/</tspan><tspan fill={COOL}>12</tspan>
          </text>
          <Note x={270} y={140} k={first} size={24} color={HOT}>AIR TEMP °C</Note>
          <Note x={455} y={140} k={second} size={24} color={COOL}>DEW POINT °C</Note>
          <rect x={TX - 16} y={ty(32)} width={32} height={ty(0) - ty(32) + 10} rx={16} fill="#fff" stroke={INK} strokeWidth={3} />
          <circle cx={TX} cy={ty(0) + 30} r={28} fill={HOT} stroke={INK} strokeWidth={3} />
          <rect x={TX - 8} y={ty(19 * first)} width={16} height={ty(0) - ty(19 * first) + 14} fill={HOT} />
          {[0, 10, 20, 30].map((c) => (
            <g key={c}>
              <line x1={TX + 18} y1={ty(c)} x2={TX + 30} y2={ty(c)} stroke={SOFT} strokeWidth={2} />
              <text x={TX + 36} y={ty(c) + 6} fontSize={18} fill={SOFT} fontFamily={MONO_FONT}>{c}</text>
            </g>
          ))}
          <g opacity={first}>
            <line x1={TX - 20} y1={ty(19)} x2={TX - 60} y2={ty(19)} stroke={HOT} strokeWidth={4} />
            <text x={TX - 66} y={ty(19) + 8} fontSize={26} fontWeight={800} fill={HOT} textAnchor="end" fontFamily={MONO_FONT}>19</text>
          </g>
          <g opacity={second}>
            <line x1={TX - 20} y1={ty(12)} x2={TX - 60} y2={ty(12)} stroke={COOL} strokeWidth={4} />
            <text x={TX - 66} y={ty(12) + 8} fontSize={26} fontWeight={800} fill={COOL} textAnchor="end" fontFamily={MONO_FONT}>12</text>
          </g>
          {saturated > 0 && (
            <g opacity={saturated}>
              <path d={`M${TX + 70},${ty(19)} C${TX + 140},${ty(19)} ${TX + 140},${ty(12)} ${TX + 80},${ty(12)}`} fill="none" stroke={COOL} strokeWidth={4} strokeDasharray="10 8" />
              <path d={`M${TX + 80},${ty(12)} l16,-10 v20 z`} fill={COOL} />
              <text x={TX + 160} y={ty(16) + 8} fontSize={22} fill={COOL} fontWeight={800}>cool the air to 12°C</text>
              <path d={`M${TX + 170},${ty(12) + 70} q14,-24 34,-12 q14,-22 38,-4 q26,-6 26,18 z`} fill="#e0f2fe" stroke={COOL} strokeWidth={3} />
              <text x={TX + 300} y={ty(12) + 60} fontSize={22} fill={COOL} fontWeight={800}>saturated:</text>
              <text x={TX + 300} y={ty(12) + 88} fontSize={22} fill={COOL} fontWeight={800}>fog and dew</text>
            </g>
          )}
          <Note x={360} y={215} k={never} size={30} color={INK}>dew point is never higher than air temp</Note>
        </g>
      )}

      {/* 4. the altimeter group */}
      {alt > 0 && (
        <g opacity={alt}>
          <text x={360} y={190} fontSize={110} fontWeight={800} textAnchor="middle" fontFamily={MONO_FONT}>
            <tspan fill={BLUE}>A</tspan><tspan fill={INK}>30</tspan>
            <tspan fill={ORANGE}>{decimal > 0 ? "." : ""}</tspan>
            <tspan fill={INK}>02</tspan>
          </text>
          <Note x={360} y={250} k={1} size={26} color={BLUE}>A = altimeter setting</Note>
          <Note x={360} y={300} k={decimal} size={26} color={ORANGE}>decimal after the first two digits</Note>
          {thirty > 0 && (
            <g opacity={thirty}>
              <rect x={150} y={360} width={420} height={140} rx={24} fill="#fff" stroke={GREEN} strokeWidth={4} />
              <text x={360} y={448} fontSize={64} fontWeight={800} fill={GREEN} textAnchor="middle" fontFamily={MONO_FONT}>30.02</text>
              <text x={360} y={484} fontSize={22} fill={GREEN} textAnchor="middle" fontWeight={700}>inches of mercury</text>
            </g>
          )}
        </g>
      )}

      {/* 5. the trick */}
      {trick > 0 && (
        <g opacity={trick}>
          <text x={360} y={190} fontSize={110} fontWeight={800} textAnchor="middle" fontFamily={MONO_FONT}>
            <tspan fill={HOT}>19</tspan><tspan fill={SOFT}>/</tspan><tspan fill={COOL}>12</tspan>
          </text>
          <Note x={360} y={280} k={bigger} size={34} color={INK}>bigger number first: the air</Note>
          <Note x={360} y={330} k={bigger} size={28} color={SOFT}>the dew point can&apos;t be higher</Note>
          <Note x={360} y={420} k={onWord("trick", "altimeter", 0.5)} size={34} color={BLUE}>A = altimeter</Note>
        </g>
      )}

      {lock > 0 && (
        <g opacity={lock} transform={`translate(0,${(1 - lock) * 20})`}>
          <rect x={30} y={530} width={660} height={110} rx={22} fill={GREEN} />
          <text x={360} y={576} fontSize={22} fontWeight={800} fill="#dcfce7" textAnchor="middle" letterSpacing={1.5}>THE ANSWER</text>
          <text x={360} y={617} fontSize={29} fontWeight={800} fill="#fff" textAnchor="middle">19°C, dew point 12°C, 30.02 inHg</text>
        </g>
      )}
    </g>
  );
}
