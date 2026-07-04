"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";

// ─── Terminal Widget ──────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  { prompt: "~", cmd: "npx create-next-app client-project", delay: 0 },
  { prompt: "~", cmd: "ai generate --component HeroSection", delay: 900 },
  { prompt: "~", cmd: "ai scaffold --page dashboard --auth", delay: 1800 },
  { prompt: "~", cmd: "git push && vercel deploy --prod", delay: 2700 },
  { prompt: "✓", cmd: "Live at https://client-project.vercel.app", delay: 3600, success: true },
];

function TerminalWidget() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay + 800)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-xl border border-white/8 bg-black/60 backdrop-blur-md overflow-hidden w-full max-w-xl mx-auto lg:mx-0">
      {/* Terminal title bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8 bg-white/3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 font-mono text-[10px] text-zinc-600">aiforge — zsh</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 space-y-2 min-h-[160px]">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2 font-mono text-xs"
          >
            <span className={line.success ? "text-emerald-400" : "text-violet-400"}>
              {line.success ? "✓" : "$"}
            </span>
            <span className={line.success ? "text-emerald-400" : "text-zinc-300"}>
              {line.cmd}
            </span>
          </motion.div>
        ))}
        {/* Blinking cursor */}
        {visibleLines < TERMINAL_LINES.length && (
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-violet-400">$</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-2 h-3.5 bg-violet-400 rounded-sm inline-block"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const heroVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-700/8 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-5 lg:px-10 pt-36 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Hero copy */}
          <motion.div variants={heroVariants} initial="hidden" animate="visible">
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-2.5 mb-7">
              <span className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center">
                <Zap className="h-3 w-3 text-white fill-white" />
              </span>
              <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
                AI-Driven · Production-Ready · Ship Fast
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-6"
            >
              We build.{" "}
              <br />
              <span
                className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% auto",
                  animation: "gradientSlide 4s linear infinite",
                }}
              >
                We ship.
              </span>
              <br />
              Fast.
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={itemVariants}
              className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-md mb-10"
            >
              Full-stack production websites and SaaS apps delivered in days using an
              AI-driven rapid prototyping workflow. 9 live projects. Zero fluff.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  bg-gradient-to-r from-violet-600 to-cyan-500
                  text-white font-mono text-sm font-bold tracking-wide
                  shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow"
              >
                See the work
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  border border-white/10 bg-white/5
                  text-white font-mono text-sm font-bold tracking-wide
                  hover:border-white/20 hover:bg-white/8 transition-colors"
              >
                Let's build
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={itemVariants} className="mt-12 flex gap-8">
              {[
                { value: "9", label: "Live projects" },
                { value: "<7d", label: "Avg. delivery" },
                { value: "7", label: "Industries" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-mono text-2xl font-black text-white">{value}</p>
                  <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
          >
            <TerminalWidget />

            {/* Caption */}
            <p className="mt-4 text-center font-mono text-[10px] text-zinc-700 uppercase tracking-widest">
              Real workflow. Every project.
            </p>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes gradientSlide {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </main>
  );
}