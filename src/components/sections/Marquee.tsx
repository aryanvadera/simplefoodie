import { Coffee, Sandwich, Croissant, Salad, Cookie, Cake, Utensils, Leaf } from "lucide-react";

const rowA = [
  { icon: Coffee,    label: "Barista-made coffee" },
  { icon: Sandwich,  label: "Handmade sandwiches" },
  { icon: Croissant, label: "Fresh pastries" },
  { icon: Salad,     label: "Healthy bowls" },
  { icon: Cake,      label: "Catering platters" },
  { icon: Cookie,    label: "House-baked sweets" },
];

const rowB = [
  { icon: Utensils,  label: "Made on the morning" },
  { icon: Leaf,      label: "Vegan & GF options" },
  { icon: Sandwich,  label: "Order ahead, skip the queue" },
  { icon: Coffee,    label: "Single-origin espresso" },
  { icon: Croissant, label: "72-hour laminated dough" },
  { icon: Cake,      label: "From $40 platters" },
];

function Track({
  items,
  reverse = false,
  size = "lg",
}: {
  items: Array<{ icon: typeof Coffee; label: string }>;
  reverse?: boolean;
  size?: "lg" | "sm";
}) {
  const loop = [...items, ...items];
  const trackCls = reverse ? "marquee-track marquee-track--reverse" : "marquee-track";
  return (
    <div className={`flex whitespace-nowrap ${trackCls}`}>
      {loop.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={i} className="flex items-center gap-3 px-8 shrink-0">
            <Icon
              className={size === "lg" ? "size-4 text-honey" : "size-3 text-honey/80"}
              strokeWidth={1.5}
            />
            {size === "lg" ? (
              <span className="font-display italic text-2xl md:text-3xl tracking-tight">
                {item.label}
              </span>
            ) : (
              <span className="text-xs uppercase tracking-[0.32em] font-medium text-linen/70">
                {item.label}
              </span>
            )}
            <span className="text-honey/60 mx-4 text-2xl">·</span>
          </div>
        );
      })}
    </div>
  );
}

export function Marquee() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden bg-forest text-linen py-6 select-none border-y border-forest-2/40 group/m"
    >
      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-forest to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-forest to-transparent z-10" />

      <div className="space-y-3 group-hover/m:[&_.marquee-track]:[animation-play-state:paused]">
        <Track items={rowA} size="lg" />
        <Track items={rowB} reverse size="sm" />
      </div>
    </section>
  );
}
