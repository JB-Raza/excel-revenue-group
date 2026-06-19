import type { DayOfWeek, ScheduleDate } from "@/firebase/types.firebase";

const JS_DAY_TO_WEEKDAY: Record<number, DayOfWeek | null> = {
  0: null,
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: null,
};

export type TimeSlotOption = {
  timeFrom: string;
  timeTo: string;
  label: string;
};

export function todayIsoLocal(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseDateLocal(dateStr: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return null;
  const [, y, m, d] = match;
  return new Date(Number(y), Number(m) - 1, Number(d));
}

export function toDayOfWeek(dateStr: string): DayOfWeek | null {
  const date = parseDateLocal(dateStr);
  if (!date) return null;
  return JS_DAY_TO_WEEKDAY[date.getDay()] ?? null;
}

export function isWeekday(dateStr: string): boolean {
  return toDayOfWeek(dateStr) !== null;
}

export function isBookingDateAllowed(dateStr: string): boolean {
  if (!isWeekday(dateStr)) return false;
  return dateStr >= todayIsoLocal();
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function formatTime12h(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export function formatSlotLabel(timeFrom: string, timeTo: string): string {
  return `${formatTime12h(timeFrom)} – ${formatTime12h(timeTo)}`;
}

export function formatDateLong(dateStr: string): string {
  const date = parseDateLocal(dateStr);
  if (!date) return dateStr;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function slotsOverlap(
  aFrom: string,
  aTo: string,
  bFrom: string,
  bTo: string,
): boolean {
  const aStart = timeToMinutes(aFrom);
  const aEnd = timeToMinutes(aTo);
  const bStart = timeToMinutes(bFrom);
  const bEnd = timeToMinutes(bTo);
  return aStart < bEnd && bStart < aEnd;
}

function isSlotInPast(dateStr: string, timeFrom: string, now = new Date()): boolean {
  if (dateStr !== todayIsoLocal()) return false;
  const slotStart = parseDateLocal(dateStr);
  if (!slotStart) return false;
  const [h, m] = timeFrom.split(":").map(Number);
  slotStart.setHours(h, m, 0, 0);
  return slotStart <= now;
}

export function isTemplateRow(row: ScheduleDate): boolean {
  return !row.date?.trim();
}

export function isConfirmedBooking(row: ScheduleDate): boolean {
  return Boolean(row.date?.trim() && row.bookingStatus);
}

export function getAvailableSlotsForDate(
  dateStr: string,
  templates: ScheduleDate[],
  bookings: ScheduleDate[],
  now = new Date(),
): TimeSlotOption[] {
  const dayOfWeek = toDayOfWeek(dateStr);
  if (!dayOfWeek || !isBookingDateAllowed(dateStr)) return [];

  const dayTemplates = templates.filter(
    (row) => row.dayOfWeek === dayOfWeek && row.isAvailable,
  );

  const dayBookings = bookings.filter((row) => row.date === dateStr);

  return dayTemplates
    .filter((slot) => {
      if (isSlotInPast(dateStr, slot.timeFrom, now)) return false;
      return !dayBookings.some((booked) =>
        slotsOverlap(slot.timeFrom, slot.timeTo, booked.timeFrom, booked.timeTo),
      );
    })
    .map((slot) => ({
      timeFrom: slot.timeFrom,
      timeTo: slot.timeTo,
      label: formatSlotLabel(slot.timeFrom, slot.timeTo),
    }));
}
