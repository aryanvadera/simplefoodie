"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Lock,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/modifiers";
import { generatePickupSlots } from "@/lib/pickupSlots";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type PickupChoice =
  | { kind: "asap" }
  | { kind: "slot"; value: string; label: string };

type Customer = {
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const initialCustomer: Customer = { name: "", phone: "", email: "", notes: "" };

export function CheckoutClient() {
  const { detailed, subtotal, count, updateQty, removeLine, clear } = useCart();
  const [customer, setCustomer] = useState<Customer>(initialCustomer);
  const [pickup, setPickup] = useState<PickupChoice | null>(null);
  const [submitted, setSubmitted] = useState<{
    pickup: PickupChoice;
    customer: Customer;
    items: typeof detailed;
    subtotal: number;
  } | null>(null);

  // Generate slots client-side (uses Date.now() — must run after mount).
  const [slotData, setSlotData] = useState<ReturnType<typeof generatePickupSlots> | null>(
    null,
  );
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- slots depend on Date.now(), must run client-side after mount
    setSlotData(generatePickupSlots(new Date()));
  }, []);

  // Auto-pick ASAP when slots become available
  useEffect(() => {
    if (!pickup && slotData) {
      if (slotData.asapMinutes !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing default selection from async-loaded data
        setPickup({ kind: "asap" });
      } else if (slotData.slots[0]) {
        setPickup({
          kind: "slot",
          value: slotData.slots[0].value,
          label: slotData.slots[0].label,
        });
      }
    }
  }, [slotData, pickup]);

  const slotsByDay = useMemo(() => {
    const map = new Map<string, typeof slotData extends null ? [] : NonNullable<typeof slotData>["slots"]>();
    if (!slotData) return map;
    for (const s of slotData.slots) {
      const list = map.get(s.dayLabel) ?? [];
      list.push(s);
      map.set(s.dayLabel, list);
    }
    return map;
  }, [slotData]);

  const ready =
    detailed.length > 0 &&
    customer.name.trim().length > 1 &&
    customer.phone.trim().length >= 8 &&
    !!pickup;

  function update<K extends keyof Customer>(k: K, v: Customer[K]) {
    setCustomer((s) => ({ ...s, [k]: v }));
  }

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || !pickup) return;
    setSubmitted({ pickup, customer, items: detailed, subtotal });
    clear();
  }

  if (submitted) {
    return <Confirmation order={submitted} />;
  }

  return (
    <div className="container-x pt-32 md:pt-40 pb-24 md:pb-32">
      <Reveal>
        <Link
          href="/menu"
          className="group/cta inline-flex items-center gap-2 text-sm font-medium text-ink-3 hover:text-ink transition"
        >
          <ArrowLeft className="size-4 transition-transform group-hover/cta:-translate-x-0.5" />
          <span>Back to menu</span>
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight">
          Your <em className="not-italic text-forest">order.</em>
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-4 max-w-xl text-base md:text-lg text-ink-2 leading-relaxed">
          Review your items, pick a collection time, and we&rsquo;ll have it
          ready at the counter.
        </p>
      </Reveal>

      {detailed.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-12 grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left column — items + form */}
          <form onSubmit={placeOrder} className="lg:col-span-7 space-y-10">
            {/* Items */}
            <section>
              <SectionTitle index="01" title="Your items" count={count} />
              <ul className="mt-6 space-y-4">
                {detailed.map(({ line, menuItem, lineTotal, summary }) => (
                  <li
                    key={line.id}
                    className="flex gap-4 bg-paper rounded-2xl border border-ink/8 p-3 md:p-4"
                  >
                    <div className="size-20 md:size-24 shrink-0 rounded-xl overflow-hidden">
                      <ImageFrame
                        src={
                          menuItem?.image
                            ? `/images/menu/${menuItem.image}`
                            : undefined
                        }
                        caption={line.itemName}
                        alt={line.itemName}
                        rounded="none"
                        className="size-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-lg md:text-xl text-ink leading-tight">
                          {line.itemName}
                        </h3>
                        <span className="font-mono text-sm text-forest font-medium whitespace-nowrap tabular-nums">
                          {formatPrice(lineTotal)}
                        </span>
                      </div>
                      {summary && (
                        <p className="mt-1 text-xs text-ink-3 leading-snug">
                          {summary}
                        </p>
                      )}
                      <div className="mt-auto pt-3 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-bone p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQty(line.id, line.qty - 1)}
                            aria-label="Decrease quantity"
                            className="inline-grid size-7 place-items-center rounded-full text-ink-2 hover:bg-ink/5"
                          >
                            <Minus className="size-3" strokeWidth={2.25} />
                          </button>
                          <span className="font-mono text-xs tabular-nums w-5 text-center">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(line.id, line.qty + 1)}
                            aria-label="Increase quantity"
                            className="inline-grid size-7 place-items-center rounded-full text-ink-2 hover:bg-ink/5"
                          >
                            <Plus className="size-3" strokeWidth={2.25} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLine(line.id)}
                          aria-label="Remove from order"
                          className="inline-flex items-center gap-1.5 text-xs text-ink-3 hover:text-error transition"
                        >
                          <Trash2 className="size-3.5" strokeWidth={1.75} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-2 transition"
                >
                  <Plus className="size-3.5" strokeWidth={2.25} />
                  <span>Add another item</span>
                </Link>
              </div>
            </section>

            {/* Pickup */}
            <section>
              <SectionTitle
                index="02"
                title="Pickup time"
                hint="Free in-store collection"
              />
              <div className="mt-6 bg-paper border border-ink/10 rounded-2xl p-5 md:p-6">
                <div className="flex items-start gap-3 pb-5 border-b border-ink/8">
                  <span className="mt-0.5 inline-grid size-9 place-items-center rounded-full bg-forest text-linen">
                    <MapPin className="size-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-display text-lg text-ink leading-tight">
                      Pick up at The Simple Foodie
                    </p>
                    <p className="text-sm text-ink-3 mt-0.5">
                      {site.address.line}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <p className="text-sm font-medium text-ink flex items-center gap-2">
                    <Clock className="size-4 text-forest" strokeWidth={1.75} />
                    <span>When?</span>
                  </p>

                  {!slotData ? (
                    <p className="text-sm text-ink-3 italic">
                      Loading available times…
                    </p>
                  ) : slotData.slots.length === 0 ? (
                    <p className="text-sm text-ink-2">
                      We&rsquo;re closed for now. Check back during opening
                      hours, or give us a call at{" "}
                      <a
                        href={site.contact.phoneHref}
                        className="text-forest underline"
                      >
                        {site.contact.phone}
                      </a>
                      .
                    </p>
                  ) : (
                    <>
                      {/* ASAP option */}
                      {slotData.asapMinutes !== null && (
                        <button
                          type="button"
                          onClick={() => setPickup({ kind: "asap" })}
                          className={cn(
                            "w-full text-left rounded-xl border p-4 transition flex items-center justify-between gap-4",
                            pickup?.kind === "asap"
                              ? "border-forest bg-forest/5"
                              : "border-ink/10 bg-bone hover:border-ink/30",
                          )}
                          aria-pressed={pickup?.kind === "asap"}
                        >
                          <div>
                            <p className="font-display text-lg text-ink leading-tight">
                              ASAP — about 15 minutes
                            </p>
                            <p className="text-xs text-ink-3 mt-0.5">
                              Ready as soon as we can
                            </p>
                          </div>
                          {pickup?.kind === "asap" && (
                            <CheckCircle2
                              className="size-5 text-forest shrink-0"
                              strokeWidth={2}
                            />
                          )}
                        </button>
                      )}

                      {/* Day-grouped slots */}
                      {Array.from(slotsByDay.entries()).map(([day, slots]) => (
                        <div key={day} className="space-y-2">
                          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-3 font-medium">
                            {day}
                          </p>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {slots.map((s) => {
                              const active =
                                pickup?.kind === "slot" &&
                                pickup.value === s.value;
                              return (
                                <button
                                  key={s.value}
                                  type="button"
                                  onClick={() =>
                                    setPickup({
                                      kind: "slot",
                                      value: s.value,
                                      label: s.label,
                                    })
                                  }
                                  aria-pressed={active}
                                  className={cn(
                                    "rounded-full border px-3 py-2 text-xs font-medium transition tabular-nums",
                                    active
                                      ? "border-forest bg-forest text-linen"
                                      : "border-ink/10 bg-paper text-ink-2 hover:border-ink/30",
                                  )}
                                >
                                  {s.timeLabel}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Customer details */}
            <section>
              <SectionTitle
                index="03"
                title="Your details"
                hint="So we can let you know it's ready"
              />
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <Field label="Your name" required>
                  <input
                    required
                    type="text"
                    value={customer.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Jane Smith"
                    className={inputCls}
                    autoComplete="name"
                  />
                </Field>
                <Field label="Phone" required>
                  <input
                    required
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="04xx xxx xxx"
                    className={inputCls}
                    autoComplete="tel"
                  />
                </Field>
                <Field label="Email" className="sm:col-span-2">
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="jane@example.com"
                    className={inputCls}
                    autoComplete="email"
                  />
                </Field>
                <Field label="Notes for the kitchen" className="sm:col-span-2">
                  <textarea
                    rows={3}
                    value={customer.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Allergies, preferences, anything we should know."
                    className={cn(inputCls, "resize-none")}
                  />
                </Field>
              </div>
            </section>
          </form>

          {/* Right column — sticky summary */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 bg-bone rounded-3xl border border-ink/8 p-6 md:p-8">
              <p className="eyebrow text-forest/70 mb-4">Order summary</p>
              <ul className="space-y-3 text-sm border-b border-ink/8 pb-5">
                {detailed.map(({ line, lineTotal }) => (
                  <li key={line.id} className="flex justify-between gap-3">
                    <span className="text-ink-2">
                      <span className="font-mono text-ink-3 mr-2 tabular-nums">
                        {line.qty}×
                      </span>
                      {line.itemName}
                    </span>
                    <span className="font-mono text-ink tabular-nums">
                      {formatPrice(lineTotal)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="mt-5 space-y-2 text-sm">
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row label="Pickup" value="Free" />
              </dl>

              <div className="mt-5 pt-5 border-t border-ink/8 flex items-baseline justify-between">
                <span className="font-display text-xl text-ink">Total</span>
                <span className="font-display text-3xl text-ink tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-honey/15 border border-honey/40 p-4 flex items-start gap-3">
                <Lock
                  className="size-4 text-honey-2 mt-0.5 shrink-0"
                  strokeWidth={2}
                />
                <div className="text-xs text-ink-2 leading-relaxed">
                  <p className="font-medium text-ink">Pay at the counter.</p>
                  <p className="mt-0.5">
                    Online payment is coming soon. For now, we&rsquo;ll have your
                    order ready and you settle up on collection.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                onClick={placeOrder}
                disabled={!ready}
                className={cn(
                  "group/cta mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide transition shadow-[0_8px_24px_-12px_rgba(20,18,14,0.45)]",
                  ready
                    ? "bg-forest text-linen hover:bg-forest-2"
                    : "bg-ink/10 text-ink-3 cursor-not-allowed",
                )}
              >
                <span>Place pickup order</span>
                <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
              </button>

              <button
                type="button"
                disabled
                aria-disabled
                title="Online payment coming soon"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide border border-ink/15 text-ink-3 cursor-not-allowed bg-paper/50"
              >
                <Lock className="size-3.5" strokeWidth={1.75} />
                <span>Pay now (coming soon)</span>
              </button>

              <a
                href={site.contact.phoneHref}
                className="mt-5 inline-flex items-center gap-2 text-xs text-ink-3 hover:text-ink transition"
              >
                <Phone className="size-3.5" strokeWidth={2} />
                <span>Need to change something? Call {site.contact.phone}</span>
              </a>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   Bits
   ========================================================= */

const inputCls =
  "w-full rounded-xl bg-paper border border-ink/10 px-4 py-3 text-base text-ink placeholder:text-ink-4 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition";

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-honey-2">*</span>}
      </span>
      <span className="block mt-2">{children}</span>
    </label>
  );
}

function SectionTitle({
  index,
  title,
  hint,
  count,
}: {
  index: string;
  title: string;
  hint?: string;
  count?: number;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[0.6rem] tracking-[0.32em] uppercase text-forest font-medium">
          {index}
        </span>
        <h2 className="font-display text-2xl md:text-3xl text-ink">{title}</h2>
        {count !== undefined && (
          <span className="text-xs text-ink-3">
            ({count} {count === 1 ? "item" : "items"})
          </span>
        )}
      </div>
      {hint && <span className="text-xs text-ink-3">{hint}</span>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-ink-3">{label}</dt>
      <dd className="text-ink font-mono tabular-nums">{value}</dd>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-16 max-w-md text-center mx-auto">
      <div className="inline-grid size-16 place-items-center rounded-full bg-forest/10 text-forest mb-5 mx-auto">
        <ShoppingBag className="size-7" strokeWidth={1.5} />
      </div>
      <p className="font-display text-3xl text-ink leading-tight">
        Your order is empty.
      </p>
      <p className="mt-3 text-sm text-ink-2 leading-relaxed">
        Add a coffee, a sandwich, or whatever&rsquo;s on the counter today.
      </p>
      <Link
        href="/menu"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest text-linen px-6 py-3 text-sm font-medium hover:bg-forest-2 transition"
      >
        <span>Browse the menu</span>
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

type ConfirmationOrder = {
  pickup: PickupChoice;
  customer: Customer;
  items: ReturnType<typeof useCart>["detailed"];
  subtotal: number;
};

function Confirmation({ order }: { order: ConfirmationOrder }) {
  const [ref, setRef] = useState("TSF-…");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- generate ref once on mount; deliberately client-only
    setRef(`TSF-${Math.floor(Math.random() * 9000 + 1000)}`);
  }, []);

  return (
    <div className="container-x pt-32 md:pt-40 pb-24 md:pb-32">
      <AnimatePresence>
        <motion.div
          key="confirm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="inline-grid size-16 place-items-center rounded-full bg-forest/10 text-forest mb-6 mx-auto">
              <CheckCircle2 className="size-8" strokeWidth={1.5} />
            </div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight">
              Order in.{" "}
              <em className="not-italic text-forest">See you soon.</em>
            </h1>
            <p className="mt-5 text-base md:text-lg text-ink-2 leading-relaxed max-w-md mx-auto">
              Thanks {order.customer.name.split(" ")[0]}. We&rsquo;ll have your
              order ready{" "}
              <span className="text-ink font-medium">
                {order.pickup.kind === "asap"
                  ? "in about 15 minutes"
                  : `at ${formatPickupLabel(order.pickup.label)}`}
              </span>
              .
            </p>
          </div>

          <div className="mt-12 bg-paper border border-ink/10 rounded-3xl p-6 md:p-8">
            <div className="flex items-baseline justify-between gap-3 pb-5 border-b border-ink/8">
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.32em] uppercase text-ink-3 font-medium">
                  Order ref
                </p>
                <p className="mt-1 font-display text-2xl text-ink">{ref}</p>
              </div>
              <span className="text-xs text-ink-3">Pickup · pay in store</span>
            </div>

            <ul className="mt-5 space-y-2 text-sm">
              {order.items.map(({ line, lineTotal }) => (
                <li key={line.id} className="flex justify-between gap-3">
                  <span className="text-ink-2">
                    <span className="font-mono text-ink-3 mr-2 tabular-nums">
                      {line.qty}×
                    </span>
                    {line.itemName}
                  </span>
                  <span className="font-mono text-ink tabular-nums">
                    {formatPrice(lineTotal)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-5 border-t border-ink/8 flex justify-between items-baseline">
              <span className="font-display text-lg text-ink">Total to pay</span>
              <span className="font-display text-2xl text-ink tabular-nums">
                {formatPrice(order.subtotal)}
              </span>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3 text-xs text-ink-3">
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-ink-3 font-medium">
                  Pickup location
                </p>
                <p className="mt-1 text-ink">{site.address.line}</p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-ink-3 font-medium">
                  Contact
                </p>
                <p className="mt-1 text-ink">{order.customer.phone}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/30 text-forest px-6 py-3 text-sm font-medium hover:bg-forest hover:text-linen transition"
            >
              <span>Order again</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-ink-3 hover:text-ink px-6 py-3 transition"
            >
              <span>Back home</span>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function formatPickupLabel(label: string) {
  // "Today · 11:30 am" → "11:30 am today"
  const [day, time] = label.split(" · ");
  if (!time) return label;
  return `${time} ${day.toLowerCase()}`;
}
