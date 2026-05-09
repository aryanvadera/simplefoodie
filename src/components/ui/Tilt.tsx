"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/cn";
import { useFinePointer } from "@/lib/usePointer";

/**
 * Subtle 3D card tilt that follows the cursor. Adds a spotlight glow that
 * tracks the pointer for an extra premium feel. Coarse pointer / reduced
 * motion users get the static element.
 */
export function Tilt({
  children,
  className,
  max = 6,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  /** Max tilt angle in degrees. */
  max?: number;
  glow?: boolean;
}) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const inactive = reduce || !fine;
  const ref = useRef<HTMLDivElement | null>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    damping: 20,
    stiffness: 220,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    damping: 20,
    stiffness: 220,
  });

  const glowX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glowOpacity = useMotionValue(0);
  const glowBg = useMotionTemplate`radial-gradient(320px circle at ${glowX} ${glowY}, color-mix(in srgb, var(--honey) 30%, transparent) 0%, transparent 60%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (inactive) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    glowOpacity.set(1);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
    glowOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={
        inactive
          ? undefined
          : {
              rotateX: rx,
              rotateY: ry,
              transformPerspective: 1100,
              transformStyle: "preserve-3d",
            }
      }
      className={cn("relative", className)}
    >
      {children}
      {glow && !inactive && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
          style={{ background: glowBg, opacity: glowOpacity, transition: "opacity 0.4s" }}
        />
      )}
    </motion.div>
  );
}
