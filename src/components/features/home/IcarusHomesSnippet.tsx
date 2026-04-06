"use client";

import styles from "./IcarusHomesSnippet.module.css";
import { motion } from "framer-motion";
import { Home, Bed, Bath, Users, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const listings = [
  {
    id: 1,
    name: "Tiny Home Oasis",
    price: "R 1,600 / night",
    image: "/images/hero-bg.png",
    beds: 1,
    baths: 1,
    guests: 2,
    description: "Escape to our charming tiny home nestled in nature. Perfect for couples seeking a peaceful retreat with modern amenities and stunning views."
  },
  {
    id: 2,
    name: "Lux 1BR Apartment",
    price: "R 2,860 / night",
    image: "/images/santorini.png",
    beds: 1,
    baths: 1,
    guests: 4,
    description: "Sophisticated urban living at its finest. This luxury apartment features premium finishes, city views, and premium amenities in the heart of downtown."
  },
  {
    id: 3,
    name: "Mountain View Lux 2BD",
    price: "R 4,120 / night",
    image: "/images/maldives.png",
    beds: 2,
    baths: 2,
    guests: 6,
    description: "Wake up to breathtaking mountain views in this spacious luxury apartment. Features premium amenities, modern design, and direct access to outdoor activities."
  }
];

import { useRouter } from "next/navigation";

export function IcarusHomesSnippet() {
  const router = useRouter();
  return (
    <section className={styles.homesSection}>
      <div className={styles.header}>
        <motion.span 
          className={styles.subTitle}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Exclusive Stays
        </motion.span>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Icarus Homes
        </motion.h2>
      </div>

      <div className={styles.grid}>
        {listings.map((listing, index) => (
          <motion.div 
            key={listing.id}
            className={styles.card}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <div className={styles.imageWrapper}>
              <img src={listing.image} alt={listing.name} className={styles.image} />
              <div className={styles.premiumBadge}>
                <Home size={14} />
                <span>Premium Listing</span>
              </div>
            </div>
            
            <div className={styles.details}>
              <div className={styles.topInfo}>
                <div className={styles.propertyName}>
                  <span>{listing.name}</span>
                </div>
                <div className={styles.price}>{listing.price}</div>
              </div>
              
              <div className={styles.amenities}>
                <div className={styles.amenityItem}>
                  <Bed size={16} /> <span>{listing.beds} Bed</span>
                </div>
                <div className={styles.amenityItem}>
                  <Bath size={16} /> <span>{listing.baths} Bath</span>
                </div>
                <div className={styles.amenityItem}>
                  <Users size={16} /> <span>{listing.guests} Guests</span>
                </div>
              </div>
              
              <p className={styles.description}>{listing.description}</p>
              
              <MagneticButton className={styles.bookBtn} onClick={() => router.push('/contact')}>
                Book Now <ArrowRight size={16} />
              </MagneticButton>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className={styles.viewAll}>
        <button className={styles.viewMoreBtn} onClick={() => router.push('/homes')}>View All Properties</button>
      </div>
    </section>
  );
}

