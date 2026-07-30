"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Briefcase } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SparklesCore } from "../ui/Sparkles";
import { BackgroundBeams } from "../ui/BackgroundBeams";

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  const badgeVariants = {
    animate: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        delay: i * 0.8,
        ease: "easeInOut" as const,
      },
    }),
  };

  const badges = [
    { src: "/assets/flutter.svg", alt: "Flutter", label: "Mobile Development", index: 0 },
    { src: "/assets/nextjs_icon.png", alt: "Next.js", label: "Frontend Architecture", index: 1 },
    { src: "/assets/docker.svg", alt: "Docker", label: "Cloud & DevOps", index: 2 },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#080c14]"
    >
      {/* Sparkles Canvas Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <SparklesCore
          id="herosparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.4}
          particleDensity={60}
          particleColor="#00f5d4"
        />
      </div>

      {/* Background Beams laser lines */}
      <BackgroundBeams />

      {/* Decorative Blur Background Spotlights */}
      <div className="glow-spotlight -top-20 -left-20 bg-primary-accent/40 z-0 pointer-events-none" />
      <div className="glow-spotlight top-1/2 -right-40 bg-accent-teal/30 z-0 pointer-events-none" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Intro Text Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Wave Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-card-border mb-6 text-xs font-semibold text-accent-teal tracking-wide uppercase"
          >
            <span className="animate-pulse">⚡</span> Available for Projects & Architecture Consultations
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-[1.1] mb-6"
          >
            Hello, I am <br />
            <span className="text-gradient-blue-teal">Mohamed Abdulla</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl font-semibold text-slate-300 font-display mb-6 flex items-center gap-2"
          >
            <Briefcase className="w-5 h-5 text-primary-accent" />
            Full Stack Software Engineer
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-slate-400 font-sans max-w-xl text-base sm:text-lg mb-8 leading-relaxed"
          >
            Specializing in high-performance distributed systems, event-driven backends (Kafka/RabbitMQ), and custom
            identity systems (Keycloak/Kong). I also design and ship production mobile platforms in Flutter and web
            applications in Next.js.
          </motion.p>

          {/* Call to Actions */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-linear-to-r from-primary-accent to-accent-teal hover:opacity-90 text-black font-bold text-sm tracking-wide transition-all shadow-lg shadow-primary-accent/15 w-full sm:w-auto justify-center"
            >
              Explore My Projects
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/resume"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass-panel border-card-border hover:border-accent-teal/50 hover:bg-slate-900/50 text-slate-200 font-bold text-sm tracking-wide transition-all w-full sm:w-auto justify-center"
            >
              Interactive Resume
              <FileText className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mt-10">
            <a
              href="https://github.com/Mohamed-Abdulla"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass-panel border-card-border hover:border-primary-accent hover:text-primary-accent transition-all text-slate-400"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-abdulla-a4084922a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl glass-panel border-card-border hover:border-primary-accent hover:text-primary-accent transition-all text-slate-400"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Floating Stack Column */}
        <div className="lg:col-span-5 flex justify-center items-center relative mt-10 lg:mt-0">
          {/* Main Visual Image Wrapper with Animated Grid Pattern Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full flex items-center justify-center bg-slate-900/40 border border-card-border"
          >
            <div className="absolute inset-4 rounded-full bg-linear-to-tr from-primary-accent/10 to-accent-teal/10 blur-xl opacity-80" />

            {/* User Profile Avatar with hood */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-card-border shadow-2xl">
              <img
                src="/assets/abd-hoodie.jpeg"
                alt="Mohamed Abdulla"
                className="w-full h-full object-cover transition-all duration-700"
                // className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Orbiting Badges */}
            {badges.map((badge) => (
              <motion.div
                key={badge.alt}
                custom={badge.index}
                variants={badgeVariants}
                animate="animate"
                className={`absolute p-3 rounded-full glass-panel border-card-border shadow-xl hover:border-accent-teal/60 transition-all cursor-pointer group ${
                  badge.index === 0 ? "-top-4 left-6" : badge.index === 1 ? "top-1/3 -right-6" : "bottom-4 left-4"
                }`}
              >
                <div className="w-8 h-8 relative flex items-center justify-center">
                  <img src={badge.src} alt={badge.alt} className="max-w-full max-h-full object-contain" />
                </div>
                {/* Tooltip */}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 rounded bg-[#080c14] border border-card-border text-[10px] font-bold text-slate-300 opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
