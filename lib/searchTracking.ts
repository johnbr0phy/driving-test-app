import { isInternalBrowser } from "@/lib/internal";
import type { Region } from "@/lib/region";

// What people type into a test search (the homepage box and the header's
// test chip) goes to /api/analytics/search, so searches that find nothing
// become the list of tests to build. Internal browsers never send.

export type SearchEvent = { kind: "query"; q: string; results: number } | { kind: "pick"; q: string; pick: string };

export function trackSearch(event: SearchEvent, region: Region, email?: string | null) {
  if (isInternalBrowser(email)) return;
  const payload = JSON.stringify({ ...event, region });
  try {
    if (navigator.sendBeacon?.("/api/analytics/search", new Blob([payload], { type: "application/json" }))) return;
  } catch {
    // Fall through to fetch.
  }
  fetch("/api/analytics/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true }).catch(() => {});
}
