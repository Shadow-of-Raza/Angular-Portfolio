'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo, socialLinks } from '@/lib/content/profile';
import styles from './Footer.module.css';

// Using inline SVGs for brand icons since lucide-react deprecated them in newer versions
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      {/* Social Links Row */}
      <ul className={styles.socials} aria-label="Social Profiles">
        {socialLinks.linkedin && (
          <li>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn Profile">
              <LinkedinIcon />
            </a>
          </li>
        )}
        {socialLinks.github && (
          <li>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub Profile">
              <GithubIcon />
            </a>
          </li>
        )}
        {socialLinks.instagram && (
          <li>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram Profile">
              <InstagramIcon />
            </a>
          </li>
        )}
        {socialLinks.facebook && (
          <li>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook Profile">
              <FacebookIcon />
            </a>
          </li>
        )}
        {socialLinks.twitter && (
          <li>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter Profile">
              <TwitterIcon />
            </a>
          </li>
        )}
      </ul>

      {/* Copyrights info */}
      <div className={styles.copyright}>
        <p>&copy; {currentYear} Mohd Ansar Bux. All Rights Reserved.</p>
        <p className={styles.devBy} style={{ marginTop: '4px' }}>
          Developed By : <span>{personalInfo.name}</span>
        </p>
      </div>

      {/* Back to Top */}
      <button className={styles.backToTop} onClick={handleBackToTop} aria-label="Scroll to top of page">
        <ArrowUp size={14} aria-hidden="true" />
        Back to Top
      </button>
    </footer>
  );
}
