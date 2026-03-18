"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { states } from "@/data/states";
import { ArrowLeft, Users, RefreshCw, Trash2, UserPlus, Activity, TrendingUp, TrendingDown, Minus, Share2 } from "lucide-react";
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
    }
  }, [user, authLoading, isAdmin, router]);

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

  // Sort states by count for the summary
  const sortedStateCounts = stats
    ? Object.entries(stats.byState)
        .sort(([, a], [, b]) => b - a)
        .map(([code, count]) => ({ code, name: getStateName(code), count }))
    : [];

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
            <CardContent className="p-6">
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
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
            <CardContent className="p-6">
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
            <CardContent className="p-6">
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
            <CardContent className="p-6">
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
            <CardContent className="p-6">
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
                {/* Active Users / Cumulative — simple area chart */}
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

                /* Retention — bar chart with % */
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

                /* By State — multi-line chart */
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

                /* New vs Returning — stacked area chart */
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

        {/* Users by State Summary */}
        {sortedStateCounts.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Users by State</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {sortedStateCounts.map(({ code, name, count }) => (
                  <div
                    key={code}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-light text-brand-dark rounded-full text-sm"
                  >
                    <span className="font-medium">{name}</span>
                    <span className="bg-brand-border-light px-2 py-0.5 rounded-full text-xs font-bold">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* User List */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({users.length})</CardTitle>
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
                  {users.map((userData) => (
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
