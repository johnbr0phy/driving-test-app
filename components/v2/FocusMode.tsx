"use client";

import { HTMLAttributes, useEffect, useRef } from "react";

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
  return <div ref={ref} {...props}>{children}</div>;
}
