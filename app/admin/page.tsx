"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { states } from "@/data/states";
import { ArrowLeft, Users, RefreshCw, Trash2, UserPlus, Activity, TrendingUp, TrendingDown, Minus, Share2, ChevronLeft, ChevronRight, Search, DollarSign, GraduationCap, Lock } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface UserData {
  uid: string;
  email: string;
  selectedState: string | null;
  lastUpdated: string | null;
  createdAt: string | null;
  testsCompleted: number;
  trainingQuestionsAnswered: number;
  testQuestionsAnswered: number;
  isPremium: boolean;
  convertedPaywall: { key: string; label: string; location: string } | null;
}

interface ConversionStats {
  paidCount: number;
  baselineUsers: number;
  conversionRate: number;
  medianDaysToPurchase: number | null;
  purchasesWithKnownSignup: number;
}

interface Stats {
  totalUsers: number;
  usersWithState: number;
  byState: Record<string, number>;
  activeUsers7d: number;
  activeUsersPrev7d: number;
  newUsers7d: number;
  payingUsers: number;
  totalQuestionsAnswered: number;
  totalShareClicks: number;
  shareClicksDaily: Record<string, number>;
  conversion?: ConversionStats;
}

interface PassRateByState {
  code: string;
  attempts: number;
  passed: number;
  passRate: number;
}

type SeriesPoint = { date: string; displayDate: string; count: number };
type TimeSeries = { day: SeriesPoint[]; week: SeriesPoint[]; month: SeriesPoint[] };
const EMPTY_SERIES: TimeSeries = { day: [], week: [], month: [] };

