import { ACCENT, AnswerCard, CYAN, DIM, Dimension, Draw, GOOD, INK, Label, MONO, SceneProps, Wrong, sceneHelpers } from "../Stage";

/** Part 107 P107-AIR-010: a Class B segment labelled 70 over 40, in cross-section. */

const SEA = 560; // y of mean sea level
const FT = 0.046; // px per foot
const y = (ft: number) => SEA - ft * FT;
const X0 = 110; // the airport, at the left edge of the cake
// Shelves outward from the airport: [x from, x to, floor ft, ceiling ft, label]
const SHELVES: [number, number, number, number, string][] = [
  [X0, 230, 0, 10000, "100/SFC"],
  [230, 360, 3000, 10000, "100/30"],
  [360, 540, 4000, 7000, "70/40"],
];

export function ClassBScene(props: SceneProps) {
  const { t } = props;
  const { p, onWord } = sceneHelpers(props);
  const q = p("question", 0, 0.8);
  const cake = p("cake", 0, 1.4);
  const shelf = p("shelf", 0);
  const ceiling = onWord("shelf", "ceiling");
  const floor = onWord("shelf", "floor");
  const seven = onWord("zeros", "seventy");
  const four = onWord("zeros", "forty");
  const sea = onWord("zeros", "sea", 1);
  const trick = p("trick");
  const lock = p("lock", 0.6);

  // The chart label starts big in the middle, then settles into its shelf.
  const lx = 300 + (450 - 300) * cake, ly = 200 + (y(5500) - 200) * cake, ls = 1.9 - 0.9 * cake;

  return (
    <g>
      {/* altitude scale */}
      <g opacity={cake}>
        <Draw d={`M60,${SEA} L60,${y(10500)}`} k={cake} stroke={DIM} w={2} />
        {[0, 2000, 4000, 6000, 8000, 10000].map((ft) => (
          <g key={ft}>
            <line x1={52} y1={y(ft)} x2={60} y2={y(ft)} stroke={DIM} strokeWidth={2} />
            <text x={46} y={y(ft) + 5} fontSize={13} fill={DIM} textAnchor="end" fontFamily={MONO}>{ft ? `${ft / 1000}k` : "0"}</text>
          </g>
        ))}
        <text x={60} y={y(10500) - 10} fontSize={13} fill={DIM} textAnchor="middle" fontFamily={MONO}>FT MSL</text>
      </g>

      {/* sea, ground and the airport */}
      <Draw d={`M60,${SEA} q15,-6 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0`} k={cake} stroke={CYAN} w={2} />
      <Draw d={`M75,${y(400)} L180,${y(400)} L260,${y(700)} L360,${y(600)} L440,${y(1100)} L560,${y(900)}`} k={cake} stroke="#9a7b4f" w={3} />
      {cake > 0.5 && <rect x={X0 - 22} y={y(400) - 5} width={60} height={5} fill={INK} opacity={cake} />}
      <Label x={X0 + 8} y={y(400) + 24} k={cake} size={13} fill={DIM} mono>AIRPORT</Label>

      {/* the cake */}
      {SHELVES.map(([a, b, lo, hi, lab], i) => {
        const hot = i === 2 && shelf > 0;
        const k = Math.max(0, Math.min(1, cake * 3 - i));
        if (k <= 0) return null;
        return (
          <g key={lab} opacity={k}>
            <rect x={a} y={y(hi)} width={b - a} height={y(lo) - y(hi)} fill={hot ? "rgba(255,207,63,0.18)" : "rgba(95,140,255,0.16)"} stroke={hot ? ACCENT : "#6f8fff"} strokeWidth={hot ? 3 : 2} />
            {i < 2 && <text x={(a + b) / 2} y={y(hi) + 26} fontSize={15} fill="#9fb4ff" textAnchor="middle" fontFamily={MONO}>{lab}</text>}
          </g>
        );
      })}

      {/* the chart label 70/40 */}
      <g opacity={q} transform={`translate(${lx},${ly}) scale(${ls})`}>
        <rect x={-36} y={-44} width={72} height={84} rx={8} fill="#0b2247" stroke={shelf > 0 ? ACCENT : "#6f8fff"} strokeWidth={2} />
        <text x={0} y={-10} fontSize={30} fontWeight={800} fill={ceiling > 0 ? ACCENT : "#9fb4ff"} textAnchor="middle" fontFamily={MONO}>70</text>
        <line x1={-22} y1={2} x2={22} y2={2} stroke="#9fb4ff" strokeWidth={2.5} />
        <text x={0} y={32} fontSize={30} fontWeight={800} fill={floor > 0 ? ACCENT : "#9fb4ff"} textAnchor="middle" fontFamily={MONO}>40</text>
      </g>

      <Wrong x={170} y={70} k={onWord("trap", "flip") * (1 - cake)} text="40 IS THE TOP?" />
      <Wrong x={450} y={70} k={onWord("trap", "ground") * (1 - cake)} text="FEET AGL?" />

      {/* ceiling and floor */}
      <Label x={450} y={y(7000) - 12} k={ceiling} size={16} fill={ACCENT} weight={800}>CEILING (TOP)</Label>
      <Label x={450} y={y(4000) + 26} k={floor} size={16} fill={ACCENT} weight={800}>FLOOR (BOTTOM)</Label>

      {/* add two zeros, from the sea */}
      <Draw d={`M60,${y(7000)} L360,${y(7000)}`} k={seven} stroke={ACCENT} w={1.5} dash="4 6" />
      <Label x={70} y={y(7000) - 8} k={seven} size={15} fill={ACCENT} anchor="start" mono>70 → 7,000</Label>
      <Draw d={`M60,${y(4000)} L360,${y(4000)}`} k={four} stroke={ACCENT} w={1.5} dash="4 6" />
      <Label x={70} y={y(4000) - 8} k={four} size={15} fill={ACCENT} anchor="start" mono>40 → 4,000</Label>
      <Dimension x1={565} y1={SEA} x2={565} y2={y(4000)} k={sea} label="" />
      <Label x={552} y={y(2600)} k={sea} size={16} fill={CYAN} anchor="end" weight={700} mono>FROM SEA LEVEL</Label>

      {/* the trick: a building, roof on top, floor below, standing on the sea */}
      {trick > 0 && (
        <g opacity={trick} transform="translate(250,40)">
          <path d="M0,0 L40,-30 L80,0 Z" fill="none" stroke={GOOD} strokeWidth={3} />
          <rect x={6} y={0} width={68} height={46} fill="none" stroke={GOOD} strokeWidth={3} />
          <text x={96} y={-6} fontSize={18} fill={GOOD} fontWeight={800}>ROOF = 70 (ceiling)</text>
          <text x={96} y={42} fontSize={18} fill={GOOD} fontWeight={800}>FLOOR = 40 (floor)</text>
        </g>
      )}
      {/* a drone well below, at 400 ft above the ground */}
      {trick > 0 && (
        <g opacity={trick} transform={`translate(300,${y(1500) + Math.sin(t * 3) * 3})`}>
          <line x1={-16} y1={0} x2={16} y2={0} stroke={INK} strokeWidth={3} />
          <circle cx={-16} cy={-3} r={6} fill="none" stroke={INK} strokeWidth={2} />
          <circle cx={16} cy={-3} r={6} fill="none" stroke={INK} strokeWidth={2} />
          <rect x={-6} y={-3} width={12} height={8} fill={INK} />
        </g>
      )}

      <AnswerCard k={lock} text="7,000 down to 4,000 ft MSL" y={604} />
    </g>
  );
}
