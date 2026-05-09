import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
  withArrow?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 font-medium tracking-wide whitespace-nowrap rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-honey/80 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-forest text-linen hover:bg-forest-2 hover:-translate-y-0.5 shadow-[0_8px_24px_-12px_rgba(20,18,14,0.45)] hover:shadow-[0_16px_32px_-12px_rgba(20,18,14,0.55)]",
  secondary:
    "bg-honey text-forest-2 hover:bg-honey-2 hover:text-linen hover:-translate-y-0.5 shadow-[0_8px_24px_-12px_rgba(168,136,66,0.5)]",
  outline:
    "border border-forest/30 text-forest hover:bg-forest hover:text-linen hover:border-forest hover:-translate-y-0.5",
  ghost:
    "text-forest hover:bg-forest/8",
};

const sizes = {
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  withArrow = false,
  type = "button",
  onClick,
}: ButtonProps) {
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowRight
          className="relative z-10 size-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1"
          strokeWidth={2}
        />
      )}
    </>
  );

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
