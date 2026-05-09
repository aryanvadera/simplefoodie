"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { site } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();

  // Per-word stagger for the headline
  const words = ["Fresh,", "simply", "done."];

  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden">
      {/* Decorative blurred blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 size-[40rem] rounded-full bg-honey/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[40%] -left-32 size-[30rem] rounded-full bg-sage/20 blur-[120px]"
      />

      <div className="container-x relative grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left — copy */}
        <div className="lg:col-span-6 relative z-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-3 py-1.5 text-xs text-ink-2">
              <MapPin className="size-3 text-forest" strokeWidth={2.25} />
              <span className="font-medium tracking-wide">Docklands · Melbourne</span>
            </span>
            <span className="hidden sm:inline-flex">
              <OpenStatus />
            </span>
          </motion.div>

          <h1 className="font-display mt-7 text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em] text-ink">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.22em] last:mr-0"
              >
                {i === 2 ? <em className="not-italic text-forest">{w}</em> : w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-md text-base md:text-lg text-ink-2 leading-relaxed"
          >
            A Docklands café with a soft spot for a perfect flat white, a
            handmade lunch, and the kind of platters that make a Tuesday meeting
            feel like an event.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/menu"
              className="group/cta inline-flex items-center justify-center gap-2 rounded-full bg-forest text-linen px-7 py-3.5 text-sm font-medium tracking-wide shadow-[0_8px_24px_-12px_rgba(20,18,14,0.45)] hover:bg-forest-2 hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <span>Order ahead</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Link>
            <Link
              href="/catering"
              className="group/cta inline-flex items-center justify-center gap-2 rounded-full border border-forest/30 text-forest px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-forest hover:text-linen hover:border-forest hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <span>Catering quote in 60s</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Link>
          </motion.div>

          {/* Inline KPIs */}
          <motion.dl
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.9 }}
            className="mt-14 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { kpi: "100+", label: "Items, made fresh daily" },
              { kpi: "1pm", label: "Cut-off for next-day catering" },
              { kpi: "6 days", label: "Open Mon to Sat" },
            ].map((s) => (
              <div key={s.label} className="border-l border-ink/15 pl-3">
                <dt className="font-display text-2xl text-ink leading-none">
                  {s.kpi}
                </dt>
                <dd className="text-[0.7rem] tracking-wide text-ink-3 mt-2 leading-snug">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right — image stack */}
        <div className="lg:col-span-6 relative">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main image */}
            <ImageFrame
              caption="Hero — sandwiches & coffee on board"
              alt="The Simple Foodie hero — fresh sandwiches and coffee"
              className="aspect-[4/5] w-full"
              rounded="xl"
              kenBurns
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />

            {/* Floating accent — coffee */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -left-6 md:-left-12 bottom-12 w-36 md:w-48 aspect-square"
            >
              <ImageFrame
                caption="Latte detail"
                alt="A perfectly poured latte"
                rounded="lg"
                className="w-full h-full shadow-[var(--shadow-lift)]"
              />
            </motion.div>

            {/* Floating accent — pastry */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block absolute -right-6 -top-6 w-40 aspect-[3/4]"
            >
              <ImageFrame
                caption="Almond croissant"
                alt="A laminated almond croissant"
                rounded="lg"
                className="w-full h-full shadow-[var(--shadow-lift)]"
              />
            </motion.div>

            {/* "Made today" sticker */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: -8 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1, rotate: -6 }}
              transition={{ delay: 1.2, duration: 0.6, type: "spring", bounce: 0.4 }}
              className="absolute -right-4 bottom-24 md:bottom-32 grid place-items-center size-28 md:size-32 rounded-full bg-honey text-forest-2 shadow-[var(--shadow-lift)] text-center"
            >
              <div>
                <p className="font-display italic text-xl leading-none">made</p>
                <p className="font-display italic text-xl leading-none mt-0.5">today.</p>
                <p className="text-[0.6rem] mt-2 tracking-[0.22em] uppercase font-medium opacity-80">
                  every day.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Phone strip — visible on mobile, status sits below */}
      <div className="container-x sm:hidden mt-8">
        <OpenStatus />
      </div>

      {/* Address bar reference for screen readers */}
      <span className="sr-only">{site.address.line}</span>
    </section>
  );
}
