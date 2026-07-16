export function getTigerFace(percentage: number): string {
  if (percentage >= 100) return "/tiger_face_01.png";
  if (percentage >= 85) return "/tiger_face_02.png";
  if (percentage >= 70) return "/tiger_face_03.png";
  if (percentage >= 55) return "/tiger_face_04.png";
  if (percentage >= 40) return "/tiger_face_05.png";
  if (percentage >= 25) return "/tiger_face_06.png";
  if (percentage >= 10) return "/tiger_face_07.png";
  return "/tiger_face_08.png";
}
