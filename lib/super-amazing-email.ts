import { getExamById } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";

export const SUPER_AMAZING_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export interface SuperAmazingEmailUnlock {
  dashboardKey: string;
  examId: string;
  unlockedAt: Date;
}

function dateFrom(value: unknown): Date | null {
  try {
    const date = value && typeof (value as { toDate?: unknown }).toDate === "function"
      ? (value as { toDate: () => Date }).toDate()
      : value instanceof Date ? value
        : typeof value === "string" ? new Date(value) : null;
    return date instanceof Date && Number.isFinite(date.getTime()) ? date : null;
  } catch {
    return null;
  }
}

/**
 * The achievement, not primaryExam, chooses the email's words and destination.
 * SuperAmazingCard writes dmv, a v1 exam/variant id, or v2:<examId> here.
 * An unscoped legacy timestamp alone is not proof that a dashboard went green.
 */
export function recentSuperAmazingUnlock(
  raw: Record<string, unknown>,
  now: number,
): SuperAmazingEmailUnlock | null {
  const unlocks = raw.superAmazingUnlocks;
  if (!unlocks || typeof unlocks !== "object" || Array.isArray(unlocks)) return null;

  const first = Object.entries(unlocks)
    .flatMap(([dashboardKey, value]) => {
      const at = dateFrom(value);
      return at ? [{ dashboardKey, at }] : [];
    })
    .sort((a, b) => a.at.getTime() - b.at.getTime() || a.dashboardKey.localeCompare(b.dashboardKey))[0];
  if (!first) return null;
  if (first.at.getTime() > now) return null;

  const { dashboardKey } = first;
  const examId = dashboardKey.startsWith("v2:")
    ? EXAMS_V2.find((exam) => exam.id === dashboardKey.slice(3))?.id
    : dashboardKey === "dmv" ? "dmv" : getExamById(dashboardKey)?.id;
  // Unknown keys must not silently become DMV, or move to a later achievement.
  if (!examId) return null;

  // Keep the original first-unlock ceiling when an older client later writes
  // its dashboard latch. A new dashboard must not revive an old celebration.
  const superAmazing = raw.superAmazing as { firstEnabledAt?: unknown } | undefined;
  const accountFirst = dateFrom(raw.superAmazingUnlockedAt) ?? dateFrom(superAmazing?.firstEnabledAt);
  const unlockedAt = new Date(Math.min(first.at.getTime(), accountFirst?.getTime() ?? Infinity));
  const age = now - unlockedAt.getTime();
  if (age < 0 || age > SUPER_AMAZING_MAX_AGE_MS) return null;

  return { dashboardKey, examId, unlockedAt };
}
