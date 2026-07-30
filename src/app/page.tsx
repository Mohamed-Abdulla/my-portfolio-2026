import React from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Work from "../components/sections/Work";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import Contact from "../components/sections/Contact";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="grow">
        {/* Sections container */}
        <Hero />
        <About />
        <Work />
        <Skills />
        <Experience />
        <Contact />
      </main>

      {/* Global Copyright Footer */}
      <footer className="border-t border-card-border/30 bg-[#060a10] py-8 text-center text-xs text-slate-500 font-sans">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Mohamed Abdulla. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="https://mohamed786.hashnode.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-accent flex items-center gap-0.5 transition-colors"
            >
              Hashnode Blog <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/Mohamed-Abdulla"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-accent flex items-center gap-0.5 transition-colors"
            >
              GitHub <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-abdulla-a4084922a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-accent flex items-center gap-0.5 transition-colors"
            >
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
