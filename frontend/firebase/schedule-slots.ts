import type { DayOfWeek } from "./types.firebase";

export const WEEKDAYS: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const SLOT_MINUTES = 120;
const GAP_MINUTES = 15;
const DAY_START_MINUTES = 10 * 60; // 10:00
const DAY_END_MINUTES = 22 * 60; // 22:00 — last slot must end by 10pm

function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

/** One weekday's template slots: 2h each, 15min gap, 10:00–22:00. */
export function buildWeekdaySlots(): { timeFrom: string; timeTo: string }[] {
  const slots: { timeFrom: string; timeTo: string }[] = [];
  let start = DAY_START_MINUTES;

  while (start + SLOT_MINUTES <= DAY_END_MINUTES) {
    slots.push({
      timeFrom: formatMinutes(start),
      timeTo: formatMinutes(start + SLOT_MINUTES),
    });
    start += SLOT_MINUTES + GAP_MINUTES;
  }

  return slots;
}

/** All Mon–Fri template rows for Firestore `Schedule_Dates`. */
export function buildWeeklyScheduleTemplates() {
  const slots = buildWeekdaySlots();
  return WEEKDAYS.flatMap((dayOfWeek) =>
    slots.map((slot) => ({
      dayOfWeek,
      timeFrom: slot.timeFrom,
      timeTo: slot.timeTo,
      isAvailable: true,
      bookingStatus: false,
      userEmail: "",
    })),
  );
}
