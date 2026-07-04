"use client";

import React from 'react';
import { ExternalLink, Terminal, Code2, Layers } from 'lucide-react';

// Data array containing all 9 of your live project configurations
const projects = [
  {
    title: "Kumar Enterprises",
    category: "Industrial & B2B Logistics",
    url: "https://kumarenterprisespune.netlify.app/",
    spark: "Needed a robust, high-performance digital presence to streamline industrial B2B client acquisition and display corporate scale.",
    execution: "Built using optimized layout structures, utility-first clean layouts, and lightweight asset loading patterns.",
  },
  {
    title: "Bombay Engineering",
    category: "Heavy Engineering & Manufacturing",
    url: "https://bombayengineering.netlify.app/",
    spark: "A modern commercial gateway designed to catalog complex manufacturing capabilities and heavy engineering specifications dynamically.",
    execution: "Structured with strict semantic HTML sections, high-impact typography, and production-ready layout scaling.",
  },
  {
    title: "Skycity Borivali",
    category: "Premium Real Estate Landing System",
    url: "https://skycity-borivali.netlify.app/",
    spark: "A high-conversion real estate landing interface engineered to capture high-value property inquiries seamlessly.",
    execution: "Optimized with dynamic visual components, absolute asset positioning, and instant layout paint times.",
  },
  {
    title: "Catch25",
    category: "Educational & Coaching Portal",
    url: "https://catch25.netlify.app/",
    spark: "An organized institutional platform designed to bridge student interactions, courses, and educational announcements.",
    execution: "Engineered with responsive navigational hierarchies, fast font rendering, and layout scaling adjustments.",
  },
  {
    title: "Birawat Dental",
    category: "Healthcare & Clinic Portal",
    url: "https://birawatdental.netlify.app/",
    spark: "A pristine, high-trust healthcare utility screen to let patients browse specialized medical services and book visits.",
    execution: "Designed with responsive UI principles, strict clean layouts, and clear call-to-action structures.",
  },
  {
    title: "For You Designed",
    category: "Creative Agency Showcase",
    url: "https://foryoudesigned.netlify.app/",
    spark: "An interactive, modern portfolio designed to flash bold agency layout elements and premium styling options.",
    execution: "Leveraged advanced styling grids, fluid container scaling, and crisp responsive element placement.",
  },
  {
    title: "My Sales Bill Book Dashboard",
    category: "Full-Stack SaaS & Fintech Tool",
    url: "https://my-sales-bill-book.vercel.app/dashboard",
    spark: "A complete transactional operations workspace designed to process live bills, trace metrics, and manage commercial ledgers.",
    execution: "Developed as a complex multi-state dashboard, using rigid session structures and absolute data view alignments.",
  },
  {
    title: "Property Manager",
    category: "Real Estate Automation SaaS",
    url: "https://property-manager-nine-vert.vercel.app/",
    spark: "An automation architecture platform built to coordinate real estate portfolios, rental flows, and operational records.",
    execution: "Integrated with rapid layout components, strict data arrays, and fluid state management mechanics.",
  },
  {
    title: "MPS Chikuwadi",
    category: "Institutional School Portal",
    url: "https://mps-chikuwadi.vercel.app/",
    spark: "A clean, multi-page informational ecosystem constructed to serve academic schedules, school data, and parent updates.",
    execution: "Engineered with mobile-first layout breakpoints, lightweight components, and high readability scores.",
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Page Header Section */}
      <div className="max-w-6xl mx-auto mb-16 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-400 mb-4">
          <Terminal size={14} /> SYSTEM: PRODUCTION_SHIPPING_LOG
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-white via-zinc-400 to-zinc-700 bg-clip-text text-transparent mb-4">
          WHAT WE DID.
        </h1>
        <p className="text-zinc-400 max-w-2xl font-medium text-sm md:text-base">
          9 active application builds shipped directly into production using rapid AI orchestration, responsive front-end structures, and zero boilerplate friction.
        </p>
      </div>

      {/* Responsive Layout Grid Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="group relative backdrop-blur-md bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] flex flex-col justify-between"
          >
            <div>
              {/* Header inside Card */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* Technical 3-Part Structural Narrative */}
              <div className="space-y-4 my-6 font-sans text-sm">
                <div className="border-l-2 border-zinc-800 pl-3">
                  <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-wider block mb-0.5">The Spark</span>
                  <p className="text-zinc-400 leading-relaxed font-normal">{project.spark}</p>
                </div>
                <div className="border-l-2 border-zinc-800 pl-3">
                  <span className="text-[10px] font-mono text-fuchsia-500 uppercase tracking-wider block mb-0.5">The Execution</span>
                  <p className="text-zinc-400 leading-relaxed font-normal">{project.execution}</p>
                </div>
              </div>
            </div>

            {/* Bottom URL link block */}
            <div className="pt-4 border-t border-zinc-900/80 flex items-center justify-between text-xs font-mono text-zinc-600">
              <span className="flex items-center gap-1.5">
                <Code2 size={12} /> Live Build
              </span>
              <a 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 group-hover:text-white transition-colors underline underline-offset-4 decoration-zinc-700 truncate max-w-[200px]"
              >
                {project.url.replace('https://', '')}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}