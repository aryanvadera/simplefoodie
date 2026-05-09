"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the device's primary pointer is fine (mouse/trackpad).
 * Stays in sync with media-query changes. Defaults to false on the server
 * so touch-only effects render correctly without hydration mismatches.
 */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return fine;
}
