"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { isChildPath } from "@/lib/privacyRegion";
import { trackGuestPrompt } from "@/lib/analytics";
import { useTranslation } from "@/contexts/LanguageContext";
import { takeGuestPromptVariant, trackGuestPromptTest, type GuestPromptVariant } from "@/lib/guestPromptTest";

// When the in-training sign-up prompt (components/GuestPromptStep) takes the
// place of the next question: after a correct answer that makes two in a row,
// once the visitor has answered at least MIN_ANSWERS, and then again only
// after GAP more answers. The counts live in sessionStorage so moving between
// sets or drills in one visit neither resets the gap nor re-fires at once.
const KEY = "tigertest-guest-prompt";
const MIN_ANSWERS = 5;
const STREAK = 2;
const GAP = 12;

type Counts = { answered: number; lastShownAt: number | null };

function read(): Counts {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Counts;
  } catch {
    // private mode or corrupt value: start fresh
  }
  return { answered: 0, lastShownAt: null };
}

function write(c: Counts) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    // storage blocked: the prompt just shows on this page's counts
  }
}

export function useGuestPrompt(guest: boolean, where: string) {
  // Never on children's tests (CHILD_PATH_PREFIXES in lib/privacyRegion: times
  // tables, KS2, 11+, OC, NSW Selective, NAPLAN Year 7, JNVST, AISSEE): no
  // asking a child mid-practice to sign up with Google.
  const pathname = usePathname();
  const signedOut = guest && !isChildPath(pathname ?? "");
  const streak = useRef(0);
  const due = useRef(false);
  const [showing, setShowing] = useState(false);
  // English readers get the next design of the message test (lib/guestPromptTest).
  const { language } = useTranslation();
  const [test, setTest] = useState<{ variant: GuestPromptVariant; position: number } | null>(null);

  /** Call once per checked answer. */
  const record = (correct: boolean) => {
    if (!signedOut) return;
    const c = read();
    c.answered += 1;
    write(c);
    streak.current = correct ? streak.current + 1 : 0;
    due.current =
      correct &&
      streak.current >= STREAK &&
      c.answered >= MIN_ANSWERS &&
      (c.lastShownAt === null || c.answered - c.lastShownAt >= GAP);
  };

  /** Call from Next: true when the prompt takes this step instead of a question. */
  const takeStep = () => {
    if (!signedOut || !due.current) return false;
    due.current = false;
    streak.current = 0;
    const c = read();
    write({ ...c, lastShownAt: c.answered });
    const next = language === "en" ? takeGuestPromptVariant() : null;
    setTest(next);
    setShowing(true);
    trackGuestPrompt("shown", where, next?.variant);
    if (next) void trackGuestPromptTest("shown", next.variant, next.position);
    return true;
  };

  /** "Keep practicing". */
  const skip = () => {
    setShowing(false);
    trackGuestPrompt("skipped", where, test?.variant);
    if (test) void trackGuestPromptTest("skipped", test.variant, test.position);
  };

  // Signing in from the prompt hides it; the answered question is still on
  // screen with its Next button.
  return { showing: showing && signedOut, record, takeStep, skip, test };
}
