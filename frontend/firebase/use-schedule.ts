"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { buildWeeklyScheduleTemplates } from "@/firebase/schedule-slots";
import type { ScheduleDate } from "@/firebase/types.firebase";
import {
  getAvailableSlotsForDate,
  isConfirmedBooking,
  isTemplateRow,
  type TimeSlotOption,
} from "@/lib/schedule";

export function isFirebaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim());
}

function parseScheduleDoc(data: Record<string, unknown>): ScheduleDate {
  return {
    dayOfWeek: data.dayOfWeek as ScheduleDate["dayOfWeek"],
    timeFrom: String(data.timeFrom ?? ""),
    timeTo: String(data.timeTo ?? ""),
    isAvailable: Boolean(data.isAvailable ?? true),
    bookingStatus: Boolean(data.bookingStatus),
    userEmail: String(data.userEmail ?? ""),
    date: data.date ? String(data.date) : undefined,
  };
}

export function useSchedule() {
  const [templates, setTemplates] = useState<ScheduleDate[]>([]);
  const [bookings, setBookings] = useState<ScheduleDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setTemplates(buildWeeklyScheduleTemplates());
      setBookings([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, "Schedule_Dates"),
      (snapshot) => {
        const rows = snapshot.docs.map((docSnap) =>
          parseScheduleDoc(docSnap.data() as Record<string, unknown>),
        );

        const nextTemplates = rows.filter(isTemplateRow);
        const nextBookings = rows.filter(isConfirmedBooking);

        setTemplates(
          nextTemplates.length > 0 ? nextTemplates : buildWeeklyScheduleTemplates(),
        );
        setBookings(nextBookings);
        setError(null);
        setLoading(false);
      },
      (err) => {
        console.error("Schedule_Dates listener failed:", err);
        setTemplates(buildWeeklyScheduleTemplates());
        setBookings([]);
        setError("Could not load live availability. Showing default schedule.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const getSlotsForDate = useMemo(
    () =>
      (dateStr: string): TimeSlotOption[] =>
        getAvailableSlotsForDate(dateStr, templates, bookings),
    [templates, bookings],
  );

  return { templates, bookings, loading, error, getSlotsForDate };
}
