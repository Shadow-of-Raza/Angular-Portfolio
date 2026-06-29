'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard premium smooth scroll ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll to ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis requestAnimationFrame loop using GSAP's ticker to ensure synchronization
    const handleTicker = (time: number) => {
      // time is in seconds, lenis expects milliseconds
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(handleTicker);

    // Update ScrollTrigger once ready
    ScrollTrigger.update();

    return () => {
      gsap.ticker.remove(handleTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
