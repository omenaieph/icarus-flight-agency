"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./IcarusHomesSnippet.module.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  KeyRound,
  BedDouble,
  Bath,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRouter } from "next/navigation";

interface HomeListing {
  id: number;
  name: string;
  location: string;
  price: string;
  rating: string;
  images: string[];
  beds: number;
  baths: number | string;
  guests: number;
  description: string;
  airbnbUrl: string;
}

const listings: HomeListing[] = [
  {
    id: 1,
    name: "Tiny Home Oasis | 1BDRM",
    location: "Bloubergstrand, Cape Town",
    price: "R 1,600 / night",
    rating: "4.87",
    images: [
      "/images/homes/tiny-home-1.jpg",
      "/images/homes/tiny-home-2.jpg",
      "/images/homes/tiny-home-3.jpg",
      "/images/homes/tiny-home-4.jpg",
      "/images/homes/tiny-home-5.jpg",
      "/images/homes/tiny-home-6.jpg",
    ],
    beds: 1,
    baths: 1,
    guests: 2,
    description:
      "Escape to this serene one-bedroom tiny home nestled in picturesque Bloubergstrand. Features a private patio with outdoor seating, shared beach access, and dedicated driveway parking.",
    airbnbUrl:
      "https://www.airbnb.co.uk/rooms/1267579370220903484?unique_share_id=dc4e768e-7da4-44cb-8140-cc71d8cd290b&viralityEntryPoint=1&s=76",
  },
  {
    id: 2,
    name: "Luxe 1BR Apt | Table Mountain View",
    location: "Cape Town City Centre",
    price: "R 2,860 / night",
    rating: "4.85",
    images: [
      "/images/homes/luxe-apt-1.jpg",
      "/images/homes/luxe-apt-2.jpg",
      "/images/homes/luxe-apt-3.png",
      "/images/homes/luxe-apt-4.jpg",
      "/images/homes/luxe-apt-5.jpg",
      "/images/homes/luxe-apt-6.jpg",
    ],
    beds: 2,
    baths: 1.5,
    guests: 2,
    description:
      "Modern 1-bedroom apartment in the heart of Cape Town with stunning Table Mountain views, access to a skyline rooftop pool and building gym, fast WiFi, and a fully equipped kitchen.",
    airbnbUrl:
      "https://www.airbnb.co.uk/rooms/1110971898522945691?unique_share_id=e01e0baf-737d-4ae5-8cd9-1957a4e2f9d0&viralityEntryPoint=1&s=76",
  },
  {
    id: 3,
    name: "Cozy Home W/City & Harbour Views",
    location: "District Six, Cape Town",
    price: "R 4,120 / night",
    rating: "4.89",
    images: [
      "/images/homes/district-six-1.jpg",
      "/images/homes/district-six-2.jpg",
      "/images/homes/district-six-3.jpg",
      "/images/homes/district-six-4.jpg",
      "/images/homes/district-six-5.jpg",
      "/images/homes/district-six-6.jpg",
    ],
    beds: 1,
    baths: 1,
    guests: 2,
    description:
      "Character-filled heritage cottage in the heart of District Six offering old-world charm and modern luxury, a private patio overlooking the bay and harbour, Smeg kitchen, and private garage.",
    airbnbUrl:
      "https://www.airbnb.co.uk/rooms/749180771299176556?unique_share_id=b3417205-9b5b-4aef-8dcc-35ee1873c14d&viralityEntryPoint=1&s=76",
  },
];

function HomeSnippetCard({
  listing,
  index,
}: {
  listing: HomeListing;
  index: number;
}) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(
      (prev) => (prev - 1 + listing.images.length) % listing.images.length
    );
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % listing.images.length);
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <div className={styles.imageWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className={styles.imageSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Image
              src={listing.images[activeIndex]}
              alt={`${listing.name} — photo ${activeIndex + 1}`}
              className={styles.image}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        <div className={styles.premiumBadge}>
          <KeyRound size={13} strokeWidth={1.5} />
          <span>Icarus Homes</span>
        </div>

        <div className={styles.ratingPill}>
          <Star size={12} fill="#FFA534" stroke="#FFA534" />
          <span>{listing.rating}</span>
        </div>

        <div className={styles.galleryControls}>
          <button
            type="button"
            className={styles.galleryNavBtn}
            onClick={prevPhoto}
            aria-label="Previous property photo"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className={styles.galleryNavBtn}
            onClick={nextPhoto}
            aria-label="Next property photo"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className={styles.dotsBar}>
          {listing.images.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              className={`${styles.dot} ${
                dotIdx === activeIndex ? styles.activeDot : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(dotIdx);
              }}
              aria-label={`View photo ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.locationRow}>
          <MapPin size={13} strokeWidth={1.5} />
          <span>{listing.location}</span>
        </div>

        <div className={styles.topInfo}>
          <div className={styles.propertyName}>
            <span>{listing.name}</span>
          </div>
          <div className={styles.price}>{listing.price}</div>
        </div>

        <div className={styles.amenities}>
          <div className={styles.amenityItem}>
            <BedDouble size={16} strokeWidth={1.5} />{" "}
            <span>
              {listing.beds} {listing.beds > 1 ? "Beds" : "Bed"}
            </span>
          </div>
          <div className={styles.amenityItem}>
            <Bath size={16} strokeWidth={1.5} />{" "}
            <span>
              {listing.baths} {Number(listing.baths) > 1 ? "Baths" : "Bath"}
            </span>
          </div>
          <div className={styles.amenityItem}>
            <Users size={16} strokeWidth={1.5} /> <span>{listing.guests} Guests</span>
          </div>
        </div>

        <p className={styles.description}>{listing.description}</p>

        <MagneticButton
          className={styles.bookBtn}
          onClick={() => router.push("/homes")}
        >
          Explore Property <ArrowRight size={16} strokeWidth={1.5} />
        </MagneticButton>
      </div>
    </motion.div>
  );
}

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
          <HomeSnippetCard key={listing.id} listing={listing} index={index} />
        ))}
      </div>
      
      <div className={styles.viewAll}>
        <button className={styles.viewMoreBtn} onClick={() => router.push('/homes')}>View All Properties</button>
      </div>
    </section>
  );
}

