"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { auth } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { states } from "@/data/states";
import { ArrowLeft, Users, MapPin, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UserData {
  uid: string;
  email: string;
  selectedState: string | null;
  lastUpdated: string | null;
  createdAt: string | null;
  testsCompleted: number;
  trainingProgress: number;
}

interface Stats {
  totalUsers: number;
  usersWithState: number;
  byState: Record<string, number>;
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const isAdmin = useAdmin();
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) {
        setError("Not authenticated");
        return;
      }

      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (response.status === 403) {
        setError("Access denied. Admin privileges required.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users);
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Button onClick={fetchUsers} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
                  <p className="text-sm text-gray-500">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <MapPin className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{stats?.usersWithState || 0}</p>
                  <p className="text-sm text-gray-500">Selected a State</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <MapPin className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{Object.keys(stats?.byState || {}).length}</p>
                  <p className="text-sm text-gray-500">Unique States</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-800 rounded-full text-sm"
                  >
                    <span className="font-medium">{name}</span>
                    <span className="bg-orange-200 px-2 py-0.5 rounded-full text-xs font-bold">
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
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">State</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Registered</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Training</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Tests</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userData) => (
                    <tr key={userData.uid} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium">{userData.email}</div>
                        <div className="text-xs text-gray-400 font-mono">{userData.uid.slice(0, 12)}...</div>
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
                        {formatDate(userData.createdAt)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium">{userData.trainingProgress}</span>
                        <span className="text-gray-400">/200</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium">{userData.testsCompleted}</span>
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
