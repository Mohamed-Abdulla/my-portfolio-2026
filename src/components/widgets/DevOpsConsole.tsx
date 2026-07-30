"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Play, Square, RefreshCw } from "lucide-react";

interface LogLine {
  text: string;
  type: "input" | "info" | "success" | "warning" | "error";
  timestamp: string;
}

const getTimestamp = () => new Date().toLocaleTimeString();

const logsData = {
  diagnostics: [
    { text: "systemctl status swarm-cluster.service", type: "input" },
    { text: "● swarm-cluster.service - Docker Swarm Daemon Daemon", type: "info" },
    { text: "   Loaded: loaded (/lib/systemd/system/swarm-cluster.service; enabled)", type: "info" },
    { text: "   Active: active (running) since Mon 2026-07-27; 3 days ago", type: "success" },
    { text: "   Containers: 14 active, 0 stopped, 0 warning", type: "success" },
    { text: "nginx -t && systemctl reload nginx", type: "input" },
    { text: "nginx: the configuration file /etc/nginx/nginx.conf syntax is ok", type: "success" },
    { text: "nginx: configuration file /etc/nginx/nginx.conf test is successful", type: "success" },
    { text: "nginx.service: Reloaded successfully.", type: "success" },
    { text: "curl -s http://localhost:8000/health", type: "input" },
    { text: "{ status: 'UP', database: 'connected', latency_ms: 12, check: 'uptime-kuma' }", type: "success" },
  ],
  events: [
    { text: "kafka-console-consumer.sh --topic vitalit-checkout", type: "input" },
    { text: "[KAFKA] Subscribed to topic: vitalit-checkout-v1", type: "info" },
    {
      text: "[MSG] Partition: 0, Offset: 29384, Payload: { user_id: 'usr_81b3', package: 'premium_annual', gateway: 'stripe' }",
      type: "success",
    },
    { text: "[WORKER] Initiating payment hook handler...", type: "info" },
    { text: "[DATABASE] Oracle txn committed: user subscription updated successfully.", type: "success" },
    { text: "rabbitmqadmin get queue=contractorsync-shift-logs count=1", type: "input" },
    {
      text: "[RABBITMQ] Dequeued payload: { shift_id: 'shf_72b', status: 'checked_in', lat: 8.713, lon: 77.751 }",
      type: "success",
    },
    { text: "[WORKER-SYNC] Geolocation lookup matches: Contractor in shift perimeter.", type: "success" },
    { text: "[INFO] ActiveMQ message acknowledged.", type: "success" },
  ],
  security: [
    { text: "kong reload && vault status", type: "input" },
    { text: "[KONG] API Gateway configurations refreshed. 4 route definitions sync'd.", type: "success" },
    { text: "Vault Server - Initialized: true, Sealed: false, Version: 1.15.2", type: "info" },
    {
      text: "curl -X POST https://keycloak.colakin.internal/realms/master/protocol/openid-connect/token",
      type: "input",
    },
    { text: "[KEYCLOAK] Token request from Client: contractorsync-mobile", type: "info" },
    { text: "[OAUTH2] Grant Type: authorization_code, Verification Status: PASSED", type: "success" },
    { text: "[JWT] Access Token issued successfully. Role Claim: ['super_admin']", type: "success" },
    { text: "[SECURE] Session established behind encrypted OIDC handshake.", type: "success" },
  ],
};

