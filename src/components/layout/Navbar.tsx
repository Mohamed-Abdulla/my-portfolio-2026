"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const isResumePage = pathname === "/resume";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // If we are on the resume page, don't observe sections
      if (isResumePage) return;

      // Section Intersection Observer logic
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.href.substring(1));
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href.substring(1));
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isResumePage]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isResumePage) return; // Allow default route transition if on resume page

    e.preventDefault();
    setIsOpen(false);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offset = 80;
      const targetPosition = targetElement.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-4 bg-background/80 backdrop-blur-md border-b border-card-border" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href={isResumePage ? "/" : "#home"} className="flex items-center gap-2 group">
          <span className="text-2xl font-bold font-display text-gradient-blue-teal">⇋</span>
          <span className="text-lg font-semibold tracking-wider font-display group-hover:text-primary transition-colors">
            MOHAMED
          </span>
        </Link>

        {/* Desktop Nav Links */}
        {!isResumePage && (
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`text-sm font-medium tracking-wide transition-colors relative py-2 ${
                        isActive ? "text-secondary" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          {isResumePage ? (
            <Link
              href="/"
              className="px-5 py-2 rounded-full glass-panel border-card-border hover:border-primary hover:text-primary text-sm font-semibold tracking-wide transition-all"
            >
              Back to Home
            </Link>
          ) : (
            <Link
              href="/resume"
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-linear-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-black font-semibold text-sm tracking-wide transition-all shadow-lg shadow-primary/10"
            >
              View Resume
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-4">
          {!isResumePage && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
          {isResumePage && (
            <Link href="/" className="px-4 py-1.5 rounded-full glass-panel text-xs font-semibold transition-all">
              Home
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-18.25 bottom-0 bg-background/95 backdrop-blur-lg border-t border-card-border z-40 flex flex-col justify-between p-8"
          >
            <nav className="flex flex-col gap-6">
              <ul className="flex flex-col gap-5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={`text-xl font-medium tracking-wide block py-2 ${
                          isActive ? "text-secondary" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="flex flex-col gap-4 mt-auto">
              <Link
                href="/resume"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-black font-semibold tracking-wide text-center"
              >
                View Resume
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
