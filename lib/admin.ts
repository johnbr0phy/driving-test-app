// Admin role configuration
// Add email addresses here to grant admin access

export const ADMIN_EMAILS: string[] = [
  'john@johnbrophy.net',
];

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
