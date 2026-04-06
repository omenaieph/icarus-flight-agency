"use client";

import styles from "./InnerCircle.module.css";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function InnerCircle() {
  return (
    <section className={styles.section}>
      <div className={styles.glow} />
      
      <div className={styles.container}>
        <motion.span 
          className={styles.subTitle}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Join The Inner Circle
        </motion.span>
        
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Elevate Your World
        </motion.h2>
        
        <motion.p 
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Gain exclusive access to unlisted properties, priority flight routing, and curated experiences. Leave your details below and our concierge will reach out privately.
        </motion.p>
        
        <motion.form 
          className={styles.form}
          action="https://formspree.io/f/xeepnjye"
          method="POST"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className={styles.inputWrapper}>
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email address..." 
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Request Access <ArrowRight size={18} />
          </button>
        </motion.form>
      </div>
    </section>
  );
}
