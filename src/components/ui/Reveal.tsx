"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Distance the element travels in (px). */
  y?: number;
  /** Stagger delay (ms). */
  delay?: number;
  /** Duration (ms). */
  duration?: number;
  /** When `once`, triggers a single time when entering the viewport. */
  once?: boolean;
  as?: "div" | "span" | "li";
};

/**
 * Scroll-triggered reveal — fade + lift, with reduced-motion respect.
 * Uses Motion's whileInView so it's lazy and cheap.
 */
export function Reveal({
  children,
  className,
  y = 24,
  delay = 0,
  duration = 800,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Tag>
  );
}
