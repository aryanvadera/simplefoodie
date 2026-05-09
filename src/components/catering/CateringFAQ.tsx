"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

const faqs = [
  {
    q: "How much notice do you need?",
    a: "For next-day catering, place your order by 1 pm the day before. For larger jobs or specific custom briefs, two business days gives us more room to play with.",
  },
  {
    q: "Where do you deliver?",
    a: "We deliver across Docklands and surrounding inner-Melbourne suburbs. Delivery within Docklands is on us; outside the zone, we'll quote based on distance.",
  },
  {
    q: "What's the minimum order?",
    a: "There's no strict minimum, but most catering bundles start at $40. For smaller groups (4–6 people), our Mini Pastries Box and Granola Pots are perfect.",
  },
  {
    q: "Can you cater dietary requirements?",
    a: "Yes — we have vegan, vegetarian, gluten-free, dairy-free and halal options across the menu. Tell us in the brief and we'll build the platter around your group.",
  },
  {
    q: "Do you offer recurring office orders?",
    a: "We do. Tell us about your weekly or monthly cadence and we'll set you up with a standing order, predictable pricing, and one consolidated invoice.",
  },
  {
    q: "What if my plans change?",
    a: "Cancel or amend up to 4pm the day before your delivery, no charge. Same-day changes — call us, we'll do our best.",
  },
];

export function CateringFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeader
        align="center"
        eyebrow="Good to know"
        title={
          <>
            Catering, <em className="font-display italic text-forest">no surprises</em>.
          </>
        }
      />

      <div className="mt-14 max-w-3xl mx-auto divide-y divide-ink/10 border-y border-ink/10">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={i} delay={i * 60}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left py-6 md:py-7 flex items-start justify-between gap-6 group/faq"
                aria-expanded={isOpen}
              >
                <span className="font-display text-2xl md:text-3xl text-ink leading-tight flex-1">
                  {f.q}
                </span>
                <span
                  className={cn(
                    "shrink-0 inline-grid size-9 place-items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen
                      ? "bg-forest text-linen rotate-45"
                      : "bg-ink/5 text-ink-2 group-hover/faq:bg-ink/10",
                  )}
                >
                  <Plus className="size-4" strokeWidth={2} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-7 max-w-2xl text-ink-2 leading-relaxed">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
