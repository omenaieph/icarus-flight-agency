"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);
  // Only show glare when interacting
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.3, 0, 0.3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates between -0.5 and 0.5
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        position: "relative"
      }}
      className={className}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)",
          opacity: glareOpacity,
          left: glareX,
          top: glareY,
          transform: "translate(-50%, -50%)",
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 10,
          mixBlendMode: "overlay"
        }}
      />
      {children}
    </motion.div>
  );
}
