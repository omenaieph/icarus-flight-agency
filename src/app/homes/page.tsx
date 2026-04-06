"use client";

import { PageHero } from "@/components/layout/PageHero";
import styles from "./Homes.module.css";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const properties = [
  {
    id: 1,
    name: "Tiny Home Oasis",
    price: "R 1,600 / night",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop&q=80&auto=format",
    beds: 1,
    baths: 1,
    guests: 2,
    description: "Escape to our charming tiny home nestled in nature. Perfect for couples seeking a peaceful retreat with modern amenities and stunning views.",
    rating: "4.9",
    reviews: 124,
    highlights: ["Eco-friendly design", "Private outdoor space", "Close to hiking trails"],
    amenities: ["Free WiFi", "Kitchen", "Parking", "Pet Friendly", "Garden"]
  },
  {
    id: 2,
    name: "Lux 1BR Apartment",
    price: "R 2,860 / night",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop&q=80&auto=format",
    beds: 1,
    baths: 1,
    guests: 4,
    description: "Sophisticated urban living at its finest. This luxury apartment features premium finishes, city views, and premium amenities in the heart of downtown.",
    rating: "4.8",
    reviews: 89,
    highlights: ["Downtown location", "Premium finishes", "24/7 security"],
    amenities: ["Free WiFi", "Gym Access", "Concierge", "Rooftop Terrace", "Kitchen"]
  },
  {
    id: 3,
    name: "Mountain View Lux 2BD",
    price: "R 4,120 / night",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop&q=80&auto=format",
    beds: 2,
    baths: 2,
    guests: 6,
    description: "Wake up to breathtaking mountain views in this spacious luxury apartment. Features premium amenities, modern design, and direct access to outdoor activities.",
    rating: "5.0",
    reviews: 67,
    highlights: ["Panoramic mountain views", "Ski-in/ski-out access", "Luxury amenities"],
    amenities: ["Free WiFi", "Hot Tub", "Fireplace", "Ski Storage", "Full Kitchen"]
  }
];

import { useRouter } from "next/navigation";

export default function HomesPage() {
  const router = useRouter();
  return (
    <main>
      <PageHero 
        title="Icarus Homes" 
        subtitle="Carefully curated properties for the elite traveler."
        image="/images/luxury-villa.png"
      />
      
      <section className={styles.homesSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Exclusive <span>Properties</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Explore our collection of the world&apos;s most exceptional short-term luxury rentals.
            </motion.p>
          </div>

          <div className={styles.list}>
            {properties.map((property, index) => {
              const isReversed = index % 2 !== 0;
              return (
                <motion.div 
                  key={property.id}
                  className={`${styles.card} ${isReversed ? styles.cardReverse : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className={styles.imageCol}>
                    <img src={property.image} alt={property.name} className={styles.image} />
                  </div>
                  
                  <div className={styles.contentCol}>
                    <div className={styles.ratingBadge}>
                      <Star size={16} fill="currentColor" />
                      <span>{property.rating}</span>
                      <span className={styles.reviews}>({property.reviews} reviews)</span>
                    </div>

                    <h3 className={styles.propertyName}>{property.name}</h3>
                    
                    <div className={styles.statsList}>
                      <span>{property.beds} {property.beds > 1 ? 'Beds' : 'Bed'}</span>
                      <span className={styles.dot}>•</span>
                      <span>{property.baths} {property.baths > 1 ? 'Baths' : 'Bath'}</span>
                      <span className={styles.dot}>•</span>
                      <span>Up to {property.guests} Guests</span>
                    </div>
                    
                    <div className={styles.price}>{property.price}</div>
                    
                    <p className={styles.description}>{property.description}</p>
                    
                    <div className={styles.highlightsContainer}>
                      {property.highlights.map((highlight, idx) => (
                        <span key={idx} className={styles.highlightBadge}>{highlight}</span>
                      ))}
                    </div>

                    <div className={styles.amenitiesGrid}>
                      {property.amenities.map((amenity, idx) => (
                        <div key={idx} className={styles.amenityItem}>
                          <div className={styles.checkCircle} />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={styles.actions}>
                      <MagneticButton className={styles.bookBtn} onClick={() => router.push('/contact')}>
                        Book Now <ArrowRight size={16} />
                      </MagneticButton>
                      <button className={styles.secondaryBtn} onClick={() => router.push('/contact')}>View Details</button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
