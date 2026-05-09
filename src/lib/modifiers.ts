/**
 * Modifier system — defines option groups (milk type, sweetness, etc.) and
 * which items they apply to.
 *
 * Categories pick up sensible defaults; individual items can override or
 * opt-out via `itemModifierMap`.
 */

import type { MenuCategory, MenuItem } from "./menu";

export type ModifierOption = {
  id: string;
  label: string;
  /** Additional price in AUD added to the item base price. */
  price: number;
  hint?: string;
};

export type ModifierGroup = {
  id: string;
  label: string;
  type: "single" | "multi";
  required: boolean;
  /** Default option id (single-select only). */
  defaultId?: string;
  options: ModifierOption[];
};

export const modifierGroups: Record<string, ModifierGroup> = {
  size: {
    id: "size",
    label: "Size",
    type: "single",
    required: true,
    defaultId: "regular",
    options: [
      { id: "regular", label: "Regular", price: 0 },
      { id: "large", label: "Large", price: 0.5 },
    ],
  },
  milk: {
    id: "milk",
    label: "Milk",
    type: "single",
    required: true,
    defaultId: "full-cream",
    options: [
      { id: "full-cream", label: "Full cream", price: 0 },
      { id: "skim", label: "Skim", price: 0 },
      { id: "lactose-free", label: "Lactose-free", price: 1 },
      { id: "oat", label: "Oat", price: 1 },
      { id: "almond", label: "Almond", price: 1 },
      { id: "soy", label: "Soy", price: 1 },
    ],
  },
  sweetness: {
    id: "sweetness",
    label: "Sugar",
    type: "single",
    required: false,
    defaultId: "none",
    options: [
      { id: "none", label: "No sugar", price: 0 },
      { id: "half", label: "½ sugar", price: 0 },
      { id: "one", label: "1 sugar", price: 0 },
      { id: "two", label: "2 sugars", price: 0 },
    ],
  },
  shot: {
    id: "shot",
    label: "Espresso shot",
    type: "single",
    required: false,
    defaultId: "standard",
    options: [
      { id: "standard", label: "Standard", price: 0 },
      { id: "extra", label: "Extra shot", price: 1 },
      { id: "decaf", label: "Decaf", price: 0 },
      { id: "half", label: "Half-strength", price: 0 },
    ],
  },
  syrup: {
    id: "syrup",
    label: "Syrup",
    type: "single",
    required: false,
    defaultId: "none",
    options: [
      { id: "none", label: "None", price: 0 },
      { id: "vanilla", label: "Vanilla", price: 0.8 },
      { id: "caramel", label: "Caramel", price: 0.8 },
      { id: "hazelnut", label: "Hazelnut", price: 0.8 },
    ],
  },
  iceTemperature: {
    id: "iceTemperature",
    label: "Ice",
    type: "single",
    required: false,
    defaultId: "regular",
    options: [
      { id: "regular", label: "Regular ice", price: 0 },
      { id: "light", label: "Light ice", price: 0 },
      { id: "no-ice", label: "No ice", price: 0 },
    ],
  },
  heat: {
    id: "heat",
    label: "How would you like it?",
    type: "single",
    required: false,
    defaultId: "as-is",
    options: [
      { id: "as-is", label: "As is", price: 0 },
      { id: "pressed", label: "Pressed / hot", price: 0 },
    ],
  },
  warm: {
    id: "warm",
    label: "Warm it up?",
    type: "single",
    required: false,
    defaultId: "no",
    options: [
      { id: "no", label: "Room temp", price: 0 },
      { id: "yes", label: "Warm me up", price: 0 },
    ],
  },
  sandwichExtras: {
    id: "sandwichExtras",
    label: "Add-ons",
    type: "multi",
    required: false,
    options: [
      { id: "avocado", label: "Add avocado", price: 2 },
      { id: "cheese", label: "Add cheese", price: 1 },
      { id: "bacon", label: "Add bacon", price: 3 },
      { id: "egg", label: "Add fried egg", price: 1.5 },
      { id: "extra-sauce", label: "Extra sauce", price: 0.5 },
      { id: "no-onion", label: "No onion", price: 0 },
      { id: "gf-bread", label: "Gluten-free bread", price: 2 },
    ],
  },
  bowlExtras: {
    id: "bowlExtras",
    label: "Add-ons",
    type: "multi",
    required: false,
    options: [
      { id: "extra-protein", label: "Extra protein", price: 3 },
      { id: "avocado", label: "Add avocado", price: 2 },
      { id: "edamame", label: "Extra edamame", price: 1.5 },
      { id: "sauce-side", label: "Sauce on the side", price: 0 },
    ],
  },
};

/* =========================================================
   Category defaults
   ========================================================= */

const categoryDefaults: Record<MenuCategory, string[]> = {
  "Hot Drinks": ["milk", "sweetness", "shot", "syrup"],
  "Cold Drinks": ["milk", "sweetness", "shot", "iceTemperature"],
  "Breakfast": ["warm"],
  "Sandwiches & Wraps": ["heat", "sandwichExtras"],
  "Mains & Bowls": ["bowlExtras"],
  "Bakery & Sweets": ["warm"],
  "Catering": [],
};

/* =========================================================
   Per-item overrides
   ========================================================= */