interface PaywallStat {
  key: string;
  label: string;
  location: string;
  totalHits: number;
  uniqueUsers: number;
  converted: number;
  conversionRate: number;
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const isAdmin = useAdmin();
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [dailyActiveUsers, setDailyActiveUsers] = useState<{ date: string; count: number; displayDate: string }[]>([]);
  const [newUsersSeries, setNewUsersSeries] = useState<TimeSeries>(EMPTY_SERIES);
  const [paywallViewsSeries, setPaywallViewsSeries] = useState<TimeSeries>(EMPTY_SERIES);
  const [questionsAnsweredSeries, setQuestionsAnsweredSeries] = useState<TimeSeries>(EMPTY_SERIES);
  const [graphMetric, setGraphMetric] = useState<'active' | 'newUsers' | 'paywall' | 'questions'>('active');
  const [graphGranularity, setGraphGranularity] = useState<'day' | 'week' | 'month'>('day');
  const [usersPage, setUsersPage] = useState(0);
  const [passRateByState, setPassRateByState] = useState<PassRateByState[]>([]);
  const [paywallStats, setPaywallStats] = useState<PaywallStat[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [questionsBackfillPending, setQuestionsBackfillPending] = useState(false);
  const backfillTriggered = useRef(false);
  const PAGE_SIZE = 20;

  const fetchUsers = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      const idToken = await user?.getIdToken();
      if (!idToken) {
        setError("Not authenticated");
        return;
      }

      const url = forceRefresh ? "/api/admin/users?refresh=true" : "/api/admin/users";
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || `API error: ${response.status}`);
      }

      const data = await response.json();

      // API returns pre-computed stats, chart data, and user list
      setUsers(data.users);
      setStats(data.stats);
      setDailyActiveUsers(data.dailyActiveUsers);
      setNewUsersSeries(data.newUsersSeries || EMPTY_SERIES);
      setPaywallViewsSeries(data.paywallViewsSeries || EMPTY_SERIES);
      setQuestionsAnsweredSeries(data.questionsAnsweredSeries || EMPTY_SERIES);
      setQuestionsBackfillPending(data.questionsBackfillPending === true);
      setPassRateByState(data.passRateByState || []);
      setPaywallStats(data.paywallStats || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (uid: string) => {
    if (!confirm(`Delete user ${uid}? This cannot be undone.`)) {
      return;
    }

    setDeleting(uid);
    try {
      await deleteDoc(doc(db, "users", uid));
      setUsers(users.filter(u => u.uid !== uid));
      // Update stats
      const deletedUser = users.find(u => u.uid === uid);
      if (stats && deletedUser) {
        const newByState = { ...stats.byState };
        if (deletedUser.selectedState && newByState[deletedUser.selectedState]) {
          newByState[deletedUser.selectedState]--;
          if (newByState[deletedUser.selectedState] === 0) {
            delete newByState[deletedUser.selectedState];
          }
        }
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const wasActive = deletedUser.lastUpdated && new Date(deletedUser.lastUpdated) >= sevenDaysAgo;
        const wasNew = deletedUser.createdAt && new Date(deletedUser.createdAt) >= sevenDaysAgo;

        setStats({
          totalUsers: stats.totalUsers - 1,
          usersWithState: deletedUser.selectedState ? stats.usersWithState - 1 : stats.usersWithState,
          byState: newByState,
          activeUsers7d: wasActive ? stats.activeUsers7d - 1 : stats.activeUsers7d,
          activeUsersPrev7d: stats.activeUsersPrev7d,
          newUsers7d: wasNew ? stats.newUsers7d - 1 : stats.newUsers7d,
          payingUsers: stats.payingUsers - (deletedUser.isPremium ? 1 : 0),
          totalQuestionsAnswered: Math.max(
            0,
            stats.totalQuestionsAnswered - deletedUser.trainingQuestionsAnswered - deletedUser.testQuestionsAnswered,
          ),
          totalShareClicks: stats.totalShareClicks,
          shareClicksDaily: stats.shareClicksDaily,
        });
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    // Redirect non-admins to dashboard
    if (!authLoading && user && !isAdmin) {
      router.push("/dashboard");
      return;
    }

    if (user && isAdmin) {
      fetchUsers();
    }
  }, [user, authLoading, isAdmin, router]);

  useEffect(() => {
    setUsersPage(0);
  }, [userSearch, stateFilter, premiumOnly]);

  // One-time history seed for the persistent questions-answered aggregate:
  // when the API reports the backfill hasn't completed, kick it off (it's
  // idempotent server-side) and refresh the chart once it finishes.
  useEffect(() => {
    if (!questionsBackfillPending || backfillTriggered.current || !user) return;
    backfillTriggered.current = true;
    (async () => {
      try {
        const idToken = await user.getIdToken();
        const res = await fetch("/api/admin/backfill-questions", {
          method: "POST",
          headers: { Authorization: `Bearer ${idToken}` },
        });
        if (res.ok) fetchUsers(true);
      } catch (err) {
        console.error("Questions backfill failed:", err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsBackfillPending, user]);

  const getStateName = (code: string | null): string => {
    if (!code) return "Not selected";
    return states.find(s => s.code === code)?.name || code;
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredUsers = users.filter((u) => {
    if (premiumOnly && !u.isPremium) return false;
    if (stateFilter !== "all" && u.selectedState !== stateFilter) return false;
    if (userSearch.trim()) {
      const q = userSearch.trim().toLowerCase();
      const haystack = `${u.email || ""} ${u.uid}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const usersPageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const usersPageSafe = Math.min(usersPage, usersPageCount - 1);
  const visibleUsers = filteredUsers.slice(
    usersPageSafe * PAGE_SIZE,
    usersPageSafe * PAGE_SIZE + PAGE_SIZE,
  );

  const availableStateCodes = Array.from(
    new Set(users.map((u) => u.selectedState).filter((s): s is string => Boolean(s))),
  ).sort();

  if (authLoading || loading) {
    return (
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-600 font-medium">{error}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-brand" />
                <div>
                  <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-xs text-gray-400">
                    {stats?.payingUsers || 0} paying
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Activity className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{stats?.activeUsers7d || 0}</p>
                  <p className="text-sm text-gray-500">Active (7 days)</p>
                  <p className="text-xs text-gray-400">
                    {stats?.totalUsers ? Math.round((stats.activeUsers7d / stats.totalUsers) * 100) : 0}% of users
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <UserPlus className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{stats?.newUsers7d || 0}</p>
                  <p className="text-sm text-gray-500">New Users (7d)</p>
                  <p className="text-xs text-gray-400">
                    {stats?.totalUsers ? ((stats.newUsers7d / stats.totalUsers) * 100).toFixed(1) : 0}% of total
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {(() => {
                  const prev = stats?.activeUsersPrev7d || 0;
                  const curr = stats?.activeUsers7d || 0;
                  const pct = prev > 0 ? Math.round(((curr - prev) / prev) * 100) : (curr > 0 ? 100 : 0);
                  const isUp = pct > 0;
                  const isDown = pct < 0;
                  const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;
                  const color = isUp ? 'text-green-500' : isDown ? 'text-red-500' : 'text-gray-400';
                  return (
                    <>
                      <Icon className={`h-8 w-8 ${color}`} />
                      <div>
                        <p className={`text-2xl font-bold ${color}`}>
                          {isUp ? '+' : ''}{pct}%
                        </p>
                        <p className="text-sm text-gray-500">7d Trend</p>
                        <p className="text-xs text-gray-400">
                          {prev} → {curr} active
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <DollarSign className="h-8 w-8 text-emerald-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {stats?.conversion
                      ? `${(stats.conversion.conversionRate * 100).toFixed(1)}%`
                      : "—"}
                  </p>
                  <p className="text-sm text-gray-500">Conversion</p>
                  <p className="text-xs text-gray-400">
                    {stats?.conversion?.medianDaysToPurchase != null
                      ? `~${stats.conversion.medianDaysToPurchase.toFixed(1)}d to upgrade`
                      : "no purchases yet"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Share2 className="h-8 w-8 text-pink-500" />
                <div>
                  <p className="text-2xl font-bold">{stats?.totalShareClicks || 0}</p>
                  <p className="text-sm text-gray-500">Share Clicks</p>
                  <p className="text-xs text-gray-400">
                    {(() => {
                      const today = new Date().toISOString().split('T')[0];
                      const todayCount = stats?.shareClicksDaily?.[today] || 0;
                      return todayCount > 0 ? `${todayCount} today` : 'none today';
                    })()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Switchable Graph */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle>
                  {graphMetric === 'active' && 'Active Users (30 Days)'}
                  {graphMetric === 'newUsers' && `New Users (${({ day: 'Daily', week: 'Weekly', month: 'Monthly' } as const)[graphGranularity]})`}
                  {graphMetric === 'paywall' && `Paywall Views (${({ day: 'Daily', week: 'Weekly', month: 'Monthly' } as const)[graphGranularity]})`}
                  {graphMetric === 'questions' && (
                    <>
                      {`Questions Answered (${({ day: 'Daily', week: 'Weekly', month: 'Monthly' } as const)[graphGranularity]})`}
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        {(stats?.totalQuestionsAnswered ?? 0).toLocaleString()} all-time
                      </span>
                    </>
                  )}
                </CardTitle>
                <div className="flex flex-wrap gap-1">
                  {([
                    { key: 'active', label: 'Active Users' },
                    { key: 'newUsers', label: 'New Users' },
                    { key: 'paywall', label: 'Paywall Views' },
                    { key: 'questions', label: 'Questions Answered' },
                  ] as const).map(({ key, label }) => (
                    <Button
                      key={key}
                      variant={graphMetric === key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setGraphMetric(key)}
                      className="text-xs"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
              {/* Day / Week / Month granularity — only for time-bucketed metrics */}
              {graphMetric !== 'active' && (
                <div className="flex gap-1 sm:justify-end">
                  {([
                    { key: 'day', label: 'Day' },
                    { key: 'week', label: 'Week' },
                    { key: 'month', label: 'Month' },
                  ] as const).map(({ key, label }) => (
                    <Button
                      key={key}
                      variant={graphGranularity === key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setGraphGranularity(key)}
                      className="text-xs"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {/* Active Users - area chart */}
                {graphMetric === 'active' ? (
                  <AreaChart
                    data={dailyActiveUsers}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="displayDate" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} interval="preserveStartEnd" tickMargin={8} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                      formatter={(value) => [value ?? 0, 'Active Users']}
                    />
                    <Area type="monotone" dataKey="count" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} strokeWidth={2} />
                  </AreaChart>

                /* New Users / Paywall Views / Questions Answered - bar chart, day / week / month */
                ) : (
                  <BarChart
                    data={({ newUsers: newUsersSeries, paywall: paywallViewsSeries, questions: questionsAnsweredSeries } as const)[graphMetric][graphGranularity]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="displayDate" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} interval="preserveStartEnd" tickMargin={8} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                      formatter={(value) => [value ?? 0, ({ newUsers: 'New Users', paywall: 'Paywall Views', questions: 'Questions Answered' } as const)[graphMetric]]}
                    />
                    <Bar dataKey="count" fill={({ newUsers: '#22c55e', paywall: '#a855f7', questions: '#3b82f6' } as const)[graphMetric]} radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
            {graphMetric === 'questions' && (
              <p className="mt-2 text-xs text-gray-400">
                {questionsBackfillPending
                  ? 'Backfilling history from stored answer data — showing the 100 most recently active users until it completes (usually under a minute).'
                  : 'Counts every training + test answer across all users (guests included), recorded permanently as questions are answered.'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Pass Rate by State */}
        <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-emerald-500" />
                Pass Rate by State
                <span className="text-xs font-normal text-gray-400 ml-1">
                  (top 100 active users)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {passRateByState.length === 0 ? (
                <p className="text-sm text-gray-500">No completed tests yet.</p>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {passRateByState.slice(0, 12).map((s) => {
                    const pct = s.passRate * 100;
                    const color = pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-red-500";
                    return (
                      <div key={s.code}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium">
                            {getStateName(s.code)}{" "}
                            <span className="text-gray-400 text-xs">({s.code})</span>
                          </span>
                          <span className="text-gray-600 tabular-nums">
                            {pct.toFixed(0)}%{" "}
                            <span className="text-gray-400 text-xs">({s.passed}/{s.attempts})</span>
                          </span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded overflow-hidden">
                          <div className={`${color} h-full`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
        </Card>

        {/* Paywall Performance */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-amber-500" />
              Paywall Performance
              {paywallStats.length > 0 && (
                <span className="text-sm font-normal text-gray-500">
                  ({paywallStats.reduce((sum, p) => sum + p.totalHits, 0).toLocaleString()} total hits)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paywallStats.length === 0 ? (
              <p className="text-sm text-gray-500">No paywall hits recorded yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Paywall</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Location</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">Hits</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">Users</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">Premium</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paywallStats.map((p) => {
                      const pct = p.conversionRate * 100;
                      const color = pct >= 15 ? "bg-emerald-500" : pct >= 5 ? "bg-amber-500" : "bg-red-500";
                      return (
                        <tr key={p.key} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{p.label}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                              {p.location}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right tabular-nums">{p.totalHits.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right tabular-nums">{p.uniqueUsers.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right tabular-nums">{p.converted.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 bg-gray-100 rounded overflow-hidden">
                                <div className={`${color} h-full`} style={{ width: `${Math.min(100, pct)}%` }} />
                              </div>
                              <span className="text-gray-600 tabular-nums text-xs w-10 text-right">
                                {p.uniqueUsers > 0 ? `${pct.toFixed(1)}%` : "—"}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <p className="mt-3 text-xs text-gray-400">
                  Conversion = signed-in users who hit a paywall and later became premium. Anonymous hits count toward
                  &ldquo;Hits&rdquo; but not &ldquo;Users&rdquo;. Attribution starts accumulating from first deploy.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle>
                All Users{" "}
                <span className="text-sm font-normal text-gray-500">
                  ({filteredUsers.length}
                  {filteredUsers.length !== users.length ? ` of ${users.length}` : ""})
                </span>
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search email or UID"
                    className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand w-56"
                  />
                </div>
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-brand"
                >
                  <option value="all">All states</option>
                  {availableStateCodes.map((code) => (
                    <option key={code} value={code}>
                      {getStateName(code)} ({code})
                    </option>
                  ))}
                </select>
                <label className="inline-flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={premiumOnly}
                    onChange={(e) => setPremiumOnly(e.target.checked)}
                    className="rounded"
                  />
                  Premium only
                </label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">State</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Last Active</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Training Qs</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Test Qs</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Converted Via</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {visibleUsers.map((userData) => (
                    <tr key={userData.uid} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-gray-600 font-mono">{userData.uid}</span>
                          {userData.isPremium && (
                            <Image src="/tiger_face_01.png" alt="Premium user" width={20} height={20} title="Premium user" className="w-5 h-5" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {userData.selectedState ? (
                          <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            {getStateName(userData.selectedState)} ({userData.selectedState})
                          </span>
                        ) : (
                          <span className="text-gray-400">Not selected</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {userData.lastUpdated ? formatDate(userData.lastUpdated) : <span className="text-gray-400">Never</span>}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium">{userData.trainingQuestionsAnswered}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium">{userData.testQuestionsAnswered}</span>
                        <span className="text-gray-400 text-xs ml-1">({userData.testsCompleted} tests)</span>
                      </td>
                      <td className="py-3 px-4">
                        {userData.convertedPaywall ? (
                          <span
                            className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-medium"
                            title={userData.convertedPaywall.key}
                          >
                            {userData.convertedPaywall.label}
                          </span>
                        ) : userData.isPremium ? (
                          <span className="text-gray-400 text-xs">Unknown</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteUser(userData.uid)}
                          disabled={deleting === userData.uid}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          {deleting === userData.uid ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {usersPageCount > 1 && (
                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                  <span>
                    Showing {usersPageSafe * PAGE_SIZE + 1}–
                    {Math.min((usersPageSafe + 1) * PAGE_SIZE, filteredUsers.length)} of {filteredUsers.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUsersPage((p) => Math.max(0, p - 1))}
                      disabled={usersPageSafe === 0}
                    >
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
