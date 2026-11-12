"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { Check, Laptop, Lock, Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebViewGoogleWarning } from "@/components/WebViewGoogleWarning";
import { JohnFace } from "@/components/JohnFace";
import { EN, StreakCard } from "@/components/guestPrompt/StreakCard";
import type { DesignProps } from "@/components/guestPrompt/types";
import type { GuestPromptVariant } from "@/lib/guestPromptTest";

// The ten English designs of the sign-up step's message test
// (lib/guestPromptTest.ts, names and order there). Each tries a different
// message and layout; every one keeps Google, email, log in and a one-tap way
// to skip, and says only what an account really gives: progress kept on the
// account instead of this browser, on any device, free with no card.

const HEADING = "focus-in-parent outline-none font-bold text-gray-900 dark:text-gray-50 leading-tight";
const BODY = "text-sm sm:text-base text-gray-700 dark:text-gray-200";
const CARD = "rounded-2xl border border-brand-border-light p-5 sm:p-6 shadow-sm";
const SOFT_CARD = `${CARD} bg-gradient-to-b from-brand-light to-white dark:to-gray-900`;

function answersPhrase(n: number) {
  return n === 1 ? "1 answer" : `${n} answers`;
}

/** Google full width (hidden in the app shell), then email. */
function Buttons({ p, google = "Continue with Google", emailStyle = "outline", className = "" }: {
  p: DesignProps;
  google?: ReactNode;
  emailStyle?: "outline" | "link";
  className?: string;
}) {
  return (
    <div className={`space-y-2 max-w-sm mx-auto ${className}`}>
      {!p.isNative && (
        <WebViewGoogleWarning
          onGoogleSignIn={p.onGoogle}
          disabled={p.busy}
          label={google}
          className="h-12 text-base font-semibold shadow-md !border-gray-900 dark:!border-gray-100"
        />
      )}
      {p.isNative ? (
        <Button asChild className="w-full h-12 text-base font-semibold bg-brand text-white hover:bg-brand-hover">
          <Link href={p.signupHref} onClick={p.onEmail}>Create free account</Link>
        </Button>
      ) : emailStyle === "link" ? (
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          or{" "}
          <Link href={p.signupHref} onClick={p.onEmail} className="font-semibold text-brand-dark underline underline-offset-2">
            sign up with email
          </Link>
        </p>
      ) : (
        <Button asChild className="w-full h-11 text-sm font-semibold bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800">
          <Link href={p.signupHref} onClick={p.onEmail}>Sign up with email</Link>
        </Button>
      )}
    </div>
  );
}

function LogIn({ p }: { p: DesignProps }) {
  return (
    <p className="mt-3 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
      Already have an account?{" "}
      <Link href={p.signupHref.replace(/^\/signup/, "/login")} className="font-semibold text-brand-dark hover:underline">
        Sign in
      </Link>
    </p>
  );
}

function Later({ p, label = "Maybe later" }: { p: DesignProps; label?: string }) {
  return (
    <div className="text-center">
      <button
        type="button"
        onClick={p.onLater}
        className="mt-2 text-sm text-gray-500 dark:text-gray-400 underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-200 py-2 px-4"
      >
        {label}
      </button>
    </div>
  );
}

function Benefits({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-left max-w-sm mx-auto">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-2 text-sm text-gray-800 dark:text-gray-100">
          <Check className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-400 shrink-0" aria-hidden="true" />
          {b}
        </li>
      ))}
    </ul>
  );
}

// v01: the streak card (control).
function V01(p: DesignProps) {
  return <StreakCard {...p} c={EN} />;
}

// v02: the visitor's own number, large.
function V02(p: DesignProps) {
  return (
    <div className={`${SOFT_CARD} text-center`}>
      <p className="text-6xl sm:text-7xl font-black text-brand-dark tabular-nums leading-none">{p.n}</p>
      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
        {p.n === 1 ? "answer" : "answers"} saved only on this browser
      </p>
      <h2 ref={p.headingRef} tabIndex={-1} className={`${HEADING} mt-4 text-xl sm:text-2xl`}>
        Don&apos;t let them disappear.
      </h2>
      <p className={`${BODY} mt-2`}>
        Clear your browser or switch devices and they&apos;re gone. A free account keeps every one.
      </p>
      <Buttons p={p} className="mt-5" />
      <LogIn p={p} />
      <Later p={p} />
    </div>
  );
}

