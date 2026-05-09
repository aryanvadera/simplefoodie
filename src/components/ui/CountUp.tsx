"use client";

import { useEffect, useState } from "react";

/**
 * Counts from 0 → `value` once mounted. Skipped under reduced motion.
 * Uses rAF for smoothness, with a setTimeout safety net so the value is
 * still correct in inactive tabs (or any environment where rAF doesn't
 * fire).
 */
export function CountUp({
  value,
  prefix,
  suffix,
  duration = 1400,
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const [n, setN] = useState(value);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: snap to final value when motion is reduced
      setN(value);
      return;
    }
    setN(0);
    let raf = 0;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      setN(value * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Safety net: if rAF doesn't fire (hidden tab, headless browser),
    // ensure we still land on the final value.
    const safety = setTimeout(() => setN(value), duration + 60);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
