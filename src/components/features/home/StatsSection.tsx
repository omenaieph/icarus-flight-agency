"use client";

import styles from "./StatsSection.module.css";
import { motion } from "framer-motion";
import { Award, Globe, ShieldCheck, Users } from "lucide-react";
import { NumberTicker } from "@/components/ui/NumberTicker";

const stats = [
  { 
    label: "Customer Satisfaction", 
    value: 98,
    suffix: "%", 
    icon: <Award size={32} className={styles.iconBrand} />,
    description: "Highest rated premium travel agency in the region."
  },
  { 
    label: "Dream Destinations", 
    value: 100,
    suffix: "+", 
    icon: <Globe size={32} className={styles.iconBrand} />,
    description: "Curated luxury locations across 5 continents."
  },
  { 
    label: "Professional Support", 
    value: "24/7", 
    icon: <ShieldCheck size={32} className={styles.iconBrand} />,
    description: "Our agentic concierge is always ready to assist."
  },
  { 
    label: "Happy Travelers", 
    value: 50,
    suffix: "k+", 
    icon: <Users size={32} className={styles.iconBrand} />,
    description: "Creating unforgettable memories since 2021."
  }
];

export function StatsSection() {
  return (
    <section className={styles.statsContainer}>
      <div className={styles.grid}>
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label}
            className={styles.statCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className={styles.iconWrapper}>{stat.icon}</div>
            <div className={styles.value}>
              {typeof stat.value === 'number' ? (
                <NumberTicker value={stat.value} suffix={stat.suffix} delay={index * 0.15} />
              ) : (
                stat.value
              )}
            </div>
            <div className={styles.label}>{stat.label}</div>
            <p className={styles.description}>{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
