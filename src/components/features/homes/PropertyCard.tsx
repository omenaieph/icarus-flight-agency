"use client";

import { useState } from "react";
import styles from "./PropertyCard.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Bed, Bath, Maximize, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface Property {
  id: number;
  name: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  beds: number;
  baths: number;
  sqm: number;
  images: string[];
}

import { useRouter } from "next/navigation";

export function PropertyCard({ property }: { property: Property }) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageGallery}>
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImage}
            src={property.images[currentImage]} 
            alt={property.name} 
            className={styles.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        
        <div className={styles.controls}>
          <button onClick={prevImage} className={styles.navBtn}><ChevronLeft size={20} /></button>
          <button onClick={nextImage} className={styles.navBtn}><ChevronRight size={20} /></button>
        </div>
        
        <div className={styles.dots}>
          {property.images.map((_, i) => (
            <div key={i} className={`${styles.dot} ${i === currentImage ? styles.activeDot : ""}`} />
          ))}
        </div>

        <div className={styles.ratingBadge}>
          <Star size={14} fill="var(--color-amber)" stroke="var(--color-amber)" />
          <span>{property.rating} ({property.reviews} reviews)</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.location}>
            <MapPin size={16} />
            <span>{property.location}</span>
          </div>
          <div className={styles.price}>{property.price}</div>
        </div>
        
        <h3 className={styles.title}>{property.name}</h3>
        
        <div className={styles.amenities}>
          <div className={styles.amenity}>
            <Bed size={18} />
            <span>{property.beds} Beds</span>
          </div>
          <div className={styles.amenity}>
            <Bath size={18} />
            <span>{property.baths} Baths</span>
          </div>
          <div className={styles.amenity}>
            <Maximize size={18} />
            <span>{property.sqm} m²</span>
          </div>
        </div>

        <MagneticButton className={styles.viewBtn} onClick={() => router.push('/contact')}>
          View Property Details
        </MagneticButton>
      </div>
    </div>
  );
}
