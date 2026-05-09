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
  { name: "Coffee",        price: "$4.00 – $4.50", category: "Hot Drinks", description: "Single-origin espresso, ground fresh through the rush." , tag: "popular", image: "/images/menu/coffee.jpeg" },
  { name: "Hot Chocolate", price: "$4.50",         category: "Hot Drinks", description: "Belgian dark chocolate, steamed milk, fine cocoa dust.", image: "/images/menu/hot-chocolate.jpeg" },
  { name: "Matcha Latte (Japanese Ceremonial)", price: "$4.50", category: "Hot Drinks", description: "Whisked stone-ground matcha with steamed milk.", image: "/images/menu/matcha-latte-japanese-ceremonial.jpeg" },
  { name: "Chai Latte",    price: "$4.50",         category: "Hot Drinks", description: "House-spiced chai concentrate, slow simmered.", image: "/images/menu/chai-latte.jpeg" },
  { name: "Tea",           price: "$4.50",         category: "Hot Drinks", description: "Loose-leaf — English Breakfast, Earl Grey, Peppermint, Green.", image: "/images/menu/tea.jpeg" },

  // ─── Cold Drinks ─────────────────────────────────────────
  { name: "Iced Latte",        price: "$6.90", category: "Cold Drinks", description: "Double-shot espresso over ice, full cream or oat.", tag: "popular", image: "/images/menu/iced-latte.jpeg" },
  { name: "Iced Long Black",   price: "$6.90", category: "Cold Drinks", image: "/images/menu/iced-long-black.jpeg" },
  { name: "Iced Coffee",       price: "$6.90", category: "Cold Drinks", image: "/images/menu/iced-coffee.jpeg" },
  { name: "Iced Chocolate",    price: "$6.90", category: "Cold Drinks", image: "/images/menu/iced-chocolate.jpeg" },
  { name: "Iced Chai",         price: "$6.90", category: "Cold Drinks", image: "/images/menu/iced-chai.jpeg" },
  { name: "Iced Matcha Frappe",price: "$6.90", category: "Cold Drinks", image: "/images/menu/iced-matcha-frappe.jpg" },
  { name: "Strawberry Matcha", price: "$7.50", category: "Cold Drinks", description: "Fresh strawberry compote, ceremonial matcha, milk of choice.", tag: "new", image: "/images/menu/strawberry-matcha.jpeg" },
  { name: "Mango Matcha",      price: "$7.50", category: "Cold Drinks", image: "/images/menu/mango-matcha.jpeg" },
  { name: "Coconut Matcha",    price: "$7.50", category: "Cold Drinks", image: "/images/menu/coconut-matcha.jpeg" },
  { name: "Yuzu Long Black",   price: "$7.50", category: "Cold Drinks", description: "Cold espresso lifted with Japanese citrus.", image: "/images/menu/yuzu-long-black.jpeg" },
  { name: "Coconut Long Black",price: "$7.50", category: "Cold Drinks", image: "/images/menu/coconut-long-black.jpeg" },
  { name: "Mango Frappe",      price: "$6.90", category: "Cold Drinks", image: "/images/menu/mango-frappe.jpeg" },
  { name: "Strawberry Frappe", price: "$6.90", category: "Cold Drinks", image: "/images/menu/strawberry-frappe.jpeg" },
  { name: "Toffee Caramel Frappe", price: "$6.90", category: "Cold Drinks", image: "/images/menu/toffee-caramel-frappe.jpeg" },
  { name: "Green Juice",       price: "$4.50", category: "Cold Drinks", tag: "vegan", image: "/images/menu/green-juice.jpeg" },
  { name: "Orange Juice",      price: "$4.50", category: "Cold Drinks", image: "/images/menu/orange-juice.jpeg" },
  { name: "Apple Juice",       price: "$4.50", category: "Cold Drinks", image: "/images/menu/apple-juice.jpeg" },

  // ─── Breakfast ───────────────────────────────────────────
  { name: "Egg Mayo Brioche",  price: "$5.90", category: "Breakfast", description: "Soft brioche bun, free-range egg mayo, chives.", tag: "popular", image: "/images/menu/egg-mayo-brioche.png" },
  { name: "Egg Salmon Seeded Brioche", price: "$6.90", category: "Breakfast", description: "Smoked salmon, egg, dill, on a seeded brioche.", image: "/images/menu/egg-salmon-seeded-brioche.png" },
  { name: "Protein Oats",      price: "$6.90", category: "Breakfast", description: "Slow-cooked oats, protein boost, seasonal fruit, honey.", image: "/images/menu/protein-oats.jpeg" },
  { name: "Bacon and Egg",     price: "$8.50", category: "Breakfast", description: "Crispy bacon, fried egg, tomato relish, toasted brioche.", image: "/images/menu/bacon-and-egg.png" },
  { name: "Spinach and Egg",   price: "$8.50", category: "Breakfast", description: "Wilted spinach, soft-set egg, brioche.", tag: "vegetarian", image: "/images/menu/spinach-and-egg.png" },
  { name: "Hashbrown",         price: "$2.50", category: "Breakfast", image: "/images/menu/hashbrown.jpeg" },
  { name: "Croissant",         price: "$5.00", category: "Breakfast", description: "Laminated 72 hours. All butter.", image: "/images/menu/croissant.jpeg" },
  { name: "Almond Croissant",  price: "$7.00", category: "Breakfast", description: "Twice-baked, soaked in almond syrup, frangipane within.", image: "/images/menu/almond-croissant.jpeg" },
  { name: "Pain Au Chocolat",  price: "$6.00", category: "Breakfast", image: "/images/menu/pain-au-chocolat.jpeg" },
  { name: "Ham Cheese Croissant", price: "$8.00", category: "Breakfast", image: "/images/menu/ham-cheese-croissant.png" },

  // ─── Sandwiches & Wraps ──────────────────────────────────
  { name: "Chicken Schnitzel Sandwich", price: "$12.90", category: "Sandwiches & Wraps", description: "Oven-baked schnitzel, slaw, garlic aioli, milk bun.", tag: "popular", image: "/images/menu/chicken-schnitzel-sandwich.png" },
  { name: "Chicken Avocado Sandwich",   price: "$12.90", category: "Sandwiches & Wraps", image: "/images/menu/chicken-avocado-sandwich.png" },
  { name: "Beef Caramelised Onion Sandwich", price: "$14.90", category: "Sandwiches & Wraps", description: "Slow-braised beef, sweet onion jam, mustard mayo, sourdough.", image: "/images/menu/beef-caramelised-onion-sandwich.png" },
  { name: "Chicken Schnitzel Wrap",     price: "$11.90", category: "Sandwiches & Wraps", image: "/images/menu/chicken-schnitzel-wrap.jpeg" },
  { name: "Chicken & Avo Wrap",         price: "$11.90", category: "Sandwiches & Wraps", image: "/images/menu/chicken-avo-wrap.jpeg" },
  { name: "Pulled Mushroom Wrap (Vegan)", price: "$11.90", category: "Sandwiches & Wraps", tag: "vegan", image: "/images/menu/pulled-mushroom-wrap-vegan.png" },
  { name: "Pizza Grill",                price: "$9.90",  category: "Sandwiches & Wraps", description: "Hot pressed flatbread, mozzarella, San Marzano, basil.", image: "/images/menu/pizza-grill.jpg" },

  // ─── Mains & Bowls ───────────────────────────────────────
  { name: "Beef And Mash",     price: "$11.90", category: "Mains & Bowls", description: "Slow-braised beef, buttered potato mash, jus.", image: "/images/menu/beef-and-mash.png" },
  { name: "Chicken Gnocchi",   price: "$11.90", category: "Mains & Bowls", image: "/images/menu/chicken-gnocchi.jpeg" },
  { name: "Parma And Roasted Veg", price: "$12.90", category: "Mains & Bowls", image: "/images/menu/parma-and-roasted-veg.jpeg" },
  { name: "Oven-Baked Schnitzel & Spinach Frittata", price: "$12.90", category: "Mains & Bowls", image: "/images/menu/oven-baked-schnitzel-spinach-frittata.jpg" },
  { name: "Oven-Baked Schnitzel & Potato Frittata",  price: "$12.90", category: "Mains & Bowls", image: "/images/menu/oven-baked-schnitzel-potato-frittata.png" },
  { name: "Spinach and Fetta Egg Frittata", price: "$8.50", category: "Mains & Bowls", tag: "vegetarian", image: "/images/menu/spinach-and-fetta-egg-frittata.jpg" },
  { name: "Potato Egg Frittata",            price: "$8.50", category: "Mains & Bowls", tag: "vegetarian", image: "/images/menu/potato-egg-frittata.jpeg" },
  { name: "Mushroom Poke Bowl (Vegetarian)",price: "$10.90", category: "Mains & Bowls", tag: "vegetarian", image: "/images/menu/mushroom-poke-bowl-vegetarian.png" },
  { name: "Chicken Poke Bowl",              price: "$10.90", category: "Mains & Bowls", description: "Sushi rice, edamame, pickled ginger, sesame, soy.", tag: "popular", image: "/images/menu/chicken-poke-bowl.png" },
  { name: "Chicken Tender Salad",           price: "$9.90",  category: "Mains & Bowls", image: "/images/menu/chicken-tender-salad.jpeg" },

  // ─── Bakery & Sweets ─────────────────────────────────────
  { name: "Tiramisu",          price: "$9.00", category: "Bakery & Sweets", description: "Mascarpone, espresso-soaked savoiardi, cocoa.", tag: "popular", image: "/images/menu/tiramisu.png" },
  { name: "Strawberry Dessert Cup", price: "$7.90", category: "Bakery & Sweets", image: "/images/menu/strawberry-dessert-cup.png" },
  { name: "Lychee and Rose Dessert Cup", price: "$7.90", category: "Bakery & Sweets", tag: "new", image: "/images/menu/lychee-and-rose-dessert-cup.png" },
  { name: "Peach and Dulce de Leche Dessert Cup", price: "$7.90", category: "Bakery & Sweets", image: "/images/menu/peach-and-dulce-de-leche-dessert-cup.png" },
  { name: "Cheesecake",        price: "$5.90", category: "Bakery & Sweets", image: "/images/menu/cheesecake.jpeg" },
  { name: "Choco Torta",       price: "$5.90", category: "Bakery & Sweets", image: "/images/menu/choco-torta.jpg" },
  { name: "Lemon Meringue",    price: "$4.50", category: "Bakery & Sweets", image: "/images/menu/lemon-meringue.jpg" },
  { name: "Banana Bread",      price: "$4.50", category: "Bakery & Sweets", image: "/images/menu/banana-bread.jpeg" },
  { name: "Jam Doughnuts",     price: "$4.00", category: "Bakery & Sweets", image: "/images/menu/jam-doughnuts.jpg" },
  { name: "Choco Cookie",      price: "$4.00", category: "Bakery & Sweets", image: "/images/menu/choco-cookie.jpeg" },
  { name: "Red Velvet Smore's Cookie", price: "$4.50", category: "Bakery & Sweets", image: "/images/menu/red-velvet-smore-s-cookie.jpeg" },
  { name: "Peanut Butter & Jam Cookie", price: "$4.00", category: "Bakery & Sweets", image: "/images/menu/peanut-butter-jam-cookie.jpeg" },
  { name: "Pistachio Cookie",  price: "$4.00", category: "Bakery & Sweets", image: "/images/menu/pistachio-cookie.png" },
  { name: "Coffee and Dulce de Leche Cookie", price: "$4.00", category: "Bakery & Sweets", image: "/images/menu/coffee-and-dulce-de-leche-cookie.jpeg" },
  { name: "Matcha Cookie",     price: "$4.00", category: "Bakery & Sweets", image: "/images/menu/matcha-cookie.jpeg" },
  { name: "Cookies and Cream Cookie", price: "$4.00", category: "Bakery & Sweets", image: "/images/menu/cookies-and-cream-cookie.png" },
  { name: "Peanut Energy Ball (9g protein)", price: "$2.90", category: "Bakery & Sweets", image: "/images/menu/peanut-energy-ball-9g-protein.png" },
  { name: "Cocoa Energy Ball (5g protein)",  price: "$2.90", category: "Bakery & Sweets", image: "/images/menu/cocoa-energy-ball-5g-protein.png" },
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
    image: "/images/catering/the-breakfast-brunch-essential-bundle.png"
  },
  {
    name: "Signature Savoury Slider & Bun Bundle",
    price: "$155",
    serves: "12–14 people",
    description:
      "Variety meets quality — gourmet sliders, signature buns, and seasonal accompaniments.",
    image: "/images/catering/signature-savoury-slider-bun-bundle.png"
  },
  {
    name: "Morning Tea Sweet Bundle",
    price: "$95",
    serves: "10–12 people",
    description:
      "Two boxes of our most-loved sweets, pastries and dessert cups for the morning meeting.",
    image: "/images/catering/morning-tea-sweet-bundle.png"
  },
  {
    name: "The Refreshing Morning Brunch Bundle",
    price: "$125",
    serves: "10–12 people",
    description:
      "Warm pastries, fresh granola pots, sweet bites and cold-pressed juices in one delivery.",
    image: "/images/catering/the-refreshing-morning-brunch-bundle.png"
  },
  {
    name: "Savoury Bites + Crispy Rolls Bundle",
    price: "$109",
    serves: "12–16 people",
    description:
      "Two of our most-popular catering platters bundled — savoury bites and crispy rolls.",
    image: "/images/catering/savoury-bites-crispy-rolls-bundle.jpg"
  },
  {
    name: "Savory Arancini & Protein Scroll Bundle",
    price: "$105",
    serves: "10–12 people",
    description:
      "Hand-rolled arancini and protein-packed scrolls, baked fresh and ready to share.",
    image: "/images/catering/savory-arancini-protein-scroll-bundle.png"
  },
];

