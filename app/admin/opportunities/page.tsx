"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { OpportunitiesView } from "@/components/admin/OpportunitiesView";
import type { OpportunitiesPayload } from "@/lib/server/opportunities";

// What to do next: where revenue and usage can grow, from
// /api/admin/opportunities (lib/server/opportunities). /admin/v2 is the
// scoreboard over time; this page is the per-exam, per-paywall, per-channel
// breakdown plus a list of numbers that can't be trusted yet.
export default function OpportunitiesPage() {
  const { user, loading: authLoading } = useAuth();
  const isAdmin = useAdmin();
  const router = useRouter();
  const [data, setData] = useState<OpportunitiesPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (refresh = false) => {
    if (refresh) setRefreshing(true);
    try {
      const token = await user?.getIdToken();
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`/api/admin/opportunities${refresh ? "?refresh=true" : ""}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || body.details || `API error ${res.status}`);
      setData(body);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) return void router.push("/login");
    if (!isAdmin) return void router.push("/");
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, isAdmin]);

  if (authLoading || loading) {
    return (
      <div className="flex-1 bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="flex-1 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 p-4">
            <p className="text-red-600 dark:text-red-400 font-medium">{error || "Failed to load"}</p>
          </div>
        </div>
      </div>
    );
  }

  return <OpportunitiesView data={data} onRefresh={() => load(true)} refreshing={refreshing} />;
}
