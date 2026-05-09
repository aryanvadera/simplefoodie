import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { MenuExplorer } from "@/components/menu/MenuExplorer";

export const metadata: Metadata = {
  title: "Menu — Café & Catering",
  description:
    "Coffee, sandwiches, mains, bowls, sweets and pastries — handmade in Docklands. Browse the full menu.",
};

export default function MenuPage() {
  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-forest/60">The full list</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-tight max-w-4xl">
              Everything we make,{" "}
              <em className="not-italic text-forest">for you to eat.</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-ink-2 leading-relaxed">
              Over 100 items, made fresh on-site. Use the categories or search
              to find what you&rsquo;re after — order ahead by phone or pop
              into the café.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8">
              <Link
                href="/catering"
                className="group/cta inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-2 transition-colors"
              >
                <span>Looking to cater? See platters →</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <MenuExplorer />
      </section>
    </>
  );
}
