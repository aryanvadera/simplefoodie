/**
 * Single source of truth for everything the brand says and where it lives.
 * Edit content here — do not hardcode in components.
 */

export const site = {
  name: "The Simple Foodie",
  tagline: "Café & Catering — Docklands, Melbourne",
  shortDescription:
    "Fresh food, barista-made coffee, and corporate catering — handmade in Docklands.",

  contact: {
    phone: "03 7074 5029",
    phoneHref: "tel:+61370745029",
    email: "thesimplefoodieau@gmail.com",
    emailHref: "mailto:thesimplefoodieau@gmail.com",
  },

  address: {
    suburb: "Docklands",
    city: "Melbourne",
    state: "VIC",
    country: "Australia",
    line: "Docklands, Melbourne VIC",
  },

  // TODO: confirm with owner — placeholder hours based on cafe convention
  hours: [
    { day: "Mon – Fri", time: "7:00 am – 4:00 pm" },
    { day: "Saturday",  time: "8:00 am – 3:00 pm" },
    { day: "Sunday",    time: "Closed" },
  ],

  social: {
    instagram: "https://www.instagram.com/the.simple.foodie",
    instagramHandle: "@the.simple.foodie",
    facebook: "https://www.facebook.com/the.simple.foodie",
  },

  cateringCutoff:
    "Order by 1:00 pm for next-day delivery · 2+ days for advance bookings",

  nav: [
    { label: "Café",     href: "/#cafe" },
    { label: "Menu",     href: "/menu" },
    { label: "Catering", href: "/catering" },
    { label: "Story",    href: "/#story" },
    { label: "Visit",    href: "/#visit" },
  ],
} as const;

export type SiteConfig = typeof site;
