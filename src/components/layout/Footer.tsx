"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logoWrapper}>
            <Image src="/icarus-logo-white.png" alt="Icarus Flight" width={300} height={150} className={styles.logoIcon} />
          </Link>
          <p className={styles.tagline}>
            Transcend boundaries with premium travel experiences and curated luxury stays across Africa and beyond.
          </p>
          <div className={styles.socials}>
            {/* Social icons removed due to missing icons in lucide-react version */}
          </div>
        </div>

        <div className={styles.linksGrid}>
          <div className={styles.linkGroup}>
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/services">Our Services</Link>
            <Link href="/contact">Careers</Link>
            <Link href="/contact">Media Kit</Link>
          </div>
          <div className={styles.linkGroup}>
            <h4>Travel</h4>
            <Link href="/services">Flights</Link>
            <Link href="/homes">Luxury Stays</Link>
            <Link href="/services">Visas</Link>
            <Link href="/services">Packages</Link>
          </div>
          <div className={styles.linkGroup}>
            <h4>Support</h4>
            <Link href="/contact">Contact Us</Link>
            <Link href="/contact">FAQs</Link>
            <Link href="/contact">Privacy Policy</Link>
            <Link href="/contact">Terms of Service</Link>
          </div>
        </div>

        <div className={styles.contact}>
          <h4>Get In Touch</h4>
          <div className={styles.contactItem}>
            <Mail size={18} />
            <span>hello@icarusflight.agency</span>
          </div>
          <div className={styles.contactItem}>
            <Phone size={18} />
            <span>+27 21 000 0000</span>
          </div>
          <div className={styles.contactItem}>
            <MapPin size={18} />
            <span>Cape Town, South Africa</span>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Icarus Flight Agency. All rights reserved.</p>
        <p>Built for the elite traveler.</p>
      </div>
    </footer>
  );
}
