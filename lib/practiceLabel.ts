/**
 * An exam's short name as it reads before "practice": a descriptive trailing
 * "test" or "exam" is dropped, so "Nigerian Army recruitment test" gives
 * "Nigerian Army recruitment practice test", never "... test practice test".
 * A capitalised one is part of the name ("Police Exam", "OC Test") and stays.
 */
export function practiceLabel(shortName: string): string {
  const name = shortName.trim();
  const cut = name.replace(/\s+(test|exam)$/, "");
  return cut || name;
}
