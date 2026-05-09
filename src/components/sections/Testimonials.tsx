import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

// PLACEHOLDERS — to be replaced with real Google reviews once we get
// permission from the owner. Tone-matched to the kind of feedback a
// well-loved Docklands cafe receives.
const reviews = [
  {
    quote:
      "Hands-down the best lunch spot in Docklands. The schnitzel sandwich is absurd. The team behind the counter actually knows my coffee order.",
    name: "Hannah W.",
    role: "Regular · Docklands",
    rating: 5,
  },
  {
    quote:
      "We ordered the Signature Slider Bundle for a 12-person board meeting. Showed up on time, fresh, and gorgeous. Three people asked who catered.",
    name: "Marcus T.",
    role: "Operations Lead",
    rating: 5,
  },
  {
    quote:
      "The matcha latte is the cleanest in the city. Pastries are obviously made the morning of. I keep telling people about this place.",
    name: "Priya S.",
    role: "Five-day-a-week regular",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeader
        align="center"
        eyebrow="What people say"
        title={
          <>
            The kind of café you{" "}
            <em className="font-display italic text-forest">tell people</em> about.
          </>
        }
      />

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <Reveal key={i} delay={i * 100}>
            <article className="relative h-full bg-bone rounded-3xl p-7 md:p-8 border border-ink/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
              <Quote
                className="absolute top-6 right-6 size-10 text-forest/15"
                strokeWidth={1.25}
                aria-hidden
              />
              <div className="flex items-center gap-1 text-honey">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="size-3.5 fill-current" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-6 font-display text-xl md:text-2xl leading-snug text-ink">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="mt-8 pt-6 border-t border-ink/8 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-forest/10 font-display text-forest text-sm">
                  {r.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink leading-tight">
                    {r.name}
                  </p>
                  <p className="text-xs text-ink-3 mt-0.5">{r.role}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
