import type { ReactNode } from "react";

/* =====================================================================
   Placeholder food art — used until real photography is supplied.
   Each glyph is hand-drawn SVG, no external dependency, designed to read
   beautifully at any size and to feel like editorial linework rather
   than stock clipart.
   ===================================================================== */

type GlyphKey =
  | "coffee" | "croissant" | "matcha" | "bowl" | "sandwich" | "cake"
  | "cookie" | "pastry" | "drink" | "platter" | "plate" | "leaf";

const glyphs: Record<GlyphKey, ReactNode> = {
  coffee: (
    <>
      <path d="M40 38 H72 a4 4 0 0 1 4 4 v18 a14 14 0 0 1 -14 14 H50 a14 14 0 0 1 -14 -14 V42 a4 4 0 0 1 4 -4Z" />
      <path d="M76 46 h6 a8 8 0 0 1 0 16 h-6" />
      <path d="M48 30 c2 -3 0 -6 0 -8" strokeLinecap="round" />
      <path d="M56 30 c2 -3 0 -6 0 -8" strokeLinecap="round" />
      <path d="M64 30 c2 -3 0 -6 0 -8" strokeLinecap="round" />
    </>
  ),
  croissant: (
    <>
      <path d="M22 70 C 22 38 56 22 92 32 C 80 56 56 70 22 70 Z" />
      <path d="M30 64 L 78 38" />
      <path d="M38 66 L 84 44" />
      <path d="M48 68 L 90 50" />
      <path d="M58 70 L 92 56" />
    </>
  ),
  matcha: (
    <>
      <rect x="38" y="38" width="40" height="38" rx="4" />
      <path d="M44 38 V30 a8 8 0 0 1 16 0 V38" />
      <path d="M44 50 H72 M44 58 H68 M44 66 H64" />
      <circle cx="58" cy="22" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  bowl: (
    <>
      <path d="M22 50 H94 a0 0 0 0 1 0 0 v6 a26 26 0 0 1 -26 26 H48 a26 26 0 0 1 -26 -26 v-6 Z" />
      <path d="M30 50 c4 -10 14 -16 28 -16 c14 0 24 6 28 16" />
      <circle cx="48" cy="46" r="3" />
      <circle cx="68" cy="46" r="3" />
      <circle cx="58" cy="42" r="3" />
    </>
  ),
  sandwich: (
    <>
      <path d="M24 50 H92 a4 4 0 0 1 4 4 v8 a8 8 0 0 1 -8 8 H28 a8 8 0 0 1 -8 -8 v-8 a4 4 0 0 1 4 -4 Z" />
      <path d="M28 50 c0 -6 4 -10 12 -10 h36 c8 0 12 4 12 10" />
      <path d="M30 50 q 8 -6 16 0 q 8 -6 16 0 q 8 -6 16 0" />
      <path d="M30 56 H86" />
      <path d="M30 62 H86" />
    </>
  ),
  cake: (
    <>
      <path d="M30 70 H86 V60 a4 4 0 0 0 -4 -4 H34 a4 4 0 0 0 -4 4 Z" />
      <path d="M30 60 H86" />
      <path d="M40 56 V44" /><path d="M58 56 V42" /><path d="M76 56 V44" />
      <path d="M40 44 c-2 -4 4 -6 0 -10" /><path d="M58 42 c-2 -4 4 -6 0 -10" /><path d="M76 44 c-2 -4 4 -6 0 -10" />
    </>
  ),
  cookie: (
    <>
      <circle cx="58" cy="58" r="22" />
      <circle cx="50" cy="52" r="2" fill="currentColor" stroke="none" />
      <circle cx="64" cy="50" r="2" fill="currentColor" stroke="none" />
      <circle cx="68" cy="64" r="2" fill="currentColor" stroke="none" />
      <circle cx="52" cy="66" r="2" fill="currentColor" stroke="none" />
      <circle cx="60" cy="60" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  pastry: (
    <>
      <path d="M28 70 H88 a0 0 0 0 1 0 0 a14 14 0 0 1 -14 14 H42 a14 14 0 0 1 -14 -14 Z" />
      <path d="M30 70 q 14 -22 28 -22 q 14 0 28 22" />
      <path d="M44 60 q 6 -8 14 -8" /><path d="M58 50 q 6 0 14 8" />
    </>
  ),
  drink: (
    <>
      <path d="M40 30 H76 L72 80 a4 4 0 0 1 -4 4 H48 a4 4 0 0 1 -4 -4 Z" />
      <path d="M42 42 H74" />
      <path d="M58 22 V12" /><path d="M50 22 c0 -6 16 -6 16 0" />
    </>
  ),
  platter: (
    <>
      <ellipse cx="58" cy="60" rx="36" ry="14" />
      <ellipse cx="58" cy="56" rx="32" ry="10" />
      <circle cx="46" cy="54" r="4" />
      <circle cx="58" cy="52" r="4" />
      <circle cx="70" cy="54" r="4" />
    </>
  ),
  plate: (
    <>
      <circle cx="58" cy="58" r="28" />
      <circle cx="58" cy="58" r="20" />
      <path d="M48 56 q 10 -8 20 0" />
      <path d="M52 64 h12" />
    </>
  ),
  leaf: (
    <>
      <path d="M36 78 C 36 48 60 28 86 30 C 86 56 64 78 36 78 Z" />
      <path d="M40 74 L 80 36" />
    </>
  ),
};

/* Palette pairs — bg / accent. Picked to feel cohesive with the brand. */
const palettes: Array<{ bg: string; ink: string; tag: string }> = [
  { bg: "linear-gradient(135deg, #2a4a3a 0%, #14271f 100%)", ink: "#c8a961", tag: "#f5efe6" },
  { bg: "linear-gradient(135deg, #b15a3d 0%, #6c3320 100%)", ink: "#f5efe6", tag: "#fde6d3" },
  { bg: "linear-gradient(135deg, #c8a961 0%, #8a6f33 100%)", ink: "#14271f", tag: "#1f3a2e" },
  { bg: "linear-gradient(135deg, #8fa890 0%, #4d6b51 100%)", ink: "#14271f", tag: "#f5efe6" },
  { bg: "linear-gradient(135deg, #f5efe6 0%, #ede4d6 100%)", ink: "#1f3a2e", tag: "#1f3a2e" },
  { bg: "linear-gradient(135deg, #1f3a2e 0%, #0c1e16 100%)", ink: "#c8a961", tag: "#f5efe6" },
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function pickGlyph(label: string): GlyphKey {
  const l = label.toLowerCase();
  if (/(coffee|latte|espresso|long black|flat white|cappuccino|mocha|americano)/.test(l)) return "coffee";
  if (/(matcha|tea|chai)/.test(l)) return "matcha";
  if (/(croissant|pain au chocolat|laminated)/.test(l)) return "croissant";
  if (/(sandwich|wrap|baguette|ciabatta|brioche|bun|slider)/.test(l)) return "sandwich";
  if (/(bowl|poke|salad|frittata|gnocchi|mash|parma|schnitzel)/.test(l)) return "bowl";
  if (/(cookie|energy ball)/.test(l)) return "cookie";
  if (/(cake|tiramisu|cheesecake|torta|meringue|banana bread|doughnut|dessert cup)/.test(l)) return "cake";
  if (/(pastry|scroll|arancini|roll)/.test(l)) return "pastry";
  if (/(juice|frappe|drink|soda|lemonade|matcha|smoothie)/.test(l)) return "drink";
  if (/(platter|catering|box|collection|board)/.test(l)) return "platter";
  if (/(plate|main)/.test(l)) return "plate";
  if (/(garden|fresh|story|interior|founder|team)/.test(l)) return "leaf";
  return "plate";
}

export function PlaceholderArt({ label }: { label: string }) {
  const h = hash(label);
  const palette = palettes[h % palettes.length];
  const glyph = pickGlyph(label);
  const rotate = (h % 7) - 3;

  return (
    <div
      className="absolute inset-0 grain"
      style={{ background: palette.bg }}
    >
      {/* soft accent blob */}
      <span
        aria-hidden
        className="absolute -top-10 -right-10 size-48 rounded-full opacity-30 blur-2xl"
        style={{ background: palette.ink }}
      />
      <span
        aria-hidden
        className="absolute -bottom-12 -left-10 size-40 rounded-full opacity-15 blur-3xl"
        style={{ background: palette.tag }}
      />

      {/* hairline frame */}
      <span
        aria-hidden
        className="absolute inset-3 rounded-[inherit] border opacity-30"
        style={{ borderColor: palette.ink }}
      />

      {/* central glyph */}
      <svg
        viewBox="0 0 116 100"
        className="absolute inset-0 m-auto size-[55%] max-w-[12rem] max-h-[12rem]"
        fill="none"
        stroke={palette.ink}
        strokeWidth={1.4}
        strokeLinejoin="round"
        style={{ transform: `rotate(${rotate}deg)` }}
        aria-hidden
      >
        {glyphs[glyph]}
      </svg>

      {/* footer label */}
      <div
        className="absolute inset-x-0 bottom-0 px-5 py-4 flex items-center justify-between"
        style={{ color: palette.tag }}
      >
        <span
          className="text-[0.55rem] tracking-[0.32em] uppercase font-medium opacity-80"
        >
          The Simple Foodie
        </span>
        <span
          className="font-display italic text-xs opacity-90 truncate max-w-[60%] text-right"
        >
          {label}
        </span>
      </div>

      {/* corner star ornament */}
      <svg
        viewBox="0 0 24 24"
        className="absolute top-4 left-4 size-3.5 opacity-70"
        fill="none"
        stroke={palette.ink}
        strokeWidth={1.4}
        aria-hidden
      >
        <path d="M12 2 L13 10 L21 11 L13 12 L12 22 L11 12 L3 11 L11 10 Z" />
      </svg>
    </div>
  );
}
