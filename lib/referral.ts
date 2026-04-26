// Referral code helpers - small, dependency-free.
// Codes are 6 chars, alphanumeric without ambiguous characters (no 0/O, 1/I/L).

const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function generateReferralCode(length = 6): string {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}

export function normalizeReferralCode(input: string): string {
  return input.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
}
