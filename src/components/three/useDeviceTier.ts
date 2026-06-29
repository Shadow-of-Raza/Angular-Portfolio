'use client';

import { useState, useEffect } from 'react';

export type QualityTier = 'high' | 'medium' | 'low' | 'fallback';

export function useDeviceTier(): QualityTier {
  const [tier, setTier] = useState<QualityTier>('medium'); // Default safe mid-tier

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Check prefers-reduced-motion -> Hard fallback to CSS
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTier('fallback');
      return;
    }

    // 2. Check WebGL support -> If absent, fallback to CSS
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch (e) {
        return false;
      }
    })();

    if (!hasWebGL) {
      setTier('fallback');
      return;
    }

    // 3. Heuristic GPU/Performance check
    const cores = navigator.hardwareConcurrency || 4;
    
    // Check mobile userAgent
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      // Mobile devices are restricted to low or medium depending on cores
      setTier(cores >= 8 ? 'medium' : 'low');
    } else {
      // Desktop devices
      if (cores < 4) {
        setTier('low');
      } else if (cores < 8) {
        setTier('medium');
      } else {
        setTier('high');
      }
    }
  }, []);

  return tier;
}
