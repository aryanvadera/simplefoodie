import Image from "next/image";
import { cn } from "@/lib/cn";
import { ImageIcon } from "lucide-react";

type ImageFrameProps = {
  /** Path under /public, e.g. "/images/hero.jpg". If absent, shows a labelled placeholder. */
  src?: string;
  alt: string;
  /** Optional caption rendered as a small label inside the placeholder. */
  caption?: string;
  className?: string;
  imgClassName?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "none";
  /** Soft Ken Burns zoom for hero shots. */
  kenBurns?: boolean;
  /** Use object-cover (default) or contain. */
  fit?: "cover" | "contain";
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
};

/**
 * Renders a real image when `src` is provided, otherwise a tasteful
 * forest-green shimmering placeholder labelled with the alt/caption,
 * so layouts hold their composition before the client supplies photos.
 */
export function ImageFrame({
  src,
  alt,
  caption,
  className,
  imgClassName,
  rounded = "lg",
  kenBurns = false,
  fit = "cover",
  priority,
  fill = true,
  width,
  height,
  sizes,
}: ImageFrameProps) {
  const radius = {
    none: "",
    sm: "rounded-md",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-[2rem]",
  }[rounded];

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-forest/8 isolate",
        radius,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
          priority={priority}
          className={cn(
            fit === "cover" ? "object-cover" : "object-contain",
            kenBurns && "anim-ken-burns",
            imgClassName,
          )}
        />
      ) : (
        <Placeholder label={caption ?? alt} />
      )}
      {/* Soft inner edge to soften images against light backgrounds */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-ink/5" />
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 placeholder-shimmer flex items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-linen/80 text-center px-6">
        <ImageIcon className="size-8 opacity-60" strokeWidth={1.25} />
        <span className="text-[0.65rem] tracking-[0.22em] uppercase font-medium opacity-90">
          {label}
        </span>
      </div>
    </div>
  );
}
