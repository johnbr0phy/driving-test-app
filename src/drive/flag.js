// "Drive the Question" feature flag.
//
// On in development and on Vercel preview deployments, off in production.
// NEXT_PUBLIC_DRIVE_ENABLED overrides both ways: "1" / "true" / "on" turns it
// on anywhere (that is how production gets it), "0" / "false" / "off" turns it
// off anywhere. The variable is inlined at build time, so a change needs a deploy.

export function isDriveEnabled() {
  const value = (process.env.NEXT_PUBLIC_DRIVE_ENABLED || "").toLowerCase();
  if (value === "1" || value === "true" || value === "on") return true;
  if (value === "0" || value === "false" || value === "off") return false;
  if (process.env.NODE_ENV !== "production") return true;
  return process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
}
