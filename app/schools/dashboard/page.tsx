"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  ClipboardList,
  TrendingUp,
  UserPlus,
  UserMinus,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Download,
  Search,
} from "lucide-react";
import type { SchoolStudent, TopicScore } from "@/lib/school-types";

// --- Mock data ---
const SCHOOL_NAME = "Smith Driving Academy";
const PLAN_TIER = "Growth";
const TOTAL_SEATS = 30;

const DMV_TOPICS = [
  "Road Signs",
  "Traffic Laws",
  "Right of Way",
  "Parking",
  "Speed Limits",
  "Safe Driving",
  "Alcohol & Drugs",
  "Special Situations",
];

function makeTopicScores(overrides: Partial<Record<string, number>> = {}): TopicScore[] {
  return DMV_TOPICS.map((topic) => {
    const base = overrides[topic] ?? Math.floor(Math.random() * 40 + 60);
    const total = 10;
    const correct = Math.round((base / 100) * total);
    return { topic, correct, total };
  });
}

const mockStudents: SchoolStudent[] = [
  {
    uid: "1", name: "Alex Johnson", email: "alex.j@email.com",
    testsTaken: 8, lastActive: "2026-03-29", active: true,
    avgScore: 91, trend: "improving",
    topicScores: makeTopicScores({ "Road Signs": 95, "Traffic Laws": 90, "Right of Way": 88, "Parking": 92 }),
  },
  {
    uid: "2", name: "Maria Garcia", email: "maria.g@email.com",
    testsTaken: 5, lastActive: "2026-03-28", active: true,
    avgScore: 74, trend: "steady",
    topicScores: makeTopicScores({ "Alcohol & Drugs": 50, "Special Situations": 55, "Right of Way": 60 }),
  },
  {
    uid: "3", name: "James Wilson", email: "james.w@email.com",
    testsTaken: 8, lastActive: "2026-03-27", active: true,
    avgScore: 88, trend: "improving",
    topicScores: makeTopicScores({ "Road Signs": 90, "Traffic Laws": 85, "Parking": 88 }),
  },
  {
    uid: "4", name: "Sarah Chen", email: "sarah.c@email.com",
    testsTaken: 3, lastActive: "2026-03-26", active: true,
    avgScore: 58, trend: "declining",
    topicScores: makeTopicScores({ "Traffic Laws": 45, "Right of Way": 40, "Speed Limits": 50, "Alcohol & Drugs": 45 }),
  },
  {
    uid: "5", name: "David Kim", email: "david.k@email.com",
    testsTaken: 1, lastActive: "2026-03-22", active: true,
    avgScore: 62, trend: "new",
    topicScores: makeTopicScores({ "Road Signs": 60, "Traffic Laws": 55, "Safe Driving": 65 }),
  },
  {
    uid: "6", name: "Emily Davis", email: "emily.d@email.com",
    testsTaken: 7, lastActive: "2026-03-29", active: true,
    avgScore: 85, trend: "steady",
    topicScores: makeTopicScores({ "Road Signs": 88, "Traffic Laws": 82, "Parking": 85 }),
  },
  {
    uid: "7", name: "Ryan Martinez", email: "ryan.m@email.com",
    testsTaken: 4, lastActive: "2026-03-25", active: true,
    avgScore: 67, trend: "improving",
    topicScores: makeTopicScores({ "Special Situations": 48, "Alcohol & Drugs": 52, "Right of Way": 58 }),
  },
  {
    uid: "8", name: "Olivia Brown", email: "olivia.b@email.com",
    testsTaken: 0, lastActive: "2026-03-10", active: false,
    avgScore: undefined, trend: "new",
    topicScores: [],
  },
  {
    uid: "9", name: "Ethan Taylor", email: "ethan.t@email.com",
    testsTaken: 6, lastActive: "2026-03-28", active: true,
    avgScore: 79, trend: "steady",
    topicScores: makeTopicScores({ "Parking": 65, "Speed Limits": 70 }),
  },
  {
    uid: "10", name: "Sophia Lee", email: "sophia.l@email.com",
    testsTaken: 8, lastActive: "2026-03-29", active: true,
    avgScore: 93, trend: "improving",
    topicScores: makeTopicScores({ "Road Signs": 95, "Traffic Laws": 92, "Parking": 90 }),
  },
  {
    uid: "11", name: "Daniel Harris", email: "daniel.h@email.com",
    testsTaken: 2, lastActive: "2026-03-18", active: true,
    avgScore: 54, trend: "declining",
    topicScores: makeTopicScores({ "Traffic Laws": 40, "Right of Way": 38, "Alcohol & Drugs": 42, "Special Situations": 45 }),
  },
  {
    uid: "12", name: "Ava Robinson", email: "ava.r@email.com",
    testsTaken: 8, lastActive: "2026-03-27", active: true,
    avgScore: 89, trend: "improving",
    topicScores: makeTopicScores({ "Road Signs": 92, "Traffic Laws": 88 }),
  },
  {
    uid: "13", name: "Marcus Thompson", email: "marcus.t@email.com",
    testsTaken: 3, lastActive: "2026-03-24", active: true,
    avgScore: 61, trend: "declining",
    topicScores: makeTopicScores({ "Speed Limits": 42, "Right of Way": 48, "Traffic Laws": 52 }),
  },
  {
    uid: "14", name: "Priya Patel", email: "priya.p@email.com",
    testsTaken: 5, lastActive: "2026-03-29", active: true,
    avgScore: 82, trend: "improving",
    topicScores: makeTopicScores({ "Road Signs": 85, "Traffic Laws": 80, "Safe Driving": 82 }),
  },
  {
    uid: "15", name: "Jake O'Connor", email: "jake.o@email.com",
    testsTaken: 1, lastActive: "2026-03-19", active: true,
    avgScore: 48, trend: "new",
    topicScores: makeTopicScores({ "Road Signs": 40, "Traffic Laws": 45, "Right of Way": 50 }),
  },
];

