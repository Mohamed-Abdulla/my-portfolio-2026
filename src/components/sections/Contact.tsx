"use client";

import React, { useState } from "react";
import { Mail, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { name, email, message } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("All fields are required.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit form.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error("Submission Error:", err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#080c14] border-t border-card-border/30">
      <div className="glow-spotlight bottom-0 right-0 bg-primary-accent/10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-primary-accent uppercase mb-3">Get in Touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            Take a coffee & <span className="text-gradient-blue-teal">chat with me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Left Side: Contact details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-xl font-bold font-display text-white mb-2 text-left">Contact Information</h3>
            <p className="text-sm font-sans text-slate-400 leading-relaxed text-left mb-4">
              Feel free to reach out for project consultations, system architecture advice, full-stack development
              roles, or just general chats.
            </p>

            {/* Email Card */}
            <a
              href="mailto:mohamedabdulla.web@gmail.com"
              className="flex items-center gap-4 p-5 rounded-2xl glass-panel border border-card-border hover:border-primary-accent/40 hover:bg-slate-900/40 transition-all text-left"
            >
              <div className="p-3 rounded-xl bg-slate-900 border border-card-border text-primary-accent">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Email Me</span>
                <span className="text-sm sm:text-base font-semibold text-slate-200">mohamedabdulla.web@gmail.com</span>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+916382344165"
              className="flex items-center gap-4 p-5 rounded-2xl glass-panel border border-card-border hover:border-accent-teal/40 hover:bg-slate-900/40 transition-all text-left"
            >
              <div className="p-3 rounded-xl bg-slate-900 border border-card-border text-accent-teal">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Call Me</span>
                <span className="text-sm sm:text-base font-semibold text-slate-200">+91 6382344165</span>
              </div>
            </a>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel border-card-border rounded-2xl p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-8"
                  >
                    <CheckCircle2 className="w-16 h-16 text-accent-teal mb-4" />
                    <h4 className="text-xl font-bold font-display text-white mb-2">Message Delivered!</h4>
                    <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
                      Thank you for getting in touch. I will receive your message directly via Telegram bot and reply
                      shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 border border-card-border hover:border-primary-accent hover:text-primary-accent text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 text-left"
                  >
                    {/* Name Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-bold tracking-wide text-slate-300">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        disabled={status === "loading"}
                        className="px-4 py-3 rounded-xl bg-slate-950 border border-card-border hover:border-slate-700 focus:border-primary-accent focus:outline-none transition-colors text-sm text-slate-100 placeholder-slate-600 disabled:opacity-60"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold tracking-wide text-slate-300">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        disabled={status === "loading"}
                        className="px-4 py-3 rounded-xl bg-slate-950 border border-card-border hover:border-slate-700 focus:border-primary-accent focus:outline-none transition-colors text-sm text-slate-100 placeholder-slate-600 disabled:opacity-60"
                      />
                    </div>

                    {/* Message Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-bold tracking-wide text-slate-300">
                        Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows={5}
                        value={message}
                        onChange={handleChange}
                        placeholder="Hi Mohamed, let's collaborate on..."
                        disabled={status === "loading"}
                        className="px-4 py-3 rounded-xl bg-slate-950 border border-card-border hover:border-slate-700 focus:border-primary-accent focus:outline-none transition-colors text-sm text-slate-100 placeholder-slate-600 resize-none disabled:opacity-60"
                      />
                    </div>

                    {/* Error Alerts */}
                    {status === "error" && (
                      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-950/40 border border-red-500/20 text-red-400 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="mt-2 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-linear-to-r from-primary-accent to-accent-teal hover:opacity-95 text-black font-extrabold text-sm tracking-wide transition-all shadow-lg shadow-primary-accent/10 disabled:opacity-60 cursor-pointer"
                    >
                      {status === "loading" ? (
                        "Transmitting packets..."
                      ) : (
                        <>
                          Send Message <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
