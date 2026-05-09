"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Adds a subtle pointer-tracked spotlight to dark sections.
 * The light blends with the existing colour scheme rather than fighting it.
 */
export function Spotlight({
  children,
  className,
  color = "rgba(200,169,97,0.18)",
  size = 520,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  function onLeave() {
    x.set(-9999);
    y.set(-9999);
  }

  const bg = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 70%)`;

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("relative", className)}
    >
      {children}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: bg }}
        />
      )}
    </div>
  );
}
