"use client";

import { PageHero } from "@/components/layout/PageHero";
import styles from "./About.module.css";
import { motion } from "framer-motion";
import { Target, Globe, Heart, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main>
      <PageHero 
        title="Our Story" 
        subtitle="Crafting extraordinary journeys and luxury lifestyles since 2021."
        image="/images/about-hero.png"
      />
      
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div 
              className={styles.storyText}
            >
              <h2>The Icarus <span>Excellence</span></h2>
              <p>
                Founded in 2021, Icarus Flight Agency was born out of a desire to redefine luxury travel. We believe that travel is not just about the destination, but the seamless, elevated experience that begins the moment you dream of a journey.
              </p>
              <p>
                Our team of dedicated travel experts and agentic concierge systems work in harmony to ensure every detail of your flight, stay, and adventure is meticulously planned and flawlessly executed.
              </p>
            </div>
            
            <div 
              className={styles.storyImageWrapper}
            >
              <img src="/images/bali.png" alt="Luxury Travel Experience" className={styles.storyImage} />
            </div>
          </div>

          <div className={styles.missionVision}>
            <div 
              className={styles.card}
            >
              <Target size={40} className={styles.icon} />
              <h3>Our Mission</h3>
              <p>To provide unparalleled travel experiences that transcend boundaries, combining the efficiency of agentic technology with the warmth of human hospitality.</p>
            </div>
            
            <div 
              className={styles.card}
            >
              <Globe size={40} className={styles.icon} />
              <h3>Our Vision</h3>
              <p>To be the world&apos;s leading luxury travel and lifestyle platform, recognized for our commitment to excellence, innovation, and global connectivity.</p>
            </div>
          </div>

          <div className={styles.values}>
            <div className={styles.valuesHeader}>
              <h2>Core <span>Values</span></h2>
            </div>
            <div className={styles.valuesGrid}>
              {[
                { icon: <Heart />, title: "Customer Centric", desc: "Your comfort and satisfaction are at the heart of everything we do." },
                { icon: <ShieldCheck />, title: "Reliability", desc: "We are committed to providing dependable and secure travel solutions." },
                { icon: <Globe />, title: "Global Reach", desc: "Connecting you to the most exclusive destinations across the globe." }
              ].map((value, i) => (
                <motion.div 
                  key={i} 
                  className={styles.valueItem}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={styles.valueIcon}>{value.icon}</div>
                  <h4>{value.title}</h4>
                  <p>{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
