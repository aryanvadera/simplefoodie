"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-[background,border,backdrop-filter,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "bg-linen/85 backdrop-blur-xl border-b border-ink/8 py-3"
            : "bg-transparent py-5",
        )}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Link href="/" className="-mx-1 px-1 py-1 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-honey/80">
            <Wordmark />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-ink-2 hover:text-ink rounded-full transition-colors duration-200 group/nav"
              >
                <span>{item.label}</span>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-1 h-px w-0 bg-forest transition-all duration-300 ease-out group-hover/nav:w-5" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.contact.phoneHref}
              className="hidden lg:inline-flex items-center gap-2 text-xs text-ink-2 hover:text-ink transition-colors"
            >
              <Phone className="size-3.5" strokeWidth={2} />
              <span className="font-medium tracking-wide">{site.contact.phone}</span>
            </a>
            <div className="hidden md:block">
              <Button href="/catering" size="md" variant="primary" withArrow>
                Get a quote
              </Button>
            </div>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden inline-grid size-10 place-items-center rounded-full bg-ink/5 hover:bg-ink/10 transition"
              aria-label="Open menu"
            >
              <Menu className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute inset-y-0 right-0 w-[88%] max-w-sm bg-linen p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between">
                <Wordmark />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-grid size-10 place-items-center rounded-full bg-ink/5 hover:bg-ink/10"
                  aria-label="Close menu"
                >
                  <X className="size-5" strokeWidth={1.75} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col">
                {site.nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 border-b border-ink/8 font-display text-3xl text-ink"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-8 space-y-3">
                <Button href="/catering" size="lg" variant="primary" className="w-full" withArrow>
                  Get a catering quote
                </Button>
                <a
                  href={site.contact.phoneHref}
                  className="flex items-center gap-2 text-sm text-ink-2"
                >
                  <Phone className="size-4" />
                  <span>{site.contact.phone}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
