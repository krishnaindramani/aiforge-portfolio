export type ProjectCategory =
  | "SaaS / Fintech"
  | "Real Estate"
  | "Industrial / B2B"
  | "Healthcare"
  | "Education"
  | "Creative Agency"
  | "Institutional";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  url: string;
  gradient: string; // Tailwind gradient classes
  accentHex: string; // for JS-driven glow
  spark: string;
  execution: {
    stack: string[];
    detail: string;
  };
  impact: string;
  year: string;
}

export const PROJECTS: Project[] = [
  {
    id: "kumar-enterprises",
    title: "Kumar Enterprises",
    tagline: "Industrial B2B Logistics Portal",
    category: "Industrial / B2B",
    url: "https://kumarenterprisespune.netlify.app/",
    gradient: "from-orange-500 via-amber-400 to-yellow-300",
    accentHex: "#f97316",
    spark:
      "A Pune-based logistics firm losing leads to a decade-old static brochure site. They needed a conversion-ready digital presence that spoke the language of procurement officers and fleet managers — not just aesthetics.",
    execution: {
      stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Netlify"],
      detail:
        "Architected a high-performance landing system using AI-assisted component generation for service breakdowns, inquiry forms, and trust-builder sections. Rapid prototyping cut the build cycle to under a week.",
    },
    impact:
      "Live B2B portal converting cold traffic into qualified inquiry leads. Shipped production-ready from concept in under 7 days.",
    year: "2024",
  },
  {
    id: "bombay-engineering",
    title: "Bombay Engineering",
    tagline: "Heavy Manufacturing Web Presence",
    category: "Industrial / B2B",
    url: "https://bombayengineering.netlify.app/",
    gradient: "from-slate-500 via-zinc-400 to-stone-300",
    accentHex: "#64748b",
    spark:
      "A legacy heavy-engineering firm with zero digital presence needed a site that projected industrial authority while generating RFQ pipeline from enterprise clients.",
    execution: {
      stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Netlify"],
      detail:
        "Built a precision-first visual system — bold typographic headers, product capability grids, and a structured inquiry flow. AI prompting workflow enabled rapid iteration on industrial copy and layout hierarchy.",
    },
    impact:
      "First-ever digital presence for the brand. Now handles inbound enterprise RFQ leads without a single sales call as entry point.",
    year: "2024",
  },
  {
    id: "skycity-borivali",
    title: "Skycity Borivali",
    tagline: "Premium Real Estate Landing System",
    category: "Real Estate",
    url: "https://skycity-borivali.netlify.app/",
    gradient: "from-violet-600 via-purple-500 to-indigo-400",
    accentHex: "#7c3aed",
    spark:
      "A Mumbai real-estate developer launching a premium residential project needed a landing page that converted aspirational buyers — not just collected clicks. Every second of load time cost a lead.",
    execution: {
      stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Netlify"],
      detail:
        "Designed a high-conversion funnel with hero video backdrop, animated amenity showcases, floor-plan modals, and an FOMO-engineered enquiry form. AI-driven copy and section structure compressed build time from 3 weeks to 4 days.",
    },
    impact:
      "High-velocity landing page handling project launch traffic. Lead capture form integrated with CRM pipeline for immediate sales team follow-up.",
    year: "2024",
  },
  {
    id: "catch25",
    title: "Catch25",
    tagline: "Coaching Institute Digital Hub",
    category: "Education",
    url: "https://catch25.netlify.app/",
    gradient: "from-emerald-500 via-teal-400 to-cyan-300",
    accentHex: "#10b981",
    spark:
      "An educational coaching institute needed a student-facing portal that built trust with parents, surfaced course offerings clearly, and drove enrollment inquiries — in a market saturated with generic edu-templates.",
    execution: {
      stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Netlify"],
      detail:
        "Created a results-forward structure: testimonial proof blocks, subject grid, faculty showcase, and a sticky enrollment CTA. AI-assisted prototyping handled repeated section variants and mobile-first refinement rapidly.",
    },
    impact:
      "Live student acquisition portal. Enrollment inquiry funnel fully operational, serving both mobile and desktop student audiences.",
    year: "2024",
  },
  {
    id: "birawat-dental",
    title: "Birawat Dental",
    tagline: "Modern Healthcare Clinic Portal",
    category: "Healthcare",
    url: "https://birawatdental.netlify.app/",
    gradient: "from-sky-500 via-blue-400 to-cyan-300",
    accentHex: "#0ea5e9",
    spark:
      "A dental clinic struggling with appointment no-shows and zero online discoverability. Needed a trust-first digital presence that could pre-qualify patients before they walked in the door.",
    execution: {
      stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Netlify"],
      detail:
        "Engineered a patient-confidence architecture: service taxonomy, before/after galleries, doctor profiles, and a structured booking inquiry widget. Clean clinical aesthetic enforced through strict design token discipline.",
    },
    impact:
      "Fully live clinic portal with online appointment inquiry capability. Reduced friction between patient discovery and first contact significantly.",
    year: "2024",
  },
  {
    id: "for-you-designed",
    title: "For You Designed",
    tagline: "Creative Agency / Design Studio",
    category: "Creative Agency",
    url: "https://foryoudesigned.netlify.app/",
    gradient: "from-pink-500 via-rose-400 to-orange-300",
    accentHex: "#ec4899",
    spark:
      "A design studio whose own website was embarrassingly static — the cobbler's children problem. Needed a portfolio that matched the quality of work being pitched to clients, instantly.",
    execution: {
      stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Netlify"],
      detail:
        "Built a kinetic, personality-forward showcase. Animated hero, fluid case study cards, and a contact experience designed to feel like the studio's own work. Iterative AI prompting handled motion choreography and copy tone simultaneously.",
    },
    impact:
      "The agency's live front door. Client-facing portfolio that earns credibility before the first call even happens.",
    year: "2024",
  },
  {
    id: "my-sales-bill-book",
    title: "My Sales Bill Book",
    tagline: "Full-Stack SaaS Fintech Dashboard",
    category: "SaaS / Fintech",
    url: "https://my-sales-bill-book.vercel.app/dashboard",
    gradient: "from-lime-400 via-green-400 to-emerald-500",
    accentHex: "#84cc16",
    spark:
      "Small business owners managing invoices through WhatsApp photos and paper registers needed a purpose-built digital ledger — affordable, fast, and zero learning curve.",
    execution: {
      stack: [
        "Next.js App Router",
        "Tailwind CSS",
        "Prisma",
        "PostgreSQL",
        "Vercel",
      ],
      detail:
        "Architected a full-stack SaaS with auth, invoice generation, product catalog management, and real-time sales analytics dashboard. AI-driven architecture decisions accelerated data modeling and component scaffolding to a fraction of traditional timelines.",
    },
    impact:
      "Live production SaaS with real users managing sales records. Full CRUD pipeline, PDF invoice generation, and dashboard analytics operational.",
    year: "2024",
  },
  {
    id: "property-manager",
    title: "Property Manager",
    tagline: "Real Estate Automation SaaS",
    category: "Real Estate",
    url: "https://property-manager-nine-vert.vercel.app/",
    gradient: "from-amber-400 via-orange-400 to-red-400",
    accentHex: "#f59e0b",
    spark:
      "Property agents manually tracking tenants, rent cycles, and maintenance requests across spreadsheets. A systematic automation gap that cost hours per week and introduced expensive errors.",
    execution: {
      stack: [
        "Next.js App Router",
        "Tailwind CSS",
        "Prisma",
        "PostgreSQL",
        "Vercel",
      ],
      detail:
        "Built a multi-tenant property management platform: property listings, tenant assignment flows, rent tracking with overdue flags, and maintenance request queuing. AI-assisted backend scaffolding compressed a 3-month build into weeks.",
    },
    impact:
      "Live SaaS platform automating the full property management lifecycle. Agents have replaced spreadsheets with a dedicated operational system.",
    year: "2024",
  },
  {
    id: "mps-chikuwadi",
    title: "MPS Chikuwadi",
    tagline: "School & Institutional Portal",
    category: "Institutional",
    url: "https://mps-chikuwadi.vercel.app/",
    gradient: "from-blue-600 via-indigo-500 to-violet-400",
    accentHex: "#4f46e5",
    spark:
      "A school with no digital presence struggling to communicate with parents and prospective admissions. Needed an institutional authority site that parents and children trusted immediately.",
    execution: {
      stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      detail:
        "Designed a trust-forward school portal: principal message, academic programs grid, facility gallery, and structured admission inquiry flow. AI-driven content structuring aligned institutional tone across all copy rapidly.",
    },
    impact:
      "Live institutional portal serving parents and prospective families. Admissions inquiry funnel operational and school's first permanent digital footprint established.",
    year: "2024",
  },
];

export const ALL_CATEGORIES: ProjectCategory[] = [
  "SaaS / Fintech",
  "Real Estate",
  "Industrial / B2B",
  "Healthcare",
  "Education",
  "Creative Agency",
  "Institutional",
];