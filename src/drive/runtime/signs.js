// Sign faces, painted on a 2D canvas. The same painter feeds the in-world
// texture and the small picture on the decision card, so they always match.
// Canvas only, never over 256 px.

const YELLOW = "#fcd116";
const BLACK = "#111111";

function diamond(ctx, S) {
  const m = S * 0.04;
  ctx.beginPath();
  ctx.moveTo(S / 2, m);
  ctx.lineTo(S - m, S / 2);
  ctx.lineTo(S / 2, S - m);
  ctx.lineTo(m, S / 2);
  ctx.closePath();
  ctx.fillStyle = YELLOW;
  ctx.fill();
  ctx.lineWidth = S * 0.035;
  ctx.strokeStyle = BLACK;
  ctx.lineJoin = "round";
  ctx.stroke();
}

function arrow(ctx, x0, y0, x1, y1, width) {
  const angle = Math.atan2(y1 - y0, x1 - x0);
  const head = width * 2.6;
  ctx.lineWidth = width;
  ctx.lineCap = "butt";
  ctx.strokeStyle = BLACK;
  ctx.fillStyle = BLACK;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1 - Math.cos(angle) * head * 0.6, y1 - Math.sin(angle) * head * 0.6);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1 - Math.cos(angle - 0.5) * head, y1 - Math.sin(angle - 0.5) * head);
  ctx.lineTo(x1 - Math.cos(angle + 0.5) * head, y1 - Math.sin(angle + 0.5) * head);
  ctx.closePath();
  ctx.fill();
}

const PAINTERS = {
  /** W14-3: the only pennant-shaped sign. Yellow, pointing right, on the left side of the road. */
  pennant(ctx, S) {
    const m = S * 0.04;
    ctx.beginPath();
    ctx.moveTo(m, S * 0.16);
    ctx.lineTo(S - m, S / 2);
    ctx.lineTo(m, S * 0.84);
    ctx.closePath();
    ctx.fillStyle = YELLOW;
    ctx.fill();
    ctx.lineWidth = S * 0.03;
    ctx.strokeStyle = BLACK;
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.fillStyle = BLACK;
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.font = `bold ${S * 0.115}px Arial, Helvetica, sans-serif`;
    ctx.fillText("NO", S * 0.1, S * 0.36);
    ctx.fillText("PASSING", S * 0.1, S * 0.5);
    ctx.fillText("ZONE", S * 0.1, S * 0.64);
  },
  /** W12-1: two arrows pointing down and apart. */
  doubleArrow(ctx, S) {
    diamond(ctx, S);
    const w = S * 0.07;
    arrow(ctx, S * 0.5, S * 0.3, S * 0.27, S * 0.68, w);
    arrow(ctx, S * 0.5, S * 0.3, S * 0.73, S * 0.68, w);
  },
  /** W8-1: the MUTCD gives this sign a word legend only, no symbol. */
  bump(ctx, S) {
    diamond(ctx, S);
    ctx.fillStyle = BLACK;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${S * 0.2}px Arial, Helvetica, sans-serif`;
    ctx.fillText("BUMP", S / 2, S / 2 + S * 0.01);
  },
  /** A red or yellow signal lens, for the decision card only. */
  redLight(ctx, S) {
    signalHead(ctx, S, "#ef4444");
  },
  yellowLight(ctx, S) {
    signalHead(ctx, S, "#facc15");
  },
};

function signalHead(ctx, S, color) {
  ctx.fillStyle = "#1f2937";
  const w = S * 0.56;
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect((S - w) / 2, S * 0.08, w, S * 0.84, S * 0.08) : ctx.rect((S - w) / 2, S * 0.08, w, S * 0.84);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S * 0.2, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  // Short rays: the light is flashing.
  ctx.strokeStyle = color;
  ctx.lineWidth = S * 0.035;
  ctx.lineCap = "round";
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(S / 2 + Math.cos(a) * S * 0.25, S / 2 + Math.sin(a) * S * 0.25);
    ctx.lineTo(S / 2 + Math.cos(a) * S * 0.31, S / 2 + Math.sin(a) * S * 0.31);
    ctx.stroke();
  }
}

export const SIGN_KINDS = Object.keys(PAINTERS);

/** Paint a sign onto a square canvas. */
export function paintSign(kind, canvas) {
  const painter = PAINTERS[kind];
  if (!painter) throw new Error(`Unknown sign: ${kind}`);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  painter(ctx, canvas.width);
  return canvas;
}

/** White text on a clear background, for the distance marks on the road. */
export function paintLabel(text, canvas, color = "#ffffff") {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `bold ${canvas.height * 0.7}px Arial, Helvetica, sans-serif`;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  return canvas;
}

/** A data URL for the decision card. Browser only. */
export function signDataUrl(kind, size = 128) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  return paintSign(kind, canvas).toDataURL("image/png");
}
