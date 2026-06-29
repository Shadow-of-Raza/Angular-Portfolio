'use client';

import React from 'react';
import { Briefcase, GraduationCap, Download, Calendar, MapPin } from 'lucide-react';
import { personalInfo } from '@/lib/content/profile';
import { experiences, education } from '@/lib/content/experience';
import { cn } from '@/lib/utils/cn';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.titleContainer}>
          <p className={styles.subtitle}>Journey</p>
          <h2 className={styles.title}>Resume & History</h2>
        </div>

        {/* Timelines Grid */}
        <div className={styles.grid}>
          {/* Left Column: Professional Experience */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <Briefcase size={22} className={styles.headerIcon} />
              <h3 className={styles.columnTitle}>Professional Experience</h3>
            </div>
            
            <div className={styles.timeline}>
              {experiences.map((exp, idx) => (
                <div key={idx} className={styles.timelineItem}>
                  {/* Timeline indicator node */}
                  <div className={styles.timelineNode}></div>

                  {/* Experience Card */}
                  <div className={cn('glass-panel', styles.card)}>
                    <h4 className={styles.itemRole}>{exp.role}</h4>
                    <span className={styles.itemOrg}>{exp.organization}</span>
                    
                    <div className={styles.itemMeta}>
                      <span className={styles.itemMetaSpan}>
                        <Calendar size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                        {exp.duration}
                      </span>
                      {exp.location && (
                        <span className={styles.itemMetaSpan}>
                          <MapPin size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                          {exp.location}
                        </span>
                      )}
                    </div>
                    
                    <p className={styles.itemDesc}>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education */}
          <div className={styles.column}>
            <div className={styles.columnHeader}>
              <GraduationCap size={22} className={styles.headerIcon} />
              <h3 className={styles.columnTitle}>Education</h3>
            </div>

            <div className={styles.timeline}>
              {education.map((edu, idx) => (
                <div key={idx} className={styles.timelineItem}>
                  {/* Timeline indicator node */}
                  <div className={styles.timelineNode}></div>

                  {/* Education Card */}
                  <div className={cn('glass-panel', styles.card)}>
                    <h4 className={styles.itemRole}>{edu.degree}</h4>
                    <span className={styles.itemOrg}>{edu.institution}</span>
                    
                    <div className={styles.itemMeta}>
                      <span className={styles.itemMetaSpan}>
                        <Calendar size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                        {edu.duration}
                      </span>
                      {edu.location && (
                        <span className={styles.itemMetaSpan}>
                          <MapPin size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                          {edu.location}
                        </span>
                      )}
                    </div>
                    
                    <p className={styles.itemDesc}>{edu.fieldOfStudy} ({edu.studyType})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Resume Download CTA */}
        <div className={styles.downloadWrapper}>
          <a href={personalInfo.resumePdf} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button className={styles.downloadBtn} type="button">
              <Download size={16} aria-hidden="true" />
              Download Full Resume PDF
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
