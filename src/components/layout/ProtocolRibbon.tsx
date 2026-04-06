"use client";

import { motion } from "framer-motion";
import styles from "./ProtocolRibbon.module.css";
import { Plane, Home, CloudRain } from "lucide-react";

const STATS = [
  { icon: Plane, text: "Active Charters: 4" },
  { icon: Home, text: "Available Homes: 12" },
  { icon: CloudRain, text: "Weather in CT: 24°C" },
  { icon: Plane, text: "Active Charters: 4" },
  { icon: Home, text: "Available Homes: 12" },
  { icon: CloudRain, text: "Weather in CT: 24°C" },
];

export function ProtocolRibbon() {
  return (
    <div className={`${styles.ribbonContainer} glass`}>
      <motion.div
        className={styles.ribbonTrack}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
      >
        {[...STATS, ...STATS].map((stat, i) => (
          <div key={i} className={styles.statItem}>
            <stat.icon size={16} className={styles.icon} />
            <span className={styles.text}>{stat.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
