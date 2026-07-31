"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";
import ContactTerminal from "../widgets/ContactTerminal";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative bg-background border-t border-card-border/30 overflow-hidden">
      {/* Background neon visual glow */}
      <div className="glow-spotlight bottom-0 right-0 bg-primary-accent/10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-primary-accent uppercase mb-3">Get in Touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            Take a coffee & <span className="text-gradient-blue-teal">chat with me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          {/* Left Side: Contact details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-xl font-bold font-display text-foreground mb-2 text-left">Contact Information</h3>
            <p className="text-sm font-sans text-slate-600 leading-relaxed text-left mb-4">
              Feel free to reach out for project consultations, system architecture advice, full-stack development
              roles, or just general chats.
            </p>

            {/* Email Card */}
            <a
              href="mailto:mohamedabdulla.web@gmail.com"
              className="flex items-center gap-4 p-5 rounded-2xl glass-panel border border-card-border hover:border-primary/40 hover:bg-slate-900/40 transition-all text-left group"
            >
              <div className="p-3 rounded-xl bg-slate-900 border border-card-border text-primary group-hover:border-primary/40 transition-colors">
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
              className="flex items-center gap-4 p-5 rounded-2xl glass-panel border border-card-border hover:border-secondary/40 hover:bg-slate-900/40 transition-all text-left group"
            >
              <div className="p-3 rounded-xl bg-slate-900 border border-card-border text-secondary group-hover:border-secondary/40 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Call Me</span>
                <span className="text-sm sm:text-base font-semibold text-slate-200">+91 6382344165</span>
              </div>
            </a>
          </div>

          {/* Right Side: Interactive CLI Shell Terminal Console */}
          <div className="lg:col-span-7 w-full">
            <ContactTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
