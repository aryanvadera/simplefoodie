"use client";

import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";

export function CartIcon({ className }: { className?: string }) {
  const { count, openDrawer, ready } = useCart();

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={`Open order — ${count} items`}
      className={cn(
        "relative inline-grid size-10 place-items-center rounded-full bg-ink/5 hover:bg-ink/10 transition",
        className,
      )}
    >
      <ShoppingBag className="size-4" strokeWidth={1.75} />
      <AnimatePresence>
        {ready && count > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", damping: 18, stiffness: 320 }}
            className="absolute -top-1 -right-1 inline-grid min-w-5 h-5 px-1 place-items-center rounded-full bg-honey text-forest-2 font-mono text-[0.62rem] font-medium tabular-nums leading-none shadow-[0_2px_6px_rgba(20,18,14,0.18)]"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
