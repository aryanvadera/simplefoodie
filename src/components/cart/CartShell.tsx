"use client";

import { CartDrawer } from "./CartDrawer";
import { Customizer } from "./Customizer";
import { useCart } from "@/lib/cart";

/**
 * Renders the slide-in cart drawer and the per-item customizer modal.
 * Both are driven by state on the cart context, so any "Add" button
 * across the site can open the customizer via `useCart().openCustomizer`.
 */
export function CartShell() {
  const { customizingItem, closeCustomizer } = useCart();
  return (
    <>
      <CartDrawer />
      <Customizer
        item={customizingItem}
        open={!!customizingItem}
        onClose={closeCustomizer}
      />
    </>
  );
}
