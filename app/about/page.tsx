"use client";

import { motion, type Variants } from "framer-motion";
import { Zap, Brain, Rocket, Clock, Code2, Globe, ArrowUpRight, Cpu } from "lucide-react";

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// ─── Bento Cell wrapper ───────────────────────────────────────────────────────

function BentoCell({
  children,
  className = "",
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <motion.div
      variants={cellVariants}
      className={`
        relative overflow-hidden rounded-2xl border border-white/8
        bg-zinc-900/60 backdrop-blur-md p-6
        ${className}
      `}
    >
      {accent && (
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ background: `radial-gradient(circle at 30% 30%, ${accent}, transparent 70%)` }}
        />
      )}
      {children}
    </motion.div>
  );
}

// ─── About Page ──────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-700/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-y-1/2 rounded-full bg-cyan-700/6 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 lg:px-10 pt-28 pb-20">
        {/* Page label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-600">./about</span>
          <span className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto"
        >
          {/* ── Hero cell — spans 2 cols ── */}
          <BentoCell
            className="md:col-span-2 lg:col-span-2"
            accent="#8b5cf6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center">
                <Zap className="h-3 w-3 text-white fill-white" />
              </span>
              <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">Who we are</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-tight mb-4">
              We skip the boilerplate.{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                We ship the product.
              </span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
              AIforge is an AI-driven rapid prototyping studio. We've replaced weeks of manual syntax
              grinding with intelligent architecture decisions — so every project goes from concept
              to live production in days, not months.
            </p>
          </BentoCell>

          {/* ── Stat cell ── */}
          <BentoCell accent="#22d3ee">
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-3 block">
              Track record
            </span>
            <div className="space-y-4">
              {[
                { value: "9", label: "Live in production" },
                { value: "<7d", label: "Avg. delivery time" },
                { value: "7", label: "Industries served" },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-baseline gap-3">
                  <span className="font-mono text-3xl font-black text-white">{value}</span>
                  <span className="font-mono text-xs text-zinc-600 leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </BentoCell>

          {/* ── The edge ── */}
          <BentoCell accent="#8b5cf6">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-4 w-4 text-violet-400" />
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Our edge</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
              AI-First Architecture
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We don't write boilerplate — we prompt it. By treating AI as a pair programmer
              at the architecture layer, we focus 100% of our time on system design,
              UX decisions, and production quality.
            </p>
          </BentoCell>

          {/* ── Speed cell ── */}
          <BentoCell accent="#f97316">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-orange-400" />
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Why fast</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
              Compress the Timeline
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Traditional dev shops quote 6-12 weeks for what we ship in under one. No unnecessary
              meetings, no ticket backlogs — just architecture decisions and execution.
            </p>
          </BentoCell>

          {/* ── Stack cell ── */}
          <BentoCell accent="#22d3ee">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-4 w-4 text-cyan-400" />
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Core stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js", "React", "TypeScript",
                "Tailwind CSS", "Framer Motion",
                "Prisma", "PostgreSQL",
                "Vercel", "Netlify",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 font-mono text-xs text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </BentoCell>

          {/* ── Workflow cell — spans 2 cols ── */}
          <BentoCell className="md:col-span-2" accent="#8b5cf6">
            <div className="flex items-center gap-2 mb-5">
              <Cpu className="h-4 w-4 text-violet-400" />
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">How we work</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { step: "01", title: "Scope", desc: "Define the system architecture and user flows in one session." },
                { step: "02", title: "Prompt", desc: "AI generates scaffolding, components, and data models at speed." },
                { step: "03", title: "Refine", desc: "We layer in design decisions, micro-interactions, and real content." },
                { step: "04", title: "Ship", desc: "Deploy to production on Vercel or Netlify. Live in days." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="space-y-1.5">
                  <span className="font-mono text-[10px] text-violet-500">{step}</span>
                  <p className="font-bold text-white text-sm">{title}</p>
                  <p className="font-mono text-[11px] text-zinc-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </BentoCell>

          {/* ── Industries cell ── */}
          <BentoCell accent="#10b981">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-4 w-4 text-emerald-400" />
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Industries</span>
            </div>
            <div className="space-y-2">
              {[
                "SaaS / Fintech",
                "Real Estate",
                "Industrial / B2B",
                "Healthcare",
                "Education",
                "Creative Agency",
                "Institutional",
              ].map((industry) => (
                <div key={industry} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-mono text-xs text-zinc-400">{industry}</span>
                </div>
              ))}
            </div>
          </BentoCell>

          {/* ── CTA cell ── */}
          <BentoCell className="md:col-span-2 lg:col-span-2" accent="#8b5cf6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Rocket className="h-4 w-4 text-violet-400" />
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Ready?</span>
                </div>
                <h3 className="text-xl font-black tracking-tight text-white">
                  Got something to build?
                </h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Tell us the idea. We'll tell you when it goes live.
                </p>
              </div>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl shrink-0
                  bg-gradient-to-r from-violet-600 to-cyan-500
                  text-white font-mono text-xs font-bold tracking-wide
                  shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow"
              >
                Let's talk
                <ArrowUpRight className="h-3.5 w-3.5" />
              </motion.a>
            </div>
          </BentoCell>
        </motion.div>
      </div>
    </main>
  );
}