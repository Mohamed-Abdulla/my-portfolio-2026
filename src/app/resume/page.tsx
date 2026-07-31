"use client";

import React from "react";
import Link from "next/link";
import { resumeInfo, experienceTimeline } from "../../data/portfolioData";
import { Printer, Download, ArrowLeft, Mail, Phone, Briefcase, GraduationCap, Award, Settings } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 print:bg-white print:text-black print:p-0">
      {/* Floating Action Header (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between no-print bg-card-bg backdrop-blur-md border border-card-border p-4 rounded-2xl sticky top-4 z-40">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="flex gap-2.5">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card-bg border border-card-border hover:border-slate-400 text-slate-500 hover:text-slate-900 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
          <a
            href="/assets/Mohamed-Abdulla-Resume.pdf"
            download="Mohamed-Abdulla-Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-linear-to-r from-primary to-secondary hover:opacity-90 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
          >
            <Download className="w-4 h-4" /> Download PDF
          </a>
        </div>
      </div>

      {/* Main Resume Sheet Container */}
      <div className="max-w-4xl mx-auto bg-card-bg border border-card-border rounded-3xl p-8 sm:p-12 print:border-none print:p-0 print:bg-white print:text-black shadow-2xl print:shadow-none print-container">
        {/* Header Name & Profile Details */}
        <div className="border-b border-card-border/60 pb-8 mb-8 flex flex-col items-start text-left print:border-slate-300">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-foreground print:text-black mb-2">
            {resumeInfo.name}
          </h1>
          <h2 className="text-lg font-bold font-display text-primary mb-4">{resumeInfo.title}</h2>

          {/* Quick contact rows */}
          <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs sm:text-sm text-slate-300 print:text-slate-700">
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={`mailto:${resumeInfo.email}`} className="hover:underline">
                {resumeInfo.email}
              </a>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={`tel:${resumeInfo.phone}`} className="hover:underline">
                {resumeInfo.phone}
              </a>
            </span>
            <span className="flex items-center gap-1.5">
              <FaGithub className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={resumeInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
              </a>
            </span>
            <span className="flex items-center gap-1.5">
              <FaLinkedin className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={resumeInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </span>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="mb-8 text-left">
          <h3 className="text-base font-extrabold uppercase text-accent-teal tracking-wider mb-3 print:text-primary-accent border-b border-card-border/30 pb-1.5 print:border-slate-200">
            Profile
          </h3>
          <p className="text-slate-300 print:text-slate-800 text-xs sm:text-sm leading-relaxed">
            {resumeInfo.profileSummary}
          </p>
        </div>

        {/* Grid Split for Skills and Education */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 items-start">
          {/* Areas of Expertise */}
          <div className="md:col-span-7 text-left">
            <h3 className="text-base font-extrabold uppercase text-accent-teal tracking-wider mb-4 print:text-primary-accent border-b border-card-border/30 pb-1.5 print:border-slate-200 flex items-center gap-2">
              <Settings className="w-4.5 h-4.5" /> Areas of Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {resumeInfo.areasOfExpertise.map((area) => (
                <span
                  key={area}
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-900 border border-card-border/80 text-slate-300 print:bg-slate-100 print:text-slate-800 print:border-slate-200 font-semibold"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="md:col-span-5 text-left">
            <h3 className="text-base font-extrabold uppercase text-accent-teal tracking-wider mb-4 print:text-primary-accent border-b border-card-border/30 pb-1.5 print:border-slate-200 flex items-center gap-2">
              <GraduationCap className="w-4.5 h-4.5" /> Education
            </h3>
            <div className="flex flex-col gap-4">
              {resumeInfo.education.map((edu) => (
                <div key={edu.degree} className="flex flex-col">
                  <span className="text-xs font-bold text-white print:text-black">{edu.degree}</span>
                  <span className="text-[11px] text-slate-400 print:text-slate-600 font-medium">
                    {edu.institution} | {edu.duration}
                  </span>
                  <span className="text-[10px] text-accent-teal font-extrabold tracking-wide print:text-primary-accent uppercase mt-1">
                    {edu.gpaOrGrade} | {edu.location}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Experience timeline */}
        <div className="mb-8 text-left">
          <h3 className="text-base font-extrabold uppercase text-accent-teal tracking-wider mb-6 print:text-primary-accent border-b border-card-border/30 pb-1.5 print:border-slate-200 flex items-center gap-2">
            <Briefcase className="w-4.5 h-4.5" /> Professional Experience
          </h3>

          <div className="flex flex-col gap-6">
            {experienceTimeline.map((exp) => {
              const work = exp.works[0];
              return (
                <div key={exp.year} className="flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white print:text-black font-display">
                        {work.role}
                      </h4>
                      <span className="text-xs font-semibold text-slate-400 print:text-slate-600">{work.company}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-900 border border-card-border text-accent-teal print:bg-slate-100 print:text-slate-800 print:border-slate-200 self-start sm:self-auto mt-1.5 sm:mt-0">
                      {work.duration}
                    </span>
                  </div>
                  <ul className="list-disc pl-5 flex flex-col gap-2.5">
                    {work.desc.map((bullet, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Independent Projects */}
        <div className="mb-8 text-left">
          <h3 className="text-base font-extrabold uppercase text-accent-teal tracking-wider mb-4 print:text-primary-accent border-b border-card-border/30 pb-1.5 print:border-slate-200 flex items-center gap-2">
            <Settings className="w-4.5 h-4.5" /> Independent Project
          </h3>
          <div className="flex flex-col">
            <h4 className="text-sm sm:text-base font-bold text-white print:text-black font-display mb-1">
              AidMesh{" "}
              <span className="text-xs font-medium text-slate-400 print:text-slate-600">
                — Event-Driven Emergency Aid Coordination Platform
              </span>
            </h4>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
                Designed a real-time emergency aid coordination system using event-driven microservices, built to handle
                thousands of concurrent requests.
              </li>
              <li className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
                Built microservices in Node.js/NestJS with async workflows via Kafka and RabbitMQ; API gateway and auth
                via Keycloak and Kong.
              </li>
              <li className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
                Architected the platform for scalability, fault tolerance, and production readiness.
              </li>
            </ul>
          </div>
        </div>

        {/* Awards & Achievements */}
        <div className="text-left">
          <h3 className="text-base font-extrabold uppercase text-accent-teal tracking-wider mb-4 print:text-primary-accent border-b border-card-border/30 pb-1.5 print:border-slate-200 flex items-center gap-2">
            <Award className="w-4.5 h-4.5" /> Awards & Achievements
          </h3>
          <ul className="list-disc pl-5 flex flex-col gap-2.5">
            {resumeInfo.awards.map((award, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
                {award}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
