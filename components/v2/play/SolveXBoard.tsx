"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Draggable, DraggableRenderer, translate } from "dragology";

/**
 * "Now you try" for the solveX Basics skill: an equation the student
 * solves by moving its parts, built on Dragology (declarative dragging,
 * MIT). Each state of the board is a step of the solution; a part can
 * only be dragged to the next legal state, so a wrong move snaps back.
 * Every move also works as a tap (the library treats a press under 2px
 * of movement as a click) and from the keyboard (Enter or Space on a
 * focused part), so dragging is never required.
 *
 *   0  3x + 4 = 19      drag the +4 across the =
 *   1  3x = 19 − 4      tap 19 − 4 to work it out
 *   2  3x = 15          drag the 3 under the 15
 *   3  x = 15 / 3       tap the fraction to work it out
 *   4  x = 5
 */

export interface SolveXProblem {
  a: number;
  b: number;
  c: number;
}

/** Two-step problems with whole-number answers, a different sign each time. */
export const SOLVE_X_PROBLEMS: SolveXProblem[] = [
  { a: 2, b: 5, c: 11 },
  { a: 4, b: -3, c: 17 },
  { a: 5, b: 6, c: 31 },
];

type Stage = 0 | 1 | 2 | 3 | 4;
type State = { stage: Stage };

const W = 340;
const H = 150;
const MID = 84; // baseline of the equation row
const CHAR = 19; // width of one character at the board's font size
const GAP = 16;

const minus = (n: number) => (n < 0 ? `−${-n}` : `${n}`);
const signed = (n: number) => (n < 0 ? `− ${-n}` : `+ ${n}`);

/** What the student is told under the board at each stage. */
export function solveXPrompt(p: SolveXProblem, stage: Stage): string {
  const loose = signed(p.b).replace(" ", "");
  switch (stage) {
    case 0:
      return `Drag the ${loose} across the = sign (or tap it). It flips sign on the other side.`;
    case 1:
      return `Now tap ${minus(p.c)} ${signed(-p.b)} to work it out.`;
    case 2:
      return `x is still stuck to the ${p.a}. Drag the ${p.a} under the ${minus(p.c - p.b)} (or tap it) to divide.`;
    case 3:
      return `Tap the fraction to work it out.`;
    default:
      return `x = ${(p.c - p.b) / p.a}. Check: ${p.a} × ${(p.c - p.b) / p.a} ${signed(p.b)} = ${p.c} ✓`;
  }
}

