import { ACCENT, AnswerCard, CYAN, Draw, GOOD, INK, Label, SceneProps, Wrong, cubic, sceneHelpers } from "../Stage";

/** DMV U-019: the double arrow sign (MUTCD W12-1) and the island it stands on. */

const SIGN = { x: 300, y: 165, r: 118 };
// The two paths around the island, bottom (approach) to top.
const LEFT = [[300, 650], [300, 585], [200, 560], [200, 480], [200, 400], [300, 375], [300, 320]];
const RIGHT = LEFT.map(([x, y]) => [600 - x, y]);
const pathD = (pts: number[][]) => `M${pts[0]} C${pts[1]} ${pts[2]} ${pts[3]} C${pts[4]} ${pts[5]} ${pts[6]}`;
function along(pts: number[][], u: number): [number, number] {
  return u < 0.5 ? cubic(pts[0], pts[1], pts[2], pts[3], u * 2) : cubic(pts[3], pts[4], pts[5], pts[6], u * 2 - 1);
}

export function DoubleArrowScene(props: SceneProps) {
  const { t } = props;
  const { p, onWord } = sceneHelpers(props);
  const sign = p("question", 0, 0.9);
  const arrowsHi = p("arrows", 0.2);
  const road = p("island", 0, 1);
  const island = onWord("island", "island", 0.6);
  const paths = onWord("island", "paths", 1);
  const trick = p("trick");
  const lock = p("lock", 0.6);
  const s = SIGN;
  const arrowStroke = arrowsHi > 0 ? CYAN : "#111";

  // The car drives the left path, then the right, during the trick and after.
  const carT = t - (props.at("trick").start + 0.3);
  const lap = 2.6;
  const onLeft = carT >= 0 && carT < lap;
  const onRight = carT >= lap && carT < lap * 2;
  const car = onLeft ? along(LEFT, carT / lap) : onRight ? along(RIGHT, (carT - lap) / lap) : null;

  return (
    <g>
      <defs>
        <pattern id="mx-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke={ACCENT} strokeWidth="3" />
        </pattern>
      </defs>

      {/* the sign */}
      <g opacity={sign} transform={`translate(${s.x},${s.y}) scale(${0.85 + 0.15 * sign}) translate(${-s.x},${-s.y})`}>
        <path d={`M${s.x},${s.y - s.r} L${s.x + s.r},${s.y} L${s.x},${s.y + s.r} L${s.x - s.r},${s.y} Z`} fill={ACCENT} stroke="#111" strokeWidth={5} strokeLinejoin="round" />
        <path d={`M${s.x},${s.y - s.r + 14} L${s.x + s.r - 14},${s.y} L${s.x},${s.y + s.r - 14} L${s.x - s.r + 14},${s.y} Z`} fill="none" stroke="#111" strokeWidth={3} />
        <g stroke={arrowStroke} strokeWidth={13} strokeLinecap="round" fill="none">
          <path d={`M${s.x},${s.y - 40} L${s.x - 48},${s.y + 38}`} />
          <path d={`M${s.x},${s.y - 40} L${s.x + 48},${s.y + 38}`} />
        </g>
        <g fill={arrowStroke}>
          <path d={head(s.x, s.y - 40, s.x - 48, s.y + 38)} />
          <path d={head(s.x, s.y - 40, s.x + 48, s.y + 38)} />
        </g>
      </g>

      {/* the wrong guesses */}
      <Wrong x={95} y={70} k={onWord("trap", "merging")} text="MERGE?" />
      <Wrong x={505} y={70} k={onWord("trap", "both")} text="TWO-WAY?" />

      {/* callouts on the arrows */}
      <Draw d={`M${s.x},${s.y - 40} L${s.x},${s.y - 140}`} k={arrowsHi} stroke={CYAN} w={1.6} dash="5 6" />
      <Label x={s.x} y={s.y - 150} k={arrowsHi} size={17} fill={CYAN} mono>START: THE MIDDLE</Label>
      <Draw d={`M${s.x - 66},${s.y + 70} L${s.x - 150},${s.y + 120}`} k={onWord("arrows", "left")} stroke={CYAN} w={1.6} />
      <Label x={s.x - 190} y={s.y + 140} k={onWord("arrows", "left")} size={17} fill={CYAN} mono>LEFT</Label>
      <Draw d={`M${s.x + 66},${s.y + 70} L${s.x + 150},${s.y + 120}`} k={onWord("arrows", "right")} stroke={CYAN} w={1.6} />
      <Label x={s.x + 190} y={s.y + 140} k={onWord("arrows", "right")} size={17} fill={CYAN} mono>RIGHT</Label>

      {/* road plan */}
      <g opacity={road}>
        <Label x={300} y={322} k={road} size={15} fill="#7f9cc7" mono>PLAN VIEW · YOUR ROAD</Label>
        <Draw d="M130,340 L130,660" k={road} stroke={INK} w={3} />
        <Draw d="M470,340 L470,660" k={road} stroke={INK} w={3} />
        {island > 0 && (
          <g opacity={island}>
            <rect x={262} y={425} width={76} height={110} rx={36} fill="url(#mx-hatch)" stroke={ACCENT} strokeWidth={3} />
            {/* the sign on its post, on the island */}
            <path d="M300,447 l14,14 l-14,14 l-14,-14 z" fill={ACCENT} stroke="#111" strokeWidth={2} />
            <Label x={300} y={565} k={island} size={15} fill={ACCENT} mono>ISLAND</Label>
          </g>
        )}
        <Draw d={pathD(LEFT)} k={paths} stroke={trick > 0 ? GOOD : CYAN} w={4} />
        <Draw d={pathD(RIGHT)} k={ramp2(paths)} stroke={trick > 0 ? GOOD : CYAN} w={4} />
        {paths > 0.95 && (
          <g fill={trick > 0 ? GOOD : CYAN}>
            <path d="M300,312 l-9,16 h18 z" />
          </g>
        )}
      </g>

      {/* "this way, or this way" */}
      <Label x={168} y={480} k={onWord("trick", "this")} size={18} fill={GOOD} weight={800} anchor="end">THIS WAY</Label>
      <Label x={432} y={480} k={onWord("trick", 15)} size={18} fill={GOOD} weight={800} anchor="start">OR THIS</Label>

      {car && (
        <g transform={`translate(${car[0]},${car[1]})`}>
          <rect x={-13} y={-22} width={26} height={44} rx={7} fill="#ffffff" stroke="#0f172a" strokeWidth={2} />
          <rect x={-9} y={-15} width={18} height={10} rx={3} fill="#93c5fd" />
        </g>
      )}

      <AnswerCard k={lock} text="Pass on either side of an obstruction" y={604} />
    </g>
  );
}

function ramp2(k: number) {
  return Math.max(0, Math.min(1, k * 1.2 - 0.2));
}

/** A filled arrowhead on the end of the shaft from (x1,y1) to (x2,y2). */
function head(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy);
  const ux = dx / l, uy = dy / l;
  const tip = [x2 + ux * 26, y2 + uy * 26];
  const back = [x2 - ux * 6, y2 - uy * 6];
  return `M${tip} L${back[0] - uy * 17},${back[1] + ux * 17} L${back[0] + uy * 17},${back[1] - ux * 17} Z`;
}
