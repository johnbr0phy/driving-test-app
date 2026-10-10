"use client";

import { useMemo, Fragment, ReactNode } from "react";
import katex from "katex";

/**
 * Minimal rich text for v2 banks: $inline$ and $$display$$ KaTeX, **bold**,
 * *italic*, __underline__, "- " bullet lines, pipe tables, blank-line
 * paragraphs. No HTML passthrough: everything is escaped by React except
 * KaTeX's own output.
 */

function tex(src: string, display: boolean): string {
  try {
    return katex.renderToString(src, { displayMode: display, throwOnError: false, strict: "ignore", output: "html" });
  } catch {
    return src;
  }
}

// A literal dollar sign (prices) is written \$ in bank text so it is never
// read as a math delimiter. Swapped for a placeholder before the math split.
const DOLLAR = "\u0001";

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  // Split on inline math first so markdown markers inside math are untouched.
  const parts = text.replace(/\\\$/g, DOLLAR).split(/(\$[^$\n]+?\$)/g);
  parts.forEach((part, i) => {
    if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
      out.push(<span key={`${keyBase}-m${i}`} className="v2-tex" dangerouslySetInnerHTML={{ __html: tex(part.slice(1, -1).replace(new RegExp(DOLLAR, "g"), "\\$"), false) }} />);
      return;
    }
    part = part.replace(new RegExp(DOLLAR, "g"), "$");
    const tokens = part.split(/(\*\*[^*]+\*\*|__[^_]+__|\*[^*\n]+\*)/g);
    tokens.forEach((tok, j) => {
      const key = `${keyBase}-${i}-${j}`;
      if (tok.startsWith("**") && tok.endsWith("**")) out.push(<strong key={key}>{tok.slice(2, -2)}</strong>);
      else if (tok.startsWith("__") && tok.endsWith("__")) out.push(<u key={key} className="decoration-2 underline-offset-2">{tok.slice(2, -2)}</u>);
      else if (tok.startsWith("*") && tok.endsWith("*") && tok.length > 2) out.push(<em key={key}>{tok.slice(1, -1)}</em>);
      else if (tok) out.push(<Fragment key={key}>{tok}</Fragment>);
    });
  });
  return out;
}

function isTableLine(line: string) {
  return /^\s*\|.*\|\s*$/.test(line);
}

function Table({ lines, keyBase }: { lines: string[]; keyBase: string }) {
  const rows = lines
    .filter((l) => !/^\s*\|?\s*:?-{2,}/.test(l))
    .map((l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
  const [head, ...body] = rows;
  return (
    <div className="my-3 overflow-x-auto">
      <table className="min-w-[16rem] text-sm border-collapse">
        <thead>
          <tr>
            {head.map((c, i) => (
              <th key={i} className="border border-gray-300 bg-gray-50 px-3 py-1.5 text-left font-semibold">
                {inline(c, `${keyBase}-h${i}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td key={ci} className="border border-gray-300 px-3 py-1.5 tabular-nums">
                  {inline(c, `${keyBase}-${ri}-${ci}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RichText({ text, className = "" }: { text: string; className?: string }) {
  const nodes = useMemo(() => {
    const blocks: ReactNode[] = [];
    const lines = text.replace(/\r/g, "").split("\n");
    let i = 0;
    let para: string[] = [];
    const flushPara = () => {
      if (para.length === 0) return;
      const joined = para.join(" ");
      blocks.push(
        <p key={`p${blocks.length}`} className="my-2 first:mt-0 last:mb-0">
          {inline(joined, `p${blocks.length}`)}
        </p>
      );
      para = [];
    };
    while (i < lines.length) {
      const line = lines[i];
      if (line.trim().startsWith("$$")) {
        flushPara();
        const buf: string[] = [];
        let l = line.trim().slice(2);
        while (!l.includes("$$") && i + 1 < lines.length) {
          buf.push(l);
          i++;
          l = lines[i];
        }
        buf.push(l.replace("$$", ""));
        blocks.push(<div key={`d${blocks.length}`} className="v2-tex my-2 overflow-x-auto" dangerouslySetInnerHTML={{ __html: tex(buf.join("\n"), true) }} />);
        i++;
        continue;
      }
      if (isTableLine(line)) {
        flushPara();
        const buf: string[] = [];
        while (i < lines.length && isTableLine(lines[i])) buf.push(lines[i++]);
        blocks.push(<Table key={`t${blocks.length}`} lines={buf} keyBase={`t${blocks.length}`} />);
        continue;
      }
      if (/^\s*- /.test(line)) {
        flushPara();
        const items: string[] = [];
        while (i < lines.length && /^\s*- /.test(lines[i])) items.push(lines[i++].replace(/^\s*- /, ""));
        blocks.push(
          <ul key={`u${blocks.length}`} className="my-2 list-disc pl-5 space-y-1">
            {items.map((it, k) => (
              <li key={k}>{inline(it, `u${blocks.length}-${k}`)}</li>
            ))}
          </ul>
        );
        continue;
      }
      if (line.trim() === "") {
        flushPara();
        i++;
        continue;
      }
      para.push(line);
      i++;
    }
    flushPara();
    return blocks;
  }, [text]);

  return <div className={`v2-rich leading-relaxed ${className}`}>{nodes}</div>;
}
