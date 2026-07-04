"use client";

import { useState, useRef } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Send, Zap, CheckCircle } from "lucide-react";

// ─── Floating Badge ───────────────────────────────────────────────────────────

function FloatingBadge({
  text,
  style,
  delay = 0,
  accent = "#8b5cf6",
}: {
  text: string;
  style: React.CSSProperties;
  delay?: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay }}
      style={style}
      className="absolute"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
        className="px-3.5 py-2 rounded-full border backdrop-blur-md font-mono text-xs font-semibold whitespace-nowrap select-none"
        style={{
          borderColor: `${accent}40`,
          backgroundColor: `${accent}12`,
          color: accent,
          boxShadow: `0 4px 20px ${accent}20`,
        }}
      >
        {text}
      </motion.div>
    </motion.div>
  );
}

// ─── Neon Input ───────────────────────────────────────────────────────────────

function NeonInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-2">
        {label}
        {required && <span className="text-violet-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="
          w-full bg-transparent border-0 border-b pb-2
          text-white text-sm placeholder:text-zinc-700
          outline-none transition-colors duration-300
          font-sans
        "
        style={{ borderBottomColor: focused ? "transparent" : "rgba(255,255,255,0.1)" }}
      />
      {/* Neon gradient underline track */}
      <motion.div
        className="absolute bottom-0 left-0 h-px rounded-full"
        animate={{
          width: focused ? "100%" : "0%",
          opacity: focused ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          background: "linear-gradient(90deg, #8b5cf6, #22d3ee, #8b5cf6)",
          backgroundSize: "200% 100%",
        }}
      />
      {/* Static dim underline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: "rgba(255,255,255,0.08)",
          opacity: focused ? 0 : 1,
        }}
      />
    </div>
  );
}

function NeonTextarea({
  label,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-2">
        {label}
        {required && <span className="text-violet-500 ml-1">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={4}
        className="
          w-full bg-transparent border-0 border-b pb-2
          text-white text-sm placeholder:text-zinc-700
          outline-none transition-colors duration-300
          font-sans resize-none
        "
        style={{ borderBottomColor: focused ? "transparent" : "rgba(255,255,255,0.1)" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px rounded-full"
        animate={{ width: focused ? "100%" : "0%", opacity: focused ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ background: "linear-gradient(90deg, #8b5cf6, #22d3ee, #8b5cf6)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{ background: "rgba(255,255,255,0.08)", opacity: focused ? 0 : 1 }}
      />
    </div>
  );
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 20, staggerChildren: 0.1 },
  },
};

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 20, delay: 0.2 },
  },
};

// ─── Contact Page ─────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-violet-700/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-700/6 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 lg:px-10 pt-28 pb-20 min-h-screen flex flex-col justify-center">
        {/* Page label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-600">./contact</span>
          <span className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* ── Left — Gen-Z Badges + Copy ── */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Floating badges */}
            <div className="relative h-72 sm:h-80 mb-8 hidden sm:block">
              <FloatingBadge
                text="Got a wild idea? 🔥"
                style={{ top: "5%", left: "0%" }}
                delay={0.1}
                accent="#8b5cf6"
              />
              <FloatingBadge
                text="Let's talk scale 📈"
                style={{ top: "20%", right: "5%" }}
                delay={0.25}
                accent="#22d3ee"
              />
              <FloatingBadge
                text="Ship it in a week ⚡"
                style={{ top: "45%", left: "10%" }}
                delay={0.4}
                accent="#10b981"
              />
              <FloatingBadge
                text="No fluff. Just code. 🛠"
                style={{ top: "65%", right: "0%" }}
                delay={0.55}
                accent="#f97316"
              />
              <FloatingBadge
                text="AI-powered builds 🤖"
                style={{ bottom: "0%", left: "5%" }}
                delay={0.7}
                accent="#ec4899"
              />
            </div>

            {/* Mobile badges (horizontal scroll) */}
            <div className="flex sm:hidden gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
              {[
                { text: "Got a wild idea? 🔥", accent: "#8b5cf6" },
                { text: "Let's talk scale 📈", accent: "#22d3ee" },
                { text: "Ship it in a week ⚡", accent: "#10b981" },
                { text: "No fluff. Just code. 🛠", accent: "#f97316" },
              ].map(({ text, accent }) => (
                <span
                  key={text}
                  className="shrink-0 px-3 py-1.5 rounded-full border font-mono text-[10px] font-semibold whitespace-nowrap"
                  style={{
                    borderColor: `${accent}40`,
                    backgroundColor: `${accent}12`,
                    color: accent,
                  }}
                >
                  {text}
                </span>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-tight mb-4">
              Let's have{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                some gossips.
              </span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-sm">
              Tell us what you're building. We'll tell you exactly how fast we can make it real.
              No pitch decks, no NDAs on first hello.
            </p>

            {/* Social proof strip */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["#8b5cf6", "#22d3ee", "#10b981", "#f97316"].map((color) => (
                  <div
                    key={color}
                    className="h-7 w-7 rounded-full border-2 border-zinc-950"
                    style={{ backgroundColor: `${color}60` }}
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-zinc-500">
                9 clients shipped and counting
              </span>
            </div>
          </motion.div>

          {/* ── Right — Contact Form ── */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative rounded-2xl border border-white/8 bg-zinc-900/50 backdrop-blur-md p-8">
              {/* Gradient top accent */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  /* Success state */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center justify-center py-12 text-center gap-4"
                  >
                    <div className="h-14 w-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                      <CheckCircle className="h-7 w-7 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-black tracking-tight text-white">
                      Message received.
                    </h3>
                    <p className="text-sm text-zinc-400 max-w-xs">
                      We'll hit you back faster than your CI pipeline. Usually within a few hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", project: "", message: "" });
                      }}
                      className="mt-2 font-mono text-xs text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Send another →
                    </button>
                  </motion.div>
                ) : (
                  /* Form */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <Zap className="h-3.5 w-3.5 text-violet-400 fill-violet-400" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                          Start the conversation
                        </span>
                      </div>
                    </div>

                    <NeonInput
                      label="Your name"
                      placeholder="Alex Johnson"
                      value={formData.name}
                      onChange={(v) => setFormData({ ...formData, name: v })}
                      required
                    />

                    <NeonInput
                      label="Email"
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(v) => setFormData({ ...formData, email: v })}
                      required
                    />

                    <NeonInput
                      label="What are you building?"
                      placeholder="SaaS dashboard, real estate portal, e-commerce..."
                      value={formData.project}
                      onChange={(v) => setFormData({ ...formData, project: v })}
                    />

                    <NeonTextarea
                      label="Tell us more"
                      placeholder="What's the problem you're solving? What does success look like?"
                      value={formData.message}
                      onChange={(v) => setFormData({ ...formData, message: v })}
                      required
                    />

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.97 }}
                      className="
                        w-full flex items-center justify-center gap-2.5
                        py-3.5 rounded-xl
                        bg-gradient-to-r from-violet-600 to-cyan-500
                        text-white font-mono text-sm font-bold tracking-wide
                        shadow-lg shadow-violet-500/25
                        hover:shadow-violet-500/40 transition-shadow duration-300
                        disabled:opacity-60 disabled:cursor-not-allowed
                      "
                    >
                      {loading ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full block"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send it
                          <Send className="h-3.5 w-3.5" />
                        </>
                      )}
                    </motion.button>

                    {submitError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center font-mono text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                      >
                        {submitError}
                      </motion.p>
                    )}

                    <p className="text-center font-mono text-[10px] text-zinc-700">
                      No spam. No newsletters. Just a real reply.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Quick links */}
            <div className="mt-5 flex items-center justify-center gap-6">
              <a
                href="mailto:hello@aiforge.dev"
                className="flex items-center gap-1.5 font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors group"
              >
                hello@aiforge.dev
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}