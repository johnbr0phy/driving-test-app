import { getTigerAsset } from "./tigerAssets";

export function getTigerFace(percentage: number, examId = "dmv"): string {
  if (percentage >= 100) return getTigerAsset(examId, 1);
  if (percentage >= 85) return getTigerAsset(examId, 2);
  if (percentage >= 70) return getTigerAsset(examId, 3);
  if (percentage >= 55) return getTigerAsset(examId, 4);
  if (percentage >= 40) return getTigerAsset(examId, 5);
  if (percentage >= 25) return getTigerAsset(examId, 6);
  if (percentage >= 10) return getTigerAsset(examId, 7);
  return getTigerAsset(examId, 8);
}
