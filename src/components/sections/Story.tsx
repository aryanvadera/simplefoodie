import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export function Story() {
  return (
    <section id="story" className="container-x py-24 md:py-32 relative">
      {/* big watermark word, decorative */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 -top-4 md:right-12 md:top-2 font-display italic text-[18vw] md:text-[12rem] leading-none text-ink/[0.04] select-none"
      >
        simple
      </span>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center relative">
        <div className="lg:col-span-5 relative order-2 lg:order-1">
          <ImageFrame
            caption="Founders portrait"
            alt="The team behind The Simple Foodie"
            className="aspect-[4/5] w-full"
            rounded="xl"
            kenBurns
          />
          <div className="absolute -bottom-6 -right-6 hidden lg:block w-48 aspect-square">
            <ImageFrame
              caption="Coffee detail"
              alt="A perfectly poured coffee"
              rounded="lg"
              className="w-full h-full shadow-[var(--shadow-lift)]"
            />
          </div>
          {/* Decorative tag */}
          <div className="hidden lg:flex absolute -top-6 -left-6 items-center gap-2 bg-paper border border-ink/8 rounded-full px-4 py-2 shadow-[var(--shadow-soft)]">
            <span className="size-1.5 rounded-full bg-honey" />
            <span className="font-mono text-[0.6rem] tracking-[0.28em] uppercase text-ink-3">Since day one</span>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-8">
          <Reveal>
            <p className="eyebrow text-forest/60 mb-5">Our story</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-tight text-ink">
              We named it <em className="not-italic text-forest">Simple</em> because most cafés
              aren&rsquo;t.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-8 space-y-5 text-base md:text-lg text-ink-2 leading-relaxed max-w-2xl">
              <p>
                Tucked between the boats and the towers in Docklands,
                The Simple Foodie started with one quiet promise: feed the
                neighbourhood food we&rsquo;d be proud to eat ourselves.
              </p>
              <p>
                Every croissant is laminated in-house. Every sandwich is
                pressed to order. Every coffee comes from a small Melbourne
                roaster we trust by name. The menu is large because we like
                cooking — but the recipe is simple. Make it fresh, make it
                generous, send it out warm.
              </p>
              <p className="text-ink font-medium">
                Lunch shouldn&rsquo;t be a chore. Catering shouldn&rsquo;t be
                a compromise.
              </p>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <Stat
                top={<CountUp value={100} suffix="+" />}
                label="Items, made fresh daily"
              />
              <Stat
                top={<CountUp value={6} />}
                label="Days a week, open"
              />
              <Stat
                top={<CountUp value={2.5} prefix="$" decimals={2} />}
                label="Hashbrowns. Always."
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ top, label }: { top: React.ReactNode; label: string }) {
  return (
    <div className="border-l border-ink/15 pl-4">
      <dt className="font-display text-3xl text-ink leading-none tabular-nums">
        {top}
      </dt>
      <dd className="text-[0.7rem] tracking-wide text-ink-3 mt-2 leading-snug">
        {label}
      </dd>
    </div>
  );
}
