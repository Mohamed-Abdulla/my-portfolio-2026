"use client";

import React from "react";
import { cn } from "../../lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none overflow-hidden opacity-30 z-0",
        className
      )}
    >
      <svg
        className="absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#00f5d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Slanted lines with stroke animations */}
        <line
          x1="-10%"
          y1="10%"
          x2="110%"
          y2="90%"
          stroke="url(#beam-gradient)"
          strokeWidth="1.5"
          className="animate-pulse-slow"
          style={{
            animationDuration: "8s",
          }}
        />
        <line
          x1="10%"
          y1="-10%"
          x2="90%"
          y2="110%"
          stroke="url(#beam-gradient)"
          strokeWidth="1"
          className="animate-pulse-slow"
          style={{
            animationDuration: "12s",
          }}
        />
        <line
          x1="-20%"
          y1="50%"
          x2="120%"
          y2="50%"
          stroke="url(#beam-gradient)"
          strokeWidth="1.2"
          className="animate-pulse-slow"
          style={{
            animationDuration: "6s",
          }}
        />
      </svg>
    </div>
  );
};
