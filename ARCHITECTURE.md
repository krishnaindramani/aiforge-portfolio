# AIforge.dev — Portfolio Architecture Blueprint

## Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout — fonts, Navbar, metadata
│   ├── globals.css             # Tailwind base + custom keyframes
│   ├── page.tsx                # Home: kinetic hero + terminal widget
│   ├── about/
│   │   └── page.tsx            # Know Us: Bento Box grid layout
│   ├── projects/
│   │   └── page.tsx            # ✅ DELIVERED — 9-project showcase
│   ├── services/
│   │   └── page.tsx            # What We Can Do: capability grid
│   └── contact/
│       └── page.tsx            # Let's Talk: Gen-Z badges + glassmorphic form
│
├── components/
│   ├── Navbar.tsx              # ✅ DELIVERED — glassmorphic + mobile overlay
│   ├── TerminalWidget.tsx      # Typewriter terminal for Home
│   ├── BentoGrid.tsx           # Bento layout cells for About
│   ├── ServiceCard.tsx         # Capability cards for Services
│   ├── ContactForm.tsx         # Neon-underline form for Contact
│   └── FloatingBadges.tsx      # Gen-Z animated badges for Contact
│
├── lib/
│   └── projects.ts             # ✅ DELIVERED — Project data array + types
│
├── public/
│   └── (static assets, OG images)
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## package.json — Required Dependencies

```json
{
  "name": "aiforge-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.0.0",
    "lucide-react": "^0.469.0"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "autoprefixer": "^10.4.20"
  }
}
```

---

## tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
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
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "gradient-slide": "gradientSlide 4s linear infinite",
        "terminal-blink": "terminalBlink 1s step-end infinite",
        "float-up": "floatUp 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIforge.dev — AI-Driven Production Web Systems",
  description:
    "We ship production-ready full-stack websites and SaaS applications in under a week using AI-driven rapid prototyping architecture.",
  openGraph: {
    title: "AIforge.dev",
    description: "9 live projects. AI-driven. Shipped fast.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`
          ${inter.variable} ${jetbrainsMono.variable}
          font-sans bg-zinc-950 text-white antialiased
          selection:bg-violet-500/30 selection:text-violet-200
        `}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

---

## app/globals.css

```css
@import "tailwindcss";

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #09090b; }
::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover { background: #3f3f46; }

/* Smooth scroll */
html { scroll-behavior: smooth; }

/* Focus visible ring */
:focus-visible {
  outline: 2px solid #8b5cf6;
  outline-offset: 3px;
  border-radius: 4px;
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "**.netlify.app" },
      { hostname: "**.vercel.app" },
    ],
  },
};

export default nextConfig;
```

---

## Design Token System

| Token        | Value         | Usage                           |
|--------------|---------------|---------------------------------|
| Background   | `#09090b`     | Page base (zinc-950)            |
| Surface      | `#18181b`     | Cards, panels (zinc-900)        |
| Border       | `rgba(255,255,255,0.08)` | Subtle borders           |
| Accent A     | `#8b5cf6`     | Violet — primary accent         |
| Accent B     | `#22d3ee`     | Cyan — secondary accent         |
| Text Primary | `#ffffff`     | Headlines                       |
| Text Muted   | `#71717a`     | Zinc-500 — secondary text       |
| Font Display | JetBrains Mono | All labels, nav, code           |
| Font Body    | Inter          | Paragraphs, descriptions        |

---

## Delivered Files

| File                            | Status    |
|---------------------------------|-----------|
| `lib/projects.ts`               | ✅ Complete |
| `components/Navbar.tsx`         | ✅ Complete |
| `app/projects/page.tsx`         | ✅ Complete |
| Architecture Blueprint (this)   | ✅ Complete |