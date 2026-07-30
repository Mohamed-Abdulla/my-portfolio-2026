"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experienceTimeline } from "../../data/portfolioData";
import { Briefcase, Calendar, Building, CheckCircle2 } from "lucide-react";

export default function Experience() {
  const [activeExp, setActiveExp] = useState<number>(0);

  return (
    <section id="experience" className="py-24 relative bg-[#080c14] border-t border-card-border/30">
      <div className="glow-spotlight top-1/3 -right-40 bg-accent-teal/10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-primary-accent uppercase mb-3">Timeline</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            Professional <span className="text-gradient-blue-teal">Journey & Experience</span>
          </h2>
        </div>

        {/* Timeline Structure */}
        <div className="relative max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Years / Companies */}
          <div className="md:col-span-4 flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none">
            {experienceTimeline.map((exp, idx) => {
              const isActive = activeExp === idx;
              const work = exp.works[0];
              return (
                <button
                  key={exp.year}
                  onClick={() => setActiveExp(idx)}
                  className={`shrink-0 md:w-full flex flex-col items-start p-5 rounded-2xl glass-panel border transition-all text-left group relative ${
                    isActive
                      ? "border-primary-accent/40 bg-slate-900/60 shadow-lg shadow-primary-accent/5"
                      : "border-card-border hover:border-slate-700/60"
                  }`}
                >
                  {/* Left Highlight line */}
                  {isActive && (
                    <motion.div
                      layoutId="timelineActiveBar"
                      className="absolute left-0 top-0 md:top-1/4 bottom-0 md:bottom-auto md:w-1.5 md:h-1/2 w-full h-1 bg-linear-to-b from-primary-accent to-accent-teal rounded-r"
                    />
                  )}

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                      isActive ? "text-accent-teal" : "text-slate-500"
                    }`}
                  >
                    {exp.year}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-white group-hover:text-primary-accent transition-colors font-display mb-1 flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-slate-400" />
                    {work.company}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{work.role}</span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Displaying Detailed Descriptions */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              {experienceTimeline.map((exp, idx) => {
                if (activeExp !== idx) return null;
                const work = exp.works[0];
                return (
                  <motion.div
                    key={exp.year}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.3 }}
                    className="glass-panel border-card-border rounded-2xl p-6 sm:p-8 text-left relative"
                  >
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-card-border/60 pb-6 mb-6">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-1.5">{work.role}</h3>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                          <Building className="w-4 h-4 text-primary-accent" />
                          <span className="font-semibold text-slate-300">{work.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-card-border text-[11px] font-semibold text-accent-teal tracking-wide self-start sm:self-auto">
                        <Calendar className="w-3.5 h-3.5" />
                        {work.duration}
                      </div>
                    </div>

                    {/* Work Detail Bullets */}
                    <ul className="flex flex-col gap-4">
                      {work.desc.map((bullet, bIdx) => (
                        <motion.li
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: bIdx * 0.1 }}
                          key={bIdx}
                          className="flex gap-3 text-slate-300 text-xs sm:text-sm leading-relaxed"
                        >
                          <CheckCircle2 className="w-5 h-5 text-accent-teal shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
