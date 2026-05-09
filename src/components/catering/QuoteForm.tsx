"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  date: string;
  headcount: string;
  delivery: "delivery" | "pickup";
  dietary: string[];
  budget: string;
  brief: string;
};

const initial: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  date: "",
  headcount: "",
  delivery: "delivery",
  dietary: [],
  budget: "",
  brief: "",
};

const dietaryOpts = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Halal",
  "Dairy-free",
  "Nut-free",
];

const budgets = ["Under $200", "$200–$500", "$500–$1,000", "$1,000+"];

export function QuoteForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function toggleDiet(opt: string) {
    setForm((s) => ({
      ...s,
      dietary: s.dietary.includes(opt)
        ? s.dietary.filter((d) => d !== opt)
        : [...s.dietary, opt],
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    // TODO: wire to /api/catering or Formspree/Resend.
    // For now we simulate latency and show the success state.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  }

  return (
    <div className="relative bg-paper border border-ink/10 rounded-[2rem] p-6 md:p-10 shadow-[var(--shadow-soft)]">
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
              <Field label="Your name" required>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputCls}
                  placeholder="Jane Smith"
                />
              </Field>
              <Field label="Company">
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className={inputCls}
                  placeholder="Acme Pty Ltd"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Email" required>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputCls}
                  placeholder="jane@company.com.au"
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputCls}
                  placeholder="04xx xxx xxx"
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="When?" required hint="At least 1 working day ahead">
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="How many people?" required>
                <input
                  required
                  type="number"
                  min={1}
                  value={form.headcount}
                  onChange={(e) => update("headcount", e.target.value)}
                  className={inputCls}
                  placeholder="12"
                />
              </Field>
            </div>

            <Field label="Delivery or pickup?">
              <div className="grid grid-cols-2 gap-2 p-1 bg-ink/5 rounded-full">
                {(["delivery", "pickup"] as const).map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => update("delivery", opt)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition capitalize",
                      form.delivery === opt
                        ? "bg-forest text-linen shadow-sm"
                        : "text-ink-2 hover:text-ink",
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Dietary requirements" hint="Select any that apply">
              <div className="flex flex-wrap gap-2">
                {dietaryOpts.map((d) => {
                  const active = form.dietary.includes(d);
                  return (
                    <button
                      type="button"
                      key={d}
                      onClick={() => toggleDiet(d)}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-xs font-medium border transition",
                        active
                          ? "bg-forest text-linen border-forest"
                          : "bg-paper text-ink-2 border-ink/15 hover:border-ink/40",
                      )}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Budget">
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => update("budget", b)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-xs font-medium border transition",
                      form.budget === b
                        ? "bg-forest text-linen border-forest"
                        : "bg-paper text-ink-2 border-ink/15 hover:border-ink/40",
                    )}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Anything else?">
              <textarea
                rows={4}
                value={form.brief}
                onChange={(e) => update("brief", e.target.value)}
                className={cn(inputCls, "resize-none")}
                placeholder="Tell us about the event — vibe, venue, anything we should know."
              />
            </Field>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group/cta mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-forest text-linen px-7 py-3.5 text-sm font-medium tracking-wide shadow-[0_8px_24px_-12px_rgba(20,18,14,0.45)] hover:bg-forest-2 hover:-translate-y-0.5 transition-all duration-300 disabled:pointer-events-none disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <span>Send my brief</span>
                  <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
                </>
              )}
            </button>

            <p className="text-xs text-ink-3">
              We&rsquo;ll come back to you within a few hours during business
              days. Urgent? Call us on{" "}
              <a className="underline hover:text-ink" href="tel:+61370745029">
                03 7074 5029
              </a>
              .
            </p>
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
            <h3 className="mt-6 font-display text-3xl md:text-4xl text-ink">
              Brief received.
            </h3>
            <p className="mt-4 max-w-md mx-auto text-ink-2 leading-relaxed">
              Thanks {form.name.split(" ")[0] || "—"}, we&rsquo;ll be in touch
              shortly. In a hurry? Give us a ring on{" "}
              <a className="underline hover:text-ink" href="tel:+61370745029">
                03 7074 5029
              </a>
              .
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

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-ink">
          {label}
          {required && <span className="text-honey-2 ml-0.5">*</span>}
        </span>
        {hint && <span className="text-xs text-ink-3">{hint}</span>}
      </span>
      <span className="block mt-2">{children}</span>
    </label>
  );
}
