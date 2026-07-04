"use client";

import { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ExternalLink,
  Zap,
  Cpu,
  TrendingUp,
  Filter,
  ArrowUpRight,
  Globe,
  ChevronDown,
} from "lucide-react";
import { PROJECTS, ALL_CATEGORIES, type Project, type ProjectCategory } from "@/lib/projects";

// ─── Tilt Card ───────────────────────────────────────────────────────────────

function TiltCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 25, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.07,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(8px)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="relative"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-pointer"
      >
        {/* Main card surface */}
        <div
          className={`
            relative overflow-hidden rounded-2xl border transition-all duration-300
            ${
              isExpanded
                ? "border-white/20 bg-zinc-900/90"
                : "border-white/8 bg-zinc-900/60 hover:border-white/15"
            }
            backdrop-blur-md
          `}
          onClick={() => setIsExpanded((v) => !v)}
        >
          {/* Mouse-tracked glow */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-20 rounded-2xl"
              style={{
                background: `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, ${project.accentHex}, transparent 60%)`,
              }}
            />
          )}

          {/* Gradient header bar */}
          <div className={`relative h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

          {/* Card header */}
          <div className="p-5 pb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                {/* Category badge */}
                <div className="mb-2.5 flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-widest uppercase"
                    style={{
                      color: project.accentHex,
                      backgroundColor: `${project.accentHex}18`,
                      border: `1px solid ${project.accentHex}30`,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-600">{project.year}</span>
                </div>

                <h3 className="text-lg font-bold text-white leading-tight tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-0.5 font-mono text-xs text-zinc-500">{project.tagline}</p>
              </div>

              {/* Expand chevron */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="shrink-0 mt-1"
              >
                <ChevronDown className="h-4 w-4 text-zinc-600" />
              </motion.div>
            </div>

            {/* Stack pills preview (always visible) */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.execution.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 font-mono text-[10px] text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Expandable 3-part narrative */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: {
                    height: { type: "spring", stiffness: 200, damping: 25 },
                    opacity: { duration: 0.2, delay: 0.05 },
                  },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.15 },
                  },
                }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 space-y-4 border-t border-white/6 pt-4">
                  {/* The Spark */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: project.accentHex }}
                      />
                      <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">
                        The Spark
                      </span>
                      <Zap
                        className="h-3 w-3 shrink-0"
                        style={{ color: project.accentHex }}
                      />
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {project.spark}
                    </p>
                  </div>

                  {/* The Execution */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: project.accentHex }}
                      />
                      <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">
                        The Execution
                      </span>
                      <Cpu
                        className="h-3 w-3 shrink-0"
                        style={{ color: project.accentHex }}
                      />
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {project.execution.detail}
                    </p>
                  </div>

                  {/* The Impact */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: project.accentHex }}
                      />
                      <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">
                        The Impact
                      </span>
                      <TrendingUp
                        className="h-3 w-3 shrink-0"
                        style={{ color: project.accentHex }}
                      />
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {project.impact}
                    </p>
                  </div>

                  {/* Live URL button */}
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                      text-white font-mono text-xs font-semibold tracking-wide
                      transition-shadow duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${project.accentHex}cc, ${project.accentHex}66)`,
                      boxShadow: `0 4px 20px ${project.accentHex}30`,
                      border: `1px solid ${project.accentHex}40`,
                    }}
                  >
                    <Globe className="h-3.5 w-3.5" />
                    View Live Site
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick external link when collapsed */}
          {!isExpanded && (
            <div className="px-5 pb-4">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 font-mono text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors group"
              >
                <Globe className="h-3 w-3" />
                <span className="truncate">{project.url.replace("https://", "")}</span>
                <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Filter Chip ─────────────────────────────────────────────────────────────

function FilterChip({
  label,
  isActive,
  count,
  onClick,
}: {
  label: string;
  isActive: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className={`
        relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
        font-mono text-xs font-medium tracking-wide
        border transition-all duration-200
        ${
          isActive
            ? "text-white border-violet-500/60 bg-violet-500/15"
            : "text-zinc-500 border-white/8 bg-white/3 hover:text-zinc-300 hover:border-white/15"
        }
      `}
    >
      {isActive && (
        <motion.span
          layoutId="filter-active-bg"
          className="absolute inset-0 rounded-full bg-violet-500/10"
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <span className="relative z-10">{label}</span>
      <span
        className={`relative z-10 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold
          ${isActive ? "bg-violet-500/30 text-violet-300" : "bg-white/8 text-zinc-600"}
        `}
      >
        {count}
      </span>
    </motion.button>
  );
}

// ─── Page Header ─────────────────────────────────────────────────────────────

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, staggerChildren: 0.1 },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
};

// ─── Projects Page ───────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "All">("All");

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const getCategoryCount = (cat: ProjectCategory) =>
    PROJECTS.filter((p) => p.category === cat).length;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/8 blur-3xl" />
        <div className="absolute top-1/2 right-0 h-[400px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-700/6 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] translate-y-1/2 rounded-full bg-indigo-700/8 blur-3xl" />
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-10 pt-28 pb-20">
        {/* ── Page Header ── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="mb-14 max-w-3xl"
        >
          <motion.div variants={childVariants} className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-600">
              ./work
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-violet-500">
              {PROJECTS.length} projects shipped
            </span>
          </motion.div>

          <motion.h1
            variants={childVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-none"
          >
            What{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradientSlide_4s_linear_infinite]">
                We Did
              </span>
              {/* underline accent */}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-violet-500/60 to-cyan-500/60" />
            </span>
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="mt-5 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl"
          >
            Every site below is live, in production, and was shipped using an{" "}
            <span className="text-white font-medium">AI-driven rapid prototyping workflow</span>
            {" "}that compresses months of build time into days.
          </motion.p>

          {/* Stat strip */}
          <motion.div
            variants={childVariants}
            className="mt-8 flex flex-wrap gap-5"
          >
            {[
              { label: "Live in Production", value: "9" },
              { label: "Avg. Delivery", value: "<7d" },
              { label: "Industries Served", value: "7" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="font-mono text-2xl font-black text-white">{value}</span>
                <span className="font-mono text-xs text-zinc-600 uppercase tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Filter Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-3.5 w-3.5 text-zinc-600" />
            <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
              Filter by category
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label="All"
              isActive={activeFilter === "All"}
              count={PROJECTS.length}
              onClick={() => setActiveFilter("All")}
            />
            {ALL_CATEGORIES.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                isActive={activeFilter === cat}
                count={getCategoryCount(cat)}
                onClick={() =>
                  setActiveFilter(activeFilter === cat ? "All" : cat)
                }
              />
            ))}
          </div>
        </motion.div>

        {/* ── Results count ── */}
        <motion.div
          layout
          className="mb-6 font-mono text-xs text-zinc-600"
        >
          Showing{" "}
          <span className="text-white font-bold">{filteredProjects.length}</span>{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
          {activeFilter !== "All" && (
            <> in <span className="text-violet-400">{activeFilter}</span></>
          )}
        </motion.div>

        {/* ── Project Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <TiltCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty state ── */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
                <Filter className="h-5 w-5 text-zinc-600" />
              </div>
              <p className="font-mono text-sm text-zinc-500">
                No projects in this category yet.
              </p>
              <button
                onClick={() => setActiveFilter("All")}
                className="mt-3 font-mono text-xs text-violet-400 hover:text-violet-300 transition-colors"
              >
                View all →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CTA Footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="mt-20 relative overflow-hidden rounded-2xl border border-white/8 bg-zinc-900/40 backdrop-blur-md p-8 sm:p-12 text-center"
        >
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/8 via-transparent to-cyan-600/8 pointer-events-none" />
          <div className="relative z-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-600 mb-4">
              Next in queue
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-4">
              Your project could{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                live here.
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
              We take ideas from concept to live production in under a week using
              AI-driven architecture. No fluff. Just shipped software.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl
                bg-gradient-to-r from-violet-600 to-cyan-500
                text-white font-mono text-sm font-bold tracking-wide
                shadow-xl shadow-violet-500/25 hover:shadow-violet-500/50
                transition-shadow duration-300"
            >
              Let's build yours
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Gradient animation keyframe */}
      <style jsx global>{`
        @keyframes gradientSlide {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </main>
  );
}