// v03: as little as possible between the visitor and one tap.
function V03(p: DesignProps) {
  return (
    <div className={`${CARD} bg-white dark:bg-gray-900 text-center`}>
      <h2 ref={p.headingRef} tabIndex={-1} className={`${HEADING} text-2xl sm:text-3xl`}>
        Save your progress in one tap.
      </h2>
      <p className={`${BODY} mt-2`}>Free. No password to remember.</p>
      <Buttons p={p} className="mt-6" google="Save with Google" emailStyle="link" />
      <LogIn p={p} />
      <Later p={p} label="Not now" />
    </div>
  );
}

// v04: the goal, passing, rather than the risk.
function V04(p: DesignProps) {
  return (
    <div className={`${SOFT_CARD}`}>
      <div className="flex items-start gap-3">
        <span className="text-4xl leading-none" aria-hidden="true">🎯</span>
        <div>
          <h2 ref={p.headingRef} tabIndex={-1} className={`${HEADING} text-xl sm:text-2xl`}>
            Make every answer count toward passing.
          </h2>
          <p className={`${BODY} mt-2`}>
            With a free account your practice adds up: your weak topics, your best scores and every question you&apos;ve missed, in one place.
          </p>
        </div>
      </div>
      <Benefits items={["See which topics to study next", "Track your scores test by test", "Keep it all on any device"]} />
      <Buttons p={p} className="mt-5" />
      <LogIn p={p} />
      <Later p={p} />
    </div>
  );
}

// v05: a short note from John, the person behind the site.
function V05(p: DesignProps) {
  return (
    <div className={`${CARD} bg-white dark:bg-gray-900`}>
      <div className="flex items-start gap-3">
        <div className="shrink-0"><JohnFace size={56} /></div>
        <div className="relative rounded-2xl rounded-tl-sm bg-gray-100 dark:bg-gray-800 px-4 py-3">
          <h2 ref={p.headingRef} tabIndex={-1} className={`${HEADING} text-base sm:text-lg`}>
            Hi, I&apos;m John. I made Tigertest.
          </h2>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
            {p.n > 0 ? `You've answered ${p.n === 1 ? "1 question" : `${p.n} questions`}` : "You're making progress"}, and right now
            {p.n === 1 ? " it only lives" : " they only live"} on this browser. A free account keeps
            {p.n === 1 ? " it" : " them"} safe and takes a few seconds. No card, ever.
          </p>
          <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-50">John</p>
        </div>
      </div>
      <Buttons p={p} className="mt-5" />
      <LogIn p={p} />
      <Later p={p} />
    </div>
  );
}

// v06: a preview of the missed-question list an account keeps.
function V06(p: DesignProps) {
  const rows = [
    { w: "w-4/5", missed: 3 },
    { w: "w-3/5", missed: 2 },
    { w: "w-2/3", missed: 2 },
  ];
  return (
    <div className={`${SOFT_CARD}`}>
      <h2 ref={p.headingRef} tabIndex={-1} className={`${HEADING} text-xl sm:text-2xl text-center`}>
        Keep a list of every question you miss.
      </h2>
      <p className={`${BODY} mt-2 text-center`}>
        Your account remembers what tripped you up, so you know exactly what to study before the real test.
      </p>
      <div className="relative mt-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3" aria-hidden="true">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Your missed questions</p>
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5">
            <X className="w-4 h-4 text-red-500 shrink-0" />
            <div className={`h-2.5 rounded bg-gray-200 dark:bg-gray-700 ${r.w}`} />
            <span className="ml-auto text-xs font-semibold text-red-600 dark:text-red-400 tabular-nums">{r.missed}×</span>
          </div>
        ))}
        <div className="absolute inset-0 rounded-xl bg-white/40 dark:bg-gray-900/40 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-3 py-1 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" /> Saved with a free account
          </span>
        </div>
      </div>
      <Buttons p={p} className="mt-5" />
      <LogIn p={p} />
      <Later p={p} />
    </div>
  );
}

// v07: the second device.
function V07(p: DesignProps) {
  return (
    <div className={`${SOFT_CARD} text-center`}>
      <div className="flex items-center justify-center gap-3 text-brand-dark" aria-hidden="true">
        <Laptop className="w-10 h-10" strokeWidth={1.5} />
        <span className="text-2xl font-bold">→</span>
        <Smartphone className="w-9 h-9" strokeWidth={1.5} />
      </div>
      <h2 ref={p.headingRef} tabIndex={-1} className={`${HEADING} mt-3 text-xl sm:text-2xl`}>
        Start here. Finish on your phone.
      </h2>
      <p className={`${BODY} mt-2`}>
        Sign in anywhere and pick up right where you left off. Your {answersPhrase(p.n)} come with you.
      </p>
      <Buttons p={p} className="mt-5" />
      <LogIn p={p} />
      <Later p={p} />
    </div>
  );
}

