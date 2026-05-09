import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Tilt } from "@/components/ui/Tilt";
import type { Bundle } from "@/lib/menu";

export function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <Tilt className="group/b h-full" max={5}>
      <Link
        href="/catering#quote"
        data-cursor="grow"
        className="relative block h-full bg-paper rounded-2xl overflow-hidden border border-ink/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/b:-translate-y-1 group-hover/b:shadow-[var(--shadow-lift)]"
      >
        <div className="relative overflow-hidden">
          <ImageFrame
            src={bundle.image}
            caption={bundle.name}
            alt={bundle.name}
            rounded="none"
            className="aspect-[4/3] w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/b:scale-[1.04]"
            kenBurns
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          {bundle.tag && (
            <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-honey/95 backdrop-blur text-forest-2 text-[0.62rem] tracking-[0.18em] uppercase font-medium px-2.5 py-1">
              {bundle.tag}
            </span>
          )}
          <span
            aria-hidden
            className="absolute bottom-4 right-4 inline-grid size-10 place-items-center rounded-full bg-paper text-forest shadow-[0_8px_24px_-12px_rgba(20,18,14,0.5)] translate-y-3 opacity-0 group-hover/b:translate-y-0 group-hover/b:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <ArrowUpRight className="size-4" strokeWidth={2} />
          </span>
        </div>
        <div className="p-6 md:p-7">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-xl md:text-2xl text-ink leading-tight pr-4">
              {bundle.name}
            </h3>
            <span className="font-mono text-sm text-forest font-medium whitespace-nowrap">
              {bundle.price}
            </span>
          </div>
          {bundle.serves && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-ink-3 font-medium">
              <Users className="size-3" strokeWidth={2} />
              <span>{bundle.serves}</span>
            </p>
          )}
          {bundle.description && (
            <p className="mt-4 text-sm text-ink-2 leading-relaxed line-clamp-3">
              {bundle.description}
            </p>
          )}

          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-forest uppercase tracking-[0.18em] opacity-0 group-hover/b:opacity-100 transition-opacity duration-500">
            <span>Add to brief</span>
            <ArrowUpRight className="size-3 transition-transform duration-300 group-hover/b:translate-x-0.5 group-hover/b:-translate-y-0.5" strokeWidth={2.25} />
          </span>
        </div>
      </Link>
    </Tilt>
  );
}
