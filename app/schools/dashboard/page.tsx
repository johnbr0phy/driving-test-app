"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserPlus,
  UserMinus,
  X,
  CheckCircle,
  Clock,
} from "lucide-react";
import type { SchoolStudent } from "@/lib/school-types";

// --- Mock data ---
const SCHOOL_NAME = "Smith Driving Academy";
const PLAN_TIER = "Growth";
const TOTAL_SEATS = 20;

const mockStudents: SchoolStudent[] = [
  {
    uid: "1",
    name: "Alex Johnson",
    email: "alex.j@email.com",
    testsTaken: 8,
    lastActive: "2026-03-29",
    active: true,
    avgScore: 91,
    trend: "improving",
    topicScores: [],
    inviteStatus: "accepted",
  },
  {
    uid: "2",
    name: "Maria Garcia",
    email: "maria.g@email.com",
    testsTaken: 5,
    lastActive: "2026-03-28",
    active: true,
    avgScore: 74,
    trend: "steady",
    topicScores: [],
    inviteStatus: "accepted",
  },
  {
    uid: "3",
    name: "James Wilson",
    email: "james.w@email.com",
    testsTaken: 8,
    lastActive: "2026-03-27",
    active: true,
    avgScore: 88,
    trend: "improving",
    topicScores: [],
    inviteStatus: "accepted",
  },
  {
    uid: "4",
    name: "Sarah Chen",
    email: "sarah.c@email.com",
    testsTaken: 3,
    lastActive: "2026-03-26",
    active: true,
    avgScore: 58,
    trend: "declining",
    topicScores: [],
    inviteStatus: "accepted",
  },
  {
    uid: "5",
    name: "David Kim",
    email: "david.k@email.com",
    testsTaken: 1,
    lastActive: "2026-03-22",
    active: true,
    avgScore: 62,
    trend: "new",
    topicScores: [],
    inviteStatus: "accepted",
  },
  {
    uid: "6",
    name: "Emily Davis",
    email: "emily.d@email.com",
    testsTaken: 7,
    lastActive: "2026-03-29",
    active: true,
    avgScore: 85,
    trend: "steady",
    topicScores: [],
    inviteStatus: "accepted",
  },
  {
    uid: "7",
    name: "Ryan Martinez",
    email: "ryan.m@email.com",
    testsTaken: 4,
    lastActive: "2026-03-25",
    active: true,
    avgScore: 67,
    trend: "improving",
    topicScores: [],
    inviteStatus: "accepted",
  },
  {
    uid: "8",
    name: "Olivia Brown",
    email: "olivia.b@email.com",
    testsTaken: 0,
    lastActive: "—",
    active: true,
    avgScore: undefined,
    trend: "new",
    topicScores: [],
    inviteStatus: "pending",
  },
  {
    uid: "9",
    name: "Ethan Taylor",
    email: "ethan.t@email.com",
    testsTaken: 6,
    lastActive: "2026-03-28",
    active: true,
    avgScore: 79,
    trend: "steady",
    topicScores: [],
    inviteStatus: "accepted",
  },
  {
    uid: "10",
    name: "Sophia Lee",
    email: "sophia.l@email.com",
    testsTaken: 8,
    lastActive: "2026-03-29",
    active: true,
    avgScore: 93,
    trend: "improving",
    topicScores: [],
    inviteStatus: "accepted",
  },
  {
    uid: "11",
    name: "Daniel Harris",
    email: "daniel.h@email.com",
    testsTaken: 0,
    lastActive: "—",
    active: true,
    avgScore: undefined,
    trend: "new",
    topicScores: [],
    inviteStatus: "pending",
  },
  {
    uid: "12",
    name: "Ava Robinson",
    email: "ava.r@email.com",
    testsTaken: 8,
    lastActive: "2026-03-27",
    active: true,
    avgScore: 89,
    trend: "improving",
    topicScores: [],
    inviteStatus: "accepted",
  },
];

function getStatus(student: SchoolStudent): "pass-ready" | "needs-work" | "new" {
  if (student.inviteStatus === "pending" || student.testsTaken === 0) return "new";
  if ((student.avgScore ?? 0) >= 80) return "pass-ready";
  return "needs-work";
}

function StatusBadge({ student }: { student: SchoolStudent }) {
  const status = getStatus(student);
  if (status === "pass-ready")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        <CheckCircle className="h-3 w-3" /> Pass-ready
      </span>
    );
  if (status === "needs-work")
    return (
      <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
        Needs work
      </span>
    );
  return (
    <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
      New
    </span>
  );
}

function InviteBadge({ status }: { status: "pending" | "accepted" }) {
  if (status === "accepted")
    return (
      <span className="inline-flex items-center gap-1 text-xs text-gray-400">
        <CheckCircle className="h-3 w-3 text-green-400" /> Joined
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs text-amber-500">
      <Clock className="h-3 w-3" /> Pending
    </span>
  );
}

function ScoreCell({ score }: { score?: number }) {
  if (score === undefined)
    return <span className="text-xs text-gray-400">—</span>;
  const color =
    score >= 80 ? "text-green-700 bg-green-100" : score >= 65 ? "text-yellow-700 bg-yellow-100" : "text-red-700 bg-red-100";
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
      {score}%
    </span>
  );
}

// --- Invite Panel ---
interface InvitePanelProps {
  usedSeats: number;
  totalSeats: number;
  onInvite: (emails: string[]) => void;
  onClose: () => void;
}

