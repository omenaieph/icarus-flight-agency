"use client";

import styles from "./PageHero.module.css";
import { motion, useScroll, useTransform } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  children?: React.ReactNode;
}

export function PageHero({ title, subtitle, image, children }: PageHeroProps) {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 250]);

  return (
    <section className={styles.hero}>
      <div className={styles.bgWrapper}>
        <div className={styles.overlay} />
        <motion.img 
          src={image} 
          alt={title} 
          className={styles.bgImage} 
          style={{ y: yParallax }}
        />
      </div>
      
      <div className={styles.content}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  );
}
