import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { getProductsByCategory } from '../../data/furniture-data';
import styles from '../../styles/Category.module.css';

export const metadata = {
  title: 'Beds & Bedroom Furniture - NGB Interiors',
  description: 'Handcrafted beds and bedroom furniture. Platform beds, wooden frames, storage beds and more.',
};

export default function BedsPage() {
  const products = getProductsByCategory('beds');

  return (
    <>
      <div className={styles.categoryHeader}>
        <h1 className={styles.categoryTitle}>Beds & Bedroom</h1>
        <p className={styles.categorySubtitle}>
          Handcrafted beds designed for comfort and style. Each piece is built
          with premium hardwoods and expert craftsmanship.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>

          {products.length > 0 ? (
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>🛏️</div>
              <p className={styles.emptyStateText}>
                No beds available at the moment
              </p>
              <Link href="/" className="btn btn-primary">
                Explore Other Categories
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
