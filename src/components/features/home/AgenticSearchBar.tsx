"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import styles from "./AgenticSearchBar.module.css";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function AgenticSearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.searchContainer}>
      <motion.div 
        className={`${styles.searchBar} glass`}
        animate={{ 
          boxShadow: isFocused 
            ? "0 0 30px rgba(232, 139, 84, 0.3)" 
            : "0 0 0px rgba(232, 139, 84, 0)" 
        }}
        transition={{ duration: 0.3 }}
      >
        <Sparkles size={20} className={styles.iconPrimary} />
        <input
          type="text"
          className={styles.input}
          placeholder="I want a weekend in a Cape Town villa with a flight from Johannesburg..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <MagneticButton className={styles.submitBtn}>
          <Search size={18} />
          <span>Protocol Search</span>
        </MagneticButton>
      </motion.div>
    </div>
  );
}
