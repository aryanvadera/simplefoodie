/**
 * Menu data — sourced from the existing Square shop catalog.
 * Prices in AUD. We link out to Square for actual ordering until
 * the owner approves migrating off Square.
 */

export type MenuItem = {
  name: string;
  price: string;        // displayed string, e.g. "$4.00 – $4.50"
  category: MenuCategory;
  description?: string;
  tag?: "popular" | "new" | "vegan" | "vegetarian";
  /** Image filename in /public/images/menu — supplied by the client. */
  image?: string;
};

export type MenuCategory =
  | "Hot Drinks"
  | "Cold Drinks"
  | "Breakfast"
  | "Sandwiches & Wraps"
  | "Mains & Bowls"
  | "Bakery & Sweets"
  | "Catering";

export const menuCategories: MenuCategory[] = [
  "Hot Drinks",
  "Cold Drinks",
  "Breakfast",
  "Sandwiches & Wraps",
  "Mains & Bowls",
  "Bakery & Sweets",
  "Catering",
];

export const menu: MenuItem[] = [
  // ─── Hot Drinks ──────────────────────────────────────────
  { name: "Coffee",        price: "$4.00 – $4.50", category: "Hot Drinks", description: "Single-origin espresso, ground fresh through the rush." , tag: "popular" },
  { name: "Hot Chocolate", price: "$4.50",         category: "Hot Drinks", description: "Belgian dark chocolate, steamed milk, fine cocoa dust." },
  { name: "Matcha Latte (Japanese Ceremonial)", price: "$4.50", category: "Hot Drinks", description: "Whisked stone-ground matcha with steamed milk." },
  { name: "Chai Latte",    price: "$4.50",         category: "Hot Drinks", description: "House-spiced chai concentrate, slow simmered." },
  { name: "Tea",           price: "$4.50",         category: "Hot Drinks", description: "Loose-leaf — English Breakfast, Earl Grey, Peppermint, Green." },

  // ─── Cold Drinks ─────────────────────────────────────────
  { name: "Iced Latte",        price: "$6.90", category: "Cold Drinks", description: "Double-shot espresso over ice, full cream or oat.", tag: "popular" },
  { name: "Iced Long Black",   price: "$6.90", category: "Cold Drinks" },
  { name: "Iced Coffee",       price: "$6.90", category: "Cold Drinks" },
  { name: "Iced Chocolate",    price: "$6.90", category: "Cold Drinks" },
  { name: "Iced Chai",         price: "$6.90", category: "Cold Drinks" },
  { name: "Iced Matcha Frappe",price: "$6.90", category: "Cold Drinks" },
  { name: "Strawberry Matcha", price: "$7.50", category: "Cold Drinks", description: "Fresh strawberry compote, ceremonial matcha, milk of choice.", tag: "new" },
  { name: "Mango Matcha",      price: "$7.50", category: "Cold Drinks" },
  { name: "Coconut Matcha",    price: "$7.50", category: "Cold Drinks" },
  { name: "Yuzu Long Black",   price: "$7.50", category: "Cold Drinks", description: "Cold espresso lifted with Japanese citrus." },
  { name: "Coconut Long Black",price: "$7.50", category: "Cold Drinks" },
  { name: "Mango Frappe",      price: "$6.90", category: "Cold Drinks" },
  { name: "Strawberry Frappe", price: "$6.90", category: "Cold Drinks" },
  { name: "Toffee Caramel Frappe", price: "$6.90", category: "Cold Drinks" },
  { name: "Green Juice",       price: "$4.50", category: "Cold Drinks", tag: "vegan" },
  { name: "Orange Juice",      price: "$4.50", category: "Cold Drinks" },
  { name: "Apple Juice",       price: "$4.50", category: "Cold Drinks" },

  // ─── Breakfast ───────────────────────────────────────────
  { name: "Egg Mayo Brioche",  price: "$5.90", category: "Breakfast", description: "Soft brioche bun, free-range egg mayo, chives.", tag: "popular" },
  { name: "Egg Salmon Seeded Brioche", price: "$6.90", category: "Breakfast", description: "Smoked salmon, egg, dill, on a seeded brioche." },
  { name: "Protein Oats",      price: "$6.90", category: "Breakfast", description: "Slow-cooked oats, protein boost, seasonal fruit, honey." },
  { name: "Bacon and Egg",     price: "$8.50", category: "Breakfast", description: "Crispy bacon, fried egg, tomato relish, toasted brioche." },
  { name: "Spinach and Egg",   price: "$8.50", category: "Breakfast", description: "Wilted spinach, soft-set egg, brioche.", tag: "vegetarian" },
  { name: "Hashbrown",         price: "$2.50", category: "Breakfast" },
  { name: "Croissant",         price: "$5.00", category: "Breakfast", description: "Laminated 72 hours. All butter." },
  { name: "Almond Croissant",  price: "$7.00", category: "Breakfast", description: "Twice-baked, soaked in almond syrup, frangipane within." },
  { name: "Pain Au Chocolat",  price: "$6.00", category: "Breakfast" },
  { name: "Ham Cheese Croissant", price: "$8.00", category: "Breakfast" },

  // ─── Sandwiches & Wraps ──────────────────────────────────
  { name: "Chicken Schnitzel Sandwich", price: "$12.90", category: "Sandwiches & Wraps", description: "Oven-baked schnitzel, slaw, garlic aioli, milk bun.", tag: "popular" },
  { name: "Chicken Avocado Sandwich",   price: "$12.90", category: "Sandwiches & Wraps" },
  { name: "Beef Caramelised Onion Sandwich", price: "$14.90", category: "Sandwiches & Wraps", description: "Slow-braised beef, sweet onion jam, mustard mayo, sourdough." },
  { name: "Chicken Schnitzel Wrap",     price: "$11.90", category: "Sandwiches & Wraps" },
  { name: "Chicken & Avo Wrap",         price: "$11.90", category: "Sandwiches & Wraps" },
  { name: "Pulled Mushroom Wrap (Vegan)", price: "$11.90", category: "Sandwiches & Wraps", tag: "vegan" },
  { name: "Pizza Grill",                price: "$9.90",  category: "Sandwiches & Wraps", description: "Hot pressed flatbread, mozzarella, San Marzano, basil." },

  // ─── Mains & Bowls ───────────────────────────────────────
  { name: "Beef And Mash",     price: "$11.90", category: "Mains & Bowls", description: "Slow-braised beef, buttered potato mash, jus." },
  { name: "Chicken Gnocchi",   price: "$11.90", category: "Mains & Bowls" },
  { name: "Parma And Roasted Veg", price: "$12.90", category: "Mains & Bowls" },
  { name: "Oven-Baked Schnitzel & Spinach Frittata", price: "$12.90", category: "Mains & Bowls" },
  { name: "Oven-Baked Schnitzel & Potato Frittata",  price: "$12.90", category: "Mains & Bowls" },
  { name: "Spinach and Fetta Egg Frittata", price: "$8.50", category: "Mains & Bowls", tag: "vegetarian" },
  { name: "Potato Egg Frittata",            price: "$8.50", category: "Mains & Bowls", tag: "vegetarian" },
  { name: "Mushroom Poke Bowl (Vegetarian)",price: "$10.90", category: "Mains & Bowls", tag: "vegetarian" },
  { name: "Chicken Poke Bowl",              price: "$10.90", category: "Mains & Bowls", description: "Sushi rice, edamame, pickled ginger, sesame, soy.", tag: "popular" },
  { name: "Chicken Tender Salad",           price: "$9.90",  category: "Mains & Bowls" },

  // ─── Bakery & Sweets ─────────────────────────────────────
  { name: "Tiramisu",          price: "$9.00", category: "Bakery & Sweets", description: "Mascarpone, espresso-soaked savoiardi, cocoa.", tag: "popular" },
  { name: "Strawberry Dessert Cup", price: "$7.90", category: "Bakery & Sweets" },
  { name: "Lychee and Rose Dessert Cup", price: "$7.90", category: "Bakery & Sweets", tag: "new" },
  { name: "Peach and Dulce de Leche Dessert Cup", price: "$7.90", category: "Bakery & Sweets" },
  { name: "Cheesecake",        price: "$5.90", category: "Bakery & Sweets" },
  { name: "Choco Torta",       price: "$5.90", category: "Bakery & Sweets" },
  { name: "Lemon Meringue",    price: "$4.50", category: "Bakery & Sweets" },
  { name: "Banana Bread",      price: "$4.50", category: "Bakery & Sweets" },
  { name: "Jam Doughnuts",     price: "$4.00", category: "Bakery & Sweets" },
  { name: "Choco Cookie",      price: "$4.00", category: "Bakery & Sweets" },
  { name: "Red Velvet Smore's Cookie", price: "$4.50", category: "Bakery & Sweets" },
  { name: "Peanut Butter & Jam Cookie", price: "$4.00", category: "Bakery & Sweets" },
  { name: "Pistachio Cookie",  price: "$4.00", category: "Bakery & Sweets" },
  { name: "Coffee and Dulce de Leche Cookie", price: "$4.00", category: "Bakery & Sweets" },
  { name: "Matcha Cookie",     price: "$4.00", category: "Bakery & Sweets" },
  { name: "Cookies and Cream Cookie", price: "$4.00", category: "Bakery & Sweets" },
  { name: "Peanut Energy Ball (9g protein)", price: "$2.90", category: "Bakery & Sweets" },
  { name: "Cocoa Energy Ball (5g protein)",  price: "$2.90", category: "Bakery & Sweets" },
];

