"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Eye } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { IProject } from "../../data/portfolioData";

export const HeroParallax = ({ products }: { products: IProject[] }) => {
  // We divide products into 3 rows for sliding animation
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 10 };

  // Horizontal translations
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 800]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -800]),
    springConfig
  );

  // 3D transforms
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-10, 0]),
    springConfig
  );
  const skewX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig
  );

  return (
    <div
      ref={containerRef}
      className="py-12 relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-[#080c14] z-10"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateY,
          skewX,
          opacity,
        }}
        className="relative z-10"
      >
        {/* Row 1 (glides right) */}
        <div className="flex flex-row-reverse space-x-reverse space-x-6 mb-10 overflow-hidden">
          <motion.div style={{ x: translateX }} className="flex gap-6 whitespace-nowrap">
            {firstRow.map((product) => (
              <ProductCard product={product} key={product.title} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 (glides left) */}
        <div className="flex flex-row space-x-6 mb-10 overflow-hidden">
          <motion.div style={{ x: translateXReverse }} className="flex gap-6 whitespace-nowrap">
            {secondRow.map((product) => (
              <ProductCard product={product} key={product.title} />
            ))}
          </motion.div>
        </div>

        {/* Row 3 (glides right) */}
        <div className="flex flex-row-reverse space-x-reverse space-x-6 mb-10 overflow-hidden">
          <motion.div style={{ x: translateX }} className="flex gap-6 whitespace-nowrap">
            {thirdRow.map((product) => (
              <ProductCard product={product} key={product.title} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-40 relative z-20 text-left w-full">
      <span className="text-xs font-bold tracking-widest text-primary-accent uppercase mb-3 block">Portfolio</span>
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display text-white leading-none mb-6">
        The Ultimate <br />
        <span className="text-gradient-blue-teal">Development Showcase</span>
      </h1>
      <p className="max-w-2xl text-xs sm:text-base md:text-lg text-slate-400 leading-relaxed font-sans">
        Browse through my big engineering builds, microservices systems, cross-platform mobile apps, and developer portals.
        Scroll down to watch the portfolio skew and slide in immersive 3D parallax.
      </p>
    </div>
  );
};

const ProductCard = ({ product }: { product: IProject }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      key={product.title}
      className="group h-[320px] w-[350px] sm:w-[400px] shrink-0 relative rounded-2xl overflow-hidden glass-panel border border-card-border shadow-2xl transition-all cursor-grab active:cursor-grabbing select-none"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-accent/5 to-accent-teal/5 z-0" />
      
      {/* Project Mock Icon in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 group-hover:scale-105 group-hover:opacity-20 transition-all duration-700 z-0">
        <img src={product.imgUrl} alt="" className="w-40 h-40 object-contain" />
      </div>

      {/* Tags overlay */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1">
        {product.tags.map((tag) => (
          <span key={tag} className="text-[8px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-950/80 border border-card-border/60 text-accent-teal">
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
          className="p-3.5 rounded-full bg-gradient-to-r from-primary-accent to-accent-teal text-black hover:scale-110 transition-transform shadow-lg shadow-accent-teal/20"
        >
          <Eye className="w-5 h-5" />
        </a>
        <a
          href={product.codeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full glass-panel border-card-border hover:border-white text-white hover:scale-110 transition-transform"
        >
          <FaGithub className="w-5 h-5" />
        </a>
      </div>

      {/* Card Info details */}
      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent z-10 text-left flex flex-col justify-end min-h-[140px]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base sm:text-lg font-bold font-display text-white tracking-wide truncate">
            {product.title}
          </h2>
          {product.featured && (
            <span className="text-[8px] font-bold uppercase tracking-wider text-accent-teal px-1.5 py-0.5 rounded bg-accent-teal/10 border border-accent-teal/20 shrink-0">
              Featured
            </span>
          )}
        </div>
        <p className="text-[11px] sm:text-xs text-slate-400 font-sans leading-relaxed line-clamp-3">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
};
