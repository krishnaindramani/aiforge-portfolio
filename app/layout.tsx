import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "AIforge.dev — AI-Driven Production Web Systems",
    template: "%s | AIforge.dev",
  },
  description:
    "We ship production-ready full-stack websites and SaaS applications in under a week using AI-driven rapid prototyping architecture. 9 live projects across 7 industries.",
  keywords: [
    "Next.js",
    "AI development",
    "rapid prototyping",
    "SaaS",
    "full-stack",
    "web development",
    "Tailwind CSS",
    "Framer Motion",
  ],
  authors: [{ name: "AIforge.dev" }],
  openGraph: {
    title: "AIforge.dev — Ship Fast. Ship Real.",
    description:
      "9 live projects. AI-driven. Production-ready in under a week.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIforge.dev",
    description: "AI-Driven Production Web Systems. Ship fast.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="
          font-sans bg-zinc-950 text-white antialiased
          selection:bg-violet-500/30 selection:text-violet-200
          min-h-screen
        "
      >
        <Navbar />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}