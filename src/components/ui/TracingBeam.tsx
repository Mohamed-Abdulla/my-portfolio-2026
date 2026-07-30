"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useVelocity, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  // Monitor resize to recalculate line path
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    { stiffness: 500, damping: 90 }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight]),
    { stiffness: 500, damping: 90 }
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
    >
      <div className="absolute -left-4 md:-left-20 top-3 no-print hidden md:block">
        {/* Glowing floating scroll tracker dot */}
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="ml-[27px] h-4 w-4 rounded-full border border-card-border bg-slate-950 flex items-center justify-center shadow-lg"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            style={{
              backgroundColor: useTransform(
                scrollYProgress,
                [0, 1],
                ["#3b82f6", "#00f5d4"]
              ),
            }}
            className="h-2 w-2 rounded-full bg-primary-accent"
          />
        </motion.div>
        
        {/* Tracing line */}
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-8 block"
          aria-hidden="true"
        >
          <path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.2"
          />
          <motion.path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#tracing-gradient)"
            strokeWidth="1.8"
            className="motion-reduce:hidden"
            style={{
              strokeDasharray: svgHeight,
              strokeDashoffset: useTransform(scrollYProgress, [0, 1], [svgHeight, 0]),
            }}
          />
          <defs>
            <linearGradient
              id="tracing-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="0"
              y2={svgHeight}
            >
              <stop stopColor="#3b82f6" stopOpacity="0" />
              <stop stopColor="#3b82f6" offset="0.3" />
              <stop stopColor="#00f5d4" offset="0.8" />
              <stop stopColor="#00f5d4" offset="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
