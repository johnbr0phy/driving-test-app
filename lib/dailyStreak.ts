// Daily study streak tracker — persists across sessions via localStorage

const KEY_STREAK = "tigertest_daily_streak";
const KEY_LAST_DATE = "tigertest_last_study_date";
const KEY_SHIELD_ACTIVE = "tigertest_streak_shield";
const KEY_SHIELD_USED_WEEK = "tigertest_shield_week";

function todayStr(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function weekStr(): string {
  const d = new Date();
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
}

export interface StreakData {
  streak: number;
  lastStudyDate: string;
  isNewDay: boolean; // true if today is the first visit today
  shieldActive: boolean;
  shieldUsedThisWeek: boolean;
}

/** Call when the user visits the dashboard — marks today as a study day and updates streak */
export function touchStreak(): StreakData {
  if (typeof window === "undefined") {
    return { streak: 0, lastStudyDate: "", isNewDay: false, shieldActive: false, shieldUsedThisWeek: false };
  }

  const today = todayStr();
  const yesterday = yesterdayStr();
  const currentWeek = weekStr();

  const stored = localStorage.getItem(KEY_STREAK);
  const lastDate = localStorage.getItem(KEY_LAST_DATE) || "";
  const shieldUsedWeek = localStorage.getItem(KEY_SHIELD_USED_WEEK) || "";
  const shieldActive = localStorage.getItem(KEY_SHIELD_ACTIVE) === "true";

  let streak = stored ? parseInt(stored, 10) : 0;
  const isNewDay = lastDate !== today;

  if (isNewDay) {
    if (lastDate === yesterday) {
      // Consecutive day — increment
      streak += 1;
    } else if (lastDate === "" || lastDate < yesterday) {
      // Missed a day — check shield
      if (shieldActive && shieldUsedWeek !== currentWeek) {
        // Shield saves the streak, mark as used
        localStorage.setItem(KEY_SHIELD_USED_WEEK, currentWeek);
        localStorage.setItem(KEY_SHIELD_ACTIVE, "false");
        // streak stays the same + 1 for today
        streak += 1;
      } else {
        // No shield — reset
        streak = 1;
      }
    }
    localStorage.setItem(KEY_STREAK, String(streak));
    localStorage.setItem(KEY_LAST_DATE, today);
  }

  return {
    streak,
    lastStudyDate: today,
    isNewDay,
    shieldActive: localStorage.getItem(KEY_SHIELD_ACTIVE) === "true",
    shieldUsedThisWeek: localStorage.getItem(KEY_SHIELD_USED_WEEK) === currentWeek,
  };
}

export function getStreak(): StreakData {
  if (typeof window === "undefined") {
    return { streak: 0, lastStudyDate: "", isNewDay: false, shieldActive: false, shieldUsedThisWeek: false };
  }
  const stored = localStorage.getItem(KEY_STREAK);
  const lastDate = localStorage.getItem(KEY_LAST_DATE) || "";
  const currentWeek = weekStr();
  return {
    streak: stored ? parseInt(stored, 10) : 0,
    lastStudyDate: lastDate,
    isNewDay: lastDate !== todayStr(),
    shieldActive: localStorage.getItem(KEY_SHIELD_ACTIVE) === "true",
    shieldUsedThisWeek: localStorage.getItem(KEY_SHIELD_USED_WEEK) === currentWeek,
  };
}

/** For demo: set a specific streak value (used in prototype to seed realistic state) */
export function seedStreakForDemo(days: number): void {
  if (typeof window === "undefined") return;
  const yesterday = yesterdayStr();
  localStorage.setItem(KEY_STREAK, String(days));
  localStorage.setItem(KEY_LAST_DATE, yesterday); // set to yesterday so touchStreak increments today
}
