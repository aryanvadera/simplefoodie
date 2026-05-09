import { cn } from "@/lib/cn";

/**
 * Editorial wordmark — typographic, no logo file required.
 * The circle ornament adds a hint of identity without depending on
 * an asset. Designed to read as "premium small brand" at small sizes.
 */
export function Wordmark({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const tone =
    variant === "light"
      ? { primary: "text-linen", muted: "text-linen/70", dot: "bg-honey" }
      : { primary: "text-ink", muted: "text-ink-3", dot: "bg-honey" };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 select-none",
        className,
      )}
      aria-label="The Simple Foodie"
    >
      <span
        aria-hidden
        className={cn(
          "relative size-7 rounded-full grid place-items-center",
          tone.dot,
        )}
      >
        <span className="font-display italic text-[0.85rem] leading-none text-forest-2 -translate-y-px">
          sf
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] leading-none tracking-tight",
            tone.primary,
          )}
        >
          The Simple Foodie
        </span>
        <span
          className={cn(
            "text-[0.62rem] tracking-[0.28em] uppercase mt-1",
            tone.muted,
          )}
        >
          Café · Catering
        </span>
      </span>
    </span>
  );
}
