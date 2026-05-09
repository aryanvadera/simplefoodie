import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { Instagram, Facebook } from "@/components/icons/Social";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — The Simple Foodie",
  description:
    "Get in touch with The Simple Foodie. Visit us in Docklands, call, or send a message.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-forest/60">Get in touch</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-tight">
                Say <em className="not-italic text-forest">hello.</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-base md:text-lg text-ink-2 leading-relaxed">
                For catering quotes, loyalty questions, or just a friendly hello
                — we&rsquo;d love to hear from you.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-12 space-y-5 text-base">
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
                      className="text-ink mt-1 inline-block hover:text-forest transition font-display text-2xl"
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
                    <MapPin className="size-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-ink-3 font-medium">
                      Visit
                    </p>
                    <p className="text-ink mt-1">{site.address.line}</p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=The+Simple+Foodie+Docklands+Melbourne"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta mt-1 inline-flex items-center gap-1.5 text-sm text-forest hover:text-forest-2 transition"
                    >
                      <span>Get directions</span>
                      <ArrowUpRight className="size-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
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
                    <ul className="mt-1 space-y-0.5">
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

              <div className="mt-10 flex items-center gap-3">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-grid size-11 place-items-center rounded-full bg-forest text-linen hover:bg-honey hover:text-forest-2 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="size-4" strokeWidth={1.75} />
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-grid size-11 place-items-center rounded-full bg-forest text-linen hover:bg-honey hover:text-forest-2 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="size-4" strokeWidth={1.75} />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <Reveal>
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-[2rem] overflow-hidden border border-ink/10 shadow-[var(--shadow-soft)]">
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
      </section>
    </>
  );
}
