import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { getDb } from "@/firebase/firebase";
import {
  dayOfWeekForDate,
  etNowMinutes,
  etTodayIso,
  timeToMinutes,
} from "@/firebase/slot-config";

const AVAILABLE = "Available_Slots";
const BOOKINGS = "Bookings";

export class SlotTakenError extends Error {
  constructor(message = "That time slot was just booked. Please choose another.") {
    super(message);
    this.name = "SlotTakenError";
  }
}

/** True when a slot's start time (in ET) is now or in the past. */
function isSlotStartPast(date: string, timeFrom: string): boolean {
  const today = etTodayIso();
  if (date < today) return true;
  if (date > today) return false;
  return timeToMinutes(timeFrom) <= etNowMinutes();
}

export class BookingFailedError extends Error {
  constructor(message = "Could not save your booking. Please try again.") {
    super(message);
    this.name = "BookingFailedError";
  }
}

export type BookConsultationInput = {
  slotId: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  practice?: string;
  service: string;
  message: string;
};

/**
 * Atomically books a slot:
 *  - flags the Available_Slots doc isAvailable=false
 *  - writes a Bookings doc with the attendee + slot details
 * Both happen in one transaction so a slot can't be double-booked.
 */
export async function bookConsultationSlot(
  input: BookConsultationInput,
): Promise<string> {
  const db = getDb();
  const slotRef = doc(db, AVAILABLE, input.slotId);
  const bookingRef = doc(collection(db, BOOKINGS));

  // Hard guard: never book a slot whose start time has already passed (ET),
  // even if it briefly lingered in the UI.
  if (isSlotStartPast(input.date, input.timeFrom)) {
    throw new SlotTakenError(
      "That time has already started (Eastern Time). Please pick a later slot.",
    );
  }

  try {
    await runTransaction(db, async (tx) => {
      const slotSnap = await tx.get(slotRef);
      if (!slotSnap.exists() || slotSnap.data()?.isAvailable !== true) {
        throw new SlotTakenError();
      }

      const slotData = slotSnap.data() as { date?: string; timeFrom?: string };
      if (isSlotStartPast(String(slotData.date), String(slotData.timeFrom))) {
        throw new SlotTakenError(
          "That time has already started (Eastern Time). Please pick a later slot.",
        );
      }

      tx.set(bookingRef, {
        slotId: input.slotId,
        date: input.date,
        dayOfWeek: dayOfWeekForDate(input.date),
        timeFrom: input.timeFrom,
        timeTo: input.timeTo,
        userName: input.userName.trim(),
        userEmail: input.userEmail.trim(),
        userPhone: input.userPhone?.trim() ?? "",
        practice: input.practice?.trim() ?? "",
        service: input.service,
        message: input.message.trim(),
        status: "confirmed",
        createdAt: serverTimestamp(),
      });

      tx.update(slotRef, {
        isAvailable: false,
        bookingId: bookingRef.id,
      });
    });
  } catch (err) {
    if (err instanceof SlotTakenError) throw err;
    console.error("bookConsultationSlot failed:", err);
    throw new BookingFailedError(
      "Could not save your booking. Check Firestore rules allow this write.",
    );
  }

  return bookingRef.id;
}
