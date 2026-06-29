'use client';

import React, { useEffect, useState } from 'react';
import { skills } from '@/lib/content/experience';
import { cn } from '@/lib/utils/cn';
import styles from './Skills.module.css';

export default function Skills() {
  const [animate, setAnimate] = useState(false);

  // Trigger animation of skill fills after component loads
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Filter skills into categories
  const backendSkills = skills.filter((skill) =>
    ['java', 'spring', 'hibernate', 'jdbc', 'j2ee', 'jsp', 'sql'].some((keyword) =>
      skill.name.toLowerCase().includes(keyword)
    )
  );

  const frontendSkills = skills.filter((skill) =>
    !['java', 'spring', 'hibernate', 'jdbc', 'j2ee', 'jsp', 'sql'].some((keyword) =>
      skill.name.toLowerCase().includes(keyword)
    )
  );

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
          {/* Backend Skills Card */}
          <div className={cn('glass-panel', styles.categoryCard)}>
            <h3 className={styles.categoryTitle}>Backend & Database</h3>
            <div className={styles.skillsList}>
              {backendSkills.map((skill, idx) => (
                <div key={idx} className={styles.skillItem}>
                  <div className={styles.skillMeta}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillPercent}>{skill.levelPercentage}%</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div
                      className={styles.progressBarFill}
                      style={{
                        width: animate ? `${skill.levelPercentage}%` : '0%',
                      }}
                      role="progressbar"
                      aria-valuenow={skill.levelPercentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name} proficiency`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frontend Skills Card */}
          <div className={cn('glass-panel', styles.categoryCard)}>
            <h3 className={styles.categoryTitle}>Frontend & Styling</h3>
            <div className={styles.skillsList}>
              {frontendSkills.map((skill, idx) => (
                <div key={idx} className={styles.skillItem}>
                  <div className={styles.skillMeta}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillPercent}>{skill.levelPercentage}%</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div
                      className={styles.progressBarFill}
                      style={{
                        width: animate ? `${skill.levelPercentage}%` : '0%',
                      }}
                      role="progressbar"
                      aria-valuenow={skill.levelPercentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name} proficiency`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
