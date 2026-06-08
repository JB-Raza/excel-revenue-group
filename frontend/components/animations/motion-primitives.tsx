"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
};

/** Fade + slide up on scroll into view. */
export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type SlideProps = RevealProps & { from?: "left" | "right" };

/** Slide in from left/right — used for hero content/visual on load. */
export function SlideIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
  from = "left",
}: SlideProps) {
  const reduce = useReducedMotion();
  const x = from === "left" ? -48 : 48;
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, x }}
      animate={reduce ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its FadeUp/StaggerItem children on view. */
export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.1,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  once?: boolean;
}) {
  const variants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: step, delayChildren: delay },
    },
  };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** Child item for use inside <Stagger>. */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? undefined : itemVariants}>
      {children}
    </motion.div>
  );
}

export { useInView, useRef };
