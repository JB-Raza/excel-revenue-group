"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { photoObjectPosition } from "@/lib/images";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Aspect = "square" | "4/5" | "3/4";

const aspectClass: Record<Aspect, string> = {
  square: "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
};

type RoundedVisualProps = {
  src: string;
  alt: string;
  aspect?: Aspect;
  fit?: "cover" | "contain";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

function isPhotoSrc(src: string) {
  return /\.(jpe?g|webp)$/i.test(src);
}

/** Soft gradient frame + rounded corners + scroll/hover motion for photos and PNGs. */
export function RoundedVisual({
  src,
  alt,
  aspect = "4/5",
  fit,
  className,
  imageClassName,
  priority,
  sizes = "(max-width: 1024px) 100vw, 28rem",
}: RoundedVisualProps) {
  const reduce = useReducedMotion();
  const photo = isPhotoSrc(src);
  const objectFit = fit ?? (photo ? "cover" : "contain");

  return (
    <motion.div
      className={cn(
        "relative w-full overflow-hidden rounded-3xl",
        "bg-gradient-to-br from-gold-soft/45 via-surface to-gold-soft/20",
        "ring-1 ring-gold/15 shadow-[var(--shadow-soft)]",
        className,
      )}
      initial={reduce ? false : { opacity: 0, y: 20, scale: 0.97 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.65, ease: EASE }}
      whileHover={reduce ? undefined : { y: -4, scale: 1.015 }}
    >
      <div className={cn("relative", aspectClass[aspect])}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            objectFit === "cover"
              ? cn("object-cover", photoObjectPosition(src))
              : "object-contain p-5 sm:p-6",
            "transition-transform duration-500 ease-[var(--ease-premium)] motion-safe:group-hover:scale-[1.03]",
            imageClassName,
          )}
        />
      </div>
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-gold/20 blur-2xl"
        aria-hidden
      />
    </motion.div>
  );
}
