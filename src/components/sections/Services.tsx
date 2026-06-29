'use client';

import React from 'react';
import { Layers, Monitor, Users, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import styles from './Services.module.css';

const pillars = [
  {
    icon: <Layers size={24} />,
    title: 'Clean Architecture',
    description: 'Designing robust backend structures using Spring Boot, Hibernate, and REST APIs, ensuring scale and clean separation of concerns.',
  },
  {
    icon: <Monitor size={24} />,
    title: 'Interactive Interfaces',
    description: 'Crafting fluid, highly responsive, and accessible UI layouts in Angular, React, and Next.js utilizing standard animations.',
  },
  {
    icon: <Users size={24} />,
    title: 'Agile & Team-First',
    description: 'Active collaboration within Scrum teams, prioritizing effective communication, pull-request reviews, and clear documentation.',
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Quality Assurance',
    description: 'Upholding code quality through automated unit testing, strict type systems (TypeScript/Java), and clean code refactoring.',
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.titleContainer}>
          <p className={styles.subtitle}>Methodology</p>
          <h2 className={styles.title}>Professional Pillars</h2>
        </div>

        {/* Pillars Grid */}
        <div className={styles.grid}>
          {pillars.map((item, idx) => (
            <div key={idx} className={cn('glass-panel', styles.card)}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
