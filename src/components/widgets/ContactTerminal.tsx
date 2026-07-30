"use client";

import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Play, ArrowRight, Terminal as TerminalIcon, Check, AlertTriangle, RefreshCw } from "lucide-react";

interface TerminalLine {
  text: string;
  type: "system" | "success" | "warning" | "error" | "input" | "output";
  delay?: boolean;
}

export default function ContactTerminal() {
  const [step, setStep] = useState<"init" | "name" | "email" | "message" | "confirm" | "sending" | "done" | "idle">(
    "init",
  );
  const [terminalLogs, setTerminalLogs] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Stored form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const logsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll inside terminal container
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // Focus input automatically on mount or step change
  useEffect(() => {
    if (step !== "sending" && step !== "done" && step !== "init") {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [step]);

  // Initialize terminal intro scripts
  useEffect(() => {
    if (step === "init") {
      const introLines: TerminalLine[] = [
        { text: "visitor@systems:~$ ./contact.sh", type: "input" },
        { text: "Initializing Secure API Message Channel...", type: "system" },
        { text: "Resolving api gateway: /api/contact ... [OK]", type: "success" },
        { text: "Pre-flight checks and network socket tests... [OK]", type: "success" },
        { text: "System status: SECURE SOCKET OPEN.", type: "success" },
        { text: "--------------------------------------------------", type: "system" },
        { text: "[?] Enter Your Name: ", type: "output" },
      ];

      let currentIdx = 0;
      const interval = setInterval(() => {
        if (currentIdx < introLines.length) {
          const line = introLines[currentIdx];
          if (line) {
            setTerminalLogs((prev) => [...prev, line]);
          }
          currentIdx++;
        } else {
          clearInterval(interval);
          setStep("name");
        }
      }, 250);

      return () => clearInterval(interval);
    }
  }, [step]);

  // Handle Shell Input Submissions
  const handleInputSubmit = async () => {
    const val = inputValue.trim();
    if (!val && step !== "confirm") return;

    if (step === "name") {
      setFormData((prev) => ({ ...prev, name: val }));
      setTerminalLogs((prev) => [
        ...prev,
        { text: val, type: "input" },
        { text: `[?] Enter Your Email: `, type: "output" },
      ]);
      setInputValue("");
      setStep("email");
    } else if (step === "email") {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setTerminalLogs((prev) => [
          ...prev,
          { text: val, type: "input" },
          { text: "⚠️ [ERROR] Invalid email address format. Try again.", type: "error" },
          { text: `[?] Enter Your Email: `, type: "output" },
        ]);
        setInputValue("");
        return;
      }

      setFormData((prev) => ({ ...prev, email: val }));
      setTerminalLogs((prev) => [
        ...prev,
        { text: val, type: "input" },
        { text: `[?] Enter Your Message (Press Enter to finish): `, type: "output" },
      ]);
      setInputValue("");
      setStep("message");
    } else if (step === "message") {
      setFormData((prev) => ({ ...prev, message: val }));
      setTerminalLogs((prev) => [
        ...prev,
        { text: val, type: "input" },
        { text: "--------------------------------------------------", type: "system" },
        { text: `Name:    ${formData.name}`, type: "system" },
        { text: `Email:   ${formData.email}`, type: "system" },
        { text: `Message: ${val}`, type: "system" },
        { text: "--------------------------------------------------", type: "system" },
        { text: `[?] Confirm message transmission? [y/N]: `, type: "output" },
      ]);
      setInputValue("");
      setStep("confirm");
    } else if (step === "confirm") {
      const confirmVal = val.toLowerCase();
      setTerminalLogs((prev) => [...prev, { text: val || "n", type: "input" }]);

      if (confirmVal === "y" || confirmVal === "yes") {
        setInputValue("");
        setStep("sending");
        triggerTransmission();
      } else {
        setTerminalLogs((prev) => [
          ...prev,
          { text: "❌ Transmission aborted by user.", type: "error" },
          { text: "Type './contact.sh' to restart the session.", type: "system" },
          { text: "visitor@systems:~$ ", type: "output" },
        ]);
        setInputValue("");
        setStep("idle");
      }
    } else if (step === "idle") {
      if (val === "./contact.sh") {
        setTerminalLogs([]);
        setFormData({ name: "", email: "", message: "" });
        setInputValue("");
        setStep("init");
      } else {
        setTerminalLogs((prev) => [
          ...prev,
          { text: val, type: "input" },
          { text: `bash: command not found: ${val}. Type './contact.sh' to send a message.`, type: "error" },
          { text: "visitor@systems:~$ ", type: "output" },
        ]);
        setInputValue("");
      }
    }
  };

  // Secure API contact transmission
  const triggerTransmission = async () => {
    const streamLogs: TerminalLine[] = [
      { text: "Connecting to Secure API Proxy...", type: "system" },
      { text: "Encrypting packet payload (JSON format)... [OK]", type: "system" },
      { text: "Transmitting payload to API route... [OK]", type: "system" },
    ];

    for (const log of streamLogs) {
      setTerminalLogs((prev) => [...prev, log]);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setTerminalLogs((prev) => [
          ...prev,
          { text: "✅ [SUCCESS] Secure API verification status code: 200", type: "success" },
          { text: `Message sent successfully! Thank you for reaching out, ${formData.name}.`, type: "success" },
          { text: "I will get back to you shortly.", type: "system" },
          { text: "visitor@systems:~$ ", type: "output" },
        ]);
        setStep("done");
      } else {
        throw new Error("HTTP error status: " + response.status);
      }
    } catch (err) {
      setTerminalLogs((prev) => [
        ...prev,
        { text: "❌ [ERROR] Proxy transmission failed.", type: "error" },
        { text: "Please try again or email directly to abdabdulla78@gmail.com", type: "warning" },
        { text: "visitor@systems:~$ ", type: "output" },
      ]);
      setStep("idle");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputSubmit();
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
      className="w-full max-w-2xl mx-auto rounded-2xl border border-card-border/60 bg-[#080c14]/90 backdrop-blur-md overflow-hidden font-mono text-left shadow-2xl flex flex-col cursor-text relative group hover:border-slate-800 transition-colors duration-300"
    >
      {/* Terminal Title Bar */}
      <div className="bg-[#0b101d] px-5 py-3.5 border-b border-card-border/60 flex items-center justify-between no-print">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-slate-500" />
          <span className="text-slate-400 text-xs font-sans font-semibold tracking-wide">
            {step === "idle" || step === "done" ? "visitor@systems:~" : "contact.sh (secure-cli)"}
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 block" />
        </div>
      </div>

      {/* Terminal Screen Logs */}
      <div
        ref={logsContainerRef}
        className="p-6 h-95 overflow-y-auto flex flex-col gap-2 text-xs sm:text-sm select-text scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
      >
        {terminalLogs.map((log, index) => {
          if (!log) return null;
          return (
            <div key={index} className="flex gap-2.5 items-start leading-relaxed">
              {log.type === "input" && (
                <span className="text-primary-accent shrink-0 font-bold">
                  {index === 0 ? "visitor@systems:~$" : "mohamed@systems:~$"}
                </span>
              )}
              <span
                className={
                  log.type === "success"
                    ? "text-accent-teal"
                    : log.type === "error"
                      ? "text-red-400 font-bold"
                      : log.type === "warning"
                        ? "text-yellow-400"
                        : log.type === "input"
                          ? "text-white font-bold"
                          : log.type === "output"
                            ? "text-slate-200 font-semibold"
                            : "text-slate-400"
                }
              >
                {log.text}
              </span>
            </div>
          );
        })}

        {/* Input Prompter row */}
        {step !== "sending" && step !== "done" && step !== "init" && (
          <div className="flex items-center gap-2 text-slate-100 mt-1">
            <span className="text-primary-accent font-bold">{step === "idle" ? "visitor@systems:~$" : ">"}</span>
            <input
              ref={inputRef}
              type={step === "email" ? "email" : "text"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white font-bold caret-accent-teal font-mono placeholder:text-slate-600"
              placeholder={
                step === "name"
                  ? "Type your name..."
                  : step === "email"
                    ? "Type your email..."
                    : step === "message"
                      ? "Type your message..."
                      : step === "confirm"
                        ? "y / n"
                        : "Type './contact.sh' to send a message..."
              }
            />
          </div>
        )}
      </div>

      {/* Terminal Footer Navigation Button helper (Especially for mobile users) */}
      <div className="bg-[#0b101d]/60 border-t border-card-border px-5 py-3 flex items-center justify-between text-[10px] text-slate-500">
        <span className="hidden sm:inline">Press [Enter] to submit values</span>

        <div className="flex gap-2.5 ml-auto w-full sm:w-auto justify-between sm:justify-start">
          {step === "confirm" && (
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  setInputValue("y");
                  setTimeout(handleInputSubmit, 50);
                }}
                className="px-2.5 py-1 rounded bg-accent-teal/10 hover:bg-accent-teal text-accent-teal hover:text-black border border-accent-teal/20 transition-all font-bold cursor-pointer"
              >
                Yes [y]
              </button>
              <button
                onClick={() => {
                  setInputValue("n");
                  setTimeout(handleInputSubmit, 50);
                }}
                className="px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-black border border-red-500/20 transition-all font-bold cursor-pointer"
              >
                No [n]
              </button>
            </div>
          )}

          {step !== "sending" && step !== "done" && step !== "init" && step !== "confirm" && (
            <button
              onClick={handleInputSubmit}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-900 border border-card-border hover:border-slate-800 text-slate-400 hover:text-white font-bold transition-all cursor-pointer text-[10px]"
            >
              Submit Input <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {(step === "done" || step === "idle") && (
            <button
              onClick={() => {
                setTerminalLogs([]);
                setFormData({ name: "", email: "", message: "" });
                setInputValue("");
                setStep("init");
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-accent hover:opacity-90 text-black font-extrabold transition-all cursor-pointer text-[10px]"
            >
              Reset Session <RefreshCw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
