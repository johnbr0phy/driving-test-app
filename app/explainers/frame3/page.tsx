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
import { Stage4, END_HOLD } from "@/components/mistakes/Stage4";
import { CdiffScene4 } from "@/components/mistakes/scenes/Cdiff4";
import { CdiffKhan } from "@/components/mistakes/styles/CdiffKhan";
import { CdiffOsmosis } from "@/components/mistakes/styles/CdiffOsmosis";
import { CdiffCartoon } from "@/components/mistakes/styles/CdiffCartoon";
import type { MistakeExplainer } from "@/lib/mistakeExplainers";

/** Whole-frame style tries (?s=khan|osmosis|cartoon), each drawing its own frame. */
const STYLES: Record<string, Record<string, (p: { ex: MistakeExplainer; m: MistakeManifest; t: number }) => ReactNode>> = {
  khan: { "crcst-cdiff-spores": CdiffKhan },
  osmosis: { "crcst-cdiff-spores": CdiffOsmosis },
  cartoon: { "crcst-cdiff-spores": CdiffCartoon },
};
import type { ReactNode } from "react";

/** The premium pass, one explainer so far. */
const SCENES3: Record<string, { Scene: (p: SceneProps3) => ReactNode; cues: (m: MistakeManifest) => SoundCue[] }> = {
  "dmv-double-arrow": { Scene: DoubleArrowScene3, cues: doubleArrowCues },
  "crcst-cdiff-spores": { Scene: CdiffScene3, cues: cdiffCues },
  "ccma-sa-node": { Scene: SaNodeScene3, cues: saNodeCues },
  "ptcb-gliptin": { Scene: GliptinScene3, cues: gliptinCues },
};

/** The dark design (Stage4, ?d=4): scene, test label and the end card's line. */
const SCENES4: Record<string, { Scene: (p: SceneProps3) => ReactNode; label: string; practice: string }> = {
  "crcst-cdiff-spores": { Scene: CdiffScene4, label: "CRCST", practice: "4 full CRCST practice tests, plus practice sets" },
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
  const [d4, setD4] = useState(false);
  const [style, setStyle] = useState<string | null>(null);
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    setId(q.get("v"));
    setD4(q.get("d") === "4");
    setStyle(q.get("s"));
  }, []);
  const ex = id ? mistakeExplainerById(id) : undefined;
  if (!ex) return null;
  if (style) {
    const Style = STYLES[style]?.[ex.id];
    return Style ? <Frame key={ex.id + style} ex={ex} t={t} setT={setT} d4 Style={Style} /> : null;
  }
  if (d4) return SCENES4[ex.id] ? <Frame key={ex.id + "4"} ex={ex} t={t} setT={setT} d4 /> : null;
  return SCENES3[ex.id] ? <Frame key={ex.id} ex={ex} t={t} setT={setT} /> : null;
}

function Frame({ ex, t, setT, d4 = false, Style }: { ex: NonNullable<ReturnType<typeof mistakeExplainerById>>; t: number; setT: (t: number) => void; d4?: boolean; Style?: (p: { ex: MistakeExplainer; m: MistakeManifest; t: number }) => ReactNode }) {
  const loaded = useMistakeManifest(ex);
  const base = loaded === null ? estimateTimings(ex) : loaded;
  // the dark design holds an end card after the last word
  const m = base && d4 ? { ...base, duration: base.duration + END_HOLD } : base;
  const s = SCENES3[ex.id] ?? { Scene: () => null, cues: () => [] };
  const s4 = SCENES4[ex.id];
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
      {Style ? <Style ex={ex} m={m} t={t} /> : d4 && s4
        ? <Stage4 ex={ex} m={m} t={t} Scene={s4.Scene} testLabel={s4.label} practiceLine={s4.practice} />
        : <Stage3 ex={ex} m={m} t={t} Scene={s.Scene} question={ex.question} />}
    </div>
  );
}
