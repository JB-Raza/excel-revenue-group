"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X, CalendarCheck, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, type NavItem } from "@/lib/site";
import { services } from "@/lib/services";
import { specialties } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import {
  NavDropdownItem,
  NavDropdownPanel,
  navDropdownWidthClass,
} from "./nav-dropdown";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<NavItem["dropdown"] | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<NavItem["dropdown"] | null>(null);
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

  const showDropdown = (key: NonNullable<NavItem["dropdown"]>) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(key);
  };

  const scheduleHideDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md transition-shadow",
        scrolled ? "border-border shadow-[var(--shadow-soft)]" : "border-transparent",
      )}
    >
      <Container className="flex h-28 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Main">
          {mainNav.map((item) => {
            const active = isActive(item.href);

            if (item.dropdown) {
              const isOpen = openDropdown === item.dropdown;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => showDropdown(item.dropdown!)}
                  onMouseLeave={scheduleHideDropdown}
                >
                  <Link
                    href={item.href}
                    aria-expanded={isOpen}
                    className={cn(
                      "relative flex items-center gap-1 text-[0.9375rem] font-medium transition-colors hover:text-gold",
                      active ? "text-gold" : "text-charcoal",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                    />
                    {active ? (
                      <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gradient-gold" />
                    ) : null}
                  </Link>

                  <AnimatePresence>
                    {isOpen ? (
                      <motion.div
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                        transition={{ duration: 0.22, ease: EASE }}
                        className={cn(
                          "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4",
                          navDropdownWidthClass,
                        )}
                      >
                        {item.dropdown === "services" ? (
                          <NavDropdownPanel
                            footerHref="/services"
                            footerLabel="View all services"
                          >
                            {services.map((service) => (
                              <NavDropdownItem
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                label={service.title}
                                description={service.shortDescription}
                                icon={service.icon}
                              />
                            ))}
                          </NavDropdownPanel>
                        ) : (
                          <NavDropdownPanel
                            footerHref="/specialties"
                            footerLabel="View all specialties"
                          >
                            {specialties.map((specialty) => (
                              <NavDropdownItem
                                key={specialty.slug}
                                href={`/specialties#${specialty.slug}`}
                                label={specialty.name}
                                icon={specialty.icon}
                                image={specialty.image}
                              />
                            ))}
                          </NavDropdownPanel>
                        )}
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
                  "relative text-[0.9375rem] font-medium transition-colors hover:text-gold",
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

      <div
        className={cn(
          "absolute inset-x-0 top-full lg:hidden overflow-hidden border-border bg-white shadow-[var(--shadow-card)] transition-[max-height,opacity] duration-300 ease-[var(--ease-premium)]",
          open ? "max-h-[720px] border-b border-t opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="flex max-h-[640px] flex-col gap-1 overflow-y-auto py-4">
          {mainNav.map((item) => {
            if (item.dropdown) {
              const expanded = mobileExpanded === item.dropdown;
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
                      aria-label={expanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
                      aria-expanded={expanded}
                      onClick={() =>
                        setMobileExpanded((v) => (v === item.dropdown ? null : item.dropdown!))
                      }
                      className="grid h-11 w-11 place-items-center rounded-lg text-charcoal hover:bg-surface"
                    >
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          expanded && "rotate-180",
                        )}
                      />
                    </button>
                  </div>
                  <div
                    className={cn(
                      "overflow-hidden pl-3 transition-[max-height,opacity] duration-300 ease-[var(--ease-premium)]",
                      expanded ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    {item.dropdown === "services"
                      ? services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2.5 text-sm text-gray-medium transition-colors hover:bg-surface hover:text-gold"
                          >
                            {service.title}
                          </Link>
                        ))
                      : specialties.map((specialty) => (
                          <Link
                            key={specialty.slug}
                            href={`/specialties#${specialty.slug}`}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2.5 text-sm text-gray-medium transition-colors hover:bg-surface hover:text-gold"
                          >
                            {specialty.name}
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
