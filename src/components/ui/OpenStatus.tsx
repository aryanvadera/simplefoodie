"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

type Status = { open: boolean; label: string };

/**
 * Live "Open Now" / "Closed" status against the placeholder hours in site
 * config (Mon–Fri 7–4, Sat 8–3, Sun closed). Wired via useSyncExternalStore.
 *
 * `getSnapshot` MUST return the same reference between calls until the value
 * actually changes — otherwise React loops indefinitely. We cache by a
 * minute-resolution key, since status only ever changes minute-to-minute.
 */
function computeStatus(now: Date): Status {
  const day = now.getDay(); // 0 Sun .. 6 Sat
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (day === 0) return { open: false, label: "Closed today · opens Mon 7:00am" };

  if (day === 6) {
    if (minutes >= 8 * 60 && minutes < 15 * 60)
      return { open: true, label: "Open now · until 3:00pm" };
    return {
      open: false,
      label: minutes < 8 * 60 ? "Opens 8:00am" : "Closed · opens Mon 7:00am",
    };
  }

  if (minutes >= 7 * 60 && minutes < 16 * 60)
    return { open: true, label: "Open now · until 4:00pm" };
  return {
    open: false,
    label: minutes < 7 * 60 ? "Opens 7:00am" : "Closed · opens 7:00am tomorrow",
  };
}

let cache: { key: string; value: Status } | null = null;

function getSnapshot(): Status {
  const now = new Date();
  // Bucket by day+hour+minute — re-evaluates only when minute changes.
  const key = `${now.getDay()}-${now.getHours()}-${now.getMinutes()}`;
  if (!cache || cache.key !== key) {
    cache = { key, value: computeStatus(now) };
  }
  return cache.value;
}

function subscribe(onChange: () => void) {
  const id = setInterval(() => {
    // Invalidate so the next getSnapshot recomputes, then notify React.
    cache = null;
    onChange();
  }, 30_000);
  return () => clearInterval(id);
}

const getServerSnapshot = (): Status | null => null;

export function OpenStatus({ className }: { className?: string }) {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!status) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 text-xs text-ink-3 tracking-wide",
          className,
        )}
      >
        <span className="size-2 rounded-full bg-ink-4 animate-pulse" />
        <span>Checking hours…</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs tracking-wide",
        status.open ? "text-forest" : "text-ink-3",
        className,
      )}
    >
      <span
        className={cn(
          "size-2 rounded-full relative",
          status.open ? "bg-success" : "bg-ink-4",
        )}
      >
        {status.open && (
          <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-50" />
        )}
      </span>
      <span className="font-medium">{status.label}</span>
    </span>
  );
}
