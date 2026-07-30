"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ContainerScroll } from "../ui/ContainerScroll";
import DevOpsConsole from "../widgets/DevOpsConsole";
import { Cpu } from "lucide-react";

// Lazy-load Three.js Canvas to prevent SSR (Server-Side Rendering) failures
const SkillsGlobe = dynamic(() => import("../three/SkillsGlobe"), {
  ssr: false,
  loading: () => (
    <div className="h-80 w-full flex items-center justify-center">
      <div className="w-56 h-56 rounded-full border border-card-border/30 animate-pulse bg-slate-900/20 flex items-center justify-center text-slate-500 text-[11px] font-mono">
        Initializing WebGL Canvas...
      </div>
    </div>
  ),
});

export default function Skills() {
  return (
    <section id="skills" className="py-12 relative bg-[#080c14] border-t border-card-border/30 overflow-hidden">
      {/* Backlighting glow */}
      <div className="glow-spotlight -top-40 right-1/4 bg-primary-accent/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center text-center mb-8">
              <span className="text-xs font-bold tracking-widest text-primary-accent uppercase mb-3">Technologies</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display">
                Skills & <span className="text-gradient-blue-teal">Cloud Observability</span>
              </h2>
            </div>
          }
        >
          {/* Desktop Split Layout inside the 3D card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 bg-[#090f1d]/45">
            {/* Left Column: 3D Globe + Legend */}
            <div className="lg:col-span-5 flex flex-col items-center">
              {/* Interactive 3D Sphere */}
              <SkillsGlobe />

              {/* Category Legend */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 max-w-sm">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#60a5fa] block" />
                  Frontend / JS
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c084fc] block" />
                  Backend APIs
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] block" />
                  DevOps / Messaging
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] block" />
                  Databases
                </div>
              </div>
            </div>

            {/* Right Column: DevOps Console */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Description Text */}
              <div className="text-left max-w-2xl lg:pl-4">
                <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2.5 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-accent-teal" />
                  Distributed Systems Expertise
                </h3>
                <p className="text-xs sm:text-sm font-sans text-slate-400 leading-relaxed">
                  Observability, reliability, and security are core priorities for modern backend systems. Interact with
                  the terminal below to review mock operations, system status updates, event streams, and authentication
                  tests matching my production deployments.
                </p>
              </div>

              {/* Interactive Terminal */}
              <DevOpsConsole />
            </div>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}
