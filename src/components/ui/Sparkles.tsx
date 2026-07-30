"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "../../lib/utils";

interface SparklesProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore = (props: SparklesProps) => {
  const {
    id = "sparkles",
    background = "transparent",
    minSize = 0.4,
    maxSize = 1.2,
    particleDensity = 120,
    className,
    particleColor = "#00f5d4",
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const particles = useRef<any[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setContext(ctx);
    }
  }, []);

  useEffect(() => {
    if (!context || !canvasRef.current) return;

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
        initParticles();
      }
    };

    const initParticles = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      const count = Math.floor((w * h) / (1000000 / particleDensity));
      
      particles.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * 0.08,
        speedY: (Math.random() - 0.5) * 0.08,
        alpha: Math.random(),
        fadeSpeed: 0.005 + Math.random() * 0.005,
        direction: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    let animationId: number;
    const animate = () => {
      if (!canvasRef.current || !context) return;
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      
      context.clearRect(0, 0, w, h);
      
      particles.current.forEach((p) => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around boundaries
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        
        // Animate alpha pulsing
        p.alpha += p.fadeSpeed * p.direction;
        if (p.alpha <= 0) {
          p.alpha = 0;
          p.direction = 1;
        } else if (p.alpha >= 1) {
          p.alpha = 1;
          p.direction = -1;
        }

        // Draw particle
        context.fillStyle = particleColor;
        context.globalAlpha = p.alpha;
        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [context, particleDensity, maxSize, minSize, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      style={{
        background,
        width: "100%",
        height: "100%",
      }}
      className={cn("block", className)}
    />
  );
};
