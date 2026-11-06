"use client";

import { useEffect, useState } from "react";
import { estimateTimings, mistakeExplainerById, type MistakeManifest } from "@/lib/mistakeExplainers";
import { useMistakeManifest } from "@/components/mistakes/MistakeExplainerPlayer";
import { Stage, W, H } from "@/components/mistakes/Stage";
import { SCENES, SCENES2 } from "@/components/mistakes/scenes";
import { Stage2 } from "@/components/mistakes/Stage2";

declare global {
  interface Window {
    __mx?: { setT: (t: number) => Promise<void>; manifest: MistakeManifest };
  }
}

/** One frame at a time, for scripts/film-mistake-explainers.mjs: ?v=<id>. */
export default function FramePage() {
  const [id, setId] = useState<string | null>(null);
  const [t, setT] = useState(0);
  useEffect(() => setId(new URLSearchParams(location.search).get("v")), []);
  const ex = id ? mistakeExplainerById(id) : undefined;
  return ex ? <Frame key={ex.id} ex={ex} t={t} setT={setT} /> : null;
}

function Frame({ ex, t, setT }: { ex: NonNullable<ReturnType<typeof mistakeExplainerById>>; t: number; setT: (t: number) => void }) {
  const loaded = useMistakeManifest(ex);
  // A storyboard whose voice is not recorded yet runs on estimated timings.
  const m = loaded === null ? estimateTimings(ex) : loaded;
  useEffect(() => {
    if (!m) return;
    window.__mx = {
      manifest: m,
      setT: (next) => new Promise((r) => { setT(next); requestAnimationFrame(() => requestAnimationFrame(() => r())); }),
    };
  }, [m, setT]);
  if (!m) return null;
  return (
    <div id="mx-frame" style={{ width: W, height: H, position: "fixed", inset: 0, zIndex: 9999 }}>
      {SCENES2[ex.id] ? <Stage2 ex={ex} m={m} t={t} Scene={SCENES2[ex.id]} question={ex.question} /> : <Stage ex={ex} m={m} t={t} Scene={SCENES[ex.id]} />}
    </div>
  );
}
