"use client";

import Image from "next/image";
import styles from "./DestinationGallery.module.css";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Plane, Car, Building, Coffee, Eye, Headset } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { useRouter } from "next/navigation";

const destinations = [
  {
    id: 1,
    name: "Brazil",
    price: "R38,900",
    duration: "08 Nights - 09 Days",
    image: "/images/Christ the Redeemer.jpg",
    inclusions: [
      { icon: Plane, label: "Flights-EX JNB" },
      { icon: Car, label: "RT Airport Transfers" },
      { icon: Building, label: "Hotel Stay" },
      { icon: Coffee, label: "Breakfast" },
      { icon: Eye, label: "Tours per itinerary" },
      { icon: Headset, label: "24x7 Support" }
    ]
  },
  {
    id: 2,
    name: "Egypt",
    price: "R39,650",
    duration: "11 Nights - 12 Days",
    image: "/images/Karnak Temple.jpg",
    inclusions: [
      { icon: Plane, label: "Flights-EX JNB" },
      { icon: Car, label: "RT Airport Transfers" },
      { icon: Building, label: "Hotel Stay" },
      { icon: Coffee, label: "Breakfast" },
      { icon: Eye, label: "Tours per itinerary" },
      { icon: Headset, label: "24x7 Support" }
    ]
  },
  {
    id: 3,
    name: "Hong Kong",
    price: "R29,590",
    duration: "05 Nights - 06 Days",
    image: "/images/Victoria Harbour Junk Boat.jpg",
    inclusions: [
      { icon: Plane, label: "Flights-EX JNB" },
      { icon: Car, label: "RT Airport Transfers" },
      { icon: Building, label: "Hotel Stay" },
      { icon: Coffee, label: "Breakfast" },
      { icon: Eye, label: "Tours per itinerary" },
      { icon: Headset, label: "24x7 Support" }
    ]
  },
  {
    id: 4,
    name: "Madagascar",
    price: "R10,565",
    duration: "05 Nights - 06 Days",
    image: "/images/Avenue of the Baobabs.jpg",
    inclusions: [
      { icon: Car, label: "RT Airport Transfers" },
      { icon: Building, label: "Hotel Stay" },
      { icon: Coffee, label: "Breakfast" },
      { icon: Eye, label: "Tours per itinerary" },
      { icon: Headset, label: "24x7 Support" }
    ]
  }
];

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
                <Image 
                  src={dest.image} 
                  alt={dest.name} 
                  className={styles.image} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className={styles.durationPill}>
                  <span>{dest.duration}</span>
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
                
                <div className={styles.inclusionsList}>
                  {dest.inclusions.map((inclusion, i) => {
                    const Icon = inclusion.icon;
                    return (
                      <div key={i} className={styles.inclusionItem}>
                        <Icon size={16} strokeWidth={1.5} />
                        <span>{inclusion.label}</span>
                      </div>
                    );
                  })}
                </div>
                
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
