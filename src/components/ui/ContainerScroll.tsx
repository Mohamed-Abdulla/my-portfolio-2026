"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  children,
  titleComponent,
}: {
  children: React.ReactNode;
  titleComponent: string | React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.85, 0.95] : [1.08, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.35], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.35], [20, 0]);

  return (
    <div
      className="flex flex-col items-center justify-center relative p-2 md:p-6"
      ref={containerRef}
    >
      <div
        className="w-full relative py-6 sm:py-12"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

const Card = ({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        translateY: translate,
        boxShadow:
          "0 0 0 1px rgba(0, 245, 212, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
      }}
      className="max-w-6xl mx-auto w-full border border-card-border/40 rounded-[30px] p-2 sm:p-4 bg-[#0a0f1d]/60 backdrop-blur-md"
    >
      <div className="w-full h-full overflow-hidden rounded-2xl bg-slate-950/20">
        {children}
      </div>
    </motion.div>
  );
};
