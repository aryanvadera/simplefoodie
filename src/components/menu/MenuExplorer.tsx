"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { LayoutGrid, List, Search, X } from "lucide-react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Tilt } from "@/components/ui/Tilt";
import { CountUp } from "@/components/ui/CountUp";
import { menu, menuCategories, type MenuCategory } from "@/lib/menu";
import { cn } from "@/lib/cn";

type Filter = "All" | MenuCategory;
type ViewMode = "grid" | "list";

const categoryAccent: Record<MenuCategory, string> = {
  "Hot Drinks": "bg-terracotta/15 text-terracotta",
  "Cold Drinks": "bg-sage/25 text-forest",
  "Breakfast": "bg-honey/25 text-honey-2",
  "Sandwiches & Wraps": "bg-forest/12 text-forest",
  "Mains & Bowls": "bg-moss/20 text-moss",
  "Bakery & Sweets": "bg-honey/20 text-honey-2",
  "Catering": "bg-forest-2/12 text-forest-2",
};

export function MenuExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    return menu.filter((item) => {
      if (filter !== "All" && item.category !== filter) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filter, query]);

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-20 md:top-24 z-30 bg-linen/85 backdrop-blur-xl -mx-5 md:-mx-8 lg:-mx-12 px-5 md:px-8 lg:px-12 py-4 border-y border-ink/8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Categories */}
          <div className="flex-1 -mx-2 px-2 overflow-x-auto scrollbar-thin">
            <div className="inline-flex gap-1.5">
              {(["All", ...menuCategories] as Filter[]).map((c) => {
                const active = filter === c;
                return (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={cn(
                      "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap",
                      active
                        ? "bg-forest text-linen shadow-[0_4px_12px_-4px_rgba(20,18,14,0.3)]"
                        : "bg-ink/5 text-ink-2 hover:bg-ink/10",
                    )}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search */}
          <div className="relative md:w-72 shrink-0">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-ink-3"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menu…"
              className="w-full bg-paper border border-ink/10 rounded-full pl-10 pr-9 py-2.5 text-sm text-ink placeholder:text-ink-4 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-grid size-6 place-items-center rounded-full text-ink-3 hover:bg-ink/5 hover:text-ink transition"
                aria-label="Clear search"
              >
                <X className="size-3.5" strokeWidth={2} />
              </button>
            )}
          </div>

          {/* View toggle */}
          <div className="hidden md:flex items-center gap-1 p-1 bg-ink/5 rounded-full shrink-0">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "inline-grid size-8 place-items-center rounded-full transition-all duration-300",
                view === "grid"
                  ? "bg-paper text-ink shadow-sm"
                  : "text-ink-3 hover:text-ink",
              )}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
            >
              <LayoutGrid className="size-3.5" strokeWidth={2} />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "inline-grid size-8 place-items-center rounded-full transition-all duration-300",
                view === "list"
                  ? "bg-paper text-ink shadow-sm"
                  : "text-ink-3 hover:text-ink",
              )}
              aria-label="List view"
              aria-pressed={view === "list"}
            >
              <List className="size-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Result count */}
      <div className="mt-10 mb-6 flex items-baseline justify-between">
        <p className="text-sm text-ink-3">
          <span className="font-display text-2xl text-ink mr-2 tabular-nums">
            <CountUp value={filtered.length} duration={500} />
          </span>
          {filtered.length === 1 ? "item" : "items"}
          {filter !== "All" && (
            <>
              {" "}
              in <span className="text-ink">{filter}</span>
            </>
          )}
          {query && (
            <>
              {" "}
              matching &ldquo;
              <span className="text-ink">{query}</span>&rdquo;
            </>
          )}
        </p>
      </div>

      {/* Grid / List */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-3xl text-ink">
            Nothing matches that.
          </p>
          <p className="mt-3 text-ink-3">
            Try a different word, or browse a category.
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i, 12) * 0.03, ease: [0.16, 1, 0.3, 1] }}
            >
                <Tilt className="group/m h-full" max={4}>
                  <article className="relative h-full bg-paper rounded-2xl overflow-hidden border border-ink/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/m:-translate-y-1 group-hover/m:shadow-[var(--shadow-lift)]">
                    <div className="relative overflow-hidden">
                      <ImageFrame
                        src={item.image}
                        caption={item.name}
                        alt={item.name}
                        className="aspect-[5/4] w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/m:scale-[1.04]"
                        rounded="none"
                        kenBurns
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      {item.tag && (
                        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-honey/95 backdrop-blur text-forest-2 text-[0.6rem] tracking-[0.18em] uppercase font-medium px-2.5 py-1">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.2em] font-medium",
                          categoryAccent[item.category],
                        )}
                      >
                        {item.category}
                      </span>
                      <div className="mt-3 flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-lg md:text-xl text-ink leading-tight">
                          {item.name}
                        </h3>
                        <span className="font-mono text-xs text-forest font-medium whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                      {item.description && (
                        <p className="mt-2 text-sm text-ink-2 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </article>
                </Tilt>
              </motion.div>
            ))}
        </div>
      ) : (
        <ul className="divide-y divide-ink/8 border-y border-ink/8">
          {filtered.map((item, i) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.32, delay: Math.min(i, 12) * 0.02, ease: [0.16, 1, 0.3, 1] }}
              className="group/r relative flex items-baseline justify-between gap-6 py-5 md:py-6 hover:bg-ink/[0.02] px-3 -mx-3 rounded-lg transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="font-display text-xl md:text-2xl text-ink leading-tight">
                    {item.name}
                  </h3>
                  {item.tag && (
                    <span className="inline-flex items-center rounded-full bg-honey/25 text-honey-2 text-[0.55rem] tracking-[0.18em] uppercase font-medium px-2 py-0.5">
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.22em] text-ink-3 font-medium">
                  {item.category}
                </p>
                {item.description && (
                  <p className="mt-2 text-sm text-ink-2 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                )}
              </div>
              {/* dotted leader */}
              <span
                aria-hidden
                className="hidden md:block flex-1 self-end mb-2 border-b border-dotted border-ink/20"
              />
              <span className="font-mono text-sm text-forest font-medium whitespace-nowrap shrink-0">
                {item.price}
              </span>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
