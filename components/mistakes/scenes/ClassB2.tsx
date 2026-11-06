import { ramp } from "@/lib/mistakeExplainers";
import { sceneHelpers, type SceneProps } from "../Stage";
import { GREEN, INK, MONO_FONT, Note, ORANGE, RED, SOFT, window2 } from "../Stage2";

/**
 * Part 107 P107-AIR-010: a Class B segment labelled 70 over 40.
 * Sources: FAA Chart Users' Guide (9 July 2026), "Class B Airspace is shown...
 * The MSL ceiling and floor altitudes of each sector are shown in solid blue
 * figures with the last two zeros eliminated"; FAA Remote Pilot Study Guide
 * (FAA-G-8082-22): Class B is generally surface to 10,000 ft MSL and some
 * areas resemble upside-down wedding cakes.
 */

const CHART_BLUE = "#1d4ed8";
// Cake view (generic area): y of a given altitude in feet.
const SEA = 560;
const cy = (ft: number) => SEA - ft * 0.042;
// Zoom view (one 70/40 segment).
const zy = (ft: number) => 600 - ft * 0.068;

function Label({ x, y, s = 1, top, bottom, hot = 0 }: { x: number; y: number; s?: number; top: string; bottom: string; hot?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <text y={-8} fontSize={46} fontWeight={800} fill={CHART_BLUE} textAnchor="middle" fontFamily={MONO_FONT}>{top}</text>
      <line x1={-34} y1={4} x2={34} y2={4} stroke={CHART_BLUE} strokeWidth={4} />
      <text y={52} fontSize={46} fontWeight={800} fill={CHART_BLUE} textAnchor="middle" fontFamily={MONO_FONT}>{bottom}</text>
      {hot > 0 && <rect x={-58} y={-58} width={116} height={128} rx={14} fill="none" stroke={ORANGE} strokeWidth={5} opacity={hot} />}
    </g>
  );
}

