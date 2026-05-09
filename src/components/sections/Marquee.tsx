import { Coffee, Sandwich, Croissant, Salad, Cookie, Cake } from "lucide-react";

const items = [
  { icon: Coffee, label: "Barista-made coffee" },
  { icon: Sandwich, label: "Handmade sandwiches" },
  { icon: Croissant, label: "Fresh pastries" },
  { icon: Salad, label: "Healthy bowls" },
  { icon: Cake, label: "Catering platters" },
  { icon: Cookie, label: "House-baked sweets" },
];

export function Marquee() {
  // Duplicate the list so the seamless loop keyframe (-50%) lines up.
  const loop = [...items, ...items];

  return (
    <section
      aria-hidden
      className="relative overflow-hidden bg-forest text-linen py-7 select-none"
    >
      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-forest to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-forest to-transparent z-10" />

      <div className="flex marquee-track whitespace-nowrap">
        {loop.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-8 shrink-0"
            >
              <Icon className="size-4 text-honey" strokeWidth={1.5} />
              <span className="font-display italic text-2xl md:text-3xl tracking-tight">
                {item.label}
              </span>
              <span className="text-honey/60 mx-4 text-2xl">·</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
