"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../../data/portfolioData";
import { Eye, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("Featured");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showAllFeatured, setShowAllFeatured] = useState(false);

  const categories = ["Featured", "Full Stack", "Mobile App", "Backend/Services", "Design/3D"];

  // Filter projects logic
  const getFilteredProjects = () => {
    if (activeFilter === "Featured") {
      const featured = projectsData.filter((p) => p.featured);
      return showAllFeatured ? featured : featured.slice(0, 4);
    }
    return projectsData.filter((p) => p.tags.includes(activeFilter));
  };

  const filteredProjects = getFilteredProjects();

  const handleFilterClick = (category: string) => {
    setActiveFilter(category);
    setExpandedIndex(null);
    setShowAllFeatured(false);
  };

  return (
    <section id="work" className="py-24 relative bg-[#080c14] border-t border-card-border/30">
      <div className="glow-spotlight bottom-0 left-0 bg-primary-accent/10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-primary-accent uppercase mb-3">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            My Creative <span className="text-gradient-blue-teal">Showcase</span> Section
          </h2>
        </div>

        {/* Filter Tabs with Sliding Background Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((category) => {
            const isTabActive = activeFilter === category;
            return (
              <button
                key={category}
                onClick={() => handleFilterClick(category)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isTabActive
                    ? "text-black font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {/* Sliding background element */}
                {isTabActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-gradient-to-r from-primary-accent to-accent-teal rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                {!isTabActive && (
                  <div className="absolute inset-0 rounded-xl glass-panel border-card-border -z-20" />
                )}
                {category}
              </button>
            );
          })}
        </div>

        {/* Bento Grid layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(350px,_auto)]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isExpanded = expandedIndex === index;
              const isBentoWide = project.featured && activeFilter === "Featured";

              return (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`glass-panel rounded-2xl overflow-hidden flex flex-col group border border-card-border hover:border-slate-800 transition-all ${
                    isBentoWide ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="grid grid-cols-1 h-full flex-grow relative">
                    
                    {/* Visual Card Image Display */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-950/40 border-b border-card-border flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary-accent/5 to-accent-teal/5 z-0" />
                      
                      {/* Tags */}
                      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-950/80 border border-card-border/80 text-accent-teal">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Display Icon logo */}
                      <img
                        src={project.imgUrl}
                        alt={project.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-75 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500 relative z-10"
                      />

                      {/* Glassmorphic hover overlay links */}
                      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all duration-300 z-20">
                        <a
                          href={project.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 rounded-full bg-gradient-to-r from-primary-accent to-accent-teal text-black hover:scale-110 transition-transform shadow-lg"
                          title="Live Demo"
                        >
                          <Eye className="w-5 h-5" />
                        </a>
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 rounded-full glass-panel border-card-border hover:border-white text-white hover:scale-110 transition-transform"
                          title="Source Code"
                        >
                          <FaGithub className="w-5 h-5" />
                        </a>
                      </div>
                    </div>

                    {/* Card Content details */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div className="text-left">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold font-display text-white group-hover:text-accent-teal transition-colors">
                            {project.title}
                          </h3>
                          {project.featured && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-accent-teal px-2 py-0.5 rounded bg-accent-teal/5 border border-accent-teal/20">
                              Featured
                            </span>
                          )}
                        </div>
                        
                        {/* Expandable Project Description */}
                        <div className="relative overflow-hidden mb-4">
                          <motion.p
                            initial={false}
                            animate={{ height: isExpanded ? "auto" : "48px" }}
                            transition={{ duration: 0.3 }}
                            className="text-xs sm:text-sm font-sans text-slate-400 leading-relaxed overflow-hidden"
                          >
                            {project.description}
                          </motion.p>
                          
                          {/* Gradient overlay for folded text */}
                          {!isExpanded && (
                            <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-[#0f1626]/80 to-transparent pointer-events-none" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 border-t border-card-border/30 pt-4">
                        <button
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          className="flex items-center gap-1 text-[10px] font-bold text-primary-accent hover:text-accent-teal transition-colors tracking-wider uppercase"
                        >
                          {isExpanded ? (
                            <>
                              Show Less <ChevronUp className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              Read Details <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                        
                        <a
                          href={project.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1"
                        >
                          Demo <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Toggle View All button for Featured Category */}
        {activeFilter === "Featured" && projectsData.filter((p) => p.featured).length > 4 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                setShowAllFeatured(!showAllFeatured);
                if (showAllFeatured) {
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-6 py-3 rounded-xl bg-slate-900 border border-card-border hover:border-primary-accent hover:text-primary-accent text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              {showAllFeatured ? "Show Less" : "View All Featured Projects"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
