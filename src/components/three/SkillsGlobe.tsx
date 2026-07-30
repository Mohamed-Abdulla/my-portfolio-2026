"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { skillsData } from "../../data/portfolioData";

interface WordProps {
  children: string;
  position: THREE.Vector3;
  color: string;
  icon?: string;
}

function Word({ children, position, color, icon }: WordProps) {
  const [hovered, setHovered] = useState(false);
  const hasIcon = icon && icon.trim() !== "";

  return (
    <Html
      position={position}
      center
      distanceFactor={7} // Automatically sizes the text based on 3D depth/distance
      className="pointer-events-none select-none"
    >
      <div
        className={`px-3 py-1.5 rounded-lg border font-mono text-[10px] sm:text-xs font-bold tracking-wide whitespace-nowrap pointer-events-auto transition-all duration-300 flex items-center gap-1.5 ${
          hovered
            ? "bg-[#00f5d4] border-[#00f5d4] text-slate-950 scale-110 shadow-lg shadow-[#00f5d4]/30"
            : "bg-[#0f1626]/90 border-[#1e293b] shadow-md shadow-black/10"
        }`}
        style={{
          color: hovered ? "#020617" : color,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hasIcon && (
          <img
            src={icon}
            alt={children}
            className={`w-3.5 h-3.5 object-contain transition-all duration-300 ${
              hovered ? "brightness-0 contrast-200" : ""
            }`}
          />
        )}
        <span>{children}</span>
      </div>
    </Html>
  );
}

function Cloud({ count }: { count: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Distribute words evenly on a sphere using Golden Spiral
  const words = useMemo(() => {
    const list: [THREE.Vector3, string, string, string][] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle
    const targetSkills = skillsData.slice(0, count);

    for (let i = 0; i < targetSkills.length; i++) {
      const y = 1 - (i / (targetSkills.length - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      // Map colors based on skill category
      let color = "#cbd5e1"; // Default Slate 300
      const skill = targetSkills[i];
      if (skill.category === "frontend")
        color = "#60a5fa"; // Light Blue
      else if (skill.category === "backend")
        color = "#c084fc"; // Light Purple
      else if (skill.category === "devops")
        color = "#f43f5e"; // Rose
      else if (skill.category === "database") color = "#34d399"; // Emerald

      list.push([new THREE.Vector3(x * 5, y * 5, z * 5), skill.name, color, skill.icon]);
    }
    return list;
  }, [count]);

  // Spin the globe slowly
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map(([pos, word, color, icon], index) => (
        <Word key={index} position={pos} color={color} icon={icon}>
          {word}
        </Word>
      ))}
    </group>
  );
}

export default function SkillsGlobe() {
  return (
    <div className="w-full h-80 sm:h-100 flex items-center justify-center relative cursor-grab active:cursor-grabbing overflow-hidden">
      {/* Visual background guide circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full border border-card-border/10 animate-pulse-slow z-0" />
      </div>

      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: "transparent", zIndex: 1 }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Cloud count={22} />
      </Canvas>
    </div>
  );
}
