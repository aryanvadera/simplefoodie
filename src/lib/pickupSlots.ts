/**
 * Pickup time-slot generator.
 * Hours: Mon–Fri 7:00–16:00, Sat 8:00–15:00, Sun closed.
 * Slots are 15 minutes apart, starting from now + 15 min lead time.
 * Returns up to two days of slots so a customer late at night can still
 * order for the morning.
 */

type Hours = { open: number; close: number } | null;

function hoursForDay(day: number): Hours {
  // 0 = Sunday
  if (day === 0) return null;
  if (day === 6) return { open: 8 * 60, close: 15 * 60 };
  return { open: 7 * 60, close: 16 * 60 };
}

const LEAD_MIN = 15;
const STEP_MIN = 15;

export type PickupSlot = {
  /** ISO date string in local time without seconds, e.g. 2026-05-09T11:30. */
  value: string;
  /** Friendly label for the option, e.g. "Today · 11:30 am" */
  label: string;
  /** Group label for headings: "Today" / "Tomorrow" / "Mon 11 May". */
  dayLabel: string;
  /** "11:30 am" — the time portion only. */
  timeLabel: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatTime(minutes: number): string {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const period = h24 >= 12 ? "pm" : "am";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${pad(m)} ${period}`;
}

export function generatePickupSlots(now: Date = new Date()): {
  asapMinutes: number | null;
  slots: PickupSlot[];
} {
  const slots: PickupSlot[] = [];

  // Day 0 = today, Day 1 = tomorrow.
  for (let d = 0; d < 2; d++) {
    const date = new Date(now);
    date.setDate(date.getDate() + d);
    const day = date.getDay();
    const hrs = hoursForDay(day);
    if (!hrs) continue;

    // Round up to the next slot, with the lead time.
    let firstMinute = hrs.open;
    if (d === 0) {
      const cur = now.getHours() * 60 + now.getMinutes() + LEAD_MIN;
      const rounded = Math.ceil(cur / STEP_MIN) * STEP_MIN;
      firstMinute = Math.max(firstMinute, rounded);
    }

    if (firstMinute >= hrs.close) continue;

    let dayLabel: string;
    if (d === 0) dayLabel = "Today";
    else if (d === 1) dayLabel = "Tomorrow";
    else
      dayLabel = date.toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
      });

    for (let m = firstMinute; m < hrs.close; m += STEP_MIN) {
      const h = Math.floor(m / 60);
      const mm = m % 60;
      const value =
        `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
        `T${pad(h)}:${pad(mm)}`;
      const timeLabel = formatTime(m);
      slots.push({
        value,
        timeLabel,
        dayLabel,
        label: `${dayLabel} · ${timeLabel}`,
      });
    }
  }

  // ASAP: only valid if the cafe is open *right now*
  let asapMinutes: number | null = null;
  const today = hoursForDay(now.getDay());
  if (today) {
    const cur = now.getHours() * 60 + now.getMinutes();
    if (cur >= today.open && cur < today.close) {
      asapMinutes = cur + LEAD_MIN;
      if (asapMinutes >= today.close) asapMinutes = null;
    }
  }

  return { asapMinutes, slots };
}
