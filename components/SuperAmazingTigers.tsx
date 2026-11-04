"use client";

// Super Amazing Mode tigers: every few seconds a tiger pokes its head out from
// behind the UI, wiggles, and ducks back down. It lives in the fireworks layer
// (.sam-bg, z-0, under the page), so a card above it hides the rest of its
// body: only the ears, eyes and nose ever show. It peeks over the top edge of
// an opaque card, or in from the bottom or a side of the screen, and only
// where nothing (text, buttons, other cards) sits in front of the visible
// part. Scrolling startles a card tiger back down, since the card moves.

import { useEffect, useRef } from "react";
import { getSiteTigerAsset, type TigerExpression } from "@/lib/tigerAssets";

const SIZE = 76; // px, the head's width
const SHOW = 0.6; // share of the head that rises above the edge
const DURATION = 3600;
const MAX_AT_ONCE = 2;
const PEEK_FACES: TigerExpression[] = [3, 4, 5, 3, 4];
const GRIN: TigerExpression = 2;
const SCARED: TigerExpression = 8;

type Peek = { x: number; y: number; angle: number; card: boolean };

function isOpaque(color: string): boolean {
  if (color === "transparent") return false;
  if (/rgba|\/|color\(/.test(color)) {
    const m = color.match(/([\d.]+)\s*\)$/);
    return m ? parseFloat(m[1]) > 0.1 : true;
  }
  return true;
}

/** True when a point shows the page background, so a tiger behind it is seen. */
function isClear(x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= window.innerWidth || y >= window.innerHeight) return true;
  const el = document.elementFromPoint(x, y);
  if (!el) return true;
  if (el.closest("button,a,input,textarea,select,img,svg,video,canvas,label,iframe")) return false;
  for (const n of Array.from(el.childNodes)) {
    if (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()) return false;
  }
  for (let e: Element | null = el; e && e !== document.body && e !== document.documentElement; e = e.parentElement) {
    const cs = getComputedStyle(e);
    if (cs.backgroundImage !== "none" || isOpaque(cs.backgroundColor)) return false;
  }
  return true;
}

/** Points covering the part of the head that shows, for a peek at (x, y) rotated by angle. */
function visiblePoints(x: number, y: number, angle: number): [number, number][] {
  const rad = (angle * Math.PI) / 180;
  const up: [number, number] = [Math.sin(rad), -Math.cos(rad)]; // the way the head points
  const across: [number, number] = [Math.cos(rad), Math.sin(rad)];
  const pts: [number, number][] = [];
  for (const h of [0.15, 0.5, 0.9]) {
    for (const w of [-0.38, 0, 0.38]) {
      const d = h * SIZE * SHOW;
      const s = w * SIZE;
      pts.push([x + up[0] * d + across[0] * s, y + up[1] * d + across[1] * s]);
    }
  }
  return pts;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function findCardPeek(): Peek | null {
  const main = document.querySelector("main");
  if (!main) return null;
  const vh = window.innerHeight;
  const cards = Array.from(main.querySelectorAll<HTMLElement>("[class*='rounded']")).filter((el) => {
    const r = el.getBoundingClientRect();
    if (r.width < SIZE * 2.2 || r.height < SIZE || r.top < 70 || r.top > vh - 40) return false;
    return isOpaque(getComputedStyle(el).backgroundColor);
  });
  for (let tries = 0; tries < 14 && cards.length; tries++) {
    const card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
    const r = card.getBoundingClientRect();
    // Over the top edge, or out of the left or right side into the margin.
    const edge = Math.random();
    let p: Peek;
    if (edge < 0.5 || r.height < SIZE * 1.6) {
      p = { x: rand(r.left + SIZE * 0.6 + 8, r.right - SIZE * 0.6 - 8), y: r.top + 1, angle: rand(-6, 6), card: true };
    } else {
      const y = rand(Math.max(r.top, 60) + SIZE * 0.6, Math.min(r.bottom, window.innerHeight) - SIZE * 0.6);
      p = edge < 0.75
        ? { x: r.left + 1, y, angle: -90 + rand(-6, 6), card: true }
        : { x: r.right - 1, y, angle: 90 + rand(-6, 6), card: true };
    }
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) continue;
    // The card has to hide the tucked-away body...
    const rad = (p.angle * Math.PI) / 180;
    const ux = Math.sin(rad), uy = -Math.cos(rad), ax = Math.cos(rad), ay = Math.sin(rad);
    const behind = [[6, 0], [SIZE - 8, -0.4], [SIZE - 8, 0.4]].map(([d, w]) => [
      p.x - ux * d + ax * w * SIZE,
      p.y - uy * d + ay * w * SIZE,
    ]);
    if (!behind.every(([px, py]) => card.contains(document.elementFromPoint(px, py)))) continue;
    // ...and the space in front of that edge has to be empty for the head.
    if (visiblePoints(p.x, p.y, p.angle).every(([px, py]) => isClear(px, py))) return p;
  }
  return null;
}

