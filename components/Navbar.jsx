'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/components/Navbar.module.css';
import HamburgerMenu from './HamburgerMenu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand}>
            <div className={styles.brandText}>
              <span className={styles.brandName}>NGB INTERIORS</span>
              <span className={styles.brandTagline}>Handcrafted Excellence</span>
            </div>
          </Link>

          <nav className={styles.navDesktop}>
            <Link href="/beds" className={styles.navLink}>Beds</Link>
            <Link href="/sofas" className={styles.navLink}>Sofas</Link>
            <Link href="/chairs" className={styles.navLink}>Chairs</Link>
            <Link href="/#help" className={styles.navLink}>Help</Link>
          </nav>

          <button
            className={styles.hamburger}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
          </button>
        </div>
      </header>

      <HamburgerMenu isOpen={menuOpen} onClose={closeMenu} />
    </>
  );
}
