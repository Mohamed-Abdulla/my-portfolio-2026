"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Eye } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { IProject } from "../../data/portfolioData";

// Suppress library-specific Three.js warnings from showing up in browser console
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === "string" && args[0].includes("THREE.Clock")) {
      return;
    }
    originalWarn(...args);
  };
}

export const HeroParallax = ({ products }: { products: IProject[] }) => {
  // Distribute all 18 projects evenly across three rows of 6 cards
  const firstRow = products.slice(0, 6);
  const secondRow = products.slice(6, 12);
  const thirdRow = products.slice(12, 18);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 180, damping: 25, bounce: 0 };

  // Horizontal translations mapped to sticky scroll progress
  const translateX = useSpring(useTransform(scrollYProgress, [0, 0.7], [-80, 240]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 0.7], [80, -240]), springConfig);

  // 3D Tilt perspective transforms mapped to sticky scroll progress
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.25], [12, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.22], [0.35, 1]), springConfig);
  const rotateY = useSpring(useTransform(scrollYProgress, [0, 0.25], [-8, 0]), springConfig);
  const skewX = useSpring(useTransform(scrollYProgress, [0, 0.25], [8, 0]), springConfig);

  return (
    <div
      ref={containerRef}
      className="h-[110vh] sm:h-[135vh] min-h-[600px] sm:min-h-[950px] w-full overflow-x-hidden overflow-y-visible relative flex flex-col bg-background z-10"
    >
      {/* Normal scrolling header (outside sticky, avoids vertical height conflicts) */}
      <Header />

      {/* Sticky layout container locks onto screen viewport during scroll duration */}
      <div className="sticky top-0 overflow-hidden w-full h-screen flex flex-col justify-center py-4">
        <motion.div
          style={{
            rotateX,
            rotateY,
            skewX,
            opacity,
          }}
          className="relative z-10 flex flex-col gap-3.5 sm:gap-6"
        >
          {/* Row 1 (glides right) */}
          <div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-6 overflow-hidden w-full">
            <motion.div style={{ x: translateX }} className="flex gap-4 sm:gap-6 whitespace-nowrap">
              {firstRow.map((product) => (
                <ProductCard product={product} key={product.title} />
              ))}
            </motion.div>
          </div>

          {/* Row 2 (glides left) */}
          <div className="flex flex-row space-x-4 sm:space-x-6 overflow-hidden w-full">
            <motion.div style={{ x: translateXReverse }} className="flex gap-4 sm:gap-6 whitespace-nowrap">
              {secondRow.map((product) => (
                <ProductCard product={product} key={product.title} />
              ))}
            </motion.div>
          </div>

          {/* Row 3 (glides right) */}
          <div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-6 overflow-hidden w-full">
            <motion.div style={{ x: translateX }} className="flex gap-4 sm:gap-6 whitespace-nowrap">
              {thirdRow.map((product) => (
                <ProductCard product={product} key={product.title} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-8 sm:pt-32 relative z-20 text-left w-full">
      <span className="text-xs font-bold tracking-widest text-primary-accent uppercase mb-2 block">Portfolio</span>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display text-white leading-tight mb-4">
        The Ultimate <br />
        <span className="text-gradient-blue-teal">Development Showcase</span>
      </h1>
      <p className="max-w-2xl text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
        Browse through my engineering builds, distributed microservices, cross-platform mobile apps, and custom IAM
        systems. Scroll down to watch the portfolio skew and slide in immersive 3D parallax.
      </p>
    </div>
  );
};

const ProductCard = ({ product }: { product: IProject }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      key={product.title}
      className="group h-[200px] w-[265px] sm:h-[250px] sm:w-[330px] md:h-[300px] md:w-[400px] shrink-0 relative rounded-2xl overflow-hidden bg-slate-950/65 border border-card-border/80 shadow-2xl transition-all cursor-grab active:cursor-grabbing select-none group-hover:border-primary/50"
    >
      {/* Background vector dot matrix mesh */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.12] group-hover:opacity-20 transition-opacity"
        style={{
          backgroundImage: `radial-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
        }}
      />

      {/* Holographic Hover Diagonal Light Sweep */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tr from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </div>

      {/* Cyber HUD Corner Ticks */}
      <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-primary/40 group-hover:border-primary transition-colors rounded-tl-sm z-20" />
      <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-primary/40 group-hover:border-primary transition-colors rounded-tr-sm z-20" />
      <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-primary/40 group-hover:border-primary transition-colors rounded-bl-sm z-20" />
      <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-primary/40 group-hover:border-primary transition-colors rounded-br-sm z-20" />

      {/* Telemetry Index Badge */}
      <div className="absolute top-3.5 left-8 z-20 text-[6.5px] sm:text-[7.5px] font-mono text-slate-500 uppercase tracking-widest">
        PROJ_IO // SECURE
      </div>

      {/* Project Brand Icon centered in background with rotating cyber circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {/* Glowing radial backdrop */}
        <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors" />
        
        {/* Cyber ring container */}
        <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-dashed border-card-border/40 group-hover:border-primary/20 group-hover:rotate-45 transition-all duration-700 flex items-center justify-center">
          <img 
            src={product.imgUrl} 
            alt="" 
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain opacity-50 group-hover:scale-105 group-hover:opacity-85 transition-all duration-700" 
          />
        </div>
      </div>

      {/* Interactive Actions Overlay (triggers on group hover) */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all duration-300 z-30">
        <a
          href={product.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 sm:p-3 rounded-full bg-linear-to-r from-primary to-secondary text-black hover:scale-110 transition-transform shadow-lg shadow-secondary/20 cursor-pointer"
        >
          <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
        </a>
        <a
          href={product.codeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 sm:p-3 rounded-full glass-panel border-card-border hover:border-white text-white hover:scale-110 transition-transform cursor-pointer"
        >
          <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </div>

      {/* Card Info details bottom panel */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent z-10 text-left flex flex-col justify-end min-h-[110px] sm:min-h-[145px]">
        
        {/* Title and Featured Badge */}
        <div className="flex items-center justify-between mb-1 sm:mb-1.5">
          <h2 className="text-sm sm:text-base font-bold font-display text-white tracking-wide truncate pr-2">
            {product.title}
          </h2>
          {product.featured && (
            <span className="text-[6.5px] sm:text-[7.5px] font-bold uppercase tracking-wider text-secondary px-1.5 py-0.5 rounded bg-secondary/10 border border-secondary/20 shrink-0">
              Featured
            </span>
          )}
        </div>
        
        {/* Description */}
        <p className="text-[9.5px] sm:text-[11.5px] text-slate-400 font-sans leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2.5">
          {product.description}
        </p>

        {/* Tech Stack Badge Grid (Dynamic visual tech stack) */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 overflow-hidden max-h-[36px] sm:max-h-[46px]">
          {product.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[7px] sm:text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900/90 border border-card-border/60 text-secondary group-hover:border-primary/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