const itemModifierOverride: Record<string, string[]> = {
  // Hot Drinks — Coffee gets size
  "Coffee": ["size", "milk", "sweetness", "shot", "syrup"],
  // Tea — no milk by default
  "Tea": ["sweetness"],
  // Hot Chocolate — milk + sweetness, no shot
  "Hot Chocolate": ["milk", "sweetness"],
  // Chai / matcha — milk + sweetness + syrup, no shot
  "Matcha Latte (Japanese Ceremonial)": ["milk", "sweetness", "syrup"],
  "Chai Latte": ["milk", "sweetness"],

  // Cold Drinks — juices have no modifiers
  "Green Juice": [],
  "Orange Juice": [],
  "Apple Juice": [],
  // Iced fruit matchas — milk + sweetness, no shot
  "Strawberry Matcha": ["milk", "sweetness", "iceTemperature"],
  "Mango Matcha": ["milk", "sweetness", "iceTemperature"],
  "Coconut Matcha": ["milk", "sweetness", "iceTemperature"],
  "Iced Matcha Frappe": ["milk", "sweetness", "iceTemperature"],
  // Frappes — sweetness only
  "Mango Frappe": ["sweetness", "iceTemperature"],
  "Strawberry Frappe": ["sweetness", "iceTemperature"],
  "Toffee Caramel Frappe": ["sweetness", "iceTemperature"],
  // Long blacks (no milk by definition)
  "Iced Long Black": ["sweetness", "shot", "iceTemperature"],
  "Yuzu Long Black": ["sweetness", "shot", "iceTemperature"],
  "Coconut Long Black": ["sweetness", "shot", "iceTemperature"],

  // Breakfast — eggs/bacon are pre-set, no warm
  "Hashbrown": [],
  "Egg Mayo Brioche": ["sandwichExtras"],
  "Egg Salmon Seeded Brioche": ["sandwichExtras"],
  "Bacon and Egg": ["sandwichExtras"],
  "Spinach and Egg": ["sandwichExtras"],
  "Protein Oats": ["sweetness"],
  // Croissants get a warm option
  "Croissant": ["warm"],
  "Almond Croissant": ["warm"],
  "Pain Au Chocolat": ["warm"],
  "Ham Cheese Croissant": ["warm"],

  // Mains — frittatas no swaps
  "Beef And Mash": [],
  "Chicken Gnocchi": [],
  "Parma And Roasted Veg": [],
  "Spinach and Fetta Egg Frittata": ["warm"],
  "Potato Egg Frittata": ["warm"],
  "Oven-Baked Schnitzel & Spinach Frittata": ["warm"],
  "Oven-Baked Schnitzel & Potato Frittata": ["warm"],

  // Bakery — energy balls no warm
  "Peanut Energy Ball (9g protein)": [],
  "Cocoa Energy Ball (5g protein)": [],
};

export function getModifierGroupsForItem(item: MenuItem): ModifierGroup[] {
  const groupIds =
    itemModifierOverride[item.name] ?? categoryDefaults[item.category] ?? [];
  return groupIds
    .map((id) => modifierGroups[id])
    .filter((g): g is ModifierGroup => Boolean(g));
}

/* =========================================================
   Pricing helpers
   ========================================================= */

/** Parses the menu's price string ("$4.00 – $4.50" / "$2.50") to a number. */
export function parseBasePrice(price: string): number {
  const match = price.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

/** Formats a number as AUD without the trailing zeros when whole. */
export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}

export type SelectedModifiers = Record<string, string | string[] | undefined>;

/** Returns the line total for a single line item with modifiers + quantity. */
export function computeLineTotal(
  basePrice: number,
  groups: ModifierGroup[],
  selected: SelectedModifiers,
  qty: number,
): number {
  let unit = basePrice;
  for (const g of groups) {
    const sel = selected[g.id];
    if (!sel) continue;
    if (g.type === "single" && typeof sel === "string") {
      const opt = g.options.find((o) => o.id === sel);
      if (opt) unit += opt.price;
    } else if (g.type === "multi" && Array.isArray(sel)) {
      for (const id of sel) {
        const opt = g.options.find((o) => o.id === id);
        if (opt) unit += opt.price;
      }
    }
  }
  return unit * qty;
}

/** Default selection for a group of modifiers (uses each group's defaultId). */
export function defaultSelections(groups: ModifierGroup[]): SelectedModifiers {
  const sel: SelectedModifiers = {};
  for (const g of groups) {
    if (g.type === "single" && g.defaultId) {
      sel[g.id] = g.defaultId;
    } else if (g.type === "multi") {
      sel[g.id] = [];
    }
  }
  return sel;
}

/** Pretty summary: "Large · Oat · 1 sugar · +Avocado, Cheese". */
export function summariseModifiers(
  groups: ModifierGroup[],
  selected: SelectedModifiers,
): string {
  const parts: string[] = [];
  for (const g of groups) {
    const sel = selected[g.id];
    if (!sel) continue;
    if (g.type === "single" && typeof sel === "string") {
      const opt = g.options.find((o) => o.id === sel);
      if (!opt) continue;
      // Hide trivial defaults from the summary
      if (g.defaultId === sel && opt.price === 0) continue;
      parts.push(opt.label);
    } else if (g.type === "multi" && Array.isArray(sel) && sel.length) {
      const labels = sel
        .map((id) => g.options.find((o) => o.id === id)?.label)
        .filter(Boolean) as string[];
      if (labels.length) parts.push("+ " + labels.join(", "));
    }
  }
  return parts.join(" · ");
}
