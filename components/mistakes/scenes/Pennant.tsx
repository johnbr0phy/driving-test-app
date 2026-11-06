import { ACCENT, AnswerCard, BAD, CYAN, DIM, Dimension, Draw, GOOD, INK, Label, SceneProps, Wrong, sceneHelpers } from "../Stage";

/** DMV U-012: the pennant (W14-3, NO PASSING ZONE), on the left side of the road. */

export function PennantScene(props: SceneProps) {
  const { t } = props;
  const { p, onWord } = sceneHelpers(props);
  const sign = p("question", 0, 0.9);
  const shape = p("shape", 0);
  const others = onWord("shape", "only");
  const road = p("road", 0, 1);
  const left = onWord("road", "left");
  const solid = onWord("road", "solid", 1.2);
  const words = onWord("road", "zone");
  const trick = p("trick");
  const finger = onWord("trick", "finger", 1);
  const lock = p("lock", 0.5);

  return (
    <g>
      {/* the pennant, pointing right */}
      <g opacity={sign}>
        <path d="M150,70 L150,230 L470,150 Z" fill={ACCENT} stroke="#111" strokeWidth={5} strokeLinejoin="round" />
        <path d="M162,88 L162,212 L430,150 Z" fill="none" stroke="#111" strokeWidth={2.5} strokeLinejoin="round" />
        {words > 0 && (
          <g opacity={words} fill="#111" fontWeight={900} textAnchor="middle" fontSize={22}>
            <text x={232} y={130}>NO</text>
            <text x={232} y={157}>PASSING</text>
            <text x={232} y={184}>ZONE</text>
          </g>
        )}
      </g>

      <Wrong x={110} y={35} k={onWord("trap", "school")} text="SCHOOL?" />
      <Wrong x={480} y={35} k={onWord("trap", "merge")} text="MERGE?" />

      {/* dimensions: it lies on its side */}
      <Dimension x1={150} y1={252} x2={470} y2={252} k={shape} label="LONG SIDE: FLAT" side={1} />
      <Dimension x1={120} y1={70} x2={120} y2={230} k={shape} />
      <Label x={104} y={156} k={shape} size={18} fill={CYAN} anchor="end" mono>SHORT</Label>

      {/* every other sign shape, greyed */}
      {others > 0 && (
        <g opacity={others * (1 - road)} transform="translate(0,300)">
          {[
            ["M60,40 l30,-30 l30,30 l-30,30 z", "DIAMOND"],
            ["M175,10 h50 v40 l-25,25 l-25,-25 z", "PENTAGON"],
            ["M285,15 h40 l-20,50 z", "YIELD"],
            ["M380,25 l12,-12 h26 l12,12 v26 l-12,12 h-26 l-12,-12 z", "STOP"],
            ["M480,15 v50 l80,-25 z", "PENNANT"],
          ].map(([d, n], i) => (
            <g key={n}>
              <path d={d} fill={i === 4 ? ACCENT : "none"} stroke={i === 4 ? ACCENT : DIM} strokeWidth={3} />
              <text x={[90, 200, 305, 405, 515][i]} y={100} fontSize={14} fill={i === 4 ? ACCENT : DIM} textAnchor="middle" fontFamily="monospace">{n}</text>
            </g>
          ))}
        </g>
      )}

      {/* road plan: two lanes, center line goes from dashed to solid */}
      <g opacity={road}>
        <Label x={300} y={318} k={road * (1 - trick)} size={15} fill={DIM} mono>PLAN VIEW · TWO-LANE ROAD</Label>
        <Draw d="M190,334 L190,650" k={road} stroke={INK} w={3} />
        <Draw d="M410,334 L410,650" k={road} stroke={INK} w={3} />
        <Draw d="M304,650 L304,500" k={road} stroke={ACCENT} w={4} dash="18 16" />
        <Draw d="M300,500 L300,334" k={solid} stroke={ACCENT} w={4} />
        <Draw d="M308,500 L308,334" k={solid} stroke={ACCENT} w={4} />
        {/* the pennant on the left shoulder, pointing up the road */}
        {left > 0 && (
          <g opacity={left}>
            <path d="M138,512 h40 l-20,-46 z" fill={ACCENT} stroke="#111" strokeWidth={2} />
            <Label x={110} y={560} k={left} size={15} fill={CYAN} mono anchor="middle">LEFT SIDE</Label>
          </g>
        )}
        {/* your car, right lane */}
        <g transform="translate(355,600)">
          <rect x={-14} y={-24} width={28} height={48} rx={7} fill="#ffffff" stroke="#0f172a" strokeWidth={2} />
          <rect x={-10} y={-16} width={20} height={11} rx={3} fill="#93c5fd" />
        </g>
        {/* a pass that isn't allowed */}
        {solid > 0 && (
          <g opacity={solid}>
            <Draw d={`M355,575 C355,${540 - 10 * Math.sin(t)} 250,${520} 250,${460}`} k={solid} stroke={BAD} w={3} dash="8 8" />
            <path d="M232,446 l36,36 M268,446 l-36,36" stroke={BAD} strokeWidth={5} strokeLinecap="round" />
          </g>
        )}
      </g>

      {/* the trick: the point is a finger */}
      <Draw d="M158,466 L158,360" k={finger} stroke={GOOD} w={4} />
      {finger > 0.9 && <path d="M158,346 l-10,18 h20 z" fill={GOOD} />}
      <Label x={158} y={334} k={finger} size={20} fill={GOOD} weight={800}>NOT HERE</Label>
      <Label x={460} y={360} k={trick} size={17} fill={GOOD} weight={700} anchor="start">LEFT SIDE</Label>
      <Label x={460} y={388} k={onWord("trick", "sideways")} size={17} fill={GOOD} weight={700} anchor="start">SIDEWAYS ▷</Label>
      <Label x={460} y={416} k={onWord("trick", "no", 0.5)} size={17} fill={GOOD} weight={700} anchor="start">NO PASSING</Label>

      <AnswerCard k={lock} text="Start of a no passing zone" y={604} />
    </g>
  );
}
