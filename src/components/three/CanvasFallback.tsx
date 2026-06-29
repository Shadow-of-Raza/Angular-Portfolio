'use client';

import React from 'react';
import styles from './CanvasFallback.module.css';

export default function CanvasFallback() {
  return (
    <div className={styles.container} aria-hidden="true">
      {/* Navy gradient floating orb */}
      <div className={styles.orbNavy}></div>

      {/* Gold gradient floating orb */}
      <div className={styles.orbGold}></div>
      
      {/* Minimal grid grid overlay for premium luxury tech texture */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      ></div>
    </div>
  );
}
