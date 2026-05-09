import type { Metadata } from "next";
import { ArrowRight, Clock, MapPin, Truck, Salad, Phone } from "lucide-react";
import Link from "next/link";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { QuoteForm } from "@/components/catering/QuoteForm";
import { BundleCard } from "@/components/catering/BundleCard";
import { CateringFAQ } from "@/components/catering/CateringFAQ";
import { popularBundles, cateringBoxes } from "@/lib/menu";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Catering — Office platters in Docklands",
  description:
    "Fresh, handmade catering platters for your Docklands office. Order by 1pm for next-day delivery. Bundles from $40.",
};

export default function CateringPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 size-[40rem] rounded-full bg-honey/12 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-32 size-[30rem] rounded-full bg-sage/15 blur-[120px]"
        />

        <div className="container-x grid lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-3 py-1.5 text-xs text-ink-2">
                <MapPin className="size-3 text-forest" strokeWidth={2.25} />
                <span className="font-medium tracking-wide">
                  Catering across Docklands
                </span>
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-7 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-tight">
                Office platters,{" "}
                <em className="not-italic text-forest">handled.</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-base md:text-lg text-ink-2 leading-relaxed">
                Tell us when, how many, and what your team likes — we&rsquo;ll
                quote in 60 seconds and deliver fresh in the morning. From a
                ten-person stand-up to a hundred-person product launch, we cook
                like it&rsquo;s our event.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="#quote"
                  className="group/cta inline-flex items-center justify-center gap-2 rounded-full bg-forest text-linen px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-forest-2 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_24px_-12px_rgba(20,18,14,0.45)]"
                >
                  <span>Get a quote in 60 seconds</span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>
                <a
                  href={site.contact.phoneHref}
                  className="group/cta inline-flex items-center justify-center gap-2 rounded-full border border-forest/30 text-forest px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-forest hover:text-linen hover:border-forest transition-all duration-300"
                >
                  <Phone className="size-4" strokeWidth={2} />
                  <span>{site.contact.phone}</span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-12 grid sm:grid-cols-3 gap-4 max-w-lg">
                {[
                  { icon: Clock, label: "Order by 1 pm", body: "for next-day delivery" },
                  { icon: Truck, label: "Free delivery", body: "in Docklands" },
                  { icon: Salad, label: "Dietary care", body: "vegan, GF, halal" },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <li key={f.label} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-grid size-9 place-items-center rounded-full bg-forest/10 text-forest">
                        <Icon className="size-4" strokeWidth={1.75} />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-ink">{f.label}</p>
                        <p className="text-xs text-ink-3 mt-0.5">{f.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6 relative">
            <Reveal>
              <ImageFrame
                caption="Catering hero — slider boxes & sandwiches"
                alt="Catering platters arranged on a board"
                className="aspect-[4/5] w-full"
                rounded="xl"
                kenBurns
                priority
              />
            </Reveal>
            <div className="absolute -left-8 -bottom-8 hidden md:block w-44 aspect-square">
              <ImageFrame
                caption="Granola pots"
                alt="Granola yoghurt pots"
                rounded="lg"
                className="w-full h-full shadow-[var(--shadow-lift)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-bone py-24 md:py-32">
        <div className="container-x">
          <SectionHeader
            eyebrow="How it works"
            title={
              <>
                Three steps,{" "}
                <em className="font-display italic text-forest">no chasing</em>.
              </>
            }
          />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                title: "Pick your menu",
                body: (
                  <>
                    Browse popular bundles below or send a brief — we&rsquo;ll
                    suggest combinations to match the group, the budget and the
                    brief.
                  </>
                ),
              },
              {
                n: "02",
                title: "Confirm by 1 pm",
                body: (
                  <>
                    Call{" "}
                    <a
                      href={site.contact.phoneHref}
                      className="text-forest hover:underline"
                    >
                      {site.contact.phone}
                    </a>{" "}
                    or reply to your quote email. For larger jobs, two business
                    days&rsquo; notice gives us extra room.
                  </>
                ),
              },
              {
                n: "03",
                title: "We deliver fresh",
                body: (
                  <>
                    We bake, pack and deliver in the morning, beautifully
                    presented and ready to set down. Setup help on request.
                  </>
                ),
              },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-paper border border-ink/8 rounded-[2rem] p-7 md:p-8 h-full">
                  <span className="font-mono text-xs tracking-[0.22em] text-forest font-medium">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-display text-3xl text-ink leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-ink-2 leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR BUNDLES */}
      <section className="container-x py-24 md:py-32">
        <SectionHeader
          eyebrow="Most-loved bundles"
          title={
            <>
              Start here.{" "}
              <em className="font-display italic text-forest">
                These never miss.
              </em>
            </>
          }
          description="Curated combinations for the most-asked-for occasions — board meetings, morning teas, brunch sets and team lunches."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularBundles.map((b, i) => (
            <Reveal key={b.name} delay={i * 70}>
              <BundleCard bundle={b} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* FULL CATERING MENU */}
      <section className="bg-bone py-24 md:py-32">
        <div className="container-x">
          <SectionHeader
            eyebrow="Catering menu"
            title={
              <>
                The full <em className="font-display italic text-forest">platter list</em>.
              </>
            }
            description="Everything we make for groups. Mix and match by the box — or tell us a brief and we'll do the choosing."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cateringBoxes.map((b, i) => (
              <Reveal key={b.name} delay={i * 40}>
                <BundleCard bundle={b} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section id="quote" className="container-x py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-forest/60 mb-5">Tell us about it</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-tight">
                One short brief.{" "}
                <em className="font-display italic text-forest">A real quote back.</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-md text-base md:text-lg text-ink-2 leading-relaxed">
                Skip the back-and-forth. Drop your details and we&rsquo;ll come
                back with a costed proposal — bundle suggestions, dietary
                breakdown, delivery window, the lot.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <ul className="mt-10 space-y-3 text-sm text-ink-2">
                <li className="flex items-center gap-3">
                  <span className="size-1 rounded-full bg-forest" />
                  Replies within hours on business days
                </li>
                <li className="flex items-center gap-3">
                  <span className="size-1 rounded-full bg-forest" />
                  Pricing transparent, no hidden fees
                </li>
                <li className="flex items-center gap-3">
                  <span className="size-1 rounded-full bg-forest" />
                  Custom briefs welcome
                </li>
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <QuoteForm />
            </Reveal>
          </div>
        </div>
      </section>

      <CateringFAQ />
    </>
  );
}
