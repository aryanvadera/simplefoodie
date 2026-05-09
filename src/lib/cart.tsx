"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import {
  computeLineTotal,
  getModifierGroupsForItem,
  parseBasePrice,
  summariseModifiers,
  type SelectedModifiers,
} from "./modifiers";
import { menu, type MenuItem } from "./menu";

/* =========================================================
   Types
   ========================================================= */

export type CartLine = {
  /** Stable line id (multiple lines for the same item with different mods). */
  id: string;
  /** Menu item name — used as the lookup key into `menu`. */
  itemName: string;
  qty: number;
  /** Selected modifier values. */
  modifiers: SelectedModifiers;
};

type State = {
  /** Linear array of cart lines. */
  lines: CartLine[];
  /** Mounted on client only — used to skip SSR mismatch on count badges. */
  ready: boolean;
};

type Action =
  | { type: "HYDRATE"; lines: CartLine[] }
  | { type: "ADD"; line: CartLine }
  | { type: "UPDATE"; id: string; patch: Partial<Omit<CartLine, "id">> }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" };

const initialState: State = { lines: [], ready: false };

const STORAGE_KEY = "tsf-cart-v1";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      return { lines: action.lines, ready: true };
    case "ADD": {
      // If a line with the exact same item + modifier signature exists,
      // bump the quantity instead of adding a new row.
      const sigA = signature(action.line);
      const idx = state.lines.findIndex((l) => signature(l) === sigA);
      if (idx >= 0) {
        const next = [...state.lines];
        next[idx] = { ...next[idx], qty: next[idx].qty + action.line.qty };
        return { ...state, lines: next };
      }
      return { ...state, lines: [...state.lines, action.line] };
    }
    case "UPDATE":
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.id === action.id ? { ...l, ...action.patch } : l,
        ),
      };
    case "REMOVE":
      return { ...state, lines: state.lines.filter((l) => l.id !== action.id) };
    case "CLEAR":
      return { ...state, lines: [] };
  }
}

function signature(line: CartLine): string {
  // Stable signature for de-duping equivalent line items
  const mods = Object.entries(line.modifiers)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) =>
      Array.isArray(v) ? `${k}:[${[...v].sort().join(",")}]` : `${k}:${v}`,
    )
    .join("|");
  return `${line.itemName}#${mods}`;
}

/* =========================================================
   Context
   ========================================================= */

type ContextValue = {
  ready: boolean;
  lines: CartLine[];
  /** Total number of items (sum of quantities). */
  count: number;
  /** Subtotal in AUD. */
  subtotal: number;
  /** Detailed lines with menuItem reference and resolved totals. */
  detailed: Array<{
    line: CartLine;
    menuItem: MenuItem | undefined;
    unitPrice: number;
    lineTotal: number;
    summary: string;
  }>;
  addLine: (input: { itemName: string; qty: number; modifiers: SelectedModifiers }) => void;
  updateQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
  clear: () => void;
  /** UI: open/close the slide-in cart drawer. */
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  /** UI: open the item customizer modal. */
  customizingItem: MenuItem | null;
  openCustomizer: (item: MenuItem) => void;
  closeCustomizer: () => void;
};

const CartContext = createContext<ContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", lines: parsed });
          return;
        }
      }
    } catch {
      /* ignore */
    }
    dispatch({ type: "HYDRATE", lines: [] });
  }, []);

  // Persist on change (only after hydration completes)
  useEffect(() => {
    if (!state.ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* quota / private mode — ignore */
    }
  }, [state.lines, state.ready]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const addLine = useCallback<ContextValue["addLine"]>(
    ({ itemName, qty, modifiers }) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `l-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      dispatch({ type: "ADD", line: { id, itemName, qty, modifiers } });
      setDrawerOpen(true);
    },
    [],
  );

  const updateQty = useCallback<ContextValue["updateQty"]>((id, qty) => {
    if (qty <= 0) {
      dispatch({ type: "REMOVE", id });
    } else {
      dispatch({ type: "UPDATE", id, patch: { qty } });
    }
  }, []);

  const removeLine = useCallback<ContextValue["removeLine"]>((id) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const detailed = useMemo(() => {
    return state.lines.map((line) => {
      const menuItem = menu.find((m) => m.name === line.itemName);
      const groups = menuItem ? getModifierGroupsForItem(menuItem) : [];
      const base = menuItem ? parseBasePrice(menuItem.price) : 0;
      const lineTotal = computeLineTotal(base, groups, line.modifiers, line.qty);
      const unitPrice = line.qty > 0 ? lineTotal / line.qty : 0;
      const summary = summariseModifiers(groups, line.modifiers);
      return { line, menuItem, unitPrice, lineTotal, summary };
    });
  }, [state.lines]);

  const subtotal = useMemo(
    () => detailed.reduce((sum, d) => sum + d.lineTotal, 0),
    [detailed],
  );

  const count = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.qty, 0),
    [state.lines],
  );

  const value = useMemo<ContextValue>(
    () => ({
      ready: state.ready,
      lines: state.lines,
      count,
      subtotal,
      detailed,
      addLine,
      updateQty,
      removeLine,
      clear,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      customizingItem,
      openCustomizer: (item) => setCustomizingItem(item),
      closeCustomizer: () => setCustomizingItem(null),
    }),
    [
      state.ready,
      state.lines,
      count,
      subtotal,
      detailed,
      addLine,
      updateQty,
      removeLine,
      clear,
      drawerOpen,
      customizingItem,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): ContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
