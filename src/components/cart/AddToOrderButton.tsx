"use client";

import { Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getModifierGroupsForItem, defaultSelections } from "@/lib/modifiers";
import { cn } from "@/lib/cn";
import type { MenuItem } from "@/lib/menu";

type Props = {
  item: MenuItem;
  /** Visual style: pill (rectangular), icon (round). */
  variant?: "pill" | "icon";
  className?: string;
};

/**
 * Tap target that adds an item to the order. If the item has any options,
 * opens the customizer; otherwise drops it straight into the cart.
 */
export function AddToOrderButton({ item, variant = "pill", className }: Props) {
  const { openCustomizer, addLine } = useCart();

  function onClick(e: React.MouseEvent) {
    // Cards wrap this in a Link. Don't navigate when adding.
    e.preventDefault();
    e.stopPropagation();
    const groups = getModifierGroupsForItem(item);
    if (groups.length === 0) {
      addLine({
        itemName: item.name,
        qty: 1,
        modifiers: defaultSelections(groups),
      });
    } else {
      openCustomizer(item);
    }
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Add ${item.name} to order`}
        data-cursor="order"
        className={cn(
          "inline-grid size-10 place-items-center rounded-full bg-paper text-forest shadow-[0_8px_24px_-12px_rgba(20,18,14,0.5)] hover:bg-forest hover:text-linen transition-all duration-300",
          className,
        )}
      >
        <Plus className="size-4" strokeWidth={2.25} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="order"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-forest text-linen px-4 py-2 text-xs font-medium tracking-wide hover:bg-forest-2 transition shadow-[0_8px_24px_-12px_rgba(20,18,14,0.45)]",
        className,
      )}
    >
      <ShoppingBag className="size-3.5" strokeWidth={1.75} />
      <span>Add</span>
    </button>
  );
}
