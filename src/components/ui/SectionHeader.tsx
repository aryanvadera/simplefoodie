import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="eyebrow text-forest/60 mb-4">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] text-ink">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={160}>
          <p className="mt-5 text-base md:text-lg text-ink-2 leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
