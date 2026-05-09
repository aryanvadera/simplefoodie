import { ArrowUpRight, Heart } from "lucide-react";
import { Instagram } from "@/components/icons/Social";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

// Placeholder grid — six tiles ready to be wired to the IG feed
// (Instagram Basic Display API, Elfsight free tier, or an oEmbed grid).
const tiles = [
  { caption: "Fresh croissants on the rack",  likes: "248" },
  { caption: "Sandwich plate close-up",        likes: "184" },
  { caption: "Latte art detail",               likes: "312" },
  { caption: "Slider box overhead",            likes: "265" },
  { caption: "Catering setup at desk",         likes: "201" },
  { caption: "Sweet treats grid",              likes: "421" },
];

export function InstagramGrid() {
  return (
    <section className="bg-bone py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow text-forest/60 mb-4">Behind the counter</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-tight">
                Today&rsquo;s good things, on{" "}
                <em className="font-display italic text-forest">Instagram.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="grow"
              className="group/cta inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-2 transition"
            >
              <Instagram className="size-4" strokeWidth={1.75} />
              <span>{site.social.instagramHandle}</span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {tiles.map(({ caption, likes }, i) => (
            <Reveal key={i} delay={i * 60}>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                className="group/t relative block aspect-square overflow-hidden rounded-2xl"
              >
                <ImageFrame
                  caption={caption}
                  alt={caption}
                  rounded="none"
                  className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/t:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-2/80 via-forest-2/20 to-transparent opacity-0 group-hover/t:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover/t:opacity-100 transition-opacity duration-500">
                  <div className="flex justify-end">
                    <Instagram
                      className="size-5 text-linen"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex items-end justify-between text-linen">
                    <span className="font-display italic text-sm leading-tight max-w-[70%]">
                      {caption}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs">
                      <Heart className="size-3 fill-current" strokeWidth={0} />
                      <span className="font-mono tabular-nums">{likes}</span>
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
