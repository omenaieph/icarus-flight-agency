"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Icarus Homes", href: "/homes" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className={clsx(styles.navbar, "glass", isOpen && styles.navbarOpen)}>
        <div className={styles.container}>
          <Link href="/" className={styles.logoWrapper} onClick={closeMenu}>
            <Image 
              src={isOpen ? "/icarus-logo-white.png" : "/icarus-logo-dark.png"} 
              alt="Icarus Flight" 
              width={300} 
              height={150} 
              className={styles.logoIcon} 
              priority 
            />
          </Link>
          
          <div className={styles.links}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={clsx(styles.link, isActive && styles.active)}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className={styles.underline}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className={styles.cta}>
            <Link href="/contact" className={styles.bookBtn}>
              Book Flight
            </Link>
          </div>

          <button 
            className={clsx(styles.hamburger, isOpen && styles.hamburgerOpen)} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>

        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.mobileLinks}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                >
                  <Link 
                    href={link.href} 
                    className={clsx(styles.mobileLink, pathname === link.href && styles.mobileActive)}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2, duration: 0.5 }}
                className={styles.mobileActions}
              >
                <Link href="/contact" className={styles.mobileBookBtn} onClick={closeMenu}>
                  Book Flight
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
