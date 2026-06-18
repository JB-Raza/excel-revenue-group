export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

/** Weekly template or a booked slot in `Schedule_Dates`. */
export type ScheduleDate = {
  dayOfWeek: DayOfWeek;
  timeFrom: string;
  timeTo: string;
  isAvailable: boolean;
  bookingStatus: boolean;
  /** Empty for template slots; set when a user books. */
  userEmail: string;
  /** Calendar date (YYYY-MM-DD) — set when tied to a specific booking day. */
  date?: string;
  /** Present on confirmed booking documents. */
  userName?: string;
  userPhone?: string;
  practice?: string;
  service?: string;
  message?: string;
  createdAt?: unknown;
};
