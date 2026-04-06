"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./CustomCursor.module.css";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isPointerExt, setIsPointerExt] = useState(false);

  // Use motion values for immediate un-laggy updates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the ring to make it trail
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Mount on devices that support hover or have a screen wider than tablet (to catch touch laptops)
    if (typeof window !== "undefined") {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const possessesHover = window.matchMedia("(any-hover: hover)").matches;
      
      if (isDesktop || possessesHover) {
        setTimeout(() => setIsPointerExt(true), 0);
        
        const updateMousePosition = (e: MouseEvent) => {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        };

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isClickable = 
          window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "BUTTON" || 
          target.tagName === "A" ||
          target.closest("button") || 
          target.closest("a");
          
        setIsHovering(!!isClickable);
      };

      window.addEventListener("mousemove", updateMousePosition);
      window.addEventListener("mouseover", handleMouseOver);

      return () => {
        window.removeEventListener("mousemove", updateMousePosition);
        window.removeEventListener("mouseover", handleMouseOver);
      };
    }
  }
  }, [mouseX, mouseY]);

  // Hide base cursor for desktop if component is active
  useEffect(() => {
    if (isPointerExt) {
      document.body.style.cursor = "none";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [isPointerExt]);

  // The dot is 8px wide, so offset by 4
  const dotX = useTransform(mouseX, (x) => x - 4);
  const dotY = useTransform(mouseY, (y) => y - 4);

  // The ring is 40px wide natively, but 60px when hovering. Offset by half of current sizing dynamically.
  const ringOuterX = useTransform(ringX, (x) => x - (isHovering ? 30 : 20));
  const ringOuterY = useTransform(ringY, (y) => y - (isHovering ? 30 : 20));

  if (!isPointerExt) return null;

  return (
    <div className={styles.cursorWrapper}>
      <motion.div
        className={styles.cursorDot}
        style={{
          x: dotX,
          y: dotY,
        }}
      />
      <motion.div
        className={`${styles.cursorRing} ${isHovering ? styles.cursorRingHover : ""}`}
        style={{
          x: ringOuterX,
          y: ringOuterY,
        }}
      />
    </div>
  );
}
