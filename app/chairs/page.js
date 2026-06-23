import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { getProductsByCategory } from '../../data/furniture-data';
import styles from '../../styles/Category.module.css';

export const metadata = {
  title: 'Chairs & Seating Furniture - NGB Interiors',
  description: 'Handcrafted chairs and seating furniture. Dining chairs, office chairs, lounge chairs and more.',
};

export default function ChairsPage() {
  const products = getProductsByCategory('chairs');

  return (
    <>
      <div className={styles.categoryHeader}>
        <h1 className={styles.categoryTitle}>Chairs & Seating</h1>
        <p className={styles.categorySubtitle}>
          Versatile seating solutions crafted for every space. From dining chairs
          to office seating, each piece combines ergonomic design with timeless style.
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
              <div className={styles.emptyStateIcon}>🪑</div>
              <p className={styles.emptyStateText}>
                No chairs available at the moment
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
