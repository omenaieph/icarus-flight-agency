"use client";

import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import styles from "./Services.module.css";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const services = [
  {
    id: 1,
    title: "Flight Tickets",
    description: "Whether it's a private jet across the continent or a first-class commercial flight, we handle all your ticketing needs with precision and global connectivity.",
    image: "/images/flight tickets.jpg",
    features: ["Global Routes", "Priority Boarding", "Competitive Pricing"]
  },
  {
    id: 2,
    title: "Hotel Bookings",
    description: "Access our curated list of 5-star hotels and exclusive luxury resorts. From downtown penthouses to secluded island getaways, we book the best for you.",
    image: "/images/luxury-villa.png",
    features: ["Verified Luxury", "Best Price Guarantee", "VIP Amenities"]
  },
  {
    id: 3,
    title: "Tour Packages",
    description: "Handcrafted adventures designed by locals and travel experts. Experience authentic culture, wildlife safaris, and breathtaking landscapes in style.",
    image: "/images/bali.png",
    features: ["Expert Guides", "Private Tours", "Custom Itineraries"]
  },
  {
    id: 4,
    title: "Visa Assistance",
    description: "Navigating international travel requirements can be complex. Our experts provide comprehensive support for your visa applications and travel documents.",
    image: "/images/visa assistance.jpg",
    features: ["Document Review", "Priority Processing", "Expert Advice"]
  },
  {
    id: 5,
    title: "Car Rentals",
    description: "Premium vehicles at your disposal. From luxury SUVs for road trips to chauffeur-driven town cars for seamless city transit.",
    image: "/images/maldives.png",
    features: ["Luxury Fleet", "Airport Pickup", "24/7 Assistance"]
  }
];

import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();
  return (
    <main>
      <PageHero 
        title="Our Services" 
        subtitle="Comprehensive luxury travel solutions tailored to your unique needs."
        image="/images/hero-bg.png"
      />
      
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          {services.map((service, index) => (
            <div key={service.id} className={styles.serviceRow}>
              <motion.div 
                className={styles.imageCol}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className={styles.imageWrapper}>
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    className={styles.image} 
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.contentCol}
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2>{service.title}</h2>
                <p className={styles.description}>{service.description}</p>
                <div className={styles.features}>
                  {service.features.map(f => (
                    <div key={f} className={styles.feature}>
                      <CheckCircle2 size={18} className={styles.check} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <MagneticButton className={styles.ctaBtn} onClick={() => router.push('/contact')}>
                  Learn More
                </MagneticButton>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
