"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { states } from "@/data/states";
import { ArrowLeft, Users, RefreshCw, Trash2, UserPlus, Activity, TrendingUp, TrendingDown, Minus, Share2, CreditCard, ChevronLeft, ChevronRight, Search, DollarSign, GraduationCap, Heart, Lock } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
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

interface ParentPayFunnel {
  requestsSent: number;
  clicked: number;
  pending: number;
  paid: number;
  expired: number;
  cancelled: number;
  conversionRate: number;
  medianHoursToPay: number | null;
  last30dRequests: number;
  last30dPaid: number;
}

interface PaymentRow {
  id: string;
  userId: string | null;
  email: string | null;
  amount: number | null;
  currency: string | null;
  status: string | null;
  flow: 'parent_pay' | 'self';
  parentPayToken: string | null;
  stripeCustomerId: string | null;
  stripePaymentIntentId: string | null;
  createdAt: string | null;
}

interface PaymentsSummary {
  total: number;
  parentPay: number;
  self: number;
  last7d: { total: number; parentPay: number; self: number };
}

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
  const [dailyCumulativeUsers, setDailyCumulativeUsers] = useState<{ date: string; count: number; displayDate: string }[]>([]);
  const [weeklyRetention, setWeeklyRetention] = useState<{ displayDate: string; count: number }[]>([]);
  const [dailyByState, setDailyByState] = useState<Record<string, unknown>[]>([]);
  const [dailyNewVsReturning, setDailyNewVsReturning] = useState<{ displayDate: string; new: number; returning: number }[]>([]);
  const [top5States, setTop5States] = useState<string[]>([]);
  const [graphMetric, setGraphMetric] = useState<'active' | 'retention' | 'cumulative' | 'byState' | 'newVsReturning'>('active');
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [paymentsSummary, setPaymentsSummary] = useState<PaymentsSummary | null>(null);
  const [parentPayFunnel, setParentPayFunnel] = useState<ParentPayFunnel | null>(null);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [paymentsError, setPaymentsError] = useState<string | null>(null);
  const [paymentsPage, setPaymentsPage] = useState(0);
  const [usersPage, setUsersPage] = useState(0);
  const [passRateByState, setPassRateByState] = useState<PassRateByState[]>([]);
  const [paywallStats, setPaywallStats] = useState<PaywallStat[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [premiumOnly, setPremiumOnly] = useState(false);
  const PAGE_SIZE = 20;

  const fetchPayments = async () => {
    setPaymentsLoading(true);
    setPaymentsError(null);
    try {
      const idToken = await user?.getIdToken();
      if (!idToken) {
        setPaymentsError("Not authenticated");
        return;
      }
      const response = await fetch("/api/admin/payments", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || `API error: ${response.status}`);
      }
      const data = await response.json();
      setPayments(data.payments || []);
      setPaymentsSummary(data.summary || null);
      setParentPayFunnel(data.parentPayFunnel || null);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setPaymentsError(err instanceof Error ? err.message : "Failed to load payments");
    } finally {
      setPaymentsLoading(false);
    }
  };

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
      setDailyCumulativeUsers(data.dailyCumulativeUsers || []);
      setWeeklyRetention(data.weeklyRetention || []);
      setDailyByState(data.dailyByState || []);
      setDailyNewVsReturning(data.dailyNewVsReturning || []);
      setTop5States(data.top5States || []);
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
      fetchPayments();
    }
  }, [user, authLoading, isAdmin, router]);

  useEffect(() => {
    setUsersPage(0);
  }, [userSearch, stateFilter, premiumOnly]);

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

  const paymentsPageCount = Math.max(1, Math.ceil(payments.length / PAGE_SIZE));
  const usersPageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const paymentsPageSafe = Math.min(paymentsPage, paymentsPageCount - 1);
  const usersPageSafe = Math.min(usersPage, usersPageCount - 1);
  const visiblePayments = payments.slice(
    paymentsPageSafe * PAGE_SIZE,
    paymentsPageSafe * PAGE_SIZE + PAGE_SIZE,
  );
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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Button onClick={() => fetchUsers(true)} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <CardTitle>
                {graphMetric === 'active' && 'Active Users (30 Days)'}
                {graphMetric === 'retention' && 'Weekly Retention'}
                {graphMetric === 'cumulative' && 'Total Users (30 Days)'}
                {graphMetric === 'byState' && 'Active by State (30 Days)'}
                {graphMetric === 'newVsReturning' && 'New vs Returning (30 Days)'}
              </CardTitle>
              <div className="flex flex-wrap gap-1">
                {([
                  { key: 'active', label: 'Active' },
                  { key: 'retention', label: 'Retention' },
                  { key: 'cumulative', label: 'Total' },
                  { key: 'byState', label: 'By State' },
                  { key: 'newVsReturning', label: 'New vs Ret.' },
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
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {/* Active Users / Cumulative - simple area chart */}
                {(graphMetric === 'active' || graphMetric === 'cumulative') ? (
                  <AreaChart
                    data={graphMetric === 'active' ? dailyActiveUsers : dailyCumulativeUsers}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="displayDate" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} interval="preserveStartEnd" tickMargin={8} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                      formatter={(value) => [value ?? 0, graphMetric === 'active' ? 'Active Users' : 'Total Users']}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke={graphMetric === 'active' ? '#22c55e' : '#f97316'}
                      fill={graphMetric === 'active' ? '#22c55e' : '#f97316'}
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>

                /* Retention - bar chart with % */
                ) : graphMetric === 'retention' ? (
                  <BarChart
                    data={weeklyRetention}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="displayDate" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} tickMargin={8} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} allowDecimals={false} unit="%" domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                      formatter={(value) => [`${value}%`, 'Retained']}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>

                /* By State - multi-line chart */
                ) : graphMetric === 'byState' ? (
                  <LineChart
                    data={dailyByState}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="displayDate" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} interval="preserveStartEnd" tickMargin={8} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                    />
                    <Legend />
                    {top5States.map((stateCode, i) => {
                      const colors = ['#22c55e', '#3b82f6', '#f97316', '#a855f7', '#ef4444'];
                      return (
                        <Line
                          key={stateCode}
                          type="monotone"
                          dataKey={stateCode}
                          name={getStateName(stateCode)}
                          stroke={colors[i]}
                          strokeWidth={2}
                          dot={false}
                        />
                      );
                    })}
                  </LineChart>

                /* New vs Returning - stacked area chart */
                ) : (
                  <AreaChart
                    data={dailyNewVsReturning}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="displayDate" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} interval="preserveStartEnd" tickMargin={8} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="returning" name="Returning" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                    <Area type="monotone" dataKey="new" name="New" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} strokeWidth={2} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Parent-Pay Funnel + Pass Rate by State */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500" />
                Parent-Pay Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              {parentPayFunnel ? (
                parentPayFunnel.requestsSent === 0 ? (
                  <p className="text-sm text-gray-500">No parent-pay requests yet.</p>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="rounded-lg bg-blue-50 p-3 text-center">
                        <p className="text-2xl font-bold text-blue-700">{parentPayFunnel.requestsSent}</p>
                        <p className="text-xs text-blue-700/70">Links Created</p>
                      </div>
                      <div className="rounded-lg bg-indigo-50 p-3 text-center">
                        <p className="text-2xl font-bold text-indigo-700">{parentPayFunnel.clicked}</p>
                        <p className="text-xs text-indigo-700/70">Clicked</p>
                      </div>
                      <div className="rounded-lg bg-amber-50 p-3 text-center">
                        <p className="text-2xl font-bold text-amber-700">{parentPayFunnel.pending}</p>
                        <p className="text-xs text-amber-700/70">Pending</p>
                      </div>
                      <div className="rounded-lg bg-emerald-50 p-3 text-center">
                        <p className="text-2xl font-bold text-emerald-700">{parentPayFunnel.paid}</p>
                        <p className="text-xs text-emerald-700/70">Parents Paid</p>
                      </div>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded overflow-hidden flex">
                      <div
                        className="bg-emerald-500 h-full"
                        style={{ width: `${parentPayFunnel.conversionRate * 100}%` }}
                        title={`${(parentPayFunnel.conversionRate * 100).toFixed(1)}% converted`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Conversion rate</p>
                        <p className="font-semibold">
                          {(parentPayFunnel.conversionRate * 100).toFixed(1)}%
                          <span className="text-gray-400 font-normal"> of links</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Click-through rate</p>
                        <p className="font-semibold">
                          {parentPayFunnel.requestsSent > 0
                            ? `${((parentPayFunnel.clicked / parentPayFunnel.requestsSent) * 100).toFixed(1)}%`
                            : "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Clicked → paid</p>
                        <p className="font-semibold">
                          {parentPayFunnel.clicked > 0
                            ? `${((parentPayFunnel.paid / parentPayFunnel.clicked) * 100).toFixed(1)}%`
                            : "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Median time to pay</p>
                        <p className="font-semibold">
                          {parentPayFunnel.medianHoursToPay != null
                            ? parentPayFunnel.medianHoursToPay < 24
                              ? `${parentPayFunnel.medianHoursToPay.toFixed(1)}h`
                              : `${(parentPayFunnel.medianHoursToPay / 24).toFixed(1)}d`
                            : "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Expired</p>
                        <p className="font-semibold">{parentPayFunnel.expired}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Last 30 days</p>
                        <p className="font-semibold">
                          {parentPayFunnel.last30dPaid} / {parentPayFunnel.last30dRequests} paid
                        </p>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <p className="text-sm text-gray-500">Loading…</p>
              )}
            </CardContent>
          </Card>

          <Card>
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
        </div>

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

        {/* Payments */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-brand" />
                Recent Payments
                {paymentsSummary && (
                  <span className="text-sm font-normal text-gray-500">
                    ({paymentsSummary.last7d.total} in last 7d
                    {paymentsSummary.last7d.total > 0 && (
                      <>
                        : {paymentsSummary.last7d.parentPay} parent-pay,{" "}
                        {paymentsSummary.last7d.self} self
                      </>
                    )}
                    )
                  </span>
                )}
              </CardTitle>
              <Button onClick={fetchPayments} variant="outline" size="sm" disabled={paymentsLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${paymentsLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {paymentsError ? (
              <p className="text-sm text-red-600">{paymentsError}</p>
            ) : payments.length === 0 ? (
              <p className="text-sm text-gray-500">
                {paymentsLoading ? "Loading…" : "No payments found."}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">When</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Flow</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">User</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Stripe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visiblePayments.map((p) => (
                      <tr key={p.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-600">
                          {p.createdAt ? formatDate(p.createdAt) : <span className="text-gray-400">Unknown</span>}
                        </td>
                        <td className="py-3 px-4">
                          {p.flow === "parent_pay" ? (
                            <span className="inline-flex items-center px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs font-medium">
                              Parent-pay
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                              Self
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {p.amount != null
                            ? `$${(p.amount / 100).toFixed(2)}${p.currency ? ` ${p.currency.toUpperCase()}` : ""}`
                            : <span className="text-gray-400">—</span>}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {p.email || <span className="text-gray-400">—</span>}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-xs text-gray-600 font-mono">{p.userId || "—"}</span>
                        </td>
                        <td className="py-3 px-4">
                          {p.stripePaymentIntentId ? (
                            <a
                              href={`https://dashboard.stripe.com/payments/${p.stripePaymentIntentId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline font-mono"
                            >
                              {p.stripePaymentIntentId.slice(0, 14)}…
                            </a>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {paymentsPageCount > 1 && (
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                    <span>
                      Showing {paymentsPageSafe * PAGE_SIZE + 1}–
                      {Math.min((paymentsPageSafe + 1) * PAGE_SIZE, payments.length)} of {payments.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPaymentsPage((p) => Math.max(0, p - 1))}
                        disabled={paymentsPageSafe === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-xs">
                        Page {paymentsPageSafe + 1} of {paymentsPageCount}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPaymentsPage((p) => Math.min(paymentsPageCount - 1, p + 1))}
                        disabled={paymentsPageSafe >= paymentsPageCount - 1}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
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
