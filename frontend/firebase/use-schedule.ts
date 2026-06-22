"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/firebase/firebase";
import { etTodayIso } from "@/firebase/slot-config";
import type { AvailableSlot } from "@/firebase/types.firebase";
import {
  availableSlotsForDate,
  buildLocalSlotsForDate,
  type TimeSlotOption,
} from "@/lib/schedule";

export { isFirebaseConfigured };

function parseSlot(id: string, data: Record<string, unknown>): AvailableSlot {
  return {
    id,
    date: String(data.date ?? ""),
    dayOfWeek: data.dayOfWeek as AvailableSlot["dayOfWeek"],
    timeFrom: String(data.timeFrom ?? ""),
    timeTo: String(data.timeTo ?? ""),
    isAvailable: Boolean(data.isAvailable),
    timezone: String(data.timezone ?? ""),
    bookingId: data.bookingId ? String(data.bookingId) : undefined,
  };
}

export function useSchedule() {
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    const slotsQuery = query(
      collection(getDb(), "Available_Slots"),
      where("date", ">=", etTodayIso()),
    );

    const unsubscribe = onSnapshot(
      slotsQuery,
      (snapshot) => {
        setSlots(
          snapshot.docs.map((docSnap) =>
            parseSlot(docSnap.id, docSnap.data() as Record<string, unknown>),
          ),
        );
        setError(null);
        setLoading(false);
      },
      (err) => {
        console.error("Available_Slots listener failed:", err);
        setError("Could not load live availability. Please try again later.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const getSlotsForDate = useMemo(
    () =>
      (dateStr: string): TimeSlotOption[] => {
        if (!isFirebaseConfigured()) {
          return availableSlotsForDate(dateStr, buildLocalSlotsForDate(dateStr));
        }
        return availableSlotsForDate(dateStr, slots);
      },
    [slots],
  );

  return { slots, loading, error, getSlotsForDate };
}
