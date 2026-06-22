"use client";

import { useEffect, useId, useState } from "react";
import { AlertCircle, Calendar, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  etTodayIso,
  formatDateLong,
  isBookingDateAllowed,
  type TimeSlotOption,
} from "@/lib/schedule";
import { isFirebaseConfigured, useSchedule } from "@/firebase/use-schedule";

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-medium/70 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

type BookingPickerProps = {
  date: string;
  slot: TimeSlotOption | null;
  onDateChange: (date: string) => void;
  onSlotChange: (slot: TimeSlotOption | null) => void;
  invalid?: boolean;
};

export function BookingPicker({
  date,
  slot,
  onDateChange,
  onSlotChange,
  invalid = false,
}: BookingPickerProps) {
  const dateId = useId();
  const { loading, error, getSlotsForDate } = useSchedule();
  const [dateError, setDateError] = useState<string>("");
  // Computed on the client so the date floor is always "today" in ET, never a
  // stale value baked into the prerendered HTML at build time.
  const [minDate, setMinDate] = useState<string>("");

  useEffect(() => {
    setMinDate(etTodayIso());
  }, []);

  const availableSlots = date ? getSlotsForDate(date) : [];
  const firebaseReady = isFirebaseConfigured();

  useEffect(() => {
    if (!date) {
      setDateError("");
      return;
    }
    if (!isBookingDateAllowed(date)) {
      setDateError("Please choose today or a future date.");
      onSlotChange(null);
      return;
    }
    setDateError("");
  }, [date, onSlotChange]);

  useEffect(() => {
    if (!slot || !date) return;
    const stillAvailable = availableSlots.some(
      (s) => s.timeFrom === slot.timeFrom && s.timeTo === slot.timeTo,
    );
    if (!stillAvailable) onSlotChange(null);
  }, [availableSlots, date, slot, onSlotChange]);

  function handleDateChange(next: string) {
    onDateChange(next);
    onSlotChange(null);
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/70 bg-surface/40 p-4">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-gold text-white shadow-[var(--shadow-gold)]">
          <Calendar className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-charcoal">
            Preferred consultation time
          </h3>
          <p className="mt-0.5 text-xs text-gray-medium">
            Available every day · 10:00 AM – 10:00 PM (Eastern Time) · 2-hour sessions
          </p>
        </div>
      </div>

      {!firebaseReady ? (
        <p className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          Firebase booking is not configured on this deployment. Add the four{" "}
          <code>NEXT_PUBLIC_FIREBASE_*</code> vars in Vercel (Production), then{" "}
          <strong>Redeploy</strong> with cache cleared.
        </p>
      ) : null}

      {error ? (
        <p className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={dateId} className="text-sm font-medium text-charcoal">
            Date <span className="text-gold">*</span>
          </label>
          <input
            id={dateId}
            type="date"
            required
            min={minDate || undefined}
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            className={cn(
              inputClass,
              (invalid && !date) || dateError ? "border-red-400 ring-2 ring-red-100" : "",
            )}
          />
          {date && !dateError ? (
            <p className="text-xs text-gray-medium">{formatDateLong(date)}</p>
          ) : null}
          {dateError ? (
            <p className="flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" />
              {dateError}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-charcoal">
            Time slot <span className="text-gold">*</span>
          </span>
          {!date ? (
            <p className="flex h-[46px] items-center rounded-xl border border-dashed border-border px-4 text-xs text-gray-medium">
              Select a date first
            </p>
          ) : loading ? (
            <p className="flex h-[46px] items-center gap-2 rounded-xl border border-border bg-white px-4 text-xs text-gray-medium">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Loading available times…
            </p>
          ) : availableSlots.length === 0 ? (
            <p className="flex items-start gap-2 rounded-xl border border-border bg-white px-4 py-3 text-xs text-gray-medium">
              <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              No slots available on this date. Please choose another day.
            </p>
          ) : (
            <div
              className="grid gap-2 sm:grid-cols-1"
              role="radiogroup"
              aria-label="Available consultation time slots"
            >
              {availableSlots.map((option) => {
                const selected = slot?.id === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onSlotChange(option)}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gold/30",
                      selected
                        ? "border-gold bg-gold-soft/30 font-semibold text-charcoal"
                        : "border-border bg-white text-gray-medium hover:border-gold/50 hover:text-charcoal",
                      invalid && !slot ? "border-red-300" : "",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
          {invalid && date && !slot && availableSlots.length > 0 ? (
            <p className="flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" />
              Please select a time slot.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
