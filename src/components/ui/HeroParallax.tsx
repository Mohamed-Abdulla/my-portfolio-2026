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
      className="h-[110vh] sm:h-[135vh] min-h-[600px] sm:min-h-[950px] w-full overflow-x-hidden overflow-y-visible relative flex flex-col bg-[#080c14] z-10"
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
      whileHover={{ y: -5 }}
      key={product.title}
      className="group h-[150px] w-[205px] sm:h-[195px] sm:w-[260px] md:h-[215px] md:w-[290px] shrink-0 relative rounded-2xl overflow-hidden glass-panel border border-card-border shadow-2xl transition-all cursor-grab active:cursor-grabbing select-none"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-accent/5 to-accent-teal/5 z-0" />

      {/* Project Mock Icon in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 group-hover:scale-105 group-hover:opacity-20 transition-all duration-700 z-0">
        <img src={product.imgUrl} alt="" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
      </div>

      {/* Tags overlay (Hidden on extra small mobile screens for visual spacing) */}
      <div className="absolute top-2.5 left-2.5 z-25 flex flex-wrap gap-1">
        {product.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-[7px] sm:text-[7.5px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-slate-950/85 border border-card-border/60 text-accent-teal"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Interactive Hover Actions overlay */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all duration-300 z-30">
        <a
          href={product.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-primary-accent to-accent-teal text-black hover:scale-110 transition-transform shadow-lg shadow-accent-teal/20"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </a>
        <a
          href={product.codeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 sm:p-2.5 rounded-full glass-panel border-card-border hover:border-white text-white hover:scale-110 transition-transform"
        >
          <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </a>
      </div>

      {/* Card Info details */}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4.5 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-10 text-left flex flex-col justify-end min-h-[85px] sm:min-h-[105px]">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xs sm:text-sm font-bold font-display text-white tracking-wide truncate pr-2">
            {product.title}
          </h2>
          {product.featured && (
            <span className="text-[6.5px] sm:text-[7px] font-bold uppercase tracking-wider text-accent-teal px-1.5 py-0.5 rounded bg-accent-teal/10 border border-accent-teal/20 shrink-0">
              Ftrd
            </span>
          )}
        </div>
        <p className="text-[9px] sm:text-[11px] text-slate-400 font-sans leading-relaxed line-clamp-3 hidden sm:block">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
};
