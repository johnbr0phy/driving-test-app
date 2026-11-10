"use client";

import { HTMLAttributes, RefObject, useEffect, useRef } from "react";

/** The visually covered site chrome must also be outside the tab/read order. */
export function FocusMode({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const changed: [HTMLElement, boolean][] = [];
    let node: HTMLElement | null = ref.current;
    while (node && node !== document.body) {
      for (const sibling of Array.from(node.parentElement?.children ?? [])) {
        if (sibling !== node && sibling instanceof HTMLElement && !["SCRIPT", "STYLE"].includes(sibling.tagName)) {
          changed.push([sibling, sibling.inert]);
          sibling.inert = true;
        }
      }
      node = node.parentElement;
    }
    return () => changed.forEach(([element, inert]) => { element.inert = inert; });
  }, []);
  useKeyboardFit(ref);
  return <div ref={ref} {...props}>{children}</div>;
}

const isField = (el: Element | null): el is HTMLElement =>
  !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || (el as HTMLElement).isContentEditable);

/**
 * iOS Safari does not shrink the layout viewport when the on-screen keyboard
 * opens, so a `position: fixed; inset: 0` layer keeps its full height and the
 * keyboard covers its lower part (the answer box, the bottom bar). Pin the
 * layer to the visual viewport instead and scroll the focused field into the
 * part that is still visible. Android and desktop already resize, so there
 * the visual viewport matches and nothing changes.
 */
function useKeyboardFit(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const vv = window.visualViewport;
    const el = ref.current;
    if (!vv || !el) return;
    let frame = 0;
    const reveal = () => {
      const active = document.activeElement;
      if (isField(active) && el.contains(active)) active.scrollIntoView({ block: "center", behavior: "smooth" });
    };
    const fit = (e: Event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // A pinch zoom also shrinks the visual viewport; only react to the keyboard.
        const covered = vv.scale < 1.01 && window.innerHeight - vv.height > 80;
        if (covered) {
          el.style.top = `${vv.offsetTop}px`;
          el.style.bottom = "auto";
          el.style.height = `${vv.height}px`;
          if (e.type === "resize") reveal();
        } else {
          el.style.top = el.style.bottom = el.style.height = "";
        }
      });
    };
    const onFocus = (e: FocusEvent) => {
      if (isField(e.target as Element)) setTimeout(reveal, 300);
    };
    vv.addEventListener("resize", fit);
    vv.addEventListener("scroll", fit);
    el.addEventListener("focusin", onFocus);
    return () => {
      cancelAnimationFrame(frame);
      vv.removeEventListener("resize", fit);
      vv.removeEventListener("scroll", fit);
      el.removeEventListener("focusin", onFocus);
      el.style.top = el.style.bottom = el.style.height = "";
    };
  }, [ref]);
}
