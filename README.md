# The Simple Foodie

Speculative redesign for **The Simple Foodie** — a café & catering business in
Docklands, Melbourne. Built as a custom Next.js site with a magazine-style
aesthetic, premium animations, and a clear lane for both walk-in customers and
office catering enquiries.

## Tech

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** + custom brand tokens in `globals.css`
- **Motion** (Framer Motion) for scroll reveals, staggered text, and gestures
- **TypeScript** end-to-end
- **Lucide React** + custom Social SVGs (lucide v1 dropped brand icons)

Free-tier ready: **Vercel** for hosting, **Resend / Formspree** plug-in for the
forms (currently stubbed), Google Maps embed for location, native Image for IG.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint
```

## Adding the client's photos

All photo placeholders are tagged with a caption that names what they should
contain. Drop the matching files into `/public/images/` under these subfolders:

- `hero/` — homepage and catering hero shots, the floating accent images
- `story/` — the founder portrait + coffee detail used in the Story section
- `catering/` — bundle / box photography (one per `Bundle` in `src/lib/menu.ts`)
- `menu/` — per-item photography (filename = slug of `MenuItem.name`)
- `instagram/` — six recent Instagram post stills for the IG grid

Then either:

1. Add an `image: "/images/menu/chicken-schnitzel-sandwich.jpg"` field to the
   relevant entry in `src/lib/menu.ts`, **or**
2. Globally swap by editing the `<ImageFrame>` callsites in the section
   components — they accept a `src` prop.

The `ImageFrame` component shows a styled forest-green shimmering placeholder
(labelled with the alt) until a `src` is provided, so the layout never breaks.

## Brand system

All design tokens live at the top of `src/app/globals.css`. Edit colour, type,
radius, shadow, easing tokens there — everything cascades.

- Forest green `#1F3A2E` — primary
- Honey `#C8A961` — accent / warmth
- Linen / Bone — surfaces
- Display: **Fraunces** · Body: **Inter**

## Routes

- `/` — homepage (hero, marquee, two-pillar split, featured items, story,
  catering callout, testimonials, IG grid, visit)
- `/menu` — full catalogue with filter & search (107 items)
- `/catering` — hero, how-it-works, popular bundles, full catering menu, quote
  form, FAQ
- `/contact` — contact form, hours, map, socials

## To-do before pitch

- [ ] Drop in the client's real photography (see above)
- [ ] Confirm hours with the owner (currently a guessed Mon–Sat 7–4)
- [ ] Wire `QuoteForm` and `ContactForm` to Resend (env var `RESEND_API_KEY`)
- [ ] Replace placeholder testimonials with 3 real Google reviews
- [ ] Swap to a real Instagram embed (Elfsight free / oEmbed API)
- [ ] Confirm exact street address & embed precise Maps location
- [ ] Add Open Graph image (`/public/og.jpg`)

## Deploy

```bash
# preview
vercel

# production
vercel --prod
```
