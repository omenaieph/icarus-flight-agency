"use client";

import { useState } from "react";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import styles from "./Homes.module.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRouter } from "next/navigation";

interface PropertyItem {
  id: number;
  name: string;
  location: string;
  price: string;
  images: string[];
  bedrooms: number;
  beds: number;
  baths: number | string;
  guests: number;
  description: string;
  rating: string;
  reviews: number;
  highlights: string[];
  amenities: string[];
  airbnbUrl: string;
}

const properties: PropertyItem[] = [
  {
    id: 1,
    name: "Tiny Home Oasis | 1BDRM",
    location: "Bloubergstrand, Cape Town",
    price: "R 1,600 / night",
    images: [
      "/images/homes/tiny-home-1.jpg",
      "/images/homes/tiny-home-2.jpg",
      "/images/homes/tiny-home-3.jpg",
      "/images/homes/tiny-home-4.jpg",
      "/images/homes/tiny-home-5.jpg",
      "/images/homes/tiny-home-6.jpg",
    ],
    bedrooms: 1,
    beds: 1,
    baths: 1,
    guests: 2,
    description:
      "Escape to this serene one-bedroom tiny home, perfectly nestled in the picturesque Bloubergstrand area of Cape Town. A bright and vibrant abode that exudes warmth and charm, featuring a private patio with outdoor seating and shared beach access.",
    rating: "4.87",
    reviews: 23,
    highlights: [
      "Bloubergstrand coastal area",
      "Private patio & outdoor seating",
      "Hosted by Esther — Icarus Homes",
    ],
    amenities: [
      "Shared Beach Access",
      "Full Kitchen",
      "Fast WiFi & Workspace",
      "Free Driveway Parking",
      "Washing Machine",
      "Private Patio",
    ],
    airbnbUrl:
      "https://www.airbnb.co.uk/rooms/1267579370220903484?unique_share_id=dc4e768e-7da4-44cb-8140-cc71d8cd290b&viralityEntryPoint=1&s=76",
  },
  {
    id: 2,
    name: "Luxe 1BR Apt | Pool | Table Mountain View | Gym",
    location: "Cape Town City Centre",
    price: "R 2,860 / night",
    images: [
      "/images/homes/luxe-apt-1.jpg",
      "/images/homes/luxe-apt-2.jpg",
      "/images/homes/luxe-apt-3.png",
      "/images/homes/luxe-apt-4.jpg",
      "/images/homes/luxe-apt-5.jpg",
      "/images/homes/luxe-apt-6.jpg",
    ],
    bedrooms: 1,
    beds: 2,
    baths: 1.5,
    guests: 2,
    description:
      "Modern 1-bedroom apartment in the heart of Cape Town with stunning Table Mountain views. Perfect for couples, solo travellers, and business guests seeking a peaceful stay with a rooftop skyline pool, building gym, and fast WiFi steps from top cafés and attractions.",
    rating: "4.85",
    reviews: 19,
    highlights: [
      "Table Mountain & skyline views",
      "Rooftop pool & building gym",
      "Central CBD location",
    ],
    amenities: [
      "Table Mountain View",
      "Rooftop Pool Access",
      "Building Gym",
      "Fully Equipped Kitchen",
      "Fast WiFi & Workspace",
      "Smart TV",
    ],
    airbnbUrl:
      "https://www.airbnb.co.uk/rooms/1110971898522945691?unique_share_id=e01e0baf-737d-4ae5-8cd9-1957a4e2f9d0&viralityEntryPoint=1&s=76",
  },
  {
    id: 3,
    name: "Cozy Home W/City & Harbour Views in District Six",
    location: "District Six, Cape Town",
    price: "R 4,120 / night",
    images: [
      "/images/homes/district-six-1.jpg",
      "/images/homes/district-six-2.jpg",
      "/images/homes/district-six-3.jpg",
      "/images/homes/district-six-4.jpg",
      "/images/homes/district-six-5.jpg",
      "/images/homes/district-six-6.jpg",
    ],
    bedrooms: 1,
    beds: 1,
    baths: 1,
    guests: 2,
    description:
      "Step into a piece of Cape Town's rich history with this charming, character-filled cottage in the heart of District Six. Blending old-world charm and modern convenience just minutes from the CBD and V&A Waterfront, complete with sunrise harbour views from your private patio.",
    rating: "4.89",
    reviews: 18,
    highlights: [
      "Sunrise harbour & bay views",
      "Smeg kitchen with gas stove",
      "Private garage parking",
    ],
    amenities: [
      "Harbour & Bay Views",
      "Smeg Gas Kitchen",
      "Private Garage",
      "55\" HDTV with Netflix",
      "Private View Patio",
      "Fast WiFi & Workspace",
    ],
    airbnbUrl:
      "https://www.airbnb.co.uk/rooms/749180771299176556?unique_share_id=b3417205-9b5b-4aef-8dcc-35ee1873c14d&viralityEntryPoint=1&s=76",
  },
];

