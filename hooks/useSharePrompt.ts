"use client";

import { useRef, useState } from "react";
import { trackSharePrompt as trackGa } from "@/lib/analytics";
import { isInternalBrowser } from "@/lib/internal";

// "Do me a favor, tell a friend" from John (components/SharePromptStep),
// shown in place of the next question to people who are enjoying Tigertest
// and haven't paid: after a third correct answer in a row, once they have
// more than MIN_ANSWERS on this exam. Same mechanic as the sign-up prompt
// (hooks/useGuestPrompt), which wins when both are due. Never for Premium.
// At most once a session and once every COOLDOWN_DAYS; never again after
// they share.
const KEY = "tigertest-share-prompt";
const SESSION_KEY = "tigertest-share-prompt-session";
const MIN_ANSWERS = 50;
const STREAK = 3;
const COOLDOWN_DAYS = 14;

type Stored = { lastShownAt: number | null; shared: boolean };

// GA4 plus the /admin Today tab counter (analytics/sharePrompt).
function trackSharePrompt(action: "shown" | "skipped" | "share" | "copy", where: string) {
  trackGa(action, where);
  if (isInternalBrowser()) return;
  fetch("/api/analytics/share-prompt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, where }),
    keepalive: true,
  }).catch(() => {});
}

function read(): Stored {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Stored;
  } catch {
    // private mode or corrupt value
  }
  return { lastShownAt: null, shared: false };
}

function write(s: Stored) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // storage blocked: it may show again next visit
  }
}

function shownThisSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function canShow() {
  const s = read();
  if (s.shared || shownThisSession()) return false;
  return s.lastShownAt === null || Date.now() - s.lastShownAt >= COOLDOWN_DAYS * 86_400_000;
}

/**
 * @param eligible not Premium (and Premium status known), English reader
 * @param answered answers on this exam so far, from the last render (before the one being checked)
 */
export function useSharePrompt(eligible: boolean, answered: number, where: string) {
  const streak = useRef(0);
  const due = useRef(false);
  const [showing, setShowing] = useState(false);

  /** Call once per checked answer. */
  const record = (correct: boolean) => {
    const answeredNow = answered + 1;
    streak.current = correct ? streak.current + 1 : 0;
    due.current = eligible && correct && streak.current >= STREAK && answeredNow > MIN_ANSWERS && canShow();
  };

  /** Call from Next: true when the prompt takes this step instead of a question. */
  const takeStep = () => {
    if (!eligible || !due.current) return false;
    due.current = false;
    streak.current = 0;
    write({ ...read(), lastShownAt: Date.now() });
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // fine
    }
    setShowing(true);
    trackSharePrompt("shown", where);
    return true;
  };

  /** "Keep practicing". */
  const skip = () => {
    setShowing(false);
    trackSharePrompt("skipped", where);
  };

  /** They shared or copied the link: thank them and never ask again. */
  const shared = (how: "share" | "copy") => {
    write({ ...read(), shared: true });
    trackSharePrompt(how, where);
  };

  return { showing: showing && eligible, record, takeStep, skip, shared };
}
