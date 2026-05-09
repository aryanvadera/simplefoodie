import type { SVGProps } from "react";

/**
 * Brand glyphs that recent Lucide releases no longer ship.
 * Drawn as simple SVG so they accept className/strokeWidth uniformly.
 */

export function Instagram({
  className,
  strokeWidth = 1.5,
  ...props
}: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Facebook({
  className,
  strokeWidth = 1.5,
  ...props
}: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M14 9V6a2 2 0 0 1 2-2h2" />
      <path d="M11 21V9c0-1.1.9-2 2-2h3" />
      <path d="M9 13h6" />
    </svg>
  );
}
