import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function Visit() {
  return (
    <section id="visit" className="container-x py-24 md:py-32">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-forest/60 mb-5">Find us</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-tight">
              Pop in for a{" "}
              <em className="font-display italic text-forest">flat white.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 text-base md:text-lg text-ink-2 leading-relaxed max-w-md">
              We&rsquo;re a short walk from Southern Cross. Mornings are for
              coffee and croissants, lunches are for sandwiches, and the
              afternoon is for whatever you didn&rsquo;t get the morning&rsquo;s
              first run at.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <ul className="mt-10 space-y-4 text-base">
              <li className="flex items-start gap-4">
                <span className="mt-0.5 inline-grid size-10 place-items-center rounded-full bg-forest text-linen">
                  <MapPin className="size-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-3 font-medium">
                    Address
                  </p>
                  <p className="text-ink mt-1">{site.address.line}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 inline-grid size-10 place-items-center rounded-full bg-forest text-linen">
                  <Phone className="size-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-3 font-medium">
                    Phone
                  </p>
                  <a
                    href={site.contact.phoneHref}
                    className="text-ink mt-1 inline-block hover:text-forest transition"
                  >
                    {site.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 inline-grid size-10 place-items-center rounded-full bg-forest text-linen">
                  <Mail className="size-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-3 font-medium">
                    Email
                  </p>
                  <a
                    href={site.contact.emailHref}
                    className="text-ink mt-1 inline-block hover:text-forest transition break-all"
                  >
                    {site.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 inline-grid size-10 place-items-center rounded-full bg-forest text-linen">
                  <Clock className="size-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-3 font-medium">
                    Hours
                  </p>
                  <ul className="mt-1 space-y-1">
                    {site.hours.map((h) => (
                      <li key={h.day} className="flex gap-3 text-sm">
                        <span className="w-20 text-ink-3">{h.day}</span>
                        <span className="text-ink">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={320}>
            <a
              href="https://www.google.com/maps/search/?api=1&query=The+Simple+Foodie+Docklands+Melbourne"
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta mt-10 inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-2 transition-colors"
            >
              <span>Open in Google Maps</span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <div className="relative aspect-[4/3] lg:aspect-square w-full rounded-[2rem] overflow-hidden border border-ink/10 shadow-[var(--shadow-soft)]">
              <iframe
                title="The Simple Foodie on Google Maps"
                src="https://www.google.com/maps?q=Docklands%20Melbourne&output=embed"
                className="absolute inset-0 size-full grayscale-[0.25] contrast-[1.05] saturate-[0.85]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10 rounded-[inherit]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
