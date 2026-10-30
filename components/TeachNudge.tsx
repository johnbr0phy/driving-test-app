"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Copy, GraduationCap, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getMemberships } from "@/lib/classProgress";
import { trackTeachNudge } from "@/lib/teachTracking";

// A footer row inside a dashboard hero that tells students teachers can run
// free classes at /teach. It appears on the first dashboard view after a step
// turns green, only on exams people usually study for with an instructor
// (DMV and the self-study tests are left out). X hides it until the next
// green step; a copy or a tap on the link, or a third close, ends it for good.
// Shown, copied and tapped are counted for the /admin Teachers tab (lib/teachTracking).
// Never shown to class members or to teachers. Device-local, never synced.

// Families by id; state versions count as their family (variantOf).
const TEACHER_LED = new Set([
  // Healthcare programs
  "cst", "crcst", "htl", "cna", "ptcb", "phleb", "ccma", "cet", "danb", "cpr", "nclex", "nclexpn", "emt", "paramedic", "teas", "hesi", "vtne",
  "ukfaw", "ukcare",
  "rexpn", "capsw", "casfa",
  "aufirstaid",
  "gulfrn",
  // High school, military and college classes
  "ged", "sat", "act", "asvab", "secplus", "aplus", "aws", "awssaa", "az900", "ccna", "pmp", "gcsemaths", "osslt", "naplan", "nswsel",
  "gcsehigher", "gcsescience", "gcsecs", "fsmaths",
  "eqao9",
  "naplan7", "vicsel", "hscmaths",
  // Primary school classes
  "timestables", "ks2", "elevenplus", "ocnsw",
  // Trade schools, pre-licensing courses and instructor-led certifications
  "cdl", "cdlx", "moto", "osha", "forklift", "epa608", "foodmgr", "security", "lifeguard", "hunter", "cosmetology",
  "realestate", "insurance", "pnc", "ham", "civics",
  "uksia", "uk18ed", "capal", "caelec", "auwhite",
  "cscs", "ukfood", "ukaplh",
  "caauto", "caplumb", "cacarp", "caweld", "cawhmis", "caguard",
  "aursa", "aurcg", "aufss", "auforklift", "auwah",
  "uklitu", "cacit", "aucit",
]);

export function isTeacherLedExam(id: string): boolean {
  return TEACHER_LED.has(id);
}

const STORAGE_KEY = "tigertest-teach-nudge";
const MAX_CLOSES = 3;
const LINK = "/teach?ref=green";

type NudgeState = { seen: Record<string, number>; closes: number; done: boolean };

function read(): NudgeState {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    return { seen: raw.seen ?? {}, closes: raw.closes ?? 0, done: !!raw.done };
  } catch {
    return { seen: {}, closes: 0, done: false };
  }
}

function write(state: NudgeState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function isTeacher(uid: string | undefined): boolean {
  if (!uid) return false;
  try {
    return !!JSON.parse(localStorage.getItem(`tigertest-teacher:${uid}`) ?? "null")?.teaches;
  } catch {
    return false;
  }
}

export function TeachNudge({ dashboardKey, examId, done }: { dashboardKey: string; examId: string; done: number }) {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  // The first view of a dashboard on this device only records where it stands:
  // progress that arrives as the store hydrates or Firestore loads is not a new
  // green step.
  const baselining = useRef<boolean | null>(null);

  useEffect(() => {
    if (!isTeacherLedExam(examId)) return;
    const state = read();
    if (baselining.current === null) baselining.current = state.seen[dashboardKey] === undefined;
    const seen = state.seen[dashboardKey] ?? 0;
    if (done <= seen && !baselining.current) return;
    if (done > seen || baselining.current) write({ ...state, seen: { ...state.seen, [dashboardKey]: Math.max(seen, done) } });
    if (baselining.current || state.done || getMemberships().length > 0 || isTeacher(user?.uid)) return;
    setShow(true);
    trackTeachNudge("shown", examId);
  }, [dashboardKey, examId, done, user?.uid]);

  if (!show) return null;

  const finish = () => write({ ...read(), done: true });

  const tapLink = () => {
    trackTeachNudge("link", examId);
    finish();
  };

  const close = () => {
    const state = read();
    write({ ...state, closes: state.closes + 1, done: state.done || state.closes + 1 >= MAX_CLOSES });
    setShow(false);
  };

  const copy = async () => {
    const url = `${window.location.origin}${LINK}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Older in-app browsers and blocked clipboards: copy through a selection.
      const el = document.createElement("textarea");
      el.value = url;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand("copy");
      el.remove();
      if (!ok) return;
    }
    setCopied(true);
    trackTeachNudge("copy", examId);
    finish();
  };

  return (
    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-start sm:items-center gap-3 text-sm">
      <GraduationCap className="w-5 h-5 flex-shrink-0 text-brand-dark mt-0.5 sm:mt-0" aria-hidden="true" />
      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <p className="flex-1 min-w-0 text-gray-600 dark:text-gray-300 leading-snug">
          <span className="font-semibold text-gray-900 dark:text-gray-50">Enjoying Tigertest?</span> Teachers can use it free with
          their classes. Tell yours about{" "}
          <Link href={LINK} onClick={tapLink} className="font-semibold text-brand-dark underline-offset-2 hover:underline">
            tigertest.io/teach
          </Link>
        </p>
        <button
          type="button"
          onClick={copy}
          className="self-start sm:self-auto flex-shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-2.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="flex-shrink-0 -m-1 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
