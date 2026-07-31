"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Briefcase, Cpu, Database, Network } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FlipWords } from "../ui/FlipWords";
import dynamic from "next/dynamic";

// Dynamically import 3D WebGL Waving Grid background to bypass SSR/hydration limits
const WavingGrid = dynamic(() => import("../three/WavingGrid"), { ssr: false });

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-background"
    >
      {/* 3D WebGL Waving Wireframe Grid Backdrop (Killer interactive feature) */}
      <WavingGrid />

      {/* Faded Background Spotlights */}
      <div className="glow-spotlight -top-20 -left-20 bg-primary/20 z-0 pointer-events-none" />
      <div className="glow-spotlight top-1/2 -right-40 bg-secondary/15 z-0 pointer-events-none" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Intro text and call-to-actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Wave Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-card-border mb-6 text-[10px] sm:text-xs font-semibold text-secondary tracking-wide uppercase"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            Available for Projects & Architecture Consultations
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display leading-[1.05] mb-6"
          >
            Hello, I am <br />
            <span className="text-gradient-blue-teal">Mohamed Abdulla</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-lg sm:text-xl font-semibold text-slate-700 font-display mb-6 flex flex-wrap items-center gap-x-1.5 gap-y-1"
          >
            <Briefcase className="w-5 h-5 text-primary shrink-0" />
            <span>Building</span>
            <FlipWords
              words={["Distributed Systems", "Event-Driven APIs", "Cloud Orchestration", "Flutter Mobile Apps"]}
            />
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-slate-600 font-sans max-w-xl text-base sm:text-md mb-8 leading-relaxed"
          >
            Specializing in high-performance distributed systems, event-driven backends (Kafka/RabbitMQ), and custom
            identity systems (Keycloak/Kong). I also design and ship production mobile platforms in Flutter and web
            applications in Next.js.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="#work"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-linear-to-r from-primary to-secondary hover:opacity-90 text-black font-bold text-sm tracking-wide transition-all shadow-lg shadow-primary/15 w-full sm:w-auto justify-center"
            >
              Explore My Projects <ArrowRight className="w-4 h-4 text-black" />
            </Link>
            <Link
              href="/resume"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass-panel border-card-border hover:border-secondary/50 hover:bg-slate-100/55 text-slate-800 font-bold text-sm tracking-wide transition-all w-full sm:w-auto justify-center"
            >
              View Resume <FileText className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mt-10">
            <a
              href="https://github.com/Mohamed-Abdulla"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass-panel border-card-border hover:border-primary hover:text-primary transition-all text-slate-600"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-abdulla-a4084922a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass-panel border-card-border hover:border-primary hover:text-primary transition-all text-slate-600"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Holographic Systems HUD Frame */}
        <div className="lg:col-span-5 flex justify-center items-center relative mt-10 lg:mt-0">
          {/* Systems Telemetry Frame HUD Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative w-72 h-72 sm:w-95 sm:h-95 rounded-3xl flex items-center justify-center bg-slate-950/70 border border-card-border p-4.5 sm:p-6 shadow-2xl overflow-hidden"
          >
            {/* HUD Corner Ticks */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-primary rounded-tl" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-primary rounded-tr" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-primary rounded-bl" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-primary rounded-br" />

            {/* Simulated Scanner Sweep bar */}
            <motion.div
              animate={{ top: ["8%", "90%", "8%"] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
              className="absolute inset-x-6 h-[1.5px] bg-linear-to-r from-transparent via-secondary to-transparent z-20 opacity-50 pointer-events-none"
            />

            {/* Monospace telemetry data */}
            <div className="absolute top-4 left-6 text-[8px] sm:text-[9px] text-slate-500 font-mono uppercase tracking-widest hidden xs:block">
              SYSTEM // ARCH_v2.0
            </div>
            <div className="absolute top-4 right-6 text-[8px] sm:text-[9px] text-secondary font-mono tracking-widest  items-center gap-1.5 hidden xs:block">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary"></span>
              </span>
              LIVE_NODE_0
            </div>

            <div className="absolute bottom-4 left-6 text-[8px] sm:text-[9px] text-slate-500 font-mono tracking-wide hidden xs:block">
              LOC: 12.9716 N // 77.5946 E
            </div>
            <div className="absolute bottom-4 right-6 text-[8px] sm:text-[9px] text-slate-500 font-mono tracking-wide hidden xs:block">
              NET_IO: 8ms
            </div>

            {/* Avatar inside a subframe container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-card-border/60 shadow-xl flex items-center justify-center bg-slate-900/30">
              {/* Dotted vector matrix background */}
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: `radial-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px)`,
                  backgroundSize: "16px 16px",
                }}
              />

              <img
                src="/assets/abd-hoodie.jpeg"
                alt="Mohamed Abdulla"
                className="w-full h-full object-cover z-1 transition-all duration-700 opacity-90 hover:opacity-100"
              />

              {/* HUD telemetric overlays inside image */}
              <div className="absolute bottom-3 left-3 z-10 px-2 py-1 rounded bg-slate-950/80 border border-card-border flex items-center gap-1 text-[8px] text-slate-300 font-mono">
                <Cpu className="w-3 h-3 text-primary animate-pulse" />
                <span>NEST_SYS</span>
              </div>
              <div className="absolute bottom-3 right-3 z-10 px-2 py-1 rounded bg-slate-950/80 border border-card-border flex items-center gap-1 text-[8px] text-slate-300 font-mono">
                <Database className="w-3 h-3 text-secondary animate-pulse" />
                <span>KAFKA_IO</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
