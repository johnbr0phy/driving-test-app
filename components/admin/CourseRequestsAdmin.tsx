"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminFetch } from "@/components/admin/AdminTabParts";
import { COURSE_STATUS_LABELS, type AdminCourseRequestsPayload, type CourseRequest, type CourseRequestStatus } from "@/lib/courseRequests";

// Course requests on the /admin Teachers tab: what each teacher asked for and
// the buttons that move it along (docs/COURSE_REQUESTS.md). Review and Ready
// need the built course picked; Ready makes the teacher's class and emails
// them its link.

const STATUS_STYLES: Record<CourseRequestStatus, string> = {
  requested: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  building: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  review: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  ready: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  declined: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
};

const fmtDay = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

function RequestRow({ r, courses, onDone }: { r: CourseRequest; courses: AdminCourseRequestsPayload["courses"]; onDone: () => void }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(r.status === "requested" || r.status === "building");
  // The course built for this request, else whatever was linked before.
  const [examId, setExamId] = useState(r.examId ?? courses.find((c) => c.requestId === r.id)?.id ?? "");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const course = courses.find((c) => c.id === examId);

  const act = async (action: "building" | "review" | "ready" | "declined") => {
    if (action === "ready" && !confirm(r.classCode ? `Resend the class link to ${r.teacherEmail}?` : `Make the class and email ${r.teacherEmail}?`)) return;
    if (action === "review" && !confirm(`Email ${r.teacherEmail} a preview link?`)) return;
    setBusy(true);
    setMessage("");
    try {
      const token = await user?.getIdToken();
      const res = await fetch("/api/admin/course-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: r.id, action, examId }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? `Error ${res.status}`);
      setMessage(body.warning ?? (action === "ready" ? `Class ${body.classCode} made, teacher emailed` : action === "review" ? "Preview emailed" : "Saved"));
      onDone();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  const btn = "px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40";

  return (
    <li className="border-t border-gray-100 dark:border-gray-800 first:border-t-0">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 py-3 text-left">
        <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 flex-shrink-0 ${STATUS_STYLES[r.status]}`}>{COURSE_STATUS_LABELS[r.status]}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-gray-900 dark:text-gray-50 truncate">{r.courseName} · {r.level}</span>
          <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
            {r.teacherName}{r.school ? `, ${r.school}` : ""} · {r.teacherEmail ?? "no email"} · {fmtDay(r.createdAt)}{r.neededBy ? ` · needed ${r.neededBy}` : ""}
          </span>
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-4 pl-1 space-y-3 text-sm text-gray-700 dark:text-gray-200">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Topics ({r.topics.length})</p>
              <ol className="list-decimal pl-5 space-y-0.5">{r.topics.map((t) => <li key={t}>{t}</li>)}</ol>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Materials</p>
              <p className="whitespace-pre-wrap break-words">{r.materials || "None"}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Request id <code className="select-all">{r.id}</code>
            {r.classCode && (
              <> · class <Link href={`/teach/classes/${r.classCode}`} className="underline">{r.classCode}</Link></>
            )}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={examId}
              onChange={(e) => setExamId(e.target.value)}
              className="h-8 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-2 text-xs"
              aria-label="Built course"
            >
              <option value="">{courses.length ? "Pick the built course" : "No courses built yet"}</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}{c.requestId === r.id ? " (this request)" : ""}</option>
              ))}
            </select>
            {course && (
              <Link href={course.dashboard} target="_blank" className="inline-flex items-center gap-1 text-xs underline">
                Preview <ExternalLink className="h-3 w-3" />
              </Link>
            )}
            <span className="flex-1" />
            <button type="button" className={btn} disabled={busy || r.status === "building"} onClick={() => act("building")}>Building</button>
            <button type="button" className={btn} disabled={busy || !course} onClick={() => act("review")}>Send preview</button>
            <button type="button" className={btn} disabled={busy || !course} onClick={() => act("ready")}>{r.classCode ? "Resend class link" : "Make class & send"}</button>
            <button type="button" className={btn} disabled={busy || r.status === "declined"} onClick={() => act("declined")}>Decline</button>
          </div>
          {message && <p className="text-xs text-gray-600 dark:text-gray-300">{message}</p>}
        </div>
      )}
    </li>
  );
}

export function CourseRequestsAdmin() {
  const { data, error, loading, reload } = useAdminFetch<AdminCourseRequestsPayload>("/api/admin/course-requests");
  const waiting = data?.requests.filter((r) => r.status === "requested").length ?? 0;
  return (
    <section className="text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5 mb-6">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold">Course requests</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {waiting > 0 ? `${waiting} waiting · ` : ""}Teachers who asked us to build a course · how to build one: docs/COURSE_REQUESTS.md
        </p>
      </div>
      {loading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      ) : error || !data ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error || "Failed to load"}</p>
      ) : data.requests.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No requests yet. Teachers ask from /teach/course.</p>
      ) : (
        <ul>{data.requests.map((r) => <RequestRow key={r.id} r={r} courses={data.courses} onDone={() => reload(true)} />)}</ul>
      )}
    </section>
  );
}
