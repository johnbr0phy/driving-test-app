"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Trash2, AlertTriangle, CheckCircle2, X, Clock } from "lucide-react";
import type { SchoolStudent } from "@/lib/school-types";

// --- Config ---
const SCHOOL_NAME = "Smith Driving Academy";
const PLAN_TIER = "Growth";
const TOTAL_SEATS = 20;
const TOTAL_SECTIONS = 8;

// --- Mock data (only fields we actually use) ---
const mockStudents: SchoolStudent[] = [
  { uid: "1",  name: "Alex Johnson",    email: "alex.j@email.com",   testsTaken: 8, lastActive: "2026-03-29", active: true },
  { uid: "2",  name: "Maria Garcia",    email: "maria.g@email.com",  testsTaken: 5, lastActive: "2026-03-28", active: true },
  { uid: "3",  name: "James Wilson",    email: "james.w@email.com",  testsTaken: 8, lastActive: "2026-03-27", active: true },
  { uid: "4",  name: "Sarah Chen",      email: "sarah.c@email.com",  testsTaken: 3, lastActive: "2026-03-26", active: true },
  { uid: "5",  name: "David Kim",       email: "david.k@email.com",  testsTaken: 1, lastActive: "2026-03-22", active: true },
  { uid: "6",  name: "Emily Davis",     email: "emily.d@email.com",  testsTaken: 7, lastActive: "2026-03-29", active: true },
  { uid: "7",  name: "Ryan Martinez",   email: "ryan.m@email.com",   testsTaken: 4, lastActive: "2026-03-25", active: true },
  { uid: "8",  name: "Olivia Brown",    email: "olivia.b@email.com", testsTaken: 0, lastActive: "2026-03-10", active: false },
  { uid: "9",  name: "Ethan Taylor",    email: "ethan.t@email.com",  testsTaken: 6, lastActive: "2026-03-28", active: true },
  { uid: "10", name: "Sophia Lee",      email: "sophia.l@email.com", testsTaken: 8, lastActive: "2026-03-29", active: true },
  { uid: "11", name: "Daniel Harris",   email: "daniel.h@email.com", testsTaken: 2, lastActive: "2026-03-18", active: true },
  { uid: "12", name: "Ava Robinson",    email: "ava.r@email.com",    testsTaken: 8, lastActive: "2026-03-27", active: true },
];

/** Determine if a student is "Active" (tested in last 14 days) or "Pending" (not started / inactive) */
function getStudentStatus(student: SchoolStudent): "active" | "pending" {
  if (student.testsTaken === 0) return "pending";
  const lastDate = new Date(student.lastActive);
  const diffDays = (Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 14 ? "active" : "pending";
}

function StatusBadge({ status }: { status: "active" | "pending" }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
      <Clock className="h-3 w-3" />
      Pending
    </span>
  );
}

