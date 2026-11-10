import { getExamById, examFamilyId } from "@/lib/exams";
import { getTigerAsset, getSiteTigerAsset, type TigerExpression } from "@/lib/tigerAssets";
import palette from "@/lib/email-brand-palette.json";

/** Literal light-theme colours generated from globals.css for email clients. */
export function emailBrand(examId?: string, expression: TigerExpression = 3) {
  const exam = examId ? getExamById(examId) : undefined;
  const family = exam ? examFamilyId(exam) : examId;
  const colors = family ? (palette as Record<string, string[]>)[family] : undefined;
  const [accent, light, ink, border] = colors ?? ["#17604b", "#f5f6f2", "#152521", "#d8ded8"];
  return {
    accent, light, ink, border,
    tiger: `https://www.tigertest.io${family && colors ? getTigerAsset(family, expression) : getSiteTigerAsset(expression)}`,
    known: Boolean(colors),
  };
}
