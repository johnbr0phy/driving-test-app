"use client";

import { useEffect, useState } from "react";
import { estimateTimings, mistakeExplainerById, type MistakeManifest } from "@/lib/mistakeExplainers";
import { useMistakeManifest } from "@/components/mistakes/MistakeExplainerPlayer";
import { Stage3, type SceneProps3, type SoundCue } from "@/components/mistakes/Stage3";
import { W, H } from "@/components/mistakes/Stage2";
import { DoubleArrowScene3, doubleArrowCues } from "@/components/mistakes/scenes/DoubleArrow3";
import { CdiffScene3, cdiffCues } from "@/components/mistakes/scenes/Cdiff3";
import { SaNodeScene3, saNodeCues } from "@/components/mistakes/scenes/SaNode3";
import { GliptinScene3, gliptinCues } from "@/components/mistakes/scenes/Gliptin3";
import type { ReactNode } from "react";

/** The premium pass, one explainer so far. */
const SCENES3: Record<string, { Scene: (p: SceneProps3) => ReactNode; cues: (m: MistakeManifest) => SoundCue[] }> = {
  "dmv-double-arrow": { Scene: DoubleArrowScene3, cues: doubleArrowCues },
  "crcst-cdiff-spores": { Scene: CdiffScene3, cues: cdiffCues },
  "ccma-sa-node": { Scene: SaNodeScene3, cues: saNodeCues },
  "ptcb-gliptin": { Scene: GliptinScene3, cues: gliptinCues },
};

declare global {
  interface Window {
    __mx3?: { setT: (t: number) => Promise<void>; manifest: MistakeManifest; cues: SoundCue[] };
  }
}

/** One frame at a time of the premium design, for the film script: ?v=<id>. */
export default function Frame3Page() {
  const [id, setId] = useState<string | null>(null);
  const [t, setT] = useState(0);
  useEffect(() => setId(new URLSearchParams(location.search).get("v")), []);
  const ex = id ? mistakeExplainerById(id) : undefined;
  return ex && SCENES3[ex.id] ? <Frame key={ex.id} ex={ex} t={t} setT={setT} /> : null;
}

function Frame({ ex, t, setT }: { ex: NonNullable<ReturnType<typeof mistakeExplainerById>>; t: number; setT: (t: number) => void }) {
  const loaded = useMistakeManifest(ex);
  const m = loaded === null ? estimateTimings(ex) : loaded;
  const s = SCENES3[ex.id];
  useEffect(() => {
    if (!m) return;
    window.__mx3 = {
      manifest: m,
      cues: s.cues(m),
      setT: (next) => new Promise((r) => { setT(next); requestAnimationFrame(() => requestAnimationFrame(() => r())); }),
    };
  }, [m, s, setT]);
  if (!m) return null;
  return (
    <div id="mx-frame" style={{ width: W, height: H, position: "fixed", inset: 0, zIndex: 9999 }}>
      <Stage3 ex={ex} m={m} t={t} Scene={s.Scene} question={ex.question} />
    </div>
  );
}
