'use client';

import React from 'react';
import { Laptop, Code, Cpu, Terminal, Zap, Users, HelpCircle, MessageSquare } from 'lucide-react';
import { personalInfo, aboutContent } from '@/lib/content/profile';
import { cn } from '@/lib/utils/cn';
import styles from './About.module.css';

// Map icon strings to Lucide components
const getWhatIDoIcon = (iconName: string) => {
  switch (iconName) {
    case 'fa-solid fa-laptop-code':
      return <Laptop size={20} />;
    case 'fa-solid fa-code':
      return <Code size={20} />;
    case 'fa-solid fa-microchip':
      return <Cpu size={20} />;
    case 'fa-solid fa-file-code':
      return <Terminal size={20} />;
    default:
      return <Code size={20} />;
  }
};

const getCompetencyIcon = (iconName: string) => {
  switch (iconName) {
    case 'fa-solid fa-bolt':
      return <Zap size={16} />;
    case 'fas fa-users':
      return <Users size={16} />;
    case 'fas fa-question-circle':
      return <HelpCircle size={16} />;
    case 'fa-solid fa-comments':
      return <MessageSquare size={16} />;
    default:
      return <Zap size={16} />;
  }
};

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.titleContainer}>
          <p className={styles.subtitle}>Discover</p>
          <h2 className={styles.title}>About Me</h2>
        </div>

        {/* Bio & What I Do */}
        <div className={styles.grid}>
          {/* Left Column: Biography */}
          <div className={cn('glass-panel', styles.bioCard)}>
            <h3 className={styles.welcome}>{aboutContent.welcomeMessage}</h3>
            <p className={styles.bio}>{aboutContent.bio}</p>
            
            {/* Direct Info List */}
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <strong>Location:</strong> {personalInfo.location.city}, {personalInfo.location.state}
              </li>
              <li className={styles.infoItem}>
                <strong>Birthday:</strong> {personalInfo.birthday}
              </li>
              <li className={styles.infoItem}>
                <strong>Email:</strong> <span>{personalInfo.email}</span>
              </li>
              <li className={styles.infoItem}>
                <strong>Phone:</strong> {personalInfo.phone}
              </li>
            </ul>
          </div>

          {/* Right Column: What I'm Doing */}
          <div className={styles.rightColumn}>
            <h3 className={styles.welcome} style={{ paddingLeft: '8px' }}>What I'm Doing</h3>
            <div className={styles.cardsGrid}>
              {aboutContent.whatIDo.map((item, idx) => (
                <div key={idx} className={cn('glass-panel', styles.doingCard)}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                      {getWhatIDoIcon(item.icon)}
                    </div>
                    <h4 className={styles.cardTitle}>{item.title}</h4>
                  </div>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competencies Section */}
        <div className={styles.competenciesSection}>
          <h3 className={styles.competencyTitle}>Competencies</h3>
          <div className={styles.competenciesGrid}>
            {aboutContent.competencies.map((item, idx) => (
              <div key={idx} className={cn('glass-panel', styles.compCard)}>
                <div className={styles.compHeader}>
                  <div className={styles.compIconWrapper}>
                    {getCompetencyIcon(item.icon)}
                  </div>
                  <h4 className={styles.compTitle}>{item.title}</h4>
                </div>
                <p className={styles.compDesc}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Languages & Interests */}
        <div className={styles.extraSection}>
          {/* Languages */}
          <div className={styles.extraBlock}>
            <h3 className={styles.extraTitle}>Languages</h3>
            <ul className={styles.tagList}>
              {aboutContent.languages.map((lang) => (
                <li key={lang} className={styles.tagItem}>
                  {lang}
                </li>
              ))}
            </ul>
          </div>

          {/* Interests */}
          <div className={styles.extraBlock}>
            <h3 className={styles.extraTitle}>Interests</h3>
            <ul className={styles.tagList}>
              {aboutContent.interests.map((interest) => (
                <li key={interest} className={styles.tagItem}>
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
