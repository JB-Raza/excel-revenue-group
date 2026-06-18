"use client";

import { useRef, useState, type FormEvent } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { serviceOptions } from "@/lib/services";
import { formatDateLong, type TimeSlotOption } from "@/lib/schedule";
import { Select } from "@/components/ui/select";
import { BookingPicker } from "@/components/sections/booking-picker";
import {
  bookConsultationSlot,
  SlotTakenError,
} from "@/firebase/book-slot";
import { isFirebaseConfigured } from "@/firebase/use-schedule";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-medium/70 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

export function ContactForm() {
  const captchaRef = useRef<HCaptcha>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaLoadError, setCaptchaLoadError] = useState(false);
  const [service, setService] = useState<string>("");
  const [serviceTouched, setServiceTouched] = useState(false);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredSlot, setPreferredSlot] = useState<TimeSlotOption | null>(null);
  const [scheduleTouched, setScheduleTouched] = useState(false);

  const keyConfigured = Boolean(siteConfig.web3FormsKey?.trim());

  function resetCaptcha() {
    setCaptchaToken("");
    setCaptchaLoadError(false);
    captchaRef.current?.resetCaptcha();
  }

  function formatSubmitError(message: string): string {
    const lower = message.toLowerCase();
    if (lower.includes("marked as spam")) {
      return "Submission was flagged as spam by Web3Forms. Try again after the captcha fully loads, or contact us by phone. If this keeps happening, ask Web3Forms support to review your domain.";
    }
    if (lower.includes("could not validate hcaptcha") || lower.includes("captcha")) {
      return "Captcha validation failed. Complete the checkbox again and resubmit.";
    }
    return message;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!service) {
      setServiceTouched(true);
      return;
    }

    if (!preferredDate || !preferredSlot) {
      setScheduleTouched(true);
      return;
    }

    const form = e.currentTarget;
    if (!captchaToken) {
      setStatus("error");
      setError("Please complete the captcha verification.");
      return;
    }

    setStatus("submitting");
    setError("");

    const formData = new FormData(form);
    const slotSummary = `${formatDateLong(preferredDate)} · ${preferredSlot.label}`;
    formData.set(
      "subject",
      `New consultation request — ${service} — ${slotSummary}`,
    );
    formData.set("preferred_date", preferredDate);
    formData.set("preferred_time_from", preferredSlot.timeFrom);
    formData.set("preferred_time_to", preferredSlot.timeTo);
    formData.set("consultation_slot", slotSummary);
    formData.set("h-captcha-response", captchaToken);
    formData.set("replyto", String(formData.get("email") ?? ""));

    try {
      if (!isFirebaseConfigured()) {
        setStatus("error");
        setError("Booking is unavailable — Firebase is not configured.");
        return;
      }

      // Email first — only book the slot if Web3Forms accepts the submission.
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (!data.success) {
        setStatus("error");
        resetCaptcha();
        setError(
          formatSubmitError(
            data.message ||
              "Submission failed. Check your Web3Forms access key and try again.",
          ),
        );
        return;
      }

      await bookConsultationSlot({
        date: preferredDate,
        timeFrom: preferredSlot.timeFrom,
        timeTo: preferredSlot.timeTo,
        userEmail: String(formData.get("email") ?? ""),
        userName: String(formData.get("name") ?? ""),
        userPhone: String(formData.get("phone") ?? ""),
        practice: String(formData.get("practice") ?? ""),
        service,
        message: String(formData.get("message") ?? ""),
      });

      setStatus("success");
      form.reset();
      setService("");
      setServiceTouched(false);
      setPreferredDate("");
      setPreferredSlot(null);
      setScheduleTouched(false);
      resetCaptcha();
    } catch (err) {
      setStatus("error");
      resetCaptcha();
      if (err instanceof SlotTakenError) {
        setPreferredSlot(null);
        setError(err.message);
      } else if (err instanceof TypeError) {
        setError(
          "Could not reach the form server (network or DNS issue). Try another network, disable ad blockers, or use Google DNS (8.8.8.8). If the captcha box is blank, hCaptcha may be blocked on your connection.",
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Network error. Please try again or contact us directly.",
        );
      }
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-gold/30 bg-gold-soft/10 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold" />
        <h3 className="font-heading text-xl font-bold text-charcoal">
          Consultation booked!
        </h3>
        <p className="text-sm text-gray-medium">
          Your time slot is confirmed. We&apos;ve also sent your details to our
          team. For urgent matters, call us at{" "}
          <a href={siteConfig.contact.phoneHref} className="font-semibold text-gold">
            {siteConfig.contact.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="hidden" name="access_key" value={siteConfig.web3FormsKey} />
        <input
          type="hidden"
          name="subject"
          value={`New consultation request — ${siteConfig.name}`}
        />
        <input type="hidden" name="from_name" value={siteConfig.name} />
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          className="hidden"
          aria-hidden
        />

        {!keyConfigured ? (
          <p className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            Setup note: add <code>NEXT_PUBLIC_WEB3FORMS_KEY</code> to your{" "}
            <code>.env</code> file to enable form delivery.
          </p>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-charcoal">
              Full name <span className="text-gold">*</span>
            </label>
            <input id="name" name="name" required className={inputClass} placeholder="Jane Doe" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-charcoal">
              Email <span className="text-gold">*</span>
            </label>
            <input id="email" name="email" type="email" required className={inputClass} placeholder="jane@practice.com" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-sm font-medium text-charcoal">
              Phone
            </label>
            <input id="phone" name="phone" type="tel" className={inputClass} placeholder="(555) 123-4567" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="practice" className="text-sm font-medium text-charcoal">
              Practice / Specialty
            </label>
            <input id="practice" name="practice" className={inputClass} placeholder="Family Medicine" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span id="service-label" className="text-sm font-medium text-charcoal">
            Service of interest <span className="text-gold">*</span>
          </span>
          <input type="hidden" name="service" value={service} />
          <Select
            id="service"
            labelId="service-label"
            options={serviceOptions}
            value={service}
            onChange={(v) => {
              setService(v);
              setServiceTouched(true);
            }}
            placeholder="Select a service…"
            invalid={serviceTouched}
          />
          {serviceTouched && !service ? (
            <p className="flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5" />
              Please select a service.
            </p>
          ) : null}
        </div>

        <BookingPicker
          date={preferredDate}
          slot={preferredSlot}
          onDateChange={(value) => {
            setPreferredDate(value);
            setScheduleTouched(true);
          }}
          onSlotChange={(value) => {
            setPreferredSlot(value);
            setScheduleTouched(true);
          }}
          invalid={scheduleTouched}
        />
        <input type="hidden" name="preferred_date" value={preferredDate} />
        <input
          type="hidden"
          name="preferred_time_from"
          value={preferredSlot?.timeFrom ?? ""}
        />
        <input
          type="hidden"
          name="preferred_time_to"
          value={preferredSlot?.timeTo ?? ""}
        />
        <input
          type="hidden"
          name="consultation_slot"
          value={
            preferredDate && preferredSlot
              ? `${formatDateLong(preferredDate)} · ${preferredSlot.label}`
              : ""
          }
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-medium text-charcoal">
            How can we help? <span className="text-gold">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className={inputClass}
            placeholder="Tell us about your practice and what you're looking for..."
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-charcoal">
            Verification <span className="text-gold">*</span>
          </span>
          <div className="overflow-hidden rounded-xl border border-border bg-surface/50 p-3">
            <HCaptcha
              ref={captchaRef}
              sitekey={siteConfig.web3FormsHcaptchaSiteKey}
              reCaptchaCompat={false}
              onVerify={(token) => {
                setCaptchaToken(token);
                setCaptchaLoadError(false);
              }}
              onExpire={() => setCaptchaToken("")}
              onError={() => {
                setCaptchaToken("");
                setCaptchaLoadError(true);
              }}
            />
          </div>
          {captchaLoadError ? (
            <p className="flex items-start gap-1.5 text-xs text-red-600">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Captcha could not load. Disable ad blockers, switch network, or set
              DNS to 8.8.8.8 — your connection may be blocking hcaptcha.com.
            </p>
          ) : null}
        </div>

        {status === "error" ? (
          <p className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-[clamp(2.75rem,2.63rem+0.54vw,3rem)] items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-gradient-gold px-[clamp(1.25rem,1.08rem+0.76vw,1.625rem)] text-[clamp(0.9rem,0.86rem+0.16vw,0.975rem)] font-semibold text-white shadow-[var(--shadow-gold)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Book Consultation
              <Send className="h-4 w-4" />
            </>
          )}
        </button>

        <p className="text-xs text-gray-medium">
          By submitting, you agree to be contacted about your inquiry. We respect
          your privacy and never share your information.
        </p>
      </form>
  );
}
