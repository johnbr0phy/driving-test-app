"use client";

// Edit a class's name, the teacher's name and the school after it was made,
// from the class page's pencil. Sends only the fields that changed.

import { useState, type FormEvent } from "react";
import type { User } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { teachFetch } from "@/lib/teachClient";
import { MAX_NAME_LENGTH } from "@/lib/classes";

export interface ClassDetails {
  name: string;
  teacherName: string;
  school: string;
}

export function ClassDetailsForm({
  user,
  code,
  details,
  onSaved,
  onCancel,
}: {
  user: User;
  code: string;
  details: ClassDetails;
  onSaved: (d: ClassDetails) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(details.name);
  const [teacherName, setTeacherName] = useState(details.teacherName);
  const [school, setSchool] = useState(details.school);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async (e: FormEvent) => {
    e.preventDefault();
    const next = { name: name.trim(), teacherName: teacherName.trim(), school: school.trim() };
    if (!next.name) return setError("Give the class a name");
    if (!next.teacherName) return setError("Add the name your students know you by");
    const changed = Object.fromEntries(
      (Object.keys(next) as (keyof ClassDetails)[]).filter((k) => next[k] !== details[k]).map((k) => [k, next[k]]),
    );
    if (!Object.keys(changed).length) return onCancel();
    setSaving(true);
    setError("");
    try {
      const res = await teachFetch<Partial<ClassDetails>>(user, `/api/classes/${code}`, { method: "PATCH", body: JSON.stringify(changed) });
      onSaved({ ...details, ...res });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save the changes");
    } finally {
      setSaving(false);
    }
  };

  const label = "block text-sm font-medium text-gray-900 dark:text-gray-50 mb-1";
  return (
    <form
      onSubmit={save}
      onKeyDown={(e) => { if (e.key === "Escape") onCancel(); }}
      className="mt-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 space-y-3 w-full sm:w-96"
    >
      <div>
        <label htmlFor="class-name" className={label}>Class name</label>
        <Input id="class-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={MAX_NAME_LENGTH} autoFocus />
      </div>
      <div>
        <label htmlFor="teacher-name" className={label}>Your name, as students know you</label>
        <Input id="teacher-name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} placeholder="Ms. Rivera" maxLength={MAX_NAME_LENGTH} />
      </div>
      <div>
        <label htmlFor="school" className={label}>
          School <span className="font-normal text-gray-500 dark:text-gray-400">(optional)</span>
        </label>
        <Input id="school" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Lakeview Community College" maxLength={MAX_NAME_LENGTH} />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Students see these when they join. The class link and everyone&apos;s progress stay the same.
      </p>
      {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
      <div className="flex items-center gap-2">
        <button type="submit" disabled={saving} className="rounded-md bg-black text-white dark:bg-white dark:text-black px-3 py-1.5 text-sm font-medium">
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-md px-2 py-1.5 text-sm text-gray-600 dark:text-gray-300">Cancel</button>
      </div>
    </form>
  );
}
