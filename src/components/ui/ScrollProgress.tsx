"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Hairline progress bar at the very top of the viewport.
 * Sits above the header so it reads as a true scroll indicator.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 220,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 inset-x-0 z-[70] h-px bg-gradient-to-r from-honey via-forest to-honey-2"
    />
  );
}