function getWeakTopics(scores: TopicScore[], threshold = 65): string[] {
  return scores
    .filter((s) => s.total > 0 && (s.correct / s.total) * 100 < threshold)
    .sort((a, b) => a.correct / a.total - b.correct / b.total)
    .slice(0, 3)
    .map((s) => s.topic);
}

function isAtRisk(student: SchoolStudent): boolean {
  if (!student.active) return false;
  const score = student.avgScore ?? 0;
  return score < 65 || student.trend === "declining";
}

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80 ? "bg-green-500" : score >= 65 ? "bg-yellow-400" : "bg-red-500";
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span
        className={`text-xs font-semibold w-8 text-right ${
          score >= 80 ? "text-green-700" : score >= 65 ? "text-yellow-700" : "text-red-700"
        }`}
      >
        {score}%
      </span>
    </div>
  );
}

function TrendBadge({ trend }: { trend: SchoolStudent["trend"] }) {
  const cfg: Record<string, { label: string; class: string }> = {
    improving: { label: "↑ Improving", class: "bg-green-100 text-green-700" },
    declining: { label: "↓ Declining", class: "bg-red-100 text-red-700" },
    steady: { label: "→ Steady", class: "bg-gray-100 text-gray-600" },
    new: { label: "New", class: "bg-blue-100 text-blue-600" },
  };
  const t = cfg[trend ?? "new"];
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.class}`}>
      {t.label}
    </span>
  );
}

function StudentRow({ student, onRemove }: { student: SchoolStudent; onRemove: (uid: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const atRisk = isAtRisk(student);
  const weakTopics = getWeakTopics(student.topicScores ?? []);

  return (
    <>
      <tr
        className={`border-b border-gray-100 last:border-0 ${atRisk ? "bg-red-50/40" : ""} hover:bg-gray-50/60 cursor-pointer`}
        onClick={() => setExpanded((v) => !v)}
      >
        <td className="px-6 py-3">
          <div className="flex items-center gap-2">
            {atRisk && <AlertTriangle className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />}
            <span className="font-medium text-gray-900 text-sm">{student.name}</span>
          </div>
          <div className="text-xs text-gray-400 mt-0.5 pl-5">{student.email}</div>
        </td>
        <td className="px-6 py-3 text-center">
          <span
            className={`text-sm font-semibold ${
              Math.min(student.testsTaken, 8) >= 8 ? "text-green-600" : "text-gray-700"
            }`}
          >
            {Math.min(student.testsTaken, 8)}/8
          </span>
        </td>
        <td className="px-6 py-3">
          {student.avgScore !== undefined ? (
            <ScoreBar score={student.avgScore} />
          ) : (
            <span className="text-xs text-gray-400">No data yet</span>
          )}
        </td>
        <td className="px-6 py-3">
          <TrendBadge trend={student.trend} />
        </td>
        <td className="px-6 py-3 text-xs text-gray-500">{student.lastActive}</td>
        <td className="px-6 py-3 text-center">
          <Badge
            variant={student.active ? "default" : "secondary"}
            className={student.active ? "bg-green-100 text-green-700 hover:bg-green-100 text-xs" : "text-xs"}
          >
            {student.active ? "Active" : "Inactive"}
          </Badge>
        </td>
        <td className="px-6 py-3 text-right">
          <div className="flex items-center justify-end gap-2">
            {student.active && (
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(student.uid); }}
                className="text-gray-300 hover:text-red-500 transition-colors"
                title="Remove student"
              >
                <UserMinus className="h-4 w-4" />
              </button>
            )}
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-gray-50 border-b border-gray-100">
          <td colSpan={7} className="px-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Topic breakdown */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Topic scores
                </p>
                {student.topicScores && student.topicScores.length > 0 ? (
                  <div className="space-y-2">
                    {student.topicScores.map((ts) => {
                      const pct = ts.total > 0 ? Math.round((ts.correct / ts.total) * 100) : 0;
                      const color =
                        pct >= 80 ? "bg-green-500" : pct >= 65 ? "bg-yellow-400" : "bg-red-500";
                      return (
                        <div key={ts.topic} className="flex items-center gap-3">
                          <span className="text-xs text-gray-600 w-36 flex-shrink-0">{ts.topic}</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-gray-500 w-8 text-right">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No tests completed yet.</p>
                )}
              </div>
              {/* Weak spots callout */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Focus areas
                </p>
                {weakTopics.length > 0 ? (
                  <div className="space-y-2">
                    {weakTopics.map((t) => (
                      <div key={t} className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        <AlertTriangle className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
                        <span className="text-sm text-red-700">{t}</span>
                      </div>
                    ))}
                    <p className="text-xs text-gray-400 mt-2">
                      Recommend targeted practice on these topics before scheduling the road test.
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-3">
                    <p className="text-sm text-green-700 font-medium">✓ No major weak spots</p>
                    <p className="text-xs text-green-600 mt-0.5">Student is performing above threshold across all topics.</p>
                  </div>
                )}
                {atRisk && (
                  <div className="mt-3 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    <p className="text-xs font-semibold text-amber-700">⚠ Instructor attention recommended</p>
                    <p className="text-xs text-amber-600 mt-0.5">
                      {student.trend === "declining"
                        ? "Scores are trending down — consider checking in."
                        : "Overall score below passing threshold."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function SchoolDashboardPage() {
  const [students, setStudents] = useState(mockStudents);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmails, setInviteEmails] = useState("");
  const [filter, setFilter] = useState<"all" | "at-risk" | "ready">("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "score" | "progress">("score");

  const active = students.filter((s) => s.active);
  const atRiskStudents = active.filter(isAtRisk);
  const passReady = active.filter((s) => (s.avgScore ?? 0) >= 80 && s.testsTaken >= 6);
  const avgClassScore =
    active.filter((s) => s.avgScore !== undefined).reduce((sum, s) => sum + (s.avgScore ?? 0), 0) /
    (active.filter((s) => s.avgScore !== undefined).length || 1);

  const displayedStudents = useMemo(() => {
    let list = students.filter((s) => {
      if (filter === "at-risk") return isAtRisk(s);
      if (filter === "ready") return (s.avgScore ?? 0) >= 80 && s.testsTaken >= 6;
      return true;
    });
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      if (sortBy === "score") return (b.avgScore ?? 0) - (a.avgScore ?? 0);
      if (sortBy === "progress") return b.testsTaken - a.testsTaken;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [students, filter, search, sortBy]);

  const seatPercent = Math.round((active.length / TOTAL_SEATS) * 100);

  const handleInvite = () => {
    const emails = inviteEmails.split(/[,\n]+/).map((e) => e.trim()).filter(Boolean);
    const newStudents: SchoolStudent[] = emails.map((email, i) => ({
      uid: `new-${Date.now()}-${i}`,
      name: email.split("@")[0],
      email,
      testsTaken: 0,
      lastActive: new Date().toISOString().split("T")[0],
      active: true,
      avgScore: undefined,
      topicScores: [],
      trend: "new",
    }));
    setStudents((prev) => [...prev, ...newStudents]);
    setInviteEmails("");
    setShowInvite(false);
  };

  const handleRemove = (uid: string) => {
    setStudents((prev) => prev.map((s) => (s.uid === uid ? { ...s, active: false } : s)));
  };

  const handleExport = () => {
    const rows = [
      ["Name", "Email", "Tests Taken", "Avg Score", "Trend", "At Risk", "Weak Topics", "Last Active"],
      ...active.map((s) => [
        s.name,
        s.email,
        s.testsTaken,
        s.avgScore ?? "—",
        s.trend ?? "—",
        isAtRisk(s) ? "Yes" : "No",
        getWeakTopics(s.topicScores ?? []).join("; "),
        s.lastActive,
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${SCHOOL_NAME.replace(/\s+/g, "-")}-progress-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{SCHOOL_NAME}</h1>
          <p className="text-sm text-gray-500">{PLAN_TIER} plan &middot; Instructor Dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5 text-sm">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button
            onClick={() => setShowInvite(true)}
            size="sm"
            className="bg-brand text-white hover:bg-brand-dark gap-1.5 text-sm"
          >
            <UserPlus className="h-4 w-4" />
            Add students
          </Button>
        </div>
      </div>

      {/* At-risk alert banner */}
      {atRiskStudents.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">
              {atRiskStudents.length} student{atRiskStudents.length > 1 ? "s" : ""} need attention
            </p>
            <p className="text-sm text-red-600 mt-0.5">
              {atRiskStudents.map((s) => s.name).join(", ")} —{" "}
              scoring below 65% or showing a declining trend.{" "}
              <button className="underline font-medium" onClick={() => setFilter("at-risk")}>
                View at-risk students
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-gray-500">Active students</CardTitle>
            <Users className="h-4 w-4 text-brand" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-3xl font-bold text-gray-900">{active.length}</div>
            <p className="text-xs text-gray-400 mt-0.5">of {TOTAL_SEATS} seats</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-gray-500">Class avg score</CardTitle>
            <TrendingUp className="h-4 w-4 text-brand" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div
              className={`text-3xl font-bold ${
                avgClassScore >= 80 ? "text-green-600" : avgClassScore >= 65 ? "text-yellow-600" : "text-red-600"
              }`}
            >
              {Math.round(avgClassScore)}%
            </div>
            <p className="text-xs text-gray-400 mt-0.5">across all tests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-gray-500">Pass-ready</CardTitle>
            <ClipboardList className="h-4 w-4 text-brand" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-3xl font-bold text-gray-900">{passReady.length}</div>
            <p className="text-xs text-gray-400 mt-0.5">80%+ &amp; 6+ tests done</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-red-500">At risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-3xl font-bold text-red-600">{atRiskStudents.length}</div>
            <p className="text-xs text-red-400 mt-0.5">need intervention</p>
          </CardContent>
        </Card>
      </div>

      {/* Seats bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-gray-500">Seats used</span>
          <span className="text-xs text-gray-400">{active.length} / {TOTAL_SEATS}</span>
        </div>
        <Progress value={seatPercent} className="h-2" />
      </div>

      {/* Invite modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Add students</h2>
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
              <Button variant="outline" className="flex-1" onClick={() => setShowInvite(false)}>
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

      {/* Student table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base">
              Students
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({displayedStudents.length})
              </span>
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand w-36"
                />
              </div>
              {/* Filter */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                {(["all", "at-risk", "ready"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                      filter === f ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {f === "all" ? "All" : f === "at-risk" ? "⚠ At risk" : "✓ Pass-ready"}
                  </button>
                ))}
              </div>
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-brand"
              >
                <option value="score">Sort: Score</option>
                <option value="progress">Sort: Progress</option>
                <option value="name">Sort: Name</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left bg-gray-50/50">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">Student</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-center">Progress</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">Avg Score</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">Trend</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500">Last Active</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 text-center">Status</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {displayedStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-sm text-gray-400">
                      No students match this filter.
                    </td>
                  </tr>
                ) : (
                  displayedStudents.map((student) => (
                    <StudentRow key={student.uid} student={student} onRemove={handleRemove} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-gray-400 mt-4 text-center">
        Click any row to see topic-by-topic breakdown &middot; Export CSV for records
      </p>
    </div>
  );
}
