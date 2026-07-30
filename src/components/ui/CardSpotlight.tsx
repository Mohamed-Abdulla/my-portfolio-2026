"use client";

import React, { useState, MouseEvent } from "react";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { cn } from "../../lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "rgba(139, 92, 246, 0.08)", // Glowing electric-violet radial overlay
  className,
}: {
  children: React.ReactNode;
  radius?: number;
  color?: string;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "relative rounded-3xl p-6 sm:p-8 bg-[#090f1d]/45 border border-card-border/60 hover:border-slate-800 transition-colors duration-300 overflow-hidden group/spotlight w-full h-full flex flex-col justify-between",
        className
      )}
    >
      {/* Repeating SVG Dot Grid pattern mask */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-30 group-hover/spotlight:opacity-50 transition-opacity duration-300"
        style={{
          backgroundImage: `radial-gradient(rgba(30, 41, 59, 0.6) 1px, transparent 1px)`,
          backgroundSize: "14px 14px",
        }}
      />

      {/* Dynamic Cursor Spotlight mask using framer values */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`,
        }}
      />

      {/* Actual child items content wrapped above background masks */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
