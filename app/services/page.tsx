"use client";

import { motion, type Variants } from "framer-motion";
import { Zap, LayoutDashboard, Globe, Building2, ArrowUpRight, CheckCircle2 } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const SERVICES = [
  {
    icon: Zap,
    title: "AI-Driven Prototyping",
    tagline: "From idea to interactive in 48 hours.",
    accent: "#8b5cf6",
    gradient: "from-violet-600/20 to-violet-600/0",
    features: [
      "AI-assisted component generation",
      "Rapid wireframe to production",
      "Iterative prompt-driven design",
      "Same-week MVP delivery",
    ],
    detail:
      "We use AI as a first-class engineering partner — not a novelty. Every scaffold, every data model, every UI pattern is generated, reviewed, and refined at a speed that manual coding simply can't match.",
  },
  {
    icon: LayoutDashboard,
    title: "SaaS & Dashboard Development",
    tagline: "Full-stack products that handle real load.",
    accent: "#22d3ee",
    gradient: "from-cyan-600/20 to-cyan-600/0",
    features: [
      "Next.js App Router architecture",
      "Prisma + PostgreSQL data layer",
      "Auth, roles & multi-tenancy",
      "Real-time analytics dashboards",
    ],
    detail:
      "We architect SaaS products with production fundamentals baked in from day one: auth flows, database schemas, API design, and dashboard UX — all shipped as a complete system, not duct-taped together.",
  },
  {
    icon: Globe,
    title: "Full-Stack Web Architecture",
    tagline: "Scalable systems, not just pretty pages.",
    accent: "#10b981",
    gradient: "from-emerald-600/20 to-emerald-600/0",
    features: [
      "Performance-first Next.js builds",
      "Tailwind design system setup",
      "API routes & server actions",
      "Vercel / Netlify deployment",
    ],
    detail:
      "Every site we build is engineered to scale. Server components, edge rendering, optimized images, semantic HTML — the foundations that make a site fast today and maintainable next year.",
  },
  {
    icon: Building2,
    title: "High-Conversion Landing Systems",
    tagline: "Real estate, B2B, and institutional portals that close.",
    accent: "#f97316",
    gradient: "from-orange-600/20 to-orange-600/0",
    features: [
      "Conversion-engineered page structure",
      "Lead capture & CRM integration",
      "Mobile-first responsive design",
      "Brand-matched visual systems",
    ],
    detail:
      "We specialize in industries where the website is the salesperson — real estate, manufacturing, education, healthcare. Every layout decision is made with one question: does this drive the inquiry?",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-700/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] translate-y-1/2 rounded-full bg-cyan-700/6 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 lg:px-10 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-14 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-600">./services</span>
            <span className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-tight mb-4">
            What{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              We Can Do
            </span>
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed">
            Four production specialties. All delivered with AI-powered speed and full-stack depth.
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {SERVICES.map(({ icon: Icon, title, tagline, accent, gradient, features, detail }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="relative overflow-hidden rounded-2xl border border-white/8 bg-zinc-900/60 backdrop-blur-md p-7 group"
            >
              {/* BG gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }} />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${accent}18`, border: `1px solid ${accent}30` }}
                >
                  <Icon className="h-5 w-5" style={{ color: accent }} />
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mb-1">{title}</h3>
                <p className="font-mono text-xs text-zinc-500 mb-4">{tagline}</p>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">{detail}</p>

                {/* Feature list */}
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
                      <span className="font-mono text-xs text-zinc-400">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="mt-16 text-center"
        >
          <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">Need one of these?</p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
              bg-gradient-to-r from-violet-600 to-cyan-500
              text-white font-mono text-sm font-bold tracking-wide
              shadow-xl shadow-violet-500/25 hover:shadow-violet-500/50 transition-shadow"
          >
            Let's scope it out
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </main>
  );
}