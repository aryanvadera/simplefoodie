"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/modifiers";

export function CartDrawer() {
  const {
    drawerOpen,
    closeDrawer,
    detailed,
    subtotal,
    count,
    updateQty,
    removeLine,
  } = useCart();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div
          className="fixed inset-0 z-[75]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={closeDrawer}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 w-full max-w-md bg-linen flex flex-col shadow-[var(--shadow-lift)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
              <div className="flex items-center gap-3">
                <span className="inline-grid size-9 place-items-center rounded-full bg-forest text-linen">
                  <ShoppingBag className="size-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-xl text-ink leading-none">
                    Your order
                  </p>
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-3 font-medium mt-1">
                    {count === 0
                      ? "Empty"
                      : `${count} ${count === 1 ? "item" : "items"}`}
                  </p>
                </div>
              </div>
              <button
                onClick={closeDrawer}
                aria-label="Close cart"
                className="inline-grid size-10 place-items-center rounded-full bg-ink/5 hover:bg-ink/10 transition"
              >
                <X className="size-4" strokeWidth={1.75} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {detailed.length === 0 ? (
                <Empty />
              ) : (
                <ul className="space-y-5">
                  {detailed.map(({ line, menuItem, lineTotal, summary }) => (
                    <li key={line.id} className="flex gap-4">
                      <div className="size-20 shrink-0 rounded-xl overflow-hidden">
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
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="font-display text-base text-ink leading-tight truncate">
                            {line.itemName}
                          </h3>
                          <span className="font-mono text-xs text-forest font-medium whitespace-nowrap">
                            {formatPrice(lineTotal)}
                          </span>
                        </div>
                        {summary && (
                          <p className="mt-1 text-xs text-ink-3 leading-snug line-clamp-2">
                            {summary}
                          </p>
                        )}
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-paper p-0.5">
                            <button
                              onClick={() =>
                                updateQty(line.id, line.qty - 1)
                              }
                              aria-label="Decrease quantity"
                              className="inline-grid size-7 place-items-center rounded-full text-ink-2 hover:bg-ink/5 transition"
                            >
                              <Minus className="size-3" strokeWidth={2.25} />
                            </button>
                            <span className="font-mono text-xs tabular-nums w-5 text-center">
                              {line.qty}
                            </span>
                            <button
                              onClick={() =>
                                updateQty(line.id, line.qty + 1)
                              }
                              aria-label="Increase quantity"
                              className="inline-grid size-7 place-items-center rounded-full text-ink-2 hover:bg-ink/5 transition"
                            >
                              <Plus className="size-3" strokeWidth={2.25} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeLine(line.id)}
                            aria-label="Remove from order"
                            className="inline-flex items-center gap-1 text-xs text-ink-3 hover:text-error transition"
                          >
                            <Trash2 className="size-3.5" strokeWidth={1.75} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {detailed.length > 0 && (
              <div className="border-t border-ink/10 bg-bone px-6 py-5 safe-bottom">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-sm text-ink-2">Subtotal</span>
                  <span className="font-display text-2xl text-ink tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-[0.65rem] text-ink-3 mb-4 leading-relaxed">
                  Pay at pickup. Final total will be confirmed at the counter.
                </p>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="group/cta block w-full text-center rounded-full bg-forest text-linen px-6 py-3.5 text-sm font-medium tracking-wide hover:bg-forest-2 transition shadow-[0_8px_24px_-12px_rgba(20,18,14,0.45)]"
                >
                  Go to checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Empty() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center py-12">
      <div className="inline-grid size-16 place-items-center rounded-full bg-forest/10 text-forest mb-5">
        <ShoppingBag className="size-7" strokeWidth={1.5} />
      </div>
      <p className="font-display text-2xl text-ink leading-tight">
        Your order is empty.
      </p>
      <p className="mt-3 text-sm text-ink-3 max-w-xs leading-relaxed">
        Browse the menu and add anything that catches your eye — coffee,
        sandwiches, sweets.
      </p>
      <Link
        href="/menu"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-forest/30 text-forest px-5 py-2.5 text-sm font-medium hover:bg-forest hover:text-linen transition"
      >
        Browse the menu
      </Link>
    </div>
  );
}
