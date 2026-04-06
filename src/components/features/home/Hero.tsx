"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Hero.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PhoneCall, Mail } from "lucide-react";
import { BlurReveal } from "@/components/ui/BlurReveal";

const backgroundImages = [
  "/images/hero-bg.png",
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=80",
  "/images/carousel-4.jpg",
];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentBg, setCurrentBg] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <section ref={heroRef} className={styles.heroSection}>
      {/* Background Image Carousel with Overlay */}
      <div className={styles.bgWrapper}>
        <div className={styles.overlay} />
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentBg}
            src={backgroundImages[currentBg]}
            alt={`Luxury travel destination ${currentBg + 1}`}
            className={styles.heroBg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      <motion.div 
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={itemVariants} className={styles.badge}>
          <span className={styles.badgeGlow}></span>
          Premium Travel Experience
        </motion.span>
        
        <motion.h1 variants={itemVariants} className={styles.title}>
          <BlurReveal delay={0.3}>Transcend</BlurReveal> <motion.span className={styles.accent} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.5, duration: 0.6}}>Boundaries</motion.span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className={styles.subtitle}>
          Discover your dream destination and experience the world like never before with Icarus Flight Agency.
        </motion.p>
        
        <motion.div variants={itemVariants} className={styles.actions}>
          <MagneticButton className={styles.primaryBtn} aria-label="Start Planning" onClick={() => router.push('/contact')}>
            <PhoneCall size={18} className={styles.btnIconLeft} />
            <span>Start Planning</span>
          </MagneticButton>
          <MagneticButton className={styles.secondaryBtn} aria-label="View Services" onClick={() => router.push('/services')}>
            <Mail size={18} className={styles.btnIconLeft} />
            <span>View Services</span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className={styles.mouse}>
          <motion.div 
            className={styles.wheel}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span>Scroll to Explore</span>
      </motion.div>
    </section>
  );
}
