'use client';

import React from 'react';
import { skills } from '@/lib/content/experience';
import { cn } from '@/lib/utils/cn';
import styles from './Skills.module.css';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Languages',
      list: skills.languages,
    },
    {
      title: 'Frameworks & Libraries',
      list: skills.frameworks,
    },
    {
      title: 'Databases & Querying',
      list: skills.databases,
    },
    {
      title: 'Cloud & DevOps',
      list: skills.cloud,
    },
    {
      title: 'Core Concepts',
      list: skills.concepts,
    },
    {
      title: 'Development Tools & OS',
      list: [...skills.tools, ...skills.operatingSystems],
    },
  ];

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.titleContainer}>
          <p className={styles.subtitle}>Superpowers</p>
          <h2 className={styles.title}>Technical Skills</h2>
        </div>

        {/* Categories Grid */}
        <div className={styles.grid}>
          {skillCategories.map((category, idx) => (
            <div key={idx} className={cn('glass-panel', styles.categoryCard)}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <ul className={styles.tagList}>
                {category.list.map((item, itemIdx) => (
                  <li key={itemIdx} className={styles.tagItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
