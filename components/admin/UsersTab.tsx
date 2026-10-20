"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { deleteDoc, doc } from "firebase/firestore";
import { ChevronLeft, ChevronRight, GraduationCap, RefreshCw, Search, Sparkles, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { states } from "@/data/states";
import { Button } from "@/components/ui/button";
import { TabError, TabHeader, TabLoading, useAdminFetch } from "@/components/admin/AdminTabParts";

// The Users tab on /admin: the 100 most recently active accounts (search,
// filter, delete), DMV pass rate by state and Super Amazing adoption, from
// /api/admin/users. Trends, revenue and paywalls are on the other tabs.

interface UserData {
  uid: string;
  email: string;
  selectedState: string | null;
  /** The test they signed up for: their first visit's test landing, else their current test. */
  test: { id: string; name: string; source: "landing" | "current" };
  lastUpdated: string | null;
  createdAt: string | null;
  testsCompleted: number;
  trainingQuestionsAnswered: number;
  testQuestionsAnswered: number;
  isPremium: boolean;
  convertedPaywall: { key: string; label: string; location: string } | null;
  superAmazingEligible: boolean;
  superAmazingEnabled: boolean;
}

interface UsersPayload {
  users: UserData[];
  totalUsers: number;
  superAmazing: { eligibleUsers: number; enabledUsers: number; everEnabledUsers: number };
  passRateByState: { code: string; attempts: number; passed: number; passRate: number }[];
}

const PAGE_SIZE = 20;

const getStateName = (code: string | null): string => {
  if (!code) return "Not selected";
  return states.find((s) => s.code === code)?.name || code;
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const cardClass = "bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5 mb-4";

export function UsersTab() {
  const { data, setData, error, loading, refreshing, reload } = useAdminFetch<UsersPayload>("/api/admin/users");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [usersPage, setUsersPage] = useState(0);
  const [userSearch, setUserSearch] = useState("");
  const [testFilter, setTestFilter] = useState<string>("all");
  const [premiumOnly, setPremiumOnly] = useState(false);

  useEffect(() => {
    setUsersPage(0);
  }, [userSearch, testFilter, premiumOnly]);

  if (loading) return <TabLoading />;
  if (error || !data) return <TabError message={error || "Failed to load users"} />;

  const { users, superAmazing, passRateByState } = data;

  const deleteUser = async (uid: string) => {
    if (!confirm(`Delete user ${uid}? This cannot be undone.`)) return;
    setDeleting(uid);
    try {
      await deleteDoc(doc(db, "users", uid));
      setData((d) => (d ? { ...d, users: d.users.filter((u) => u.uid !== uid), totalUsers: d.totalUsers - 1 } : d));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    } finally {
      setDeleting(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    if (premiumOnly && !u.isPremium) return false;
    if (testFilter !== "all" && u.test.id !== testFilter) return false;
    if (userSearch.trim()) {
      const q = userSearch.trim().toLowerCase();
      if (!`${u.email || ""} ${u.uid}`.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const usersPageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const usersPageSafe = Math.min(usersPage, usersPageCount - 1);
  const visibleUsers = filteredUsers.slice(usersPageSafe * PAGE_SIZE, usersPageSafe * PAGE_SIZE + PAGE_SIZE);

  const availableTests = Array.from(new Map(users.map((u) => [u.test.id, u.test.name])).entries()).sort((a, b) =>
    a[1].localeCompare(b[1]),
  );

  return (
    <>
      <TabHeader
        subtitle={<>{data.totalUsers.toLocaleString()} accounts · table shows the 100 most recently active</>}
        onRefresh={() => reload(true)}
        refreshing={refreshing}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Super Amazing adoption */}
        <div className={`${cardClass} mb-0`}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">Super Amazing Mode</h2>
          </div>
          <p className="text-3xl font-semibold tabular-nums text-gray-900 dark:text-gray-50">{superAmazing.enabledUsers}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            on now · {superAmazing.eligibleUsers} earned it · {superAmazing.everEnabledUsers} ever turned it on
          </p>
        </div>

        {/* Pass Rate by State */}
        <div className={`${cardClass} mb-0 lg:col-span-2`}>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">DMV pass rate by state</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">top 100 active users</span>
          </div>
          {passRateByState.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No completed tests yet.</p>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {passRateByState.slice(0, 12).map((s) => {
                const pct = s.passRate * 100;
                const color = pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-red-500";
                return (
                  <div key={s.code}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">
                        {getStateName(s.code)} <span className="text-gray-500 dark:text-gray-400 text-xs">({s.code})</span>
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 tabular-nums">
                        {pct.toFixed(0)}% <span className="text-gray-500 dark:text-gray-400 text-xs">({s.passed}/{s.attempts})</span>
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                      <div className={`${color} h-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* User List */}
      <div className={cardClass}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
            Recent users{" "}
            <span className="font-normal text-gray-500 dark:text-gray-400">
              ({filteredUsers.length}
              {filteredUsers.length !== users.length ? ` of ${users.length}` : ""})
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search email or UID"
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-brand w-56"
              />
            </div>
            <select
              value={testFilter}
              onChange={(e) => setTestFilter(e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1.5 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value="all">All tests</option>
              {availableTests.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            <label className="inline-flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-200 cursor-pointer select-none">
              <input type="checkbox" checked={premiumOnly} onChange={(e) => setPremiumOnly(e.target.checked)} className="rounded" />
              Premium only
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Test</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Last Active</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Training Qs</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Test Qs</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Converted Via</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400"></th>
              </tr>
            </thead>
            <tbody>
              {visibleUsers.map((u) => (
                <tr key={u.uid} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-600 dark:text-gray-300 font-mono">{u.uid}</span>
                      {u.isPremium && (
                        <Image src="/tiger_face_01.png" alt="Premium user" width={20} height={20} title="Premium user" className="w-5 h-5" />
                      )}
                      {u.superAmazingEnabled ? (
                        <span title="Super Amazing Mode on">
                          <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                        </span>
                      ) : u.superAmazingEligible ? (
                        <span title="8/8 complete, Super Amazing Mode unlocked but not turned on">
                          <Sparkles className="h-4 w-4 text-gray-300" />
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded text-xs font-medium"
                      title={u.test.source === "landing" ? "From their signup landing page" : "Their current test (no test landing on signup)"}
                    >
                      {u.test.name}
                      {u.test.id === "dmv" && u.selectedState && ` · ${u.selectedState}`}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {u.lastUpdated ? formatDate(u.lastUpdated) : <span className="text-gray-500 dark:text-gray-400">Never</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium">{u.trainingQuestionsAnswered}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium">{u.testQuestionsAnswered}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">({u.testsCompleted} tests)</span>
                  </td>
                  <td className="py-3 px-4">
                    {u.convertedPaywall ? (
                      <span
                        className="inline-flex items-center px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 rounded text-xs font-medium"
                        title={u.convertedPaywall.key}
                      >
                        {u.convertedPaywall.label}
                      </span>
                    ) : u.isPremium ? (
                      <span className="text-gray-500 dark:text-gray-400 text-xs">Unknown</span>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteUser(u.uid)}
                      disabled={deleting === u.uid}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      {deleting === u.uid ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {usersPageCount > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-300">
              <span>
                Showing {usersPageSafe * PAGE_SIZE + 1} to {Math.min((usersPageSafe + 1) * PAGE_SIZE, filteredUsers.length)} of{" "}
                {filteredUsers.length}
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setUsersPage((p) => Math.max(0, p - 1))} disabled={usersPageSafe === 0}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-xs">
                  Page {usersPageSafe + 1} of {usersPageCount}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUsersPage((p) => Math.min(usersPageCount - 1, p + 1))}
                  disabled={usersPageSafe >= usersPageCount - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