/* ─────────────────────────────────────────────────────────
   Catering bundles & boxes — corporate-ready
   ───────────────────────────────────────────────────────── */

export type Bundle = {
  name: string;
  price: string;
  serves?: string;          // "10–12 people"
  tag?: "popular" | "new" | "vegan-friendly";
  description?: string;
  image?: string;
};

export const popularBundles: Bundle[] = [
  {
    name: "The Breakfast & Brunch Essential Bundle",
    price: "$125",
    serves: "10–12 people",
    tag: "popular",
    description:
      "Two-box set curated to start your team's day with the perfect balance of savoury and sweet.",
  },
  {
    name: "Signature Savoury Slider & Bun Bundle",
    price: "$155",
    serves: "12–14 people",
    description:
      "Variety meets quality — gourmet sliders, signature buns, and seasonal accompaniments.",
  },
  {
    name: "Morning Tea Sweet Bundle",
    price: "$95",
    serves: "10–12 people",
    description:
      "Two boxes of our most-loved sweets, pastries and dessert cups for the morning meeting.",
  },
  {
    name: "The Refreshing Morning Brunch Bundle",
    price: "$125",
    serves: "10–12 people",
    description:
      "Warm pastries, fresh granola pots, sweet bites and cold-pressed juices in one delivery.",
  },
  {
    name: "Savoury Bites + Crispy Rolls Bundle",
    price: "$109",
    serves: "12–16 people",
    description:
      "Two of our most-popular catering platters bundled — savoury bites and crispy rolls.",
  },
  {
    name: "Savory Arancini & Protein Scroll Bundle",
    price: "$105",
    serves: "10–12 people",
    description:
      "Hand-rolled arancini and protein-packed scrolls, baked fresh and ready to share.",
  },
];

