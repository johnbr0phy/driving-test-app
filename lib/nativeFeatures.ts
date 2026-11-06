/**
 * Native features of the iOS and Android apps (the Capacitor shell in
 * /mobile). The site is loaded from tigertest.io inside the app, and the
 * shell injects Capacitor's bridge into it, so these call the native plugins
 * directly. Everything here is a no-op on the web, and the plugin code is
 * only fetched inside the app (dynamic imports), so web pages never ship it.
 *
 * The plugins must also be installed in mobile/package.json (then
 * `npx cap sync`), or the native side has nothing to answer.
 */
import { isNativeApp } from "@/lib/native-app";

/** A light tap on a right answer, a heavier buzz on a wrong one. */
export function answerHaptic(correct: boolean): void {
  if (!isNativeApp()) return;
  void import("@capacitor/haptics")
    .then(({ Haptics, ImpactStyle, NotificationType }) =>
      correct ? Haptics.impact({ style: ImpactStyle.Light }) : Haptics.notification({ type: NotificationType.Error }),
    )
    .catch(() => {});
}

export type StudyReminder = { hour: number; minute: number } | null;

const REMINDER_KEY = "tigertest-study-reminder";
const REMINDER_ID = 1001;

/** The reminder this device has set, if any (a device setting, not synced). */
export function readStudyReminder(): StudyReminder {
  try {
    const raw = localStorage.getItem(REMINDER_KEY);
    if (!raw) return null;
    const r = JSON.parse(raw);
    return typeof r?.hour === "number" && typeof r?.minute === "number" ? r : null;
  } catch {
    return null;
  }
}

/**
 * Turns the daily study reminder on at hour:minute local time (asking for
 * notification permission the first time), or off with null. Resolves to
 * "denied" when the person said no to notifications.
 */
export async function setStudyReminder(
  time: StudyReminder,
  copy: { title: string; body: string },
): Promise<"on" | "off" | "denied" | "unavailable"> {
  if (!isNativeApp()) return "unavailable";
  try {
    const { LocalNotifications } = await import("@capacitor/local-notifications");
    await LocalNotifications.cancel({ notifications: [{ id: REMINDER_ID }] });
    if (!time) {
      localStorage.removeItem(REMINDER_KEY);
      return "off";
    }
    let perm = await LocalNotifications.checkPermissions();
    if (perm.display !== "granted") perm = await LocalNotifications.requestPermissions();
    if (perm.display !== "granted") return "denied";
    await LocalNotifications.schedule({
      notifications: [
        {
          id: REMINDER_ID,
          title: copy.title,
          body: copy.body,
          schedule: { on: { hour: time.hour, minute: time.minute }, allowWhileIdle: true },
        },
      ],
    });
    localStorage.setItem(REMINDER_KEY, JSON.stringify(time));
    return "on";
  } catch {
    return "unavailable";
  }
}
