"use client";

import { motion } from "framer-motion";
import React from "react";

interface BlurRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function BlurReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
}: BlurRevealProps) {
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, filter: "blur(12px)", y: 10, scale: 1.05 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scale: 1,
      transition: { duration, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }, // Apple-like ease
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <motion.span variants={item} className="inline-block" style={{ padding: '0.1em', margin: '-0.1em' }}>
            {word}
          </motion.span>
          {index < words.length - 1 && <span>&nbsp;</span>}
        </React.Fragment>
      ))}
    </motion.span>
  );
}
