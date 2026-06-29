'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '@/lib/content/testimonials';
import { cn } from '@/lib/utils/cn';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.titleContainer}>
          <p className={styles.subtitle}>Endorsements</p>
          <h2 className={styles.title}>What Peers Say</h2>
        </div>

        {/* Testimonials Grid */}
        <div className={styles.grid}>
          {testimonials.map((item, idx) => (
            <div key={idx} className={cn('glass-panel', styles.card)}>
              <Quote size={32} className={styles.quoteIcon} aria-hidden="true" />
              <p className={styles.quoteText}>"{item.quote}"</p>
              
              <div className={styles.authorDetails}>
                <span className={styles.authorName}>{item.author}</span>
                <span className={styles.authorRole}>{item.role}</span>
                <span className={styles.authorOrg}>{item.organization}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
