"use client";

import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "../ui/BentoGrid";
import { Code2, Server, Smartphone, Activity, Play, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  // Card 1: API Request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiSent, setApiSent] = useState(false);

  const triggerApiRequest = () => {
    setApiLoading(true);
    setApiSent(false);
    setTimeout(() => {
      setApiLoading(false);
      setApiSent(true);
    }, 1500);
  };

  // Card 3: Live Docker Nodes Metrics
  const [cpuUsage, setCpuUsage] = useState([42, 68, 24, 39]);
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage((prev) =>
        prev.map((val) => {
          const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
          return Math.max(10, Math.min(95, val + change));
        }),
      );
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-24 relative bg-[#080c14] border-t border-card-border/30 overflow-hidden">
      <div className="glow-spotlight top-1/4 left-1/4 bg-primary-accent/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title block */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-primary-accent uppercase mb-3">Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            I Know that <span className="text-gradient-blue-teal">Good Architecture</span>{" "}
            <br className="hidden sm:inline" />
            means <span className="text-gradient-blue-teal">Good Business</span>
          </h2>
        </div>

        {/* Reusable BentoGrid from Aceternity Design */}
        <BentoGrid>
          {/* Card 1: Backend & API Architecture (md:col-span-2) */}
          <BentoGridItem
            className="md:col-span-2 flex flex-col justify-between"
            title="Backend & API Architecture"
            description="Designing secure, high-throughput REST and GraphQL microservices in NestJS and FastAPI. Secured using Kong API Gateway and Keycloak IAM RBAC protocols."
            icon={<Code2 className="w-5 h-5 text-primary-accent" />}
            header={
              <div className="flex justify-end w-full mb-4">
                {/* Live Interactive API Terminal Mockup */}
                <div className="w-full max-w-sm bg-slate-950/80 rounded-2xl border border-card-border/80 overflow-hidden font-mono text-[10px] sm:text-xs text-left shadow-lg">
                  <div className="bg-[#0b101d] px-4 py-2 border-b border-card-border/60 flex items-center justify-between">
                    <span className="text-slate-400 font-bold font-sans">API Explorer</span>
                    <div className="flex gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-accent-teal font-bold">POST</span>
                      <span className="text-slate-300 truncate">https://api.com/v1/auth/verify</span>
                    </div>

                    <button
                      onClick={triggerApiRequest}
                      disabled={apiLoading}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-accent hover:opacity-90 disabled:opacity-50 text-black font-extrabold text-[10px] uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {apiLoading ? "Sending..." : "Send Request"}
                      <Play className="w-3 h-3 fill-black" />
                    </button>

                    <div className="bg-slate-900/80 border border-card-border p-3 rounded-xl min-h-21.25 relative overflow-hidden flex flex-col justify-center">
                      {apiLoading && (
                        <div className="flex flex-col items-center justify-center gap-1 text-slate-400">
                          <Activity className="w-5 h-5 text-accent-teal animate-pulse" />
                          <span>Resolving Handshake...</span>
                        </div>
                      )}

                      {!apiLoading && !apiSent && (
                        <div className="text-slate-500 italic text-[11px]">Response output will appear here.</div>
                      )}

                      {!apiLoading && apiSent && (
                        <pre className="text-accent-teal leading-normal text-[9px] sm:text-[10px]">
                          {`{
  "status": 200,
  "role": "SYSTEM_ARCHITECT",
  "authenticated": true,
  "token_expiry": "3600s"
}`}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          {/* Card 2: Distributed Event-Driven systems (md:col-span-1) */}
          <BentoGridItem
            className="md:col-span-1 flex flex-col justify-between"
            title="Event-Driven Pipelines"
            description="Orchestrating event queues using Kafka and RabbitMQ to manage high-throughput message streaming workloads asynchronously."
            icon={<Server className="w-5 h-5 text-violet-400" />}
            header={
              <div className="h-28 bg-slate-950/60 border border-card-border/80 rounded-2xl relative flex items-center justify-between px-4 overflow-hidden mb-4">
                <div className="z-10 flex flex-col items-center gap-1">
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter">Producer</span>
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-[10px] font-mono font-bold text-violet-400 shadow-md">
                    Nest
                  </div>
                </div>

                {/* Streaming pipeline dots */}
                <div className="absolute inset-x-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-1/3 h-full bg-linear-to-r from-transparent via-accent-teal to-transparent"
                  />
                </div>

                <div className="z-10 flex flex-col items-center gap-1">
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter">Queue</span>
                  <div className="w-12 h-10 rounded-xl bg-slate-900/90 border border-card-border flex flex-col items-center justify-center font-mono text-[9px] font-bold text-accent-teal shadow-inner">
                    <span className="text-[7px] text-slate-500 leading-none">TOPIC</span>
                    KAFKA
                  </div>
                </div>

                <div className="z-10 flex flex-col items-center gap-1">
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter">Consumer</span>
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-[10px] font-mono font-bold text-green-400 shadow-md">
                    Fast
                  </div>
                </div>
              </div>
            }
          />

          {/* Card 3: Cloud & DevOps Cluster (md:col-span-1) */}
          <BentoGridItem
            className="md:col-span-1 flex flex-col justify-between"
            title="DevOps Cluster"
            description="Automating microservices orchestration on Docker Swarm clusters with Nginx reverse proxy mappings and centralized logging systems."
            icon={<Cpu className="w-5 h-5 text-yellow-400" />}
            header={
              <div className="bg-slate-950/60 border border-card-border/80 rounded-2xl p-4 space-y-2.5 font-mono text-[8px] sm:text-[9px] mb-4">
                {[
                  { name: "srv-kong-gateway", ip: "10.0.1.10", nodeIdx: 0 },
                  { name: "srv-keycloak-iam", ip: "10.0.1.12", nodeIdx: 1 },
                  { name: "srv-redis-cache", ip: "10.0.1.15", nodeIdx: 2 },
                  { name: "srv-postgres-db", ip: "10.0.1.18", nodeIdx: 3 },
                ].map((srv) => (
                  <div
                    key={srv.name}
                    className="flex items-center justify-between border-b border-card-border/20 pb-1.5 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                      </span>
                      <span className="text-slate-300 font-bold text-[7.5px] sm:text-[9px]">{srv.name}</span>
                    </div>

                    {/* Cpu bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[7px] sm:text-[8px]">{srv.ip}</span>
                      <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden hidden sm:block">
                        <div
                          className="h-full bg-accent-teal transition-all duration-1000"
                          style={{ width: `${cpuUsage[srv.nodeIdx]}%` }}
                        />
                      </div>
                      <span className="text-accent-teal text-[8px] min-w-5 text-right">{cpuUsage[srv.nodeIdx]}%</span>
                    </div>
                  </div>
                ))}
              </div>
            }
          />

          {/* Card 4: Cross-Platform Mobile & Web (md:col-span-2) */}
          <BentoGridItem
            className="md:col-span-2 flex flex-col justify-between"
            title="Mobile & Web Engineering"
            description="Building cross-platform Flutter applications published to the App Store and Google Play, alongside blazing fast web interfaces built in React and Next.js."
            icon={<Smartphone className="w-5 h-5 text-accent-teal" />}
            header={
              <div className="flex justify-end w-full mb-4">
                {/* Mobile Device Simulator Dashboard visual */}
                <div className="w-full max-w-55 bg-slate-950/80 rounded-3xl border-2 border-slate-800 overflow-hidden font-sans text-left relative shadow-xl mx-auto sm:mx-0 shrink-0">
                  {/* Speaker/Camera notch */}
                  <div className="bg-slate-800 w-24 h-4 rounded-b-xl mx-auto absolute top-0 inset-x-0 z-20 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                  </div>

                  <div className="pt-7 p-3 space-y-2.5 text-[9px] text-slate-200">
                    <div className="flex justify-between items-center text-slate-400 font-bold border-b border-card-border pb-1.5">
                      <span>WORKOUT APP</span>
                      <span className="text-accent-teal font-mono">LIVE CONNECT</span>
                    </div>

                    {/* Calorie Progress loader */}
                    <div className="bg-[#0f1626] border border-card-border/60 p-2.5 rounded-xl flex items-center justify-between gap-2 shadow-inner">
                      <div className="space-y-0.5">
                        <span className="text-slate-500 font-semibold block text-[7px]">WORKOUT GOAL</span>
                        <span className="text-slate-100 font-extrabold text-[10px]">1,840 kcal</span>
                      </div>
                      {/* Ring loader */}
                      <div
                        className="w-7 h-7 rounded-full border-2 border-t-accent-teal border-slate-700 animate-spin"
                        style={{ animationDuration: "3s" }}
                      />
                    </div>

                    {/* Shift Tracker mini card */}
                    <div className="bg-[#0f1626] border border-card-border/60 p-2 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-slate-500 block text-[6px]">SYNC APP</span>
                        <span className="text-slate-300 font-bold">Shift Checked-In</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-[7px]">
                        09:00 AM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </BentoGrid>
      </div>
    </section>
  );
}
