import { deleteDoc, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { toDayOfWeek } from "@/lib/schedule";

export class SlotTakenError extends Error {
  constructor() {
    super("That time slot was just booked. Please choose another.");
    this.name = "SlotTakenError";
  }
}

export class BookingFailedError extends Error {
  constructor(message = "Could not save your booking. Please try again.") {
    super(message);
    this.name = "BookingFailedError";
  }
}

export type BookConsultationInput = {
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

export function bookingDocId(date: string, timeFrom: string, timeTo: string) {
  return `booking-${date}-${timeFrom.replace(":", "")}-${timeTo.replace(":", "")}`;
}

/** Confirms a slot immediately in Firestore. */
export async function bookConsultationSlot(
  input: BookConsultationInput,
): Promise<string> {
  const dayOfWeek = toDayOfWeek(input.date);
  if (!dayOfWeek) {
    throw new BookingFailedError("Invalid booking date.");
  }

  const id = bookingDocId(input.date, input.timeFrom, input.timeTo);
  const bookingRef = doc(db, "Schedule_Dates", id);

  try {
    await runTransaction(db, async (transaction) => {
      const existing = await transaction.get(bookingRef);
      if (existing.exists() && existing.data()?.bookingStatus === true) {
        throw new SlotTakenError();
      }

      transaction.set(bookingRef, {
        dayOfWeek,
        date: input.date,
        timeFrom: input.timeFrom,
        timeTo: input.timeTo,
        isAvailable: false,
        bookingStatus: true,
        userEmail: input.userEmail.trim(),
        userName: input.userName.trim(),
        userPhone: input.userPhone?.trim() ?? "",
        practice: input.practice?.trim() ?? "",
        service: input.service,
        message: input.message.trim(),
        createdAt: serverTimestamp(),
      });
    });
  } catch (err) {
    if (err instanceof SlotTakenError) throw err;
    console.error("bookConsultationSlot failed:", err);
    throw new BookingFailedError(
      "Could not save your booking. Check Firestore rules allow writes to Schedule_Dates.",
    );
  }

  return id;
}

/** Roll back a booking if email delivery fails after Firestore write. */
export async function cancelConsultationBooking(bookingId: string): Promise<void> {
  await deleteDoc(doc(db, "Schedule_Dates", bookingId));
}
