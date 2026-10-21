"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { useAdminFetch, TabError, TabLoading } from "@/components/admin/AdminTabParts";
import { OpportunitiesView } from "@/components/admin/OpportunitiesView";
import type { OpportunitiesPayload } from "@/lib/server/opportunities";
import type { DailyBrief } from "@/lib/server/dailyBrief";
import type { TeachAdminPayload } from "@/lib/server/teachAdmin";

// The one admin page. Each tab loads its own API the first time it is opened
// and stays mounted after, so switching back is instant. The tab is in the
// URL (?tab=growth) so a link or a reload lands on it.
//
// Only the Today tab is in the page's bundle. The others, Growth above all
// (it carries the chart library), download when first opened, so the page
// shows its first numbers sooner on a phone.
const GrowthTab = dynamic(() => import("@/components/admin/GrowthTab").then((m) => m.GrowthTab), {
  ssr: false,
  loading: () => <TabLoading />,
});
const TeachAdminView = dynamic(() => import("@/components/admin/TeachAdminView").then((m) => m.TeachAdminView), {
  ssr: false,
  loading: () => <TabLoading />,
});
const UsersTab = dynamic(() => import("@/components/admin/UsersTab").then((m) => m.UsersTab), {
  ssr: false,
  loading: () => <TabLoading />,
});

const TABS = [
  { id: "today", label: "Today" },
  { id: "growth", label: "Growth" },
  { id: "teachers", label: "Teachers" },
  { id: "users", label: "Users" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const isTab = (v: string | null): v is TabId => TABS.some((t) => t.id === v);

// What to do next: the daily update, per-exam, per-paywall and per-channel
// numbers, from /api/admin/opportunities (lib/server/opportunities).
function TodayTab() {
  const { user } = useAuth();
  const { data, setData, error, loading, refreshing, updating, reload } =
    useAdminFetch<OpportunitiesPayload & { brief?: DailyBrief | null }>("/api/admin/opportunities");
  const [writingBrief, setWritingBrief] = useState(false);
  const [briefError, setBriefError] = useState<string | null>(null);

  const writeBrief = async () => {
    setWritingBrief(true);
    setBriefError(null);
    try {
      const token = await user?.getIdToken();
      if (!token) throw new Error("Not authenticated");
      const res = await fetch("/api/admin/daily-brief", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `API error ${res.status}`);
      setData((d) => (d ? { ...d, brief: body } : d));
    } catch (err) {
      setBriefError(err instanceof Error ? err.message : "Could not write the update");
    } finally {
      setWritingBrief(false);
    }
  };

  if (loading) return <TabLoading />;
  if (error || !data) return <TabError message={error || "Failed to load"} />;
  return (
    <OpportunitiesView
      data={data}
      onRefresh={() => reload(true)}
      refreshing={refreshing}
      updating={updating}
      onWriteBrief={writeBrief}
      writingBrief={writingBrief}
      briefError={briefError}
    />
  );
}

// The instructor channel, from /api/admin/teach (lib/server/teachAdmin).
function TeachersTab() {
  const { data, error, loading, refreshing, updating, reload } = useAdminFetch<TeachAdminPayload>("/api/admin/teach");
  if (loading) return <TabLoading />;
  if (error || !data) return <TabError message={error || "Failed to load"} />;
  return <TeachAdminView data={data} onRefresh={() => reload(true)} refreshing={refreshing} updating={updating} />;
}

function AdminTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const param = useSearchParams().get("tab");
  const tab: TabId = isTab(param) ? param : "today";
  const [opened, setOpened] = useState<Set<TabId>>(() => new Set([tab]));

  useEffect(() => {
    setOpened((s) => (s.has(tab) ? s : new Set(s).add(tab)));
  }, [tab]);

  const select = (id: TabId) => {
    router.replace(id === "today" ? pathname : `${pathname}?tab=${id}`, { scroll: false });
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 pb-6 max-w-6xl">
        {/* The tab bar stays at the top of the screen, so on a phone a tab is
            always one tap away however far down a table the reader is. The
            title only fits beside it from sm up. */}
        <div className="sticky top-0 z-20 -mx-4 px-4 py-3 sm:py-4 mb-3 sm:mb-2 bg-gray-50/90 dark:bg-gray-950/90 backdrop-blur flex items-center justify-between gap-3">
          <h1 className="sr-only sm:not-sr-only text-xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight">TigerTest admin</h1>
          <div role="tablist" className="flex items-center gap-1 w-full sm:w-auto bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 rounded-lg p-1 shadow-sm">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => select(t.id)}
                className={`flex-1 sm:flex-none text-sm font-medium rounded-md px-3 py-2 sm:py-1.5 whitespace-nowrap transition-colors ${
                  tab === t.id
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {TABS.filter((t) => opened.has(t.id) || t.id === tab).map((t) => (
          <div key={t.id} role="tabpanel" hidden={t.id !== tab}>
            {t.id === "today" && <TodayTab />}
            {t.id === "growth" && <GrowthTab />}
            {t.id === "teachers" && <TeachersTab />}
            {t.id === "users" && <UsersTab />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const isAdmin = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (!user) return void router.push("/login");
    if (!isAdmin) router.push("/");
  }, [user, authLoading, isAdmin, router]);

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="flex-1 bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
      </div>
    );
  }

  return (
    <Suspense fallback={<TabLoading />}>
      <AdminTabs />
    </Suspense>
  );
}
