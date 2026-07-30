"use client";

import React from "react";
import { motion } from "framer-motion";
import { aboutsData } from "../../data/portfolioData";
import { Code2, Smartphone, Terminal, Users } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  // Map icon component based on index
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 className="w-8 h-8 text-primary-accent" />;
      case 1:
        return <Smartphone className="w-8 h-8 text-accent-teal" />;
      case 2:
        return <Terminal className="w-8 h-8 text-violet-400" />;
      case 3:
        return <Users className="w-8 h-8 text-pink-400" />;
      default:
        return <Code2 className="w-8 h-8 text-primary-accent" />;
    }
  };

  return (
    <section id="about" className="py-24 relative bg-[#080c14] border-t border-card-border/30">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title Block */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xs font-bold tracking-widest text-primary-accent uppercase mb-3"
          >
            Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold font-display"
          >
            I Know that <span className="text-gradient-blue-teal">Good Architecture</span>{" "}
            <br className="hidden sm:inline" />
            means <span className="text-gradient-blue-teal">Good Business</span>
          </motion.h2>
        </div>

        {/* Profiles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {aboutsData.map((about, index) => (
            <motion.div
              key={about.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col items-start relative group overflow-hidden"
            >
              {/* Backglow accent on hover */}
              <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-linear-to-br from-primary-accent/10 to-accent-teal/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon Frame */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-card-border mb-6 group-hover:border-accent-teal/40 transition-colors">
                {getIcon(index)}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold font-display mb-3 text-slate-100 group-hover:text-white transition-colors">
                {about.title}
              </h3>

              {/* Description */}
              <p className="text-sm font-sans text-slate-400 leading-relaxed">{about.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
