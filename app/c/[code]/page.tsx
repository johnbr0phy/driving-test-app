"use client";

// A class link (tigertest.io/c/K7QF2): the student types the name their
// instructor knows them by and goes straight to the exam. No account.

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DMV_EXAM_ID, classExamHome, normalizeClassCode, type ClassPublicInfo } from "@/lib/classes";
import { getMembership, joinClass } from "@/lib/classProgress";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { states } from "@/data/states";

const stateName = (code: string | null | undefined) => states.find((s) => s.code === code)?.name ?? code ?? "";

export default function JoinClassPage() {
  const params = useParams();
  const router = useRouter();
  const code = normalizeClassCode(String(params.code ?? ""));
  const [info, setInfo] = useState<ClassPublicInfo | null>(null);
  const [missing, setMissing] = useState(false);
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();
  const hydrated = useHydration();
  const selectedState = useStore((st) => st.selectedState);
  const setSelectedState = useStore((st) => st.setSelectedState);
  const isGuest = useStore((st) => st.isGuest);
  const startGuestSession = useStore((st) => st.startGuestSession);

  useEffect(() => {
    let alive = true;
    fetch(`/api/classes/${code}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: ClassPublicInfo) => {
        if (!alive) return;
        setInfo(data);
        const existing = getMembership(data.code);
        if (existing) {
          setName(existing.name);
          setJoined(true);
        }
      })
      .catch(() => alive && setMissing(true));
    return () => {
      alive = false;
    };
  }, [code]);

  // A DMV class is for one state. A student practicing another state chooses:
  // switch (which resets their DMV progress, as Settings warns) or keep theirs.
  const dmvState = info?.examId === DMV_EXAM_ID ? info.state : undefined;
  const otherState = !!dmvState && hydrated && !!selectedState && selectedState !== dmvState ? selectedState : null;

  const submit = async (e: React.FormEvent, switchState = true) => {
    e.preventDefault();
    if (!info) return;
    if (!name.trim()) {
      setError("Enter your name");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await joinClass(info, name);
      if (dmvState) {
        if (!user && !isGuest) startGuestSession();
        if (!selectedState || (switchState && selectedState !== dmvState)) setSelectedState(dmvState);
      }
      router.push(classExamHome(info.examId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't join. Try again.");
      setBusy(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
        {missing ? (
          <>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">No class with code {code}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Check the link with your instructor. The code is the 5 letters and numbers after /c/.</p>
            <Link href="/tests" className="text-sm underline text-gray-900 dark:text-gray-50">Browse all practice tests</Link>
          </>
        ) : !info ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Finding your class…</p>
        ) : (
          <form onSubmit={submit}>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
              <Users className="w-4 h-4" aria-hidden="true" />
              <span>{[info.school, info.teacherName].filter(Boolean).join(" · ")}</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">{joined ? "You're in this class" : "Join your class"}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-5">
              {info.name}: {info.examName} practice
            </p>
            <label htmlFor="student-name" className="block text-sm text-gray-700 dark:text-gray-200 mb-1.5">
              Your name, as your instructor knows it
            </label>
            <Input
              id="student-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="Maria G."
              maxLength={40}
              autoComplete="name"
              autoFocus={!joined}
            />
            {error && <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>}
            {otherState && (
              <p className="text-sm text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950 rounded-lg px-3 py-2 mt-4">
                This class practices for {stateName(dmvState)}. You&apos;re set up for {stateName(otherState)}; switching resets your {stateName(otherState)} DMV progress on this device.
              </p>
            )}
            <Button type="submit" disabled={busy} className="w-full mt-4 bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
              {busy ? "Joining…" : otherState ? `Switch to ${stateName(dmvState)} and start` : joined ? "Continue practicing" : "Start practicing"}
            </Button>
            {otherState && (
              <button
                type="button"
                disabled={busy}
                onClick={(e) => void submit(e as unknown as React.FormEvent, false)}
                className="w-full mt-2 text-sm underline text-gray-700 dark:text-gray-200"
              >
                Keep practicing {stateName(otherState)}
              </button>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              {info.teacherName} will see your practice scores on this exam: questions answered, accuracy and test scores. Free, no account needed.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
