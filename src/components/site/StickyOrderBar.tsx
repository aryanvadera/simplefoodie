"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Phone, X } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Floating action bar that fades in once the user has scrolled past the
 * hero region. Provides a one-tap path to "Order ahead" or to call.
 * Dismissible per session via state.
 */
export function StickyOrderBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      const past = window.scrollY > Math.max(window.innerHeight * 0.7, 480);
      setVisible(past);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:right-6 sm:left-auto z-[55] safe-bottom"
        >
          <div className="relative mx-auto sm:mx-0 max-w-md flex items-stretch gap-1 rounded-full bg-forest text-linen p-1 pl-5 shadow-[0_24px_48px_-16px_rgba(20,18,14,0.5)] border border-forest-2/40 backdrop-blur-sm">
            <span className="hidden sm:flex items-center gap-2 pr-3 text-xs">
              <span className="size-2 rounded-full bg-honey animate-pulse" />
              <span className="font-medium tracking-wide">Hungry?</span>
            </span>
            <Link
              href="/menu"
              data-cursor="order"
              className="group/cta flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full bg-honey text-forest-2 px-5 py-3 text-sm font-medium hover:bg-linen transition"
            >
              <span>Order ahead</span>
              <ArrowRight className="size-3.5 transition-transform group-hover/cta:translate-x-0.5" strokeWidth={2.25} />
            </Link>
            <a
              href={site.contact.phoneHref}
              className="hidden sm:inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium hover:bg-linen/10 transition"
              aria-label={`Call ${site.contact.phone}`}
            >
              <Phone className="size-3.5" strokeWidth={2} />
              <span className="font-mono text-xs tracking-wide">{site.contact.phone}</span>
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="inline-grid size-11 place-items-center rounded-full text-linen/60 hover:text-linen hover:bg-linen/10 transition shrink-0"
              aria-label="Dismiss"
            >
              <X className="size-3.5" strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
