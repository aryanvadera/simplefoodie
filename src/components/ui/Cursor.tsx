"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Editorial custom cursor — only on devices with a fine pointer.
 * Two layered dots: a precise inner dot and a soft outer ring that
 * grows / changes label when hovering an interactive surface.
 *
 * Targets opt in via `data-cursor="grow" | "view" | "order" | "tap"`.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 24, stiffness: 320, mass: 0.45 });
  const sy = useSpring(y, { damping: 24, stiffness: 320, mass: 0.45 });

  const labelX = useSpring(x, { damping: 22, stiffness: 220, mass: 0.6 });
  const labelY = useSpring(y, { damping: 22, stiffness: 220, mass: 0.6 });

  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState<null | "grow" | "view" | "order" | "tap">(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setEnabled(mq.matches && !reduce);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const trigger = t.closest("[data-cursor]") as HTMLElement | null;
      if (trigger) {
        setHover((trigger.dataset.cursor as typeof hover) ?? "grow");
      } else if (
        t.closest("a, button, input, textarea, select, [role=button]")
      ) {
        setHover("tap");
      } else {
        setHover(null);
      }
    };

    const onLeave = () => setHover(null);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const label =
    hover === "view" ? "View"
    : hover === "order" ? "Order"
    : hover === "grow" ? "Open"
    : null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      style={{ contain: "strict" }}
    >
      {/* outer ring */}
      <motion.div
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hover === "grow" || hover === "view" || hover === "order" ? 64 : hover === "tap" ? 40 : 28,
          height: hover === "grow" || hover === "view" || hover === "order" ? 64 : hover === "tap" ? 40 : 28,
          opacity: 1,
          backgroundColor: hover === "view" || hover === "order"
            ? "rgba(31, 58, 46, 0.95)"
            : "rgba(20, 18, 14, 0)",
          borderColor: "rgba(20, 18, 14, 0.35)",
        }}
        transition={{ type: "spring", damping: 22, stiffness: 280, mass: 0.5 }}
        className="absolute rounded-full border mix-blend-multiply"
      />
      {/* inner dot */}
      <motion.div
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: hover === "view" || hover === "order" ? 0 : 1,
          scale: hover === "tap" ? 1.2 : 1,
        }}
        transition={{ duration: 0.18 }}
        className="absolute size-1.5 rounded-full bg-ink"
      />
      {/* label */}
      <motion.div
        style={{ x: labelX, y: labelY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: label ? 1 : 0,
          scale: label ? 1 : 0.7,
        }}
        transition={{ duration: 0.22 }}
        className="absolute font-display italic text-[0.7rem] tracking-tight text-linen pointer-events-none"
      >
        {label}
      </motion.div>
    </div>
  );
}