export const cateringBoxes: Bundle[] = [
  { name: "Egg & Salmon Bun Box",            price: "$79",  serves: "12 buns",   description: "Soft brioche buns with smoked salmon, dill and house egg mayo." },
  { name: "Mini Pastries Catering Box",      price: "$45",  serves: "16 pieces", description: "A premium selection of artisanal French-style pastries." },
  { name: "Gourmet Banana Bread & Cookie Box", price: "$55", serves: "Sharing platter", description: "Generous sharing box of banana bread slices and assorted cookies." },
  { name: "Signature Butter & Almond Croissant Collection", price: "$69", serves: "12 pieces", description: "12-piece croissant platter — half butter, half almond." },
  { name: "Mini Ham & Cheese Croissants",    price: "$55",  serves: "12 pieces" },
  { name: "Granola Yoghurt Pots",            price: "$48",  serves: "12 pots",   description: "Greek yoghurt, house granola, seasonal fruit, in single-serve pots." },
  { name: "Dessert Cups",                    price: "$94",  serves: "12 units",  description: "Mixed dessert-cup platter — strawberry, lychee-rose, dulce de leche." },
  { name: "Mixed Sliders Collection",        price: "$79",  serves: "Sharing platter", description: "A diverse, health-conscious range of slider flavours." },
  { name: "Oven-Baked Chicken Schnitzel Slider Box", price: "$79", serves: "Sharing platter" },
  { name: "Signature Baguette & Ciabatta",   price: "$75",  serves: "12 pieces" },
  { name: "Signature Mixed Wrap Box",        price: "$139", serves: "24 pieces" },
  { name: "Crispy Rolls Catering Box",       price: "$55",  serves: "24 pieces", description: "Gourmet spring rolls — crisp, fresh, ready to share." },
  { name: "Arancini Catering Box",           price: "$55",  serves: "30 pieces", description: "Hand-rolled, golden-crisp arancini bites." },
  { name: "Savoury Bites Catering Box",      price: "$65",  serves: "36 pieces", description: "A perfect platter of bite-sized savoury favourites, freshly baked." },
  { name: "Gourmet Frittata Box",            price: "$59",  serves: "Sharing platter" },
  { name: "Popcorn Chicken & Sausage Roll Platter", price: "$49", serves: "Sharing platter" },
  { name: "High Protein Scrolls Box",        price: "$55",  serves: "24 pieces", description: "Freshly baked savoury scrolls — 5g protein each." },
  { name: "Mixed Juices",                    price: "$40",  serves: "10-pack" },
];
