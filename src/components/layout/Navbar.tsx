'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import { personalInfo } from '@/lib/content/profile';
import { cn } from '@/lib/utils/cn';
import styles from './Navbar.module.css';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll for header background morph
  useEffect(() => {
    const handleScroll = () => {
      // Morph to glass panel after scrolling 96px (space-7)
      setIsScrolled(window.scrollY > 96);

      // Simple active section detection based on scroll position
      const scrollPosition = window.scrollY + 120; // offset for nav height
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle focus trap for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const menuElement = menuRef.current;
    if (!menuElement) return;

    const focusableElements = menuElement.querySelectorAll(
      'a[href], button:not([disabled])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus the first element initially
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab: loop to end
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab: loop to start
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      } else if (e.key === 'Escape') {
        // Escape closes menu
        setMobileMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Scroll to element natively or via Lenis window helper
      const yOffset = -80; // nav height offset
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <>
      <header className={cn(styles.header, isScrolled && styles.scrolled)}>
        {/* Wordmark logo */}
        <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {personalInfo.name.split(' ')[0]} <span className={styles.logoSpan}>{personalInfo.name.split(' ').slice(1).join(' ')}</span>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={cn(
                    styles.navLink,
                    activeSection === item.id && styles.activeLink
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button */}
        <div className={styles.desktopNav}>
          <a href={personalInfo.resumePdf} target="_blank" rel="noopener noreferrer">
            <button className={styles.resumeBtn} type="button">
              <Download size={16} aria-hidden="true" />
              Résumé
            </button>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          ref={hamburgerRef}
          className={cn(styles.hamburger, mobileMenuOpen && styles.hamburgerOpen)}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </header>

      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
          >
            <nav>
              <ul className={styles.mobileNavList}>
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={cn(
                        styles.mobileNavLink,
                        activeSection === item.id && styles.mobileActiveLink
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a href={personalInfo.resumePdf} target="_blank" rel="noopener noreferrer" style={{ width: '100%', maxWidth: '200px' }}>
              <button className={styles.resumeBtn} type="button" style={{ width: '100%', justifyContent: 'center' }}>
                <Download size={16} aria-hidden="true" />
                Résumé
              </button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
