"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X, CalendarCheck, ChevronDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/site";
import { services } from "@/lib/services";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md transition-shadow",
        scrolled ? "border-border shadow-[var(--shadow-soft)]" : "border-transparent",
      )}
    >
      <Container className="flex h-24 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {mainNav.map((item) => {
            const active = isActive(item.href);

            if (item.href === "/services") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleCloseServices}
                >
                  <Link
                    href={item.href}
                    aria-expanded={servicesOpen}
                    className={cn(
                      "relative flex items-center gap-1 text-sm font-medium transition-colors hover:text-gold",
                      active ? "text-gold" : "text-charcoal",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        servicesOpen && "rotate-180",
                      )}
                    />
                    {active ? (
                      <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gradient-gold" />
                    ) : null}
                  </Link>

                  <AnimatePresence>
                    {servicesOpen ? (
                      <motion.div
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                        transition={{ duration: 0.22, ease: EASE }}
                        className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-4"
                      >
                        <div className="overflow-hidden rounded-[var(--radius-card)] border border-border/70 bg-white shadow-[var(--shadow-card)]">
                          <div className="grid grid-cols-2 gap-1 p-3">
                            {services.map((service) => {
                              const Icon = service.icon;
                              return (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface"
                                >
                                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold-soft/30 text-gold-deep transition-colors group-hover:bg-gradient-gold group-hover:text-white">
                                    <Icon className="h-5 w-5" />
                                  </span>
                                  <span className="flex flex-col">
                                    <span className="text-sm font-semibold text-charcoal group-hover:text-gold">
                                      {service.title}
                                    </span>
                                    <span className="line-clamp-1 text-xs text-gray-medium">
                                      {service.shortDescription}
                                    </span>
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                          <Link
                            href="/services"
                            className="flex items-center justify-between border-t border-border/60 bg-surface px-6 py-4 text-sm font-semibold text-charcoal transition-colors hover:text-gold"
                          >
                            View all services
                            <ArrowUpRight className="h-4 w-4 text-gold" />
                          </Link>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-gold",
                  active ? "text-gold" : "text-charcoal",
                )}
              >
                {item.label}
                {active ? (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gradient-gold" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" size="sm">
            <CalendarCheck className="h-4 w-4" />
            Book Consultation
          </Button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-border text-charcoal lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border bg-white transition-[max-height,opacity] duration-300 ease-[var(--ease-premium)]",
          open ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="flex max-h-[560px] flex-col gap-1 overflow-y-auto py-4">
          {mainNav.map((item) => {
            if (item.href === "/services") {
              return (
                <div key={item.href} className="flex flex-col">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex-1 rounded-lg px-3 py-3 text-base font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-gold-soft/20 text-gold-deep"
                          : "text-charcoal hover:bg-surface",
                      )}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={mobileServices ? "Collapse services" : "Expand services"}
                      aria-expanded={mobileServices}
                      onClick={() => setMobileServices((v) => !v)}
                      className="grid h-11 w-11 place-items-center rounded-lg text-charcoal hover:bg-surface"
                    >
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          mobileServices && "rotate-180",
                        )}
                      />
                    </button>
                  </div>
                  <div
                    className={cn(
                      "overflow-hidden pl-3 transition-[max-height,opacity] duration-300 ease-[var(--ease-premium)]",
                      mobileServices ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm text-gray-medium transition-colors hover:bg-surface hover:text-gold"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-gold-soft/20 text-gold-deep"
                    : "text-charcoal hover:bg-surface",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Button href="/contact" className="mt-3 w-full">
            <CalendarCheck className="h-4 w-4" />
            Book Consultation
          </Button>
        </Container>
      </div>
    </header>
  );
}
