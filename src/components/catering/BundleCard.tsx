import { ImageFrame } from "@/components/ui/ImageFrame";
import type { Bundle } from "@/lib/menu";

export function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <article className="group/b relative bg-paper rounded-2xl overflow-hidden border border-ink/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <ImageFrame
        caption={bundle.name}
        alt={bundle.name}
        rounded="none"
        className="aspect-[4/3] w-full"
        kenBurns
      />
      {bundle.tag && (
        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-honey/95 backdrop-blur text-forest-2 text-[0.62rem] tracking-[0.18em] uppercase font-medium px-2.5 py-1">
          {bundle.tag}
        </span>
      )}
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
          <p className="text-xs uppercase tracking-[0.18em] text-ink-3 mt-2 font-medium">
            {bundle.serves}
          </p>
        )}
        {bundle.description && (
          <p className="mt-4 text-sm text-ink-2 leading-relaxed line-clamp-3">
            {bundle.description}
          </p>
        )}
      </div>
    </article>
  );
}
