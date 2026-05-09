"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, X, Check } from "lucide-react";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { useCart } from "@/lib/cart";
import {
  computeLineTotal,
  defaultSelections,
  formatPrice,
  getModifierGroupsForItem,
  parseBasePrice,
  type ModifierGroup,
  type SelectedModifiers,
} from "@/lib/modifiers";
import type { MenuItem } from "@/lib/menu";
import { cn } from "@/lib/cn";

export function Customizer({
  item,
  open,
  onClose,
}: {
  item: MenuItem | null;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && item && <CustomizerInner item={item} onClose={onClose} />}
    </AnimatePresence>
  );
}

function CustomizerInner({
  item,
  onClose,
}: {
  item: MenuItem;
  onClose: () => void;
}) {
  const { addLine } = useCart();
  const groups = useMemo(() => getModifierGroupsForItem(item), [item]);
  const basePrice = parseBasePrice(item.price);

  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<SelectedModifiers>(() =>
    defaultSelections(groups),
  );

  // Reset when item changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset form state when the modal switches items
    setQty(1);
    setSelected(defaultSelections(groups));
  }, [item, groups]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const lineTotal = computeLineTotal(basePrice, groups, selected, qty);

  function pickSingle(groupId: string, optionId: string) {
    setSelected((s) => ({ ...s, [groupId]: optionId }));
  }

  function toggleMulti(groupId: string, optionId: string) {
    setSelected((s) => {
      const cur = (s[groupId] as string[] | undefined) ?? [];
      const next = cur.includes(optionId)
        ? cur.filter((x) => x !== optionId)
        : [...cur, optionId];
      return { ...s, [groupId]: next };
    });
  }

  function handleAdd() {
    addLine({ itemName: item.name, qty, modifiers: selected });
    onClose();
  }

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Customise ${item.name}`}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full sm:max-w-xl bg-paper rounded-t-3xl sm:rounded-3xl shadow-[var(--shadow-lift)] flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Header */}
        <div className="relative">
          <ImageFrame
            src={item.image ? `/images/menu/${item.image}` : undefined}
            caption={item.name}
            alt={item.name}
            rounded="none"
            className="aspect-[16/9] sm:aspect-[5/2] w-full"
            kenBurns={false}
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 inline-grid size-10 place-items-center rounded-full bg-paper/95 backdrop-blur text-ink hover:bg-paper transition shadow-[var(--shadow-soft)]"
          >
            <X className="size-4" strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-3xl text-ink leading-tight">
              {item.name}
            </h2>
            <span className="font-mono text-sm text-forest font-medium whitespace-nowrap">
              {formatPrice(basePrice)}
            </span>
          </div>
          {item.description && (
            <p className="mt-2 text-sm text-ink-2 leading-relaxed">
              {item.description}
            </p>
          )}
          <p className="mt-1 text-[0.65rem] uppercase tracking-[0.22em] text-ink-3 font-medium">
            {item.category}
          </p>

          {groups.length === 0 ? (
            <p className="mt-8 text-sm text-ink-3 italic">
              No options for this item — just pick a quantity.
            </p>
          ) : (
            <div className="mt-8 space-y-7">
              {groups.map((g) => (
                <ModifierBlock
                  key={g.id}
                  group={g}
                  selected={selected[g.id]}
                  onPickSingle={(opt) => pickSingle(g.id, opt)}
                  onToggleMulti={(opt) => toggleMulti(g.id, opt)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-ink/10 bg-bone px-6 py-5 sm:px-8 flex items-center gap-4">
          <div className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-paper p-1">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              aria-label="Decrease quantity"
              className="inline-grid size-9 place-items-center rounded-full text-ink-2 hover:bg-ink/5 transition disabled:opacity-40"
              disabled={qty <= 1}
            >
              <Minus className="size-3.5" strokeWidth={2.25} />
            </button>
            <span className="font-mono text-sm tabular-nums w-6 text-center">
              {qty}
            </span>
            <button
              onClick={() => setQty(Math.min(20, qty + 1))}
              aria-label="Increase quantity"
              className="inline-grid size-9 place-items-center rounded-full text-ink-2 hover:bg-ink/5 transition"
            >
              <Plus className="size-3.5" strokeWidth={2.25} />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="group/cta flex-1 inline-flex items-center justify-center gap-3 rounded-full bg-forest text-linen px-6 py-3 text-sm font-medium tracking-wide hover:bg-forest-2 transition shadow-[0_8px_24px_-12px_rgba(20,18,14,0.45)]"
          >
            <span>Add to order</span>
            <span className="font-mono opacity-80 tabular-nums">
              {formatPrice(lineTotal)}
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ModifierBlock({
  group,
  selected,
  onPickSingle,
  onToggleMulti,
}: {
  group: ModifierGroup;
  selected: string | string[] | undefined;
  onPickSingle: (optionId: string) => void;
  onToggleMulti: (optionId: string) => void;
}) {
  return (
    <fieldset>
      <legend className="flex items-baseline justify-between gap-3 mb-3">
        <span className="text-sm font-medium text-ink">
          {group.label}
          {group.required && (
            <span className="ml-1 text-honey-2" aria-hidden>
              *
            </span>
          )}
        </span>
        <span className="text-xs text-ink-3">
          {group.type === "single"
            ? group.required
              ? "Choose one"
              : "Optional"
            : "Add as many as you like"}
        </span>
      </legend>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {group.options.map((opt) => {
          const active =
            group.type === "single"
              ? selected === opt.id
              : Array.isArray(selected) && selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() =>
                group.type === "single"
                  ? onPickSingle(opt.id)
                  : onToggleMulti(opt.id)
              }
              aria-pressed={active}
              className={cn(
                "group/o relative text-left rounded-xl border px-3.5 py-3 transition-all duration-300",
                active
                  ? "border-forest bg-forest/5 text-ink"
                  : "border-ink/10 bg-paper text-ink-2 hover:border-ink/30",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium leading-tight">
                  {opt.label}
                </span>
                {active && (
                  <Check className="size-3.5 text-forest shrink-0" strokeWidth={2.5} />
                )}
              </div>
              {opt.price > 0 && (
                <span className="mt-1 inline-block text-[0.65rem] font-mono text-forest font-medium">
                  +${opt.price.toFixed(2)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
