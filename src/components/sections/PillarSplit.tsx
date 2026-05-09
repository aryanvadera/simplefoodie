import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";

const pillars = [
  {
    eyebrow: "The café",
    title: "Lunch, fast.\nNot rushed.",
    body:
      "Coffee at 7. Schnitzel sandwiches by 11. Tiramisu in the afternoon. Order ahead and skip the queue, or wander in and pick the day's special off the counter.",
    href: "/menu",
    cta: "See the menu",
    image: { caption: "Café interior", alt: "Inside The Simple Foodie cafe", src: "/images/hero/pillar-cafe.jpeg" },
    bullets: [
      "Single-origin coffee",
      "Handmade sandwiches & wraps",
      "Loyalty points on every order",
    ],
  },
  {
    eyebrow: "The catering",
    title: "Office\nplatters,\ndone right.",
    body:
      "Whether it's a Monday board meeting or a Thursday team lunch — order by 1 pm and we'll have a fresh, beautifully boxed platter at your Docklands desk by morning.",
    href: "/catering",
    cta: "Get a quote",
    image: { caption: "Catering boxes", alt: "Corporate catering boxes", src: "/images/hero/pillar-catering.jpg" },
    bullets: [
      "Next-day delivery in Docklands",
      "Vegan, vegetarian & GF options",
      "From $40 to $155 per platter",
    ],
    accent: true,
  },
];

export function PillarSplit() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {pillars.map((p, i) => (
          <Reveal key={i} delay={i * 100} className="group/p block">
            <Tilt max={3} glow={false} className="h-full">
              <Link
                href={p.href}
                data-cursor="grow"
                className={`relative block h-full rounded-[2rem] overflow-hidden p-6 md:p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${
                  p.accent
                    ? "bg-forest text-linen hover:bg-forest-2"
                    : "bg-bone text-ink hover:bg-paper"
                } shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]`}
              >
                {/* Index marker */}
                <span
                  className={`absolute top-6 right-7 font-mono text-[0.6rem] tracking-[0.32em] uppercase ${
                    p.accent ? "text-honey/70" : "text-ink-4"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} / 02
                </span>

                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <p
                      className={`eyebrow ${
                        p.accent ? "text-honey" : "text-forest/70"
                      }`}
                    >
                      {p.eyebrow}
                    </p>
                    <h3
                      className={`mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight whitespace-pre-line ${
                        p.accent ? "text-linen" : "text-ink"
                      }`}
                    >
                      {p.title}
                    </h3>
                  </div>
                  <span
                    className={`shrink-0 inline-grid size-12 place-items-center rounded-full transition-all duration-500 ease-out group-hover/p:rotate-45 ${
                      p.accent
                        ? "bg-honey text-forest-2"
                        : "bg-forest text-linen"
                    }`}
                  >
                    <ArrowUpRight className="size-5" strokeWidth={2} />
                  </span>
                </div>

                <div className="mt-8 relative overflow-hidden rounded-[2rem]">
                  <ImageFrame
                    src={p.image.src}
                    caption={p.image.caption}
                    alt={p.image.alt}
                    rounded="xl"
                    kenBurns
                    className="aspect-[16/10] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/p:scale-[1.04]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>

                <p
                  className={`mt-8 max-w-md leading-relaxed ${
                    p.accent ? "text-linen/80" : "text-ink-2"
                  }`}
                >
                  {p.body}
                </p>

                <ul
                  className={`mt-6 grid gap-2 text-sm ${
                    p.accent ? "text-linen/85" : "text-ink-2"
                  }`}
                >
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className={`size-1 rounded-full ${
                          p.accent ? "bg-honey" : "bg-forest"
                        }`}
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-8 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    p.accent
                      ? "text-honey group-hover/p:text-linen"
                      : "text-forest group-hover/p:text-forest-2"
                  }`}
                >
                  <span>{p.cta}</span>
                  <span className="inline-block transition-transform duration-300 group-hover/p:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
