"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type SelectProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Marks the trigger as invalid (e.g. failed required validation). */
  invalid?: boolean;
  id?: string;
  /** Connects an external <label> via aria-labelledby. */
  labelId?: string;
  className?: string;
};

/** Accessible custom listbox with an animated dropdown panel.
 *  Mirrors the native <select> behavior (keyboard, click-outside, Escape)
 *  while allowing fully custom styling and motion. */
export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option…",
  invalid = false,
  id,
  labelId,
  className,
}: SelectProps) {
  const reactId = useId();
  const listboxId = id ?? reactId;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const reduce = useReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const selectedIndex = options.indexOf(value);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [open, selectedIndex]);

  useEffect(() => {
    if (open && activeIndex >= 0) {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [open, activeIndex]);

  function commit(index: number) {
    const next = options[index];
    if (next !== undefined) {
      onChange(next);
      setOpen(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) {
          setOpen(true);
        } else {
          setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open && activeIndex >= 0) commit(activeIndex);
        else setOpen(true);
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${listboxId}-listbox`}
        aria-labelledby={labelId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-xl border bg-white px-4 py-3 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gold/30",
          open ? "border-gold ring-2 ring-gold/30" : "border-border",
          invalid && !value ? "border-red-400 ring-2 ring-red-100" : "",
          value ? "text-charcoal" : "text-gray-medium/70",
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-gray-medium transition-transform duration-300",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={`${listboxId}-listbox`}
            role="listbox"
            aria-activedescendant={
              activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined
            }
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 origin-top overflow-y-auto rounded-xl border border-border/70 bg-white p-1.5 shadow-[var(--shadow-card)]"
          >
            {options.map((option, i) => {
              const selected = option === value;
              const active = i === activeIndex;
              return (
                <li
                  key={option}
                  id={`${listboxId}-opt-${i}`}
                  ref={(el) => {
                    optionRefs.current[i] = el;
                  }}
                  role="option"
                  aria-selected={selected}
                  onClick={() => commit(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    active ? "bg-surface text-charcoal" : "text-gray-medium",
                    selected && "font-semibold text-charcoal",
                  )}
                >
                  <span className="truncate">{option}</span>
                  {selected ? (
                    <Check className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                  ) : null}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
