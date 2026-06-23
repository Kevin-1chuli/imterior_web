'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/components/HamburgerMenu.module.css';

export default function HamburgerMenu({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayActive : ''}`}
        onClick={onClose}
      />

      <div className={`${styles.menu} ${isOpen ? styles.menuActive : ''}`}>
        <div className={styles.menuHeader}>
          <h2 className={styles.menuTitle}>Menu</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className={styles.menuNav}>
          <Link href="/beds" className={styles.menuLink} onClick={onClose}>
            🛏️ Beds
          </Link>
          <Link href="/sofas" className={styles.menuLink} onClick={onClose}>
            🛋️ Sofas
          </Link>
          <Link href="/chairs" className={styles.menuLink} onClick={onClose}>
            🪑 Chairs
          </Link>
          <Link href="/#help" className={styles.menuLink} onClick={onClose}>
            💬 Help & Support
          </Link>
        </nav>

        <div className={styles.menuFooter}>
          <p className={styles.footerText}>NGB Interiors</p>
          <p className={styles.footerSubtext}>Handcrafted Excellence</p>
        </div>
      </div>
    </>
  );
}
