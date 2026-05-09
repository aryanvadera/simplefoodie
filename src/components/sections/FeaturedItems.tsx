import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tilt } from "@/components/ui/Tilt";
import { menu } from "@/lib/menu";

// Pull a few hero items by name for the homepage feature row.
const featuredNames = [
  "Chicken Schnitzel Sandwich",
  "Strawberry Matcha",
  "Almond Croissant",
  "Tiramisu",
  "Chicken Poke Bowl",
  "Egg Mayo Brioche",
];
const featured = featuredNames
  .map((n) => menu.find((m) => m.name === n))
  .filter((x): x is NonNullable<typeof x> => Boolean(x));

export function FeaturedItems() {
  return (
    <section id="cafe" className="bg-bone py-24 md:py-32 relative">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeader
            eyebrow="On the counter today"
            title={
              <>
                A little bit of <em className="font-display italic text-forest">everything</em> you might want.
              </>
            }
            description="From a 7am flat white to an after-work tiramisu, the menu is built for the way Docklands actually eats — fast, fresh, and a step above what you expect."
          />
          <Reveal delay={200} className="flex">
            <Link
              href="/menu"
              data-cursor="grow"
              className="group/cta inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-2 transition-colors"
            >
              <span>View full menu</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featured.map((item, i) => (
            <Reveal key={item.name} delay={i * 70}>
              <Tilt className="group/c h-full" max={5}>
                <Link
                  href="/menu"
                  data-cursor="view"
                  className="relative block h-full bg-paper rounded-2xl overflow-hidden border border-ink/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/c:-translate-y-1 group-hover/c:shadow-[var(--shadow-lift)]"
                >
                  <div className="relative overflow-hidden">
                    <ImageFrame
                      src={item.image}
                      caption={item.name}
                      alt={item.name}
                      className="aspect-[4/5] w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/c:scale-[1.04]"
                      rounded="none"
                      kenBurns
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    {item.tag && (
                      <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-honey/95 backdrop-blur text-forest-2 text-[0.62rem] tracking-[0.18em] uppercase font-medium px-2.5 py-1">
                        {item.tag}
                      </span>
                    )}
                    <span
                      aria-hidden
                      className="absolute bottom-4 right-4 inline-grid size-10 place-items-center rounded-full bg-paper text-forest shadow-[0_8px_24px_-12px_rgba(20,18,14,0.5)] translate-y-3 opacity-0 group-hover/c:translate-y-0 group-hover/c:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    >
                      <Plus className="size-4" strokeWidth={2} />
                    </span>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-xl md:text-2xl text-ink leading-tight">
                        {item.name}
                      </h3>
                      <span className="font-mono text-xs text-ink-3 tracking-wider whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm text-ink-2 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-forest uppercase tracking-[0.18em] opacity-0 group-hover/c:opacity-100 transition-opacity duration-500">
                      <span>See on menu</span>
                      <ArrowRight className="size-3 transition-transform duration-300 group-hover/c:translate-x-0.5" strokeWidth={2.25} />
                    </span>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