export default function DevOpsConsole() {
  const [activeTab, setActiveTab] = useState<"diagnostics" | "events" | "security">("diagnostics");
  const [consoleLogs, setConsoleLogs] = useState<LogLine[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const consoleContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load initial static logs
  useEffect(() => {
    setConsoleLogs(
      logsData[activeTab].map((log) => ({
        ...log,
        timestamp: getTimestamp(),
      })) as LogLine[],
    );
  }, [activeTab]);

  // Scroll to bottom helper (without moving browser window)
  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  // Simulated running streams
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (isRunning) {
      intervalRef.current = setInterval(() => {
        // Pick a random line matching the current tab profile to stream
        const sourceLogs = logsData[activeTab].filter((l) => l.type !== "input");
        const randomLog = sourceLogs[Math.floor(Math.random() * sourceLogs.length)];

        setConsoleLogs((prev) => [
          ...prev,
          {
            text: `[STREAM] ${randomLog.text.replace(/^[\[\w+\]\s]+/, "")}`,
            type: randomLog.type as any,
            timestamp: getTimestamp(),
          },
        ]);
      }, 4000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeTab, isRunning]);

  const handleReset = () => {
    setConsoleLogs(
      logsData[activeTab].map((log) => ({
        ...log,
        timestamp: getTimestamp(),
      })) as LogLine[],
    );
  };

  return (
    <div className="w-full glass-panel border-card-border rounded-2xl overflow-hidden flex flex-col font-mono text-xs shadow-2xl relative">
      {/* Top Console Bar */}
      <div className="bg-slate-950/80 border-b border-card-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mock Window Dots */}
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 block" />
          </div>
          <span className="text-slate-400 text-[11px] font-sans flex items-center gap-1.5 ml-2">
            <TerminalIcon className="w-4 h-4 text-accent-teal" />
            devops-observability-logs
          </span>
        </div>

        {/* Play/Stop Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-1 rounded bg-slate-900 border border-card-border text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
            title={isRunning ? "Pause Stream" : "Start Stream"}
          >
            {isRunning ? (
              <Square className="w-3 h-3 text-red-400 fill-red-400" />
            ) : (
              <Play className="w-3 h-3 text-green-400 fill-green-400" />
            )}
          </button>
          <button
            onClick={handleReset}
            className="p-1 rounded bg-slate-900 border border-card-border text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
            title="Reset Console"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Tabs list */}
      <div className="bg-[#0b101d] flex border-b border-card-border/60">
        {(["diagnostics", "events", "security"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 border-r border-card-border/60 text-[11px] font-sans font-semibold tracking-wide transition-all ${
              activeTab === tab
                ? "bg-[#080c14] text-accent-teal border-t border-t-accent-teal"
                : "text-slate-400 hover:text-white hover:bg-slate-900/30"
            }`}
          >
            {tab === "diagnostics" && "system-diagnostics.sh"}
            {tab === "events" && "event-broker-stream.log"}
            {tab === "security" && "auth-security.config"}
          </button>
        ))}
      </div>

      {/* Logging output screen */}
      <div
        ref={consoleContainerRef}
        className="bg-[#080c14]/90 p-5 h-72 overflow-y-auto scrollbar-thin flex flex-col gap-1.5 text-left select-text scrollbar-thumb-slate-800 scrollbar-track-transparent"
      >
        {consoleLogs.map((log, index) => (
          <div key={index} className="flex gap-2.5 items-start leading-relaxed">
            <span className="text-slate-500 font-sans tracking-tighter text-[9px] mt-0.5 whitespace-nowrap">
              {log.timestamp}
            </span>
            <div className="flex-1 flex gap-1">
              {log.type === "input" && <span className="text-primary-accent mr-1">mohamed@system:~$</span>}
              <span
                className={`${
                  log.type === "input"
                    ? "text-white font-bold"
                    : log.type === "success"
                      ? "text-accent-teal"
                      : log.type === "warning"
                        ? "text-yellow-400"
                        : log.type === "error"
                          ? "text-red-400"
                          : "text-slate-300"
                }`}
              >
                {log.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Console Bottom Status bar */}
      <div className="bg-slate-950/80 border-t border-card-border px-4 py-2 text-[10px] text-slate-500 flex items-center justify-between">
        <span>Encoding: UTF-8</span>
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? "bg-green-500 animate-ping" : "bg-red-500"}`} />
          {isRunning ? "STREAMING LIVE DATA" : "STREAM STOPPED"}
        </span>
      </div>
    </div>
  );
}
