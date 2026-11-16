"use client";

import { type ReactNode } from "react";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import styles from "./Services.module.css";
import { motion } from "framer-motion";
import {
  Check,
  Plane,
  BedDouble,
  Compass,
  FileCheck,
  CarFront,
  ArrowUpRight,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRouter } from "next/navigation";

interface ServiceOffering {
  title: string;
  detail: string;
}

interface ServiceItem {
  id: number;
  category: string;
  title: string;
  badge?: string;
  badgeIcon?: ReactNode;
  description: string;
  image: string;
  features: string[];
  offerings?: ServiceOffering[];
  ctaText?: string;
}

const services: ServiceItem[] = [
  {
    id: 1,
    category: "01 — Aviation",
    title: "Flight Tickets",
    badge: "Commercial & Private Charter",
    badgeIcon: <Plane size={14} strokeWidth={1.5} className={styles.badgeIcon} />,
    description: "Whether it's a private jet across the continent or a first-class commercial flight, we handle all your ticketing needs with precision and global connectivity.",
    image: "/images/flight tickets.jpg",
    features: ["Global Routes", "Priority Boarding", "Competitive Pricing", "24/7 Flight Desk"]
  },
  {
    id: 2,
    category: "02 — Hospitality",
    title: "Hotel Bookings",
    badge: "5-Star & Curated Villas",
    badgeIcon: <BedDouble size={14} strokeWidth={1.5} className={styles.badgeIcon} />,
    description: "Access our curated list of 5-star hotels and exclusive luxury resorts. From downtown penthouses to secluded island getaways, we book the best for you.",
    image: "/images/luxury-villa.png",
    features: ["Verified Luxury", "Best Price Guarantee", "VIP Amenities", "Bespoke Concierge"]
  },
  {
    id: 3,
    category: "03 — Expeditions",
    title: "Tour Packages",
    badge: "Tailored Experiences",
    badgeIcon: <Compass size={14} strokeWidth={1.5} className={styles.badgeIcon} />,
    description: "Handcrafted adventures designed by locals and travel experts. Experience authentic culture, wildlife safaris, and breathtaking landscapes in style.",
    image: "/images/bali.png",
    features: ["Expert Guides", "Private Tours", "Custom Itineraries", "All-Inclusive Options"]
  },
  {
    id: 4,
    category: "04 — Global Mobility",
    title: "Visa Assistance",
    badge: "End-to-End Advisory",
    badgeIcon: <FileCheck size={14} strokeWidth={1.5} className={styles.badgeIcon} />,
    description: "Navigating international travel requirements can be complex. Our experts provide comprehensive support for your visa applications and travel documents.",
    image: "/images/visa assistance.jpg",
    features: ["Document Review", "Priority Processing", "Expert Advice", "Embassy Liaison"]
  },
  {
    id: 5,
    category: "05 — Ground Transport",
    title: "Private Group Transfers",
    badge: "Mercedes-Benz Vito Tourer Fleet",
    badgeIcon: <CarFront size={14} strokeWidth={1.5} className={styles.badgeIcon} />,
    description: "Travel across Cape Town and beyond in effortless comfort and style aboard our private Mercedes-Benz passenger fleet. Whether you are travelling with family, friends, colleagues, or executive guests, we coordinate every mile of your group journey.",
    image: "/images/mercedes-shuttle.jpg",
    features: [
      "Mercedes-Benz Fleet",
      "Private Chauffeur",
      "Cape Town & Beyond",
      "Door-to-Door Service"
    ],
    offerings: [
      {
        title: "Private Airport Transfers",
        detail: "Arrive or depart in comfort, without the hassle."
      },
      {
        title: "Group Day Trips",
        detail: "Explore Cape Town and beyond with your crew."
      },
      {
        title: "Weekend Getaways",
        detail: "Gather your people, pack your bags, and let us handle the journey."
      },
      {
        title: "Daily Tours & Sightseeing",
        detail: "Discover beautiful destinations with convenient private transportation."
      },
      {
        title: "Private Group Outings",
        detail: "Tailored for birthdays, corporate outings, family adventures, and special occasions."
      }
    ],
    ctaText: "Reserve Group Transfer"
  }
];

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
                  <div className={styles.imageGradient} />
                  {service.badge && (
                    <div className={styles.vehicleBadge}>
                      {service.badgeIcon}
                      <span>{service.badge}</span>
                    </div>
                  )}
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.contentCol}
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className={styles.categoryLabel}>{service.category}</span>
                <h2>{service.title}</h2>
                <p className={styles.description}>{service.description}</p>

                {service.offerings && (
                  <div className={styles.offeringsGrid}>
                    {service.offerings.map((item) => (
                      <div key={item.title} className={styles.offeringCard}>
                        <div className={styles.offeringHeader}>
                          <Check size={15} strokeWidth={1.75} className={styles.check} />
                          <h4>{item.title}</h4>
                        </div>
                        <p>{item.detail}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.features}>
                  {service.features.map(f => (
                    <div key={f} className={styles.feature}>
                      <Check size={16} strokeWidth={1.75} className={styles.check} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <MagneticButton className={styles.ctaBtn} onClick={() => router.push('/contact')}>
                  <span>{service.ctaText || "Inquire Now"}</span>
                  <ArrowUpRight size={16} strokeWidth={1.5} style={{ marginLeft: 8 }} />
                </MagneticButton>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
