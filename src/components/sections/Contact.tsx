'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { personalInfo } from '@/lib/content/profile';
import { cn } from '@/lib/utils/cn';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Clear success notification after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        {/* Title */}
        <div className={styles.titleContainer}>
          <p className={styles.subtitle}>Get In Touch</p>
          <h2 className={styles.title}>Contact Me</h2>
        </div>

        {/* Contact Layout Grid */}
        <div className={styles.grid}>
          {/* Left Column: Contact Form */}
          <div className={cn('glass-panel', styles.formCard)}>
            <h3 className={styles.formTitle}>Send a Message</h3>
            
            {submitSuccess ? (
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '24px',
                  textAlign: 'center',
                  color: 'var(--color-text-primary)'
                }}
              >
                <CheckCircle size={48} color="var(--color-accent-gold)" />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'var(--font-weight-bold)' }}>Message Sent Successfully!</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                  Thank you for reaching out. I will get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {/* Name & Email Row */}
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={styles.input}
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <span id="name-error" style={{ color: '#ff4d4d', fontSize: '0.75rem' }}>{errors.name}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={styles.input}
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <span id="email-error" style={{ color: '#ff4d4d', fontSize: '0.75rem' }}>{errors.email}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div className={styles.inputGroup}>
                  <label htmlFor="subject" className={styles.label}>Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className={styles.input}
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                  {errors.subject && <span id="subject-error" style={{ color: '#ff4d4d', fontSize: '0.75rem' }}>{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className={styles.textarea}
                    placeholder="Your Message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && <span id="message-error" style={{ color: '#ff4d4d', fontSize: '0.75rem' }}>{errors.message}</span>}
                </div>

                {/* Submit button */}
                <button
                  className={styles.submitBtn}
                  type="submit"
                  disabled={isSubmitting}
                >
                  <Send size={16} aria-hidden="true" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact info & Maps */}
          <div className={styles.infoColumn}>
            {/* Info details */}
            <div className={cn('glass-panel', styles.infoCard)}>
              <div className={styles.infoItem}>
                <div className={styles.infoIconWrapper}>
                  <MapPin size={18} />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Location</span>
                  <span className={styles.infoVal}>{personalInfo.location.city}, {personalInfo.location.state}, India</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIconWrapper}>
                  <Mail size={18} />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Email</span>
                  <span className={styles.infoVal}>{personalInfo.email}</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIconWrapper}>
                  <Phone size={18} />
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Phone</span>
                  <span className={styles.infoVal}>{personalInfo.phone}</span>
                </div>
              </div>
            </div>

            {/* Embedded Google themed Map */}
            <div className={styles.mapWrapper}>
              <iframe
                title="Bengaluru Location Map"
                src={personalInfo.location.mapUrl}
                className={styles.mapIframe}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
