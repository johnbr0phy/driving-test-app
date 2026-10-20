"use client";

// Ask us to build a course: for a teacher whose test isn't on the site. They
// describe it (name, level, topics); John builds it by hand
// (docs/COURSE_REQUESTS.md) and emails them, first a preview, then their
// class link. Linked from the /teach/new picker and the /teach class list.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { teachFetch } from "@/lib/teachClient";
import { trackTeachStep } from "@/lib/teachTracking";
import { MAX_COURSE_MATERIALS, MAX_COURSE_TOPICS, MIN_COURSE_TOPICS, parseTopics } from "@/lib/courseRequests";

const fieldClass = "block text-sm font-medium text-gray-800 dark:text-gray-100 mb-1.5";
const hintClass = "font-normal text-gray-500 dark:text-gray-400";
const areaClass =
  "w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400";

export default function CourseRequestPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [courseName, setCourseName] = useState("");
  const [level, setLevel] = useState("");
  const [topics, setTopics] = useState("");
  const [materials, setMaterials] = useState("");
  const [neededBy, setNeededBy] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [school, setSchool] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => trackTeachStep("course_open"), []);

  useEffect(() => {
    if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent("/teach/course")}`);
    if (user?.displayName) setTeacherName((t) => t || user.displayName!);
  }, [loading, user, router]);

  const topicCount = parseTopics(topics).length;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!courseName.trim()) return setError("Name the course");
    if (!level.trim()) return setError("Say who takes the course");
    if (topicCount < MIN_COURSE_TOPICS) return setError(`List at least ${MIN_COURSE_TOPICS} topics, one per line`);
    if (!teacherName.trim()) return setError("Add the name your students know you by");
    setBusy(true);
    setError("");
    try {
      await teachFetch(user, "/api/course-requests", {
        method: "POST",
        body: JSON.stringify({ courseName, level, topics, materials, neededBy, teacherName, school }),
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send it. Try again.");
    } finally {
      setBusy(false);
    }
  };

  if (loading || !user) return <div className="flex-1 bg-gray-50 dark:bg-gray-950" />;

  if (sent) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 py-16 max-w-xl text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mx-auto mb-5">
            <Check className="w-7 h-7 text-green-700 dark:text-green-300" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">We&apos;re building {courseName.trim()}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            You&apos;ll get an email at {user.email}, usually within 2 school days, with a preview to look over.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Once it looks right, we set up your class and send you the link to share with students.</p>
          <Link href="/teach" className="inline-flex rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 text-sm font-medium">
            Back to your classes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-2xl">
        <Link href="/teach" className="text-sm text-gray-600 dark:text-gray-300 underline">Your classes</Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mt-3 mb-2">Build your own course</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Teaching something we don&apos;t have a test for? Tell us what your course covers. We&apos;ll write the practice questions, training sets and
          tests, and you get the same class page: every student&apos;s progress, weakest topics and most-missed questions. Free.
        </p>
        <form onSubmit={submit} className="space-y-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="course-name" className={fieldClass}>Course name</label>
              <Input id="course-name" value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="AP Biology" maxLength={80} />
            </div>
            <div>
              <label htmlFor="course-level" className={fieldClass}>Who takes it</label>
              <Input id="course-level" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="11th grade, first-year nursing…" maxLength={80} />
            </div>
          </div>
          <div>
            <label htmlFor="course-topics" className={fieldClass}>
              Topics <span className={hintClass}>(one per line, {MIN_COURSE_TOPICS} to {MAX_COURSE_TOPICS})</span>
            </label>
            <textarea
              id="course-topics"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              rows={7}
              placeholder={"Cell structure\nCellular respiration\nPhotosynthesis\nGenetics and heredity\nEvolution"}
              className={areaClass}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {topicCount} {topicCount === 1 ? "topic" : "topics"}. Each one becomes a training set, and its questions are mixed into the practice tests.
            </p>
          </div>
          <div>
            <label htmlFor="course-materials" className={fieldClass}>
              Syllabus or materials <span className={hintClass}>(optional)</span>
            </label>
            <textarea
              id="course-materials"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              rows={4}
              maxLength={MAX_COURSE_MATERIALS}
              placeholder="Paste your syllabus, textbook chapters or a link. The more we know, the closer the questions match what you teach."
              className={areaClass}
            />
          </div>
          <div>
            <label htmlFor="course-needed" className={fieldClass}>
              When do you need it? <span className={hintClass}>(optional)</span>
            </label>
            <Input id="course-needed" value={neededBy} onChange={(e) => setNeededBy(e.target.value)} placeholder="Before the unit test on Nov 14" maxLength={80} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="teacher-name" className={fieldClass}>Your name, as students know you</label>
              <Input id="teacher-name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} placeholder="Ms. Rivera" maxLength={40} />
            </div>
            <div>
              <label htmlFor="school" className={fieldClass}>
                School <span className={hintClass}>(optional)</span>
              </label>
              <Input id="school" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Lakeview High School" maxLength={40} />
            </div>
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <Button type="submit" disabled={busy} className="w-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
            {busy ? "Sending…" : (<><Sparkles className="w-4 h-4 mr-1.5" aria-hidden="true" /> Build my course</>)}
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            A person reads every request. We email you a preview to check before any student sees it.
          </p>
        </form>
      </div>
    </div>
  );
}
