"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Shared pieces for the /admin tabs: one fetch hook and the loading, error
// and header rows every tab uses, so the tabs only differ in their content.

// GETs an admin API with the signed-in user's token. reload(true) adds
// ?refresh=true, which every admin route treats as "skip the cache".
export function useAdminFetch<T>(url: string) {
  const { user } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const reload = useCallback(
    async (refresh = false) => {
      if (refresh) setRefreshing(true);
      try {
        const token = await user?.getIdToken();
        if (!token) throw new Error("Not authenticated");
        const sep = url.includes("?") ? "&" : "?";
        const res = await fetch(refresh ? `${url}${sep}refresh=true` : url, {
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
    },
    [url, user],
  );

  useEffect(() => {
    if (user) reload();
  }, [user, reload]);

  return { data, setData, error, loading, refreshing, reload };
}

export function TabLoading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
    </div>
  );
}

export function TabError({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 p-4">
      <p className="text-red-600 dark:text-red-400 font-medium">{message}</p>
    </div>
  );
}

export function TabHeader({ subtitle, onRefresh, refreshing, children }: {
  subtitle: React.ReactNode;
  onRefresh: () => void;
  refreshing: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      <div className="flex items-center gap-2">
        {children}
        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg px-3 py-1.5 shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>
    </div>
  );
}

export const fmtUpdated = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
