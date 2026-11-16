"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./DestinationGallery.module.css";
import { motion } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Plane,
  CarFront,
  BedDouble,
  Utensils,
  Compass,
  Headset,
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { useRouter } from "next/navigation";

const destinations = [
  {
    id: 1,
    name: "Accra, Ghana",
    price: "₦1,500,000",
    deposit: "₦600,000 deposit",
    badge: "Group Trip • Limited Spaces",
    duration: "17 – 20 Dec 2026",
    image: "/images/Black Star Gate Accra.jpg",
    inclusions: [
      { icon: Plane, label: "RT Flights-EX LOS" },
      { icon: CarFront, label: "RT Airport Transfers" },
      { icon: BedDouble, label: "Hotel Stay" },
      { icon: Utensils, label: "Daily Breakfast" },
      { icon: Compass, label: "Guided City Tour" },
      { icon: Headset, label: "24x7 Support" }
    ]
  },
  {
    id: 2,
    name: "Brazil",
    price: "R38,900",
    duration: "08 Nights - 09 Days",
    image: "/images/Christ the Redeemer.jpg",
    inclusions: [
      { icon: Plane, label: "Flights-EX JNB" },
      { icon: CarFront, label: "RT Airport Transfers" },
      { icon: BedDouble, label: "Hotel Stay" },
      { icon: Utensils, label: "Breakfast" },
      { icon: Compass, label: "Tours per itinerary" },
      { icon: Headset, label: "24x7 Support" }
    ]
  },
  {
    id: 3,
    name: "Egypt",
    price: "R39,650",
    duration: "11 Nights - 12 Days",
    image: "/images/Karnak Temple.jpg",
    inclusions: [
      { icon: Plane, label: "Flights-EX JNB" },
      { icon: CarFront, label: "RT Airport Transfers" },
      { icon: BedDouble, label: "Hotel Stay" },
      { icon: Utensils, label: "Breakfast" },
      { icon: Compass, label: "Tours per itinerary" },
      { icon: Headset, label: "24x7 Support" }
    ]
  },
  {
    id: 4,
    name: "Hong Kong",
    price: "R29,590",
    duration: "05 Nights - 06 Days",
    image: "/images/Victoria Harbour Junk Boat.jpg",
    inclusions: [
      { icon: Plane, label: "Flights-EX JNB" },
      { icon: CarFront, label: "RT Airport Transfers" },
      { icon: BedDouble, label: "Hotel Stay" },
      { icon: Utensils, label: "Breakfast" },
      { icon: Compass, label: "Tours per itinerary" },
      { icon: Headset, label: "24x7 Support" }
    ]
  },
  {
    id: 5,
    name: "Madagascar",
    price: "R10,565",
    duration: "05 Nights - 06 Days",
    image: "/images/Avenue of the Baobabs.jpg",
    inclusions: [
      { icon: CarFront, label: "RT Airport Transfers" },
      { icon: BedDouble, label: "Hotel Stay" },
      { icon: Utensils, label: "Breakfast" },
      { icon: Compass, label: "Tours per itinerary" },
      { icon: Headset, label: "24x7 Support" }
    ]
  }
];

export function DestinationGallery() {
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < maxScroll - 8);
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.querySelector(`.${styles.cardSlide}`) as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 24 : 360;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.gallerySection}>
      <div className={styles.headerContainer}>
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

        <div className={styles.carouselControls}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
            aria-label="Previous destination"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => scrollByCard("right")}
            disabled={!canScrollRight}
            aria-label="Next destination"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.carouselViewport}>
        <div
          ref={trackRef}
          className={styles.carouselTrack}
          data-lenis-prevent-horizontal
        >
          {destinations.map((dest, index) => (
            <motion.div 
              key={dest.id}
              className={styles.cardSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{ perspective: 1000 }}
            >
              <TiltCard className={styles.card}>
                <div className={styles.imageWrapper} style={{ transform: "translateZ(30px)" }}>
                  <Image 
                    src={dest.image} 
                    alt={dest.name} 
                    className={styles.image} 
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 25vw"
                  />
                  {dest.badge && (
                    <div className={styles.featuredBadge}>
                      <Users size={12} strokeWidth={1.5} />
                      <span>{dest.badge}</span>
                    </div>
                  )}
                  <div className={styles.durationPill}>
                    <Calendar size={12} strokeWidth={1.5} />
                    <span>{dest.duration}</span>
                  </div>
                </div>
                
                <div className={styles.details} style={{ transform: "translateZ(40px)" }}>
                  <div className={styles.topInfo}>
                    <div className={styles.location}>
                      <MapPin size={16} strokeWidth={1.5} />
                      <span>{dest.name}</span>
                    </div>
                    <div className={styles.priceGroup}>
                      <div className={styles.price}>{dest.price}</div>
                      {dest.deposit && (
                        <span className={styles.depositTag}>{dest.deposit}</span>
                      )}
                    </div>
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
      </div>

      <div className={styles.footerBar}>
        <div className={styles.progressTrack} aria-hidden="true">
          <div
            className={styles.progressFill}
            style={{ transform: `scaleX(${Math.max(0.2, scrollProgress)})` }}
          />
        </div>
        <button className={styles.viewMoreBtn} onClick={() => router.push('/contact')}>
          View All Destinations
        </button>
      </div>
    </section>
  );
}
