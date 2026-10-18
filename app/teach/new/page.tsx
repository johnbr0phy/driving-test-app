"use client";

// Make a class: name, exam, how students know the teacher, optional school.

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { teachFetch } from "@/lib/teachClient";
import { classExamName, classExams } from "@/lib/classes";

const fieldClass = "block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1.5";

export default function NewClassPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const groups = useMemo(() => classExams(), []);
  const [name, setName] = useState("");
  const [examId, setExamId] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [school, setSchool] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login?redirect=/teach/new");
    if (user?.displayName) setTeacherName((t) => t || user.displayName!);
  }, [loading, user, router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!name.trim()) return setError("Give the class a name");
    if (!examId) return setError("Pick an exam");
    if (!teacherName.trim()) return setError("Add the name your students know you by");
    setBusy(true);
    setError("");
    try {
      const { code } = await teachFetch<{ code: string }>(user, "/api/classes", {
        method: "POST",
        body: JSON.stringify({ name, examId, teacherName, school }),
      });
      router.push(`/teach/classes/${code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't make the class. Try again.");
      setBusy(false);
    }
  };

  if (loading || !user) return <div className="flex-1 bg-gray-50 dark:bg-gray-950" />;

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-lg">
        <Link href="/teach" className="text-sm text-gray-600 dark:text-gray-300 underline">Your classes</Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mt-3 mb-6">New class</h1>
        <form onSubmit={submit} className="space-y-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
          <div>
            <label htmlFor="class-name" className={fieldClass}>Class name</label>
            <Input id="class-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Surgical Tech, Fall 2026" maxLength={40} />
          </div>
          <div>
            <label htmlFor="class-exam" className={fieldClass}>Exam</label>
            <select
              id="class-exam"
              value={examId}
              onChange={(e) => setExamId(e.target.value)}
              className="w-full h-10 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 px-3 text-sm"
            >
              <option value="">Choose the exam your students are preparing for</option>
              {groups.map((g) => (
                <optgroup key={g.group} label={g.group}>
                  {g.exams.map((x) => (
                    <option key={x.id} value={x.id}>{classExamName(x)}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="teacher-name" className={fieldClass}>Your name, as students know you</label>
            <Input id="teacher-name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} placeholder="Ms. Shirley" maxLength={40} />
          </div>
          <div>
            <label htmlFor="school" className={fieldClass}>
              School <span className="font-normal text-gray-500 dark:text-gray-400">(optional)</span>
            </label>
            <Input id="school" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="East Central Community College" maxLength={40} />
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <Button type="submit" disabled={busy} className="w-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
            {busy ? "Creating…" : "Create class"}
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400">Students see the class name, your name and the school when they join.</p>
        </form>
      </div>
    </div>
  );
}
