"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1200;

/**
 * A number that rolls up from 0 the first time it scrolls into view. The real
 * value is always in the DOM for screen readers and crawlers; the rolling copy
 * is aria-hidden and sized to the final value so nothing shifts as it counts.
 * Reduced-motion readers get the final number straight away.
 */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  const final = value.toLocaleString("en-US");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setShown(value);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(value * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{final}</span>
      <span aria-hidden="true" className="inline-block text-right tabular-nums" style={{ minWidth: `${final.length}ch` }}>
        {shown.toLocaleString("en-US")}
      </span>
    </span>
  );
}
