"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./TestimonialsEditorial.module.css";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "The personalized attention to detail and flawless itinerary completely transformed how we travel. Experiencing the world with Icarus is nothing short of transcendent.",
    author: "Sarah Chen",
    role: "Elite Member",
    company: "Global Ventures",
    image: "https://plus.unsplash.com/premium_photo-1689551671548-79ff30459d2a?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    quote: "We don't just book flights anymore. Icarus provides a true luxury partnership from the moment we leave our doorstep until we return.",
    author: "Marcus Webb",
    role: "Frequent Flyer",
    company: "Webb Architects",
    image: "https://images.unsplash.com/photo-1649123245135-4db6ead931b5?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    quote: "They understand that luxury travel should be seamless and unforgettable. The curated properties are simply stunning.",
    author: "Elena Voss",
    role: "Art Director",
    company: "Voss Studios",
    image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=900&auto=format&fit=crop&q=60",
  },
];

export function TestimonialsEditorial() {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handlePrev = () => {
    const newIndex = active === 0 ? testimonials.length - 1 : active - 1;
    handleChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = active === testimonials.length - 1 ? 0 : active + 1;
    handleChange(newIndex);
  };

  const current = testimonials[active];

  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.span 
            className={styles.subTitle}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.span>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Client Perspectives
          </motion.h2>
        </div>
        <div className={styles.contentWrapper}>
          <span className={styles.indexNumber}>
            {String(active + 1).padStart(2, "0")}
          </span>

          <div className={styles.mainContent}>
            <blockquote
              className={`${styles.quote} ${isTransitioning ? styles.quoteHidden : ""}`}
            >
              &quot;{current.quote}&quot;
            </blockquote>

            <div
              className={`${styles.authorContainer} ${isTransitioning ? styles.authorContainerHidden : ""}`}
            >
              <div className={styles.authorCard}>
                <div className={styles.avatarWrapper}>
                  <Image
                    src={current.image}
                    alt={current.author}
                    fill
                    className={styles.avatarImage}
                  />
                </div>
                <div>
                  <p className={styles.authorName}>{current.author}</p>
                  <p className={styles.authorRole}>
                    {current.role}
                    <span className={styles.separator}>/</span>
                    <span className={styles.company}>{current.company}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.navigation}>
          <div className={styles.linesContainer}>
            <div className={styles.lines}>
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => handleChange(index)} 
                  className={styles.lineBtn}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <span
                    className={`${styles.line} ${index === active ? styles.lineActive : styles.lineInactive}`}
                  />
                </button>
              ))}
            </div>
            <span className={styles.counter}>
              {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>

          <div className={styles.arrows}>
            <button
              onClick={handlePrev}
              className={styles.arrowBtn}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className={styles.arrowBtn}
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
