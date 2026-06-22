import type { AvailableSlot } from "@/firebase/types.firebase";
import {
  TIMEZONE,
  buildSlotsForDate,
  etNowMinutes,
  etTodayIso,
  formatSlotLabel,
  slotDocId,
  timeToMinutes,
} from "@/firebase/slot-config";

export * from "@/firebase/slot-config";

export type TimeSlotOption = {
  /** Available_Slots doc id this option maps to. */
  id: string;
  timeFrom: string;
  timeTo: string;
  label: string;
};

/** Bookable from today (ET) onward — any day of the week. */
export function isBookingDateAllowed(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  return dateStr >= etTodayIso();
}

export function formatDateLong(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return dateStr;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** A slot is in the past only when it's today (ET) and already started. */
export function isSlotInPast(dateStr: string, timeFrom: string): boolean {
  if (dateStr !== etTodayIso()) return false;
  return timeToMinutes(timeFrom) <= etNowMinutes();
}

/** Open, future slots for a date, sorted by start time. */
export function availableSlotsForDate(
  dateStr: string,
  slots: AvailableSlot[],
): TimeSlotOption[] {
  if (!isBookingDateAllowed(dateStr)) return [];

  return slots
    .filter(
      (s) =>
        s.date === dateStr &&
        s.isAvailable &&
        !isSlotInPast(dateStr, s.timeFrom),
    )
    .sort((a, b) => timeToMinutes(a.timeFrom) - timeToMinutes(b.timeFrom))
    .map((s) => ({
      id: s.id ?? slotDocId(s.date, s.timeFrom, s.timeTo),
      timeFrom: s.timeFrom,
      timeTo: s.timeTo,
      label: formatSlotLabel(s.timeFrom, s.timeTo),
    }));
}

/** Fallback slots (Firebase not configured) — all open, generated locally. */
export function buildLocalSlotsForDate(dateStr: string): AvailableSlot[] {
  return buildSlotsForDate(dateStr).map((s) => ({
    id: slotDocId(s.date, s.timeFrom, s.timeTo),
    date: s.date,
    dayOfWeek: s.dayOfWeek,
    timeFrom: s.timeFrom,
    timeTo: s.timeTo,
    isAvailable: true,
    timezone: TIMEZONE,
  }));
}
