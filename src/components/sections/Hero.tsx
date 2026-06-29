'use client';

import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo, homeContent } from '@/lib/content/profile';
import styles from './Hero.module.css';

export default function Hero() {
  const [text, setText] = useState('');
  const [titleIdx, setTitleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingTitles = homeContent.typingTitles;

  // Custom typing animation loop
  useEffect(() => {
    const currentFullText = typingTitles[titleIdx];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentFullText.substring(0, text.length - 1));
      }, 50); // fast deletion speed
    } else {
      timer = setTimeout(() => {
        setText(currentFullText.substring(0, text.length + 1));
      }, 100); // typing speed
    }

    // Toggle states at end of word or complete deletion
    if (!isDeleting && text === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // pause at full word
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % typingTitles.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, titleIdx, typingTitles]);

  const handleScrollCue = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const yOffset = -80; // offset nav
      const y = aboutSection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.hero}>
      {/* Hero texts overlay */}
      <div className={styles.content}>
        <motion.p
          className={styles.intro}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {personalInfo.title}
        </motion.p>
        
        <motion.h1
          className={styles.name}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
        >
          Hello, my name is <span>{personalInfo.name}</span>
        </motion.h1>
        
        <motion.div
          className={styles.role}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        >
          I'm a {text}
          <span className={styles.cursor}>|</span>
        </motion.div>
        
        <motion.p
          className={styles.brief}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {homeContent.briefIntro}
        </motion.p>
      </div>

      {/* Accessibility scroll cue */}
      <motion.a
        href="#about"
        onClick={handleScrollCue}
        className={styles.scrollCue}
        aria-label="Scroll down to About section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <span>About Me</span>
        <ArrowDown size={16} className={styles.scrollCueIcon} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
