"use client";

import { useMemo } from "react";
import { richTextBlocks, type RenderSlot } from "@/components/v2/richTextNodes";

export type { Slot } from "@/components/v2/richTextNodes";

// Client wrapper; the parser and KaTeX rendering live in richTextNodes.tsx.
export function RichText({ text, className = "", renderSlot }: { text: string; className?: string; renderSlot?: RenderSlot }) {
  const nodes = useMemo(() => richTextBlocks(text, renderSlot), [text, renderSlot]);
  return <div className={`v2-rich leading-relaxed ${className}`}>{nodes}</div>;
}
