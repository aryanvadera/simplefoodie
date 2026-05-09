"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { useFinePointer } from "@/lib/usePointer";

/**
 * Wraps a single child element so it gently pulls toward the cursor
 * within a comfort radius. Skipped on reduced motion / coarse pointers.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  radius = 90,
}: {
  children: ReactNode;
  className?: string;
  /** 0–1, how far the element follows the cursor. */
  strength?: number;
  /** Activation radius in px (from element centre). */
  radius?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const inactive = reduce || !fine;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 240, mass: 0.4 });
  const sy = useSpring(y, { damping: 18, stiffness: 240, mass: 0.4 });

  function onMove(e: React.PointerEvent<HTMLSpanElement>) {
    if (inactive) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy);
    const r = radius + Math.max(rect.width, rect.height) / 2;
    if (dist > r) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={cn(className)}
    >
      {children}
    </motion.span>
  );
}
