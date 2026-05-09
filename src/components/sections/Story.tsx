import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";

export function Story() {
  return (
    <section id="story" className="container-x py-24 md:py-32 relative">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
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
              {[
                { kpi: "100+", label: "Items, made fresh daily" },
                { kpi: "6", label: "Days a week" },
                { kpi: "$2.50", label: "Hashbrowns. Always." },
              ].map((s) => (
                <div key={s.label} className="border-l border-ink/15 pl-4">
                  <dt className="font-display text-3xl text-ink leading-none">
                    {s.kpi}
                  </dt>
                  <dd className="text-[0.7rem] tracking-wide text-ink-3 mt-2 leading-snug">
                    {s.label}
                  </dd>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
