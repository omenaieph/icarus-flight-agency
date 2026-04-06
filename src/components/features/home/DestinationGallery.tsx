"use client";

import styles from "./DestinationGallery.module.css";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TiltCard } from "@/components/ui/TiltCard";

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    price: "From R24,500",
    rating: 4.9,
    image: "/images/bali.png",
    description: "Experience the spiritual heart of Indonesia with luxury jungle retreats and private beach clubs."
  },
  {
    id: 2,
    name: "Maldives",
    price: "From R42,000",
    rating: 5.0,
    image: "/images/maldives.png",
    description: "Pure paradise with overwater villas, turquoise lagoons, and world-class underwater dining."
  },
  {
    id: 3,
    name: "Santorini, Greece",
    price: "From R35,800",
    rating: 4.8,
    image: "/images/santorini.png",
    description: "Breathtaking sunsets over the caldera and whitewashed luxury stays in the heart of Oia."
  }
];

import { useRouter } from "next/navigation";

export function DestinationGallery() {
  const router = useRouter();
  return (
    <section className={styles.gallerySection}>
      <div className={styles.header}>
        <motion.span 
          className={styles.subTitle}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Curated Journeys
        </motion.span>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Popular Destinations
        </motion.h2>
      </div>

      <div className={styles.grid}>
        {destinations.map((dest, index) => (
          <motion.div 
            key={dest.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            style={{ perspective: 1000 }}
          >
            <TiltCard className={styles.card}>
              <div className={styles.imageWrapper} style={{ transform: "translateZ(30px)" }}>
                <img src={dest.image} alt={dest.name} className={styles.image} />
                <div className={styles.rating}>
                  <Star size={14} fill="var(--color-amber)" stroke="var(--color-amber)" />
                  <span>{dest.rating}</span>
                </div>
              </div>
              
              <div className={styles.details} style={{ transform: "translateZ(40px)" }}>
                <div className={styles.topInfo}>
                  <div className={styles.location}>
                    <MapPin size={16} />
                    <span>{dest.name}</span>
                  </div>
                  <div className={styles.price}>{dest.price}</div>
                </div>
                <p className={styles.description}>{dest.description}</p>
                
                <MagneticButton className={styles.bookBtn} onClick={() => router.push('/contact')}>
                  Explore Details <ArrowRight size={16} />
                </MagneticButton>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
      
      <div className={styles.viewAll}>
        <button className={styles.viewMoreBtn} onClick={() => router.push('/contact')}>View All Destinations</button>
      </div>
    </section>
  );
}
