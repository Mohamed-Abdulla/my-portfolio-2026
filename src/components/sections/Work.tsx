"use client";

import React from "react";
import { HeroParallax } from "../ui/HeroParallax";
import { projectsData } from "../../data/portfolioData";

export default function Work() {
  return (
    <section id="work" className="relative z-20">
      {/* We feed the projects list into the 3D Parallax visual scroller */}
      <HeroParallax products={projectsData} />
    </section>
  );
}
