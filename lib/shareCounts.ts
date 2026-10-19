// analytics/shares per-day counts. Until Oct 2026 the share route wrote each
// day as a literal top-level field named "daily.YYYY-MM-DD" (a dotted key in
// set() with merge is not a path); since then it writes the nested daily map.
// Both shapes are summed so the history is kept.
export function shareDailyCounts(data: Record<string, unknown> | null | undefined): Record<string, number> {
  const out: Record<string, number> = {};
  if (!data) return out;
  for (const [key, value] of Object.entries(data)) {
    const m = /^daily\.(\d{4}-\d{2}-\d{2})$/.exec(key);
    if (m && typeof value === "number") out[m[1]] = (out[m[1]] || 0) + value;
  }
  const nested = data.daily;
  if (nested && typeof nested === "object") {
    for (const [day, value] of Object.entries(nested as Record<string, unknown>)) {
      if (typeof value === "number") out[day] = (out[day] || 0) + value;
    }
  }
  return out;
}
