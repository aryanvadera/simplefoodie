import Link from "next/link";
import { ArrowRight, Clock, Truck, Salad } from "lucide-react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { Magnetic } from "@/components/ui/Magnetic";

export function CateringCallout() {
  return (
    <Spotlight className="relative bg-forest text-linen overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 size-[40rem] rounded-full bg-honey/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 size-[40rem] rounded-full bg-sage/15 blur-[140px]"
      />

      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(245,239,230,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-x grid lg:grid-cols-12 gap-12 items-center relative">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-honey">For your office</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Tomorrow&rsquo;s lunch is{" "}
              <em className="not-italic text-honey">handled.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-linen/75 text-lg leading-relaxed">
              Order by 1 pm and we&rsquo;ll deliver a fresh, beautifully
              boxed catering platter to your Docklands office in the morning.
              Bundles from $40. Custom briefs welcome.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <ul className="mt-12 grid sm:grid-cols-3 gap-x-6 gap-y-4">
              {[
                { icon: Clock, label: "Order by 1 pm", body: "for next-day delivery" },
                { icon: Truck, label: "Free delivery", body: "in Docklands" },
                { icon: Salad, label: "Dietary care", body: "vegan, GF, vegetarian" },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.label} className="group/f flex items-start gap-3">
                    <span className="mt-0.5 inline-grid size-9 place-items-center rounded-full bg-linen/10 group-hover/f:bg-honey transition-colors duration-300">
                      <Icon className="size-4 text-honey group-hover/f:text-forest-2 transition-colors duration-300" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-medium text-linen">{f.label}</p>
                      <p className="text-sm text-linen/70 mt-0.5">{f.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <Magnetic>
                <Link
                  href="/catering"
                  data-cursor="order"
                  className="group/cta inline-flex items-center justify-center gap-2 rounded-full bg-honey text-forest-2 px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-linen transition-all duration-300 shadow-[0_8px_24px_-12px_rgba(168,136,66,0.6)]"
                >
                  <span>Get a quote in 60 seconds</span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/catering"
                  data-cursor="grow"
                  className="group/cta inline-flex items-center justify-center gap-2 rounded-full border border-linen/25 text-linen px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-linen/10 transition-all duration-300"
                >
                  <span>See platter menu</span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5 relative">
          <Reveal>
            <ImageFrame
              caption="Catering platter"
              alt="A beautifully arranged catering platter"
              className="aspect-[4/5] w-full"
              rounded="xl"
              kenBurns
            />
          </Reveal>
          <div className="absolute -left-6 -bottom-6 hidden md:block w-44 aspect-square">
            <ImageFrame
              caption="Sliders"
              alt="Slider box detail"
              rounded="lg"
              className="w-full h-full shadow-[var(--shadow-lift)]"
            />
          </div>

          {/* Floating numeric chip */}
          <div className="hidden md:flex absolute -right-2 top-6 items-center gap-2 bg-honey text-forest-2 rounded-full px-4 py-2 shadow-[var(--shadow-lift)]">
            <span className="font-display italic text-2xl leading-none">$40+</span>
            <span className="text-[0.6rem] uppercase tracking-[0.22em] font-medium">per platter</span>
          </div>
        </div>
      </div>
    </Spotlight>
  );
}