function findEdgePeek(): Peek | null {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  for (let tries = 0; tries < 10; tries++) {
    const side = Math.random();
    let p: Peek;
    if (side < 0.5) p = { x: rand(SIZE, vw - SIZE), y: vh + 2, angle: rand(-10, 10), card: false };
    else if (side < 0.75) p = { x: -2, y: rand(vh * 0.3, vh - SIZE), angle: 90 + rand(-12, 12), card: false };
    else p = { x: vw + 2, y: rand(vh * 0.3, vh - SIZE), angle: -90 + rand(-12, 12), card: false };
    if (visiblePoints(p.x, p.y, p.angle).every(([px, py]) => isClear(px, py))) return p;
  }
  return null;
}

export function SuperAmazingTigers() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = layer.current;
    if (!root) return;

    [...PEEK_FACES, GRIN, SCARED].forEach((f) => { new Image().src = getSiteTigerAsset(f); });

    let timer: ReturnType<typeof setTimeout>;
    let stopped = false;
    const live = new Set<() => void>(); // duck callbacks of card tigers on screen

    const hidden = `translateY(${SIZE}px)`;
    const shown = SIZE * (1 - SHOW);

    function peek() {
      if (document.hidden || root!.childElementCount >= MAX_AT_ONCE) return;
      const p = (Math.random() < 0.65 && findCardPeek()) || findEdgePeek();
      if (!p) return;

      const wrap = document.createElement("div");
      wrap.style.cssText = `position:absolute;left:${p.x - SIZE / 2}px;top:${p.y - SIZE}px;width:${SIZE}px;height:${SIZE}px;transform-origin:50% 100%;transform:rotate(${p.angle}deg)`;
      const img = document.createElement("img");
      img.src = getSiteTigerAsset(PEEK_FACES[Math.floor(Math.random() * PEEK_FACES.length)]);
      img.alt = "";
      img.draggable = false;
      img.style.cssText = `display:block;width:100%;height:auto;transform-origin:50% 85%;transform:${hidden};filter:drop-shadow(0 2px 3px rgba(0,0,0,.18))`;
      wrap.appendChild(img);
      root!.appendChild(wrap);

      const up = `translateY(${shown}px)`;
      const anim = img.animate(
        [
          { transform: hidden, opacity: 0, offset: 0 },
          { transform: hidden, opacity: 1, offset: 0.03 },
          { transform: `translateY(${shown - 5}px)`, offset: 0.16, easing: "ease-out" },
          { transform: `${up} rotate(0deg)`, offset: 0.22 },
          { transform: `${up} rotate(-7deg)`, offset: 0.34 },
          { transform: `${up} rotate(6deg)`, offset: 0.48 },
          { transform: `${up} rotate(-4deg)`, offset: 0.6 },
          { transform: `${up} rotate(0deg)`, offset: 0.7 },
          { transform: up, offset: 0.84, easing: "ease-in" },
          { transform: hidden, opacity: 1, offset: 1 },
        ],
        { duration: DURATION, easing: "ease-in-out", fill: "forwards" },
      );
      const grin = Math.random() < 0.35 ? setTimeout(() => { img.src = getSiteTigerAsset(GRIN); }, DURATION * 0.4) : undefined;

      const done = () => { clearTimeout(grin); live.delete(duck); wrap.remove(); };
      // A card tiger is placed in screen coordinates, so it ducks when the page scrolls.
      const duck = () => {
        live.delete(duck);
        clearTimeout(grin);
        const from = getComputedStyle(img).transform;
        anim.cancel();
        img.src = getSiteTigerAsset(SCARED);
        img.animate([{ transform: from }, { transform: hidden }], { duration: 180, easing: "ease-in", fill: "forwards" })
          .onfinish = done;
      };
      anim.onfinish = done;
      if (p.card) live.add(duck);
    }

    const onScroll = () => { live.forEach((duck) => duck()); };
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);

    const loop = (delay: number) => {
      timer = setTimeout(() => {
        if (stopped) return;
        peek();
        loop(rand(3500, 8000));
      }, delay);
    };
    loop(1500);

    return () => {
      stopped = true;
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      root.replaceChildren();
    };
  }, []);

  return <div ref={layer} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden />;
}
