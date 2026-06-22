export type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

/** A bookable slot in the `Available_Slots` collection (one doc per date + time). */
export type AvailableSlot = {
  /** Firestore document id (slot-YYYY-MM-DD-HHMM-HHMM). */
  id?: string;
  /** Calendar date in Eastern Time, YYYY-MM-DD. */
  date: string;
  dayOfWeek: DayOfWeek;
  /** 24h wall-clock time in Eastern Time, e.g. "10:00". */
  timeFrom: string;
  timeTo: string;
  /** false once booked (flagged, not deleted). */
  isAvailable: boolean;
  /** IANA timezone the times are expressed in. */
  timezone: string;
  /** Set to the Bookings doc id when this slot is booked. */
  bookingId?: string;
  createdAt?: unknown;
};

/** A confirmed booking in the `Bookings` collection (who booked + slot details). */
export type Booking = {
  id?: string;
  /** Id of the Available_Slots doc that was booked. */
  slotId: string;
  date: string;
  dayOfWeek: DayOfWeek;
  timeFrom: string;
  timeTo: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  practice?: string;
  service: string;
  message: string;
  status: "confirmed";
  createdAt?: unknown;
};
