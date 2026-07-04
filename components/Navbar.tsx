"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import { Menu, X, Zap, ArrowUpRight } from "lucide-react";

// ─── Navigation Links ───────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "/", label: "Home", shortLabel: "~/" },
  { href: "/about", label: "Know Us", shortLabel: "about" },
  { href: "/projects", label: "What We Did", shortLabel: "work" },
  { href: "/services", label: "What We Can Do", shortLabel: "services" },
  { href: "/contact", label: "Let's Talk", shortLabel: "contact" },
] as const;

// ─── Animation Variants ──────────────────────────────────────────────────────

const overlayVariants: Variants = {
  closed: {
    clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      when: "afterChildren",
    },
  },
  open: {
    clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 20,
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
};

const linkItemVariants: Variants = {
  closed: { opacity: 0, x: 60, filter: "blur(8px)" },
  open: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const backdropVariants: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

// ─── Navbar Component ────────────────────────────────────────────────────────

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Glassmorphic navbar becomes more opaque on scroll
  const navBackground = useTransform(
    scrollY,
    [0, 80],
    [
      "rgba(9, 9, 11, 0.4)",
      "rgba(9, 9, 11, 0.85)",
    ]
  );
  const navBlur = useTransform(scrollY, [0, 80], [8, 20]);
  const navBorderOpacity = useTransform(scrollY, [0, 80], [0.08, 0.18]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (!hasMounted) return null;

  return (
    <>
      {/* ── Desktop + Mobile Glassmorphic Navbar Bar ── */}
      <motion.header
        style={{ backgroundColor: navBackground }}
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12"
      >
        <motion.div
          style={{
            borderBottomColor: `rgba(255,255,255,${navBorderOpacity.get()})`,
            backdropFilter: `blur(${navBlur.get()}px)`,
          }}
          className="flex items-center justify-between h-16 border-b border-white/10"
        >
          {/* Wordmark / Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 select-none"
            aria-label="Home"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/30">
              <Zap className="h-3.5 w-3.5 text-white fill-white" />
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-md bg-violet-400/40 animate-ping opacity-60 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="font-mono text-sm font-bold tracking-tighter text-white">
              AI
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                forge
              </span>
              .dev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`
                  relative px-3.5 py-2 rounded-md font-mono text-xs tracking-wide
                  transition-colors duration-200
                  ${
                    isActive(href)
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  }
                `}
              >
                {/* Active indicator pill */}
                {isActive(href) && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-md bg-white/10 border border-white/15"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </Link>
            ))}

            {/* CTA Button */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="ml-3 flex items-center gap-1.5 px-4 py-2 rounded-md
                bg-gradient-to-r from-violet-600 to-cyan-500
                text-white font-mono text-xs font-semibold tracking-wide
                shadow-md shadow-violet-500/25
                hover:shadow-violet-500/50 transition-shadow duration-300"
            >
              Let's build
              <ArrowUpRight className="h-3 w-3" />
            </motion.a>
          </nav>

          {/* Mobile Hamburger */}
          <motion.button
            onClick={toggleMenu}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            className="relative md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.header>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Tap-outside backdrop */}
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              aria-hidden="true"
            />

            {/* The overlay panel itself */}
            <motion.nav
              key="mobile-overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              aria-label="Mobile navigation"
              className="
                fixed inset-0 z-40 md:hidden
                flex flex-col
                bg-zinc-950/95 backdrop-blur-2xl
              "
            >
              {/* Decorative gradient orbs */}
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-violet-600/15 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

              {/* Top row: logo + close */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/8 shrink-0">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2"
                >
                  <span className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center">
                    <Zap className="h-3 w-3 text-white fill-white" />
                  </span>
                  <span className="font-mono text-sm font-bold text-white">
                    AI<span className="text-violet-400">forge</span>.dev
                  </span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 flex flex-col justify-center px-6 pb-12 gap-1">
                {NAV_LINKS.map(({ href, label, shortLabel }) => (
                  <motion.div key={href} variants={linkItemVariants}>
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        group relative flex items-center justify-between
                        w-full px-4 py-4 rounded-xl
                        transition-colors duration-200
                        ${
                          isActive(href)
                            ? "bg-white/8 text-white"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }
                      `}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[10px] text-zinc-600 w-14 shrink-0">
                          ./{shortLabel}
                        </span>
                        <span className="text-xl font-bold tracking-tight">{label}</span>
                      </div>
                      <motion.span
                        initial={{ x: -4, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="text-violet-400"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </motion.span>
                      {isActive(href) && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer tagline */}
              <motion.div
                variants={linkItemVariants}
                className="px-6 pb-8 shrink-0"
              >
                <a
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="
                    flex items-center justify-center gap-2
                    w-full py-4 rounded-xl
                    bg-gradient-to-r from-violet-600 to-cyan-500
                    text-white font-mono text-sm font-bold tracking-wide
                    shadow-lg shadow-violet-500/30
                  "
                >
                  Let's build something wild
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <p className="mt-4 text-center font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
                  AI-Driven · Production-Ready · Ship Fast
                </p>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}