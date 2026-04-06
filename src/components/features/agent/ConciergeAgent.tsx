"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import styles from "./ConciergeAgent.module.css";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ConciergeAgent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.agentWrapper}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.agentPanel} glass`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className={styles.header}>
              <div className={styles.agentInfo}>
                <div className={styles.avatar}></div>
                <div>
                  <h4 className={styles.agentName}>Icarus Concierge</h4>
                  <span className={styles.status}>Online • Ready to assist</span>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>
            
            <div className={styles.chatArea}>
              <div className={styles.welcomeMessage}>
                <p>Welcome to Icarus. How may I coordinate your journey today?</p>
                <div className={styles.suggestions}>
                  <button className={styles.suggestionBtn}>Calculate flight time</button>
                  <button className={styles.suggestionBtn}>Check home availability</button>
                  <button className={styles.suggestionBtn}>Generate Luxury Itinerary</button>
                </div>
              </div>
            </div>

            <div className={styles.inputArea}>
              <input type="text" placeholder="Message Concierge..." className={styles.input} />
              <button className={styles.sendBtn}>
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className={styles.triggerContainer} layout>
        {!isOpen && (
          <MagneticButton 
            className={styles.triggerBtn} 
            onClick={() => setIsOpen(true)}
            glass
          >
            <MessageSquare size={20} />
            <span>Concierge</span>
          </MagneticButton>
        )}
      </motion.div>
    </div>
  );
}
