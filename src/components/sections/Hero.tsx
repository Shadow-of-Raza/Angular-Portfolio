'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown } from 'lucide-react';
import { personalInfo, homeContent } from '@/lib/content/profile';
import CanvasFallback from '../three/CanvasFallback';
import styles from './Hero.module.css';

const HeroCanvas = dynamic(() => import('../three/HeroCanvas'), {
  ssr: false,
  loading: () => <CanvasFallback />,
});

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
      {/* 3D WebGL centerpiece container */}
      <HeroCanvas />

      {/* Hero texts overlay */}
      <div className={styles.content}>
        <p className={styles.intro}>{personalInfo.title}</p>
        <h1 className={styles.name}>
          Hello, my name is <span>{personalInfo.name}</span>
        </h1>
        <div className={styles.role}>
          I'm a {text}
          <span className={styles.cursor}>|</span>
        </div>
        <p className={styles.brief}>{homeContent.briefIntro}</p>
      </div>

      {/* Accessibility scroll cue */}
      <a href="#about" onClick={handleScrollCue} className={styles.scrollCue} aria-label="Scroll down to About section">
        <span>About Me</span>
        <ArrowDown size={16} className={styles.scrollCueIcon} aria-hidden="true" />
      </a>
    </section>
  );
}
