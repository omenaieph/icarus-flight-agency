"use client";
import React from "react";
import { motion, MotionProps, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";
import styles from "./GradientText.module.css";

interface GradientTextProps extends HTMLMotionProps<"span"> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export function GradientText({
  className,
  children,
  as: Component = "span",
  ...props
}: GradientTextProps) {
  return (
    <motion.span
      className={clsx(styles.gradientText, className)}
      {...(props as HTMLMotionProps<"span">)}
    >
      {children}
    </motion.span>
  );
}