export function ClassBScene2(props: SceneProps) {
  const { t, at } = props;
  const { onWord } = sceneHelpers(props);

  const intro = window2(t, at, "hook", "trap");
  const trap = window2(t, at, "trap", "cake");
  const cake = window2(t, at, "cake", "shelf");
  const zoom = window2(t, at, "shelf");

  const flip = onWord("trap", "flip");
  const ground = onWord("trap", "ground");
  const neither = onWord("trap", "neither", 0.4);
  const shelves = ramp(t, at("cake").start + 0.3, 2.2);
  const ceiling = onWord("shelf", "ceiling");
  const floor = onWord("shelf", "floor");
  const seven = onWord("zeros", "seventy");
  const four = onWord("zeros", "forty");
  const sea = onWord("zeros", "sea", 0.8);
  const room = onWord("trick", "room", 0.6);
  const lock = ramp(t, at("lock").start, 0.5);

  return (
    <g>
      {/* 1. the label as printed on a sectional */}
      {intro > 0 && (
        <g opacity={intro}>
          <path d="M80,520 A420,420 0 0 1 640,140" fill="none" stroke={CHART_BLUE} strokeWidth={6} opacity={0.35} />
          <path d="M150,600 A360,360 0 0 1 680,250" fill="none" stroke={CHART_BLUE} strokeWidth={6} opacity={0.35} />
          <Label x={360} y={300} s={1.9} top="70" bottom="40" />
          <Note x={360} y={560} k={ramp(t, at("question").start, 0.5)} size={26} color={SOFT}>printed in solid blue on the chart</Note>
        </g>
      )}

      {/* 2. the two wrong readings */}
      {trap > 0 && (
        <g opacity={trap}>
          {[
            { k: flip, y: 150, text: "Floor 7,000, ceiling 4,000?" },
            { k: ground, y: 330, text: "Feet above the ground?" },
          ].map((c) => (
            <g key={c.text} opacity={Math.max(0.15, c.k)}>
              <rect x={70} y={c.y - 60} width={580} height={110} rx={22} fill="#fff" stroke={INK} strokeOpacity={0.12} strokeWidth={2} />
              <text x={360} y={c.y + 8} fontSize={34} fontWeight={800} fill={INK} textAnchor="middle">{c.text}</text>
              {neither > 0 && <line x1={100} y1={c.y - 4} x2={620} y2={c.y - 4} stroke={RED} strokeWidth={8} strokeLinecap="round" opacity={neither} />}
            </g>
          ))}
          <Note x={360} y={540} k={neither} size={48} color={RED}>Neither.</Note>
        </g>
      )}

      {/* 3. Class B from the side: an upside-down wedding cake */}
      {cake > 0 && (
        <g opacity={cake}>
          <Note x={40} y={40} k={1} size={22} color={SOFT} anchor="start" weight={700}>SIDE VIEW · CLASS B</Note>
          <line x1={20} y1={SEA} x2={700} y2={SEA} stroke="#0ea5e9" strokeWidth={4} />
          <text x={690} y={SEA + 30} fontSize={20} fill="#0284c7" textAnchor="end" fontWeight={700}>sea level</text>
          <path d={`M20,${cy(500)} L700,${cy(500)}`} stroke="#a16207" strokeWidth={4} />
          <rect x={330} y={cy(500) - 8} width={60} height={8} fill={INK} />
          <text x={360} y={cy(500) + 30} fontSize={20} fill={INK} textAnchor="middle" fontWeight={700}>airport</text>
          {[
            { a: 270, b: 450, lo: 500, label: "100/SFC", i: 0 },
            { a: 150, b: 270, lo: 3000, label: "100/30", i: 1 },
            { a: 450, b: 570, lo: 3000, label: "100/30", i: 1 },
            { a: 40, b: 150, lo: 5000, label: "100/50", i: 2 },
            { a: 570, b: 680, lo: 5000, label: "100/50", i: 2 },
          ].map((s, k) => {
            const kk = Math.min(1, Math.max(0, shelves * 3 - s.i));
            if (kk <= 0) return null;
            return (
              <g key={k} opacity={kk}>
                <rect x={s.a} y={cy(10000)} width={s.b - s.a} height={cy(s.lo) - cy(10000)} fill="rgba(29,78,216,0.10)" stroke={CHART_BLUE} strokeWidth={3} />
                <text x={(s.a + s.b) / 2} y={cy(10000) + 34} fontSize={20} fontWeight={800} fill={CHART_BLUE} textAnchor="middle" fontFamily={MONO_FONT}>{s.label}</text>
              </g>
            );
          })}
          <text x={360} y={cy(10000) - 14} fontSize={20} fill={SOFT} textAnchor="middle" fontWeight={700}>10,000 ft MSL</text>
        </g>
      )}

      {/* 4. one segment, 70 over 40, measured from the sea */}
      {zoom > 0 && (
        <g opacity={zoom}>
          <line x1={110} y1={zy(0)} x2={110} y2={zy(8000)} stroke={INK} strokeWidth={3} />
          {[0, 2000, 4000, 6000, 8000].map((f) => (
            <g key={f}>
              <line x1={100} y1={zy(f)} x2={110} y2={zy(f)} stroke={INK} strokeWidth={3} />
              <text x={92} y={zy(f) + 7} fontSize={20} fill={SOFT} textAnchor="end" fontFamily={MONO_FONT}>{f.toLocaleString()}</text>
            </g>
          ))}
          <text x={110} y={zy(8000) - 14} fontSize={18} fill={SOFT} textAnchor="middle" fontWeight={700}>FT MSL</text>
          <line x1={110} y1={zy(0)} x2={700} y2={zy(0)} stroke="#0ea5e9" strokeWidth={4} />
          <text x={690} y={zy(0) + 30} fontSize={20} fill="#0284c7" textAnchor="end" fontWeight={700}>sea level = 0</text>
          <path d={`M110,${zy(900)} L700,${zy(900)}`} stroke="#a16207" strokeWidth={4} />
          <text x={690} y={zy(900) - 10} fontSize={18} fill="#a16207" textAnchor="end" fontWeight={700}>the ground here</text>
          <rect x={250} y={zy(7000)} width={330} height={zy(4000) - zy(7000)} fill="rgba(29,78,216,0.12)" stroke={CHART_BLUE} strokeWidth={4} />
          <Label x={415} y={zy(5500) - 18} s={0.9} top="70" bottom="40" hot={Math.max(ceiling, floor)} />
          <Note x={415} y={zy(7000) - 14} k={ceiling} size={26} color={ORANGE}>CEILING (top)</Note>
          <Note x={415} y={zy(4000) + 36} k={floor} size={26} color={ORANGE}>FLOOR (bottom)</Note>
          {seven > 0 && <line x1={110} y1={zy(7000)} x2={250} y2={zy(7000)} stroke={ORANGE} strokeWidth={3} strokeDasharray="8 8" opacity={seven} />}
          {four > 0 && <line x1={110} y1={zy(4000)} x2={250} y2={zy(4000)} stroke={ORANGE} strokeWidth={3} strokeDasharray="8 8" opacity={four} />}
          <Note x={180} y={zy(7000) - 10} k={seven} size={22} color={ORANGE}>7,000</Note>
          <Note x={180} y={zy(4000) - 10} k={four} size={22} color={ORANGE}>4,000</Note>
          {sea > 0 && (
            <g opacity={sea}>
              <line x1={660} y1={zy(0)} x2={660} y2={zy(4000)} stroke={GREEN} strokeWidth={4} />
              <path d={`M660,${zy(4000)} l-10,18 h20 z`} fill={GREEN} />
              <text x={646} y={zy(2300)} fontSize={24} fill={GREEN} fontWeight={800} textAnchor="end">measured</text>
              <text x={646} y={zy(2300) + 28} fontSize={24} fill={GREEN} fontWeight={800} textAnchor="end">from the sea</text>
            </g>
          )}
          {room > 0 && <Note x={415} y={zy(5500) + 70} k={room} size={24} color={GREEN}>like a room</Note>}
        </g>
      )}

      {lock > 0 && (
        <g opacity={lock} transform={`translate(0,${(1 - lock) * 20})`}>
          <rect x={30} y={30} width={660} height={110} rx={22} fill={GREEN} />
          <text x={360} y={76} fontSize={22} fontWeight={800} fill="#dcfce7" textAnchor="middle" letterSpacing={1.5}>THE ANSWER</text>
          <text x={360} y={117} fontSize={31} fontWeight={800} fill="#fff" textAnchor="middle">7,000 down to 4,000 ft MSL</text>
        </g>
      )}
    </g>
  );
}