function PropertyRow({
  property,
  index,
}: {
  property: PropertyItem;
  index: number;
}) {
  const router = useRouter();
  const [activePhoto, setActivePhoto] = useState(0);
  const isReversed = index % 2 !== 0;

  const prevPhoto = () => {
    setActivePhoto(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  };

  const nextPhoto = () => {
    setActivePhoto((prev) => (prev + 1) % property.images.length);
  };

  return (
    <motion.div
      className={`${styles.card} ${isReversed ? styles.cardReverse : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className={styles.imageCol}>
        <div className={styles.mainImageStage}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhoto}
              className={styles.imageSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Image
                src={property.images[activePhoto]}
                alt={`${property.name} — photo ${activePhoto + 1}`}
                className={styles.image}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0 && activePhoto === 0}
              />
            </motion.div>
          </AnimatePresence>

          <div className={styles.photoCounter}>
            {activePhoto + 1} / {property.images.length}
          </div>

          <div className={styles.galleryControls}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={prevPhoto}
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className={styles.navBtn}
              onClick={nextPhoto}
              aria-label="Next photo"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className={styles.thumbnailStrip}>
          {property.images.map((imgSrc, thumbIdx) => (
            <button
              key={imgSrc}
              type="button"
              className={`${styles.thumbnailBtn} ${
                thumbIdx === activePhoto ? styles.thumbnailActive : ""
              }`}
              onClick={() => setActivePhoto(thumbIdx)}
              aria-label={`Select photo ${thumbIdx + 1}`}
            >
              <Image
                src={imgSrc}
                alt={`${property.name} thumbnail ${thumbIdx + 1}`}
                fill
                sizes="90px"
                className={styles.thumbnailImg}
              />
            </button>
          ))}
        </div>
      </div>

      <div className={styles.contentCol}>
        <div className={styles.metaTopRow}>
          <div className={styles.locationBadge}>
            <MapPin size={14} strokeWidth={1.5} />
            <span>{property.location}</span>
          </div>

          <div className={styles.ratingBadge}>
            <Star size={15} fill="currentColor" />
            <span>{property.rating}</span>
            <span className={styles.reviews}>({property.reviews} reviews)</span>
          </div>
        </div>

        <h3 className={styles.propertyName}>{property.name}</h3>

        <div className={styles.statsList}>
          <span>
            {property.bedrooms}{" "}
            {property.bedrooms > 1 ? "Bedrooms" : "Bedroom"}
          </span>
          <span className={styles.dot}>•</span>
          <span>
            {property.beds} {property.beds > 1 ? "Beds" : "Bed"}
          </span>
          <span className={styles.dot}>•</span>
          <span>
            {property.baths} {Number(property.baths) > 1 ? "Baths" : "Bath"}
          </span>
          <span className={styles.dot}>•</span>
          <span>Up to {property.guests} Guests</span>
        </div>

        <div className={styles.price}>{property.price}</div>

        <p className={styles.description}>{property.description}</p>

        <div className={styles.highlightsContainer}>
          {property.highlights.map((highlight, idx) => (
            <span key={idx} className={styles.highlightBadge}>
              {highlight}
            </span>
          ))}
        </div>

        <div className={styles.amenitiesGrid}>
          {property.amenities.map((amenity, idx) => (
            <div key={idx} className={styles.amenityItem}>
              <Check size={15} strokeWidth={1.75} className={styles.amenityCheck} />
              <span>{amenity}</span>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <MagneticButton
            className={styles.bookBtn}
            onClick={() => router.push("/contact")}
          >
            Inquire to Book <ArrowRight size={16} strokeWidth={1.5} />
          </MagneticButton>
          <a
            href={property.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
          >
            <span>View on Airbnb</span>
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomesPage() {
  return (
    <main>
      <PageHero 
        title="Icarus Homes" 
        subtitle="Carefully curated properties in Cape Town for the elite traveler."
        image="/images/homes/luxe-apt-2.jpg"
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
              Explore our signature collection of short-term luxury stays across Cape Town, hosted by Icarus Homes.
            </motion.p>
          </div>

          <div className={styles.list}>
            {properties.map((property, index) => (
              <PropertyRow
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
