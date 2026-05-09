import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — Pickup",
  description:
    "Review your order and choose a pickup time. Pay at the counter on collection.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
