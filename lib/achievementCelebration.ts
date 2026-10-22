// A completion event, not persisted progress. Client-side navigation can claim
// it once; reopening a saved result or hydrating the store cannot create it.
const pending = new Set<string>();

export function queueAchievementCelebration(id: string): void {
  if (typeof window === "undefined") return;
  pending.add(id);
}

export function takeAchievementCelebration(id: string): boolean {
  return pending.delete(id);
}
