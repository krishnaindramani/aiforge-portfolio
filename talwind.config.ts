import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // ── Fonts ──────────────────────────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
      },

      // ── Colors ─────────────────────────────────────────────────────────────
      colors: {
        brand: {
          violet: "#8b5cf6",
          cyan: "#22d3ee",
          emerald: "#10b981",
          orange: "#f97316",
        },
      },

      // ── Keyframes ──────────────────────────────────────────────────────────
      keyframes: {
        gradientSlide: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        terminalBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        floatUp: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(139,92,246,0)" },
          "50%": { boxShadow: "0 0 20px 4px rgba(139,92,246,0.2)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      // ── Animations ─────────────────────────────────────────────────────────
      animation: {
        "gradient-slide": "gradientSlide 4s linear infinite",
        "terminal-blink": "terminalBlink 1s step-end infinite",
        float: "floatUp 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
      },

      // ── Background size ─────────────────────────────────────────────────────
      backgroundSize: {
        "200%": "200% auto",
      },

      // ── Border radius ───────────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
      },

      // ── Box shadow ──────────────────────────────────────────────────────────
      boxShadow: {
        "glow-violet": "0 0 30px rgba(139, 92, 246, 0.3)",
        "glow-cyan": "0 0 30px rgba(34, 211, 238, 0.3)",
        glass: "0 4px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
    },
  },

  plugins: [],
};

export default config;