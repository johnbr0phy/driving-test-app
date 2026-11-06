"use client";

import { useState } from "react";
import { MISTAKE_EXPLAINERS, estimateTimings, type MistakeExplainer } from "@/lib/mistakeExplainers";
import { MistakeExplainerPlayer, useMistakeManifest } from "@/components/mistakes/MistakeExplainerPlayer";
import { Stage2 } from "@/components/mistakes/Stage2";
import { SCENES2 } from "@/components/mistakes/scenes";

/** Preview of every mistake explainer (noindex): a poster frame each, tap to play. */
export default function ExplainersPage() {
  const [open, setOpen] = useState<MistakeExplainer | null>(null);
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Mistake explainers</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-6">The most-missed questions, broken down by the test&apos;s tiger.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MISTAKE_EXPLAINERS.map((ex) => (
            <Poster key={ex.id} ex={ex} onOpen={() => setOpen(ex)} />
          ))}
        </div>
      </div>
      {open && <MistakeExplainerPlayer ex={open} onClose={() => setOpen(null)} />}
    </main>
  );
}

function Poster({ ex, onOpen }: { ex: MistakeExplainer; onOpen: () => void }) {
  const m = useMistakeManifest(ex) ?? estimateTimings(ex);
  const lock = m.beats[m.beats.length - 1];
  return (
    <button onClick={onOpen} className="text-left group">
      <div className="aspect-[9/16] rounded-xl overflow-hidden shadow group-hover:shadow-lg transition-shadow">
        <Stage2 ex={ex} m={m} t={lock.start + 0.6} Scene={SCENES2[ex.id]} question={ex.question} />
      </div>
      <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-50">{ex.title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{ex.testName}</p>
    </button>
  );
}