export default function SchoolDashboardPage() {
  const [students, setStudents] = useState<SchoolStudent[]>(mockStudents);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmails, setInviteEmails] = useState("");
  const [removeConfirm, setRemoveConfirm] = useState<string | null>(null);

  const activeStudents = students.filter((s) => s.active);

  // Parse emails live as user types
  const parsedEmails = useMemo(() => {
    return inviteEmails
      .split(/[,\n\s]+/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e.includes("@") && e.includes("."));
  }, [inviteEmails]);

  const seatsRemaining = TOTAL_SEATS - activeStudents.length;
  const duplicateEmails = parsedEmails.filter((e) =>
    students.some((s) => s.active && s.email.toLowerCase() === e)
  );
  const newEmailCount = parsedEmails.filter(
    (e) => !students.some((s) => s.active && s.email.toLowerCase() === e)
  ).length;
  const overSeatLimit = newEmailCount > seatsRemaining;

  const handleInvite = () => {
    const emails = parsedEmails.filter(
      (e) => !students.some((s) => s.active && s.email.toLowerCase() === e)
    );
    const newStudents: SchoolStudent[] = emails.map((email, i) => ({
      uid: `new-${Date.now()}-${i}`,
      name: email.split("@")[0],
      email,
      testsTaken: 0,
      lastActive: new Date().toISOString().split("T")[0],
      active: true,
    }));
    setStudents((prev) => [...prev, ...newStudents]);
    setInviteEmails("");
    setShowInvite(false);
  };

  const handleRemove = (uid: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.uid === uid ? { ...s, active: false } : s))
    );
    setRemoveConfirm(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{SCHOOL_NAME}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {PLAN_TIER} plan &middot; {activeStudents.length}/{TOTAL_SEATS} seats used
          </p>
        </div>
        <Button
          onClick={() => setShowInvite(true)}
          size="sm"
          className="bg-brand text-white hover:bg-brand-dark gap-1.5 text-sm shrink-0"
        >
          <UserPlus className="h-4 w-4" />
          Add students
        </Button>
      </div>

      {/* Student table */}
      <Card>
        <CardHeader className="pb-3 pt-5 px-6">
          <CardTitle className="text-base font-semibold text-gray-900">
            Students
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({activeStudents.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {activeStudents.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-gray-400 text-sm mb-4">No students yet.</p>
              <Button
                onClick={() => setShowInvite(true)}
                className="bg-brand text-white hover:bg-brand-dark gap-1.5"
              >
                <UserPlus className="h-4 w-4" />
                Add your first student
              </Button>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Student
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 min-w-[180px]">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 w-16" />
                </tr>
              </thead>
              <tbody>
                {activeStudents.map((student) => {
                  const done = Math.min(student.testsTaken, TOTAL_SECTIONS);
                  const isConfirming = removeConfirm === student.uid;
                  const status = getStudentStatus(student);

                  return (
                    <tr
                      key={student.uid}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
                    >
                      {/* Name / Email */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{student.email}</p>
                      </td>

                      {/* Progress: bar + X/8 */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 justify-center">
                          {/* Mini progress bar */}
                          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                            <div
                              className={`h-full rounded-full transition-all ${
                                done >= TOTAL_SECTIONS
                                  ? "bg-green-500"
                                  : done >= TOTAL_SECTIONS / 2
                                  ? "bg-brand"
                                  : "bg-gray-300"
                              }`}
                              style={{ width: `${(done / TOTAL_SECTIONS) * 100}%` }}
                            />
                          </div>
                          {/* Fraction */}
                          <span
                            className={`text-sm font-semibold tabular-nums w-8 text-right flex-shrink-0 ${
                              done >= TOTAL_SECTIONS
                                ? "text-green-600"
                                : "text-gray-700"
                            }`}
                          >
                            {done}/{TOTAL_SECTIONS}
                          </span>
                        </div>
                      </td>

                      {/* Status badge */}
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={status} />
                      </td>

                      {/* Remove */}
                      <td className="px-6 py-4 text-right">
                        {isConfirming ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setRemoveConfirm(null)}
                              className="text-xs text-gray-400 hover:text-gray-600"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleRemove(student.uid)}
                              className="text-xs font-medium text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setRemoveConfirm(student.uid)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                            title="Remove student"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Invite modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-lg font-bold text-gray-900">Add students</h2>
              <button
                onClick={() => { setShowInvite(false); setInviteEmails(""); }}
                className="text-gray-400 hover:text-gray-600 transition-colors -mr-1 -mt-1 p-1 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-1">
              Paste email addresses — one per line or comma-separated.
            </p>

            {/* Seats remaining hint */}
            <p className="text-xs text-gray-400 mb-4">
              {seatsRemaining} seat{seatsRemaining !== 1 ? "s" : ""} remaining on your plan.
            </p>

            <textarea
              autoFocus
              value={inviteEmails}
              onChange={(e) => setInviteEmails(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm h-36 focus:outline-none focus:ring-2 focus:ring-brand resize-none font-mono"
              placeholder={"student1@school.com\nstudent2@school.com\nstudent3@school.com"}
            />

            {/* Live feedback */}
            {parsedEmails.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {/* Valid count */}
                <div className="flex items-center gap-1.5 text-xs text-green-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                  {newEmailCount} valid email{newEmailCount !== 1 ? "s" : ""} ready to invite
                </div>

                {/* Duplicates */}
                {duplicateEmails.length > 0 && (
                  <div className="flex items-start gap-1.5 text-xs text-amber-700">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>
                      {duplicateEmails.length} already enrolled (will be skipped):{" "}
                      <span className="text-amber-600">{duplicateEmails.join(", ")}</span>
                    </span>
                  </div>
                )}

                {/* Over seat limit */}
                {overSeatLimit && (
                  <div className="flex items-start gap-1.5 text-xs text-red-700">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Only {seatsRemaining} seat{seatsRemaining !== 1 ? "s" : ""} available.
                      Upgrade your plan to add all {newEmailCount} students.
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => { setShowInvite(false); setInviteEmails(""); }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-brand text-white hover:bg-brand-dark"
                onClick={handleInvite}
                disabled={newEmailCount === 0 || overSeatLimit}
              >
                {newEmailCount > 0
                  ? `Invite ${newEmailCount} student${newEmailCount !== 1 ? "s" : ""}`
                  : "Invite"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
