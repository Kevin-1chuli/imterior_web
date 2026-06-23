'use client';

import { useRef } from 'react';
import ProductCard from './ProductCard';
import styles from '../styles/components/CategorySlider.module.css';

export default function CategorySlider({ products, title }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.sliderContainer}>
      {title && <h2 className={styles.title}>{title}</h2>}

      <div className={styles.sliderWrapper}>
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className={styles.slider} ref={sliderRef}>
          {products.map((product) => (
            <div key={product.id} className={styles.slide}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  );
}
