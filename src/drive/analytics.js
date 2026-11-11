// Drive events go through the site's existing analytics: GA4 via window.gtag,
// which already honours the consent banner and the children's-test kill switch.

export const DRIVE_EVENTS = ["drive_start", "drive_decision", "drive_complete", "drive_retry", "drive_to_test_click"];

export function trackDrive(event, params = {}) {
  if (typeof window === "undefined" || !DRIVE_EVENTS.includes(event)) return;
  window.gtag?.("event", event, params);
}
