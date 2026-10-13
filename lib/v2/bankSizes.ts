// Question count per v2 bank, for the test catalog. Kept here so the catalog
// (header, footer, hub) never imports a bank. tools/validate_v2_bank.py
// rewrites the entry for the exam it validates.
export const BANK_SIZES: Record<string, number> = {
  sat: 474,
  act: 506,
  teas: 200,
  hesi: 200,
  asvab: 200,
  accuplacer: 200,
  nclex: 200,
  emt: 200,
  secplus: 200,
  aplus: 200,
  aws: 200,
};
