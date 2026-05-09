"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type ContactState = {
  name: string;
  email: string;
  phone: string;
  topic: "General" | "Catering" | "Loyalty" | "Other";
  message: string;
};

const initial: ContactState = {
  name: "",
  email: "",
  phone: "",
  topic: "General",
  message: "",
};

const topics: ContactState["topic"][] = ["General", "Catering", "Loyalty", "Other"];

export function ContactForm() {
  const [form, setForm] = useState<ContactState>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  function update<K extends keyof ContactState>(k: K, v: ContactState[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("done");
  }

  return (
    <div className="bg-paper border border-ink/10 rounded-[2rem] p-6 md:p-10 shadow-[var(--shadow-soft)]">
      <AnimatePresence mode="wait">
        {status !== "done" ? (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <FieldLabel label="Your name" required>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputCls}
                  placeholder="Jane Smith"
                />
              </FieldLabel>
              <FieldLabel label="Email" required>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputCls}
                  placeholder="jane@example.com"
                />
              </FieldLabel>
            </div>

            <FieldLabel label="Phone">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputCls}
                placeholder="04xx xxx xxx"
              />
            </FieldLabel>

            <FieldLabel label="What's it about?">
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => update("topic", t)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-xs font-medium border transition",
                      form.topic === t
                        ? "bg-forest text-linen border-forest"
                        : "bg-paper text-ink-2 border-ink/15 hover:border-ink/40",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </FieldLabel>

            <FieldLabel label="Message" required>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className={cn(inputCls, "resize-none")}
                placeholder="Tell us what's on your mind."
              />
            </FieldLabel>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group/cta mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-forest text-linen px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-forest-2 hover:-translate-y-0.5 transition-all duration-300 disabled:pointer-events-none disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <span>Send message</span>
                  <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-10"
          >
            <CheckCircle2 className="size-14 text-forest mx-auto" strokeWidth={1.5} />
            <h3 className="mt-6 font-display text-3xl text-ink">
              Message received.
            </h3>
            <p className="mt-4 max-w-md mx-auto text-ink-2 leading-relaxed">
              Thanks {form.name.split(" ")[0] || "—"}, we&rsquo;ll be in touch
              soon.
            </p>
            <button
              type="button"
              onClick={() => {
                setForm(initial);
                setStatus("idle");
              }}
              className="mt-8 text-sm text-forest hover:text-forest-2 underline"
            >
              Send another
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl bg-bone border border-ink/10 px-4 py-3 text-base text-ink placeholder:text-ink-4 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition";

function FieldLabel({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-honey-2 ml-0.5">*</span>}
      </span>
      <span className="block mt-2">{children}</span>
    </label>
  );
}
