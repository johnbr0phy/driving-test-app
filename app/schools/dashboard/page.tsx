"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, ClipboardList, TrendingUp, UserPlus, UserMinus } from "lucide-react";
import type { SchoolStudent } from "@/lib/school-types";

// --- Mock data ---
const SCHOOL_NAME = "Smith Driving Academy";
const PLAN_TIER = "Growth";
const TOTAL_SEATS = 30;

const mockStudents: SchoolStudent[] = [
  { uid: "1", name: "Alex Johnson", email: "alex.j@email.com", testsTaken: 8, lastActive: "2026-03-21", active: true },
  { uid: "2", name: "Maria Garcia", email: "maria.g@email.com", testsTaken: 5, lastActive: "2026-03-20", active: true },
  { uid: "3", name: "James Wilson", email: "james.w@email.com", testsTaken: 12, lastActive: "2026-03-19", active: true },
  { uid: "4", name: "Sarah Chen", email: "sarah.c@email.com", testsTaken: 3, lastActive: "2026-03-18", active: true },
  { uid: "5", name: "David Kim", email: "david.k@email.com", testsTaken: 1, lastActive: "2026-03-15", active: true },
  { uid: "6", name: "Emily Davis", email: "emily.d@email.com", testsTaken: 7, lastActive: "2026-03-21", active: true },
  { uid: "7", name: "Ryan Martinez", email: "ryan.m@email.com", testsTaken: 4, lastActive: "2026-03-17", active: true },
  { uid: "8", name: "Olivia Brown", email: "olivia.b@email.com", testsTaken: 0, lastActive: "2026-03-10", active: false },
  { uid: "9", name: "Ethan Taylor", email: "ethan.t@email.com", testsTaken: 6, lastActive: "2026-03-20", active: true },
  { uid: "10", name: "Sophia Lee", email: "sophia.l@email.com", testsTaken: 10, lastActive: "2026-03-21", active: true },
  { uid: "11", name: "Daniel Harris", email: "daniel.h@email.com", testsTaken: 2, lastActive: "2026-03-14", active: true },
  { uid: "12", name: "Ava Robinson", email: "ava.r@email.com", testsTaken: 9, lastActive: "2026-03-19", active: true },
];

function getStats(students: SchoolStudent[]) {
  const active = students.filter((s) => s.active);
  const now = new Date("2026-03-21");
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const testsThisWeek = students
    .filter((s) => new Date(s.lastActive) >= weekAgo)
    .reduce((sum, s) => sum + s.testsTaken, 0);

  // Pass rate proxy: % of active students who have completed 3+ full tests
  const passReady = active.filter((s) => s.testsTaken >= 3).length;
  const passRate = active.length > 0 ? Math.round((passReady / active.length) * 100) : 0;

  return {
    activeStudents: active.length,
    testsThisWeek,
    passRate,
  };
}

export default function SchoolDashboardPage() {
  const [students, setStudents] = useState(mockStudents);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmails, setInviteEmails] = useState("");

  const stats = getStats(students);
  const activeCount = students.filter((s) => s.active).length;
  const seatPercent = Math.round((activeCount / TOTAL_SEATS) * 100);

  const handleInvite = () => {
    const emails = inviteEmails
      .split(/[,\n]+/)
      .map((e) => e.trim())
      .filter(Boolean);

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
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{SCHOOL_NAME}</h1>
          <p className="text-sm text-gray-500">{PLAN_TIER} plan</p>
        </div>
        <Button
          onClick={() => setShowInvite(true)}
          className="bg-brand text-white hover:bg-brand-dark"
        >
          <UserPlus className="h-4 w-4" />
          Add students
        </Button>
      </div>

      {/* Seats progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Seats used
          </span>
          <span className="text-sm text-gray-500">
            {activeCount} / {TOTAL_SEATS}
          </span>
        </div>
        <Progress value={seatPercent} className="h-3" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active students
            </CardTitle>
            <Users className="h-4 w-4 text-brand" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {stats.activeStudents}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Tests this week
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-brand" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {stats.testsThisWeek}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pass-ready (3+ tests)
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-brand" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {stats.passRate}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk invite modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Add students
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Enter email addresses separated by commas or new lines.
            </p>
            <textarea
              value={inviteEmails}
              onChange={(e) => setInviteEmails(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm h-32 focus:outline-none focus:ring-2 focus:ring-brand resize-none"
              placeholder={"student1@email.com\nstudent2@email.com"}
            />
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowInvite(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-brand text-white hover:bg-brand-dark"
                onClick={handleInvite}
                disabled={!inviteEmails.trim()}
              >
                Invite
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Student list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Students</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-6 py-3 font-medium text-gray-500">Name</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Email</th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-center">
                    Tests taken
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500">
                    Last active
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-center">
                    Status
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500" />
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.uid}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {student.testsTaken}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {student.lastActive}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant={student.active ? "default" : "secondary"}
                        className={
                          student.active
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : ""
                        }
                      >
                        {student.active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {student.active && (
                        <button
                          onClick={() => handleRemove(student.uid)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove student (free up seat)"
                        >
                          <UserMinus className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
