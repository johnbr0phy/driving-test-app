import { NextResponse } from "next/server";
import { requireCaller, type CallerResult } from "@/lib/server/classAuth";
import { isPremiumUid } from "@/lib/server/quizzes";
import type { QuizOwner } from "@/lib/server/quizzes";

/** The signed-in caller as a quiz owner (uid, display name, Premium flag). */
export async function requireQuizOwner(req: Request): Promise<{ ok: true; owner: QuizOwner; caller: Extract<CallerResult, { ok: true }> } | { ok: false; response: NextResponse }> {
  const caller = await requireCaller(req);
  if (!caller.ok) return caller;
  const isPremium = await isPremiumUid(caller.uid);
  return { ok: true, caller, owner: { uid: caller.uid, name: caller.name ?? caller.email?.split("@")[0] ?? null, isPremium } };
}

/** The caller if signed in, else null (public reads that show more to the owner). */
export async function optionalCaller(req: Request): Promise<Extract<CallerResult, { ok: true }> | null> {
  if (!req.headers.get("authorization")) return null;
  const caller = await requireCaller(req);
  return caller.ok ? caller : null;
}