export const cateringBoxes: Bundle[] = [
  { name: "Egg & Salmon Bun Box",            price: "$79",  serves: "12 buns",   description: "Soft brioche buns with smoked salmon, dill and house egg mayo.", image: "/images/catering/egg-salmon-bun-box.png" },
  { name: "Mini Pastries Catering Box",      price: "$45",  serves: "16 pieces", description: "A premium selection of artisanal French-style pastries.", image: "/images/catering/mini-pastries-catering-box.png" },
  { name: "Gourmet Banana Bread & Cookie Box", price: "$55", serves: "Sharing platter", description: "Generous sharing box of banana bread slices and assorted cookies.", image: "/images/catering/gourmet-banana-bread-cookie-box.jpeg" },
  { name: "Signature Butter & Almond Croissant Collection", price: "$69", serves: "12 pieces", description: "12-piece croissant platter — half butter, half almond.", image: "/images/catering/signature-butter-almond-croissant-collection.jpeg" },
  { name: "Mini Ham & Cheese Croissants",    price: "$55",  serves: "12 pieces", image: "/images/catering/mini-ham-cheese-croissants.png" },
  { name: "Granola Yoghurt Pots",            price: "$48",  serves: "12 pots",   description: "Greek yoghurt, house granola, seasonal fruit, in single-serve pots.", image: "/images/catering/granola-yoghurt-pots.png" },
  { name: "Dessert Cups",                    price: "$94",  serves: "12 units",  description: "Mixed dessert-cup platter — strawberry, lychee-rose, dulce de leche.", image: "/images/catering/dessert-cups.png" },
  { name: "Mixed Sliders Collection",        price: "$79",  serves: "Sharing platter", description: "A diverse, health-conscious range of slider flavours.", image: "/images/catering/mixed-sliders-collection.png" },
  { name: "Oven-Baked Chicken Schnitzel Slider Box", price: "$79", serves: "Sharing platter", image: "/images/catering/oven-baked-chicken-schnitzel-slider-box.png" },
  { name: "Signature Baguette & Ciabatta",   price: "$75",  serves: "12 pieces", image: "/images/catering/signature-baguette-ciabatta.png" },
  { name: "Signature Mixed Wrap Box",        price: "$139", serves: "24 pieces", image: "/images/catering/signature-mixed-wrap-box.jpeg" },
  { name: "Crispy Rolls Catering Box",       price: "$55",  serves: "24 pieces", description: "Gourmet spring rolls — crisp, fresh, ready to share.", image: "/images/catering/crispy-rolls-catering-box.jpg" },
  { name: "Arancini Catering Box",           price: "$55",  serves: "30 pieces", description: "Hand-rolled, golden-crisp arancini bites.", image: "/images/catering/arancini-catering-box.jpg" },
  { name: "Savoury Bites Catering Box",      price: "$65",  serves: "36 pieces", description: "A perfect platter of bite-sized savoury favourites, freshly baked.", image: "/images/catering/savoury-bites-catering-box.jpg" },
  { name: "Gourmet Frittata Box",            price: "$59",  serves: "Sharing platter", image: "/images/catering/gourmet-frittata-box.jpg" },
  { name: "Popcorn Chicken & Sausage Roll Platter", price: "$49", serves: "Sharing platter", image: "/images/catering/popcorn-chicken-sausage-roll-platter.png" },
  { name: "High Protein Scrolls Box",        price: "$55",  serves: "24 pieces", description: "Freshly baked savoury scrolls — 5g protein each.", image: "/images/catering/high-protein-scrolls-box.png" },
  { name: "Mixed Juices",                    price: "$40",  serves: "10-pack", image: "/images/catering/mixed-juices.png" },
];