export function SolveXBoard({ problem, onStage, onWrongMove }: {
  problem: SolveXProblem;
  /** Called after every move with the new stage (4 is solved). */
  onStage: (stage: Stage) => void;
  /** A tap on a part that cannot move yet. */
  onWrongMove: (message: string) => void;
}) {
  const [state, setState] = useState<State>({ stage: 0 });
  const p = problem;
  const right = p.c - p.b;
  const answer = right / p.a;

  const go = useCallback(
    (s: State) => {
      setState(s);
      onStage(s.stage);
    },
    [onStage],
  );

  const draggable = useMemo<Draggable<State>>(() => {
    return function SolveXDraggable({ state: s, d, draggedId }) {
      const { stage } = s;
      // Token texts and widths for this stage.
      const coefText = `${p.a}`;
      const looseText = stage === 0 ? signed(p.b) : signed(-p.b);
      const cText = stage <= 1 ? minus(p.c) : stage <= 3 ? minus(right) : minus(answer);
      const w = (t: string) => t.replace(/ /g, "").length * CHAR + (t.includes(" ") ? 8 : 0);

      // Lay out the row left to right, then centre it. The coefficient sits
      // tight against x (3x, not 3 x); the moving term gets extra room.
      type Slot = { id: string; text: string; x: number; y: number; show: boolean };
      const row: { id: string; text: string; width: number; gap: number }[] = [];
      if (stage <= 2) row.push({ id: "coef", text: coefText, width: w(coefText), gap: 2 });
      row.push({ id: "x", text: "x", width: CHAR, gap: stage === 0 ? 22 : GAP });
      if (stage === 0) row.push({ id: "loose", text: looseText, width: w(looseText), gap: 22 });
      row.push({ id: "eq", text: "=", width: CHAR, gap: stage === 3 ? 30 : GAP });
      row.push({ id: "c", text: cText, width: stage === 3 ? Math.max(w(cText), w(coefText)) : w(cText), gap: 10 });
      if (stage === 1) row.push({ id: "loose", text: looseText, width: w(looseText), gap: 0 });
      const total = row.reduce((sum, t, i) => sum + t.width + (i < row.length - 1 ? t.gap : 0), 0);
      let at = (W - total) / 2;
      const slots: Record<string, Slot> = {};
      for (const t of row) {
        slots[t.id] = { id: t.id, text: t.text, x: at + t.width / 2, y: MID, show: true };
        at += t.width + t.gap;
      }
      // Stage 3: the coefficient sits under the right side as a divisor.
      if (stage === 3) {
        const c = slots.c;
        c.y = MID - 24;
        slots.coef = { id: "coef", text: coefText, x: c.x, y: MID + 32, show: true };
      }
      // Parts that have left the row stay in the tree, hidden where they were absorbed,
      // so the library can animate them away instead of popping.
      if (!slots.loose) slots.loose = { id: "loose", text: looseText, x: slots.c.x, y: slots.c.y, show: false };
      if (!slots.coef) slots.coef = { id: "coef", text: coefText, x: slots.c.x, y: MID + 32, show: false };

      const toward = (stage + 1) as Stage;
      const looseShort = signed(p.b).replace(" ", "");
      const wrong: Record<string, string> = {
        "0:coef": `Not yet. Undo in reverse order: move the loose ${looseShort} first.`,
        "0:x": `Leave x where it is. Move the ${looseShort} away from it.`,
        "0:c": `Start with the ${looseShort} on the left.`,
        "2:x": `x stays. Move the ${p.a} that is stuck to it.`,
        "2:c": `Drag the ${p.a} instead. It is stuck to x by multiplying.`,
      };
      // Drag moves, and "work it out" taps on the right side (stages 1 and 3).
      const dragMoves = new Set(["0:loose", "2:coef"]);
      const workStage = stage === 1 || stage === 3;

      const act = (id: string) => {
        const k = `${stage}:${id}`;
        if (dragMoves.has(k)) go({ stage: toward });
        else if (wrong[k]) onWrongMove(wrong[k]);
      };
      const keys = (fn: () => void) => (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fn();
        }
      };

      // Every token has the same children in every state (a pill and a text),
      // because the library interpolates between renders element by element.
      const token = (sl: Slot) => {
        const k = `${stage}:${sl.id}`;
        const canDrag = sl.show && dragMoves.has(k);
        const nudge = sl.show && !!wrong[k];
        const lifted = draggedId === `sx-${sl.id}`;
        const color = sl.id === "x" ? "hsl(var(--brand))" : canDrag ? "hsl(var(--brand-dark))" : "currentColor";
        const pw = w(sl.text) + 20;
        return (
          <g
            id={`sx-${sl.id}`}
            transform={translate(sl.x, sl.y)}
            opacity={sl.show ? 1 : 0}
            dragologyZIndex={lifted ? "/2" : false}
            dragologyOnDrag={canDrag ? () => d.closest([s, { stage: toward }]).withFloating() : undefined}
            onClick={canDrag || nudge ? () => act(sl.id) : undefined}
            onKeyDown={canDrag ? keys(() => act(sl.id)) : undefined}
            tabIndex={canDrag ? 0 : undefined}
            role={canDrag ? "button" : undefined}
            aria-label={canDrag ? (sl.id === "loose" ? `${sl.text}. Move it to the other side of the equals sign.` : `${sl.text}. Divide both sides by ${sl.text}.`) : undefined}
            aria-hidden={canDrag ? undefined : true}
            style={{ cursor: canDrag ? (lifted ? "grabbing" : "grab") : nudge ? "pointer" : "default", outline: "none", pointerEvents: canDrag || nudge ? "auto" : "none" }}
          >
            <rect
              x={-pw / 2}
              y={-34}
              width={pw}
              height={46}
              rx={12}
              fill="hsl(var(--brand-light))"
              stroke="hsl(var(--brand))"
              strokeWidth={2}
              strokeDasharray="5 4"
              opacity={canDrag ? 1 : 0}
            />
            <text textAnchor="middle" fontSize={34} fontWeight={700} fill={color} style={{ fontVariantNumeric: "tabular-nums", userSelect: "none" }}>
              {sl.text}
            </text>
          </g>
        );
      };

      const c = slots.c;
      // The "work it out" target: the whole right side (19 − 4, or the fraction).
      const half = stage === 3 ? Math.max(w(c.text), w(coefText)) / 2 + 12 : w(c.text) / 2;
      const workLeft = c.x - half - 14;
      const workRight = stage === 1 ? slots.loose.x + w(slots.loose.text) / 2 + 14 : c.x + half + 14;
      const workTop = stage === 3 ? MID - 62 : MID - 38;
      const workBottom = stage === 3 ? MID + 44 : MID + 16;
      return (
        <g>
          <g
            id="sx-work"
            transform={translate(0, 0)}
            onClick={workStage ? () => go({ stage: toward }) : undefined}
            onKeyDown={workStage ? keys(() => go({ stage: toward })) : undefined}
            tabIndex={workStage ? 0 : undefined}
            role={workStage ? "button" : undefined}
            aria-label={workStage ? (stage === 1 ? `${c.text} ${slots.loose.text}. Work it out.` : `${c.text} divided by ${p.a}. Work it out.`) : undefined}
            aria-hidden={workStage ? undefined : true}
            style={{ cursor: workStage ? "pointer" : "default", outline: "none" }}
          >
            <rect x={workLeft} y={workTop} width={Math.max(0, workRight - workLeft)} height={workBottom - workTop} rx={14} fill="hsl(var(--brand-light))" stroke="hsl(var(--brand))" strokeWidth={2} opacity={workStage && !draggedId ? 1 : 0} />
          </g>
          {/* Fraction bar under the right side once the coefficient has moved there. */}
          <g id="sx-bar" transform={translate(c.x, MID - 4)} opacity={stage === 3 ? 1 : 0} aria-hidden="true">
            <line x1={-half} y1={0} x2={half} stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
          </g>
          {["coef", "x", "loose", "eq", "c"].map((id) => token(slots[id]))}
        </g>
      );
    };
  }, [p.a, p.b, p.c, right, answer, go, onWrongMove]);

  // The library reads the SVG's on-screen size against its width to map the
  // pointer, so the board is scaled with a CSS transform to fit narrow phones.
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={boxRef} className="w-full select-none text-gray-900 dark:text-gray-50" style={{ height: H * scale, touchAction: "none" }}>
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left", marginLeft: `max(0px, calc((100% - ${W}px) / 2))` }}>
        <DraggableRenderer draggable={draggable} state={state} onDropState={go} width={W} height={H} />
      </div>
    </div>
  );
}
