"use client";

import { useState } from "react";

/**
 * Small scientific calculator for the tools drawer. Evaluates with a
 * shunting-yard parser (no eval). Good enough for every SAT item; a Desmos
 * embed can replace it later behind the same drawer.
 */

type Tok = { t: "num"; v: number } | { t: "op"; v: string } | { t: "fn"; v: string } | { t: "("; v: "(" } | { t: ")"; v: ")" };

const PREC: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };
const FNS: Record<string, (x: number) => number> = {
  sin: (x) => Math.sin((x * Math.PI) / 180),
  cos: (x) => Math.cos((x * Math.PI) / 180),
  tan: (x) => Math.tan((x * Math.PI) / 180),
  sqrt: Math.sqrt,
  ln: Math.log,
  log: Math.log10,
};

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  const s = src.replace(/π/g, "pi").replace(/×/g, "*").replace(/÷/g, "/");
  while (i < s.length) {
    const c = s[i];
    if (c === " ") { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      out.push({ t: "num", v: Number(s.slice(i, j)) });
      i = j;
      continue;
    }
    if (/[a-z]/.test(c)) {
      let j = i;
      while (j < s.length && /[a-z]/.test(s[j])) j++;
      const w = s.slice(i, j);
      if (w === "pi") out.push({ t: "num", v: Math.PI });
      else if (w === "e") out.push({ t: "num", v: Math.E });
      else if (FNS[w]) out.push({ t: "fn", v: w });
      else throw new Error("bad");
      i = j;
      continue;
    }
    if ("+-*/^".includes(c)) { out.push({ t: "op", v: c }); i++; continue; }
    if (c === "(") { out.push({ t: "(", v: "(" }); i++; continue; }
    if (c === ")") { out.push({ t: ")", v: ")" }); i++; continue; }
    throw new Error("bad");
  }
  return out;
}

export function evaluate(src: string): number {
  const toks = tokenize(src);
  const output: Tok[] = [];
  const ops: Tok[] = [];
  let prev: Tok | null = null;
  for (const tok of toks) {
    if (tok.t === "num") output.push(tok);
    else if (tok.t === "fn") ops.push(tok);
    else if (tok.t === "op") {
      // unary minus
      if (tok.v === "-" && (!prev || (prev.t === "op") || prev.t === "(")) {
        output.push({ t: "num", v: 0 });
      }
      while (ops.length) {
        const top = ops[ops.length - 1];
        if (top.t === "fn" || (top.t === "op" && (PREC[top.v] > PREC[tok.v] || (PREC[top.v] === PREC[tok.v] && tok.v !== "^")))) output.push(ops.pop()!);
        else break;
      }
      ops.push(tok);
    } else if (tok.t === "(") ops.push(tok);
    else {
      while (ops.length && ops[ops.length - 1].t !== "(") output.push(ops.pop()!);
      if (!ops.length) throw new Error("paren");
      ops.pop();
      if (ops.length && ops[ops.length - 1].t === "fn") output.push(ops.pop()!);
    }
    prev = tok;
  }
  while (ops.length) {
    const op = ops.pop()!;
    if (op.t === "(") throw new Error("paren");
    output.push(op);
  }
  const st: number[] = [];
  for (const tok of output) {
    if (tok.t === "num") st.push(tok.v);
    else if (tok.t === "fn") st.push(FNS[tok.v](st.pop()!));
    else if (tok.t === "op") {
      const b = st.pop()!;
      const a = st.pop()!;
      st.push(tok.v === "+" ? a + b : tok.v === "-" ? a - b : tok.v === "*" ? a * b : tok.v === "/" ? a / b : Math.pow(a, b));
    }
  }
  if (st.length !== 1 || !Number.isFinite(st[0])) throw new Error("bad");
  return st[0];
}

const KEYS: string[][] = [
  ["sin(", "cos(", "tan(", "sqrt(", "^"],
  ["(", ")", "pi", "ln(", "log("],
  ["7", "8", "9", "÷", "⌫"],
  ["4", "5", "6", "×", "C"],
  ["1", "2", "3", "-", "+"],
];

export function Calculator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const press = (k: string) => {
    if (k === "C") { setExpr(""); setResult(null); return; }
    if (k === "⌫") { setExpr((e) => e.slice(0, -1)); return; }
    if (k === "=") {
      try {
        const v = evaluate(expr);
        setResult(Number.isInteger(v) ? String(v) : String(Number(v.toPrecision(10))));
      } catch {
        setResult("Error");
      }
      return;
    }
    setExpr((e) => e + k);
    setResult(null);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-gray-300 bg-white p-3 text-right">
        <input
          value={expr}
          onChange={(e) => { setExpr(e.target.value); setResult(null); }}
          onKeyDown={(e) => { if (e.key === "Enter") press("="); }}
          inputMode="none"
          className="w-full bg-transparent text-right text-lg tabular-nums outline-none"
          placeholder="0"
          aria-label="Calculator expression"
        />
        <div className="min-h-6 text-2xl font-bold tabular-nums">{result ?? ""}</div>
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1.5">
        {KEYS.flat().map((k, i) => (
          <button
            key={i}
            type="button"
            onClick={() => press(k)}
            className={`v2-tap rounded-lg border text-sm font-semibold ${k === "=" ? "border-brand bg-brand text-white" : /^[0-9.]$/.test(k) ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-100"}`}
          >
            {k}
          </button>
        ))}
        <button type="button" onClick={() => press("0")} className="v2-tap rounded-lg border border-gray-300 bg-white text-sm font-semibold">0</button>
        <button type="button" onClick={() => press(".")} className="v2-tap rounded-lg border border-gray-300 bg-white text-sm font-semibold">.</button>
        <button type="button" onClick={() => press("e")} className="v2-tap rounded-lg border border-gray-200 bg-gray-100 text-sm font-semibold">e</button>
        <button type="button" onClick={() => press("=")} className="v2-tap col-span-2 rounded-lg border border-brand bg-brand text-sm font-semibold text-white">=</button>
      </div>
      <p className="mt-2 text-[11px] text-gray-500">Trig functions take degrees. Type directly or tap the keys.</p>
    </div>
  );
}
