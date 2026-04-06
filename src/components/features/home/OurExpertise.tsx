"use client";

import styles from "./OurExpertise.module.css";
import { motion } from "framer-motion";
import { Plane, Key, Compass, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const expertise = [
  {
    id: 1,
    title: "Private Aviation",
    description: "Seamless global connectivity. Access an elite fleet of private jets for immediate, untracked, and luxurious transit anywhere in the world.",
    icon: <Plane size={32} strokeWidth={1.5} />
  },
  {
    id: 2,
    title: "Elite Residences",
    description: "Unlock the doors to curated penthouses, secluded villas, and private islands unavailable on the public market.",
    icon: <Key size={32} strokeWidth={1.5} />
  },
  {
    id: 3,
    title: "Bespoke Itineraries",
    description: "Every journey is masterfully crafted from scratch. We handle all logistics while you indulge in friction-free exploration.",
    icon: <Compass size={32} strokeWidth={1.5} />
  }
];

export function OurExpertise() {
  const router = useRouter();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.span 
            className={styles.subTitle}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Icarus Advantage
          </motion.span>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our Expertise
          </motion.h2>
        </div>

        <div className={styles.grid}>
          {expertise.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              <button className={styles.link} onClick={() => router.push('/services')}>
                Explore Services <ArrowRight size={18} className={styles.linkIcon} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
