import Link from "next/link";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { Instagram, Facebook } from "@/components/icons/Social";
import { site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="relative bg-forest-2 text-linen mt-32 overflow-hidden">
      {/* Decorative top edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-linen/15" />

      <div className="container-x py-20 md:py-28">
        {/* Closing call */}
        <div className="max-w-4xl">
          <p className="eyebrow text-honey">Drop in or get in touch</p>
          <h2 className="mt-5 font-display text-5xl md:text-7xl leading-[0.98] tracking-tight">
            See you at the <em className="not-italic text-honey">counter.</em>
          </h2>
          <p className="mt-6 text-linen/75 max-w-xl text-base md:text-lg leading-relaxed">
            Whether you&rsquo;re after a quick lunch, a corporate platter or just
            a really good flat white, we&rsquo;re here six days a week in
            Docklands.
          </p>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-6">
            <Wordmark variant="light" />
            <p className="text-linen/65 text-sm leading-relaxed max-w-sm">
              {site.shortDescription}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-grid size-10 place-items-center rounded-full bg-linen/10 hover:bg-honey hover:text-forest-2 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="size-4" strokeWidth={1.75} />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-grid size-10 place-items-center rounded-full bg-linen/10 hover:bg-honey hover:text-forest-2 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="size-4" strokeWidth={1.75} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow text-honey/80 mb-5">Browse</p>
            <ul className="space-y-3 text-sm">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-linen/80 hover:text-linen transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/menu"
                  className="text-linen/80 hover:text-linen transition-colors"
                >
                  Full Menu
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-honey/80 mb-5">Visit</p>
            <ul className="space-y-3 text-sm text-linen/80">
              <li className="flex items-start gap-3">
                <MapPin className="size-4 shrink-0 mt-0.5 text-honey" strokeWidth={1.75} />
                <span>{site.address.line}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="size-4 shrink-0 mt-0.5 text-honey" strokeWidth={1.75} />
                <div className="space-y-1">
                  {site.hours.map((h) => (
                    <div key={h.day} className="flex gap-3">
                      <span className="w-20 text-linen/60">{h.day}</span>
                      <span>{h.time}</span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-honey/80 mb-5">Reach us</p>
            <ul className="space-y-3 text-sm text-linen/80">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="flex items-center gap-3 hover:text-linen transition-colors group"
                >
                  <Phone className="size-4 text-honey" strokeWidth={1.75} />
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    {site.contact.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.contact.emailHref}
                  className="flex items-center gap-3 hover:text-linen transition-colors group"
                >
                  <Mail className="size-4 text-honey" strokeWidth={1.75} />
                  <span className="group-hover:translate-x-0.5 transition-transform break-all">
                    {site.contact.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-linen transition-colors group"
                >
                  <Instagram className="size-4 text-honey" strokeWidth={1.75} />
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    {site.social.instagramHandle}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-linen/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-linen/55">
          <p>
            &copy; {new Date().getFullYear()} The Simple Foodie. All rights
            reserved.
          </p>
          <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-linen/40">
            Made in Melbourne
          </p>
        </div>
      </div>
    </footer>
  );
}
