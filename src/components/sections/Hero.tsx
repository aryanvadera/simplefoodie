"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Magnetic } from "@/components/ui/Magnetic";
import { CountUp } from "@/components/ui/CountUp";
import { site } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  // Mouse-driven parallax for the image stack on desktop.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 22, stiffness: 90, mass: 0.6 });
  const sy = useSpring(my, { damping: 22, stiffness: 90, mass: 0.6 });

  // Layered translation amounts.
  const t1x = useTransform(sx, (v) => v * 14);
  const t1y = useTransform(sy, (v) => v * 14);
  const t2x = useTransform(sx, (v) => v * -22);
  const t2y = useTransform(sy, (v) => v * -22);
  const t3x = useTransform(sx, (v) => v * 30);
  const t3y = useTransform(sy, (v) => v * 30);

  // Scroll-driven dampener for the entire stack.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const stackY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const stackOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - (r.left + r.width / 2)) / r.width);
    my.set((e.clientY - (r.top + r.height / 2)) / r.height);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  // Per-word stagger for the headline
  const words = ["Fresh,", "simply", "done."];

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onLeave}
      className="relative pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden"
    >
      {/* Decorative blurred blobs that very subtly track the cursor */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: t2x, y: t2y }}
        className="pointer-events-none absolute -top-32 -right-24 size-[40rem] rounded-full bg-honey/15 blur-[120px]"
      />
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: t1x, y: t1y }}
        className="pointer-events-none absolute top-[40%] -left-32 size-[30rem] rounded-full bg-sage/20 blur-[120px]"
      />

      {/* Editorial corner ornament */}
      <span
        aria-hidden
        className="hidden lg:block pointer-events-none absolute top-32 left-6 origin-top-left -rotate-90 font-mono text-[0.6rem] tracking-[0.4em] uppercase text-ink-3"
      >
        Est. Docklands · Melbourne
      </span>

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
                initial={reduce ? false : { opacity: 0, y: 28, rotateX: -40 }}
                animate={reduce ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.1 + i * 0.09,
                  duration: 0.95,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.22em] last:mr-0 origin-bottom"
                style={{ perspective: 800 }}
              >
                {i === 2 ? (
                  <em className="not-italic text-forest relative">
                    {w}
                    <motion.span
                      aria-hidden
                      initial={reduce ? false : { scaleX: 0 }}
                      animate={reduce ? undefined : { scaleX: 1 }}
                      transition={{ delay: 1.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute -bottom-2 left-1 right-2 h-[3px] bg-honey origin-left rounded-full"
                    />
                  </em>
                ) : (
                  w
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-md text-base md:text-lg text-ink-2 leading-relaxed"
          >
            A Docklands café with a soft spot for a perfect flat white, a
            handmade lunch, and the kind of platters that make a Tuesday meeting
            feel like an event.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Magnetic>
              <Link
                href="/menu"
                data-cursor="order"
                className="group/cta inline-flex items-center justify-center gap-2 rounded-full bg-forest text-linen px-7 py-3.5 text-sm font-medium tracking-wide shadow-[0_8px_24px_-12px_rgba(20,18,14,0.45)] hover:bg-forest-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <span>Order ahead</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/catering"
                data-cursor="grow"
                className="group/cta inline-flex items-center justify-center gap-2 rounded-full border border-forest/30 text-forest px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-forest hover:text-linen hover:border-forest transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <span>Catering quote in 60s</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Link>
            </Magnetic>
          </motion.div>

          {/* Inline KPIs with count-up */}
          <motion.dl
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.9 }}
            className="mt-14 grid grid-cols-3 gap-6 max-w-md"
          >
            <Stat top={<CountUp value={100} suffix="+" />} label="Items, made fresh daily" />
            <Stat top="1pm" label="Cut-off for next-day catering" />
            <Stat top={<CountUp value={6} />} label="Days a week, open" />
          </motion.dl>
        </div>

        {/* Right — image stack with mouse parallax + scroll dampening */}
        <motion.div
          className="lg:col-span-6 relative"
          style={reduce ? undefined : { y: stackY, opacity: stackOpacity }}
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main image — pulls toward cursor */}
            <motion.div
              style={reduce ? undefined : { x: t1x, y: t1y }}
              className="relative"
              data-cursor="view"
            >
              <ImageFrame
                caption="Hero — sandwiches & coffee on board"
                alt="The Simple Foodie hero — fresh sandwiches and coffee"
                className="aspect-[4/5] w-full"
                rounded="xl"
                kenBurns
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </motion.div>

            {/* Floating accent — coffee */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={reduce ? undefined : { x: t3x, y: t3y }}
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
              transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={reduce ? undefined : { x: t2x, y: t2y }}
              className="hidden md:block absolute -right-6 -top-6 w-40 aspect-[3/4]"
            >
              <ImageFrame
                caption="Almond Croissant"
                alt="A laminated almond croissant"
                rounded="lg"
                className="w-full h-full shadow-[var(--shadow-lift)]"
              />
            </motion.div>

            {/* "Made today" sticker — slowly rotating */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6, type: "spring", bounce: 0.4 }}
              className="absolute -right-4 bottom-24 md:bottom-32 size-28 md:size-32"
            >
              <div className="relative size-full">
                <motion.svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 size-full text-forest-2"
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                  aria-hidden
                >
                  <defs>
                    <path id="circ" d="M50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
                  </defs>
                  <text fill="currentColor" fontSize="9" letterSpacing="3" fontWeight="500">
                    <textPath href="#circ" startOffset="0">
                      MADE FRESH · EVERY DAY · MADE FRESH · EVERY DAY ·
                    </textPath>
                  </text>
                </motion.svg>
                <div className="absolute inset-3 grid place-items-center rounded-full bg-honey text-forest-2 text-center shadow-[var(--shadow-lift)]">
                  <div>
                    <p className="font-display italic text-xl leading-none">made</p>
                    <p className="font-display italic text-xl leading-none mt-0.5">today.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Phone strip — visible on mobile */}
      <div className="container-x sm:hidden mt-8">
        <OpenStatus />
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-ink-3"
      >
        <span className="text-[0.6rem] tracking-[0.32em] uppercase">Scroll</span>
        <span className="relative h-10 w-px bg-ink/20 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-forest"
            animate={{ y: [-12, 40] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: [0.5, 0, 0.5, 1] }}
          />
        </span>
      </motion.div>

      {/* Address bar reference for screen readers */}
      <span className="sr-only">{site.address.line}</span>
    </section>
  );
}

function Stat({ top, label }: { top: React.ReactNode; label: string }) {
  return (
    <div className="border-l border-ink/15 pl-3">
      <dt className="font-display text-2xl text-ink leading-none tabular-nums">
        {top}
      </dt>
      <dd className="text-[0.7rem] tracking-wide text-ink-3 mt-2 leading-snug">
        {label}
      </dd>
    </div>
  );
}
