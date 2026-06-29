'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { projects, Project } from '@/lib/content/projects';
import { cn } from '@/lib/utils/cn';
import styles from './Projects.module.css';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Extract unique categories dynamically
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filter projects by selected category
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  // Handle focus trap inside Project Details Modal
  useEffect(() => {
    if (!selectedProject) return;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    const focusableElements = modalElement.querySelectorAll(
      'a[href], button:not([disabled])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      } else if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.titleContainer}>
          <p className={styles.subtitle}>Portfolio</p>
          <h2 className={styles.title}>Featured Projects</h2>
        </div>

        {/* Categories filter list */}
        <ul className={styles.filterBar}>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={cn(
                  styles.filterBtn,
                  activeCategory === cat && styles.activeFilterBtn
                )}
                onClick={() => setActiveCategory(cat)}
                type="button"
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        {/* Projects Cards Grid */}
        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={cn('glass-panel', styles.card)}
                onClick={() => setSelectedProject(project)}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`View details of project ${project.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
              >
                <div className={styles.imgWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.img}
                    loading="lazy"
                  />
                  <div className={styles.cardOverlay}>
                    <span 
                      style={{
                        color: 'var(--color-accent-gold)',
                        fontWeight: 'var(--font-weight-bold)',
                        fontSize: 'var(--font-size-sm)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        border: '1px solid var(--color-accent-gold)',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: 'rgba(5, 5, 5, 0.7)'
                      }}
                    >
                      View Project
                    </span>
                  </div>
                </div>

                <div className={styles.cardDetails}>
                  <span className={styles.projectCategory}>{project.category}</span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>
                  
                  <ul className={styles.techList}>
                    {project.techStack.slice(0, 3).map((tech) => (
                      <li key={tech} className={styles.techTag}>
                        {tech}
                      </li>
                    ))}
                    {project.techStack.length > 3 && (
                      <li className={styles.techTag}>+{project.techStack.length - 3}</li>
                    )}
                  </ul>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Details Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className={styles.modalBackdrop}
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} detail sheet`}
          >
            <motion.div
              ref={modalRef}
              className={cn('glass-panel', styles.modalContent)}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className={styles.closeBtn}
                onClick={() => setSelectedProject(null)}
                aria-label="Close dialog"
                type="button"
              >
                <X size={18} />
              </button>

              {/* Project Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className={styles.modalImg}
              />

              <div className={styles.modalHeader}>
                <span className={styles.projectCategory}>{selectedProject.category}</span>
                <h3 className={styles.title} style={{ fontSize: '1.8rem' }}>{selectedProject.title}</h3>
              </div>

              {/* Detailed Description */}
              <p className={styles.cardDesc} style={{ display: 'block', fontSize: 'var(--font-size-md)' }}>
                {selectedProject.description}
              </p>

              {/* Tech Tags */}
              <div>
                <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                  Technologies Used
                </h4>
                <ul className={styles.techList}>
                  {selectedProject.techStack.map((tech) => (
                    <li key={tech} className={styles.techTag}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className={styles.modalLinks}>
                {selectedProject.githubLink && (
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalLinkBtn}
                  >
                    <GithubIcon />
                    GitHub Repo
                  </a>
                )}
                {selectedProject.liveDemoLink && (
                  <a
                    href={selectedProject.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(styles.modalLinkBtn, styles.modalLinkSec)}
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