function InvitePanel({ usedSeats, totalSeats, onInvite, onClose }: InvitePanelProps) {
  const [value, setValue] = useState("");
  const remaining = totalSeats - usedSeats;

  const parsed = useMemo(() => {
    return value
      .split(/[\n,;]+/)
      .map((e) => e.trim())
      .filter((e) => e.includes("@"));
  }, [value]);

  const overLimit = parsed.length > remaining;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Add students</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {usedSeats} / {totalSeats} seats used &middot;{" "}
              <span className={remaining <= 2 ? "text-red-500 font-medium" : "text-gray-400"}>
                {remaining} remaining
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Email addresses
          </label>
          <textarea
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm h-36 focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none placeholder:text-gray-300 font-mono"
            placeholder={"alice@school.edu\nbob@school.edu\ncharlie@school.edu"}
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-400">
              Paste multiple emails — one per line or comma-separated.
            </p>
            {parsed.length > 0 && (
              <span className={`text-xs font-medium ${overLimit ? "text-red-500" : "text-brand"}`}>
                {parsed.length} email{parsed.length !== 1 ? "s" : ""} detected
              </span>
            )}
          </div>
          {overLimit && (
            <p className="text-xs text-red-500 mt-2">
              ⚠ Only {remaining} seat{remaining !== 1 ? "s" : ""} remaining — remove some or upgrade your plan.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <Button
            variant="outline"
            className="flex-1 text-sm"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-brand text-white hover:bg-brand-dark text-sm"
            disabled={parsed.length === 0 || overLimit}
            onClick={() => {
              onInvite(parsed);
              onClose();
            }}
          >
            Send {parsed.length > 0 ? `${parsed.length} ` : ""}invite{parsed.length !== 1 ? "s" : ""}
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function SchoolDashboardPage() {
  const [students, setStudents] = useState(mockStudents);
  const [showInvite, setShowInvite] = useState(false);

  const activeStudents = students.filter((s) => s.active);
  const usedSeats = activeStudents.length;
  const seatPct = Math.min(Math.round((usedSeats / TOTAL_SEATS) * 100), 100);
  const seatColor =
    seatPct >= 90 ? "bg-red-500" : seatPct >= 70 ? "bg-yellow-400" : "bg-brand";

  const handleInvite = (emails: string[]) => {
    const newStudents: SchoolStudent[] = emails.map((email, i) => ({
      uid: `inv-${Date.now()}-${i}`,
      name: email.split("@")[0],
      email,
      testsTaken: 0,
      lastActive: "—",
      active: true,
      avgScore: undefined,
      topicScores: [],
      trend: "new",
      inviteStatus: "pending",
    }));
    setStudents((prev) => [...prev, ...newStudents]);
  };

  const handleRemove = (uid: string) => {
    setStudents((prev) => prev.filter((s) => s.uid !== uid));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{SCHOOL_NAME}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{PLAN_TIER} plan &middot; Instructor Dashboard</p>
        </div>
        <Button
          onClick={() => setShowInvite(true)}
          className="bg-brand text-white hover:bg-brand-dark gap-2 text-sm self-start"
        >
          <UserPlus className="h-4 w-4" />
          Add students
        </Button>
      </div>

      {/* Seat usage card */}
      <div className="mb-8 bg-white border border-gray-200 rounded-2xl px-6 py-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-brand" />
            <span className="text-sm font-semibold text-gray-800">Seats used</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900">{usedSeats}</span>
            <span className="text-sm text-gray-400"> / {TOTAL_SEATS}</span>
          </div>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${seatColor}`}
            style={{ width: `${seatPct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">{TOTAL_SEATS - usedSeats} seats remaining</span>
          <button
            onClick={() => setShowInvite(true)}
            className="text-xs text-brand font-medium hover:underline"
          >
            + Add students
          </button>
        </div>
      </div>

      {/* Student table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            Students
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({activeStudents.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left bg-gray-50/60">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">Student</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-center">Tests taken</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">Last active</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">Score</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">Invite</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {activeStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Users className="h-8 w-8 text-gray-200" />
                        <p className="text-sm text-gray-400">No students yet</p>
                        <button
                          onClick={() => setShowInvite(true)}
                          className="text-sm text-brand font-medium hover:underline"
                        >
                          Add your first student
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  activeStudents.map((student) => (
                    <tr
                      key={student.uid}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors"
                    >
                      {/* Name + email */}
                      <td className="px-6 py-3">
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{student.email}</div>
                      </td>

                      {/* Tests taken */}
                      <td className="px-6 py-3 text-center">
                        <span className="text-sm font-semibold text-gray-700">
                          {student.testsTaken}
                        </span>
                      </td>

                      {/* Last active */}
                      <td className="px-6 py-3 text-xs text-gray-500">
                        {student.lastActive}
                      </td>

                      {/* Score */}
                      <td className="px-6 py-3">
                        <ScoreCell score={student.avgScore} />
                      </td>

                      {/* Status badge */}
                      <td className="px-6 py-3">
                        <StatusBadge student={student} />
                      </td>

                      {/* Invite status */}
                      <td className="px-6 py-3">
                        <InviteBadge status={student.inviteStatus ?? "accepted"} />
                      </td>

                      {/* Remove */}
                      <td className="px-6 py-3 text-right">
                        <button
                          onClick={() => handleRemove(student.uid)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded"
                          title="Remove student"
                        >
                          <UserMinus className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Invite panel */}
      {showInvite && (
        <InvitePanel
          usedSeats={usedSeats}
          totalSeats={TOTAL_SEATS}
          onInvite={handleInvite}
          onClose={() => setShowInvite(false)}
        />
      )}
    </div>
  );
}
