import { cn } from "@/lib/cn";

/**
 * Decorative SVG curve used between alternating-tone sections.
 * `from` is the colour of the section above (the ribbon background),
 * `to` is the colour of the section below (the SVG fill).
 */
export function SectionDivider({
  from = "linen",
  to = "bone",
  flip = false,
  className,
}: {
  from?: "linen" | "bone" | "forest" | "forest-2";
  to?: "linen" | "bone" | "forest" | "forest-2";
  flip?: boolean;
  className?: string;
}) {
  const fromCls: Record<string, string> = {
    linen: "bg-linen",
    bone: "bg-bone",
    forest: "bg-forest",
    "forest-2": "bg-forest-2",
  };
  const toFill: Record<string, string> = {
    linen: "var(--linen)",
    bone: "var(--bone)",
    forest: "var(--forest)",
    "forest-2": "var(--forest-2)",
  };

  return (
    <div
      aria-hidden
      className={cn("relative h-12 md:h-20 w-full", fromCls[from], className)}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={cn(
          "absolute inset-0 size-full",
          flip && "scale-y-[-1]",
        )}
      >
        <path
          d="M0 32 C 240 80 480 0 720 24 C 960 48 1200 80 1440 40 L 1440 80 L 0 80 Z"
          fill={toFill[to]}
        />
      </svg>
    </div>
  );
}
