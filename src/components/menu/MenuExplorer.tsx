"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X } from "lucide-react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { menu, menuCategories, type MenuCategory } from "@/lib/menu";
import { cn } from "@/lib/cn";

type Filter = "All" | MenuCategory;

export function MenuExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

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
                        ? "bg-forest text-linen"
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
        </div>
      </div>

      {/* Result count */}
      <div className="mt-10 mb-6 flex items-baseline justify-between">
        <p className="text-sm text-ink-3">
          <span className="font-display text-2xl text-ink mr-2">
            {filtered.length}
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

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-3xl text-ink">
            Nothing matches that.
          </p>
          <p className="mt-3 text-ink-3">
            Try a different word, or browse a category.
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.article
                key={item.name}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group/m relative bg-paper rounded-2xl overflow-hidden border border-ink/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <ImageFrame
                  caption={item.name}
                  alt={item.name}
                  className="aspect-[5/4] w-full"
                  rounded="none"
                  kenBurns
                />
                {item.tag && (
                  <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-honey/95 backdrop-blur text-forest-2 text-[0.6rem] tracking-[0.18em] uppercase font-medium px-2.5 py-1">
                    {item.tag}
                  </span>
                )}
                <div className="p-5">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-3 font-medium">
                    {item.category}
                  </p>
                  <div className="mt-2 flex items-baseline justify-between gap-3">
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
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
