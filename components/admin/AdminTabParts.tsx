"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Shared pieces for the /admin tabs: one fetch hook and the loading, error
// and header rows every tab uses, so the tabs only differ in their content.

type CacheState = "HIT" | "STALE" | "MISS";

// How long to wait between polls while the server rebuilds a stale payload,
// and how many times: a rebuild is a full users scan, about 5 to 20 seconds.
const STALE_POLL_MS = 4000;
const STALE_POLL_TRIES = 8;

// GETs an admin API with the signed-in user's token. reload(true) adds
// ?refresh=true, which every admin route treats as "skip the cache".
//
// A response marked X-Cache: STALE (lib/server/adminCache) is the last
// payload, served at once while the server rebuilds; the hook shows it and
// polls until the fresh copy lands, swapping it in with no spinner. While
// that runs `updating` is true, so the header can say so.
export function useAdminFetch<T>(url: string) {
  const { user } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const hasData = useRef(false);

  const reload = useCallback(
    async (refresh = false): Promise<CacheState | null> => {
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
        hasData.current = true;
        setError(null);
        // A Refresh click rebuilt before answering, so nothing is on its way.
        if (refresh) setUpdating(false);
        return res.headers.get("X-Cache") as CacheState | null;
      } catch (err) {
        // A failed background poll keeps the numbers already on screen.
        if (!hasData.current || refresh) setError(err instanceof Error ? err.message : "Failed to load");
        return null;
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [url, user],
  );

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    (async () => {
      let cache = await reload();
      if (cancelled) return;
      setUpdating(cache === "STALE");
      for (let tries = 0; cache === "STALE" && tries < STALE_POLL_TRIES && !cancelled; tries++) {
        await new Promise<void>((resolve) => {
          timer = setTimeout(resolve, STALE_POLL_MS);
        });
        if (cancelled) return;
        cache = await reload();
      }
      if (!cancelled) setUpdating(false);
    })();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [user, reload]);

  return { data, setData, error, loading, refreshing, updating, reload };
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

export function TabHeader({ subtitle, onRefresh, refreshing, updating = false, children }: {
  subtitle: React.ReactNode;
  onRefresh: () => void;
  refreshing: boolean;
  /** The numbers shown are the last saved copy; fresh ones are on their way. */
  updating?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 mb-4 sm:mb-6">
      <p className="text-xs text-gray-500 dark:text-gray-400 min-w-0">
        {subtitle}
        {updating && (
          <span className="ml-2 inline-flex items-center gap-1 text-gray-400">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" aria-hidden />
            updating
          </span>
        )}
      </p>
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

// ─── Tables on a phone ──────────────────────────────────────────────────────
// Wide tables scroll sideways. The first column stays put so a row keeps its
// name while the numbers scroll: give every row ROW (a background for the
// sticky cell to inherit) and the first cell of each row STICKY_COL.
export const ROW = "bg-white dark:bg-gray-900";
export const STICKY_COL = "sticky left-0 z-[1] bg-inherit";

export function TableScroll({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`overflow-x-auto ${className}`}>{children}</div>;
}

// A white card with the same padding on every tab, tighter on a phone.
export const CARD = "bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-4 sm:p-5";
