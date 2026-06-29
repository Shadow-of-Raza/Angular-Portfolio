'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 96);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(styles.header, isScrolled && styles.scrolled)}>
      {/* Empty space reserved for future logo */}
      <div className={styles.logoPlaceholder} />
    </header>
  );
}
