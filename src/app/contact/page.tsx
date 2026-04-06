"use client";

import { useRef } from "react";
import { PageHero } from "@/components/layout/PageHero";
import styles from "./Contact.module.css";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { SlideButton } from "@/components/ui/SlideButton";
import { BlurReveal } from "@/components/ui/BlurReveal";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <main>
      <PageHero 
        title="Get In Touch" 
        subtitle="Our dedicated luxury travel experts are here to assist you with your next extraordinary journey."
        image="/images/hero-bg.png"
      />
      
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Contact Form */}
            <motion.div 
              className={styles.formCol}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className={styles.formCard}>
                <h2><BlurReveal delay={0.2} stagger={0.1}>Send Us a</BlurReveal> <motion.span className={styles.accent} initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.4, duration: 0.6}}>Message</motion.span></h2>
                <form ref={formRef} action="https://formspree.io/f/xeepnjye" method="POST" className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="John Doe" required />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="john@example.com" required />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" name="subject" required>
                      <option value="">Select a subject</option>
                      <option value="Flight Booking">Flight Booking</option>
                      <option value="Hotel Booking">Hotel Booking</option>
                      <option value="Luxury Homes">Luxury Homes</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" name="message" rows={5} placeholder="Tell us about your dream journey..." required></textarea>
                  </div>
                  
                  <SlideButton 
                    text="Slide to send inquiry"
                    onSlideComplete={() => formRef.current?.submit()} 
                  />
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className={styles.infoCol}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.infoCard}>
                <h3>Contact Information</h3>
                <p>Feel free to reach out to us through any of the following channels. We aim to respond to all inquiries within 2 hours.</p>
                
                <div className={styles.infoItems}>
                  <div className={styles.infoItem}>
                    <div className={styles.iconWrapper}><Mail /></div>
                    <div className={styles.infoText}>
                      <h4>Email Us</h4>
                      <span>hello@icarusflight.agency</span>
                    </div>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <div className={styles.iconWrapper}><Phone /></div>
                    <div className={styles.infoText}>
                      <h4>Call Us</h4>
                      <span>+27 21 000 0000</span>
                    </div>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <div className={styles.iconWrapper}><MapPin /></div>
                    <div className={styles.infoText}>
                      <h4>Visit Our Office</h4>
                      <span>Cape Town, South Africa</span>
                    </div>
                  </div>
                </div>

                <div className={styles.divider} />
                
                <div className={styles.availability}>
                  <div className={styles.statusDot} />
                  <span>Available 24/7 for Elite Members</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
