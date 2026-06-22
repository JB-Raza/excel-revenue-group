import type { DayOfWeek } from "./types.firebase";

/**
 * Shared, dependency-free scheduling config.
 * Imported by both the Next.js frontend (via @/ alias) and the Node slot
 * generator (via relative path), so it must only use cross-runtime APIs (Intl).
 */

/** All slots are anchored to US Eastern Time, regardless of visitor location. */
export const TIMEZONE = "America/New_York";
export const TIMEZONE_LABEL = "Eastern Time (ET)";

export const SLOT_MINUTES = 120; // 2-hour meetings
export const GAP_MINUTES = 30; // 30-minute break between slots
export const DAY_START_MINUTES = 10 * 60; // 10:00 AM ET
export const DAY_END_MINUTES = 22 * 60; // 10:00 PM ET — last slot must end by here

const DAYS_OF_WEEK: DayOfWeek[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(total: number): string {
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

export function formatTime12h(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${pad(m)} ${period}`;
}

export function formatSlotLabel(timeFrom: string, timeTo: string): string {
  return `${formatTime12h(timeFrom)} – ${formatTime12h(timeTo)}`;
}

/** Daily slot grid: 2h each, 30min gaps, 10:00–22:00 → 5 slots. */
export function buildDaySlots(): { timeFrom: string; timeTo: string }[] {
  const slots: { timeFrom: string; timeTo: string }[] = [];
  let start = DAY_START_MINUTES;
  while (start + SLOT_MINUTES <= DAY_END_MINUTES) {
    slots.push({
      timeFrom: minutesToTime(start),
      timeTo: minutesToTime(start + SLOT_MINUTES),
    });
    start += SLOT_MINUTES + GAP_MINUTES;
  }
  return slots;
}

export function slotDocId(date: string, timeFrom: string, timeTo: string): string {
  return `slot-${date}-${timeFrom.replace(":", "")}-${timeTo.replace(":", "")}`;
}

/** Weekday for a YYYY-MM-DD calendar date (timezone-independent). */
export function dayOfWeekForDate(dateIso: string): DayOfWeek {
  const [y, m, d] = dateIso.split("-").map(Number);
  return DAYS_OF_WEEK[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
}

export function addDaysIso(dateIso: string, days: number): string {
  const [y, m, d] = dateIso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
}

export function enumerateDates(startIso: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => addDaysIso(startIso, i));
}

function easternParts(date = new Date()): { date: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  let hour = Number(get("hour"));
  if (hour === 24) hour = 0; // some runtimes emit 24 at midnight
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: hour * 60 + Number(get("minute")),
  };
}

/** Today's calendar date in Eastern Time (YYYY-MM-DD). */
export function etTodayIso(date = new Date()): string {
  return easternParts(date).date;
}

/** Minutes since midnight in Eastern Time right now. */
export function etNowMinutes(date = new Date()): number {
  return easternParts(date).minutes;
}

/** All slots for one date, as plain slot rows (no availability state). */
export function buildSlotsForDate(dateIso: string): {
  date: string;
  dayOfWeek: DayOfWeek;
  timeFrom: string;
  timeTo: string;
}[] {
  const dayOfWeek = dayOfWeekForDate(dateIso);
  return buildDaySlots().map((s) => ({
    date: dateIso,
    dayOfWeek,
    timeFrom: s.timeFrom,
    timeTo: s.timeTo,
  }));
}
