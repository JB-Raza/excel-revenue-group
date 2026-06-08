"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-gray-medium/70 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const keyConfigured =
    siteConfig.web3FormsKey && siteConfig.web3FormsKey !== "YOUR_WEB3FORMS_ACCESS_KEY";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again or contact us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-gold/30 bg-gold-soft/10 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold" />
        <h3 className="font-heading text-xl font-bold text-charcoal">
          Thank you — message sent!
        </h3>
        <p className="text-sm text-gray-medium">
          Our team will get back to you shortly. For urgent matters, call us at{" "}
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
      {/* Web3Forms access key */}
      <input type="hidden" name="access_key" value={siteConfig.web3FormsKey} />
      <input
        type="hidden"
        name="subject"
        value={`New consultation request — ${siteConfig.name}`}
      />
      <input type="hidden" name="from_name" value={siteConfig.name} />
      {/* Honeypot anti-spam field */}
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
          Setup note: add your Web3Forms access key in <code>lib/site.ts</code> to
          enable form delivery.
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

      {status === "error" ? (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-gradient-gold px-6 font-semibold text-white shadow-[var(--shadow-gold)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
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