// v08: what changes, side by side.
function V08(p: DesignProps) {
  const rows: [string, boolean | string, boolean | string][] = [
    ["Saved on this browser", true, true],
    ["Safe if your browser clears", false, true],
    ["On your phone and laptop", false, true],
    ["Price", "Free", "Free"],
  ];
  const cell = (v: boolean | string) =>
    typeof v === "string" ? (
      <span className="font-semibold">{v}</span>
    ) : v ? (
      <Check className="w-5 h-5 mx-auto text-green-600 dark:text-green-400" aria-label="Yes" />
    ) : (
      <X className="w-5 h-5 mx-auto text-red-500" aria-label="No" />
    );
  return (
    <div className={`${CARD} bg-white dark:bg-gray-900`}>
      <h2 ref={p.headingRef} tabIndex={-1} className={`${HEADING} text-xl sm:text-2xl text-center`}>
        Same price. Much safer.
      </h2>
      <table className="mt-4 w-full text-sm text-gray-800 dark:text-gray-100">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            <th className="text-left font-semibold pb-2" />
            <th className="font-semibold pb-2 w-20">Guest</th>
            <th className="font-semibold pb-2 w-24 text-brand-dark">Account</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, guest, account]) => (
            <tr key={label} className="border-t border-gray-100 dark:border-gray-800">
              <td className="py-2 pr-2">{label}</td>
              <td className="py-2 text-center">{cell(guest)}</td>
              <td className="py-2 text-center bg-brand-light/60 dark:bg-gray-800">{cell(account)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Buttons p={p} className="mt-5" />
      <LogIn p={p} />
      <Later p={p} label="Stay a guest" />
    </div>
  );
}

// v09: low pressure, one line and two equal buttons.
function V09(p: DesignProps) {
  return (
    <div className={`${CARD} bg-white dark:bg-gray-900`}>
      <div className="flex items-center gap-3">
        <span className="text-3xl leading-none" aria-hidden="true">💾</span>
        <div className="min-w-0">
          <h2 ref={p.headingRef} tabIndex={-1} className={`${HEADING} text-lg`}>
            {p.n > 0 ? `Save your ${answersPhrase(p.n)}?` : "Save your progress?"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Free account. Takes a few seconds.</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        {p.isNative ? (
          <Button asChild className="flex-1 h-11 font-semibold bg-brand text-white hover:bg-brand-hover">
            <Link href={p.signupHref} onClick={p.onEmail}>Save it</Link>
          </Button>
        ) : (
          <div className="flex-1 min-w-0">
            <WebViewGoogleWarning onGoogleSignIn={p.onGoogle} disabled={p.busy} label="Save it" className="h-11 font-semibold shadow-md !border-gray-900 dark:!border-gray-100" />
          </div>
        )}
        <Button type="button" onClick={p.onLater} className="flex-1 h-11 font-semibold bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
          Not now
        </Button>
      </div>
      {!p.isNative && (
        <p className="mt-3 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          <Link href={p.signupHref} onClick={p.onEmail} className="font-semibold text-brand-dark underline underline-offset-2">Use email instead</Link>
          {" · "}
          <Link href={p.signupHref.replace(/^\/signup/, "/login")} className="font-semibold text-brand-dark hover:underline">Sign in</Link>
        </p>
      )}
    </div>
  );
}

// v10: celebrate the streak, then ask to keep it.
function V10(p: DesignProps) {
  return (
    <div className="rounded-2xl border border-brand-border-light shadow-sm overflow-hidden bg-white dark:bg-gray-900">
      <div className="bg-brand text-white text-center px-5 pt-6 pb-5">
        <p className="text-4xl leading-none" aria-hidden="true">🏆🔥🎉</p>
        <h2 ref={p.headingRef} tabIndex={-1} className="focus-in-parent outline-none mt-3 text-2xl sm:text-3xl font-black leading-tight">
          Nice streak! Claim it.
        </h2>
      </div>
      <div className="p-5 sm:p-6 text-center">
        <p className={BODY}>
          Make a free account to keep your streak, your {answersPhrase(p.n)} and every score you earn from here.
        </p>
        <Buttons p={p} className="mt-5" google="Claim it with Google" />
        <LogIn p={p} />
        <Later p={p} />
      </div>
    </div>
  );
}

export const GUEST_PROMPT_DESIGNS: Record<GuestPromptVariant, ComponentType<DesignProps>> = {
  v01: V01,
  v02: V02,
  v03: V03,
  v04: V04,
  v05: V05,
  v06: V06,
  v07: V07,
  v08: V08,
  v09: V09,
  v10: V10,
};
