"use client";

import { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ExamV2Config } from "@/lib/v2/types";
import { basicsFor } from "@/lib/v2/basics";
import { drillFromParam, v2Routes } from "@/lib/v2/registry";
import { DrillRunner } from "./DrillRunner";
import { DrillOverview } from "./DrillOverview";
import { BasicsRunner } from "./BasicsRunner";

/**
 * /<exam>/practice/[n] routing (n is the drill's 1-based place in the config):
 *   (no query)      the drill's front door (Basics overview when it has one)
 *   ?skill=id       one Basics skill
 *   ?level=exam     the exam-level questions
 * Old /<exam>/train?drill=key links arrive here as practice/<key> (next.config.ts)
 * and are swapped for the numbered URL.
 */
export function TrainPage({ exam }: { exam: ExamV2Config }) {
  const params = useParams();
  const query = useSearchParams();
  const router = useRouter();
  const raw = params.n as string;
  const drill = drillFromParam(exam, raw);
  const skill = query.get("skill");
  const level = query.get("level");

  const canonical = drill
    ? skill
      ? v2Routes(exam).basics(drill.key, skill)
      : level === "exam"
        ? v2Routes(exam).drillQuestions(drill.key)
        : v2Routes(exam).drill(drill.key)
    : null;
  useEffect(() => {
    if (canonical && canonical !== `${window.location.pathname}${window.location.search}`) router.replace(canonical);
  }, [canonical, router]);

  const drillKey = drill?.key ?? null;
  const hasBasics = !!drill && basicsFor(drill).length > 0;

  if (hasBasics && skill) return <BasicsRunner exam={exam} drillKeyParam={drillKey} skillIdParam={skill} />;
  if (hasBasics && level !== "exam") return <DrillOverview exam={exam} drillKeyParam={drillKey} />;
  return <DrillRunner exam={exam} drillKeyParam={drillKey} />;
}
