"use client";

// Make a class: pick any test on the site (a state for DMV; a state version
// for real estate and insurance, or national), name the class, and say how
// students know you. ?exam=<catalog id> preselects a test (from /teach).

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { teachFetch } from "@/lib/teachClient";
import { markTeacher } from "@/components/TeachLink";
import { DMV_EXAM_ID, classExamGroups, type ClassExamChoice } from "@/lib/classes";

const fieldClass = "block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1.5";

function NewClassForm() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const groups = useMemo(() => classExamGroups(), []);
  const all = useMemo(() => groups.flatMap((g) => g.exams), [groups]);
  const [query, setQuery] = useState("");
  const [choice, setChoice] = useState<ClassExamChoice | null>(() => all.find((e) => e.id === params.get("exam")) ?? null);
  const [stateKey, setStateKey] = useState(""); // "<exam id>|<state code>"
  const [name, setName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [school, setSchool] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const here = `/teach/new${params.get("exam") ? `?exam=${params.get("exam")}` : ""}`;
    if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent(here)}`);
    if (user?.displayName) setTeacherName((t) => t || user.displayName!);
  }, [loading, user, router, params]);

  const q = query.trim().toLowerCase();
  const filtered = groups
    .map((g) => ({ ...g, exams: g.exams.filter((e) => !q || `${e.name} ${e.org}`.toLowerCase().includes(q)) }))
    .filter((g) => g.exams.length);

  const pick = (e: ClassExamChoice) => {
    setChoice(e);
    setStateKey("");
    setError("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!choice) return setError("Pick the test your students are preparing for");
    if (choice.stateRequired && !stateKey) return setError("Pick your state");
    if (!name.trim()) return setError("Give the class a name");
    if (!teacherName.trim()) return setError("Add the name your students know you by");
    // DMV keeps examId "dmv" and sends the state; a state version is its own exam id.
    const [stateExamId, stateCode] = stateKey.split("|");
    const examId = choice.id === DMV_EXAM_ID ? DMV_EXAM_ID : stateExamId || choice.id;
    const state = choice.id === DMV_EXAM_ID ? stateCode : undefined;
    setBusy(true);
    setError("");
    try {
      const { code } = await teachFetch<{ code: string }>(user, "/api/classes", {
        method: "POST",
        body: JSON.stringify({ name, examId, state, teacherName, school }),
      });
      markTeacher(user.uid, true);
      router.push(`/teach/classes/${code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't make the class. Try again.");
      setBusy(false);
    }
  };

  if (loading || !user) return <div className="flex-1 bg-gray-50 dark:bg-gray-950" />;

  const stateOptions = choice?.states ?? [];

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-2xl">
        <Link href="/teach" className="text-sm text-gray-600 dark:text-gray-300 underline">Your classes</Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mt-3 mb-6">New class</h1>
        <form onSubmit={submit} className="space-y-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
          <div>
            <p className={fieldClass}>Test</p>
            {choice ? (
              <div className="flex items-center justify-between gap-3 rounded-xl border-2 border-gray-900 dark:border-gray-50 px-4 py-3">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-gray-50">{choice.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{choice.org}</p>
                </div>
                <button type="button" onClick={() => setChoice(null)} className="text-sm underline text-gray-700 dark:text-gray-200 flex-shrink-0">
                  Change
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="relative border-b border-gray-200 dark:border-gray-800">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search: surgical tech, NCLEX, SAT, real estate…"
                    aria-label="Search tests"
                    className="w-full bg-transparent pl-9 pr-3 py-3 text-sm text-gray-900 dark:text-gray-50 outline-none"
                  />
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {filtered.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400 p-3">No test matches “{query}”.</p>}
                  {filtered.map((g) => (
                    <div key={g.title} className="mb-2">
                      <p className="px-2 pt-2 pb-1 text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">{g.title}</p>
                      {g.exams.map((e) => (
                        <button
                          key={e.id}
                          type="button"
                          onClick={() => pick(e)}
                          className="w-full text-left rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <span className="block text-sm font-medium text-gray-900 dark:text-gray-50">{e.name}</span>
                          <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">{e.org}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {stateOptions.length > 0 && (
            <div>
              <label htmlFor="class-state" className={fieldClass}>
                State {!choice?.stateRequired && <span className="font-normal text-gray-500 dark:text-gray-400">(optional)</span>}
              </label>
              <select
                id="class-state"
                value={stateKey}
                onChange={(e) => setStateKey(e.target.value)}
                className="w-full h-10 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 px-3 text-sm"
              >
                <option value="">{choice?.stateRequired ? "Choose your state" : "National (no state law)"}</option>
                {stateOptions.map((s) => (
                  <option key={s.code} value={`${s.id}|${s.code}`}>{s.name}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="class-name" className={fieldClass}>Class name</label>
            <Input id="class-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Surgical Tech, Fall 2026" maxLength={40} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="teacher-name" className={fieldClass}>Your name, as students know you</label>
              <Input id="teacher-name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} placeholder="Ms. Rivera" maxLength={40} />
            </div>
            <div>
              <label htmlFor="school" className={fieldClass}>
                School <span className="font-normal text-gray-500 dark:text-gray-400">(optional)</span>
              </label>
              <Input id="school" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Lakeview Community College" maxLength={40} />
            </div>
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <Button type="submit" disabled={busy} className="w-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
            {busy ? "Creating…" : (<><Check className="w-4 h-4 mr-1.5" aria-hidden="true" /> Create class</>)}
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400">Students see the class name, your name and the school when they join.</p>
        </form>
      </div>
    </div>
  );
}

export default function NewClassPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50 dark:bg-gray-950" />}>
      <NewClassForm />
    </Suspense>
  );
}
