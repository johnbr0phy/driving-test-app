"use client";

// John's head-tracker from johnbrophy.net: nine photos (center + eight
// directions) and the nearest one to the pointer is shown. Black sweater in
// light mode, white in dark. On touch screens it follows taps instead.

import { useEffect, useRef, useState } from "react";

const DIRS = [
  { id: "right", angle: 0 },
  { id: "down-right", angle: 45 },
  { id: "down", angle: 90 },
  { id: "down-left", angle: 135 },
  { id: "left", angle: 180 },
  { id: "up-left", angle: -135 },
  { id: "up", angle: -90 },
  { id: "up-right", angle: -45 },
];
const FRAMES = ["center", ...DIRS.map((d) => d.id)];

function nearestDir(dx: number, dy: number) {
  const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
  let best = DIRS[0].id;
  let bestDelta = 999;
  for (const d of DIRS) {
    let delta = Math.abs(deg - d.angle);
    if (delta > 180) delta = 360 - delta;
    if (delta < bestDelta) {
      bestDelta = delta;
      best = d.id;
    }
  }
  return best;
}

export function JohnFace({ size = 56 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState("center");

  useEffect(() => {
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height * 0.4);
        // Pointer on the face itself: look at the camera.
        setDir(Math.hypot(dx, dy) < r.width / 2 ? "center" : nearestDir(dx, dy));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 ring-1 ring-black/10 dark:ring-white/15 flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {(["black", "white"] as const).map((sweater) =>
        FRAMES.map((f) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${sweater}-${f}`}
            src={`/john/${sweater}-${f}.jpg`}
            alt={sweater === "black" && f === "center" ? "John" : ""}
            className={`absolute inset-0 h-full w-full object-cover ${
              sweater === "black" ? "dark:hidden" : "hidden dark:block"
            } ${f === dir ? "opacity-100" : "opacity-0"}`}
          />
        ))
      )}
    </div>
  );
}
