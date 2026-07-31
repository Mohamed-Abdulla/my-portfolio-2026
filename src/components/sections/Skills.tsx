"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ContainerScroll } from "../ui/ContainerScroll";
import DevOpsConsole from "../widgets/DevOpsConsole";
import { Cpu, Terminal, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

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

interface TechSkill {
  name: string;
  level: number; // 1 to 10 segment blocks
}

interface SkillCategory {
  title: string;
  status: string;
  skills: TechSkill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "System APIs & IAM",
    status: "OPTIMIZED",
    skills: [
      { name: "NestJS (Microservices)", level: 9 },
      { name: "FastAPI / Python APIs", level: 9 },
      { name: "Keycloak IAM (OAuth2/RBAC)", level: 8 },
      { name: "Kong API Gateway", level: 8 },
      { name: "GraphQL (Federation)", level: 8 },
    ],
  },
  {
    title: "Event Streaming & Storage",
    status: "ACTIVE",
    skills: [
      { name: "Apache Kafka Clusters", level: 9 },
      { name: "RabbitMQ Message Queues", level: 8 },
      { name: "PostgreSQL & pgSQL", level: 8 },
      { name: "Redis Cache Store", level: 8 },
      { name: "MongoDB NoSQL", level: 8 },
    ],
  },
  {
    title: "Infrastructure & Orchestration",
    status: "STABLE",
    skills: [
      { name: "Docker Swarm Clusters", level: 9 },
      { name: "Nginx Reverse Proxies", level: 9 },
      { name: "Linux Bash Shell Scripting", level: 9 },
      { name: "CI/CD Deployment Pipelines", level: 8 },
      { name: "Kubernetes Containers", level: 7 },
    ],
  },
  {
    title: "Cross-Platform Web & Mobile",
    status: "STABLE",
    skills: [
      { name: "Flutter Mobile Framework", level: 9 },
      { name: "React / Next.js 16", level: 9 },
      { name: "TypeScript / ES6+", level: 9 },
      { name: "Tailwind CSS v4", level: 9 },
      { name: "Dart (Mobile Core)", level: 8 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-background border-t border-card-border/30 overflow-hidden">
      {/* Dynamic glow spotlights */}
      <div className="glow-spotlight -top-40 right-1/4 bg-primary/10" />
      <div className="glow-spotlight top-1/2 left-10 bg-secondary/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* 3D Tilt Container Scroll wrapper */}
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center text-center mb-10">
              <span className="text-xs font-bold tracking-widest text-primary uppercase mb-3">Technologies</span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display">
                Skills & <span className="text-gradient-blue-teal">Cloud Observability</span>
              </h2>
            </div>
          }
        >
          {/* Split Layout inside the 3D scroll-tilt card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 bg-[#090f1d]/45">
            {/* Left Column: 3D Globe + Legend */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <SkillsGlobe />

              {/* Category Legend */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 max-w-sm font-mono text-[9px] sm:text-[10px]">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-[#60a5fa] block" />
                  Frontend / Dart
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-[#c084fc] block" />
                  Backend APIs
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-[#f43f5e] block" />
                  DevOps / Infra
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-[#34d399] block" />
                  Databases
                </div>
              </div>
            </div>

            {/* Right Column: DevOps Console */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="text-left max-w-2xl lg:pl-4">
                <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2.5 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-secondary animate-pulse" />
                  Distributed Systems Expertise
                </h3>
                <p className="text-xs sm:text-sm font-sans text-slate-400 leading-relaxed">
                  Observability, reliability, and security are core priorities for modern distributed architectures. Interact with the terminal below to review mock docker statuses, Kafka queues, Keycloak handshakes, and event streams.
                </p>
              </div>

              <DevOpsConsole />
            </div>
          </div>
        </ContainerScroll>

        {/* Systems Core Stack Observability Grid (New Killer visual component) */}
        <div className="mt-28 max-w-6xl mx-auto w-full relative z-10">
          
          <div className="text-left mb-12 border-b border-card-border/40 pb-5">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Terminal className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest">OBSERVABILITY_MATRIX</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
              Systems Core Stack Telemetry
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="rounded-2xl border border-card-border/60 bg-card-bg p-6 hover:border-primary/40 transition-all duration-300 relative group overflow-hidden hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Cyber Corner Ticks */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary/20 group-hover:border-primary transition-colors rounded-tl-xs" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-primary/20 group-hover:border-primary transition-colors rounded-tr-xs" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-primary/20 group-hover:border-primary transition-colors rounded-bl-xs" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-primary/20 group-hover:border-primary transition-colors rounded-br-xs" />

                {/* Header telemetry tag */}
                <div className="flex items-center justify-between border-b border-card-border/30 pb-3 mb-4.5 font-mono text-[9px] sm:text-[10px]">
                  <span className="text-white font-bold tracking-wider">{category.title}</span>
                  <div className="flex items-center gap-1.5 text-secondary">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary"></span>
                    </span>
                    <span className="font-extrabold tracking-widest">{category.status}</span>
                  </div>
                </div>

                {/* Skill List items */}
                <div className="space-y-4 text-left">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
                      <span className="text-xs sm:text-sm text-slate-300 font-semibold group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      
                      {/* Telemetry Meter Bar representation */}
                      <div className="flex items-center gap-2">
                        <div className="flex gap-[3px]">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-[7px] h-3 rounded-xs border transition-all duration-500 ${
                                i < skill.level
                                  ? "bg-secondary/20 border-secondary group-hover:bg-secondary/40 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.3)]"
                                  : "bg-slate-950/40 border-card-border/40"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-500 w-[24px] text-right shrink-0">
                          {skill.level * 10}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
